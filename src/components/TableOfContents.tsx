
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

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
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
      
      <Accordion 
        type="multiple" 
        defaultValue={[activeSection]} 
        value={expandedSections}
        className="space-y-2"
      >
        {sections.map((section) => (
          <AccordionItem 
            key={section.id} 
            value={section.id}
            className="fantasy-card border-0 overflow-hidden mb-2"
          >
            <AccordionTrigger 
              onClick={() => toggleSection(section.id)}
              className={cn(
                "px-4 py-3 text-left text-sm font-medium hover:bg-purple-900/30",
                activeSection === section.id ? "text-purple-300" : "text-white"
              )}
            >
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="px-2 py-1">
              <div className="space-y-1 pl-4 border-l border-purple-800/50">
                {section.subtopics.map((subtopic) => (
                  <Button
                    key={subtopic.id}
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
                    <span className="mr-2">
                      {completedSections.includes(subtopic.id) ? "✓" : "○"}
                    </span>
                    {subtopic.title}
                    <span className="ml-auto text-xs text-yellow-300">+5 XP</span>
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
