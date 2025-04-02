import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CourseContent } from '@/components/CourseContent';
import { TableOfContents } from '@/components/TableOfContents';
import { toast } from '@/hooks/use-toast';
import { Home, Clock, Users, BookOpen, GraduationCap, Star, Briefcase, PlayCircle } from 'lucide-react';
import { QuizComponent } from '@/components/QuizComponent';

interface Section {
  id: string;
  title: string;
  subtopics: {
    id: string;
    title: string;
    content: string;
  }[];
}

const quizzes = {
  // ... keep existing code (quiz definitions)
};

const courseSections = [
  {
    id: "practical-skills",
    title: "Practical Skills & Proactive Implementation",
    subtopics: [
      {
        id: "developing-practical-ai-skills",
        title: "Developing Practical AI Skills",
        content: "Learn how to develop practical AI skills for real-world applications. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "proactive-ai-implementation",
        title: "Proactive AI Implementation",
        content: "Understand strategies for proactive AI implementation in your workflows. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "personal-ai-development",
        title: "Personal AI Development",
        content: "Develop your own AI skills and strategies for personal growth. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "final-project",
        title: "Final Project",
        content: "Apply your knowledge to a real-world project with practical outcomes. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "key-focus-areas",
        title: "Key Focus Areas",
        content: "Understand the key focus areas for successful AI adoption. QUIZ_BUTTON_PLACEHOLDER"
      }
    ]
  },
  {
    id: "rct-framework",
    title: "Mastering the RCT Framework in Prompt Engineering",
    subtopics: [
      {
        id: "rct-framework-basics",
        title: "RCT Framework Basics",
        content: "Learn the fundamentals of the Role-Context-Task Framework. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "effective-prompting-principles",
        title: "Effective Prompting Principles",
        content: "Master the art of crafting effective prompts with key principles. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "document-processing-with-rct",
        title: "Document Processing",
        content: "Learn how to process documents using the RCT Framework. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "information-search-with-rct",
        title: "Information Search",
        content: "Master information search techniques using the RCT Framework. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "why-the-rct-framework-works",
        title: "Why This Works",
        content: "Understand the benefits and effectiveness of the RCT Framework. QUIZ_BUTTON_PLACEHOLDER"
      }
    ]
  },
  {
    id: "ai-tools-overview",
    title: "AI Tools in Remote Helpers Overview",
    subtopics: [
      {
        id: "text-generation-analysis",
        title: "Text Generation & Analysis",
        content: "Learn about tools for generating and analyzing text. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "content-creation-design",
        title: "Content Creation & Design",
        content: "Discover tools for creating and designing content. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "development-automation",
        title: "Development & Automation",
        content: "Explore automation tools for streamlining development. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "key-applications",
        title: "Key Applications",
        content: "Understand key applications of AI tools for remote helpers. QUIZ_BUTTON_PLACEHOLDER"
      }
    ]
  },
  {
    id: "creating-ai-project",
    title: "Creating an AI Project",
    subtopics: [
      {
        id: "core-components",
        title: "Core Components of AI Project Development",
        content: "Understand the fundamental components of AI project development. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "tool-selection",
        title: "Tool Selection",
        content: "Learn how to select the right tools for your AI project. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "workflow-development",
        title: "Workflow Development",
        content: "Develop effective workflows for your AI projects. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "testing-optimization",
        title: "Testing & Optimization",
        content: "Master techniques for testing and optimizing AI implementations. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "build-working-prototype",
        title: "Task – Build a Working Prototype",
        content: "Apply your knowledge to build a working AI prototype. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "tools-overview",
        title: "Tools Overview",
        content: "Get an overview of the tools available for AI projects. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "practical-tips",
        title: "Practical Tips",
        content: "Learn practical tips for successful AI project implementation. QUIZ_BUTTON_PLACEHOLDER"
      }
    ]
  },
  {
    id: "final-presentation",
    title: "Final AI Project Presentation Structure",
    subtopics: [
      {
        id: "problem-description",
        title: "Problem Description",
        content: "Learn how to effectively describe the problem your AI project addresses. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "tools-implementation",
        title: "AI Tools and Implementation",
        content: "Understand how to present the tools and implementation details of your project. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "results-impact",
        title: "Results and Impact",
        content: "Learn how to demonstrate the results and impact of your AI project. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "future-development",
        title: "Future Development",
        content: "Explore strategies for presenting future development plans. QUIZ_BUTTON_PLACEHOLDER"
      },
      {
        id: "presentation-guidelines",
        title: "Presentation Guidelines",
        content: "Master guidelines for delivering an effective project presentation. QUIZ_BUTTON_PLACEHOLDER"
      }
    ]
  }
];

