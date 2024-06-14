import React, { useEffect, useState } from "react";
import useBrand from "../../../hooks/useBrand";
import { Button, Form, Input, Row, Col, notification, Image } from "antd";
import { useParams } from "react-router-dom";

function BrandDetail() {
  const { id } = useParams();
  const { brandDetail, fetchBrandDetail, fetchUpdateBrand } = useBrand();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id)
      (async () => {
        await fetchBrandDetail(id);
      })();
  }, [id]);

  useEffect(() => {
    if (brandDetail) {
      form.setFieldsValue(brandDetail);
    }
  }, [brandDetail]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleUpdate = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    const changes = {};

    for (const key in values) {
      if (values[key] !== brandDetail[key]) {
        changes[key] = values[key];
      }
    }

    if (Object.keys(changes).length > 0) {
      try {
        const res = await fetchUpdateBrand(id, changes);
        if (res && res.status === 200) {
          await fetchBrandDetail(id);
          setIsEditing(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      notification.info({
        message: "No Changes",
        description:
          "You must change the brand name before press the submit button.",
        duration: 2,
      });
    }
    setLoading(false);
  };

  return (
    <div className="mx-[300px] py-8 flex justify-center">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src="https://cafefcdn.com/203337114487263232/2023/12/28/36015395459431168491282614835739769126073234n-2005-1703766141844-1703766142873901375840.jpg"
            width={300}

          />
        </div>
        <div>
          <Form form={form} initialValues={brandDetail} layout="vertical">
            <Form.Item label="Brand Name" name="brandName">
              <Input readOnly={!isEditing} className="w-[250px]" />
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
        </div>
      </div>
    </div>
  );
}

export default BrandDetail;
