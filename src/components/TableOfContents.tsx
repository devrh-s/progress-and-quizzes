
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BookOpen, CheckCircle, Circle, Star, Home, Briefcase, PlayCircle } from 'lucide-react';
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
                    
                    {/* Quiz buttons for Introduction section */}
                    {section.id === "introduction" && (
                      <div className="pl-6">
                        {subtopic.id === "ai-adoption" && (
                          <Link to="/quizzes" state={{ quizId: "practical-ai-skills" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "practical-skills" && (
                          <Link to="/quizzes" state={{ quizId: "practical-skills-quiz" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                      </div>
                    )}
                    
                    {/* Quiz buttons for RCT Framework section */}
                    {section.id === "rct-framework" && (
                      <div className="pl-6">
                        {subtopic.id === "rct-framework-intro" && (
                          <Link to="/quizzes" state={{ quizId: "rct-framework-basics" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "prompting-principles" && (
                          <Link to="/quizzes" state={{ quizId: "effective-prompting-principles" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "document-processing" && (
                          <Link to="/quizzes" state={{ quizId: "document-processing-with-rct" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "information-search" && (
                          <Link to="/quizzes" state={{ quizId: "information-search-with-rct" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "why-rct-works" && (
                          <Link to="/quizzes" state={{ quizId: "why-the-rct-framework-works" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                      </div>
                    )}
                    
                    {/* Quiz buttons for AI Tools section */}
                    {section.id === "ai-tools-overview" && (
                      <div className="pl-6">
                        {subtopic.id === "ai-tools-general" && (
                          <Link to="/quizzes" state={{ quizId: "ai-tools-quiz" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "text-generation" && (
                          <Link to="/quizzes" state={{ quizId: "text-generation-analysis" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "content-creation" && (
                          <Link to="/quizzes" state={{ quizId: "content-creation-design" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "development-tools" && (
                          <Link to="/quizzes" state={{ quizId: "development-automation" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "key-applications" && (
                          <Link to="/quizzes" state={{ quizId: "key-applications" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                      </div>
                    )}
                    
                    {/* Quiz buttons for Personal AI Development section */}
                    {section.id === "personal-development" && (
                      <div className="pl-6">
                        {subtopic.id === "personal-ai-development" && (
                          <Link to="/quizzes" state={{ quizId: "personal-ai-development" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "final-project" && (
                          <Link to="/quizzes" state={{ quizId: "final-project" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                        {subtopic.id === "key-focus-areas" && (
                          <Link to="/quizzes" state={{ quizId: "key-focus-areas" }}>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 w-full justify-start py-0.5 h-7"
                            >
                              <PlayCircle size={12} className="mr-1 text-purple-400" />
                              Take Quiz
                            </Button>
                          </Link>
                        )}
                      </div>
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
