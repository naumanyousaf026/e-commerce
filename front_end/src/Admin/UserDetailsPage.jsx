import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiFilter, FiEye, FiEdit2 } from 'react-icons/fi';
import { HiOutlineDownload } from 'react-icons/hi';
import axios from 'axios';

const UserDetailsPage = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [orderStatusUpdate, setOrderStatusUpdate] = useState({});

  // Fetch users and orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        // Fetch users
        const usersResponse = await axios.get('http://localhost:5000/api/auth/users', { headers });
        if (Array.isArray(usersResponse.data)) {
          setUsers(usersResponse.data);
        } else {
          console.error("Unexpected users response format:", usersResponse.data);
          setUsers([]);
        }
        
        // Fetch orders
        const ordersResponse = await axios.get('http://localhost:5000/api/orders', { headers });
        if (Array.isArray(ordersResponse.data)) {
          setOrders(ordersResponse.data);
        } else {
          console.error("Unexpected orders response format:", ordersResponse.data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Update order status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local orders state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      // Clear the status update state for this order
      setOrderStatusUpdate({ ...orderStatusUpdate, [orderId]: '' });
      
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get user orders
  const getUserOrders = (userId) => {
    return orders.filter(order => order.user._id === userId);
  };

  // Get user's last address from orders
  const getUserAddress = (userId) => {
    const userOrders = getUserOrders(userId);
    return userOrders.length > 0 ? userOrders[0].address : 'N/A';
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time to be more readable
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
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
    const hashValue = userId ? userId.charCodeAt(0) % colors.length : 0;
    return colors[hashValue];
  };

  // Handle view user details
  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-2">
              User Management
            </h1>
            <p className="text-gray-500">Manage your platform users efficiently</p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-white rounded-xl shadow-sm p-3 flex space-x-4 border border-gray-100">
            <div className="flex flex-col items-center px-4 border-r border-gray-200">
              <span className="text-xl font-bold text-gray-800">{users.length}</span>
              <span className="text-xs text-gray-500">Total Users</span>
            </div>
            <div className="flex flex-col items-center px-4 border-r border-gray-200">
              <span className="text-xl font-bold text-green-600">{users.filter(u => u.status === 'active').length || users.length}</span>
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-xl font-bold text-red-600">{users.filter(u => u.status === 'inactive').length || 0}</span>
              <span className="text-xs text-gray-500">Inactive</span>
            </div>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search users by name, email or phone..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-4 py-2">
              <FiFilter className="mr-2 text-gray-500" />
              <select 
                className="bg-transparent focus:outline-none text-gray-700"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Users</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            
            <button className="flex items-center bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
              <HiOutlineDownload className="mr-2" />
              Export Data
            </button>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-12 w-12 ${getAvatarColor(user._id)} rounded-full flex items-center justify-center font-semibold text-lg`}>
                          {getInitials(user.name)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getUserAddress(user._id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                        {getUserOrders(user._id).length}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center"
                        onClick={() => handleViewUserDetails(user)}
                      >
                        <FiEye className="mr-1" /> View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 inline-flex items-center">
                        <FiEdit2 className="mr-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="mb-4 text-gray-400">
                <BiSearch className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span> results
              </div>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* User Details Modal */}
        {isUserDetailsOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsUserDetailsOpen(false)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* User Information */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className={`h-24 w-24 ${getAvatarColor(selectedUser._id)} rounded-full flex items-center justify-center font-bold text-3xl mb-4 md:mb-0`}>
                    {getInitials(selectedUser.name)}
                  </div>
                  <div className="md:ml-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="text-lg font-semibold text-gray-900">{selectedUser.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="text-lg text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                        <p className="text-lg text-gray-900">{selectedUser.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Role</h3>
                        <p className="text-lg text-gray-900">{selectedUser.role || 'User'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                        <p className="text-lg text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
                        <p className="text-lg text-gray-900">{formatDateTime(selectedUser.lastLogin || 'N/A')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* User Orders */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Orders History</h3>
                
                {getUserOrders(selectedUser._id).length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {getUserOrders(selectedUser._id).map(order => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order._id.slice(-6).toUpperCase()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${order.totalAmount.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {order.address}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <select
                                  className="mr-2 border border-gray-300 rounded p-1 text-sm"
                                  value={orderStatusUpdate[order._id] || ''}
                                  onChange={(e) => setOrderStatusUpdate({
                                    ...orderStatusUpdate,
                                    [order._id]: e.target.value
                                  })}
                                >
                                  <option value="">Update status</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <button
                                  className="bg-indigo-600 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                  disabled={!orderStatusUpdate[order._id]}
                                  onClick={() => handleUpdateOrderStatus(order._id, orderStatusUpdate[order._id])}
                                >
                                  Update
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
                    <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">This user hasn't placed any orders yet.</p>
                  </div>
                )}
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button 
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setIsUserDetailsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;