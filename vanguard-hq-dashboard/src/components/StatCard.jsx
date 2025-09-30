import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color = "success", delay = 0, subtitle }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ''));
      const duration = 2000;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedValue(end);
          clearInterval(counter);
        } else {
          setAnimatedValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const getColorClasses = (colorType) => {
    const colors = {
      success: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        icon: 'text-green-400',
        border: 'border-green-500/30'
      },
      primary: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        icon: 'text-blue-400',
        border: 'border-blue-500/30'
      },
      warning: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        icon: 'text-yellow-400',
        border: 'border-yellow-500/30'
      },
      error: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        icon: 'text-red-400',
        border: 'border-red-500/30'
      }
    };
    return colors[colorType] || colors.success;
  };

  const colorClasses = getColorClasses(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`modern-card p-6 stat-card-hover border ${colorClasses.border}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wide">{title}</p>
          <motion.div
            className="flex items-baseline space-x-2"
            key={animatedValue}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className={`text-3xl font-bold ${colorClasses.text}`}>
              {typeof value === 'string' && value.includes('%') 
                ? `${animatedValue}%` 
                : animatedValue.toLocaleString()
              }
            </span>
          </motion.div>
          {subtitle && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {trend > 0 ? '↗' : '↘'} {subtitle}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses.bg} border ${colorClasses.border}`}>
          <Icon className={`h-6 w-6 ${colorClasses.icon}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;