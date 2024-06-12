/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Form, Input, Button, Checkbox, notification, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { login } from "../../api/authen.js";
import useAuth from "../../hooks/useAuthen.js";

function Authen() {
  const [values, setValues] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

 const handleSignin = async (formValues) => {
    if (isLoggingIn) {
      return;
    }
    try {
      setIsLoggingIn(true);
      const { membername, password } = formValues;
      const res = await login(membername, password);
      if (res && res.status === 200 && res.data.accessToken) {
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
          duration: 1,
        });
        const jwtToken = res.data.accessToken.split(" ")[1]; // split the string by space and take the second part
        Cookies.set("__token", jwtToken, { expires: 7 });
        if (rememberMe) {
          Cookies.set("membername");
          Cookies.set("password");
        }
        const authStore = useAuth.getState();
        authStore.login();
      }
    } catch (err) {
      notification.error({
        message: "Login Failed",
        description: "Username or password is invalid. Please try again.",
        duration: 1,
      });
      console.error(">>> Error signing server", err);
      setIsLoggingIn(false);
    }
  };

  const onFinish = (values) => {
    setValues(values);
    if (values.membername && values.password) {
      handleSignin(values);
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="membername"
        rules={[
          {
            required: true,
            message: "Please input your Membername!",
          },
        ]}
        initialValue={membername}
        colon={true}
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
        initialValue={password}
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
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
            Remember me
          </Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button bg-[#1677ff] block mx-auto w-full"
        >
          <Spin indicator={<LoadingOutlined className="text-[#fff]" />} />
          Login
        </Button>
        <p className="text-center mt-5">
          Or
          <Link to="/register" className="text-[#3094ff] hover:underline px-2">
            Register now
          </Link>
        </p>
      </Form.Item>
    </Form>
  );
}

export default Authen;
