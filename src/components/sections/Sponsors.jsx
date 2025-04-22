import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponsors = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Placeholder sponsor data - replace with actual sponsors
  const sponsorsTiers = [
    {
      tier: "Platinum Sponsors",
      sponsors: [
        { name: "IEEE IIIT-Delhi", logo: "/sponsors/ieee-iiitd.png" },
        { name: "Byld", logo: "/sponsors/byld.png" },
        { name: "Ignite Room", logo: "/sponsors/ignite-room.png" },
      ]
    },
    {
      tier: "Gold Sponsors",
      sponsors: [
        { name: "TechCorp", logo: "/sponsors/sponsor1.png" },
        { name: "GameDev", logo: "/sponsors/sponsor2.png" },
        { name: "CodeLabs", logo: "/sponsors/sponsor3.png" },
      ]
    },
    {
      tier: "Community Partners",
      sponsors: [
        { name: "DevCommunity", logo: "/sponsors/partner1.png" },
        { name: "TechHub", logo: "/sponsors/partner2.png" },
        { name: "CodeSociety", logo: "/sponsors/partner3.png" },
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-900 bg-opacity-60 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-hack-pink opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-hack-mint opacity-5 blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/public/grid-pattern.png')] bg-repeat opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold mb-6 text-white">Our <span className="text-hack-pink">Sponsors</span> & <span className="text-hack-mint">Partners</span></h2>
          <p className="text-gray-300">
            HackArena is made possible by the generous support of our sponsors and community partners who share our vision of fostering innovation in gaming and technology.
          </p>
        </motion.div>
        
        {sponsorsTiers.map((tier, tierIndex) => (
          <div key={tierIndex} className="mb-16 last:mb-0">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * tierIndex }}
              className="text-2xl font-tech font-bold mb-10 text-center"
            >
              <span className={`bg-gradient-to-r ${tierIndex === 0 ? 'from-hack-mint to-hack-pink' : tierIndex === 1 ? 'from-yellow-400 to-yellow-600' : 'from-gray-400 to-gray-600'} text-transparent bg-clip-text`}>
                {tier.tier}
              </span>
            </motion.h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (0.1 * tierIndex) }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center"
            >
              {tier.sponsors.map((sponsor, sponsorIndex) => (
                <motion.div 
                  key={sponsorIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.3 + (0.05 * sponsorIndex) }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 bg-opacity-50 p-6 rounded-lg w-full max-w-[180px] h-[120px] flex items-center justify-center border border-gray-700 hover:border-hack-pink transition-all duration-300"
                >
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <h3 className="text-xl font-tech font-bold mb-6 text-white">Interested in <span className="text-hack-mint">Sponsoring</span> HackArena?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join our growing list of sponsors and partners to connect with talented developers, designers, and innovators in the gaming and tech community.
          </p>
          <a 
            href="mailto:collabwithigniteroom@gmail.com?subject=Sponsorship%20Inquiry%20-%20HackArena%202025" 
            className="px-8 py-3 rounded-md font-tech text-black bg-hack-mint hover:bg-opacity-90 transition-all duration-300 inline-block"
          >
            BECOME A SPONSOR
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
