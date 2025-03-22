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

  // Updated menu structure with dropdowns
  const menuItems = {
    home: {
      name: "Home Pages",
      subcategories: [
        { name: "Home Default", link: "/" },
        { name: "Home Modern", link: "/" },
        { name: "Home Minimal", link: "/" },
        { name: "Home Classic", link: "/" }
      ]
    },
    products: {
      name: "Products",
      subcategories: [
        { name: "All Products", link: "/product" },
        { name: "Featured Items", link: "/megaCollection" },
        { name: "New Arrivals", link: "/cosmetics" },
        { name: "Best Sellers", link: "/bestProduct" },
        { name: "Special Offers", link: "/offerCollection" }
      ]
    },
    categories: {
      name: "Categories",
      subcategories: [
        { name: "Skincare", link: "/skincare" },
        { name: "Makeup", link: "/offerCollection" },
        { name: "Hair Care", link: "/HairCare" },
        { name: "Fragrance", link: "/FragranceProducts" },
        { name: "Body Care", link: "/megaCollection" }
      ]
    },
    about: {
      name: "About Us",
      link: "/aboutUs"
    },
    contact: {
      name: "Contact Us",
      link: "/contactUs"
    },
    blog: {
      name: "Blog",
      subcategories: [
        { name: "Latest Posts", link: "/blog" },
        { name: "Beauty Tips", link: "/blog" },
        { name: "Product Reviews", link: "/blog" },
        { name: "Tutorials", link: "/blog" }
      ]
    }
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-8">
          <a href="/" className="font-bold flex items-center">
            <img
              src="https://ps-beautyshop.myshopify.com/cdn/shop/files/logo_4_5.png?v=1613696616"
              alt="Logo"
              width="150"
              className="inline-block"
            />
          </a>
          
          <ul className="hidden lg:flex space-x-8 mt-5 text-lg font-medium items-center">
            {/* Home Pages Dropdown */}
            <li className="relative group" ref={activeDropdown === 'home' ? dropdownRef : null}>
              <button 
                className="flex items-center text-gray-700 hover:text-[#fa929d] focus:outline-none transition-colors duration-300"
                onClick={() => toggleDropdown('home')}
              >
                {menuItems.home.name}
                <IonIcon icon={chevronDownOutline} className="ml-1 text-sm transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div 
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300 z-50 ${
                  activeDropdown === 'home' 
                    ? 'opacity-100 transform translate-y-0 block'
                    : 'opacity-0 transform translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                {menuItems.home.subcategories.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#fa929d] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </li>

            {/* Products Dropdown */}
            <li className="relative group" ref={activeDropdown === 'products' ? dropdownRef : null}>
              <button 
                className="flex items-center text-gray-700 hover:text-[#fa929d] focus:outline-none transition-colors duration-300"
                onClick={() => toggleDropdown('products')}
              >
                {menuItems.products.name}
                <IonIcon icon={chevronDownOutline} className="ml-1 text-sm transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div 
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300 z-50 ${
                  activeDropdown === 'products' 
                    ? 'opacity-100 transform translate-y-0 block'
                    : 'opacity-0 transform translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                {menuItems.products.subcategories.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#fa929d] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </li>

            {/* Categories Dropdown */}
            <li className="relative group" ref={activeDropdown === 'categories' ? dropdownRef : null}>
              <button 
                className="flex items-center text-gray-700 hover:text-[#fa929d] focus:outline-none transition-colors duration-300"
                onClick={() => toggleDropdown('categories')}
              >
                {menuItems.categories.name}
                <IonIcon icon={chevronDownOutline} className="ml-1 text-sm transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div 
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300 z-50 ${
                  activeDropdown === 'categories' 
                    ? 'opacity-100 transform translate-y-0 block'
                    : 'opacity-0 transform translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                {menuItems.categories.subcategories.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#fa929d] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </li>

            {/* About Us */}
            <li>
              <a href={menuItems.about.link} className="text-gray-700 hover:text-[#fa929d] transition-colors duration-300">
                {menuItems.about.name}
              </a>
            </li>

            {/* Contact Us */}
            <li>
              <a href={menuItems.contact.link} className="text-gray-700 hover:text-[#fa929d] transition-colors duration-300">
                {menuItems.contact.name}
              </a>
            </li>

            {/* Blog Dropdown */}
            <li className="relative group" ref={activeDropdown === 'blog' ? dropdownRef : null}>
              <button 
                className="flex items-center text-gray-700 hover:text-[#fa929d] focus:outline-none transition-colors duration-300"
                onClick={() => toggleDropdown('blog')}
              >
                {menuItems.blog.name}
                <IonIcon icon={chevronDownOutline} className="ml-1 text-sm transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div 
                className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300 z-50 ${
                  activeDropdown === 'blog' 
                    ? 'opacity-100 transform translate-y-0 block'
                    : 'opacity-0 transform translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible'
                }`}
              >
                {menuItems.blog.subcategories.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#fa929d] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>

        <div className="flex items-center mt-5 space-x-6">
          <a href="/UserProfile" className="flex items-center space-x-2">
            <IonIcon icon={settingsOutline} className="text-2xl text-[#fa929d] hover:text-gray-700 transition-colors duration-300" />
          </a>
          <div className="relative cursor-pointer group" onClick={handleCartClick}>
            <IonIcon icon={bagHandleOutline} className="text-2xl text-[#fa929d] hover:text-gray-700 transition-colors duration-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            {notification && (
              <div className="absolute -top-10 right-0 bg-green-500 text-white text-xs rounded-full p-1 animate-bounce">
                {notification.message}
              </div>
            )}
          </div>

          <form className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#fa929d]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-lg lg:hidden z-50">
            <ul className="flex flex-col py-4">
              {/* Mobile Home Pages Dropdown */}
              <li className="w-full">
                <button 
                  className="text-gray-700 hover:text-[#fa929d] font-medium transition-all duration-300 flex items-center justify-between w-full px-6 py-3"
                  onClick={() => toggleDropdown('mobileHome')}
                >
                  {menuItems.home.name}
                  <IonIcon icon={chevronDownOutline} className={`ml-1 text-sm transition-transform duration-300 ${activeDropdown === 'mobileHome' ? 'transform rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobileHome' && (
                  <div className="bg-gray-50 w-full py-2">
                    {menuItems.home.subcategories.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link} 
                        className="block py-2 px-10 text-gray-600 hover:text-[#fa929d] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile Products Dropdown */}
              <li className="w-full">
                <button 
                  className="text-gray-700 hover:text-[#fa929d] font-medium transition-all duration-300 flex items-center justify-between w-full px-6 py-3"
                  onClick={() => toggleDropdown('mobileProducts')}
                >
                  {menuItems.products.name}
                  <IonIcon icon={chevronDownOutline} className={`ml-1 text-sm transition-transform duration-300 ${activeDropdown === 'mobileProducts' ? 'transform rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobileProducts' && (
                  <div className="bg-gray-50 w-full py-2">
                    {menuItems.products.subcategories.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link} 
                        className="block py-2 px-10 text-gray-600 hover:text-[#fa929d] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile Categories Dropdown */}
              <li className="w-full">
                <button 
                  className="text-gray-700 hover:text-[#fa929d] font-medium transition-all duration-300 flex items-center justify-between w-full px-6 py-3"
                  onClick={() => toggleDropdown('mobileCategories')}
                >
                  {menuItems.categories.name}
                  <IonIcon icon={chevronDownOutline} className={`ml-1 text-sm transition-transform duration-300 ${activeDropdown === 'mobileCategories' ? 'transform rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobileCategories' && (
                  <div className="bg-gray-50 w-full py-2">
                    {menuItems.categories.subcategories.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link} 
                        className="block py-2 px-10 text-gray-600 hover:text-[#fa929d] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>

              {/* Mobile About Us */}
              <li className="w-full">
                <a 
                  href={menuItems.about.link} 
                  className="block px-6 py-3 text-gray-700 hover:text-[#fa929d] font-medium transition-colors duration-300"
                >
                  {menuItems.about.name}
                </a>
              </li>

              {/* Mobile Contact Us */}
              <li className="w-full">
                <a 
                  href={menuItems.contact.link} 
                  className="block px-6 py-3 text-gray-700 hover:text-[#fa929d] font-medium transition-colors duration-300"
                >
                  {menuItems.contact.name}
                </a>
              </li>

              {/* Mobile Blog Dropdown */}
              <li className="w-full">
                <button 
                  className="text-gray-700 hover:text-[#fa929d] font-medium transition-all duration-300 flex items-center justify-between w-full px-6 py-3"
                  onClick={() => toggleDropdown('mobileBlog')}
                >
                  {menuItems.blog.name}
                  <IonIcon icon={chevronDownOutline} className={`ml-1 text-sm transition-transform duration-300 ${activeDropdown === 'mobileBlog' ? 'transform rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'mobileBlog' && (
                  <div className="bg-gray-50 w-full py-2">
                    {menuItems.blog.subcategories.map((item, index) => (
                      <a 
                        key={index}
                        href={item.link} 
                        className="block py-2 px-10 text-gray-600 hover:text-[#fa929d] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
              
              {/* Mobile Search */}
              <li className="w-full px-6 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fa929d] focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#fa929d]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;