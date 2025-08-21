import React from 'react';
import { motion } from 'framer-motion';
import { Code, Mail, Phone, MapPin, Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-6 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Zenthra Solutions</span>
            </motion.div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Leading software development company specializing in React Native, React.js, and full-stack solutions. 
              Transforming ideas into exceptional digital experiences.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a 
                  href="mailto:team.zenthra@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  team.zenthra@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a 
                  href="tel:+918468893464"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91-8468893464
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Mobile App Development',
                'Web Development',
                'Backend Development',
                'UI/UX Design',
              ].map((service) => (
                <li key={service}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {service}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.name}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </motion.button>
                </li>
              ))}
              <li>
                <span className="text-gray-300">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} Zenthra Solutions.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in India.</span>
              <span>All rights reserved.</span>
            </div>
            
            {/* Admin Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/admin')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Admin Access"
            >
              <Shield className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;