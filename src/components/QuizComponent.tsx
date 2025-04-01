
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, Reorder } from 'framer-motion';
import { Check, X, DragHandleDots2 } from 'lucide-react';

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

type QuizOptionType = {
  text: string;
  originalIndex: number;
};

export const QuizComponent: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<QuizOptionType[]>([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{question: number, selected: number[], correct: number}[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizType, setQuizType] = useState<'order' | 'match'>('order');

  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Initialize question type and shuffle options when question changes
  useEffect(() => {
    if (currentQuestion) {
      // Randomly decide quiz type - ordering or matching
      setQuizType(Math.random() > 0.5 ? 'order' : 'match');
      
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

  const handleAnswer = () => {
    if (isAnswered || isCompleted) return;
    
    // For ordering quiz type
    if (quizType === 'order') {
      const userOrderedIndexes = shuffledOptions.map(option => option.originalIndex);
      const isCorrect = userOrderedIndexes[0] === currentQuestion.correctAnswer;
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      setAnswers(prev => [
        ...prev, 
        {
          question: currentQuestionIndex,
          selected: userOrderedIndexes,
          correct: currentQuestion.correctAnswer
        }
      ]);
    } else {
      // For matching quiz type
      const correctOptionIndex = shuffledOptions.findIndex(
        option => option.originalIndex === currentQuestion.correctAnswer
      );
      
      const isCorrect = correctOptionIndex === 0; // If first option is correct
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      setAnswers(prev => [
        ...prev, 
        {
          question: currentQuestionIndex,
          selected: [shuffledOptions[0].originalIndex],
          correct: currentQuestion.correctAnswer
        }
      ]);
    }
    
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      onComplete(score);
    }
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
            
            {quizType === 'order' ? (
              <p className="text-sm text-purple-300 mt-2">
                Drag to reorder the options. Place the correct answer at the top.
              </p>
            ) : (
              <p className="text-sm text-purple-300 mt-2">
                Drag the correct answer to the golden area below.
              </p>
            )}
          </div>
          
          {/* Interactive Quiz Area */}
          {quizType === 'order' ? (
            // Ordering type quiz
            <div className="space-y-2 mb-6">
              <Reorder.Group 
                axis="y" 
                values={shuffledOptions} 
                onReorder={setShuffledOptions}
                className="space-y-2"
              >
                {shuffledOptions.map((option, index) => (
                  <Reorder.Item
                    key={option.originalIndex}
                    value={option}
                    className={`w-full text-left p-4 rounded-lg border 
                      ${isAnswered 
                        ? option.originalIndex === currentQuestion.correctAnswer 
                          ? 'bg-green-700 border-green-500 text-white' 
                          : 'bg-gray-800 border-gray-700'
                        : 'bg-gray-800 border-gray-700 cursor-grab active:cursor-grabbing'
                      }`}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center">
                      {isAnswered ? (
                        option.originalIndex === currentQuestion.correctAnswer ? (
                          <Check size={18} className="text-green-400 mr-3 flex-shrink-0" />
                        ) : (
                          <X size={18} className="text-red-400 mr-3 flex-shrink-0" />
                        )
                      ) : (
                        <DragHandleDots2 size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span>{option.text}</span>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          ) : (
            // Matching type quiz
            <div className="mb-6">
              <div className="border-2 border-dashed border-yellow-500 rounded-lg p-4 mb-4 h-20 flex items-center justify-center bg-yellow-900/20">
                {shuffledOptions.length > 0 && shuffledOptions[0] && (
                  <motion.div 
                    className={`w-full p-3 rounded-lg text-center
                      ${isAnswered 
                        ? shuffledOptions[0].originalIndex === currentQuestion.correctAnswer 
                          ? 'bg-green-700 text-white' 
                          : 'bg-red-700 text-white'
                        : 'bg-purple-900/50 text-white'
                      }`}
                  >
                    {shuffledOptions[0].text}
                  </motion.div>
                )}
              </div>
              
              <Reorder.Group 
                axis="y" 
                values={shuffledOptions.slice(1)} 
                onReorder={(newOrder) => {
                  setShuffledOptions([shuffledOptions[0], ...newOrder]);
                }}
                className="space-y-2"
              >
                {shuffledOptions.slice(1).map((option) => (
                  <Reorder.Item
                    key={option.originalIndex}
                    value={option}
                    className={`w-full text-left p-4 rounded-lg border bg-gray-800 border-gray-700
                      ${isAnswered 
                        ? option.originalIndex === currentQuestion.correctAnswer 
                          ? 'border-green-500' 
                          : ''
                        : 'cursor-grab active:cursor-grabbing'
                      }`}
                    disabled={isAnswered}
                  >
                    <div className="flex items-center">
                      <DragHandleDots2 size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                      <span>{option.text}</span>
                      {isAnswered && option.originalIndex === currentQuestion.correctAnswer && (
                        <Check size={18} className="text-green-400 ml-auto" />
                      )}
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}
          
          {/* Answer/Next button */}
          <div className="flex justify-between">
            {!isAnswered ? (
              <Button 
                onClick={handleAnswer}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
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
