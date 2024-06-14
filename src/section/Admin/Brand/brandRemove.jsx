import { useEffect, useState } from "react";
import useBrand from "../../../hooks/useBrand";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function BrandRemove({ id, ...props }) {
  const { isModalOpenDelete, setIsModalOpenDelete, onUpdateSuccess } = props;
  const { fetchDeleteBrand, fetchBrandDetail, brandDetail } = useBrand();

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        await fetchBrandDetail(id);
      };
      fetchDetail();
    }
  }, [id, fetchBrandDetail]);
  const handleCancel = () => {
    setIsModalOpenDelete(false);
  };

  const handleDetele = async () => {
    try {
      const res = await fetchDeleteBrand(id);
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
            Delete Brand {brandDetail.brandName}
          </span>
        </div>
        <hr className="w-full mb-0 border border-[#172554]" />
        <div className="my-3">
          <p>
            Are your sure you want to delete this brand
            <a className="font-bold"> {brandDetail.brandName}</a>
          </p>
        </div>
      </Modal>
    </div>
  );
}

BrandRemove.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BrandRemove;
