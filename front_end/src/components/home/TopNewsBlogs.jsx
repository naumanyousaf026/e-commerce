import React from 'react';
import Blog1 from '../../images/Blog_image_1.webp';
import Blog2 from '../../images/Blog_image_3.png';
import Blog3 from '../../images/Blog_image_2.webp';
const TopNewsBlogs = () => {
  return (
    <div className="container mx-auto mb-5">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-sty text-color">Top News</h2>
        <h2 className="mb-3">LATEST BLOGS</h2>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-100">
          <img 
            src={Blog1} 
            alt="Blog 1" 
            className="w-full" 
          />
          <div className="text-center text-xl text-yellow-500 p-4">
            <div className="text-gray-800">
              <p className="mb-0 font-bold">
                LOREM IPSUM DOLOR SIT CONSECTETUR ELIT
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100">
          <img 
            src={Blog2}
            alt="Blog 2" 
            className="w-full" 
          />
          <div className="text-center text-xl text-yellow-500 p-4">
            <div className="text-gray-800">
              <p className="mb-0 font-bold">
                LOREM IPSUM DOLOR SIT CONSECTETUR ELIT
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100">
          <img 
            src={Blog3}
            alt="Blog 3" 
            className="w-full" 
          />
          <div className="text-center text-xl text-yellow-500 p-4">
            <div className="text-gray-800">
              <p className="mb-0 font-bold">
                LOREM IPSUM DOLOR SIT CONSECTETUR ELIT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNewsBlogs;
