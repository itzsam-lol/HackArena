// src/components/sections/FAQ.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
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
    },
    {
      question: "I'm new to hackathons. Can I still participate?",
      answer: "Absolutely! HackArena welcomes participants of all skill levels. We'll have mentors available to guide you, and our pre-event workshops will help you prepare for the main hackathon."
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
      <div className="absolute inset-0 bg-[url('/public/grid-pattern.png')] bg-repeat opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold mb-6 text-white">Frequently Asked <span className="text-hack-mint">Questions</span></h2>
          <p className="text-gray-300">
            Got questions about HackArena? We've got answers.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Still have questions? Feel free to reach out to us.
          </p>
          <a 
            href="/contact" 
            className="px-8 py-3 rounded-md font-tech text-white border border-hack-pink hover:bg-hack-pink hover:bg-opacity-20 transition-all duration-300 inline-block"
          >
            CONTACT US
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
