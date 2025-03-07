import React from 'react';
import { FaStar } from 'react-icons/fa';
import ExclusiveProducts from '../home/ExclusiveProducts';
import Footer from "../home/Footer.jsx";

const BestProduct = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center py-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">
          Best Products <FaStar className="inline text-yellow-500" />
        </h1>
      </header>

      <main className="flex-grow">
        <ExclusiveProducts />
      </main>

      <Footer />
    </div>
  );
};

export default BestProduct;
