import { useEffect } from "react";
import { useStore } from "effector-react";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd"; // ~ "shared/ui/{...}"

import { TaskRow, taskModel } from "entities/index";
import styles from "./styles.module.scss";

const TasksListPage = () => {
  const tasks = useStore(taskModel.$tasksList);
  const isLoading = useStore(taskModel.$tasksListLoading);
  const isEmpty = useStore(taskModel.$tasksListEmpty);

  /**
   * Requesting data when loading the page
   * @remark is a bad practice in the effector world and is presented here-just for a visual demonstration
   * It is better to fetch via event.pageMounted or reflect
   */
  useEffect(() => {
    taskModel.getTasksListFx();
  }, []);

  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        {/* TODO: TasksFilters */}
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
                  // TODO: ToggleTaskCheckbox
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
