import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!isTouchDevice()) {
      setShowCursor(true);
      const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      document.body.classList.add('desktop-cursor');
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.classList.remove('desktop-cursor');
      };
    } else {
      setShowCursor(false);
      document.body.classList.remove('desktop-cursor');
    }
  }, []);

  if (!showCursor) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-hack-mint pointer-events-none"
        style={{ zIndex: 9999, mixBlendMode: 'difference' }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-hack-pink pointer-events-none"
        style={{ zIndex: 9999, mixBlendMode: 'difference' }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 2 : 1,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 500 }}
      />
    </>
  );
};

export default CustomCursor;
