import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle,
  UserCheck,
  UserX,
  Crown,
  Star,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'react-toastify';

const AdvancedUserPermissions = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Mock data initialization
  useEffect(() => {
    // Initialize permissions
    const initialPermissions = [
      { id: 'user_read', name: 'View Users', category: 'User Management', description: 'Can view user profiles and information' },
      { id: 'user_write', name: 'Manage Users', category: 'User Management', description: 'Can create, edit, and delete users' },
      { id: 'user_permissions', name: 'User Permissions', category: 'User Management', description: 'Can modify user permissions and roles' },
      { id: 'security_read', name: 'View Security Logs', category: 'Security', description: 'Can view security logs and alerts' },
      { id: 'security_write', name: 'Manage Security', category: 'Security', description: 'Can modify security settings and policies' },
      { id: 'system_read', name: 'View System Health', category: 'System', description: 'Can view system performance metrics' },
      { id: 'system_write', name: 'System Administration', category: 'System', description: 'Can modify system configurations' },
      { id: 'comms_read', name: 'View Communications', category: 'Communications', description: 'Can view communication logs' },
      { id: 'comms_write', name: 'Manage Communications', category: 'Communications', description: 'Can send broadcasts and manage communications' },
      { id: 'audit_read', name: 'View Audit Logs', category: 'Audit', description: 'Can view audit trails and compliance reports' },
      { id: 'dashboard_admin', name: 'Dashboard Admin', category: 'Administration', description: 'Full administrative access to dashboard' }
    ];

    // Initialize roles
    const initialRoles = [
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Full system access and control',
        permissions: initialPermissions.map(p => p.id),
        color: 'red',
        userCount: 2,
        priority: 100
      },
      {
        id: 'security_officer',
        name: 'Security Officer',
        description: 'Security monitoring and management',
        permissions: ['user_read', 'security_read', 'security_write', 'audit_read', 'comms_read'],
        color: 'blue',
        userCount: 5,
        priority: 80
      },
      {
        id: 'operator',
        name: 'System Operator',
        description: 'System monitoring and basic operations',
        permissions: ['user_read', 'security_read', 'system_read', 'comms_read'],
        color: 'green',
        userCount: 12,
        priority: 60
      },
      {
        id: 'analyst',
        name: 'Security Analyst',
        description: 'Security analysis and reporting',
        permissions: ['security_read', 'audit_read', 'system_read'],
        color: 'yellow',
        userCount: 8,
        priority: 40
      },
      {
        id: 'viewer',
        name: 'Read-Only Viewer',
        description: 'View-only access to basic information',
        permissions: ['user_read', 'security_read', 'system_read'],
        color: 'gray',
        userCount: 15,
        priority: 20
      }
    ];

    // Initialize users
    const initialUsers = [
      {
        id: 1,
        name: 'Major Singh',
        email: 'singh@suraksha.mil',
        role: 'admin',
        status: 'active',
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
        permissions: ['dashboard_admin'],
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=major'
      },
      {
        id: 2,
        name: 'Captain Sharma',
        email: 'sharma@suraksha.mil',
        role: 'security_officer',
        status: 'active',
        lastLogin: new Date(Date.now() - 30 * 60 * 1000),
        permissions: [],
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=captain'
      },
      {
        id: 3,
        name: 'Lieutenant Kumar',
        email: 'kumar@suraksha.mil',
        role: 'operator',
        status: 'active',
        lastLogin: new Date(Date.now() - 5 * 60 * 1000),
        permissions: [],
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lieutenant'
      },
      {
        id: 4,
        name: 'Sergeant Patel',
        email: 'patel@suraksha.mil',
        role: 'analyst',
        status: 'inactive',
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
        permissions: [],
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sergeant'
      }
    ];

    setPermissions(initialPermissions);
    setRoles(initialRoles);
    setUsers(initialUsers);
  }, []);

  const getRoleColor = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role?.color || 'gray';
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role?.name || 'Unknown Role';
  };

  const getUserPermissions = (user) => {
    const role = roles.find(r => r.id === user.role);
    const rolePermissions = role ? role.permissions : [];
    return [...new Set([...rolePermissions, ...user.permissions])];
  };

  const toggleUserPermission = (userId, permissionId) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const hasPermission = user.permissions.includes(permissionId);
        return {
          ...user,
          permissions: hasPermission 
            ? user.permissions.filter(p => p !== permissionId)
            : [...user.permissions, permissionId]
        };
      }
      return user;
    }));
    toast.success('Permission updated successfully', { theme: 'dark' });
  };

  const changeUserRole = (userId, newRoleId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRoleId } : user
    ));
    toast.success('User role updated successfully', { theme: 'dark' });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="modern-card p-6 border border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Advanced User Permissions</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateRole(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Role</span>
          </motion.button>
        </div>
        <p className="text-gray-400">Manage user roles, permissions, and access control policies</p>
      </div>

      {/* Search and Filter */}
      <div className="modern-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none text-white min-w-48"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Roles Overview */}
        <div className="modern-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Crown className="h-5 w-5 text-yellow-400 mr-2" />
            Security Roles
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedRole?.id === role.id 
                    ? `border-${role.color}-500/40 bg-${role.color}-500/10` 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 bg-${role.color}-400 rounded-full`}></div>
                    <span className="font-medium text-white">{role.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{role.userCount} users</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{role.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{role.permissions.length} permissions</span>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, Math.floor(role.priority / 20)) }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="xl:col-span-2 modern-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="h-5 w-5 text-green-400 mr-2" />
            User Permissions ({filteredUsers.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredUsers.map((user, index) => {
              const userPermissions = getUserPermissions(user);
              const roleColor = getRoleColor(user.role);
              
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedUser?.id === user.id 
                      ? 'border-blue-500/40 bg-blue-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-600"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{user.name}</span>
                          {user.status === 'active' ? (
                            <UserCheck className="h-4 w-4 text-green-400" />
                          ) : (
                            <UserX className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <select
                        value={user.role}
                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                        className={`px-3 py-1 rounded text-xs font-medium bg-${roleColor}-500/20 text-${roleColor}-400 border border-${roleColor}-500/30`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Last login: {user.lastLogin.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {userPermissions.length} permissions
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected User Permissions Detail */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="modern-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Key className="h-5 w-5 text-yellow-400 mr-2" />
                Detailed Permissions for {selectedUser.name}
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-white border-b border-gray-600 pb-2">
                    {category}
                  </h4>
                  {categoryPermissions.map(permission => {
                    const hasPermission = getUserPermissions(selectedUser).includes(permission.id);
                    const isFromRole = roles.find(r => r.id === selectedUser.role)?.permissions.includes(permission.id);
                    const isCustom = selectedUser.permissions.includes(permission.id);
                    
                    return (
                      <div
                        key={permission.id}
                        className={`p-3 rounded-lg border transition-all ${
                          hasPermission 
                            ? 'border-green-500/30 bg-green-500/10' 
                            : 'border-gray-600 bg-gray-800/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-white">
                                {permission.name}
                              </span>
                              {isFromRole && (
                                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                                  Role
                                </span>
                              )}
                              {isCustom && (
                                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                                  Custom
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">{permission.description}</p>
                          </div>
                          <button
                            onClick={() => toggleUserPermission(selectedUser.id, permission.id)}
                            disabled={isFromRole && !isCustom}
                            className={`ml-2 p-1 rounded transition-colors ${
                              hasPermission 
                                ? 'text-green-400 hover:text-green-300' 
                                : 'text-gray-500 hover:text-gray-400'
                            } ${isFromRole && !isCustom ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            {hasPermission ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdvancedUserPermissions;