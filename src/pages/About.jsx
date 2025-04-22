// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import groupPhoto from '../assets/IMG-20240823-WA0057.jpg';

const About = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

  const timelineEvents = [
    {
      date: "May 25, 2025",
      title: "Pre-Event",
      description: "Ideation sessions, hands-on workshops, tech talks, panel discussions, and networking opportunities with industry experts."
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
    <div className="min-h-screen bg-hack-black pt-20">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-tech font-bold mb-6">
              <span className="bg-gradient-to-r from-hack-mint to-hack-pink text-transparent bg-clip-text">ABOUT</span>
              <span className="text-white"> HACK ARENA</span>
            </h1>
            <p className="text-gray-300 text-lg">
              A national-level esports-themed hackathon bringing together the brightest minds to innovate and build the future of gaming and technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            ref={ref1}
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-tech font-bold mb-6 text-white">What is <span className="text-hack-pink">HackArena</span>?</h2>
              <p className="text-gray-300 mb-4">
                HackArena is a national-level esports-themed hackathon organized by IEEE IIIT-Delhi and Byld in collaboration with Ignite Room. The event is designed to unite innovative and technically skilled students from across the country for a 36-hour hackathon.
              </p>
              <p className="text-gray-300 mb-4">
                Our focus is on building impactful solutions in domains like gaming, esports, and emerging technologies. We believe in the power of collaboration, innovation, and technology to create meaningful change.
              </p>
              <p className="text-gray-300">
                Join us for an unforgettable experience of coding, learning, networking, and fun as you compete with the best minds across the country.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-hack-pink opacity-20 animate-pulse-slow"></div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full max-w-lg overflow-hidden rounded-xl border-2 border-hack-pink shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={groupPhoto} 
                    alt="HackArena Previous Event" 
                    className="object-cover w-full h-full rounded-lg shadow-2xl relative z-10"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-hack-black to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                  <p className="text-sm font-medium">Previous Ignite Room Event</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - FIXED FOR MOBILE */}
      <section className="py-16 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-tech font-bold mb-6 text-white">Event <span className="text-hack-mint">Timeline</span></h2>
            <p className="text-gray-300">
              HackArena is divided into multiple phases to ensure participants get the most out of the experience. Here's what you can expect:
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {/* Mobile Timeline (visible on small screens) */}
            <div className="md:hidden">
              {timelineEvents.map((event, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="relative pl-12 mb-10"
                >
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-hack-pink flex items-center justify-center text-black font-bold">{idx + 1}</div>
                  <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg border border-gray-700 shadow-xl">
                    <h3 className="text-lg font-tech font-bold text-hack-mint mb-1">{event.title}</h3>
                    <p className="text-xs text-gray-400 mb-1">{event.date}</p>
                    <p className="text-gray-300 text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Desktop Timeline (hidden on small screens) */}
            <div className="hidden md:block relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-hack-mint to-hack-pink opacity-40"></div>
              
              {/* Timeline events */}
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative mb-16 w-1/2 ${index % 2 === 0 ? 'ml-auto pr-10 text-right' : 'mr-auto pl-10 text-left'}`}
                  style={{ clear: 'both' }}
                >
                  <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} w-8 h-8 rounded-full bg-hack-pink flex items-center justify-center text-black font-bold z-10`}>{index + 1}</div>
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg border border-gray-700 shadow-xl inline-block">
                    <h3 className="text-xl font-tech font-bold text-hack-mint mb-2">{event.title}</h3>
                    <p className="text-xs text-gray-400 mb-2">{event.date}</p>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            ref={ref3}
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-tech font-bold mb-6 text-white">Frequently Asked <span className="text-hack-pink">Questions</span></h2>
            <p className="text-gray-300">
              Got questions about HackArena? We've got answers.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Who can participate in HackArena?",
                answer: "HackArena is open to all college students across India. Whether you're a beginner or an experienced developer, everyone is welcome to participate."
              },
              {
                question: "Do I need a team to participate?",
                answer: "While we encourage team participation (teams of 2-4 members), you can also register individually and form teams during the pre-event phase or at the beginning of the hackathon."
              },
              {
                question: "Is there any registration fee?",
                answer: "No, participation in HackArena is completely free of charge. We believe in making technology and innovation accessible to all."
              },
              {
                question: "What should I bring to the hackathon?",
                answer: "Participants should bring their laptops, chargers, and any other hardware they might need for their projects. Food and refreshments will be provided throughout the event."
              },
              {
                question: "Will there be prizes?",
                answer: "Yes! HackArena offers exciting prizes for the winning teams, including cash prizes, tech gadgets, internship opportunities, and more. Specific prize details will be announced closer to the event."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-6 bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-tech text-white p-6 cursor-pointer">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-300 px-6 pb-6">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-hack-black to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-tech font-bold mb-6 text-white">Ready to <span className="text-hack-mint">Join</span> the Arena?</h2>
            <p className="text-gray-300 mb-8">
              Don't miss this opportunity to showcase your skills, learn from experts, and win exciting prizes!
            </p>
            <a 
              href="https://hackarenaa.devfolio.co/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-md font-tech text-black bg-hack-mint hover:bg-opacity-90 transition-all duration-300 inline-block animate-pulse-slow"
            >
              REGISTER NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
