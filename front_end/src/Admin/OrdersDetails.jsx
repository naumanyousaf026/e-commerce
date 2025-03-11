import React, { useState } from 'react';
import { BiSearch, BiDownload, BiFilter } from 'react-icons/bi';
import { HiOutlineShoppingBag, HiOutlineCalendar, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineExclamation } from 'react-icons/hi';
import { FiEye, FiPackage, FiTruck, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const OrdersDetailsPage = () => {
  // Sample orders data - this would come from your API in a real application
  const [orders, setOrders] = useState([
    {
      id: 'ORD-39271',
      customer: {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com'
      },
      date: '2025-03-05T14:30:00',
      status: 'delivered',
      items: 3,
      total: 124.50,
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      shippingAddress: '123 Broadway, New York, NY 10001, USA'
    },
    {
      id: 'ORD-38492',
      customer: {
        id: 2,
        name: 'Emma Johnson',
        email: 'emma.j@example.com'
      },
      date: '2025-03-06T09:15:00',
      status: 'processing',
      items: 2,
      total: 89.99,
      paymentMethod: 'PayPal',
      paymentStatus: 'paid',
      shippingAddress: '45 Oxford St, London W1D 1BT, UK'
    },
    {
      id: 'ORD-38103',
      customer: {
        id: 3,
        name: 'Michael Chen',
        email: 'michael.c@example.com'
      },
      date: '2025-03-07T10:45:00',
      status: 'shipped',
      items: 5,
      total: 215.75,
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      shippingAddress: '789 Bay St, Toronto, ON M5G 2N8, Canada'
    },
    {
      id: 'ORD-37954',
      customer: {
        id: 4,
        name: 'Sofia Rodriguez',
        email: 'sofia.r@example.com'
      },
      date: '2025-03-08T16:20:00',
      status: 'cancelled',
      items: 1,
      total: 49.99,
      paymentMethod: 'Credit Card',
      paymentStatus: 'refunded',
      shippingAddress: 'Calle Gran Vía, 41, 28013 Madrid, Spain'
    },
    {
      id: 'ORD-37822',
      customer: {
        id: 5,
        name: 'Ahmed Hassan',
        email: 'ahmed.h@example.com'
      },
      date: '2025-03-09T11:10:00',
      status: 'pending',
      items: 4,
      total: 187.20,
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'pending',
      shippingAddress: '123 Tahrir Square, Cairo, Egypt'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);
  
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
  
  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle nested properties like customer.name
      if (sortField === 'customer') {
        aValue = a.customer.name;
        bValue = b.customer.name;
      }
      
      // Handle date comparison
      if (sortField === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }
      
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
  // Get initial for customer avatar
  const getInitials = (name) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // Get random pastel color based on user id for consistent colors
  const getAvatarColor = (userId) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-purple-100 text-purple-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-pink-100 text-pink-600',
      'bg-indigo-100 text-indigo-600',
      'bg-red-100 text-red-600',
      'bg-orange-100 text-orange-600'
    ];
    return colors[userId % colors.length];
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
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      Order ID
                      {sortField === 'id' && (
                        sortDirection === 'asc' ? 
                        <HiOutlineChevronUp className="ml-1" /> : 
                        <HiOutlineChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('customer')}
                  >
                    <div className="flex items-center">
                      Customer
                      {sortField === 'customer' && (
                        sortDirection === 'asc' ? 
                        <HiOutlineChevronUp className="ml-1" /> : 
                        <HiOutlineChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center">
                      Order Date
                      {sortField === 'date' && (
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
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center">
                      Total
                      {sortField === 'total' && (
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
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 ${getAvatarColor(order.customer.id)} rounded-full flex items-center justify-center font-semibold`}>
                            {getInitials(order.customer.name)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                            <div className="text-sm text-gray-500">{order.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <HiOutlineCalendar className="mr-2 text-gray-500" />
                          {formatDate(order.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                        <div className="text-xs text-gray-500">{order.items} item{order.items !== 1 ? 's' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusStyle(order.paymentStatus)}`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{order.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                            <FiEye className="mr-1" /> View
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                            onClick={() => toggleOrderDetails(order.id)}
                          >
                            {expandedOrder === order.id ? (
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
                    {expandedOrder === order.id && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                              <h4 className="font-semibold text-gray-700 mb-2">Shipping Address</h4>
                              <p className="text-gray-600">{order.shippingAddress}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                              <h4 className="font-semibold text-gray-700 mb-2">Order Timeline</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                    <FiCheckCircle className="text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Order Placed</p>
                                    <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                                  </div>
                                </div>
                                {order.status !== 'cancelled' && (order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') && (
                                  <div className="flex items-start">
                                    <div className={`w-8 h-8 rounded-full ${order.status === 'pending' ? 'bg-gray-100' : 'bg-green-100'} flex items-center justify-center mr-2`}>
                                      <FiPackage className={order.status === 'pending' ? 'text-gray-400' : 'text-green-600'} />
                                    </div>
                                    <div>
                                      <p className={`font-medium ${order.status === 'pending' ? 'text-gray-400' : ''}`}>Processing</p>
                                      {order.status !== 'pending' && <p className="text-xs text-gray-500">March 6, 2025, 10:30 AM</p>}
                                    </div>
                                  </div>
                                )}
                                {order.status !== 'cancelled' && (order.status === 'shipped' || order.status === 'delivered') && (
                                  <div className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                      <FiTruck className="text-green-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium">Shipped</p>
                                      <p className="text-xs text-gray-500">March 7, 2025, 2:15 PM</p>
                                    </div>
                                  </div>
                                )}
                                {order.status === 'delivered' && (
                                  <div className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                      <FiCheckCircle className="text-green-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium">Delivered</p>
                                      <p className="text-xs text-gray-500">March 9, 2025, 11:45 AM</p>
                                    </div>
                                  </div>
                                )}
                                {order.status === 'cancelled' && (
                                  <div className="flex items-start">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                                      <FiAlertTriangle className="text-red-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium">Cancelled</p>
                                      <p className="text-xs text-gray-500">March 8, 2025, 5:30 PM</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
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