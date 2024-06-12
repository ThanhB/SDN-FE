import React from "react";
import imgae from "../../assets/images/gprh1000-kv-1920x612.avif";
import { Layout, Row, Col } from "antd";
import WatchCard from "./watchCard";
function TopHome() {
  const { Header, Footer, Content } = Layout;

  const data = [
    {
      
    }
  ]
  return (
    <div>
      <Layout>
        <Header
          style={{
            backgroundImage: `url(${imgae})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "0",
            padding: "0",
            borderRadius:"0px",
          }}
        />
        <Content className="mx-56 p-8">
          <WatchCard />
        </Content>
      </Layout>
    </div>
  );
}
export default TopHome;
