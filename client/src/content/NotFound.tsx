import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img 
        src="/path/to/your/404-animation.gif"
        alt="404 Animation"
        className="mb-4"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-cyan-500 text-white rounded-md transition-colors"
      >
        Go Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
