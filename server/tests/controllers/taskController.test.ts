import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../../src/controllers/taskController';
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from '../../src/services/taskService';

// Mock the services
vi.mock('../../src/services/taskService', () => ({
  getTasksService: vi.fn(),
  createTaskService: vi.fn(),
  updateTaskService: vi.fn(),
  deleteTaskService: vi.fn(),
}));

describe('Task Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonSpy: any;
  let statusSpy: any;

  beforeEach(() => {
    jsonSpy = vi.fn();
    statusSpy = vi.fn().mockReturnValue({ json: jsonSpy });
    mockResponse = {
      status: statusSpy,
      json: jsonSpy,
    };
    vi.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should return tasks successfully', async () => {
      const mockTasksData = {
        tasks: [{ id: '1', title: 'Test Task' }],
        total: 1,
        page: 1,
        totalPages: 1,
      };
      (getTasksService as any).mockResolvedValue(mockTasksData);

      mockRequest = {
        query: {},
      };

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(getTasksService).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        completed: undefined,
      });
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(mockTasksData);
    });

    it('should handle query parameters', async () => {
      const mockTasksData = {
        tasks: [],
        total: 0,
        page: 2,
        totalPages: 1,
      };
      (getTasksService as any).mockResolvedValue(mockTasksData);

      mockRequest = {
        query: {
          page: '2',
          limit: '5',
          sortBy: 'title',
          sortOrder: 'asc',
          completed: 'true',
        },
      };

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(getTasksService).toHaveBeenCalledWith({
        page: 2,
        limit: 5,
        sortBy: 'title',
        sortOrder: 'asc',
        completed: true,
      });
    });

    it('should handle service errors', async () => {
      (getTasksService as any).mockRejectedValue(new Error('Database error'));

      mockRequest = {
        query: {},
      };

      await getTasks(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Failed to fetch tasks' });
    });
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const mockTask = { id: '1', title: 'New Task', description: 'Description' };
      (createTaskService as any).mockResolvedValue(mockTask);

      mockRequest = {
        body: { title: 'New Task', description: 'Description' },
      };

      await createTask(mockRequest as Request, mockResponse as Response);

      expect(createTaskService).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Description',
      });
      expect(statusSpy).toHaveBeenCalledWith(201);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Task created successfully',
        task: mockTask,
      });
    });

    it('should handle validation errors', async () => {
      (createTaskService as any).mockRejectedValue(new Error('Title and description are required'));

      mockRequest = {
        body: { title: '', description: '' },
      };

      await createTask(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Title and description are required',
      });
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const mockTask = { id: '1', title: 'Updated Task', completed: true };
      (updateTaskService as any).mockResolvedValue(mockTask);

      mockRequest = {
        params: { taskId: '1' },
        body: { title: 'Updated Task', completed: true },
      };

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(updateTaskService).toHaveBeenCalledWith('1', {
        title: 'Updated Task',
        completed: true,
      });
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Task updated successfully',
        task: mockTask,
      });
    });

    it('should return 404 if task not found', async () => {
      (updateTaskService as any).mockResolvedValue(null);

      mockRequest = {
        params: { taskId: '999' },
        body: { title: 'Updated Task' },
      };

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(404);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should handle service errors', async () => {
      (updateTaskService as any).mockRejectedValue(new Error('Update failed'));

      mockRequest = {
        params: { taskId: '1' },
        body: { title: 'Updated Task' },
      };

      await updateTask(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Update failed' });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const mockTask = { id: '1', title: 'Task to delete' };
      (deleteTaskService as any).mockResolvedValue(mockTask);

      mockRequest = {
        params: { taskId: '1' },
      };

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(deleteTaskService).toHaveBeenCalledWith('1');
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Task deleted successfully',
      });
    });

    it('should return 404 if task not found', async () => {
      (deleteTaskService as any).mockResolvedValue(null);

      mockRequest = {
        params: { taskId: '999' },
      };

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(404);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should handle service errors', async () => {
      (deleteTaskService as any).mockRejectedValue(new Error('Delete failed'));

      mockRequest = {
        params: { taskId: '1' },
      };

      await deleteTask(mockRequest as Request, mockResponse as Response);

      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({ message: 'Delete failed' });
    });
  });
});