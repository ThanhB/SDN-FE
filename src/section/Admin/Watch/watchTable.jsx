import React, { useEffect, useState } from "react";
import { Image, Table, Dropdown, Menu } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import useWatch from "../../../hooks/useWatch.js";
import useBrand from "../../../hooks/useBrand.js";
import AddNewWatch from "./addNewWatch.jsx";
import { Link } from "react-router-dom";
import WatchRemove from "./watchRemove.jsx";

function WatchTable() {
  const { watchList, fetchWatchList, isLoadingWatchList, TotalWatchElements } =
    useWatch();
  const { brandList, fetchBrandList } = useBrand();
  const [deleteWatch, setDeleteWatch] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [watchID, setWatchID] = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    fetchBrandList();
  }, []);

  useEffect(() => {
    if (tableParams.pagination.current) {
      (async () => {
        await fetchWatchList(tableParams.pagination.current);
        setShouldRefetch(false); // reset refetch trigger
      })();
    }
  }, [tableParams.pagination.current, shouldRefetch]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: TotalWatchElements,
      },
    });
  }, [watchList]);

  const menu = (record) => (
    <Menu>
      <Menu.Item key="edit">
        <Link
          to={`/admin/watch/view/${record._id}`}
          onClick={() => handleMenuClick("edit", record._id)}
          style = {{color: "#3b82f6"}}
        >
          <EditOutlined />
          &nbsp;Edit Watch
        </Link>
      </Menu.Item>
      <Menu.Item key="delete" >
        <a onClick={() => handleMenuClick("delete", record._id)} style={{ color: 'red' }}>
          <DeleteOutlined />
          &nbsp;Delete Watch
        </a>
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = (key, id) => {
    if (key === "delete") {
      setDeleteWatch({
        id,
      });
      showModalDelete();
    }
  };

  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const formatPrice = (price) => {
    const decimalPart = price - Math.floor(price);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimalPart > 0 ? 2 : 0,
    }).format(price);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "10%",
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",
      render: (image) => <Image src={image} />,
    },
    {
      title: "Watch Name",
      dataIndex: "watchName",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "6%",
      render: (text, record) => formatPrice(record.price),
    },
    {
      title: "Description",
      dataIndex: "watchDescription",
      width: "30%",
    },
    {
      title: "Automatic",
      dataIndex: "Automatic",
      width: "15%",
      render: (Automatic) => {
        if (Automatic) {
          return "Oustanding design"; //Automatic === true
        } else {
          return "Amazing design"; //Automatic === false
        }
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      width: "8%",
      render: (brand) => {
        const brandItem = brandList.find(({ _id }) => _id === brand);
        return brandItem ? brandItem.brandName : "N/A";
      },
    },
    {
      title: (
        <>
          <span className="height text-lg">
            <SettingOutlined />
          </span>
        </>
      ),
      dataIndex: watchList._id,
      width: "10%",
      render: (record) => (
        <Dropdown
          overlay={menu(record)}
          placement="bottomRight"
          trigger={["click"]}
          _id={watchID}
        >
          <EllipsisOutlined className="text-lg cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  const handleRowClick = (record) => {
    setWatchID(record._id);
  };

  const handleUpdateSuccess = async () => {
    await fetchWatchList(tableParams.pagination.current);
    await fetchBrandList(tableParams.pagination.current);
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddNewWatch setShouldRefetch={setShouldRefetch} />
      </div>
      <WatchRemove
        isModalOpenDelete={isModalOpenDelete}
        id={deleteWatch?.id}
        setIsModalOpenDelete={setIsModalOpenDelete}
        page={tableParams.pagination.current}
        onUpdateSuccess={handleUpdateSuccess}
      />
      <div className="scrollbar pagination overflow-x-auto">
        <Table
          columns={columns}
          dataSource={watchList}
          pagination={tableParams.pagination}
          loading={isLoadingWatchList}
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
export default WatchTable;
