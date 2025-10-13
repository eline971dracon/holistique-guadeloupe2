import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Home, BookOpen, Users, Feather, Heart, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', text: 'Accueil', icon: Home },
    { to: '/mon-voyage-interieur', text: 'Mon Voyage Intérieur', icon: Compass },
    { to: '/annuaire-gate', text: 'Annuaire', icon: Users },
    { to: '/rejoindre-aventure', text: 'Artiste Thérapeute', icon: Feather },
    { to: '/eline-dracon', text: 'Éline Dracon', icon: Heart },
    { to: '/blog', text: 'Blog', icon: BookOpen },
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: { opacity: 1, y: '0%' },
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
      isActive
        ? 'text-primary bg-primary/10'
        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-background/80 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-primary chakra-glow" />
                <span className="text-2xl font-bold aura-text font-['Dancing_Script']">Terra Nova</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navLinkClasses}>
                    {item.text}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl shadow-lg pb-4"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.text}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navigation;