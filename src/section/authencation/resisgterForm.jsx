import React, { useState } from "react";
import useSignup from "../../hooks/useRegister";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CalendarOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";


function Register() {
  const { fetchRegister } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onFinish = async (values) => {
    const { membername, password, name, yob } = values;
    try {
      await fetchRegister(membername, password, name, yob);
      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered.",
      });
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description: "An error occurred during registration.",
      });
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 0,
      },
    },
  };

  return (
    <Form name="register" className="register-form" onFinish={onFinish}>
      <Form.Item
        name="membername"
        rules={[
          {
            required: true,
            message: "Please input your Membername!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Membername"
          autoFocus
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          suffix={
            <>
              {showPassword ? (
                <EyeInvisibleOutlined onClick={togglePassword} />
              ) : (
                <EyeOutlined onClick={togglePassword} />
              )}
            </>
          }
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          suffix={
            <>
              {showPassword ? (
                <EyeInvisibleOutlined onClick={togglePassword} />
              ) : (
                <EyeOutlined onClick={togglePassword} />
              )}
            </>
          }
        />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your Name!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name="yob"
        rules={[
          {
            required: true,
            message: "Please input your Year of Birth!",
          },
        ]}
      >
        <Input
          prefix={<CalendarOutlined className="site-form-item-icon" />}
          placeholder="Year of Birth"
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="https://www.youtube.com/watch?v=nwuW98yLsgY" className="text-blue-400">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button bg-[#1677ff] block mx-auto w-full"
        >
          Register
        </Button>
        <p className="text-center mt-5">
          Or
          <Link to="/login" className="text-[#3094ff] hover:underline px-2">
            Login now
          </Link>
        </p>
      </Form.Item>
    </Form>
  );
}

export default Register;
