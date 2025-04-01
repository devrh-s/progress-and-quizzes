
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Check, X, GripVertical, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Question types
interface MatchingQuestion {
  type: 'matching';
  question: string;
  items: string[];
  descriptions: string[];
  correctPairs: number[]; // Index of correct description for each item
}

interface SequencingQuestion {
  type: 'sequencing';
  question: string;
  steps: string[];
  correctOrder: number[]; // Correct order of indices
}

interface SortingQuestion {
  type: 'sorting';
  question: string;
  activities: string[];
  categories: string[];
  correctCategories: number[]; // Category index for each activity
}

interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswer: number;
}

type QuizQuestion = MatchingQuestion | SequencingQuestion | SortingQuestion | MultipleChoiceQuestion;

interface QuizProps {
  quiz: {
    id: string;
    title: string;
    difficulty: string;
    questions: QuizQuestion[];
    timeLimit: number;
  };
  onComplete: (score: number) => void;
}

// Item types for drag and drop
type DraggableItem = {
  id: number;
  text: string;
  category?: number; // For sorting questions
};

export const QuizComponent: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit || 60);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // State for different question types
  const [matchingPairs, setMatchingPairs] = useState<{item: DraggableItem, description: DraggableItem}[]>([]);
  const [sequenceItems, setSequenceItems] = useState<DraggableItem[]>([]);
  const [sortedItems, setSortedItems] = useState<{category: string, items: DraggableItem[]}[]>([]);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<DraggableItem[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Drag state
  const [dragItem, setDragItem] = useState<any>(null);
  const [dragItemType, setDragItemType] = useState<'matching' | 'sequencing' | 'sorting' | null>(null);
  const [draggedOverCategory, setDraggedOverCategory] = useState<number | null>(null);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  // Initialize question based on its type
  useEffect(() => {
    if (!currentQuestion) return;
    
    setIsAnswered(false);
    setLoading(true);
    setSelectedOption(null);
    setDragItem(null);
    setDragItemType(null);
    setDraggedOverCategory(null);
    
    // Small delay to ensure state is reset between questions
    const timer = setTimeout(() => {
      switch(currentQuestion.type) {
        case 'matching':
          // Initialize matching pairs
          const itemsList = currentQuestion.items.map((text, id) => ({ id, text }));
          const descriptionsList = currentQuestion.descriptions.map((text, id) => ({ id, text }));
          
          // Shuffle descriptions
          const shuffledDescriptions = [...descriptionsList];
          for (let i = shuffledDescriptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDescriptions[i], shuffledDescriptions[j]] = [shuffledDescriptions[j], shuffledDescriptions[i]];
          }
          
          // Create pairs
          const pairs = itemsList.map((item, index) => ({
            item,
            description: shuffledDescriptions[index]
          }));
          
          setMatchingPairs(pairs);
          break;
          
        case 'sequencing':
          // Initialize sequence items and shuffle them
          let seqItems = currentQuestion.steps.map((text, id) => ({ id, text }));
          
          // Fisher-Yates shuffle
          for (let i = seqItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [seqItems[i], seqItems[j]] = [seqItems[j], seqItems[i]];
          }
          
          setSequenceItems(seqItems);
          break;
          
        case 'sorting':
          // Initialize categories and items
          const categories = currentQuestion.categories.map(cat => ({
            category: cat,
            items: [] as DraggableItem[]
          }));
          
          // Add unsorted category for initial state
          categories.push({
            category: "Unsorted Items",
            items: currentQuestion.activities.map((text, id) => ({ id, text }))
          });
          
          // Shuffle unsorted items
          const unsortedItems = categories[categories.length - 1].items;
          for (let i = unsortedItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [unsortedItems[i], unsortedItems[j]] = [unsortedItems[j], unsortedItems[i]];
          }
          
          setSortedItems(categories);
          break;
          
        case 'multiple-choice':
          // Initialize multiple choice options and shuffle them
          const options = currentQuestion.options.map((text, id) => ({ id, text }));
          
          // Fisher-Yates shuffle
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          
          setMultipleChoiceOptions(options);
          break;
      }
      
      // Reset timer
      setTimeRemaining(quiz.timeLimit || 60);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentQuestion, currentQuestionIndex]);
  
  // Timer effect
  useEffect(() => {
    if (isAnswered || isCompleted || loading) return;
    
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
  }, [currentQuestionIndex, isAnswered, isCompleted, loading]);
  
  const handleAnswer = () => {
    if (isAnswered || isCompleted || !currentQuestion) return;
    
    let isCorrect = false;
    
    switch(currentQuestion.type) {
      case 'matching':
        // Check if all pairs match correctly
        isCorrect = matchingPairs.every((pair) => 
          pair.description.id === currentQuestion.correctPairs[pair.item.id]
        );
        break;
        
      case 'sequencing':
        // Check if sequence is in correct order
        isCorrect = sequenceItems.every((item, index) => 
          item.id === currentQuestion.correctOrder[index]
        );
        break;
        
      case 'sorting':
        // Check if items are in correct categories
        const categorizedItems = sortedItems.slice(0, -1).flatMap((category, categoryIndex) => 
          category.items.map(item => ({ item, categoryIndex }))
        );
        
        if (categorizedItems.length === currentQuestion.activities.length) {
          isCorrect = categorizedItems.every(({ item, categoryIndex }) => 
            categoryIndex === currentQuestion.correctCategories[item.id]
          );
        } else {
          isCorrect = false; // Not all items are sorted
        }
        break;
        
      case 'multiple-choice':
        // Check if selected option is correct
        isCorrect = selectedOption !== null && multipleChoiceOptions[selectedOption].id === currentQuestion.correctAnswer;
        break;
    }
    
    if (isCorrect) {
      setScore(prev => prev + 1);
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
  
  // ====== MATCHING QUESTION HANDLERS ======
  const handleDragStartMatching = (pairIndex: number) => {
    if (isAnswered) return;
    
    setDragItem({ type: 'pair', index: pairIndex });
    setDragItemType('matching');
  };
  
  const handleDragOverMatching = (e: React.DragEvent, pairIndex: number) => {
    e.preventDefault();
    if (isAnswered || !dragItem || dragItemType !== 'matching') return;
  };
  
  const handleDropMatching = (targetIndex: number) => {
    if (isAnswered || !dragItem || dragItemType !== 'matching') return;
    
    const sourceIndex = dragItem.index;
    
    if (sourceIndex === targetIndex) return;
    
    setMatchingPairs(prev => {
      const newPairs = [...prev];
      const temp = newPairs[sourceIndex].description;
      newPairs[sourceIndex].description = newPairs[targetIndex].description;
      newPairs[targetIndex].description = temp;
      return newPairs;
    });
    
    setDragItem(null);
    setDragItemType(null);
  };
  
  // ====== SEQUENCING QUESTION HANDLERS ======
  const handleDragStartSequencing = (itemIndex: number) => {
    if (isAnswered) return;
    
    setDragItem({ type: 'sequence', index: itemIndex });
    setDragItemType('sequencing');
  };
  
  const handleDragOverSequencing = (e: React.DragEvent, itemIndex: number) => {
    e.preventDefault();
    if (isAnswered || !dragItem || dragItemType !== 'sequencing') return;
  };
  
  const handleDropSequencing = (targetIndex: number) => {
    if (isAnswered || !dragItem || dragItemType !== 'sequencing') return;
    
    const sourceIndex = dragItem.index;
    
    if (sourceIndex === targetIndex) return;
    
    setSequenceItems(prev => {
      const newItems = [...prev];
      const movedItem = newItems.splice(sourceIndex, 1)[0];
      newItems.splice(targetIndex, 0, movedItem);
      return newItems;
    });
    
    setDragItem(null);
    setDragItemType(null);
  };
  
  // ====== SORTING QUESTION HANDLERS ======
  const handleDragStartSorting = (itemId: number, categoryIndex: number) => {
    if (isAnswered) return;
    
    setDragItem({ type: 'sort', itemId, categoryIndex });
    setDragItemType('sorting');
  };
  
  const handleDragOverCategory = (e: React.DragEvent, categoryIndex: number) => {
    e.preventDefault();
    if (isAnswered || !dragItem || dragItemType !== 'sorting') return;
    
    setDraggedOverCategory(categoryIndex);
  };
  
  const handleDragLeaveCategory = () => {
    setDraggedOverCategory(null);
  };
  
  const handleDropSorting = (targetCategoryIndex: number) => {
    if (isAnswered || !dragItem || dragItemType !== 'sorting') return;
    
    const { itemId, categoryIndex: sourceCategoryIndex } = dragItem;
    
    if (sourceCategoryIndex === targetCategoryIndex) return;
    
    moveItemToCategory(itemId, sourceCategoryIndex, targetCategoryIndex);
    
    setDragItem(null);
    setDragItemType(null);
    setDraggedOverCategory(null);
  };
  
  const moveItemToCategory = (itemId: number, fromCategoryIndex: number, toCategoryIndex: number) => {
    if (isAnswered) return;
    
    setSortedItems(prev => {
      const newCategories = [...prev];
      
      // Find item in source category
      const sourceCategory = newCategories[fromCategoryIndex];
      const itemIndex = sourceCategory.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) return prev;
      
      // Move item to destination category
      const item = sourceCategory.items[itemIndex];
      sourceCategory.items.splice(itemIndex, 1);
      newCategories[toCategoryIndex].items.push(item);
      
      return newCategories;
    });
  };
  
  const getQuestionTitle = () => {
    if (!currentQuestion) return "";
    
    switch(currentQuestion.type) {
      case 'matching': return "Matching Blocks";
      case 'sequencing': return "Sequencing";
      case 'sorting': return "Sorting/Classification";
      case 'multiple-choice': return "Multiple Choice";
      default: return "Question";
    }
  };
  
  const getQuestionText = () => {
    return currentQuestion?.question || "";
  };
  
  const getQuestionInstructions = () => {
    if (!currentQuestion) return "";
    
    switch(currentQuestion.type) {
      case 'matching': 
        return "Match each item with its description by dragging the descriptions into the correct places.";
      case 'sequencing': 
        return "Arrange the steps in the correct order by dragging them into place.";
      case 'sorting': 
        return "Sort the items into their correct categories by dragging them.";
      case 'multiple-choice': 
        return "Select the correct answer.";
      default: 
        return "";
    }
  };
  
  const progress = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100;
  
  const renderMatchingQuestion = () => {
    if (currentQuestion?.type !== 'matching') return null;
    
    return (
      <div className="space-y-4">
        {matchingPairs.map((pair, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center"
          >
            <div className="flex-1 bg-purple-900/30 p-3 rounded-lg text-white font-medium">
              {pair.item.text}
            </div>
            <div className="w-8 flex justify-center my-1">
              {isAnswered ? (
                currentQuestion.correctPairs[pair.item.id] === pair.description.id ? (
                  <Check size={20} className="text-green-400" />
                ) : (
                  <X size={20} className="text-red-400" />
                )
              ) : (
                <span>→</span>
              )}
            </div>
            <div 
              className={`flex-1 p-3 rounded-lg cursor-grab border-2 text-left ${
                isAnswered 
                  ? currentQuestion.correctPairs[pair.item.id] === pair.description.id
                    ? "border-green-500 bg-green-900/30"
                    : "border-red-500 bg-red-900/30"
                  : "border-gray-600 bg-gray-800 hover:bg-gray-700"
              }`}
              draggable={!isAnswered}
              onDragStart={() => handleDragStartMatching(index)}
              onDragOver={(e) => handleDragOverMatching(e, index)}
              onDrop={() => handleDropMatching(index)}
            >
              <div className="flex items-center">
                {!isAnswered && (
                  <GripVertical size={18} className="text-gray-400 mr-3 flex-shrink-0" />
                )}
                {pair.description.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderSequencingQuestion = () => {
    if (currentQuestion?.type !== 'sequencing') return null;
    
    return (
      <div className="space-y-2">
        {sequenceItems.map((item, index) => (
          <div
            key={item.id.toString()}
            className={`w-full text-left p-4 rounded-lg border ${
              isAnswered
                ? item.id === currentQuestion.correctOrder[index]
                  ? "bg-green-700/40 border-green-500 text-white"
                  : "bg-red-700/20 border-red-500/50 text-white"
                : "bg-gray-800 border-gray-700 cursor-grab active:cursor-grabbing"
            }`}
            draggable={!isAnswered}
            onDragStart={() => handleDragStartSequencing(index)}
            onDragOver={(e) => handleDragOverSequencing(e, index)}
            onDrop={() => handleDropSequencing(index)}
          >
            <div className="flex items-center">
              {isAnswered ? (
                item.id === currentQuestion.correctOrder[index] ? (
                  <Check size={18} className="text-green-400 mr-3 flex-shrink-0" />
                ) : (
                  <X size={18} className="text-red-400 mr-3 flex-shrink-0" />
                )
              ) : (
                <GripVertical size={18} className="text-gray-400 mr-3 flex-shrink-0" />
              )}
              <span>{item.text}</span>
              {isAnswered && item.id !== currentQuestion.correctOrder[index] && (
                <span className="text-yellow-300 text-sm ml-auto">
                  Should be position {currentQuestion.correctOrder.indexOf(item.id) + 1}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderSortingQuestion = () => {
    if (currentQuestion?.type !== 'sorting') return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedItems.map((category, categoryIndex) => (
          <div 
            key={categoryIndex} 
            className={`p-4 rounded-lg border ${
              categoryIndex === sortedItems.length - 1 
                ? "bg-gray-800/50 border-gray-600" 
                : `bg-purple-900/20 border-purple-600 ${
                    draggedOverCategory === categoryIndex ? "border-yellow-500 border-2" : ""
                  }`
            }`}
            onDragOver={(e) => handleDragOverCategory(e, categoryIndex)}
            onDragLeave={handleDragLeaveCategory}
            onDrop={() => handleDropSorting(categoryIndex)}
          >
            <h4 className="font-medium text-lg mb-3 text-purple-300">
              {category.category}
            </h4>
            
            <div className="space-y-2 min-h-[4rem]">
              {category.items.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-lg ${
                    isAnswered
                      ? currentQuestion.correctCategories[item.id] === categoryIndex
                        ? "bg-green-700/40 border border-green-500"
                        : "bg-red-700/20 border border-red-500/50"
                      : "bg-gray-700 hover:bg-gray-600 cursor-grab active:cursor-grabbing"
                  }`}
                  draggable={!isAnswered}
                  onDragStart={() => handleDragStartSorting(item.id, categoryIndex)}
                >
                  <div className="flex items-center">
                    {isAnswered ? (
                      currentQuestion.correctCategories[item.id] === categoryIndex ? (
                        <Check size={18} className="text-green-400 mr-2" />
                      ) : (
                        <X size={18} className="text-red-400 mr-2" />
                      )
                    ) : (
                      <GripVertical size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    {item.text}
                    {isAnswered && currentQuestion.correctCategories[item.id] !== categoryIndex && (
                      <span className="text-yellow-300 text-xs ml-auto">
                        Should be in {currentQuestion.categories[currentQuestion.correctCategories[item.id]]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {category.items.length === 0 && (
                <div className="p-3 rounded-lg border border-dashed border-gray-600 text-gray-400 text-center">
                  {categoryIndex === sortedItems.length - 1 
                    ? "All items sorted!" 
                    : "Drag items here"
                  }
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderMultipleChoiceQuestion = () => {
    if (currentQuestion?.type !== 'multiple-choice') return null;
    
    return (
      <div className="space-y-2">
        {multipleChoiceOptions.map((option, index) => (
          <button
            key={option.id}
            className={`w-full text-left p-4 rounded-lg border ${
              isAnswered
                ? option.id === currentQuestion.correctAnswer
                  ? "bg-green-700/40 border-green-500 text-white"
                  : selectedOption === index
                    ? "bg-red-700/20 border-red-500/50 text-white"
                    : "bg-gray-800 border-gray-700"
                : selectedOption === index
                  ? "bg-purple-700 border-purple-500"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
            }`}
            onClick={() => !isAnswered && setSelectedOption(index)}
            disabled={isAnswered}
          >
            <div className="flex items-center">
              {isAnswered ? (
                option.id === currentQuestion.correctAnswer ? (
                  <Check size={18} className="text-green-400 mr-3 flex-shrink-0" />
                ) : selectedOption === index ? (
                  <X size={18} className="text-red-400 mr-3 flex-shrink-0" />
                ) : null
              ) : null}
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

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
            <div className="text-sm text-yellow-300 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Time remaining: {formatTimeRemaining(timeRemaining)}
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-6" />
          
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-1">
              {getQuestionTitle()}
            </h3>
            <p className="text-lg text-gray-200">{getQuestionText()}</p>
            
            <p className="text-sm text-purple-300 mt-2">
              {getQuestionInstructions()}
            </p>
          </div>
          
          {/* Interactive Quiz Area */}
          <div className="mb-6">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
              </div>
            ) : (
              <>
                {currentQuestion?.type === 'matching' && renderMatchingQuestion()}
                {currentQuestion?.type === 'sequencing' && renderSequencingQuestion()}
                {currentQuestion?.type === 'sorting' && renderSortingQuestion()}
                {currentQuestion?.type === 'multiple-choice' && renderMultipleChoiceQuestion()}
              </>
            )}
          </div>
          
          {/* Answer/Next button */}
          <div className="flex justify-between">
            {!isAnswered ? (
              <Button 
                onClick={handleAnswer}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                disabled={loading || (currentQuestion?.type === 'multiple-choice' && selectedOption === null)}
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
