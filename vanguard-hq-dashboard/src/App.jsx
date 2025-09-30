import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Users,
  Shield,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  User,
  Home,
  Lock,
  HeartPulse,
  MessageSquare,
  Key,
  Activity,
  FileText,
  UserCheck
} from 'lucide-react';

// Components
import StatCard from './components/StatCard';
import UserManagement from './components/UserManagement';
import LiveLogs from './components/LiveLogs';
import SecurityMonitor from './components/SecurityMonitor';
import LoadingSpinner from './components/LoadingSpinner';
import AdvancedUserPermissions from './components/AdvancedUserPermissions';
import UserSessionMonitoring from './components/UserSessionMonitoring';
import UserActivityLogging from './components/UserActivityLogging';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open on desktop
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeUsers: 347,
    secureSessions: 1289,
    opsecCompliance: 94,
    blockedThreats: 156
  });

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Always show sidebar on desktop
      } else {
        setSidebarOpen(false); // Hide sidebar on mobile by default
      }
    };

    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success('🔒 Connected to VPN - Secure session established', {
        position: "top-center",
        theme: "dark",
        autoClose: 4000
      });
      
      // Show additional security notifications
      setTimeout(() => {
        toast.info('🛡️ Security systems online - All protocols active', {
          position: "top-right",
          theme: "dark",
          autoClose: 3000
        });
      }, 1000);
      
      setTimeout(() => {
        toast.warning('⚠️ Security Alert: Privilege escalation attempt detected', {
          position: "top-right",
          theme: "dark",
          autoClose: 5000
        });
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', name: 'DASHBOARD', icon: Home },
    { id: 'users', name: 'USER ACCOUNTS', icon: Users },
    { id: 'permissions', name: 'USER PERMISSIONS', icon: Key },
    { id: 'sessions', name: 'SESSION MONITORING', icon: UserCheck },
    { id: 'activity', name: 'ACTIVITY LOGGING', icon: FileText },
    { id: 'security', name: 'SECURITY LOGS', icon: Shield },
    { id: 'health', name: 'SYSTEM HEALTH', icon: HeartPulse },
    { id: 'communications', name: 'COMMUNICATIONS', icon: MessageSquare },
    { id: 'settings', name: 'SETTINGS', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="modern-card p-6 border border-blue-500/20">
              <h1 className="text-2xl font-bold text-white mb-2">Command Center</h1>
              <p className="text-gray-400">Security Operations HQ</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="ACTIVE USERS"
                value={stats.activeUsers}
                icon={Users}
                trend={12}
                color="success"
                delay={0.1}
                subtitle="+12 from last hour"
              />
              <StatCard
                title="SECURE SESSIONS"
                value={stats.secureSessions}
                icon={Lock}
                trend={8}
                color="primary"
                delay={0.2}
                subtitle="+8 from last hour"
              />
              <StatCard
                title="OPSEC COMPLIANCE"
                value={`${Math.round(stats.opsecCompliance)}%`}
                icon={Shield}
                trend={2}
                color="success"
                delay={0.3}
                subtitle="+2% from last hour"
              />
              <StatCard
                title="BLOCKED THREATS"
                value={stats.blockedThreats}
                icon={Shield}
                trend={-5}
                color="error"
                delay={0.4}
                subtitle="-5% from last hour"
              />
            </div>

            {/* Live Components and Command Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <LiveLogs />
              </div>
              <div className="space-y-6">
                <SecurityMonitor />
                
                {/* Command Controls */}
                <div className="modern-card p-6">
                  <h4 className="text-base font-semibold text-white mb-4 flex items-center">
                    <Lock className="h-4 w-4 text-red-400 mr-2" />
                    Command Controls
                  </h4>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full command-btn-danger text-red-400 px-4 py-3 rounded-lg text-sm font-medium"
                      onClick={() => toast.warning('🔒 User lock command initiated', { theme: 'dark' })}
                    >
                      Lock User Session
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full command-btn-danger text-red-400 px-4 py-3 rounded-lg text-sm font-medium"
                      onClick={() => toast.warning('⏹️ Force logout initiated', { theme: 'dark' })}
                    >
                      Force Logout
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full command-btn text-blue-400 px-4 py-3 rounded-lg text-sm font-medium"
                      onClick={() => toast.info('📋 Message audit started', { theme: 'dark' })}
                    >
                      View Message Audit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full command-btn text-blue-400 px-4 py-3 rounded-lg text-sm font-medium"
                      onClick={() => toast.success('🛡️ Security protocols activated', { theme: 'dark' })}
                    >
                      Emergency Protocols
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'communications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="modern-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                <span>Communications Center</span>
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Broadcast Message</p>
                      <p className="text-gray-400 text-sm">Send system-wide notifications</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Compose
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Emergency Alert</p>
                      <p className="text-gray-400 text-sm">Critical security notifications</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'health':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="modern-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <HeartPulse className="h-5 w-5 text-green-400" />
                <span>System Health Monitor</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white font-medium">Server Status</p>
                      <p className="text-green-400 text-sm">Operational</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white font-medium">Database</p>
                      <p className="text-blue-400 text-sm">Connected</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white font-medium">CPU Usage</p>
                      <p className="text-yellow-400 text-sm">67%</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white font-medium">Memory</p>
                      <p className="text-green-400 text-sm">42% Used</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'users':
        return <UserManagement />;
      case 'permissions':
        return <AdvancedUserPermissions />;
      case 'sessions':
        return <UserSessionMonitoring />;
      case 'activity':
        return <UserActivityLogging />;
      case 'security':
        return <SecurityMonitor />;
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="modern-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-400" />
              <span>System Settings</span>
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                <p className="text-white font-medium">Security Level</p>
                <p className="text-gray-400 text-sm">Maximum</p>
              </div>
              <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                <p className="text-white font-medium">Auto-lock Timeout</p>
                <p className="text-gray-400 text-sm">15 minutes</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <LoadingSpinner/>
          <div className="space-y-1">
            <p className="text-gray-500 text-sm">Connecting to VPN...</p>
            <p className="text-gray-500 text-sm">Encrypting connection...</p>
            <p className="text-gray-600 text-xs">Establishing secure tunnel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : -320,
          opacity: sidebarOpen ? 1 : 0.95
        }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed inset-y-0 left-0 z-50 w-80 indian-army-sidebar shadow-2xl ${
          sidebarOpen ? 'lg:relative lg:translate-x-0' : ''
        }`}
      >
        {/* Dashboard Header */}
        <div className="dashboard-header p-6 text-center border-b border-gray-600">
          <div className="flex flex-col items-center space-y-3">
            {/* Logo */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-400/30">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center justify-center space-x-2 text-yellow-400 text-xl font-semibold tracking-wider">
                <span>SurakshaNET</span>
              </div>
              <h1 className="text-white text-lg font-bold mt-2">COMMAND & CONTROL INTERFACE</h1>
              <p className="text-gray-400 text-sm mt-1">USER MANAGEMENT & SECURITY MONITORING</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-yellow-600 text-black font-semibold'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide">{item.name}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom spacing */}
        <div className="flex-1"></div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-0' : 'ml-0'
      }`}>
        {/* Main Header - Simplified */}
        <header className="command-header px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-300 hover:text-white transition-colors"
                title="Toggle Navigation"
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="text-white font-medium hidden sm:block">Command Center</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search operations, users, alerts..."
                  className="pl-10 pr-4 py-2 w-80 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                <div className="notification-dot"></div>
              </motion.button>

              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-300" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* SurakshaNET Header */}
          <div className="indian-army-main-header mb-6 p-6 rounded-lg border border-yellow-600/30">
            <div className="flex items-center justify-center space-x-4">
             {/* Logo */}
            <div className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden border-2 border-yellow-400/30">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
              
              {/* Header Text */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-yellow-400 text-3xl font-bold tracking-wider">
                  <span>SurakshaNET</span>
                </div>
                <h2 className="text-white text-2xl font-bold mb-1">COMMAND & CONTROL INTERFACE</h2>
                <p className="text-gray-400 text-sm tracking-wide">USER MANAGEMENT & SECURITY MONITORING</p>
              </div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#1a1f2e',
          border: '1px solid #2d3748',
          color: '#e2e8f0'
        }}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
};

export default App;