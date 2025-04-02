
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

interface CourseContentProps {
  content: string;
  quizId?: string; // Optional quiz ID
  onTakeQuiz?: (quizId: string) => void; // Optional callback to handle quiz button click
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
  
  // Process blockquotes (for prompts)
  contentWithLists = contentWithLists.replace(/^>\s+(.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Process tables
  if (contentWithLists.includes('|')) {
    const lines = contentWithLists.split('\n');
    let inTable = false;
    let tableContent = '';
    let processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableContent = '<table class="border-collapse w-full my-4">\n<thead>\n';
          
          // First row is header
          const headerCells = line.split('|').filter(cell => cell.trim() !== '');
          tableContent += '<tr>\n';
          headerCells.forEach(cell => {
            tableContent += `<th class="border border-purple-800 px-4 py-2 text-purple-300 bg-purple-900/30">${cell.trim()}</th>\n`;
          });
          tableContent += '</tr>\n</thead>\n<tbody>\n';
          
          // Skip the separator row (contains dashes)
          i++;
        } else {
          // Data rows
          const cells = line.split('|').filter(cell => cell.trim() !== '');
          tableContent += '<tr>\n';
          cells.forEach(cell => {
            tableContent += `<td class="border border-purple-800 px-4 py-2 text-gray-200">${cell.trim()}</td>\n`;
          });
          tableContent += '</tr>\n';
        }
      } else if (inTable) {
        inTable = false;
        tableContent += '</tbody>\n</table>';
        processedLines.push(tableContent);
        processedLines.push(line);
      } else {
        processedLines.push(line);
      }
    }
    
    if (inTable) {
      tableContent += '</tbody>\n</table>';
      processedLines.push(tableContent);
    }
    
    contentWithLists = processedLines.join('\n');
  }
  
  // Remove quiz button placeholder if it exists
  if (contentWithLists.includes('QUIZ_BUTTON_PLACEHOLDER')) {
    contentWithLists = contentWithLists.replace('QUIZ_BUTTON_PLACEHOLDER', '');
  }
  
  return contentWithLists;
};

export const CourseContent: React.FC<CourseContentProps> = ({ content, quizId, onTakeQuiz }) => {
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
          [&_.animated-keyword]:inline-block [&_.animated-keyword]:text-yellow-300 [&_.animated-keyword]:font-semibold [&_.animated-keyword]:animate-pulse
          [&_blockquote]:bg-purple-900/20 [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:my-4"
        dangerouslySetInnerHTML={{ __html: animateKeywords(content) }}
      />
      
      {quizId && onTakeQuiz && (
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={() => onTakeQuiz(quizId)}
            className="group relative overflow-hidden px-6 py-2 shadow-lg text-white rounded-lg magical-border"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 opacity-70 group-hover:opacity-80 transition-opacity"></div>
            <span className="relative flex items-center font-medium text-lg">
              <GraduationCap className="mr-2 h-5 w-5" />
              Take Quiz
            </span>
          </Button>
        </div>
      )}
      
      <div className="mt-6 border-t border-purple-800/30 pt-4 text-sm text-purple-300">
        <p>Take your time to understand these concepts before moving on.</p>
      </div>
    </div>
  );
};
