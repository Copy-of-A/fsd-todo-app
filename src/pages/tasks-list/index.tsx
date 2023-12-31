import { useEffect } from "react";
import { useStore } from "effector-react";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd"; // ~ "shared/ui/{...}"

import {
  TaskRow,
  getTasksListFx,
  $tasksFiltered,
  $tasksListLoading,
  $tasksListEmpty,
} from "entities/task";
import styles from "./styles.module.scss";
import { ToggleTask } from "features/toggle-task";
import { TasksFilters } from "features/task-filters";

const TasksListPage = () => {
  const tasks = useStore($tasksFiltered);
  const isLoading = useStore($tasksListLoading);
  const isEmpty = useStore($tasksListEmpty);

  /**
   * Requesting data when loading the page
   * @remark is a bad practice in the effector world and is presented here-just for a visual demonstration
   * It is better to fetch via event.pageMounted or reflect
   */
  useEffect(() => {
    getTasksListFx();
  }, []);

  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilters />
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {isLoading && <Spin size="large" />}
          {!isLoading &&
            tasks.map((task) => (
              <Col key={task.id} span={24}>
                <TaskRow
                  data={task}
                  titleHref={`/${task.id}`}
                  before={<ToggleTask taskId={task.id} withStatus={false} />}
                />
              </Col>
            ))}
          {!isLoading && isEmpty && <Empty description="No tasks found" />}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default TasksListPage;
