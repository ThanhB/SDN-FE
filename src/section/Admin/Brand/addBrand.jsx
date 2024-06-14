import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import useBrand from "../../../hooks/useBrand";
function AddNewBrand({ setShouldRefetch }) {
  const { fetchCreateBrand } = useBrand();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCreate = async (values) => {
    try {
      const res = await fetchCreateBrand(values);
      if (res && res.status === 201) {
        setIsModalOpen(false);
        setShouldRefetch(true); // trigger refetch
        form.resetFields();
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="add-button">
        <Button
          className="px-4 py-2 bg-[#172554] text-white rounded-md hover:bg-[#172554] focus:outline-none  focus:border-[#172554]"
          onClick={showModal}
          form="createBrandForm"
        >
          Add Brand
        </Button>
      </div>
      <div className="add-modal">
        <Modal
          open={isModalOpen}
          centered
          closable={false}
          footer={[
            <div>
              <div className="space-x-3">
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>
                <Button
                  htmlType="submit"
                  className="bg-[#172554] text-white"
                  onClick={() => form.submit()}
                >
                  Add
                </Button>
              </div>
            </div>,
          ]}
        >
          <Form
            layout="vertical"
            id="createBrandForm"
            onFinish={(values) => handleCreate(values)}
            form={form}
          >
            <Form.Item
              label="Brand Name"
              name="brandName"
              rules={[{ required: true, message: "Please input watch name!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default AddNewBrand;
