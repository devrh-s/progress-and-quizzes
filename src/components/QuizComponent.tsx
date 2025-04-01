
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  quiz: {
    id: string;
    title: string;
    difficulty: string;
    questions: QuizQuestion[];
  };
  onComplete: (score: number) => void;
}

export const QuizComponent: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<{text: string, originalIndex: number}[]>([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{question: number, selected: number, correct: number}[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Shuffle options when question changes
  useEffect(() => {
    if (currentQuestion) {
      const options = currentQuestion.options.map((text, originalIndex) => ({
        text,
        originalIndex
      }));
      
      // Fisher-Yates shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      setShuffledOptions(options);
    }
  }, [currentQuestion, currentQuestionIndex]);
  
  // Timer
  useEffect(() => {
    if (isAnswered || isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex, isAnswered, isCompleted]);
  
  // Reset timer when moving to next question
  useEffect(() => {
    setTimeRemaining(30);
  }, [currentQuestionIndex]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleAnswer = () => {
    if (isAnswered || isCompleted) return;
    
    const correctOptionIndex = shuffledOptions.findIndex(
      option => option.originalIndex === currentQuestion.correctAnswer
    );
    
    const isCorrect = selectedOption === correctOptionIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [
      ...prev, 
      {
        question: currentQuestionIndex,
        selected: selectedOption !== null ? shuffledOptions[selectedOption].originalIndex : -1,
        correct: currentQuestion.correctAnswer
      }
    ]);
    
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      onComplete(score);
    }
  };

  const getColorClass = (index: number) => {
    if (!isAnswered) {
      return selectedOption === index 
        ? 'bg-purple-700 border-purple-500 text-white' 
        : 'bg-gray-800 border-gray-700 hover:bg-gray-700';
    }
    
    const isCorrectOption = shuffledOptions[index].originalIndex === currentQuestion.correctAnswer;
    
    if (isCorrectOption) {
      return 'bg-green-700 border-green-500 text-white';
    }
    
    if (selectedOption === index) {
      return 'bg-red-700 border-red-500 text-white';
    }
    
    return 'bg-gray-800 border-gray-700 opacity-60';
  };

  const progress = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100;

  return (
    <div className="fantasy-card p-6">
      {isCompleted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">Quiz Completed!</h2>
          <div className="text-4xl font-bold text-white mb-6">
            {score} / {quiz.questions.length}
          </div>
          <p className="mb-8 text-gray-300">
            {score === quiz.questions.length 
              ? "Perfect score! You've mastered this topic!"
              : score > quiz.questions.length / 2
              ? "Great job! You've got a good understanding of this material."
              : "Keep studying! You'll improve with practice."}
          </p>
          <Button 
            onClick={() => onComplete(score)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          >
            Return to Quizzes
          </Button>
        </div>
      ) : (
        <>
          {/* Progress and Timer */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-purple-300">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
            <div className="text-sm text-yellow-300">
              Time remaining: {timeRemaining}s
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-6" />
          
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-1">
              Question {currentQuestionIndex + 1}
            </h3>
            <p className="text-lg text-gray-200">{currentQuestion.question}</p>
          </div>
          
          {/* Options */}
          <div className="space-y-3 mb-6">
            {shuffledOptions.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${getColorClass(index)}`}
                onClick={() => handleSelectOption(index)}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                disabled={isAnswered}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 mt-0.5">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
          
          {/* Answer/Next button */}
          <div className="flex justify-between">
            {!isAnswered ? (
              <Button 
                onClick={handleAnswer}
                disabled={selectedOption === null}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-50"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                Next Question
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
