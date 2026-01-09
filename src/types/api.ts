import type { components, operations } from './generated';

// Re-export the generated types for easier use
export type Task = components['schemas']['Task'];
export type ErrorResponse = components['schemas']['Error'];

// Request body types
export type CreateTaskRequest = operations['createTask']['requestBody']['content']['application/json'];
export type UpdateTaskRequest = operations['updateTask']['requestBody']['content']['application/json'];

// Response types
export type GetTasksResponse = operations['getTasks']['responses'][200]['content']['application/json'];
export type CreateTaskResponse = operations['createTask']['responses'][201]['content']['application/json'];
export type UpdateTaskResponse = operations['updateTask']['responses'][200]['content']['application/json'];
export type DeleteTaskResponse = operations['deleteTask']['responses'][200]['content']['application/json'];

// Error responses
export type Error400 = operations['createTask']['responses'][400]['content']['application/json'];
export type Error404 = operations['updateTask']['responses'][404]['content']['application/json'];
export type Error500 = operations['getTasks']['responses'][500]['content']['application/json'];