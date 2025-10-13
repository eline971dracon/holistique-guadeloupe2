import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Repeat, Users, Heart } from 'lucide-react';

const QuizResult = ({ result, selectedTherapist, onRestart, onPractitionerCard }) => {
  const ResultIcon = result.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }} 
        className="crystal-card rounded-3xl p-8 md:p-12 text-center"
      >
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center chakra-glow`}>
          <ResultIcon className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 aura-text font-['Dancing_Script']">{result.name}</h1>
        <p className="text-xl text-foreground/80 mb-4">{result.description}</p>
        <p className="text-lg text-emerald-600 italic mb-8">Suggestion : {result.suggestion}</p>
        
        {selectedTherapist ? (
          <Button onClick={onPractitionerCard} size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            Découvrir votre rencontre alignée <Heart className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <p className="text-center text-foreground/80">Aucun praticien ne correspond parfaitement à cette vibration pour le moment. L'Univers vous invite peut-être à explorer librement !</p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button onClick={onRestart} variant="outline"><Repeat className="w-5 h-5 mr-2" />Refaire un voyage</Button>
          <Link to="/annuaire"><Button variant="outline"><Users className="w-5 h-5 mr-2" />Explorer l'Annuaire</Button></Link>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResult;