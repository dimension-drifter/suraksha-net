import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  Shield, 
  AlertTriangle, 
  Activity, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Settings, 
  Database,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  Upload,
  LogIn,
  LogOut,
  RefreshCw,
  Terminal,
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  History,
  MapPin
} from 'lucide-react';
import { toast } from 'react-toastify';

const UserActivityLogging = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState(null);
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState({});

  // Mock data initialization
  useEffect(() => {
    const generateActivityLogs = () => {
      const userList = [
        { id: 1, name: 'Major Singh', email: 'singh@suraksha.mil', role: 'Administrator' },
        { id: 2, name: 'Captain Sharma', email: 'sharma@suraksha.mil', role: 'Security Officer' },
        { id: 3, name: 'Lieutenant Kumar', email: 'kumar@suraksha.mil', role: 'System Operator' },
        { id: 4, name: 'Sergeant Patel', email: 'patel@suraksha.mil', role: 'Security Analyst' },
        { id: 5, name: 'Corporal Gupta', email: 'gupta@suraksha.mil', role: 'Operator' }
      ];

      const actions = [
        { type: 'login', name: 'User Login', icon: LogIn, severity: 'info' },
        { type: 'logout', name: 'User Logout', icon: LogOut, severity: 'info' },
        { type: 'user_create', name: 'User Created', icon: UserPlus, severity: 'medium' },
        { type: 'user_delete', name: 'User Deleted', icon: UserMinus, severity: 'high' },
        { type: 'user_edit', name: 'User Modified', icon: Edit, severity: 'medium' },
        { type: 'permission_change', name: 'Permission Changed', icon: Shield, severity: 'high' },
        { type: 'security_event', name: 'Security Event', icon: AlertTriangle, severity: 'critical' },
        { type: 'system_config', name: 'System Configuration', icon: Settings, severity: 'medium' },
        { type: 'data_access', name: 'Data Access', icon: Database, severity: 'info' },
        { type: 'file_upload', name: 'File Upload', icon: Upload, severity: 'medium' },
        { type: 'file_download', name: 'File Download', icon: Download, severity: 'info' },
        { type: 'session_timeout', name: 'Session Timeout', icon: Clock, severity: 'low' },
        { type: 'failed_login', name: 'Failed Login Attempt', icon: Lock, severity: 'high' },
        { type: 'password_change', name: 'Password Changed', icon: Unlock, severity: 'medium' },
        { type: 'api_access', name: 'API Access', icon: Terminal, severity: 'info' }
      ];

      const locations = ['Delhi HQ', 'Mumbai Base', 'Bangalore Center', 'Chennai Unit', 'Kolkata Post'];
      const devices = ['Desktop', 'Laptop', 'Mobile', 'Tablet'];
      const resources = ['User Management', 'Security Logs', 'System Health', 'Communications', 'Settings', 'Reports'];

      // Generate logs for the last 7 days
      const logs = [];
      const now = new Date();
      
      for (let i = 0; i < 200; i++) {
        const user = userList[Math.floor(Math.random() * userList.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        
        logs.push({
          id: `log_${i}`,
          timestamp,
          user,
          action: action.type,
          actionName: action.name,
          actionIcon: action.icon,
          severity: action.severity,
          description: generateLogDescription(action.type, user.name),
          resource: resources[Math.floor(Math.random() * resources.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          success: Math.random() > 0.1,
          sessionId: `sess_${Math.random().toString(36).substr(2, 9)}`,
          metadata: {
            previousValue: action.type === 'user_edit' ? 'Security Analyst' : null,
            newValue: action.type === 'user_edit' ? 'Senior Security Analyst' : null,
            affectedUsers: action.type === 'permission_change' ? Math.floor(Math.random() * 5) + 1 : null,
            fileSize: action.type.includes('file') ? `${Math.floor(Math.random() * 1000)}KB` : null,
            duration: action.type === 'login' ? `${Math.floor(Math.random() * 480)}min` : null
          }
        });
      }

      // Sort by timestamp (most recent first)
      logs.sort((a, b) => b.timestamp - a.timestamp);
      
      setActivityLogs(logs);
      setUsers(userList);
      
      // Calculate statistics
      const stats = calculateStatistics(logs);
      setStatistics(stats);
    };

    const generateLogDescription = (actionType, userName) => {
      const descriptions = {
        login: `${userName} successfully logged into the SurakshaNET dashboard`,
        logout: `${userName} logged out of the system`,
        user_create: `New user account created by ${userName}`,
        user_delete: `User account deleted by ${userName}`,
        user_edit: `User profile information modified by ${userName}`,
        permission_change: `Security permissions updated by ${userName}`,
        security_event: `Security anomaly detected in ${userName}'s session`,
        system_config: `System configuration changes applied by ${userName}`,
        data_access: `Sensitive data accessed by ${userName}`,
        file_upload: `File uploaded to secure server by ${userName}`,
        file_download: `Classified document downloaded by ${userName}`,
        session_timeout: `${userName}'s session expired due to inactivity`,
        failed_login: `Failed login attempt for user account ${userName}`,
        password_change: `Password security updated by ${userName}`,
        api_access: `API endpoint accessed by ${userName}`
      };
      return descriptions[actionType] || `Action performed by ${userName}`;
    };

    const calculateStatistics = (logs) => {
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const todayLogs = logs.filter(log => log.timestamp >= yesterday);
      const weekLogs = logs.filter(log => log.timestamp >= thisWeek);

      const severityCounts = logs.reduce((acc, log) => {
        acc[log.severity] = (acc[log.severity] || 0) + 1;
        return acc;
      }, {});

      const actionCounts = logs.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      }, {});

      const userCounts = logs.reduce((acc, log) => {
        acc[log.user.name] = (acc[log.user.name] || 0) + 1;
        return acc;
      }, {});

      return {
        totalLogs: logs.length,
        todayLogs: todayLogs.length,
        weekLogs: weekLogs.length,
        severityCounts,
        actionCounts,
        userCounts,
        successRate: ((logs.filter(log => log.success).length / logs.length) * 100).toFixed(1)
      };
    };

    generateActivityLogs();
  }, []);

  // Filter logs based on search and filter criteria
  useEffect(() => {
    let filtered = activityLogs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply user filter
    if (filterUser !== 'all') {
      filtered = filtered.filter(log => log.user.id.toString() === filterUser);
    }

    // Apply action filter
    if (filterAction !== 'all') {
      filtered = filtered.filter(log => log.action === filterAction);
    }

    // Apply severity filter
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === filterSeverity);
    }

    // Apply date range filter
    const now = new Date();
    switch (dateRange) {
      case 'today':
        filtered = filtered.filter(log => 
          log.timestamp >= new Date(now.getFullYear(), now.getMonth(), now.getDate())
        );
        break;
      case 'week':
        filtered = filtered.filter(log => 
          log.timestamp >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        );
        break;
      case 'month':
        filtered = filtered.filter(log => 
          log.timestamp >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        );
        break;
      default:
        break;
    }

    setFilteredLogs(filtered);
  }, [activityLogs, searchTerm, filterUser, filterAction, filterSeverity, dateRange]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'info': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'high': return Shield;
      case 'medium': return Eye;
      case 'low': return Activity;
      case 'info': return FileText;
      default: return FileText;
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Severity', 'Description', 'Resource', 'Location', 'Success'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.user.name,
        log.actionName,
        log.severity,
        `"${log.description}"`,
        log.resource,
        log.location,
        log.success
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Activity logs exported successfully', { theme: 'dark' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="modern-card p-6 border border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">User Activity Logging</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportLogs}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </motion.button>
        </div>
        <p className="text-gray-400">Comprehensive logging and audit trail of all user activities and system events</p>
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
              <p className="text-sm text-gray-400">Total Events</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{statistics.totalLogs}</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <History className="h-8 w-8 text-blue-400" />
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
              <p className="text-sm text-gray-400">Today's Events</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{statistics.todayLogs}</span>
                <Activity className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <Calendar className="h-8 w-8 text-green-400" />
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
              <p className="text-sm text-gray-400">Success Rate</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{statistics.successRate}%</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <BarChart3 className="h-8 w-8 text-yellow-400" />
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
              <p className="text-sm text-gray-400">Critical Events</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{statistics.severityCounts?.critical || 0}</span>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
            </div>
            <Shield className="h-8 w-8 text-red-400" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="modern-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors text-white placeholder-gray-400"
            />
          </div>
          
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none text-white"
          >
            <option value="all">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none text-white"
          >
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="user_create">User Create</option>
            <option value="user_edit">User Edit</option>
            <option value="permission_change">Permission Change</option>
            <option value="security_event">Security Event</option>
          </select>

          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none text-white"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="info">Info</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none text-white"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <div className="text-sm text-gray-400 flex items-center">
            Showing {filteredLogs.length} of {activityLogs.length} logs
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="modern-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="h-5 w-5 text-purple-400 mr-2" />
          Activity Logs ({filteredLogs.length})
        </h3>
        
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-800 border-b border-gray-600">
                <tr>
                  <th className="text-left p-3 text-gray-400 font-medium">Timestamp</th>
                  <th className="text-left p-3 text-gray-400 font-medium">User</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Action</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Severity</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Resource</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Location</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Status</th>
                  <th className="text-center p-3 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => {
                  const SeverityIcon = getSeverityIcon(log.severity);
                  const ActionIcon = log.actionIcon;
                  
                  return (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.01 }}
                      className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-3 text-white">
                        <div className="flex flex-col">
                          <span className="font-medium">{log.timestamp.toLocaleDateString()}</span>
                          <span className="text-xs text-gray-400">{log.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                            {log.user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-white font-medium">{log.user.name}</div>
                            <div className="text-xs text-gray-400">{log.user.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <ActionIcon className="h-4 w-4 text-blue-400" />
                          <span className="text-white">{log.actionName}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(log.severity)}`}>
                          <SeverityIcon className="h-3 w-3" />
                          <span className="capitalize">{log.severity}</span>
                        </span>
                      </td>
                      <td className="p-3 text-white">{log.resource}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <MapPin className="h-3 w-3" />
                          <span>{log.location}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          log.success 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {log.success ? 'Success' : 'Failed'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log Detail Modal */}
      <AnimatePresence>
        {selectedLog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLog(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-lg border border-gray-600 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Activity Log Details</h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Event Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Event ID:</span>
                        <span className="text-white font-mono">{selectedLog.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timestamp:</span>
                        <span className="text-white">{selectedLog.timestamp.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Action:</span>
                        <span className="text-white">{selectedLog.actionName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Severity:</span>
                        <span className={`capitalize ${getSeverityColor(selectedLog.severity)}`}>
                          {selectedLog.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">User & Session</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">User:</span>
                        <span className="text-white">{selectedLog.user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white">{selectedLog.user.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Session ID:</span>
                        <span className="text-white font-mono text-xs">{selectedLog.sessionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Address:</span>
                        <span className="text-white font-mono">{selectedLog.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-white mb-2">Description</h5>
                  <p className="text-gray-300 text-sm">{selectedLog.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Resource</h5>
                    <p className="text-gray-300 text-sm">{selectedLog.resource}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Location</h5>
                    <p className="text-gray-300 text-sm">{selectedLog.location}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Device</h5>
                    <p className="text-gray-300 text-sm">{selectedLog.device}</p>
                  </div>
                </div>
                
                {selectedLog.metadata && Object.values(selectedLog.metadata).some(v => v !== null) && (
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Additional Information</h5>
                    <div className="space-y-1 text-sm">
                      {Object.entries(selectedLog.metadata).map(([key, value]) => (
                        value !== null && (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="text-white">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserActivityLogging;