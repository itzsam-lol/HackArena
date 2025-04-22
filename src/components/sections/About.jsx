import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

// Import images directly from public folder
const groupPhoto = "/IMG-20240823-WA0057.jpg";
const logoImage = "/favicon-1.jpg";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { value: 36, label: "HOURS" },
    { value: 60, label: "TEAMS" },
    { value: 240, label: "HACKERS" },
    { value: 50, label: "MENTORS" }
  ];

  const features = [
    {
      title: "Esports-Themed Challenges",
      description: "Tackle real-world problems in gaming, esports, and emerging technologies.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals and gaming experts throughout the event.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Networking Opportunities",
      description: "Connect with like-minded innovators, industry leaders, and potential employers.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Exciting Prizes",
      description: "Win cash prizes, gaming gear, internship opportunities, and more.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-900 bg-opacity-60 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-5 blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/grid-pattern.png")' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src={logoImage} 
              alt="HackArena Logo" 
              className="h-12 sm:h-16 mb-3 sm:mb-4"
              onError={(e) => {
                console.error("Logo failed to load");
                e.target.onerror = null;
                e.target.src = "/logo.png"; // Fallback
              }}
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold mb-4 sm:mb-6 text-white">About <span className="text-hack-pink">HackArena</span></h2>
        </motion.div>
        
        {/* About section with image - Responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              HackArena is a national-level esports-themed hackathon organized by IEEE IIIT-Delhi and Byld in collaboration with Ignite Room, uniting innovative and technically skilled students from across the country.
            </p>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              Our focus is on building impactful solutions in domains like gaming, esports, and emerging technologies. The event is designed to foster innovation, collaboration, and technical excellence among participants.
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              Join us for an unforgettable 36-hour experience of coding, learning, networking, and fun as you compete with the best minds across the country at the Lecture Hall Complex (LHC), IIIT-Delhi on June 28-29, 2025.
            </p>
          </div>
          
          {/* Group image - Responsive with aspect ratio preservation */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border-2 border-hack-pink shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={groupPhoto} 
                  alt="HackArena Previous Event" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    console.error("Group photo failed to load");
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-hack-black to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                <p className="text-sm font-medium">Previous Ignite Room Event</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              className="bg-gray-800 bg-opacity-50 p-4 sm:p-6 rounded-lg text-center border border-gray-700"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-tech font-bold text-hack-pink mb-1 sm:mb-2">
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
        </motion.div>
        
        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-10 sm:mb-16"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              className="bg-gray-800 bg-opacity-50 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-hack-pink transition-all duration-300"
            >
              <div className="bg-hack-black p-2 sm:p-3 rounded-lg inline-block mb-3 sm:mb-4 text-hack-pink">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-tech font-bold text-white mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <a 
            href="https://hackarenaa.devfolio.co/" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 rounded-md font-tech text-black bg-hack-mint hover:bg-opacity-90 transition-all duration-300 inline-block"
          >
            REGISTER NOW
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
