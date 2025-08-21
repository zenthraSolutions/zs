import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatItem {
  number: string;
  label: string;
  targetValue: number;
  suffix: string;
}

const Stats: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats: StatItem[] = [
    { number: '5+', label: 'Years in Business', targetValue: 5, suffix: '+' },
    { number: '100+', label: 'Projects Delivered', targetValue: 100, suffix: '+' },
    { number: '50+', label: 'Happy Clients', targetValue: 50, suffix: '+' },
    { number: '24/7', label: 'Support Available', targetValue: 24, suffix: '/7' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: StatItem;
  index: number;
  inView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.targetValue / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.targetValue) {
            setCount(stat.targetValue);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }, index * 200); // Stagger the animations

      return () => clearTimeout(timer);
    }
  }, [inView, stat.targetValue, index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center p-8 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 backdrop-blur-sm rounded-2xl border border-blue-100 dark:border-blue-800 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-3"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        {inView ? `${count}${stat.suffix}` : '0'}
      </motion.div>
      <div className="text-gray-700 dark:text-gray-300 font-medium text-lg">
        {stat.label}
      </div>
    </motion.div>
  );
};

export default Stats;