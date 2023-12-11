import { createStore, combine, createEffect, createEvent } from "effector";
import { useStoreMap } from "effector-react";

import type { Task } from "shared/api/models";
import {
  GetTaskByIdParams,
  GetTasksListParams,
  getTaskById,
  getTasksList,
} from "shared/api/typicode/tasks";

export const getTasksListFx = createEffect((params?: GetTasksListParams) => {
  return getTasksList(params);
});

export const toggleTask = createEvent<number>();

export const getTaskByIdFx = createEffect(
  ({ taskId, params }: GetTaskByIdParams) => {
    return getTaskById({ taskId, ...params });
  }
);

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
  )
  .on(getTaskByIdFx.doneData, (state, payload) => {
    const storedItem = state.find((item) => item.id === payload.data.id);
    if (!storedItem) {
      return [...state, payload.data];
    }
    return state.map((item) =>
      storedItem.id === item.id
        ? {
            ...payload.data,
          }
        : item
    );
  });

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));

export const $tasksListEmpty = $tasks.map((tasks) => tasks.length === 0);

export const $tasksListLoading = getTasksListFx.pending;

// We make a hook to get involved in updates react
// @see In the case of effector, using a hook is an extreme measure, since computed stores are more preferable
export const useTask = (taskId: number): Task | undefined => {
  return useStoreMap({
    store: $tasksList,
    keys: [taskId],
    fn: (tasks, [id]) => tasks.find((task) => task.id === id),
  });
};

export type QueryConfig = { completed?: boolean };

export const setQueryConfig = createEvent<QueryConfig>();

// Can be moved to a separate directory (for storing multiple models)
export const $queryConfig = createStore<QueryConfig>({}).on(
  setQueryConfig,
  (_, payload) => payload
);

/**
 * Filtered Tasks
 * @remark Can be handled at the effects level - but then you need to connect additional logic to the store
 * > For example, hide / show the task at the `toggleTask` event
 */
export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) => {
    return tasksList.filter(
      (task) =>
        config.completed === undefined || task.completed === config.completed
    );
  }
);

export const $taskDetailsLoading = getTaskByIdFx.pending;
