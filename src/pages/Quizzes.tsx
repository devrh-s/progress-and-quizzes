import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { QuizComponent } from '@/components/QuizComponent';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

interface QuizTopic {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

const quizTopics: QuizTopic[] = [
  {
    id: "practical-skills-quiz",
    title: "Practical AI Skills Quiz",
    difficulty: 'easy',
    questions: [
      {
        question: "What is the main focus of practical AI skills compared to theoretical knowledge?",
        options: [
          "Understanding algorithm mathematics",
          "Implementation and results",
          "Historical development of AI",
          "Philosophical implications of AI"
        ],
        correctAnswer: 1
      },
      {
        question: "Which of the following is NOT mentioned as a key concept in practical AI skills?",
        options: [
          "Developing effective prompting techniques",
          "Creating workflows with AI assistance",
          "Building neural networks from scratch",
          "Evaluating and improving AI outputs"
        ],
        correctAnswer: 2
      },
      {
        question: "What is the first step in the proactive implementation framework?",
        options: [
          "Select appropriate tools",
          "Evaluate results",
          "Identify opportunities",
          "Scale successful implementations"
        ],
        correctAnswer: 2
      },
      {
        question: "What does proactive implementation primarily focus on?",
        options: [
          "Waiting for problems to arise before applying AI solutions",
          "Anticipating how AI can be integrated before problems arise",
          "Using AI only for existing workflows without changes",
          "Developing new AI models from scratch"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "rct-framework-quiz",
    title: "Role-Context-Task Framework Quiz",
    difficulty: 'medium',
    questions: [
      {
        question: "What are the three components of the RCT Framework?",
        options: [
          "Research, Calculation, Testing",
          "Role, Context, Task",
          "Reasoning, Criticism, Transformation",
          "Review, Content, Technology"
        ],
        correctAnswer: 1
      },
      {
        question: "When defining roles in the RCT Framework, what is recommended?",
        options: [
          "Always use generic roles like 'assistant'",
          "Choose roles with vague knowledge domains",
          "Be specific about expertise level",
          "Avoid multiple roles for any single task"
        ],
        correctAnswer: 2
      },
      {
        question: "Which of the following is an element of effective context setting?",
        options: [
          "Making the context as brief as possible",
          "Excluding target audience information",
          "Format requirements or preferences",
          "Avoiding examples or references"
        ],
        correctAnswer: 2
      },
      {
        question: "What characterizes well-defined tasks in the RCT Framework?",
        options: [
          "They are always very broad in scope",
          "They use specific action verbs",
          "They never specify output format",
          "They avoid evaluation criteria"
        ],
        correctAnswer: 1
      },
      {
        question: "How does the RCT Framework primarily improve AI interactions?",
        options: [
          "By making requests longer and more complicated",
          "By transforming vague requests into focused instructions",
          "By eliminating the need for human oversight",
          "By reducing the amount of information provided to AI"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "ai-tools-quiz",
    title: "AI Tools Overview Quiz",
    difficulty: 'hard',
    questions: [
      {
        question: "Which of these is NOT listed as a major category of AI tools?",
        options: [
          "Language Models",
          "Blockchain AI Systems",
          "Image Generation",
          "Code Assistants"
        ],
        correctAnswer: 1
      },
      {
        question: "According to the course, what is critical for efficiency and quality when using AI tools?",
        options: [
          "Always using the newest AI models",
          "Using multiple tools simultaneously for every task",
          "Choosing the appropriate AI tool for a specific task",
          "Focusing only on open-source tools"
        ],
        correctAnswer: 2
      },
      {
        question: "Which of these is a selection criterion for choosing AI tools?",
        options: [
          "The popularity of the tool on social media",
          "The age of the AI model",
          "Domain specificity",
          "The company that created the tool"
        ],
        correctAnswer: 2
      },
      {
        question: "When evaluating AI tool effectiveness, what is recommended as the first step?",
        options: [
          "Define success metrics",
          "Collect quantitative data",
          "Gather qualitative feedback",
          "Assess ROI"
        ],
        correctAnswer: 0
      },
      {
        question: "What type of visualization is recommended for showing improvement over time?",
        options: [
          "Heat maps",
          "Time series",
          "Process flows",
          "Interactive demos"
        ],
        correctAnswer: 1
      },
      {
        question: "Which AI model is specifically mentioned as excelling at general knowledge tasks?",
        options: [
          "Elicit",
          "LLaMA",
          "GPT-4",
          "Stable Diffusion"
        ],
        correctAnswer: 2
      }
    ]
  }
];

const Quizzes: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizTopic | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizResults, setQuizResults] = useState<{ [key: string]: number }>({});
  const [xp, setXp] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (completedQuizzes.length / quizTopics.length) * 100;
    setProgress(Math.round(newProgress));
  }, [completedQuizzes]);

  const handleSelectQuiz = (quiz: QuizTopic) => {
    setSelectedQuiz(quiz);
  };

  const handleStartQuiz = () => {
    setQuizActive(true);
  };

  const handleQuizComplete = (score: number) => {
    if (selectedQuiz) {
      const quizId = selectedQuiz.id;
      setQuizResults(prev => ({...prev, [quizId]: score }));
      
      let earnedXp = 0;
      const difficultyMultiplier = 
        selectedQuiz.difficulty === 'easy' ? 5 :
        selectedQuiz.difficulty === 'medium' ? 10 : 15;
      
      earnedXp = Math.round((score / selectedQuiz.questions.length) * difficultyMultiplier * 10);
      setXp(prev => prev + earnedXp);
      
      if (!completedQuizzes.includes(quizId)) {
        setCompletedQuizzes(prev => [...prev, quizId]);
      }
      
      toast({
        title: "Quiz Completed!",
        description: `You earned ${earnedXp} XP!`,
        variant: "default",
      });
      
      setQuizActive(false);
      setSelectedQuiz(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/4 bg-gray-900 p-4 md:p-6 space-y-6 border-r border-purple-900">
        <div className="fantasy-card p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Quiz Progress</h3>
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-purple-300 text-sm">
            <span>{progress}% complete</span>
            <span>{completedQuizzes.length}/{quizTopics.length} quizzes</span>
          </div>
          <div className="mt-2 text-yellow-300 font-semibold">
            {xp} XP ✨
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white mb-4">Available Quizzes</h3>
          
          <div className="space-y-2">
            {quizTopics.map(quiz => (
              <button
                key={quiz.id}
                onClick={() => handleSelectQuiz(quiz)}
                className={`w-full text-left fantasy-card p-4 transition hover:bg-purple-900/30 ${
                  selectedQuiz?.id === quiz.id ? 'border-purple-500' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-white">{quiz.title}</h4>
                  <span className={`text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                {completedQuizzes.includes(quiz.id) && (
                  <div className="mt-2 text-sm flex justify-between">
                    <span className="text-green-400">Completed</span>
                    <span className="text-purple-300">
                      Score: {quizResults[quiz.id] || 0}/{quiz.questions.length}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <Link to="/guide">
            <Button variant="outline" className="w-full border-purple-500 text-purple-300">
              Back to Guide
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {quizActive && selectedQuiz ? (
          <QuizComponent quiz={selectedQuiz} onComplete={handleQuizComplete} />
        ) : selectedQuiz ? (
          <div className="fantasy-card p-6">
            <h2 className="text-2xl font-bold text-purple-300 mb-2">{selectedQuiz.title}</h2>
            <div className="mb-6">
              <span className={`text-sm font-medium px-2 py-1 rounded-full bg-purple-900/50 ${getDifficultyColor(selectedQuiz.difficulty)}`}>
                {selectedQuiz.difficulty} difficulty
              </span>
              <p className="mt-4 text-gray-200">
                This quiz contains {selectedQuiz.questions.length} questions to test your knowledge of {selectedQuiz.title.toLowerCase()}.
              </p>
              <div className="mt-2 text-sm text-purple-300">
                <p>• Questions will be presented one at a time</p>
                <p>• Answer options will be randomized for each attempt</p>
                <p>• Your final score will be shown after completion</p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartQuiz}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="fantasy-card p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Knowledge Tests</h2>
            <p className="text-gray-300 mb-8">
              Test your understanding of the course material with these interactive quizzes.
              Each quiz focuses on a specific section of the course.
            </p>
            <div className="flex justify-center">
              <img src="/placeholder.svg" alt="Quiz illustration" className="w-48 h-48 opacity-70" />
            </div>
            <p className="mt-8 text-purple-300">
              Select a quiz from the sidebar to begin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
