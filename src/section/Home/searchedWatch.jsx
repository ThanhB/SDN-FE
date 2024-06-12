import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import { Card, Row, Col, Layout } from "antd";
import useWatch from "../../hooks/useWatch";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ErrorWatch } from "../../component";
const { Meta } = Card;
function SearchWatch() {
  const { searchValue } = useParams();
  const { searchWatchList, fetchWatchByName, status } = useWatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchWatchByName(searchValue);
  }, [searchValue]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchWatchList.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (page) => {
    setCurrentPage(page);
  };
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
      <div className="flex flex-col items-center">
        <h1 className="text-[15px] font-bold underline decoration-2 underline-offset-8 uppercase mb-4">
          KẾT QUẢ TÌM KIẾM: {searchValue}
        </h1>
        <div className="mt-10 ml-[65px]">
          {status === 404 ? (
            <div className="flex justify-center mt-8 mb-8">
              <ErrorWatch className="flex justify-center mx-56" />
            </div>
          ) : (
            <Row gutter={[32, 24]}>
              {currentItems.map(({ _id: id, watchName, image, price }) => (
                <Col span={currentItems.length <= 3 ? 12 : 8} key={id}>
                  <Card
                    hoverable
                    style={{
                      width: 240,
                      height: 350,
                      pointerEvents: "none",
                    }}
                    cover={
                      <Link to={`/watch/${id}`}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            alt={watchName}
                            src={image}
                            style={{
                              maxHeight: "100%", // adjust as needed
                              objectFit: "cover",
                              pointerEvents: "auto",
                              height: "200px",
                            }}
                          />
                        </div>
                      </Link>
                    }
                  >
                    <Link to={`/watch/${id}`}>
                      <Meta
                        title={watchName}
                        description={
                          <div className="font-bold text-red-500">{formatPrice(price)}</div>
                        }
                        style={{ pointerEvents: "auto" }}
                      />
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchWatch;
