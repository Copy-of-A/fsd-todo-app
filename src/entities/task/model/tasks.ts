import { createStore, combine, createEffect, createEvent } from "effector";
import { useStoreMap } from "effector-react";

import { typicodeApi } from "shared/api";
import type { Task } from "shared/api";

export const getTasksListFx = createEffect(
  (params?: typicodeApi.tasks.GetTasksListParams) => {
    return typicodeApi.tasks.getTasksList(params);
  }
);

export const toggleTask = createEvent<number>();

export const $tasks = createStore<Task[]>([])
  .on(getTasksListFx.doneData, (_, payload) => payload.data)
  .on(toggleTask, (state, payload) =>
    state.map((item) =>
      payload === item.id
        ? {
            ...item,
            completed: !item.completed,
          }
        : item
    )
  );

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));

export const $tasksListEmpty = $tasks.map((tasks) => tasks.length === 0);

export const $tasksListLoading = getTasksListFx.pending;

// We make a hook to get involved in updates react
// @see In the case of effector, using a hook is an extreme measure, since computed stores are more preferable
export const useTask = (
  taskId: number
): import("shared/api").Task | undefined => {
  return useStoreMap({
    store: $tasksList,
    keys: [taskId],
    fn: (tasks, [id]) => tasks.find((task) => task.id === id),
  });
};
