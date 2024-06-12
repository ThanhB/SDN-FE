// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
const Unauthorized = () => {

  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không được phép truy cập trang này."
      extra={
        <Button type="primary" className="bg-[#1677ff]">
          <Link to="/home">Back home</Link>
        </Button>
      }
    />
  );
};

export default Unauthorized;
