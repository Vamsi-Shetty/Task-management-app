import { Request, Response } from "express";
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', completed } = req.query;
    const tasksData = await getTasksService({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sortBy: sortBy as string,
      sortOrder: sortOrder as string,
      completed: completed !== undefined ? completed === 'true' : undefined,
    });
    return res.status(200).json(tasksData);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description } = req.body;
    const task = await createTaskService({ title, description });
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const updateData = req.body;
    const task = await updateTaskService(taskId, updateData);
    if (task) {
      res.status(200).json({ message: "Task updated successfully", task });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const task = await deleteTaskService(taskId);
    if (task) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
