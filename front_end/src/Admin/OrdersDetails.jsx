import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSearch, BiDownload, BiFilter } from 'react-icons/bi';
import { HiOutlineShoppingBag, HiOutlineCalendar, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineExclamation } from 'react-icons/hi';
import { FiEye, FiPackage, FiTruck, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const OrdersDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        console.log("Fetched Orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Set to empty array on error
      }
    };

    fetchOrders();
  }, []);

  // Filter and sort orders
  const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) : [];

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get status styles
  const getStatusStyle = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status styles
  const getPaymentStatusStyle = (status) => {
    switch(status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <HiOutlineExclamation className="mr-1" />;
      case 'processing':
        return <FiPackage className="mr-1" />;
      case 'shipped':
        return <FiTruck className="mr-1" />;
      case 'delivered':
        return <FiCheckCircle className="mr-1" />;
      case 'cancelled':
        return <FiAlertTriangle className="mr-1" />;
      default:
        return null;
    }
  };

  // Get initial for customer avatar
  const getInitials = (name) => {
    if (!name) return ''; // Return empty string if name is undefined
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Toggle order details expansion
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-2">
              <HiOutlineShoppingBag className="mr-3 text-indigo-600 text-4xl" />
              Orders Management
            </h1>
            <p className="text-gray-500">Track and manage all customer orders</p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-white rounded-xl shadow-sm p-3 flex space-x-4 border border-gray-100">
            <div className="flex flex-col items-center px-4 border-r border-gray-200">
              <span className="text-xl font-bold text-gray-800">{orders.length}</span>
              <span className="text-xs text-gray-500">Total Orders</span>
            </div>
            <div className="flex flex-col items-center px-4 border-r border-gray-200">
              <span className="text-xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</span>
              <span className="text-xs text-gray-500">Delivered</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-xl font-bold text-yellow-600">{orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length}</span>
              <span className="text-xs text-gray-500">In Progress</span>
            </div>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by order ID, customer name or email..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-4 py-2">
              <BiFilter className="mr-2 text-gray-500" />
              <select 
                className="bg-transparent focus:outline-none text-gray-700"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <button className="flex items-center bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              <BiDownload className="mr-2" />
              Export Orders
            </button>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('_id')}
                  >
                    <div className="flex items-center">
                      Order ID
                      {sortField === '_id' && (
                        sortDirection === 'asc' ? 
                        <HiOutlineChevronUp className="ml-1" /> : 
                        <HiOutlineChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('user')}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortField === 'user' && (
                        sortDirection === 'asc' ? 
                        <HiOutlineChevronUp className="ml-1" /> : 
                        <HiOutlineChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center">
                      Order Date
                      {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? 
                        <HiOutlineChevronUp className="ml-1" /> : 
                        <HiOutlineChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('totalAmount')}
                  >
                    <div className="flex items-center">
                      Total
                      {sortField === 'totalAmount' && (
                        sortDirection === 'asc' ? 
                        <HiOutlineChevronUp className="ml-1" /> : 
                        <HiOutlineChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <React.Fragment key={order._id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-semibold`}>
                            {getInitials(order.user?.name)} {/* Use optional chaining */}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.user?.name || 'Unknown User'}</div> {/* Default value */}
                            <div className="text-sm text-gray-500">{order.user?.email || 'No Email'}</div> {/* Default value */}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <HiOutlineCalendar className="mr-2 text-gray-500" />
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                        <div className="text-xs text-gray-500">{order.products.length} item{order.products.length !== 1 ? 's' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'Unknown'} {/* Default value */}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{order.paymentMethod || 'No Payment Method'}</div> {/* Default value */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                            <FiEye className="mr-1" /> View
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                            onClick={() => toggleOrderDetails(order._id)}
                          >
                            {expandedOrder === order._id ? (
                              <>
                                <HiOutlineChevronUp className="mr-1" /> Hide
                              </>
                            ) : (
                              <>
                                <HiOutlineChevronDown className="mr-1" /> Details
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                              <h4 className="font-semibold text-gray-700 mb-2">Shipping Address</h4>
                              <p className="text-gray-600">{order.address || 'No Address Provided'}</p> {/* Default value */}
                            </div>
                            {/* Other details... */}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="mb-4 text-gray-400">
                <HiOutlineShoppingBag className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          {/* Pagination Controls */}
          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex-1 flex justify-between items-center">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Previous
              </button>
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{filteredOrders.length}</span> results
              </div>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetailsPage;