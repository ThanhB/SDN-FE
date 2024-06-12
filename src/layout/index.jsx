/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Avatar, Layout, notification, Input, Dropdown } from "antd";
import useAuth from "../hooks/useAuthen.js";
import logo from "../assets/images/LG_WS.jpg";
import imgae from "../assets/images/gprh1000-kv-1920x612.avif";
import { SearchOutlined } from "@ant-design/icons";

const { Content, Footer, Header } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, infoUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (searchValue.trim() !== "") {
      navigate(`/watch/search/${searchValue}`);
    }
  };

  DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const handleLogout = () => {
    logout();
    notification.success({
      message: "Logout Successful",
      description: "You have successfully logged out.",
      duration: 2,
    });
  };
  
  const items = () => {
    return [
    {
      label: <a href={`/user/profile/${infoUser._id}`}>{isAuthenticated ? <strong>{infoUser.membername}</strong> : ""}</a>,
      key: "0",
    },
    infoUser.isAdmin && {
      label: <a href="/admin/dashboard">Dashboard</a>,
      key: "1",
    },
    {
      label: (
        <p
          className="text-blue-500 font-bold hover:underline cursor-pointer"
          onClick={handleLogout}
        >
          Đăng Xuất
        </p>
      ),
      key: "2",
    },
  ].filter(Boolean)
   } ;

  return (
    <Layout className="min-h-screen bg-[#fff] justify-evenly flex">
      <Header className="bg-[#ebecf0] flex justify-between items-center h-[80px] shadow-md ">
        <div className="flex space-x-12 items-center px-64 ">
          <div className="flex flex-row items-center">
            <img src={logo} className="w-[110px] h-[60px] ml-6 bg-[#f1f3f4]" />
          </div>
          <div className="flex justify-center space-x-8 font-bold text-md">
            <Link to="/home" className="header-link">
              Trang chủ
            </Link>
          </div>
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <Input
              name="search"
              className="rounded-none w-56 float-right ml-[500px]"
              placeholder="Tìm Kiếm"
              prefix={<SearchOutlined />}
              allowClear
            />
          </form>
        </div>
        <Dropdown
          menu={{
            items: items(),
          }}
          placement="bottomLeft"
          trigger={["click"]}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              size="large"
            />
          </a>
        </Dropdown>
      </Header>
      <Content className="bg-[#f5f5f5]">
        <div className="rounded-xl min-w-[250px] bg-[#f5f5f5]">{children}</div>
      </Content>
      <Footer className="text-center bg-[#ebecf0]">
        Copyright ©{new Date().getFullYear()} Blue Box
      </Footer>
    </Layout>
  );
};
export default DashboardLayout;
