import { Link } from "react-router-dom";
import { Row } from "antd";

export const TaskRow = ({ data, titleHref }: any) => {
  return (
    <Row>
      {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
    </Row>
  );
};
