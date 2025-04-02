
import React from 'react';
import { motion } from 'framer-motion';

interface CourseContentProps {
  content: string;
  onTakeQuiz?: (quizId: string) => void; // Optional callback for quiz button
  quizId?: string; // Optional quiz ID
}

// Function to wrap keywords in the content with animated spans
const animateKeywords = (content: string): string => {
  // List of keywords to animate
  const keywords = [
    'AI', 'artificial intelligence', 'prompt', 'GPT', 'machine learning',
    'large language model', 'LLM', 'neural network', 'algorithm',
    'RCT Framework', 'Role-Context-Task', 'generative AI', 'deep learning',
    'natural language processing', 'NLP', 'computer vision', 'proactive implementation'
  ];
  
  let processedContent = content;
  
  // Replace keywords with animated span elements
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    processedContent = processedContent.replace(regex, 
      `<span class="animated-keyword">${keyword}</span>`);
  });
  
  // Add quiz button if needed
  if (processedContent.includes('QUIZ_BUTTON_PLACEHOLDER')) {
    processedContent = processedContent.replace('QUIZ_BUTTON_PLACEHOLDER', 
      `<button class="quiz-button">Take Quiz <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg></button>`);
  }
  
  return processedContent;
};

export const CourseContent: React.FC<CourseContentProps> = ({ content, onTakeQuiz, quizId }) => {
  
  // Handle click on quiz button
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('quiz-button') || target.parentElement?.classList.contains('quiz-button')) {
      e.preventDefault();
      if (onTakeQuiz && quizId) {
        onTakeQuiz(quizId);
      }
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div 
        className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-p:text-gray-200 prose-li:text-gray-200 prose-h4:text-white prose-h4:font-semibold prose-strong:text-yellow-300 [&_.animated-keyword]:inline-block [&_.animated-keyword]:text-yellow-300 [&_.animated-keyword]:font-semibold [&_.animated-keyword]:animate-pulse [&_.quiz-button]:mt-6 [&_.quiz-button]:inline-flex [&_.quiz-button]:items-center [&_.quiz-button]:gap-2 [&_.quiz-button]:px-4 [&_.quiz-button]:py-2 [&_.quiz-button]:bg-purple-600 [&_.quiz-button]:hover:bg-purple-700 [&_.quiz-button]:text-white [&_.quiz-button]:rounded-lg [&_.quiz-button]:transition-all [&_.quiz-button]:shadow-lg"
        dangerouslySetInnerHTML={{ __html: animateKeywords(content) }}
        onClick={handleContentClick}
      />
      
      <div className="mt-6 border-t border-purple-800/30 pt-4 text-sm text-purple-300">
        <p>Take your time to understand these concepts before moving on.</p>
      </div>
    </div>
  );
};
