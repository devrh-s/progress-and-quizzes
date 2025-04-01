
import React from 'react';
import { motion } from 'framer-motion';

interface Subtopic {
  id: string;
  title: string;
  content: string;
}

interface Section {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface CourseContentProps {
  section: Section;
  subtopic: Subtopic;
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

export const CourseContent: React.FC<CourseContentProps> = ({ section, subtopic }) => {
  return (
    <div className="fantasy-card p-6 animate-fade-in">
      <div className="mb-6">
        <motion.div 
          className="p-4 mb-4 bg-purple-900/30 rounded-lg border border-purple-700/30 flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-3xl mr-3">✨</span>
          <div>
            <h2 className="text-2xl font-bold text-purple-300 mb-1">{section.title}</h2>
            <h3 className="text-xl font-semibold text-white">{subtopic.title}</h3>
          </div>
        </motion.div>
      </div>
      
      <div 
        className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-p:text-gray-200 prose-li:text-gray-200 prose-h4:text-white prose-h4:font-semibold prose-strong:text-yellow-300 [&_.animated-keyword]:inline-block [&_.animated-keyword]:text-yellow-300 [&_.animated-keyword]:font-semibold [&_.animated-keyword]:animate-pulse"
        dangerouslySetInnerHTML={{ __html: animateKeywords(subtopic.content) }}
      />
      
      <div className="mt-6 border-t border-purple-800/30 pt-4 text-sm text-purple-300">
        <p>Take your time to understand these concepts before moving on.</p>
      </div>
    </div>
  );
};
