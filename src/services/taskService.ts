import { createTask, updateTask, deleteTask, getAllTasksWithPagination, getTasksCount } from '../repos/taskRepo';
import { Task } from '../models/Task.model';
import { transformTask, transformTasks } from '../transformers/taskTransformer';

export const getTasksService = async (options: {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  completed?: boolean;
}): Promise<{
  tasks: any[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  try {
    const { page, limit, sortBy, sortOrder, completed } = options;
    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const filter: any = {};
    if (completed !== undefined) {
      filter.completed = completed;
    }

    const tasks = await getAllTasksWithPagination(skip, limit, sort, filter);
    const total = await getTasksCount(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      tasks: transformTasks(tasks),
      total,
      page,
      totalPages,
    };
  } catch (error) {
    throw error;
  }
};

export const createTaskService = async (taskData: { title: string; description: string }): Promise<any> => {
  try {
    if (!taskData.title || !taskData.description) {
      throw new Error('Title and description are required');
    }
    const task = await createTask(taskData);
    return transformTask(task);
  } catch (error) {
    throw error;
  }
};

export const updateTaskService = async (taskId: string, updateData: Partial<Task>): Promise<any | null> => {
  try {
    const task = await updateTask(taskId, updateData);
    return task ? transformTask(task) : null;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskService = async (taskId: string): Promise<any | null> => {
  try {
    const task = await deleteTask(taskId);
    return task ? transformTask(task) : null;
  } catch (error) {
    throw error;
  }
};