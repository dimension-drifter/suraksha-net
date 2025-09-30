import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import { generateActivityLog } from '../utils/mockData';

const LiveLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Initialize with some logs
    setLogs(Array.from({ length: 8 }, () => generateActivityLog()));

    // Add new logs every 3-8 seconds
    const interval = setInterval(() => {
      const newLog = generateActivityLog();
      setLogs(prev => [newLog, ...prev.slice(0, 19)]); // Keep last 20 logs
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (action) => {
    const iconMap = {
      'Security scan completed': { icon: '✓', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      'User logged in': { icon: '○', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'Message: Lost': { icon: '○', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'Privilege escalation attempt': { icon: '!', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      'VPN connection established': { icon: '○', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'External share blocked': { icon: '○', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      'Abnormal network switch detected': { icon: '○', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'User tried external share': { icon: '○', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      default: { icon: '○', bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' }
    };
    return iconMap[action] || iconMap.default;
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="modern-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Live Activity Logs</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-400">Connected</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-modern">
        <AnimatePresence>
          {logs.map((log, index) => {
            const activityIcon = getActivityIcon(log.action);
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="activity-item flex items-start space-x-3 p-3 rounded-lg"
              >
                <div className={`w-8 h-8 rounded-lg border ${activityIcon.border} ${activityIcon.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-sm font-medium ${activityIcon.text}`}>{activityIcon.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white truncate">
                      {log.user}
                    </p>
                    <span className="text-xs text-gray-400 ml-2">
                      {formatTime(log.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {log.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {log.details}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveLogs;