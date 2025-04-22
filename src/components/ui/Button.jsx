// src/components/ui/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  animate = false,
  ...props 
}) => {
  const baseClasses = "font-tech rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-hack-mint text-black hover:bg-opacity-90",
    secondary: "bg-transparent border border-hack-pink text-white hover:bg-hack-pink hover:bg-opacity-20",
    outline: "bg-transparent border border-gray-600 text-white hover:border-hack-mint hover:text-hack-mint",
    dark: "bg-gray-800 text-white hover:bg-gray-700"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };
  
  const animationClass = animate ? "animate-pulse-slow" : "";
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${animationClass} ${className}`;
  
  // Render as Link if 'to' prop is provided (internal link)
  if (to) {
    return (
      <Link to={to} className={allClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  // Render as anchor tag if 'href' prop is provided (external link)
  if (href) {
    return (
      <a href={href} className={allClasses} {...props}>
        {children}
      </a>
    );
  }
  
  // Otherwise render as button
  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
