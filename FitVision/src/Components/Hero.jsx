import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleGetStartedClick = () => {
    navigate('/auth'); // Navigate to the Auth page
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[linear-gradient(135deg,#000a06_0%,#115739_50%,#4ead85_100%)]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
        }}
      />
      <div className="flex flex-col items-center justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold text-white mb-8"
        >
          FitVision
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0, delay: 0 }}
          onClick={handleGetStartedClick} // Call the navigate function
          className="px-8 py-3 bg-white text-black rounded-full font-semibold text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;