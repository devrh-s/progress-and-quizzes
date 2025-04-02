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
    hasQuiz?: boolean;
  }[];
}

const quizzes = {
  "developing-practical-ai-skills": {
    id: "developing-practical-ai-skills-quiz",
    title: "Developing Practical AI Skills Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each training component with its corresponding description.",
        items: ["AI Fluency", "Critical Analysis", "Role-Context-Query Method", "Practical Exercise"],
        descriptions: [
          "Master tools like ChatGPT, Claude, and Perplexity AI to solve real business problems with a focus on strategic implementation.",
          "Apply critical thinking for decision-making and problem-solving with AI tools.",
          "Learn precise formulation and task decomposition for effective AI interaction.",
          "Create an AI-assisted workflow optimization plan with clear metrics and validation steps."
        ],
        correctPairs: [0, 1, 2, 3]
      },
      {
        type: "sequencing",
        question: "Arrange the training components in the exact order they are presented in the training module.",
        steps: [
          "AI Fluency",
          "Critical Analysis",
          "Role-Context-Query Method",
          "Practical Exercise"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: "sorting",
        question: "For each statement, identify which training component it best describes.",
        activities: [
          "This component focuses on mastering AI tools like ChatGPT, Claude, and Perplexity AI to address real business challenges.",
          "This section encourages the use of critical thinking for effective decision-making and problem-solving with AI.",
          "In this part, learners practice creating an AI-assisted workflow optimization plan complete with metrics and validation.",
          "This method teaches how to precisely formulate tasks and decompose them for more effective AI interactions."
        ],
        categories: ["AI Fluency", "Critical Analysis", "Role-Context-Query Method", "Practical Exercise"],
        correctCategories: [0, 1, 3, 2]
      }
    ]
  },
  "proactive-ai-implementation": {
    id: "proactive-ai-implementation-quiz",
    title: "Proactive AI Implementation Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "sorting",
        question: "Drag each of the following items into one of three categories based on its role in strategic planning for proactive AI implementation and personal development.",
        activities: [
          "Rapid Testing",
          "Change Management",
          "Tool Selection",
          "Skills Assessment",
          "Project Focus",
          "Continuous Learning",
          "Example",
          "Planning"
        ],
        categories: ["Implementation Strategies", "Personal Development Strategies", "Illustration"],
        correctCategories: [0, 0, 0, 1, 1, 1, 2, 0]
      },
      {
        type: "sequencing",
        question: "Reorder the following strategic planning components to reflect the exact sequence in which they appear in the text.",
        steps: [
          "Rapid Testing: Launch small pilots quickly, learn from results, and scale successful approaches.",
          "Change Management: Drive adoption through clear communication and demonstrable benefits.",
          "Tool Selection: Choose appropriate AI tools based on specific professional roles and needs.",
          "Skills Assessment: Identify areas for improvement in AI tool usage and implementation.",
          "Project Focus: Apply learning to real projects aligned with course objectives.",
          "Continuous Learning: Practice AI skills through hands-on projects and exercises.",
          "Example: Develop practical solutions using Claude AI for documents and Perplexity AI for information verification.",
          "Planning: Create detailed project plans with measurable outcomes."
        ],
        correctOrder: [0, 1, 2, 3, 4, 5, 6, 7]
      },
      {
        type: "matching",
        question: "For each description below, match the correct strategic planning component label.",
        items: [
          "Launch small pilots quickly, learn from results, and scale successful approaches.",
          "Drive adoption through clear communication and demonstrable benefits.",
          "Choose appropriate AI tools based on specific professional roles and needs.",
          "Practice AI skills through hands-on projects and exercises."
        ],
        descriptions: [
          "Rapid Testing",
          "Change Management",
          "Tool Selection",
          "Continuous Learning"
        ],
        correctPairs: [0, 1, 2, 3]
      }
    ]
  },
  "personal-ai-development": {
    id: "personal-ai-development-quiz",
    title: "Personal AI Development Quiz",
    difficulty: "Intermediate",
    timeLimit: 180,
    questions: [
      {
        type: "sequencing",
        question: "Arrange the steps for personal AI development in the correct order.",
        steps: [
          "Conduct a skills assessment",
          "Apply learning to real projects",
          "Engage in continuous practice and refinement"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
        question: "Match each component of personal AI development with its description.",
        items: ["Skills Assessment", "Project Focus", "Continuous Learning"],
        descriptions: [
          "Identifying areas for improvement in AI tool usage",
          "Applying learning to practical projects",
          "Regular practice to refine and enhance skills"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: "sorting",
        question: "Sort the following project planning elements into two categories: Strategy and Measurement.",
        activities: [
          "Define clear objectives",
          "Outline action steps",
          "Establish success metrics",
          "Set timelines"
        ],
        categories: ["Strategy", "Measurement"],
        correctCategories: [0, 0, 1, 1]
      }
    ]
  },
  "final-project": {
    id: "final-project-quiz",
    title: "Final Project Quiz",
    difficulty: "Advanced",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each project step with its corresponding task description.",
        items: ["Analysis", "Tools", "Execute", "Present"],
        descriptions: [
          "Identify opportunities for AI implementation.",
          "Select and implement appropriate AI solutions.",
          "Build and test solutions with stakeholder feedback.",
          "Demonstrate results and future development plans."
        ],
        correctPairs: [0, 1, 2, 3]
      },
      {
        type: "sequencing",
        question: "Arrange the following steps in the exact sequence as described in the project.",
        steps: [
          "Analysis: Identify opportunities for AI implementation.",
          "Tools: Select and implement appropriate AI solutions.",
          "Execute: Build and test solutions with stakeholder feedback.",
          "Present: Demonstrate results and future development plans."
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: "sorting",
        question: "For each detailed task description below, assign the correct project step label.",
        activities: [
          "Develop a method to identify where AI can be effectively implemented to address a business challenge.",
          "Choose and deploy the right AI tools that match the business needs.",
          "Construct the solution and gather feedback from stakeholders to refine the implementation.",
          "Showcase the results and outline a roadmap for future developments."
        ],
        categories: ["Analysis", "Tools", "Execute", "Present"],
        correctCategories: [0, 1, 2, 3]
      }
    ]
  },
  "key-focus-areas": {
    id: "key-focus-areas-quiz",
    title: "Key Focus Areas Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each Key Focus Area with its corresponding description.",
        items: ["Practical Skills", "Implementation", "Results"],
        descriptions: [
          "Hands-on experience with AI tools and applications.",
          "Strategic approach to AI solution deployment.",
          "Measurable improvements in workflow efficiency."
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Arrange the Key Focus Areas in the exact order they are presented in the text.",
        steps: [
          "Practical Skills",
          "Implementation",
          "Results"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sorting",
        question: "For each statement below, select the Key Focus Area that best matches the description.",
        activities: [
          "Gaining direct, hands-on experience by working with AI tools and applications.",
          "Developing and executing a well-thought-out plan for deploying AI solutions effectively.",
          "Achieving quantifiable improvements in workflow efficiency as a result of AI adoption."
        ],
        categories: ["Practical Skills", "Implementation", "Results"],
        correctCategories: [0, 1, 2]
      }
    ]
  },
  "rct-framework-basics": {
    id: "rct-framework-basics-quiz",
    title: "RCT Framework Basics Quiz",
    difficulty: "Intermediate",
    timeLimit: 180,
    questions: [
      {
        type: "sequencing",
        question: "Sequence the steps to build an effective RCT prompt.",
        steps: [
          "Specify the AI's role",
          "Provide relevant background information and requirements",
          "Clearly state what needs to be done and in what format"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
        question: "Match each element of the RCT Framework with its correct function.",
        items: ["Role", "Context", "Task"],
        descriptions: [
          "Specifies the AI's assigned expertise (e.g., 'Documentation Specialist')",
          "Provides the necessary background details and requirements",
          "Clearly defines the desired action and output format"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  "effective-prompting-principles": {
    id: "effective-prompting-principles-quiz",
    title: "Effective Prompting Principles Quiz",
    difficulty: "Intermediate",
    timeLimit: 180,
    questions: [
      {
        type: "sequencing",
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
        type: "matching",
        question: "Match each effective prompting principle with its corresponding description.",
        items: ["Precision", "Context Relevance", "Task Breakdown", "Clear Formatting", "Iteration"],
        descriptions: [
          "Being specific in your request (e.g., 'Create a summary in 5 bullet points')",
          "Including necessary background information",
          "Splitting a complex request into smaller, manageable steps",
          "Specifying how the output should be presented",
          "Refining the prompt based on initial outcomes"
        ],
        correctPairs: [0, 1, 2, 3, 4]
      }
    ]
  },
  "document-processing-with-rct": {
    id: "document-processing-with-rct-quiz",
    title: "Document Processing Quiz",
    difficulty: "Intermediate",
    timeLimit: 180,
    questions: [
      {
        type: "sequencing",
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
        type: "matching",
        question: "Identify the key components of the document processing prompt by matching each with its function.",
        items: ["Role", "Task (Action)", "Output Format"],
        descriptions: [
          "'Documentation Specialist' (assigns specific expertise)",
          "Analyze the meeting transcript and extract key decisions and action items",
          "Format the result as a bulleted list"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  "information-search-with-rct": {
    id: "information-search-with-rct-quiz",
    title: "Information Search Quiz",
    difficulty: "Intermediate",
    timeLimit: 180,
    questions: [
      {
        type: "sorting",
        question: "Sort the following industry statistic rows based on their growth rate from highest to lowest.",
        activities: [
          "Market Size (12%)",
          "User Base (15%)",
          "ROI (8%)"
        ],
        categories: ["Highest Growth", "Medium Growth", "Lowest Growth"],
        correctCategories: [1, 0, 2]
      },
      {
        type: "matching",
        question: "Identify the key components from the information search prompt by matching each with its correct role.",
        items: ["Assigned Role", "Research Focus", "Expected Output Format"],
        descriptions: [
          "'Research Assistant'",
          "Finding relevant industry statistics with emphasis on market growth and trends",
          "A table with columns (Category, Current Value, Growth Rate, Source)"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  "why-the-rct-framework-works": {
    id: "why-the-rct-framework-works-quiz",
    title: "Why This Works Quiz",
    difficulty: "Intermediate",
    timeLimit: 180,
    questions: [
      {
        type: "sequencing",
        question: "Sequence the rationale behind the RCT framework's effectiveness.",
        steps: [
          "Assign a clear role to the AI",
          "Provide detailed and relevant context",
          "Deliver a structured and organized output"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
        question: "Match each benefit of the RCT framework with its corresponding effect.",
        items: ["Clear Roles", "Detailed Context", "Structured Output"],
        descriptions: [
          "Ensures the AI has specific expertise for the task",
          "Provides well-defined parameters and background information",
          "Organizes the delivered information in a consistent format"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  "rh-ai-tools": {
    id: "rh-ai-tools-quiz",
    title: "RH AI Tools Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "sorting",
        question: "For each statement below, select the appropriate RH AI Tool from the list provided.",
        activities: [
          "This tool creates and analyzes documents, reports, and administrative content with high accuracy.",
          "This tool delivers verified research results and fact-checking with cited sources.",
          "This tool processes bulk text and learns from interactions to improve workflow efficiency.",
          "This tool creates content and assists with creative ideation.",
          "This tool handles both text and image tasks with Google's latest AI technology.",
          "This tool automates workflows across platforms, reducing manual tasks."
        ],
        categories: ["Claude AI", "Perplexity AI", "Grok", "ChatGPT", "Gemini", "Make.com"],
        correctCategories: [0, 1, 2, 3, 4, 5]
      },
      {
        type: "sorting",
        question: "Drag and drop each tool into the correct category based on its focus area.",
        activities: [
          "Claude AI",
          "Perplexity AI",
          "Grok",
          "ChatGPT",
          "Gemini",
          "Make.com"
        ],
        categories: ["Text Generation & Analysis", "Content Creation & Design", "Development & Automation"],
        correctCategories: [0, 0, 0, 1, 1, 2]
      },
      {
        type: "sequencing",
        question: "Arrange the following AI tools in the order they are listed under the \"Text Generation & Analysis\" category in the provided material.",
        steps: [
          "Claude AI",
          "Perplexity AI",
          "Grok"
        ],
        correctOrder: [0, 1, 2]
      }
    ]
  },
  "implementation-workflow": {
    id: "implementation-workflow-quiz",
    title: "Implementation Workflow Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each Essential AI Tool with its corresponding function.",
        items: ["Claude AI", "Perplexity AI", "Grok"],
        descriptions: [
          "Document processing and analysis",
          "Information search and verification",
          "Workflow automation"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Arrange the following steps of the Implementation Structure in the exact order as described in the material.",
        steps: [
          "Data Collection: Use Perplexity AI for research",
          "Analysis: Apply Claude AI for processing",
          "Content Generation: Create outputs with AI assistance",
          "Iteration: Refine based on feedback"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: "sorting",
        question: "For each description in the Testing & Optimization section, select the correct step from the list provided.",
        activities: [
          "Test functionality and performance.",
          "Track key metrics.",
          "Improve processes.",
          "Incorporate user input."
        ],
        categories: ["Validation", "Monitoring", "Optimization", "Feedback"],
        correctCategories: [0, 1, 2, 3]
      }
    ]
  },
  "build-working-prototype": {
    id: "build-working-prototype-quiz",
    title: "Working Prototype Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each AI tool with its corresponding function.",
        items: ["Claude AI", "Perplexity AI"],
        descriptions: [
          "Document processing",
          "Information verification"
        ],
        correctPairs: [0, 1]
      },
      {
        type: "sequencing",
        question: "Arrange the following implementation steps in the correct order as described in the task.",
        steps: [
          "Define workflow requirements",
          "Implement AI tools",
          "Test and validate results"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sorting",
        question: "For each description below, assign the correct project phase label from the list provided.",
        activities: [
          "Create an automated workflow, define clear goals, and establish success metrics.",
          "Use Claude AI for document processing and Perplexity AI for information verification.",
          "Outline what the workflow should achieve, deploy the selected AI tools, and verify the outcome.",
          "Monitor performance metrics and gather user feedback to refine the process."
        ],
        categories: ["Objective", "Tools", "Steps", "Optimization"],
        correctCategories: [0, 1, 2, 3]
      }
    ]
  },
  "combined-implementation": {
    id: "combined-implementation-quiz",
    title: "Project Implementation Quiz",
    difficulty: "Intermediate",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each project section with its corresponding details.",
        items: ["AI Tools and Implementation", "Results and Impact", "Future Development"],
        descriptions: [
          "Selected AI tools (Claude AI, Perplexity AI, or Grok), specific use cases, key features utilized, implementation process, and timeline.",
          "Time saved on tasks, quality improvements in output, workflow efficiency gains, team feedback, and adoption.",
          "Short-term: Expand use cases and team training; Mid-term: Integration with more work processes; Long-term: Department-wide AI adoption strategy."
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Arrange the Future Development steps in the correct order as described in the material.",
        steps: [
          "Short-term: Expand use cases and team training",
          "Mid-term: Integration with more work processes",
          "Long-term: Department-wide AI adoption strategy"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sorting",
        question: "For each description below, assign the correct project section.",
        activities: [
          "Time saved on tasks and workflow efficiency gains",
          "Integration with more work processes",
          "Selected AI tools and their specific use cases",
          "Team feedback and adoption rates",
          "Department-wide AI adoption strategy",
          "Implementation process and timeline"
        ],
        categories: ["AI Tools and Implementation", "Results and Impact", "Future Development"],
        correctCategories: [1, 2, 0, 1, 2, 0]
      }
    ]
  }
};

const courseSections = [
  {
    id: "introduction",
    title: "Introduction",
    subtopics: [
      {
        id: "course-overview",
        title: "Course Overview",
        content: `# Course Overview

This course is dedicated to the AI tools used by our company. Throughout your learning journey, you will encounter tests with a few questions to reinforce the material. These tests are mandatory and should not be skipped. There will also be practical assignments.`,
        hasQuiz: false
      }
    ]
  },
  {
    id: "practical-skills",
    title: "Practical Skills & Proactive Implementation",
    subtopics: [
      {
        id: "developing-practical-ai-skills",
        title: "Developing Practical AI Skills",
        content: `# Developing Practical AI Skills

In today's digital world, practical AI skills are essential for tech professionals. This training focuses on developing AI competencies through hands-on experience:

- **AI Fluency**: Master tools like ChatGPT, Claude, and Perplexity AI for solving real business problems. Focus on strategic implementation rather than basic prompting.
- **Critical Analysis**: Apply critical thinking for decision-making and problem-solving with AI tools.
- **Role-Context-Query Method**: Learn precise formulation and task decomposition for effective AI interaction.

**Practical Exercise**: Create an AI-assisted workflow optimization plan with clear metrics and validation steps.`,
        hasQuiz: true
      },
      {
        id: "proactive-ai-implementation",
        title: "Proactive AI Implementation & Personal Development",
        content: `# Proactive AI Implementation & Personal Development

Success in AI adoption requires strategic planning:

- **Rapid Testing**: Launch small pilots quickly, learn from results, and scale successful approaches.
- **Change Management**: Drive adoption through clear communication and demonstrable benefits.
- **Tool Selection**: Choose appropriate AI tools based on specific professional roles and needs.
- **Skills Assessment**: Identify areas for improvement in AI tool usage and implementation.
- **Project Focus**: Apply learning to real projects aligned with course objectives.
- **Continuous Learning**: Practice AI skills through hands-on projects and exercises.

**Example**: Develop practical solutions using Claude AI for documents and Perplexity AI for information verification.
**Planning**: Create detailed project plans with measurable outcomes.`,
        hasQuiz: true
      },
      {
        id: "final-project",
        title: "Final Project",
        content: `# Final Project

Implement an AI solution for business process improvement:

**Task**: Develop and present an AI-driven solution for a specific business challenge.

**Steps**:

1. **Analysis**: Identify opportunities for AI implementation.
2. **Tools**: Select and implement appropriate AI solutions.
3. **Execute**: Build and test solutions with stakeholder feedback.
4. **Present**: Demonstrate results and future development plans.

**Example**: Workflow optimization using AI tools covered in the course.`,
        hasQuiz: false
      },
      {
        id: "key-focus-areas",
        title: "Key Focus Areas",
        content: `# Key Focus Areas

- **Practical Skills**: Hands-on experience with AI tools and applications.
- **Implementation**: Strategic approach to AI solution deployment.
- **Results**: Measurable improvements in workflow efficiency.

Success requires practical expertise, strategic thinking, and effective implementation of AI technologies.`,
        hasQuiz: false
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
        content: `# RCT Framework Basics

The framework consists of three key elements:

- **Role**: Specify the AI's role (e.g., "Documentation Specialist" when working with documents)
- **Context**: Provide relevant background information and specific requirements
- **Task**: Clearly state what needs to be done and in what format`,
        hasQuiz: false
      },
      {
        id: "effective-prompting-principles",
        title: "Effective Prompting Principles",
        content: `# Effective Prompting Principles

Key principles:

1. **Precision**: Be specific in your requests (e.g., "Create a summary of the meeting minutes in 5 bullet points")
2. **Context relevance**: Include relevant background information
3. **Task breakdown**: Split complex requests into smaller steps
4. **Iteration**: Refine prompts based on results
5. **Clear formatting**: Define how you want the information presented`,
        hasQuiz: false
      },
      {
        id: "document-processing-with-rct",
        title: "Document Processing",
        content: `# Document Processing

**Prompt**:

> "As a Documentation Specialist, analyze this meeting transcript. Extract key decisions and action items. Format as a bulleted list."

**Result**:

1. **Project timeline**: Approved Q2 start date
2. **Budget allocation**: Resources confirmed
3. **Team structure**: Roles defined
4. **Next steps**: Weekly progress reviews
5. **Tools**: Selected collaboration platform`,
        hasQuiz: false
      },
      {
        id: "information-search-with-rct",
        title: "Information Search",
        content: `# Information Search

**Prompt**:

> "As a Research Assistant, find relevant industry statistics for our quarterly report. Focus on market growth and trends."

| Category | Current Value | Growth Rate | Source |
| --- | --- | --- | --- |
| Market Size | $5.2B | 12% | Industry Report |
| User Base | 2.5M | 15% | Analytics |
| ROI | 185% | 8% | Customer Data |`,
        hasQuiz: false
      },
      {
        id: "why-the-rct-framework-works",
        title: "Why This Works",
        content: `# Why This Works

- **Clear roles**: Specific AI expertise assignment
- **Detailed context**: Well-defined parameters
- **Structured output**: Organized information delivery

The RCT framework helps employees maximize AI tool effectiveness across various work tasks.`,
        hasQuiz: false
      }
    ]
  },
  {
    id: "ai-tools-overview",
    title: "AI Tools in Remote Helpers Overview",
    subtopics: [
      {
        id: "rh-ai-tools",
        title: "RH AI Tools",
        content: `# RH AI Tools

## Text Generation & Analysis

- **Claude AI**: Creates and analyzes documents, reports, and administrative content with high accuracy.
- **Perplexity AI**: Delivers verified research results and fact-checking with cited sources.
- **Grok**: Processes bulk text and learns from interactions to improve workflow efficiency.

## Content Creation & Design

- **ChatGPT**: Creates content and assists with creative ideation.
- **Gemini**: Handles both text and image tasks with Google's latest AI technology.

## Development & Automation

- **Make.com**: Automates workflows across platforms, reducing manual tasks.`,
        hasQuiz: true
      },
      {
        id: "key-applications",
        title: "Key Applications",
        content: `# Key Applications

- **Communication**: Real-time transcription and automated summaries.
- **Task Management**: AI-driven prioritization and deadline tracking.
- **Process Automation**: Streamlined scheduling, data entry, and analysis.

These tools enable Remote Helpers to deliver faster, more accurate results while reducing operational overhead and improving team efficiency.`,
        hasQuiz: false
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
        content: `# Core Components of AI Project Development

Strategic planning, tool selection, workflow development, and testing are essential components of an AI project in our onboarding program. This lesson covers practical AI project development techniques.

Key phases include:

- **Problem Formulation**: Define business problem, set measurable KPIs, and align with stakeholders.
- **Tool Selection**: Choose AI tools based on task requirements, data needs, and team expertise.
- **Workflow Development**: Create project lifecycle plan, define roles, and establish feedback loops.
- **Testing & Optimization**: Implement testing protocols and use feedback for improvements.`,
        hasQuiz: false
      },
      {
        id: "implementation-workflow",
        title: "Implementation Workflow & Optimization",
        content: `# Implementation Workflow & Optimization

## Essential AI Tools
- **Claude AI**: Document processing and analysis
- **Perplexity AI**: Information search and verification
- **Grok**: Workflow automation

## Implementation Structure
1. **Data Collection**: Use Perplexity AI for research
2. **Analysis**: Apply Claude AI for processing
3. **Content Generation**: Create outputs with AI assistance
4. **Iteration**: Refine based on feedback

## Testing & Optimization
- **Validation**: Test functionality and performance
- **Monitoring**: Track key metrics
- **Optimization**: Improve processes
- **Feedback**: Incorporate user input`,
        hasQuiz: true
      },
      {
        id: "build-working-prototype",
        title: "Task – Build a Working Prototype",
        content: `# Task: Build a Working Prototype

Example: Process optimization project

**Objective**: Create an automated workflow
- Define clear goals
- Establish success metrics

**Tools**:
- **Claude AI**: Document processing
- **Perplexity AI**: Information verification

**Steps**:
- Define workflow requirements
- Implement AI tools
- Test and validate results

**Optimization**:
- Monitor performance metrics
- Gather user feedback`,
        hasQuiz: true
      },
      {
        id: "tools-overview",
        title: "Tools Overview",
        content: `# Tools Overview

| **Tool** | **Purpose** | **Usage** |
| --- | --- | --- |
| **Claude AI** | Text generation | Workflow automation |
| **Perplexity** | Research | Data verification |
| **Grok** | Text processing | Documentation |
| **Notebook LM** | Analysis | Data handling |
| **Midjourney** | Images | Visual content |
| **ChatGPT** | Content | Communications |
| **Gemini** | Multimedia | Complex projects |
| **Cursor Pro** | Coding | Development |`,
        hasQuiz: false
      },
      {
        id: "practical-tips",
        title: "Practical Tips",
        content: `# Practical Tips

- **Start Small**: Begin with MVPs to validate concepts.
- **Collaborate**: Maintain stakeholder engagement.
- **Monitor**: Track metrics and optimize performance.

These practices ensure efficient AI project development while maintaining quality and innovation.`,
        hasQuiz: false
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
        content: `# Problem Description

Describe the specific workplace process or challenge your AI solution aims to improve. Focus on how AI tools can enhance productivity, automate routine tasks, or improve decision-making in your role. Include specific examples from your daily work that show the need for AI assistance.`,
        hasQuiz: false
      },
      {
        id: "combined-implementation",
        title: "Project Implementation, Results, and Future Plans",
        content: `# Project Implementation, Results, and Future Plans

## AI Tools and Implementation
- Selected AI tools (Claude AI, Perplexity AI, or Grok)
    - Specific use cases for each tool
    - Integration into your workflow
- Key features utilized
- Implementation process and timeline

## Results and Impact
- Time saved on tasks
- Quality improvements in output
- Workflow efficiency gains
- Team feedback and adoption

## Future Development
- Short-term: Expand use cases and team training
- Mid-term: Integration with more work processes
- Long-term: Department-wide AI adoption strategy`,
        hasQuiz: true
      },
      {
        id: "presentation-guidelines",
        title: "Presentation Guidelines",
        content: `# Presentation Guidelines

Key elements to include:

- Show practical examples of AI tools in use
- Demonstrate actual workflow improvements
- Share lessons learned and best practices
- Provide recommendations for others`,
        hasQuiz: false
      }
    ]
  }
];

const Guide: React.FC = () => {
  const [activeSection, setActiveSection] = useState({ id: "introduction", title: "Introduction" });
  const [activeSubtopic, setActiveSubtopic] = useState({ id: "course-overview", title: "Course Overview", content: "" });
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [xp, setXp] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const foundSection = courseSections.find(section => section.id === activeSection.id);
    if (foundSection) {
      const foundSubtopic = foundSection.subtopics.find(subtopic => subtopic.id === activeSubtopic.id);
      if (foundSubtopic) {
        setActiveSubtopic(foundSubtopic);
      } else if (foundSection.subtopics.length > 0) {
        setActiveSubtopic(foundSection.subtopics[0]);
      }
    }
    
    if (courseSections.length > 0) {
      let totalSubtopics = 0;
      courseSections.forEach(section => {
        totalSubtopics += section.subtopics.length;
      });
      
      const progressPercentage = Math.round((completedSections.length / totalSubtopics) * 100);
      setProgress(progressPercentage);
      setXp(completedSections.length * 5);
    }
  }, [activeSection, activeSubtopic.id, completedSections]);

  const handleSectionChange = (sectionId: string) => {
    const section = courseSections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section);
      if (section.subtopics.length > 0) {
        setActiveSubtopic(section.subtopics[0]);
      }
    }
  };

  const handleSubtopicChange = (subtopicId: string) => {
    const foundSection = courseSections.find(section => 
      section.subtopics.some(subtopic => subtopic.id === subtopicId)
    );
    
    if (foundSection) {
      setActiveSection(foundSection);
      const foundSubtopic = foundSection.subtopics.find(subtopic => subtopic.id === subtopicId);
      if (foundSubtopic) {
        setActiveSubtopic(foundSubtopic);
        if (!completedSections.includes(subtopicId)) {
          setCompletedSections(prev => [...prev, subtopicId]);
          toast({
            title: "New topic completed!",
            description: `You've earned 5 XP for completing "${foundSubtopic.title}"`,
            duration: 3000,
          });
        }
      }
    }
  };

  const handleTakeQuiz = (quizId: string) => {
    const quiz = quizzes[quizId as keyof typeof quizzes];
    if (quiz) {
      setCurrentQuiz(quiz);
      setShowQuiz(true);
    } else {
      toast({
        title: "Quiz not found",
        description: "This quiz is not available yet.",
        variant: "destructive",
      });
    }
  };

  const handleQuizComplete = (results: any) => {
    setShowQuiz(false);
    setCurrentQuiz(null);
    
    // Mark the current subtopic as completed if it's not already
    if (!completedSections.includes(activeSubtopic.id)) {
      setCompletedSections(prev => [...prev, activeSubtopic.id]);
    }
    
    toast({
      title: "Quiz Completed!",
      description: `You've completed the quiz and earned 10 XP`,
      duration: 3000,
    });
  };

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Left Sidebar - Table of Contents */}
      <div className="w-full md:w-64 md:min-w-64 bg-gray-800 p-4 md:h-full overflow-auto">
        <TableOfContents 
          sections={courseSections}
          activeSection={activeSection.id}
          activeSubtopic={activeSubtopic.id}
          completedSections={completedSections}
          onSectionChange={handleSectionChange}
          onSubtopicChange={handleSubtopicChange}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {showQuiz ? (
          <QuizComponent 
            quiz={currentQuiz} 
            onComplete={handleQuizComplete} 
          />
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Course Progress */}
            <div className="mb-8 space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-300">Course Progress</h2>
                <div className="flex items-center space-x-1 text-yellow-300">
                  <span>{xp}</span>
                  <Star size={14} />
                  <span className="text-xs text-gray-400">XP</span>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
              <div className="flex justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>Duration: 2 hours</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap size={14} className="mr-1" />
                  <span>Level: English</span>
                </div>
              </div>
            </div>
            
            {/* Content Title */}
            <div className="mb-6 border-b border-purple-800/30 pb-2">
              <h1 className="text-3xl font-bold text-white">{activeSubtopic.title}</h1>
              <p className="text-gray-400 text-sm mt-1">
                {activeSection.title}
              </p>
            </div>
            
            {/* Content */}
            <CourseContent 
              content={activeSubtopic.content} 
              quizId={activeSubtopic.hasQuiz ? activeSubtopic.id : undefined}
              onTakeQuiz={handleTakeQuiz}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Guide;
