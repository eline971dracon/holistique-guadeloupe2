import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const QuizStart = ({ onStart }) => {
  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="aura-text font-['Dancing_Script']">Écoutez votre âme du jour</span>
        </h1>
        <p className="text-xl text-foreground/80 mb-10">
          Ce quiz est une invitation à l'introspection. Il n'y a pas de bonnes ou de mauvaises réponses, juste le murmure de votre vibration actuelle.
        </p>
        <Button 
          onClick={onStart} 
          size="lg" 
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-6 text-xl rounded-full shadow-lg energy-pulse"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Commencer le voyage
        </Button>
      </motion.div>
    </div>
  );
};

export default QuizStart;