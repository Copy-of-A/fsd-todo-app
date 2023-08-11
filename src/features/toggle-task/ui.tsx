import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { taskModel } from "entities/task";

// resolve / unresolve
export const ToggleTask = ({ taskId }: { taskId: number }) => {
  const task = taskModel.useTask(taskId);
  if (!task) return null;

  return (
    <Checkbox
      onClick={() => taskModel.toggleTask(taskId)}
      checked={task.completed}
    />
  );
};
