import React, { useEffect, useState } from "react";
import useBrand from "../../../hooks/useBrand";
import { Table, Dropdown, Menu, Button, Space } from "antd";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddNewBrand from "./addBrand.jsx";
import BrandRemove from "./brandRemove.jsx";
import BrandEdit from "./brandEdit.jsx";

function BrandTable() {
  const { fetchBrandList, brandList, isLoadingBrandList } = useBrand();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [brandID, setBrandID] = useState({});
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [deleteBrand, setDeleteBrand] = useState(null);
  const [editBrand, setEditBrand] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    if (tableParams.pagination.current) {
      (async () => {
        await fetchBrandList(tableParams.pagination.current);
        setShouldRefetch(false); // reset refetch trigger
      })();
    }
  }, [tableParams.pagination.current, shouldRefetch]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: brandList.length,
      },
    });
  }, [brandList]);

  const handleRowClick = (record) => {
    setBrandID(record._id);
  };

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const handleUpdateSuccess = async () => {
    await fetchBrandList(tableParams.pagination.current);
  };

  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const handleMenuClick = (key, id) => {
    if (key === "edit") {
      setEditBrand({
        id,
      });
      showModalEdit();
    }
    if (key === "delete") {
      setDeleteBrand({
        id,
      });
      showModalDelete();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "20%",
    },
    {
      title: "Name",
      dataIndex: "brandName",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: brandList._id,
      width: "30%",
      render: (record) => (
        <Space size="large">
          <Link
            to={`/admin/brand/view/${record._id}`}
            onClick={() => handleMenuClick("edit", record._id)}
            className=" text-blue-500 mr-[10px]"
          >
            <EditOutlined />
            &nbsp;Edit Watch
          </Link>
          <a
            onClick={() => handleMenuClick("delete", record._id)}
            className=" text-red-500 "
          >
            <DeleteOutlined />
            &nbsp;Delete Watch
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddNewBrand
          handleUpdateSuccess={handleUpdateSuccess}
          shouldRefetch={shouldRefetch}
          setShouldRefetch={setShouldRefetch}
        />
      </div>
      <BrandRemove
        isModalOpenDelete={isModalOpenDelete}
        id={deleteBrand?.id}
        setIsModalOpenDelete={setIsModalOpenDelete}
        page={tableParams.pagination.current}
        onUpdateSuccess={handleUpdateSuccess}
      />
      <div className="scrollbar pagination overflow-x-auto">
        <Table
          columns={columns}
          dataSource={brandList}
          pagination={tableParams.pagination}
          loading={isLoadingBrandList}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record),
          })}
          rowKey={"_id"}
        />
      </div>
    </div>
  );
}
export default BrandTable;
