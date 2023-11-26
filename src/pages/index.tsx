// Or use @loadable/component, as part of the tutorial - uncritically
import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));
const TaskDetailsPage = lazy(() => import("./task-detail"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksListPage />} />
      <Route path="/:taskId" element={<TaskDetailsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
