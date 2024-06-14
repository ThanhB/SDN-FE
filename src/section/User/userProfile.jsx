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
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchUserDetail(id);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue(userDetail);
    }
  }, [userDetail]);

  useEffect(() => {
    if (!isEditing) {
      form.setFieldsValue({ password: '', confirm: '' });
    }
  }, [isEditing]);
  
  console.log("check user", userDetail);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    const changes = {};
  
    for (const key in values) {
      if (values[key] !== userDetail[key]) {
        changes[key] = values[key];
      }
    }
  
    if (Object.keys(changes).length > 0) {
      try {
        await updateUser(id, changes);
        setIsEditing(false); // set isEditing to false after successful update
      } catch (error) {
        // handle error here
        console.error(error);
      }
    }
    setLoading(false);
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
          <Form form={form} initialValues={userDetail} layout="vertical">
            <Form.Item label="Member Name" name="membername">
              <Input readOnly={!isEditing} />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input readOnly={!isEditing} />
            </Form.Item>
            <Form.Item label="Birth Year" name="YOB">
              <Input readOnly={!isEditing} />
            </Form.Item>
            <Form.Item>
              {isEditing ? (
                <div className="space-x-6">
                  <Button
                    type="primary"
                    oading={loading}
                    onClick={handleUpdate}
                  >
                    Submit
                  </Button>
                  <Button type="primary" onClick={handleCancel}>
                    Close
                  </Button>
                </div>
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
