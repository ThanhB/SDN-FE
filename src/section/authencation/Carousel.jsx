/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "antd";
import slide_1 from "../../assets/girl/415b80c373c869a297f6a969c1bb0dc7.jpg";
import slide_2 from "../../assets/girl/hotgirl-smartwatch3-201442421832.jpg";
import slide_3 from "../../assets/girl//hotgirl-smartwatch4-201442421843.jpg";

const Slider = () => (
  <Carousel autoplay className="box-border">
    <div>
      <h3>
        <img
          src={slide_1}
          alt=""
          className="h-[600px] w-full object-cover object-left"
        />
      </h3>
    </div>
    <div>
      <h3>
        <img src={slide_2} alt="" className="h-[600px] w-full object-cover" />
      </h3>
    </div>
    <div>
      <h3>
        <img src={slide_3} alt="" className="h-[600px] w-full object-cover" />
      </h3>
    </div>
  </Carousel>
);
export default Slider;
