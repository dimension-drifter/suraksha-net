import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, X } from 'lucide-react';
import { generateSecurityEvent } from '../utils/mockData';

const SecurityMonitor = () => {
  const [events, setEvents] = useState([]);
  const [threatLevel, setThreatLevel] = useState('LOW');
  const [showNotification, setShowNotification] = useState(false);
  const [stats, setStats] = useState({
    blockedAttacks: 14,
    resolvedIncidents: 8,
    underInvestigation: 2
  });

  useEffect(() => {
    // Initialize with some events
    setEvents(Array.from({ length: 5 }, () => generateSecurityEvent()));

    // Add new security events every 8-15 seconds
    const interval = setInterval(() => {
      const newEvent = generateSecurityEvent();
      setEvents(prev => [newEvent, ...prev.slice(0, 9)]); // Keep last 10 events
      
      // Update threat level based on event severity
      if (newEvent.severity === 'critical') {
        setThreatLevel('HIGH');
        setTimeout(() => setThreatLevel('MEDIUM'), 15000);
      } else if (newEvent.severity === 'medium' && threatLevel === 'LOW') {
        setThreatLevel('MEDIUM');
        setTimeout(() => setThreatLevel('LOW'), 10000);
      }

      // Show notification for high severity events
      if (newEvent.severity === 'high' || newEvent.severity === 'critical') {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 8000);
      }

      // Update stats
      setStats(prev => ({
        blockedAttacks: prev.blockedAttacks + (newEvent.status === 'blocked' ? 1 : 0),
        resolvedIncidents: prev.resolvedIncidents + (newEvent.status === 'resolved' ? 1 : 0),
        underInvestigation: prev.underInvestigation + (newEvent.status === 'investigating' ? 1 : 0)
      }));
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityBadge = (severity) => {
    const badges = {
      low: { class: 'bg-green-500/20 text-green-400', label: 'LOW' },
      medium: { class: 'bg-yellow-500/20 text-yellow-400', label: 'MEDIUM' },
      high: { class: 'bg-red-500/20 text-red-400', label: 'HIGH' },
      critical: { class: 'bg-red-500/20 text-red-400', label: 'CRITICAL' }
    };
    return badges[severity] || badges.low;
  };

  const getStatusBadge = (status) => {
    const badges = {
      blocked: { class: 'bg-gray-600/50 text-gray-300', label: 'Blocked' },
      investigating: { class: 'bg-red-600/80 text-white', label: 'Investigating' },
      resolved: { class: 'bg-green-500/20 text-green-400', label: 'Resolved' }
    };
    return badges[status] || badges.investigating;
  };

  const getThreatLevelColor = (level) => {
    const colors = {
      LOW: 'bg-green-500/20 text-green-400',
      MEDIUM: 'bg-yellow-500/20 text-yellow-400',
      HIGH: 'bg-red-500/20 text-red-400'
    };
    return colors[level] || colors.LOW;
  };

  return (
    <div className="modern-card p-6">
      {/* Security Monitor Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-400" />
          <span>Security Monitor</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-400">Alert Level: Low</span>
        </div>
      </div>

      {/* Live Security Alerts */}
      <div className="mb-6">
        <h4 className="text-base font-semibold text-white mb-4 flex items-center">
          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
          Live Security Alerts
        </h4>
        
        <div className="space-y-3">
          <div className="activity-item p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-medium">REGULAR</span>
              <span className="alert-badge-investigating px-3 py-1 rounded text-xs font-medium">
                Investigating
              </span>
            </div>
            <p className="text-white text-sm">Privilege escalation attempt</p>
            <div className="text-xs text-gray-400 mt-1">
              <p>Target: Security Schema</p>
              <p>13:28 AM</p>
            </div>
          </div>

          <div className="activity-item p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-medium">LOW</span>
              <span className="alert-badge-blocked px-3 py-1 rounded text-xs font-medium">
                Blocked
              </span>
            </div>
            <p className="text-white text-sm">Brute force attack detected</p>
            <div className="text-xs text-gray-400 mt-1">
              <p>Target: Identity Server</p>
              <p>12:55 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Statistics */}
      <div className="mb-6">
        <h4 className="text-base font-semibold text-white mb-4">Security Statistics</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Blocked Attacks (24h)</span>
            <span className="text-lg font-bold text-white">{stats.blockedAttacks}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Resolved Incidents</span>
            <span className="text-lg font-bold text-green-400">{stats.resolvedIncidents}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Under Investigation</span>
            <span className="text-lg font-bold text-yellow-400">{stats.underInvestigation}</span>
          </div>
        </div>
      </div>

      {/* Network Status */}
      <div>
        <h4 className="text-base font-semibold text-white mb-4">Network Status</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">VPN Tunnels</span>
            </div>
            <span className="text-green-400 text-sm font-medium">Active (12)</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Encryption</span>
            </div>
            <span className="text-green-400 text-sm font-medium">AES-256</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Firewall</span>
            </div>
            <span className="text-green-400 text-sm font-medium">Protected (347 threats)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitor;