
import React from 'react';

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

export const CourseContent: React.FC<CourseContentProps> = ({ section, subtopic }) => {
  return (
    <div className="fantasy-card p-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-300 mb-1">{section.title}</h2>
        <h3 className="text-xl font-semibold text-white">{subtopic.title}</h3>
      </div>
      
      <div 
        className="prose prose-invert max-w-none prose-headings:text-purple-300 prose-p:text-gray-200 prose-li:text-gray-200 prose-h4:text-white prose-h4:font-semibold prose-strong:text-yellow-300"
        dangerouslySetInnerHTML={{ __html: subtopic.content }}
      />
      
      <div className="mt-6 border-t border-purple-800/30 pt-4 text-sm text-purple-300">
        <p>Take your time to understand these concepts before moving on.</p>
      </div>
    </div>
  );
};
