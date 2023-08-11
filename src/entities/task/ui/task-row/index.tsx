import { Link } from "react-router-dom";
import { Row } from "antd";
import cn from "classnames";
import styles from "./styles.module.scss";

export const TaskRow = ({ data, titleHref, before }: any) => {
  return (
    <Row className={cn(styles.root, { [styles.completed]: data.completed })}>
      {before}
      {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
    </Row>
  );
};
