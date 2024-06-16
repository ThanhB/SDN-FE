import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import useComment from "../../hooks/useComment";
const { TextArea } = Input;

function FeedBackModal() {
  const { id } = useParams();
  const { fetchCreateComment } = useComment();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(0); // Added this line
  const [textAreaValue, setTextAreaValue] = useState(""); // Added this line
  const [refreshComments, setRefreshComments] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleRatingChange = (value) => {
    setRatingValue(value); // Update Rating value when it changes
  };

  const handleSave = async () => {
    try {
      const response = await fetchCreateComment({
        id,
        value: { text: textAreaValue, rating: ratingValue },
      });
      console.log("response", response)
      if (response && response.status === 200) {
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        setRatingValue(0); // Reset rating value
        setTextAreaValue(""); // Reset text area value
        setRefreshComments(!refreshComments); // Trigger a refresh
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setRatingValue(0); // Reset rating value
    setTextAreaValue(""); // Reset text area value
  };

  return (
    <div>
      <Button
        className="bg-blue-500 text-white"
        onClick={showModal}
        form="createCommentForm"
      >
        FeedBack
      </Button>
      <Modal
        title="Feed Back"
        open={open}
        closable={false}
        centered
        confirmLoading={confirmLoading}
        footer={[
          <div className="space-x-4">
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={confirmLoading}
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <Form
          layout="vertical"
          id="createCommentForm"
          onFinish={(values) => handleSave(values)}
          form={form}
          initialValues={{ rating: ratingValue, comment: textAreaValue }} // Set initial values
        >
          <Form.Item name="rating">
            <div className="space-y-4">
              <p>Đánh giá :</p>
              <Rate
                onChange={handleRatingChange}
                allowClear
                allowHalf
                count={3}
              />
            </div>
          </Form.Item>
          <Form.Item name="comment">
            <div className="space-y-4">
              <p>Nhận xét :</p>
              <TextArea
                rows={4}
                placeholder="Hãy để lại ý kiến của bạn về sản phẩm này"
                onChange={(e) => setTextAreaValue(e.target.value)}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FeedBackModal;
