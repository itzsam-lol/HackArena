// Updated Timeline component with mobile-friendly layout
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineEvents = [
    {
      date: "April 30, 2025",
      title: "Registration Opens",
      description: "Team and individual registrations open on Devfolio. Early bird registrations get special perks!"
    },
    {
      date: "May 25, 2025",
      title: "Pre-Event Workshops",
      description: "Ideation sessions, hands-on workshops, tech talks, panel discussions, and networking opportunities with industry experts."
    },
    {
      date: "June 15, 2025",
      title: "Team Finalization",
      description: "Final selection of 60 teams who will participate in the main hackathon event."
    },
    {
      date: "June 28, 2025",
      title: "Hackathon Day 1",
      description: "Opening ceremony, team formation, problem statement announcements, and start of the 36-hour coding sprint."
    },
    {
      date: "June 29, 2025",
      title: "Hackathon Day 2",
      description: "Continued development, mentorship sessions, project submissions, pitching, and closing ceremony with winners announcement."
    }
  ];

  return (
    <section className="py-20 bg-hack-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-5 blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 z-0" style={{ backgroundImage: 'url("/grid-pattern.png")' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold mb-6 text-white">Event <span className="text-hack-mint">Timeline</span></h2>
          <p className="text-gray-300">
            Mark your calendars! Here's what to expect in the lead-up to and during HackArena 2025.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Mobile Timeline (visible on small screens) */}
          <div className="md:hidden">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-8 relative pl-12 border-l-2 border-hack-pink"
              >
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-hack-pink flex items-center justify-center -translate-x-1/2">
                  <span className="font-tech text-black text-sm">{index + 1}</span>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 shadow-xl">
                  <h3 className="text-lg font-tech font-bold text-hack-mint mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{event.date}</p>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop Timeline (hidden on small screens) */}
          <div className="hidden md:block relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-hack-mint to-hack-pink"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:mr-[50%]' : 'md:mr-auto md:ml-[50%]'} md:w-[45%]`}
              >
                <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700 shadow-xl hover:border-hack-pink transition-all duration-300">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 md:translate-x-[150%] w-10 h-10 rounded-full bg-hack-pink flex items-center justify-center z-10">
                    <span className="font-tech text-black">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-xl font-tech font-bold text-hack-mint mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{event.date}</p>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a 
            href="https://hackarenaa.devfolio.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-md font-tech text-black bg-hack-mint hover:bg-opacity-90 transition-all duration-300 inline-block"
          >
            REGISTER NOW
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
