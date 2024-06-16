import React, { useEffect, useState } from "react";
import useWatch from "../../hooks/useWatch";
import CommentList from "../Home/commentListByWatch.jsx";
import { Row, Col, Button, Image, Form, Modal, Input, Rate } from "antd";
import { useParams } from "react-router-dom";
import useComment from "../../hooks/useComment";
const { TextArea } = Input;

function WatchDetail() {
  const { id } = useParams();
  const { watchDetail, fetchWatchDetail } = useWatch();
  const { fetchCreateComment } = useComment();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(0); // Added this line
  const [textAreaValue, setTextAreaValue] = useState(""); // Added this line
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWatchDetail(id);
    };
    fetchData();
  }, [id, fetchWatchDetail]);

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
      console.log("Response from fetchCreateComment:", response);
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

  const formatPrice = (price) => {
    const decimalPart = price - Math.floor(price);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimalPart > 0 ? 2 : 0,
    }).format(price);
  };

  return (
    <div className="px-[380px] py-20">
      <div>
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
      <div>
        <Row gutter={48}>
          <Col span={12}>
            <Image alt={watchDetail.watchName} src={watchDetail.image} />
          </Col>
          <Col span={12}>
            <div className="space-y-4">
              <h1 className="text-[20px] font-bold">
                Tên: {watchDetail.watchName}
              </h1>
              <p className="text-[15px] font-thin">
                Thiết kế:{" "}
                {watchDetail.Automatic
                  ? "Outstanding design"
                  : "Amazing design"}
              </p>
              <p className="text-[15px] font-thin">
                Mô tả: {watchDetail.watchDescription}
              </p>
              <h2 className="text-[30px] text-red-500 font-bold">
                {formatPrice(watchDetail.price)}
              </h2>
              <Button
                className="bg-blue-500 text-white"
                onClick={showModal}
                form="createCommentForm"
              >
                FeedBack
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <CommentList refreshComments={refreshComments} />
      </div>
    </div>
  );
}

export default WatchDetail;
