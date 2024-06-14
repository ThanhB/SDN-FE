import React from 'react';
import WatchTable from '../watchTable.jsx';

function WatchView() {
    return (
        <div className="min-w-[250px]">
        <div className="bg-[#fff] p-5 rounded-t-xl">
          <p className="text-2xl text-black font-bold">Watch List</p>
        </div>
        <div className="p-5" data-testid="classTable">
          <WatchTable />
        </div>
      </div>
    );
}

export default WatchView;