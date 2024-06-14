import React, { useEffect, useState } from "react";
import useWatch from "../../../hooks/useWatch";
import useBrand from "../../../hooks/useBrand";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
const { TextArea } = Input;
function WatchDetail() {
  const { id } = useParams();
  const { watchDetail, fetchWatchDetail, fetchUpdateWatch } = useWatch();
  const { brandList, fetchBrandList } = useBrand();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id)
      (async () => {
        await fetchWatchDetail(id);
      })();
  }, []);

  useEffect(() => {
    fetchBrandList();
  }, []);

  useEffect(() => {
    if (watchDetail) {
      form.setFieldsValue(watchDetail);
    }
  }, [watchDetail]);

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
      if (values[key] !== watchDetail[key]) {
        changes[key] = values[key];
      }
    }

    if (Object.keys(changes).length > 0) {
      try {
        await fetchUpdateWatch(id, changes);
        await fetchWatchDetail(id);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="mx-[300px] py-8">
      <Row gutter={16}>
        <Col span={12}>
          <Image src={watchDetail.image} width={400} height={400} />
        </Col>
        <Col span={12}>
          <Form form={form} initialValues={watchDetail} layout="vertical">
            <Form.Item label="Watch Name" name="watchName">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Image" name="image">
              <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <InputNumber disabled={!isEditing} className="w-[520px]" />
            </Form.Item>
            <Form.Item label="Description" name="watchDescription">
              <TextArea
                disabled={!isEditing}
                style={{
                  height: 120,
                  resize: "none",
                }}
              />
            </Form.Item>
            <Form.Item label="Automatic" name="Automatic">
              <Select
                placeholder="Select a design"
                allowClear
                disabled={!isEditing}
              >
                <Option value={true}>Outstanding design</Option>
                <Option value={false}>Amazing design</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Brand" name="brand">
              <Select
                placeholder="Select a brand"
                allowClear
                disabled={!isEditing}
              >
                {brandList.map(({ _id, brandName }) => (
                  <Option key={_id} value={_id}>
                    {brandName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              {isEditing ? (
                <div className="space-x-6">
                  <Button
                    type="primary"
                    loading={loading}
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

export default WatchDetail;
