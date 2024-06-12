import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Input } from "antd";
import { Rate } from "antd";
const { TextArea } = Input;
function FeedBackModal(id) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <div>
      <Button className="bg-blue-500 text-white" onClick={showModal}>
        FeedBack
      </Button>
      <Modal
        title="Feed Back"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="p-4 space-y-4">
          <p>
            Đánh giá của bạn
          </p>
          <Rate allowHalf count={3} defaultValue={0} />
          <p>
            <TextArea
              showCount
              maxLength={500}
              onChange={onChange}
              placeholder="Chia sẻ về cảm nhận sản phẩm của bạn..."
              style={{
                height: 120,
                resize: "none",
              }}
            />
          </p>
        </div>
      </Modal>
    </div>
  );
}

FeedBackModal.propTypes = {
  id: PropTypes.string,
};
export default FeedBackModal;
