import React, { useState, useContext, useRef, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { settingsOutline, bagHandleOutline, chevronDownOutline } from "ionicons/icons";
import { CartContext } from "./CartContext"; 
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartItems, notification } = useContext(CartContext);
  const navigate = useNavigate(); 
  const dropdownRef = useRef(null);

  const handleCartClick = () => {
    navigate('/cart'); 
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Product categories and subcategories
  const categories = {
    product: {
      name: "Product",
      subcategories: [
        { name: "Product", link: "/product" },
        { name: "Cosmetics", link: "/cosmetics" },
        { name: "BestProduct", link: "/bestProduct" },
        { name: "Beauty World", link: "/beautyWorld" },
        { name: "Offer Collection", link: "/offerCollection" },
        { name: "Mega Collection", link: "/megaCollection" },
      ]
    }
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-8">
          <a href="#" className="font-bold flex items-center">
            <img
              src="https://ps-beautyshop.myshopify.com/cdn/shop/files/logo_4_5.png?v=1613696616"
              alt="Logo"
              width="150"
              className="inline-block"
            />
          </a>
          <ul className="hidden lg:flex space-x-6 mt-5 text-lg font-bold items-center">
            <li><a href="/" className="text-gray-700 hover:text-gray-900">Home</a></li>
            <li><a href="/aboutUs" className="text-gray-700 hover:text-gray-900">About Us</a></li>
            <li className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => toggleDropdown('product')}
              >
                Product
                <IonIcon icon={chevronDownOutline} className="ml-1 text-sm" />
              </button>
              
              {/* Animated dropdown menu - Fixed to always be visible when active */}
              <div 
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300 z-50 ${
                  activeDropdown === 'product' 
                    ? 'opacity-100 transform translate-y-0 block'
                    : 'opacity-0 transform translate-y-4 invisible'
                }`}
              >
                {categories.product.subcategories.map((subcategory, index) => (
                  <a 
                    key={index}
                    href={subcategory.link} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#fa929d]"
                  >
                    {subcategory.name}
                  </a>
                ))}
              </div>
            </li>
            <li><a href="/contactUs" className="text-gray-700 hover:text-gray-900">Contact Us</a></li>
          </ul>
        </div>

        <div className="flex items-center mt-5 space-x-6">
          <a href="/UserProfile" className="flex items-center space-x-2">
            <IonIcon icon={settingsOutline} className="text-2xl text-[#fa929d] hover:text-gray-900" />
          </a>
          <div className="relative" onClick={handleCartClick}>
            <IonIcon icon={bagHandleOutline} className="text-2xl text-[#fa929d] hover:text-gray-900" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            {notification && (
              <div className="absolute -top-10 right-0 bg-green-500 text-white text-xs rounded-full p-1">
                {notification.message}
              </div>
            )}
          </div>

          <form className="hidden lg:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button className="px-4 py-2 rounded-lg border-green-500 hover:bg-green-600 hover:text-white">
              Search
            </button>
          </form>

          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden z-50">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <a href="/" className="text-gray-700 hover:text-[#fa929d] font-semibold transition-all duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/aboutUs" className="text-gray-500 hover:text-[#fa929d] font-semibold transition-all duration-300">
                  About Us
                </a>
              </li>
              <li className="w-full text-center">
                <button 
                  className="text-gray-500 hover:text-[#fa929d] font-semibold transition-all duration-300 flex items-center justify-center w-full"
                  onClick={() => toggleDropdown('mobileProduct')}
                >
                  Product
                  <IonIcon icon={chevronDownOutline} className="ml-1 text-sm" />
                </button>
                
                {activeDropdown === 'mobileProduct' && (
                  <div className="mt-2 bg-gray-50 w-full py-2">
                    {categories.product.subcategories.map((subcategory, index) => (
                      <a 
                        key={index}
                        href={subcategory.link} 
                        className="block py-2 text-sm text-gray-600 hover:text-[#fa929d]"
                      >
                        {subcategory.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
              <li>
                <a href="/contactUs" className="text-gray-500 hover:text-[#fa929d] font-semibold transition-all duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;