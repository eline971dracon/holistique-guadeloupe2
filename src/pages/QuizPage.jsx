import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import * as LucideIcons from 'lucide-react';
import { generateQuizQuestions, calculateResult, frequencies } from '@/lib/quizLogic';
import QuizStart from '@/components/quiz/QuizStart';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResult from '@/components/quiz/QuizResult';
import QuizPractitionerCard from '@/components/quiz/QuizPractitionerCard';

const QuizPage = () => {
  const [quizState, setQuizState] = useState('start'); // 'start', 'in_progress', 'finished', 'practitioner_card'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultData, setResultData] = useState({ result: null, therapist: null });

  const quizQuestions = useMemo(() => generateQuizQuestions(), [quizState === 'start']);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResultData({ result: null, therapist: null });
    setQuizState('in_progress');
  };
  
  const handleAnswer = (freq) => {
    const newAnswers = [...answers, freq];
    setAnswers(newAnswers);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const { result, therapist } = calculateResult(newAnswers);
      const IconComponent = LucideIcons[result.icon] || LucideIcons.Heart;
      setResultData({ result: {...result, icon: IconComponent }, therapist });
      setQuizState('finished');
    }
  };

  const renderContent = () => {
    switch (quizState) {
      case 'start':
        return <QuizStart onStart={startQuiz} />;

      case 'in_progress':
        if (!quizQuestions || quizQuestions.length === 0) return null;
        return (
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            onAnswer={handleAnswer}
          />
        );

      case 'finished':
        if (!resultData.result) return null;
        return (
          <QuizResult
            result={resultData.result}
            selectedTherapist={resultData.therapist}
            onRestart={startQuiz}
            onPractitionerCard={() => setQuizState('practitioner_card')}
          />
        );
        
      case 'practitioner_card':
        if (!resultData.therapist || !resultData.result) return null;
        return (
            <QuizPractitionerCard 
                therapist={resultData.therapist} 
                result={resultData.result}
            />
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Quiz Vibratoire - Terra Nova</title>
        <meta name="description" content="Un quiz sensible et poétique pour écouter l'âme du jour." />
      </Helmet>
      {renderContent()}
    </div>
  );
};

export default QuizPage;