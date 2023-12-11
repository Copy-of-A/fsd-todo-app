import type { Task } from "shared/api/models";

export const getTaskStatus = (data: Task) => {
  return data.completed ? "CLOSED" : "OPENED";
};
