import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Smartphone, 
  Globe, 
  Server, 
  TrendingUp,
  Award,
  Lightbulb,
  Handshake,
  Target,
  Zap,
  Users,
  Star,
  ShoppingBag,
  Heart,
  DollarSign,
  BookOpen,
  Home,
  Utensils,
  Truck,
  Video
} from 'lucide-react';

const About: React.FC = () => {
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
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const stats = [
    { number: '5+', label: 'Years', sublabel: 'In Business', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { number: '100+', label: 'Projects', sublabel: 'Successfully Delivered', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { number: '50+', label: 'Clients', sublabel: 'Worldwide', icon: Users, color: 'from-green-500 to-teal-500' },
    { number: '98%', label: 'Client Satisfaction', sublabel: 'Rate', icon: Star, color: 'from-orange-500 to-red-500' },
  ];

  const expertise = [
    {
      icon: Smartphone,
      title: 'Mobile Solutions',
      description: 'Cross-platform mobile applications with native performance',
      skills: ['React Native', 'iOS Development', 'Android Development', 'App Store Optimization'],
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      pattern: 'mobile'
    },
    {
      icon: Globe,
      title: 'Web Solutions',
      description: 'Modern, scalable web applications and progressive web apps',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Progressive Web Apps'],
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      pattern: 'web'
    },
    {
      icon: Server,
      title: 'Backend Solutions',
      description: 'Robust server-side architecture and API development',
      skills: ['Node.js', 'Express.js', 'Database Design', 'Cloud Integration'],
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      pattern: 'backend'
    },
  ];

  const industries = [
    { name: 'E-commerce & Retail', icon: ShoppingBag, color: 'from-blue-500 to-purple-500' },
    { name: 'Healthcare & Medical', icon: Heart, color: 'from-green-500 to-teal-500' },
    { name: 'Finance & Fintech', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
    { name: 'Education & E-learning', icon: BookOpen, color: 'from-indigo-500 to-blue-500' },
    { name: 'Real Estate', icon: Home, color: 'from-purple-500 to-pink-500' },
    { name: 'Food & Hospitality', icon: Utensils, color: 'from-red-500 to-orange-500' },
    { name: 'Logistics & Transportation', icon: Truck, color: 'from-teal-500 to-cyan-500' },
    { name: 'Entertainment & Media', icon: Video, color: 'from-pink-500 to-red-500' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver high-quality solutions that exceed expectations and drive business success.',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Staying ahead of technology trends to provide cutting-edge solutions for our clients.',
      gradient: 'from-blue-400 to-purple-500',
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'Building long-term relationships with clients through trust, transparency, and collaboration.',
      gradient: 'from-green-400 to-teal-500',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Committed to continuous improvement and helping our clients scale their businesses.',
      gradient: 'from-pink-400 to-red-500',
    },
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: springY1, rotate }}
          className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
        />
        <motion.div
          style={{ y: springY2, scale }}
          className="absolute bottom-40 left-20 w-56 h-56 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: springY1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
        />
        
        {/* Animated geometric patterns */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-violet-400/40 to-purple-400/40 transform rotate-45"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-emerald-400/40 to-teal-400/40 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              About Zenthra Solutions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-4"
          >
            Leading Software Development Company
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '120px' } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Story Section with enhanced layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Story
                </span>
              </h3>
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg leading-relaxed"
                >
                  Zenthra Solutions was founded with a mission to bridge the gap between innovative ideas 
                  and exceptional digital products. Over the past 5+ years, we've grown from a small team 
                  of passionate developers to a full-service software development company.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-lg leading-relaxed"
                >
                  We specialize in mobile and web solutions, delivering cross-platform applications and 
                  modern digital experiences. Our expertise spans across various industries, helping startups 
                  and enterprises achieve their digital transformation goals.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-lg leading-relaxed"
                >
                  Our commitment to quality, innovation, and client success has earned us a reputation as 
                  a trusted technology partner. We don't just build software; we craft solutions that drive 
                  business growth and create lasting value.
                </motion.p>
              </div>
            </motion.div>
            
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Our Expertise
              </span>
            </h3>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Animated background pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Enhanced icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg relative z-10`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
                  {item.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10">
                  {item.description}
                </p>
                
                <div className="space-y-2 relative z-10">
                  {item.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.2 + skillIndex * 0.1 }}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full mr-3 shadow-sm`} />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h3>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-8 h-8 bg-gradient-to-r ${industry.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md`}
                  >
                    <industry.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-gray-900 dark:text-white font-medium text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {industry.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Our Values
              </span>
            </h3>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100px' } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group text-center relative"
              >
                {/* Enhanced icon with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300">
                  {value.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;