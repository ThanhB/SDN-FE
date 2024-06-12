import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Error = () => {

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          <Link to="/home">Back home</Link>
        </Button>
      }
    />
  );
};

export default Error;
