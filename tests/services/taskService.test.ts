import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from '../../src/services/taskService';
import * as taskRepo from '../../src/repos/taskRepo';
import * as taskTransformer from '../../src/transformers/taskTransformer';

// Mock the repo and transformer
vi.mock('../../src/repos/taskRepo');
vi.mock('../../src/transformers/taskTransformer');

describe('Task Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTasksService', () => {
    it('should return paginated tasks successfully', async () => {
      const mockTasks = [
        { _id: '1', title: 'Task 1', description: 'Desc 1', completed: false },
        { _id: '2', title: 'Task 2', description: 'Desc 2', completed: true },
      ];
      const mockTransformedTasks = [
        { id: '1', title: 'Task 1', description: 'Desc 1', completed: false },
        { id: '2', title: 'Task 2', description: 'Desc 2', completed: true },
      ];

      (taskRepo.getAllTasksWithPagination as any).mockResolvedValue(mockTasks);
      (taskRepo.getTasksCount as any).mockResolvedValue(2);
      (taskTransformer.transformTasks as any).mockReturnValue(mockTransformedTasks);

      const result = await getTasksService({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        completed: undefined,
      });

      expect(taskRepo.getAllTasksWithPagination).toHaveBeenCalledWith(0, 10, { createdAt: -1 }, {});
      expect(taskRepo.getTasksCount).toHaveBeenCalledWith({});
      expect(taskTransformer.transformTasks).toHaveBeenCalledWith(mockTasks);
      expect(result).toEqual({
        tasks: mockTransformedTasks,
        total: 2,
        page: 1,
        totalPages: 1,
      });
    });

    it('should apply filters correctly', async () => {
      const mockTasks = [{ _id: '1', title: 'Task 1', completed: true }];
      const mockTransformedTasks = [{ id: '1', title: 'Task 1', completed: true }];

      (taskRepo.getAllTasksWithPagination as any).mockResolvedValue(mockTasks);
      (taskRepo.getTasksCount as any).mockResolvedValue(1);
      (taskTransformer.transformTasks as any).mockReturnValue(mockTransformedTasks);

      const result = await getTasksService({
        page: 2,
        limit: 5,
        sortBy: 'title',
        sortOrder: 'asc',
        completed: true,
      });

      expect(taskRepo.getAllTasksWithPagination).toHaveBeenCalledWith(5, 5, { title: 1 }, { completed: true });
      expect(taskRepo.getTasksCount).toHaveBeenCalledWith({ completed: true });
      expect(result.page).toBe(2);
      expect(result.totalPages).toBe(1);
    });

    it('should handle repository errors', async () => {
      (taskRepo.getAllTasksWithPagination as any).mockRejectedValue(new Error('DB error'));

      await expect(getTasksService({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })).rejects.toThrow('DB error');
    });
  });

  describe('createTaskService', () => {
    it('should create a task successfully', async () => {
      const mockTask = { _id: '1', title: 'New Task', description: 'Description', completed: false };
      const mockTransformedTask = { id: '1', title: 'New Task', description: 'Description', completed: false };

      (taskRepo.createTask as any).mockResolvedValue(mockTask);
      (taskTransformer.transformTask as any).mockReturnValue(mockTransformedTask);

      const result = await createTaskService({ title: 'New Task', description: 'Description' });

      expect(taskRepo.createTask).toHaveBeenCalledWith({ title: 'New Task', description: 'Description' });
      expect(taskTransformer.transformTask).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTransformedTask);
    });

    it('should throw error if title is missing', async () => {
      await expect(createTaskService({ title: '', description: 'Description' }))
        .rejects.toThrow('Title and description are required');
    });

    it('should throw error if description is missing', async () => {
      await expect(createTaskService({ title: 'Title', description: '' }))
        .rejects.toThrow('Title and description are required');
    });

    it('should handle repository errors', async () => {
      (taskRepo.createTask as any).mockRejectedValue(new Error('DB error'));

      await expect(createTaskService({ title: 'Title', description: 'Description' }))
        .rejects.toThrow('DB error');
    });
  });

  describe('updateTaskService', () => {
    it('should update a task successfully', async () => {
      const mockTask = { _id: '1', title: 'Updated Task', completed: true };
      const mockTransformedTask = { id: '1', title: 'Updated Task', completed: true };

      (taskRepo.updateTask as any).mockResolvedValue(mockTask);
      (taskTransformer.transformTask as any).mockReturnValue(mockTransformedTask);

      const result = await updateTaskService('1', { title: 'Updated Task', completed: true });

      expect(taskRepo.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task', completed: true });
      expect(taskTransformer.transformTask).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTransformedTask);
    });

    it('should return null if task not found', async () => {
      (taskRepo.updateTask as any).mockResolvedValue(null);

      const result = await updateTaskService('999', { title: 'Updated' });

      expect(result).toBeNull();
    });

    it('should handle repository errors', async () => {
      (taskRepo.updateTask as any).mockRejectedValue(new Error('DB error'));

      await expect(updateTaskService('1', { title: 'Updated' }))
        .rejects.toThrow('DB error');
    });
  });

  describe('deleteTaskService', () => {
    it('should delete a task successfully', async () => {
      const mockTask = { _id: '1', title: 'Task to delete' };
      const mockTransformedTask = { id: '1', title: 'Task to delete' };

      (taskRepo.deleteTask as any).mockResolvedValue(mockTask);
      (taskTransformer.transformTask as any).mockReturnValue(mockTransformedTask);

      const result = await deleteTaskService('1');

      expect(taskRepo.deleteTask).toHaveBeenCalledWith('1');
      expect(taskTransformer.transformTask).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTransformedTask);
    });

    it('should return null if task not found', async () => {
      (taskRepo.deleteTask as any).mockResolvedValue(null);

      const result = await deleteTaskService('999');

      expect(result).toBeNull();
    });

    it('should handle repository errors', async () => {
      (taskRepo.deleteTask as any).mockRejectedValue(new Error('DB error'));

      await expect(deleteTaskService('1')).rejects.toThrow('DB error');
    });
  });
});