import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Shield, 
  Key, 
  Settings, 
  Users, 
  Database, 
  FileText, 
  Globe, 
  Server, 
  Terminal, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter,
  Copy,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Crown,
  Zap,
  Building,
  MapPin,
  Clock,
  Target,
  Activity
} from 'lucide-react';
import { toast } from 'react-toastify';

const AccessControlManagement = () => {
  const [resources, setResources] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [accessMatrix, setAccessMatrix] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showCreatePolicy, setShowCreatePolicy] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    description: '',
    type: 'allow',
    resources: [],
    users: [],
    conditions: [],
    priority: 'medium'
  });

  // Mock data initialization
  useEffect(() => {
    const initializeData = () => {
      // Initialize users
      const userList = [
        { id: 1, name: 'Major Singh', email: 'singh@suraksha.mil', role: 'Administrator', clearanceLevel: 'Top Secret' },
        { id: 2, name: 'Captain Sharma', email: 'sharma@suraksha.mil', role: 'Security Officer', clearanceLevel: 'Secret' },
        { id: 3, name: 'Lieutenant Kumar', email: 'kumar@suraksha.mil', role: 'System Operator', clearanceLevel: 'Confidential' },
        { id: 4, name: 'Sergeant Patel', email: 'patel@suraksha.mil', role: 'Security Analyst', clearanceLevel: 'Secret' },
        { id: 5, name: 'Corporal Gupta', email: 'gupta@suraksha.mil', role: 'Operator', clearanceLevel: 'Restricted' }
      ];

      // Initialize resources
      const resourceList = [
        {
          id: 'dashboard',
          name: 'Main Dashboard',
          type: 'application',
          description: 'Core dashboard interface and navigation',
          icon: Activity,
          sensitivity: 'low',
          location: '/dashboard',
          owner: 'System Administrator',
          lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          accessCount: 1250,
          status: 'active'
        },
        {
          id: 'user_management',
          name: 'User Management System',
          type: 'application',
          description: 'User account creation, modification, and deletion',
          icon: Users,
          sensitivity: 'high',
          location: '/users',
          owner: 'Major Singh',
          lastModified: new Date(Date.now() - 5 * 60 * 60 * 1000),
          accessCount: 89,
          status: 'active'
        },
        {
          id: 'security_logs',
          name: 'Security Log Database',
          type: 'database',
          description: 'Classified security events and audit trails',
          icon: Database,
          sensitivity: 'critical',
          location: 'db://security_logs',
          owner: 'Captain Sharma',
          lastModified: new Date(Date.now() - 30 * 60 * 1000),
          accessCount: 456,
          status: 'active'
        },
        {
          id: 'comms_system',
          name: 'Communications Hub',
          type: 'service',
          description: 'Secure military communications and messaging',
          icon: Globe,
          sensitivity: 'critical',
          location: '/communications',
          owner: 'Security Operations',
          lastModified: new Date(Date.now() - 1 * 60 * 60 * 1000),
          accessCount: 234,
          status: 'active'
        },
        {
          id: 'intel_reports',
          name: 'Intelligence Reports',
          type: 'documents',
          description: 'Classified intelligence and threat assessments',
          icon: FileText,
          sensitivity: 'top-secret',
          location: '/reports/intelligence',
          owner: 'Intelligence Division',
          lastModified: new Date(Date.now() - 15 * 60 * 1000),
          accessCount: 67,
          status: 'restricted'
        },
        {
          id: 'system_config',
          name: 'System Configuration',
          type: 'service',
          description: 'Core system settings and infrastructure',
          icon: Settings,
          sensitivity: 'high',
          location: '/admin/config',
          owner: 'System Administrator',
          lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          accessCount: 23,
          status: 'active'
        }
      ];

      // Initialize policies
      const policyList = [
        {
          id: 'admin_full_access',
          name: 'Administrator Full Access',
          description: 'Complete system access for administrators',
          type: 'allow',
          priority: 'critical',
          resources: ['dashboard', 'user_management', 'security_logs', 'comms_system', 'intel_reports', 'system_config'],
          users: [1],
          conditions: [
            { type: 'time', value: 'business_hours' },
            { type: 'location', value: 'headquarters' },
            { type: 'clearance', value: 'top_secret' }
          ],
          status: 'active',
          createdBy: 'System',
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'security_officer_access',
          name: 'Security Officer Access',
          description: 'Security monitoring and user management access',
          type: 'allow',
          priority: 'high',
          resources: ['dashboard', 'user_management', 'security_logs', 'comms_system'],
          users: [2],
          conditions: [
            { type: 'time', value: 'extended_hours' },
            { type: 'clearance', value: 'secret' }
          ],
          status: 'active',
          createdBy: 'Major Singh',
          createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'operator_restricted',
          name: 'Operator Restricted Access',
          description: 'Basic operational access with monitoring',
          type: 'allow',
          priority: 'medium',
          resources: ['dashboard', 'security_logs'],
          users: [3, 5],
          conditions: [
            { type: 'time', value: 'business_hours' },
            { type: 'clearance', value: 'confidential' }
          ],
          status: 'active',
          createdBy: 'Captain Sharma',
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'intel_deny_policy',
          name: 'Intelligence Access Restriction',
          description: 'Deny access to intelligence reports for unauthorized personnel',
          type: 'deny',
          priority: 'critical',
          resources: ['intel_reports'],
          users: [3, 4, 5],
          conditions: [
            { type: 'clearance', value: 'below_secret' }
          ],
          status: 'active',
          createdBy: 'Intelligence Division',
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      ];

      // Generate access matrix
      const matrix = [];
      userList.forEach(user => {
        resourceList.forEach(resource => {
          const hasAccess = calculateAccess(user, resource, policyList);
          matrix.push({
            userId: user.id,
            resourceId: resource.id,
            access: hasAccess.allowed,
            reason: hasAccess.reason,
            lastAccessed: hasAccess.allowed ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null
          });
        });
      });

      setUsers(userList);
      setResources(resourceList);
      setPolicies(policyList);
      setAccessMatrix(matrix);
    };

    const calculateAccess = (user, resource, policies) => {
      // Simple access calculation based on policies
      const applicablePolicies = policies.filter(policy => 
        policy.users.includes(user.id) && policy.resources.includes(resource.id)
      );

      // Check for deny policies first (deny overrides allow)
      const denyPolicy = applicablePolicies.find(policy => policy.type === 'deny');
      if (denyPolicy) {
        return { allowed: false, reason: `Denied by policy: ${denyPolicy.name}` };
      }

      // Check for allow policies
      const allowPolicy = applicablePolicies.find(policy => policy.type === 'allow');
      if (allowPolicy) {
        return { allowed: true, reason: `Allowed by policy: ${allowPolicy.name}` };
      }

      // Default deny
      return { allowed: false, reason: 'No explicit policy found' };
    };

    initializeData();
  }, []);

  const getSensitivityColor = (sensitivity) => {
    switch (sensitivity) {
      case 'top-secret': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'secret': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'confidential': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'restricted': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'application': return Activity;
      case 'database': return Database;
      case 'service': return Server;
      case 'documents': return FileText;
      default: return Lock;
    }
  };

  const getUserAccess = (userId, resourceId) => {
    return accessMatrix.find(item => item.userId === userId && item.resourceId === resourceId);
  };

  const createPolicy = () => {
    const policy = {
      id: `policy_${Date.now()}`,
      ...newPolicy,
      status: 'active',
      createdBy: 'Current User',
      createdAt: new Date(),
      lastModified: new Date()
    };
    
    setPolicies(prev => [...prev, policy]);
    setNewPolicy({
      name: '',
      description: '',
      type: 'allow',
      resources: [],
      users: [],
      conditions: [],
      priority: 'medium'
    });
    setShowCreatePolicy(false);
    toast.success('Access policy created successfully', { theme: 'dark' });
  };

  const toggleResourceAccess = (userId, resourceId) => {
    setAccessMatrix(prev => prev.map(item => {
      if (item.userId === userId && item.resourceId === resourceId) {
        return {
          ...item,
          access: !item.access,
          reason: item.access ? 'Manually revoked' : 'Manually granted',
          lastAccessed: !item.access ? new Date() : item.lastAccessed
        };
      }
      return item;
    }));
    toast.success('Access permissions updated', { theme: 'dark' });
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="modern-card p-6 border border-red-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Lock className="h-6 w-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Access Control Management</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreatePolicy(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create Policy</span>
          </motion.button>
        </div>
        <p className="text-gray-400">Manage resource access policies, permissions matrices, and security enforcement</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="modern-card p-4 border border-blue-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Resources</p>
              <span className="text-2xl font-bold text-white">{resources.length}</span>
            </div>
            <Database className="h-8 w-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="modern-card p-4 border border-green-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Policies</p>
              <span className="text-2xl font-bold text-white">{policies.filter(p => p.status === 'active').length}</span>
            </div>
            <Shield className="h-8 w-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="modern-card p-4 border border-yellow-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Access Grants</p>
              <span className="text-2xl font-bold text-white">{accessMatrix.filter(m => m.access).length}</span>
            </div>
            <CheckCircle className="h-8 w-8 text-yellow-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="modern-card p-4 border border-red-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Access Denials</p>
              <span className="text-2xl font-bold text-white">{accessMatrix.filter(m => !m.access).length}</span>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="modern-card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 appearance-none text-white min-w-48"
            >
              <option value="all">All Types</option>
              <option value="application">Applications</option>
              <option value="database">Databases</option>
              <option value="service">Services</option>
              <option value="documents">Documents</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Resources List */}
        <div className="xl:col-span-2 modern-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Database className="h-5 w-5 text-blue-400 mr-2" />
            Protected Resources ({filteredResources.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredResources.map((resource, index) => {
              const ResourceIcon = getResourceIcon(resource.type);
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedResource?.id === resource.id 
                      ? 'border-red-500/40 bg-red-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedResource(resource)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <ResourceIcon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{resource.name}</span>
                          <span className={`text-xs px-2 py-1 rounded border ${getSensitivityColor(resource.sensitivity)}`}>
                            {resource.sensitivity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{resource.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">
                        Type: {resource.type}
                      </div>
                      <div className="text-xs text-gray-500">
                        {resource.accessCount} accesses
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <MapPin className="h-3 w-3" />
                        <span>{resource.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Users className="h-3 w-3" />
                        <span>{resource.owner}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{resource.lastModified.toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Access Policies */}
        <div className="modern-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="h-5 w-5 text-green-400 mr-2" />
            Access Policies ({policies.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPolicy?.id === policy.id 
                    ? 'border-green-500/40 bg-green-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${policy.type === 'allow' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {policy.type === 'allow' ? (
                        <Unlock className="h-4 w-4 text-green-400" />
                      ) : (
                        <Lock className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <span className="font-medium text-white text-sm">{policy.name}</span>
                  </div>
                  <span className={`text-xs ${getPriorityColor(policy.priority)}`}>
                    {policy.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{policy.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{policy.resources.length} resources</span>
                  <span className="text-gray-500">{policy.users.length} users</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Access Matrix */}
      {selectedResource && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="modern-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Target className="h-5 w-5 text-purple-400 mr-2" />
              Access Matrix for {selectedResource.name}
            </h3>
            <button
              onClick={() => setSelectedResource(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-600">
                <tr>
                  <th className="text-left p-3 text-gray-400 font-medium">User</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Role</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Clearance</th>
                  <th className="text-center p-3 text-gray-400 font-medium">Access</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Last Accessed</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Reason</th>
                  <th className="text-center p-3 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  const access = getUserAccess(user.id, selectedResource.id);
                  
                  return (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-white font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">{user.role}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded ${getSensitivityColor(user.clearanceLevel.toLowerCase().replace(' ', '-'))}`}>
                          {user.clearanceLevel}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {access?.access ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 text-gray-300">
                        {access?.lastAccessed ? access.lastAccessed.toLocaleString() : 'Never'}
                      </td>
                      <td className="p-3 text-gray-400 text-xs">{access?.reason}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleResourceAccess(user.id, selectedResource.id)}
                          className={`p-1 rounded transition-colors ${
                            access?.access 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-green-400 hover:text-green-300'
                          }`}
                        >
                          {access?.access ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Create Policy Modal */}
      <AnimatePresence>
        {showCreatePolicy && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreatePolicy(false)}
          >
            <motion.div
              className="bg-gray-900 rounded-lg border border-gray-600 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Create Access Policy</h3>
                <button
                  onClick={() => setShowCreatePolicy(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Policy Name</label>
                  <input
                    type="text"
                    value={newPolicy.name}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
                    placeholder="Enter policy name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newPolicy.description}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-white h-20"
                    placeholder="Enter policy description..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Policy Type</label>
                    <select
                      value={newPolicy.type}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
                    >
                      <option value="allow">Allow</option>
                      <option value="deny">Deny</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={newPolicy.priority}
                      onChange={(e) => setNewPolicy(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreatePolicy(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createPolicy}
                    disabled={!newPolicy.name || !newPolicy.description}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Create Policy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccessControlManagement;