import React from 'react';
import { motion } from 'framer-motion';
import { Login as LoginComponent } from '../components';

function logIn() {
  return (
    <div className="relative py-8 min-h-screen bg-gradient-to-r from-gray-800 via-brown-700 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 4,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-yellow-300 opacity-40 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-purple-500 opacity-20 animate-bounce"></div>
      </motion.div>

      {/* Additional Animated Motion */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <LoginComponent />
      </div>
    </div>
  );
}

export default logIn;
