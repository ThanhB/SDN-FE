/* eslint-disable no-unused-vars */
import React from "react";
import Register from "../resisgterForm";
import Carousel from "../Carousel";

function registerView(){
    return(
        <div className="background min-h-screen flex justify-center items-center">
        <div className="max-w-[840px] min-h-[430px] mx-5 bg-[#fff] grid grid-cols-1 md:grid md:grid-cols-2 rounded-2xl overflow-hidden">
          <div className="px-10 my-auto bg-" >
            <h1
              className="text-center text-4xl font-bold mb-5"
            >
              Sign Up
            </h1>
            <Register />
          </div>
          <div className="hidden md:block" >
            <Carousel />
          </div>
        </div>
      </div>
    )
}

export default registerView;