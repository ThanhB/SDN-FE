import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Select, Input, InputNumber, message } from "antd";
import useWatch from "../../../hooks/useWatch";
import useBrand from "../../../hooks/useBrand";
function AddNewWatch({ setShouldRefetch }) {
  const { fetchCreateWatch } = useWatch();
  const { brandList, fetchBrandList } = useBrand();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    fetchBrandList();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCreate = async (values) => {
    try {
     const res = await fetchCreateWatch(values);
     if(res && res.status === 200){
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
          form="createWatchForm"
        >
          Add Watch
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
            id="createWatchForm"
            onFinish={(values) => handleCreate(values)}
            form={form}
          >
            <Form.Item
              label="Watch Name"
              name="watchName"
              rules={[{ required: true, message: "Please input watch name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please select a brand!" }]}
            >
              <Select placeholder="Select a brand" allowClear>
                {brandList.map(({ _id, brandName }) => (
                  <Option key={_id} value={_id}>
                    {brandName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <InputNumber
                className="w-[470px]"
                rule={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Price must be greater than 0",
                  },
                  {
                    type: "number",
                    message: "Price must be a number",
                  }
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="watchDescription"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input image!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Automatic"
              name="Automatic"
              rules={[{ required: true, message: "Please select a design!" }]}
            >
              <Select placeholder="Select a design" allowClear>
                <Option value={true}>Outstanding design</Option>
                <Option value={false}>Amazing design</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default AddNewWatch;
