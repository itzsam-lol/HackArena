import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-hack-black z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-hack-black via-transparent to-hack-black opacity-70"></div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-10 z-0" style={{ backgroundImage: 'url("/grid-pattern.png")' }}></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-tech font-bold mb-4">
              <span className="bg-gradient-to-r from-hack-mint to-hack-pink text-transparent bg-clip-text">HACK</span>
              <span className="text-white"> ARENA</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-tech mb-4 sm:mb-6 text-gray-300">36 HOUR HACKATHON</h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-tech mb-6 sm:mb-8 text-white">28 & 29 JUNE 2025</h3>
            
            <p className="text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base">
              A national-level esports-themed hackathon uniting innovative and technically skilled students from across the country to build impactful solutions in gaming, esports, and emerging technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://hackarenaa.devfolio.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 rounded-md font-tech text-black bg-hack-mint hover:bg-opacity-90 transition-all duration-300 animate-pulse-slow"
              >
                REGISTER NOW
              </a>
              <Link 
                to="/about" 
                className="px-6 sm:px-8 py-3 rounded-md font-tech text-white border border-hack-pink hover:bg-hack-pink hover:bg-opacity-20 transition-all duration-300"
              >
                LEARN MORE
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center">
              {/* Animated circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-hack-mint opacity-20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-60 h-60 sm:w-80 sm:h-80 rounded-full border border-hack-pink opacity-15"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [360, 270, 180, 90, 0],
                  }}
                  transition={{ 
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
              
              {/* Central image/logo */}
              <motion.img 
  src="/logo.png" 
  alt="HackArena Logo" 
  className="w-36 h-36 sm:w-48 sm:h-48 object-contain z-10 animate-float"
  animate={{ 
    y: [0, -10, 0],
  }}
  transition={{ 
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
              {[
                { value: 36, label: "HOURS" },
                { value: 60, label: "TEAMS" },
                { value: 240, label: "HACKERS" },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="text-center p-2 sm:p-4 rounded-lg bg-hack-black bg-opacity-50 border border-gray-800"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-tech font-bold text-hack-pink">
                    {inView ? (
                      <CountUp end={stat.value} duration={2.5} />
                    ) : (
                      0
                    )}
                    <span className="text-lg sm:text-xl">+</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-tech">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
