
import React from 'react';
import { motion } from 'framer-motion';

interface CourseContentProps {
  content: string;
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
  
  // Remove the title from content (h1 heading at the beginning)
  processedContent = processedContent.replace(/^# .*\n/m, '');
  
  // Process Markdown for remaining headings
  processedContent = processedContent.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  processedContent = processedContent.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  processedContent = processedContent.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  
  // Process Markdown for bold text
  processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Process Markdown for bullet points
  processedContent = processedContent.replace(/^- (.*$)/gim, '<li>$1</li>');
  
  // Wrap lists in ul tags
  let hasStartedList = false;
  const lines = processedContent.split('\n');
  let newContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('<li>')) {
      if (!hasStartedList) {
        newContent.push('<ul>');
        hasStartedList = true;
      }
      newContent.push(line);
    } else {
      if (hasStartedList) {
        newContent.push('</ul>');
        hasStartedList = false;
      }
      newContent.push(line);
    }
  }
  
  if (hasStartedList) {
    newContent.push('</ul>');
  }
  
  // Process Markdown for numbered lists
  let contentWithLists = newContent.join('\n');
  const numberedListRegex = /^\d+\.\s+(.*$)/gim;
  
  if (numberedListRegex.test(contentWithLists)) {
    let hasStartedNumberedList = false;
    const lines = contentWithLists.split('\n');
    let withNumberedLists = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^(\d+)\.\s+(.*$)/);
      
      if (match) {
        if (!hasStartedNumberedList) {
          withNumberedLists.push('<ol>');
          hasStartedNumberedList = true;
        }
        withNumberedLists.push(`<li>${match[2]}</li>`);
      } else {
        if (hasStartedNumberedList) {
          withNumberedLists.push('</ol>');
          hasStartedNumberedList = false;
        }
        withNumberedLists.push(line);
      }
    }
    
    if (hasStartedNumberedList) {
      withNumberedLists.push('</ol>');
    }
    
    contentWithLists = withNumberedLists.join('\n');
  }
  
  // Remove quiz button placeholder if it exists
  if (contentWithLists.includes('QUIZ_BUTTON_PLACEHOLDER')) {
    contentWithLists = contentWithLists.replace('QUIZ_BUTTON_PLACEHOLDER', '');
  }
  
  return contentWithLists;
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

