import React, { useEffect } from "react";
import useWatch from "../../hooks/useWatch";
import PropTypes from "prop-types";
import { Row, Col, Button, Image } from "antd";
import { useParams } from "react-router-dom";
import FeedBackModal from "./feedBackModal";
function WatchDetail() {
  const { id } = useParams();
  const { watchDetail, fetchWatchDetail } = useWatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetchWatchDetail(id);
    };
    fetchData();
  }, [id, fetchWatchDetail]);

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
              {watchDetail.Automatic ? "Outstanding design" : "Amazing design"}
            </p>
            <p className="text-[15px] font-thin">
              Mô tả: {watchDetail.watchDescription}
            </p>
            <h2 className="text-[30px] text-red-500 font-bold">
              {formatPrice(watchDetail.price)}
            </h2>
            <FeedBackModal id={id} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default WatchDetail;
