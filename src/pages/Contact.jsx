// src/pages/Contact.jsx (continued)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Add to Firestore
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      toast.success('Message sent successfully! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
              <span className="bg-gradient-to-r from-hack-mint to-hack-pink text-transparent bg-clip-text">CONTACT</span>
              <span className="text-white"> US</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Have questions about HackArena? We're here to help! Reach out to us using any of the methods below.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <div className="bg-gray-900 bg-opacity-50 p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-tech font-bold mb-6 text-white">Send us a <span className="text-hack-pink">Message</span></h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-hack-mint to-hack-pink hover:from-hack-pink hover:to-hack-mint text-black font-tech font-medium rounded-md transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-tech font-bold mb-6 text-white">Get in <span className="text-hack-mint">Touch</span></h2>
              
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-hack-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-tech text-white mb-1">Email</h3>
                    <p className="text-gray-300">
                      <a href="mailto:collabwithigniteroom@gmail.com" className="hover:text-hack-mint transition-colors">
                        collabwithigniteroom@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-hack-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-tech text-white mb-1">Location</h3>
                    <p className="text-gray-300">
                      Lecture Hall Complex (LHC), IIIT-Delhi<br />
                      Okhla Industrial Estate, Phase III<br />
                      New Delhi
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-lg font-tech text-white mb-3">Social Media</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/ignite.room/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-3 rounded-lg text-white hover:bg-hack-pink hover:text-black transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a 
                      href="https://discord.gg/X6tzRjrx8z" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-3 rounded-lg text-white hover:bg-hack-pink hover:text-black transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.977-.608 1.414a17.27 17.27 0 0 0-5.487 0 12.293 12.293 0 0 0-.617-1.415.077.077 0 0 0-.079-.036 19.566 19.566 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.229 13.229 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                      </svg>
                    </a>
                    <a 
                      href="https://hackarenaa.devfolio.co/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-3 rounded-lg text-white hover:bg-hack-pink hover:text-black transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.989 11.572a7.96 7.96 0 0 0-1.573-4.351 9.749 9.749 0 0 0-.92.87 13.157 13.157 0 0 1-3.313 2.01c.167.35.32.689.455 1.009v.003a9.186 9.186 0 0 1 .11.27 19.471 19.471 0 0 1 5.241.19zm-9.855-1.343a20.137 20.137 0 0 1 2.397-3.084c.47-.53.943-1.01 1.416-1.436l.016-.014a9.63 9.63 0 0 0-5.018-1.399 9.536 9.536 0 0 0-3.008.477c.824 1.335 2.368 3.122 4.197 5.456zm9.649 1.7c.088 0 .175.004.262.008 0-.09.002-.18.002-.27 0-1.18-.211-2.31-.599-3.36a20.985 20.985 0 0 0-5.354-.24c.152.328.3.658.438.992.149.357.29.717.42 1.08a20.502 20.502 0 0 1 4.831 1.79zm-14.95-8.333A9.35 9.35 0 0 0 2.25 7.874a9.32 9.32 0 0 0 2.401 6.27v.001l.006.006.3.027c1.599-1.453 3.288-2.61 5.053-3.477a11.87 11.87 0 0 0-.634-.834 23.363 23.363 0 0 0-3.734-3.92l-.008-.008zm11.89 9.923c-.145-.083-.324-.153-.49-.225a16.98 16.98 0 0 0-.841-.34 20.07 20.07 0 0 0-2.31-.646c-.567-.123-1.133-.218-1.698-.286-.223-.028-.448-.05-.674-.067a23.552 23.552 0 0 0-1.319-.038h-.003a23.707 23.707 0 0 0-1.32.039c-.226.016-.45.039-.674.067a13.337 13.337 0 0 0-1.699.286 20.214 20.214 0 0 0-2.31.646 16.489 16.489 0 0 0-.841.34c-.166.072-.345.142-.49.226a9.55 9.55 0 0 0 1.64 2.842 9.18 9.18 0 0 0 3.11 2.182c.46.205.942.37 1.44.5l.031.008c.062.017.125.03.188.046a9.516 9.516 0 0 0 4.166 0c.063-.016.126-.029.188-.046l.031-.008a9.699 9.699 0 0 0 1.44-.5 9.18 9.18 0 0 0 3.11-2.182 9.551 9.551 0 0 0 1.64-2.842zm.539-8.328c-.44-.11-.879-.207-1.318-.294l-.036-.007a16.98 16.98 0 0 0-.646-.112c-.411-.064-.822-.117-1.233-.157a19.09 19.09 0 0 0-3.088-.041 19.482 19.482 0 0 0-3.087.041c-.412.04-.823.093-1.234.157a17.33 17.33 0 0 0-.646.112l-.035.007c-.44.087-.88.184-1.318.294a9.533 9.533 0 0 0 1.942 3.32c.51.206 1.04.376 1.584.507.115.027.23.05.345.072.313.06.633.11.958.148.337.039.676.066 1.022.08.169.008.337.012.506.012h.003c.17 0 .338-.004.506-.012.346-.014.685-.041 1.023-.08.325-.038.645-.088.958-.148.116-.022.23-.045.345-.072a8.66 8.66 0 0 0 1.584-.507 9.534 9.534 0 0 0 1.942-3.32zm-3.427-3.143c-.327-.02-.656-.035-.986-.043a19.92 19.92 0 0 0-1.04-.001 19.654 19.654 0 0 0-.985.043 12.92 12.92 0 0 0-1.947.26 10.423 10.423 0 0 0-.535.123c1.338 1.457 2.535 3.1 3.574 4.923a10.91 10.91 0 0 0 3.573-4.922 10.463 10.463 0 0 0-.535-.124 12.92 12.92 0 0 0-1.119-.26z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            ref={contactRef}
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-tech font-bold mb-6 text-white">Event <span className="text-hack-pink">Location</span></h2>
            <p className="text-gray-300">
              HackArena 2025 will be held at the Lecture Hall Complex (LHC), IIIT-Delhi, Okhla Industrial Estate, Phase III, New Delhi.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 h-96"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5725632020247!2d77.26991231507855!3d28.54626198245186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e564daac1d%3A0x2c582e340e7bc556!2sIIIT-Delhi!5e0!3m2!1sen!2sin!4v1650048456678!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="IIIT-Delhi Map"
              className="filter grayscale contrast-125"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-tech font-bold mb-6 text-white">Frequently Asked <span className="text-hack-mint">Questions</span></h2>
            <p className="text-gray-300">
              Have questions about contacting us? Find answers below.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How quickly will you respond to my inquiry?",
                answer: "We aim to respond to all inquiries within 24-48 hours during weekdays. For urgent matters related to the hackathon, please mention 'URGENT' in your subject line."
              },
              {
                question: "I want to sponsor HackArena. Who should I contact?",
                answer: "For sponsorship inquiries, please email us at collabwithigniteroom@gmail.com with the subject line 'Sponsorship Inquiry - HackArena 2025'. Our team will get back to you with sponsorship packages and opportunities."
              },
              {
                question: "Can I visit the venue before the event?",
                answer: "Yes, we can arrange venue visits for sponsors and partners. For participants, we'll be hosting pre-event sessions at the venue in May 2025 where you can familiarize yourself with the space."
              },
              {
                question: "I'm interested in being a mentor or judge. How can I apply?",
                answer: "We're always looking for industry professionals and academics to join as mentors and judges. Please send your CV and areas of expertise to our email with the subject 'Mentor/Judge Application - HackArena 2025'."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
            <h2 className="text-3xl font-tech font-bold mb-6 text-white">Ready to <span className="text-hack-mint">Join</span> HackArena?</h2>
            <p className="text-gray-300 mb-8">
              Register now for HackArena 2025 and be part of the ultimate esports-themed hackathon experience!
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
