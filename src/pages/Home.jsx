// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Timeline from '../components/sections/Timeline';
import Sponsors from '../components/sections/Sponsors';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import ParallaxSection from '../components/animations/ParallaxSection';
import TextReveal from '../components/animations/TextReveal';

const Home = () => {
  return (
    <div className="bg-hack-black overflow-hidden">
      <Hero />
      
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      
      <ParallaxSection speed={-0.2}>
        <div className="py-20">
          <TextReveal 
            text="JOIN THE ULTIMATE ESPORTS HACKATHON EXPERIENCE" 
            className="text-4xl md:text-5xl font-tech font-bold text-center text-white mb-8"
          />
          <RevealOnScroll delay={0.4}>
            <p className="text-center text-gray-400 max-w-3xl mx-auto">
              HackArena brings together the brightest minds in gaming, esports, and technology
              for an unforgettable 36-hour innovation sprint at IIIT-Delhi.
            </p>
          </RevealOnScroll>
        </div>
      </ParallaxSection>
      
      <RevealOnScroll direction="left">
        <Timeline />
      </RevealOnScroll>
      
      <RevealOnScroll direction="right">
        <Sponsors />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>
      
      <RevealOnScroll direction="up">
        <CTA />
      </RevealOnScroll>
    </div>
  );
};

export default Home;
