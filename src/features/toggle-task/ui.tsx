import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { toggleTask, useTask, getTaskStatus } from "entities/task";

export type ToggleTaskProps = {
  taskId: number;
  withStatus?: boolean;
};

// resolve / unresolve
export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
  const task = useTask(taskId);
  if (!task) return null;

  const status = getTaskStatus(task);

  return (
    <Checkbox
      onClick={() => toggleTask(taskId)}
      checked={task.completed}
      style={{ marginRight: 10 }}
    >
      {withStatus && status}
    </Checkbox>
  );
};
