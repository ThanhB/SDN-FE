import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import useUser from "../../../hooks/useUser.js";

function UserTable() {
  const { userList, fetchUserList, isloadingUserList, userTotalElements } = useUser();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  
  useEffect(() => {
    if (tableParams.pagination.current) {
      (async () => {
        await fetchUserList(tableParams.pagination.current);
      })();
    }
  }, [tableParams.pagination.current]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: userTotalElements,
      },
    });
  }, [userList]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: "15%",
    },
    {
      title: "Member Name",
      dataIndex: "membername",
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Birthdate",
      dataIndex: "YOB",
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      width: "15%",
      render: (isAdmin) => {
        if (isAdmin) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },
  ];
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  return (
    <div>
      <div className="scrollbar pagination overflow-x-auto">
        <Table
          columns={columns}
          dataSource={userList}
          pagination={tableParams.pagination}
          loading={isloadingUserList}
          onChange={handleTableChange}
          onRow={(record) => ({
            onClick: (e) => handleRowClick(record),
          })}
          rowKey={'_id'}
        />
      </div>
    </div>
  );
}
export default UserTable;
