import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-4 p-8"
    >
      <div className="relative flex items-center justify-center">
        <motion.img
          src="/logo.png"
          alt="Loading..."
          className="w-20 h-20 object-cover rounded-full border-2 border-blue-500 shadow-lg"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </div>
      {text && <span className="text-blue-400 font-medium text-lg">{text}</span>}
    </motion.div>
  );
};

export default LoadingSpinner;