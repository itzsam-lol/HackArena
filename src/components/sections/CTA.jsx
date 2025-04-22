// src/components/sections/CTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-r from-hack-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-10 blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/public/grid-pattern.png')] bg-repeat opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold mb-6 text-white">Ready to <span className="text-hack-mint">Join</span> the Arena?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Don't miss this opportunity to showcase your skills, learn from experts, and win exciting prizes!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://hackarenaa.devfolio.co/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-md font-tech text-black bg-hack-mint hover:bg-opacity-90 transition-all duration-300 inline-block animate-pulse-slow"
            >
              REGISTER NOW
            </a>
            <a 
              href="https://discord.gg/X6tzRjrx8z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-md font-tech text-white border border-hack-pink hover:bg-hack-pink hover:bg-opacity-20 transition-all duration-300 inline-block"
            >
              JOIN OUR DISCORD
            </a>
          </div>
          
          <p className="text-gray-400 mt-8">
            Event dates: June 28-29, 2025 • 36 hours of innovation and fun!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
