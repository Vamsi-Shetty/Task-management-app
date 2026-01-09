import { Task } from '../models/Task.model';

export const transformTask = (task: Task) => {
  const taskObject = task.toObject();
  return {
    ...taskObject,
    _id: taskObject._id.toString(),
    createdAt: taskObject.createdAt ? taskObject.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: taskObject.updatedAt ? taskObject.updatedAt.toISOString() : new Date().toISOString(),
  };
};

export const transformTasks = (tasks: Task[]) => {
  return tasks.map(transformTask);
};