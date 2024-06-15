import React, { useEffect, useState } from "react";
import { Input, Form, Button, message } from "antd";
import useUser from "../../hooks/useUser";
import { Link, useParams } from "react-router-dom";

function ChangePasswordForm() {
  const { id } = useParams();
  const { fetchChangePassword, userDetail, fetchUserDetail } = useUser();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchUserDetail(id);
      })();
    }
  }, []);

  const onFinish = async (values) => {
    const { currentPassword, newPassword } = values;
    const response = await fetchChangePassword(id, {
      oldPassword: currentPassword,
      newPassword,
    });
    if (response && response.status === 200) {
      form.resetFields();
    }
  };

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold mb-5">Change Password</h1>
      <div>
        <Form
          form={form}
          name="change_password"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" style={{ width: "400px" }} />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <div className="space-x-4">
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
            <Button type="primary">
              <Link to={`/user/profile/${id}`}>Back to Profile</Link>
            </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
