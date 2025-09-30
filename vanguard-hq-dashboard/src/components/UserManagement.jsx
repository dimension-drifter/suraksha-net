import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, User, UserPlus } from 'lucide-react';
import { generateMockUsers } from '../utils/mockData';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState(generateMockUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.rank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (userId, newStatus) => {
    setLoading(`status-${userId}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    setLoading(null);
    toast.success(`User status updated to ${newStatus}`, {
      position: "top-right",
      theme: "light"
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { class: 'bg-green-500/20 text-green-400 border border-green-500/30', label: 'Active' },
      suspended: { class: 'bg-red-500/20 text-red-400 border border-red-500/30', label: 'Suspended' },
      pending: { class: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', label: 'Pending' }
    };
    return badges[status] || badges.active;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">User Accounts Management</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="modern-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, rank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="modern-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-600">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-300">User</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-300">Rank</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-300">Last Seen</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.slice(0, 10).map((user, index) => {
                const statusBadge = getStatusBadge(user.status);
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border-2 border-gray-600"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-300">{user.rank}</span>
                    </td>
                    <td className="py-4 px-6">
                      {loading === `status-${user.id}` ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-gray-400">Updating...</span>
                        </div>
                      ) : (
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${statusBadge.class} bg-transparent`}
                        >
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="pending">Pending</option>
                        </select>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400">
                      {user.lastSeen.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded text-xs hover:bg-blue-600/30 transition-colors"
                        >
                          Lock
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded text-xs hover:bg-red-600/30 transition-colors"
                        >
                          Logout
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserManagement;