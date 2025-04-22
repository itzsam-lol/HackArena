import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-hack-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-10 blur-3xl"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10 max-w-md px-4"
      >
        <h1 className="text-6xl font-tech font-bold mb-6">
          <span className="bg-gradient-to-r from-hack-mint to-hack-pink text-transparent bg-clip-text">404</span>
        </h1>
        <h2 className="text-3xl font-tech text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or head back to the homepage.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-to-r from-hack-mint to-hack-pink text-black font-tech rounded-md hover:from-hack-pink hover:to-hack-mint transition-all duration-300"
        >
          BACK TO HOME
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
