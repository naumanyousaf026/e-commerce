import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';
import { RiUserSearchLine } from 'react-icons/ri';
import { HiOutlineDownload } from 'react-icons/hi';
import { FiEye, FiEdit2 } from 'react-icons/fi';

const UserDetailsPage = () => {
  // Sample user data - this would come from your API in a real application
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      lastLogin: '2025-03-09T14:30:00',
      status: 'active',
      orders: 12,
      totalSpent: 1240.50,
      joinDate: '2024-11-15',
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      lastLogin: '2025-03-08T09:15:00',
      status: 'active',
      orders: 8,
      totalSpent: 780.25,
      joinDate: '2024-12-03',
      location: 'London, UK'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      lastLogin: '2025-03-10T10:45:00',
      status: 'active',
      orders: 5,
      totalSpent: 450.00,
      joinDate: '2025-01-20',
      location: 'Toronto, Canada'
    },
    {
      id: 4,
      name: 'Sofia Rodriguez',
      email: 'sofia.r@example.com',
      lastLogin: '2025-03-01T16:20:00',
      status: 'inactive',
      orders: 3,
      totalSpent: 275.75,
      joinDate: '2025-02-05',
      location: 'Madrid, Spain'
    },
    {
      id: 5,
      name: 'Ahmed Hassan',
      email: 'ahmed.h@example.com',
      lastLogin: '2025-03-07T11:10:00',
      status: 'active',
      orders: 9,
      totalSpent: 920.30,
      joinDate: '2024-10-30',
      location: 'Cairo, Egypt'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time to be more readable
  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  
  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get user initials for avatar
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
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-2">
              <RiUserSearchLine className="mr-3 text-indigo-600 text-4xl" />
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
              <span className="text-xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</span>
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="flex flex-col items-center px-4">
              <span className="text-xl font-bold text-red-600">{users.filter(u => u.status === 'inactive').length}</span>
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
                placeholder="Search users by name, email or location..."
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-12 w-12 ${getAvatarColor(user.id)} rounded-full flex items-center justify-center font-semibold text-lg`}>
                          {getInitials(user.name)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                        {user.orders}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${user.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3 inline-flex items-center">
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
      </div>
    </div>
  );
};

export default UserDetailsPage;