import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isOpen ? 'bg-hack-black bg-opacity-90 backdrop-blur-md py-2' : 'md:bg-transparent bg-hack-black bg-opacity-80 py-3 sm:py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-8 sm:h-10 w-auto"
            >
              {/* Fixed logo reference */}
              <img 
                src={process.env.PUBLIC_URL + '/favicon-1.jpg'} 
                alt="HackArena" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  console.error("Logo failed to load");
                  e.target.src = process.env.PUBLIC_URL + '/logo.png'; // Fallback to logo.png
                }}
              />
            </motion.div>
            <motion.h1 
              className="ml-2 text-xl sm:text-2xl font-tech font-bold bg-gradient-to-r from-hack-mint to-hack-pink text-transparent bg-clip-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              HACK ARENA
            </motion.h1>
          </Link>

          {/* Rest of your navbar code remains the same */}
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`font-tech text-sm uppercase tracking-wider hover:text-hack-pink transition-colors ${location.pathname === link.path ? 'text-hack-pink' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="font-tech text-sm uppercase tracking-wider hover:text-hack-pink transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded font-tech text-sm uppercase bg-gradient-to-r from-hack-mint to-hack-pink hover:from-hack-pink hover:to-hack-mint transition-all duration-300 text-black"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="font-tech text-sm uppercase tracking-wider hover:text-hack-pink transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded font-tech text-sm uppercase bg-gradient-to-r from-hack-mint to-hack-pink hover:from-hack-pink hover:to-hack-mint transition-all duration-300 text-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden mt-4 py-4 border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`font-tech text-sm uppercase tracking-wider py-2 ${location.pathname === link.path ? 'text-hack-pink' : 'text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {currentUser ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="font-tech text-sm uppercase tracking-wider py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 rounded font-tech text-sm uppercase bg-gradient-to-r from-hack-mint to-hack-pink text-black"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="font-tech text-sm uppercase tracking-wider py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-3 rounded font-tech text-sm uppercase bg-gradient-to-r from-hack-mint to-hack-pink text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
