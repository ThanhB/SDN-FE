import { useEffect, useState } from "react";
import useWatch from "../../../hooks/useWatch";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function WatchRemove({ id, ...props }) {
  const {
    isModalOpenDelete,
    setIsModalOpenDelete,
    onUpdateSuccess,
  } = props;
  const { fetchDeleteWatch, fetchWatchDetail, watchDetail } = useWatch();

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        await fetchWatchDetail(id);
      };
      fetchDetail();
    }
  }, [id, fetchWatchDetail]);
  const handleCancel = () => {
    setIsModalOpenDelete(false);
  };

  const handleDetele = async () => {
    try {
      const res = await fetchDeleteWatch(id);
      if (res && res.status === 200) {
        setIsModalOpenDelete(false);
        await onUpdateSuccess();
      }
    } catch (error) {
      setIsModalOpenDelete(true);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpenDelete}
        okText="Delete"
        onCancel={handleCancel}
        onClose={false}
        footer={[
          <Button key="back" onClick={handleCancel} className="bg-slate-400 ">
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handleDetele}
            className="bg-red-600 text-white rounded-md"
          >
            Delete
          </Button>,
        ]}
      >
        <div className="text-[#172554] flex items-center font-thin my-2 pr-15">
          <ExclamationCircleOutlined className="mr-2 text-red-500" />
          <span className="font-bold text-base ">
            Delete Watch {watchDetail.watchName}
          </span>
        </div>
        <hr className="w-full mb-0 border border-[#172554]" />
        <div className="my-3">
          <p>
            Are your sure you want to delete this watch{" "}
            <a className="font-bold">{watchDetail.watchName}</a>
          </p>
        </div>
      </Modal>
    </div>
  );
}

WatchRemove.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WatchRemove;
