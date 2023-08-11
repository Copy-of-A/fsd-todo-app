import { createStore, combine, createEffect } from "effector";

import { typicodeApi } from "shared/api";
import type { Task } from "shared/api";

export const getTasksListFx = createEffect(
  (params?: typicodeApi.tasks.GetTasksListParams) => {
    return typicodeApi.tasks.getTasksList(params);
  }
);

export const $tasks = createStore<Task[]>([]).on(
  getTasksListFx.doneData,
  (_, payload) => payload.data
);

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));

export const $tasksListEmpty = $tasks.map((tasks) => tasks.length === 0);

export const $tasksListLoading = getTasksListFx.pending;
