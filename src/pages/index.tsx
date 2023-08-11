// Or use @loadable/component, as part of the tutorial - uncritically
import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksListPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
