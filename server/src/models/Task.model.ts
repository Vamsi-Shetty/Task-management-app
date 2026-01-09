import mongoose, { Document, Schema } from "mongoose";

export interface Task extends Document {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const TaskModel = mongoose.model<Task>("Task", taskSchema);
