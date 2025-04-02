
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
  
  // Remove quiz button placeholder if it exists
  if (processedContent.includes('QUIZ_BUTTON_PLACEHOLDER')) {
    processedContent = processedContent.replace('QUIZ_BUTTON_PLACEHOLDER', '');
  }
  
  return processedContent;
};

export const CourseContent: React.FC<CourseContentProps> = ({ content, quizId }) => {
  return (
    <div className="animate-fade-in">
      <div 
        className="prose prose-invert max-w-none 
          prose-headings:text-purple-300 prose-headings:font-bold
          prose-h1:text-2xl prose-h1:text-purple-200 prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b prose-h1:border-purple-800/30
          prose-h2:text-xl prose-h2:mt-6
          prose-p:text-gray-200 prose-p:leading-relaxed
          prose-li:text-gray-200 prose-li:my-1
          prose-ul:my-4 prose-ul:space-y-2
          prose-ol:my-4 prose-ol:space-y-2
          prose-strong:text-yellow-300 prose-strong:font-semibold
          [&_.animated-keyword]:inline-block [&_.animated-keyword]:text-yellow-300 [&_.animated-keyword]:font-semibold [&_.animated-keyword]:animate-pulse"
        dangerouslySetInnerHTML={{ __html: animateKeywords(content) }}
      />
      
      <div className="mt-6 border-t border-purple-800/30 pt-4 text-sm text-purple-300">
        <p>Take your time to understand these concepts before moving on.</p>
      </div>
    </div>
  );
};
