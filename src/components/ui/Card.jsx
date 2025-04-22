// src/components/ui/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  animate = false,
  delay = 0
}) => {
  const baseClasses = "bg-gray-900 bg-opacity-60 rounded-xl border border-gray-800 overflow-hidden";
  const hoverClasses = hover ? "hover:border-hack-pink transition-all duration-300" : "";
  
  if (animate) {
    return (
      <motion.div 
        className={`${baseClasses} ${hoverClasses} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
