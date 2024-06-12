import React, { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  notification,
} from "antd";

function UserProfile() {
  const { id } = useParams();
  const { userDetail, fetchUserDetail, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchUserDetail(id);
      })();
    }
  }, [id]);

  console.log("check user", userDetail);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleUpdate = async (values) => {
    try {
      const res = await updateUser(id, values);
      if (res && res.status === 200) {
        notification.success({
          message: "Success",
          description: "Update user successfully!",
        });
      }
      setIsEditing(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="mx-[400px] py-8">
      <Row gutter={16}>
        <Col span={12}>
          <Image
            src="https://cafefcdn.com/203337114487263232/2023/12/28/36015395459431168491282614835739769126073234n-2005-1703766141844-1703766142873901375840.jpg"
            width={400}
          />
        </Col>
        <Col span={12}>
          <Form initialValues={userDetail}>
            <Form.Item label="Member Name" name="membername">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Birth Year" name="YOB">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password disabled={!isEditing} />
            </Form.Item>
            <Form.Item>
              {isEditing ? (
                <Button type="primary" onClick={handleUpdate}>
                  Submit
                </Button>
              ) : (
                <Button type="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default UserProfile;
