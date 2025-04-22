import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; //

const BufferPage = ({ timed = false, duration = 2500, redirectTo = "/home" }) => {
  const [showButton, setShowButton] = useState(!timed);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (timed) {
      const timer = setTimeout(() => {
        navigate(redirectTo, { replace: true });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [timed, duration, navigate, redirectTo]);

  const handleStart = () => {
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-hack-black flex flex-col items-center justify-center z-50">
      {/* PlayStation symbols animation */}
      <div className="relative w-full h-32 mb-8">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 3, times: [0, 0.5, 1], repeat: Infinity }}
        >
          <div className="flex items-center space-x-6">
            <motion.div className="text-hack-mint text-4xl" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>△</motion.div>
            <motion.div className="text-hack-mint text-4xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>○</motion.div>
            <motion.div className="text-hack-mint text-4xl" animate={{ rotate: [0, 45, 0, -45, 0] }} transition={{ duration: 3, repeat: Infinity }}>×</motion.div>
            <motion.div className="text-hack-mint text-4xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>□</motion.div>
          </div>
        </motion.div>
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mb-8"
      >
        <img src={logo} alt="HackArena Logo" className="h-24 w-auto" />
      </motion.div>

      {/* Text */}
      <motion.h1 
        className="text-5xl font-tech font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span className="bg-gradient-to-r from-hack-mint to-hack-pink text-transparent bg-clip-text">HACK</span>
        <span className="text-white"> ARENA</span>
      </motion.h1>
      <motion.p
        className="text-xl font-tech text-gray-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        28 & 29 JUNE 2025
      </motion.p>

      {/* Start Button */}
      {showButton && (
        <motion.button
          onClick={handleStart}
          className="px-8 py-3 rounded-md font-tech text-black bg-hack-mint hover:bg-hack-pink hover:text-white transition-all duration-300 text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          Start
        </motion.button>
      )}

      {/* Loading bar for timed mode */}
      {timed && (
        <motion.div 
          className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-hack-mint to-hack-pink"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: duration/1000, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default BufferPage;
