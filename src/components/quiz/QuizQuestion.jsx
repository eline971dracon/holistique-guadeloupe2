import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const QuizQuestion = ({ question, questionIndex, totalQuestions, onAnswer }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="crystal-card rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-foreground/80 mb-4">
              Question {questionIndex + 1} sur {totalQuestions}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 aura-text font-['Dancing_Script']">
              {question.question}
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-3 mb-8">
            {question.choices.map((choice, index) => (
              <motion.div 
                key={choice.text} 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Button
                  onClick={() => onAnswer(choice.freq)}
                  variant="outline"
                  className="w-full md:w-96 min-h-[4rem] py-3 text-base rounded-full border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 text-wrap text-center"
                  style={{ whiteSpace: 'normal', height: 'auto' }}
                >
                  {choice.text}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizQuestion;