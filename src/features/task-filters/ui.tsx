// If you feel confident with @effector/reflect, you can immediately use it
// As part of tutorial uncritically
import { Radio } from "antd"; // ~ "shared/ui/radio"

import { setQueryConfig } from "entities/task";
import { filtersList, getFilterById, DEFAULT_FILTER } from "./config";
import { $tasksListLoading } from "entities/task/model";
import { useStore } from "effector-react";

export const TasksFilters = () => {
  const isLoading = useStore($tasksListLoading);

  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id }) => (
        <Radio.Button
          key={id}
          onClick={() => setQueryConfig(getFilterById(id).config)}
          value={id}
          disabled={isLoading}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
