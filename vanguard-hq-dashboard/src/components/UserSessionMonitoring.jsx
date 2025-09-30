import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Users, 
  Clock, 
  MessageCircle, 
  Eye, 
  EyeOff, 
  UserCheck, 
  UserX, 
  Wifi, 
  WifiOff, 
  Timer, 
  Calendar, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Phone,
  Video,
  Monitor,
  Smartphone,
  Globe,
  MapPin,
  Zap,
  AlertCircle
} from 'lucide-react';

const UserSessionMonitoring = () => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [chatConnections, setChatConnections] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSession, setSelectedSession] = useState(null);
  const [realTimeMode, setRealTimeMode] = useState(true);

  // Mock data initialization
  useEffect(() => {
    const generateSessionData = () => {
      const users = [
        { id: 1, name: 'Major Singh', email: 'singh@suraksha.mil', role: 'Administrator' },
        { id: 2, name: 'Captain Sharma', email: 'sharma@suraksha.mil', role: 'Security Officer' },
        { id: 3, name: 'Lieutenant Kumar', email: 'kumar@suraksha.mil', role: 'System Operator' },
        { id: 4, name: 'Sergeant Patel', email: 'patel@suraksha.mil', role: 'Security Analyst' },
        { id: 5, name: 'Corporal Gupta', email: 'gupta@suraksha.mil', role: 'Operator' },
        { id: 6, name: 'Private Verma', email: 'verma@suraksha.mil', role: 'Analyst' }
      ];

      const devices = ['Desktop', 'Laptop', 'Tablet', 'Mobile'];
      const locations = ['Delhi HQ', 'Mumbai Base', 'Bangalore Center', 'Chennai Unit', 'Kolkata Post'];
      const activities = ['Dashboard View', 'Security Monitor', 'User Management', 'System Health', 'Communications', 'Reports'];

      // Generate active sessions
      const sessions = users.slice(0, 4).map((user, index) => {
        const sessionStart = new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000);
        const lastActivity = new Date(Date.now() - Math.random() * 30 * 60 * 1000);
        
        return {
          id: `session_${user.id}`,
          user,
          sessionStart,
          lastActivity,
          duration: Date.now() - sessionStart.getTime(),
          status: Math.random() > 0.2 ? 'active' : 'idle',
          device: devices[Math.floor(Math.random() * devices.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          currentActivity: activities[Math.floor(Math.random() * activities.length)],
          bandwidth: Math.floor(Math.random() * 100) + 10,
          securityLevel: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          chatPartners: [],
          screenShares: Math.floor(Math.random() * 3),
          filesTransferred: Math.floor(Math.random() * 10),
          alertsGenerated: Math.floor(Math.random() * 5)
        };
      });

      // Generate chat connections
      const connections = [];
      for (let i = 0; i < 3; i++) {
        const user1 = users[Math.floor(Math.random() * users.length)];
        const user2 = users[Math.floor(Math.random() * users.length)];
        if (user1.id !== user2.id) {
          connections.push({
            id: `chat_${user1.id}_${user2.id}`,
            participants: [user1, user2],
            startTime: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000),
            duration: Math.random() * 2 * 60 * 60 * 1000,
            messageCount: Math.floor(Math.random() * 50) + 5,
            type: ['text', 'voice', 'video'][Math.floor(Math.random() * 3)],
            status: 'active',
            priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
          });
        }
      }

      // Generate session history
      const history = [];
      for (let i = 0; i < 20; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const sessionStart = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        const sessionEnd = new Date(sessionStart.getTime() + Math.random() * 8 * 60 * 60 * 1000);
        
        history.push({
          id: `history_${i}`,
          user,
          sessionStart,
          sessionEnd,
          duration: sessionEnd.getTime() - sessionStart.getTime(),
          device: devices[Math.floor(Math.random() * devices.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          activitiesPerformed: Math.floor(Math.random() * 20) + 1,
          dataTransferred: Math.floor(Math.random() * 1000) + 100,
          securityEvents: Math.floor(Math.random() * 5),
          loginMethod: ['Password', '2FA', 'Biometric', 'Smart Card'][Math.floor(Math.random() * 4)]
        });
      }

      setActiveSessions(sessions);
      setChatConnections(connections);
      setSessionHistory(history.sort((a, b) => b.sessionStart - a.sessionStart));
    };

    generateSessionData();
    
    // Update data periodically if real-time mode is enabled
    const interval = setInterval(() => {
      if (realTimeMode) {
        generateSessionData();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const formatDuration = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getDeviceIcon = (device) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <Monitor className="h-4 w-4" />;
      case 'laptop': return <Monitor className="h-4 w-4" />;
      case 'tablet': return <Smartphone className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'idle': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredSessions = activeSessions.filter(session => {
    const matchesSearch = session.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="modern-card p-6 border border-green-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">User Session Monitoring</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Real-time</span>
              <button
                onClick={() => setRealTimeMode(!realTimeMode)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                  realTimeMode ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    realTimeMode ? 'translate-x-6' : 'translate-x-1'
                  } mt-1`}
                />
              </button>
            </div>
          </div>
        </div>
        <p className="text-gray-400">Monitor active user sessions, connections, and activity patterns in real-time</p>
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
              <p className="text-sm text-gray-400">Active Sessions</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{activeSessions.length}</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <UserCheck className="h-8 w-8 text-blue-400" />
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
              <p className="text-sm text-gray-400">Active Chats</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{chatConnections.length}</span>
                <MessageCircle className="h-4 w-4 text-green-400" />
              </div>
            </div>
            <MessageCircle className="h-8 w-8 text-green-400" />
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
              <p className="text-sm text-gray-400">Avg Session Time</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">2.4h</span>
                <Clock className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
            <Timer className="h-8 w-8 text-yellow-400" />
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
              <p className="text-sm text-gray-400">Security Alerts</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">3</span>
                <AlertCircle className="h-4 w-4 text-red-400" />
              </div>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
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
              placeholder="Search sessions by user name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors text-white placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none text-white min-w-48"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="idle">Idle</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <div className="modern-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Wifi className="h-5 w-5 text-green-400 mr-2" />
            Active Sessions ({filteredSessions.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedSession?.id === session.id 
                    ? 'border-green-500/40 bg-green-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}>
                        {session.user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                        session.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">{session.user.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{session.user.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gray-400 mb-1">
                      {getDeviceIcon(session.device)}
                      <span className="text-xs">{session.device}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{session.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Session Duration:</span>
                    <div className="text-white font-medium">{formatDuration(session.duration)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Current Activity:</span>
                    <div className="text-white font-medium">{session.currentActivity}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Activity:</span>
                    <div className="text-white font-medium">{session.lastActivity.toLocaleTimeString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Bandwidth:</span>
                    <div className="text-white font-medium">{session.bandwidth} MB/s</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Connections */}
        <div className="modern-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 text-blue-400 mr-2" />
            Active Chat Connections ({chatConnections.length})
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {chatConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {connection.participants.map((participant, i) => (
                        <div
                          key={participant.id}
                          className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-gray-800 ${i > 0 ? 'ml-2' : ''}`}
                        >
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-1">
                      {connection.type === 'voice' && <Phone className="h-4 w-4 text-green-400" />}
                      {connection.type === 'video' && <Video className="h-4 w-4 text-blue-400" />}
                      {connection.type === 'text' && <MessageCircle className="h-4 w-4 text-gray-400" />}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    connection.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                    connection.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {connection.priority}
                  </span>
                </div>
                
                <div className="mb-2">
                  <p className="text-white font-medium">
                    {connection.participants.map(p => p.name).join(' ↔ ')}
                  </p>
                  <p className="text-sm text-gray-400">
                    {connection.participants.map(p => p.role).join(' • ')}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <div className="text-white">{formatDuration(connection.duration)}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Messages:</span>
                    <div className="text-white">{connection.messageCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Started:</span>
                    <div className="text-white">{connection.startTime.toLocaleTimeString()}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Detail Modal */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSession(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-lg border border-gray-600 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Session Details</h3>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {selectedSession.user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-gray-800 ${
                      selectedSession.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{selectedSession.user.name}</h4>
                    <p className="text-gray-400">{selectedSession.user.email}</p>
                    <p className="text-sm text-gray-500">{selectedSession.user.role}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Session Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span className="text-white">{selectedSession.sessionStart.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{formatDuration(selectedSession.duration)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={getStatusColor(selectedSession.status)}>{selectedSession.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Security Level:</span>
                        <span className={`${
                          selectedSession.securityLevel === 'High' ? 'text-red-400' :
                          selectedSession.securityLevel === 'Medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>{selectedSession.securityLevel}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h5 className="font-medium text-white mb-2">Device & Location</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Device:</span>
                        <span className="text-white flex items-center space-x-1">
                          {getDeviceIcon(selectedSession.device)}
                          <span>{selectedSession.device}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{selectedSession.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Address:</span>
                        <span className="text-white">{selectedSession.ipAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bandwidth:</span>
                        <span className="text-white">{selectedSession.bandwidth} MB/s</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium text-white mb-2">Activity Summary</h5>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{selectedSession.screenShares}</div>
                      <div className="text-gray-400">Screen Shares</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{selectedSession.filesTransferred}</div>
                      <div className="text-gray-400">Files Transferred</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{selectedSession.alertsGenerated}</div>
                      <div className="text-gray-400">Alerts Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">Active</div>
                      <div className="text-gray-400">Current Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserSessionMonitoring;