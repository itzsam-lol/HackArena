import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logo image (use your favicon-1.jpg or logo.png in public or src/assets)
const logoSrc = '/favicon-1.jpg';

const psSymbols = [
  { symbol: '△', color: 'from-hack-mint to-hack-pink' },
  { symbol: 'O', color: 'from-hack-mint to-hack-pink' },
  { symbol: 'X', color: 'from-hack-mint to-hack-pink' },
  { symbol: '◻', color: 'from-hack-mint to-hack-pink' },
];

const AnimatedLogoCircle = () => {
  const [showSymbols, setShowSymbols] = useState(false);

  // For mobile: toggle on tap
  const handleTap = () => setShowSymbols((prev) => !prev);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowSymbols(true)}
      onMouseLeave={() => setShowSymbols(false)}
      onTouchStart={handleTap}
      onTouchEnd={handleTap}
      style={{ minHeight: 180, minWidth: 180 }}
    >
      {/* Animated glowing circle background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-hack-mint via-hack-pink to-hack-red blur-2xl opacity-40"
        animate={{
          scale: showSymbols ? 1.15 : 1,
          rotate: showSymbols ? 45 : 0,
          opacity: showSymbols ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.5 }}
      />
      {/* Foreground circle */}
      <motion.div
        className="relative flex items-center justify-center rounded-full bg-black border-4 border-hack-pink shadow-xl"
        style={{ width: 150, height: 150 }}
        animate={{
          boxShadow: showSymbols
            ? '0 0 40px #FF1F71, 0 0 80px #4FFFB0'
            : '0 0 20px #4FFFB0, 0 0 40px #FF1F71',
        }}
        transition={{ duration: 0.5 }}
      >
        {/* AnimatePresence for crossfade */}
        <AnimatePresence mode="wait">
          {!showSymbols ? (
            <motion.img
              key="logo"
              src={logoSrc}
              alt="HackArena Logo"
              className="w-24 h-24 object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}
              draggable={false}
            />
          ) : (
            <motion.div
              key="symbols"
              className="flex space-x-2 text-5xl md:text-6xl font-tech font-bold"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.4 }}
            >
              {psSymbols.map((s, i) => (
                <motion.span
                  key={s.symbol}
                  className={`bg-gradient-to-r ${s.color} text-transparent bg-clip-text`}
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  {s.symbol}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AnimatedLogoCircle;
