import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Settings, 
  User, 
  Clock, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut,
  CheckCircle,
  ShoppingBag,
  AlertCircle,
  Truck,
  Camera,
  Gift,
  Star,
  Calendar
} from 'lucide-react';
import SmallHeader from '../home/SmallHeader';
import Avatar from 'react-avatar';
import Footer from "../home/Footer";

const API_BASE_URL = 'http://localhost:5000';

// Function to get random user avatar
const getRandomUserAvatar = (userId, name) => {
  // If we have a user ID, use it for consistency
  const seed = userId || name || Math.random().toString();
  return <Avatar 
    name={name || 'User'} 
    size="160" 
    round={true}
    src={`https://i.pravatar.cc/400?u=${seed}`} // Uses pravatar.cc for consistent but random avatars
  />;
};

// Function to get random product image
const getRandomProductImage = (productId, productName) => {
  // Create a seed based on product info for consistent random images
  const seed = productId || (productName ? productName.replace(/\s+/g, '') : '');
  const imageId = seed ? 
    parseInt(seed.split('').map(c => c.charCodeAt(0)).reduce((a, b) => a + b, 0) % 1000) : 
    Math.floor(Math.random() * 1000);
  
  return `https://picsum.photos/seed/${imageId}/400/400`;
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserData(response.data); // Update userData with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Logout handling function
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page or home page
    window.location.href = '/login';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case "Pending": return <AlertCircle size={18} className="text-yellow-500" />;
      case "Processing": return <Clock size={18} className="text-blue-500" />;
      case "Shipped": return <Truck size={18} className="text-indigo-500" />;
      case "Delivered": return <CheckCircle size={18} className="text-green-500" />;
      case "Cancelled": return <AlertCircle size={18} className="text-red-500" />;
      default: return <Clock size={18} className="text-gray-500" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "Delivered": return "bg-green-100 text-green-800 border-green-200";
      case "Shipped": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SmallHeader pageTitle="My Account" />

      <div className="max-w-7xl mx-auto px-4 py-4 bg-white shadow-sm">
        <div className="flex flex-wrap">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`mr-6 pb-2 font-medium flex items-center transition-all duration-300 ${activeTab === 'profile' ? 'text-[#fa929d] border-b-2 border-[#fa929d] scale-105' : 'text-gray-600 hover:text-[#fa929d]'}`}
          >
            <User size={18} className="mr-2" />
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`mr-6 pb-2 font-medium flex items-center transition-all duration-300 ${activeTab === 'orders' ? 'text-[#fa929d] border-b-2 border-[#fa929d] scale-105' : 'text-gray-600 hover:text-[#fa929d]'}`}
          >
            <ShoppingBag size={18} className="mr-2" />
            Order History
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'profile' && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <div className="p-8">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#fff5f6] shadow-md group-hover:border-[#fa929d] transition-all duration-300">
                      {userData.profileImage ? (
                        <img
                          src={userData.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        // Using random avatar if no profile image
                        <div className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500">
                          {getRandomUserAvatar(userData._id, userData.name)}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-[#fa929d] p-2 rounded-full text-white cursor-pointer hover:bg-[#e87e89] transition-colors shadow-md">
                      <Camera size={16} />
                    </div>
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-gray-800">{userData.name}</h2>
                  <p className="text-sm text-gray-500 mb-4 flex items-center">
                    <Calendar size={14} className="mr-1 text-[#fa929d]" />
                    Member since {userData.joinDate}
                  </p>
                  
                  <div className="w-full bg-[#fa929d] p-4 rounded-xl text-white shadow-md mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Rewards Points</span>
                      <Gift size={18} />
                    </div>
                    <div className="text-2xl font-bold">{userData.rewardPoints}</div>
                    <div className="mt-2 text-xs">
                      <div className="w-full bg-white/30 h-2 rounded-full overflow-hidden">
                        <div className="bg-white h-full rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <span>Current Tier</span>
                        <span>135 points to next reward</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 w-full flex flex-col space-y-3">
                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-[#fa929d] text-white hover:bg-[#e87e89] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </button>
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow transform hover:-translate-y-1"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-8">
                  <h3 className="text-xl font-medium text-gray-800 mb-6 flex items-center">
                    <span className="bg-[#fff5f6] p-2 rounded-lg mr-3 text-[#fa929d]">
                      <User  size={18} />
                    </span>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#fa929d] p-2 rounded-full text-white mr-3">
                          <User  size={16} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                      </div>
                      <p className="text-gray-900 font-medium pl-10">{userData.name}</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#fa929d] p-2 rounded-full text-white mr-3">
                          <Mail size={16} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                      </div>
                      <p className="text-gray-900 font-medium pl-10">{userData.email}</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#fa929d] p-2 rounded-full text-white mr-3">
                          <Phone size={16} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      </div>
                      <p className="text-gray-900 font-medium pl-10">{userData.phone}</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-[#fa929d] p-2 rounded-full text-white mr-3">
                          <MapPin size={16} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                      </div>
                      <p className="text-gray-900 font-medium pl-10">{userData.address}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button className="bg-[#fa929d] text-white px-8 py-3 rounded-lg hover:bg-[#e87e89] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
            <div className="p-8">
              <h3 className="text-xl font-medium text-gray-800 mb-6 flex items-center">
                <span className="bg-[#fff5f6] p-2 rounded-lg mr-3 text-[#fa929d]">
                  <ShoppingBag size={18} />
                </span>
                Your Order History
              </h3>
              
              {Array.isArray(orders) && orders.length > 0 ? (
                <div className="space-y-8">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="bg-gradient-to-r from-[#ffffff] to-[#fff5f6] p-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div>
                            <span className="text-sm text-gray-500">Order ID:</span>
                            <span className="ml-2 font-medium text-[#fa929d]">{order._id}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Placed on:</span>
                            <span className="ml-2 font-medium">{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center mt-2 sm:mt-0">
                            <span className="text-sm text-gray-500 mr-2">Status:</span>
                            <div className={`flex items-center px-3 py-1 rounded-full ${getStatusClass(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 font-medium text-sm">{order.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        {order.products.map((item, index) => (
                          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-100 last:border-0 hover:bg-[#fff5f6] transition-colors rounded-lg p-2">
                            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                              <div className="relative overflow-hidden rounded-lg w-24 h-24 border border-gray-200 shadow-sm group">
                                <img 
                                  src={item.product.image || getRandomProductImage(item.product._id, item.product.name)}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                                />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-semibold text-gray-800 hover:text-[#fa929d] transition-colors cursor-pointer">{item.product.name}</h4>
                              <div className="flex items-center mt-1 mb-2">
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <span className="text-xs text-gray-500 ml-1">(12 reviews)</span>
                              </div>
                              <div className="flex items-center">
                                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                <span className="mx-2 text-gray-300">|</span>
                                <p className="text-[#fa929d] font-medium">${item.product.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="mt-4 sm:mt-0">
                              <button className="px-4 py-2 border border-[#fa929d] text-[#fa929d] rounded-lg hover:bg-[#fa929d] hover:text-white transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-1">
                                Buy Again
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-[#ffffff] to-[#fff5f6] p-5 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                          <div className="flex items-center mb-4 sm:mb-0">
                            <div className="bg-white p-2 rounded-lg border border-gray-200 mr-3">
                              <CreditCard size={18} className="text-[#fa929d]" />
                            </div>
                            <span className="text-gray-700 font-medium">{order.paymentMethod}</span>
                          </div>
                          <div className="flex flex-col sm:items-end">
                            <span className="text-sm text-gray-500">Total Amount:</span>
                            <span className="text-2xl font-bold text-[#fa929d]">${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-xl text-center border border-gray-200 shadow-inner">
                  <div className="bg-[#fff5f6] p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={48} className="text-[#fa929d]" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't placed any orders yet. Browse our collection to find your perfect products.</p>
                  <button className="bg-[#fa929d] text-white px-8 py-3 rounded-lg hover:bg-[#e87e89] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;