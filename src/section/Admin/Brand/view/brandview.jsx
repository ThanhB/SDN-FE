import React from "react";
import BrandTable  from "../brandTable.jsx";

function BrandTableView() {
  return (
    <div className="min-w-[250px]">
      <div className="bg-[#fff] p-5 rounded-t-xl">
        <p className="text-2xl text-black font-bold">Brand List</p>
      </div>
      <div className="p-5" data-testid="classTable">
        <BrandTable />
      </div>
    </div>
  );
}

export default BrandTableView;
