import { ToggleTask } from "features/toggle-task";
import {
  TaskCard,
  useTask,
  $taskDetailsLoading,
  getTaskByIdFx,
} from "entities/task";
import { Layout, Button } from "antd"; // ~ "shared/ui/{...}"
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";
import { useParams } from "react-router-dom";

const TaskDetailsPage = () => {
  const params = useParams();
  const taskId = Number(params.taskId);
  const task = useTask(taskId);
  const isLoading = useStore($taskDetailsLoading);

  /**
   * Requesting data on the task
   * @remark is a bad practice in the effector world and is presented here-just for a visual demonstration
   * It is better to fetch via event.pageMounted or reflect
   */
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await getTaskByIdFx({ taskId });
    }
    fetchData();
  }, [taskId]); // Or [] if effect doesn't need props or state

  // You can transfer part of the logic to entity/task/card (as a container)
  if (!task && !isLoading) {
    return (
      <Layout className={styles.root}>
        <Layout.Content className={styles.content}>
          There is no task with id: {taskId}
          <br />
          <Link to="/">
            <Button>Back to TasksList</Button>
          </Link>
        </Layout.Content>
      </Layout>
    );
  }

  return (
    <Layout className={styles.root}>
      <Layout.Content className={styles.content}>
        <TaskCard
          data={task}
          size="default"
          loading={isLoading}
          className={styles.card}
          bodyStyle={{ height: 400 }}
          extra={<Link to="/">Back to TasksList</Link>}
          actions={[<ToggleTask key="toggle" taskId={taskId} />]}
        />
      </Layout.Content>
    </Layout>
  );
};

export default TaskDetailsPage;
