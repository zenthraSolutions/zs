import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cursor glow effect */}
      <div
        className="fixed pointer-events-none z-30 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-black" />
      
      {/* Animated background shapes - Faster animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circles */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-cyan-200/20 dark:from-teal-600/10 dark:to-cyan-600/10 rounded-full blur-3xl"
        />

        {/* Medium floating shapes */}
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-orange-200/15 to-pink-200/15 dark:from-orange-600/8 dark:to-pink-600/8 rounded-full blur-2xl"
        />

        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -60, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-to-r from-indigo-200/15 to-blue-200/15 dark:from-indigo-600/8 dark:to-blue-600/8 rounded-full blur-2xl"
        />

        {/* Small floating elements */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/5 right-1/5 w-32 h-32 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 dark:from-emerald-600/10 dark:to-teal-600/10 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/5 right-2/5 w-40 h-40 bg-gradient-to-r from-violet-200/20 to-purple-200/20 dark:from-violet-600/10 dark:to-purple-600/10 rounded-full blur-xl"
        />

        {/* Geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-2/5 left-1/6 w-24 h-24 bg-gradient-to-r from-rose-200/15 to-pink-200/15 dark:from-rose-600/8 dark:to-pink-600/8 transform rotate-45 blur-lg"
        />

        <motion.div
          animate={{
            rotate: [0, -360],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-2/5 left-2/3 w-20 h-20 bg-gradient-to-r from-amber-200/15 to-yellow-200/15 dark:from-amber-600/8 dark:to-yellow-600/8 rounded-lg blur-lg"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Crafting Scalable Software with Precision Pill */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Crafting Scalable Software with Precision
              </span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block text-gray-900 dark:text-white mb-2">
                Transforming Ideas Into
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent pb-2">
                Digital Reality
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Leading software development company specializing in React Native, React.js, and full-stack solutions. 
            We deliver innovative mobile and web applications that drive business growth and create exceptional user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToServices}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;