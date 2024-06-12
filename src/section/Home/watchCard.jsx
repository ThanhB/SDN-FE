import React, { useState, useEffect } from "react";
import useWatch from "../../hooks/useWatch";
import useBrand from "../../hooks/useBrand";
import { Card, Row, Col, Button, Dropdown, Menu, Space, Input } from "antd";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { ErrorWatch } from "../../component";
const { Meta } = Card;

function WatchCard() {
  const { watchList, fetchWatchList } = useWatch();
  const { brandList, fetchBrandList } = useBrand();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWatchList, setFilteredWatchList] = useState([]);

  useEffect(() => {
    fetchWatchList();
  }, []);

  useEffect(() => {
    fetchBrandList();
  }, []);

  useEffect(() => {
    setFilteredWatchList(watchList);
  }, [watchList]);

  const handleFilter = async (brandid) => {
    const filtered = watchList.filter((watch) => {
      return watch.brand === brandid;
    });
    setFilteredWatchList(filtered);
  };

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWatchList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handleChange = (page) => {
    setCurrentPage(page);
  };

  const menu = (
    <Menu>
      {brandList.map(({ _id: brandid, brandName }) => (
        <Menu.Item key={brandid} onClick={() => handleFilter(brandid)}>
          <label htmlFor={brandid}>{brandName}</label>
        </Menu.Item>
      ))}
    </Menu>
  );

  const formatPrice = (price) => {
    const decimalPart = price - Math.floor(price);
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: decimalPart > 0 ? 2 : 0 
    }).format(price);
  }

  return (
    <div>
      <div
        class="filter-bar"
        className="bg-white py-4 justify-center items-center shadow-lg h-16 w-[96%] rounded-md"
      >
        <div className="float-left font-[14px] mt-1 ml-4 ">
          Total watches showing:
          {filteredWatchList.length}
        </div>
        <div className="float-right mr-4 flex flex-row space-x-4 ">
          <div>
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Button className="rounded-none items-center space-x-1 bg-blue-400 text-white flex flex-row">
                <Space>
                  Filter
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {currentItems.length === 0 ? (
          <div className="flex justify-center mt-8 mb-8">
            <ErrorWatch className="flex justify-center mx-56" />
          </div>
        ) : (
          <>
            <Row gutter={[240, 16]}>
              {currentItems.map(({ _id: id, watchName, image, price }) => (
                <Col span={4} key={id}>
                  <Link to={`/watch/${id}`}>
                    <Card
                      hoverable
                      style={{ width: 240, height: 350 }}
                      cover={
                        <img
                          alt={watchName}
                          src={image}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      }
                    >
                      <Meta title={watchName} description={<div className="font-bold text-red-500">{formatPrice(price)}</div>} />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                current={currentPage}
                onChange={handleChange}
                total={watchList.length}
                pageSize={itemsPerPage}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WatchCard;
