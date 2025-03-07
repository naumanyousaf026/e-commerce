import React from "react";

const SmallHeader = ({ pageTitle }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center bg-gray-100 my-4 py-3">
        <div className="w-5/12">
          <span className="font-bold text-[#fa929d] text-xl">{pageTitle.toUpperCase()}</span>
        </div>
        <div className="w-5/12 text-right">
          <a href="/" className="text-blue-500 hover:underline text-xl">HOME /</a>
          <span className="font-bold ml-1 text-[#fa929d] text-xl">{pageTitle.toUpperCase()}</span>
        </div>
      </div>
    </div>  
  );
};

export default SmallHeader;
