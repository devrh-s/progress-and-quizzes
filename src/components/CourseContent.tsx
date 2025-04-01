
import React from 'react';
import { motion } from 'framer-motion';

interface CourseContentProps {
  content: string;
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
  
  return processedContent;
};

export const CourseContent: React.FC<CourseContentProps> = ({ content }) => {
  return (
    <div className="animate-fade-in">
      <div 
        className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-p:text-gray-200 prose-li:text-gray-200 prose-h4:text-white prose-h4:font-semibold prose-strong:text-yellow-300 [&_.animated-keyword]:inline-block [&_.animated-keyword]:text-yellow-300 [&_.animated-keyword]:font-semibold [&_.animated-keyword]:animate-pulse [&_.quiz-button]:mt-6 [&_.quiz-button]:inline-flex [&_.quiz-button]:items-center [&_.quiz-button]:gap-2 [&_.quiz-button]:px-4 [&_.quiz-button]:py-2 [&_.quiz-button]:bg-purple-600 [&_.quiz-button]:hover:bg-purple-700 [&_.quiz-button]:text-white [&_.quiz-button]:rounded-lg [&_.quiz-button]:transition-all [&_.quiz-button]:shadow-lg"
        dangerouslySetInnerHTML={{ __html: animateKeywords(content) }}
      />
      
      <div className="mt-6 border-t border-purple-800/30 pt-4 text-sm text-purple-300">
        <p>Take your time to understand these concepts before moving on.</p>
      </div>
    </div>
  );
};
