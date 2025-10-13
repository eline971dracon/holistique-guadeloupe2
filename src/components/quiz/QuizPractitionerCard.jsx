import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const QuizPractitionerCard = ({ therapist, result }) => {
  const TherapistIcon = result.icon;
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }} 
        className={`crystal-card rounded-3xl p-8 text-center border-2 ${result.color.replace('from-', 'border-').split(' ')[0]}`}
      >
        <img src={therapist.image} alt={`Photo de ${therapist.name}`} className="w-40 h-40 object-cover rounded-full mx-auto mb-6 shadow-lg" />
        <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold mb-4 bg-gradient-to-r ${result.color} text-white`}>
          <TherapistIcon className="w-4 h-4" /> {result.vibrationKey}
        </div>
        <h2 className="text-4xl font-bold mb-3 aura-text font-['Dancing_Script']">{therapist.name}</h2>
        <p className="text-lg text-foreground/80 italic mb-4">« {therapist.mantraSoin || therapist.mantra} »</p>
        <p className="text-foreground/90 mb-8">{therapist.messageBienvenue || "Un message de bienvenue vous attend."}</p>
        
        <Link to={`/therapeute/${therapist.id}`}>
            <Button size="lg" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              Découvrir son univers
            </Button>
        </Link>

      </motion.div>
    </div>
  );
};

export default QuizPractitionerCard;