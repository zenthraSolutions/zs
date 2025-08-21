import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Globe, 
  Server, 
  Palette, 
  Cloud, 
  Zap, 
  Users, 
  Shield,
  GitBranch,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const mainServices = [
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications using React Native. Native performance with code reusability across iOS and Android platforms.',
      features: ['React Native', 'iOS & Android', 'Native Performance', 'App Store Deployment'],
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      bgGradient: 'from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20',
    },
    {
      icon: Globe,
      title: 'Web Application Development',
      description: 'Modern, scalable web applications built with React.js, Next.js, and cutting-edge technologies for optimal performance.',
      features: ['React.js & Next.js', 'TypeScript', 'Responsive Design', 'SEO Optimization'],
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-green-50 via-teal-50 to-cyan-50 dark:from-green-900/20 dark:via-teal-900/20 dark:to-cyan-900/20',
    },
    {
      icon: Server,
      title: 'Backend & API Development',
      description: 'Robust backend solutions with Node.js, Express.js, and database integration. Scalable APIs for your applications.',
      features: ['Node.js & Express', 'Database Design', 'REST & GraphQL APIs', 'Cloud Integration'],
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 via-red-50 to-pink-50 dark:from-orange-900/20 dark:via-red-900/20 dark:to-pink-900/20',
    },
    {
      icon: Palette,
      title: 'UI/UX Design & Development',
      description: 'Beautiful, intuitive user interfaces with exceptional user experience. Design systems that scale with your business.',
      features: ['Modern UI Design', 'User Experience', 'Design Systems', 'Interactive Prototypes'],
      gradient: 'from-violet-500 via-purple-500 to-indigo-500',
      bgGradient: 'from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-indigo-900/20',
    },
  ];

  const additionalServices = [
    { icon: Cloud, title: 'Cloud Solutions', description: 'AWS, Azure & Google Cloud deployment', color: 'text-blue-600 dark:text-blue-400' },
    { icon: Zap, title: 'Performance Optimization', description: 'Speed & efficiency improvements', color: 'text-yellow-600 dark:text-yellow-400' },
    { icon: Users, title: 'Team Augmentation', description: 'Extend your development team', color: 'text-green-600 dark:text-green-400' },
    { icon: Shield, title: 'Security & Maintenance', description: 'Ongoing support & security updates', color: 'text-red-600 dark:text-red-400' },
    { icon: GitBranch, title: 'DevOps & CI/CD', description: 'Automated deployment pipelines', color: 'text-purple-600 dark:text-purple-400' },
    { icon: Search, title: 'Code Review & Consulting', description: 'Architecture & best practices', color: 'text-teal-600 dark:text-teal-400' },
  ];

  return (
    <section id="services" ref={containerRef} className="relative py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: springY1, rotate }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: springY2 }}
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"
        />
        <motion.div
          style={{ y: springY1, scale }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-lg"
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-violet-400/30 to-purple-400/30 transform rotate-45 blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced animations */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-6"
          >
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
              Comprehensive Software Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4"
          >
            From concept to deployment, we deliver end-to-end software solutions
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-gray-500 dark:text-gray-500 max-w-4xl mx-auto"
          >
            that drive business growth and provide exceptional user experiences across all platforms.
          </motion.p>
        </motion.div>

        {/* Main Services Grid with enhanced cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
              
              {/* Main card */}
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`w-full h-full bg-gradient-to-r ${service.gradient} rounded-full blur-xl`}
                  />
                </div>

                {/* Icon with enhanced styling */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features with enhanced styling */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 + featureIndex * 0.1 }}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-2 shadow-sm`} />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Learn more button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services with modern grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Additional Expertise
              </span>
            </motion.h3>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/50 to-purple-50/50 dark:from-transparent dark:via-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </motion.div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;