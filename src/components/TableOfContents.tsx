
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle, Circle, Star, Home, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Section {
  id: string;
  title: string;
  subtopics: {
    id: string;
    title: string;
  }[];
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  activeSubtopic: string;
  completedSections: string[];
  onSectionChange: (sectionId: string) => void;
  onSubtopicChange: (subtopicId: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSection,
  activeSubtopic,
  completedSections,
  onSectionChange,
  onSubtopicChange
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([activeSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
    onSectionChange(sectionId);
  };

  // Function to determine if a subtopic should show a quiz button
  const shouldShowQuizButton = (sectionTitle: string, subtopicTitle: string) => {
    const quizSections = [
      "Creating an AI Project", 
      "Final AI Project Presentation Structure"
    ];
    
    return quizSections.includes(sectionTitle);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Table of Contents</h3>
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-white hover:bg-purple-900/30">
            <Home size={16} className="mr-2 text-purple-400" />
            Home
          </Button>
        </Link>
      </div>
      
      <Accordion 
        type="multiple" 
        defaultValue={[activeSection]} 
        value={expandedSections}
        className="space-y-2 w-full"
      >
        {sections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="fantasy-card border-0 overflow-hidden mb-2 w-full"
          >
            <AccordionTrigger 
              onClick={() => toggleSection(section.id)}
              className={cn(
                "px-4 py-3 text-left text-sm font-medium hover:bg-purple-900/30 w-full",
                activeSection === section.id ? "text-purple-300" : "text-white"
              )}
            >
              <div className="flex items-center w-full pr-4">
                <BookOpen size={16} className="mr-2 text-purple-400 flex-shrink-0" />
                <span className="truncate">{section.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 py-1">
              <div className="space-y-1 pl-4 border-l border-purple-800/50">
                {section.subtopics.map((subtopic) => (
                  <div key={subtopic.id} className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-left text-sm h-auto py-1",
                        activeSubtopic === subtopic.id 
                          ? "bg-purple-900/50 text-purple-300"
                          : completedSections.includes(subtopic.id)
                          ? "text-green-400 hover:text-green-300"
                          : "text-gray-300 hover:text-white"
                      )}
                      onClick={() => onSubtopicChange(subtopic.id)}
                    >
                      <span className="mr-2 flex-shrink-0">
                        {completedSections.includes(subtopic.id) ? 
                          <CheckCircle size={14} className="text-green-400" /> : 
                          <Circle size={14} className="text-gray-400" />}
                      </span>
                      <span className="truncate max-w-[200px]">{subtopic.title}</span>
                      <span className="ml-auto text-xs text-yellow-300 flex items-center flex-shrink-0">
                        +5 <Star size={10} className="ml-0.5" />
                      </span>
                    </Button>
                    
                    {shouldShowQuizButton(section.title, subtopic.title) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left text-xs h-auto py-1 pl-8 text-purple-300 hover:text-purple-200 hover:bg-purple-900/30"
                        onClick={() => {
                          // Navigate to quiz page with specific subtopic
                          window.location.href = `/quizzes?section=${encodeURIComponent(section.title)}&subtopic=${encodeURIComponent(subtopic.title)}`;
                        }}
                      >
                        <PlayCircle size={12} className="mr-1 text-purple-400" />
                        Take Quiz {section.title === "Creating an AI Project" ? "🧠" : "🎯"}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
