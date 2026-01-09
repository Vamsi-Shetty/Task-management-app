import { TaskModel, Task } from '../models/Task.model';

export const getAllTasksWithPagination = async (skip: number, limit: number, sort: any, filter: any): Promise<Task[]> => {
  try {
    return await TaskModel.find(filter).sort(sort).skip(skip).limit(limit);
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

export const getTasksCount = async (filter: any): Promise<number> => {
  try {
    return await TaskModel.countDocuments(filter);
  } catch (error) {
    throw new Error('Failed to count tasks');
  }
};

export const createTask = async (taskData: { title: string; description: string }): Promise<Task> => {
  try {
    const task = new TaskModel({ ...taskData, completed: false });
    return await task.save();
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (taskId: string, updateData: Partial<Task>): Promise<Task | null> => {
  try {
    return await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true });
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (taskId: string): Promise<Task | null> => {
  try {
    return await TaskModel.findByIdAndDelete(taskId);
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};