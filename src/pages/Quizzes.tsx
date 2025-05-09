import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { QuizComponent } from '@/components/QuizComponent';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizTopic {
  id: string;
  title: string;
  difficulty: string;
  questions: any[];
  timeLimit: number;
}

const quizTopics = [
  {
    id: "practical-ai-skills",
    title: "Introduction to Practical AI Skills",
    difficulty: 'medium',
    timeLimit: 120,
    questions: [
      {
        type: 'matching',
        question: "Match each key component with its description by dragging the correct description next to the corresponding component.",
        items: [
          "AI Fluency",
          "Critical Analysis",
          "Role-Context-Query Method"
        ],
        descriptions: [
          "Mastering AI tools to solve real business problems",
          "Applying analytical thinking for informed decision-making",
          "Breaking down tasks into roles, context, and precise queries"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Arrange the following steps to develop practical AI skills in the correct order by dragging them into place.",
        steps: [
          "Understanding basic AI concepts",
          "Gaining hands-on experience",
          "Applying AI tools in real projects",
          "Evaluating outcomes and refining strategies"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'sorting',
        question: "Sort these activities into two categories: Practical Application and Theoretical Study.",
        activities: [
          "Participating in an AI workshop",
          "Reading research papers on AI algorithms",
          "Experimenting with AI tools in real projects",
          "Attending academic lectures on AI fundamentals"
        ],
        categories: [
          "Practical Application",
          "Theoretical Study"
        ],
        correctCategories: [0, 1, 0, 1]
      }
    ]
  },
  {
    id: "practical-skills-quiz",
    title: "Practical AI Skills Quiz",
    difficulty: 'easy',
    timeLimit: 240,
    questions: [
      {
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
    timeLimit: 300,
    questions: [
      {
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
    timeLimit: 360,
    questions: [
      {
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
        type: 'multiple-choice',
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
  },
  {
    id: "rct-framework-basics",
    title: "RCT Framework Basics",
    difficulty: 'easy',
    timeLimit: 180,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the RCT framework elements by the order in which they should be considered when constructing a prompt.",
        steps: [
          "Role",
          "Context",
          "Task"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps to build an effective RCT prompt. Drag the steps into the correct order.",
        steps: [
          "Specify the AI's role",
          "Provide relevant background information and requirements",
          "Clearly state what needs to be done and in what format"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'matching',
        question: "Identify each element of the RCT Framework by assigning its correct function.",
        items: [
          "Role",
          "Context",
          "Task"
        ],
        descriptions: [
          "Specifies the AI's assigned expertise (e.g., \"Documentation Specialist\")",
          "Provides the necessary background details and requirements",
          "Clearly defines the desired action and output format"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "effective-prompting-principles",
    title: "Effective Prompting Principles",
    difficulty: 'medium',
    timeLimit: 240,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the following prompting principles in the order you would apply them when crafting a prompt.",
        steps: [
          "Precision",
          "Context Relevance",
          "Task Breakdown",
          "Clear Formatting",
          "Iteration"
        ],
        correctOrder: [0, 1, 2, 3, 4]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps for developing an effective prompt based on the principles.",
        steps: [
          "Identify and state specific requirements",
          "Include all relevant background information",
          "Break down complex tasks into smaller steps",
          "Define the exact output format",
          "Refine the prompt based on feedback"
        ],
        correctOrder: [0, 1, 2, 3, 4]
      },
      {
        type: 'matching',
        question: "Identify and label each effective prompting principle with its corresponding description.",
        items: [
          "Precision",
          "Context Relevance",
          "Task Breakdown",
          "Clear Formatting",
          "Iteration"
        ],
        descriptions: [
          "Being specific in your request (e.g., \"Create a summary in 5 bullet points\")",
          "Including necessary background information",
          "Splitting a complex request into smaller, manageable steps",
          "Specifying how the output should be presented",
          "Refining the prompt based on initial outcomes"
        ],
        correctPairs: [0, 1, 2, 3, 4]
      }
    ]
  },
  {
    id: "document-processing-with-rct",
    title: "Document Processing with RCT",
    difficulty: 'medium',
    timeLimit: 180,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the following steps from first to last in the process described by the document processing prompt.",
        steps: [
          "Analyze the meeting transcript",
          "Extract key decisions",
          "Identify action items",
          "Format the findings as a bulleted list"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'sequencing',
        question: "Sequence the operational steps a Documentation Specialist should follow when processing a document prompt.",
        steps: [
          "Read the transcript",
          "Identify the significant decisions",
          "Note action items",
          "Organize the information into bullet points"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'matching',
        question: "Identify the key components of the document processing prompt by labeling each with its function.",
        items: [
          "Role",
          "Task (Action)",
          "Output Format"
        ],
        descriptions: [
          "\"Documentation Specialist\" (assigns specific expertise)",
          "Analyze the meeting transcript and extract key decisions and action items",
          "Format the result as a bulleted list"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "information-search-with-rct",
    title: "Information Search with RCT",
    difficulty: 'medium',
    timeLimit: 240,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the following industry statistic rows based on their growth rate from highest to lowest.",
        steps: [
          "Market Size (12%)",
          "User Base (15%)",
          "ROI (8%)"
        ],
        correctOrder: [1, 0, 2]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps a Research Assistant should follow when conducting an information search based on the given prompt.",
        steps: [
          "Define the research focus (industry statistics, market growth, and trends)",
          "Gather relevant data and statistics",
          "Organize the data into a table with clear categories",
          "Verify the source of each data point"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'matching',
        question: "Identify the key components from the information search prompt by labeling each with its correct role.",
        items: [
          "Assigned Role",
          "Research Focus",
          "Expected Output Format"
        ],
        descriptions: [
          "\"Research Assistant\"",
          "Finding relevant industry statistics with emphasis on market growth and trends",
          "A table with columns (Category, Current Value, Growth Rate, Source)"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "why-the-rct-framework-works",
    title: "Why the RCT Framework Works",
    difficulty: 'easy',
    timeLimit: 180,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the benefits of the RCT framework by the order in which they contribute to effective prompting.",
        steps: [
          "Clear Roles",
          "Detailed Context",
          "Structured Output"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Sequence the rationale behind the RCT framework's effectiveness. Arrange the following steps in order.",
        steps: [
          "Assign a clear role to the AI",
          "Provide detailed and relevant context",
          "Deliver a structured and organized output"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'matching',
        question: "Identify each benefit of the RCT framework by labeling its corresponding effect.",
        items: [
          "Clear Roles",
          "Detailed Context",
          "Structured Output"
        ],
        descriptions: [
          "Ensures the AI has specific expertise for the task",
          "Provides well-defined parameters and background information",
          "Organizes the delivered information in a consistent format"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "personal-ai-development", 
    title: "Personal AI Development",
    difficulty: 'medium',
    timeLimit: 200,
    questions: [
      {
        type: 'sequencing',
        question: "Arrange the steps for personal AI development in the correct order.",
        steps: [
          "Conduct a skills assessment",
          "Apply learning to real projects",
          "Engage in continuous practice and refinement"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'matching',
        question: "Match each component of personal AI development with its description.",
        items: [
          "Skills Assessment",
          "Project Focus",
          "Continuous Learning"
        ],
        descriptions: [
          "Identifying areas for improvement in AI tool usage",
          "Applying learning to practical projects",
          "Regular practice to refine and enhance skills"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: 'sorting',
        question: "Sort the following project planning elements into two categories: Strategy and Measurement.",
        activities: [
          "Define clear objectives",
          "Outline action steps",
          "Establish success metrics",
          "Set timelines"
        ],
        categories: [
          "Strategy",
          "Measurement"
        ],
        correctCategories: [0, 0, 1, 1]
      }
    ]
  },
  {
    id: "final-project", 
    title: "Final Project",
    difficulty: 'medium',
    timeLimit: 240,
    questions: [
      {
        type: 'sequencing',
        question: "Arrange the final project implementation steps in the correct order.",
        steps: [
          "Analysis (Identify AI opportunities)",
          "Tool Selection (Choose and implement AI solutions)",
          "Execution (Build and test with stakeholder feedback)",
          "Presentation (Demonstrate results and future plans)"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'matching',
        question: "Match each final project step with its function.",
        items: [
          "Analysis",
          "Tools",
          "Execute",
          "Present"
        ],
        descriptions: [
          "Identifying opportunities for AI implementation",
          "Selecting and applying appropriate AI solutions",
          "Building and testing the solution with feedback",
          "Demonstrating outcomes and outlining next steps"
        ],
        correctPairs: [0, 1, 2, 3]
      },
      {
        type: 'sorting',
        question: "Sort the following aspects of business process improvement with AI into two categories: Operational Efficiency and Data Accuracy.",
        activities: [
          "Speeding up task completion",
          "Streamlining communication",
          "Reducing manual errors",
          "Enhancing data processing"
        ],
        categories: [
          "Operational Efficiency",
          "Data Accuracy"
        ],
        correctCategories: [0, 0, 1, 1]
      }
    ]
  },
  {
    id: "key-focus-areas", 
    title: "Key Focus Areas",
    difficulty: 'easy',
    timeLimit: 180,
    questions: [
      {
        type: 'matching',
        question: "Match each key focus area with its description by dragging the correct description block next to the corresponding focus area.",
        items: [
          "Practical Skills",
          "Implementation",
          "Results"
        ],
        descriptions: [
          "Hands‑on experience with AI tools",
          "Strategic deployment of AI solutions",
          "Measurable improvements in workflow efficiency"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Arrange the key focus areas in the order they are emphasized for successful AI adoption.",
        steps: [
          "Practical Skills",
          "Implementation",
          "Results"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'sorting',
        question: "Sort these factors into two groups: Relevant Factors and Irrelevant Factors for AI success.",
        activities: [
          "Practical Expertise",
          "Strategic Thinking",
          "Effective Implementation",
          "Creative Design",
          "Random Experimentation"
        ],
        categories: [
          "Relevant Factors",
          "Irrelevant Factors"
        ],
        correctCategories: [0, 0, 0, 1, 1]
      }
    ]
  },
  {
    id: "text-generation-analysis",
    title: "Text Generation & Analysis",
    difficulty: 'medium',
    timeLimit: 240,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the three AI tools based on the type of content they primarily handle—from most document‑focused to most geared toward dynamic text processing.",
        steps: [
          "Claude AI",
          "Perplexity AI",
          "Grok"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Arrange the following steps that a comprehensive text analysis workflow might follow when using these tools.",
        steps: [
          "Process a large volume of text.",
          "Analyze and generate a detailed report.",
          "Verify facts and provide cited research."
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'matching',
        question: "Identify the primary function of each tool by labeling them with the correct role.",
        items: [
          "Claude AI",
          "Perplexity AI",
          "Grok"
        ],
        descriptions: [
          "Document creation and analysis",
          "Research verification and fact‑checking",
          "Bulk text processing and interactive learning"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "content-creation-design",
    title: "Content Creation & Design",
    difficulty: 'medium',
    timeLimit: 210,
    questions: [
      {
        type: 'matching',
        question: "Match each tool with its primary creative function.",
        items: [
          "ChatGPT",
          "Gemini"
        ],
        descriptions: [
          "Supports creative ideation and content generation.",
          "Manages both text and image tasks."
        ],
        correctPairs: [0, 1]
      },
      {
        type: 'sorting',
        question: "Sort the following creative functions into the appropriate tool category.",
        activities: [
          "Content generation",
          "Idea brainstorming",
          "Image processing",
          "Multi‑modal creative tasks"
        ],
        categories: [
          "ChatGPT",
          "Gemini"
        ],
        correctCategories: [0, 0, 1, 1]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps in a content creation workflow that leverages these tools.",
        steps: [
          "Brainstorm creative ideas.",
          "Generate textual content.",
          "Enhance content with relevant images."
        ],
        correctOrder: [0, 1, 2]
      }
    ]
  },
  {
    id: "development-automation",
    title: "Development & Automation",
    difficulty: 'medium',
    timeLimit: 210,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the following benefits of workflow automation (as enabled by Make.com) in order of impact on operational efficiency.",
        steps: [
          "Reduced manual tasks",
          "Increased efficiency",
          "Improved consistency"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'matching',
        question: "Identify the main advantage of using Make.com by labeling its core function.",
        items: [
          "Make.com"
        ],
        descriptions: [
          "Automates workflows across platforms, reducing manual tasks"
        ],
        correctPairs: [0]
      },
      {
        type: 'matching',
        question: "Match each step in an automation process with its description.",
        items: [
          "Identify repetitive manual tasks.",
          "Configure automated workflows.",
          "Monitor and optimize automation."
        ],
        descriptions: [
          "Recognize tasks best suited for automation.",
          "Set up systems to perform tasks automatically.",
          "Analyze and adjust processes for improved efficiency."
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "key-applications",
    title: "Key Applications",
    difficulty: 'medium',
    timeLimit: 240,
    questions: [
      {
        type: 'sequencing',
        question: "Sequence the steps a Remote Helper might follow to manage a project using these key applications.",
        steps: [
          "Transcribe and summarize meetings in real time.",
          "Prioritize tasks and track deadlines.",
          "Automate scheduling and data entry processes."
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Rank the key applications based on their potential to reduce manual workload—from highest to lowest impact.",
        steps: [
          "Process Automation",
          "Task Management",
          "Communication"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'sorting',
        question: "Sort the following functions into the appropriate key application category.",
        activities: [
          "Real‑time transcription",
          "Automated summaries",
          "AI‑driven prioritization",
          "Deadline tracking",
          "Streamlined scheduling",
          "Data entry and analysis"
        ],
        categories: [
          "Communication",
          "Task Management",
          "Process Automation"
        ],
        correctCategories: [0, 0, 1, 1, 2, 2]
      }
    ]
  },
  {
    id: "problem-description-quiz",
    title: "Problem Description",
    difficulty: 'medium',
    timeLimit: 180,
    questions: [
      {
        type: 'sequencing',
        question: "Rank the following aspects by importance when describing a workplace problem that your AI solution will address.",
        steps: [
          "Specific workplace process or challenge",
          "Examples from daily work",
          "How AI can enhance productivity"
        ],
        correctOrder: [0, 2, 1]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps to write an effective problem description.",
        steps: [
          "Explain the workplace challenge",
          "Describe how AI tools can automate routine tasks",
          "Include specific examples from your work"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: 'matching',
        question: "Identify and label each key component of the problem description by assigning its function.",
        items: [
          "Workplace process/challenge",
          "AI impact on productivity",
          "Daily work examples"
        ],
        descriptions: [
          "Defines the specific issue to be improved",
          "Explains how AI enhances efficiency or decision‑making",
          "Provides concrete instances showing the need for AI"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  {
    id: "ai-tools-implementation-quiz",
    title: "AI Tools and Implementation",
    difficulty: 'medium',
    timeLimit: 210,
    questions: [
      {
        type: 'matching',
        question: "Match each implementation detail with its description.",
        items: [
          "Selected AI tools (e.g., Claude AI, Perplexity AI, Grok)",
          "Specific use cases and workflow integration",
          "Implementation process and timeline"
        ],
        descriptions: [
          "The tools chosen based on task requirements and team expertise",
          "Detailed explanation of how each tool is applied and integrated",
          "A step-by-step plan with key milestones and timeframes"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: 'sorting',
        question: "Sort the following details into three categories: Tool Selection, Integration, and Timeline.",
        activities: [
          "Choosing Claude AI for document processing",
          "Using Perplexity AI for data verification",
          "Outlining steps for workflow integration",
          "Setting a 3‑month implementation plan",
          "Defining key features utilized"
        ],
        categories: [
          "Tool Selection",
          "Integration",
          "Timeline"
        ],
        correctCategories: [0, 0, 1, 2, 1]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps for implementing AI tools in your workflow.",
        steps: [
          "Select appropriate AI tools",
          "Define specific use cases",
          "Integrate tools into your workflow",
          "Establish an implementation timeline"
        ],
        correctOrder: [0, 1, 2, 3]
      }
    ]
  },
  {
    id: "results-impact-quiz",
    title: "Results and Impact",
    difficulty: 'easy',
    timeLimit: 180,
    questions: [
      {
        type: 'sequencing',
        question: "Sequence the reporting of results in a logical order.",
        steps: [
          "Report time saved on tasks",
          "Describe quality improvements in output",
          "Present workflow efficiency gains",
          "Include team feedback and adoption"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'matching',
        question: "Label each result metric with its corresponding measurement focus.",
        items: [
          "Time saved",
          "Quality improvements",
          "Efficiency gains",
          "Team feedback"
        ],
        descriptions: [
          "Measures reduction in task duration",
          "Assesses the enhancement in output standards",
          "Evaluates workflow optimization",
          "Reflects user satisfaction and adoption"
        ],
        correctPairs: [0, 1, 2, 3]
      },
      {
        type: 'sequencing',
        question: "Rank the impact metrics by their potential influence on overall business performance.",
        steps: [
          "Workflow efficiency gains",
          "Time saved on tasks",
          "Quality improvements",
          "Team feedback and adoption"
        ],
        correctOrder: [0, 1, 2, 3]
      }
    ]
  },
  {
    id: "future-development-quiz",
    title: "Future Development Plans",
    difficulty: 'medium',
    timeLimit: 180,
    questions: [
      {
        type: 'matching',
        question: "Match each future development phase with its corresponding action.",
        items: [
          "Short-term",
          "Mid-term",
          "Long-term"
        ],
        descriptions: [
          "Expand use cases and team training",
          "Integrate with more work processes",
          "Develop a department-wide AI adoption strategy"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: 'sequencing',
        question: "Sequence the steps for future AI development.",
        steps: [
          "Expand current use cases",
          "Provide training for team members",
          "Integrate AI into additional work processes",
          "Formulate a broad adoption strategy"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'sorting',
        question: "Sort the following future development strategies into their corresponding timeframes.",
        activities: [
          "Team training and small-scale pilots",
          "Broader integration across multiple processes",
          "Department-wide strategy formulation"
        ],
        categories: [
          "Short-term",
          "Mid-term",
          "Long-term"
        ],
        correctCategories: [0, 1, 2]
      }
    ]
  },
  {
    id: "presentation-guidelines-quiz",
    title: "Presentation Guidelines",
    difficulty: 'easy',
    timeLimit: 180,
    questions: [
      {
        type: 'matching',
        question: "Identify and label the key elements that should be included in your presentation.",
        items: [
          "Practical examples of AI tools in use",
          "Demonstrated workflow improvements",
          "Lessons learned and best practices",
          "Recommendations for others"
        ],
        descriptions: [
          "Show real cases of AI implementation",
          "Highlight measurable changes in processes",
          "Share insights and challenges encountered",
          "Provide actionable advice for peers"
        ],
        correctPairs: [0, 1, 2, 3]
      },
      {
        type: 'sequencing',
        question: "Sequence the logical order for presenting your project results.",
        steps: [
          "Begin with practical examples",
          "Demonstrate workflow improvements",
          "Share lessons learned and best practices",
          "Conclude with recommendations"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: 'sequencing',
        question: "Rank the presentation elements by their potential to engage an audience, from most engaging to least engaging.",
        steps: [
          "Practical examples of AI tools",
          "Demonstrated workflow improvements",
          "Lessons learned and best practices",
          "Recommendations for others"
        ],
        correctOrder: [0, 1, 2, 3]
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
  const [expandedSections, setExpandedSections] = useState<string[]>(['available-quizzes']);

  useEffect(() => {
    const newProgress = (completedQuizzes.length / quizTopics.length) * 100;
    setProgress(Math.round(newProgress));
  }, [completedQuizzes]);

  const handleSelectQuiz = (quiz: QuizTopic) => {
    setSelectedQuiz(quiz);
  };

  const handleStartQuiz = () => {
    if (selectedQuiz) {
      console.log("Starting quiz:", selectedQuiz.title);
      console.log("Questions:", selectedQuiz.questions);
      setQuizActive(true);
    }
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

  const renderStars = (score: number, total: number) => {
    const stars = [];
    for (let i = 0; i < total; i++) {
      stars.push(
        <span key={i} className={i < score ? "text-yellow-300" : "text-gray-500"}>
          ★
        </span>
      );
    }
    return stars;
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
          
          <Accordion
            type="multiple"
            defaultValue={['available-quizzes']}
            value={expandedSections}
            className="space-y-2"
          >
            <AccordionItem
              value="available-quizzes"
              className="fantasy-card border-0 overflow-hidden mb-2"
            >
              <AccordionTrigger
                onClick={() => setExpandedSections(prev =>
                  prev.includes('available-quizzes')
                    ? prev.filter(id => id !== 'available-quizzes')
                    : [...prev, 'available-quizzes']
                )}
                className="px-4 py-3 text-left text-sm font-medium hover:bg-purple-900/30 text-white"
              >
                Available Quizzes
              </AccordionTrigger>
              <AccordionContent className="px-2 py-1">
                <div className="space-y-1 pl-4 border-l border-purple-800/50">
                  {quizTopics.map((quiz) => (
                    <Button
                      key={quiz.id}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-left text-sm h-auto py-1",
                        selectedQuiz?.id === quiz.id
                          ? "bg-purple-900/50 text-purple-300"
                          : completedQuizzes.includes(quiz.id)
                          ? "text-green-400 hover:text-green-300"
                          : "text-gray-300 hover:text-white"
                      )}
                      onClick={() => handleSelectQuiz(quiz)}
                    >
                      <span className="mr-2">
                        {completedQuizzes.includes(quiz.id) ? "✓" : "○"}
                      </span>
                      <span className="flex-1">{quiz.title}</span>
                      <span className={`text-xs font-medium mr-2 ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                      {completedQuizzes.includes(quiz.id) && (
                        <span className="text-xs">
                          {renderStars(quizResults[quiz.id] || 0, quiz.questions.length)}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-2"
            >
              <PlayCircle size={18} />
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
