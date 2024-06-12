import React from "react";
import SearchWatch from "../searchedWatch.jsx";
import { Layout, } from "antd";

const { Content, Footer, Header } = Layout;
function searchPage() {
  return (
    <div>
      <Layout>
        <Content className="mx-[400px] py-4">
        <SearchWatch />
        </Content>
      </Layout>
    </div>
  );
}
export default searchPage; 