import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaBoxOpen } from 'react-icons/fa';
import bannerImg from '../../images/megacollection/22.png';
import Footer from "../home/Footer.jsx";
import SmallHeader from '../home/SmallHeader';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return imagePath.startsWith('http') 
    ? imagePath 
    : `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

const MegaCollection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/category/megaCollection`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      <SmallHeader pageTitle="MegaCollection" />
      <div className="container mx-auto p-4">
        <div className="relative mb-12">
          <img
            src={bannerImg}
            alt="Mega Collection Banner"
            className="w-full h-70 object-cover rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-58 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <div className="flex items-center text-blue-500">
                    <FaBoxOpen className="mr-2" />
                    <span className="text-sm uppercase">New Arrival</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MegaCollection;
