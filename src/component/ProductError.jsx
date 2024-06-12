import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const ErrorWatch = () => {

  return (
    <Result
      status="404"
      
      subTitle="Xin lỗi, không tìm thấy kết quả không tồn tại."
    />
  );
};

export default ErrorWatch;