const Guide: React.FC = () => {
  const [activeSection, setActiveSection] = useState({ id: "introduction", title: "Introduction" });
  const [activeSubtopic, setActiveSubtopic] = useState({ id: "what-you-will-learn", title: "What You Will Learn", content: "" });
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [xp, setXp] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Find the section
    const foundSection = courseSections.find(section => section.id === activeSection.id);
    if (foundSection) {
      // Find the subtopic
      const foundSubtopic = foundSection.subtopics.find(subtopic => subtopic.id === activeSubtopic.id);
      if (foundSubtopic) {
        setActiveSubtopic(foundSubtopic);
      } else if (foundSection.subtopics.length > 0) {
        // Default to first subtopic if current is not found
        setActiveSubtopic(foundSection.subtopics[0]);
      }
    }
    
    // Calculate progress
    if (courseSections.length > 0) {
      let totalSubtopics = 0;
      courseSections.forEach(section => {
        totalSubtopics += section.subtopics.length;
      });
      
      const progressPercentage = Math.round((completedSections.length / totalSubtopics) * 100);
      setProgress(progressPercentage);
      setXp(completedSections.length * 5); // 5 XP per completed section
    }
  }, [activeSection, activeSubtopic.id, completedSections]);

  const handleSectionChange = (sectionId: string) => {
    const section = courseSections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section);
      // If there are subtopics, set the first one as active
      if (section.subtopics.length > 0) {
        setActiveSubtopic(section.subtopics[0]);
      }
    }
  };

  const handleSubtopicChange = (subtopicId: string) => {
    // Find the section containing this subtopic
    const section = courseSections.find(s => 
      s.subtopics.some(sub => sub.id === subtopicId)
    );
    
    if (section) {
      setActiveSection(section);
      
      // Find and set the active subtopic
      const subtopic = section.subtopics.find(sub => sub.id === subtopicId);
      if (subtopic) {
        setActiveSubtopic(subtopic);
        
        // Mark as completed if not already
        if (!completedSections.includes(subtopicId)) {
          const newCompletedSections = [...completedSections, subtopicId];
          setCompletedSections(newCompletedSections);
          
          // Show toast for new completion - FIXED variant to use "default" instead of "success"
          toast({
            title: "Section completed!",
            description: `You earned 5 XP for completing "${subtopic.title}"`,
            variant: "default",
          });
        }
      }
    }
    
    // Hide quiz if it was showing
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    const quiz = quizzes[activeSubtopic.id];
    if (quiz) {
      setCurrentQuiz(quiz);
      setShowQuiz(true);
    }
  };

  // FIXED: Modified handleQuizComplete to match the expected signature
  const handleQuizComplete = (score: number) => {
    // We still calculate using totalQuestions from currentQuiz
    const totalQuestions = currentQuiz?.questions?.length || 1;
    const earnedXP = Math.round((score / totalQuestions) * 10);
    setXp(prev => prev + earnedXP);
    
    // Show toast - FIXED variant to use "default" instead of "success"
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}/${totalQuestions} and earned ${earnedXP} XP`,
      variant: "default",
    });
    
    // Hide quiz
    setShowQuiz(false);
  };

  return (
    <div className="flex flex-col min-h-screen pb-12">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/3 xl:w-1/4 space-y-6">
          {/* Course Progress */}
          <div className="fantasy-card p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">Course Progress</h3>
              <span className="text-purple-400 font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="text-sm text-purple-300 flex items-center gap-2 mt-3">
              <Star size={14} className="text-yellow-300" />
              <span>XP: {xp}</span>
            </div>
            
            {/* Course Info Tags - Moved from content section */}
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300 flex items-center">
                <Clock size={14} className="mr-2" />
                <span>5-10 min</span>
              </div>
              <div className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300 flex items-center">
                <BookOpen size={14} className="mr-2" />
                <span>Beginner</span>
              </div>
              <div className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300 flex items-center">
                <Briefcase size={14} className="mr-2" />
                <span>any profession</span>
              </div>
            </div>
          </div>
          
          {/* Table of Contents */}
          <div className="fantasy-card p-4">
            <TableOfContents 
              sections={courseSections}
              activeSection={activeSection.id}
              activeSubtopic={activeSubtopic.id}
              completedSections={completedSections}
              onSectionChange={handleSectionChange}
              onSubtopicChange={handleSubtopicChange}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-2/3 xl:w-3/4 space-y-6">
          <div className="fantasy-card p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-1 text-white glow-text">
                {activeSection.title}
              </h2>
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                {activeSubtopic.title}
              </h3>
            </div>
            
            {showQuiz ? (
              <QuizComponent 
                quiz={currentQuiz}
                onComplete={handleQuizComplete}
              />
            ) : (
              <>
                <CourseContent content={activeSubtopic.content} />
                
                {quizzes[activeSubtopic.id] && 
                 !activeSubtopic.content.includes('Take Quiz') && (
                  <div className="mt-6 pt-6 border-t border-purple-800/30 flex justify-end">
                    <Button 
                      onClick={handleStartQuiz}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
