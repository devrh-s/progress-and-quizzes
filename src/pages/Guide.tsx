import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CourseContent } from '@/components/CourseContent';
import { TableOfContents } from '@/components/TableOfContents';
import { toast } from '@/hooks/use-toast';
import { Home, Clock, Users, BookOpen, GraduationCap, Star, Briefcase } from 'lucide-react';
import { QuizComponent } from '@/components/QuizComponent';

interface Section {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: string;
  title: string;
  content: string;
}

const quizzes = {
  "practical-skills-intro": {
    id: "practical-skills-intro-quiz",
    title: "Practical AI Skills Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each key component with its description by dragging the correct description next to the corresponding component.",
        items: ["AI Fluency", "Critical Analysis", "Role-Context-Query Method"],
        descriptions: [
          "Mastering AI tools to solve real business problems",
          "Applying analytical thinking for informed decision-making",
          "Breaking down tasks into roles, context, and precise queries"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Arrange the following steps to develop practical AI skills in the correct order.",
        steps: [
          "Understanding basic AI concepts",
          "Gaining hands-on experience",
          "Applying AI tools in real projects",
          "Evaluating outcomes and refining strategies"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: "sorting",
        question: "Sort these activities into two categories: Practical Application and Theoretical Study.",
        activities: [
          "Participating in an AI workshop",
          "Reading research papers on AI algorithms",
          "Experimenting with AI tools in real projects",
          "Attending academic lectures on AI fundamentals"
        ],
        categories: ["Practical Application", "Theoretical Study"],
        correctCategories: [0, 1, 0, 1]
      }
    ]
  },
  "proactive-implementation": {
    id: "proactive-implementation-quiz",
    title: "Proactive Implementation Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Arrange the strategic steps for proactive AI implementation in the correct order.",
        steps: [
          "Analyze business needs",
          "Launch rapid testing pilots",
          "Manage change through clear communication",
          "Select appropriate AI tools"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: "matching",
        question: "Match each element of proactive implementation with its function.",
        items: ["Rapid Testing", "Change Management", "Tool Selection"],
        descriptions: [
          "Launching small pilots to validate ideas quickly",
          "Driving adoption with clear, effective communication",
          "Choosing the right AI tools based on role needs"
        ],
        correctPairs: [0, 1, 2]
      },
      {
        type: "sorting",
        question: "Sort the following items into two groups: Strategic Elements and Non‑Strategic Elements.",
        activities: [
          "Rapid Testing",
          "Change Management",
          "Random Experimentation",
          "Unplanned Trials"
        ],
        categories: ["Strategic Elements", "Non‑Strategic Elements"],
        correctCategories: [0, 0, 1, 1]
      }
    ]
  },
  "personal-ai-development": {
    id: "personal-ai-development-quiz",
    title: "Personal AI Development Quiz",
    difficulty: "Mixed",
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
        type: "sorting",
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
  "final-project": {
    id: "final-project-quiz",
    title: "Final Project Quiz",
    difficulty: "Mixed",
    timeLimit: 180,
    questions: [
      {
        type: "sequencing",
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
        type: "matching",
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
        type: "sorting",
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
  "key-focus-areas": {
    id: "key-focus-areas-quiz",
    title: "Key Focus Areas Quiz",
    difficulty: "Mixed",
    timeLimit: 180,
    questions: [
      {
        type: "matching",
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
        type: "sequencing",
        question: "Arrange the key focus areas in the order they are emphasized for successful AI adoption.",
        steps: [
          "Practical Skills",
          "Implementation",
          "Results"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sorting",
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
  "rct-introduction": {
    id: "rct-introduction-quiz",
    title: "RCT Framework Basics Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Rank the RCT framework elements by the order in which they should be considered when constructing a prompt.",
        steps: [
          "Role",
          "Context",
          "Task"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Sequence the steps to build an effective RCT prompt. Drag the steps into the correct order.",
        steps: [
          "Specify the AI's role",
          "Provide relevant background information and requirements",
          "Clearly state what needs to be done and in what format"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
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
  "effective-prompting-principles": {
    id: "effective-prompting-principles-quiz",
    title: "Effective Prompting Principles Quiz",
    difficulty: "Mixed",
    timeLimit: 150,
    questions: [
      {
        type: "sequencing",
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
  "document-processing": {
    id: "document-processing-quiz",
    title: "Document Processing with RCT Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
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
  "information-search": {
    id: "information-search-quiz",
    title: "Information Search with RCT Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Rank the following industry statistic rows based on their growth rate from highest to lowest.",
        steps: [
          "User Base (15%)",
          "Market Size (12%)",
          "ROI (8%)"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Sequence the steps a Research Assistant should follow when conducting an information search based on the given prompt.",
        steps: [
          "Define the research focus",
          "Gather relevant data and statistics",
          "Organize the data into a table",
          "Verify the sources"
        ],
        correctOrder: [0, 1, 2, 3]
      },
      {
        type: "matching",
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
  "why-this-works": {
    id: "why-this-works-quiz",
    title: "Why the RCT Framework Works Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Rank the benefits of the RCT framework by the order in which they contribute to effective prompting.",
        steps: [
          "Clear Roles",
          "Detailed Context",
          "Structured Output"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Sequence the rationale behind the RCT framework's effectiveness. Arrange the following steps in order.",
        steps: [
          "Assign a clear role to the AI",
          "Provide detailed and relevant context",
          "Deliver a structured and organized output"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
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
  "text-generation": {
    id: "text-generation-quiz",
    title: "Text Generation & Analysis Tools Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Rank the three AI tools based on the type of content they primarily handle—from most document‑focused to most geared toward dynamic text processing.",
        steps: [
          "Claude AI (document creation and analysis)",
          "Perplexity AI (research verification and fact‑checking)",
          "Grok (bulk text processing and interactive learning)"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Arrange the following steps that a comprehensive text analysis workflow might follow when using these tools.",
        steps: [
          "Process a large volume of text (Grok)",
          "Analyze and generate a detailed report (Claude AI)",
          "Verify facts and provide cited research (Perplexity AI)"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
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
  "content-creation": {
    id: "content-creation-quiz",
    title: "Content Creation & Design Tools Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "matching",
        question: "Match each tool with its primary creative function.",
        items: [
          "ChatGPT",
          "Gemini"
        ],
        descriptions: [
          "Supports creative ideation and content generation",
          "Manages both text and image tasks"
        ],
        correctPairs: [0, 1]
      },
      {
        type: "sorting",
        question: "Sort the following creative functions into the appropriate tool category.",
        activities: [
          "Content generation",
          "Idea brainstorming",
          "Image processing",
          "Multi-modal creative tasks"
        ],
        categories: [
          "ChatGPT",
          "Gemini"
        ],
        correctCategories: [0, 0, 1, 1]
      },
      {
        type: "sequencing",
        question: "Sequence the steps in a content creation workflow that leverages these tools.",
        steps: [
          "Brainstorm creative ideas (ChatGPT)",
          "Generate textual content (ChatGPT)",
          "Enhance content with images (Gemini)"
        ],
        correctOrder: [0, 1, 2]
      }
    ]
  },
  "development-automation": {
    id: "development-automation-quiz",
    title: "Development & Automation Tools Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Rank the following benefits of workflow automation (as enabled by Make.com) in order of impact on operational efficiency.",
        steps: [
          "Reduced manual tasks",
          "Increased efficiency",
          "Improved consistency"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "matching",
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
        type: "matching",
        question: "Match each step in an automation process with its description.",
        items: [
          "Identify repetitive manual tasks",
          "Configure automated workflows",
          "Monitor and optimize automation"
        ],
        descriptions: [
          "Recognize tasks best suited for automation",
          "Set up systems to perform tasks automatically",
          "Analyze and adjust processes for improved efficiency"
        ],
        correctPairs: [0, 1, 2]
      }
    ]
  },
  "key-applications": {
    id: "key-applications-quiz",
    title: "Key Applications for AI Tools Quiz",
    difficulty: "Mixed",
    timeLimit: 120,
    questions: [
      {
        type: "sequencing",
        question: "Sequence the steps a Remote Helper might follow to manage a project using these key applications.",
        steps: [
          "Transcribe and summarize meetings (Communication)",
          "Prioritize tasks and track deadlines (Task Management)",
          "Automate scheduling and data entry (Process Automation)"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sequencing",
        question: "Rank the key applications based on their potential to reduce manual workload—from highest to lowest impact.",
        steps: [
          "Process Automation",
          "Task Management",
          "Communication"
        ],
        correctOrder: [0, 1, 2]
      },
      {
        type: "sorting",
        question: "Sort the following functions into the appropriate key application category.",
        activities: [
          "Real-time transcription",
          "Automated summaries",
          "AI-driven prioritization",
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
  }
};

const courseSections: Section[] = [
  {
    id: "practical-skills",
    title: "Practical Skills & Proactive Implementation",
    subtopics: [
      {
        id: "practical-skills-intro",
        title: "Introduction to Practical AI Skills",
        content: `
          <h3>Understanding AI's Practical Applications</h3>
          <p>In today's digital world, practical AI skills are essential for tech professionals. This training focuses on developing AI competencies through hands-on experience:</p>
          
          <ul>
            <li><strong>AI Fluency</strong>: Master tools like ChatGPT, Claude, and Perplexity AI for solving real business problems. Focus on strategic implementation rather than basic prompting.</li>
            <li><strong>Critical Analysis</strong>: Apply critical thinking for decision-making and problem-solving with AI tools.</li>
            <li><strong>Role-Context-Query Method</strong>: Learn precise formulation and task decomposition for effective AI interaction.</li>
          </ul>
          
          <p><strong>Practical Exercise</strong>: Create an AI-assisted workflow optimization plan with clear metrics and validation steps.</p>
        `
      },
      {
        id: "proactive-implementation",
        title: "Proactive Implementation Strategies",
        content: `
          <h3>Success in AI Adoption Requires Strategic Planning</h3>
          <p>Proactive implementation means anticipating how AI can be integrated into your workflow for maximum efficiency:</p>
          
          <ul>
            <li><strong>Rapid Testing</strong>: Launch small pilots quickly, learn from results, and scale successful approaches.</li>
            <li><strong>Change Management</strong>: Drive adoption through clear communication and demonstrable benefits.</li>
            <li><strong>Tool Selection</strong>: Choose appropriate AI tools based on specific professional roles and needs.</li>
          </ul>
          
          <p><strong>Example</strong>: Develop practical solutions using Claude AI for documents and Perplexity AI for information verification.</p>
        `
      },
      {
        id: "personal-ai-development",
        title: "Personal AI Development",
        content: `
          <h3>Accelerate Your AI Expertise Through Structured Learning</h3>
          <p>Building personal AI skills requires a systematic approach:</p>
          
          <ul>
            <li><strong>Skills Assessment</strong>: Identify areas for improvement in AI tool usage and implementation.</li>
            <li><strong>Project Focus</strong>: Apply learning to real projects aligned with course objectives.</li>
            <li><strong>Continuous Learning</strong>: Practice AI skills through hands-on projects and exercises.</li>
          </ul>
          
          <p><strong>Planning</strong>: Create detailed project plans with measurable outcomes.</p>
        `
      },
      {
        id: "final-project",
        title: "Final Project",
        content: `
          <h3>Implement an AI Solution for Business Process Improvement</h3>
          <p><strong>Task</strong>: Develop and present an AI-driven solution for a specific business challenge.</p>
          
          <h4>Steps</h4>
          <ol>
            <li><strong>Analysis</strong>: Identify opportunities for AI implementation.</li>
            <li><strong>Tool Selection</strong>: Choose and implement appropriate AI solutions.</li>
            <li><strong>Execution</strong>: Build and test with stakeholder feedback.</li>
            <li><strong>Present</strong>: Demonstrate results and future development plans.</li>
          </ol>
          
          <p><strong>Example</strong>: Workflow optimization using AI tools covered in the course.</p>
        `
      },
      {
        id: "key-focus-areas",
        title: "Key Focus Areas",
        content: `
          <h3>Essential Areas for AI Implementation Success</h3>
          <p>To succeed with AI in a practical context, focus on these key areas:</p>
          
          <ul>
            <li><strong>Practical Skills</strong>: Hands-on experience with AI tools and applications.</li>
            <li><strong>Implementation</strong>: Strategic approach to AI solution deployment.</li>
            <li><strong>Results</strong>: Measurable improvements in workflow efficiency.</li>
          </ul>
          
          <p>Success requires practical expertise, strategic thinking, and effective implementation of AI technologies.</p>
        `
      }
    ]
  },
  {
    id: "rct-framework",
    title: "Mastering the Role-Context-Task (RCT) Framework",
    subtopics: [
      {
        id: "rct-introduction",
        title: "Introduction to the RCT Framework",
        content: `
          <h3>Understanding Role-Context-Task</h3>
          <p>The Role-Context-Task (RCT) Framework is used in AI onboarding to help employees effectively communicate with AI systems through structured prompts.</p>
          
          <h4>The Three Components</h4>
          <ul>
            <li><strong>Role</strong>: The expertise or perspective you want the AI to adopt (e.g., "Documentation Specialist" when working with documents)</li>
            <li><strong>Context</strong>: Background information and constraints relevant to the task</li>
            <li><strong>Task</strong>: The specific action or output you want from the AI</li>
          </ul>
          
          <p>This framework transforms vague requests into focused instructions that leverage the AI's capabilities effectively.</p>
        `
      },
      {
        id: "effective-prompting-principles",
        title: "Effective Prompting Principles",
        content: `
          <h3>Key Principles for Effective Prompts</h3>
          <p>Following these principles will help you create more effective AI prompts:</p>
          
          <ol>
            <li><strong>Precision</strong>: Be specific in your requests (e.g., "Create a summary of the meeting minutes in 5 bullet points")</li>
            <li><strong>Context relevance</strong>: Include relevant background information</li>
            <li><strong>Task breakdown</strong>: Split complex requests into smaller steps</li>
            <li><strong>Iteration</strong>: Refine prompts based on results</li>
            <li><strong>Clear formatting</strong>: Define how you want the information presented</li>
          </ol>
          
          <p>These principles ensure that your prompts are clear, specific, and designed to produce the desired results.</p>
        `
      },
      {
        id: "document-processing",
        title: "Document Processing with RCT",
        content: `
          <h3>Example: Document Processing with RCT</h3>
          
          <p><strong>Prompt</strong>:</p>
          <blockquote>
            "As a Documentation Specialist, analyze this meeting transcript. Extract key decisions and action items. Format as a bulleted list."
          </blockquote>
          
          <p><strong>Result</strong>:</p>
          <ol>
            <li><strong>Project timeline</strong>: Approved Q2 start date</li>
            <li><strong>Budget allocation</strong>: Resources confirmed</li>
            <li><strong>Team structure</strong>: Roles defined</li>
            <li><strong>Next steps</strong>: Weekly progress reviews</li>
            <li><strong>Tools</strong>: Selected collaboration platform</li>
          </ol>
          
          <p>This example demonstrates how a well-structured RCT prompt can efficiently extract key information from documents.</p>
        `
      },
      {
        id: "information-search",
        title: "Information Search with RCT",
        content: `
          <h3>Example: Information Search with RCT</h3>
          
          <p><strong>Prompt</strong>:</p>
          <blockquote>
            "As a Research Assistant, find relevant industry statistics for our quarterly report. Focus on market growth and trends."
          </blockquote>
          
          <div class="overflow-x-auto my-4">
            <table class="min-w-full border border-purple-800/30">
              <thead class="bg-purple-900/20">
                <tr>
                  <th class="px-4 py-2 text-left text-purple-300">Category</th>
                  <th class="px-4 py-2 text-left text-purple-300">Current Value</th>
                  <th class="px-4 py-2 text-left text-purple-300">Growth Rate</th>
                  <th class="px-4 py-2 text-left text-purple-300">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t border-purple-800/30">
                  <td class="px-4 py-2 text-white">Market Size</td>
                  <td class="px-4 py-2 text-white">$5.2B</td>
                  <td class="px-4 py-2 text-green-400">12%</td>
                  <td class="px-4 py-2 text-gray-300">Industry Report</td>
                </tr>
                <tr class="border-t border-purple-800/30 bg-purple-900/10">
                  <td class="px-4 py-2 text-white">User Base</td>
                  <td class="px-4 py-2 text-white">2.5M</td>
                  <td class="px-4 py-2 text-green-400">15%</td>
                  <td class="px-4 py-2 text-gray-300">Analytics</td>
                </tr>
                <tr class="border-t border-purple-800/30">
                  <td class="px-4 py-2 text-white">ROI</td>
                  <td class="px-4 py-2 text-white">185%</td>
                  <td class="px-4 py-2 text-green-400">8%</td>
                  <td class="px-4 py-2 text-gray-300">Customer Data</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p>This example demonstrates how the RCT framework can be used to structure data collection tasks.</p>
        `
      },
      {
        id: "why-this-works",
        title: "Why the RCT Framework Works",
        content: `
          <h3>The Power of Structured Communication</h3>
          <p>The RCT framework is effective because it addresses the key elements needed for successful AI interaction:</p>
          
          <ul>
            <li><strong>Clear roles</strong>: Specific AI expertise assignment</li>
            <li><strong>Detailed context</strong>: Well-defined parameters</li>
            <li><strong>Structured output</strong>: Organized information delivery</li>
          </ul>
          
          <p>This structured approach helps employees maximize AI tool effectiveness across various work tasks by providing clear guidance to the AI system.</p>
        `
      }
    ]
  },
  {
    id: "ai-tools",
    title: "AI Tools in Remote Helpers: Overview",
    subtopics: [
      {
        id: "text-generation",
        title: "Text Generation & Analysis Tools",
        content: `
          <h3>Core Text Processing Tools</h3>
          <p>Remote Helpers utilize a range of powerful text-based AI tools:</p>
          
          <ul>
            <li><strong>Claude AI</strong>: Creates and analyzes documents, reports, and administrative content with high accuracy.</li>
            <li><strong>Perplexity AI</strong>: Delivers verified research results and fact-checking with cited sources.</li>
            <li><strong>Grok</strong>: Processes bulk text and learns from interactions to improve workflow efficiency.</li>
          </ul>
          
          <p>These tools form the foundation of text-based AI assistance for Remote Helpers.</p>
        `
      },
      {
        id: "content-creation",
        title: "Content Creation & Design Tools",
        content: `
          <h3>Creative AI Solutions</h3>
          <p>For content generation and creative tasks, Remote Helpers rely on:</p>
          
          <ul>
            <li><strong>ChatGPT</strong>: Creates content and assists with creative ideation.</li>
            <li><strong>Gemini</strong>: Handles both text and image tasks with Google's latest AI technology.</li>
          </ul>
          
          <p>These tools support the creation of engaging, professional content across various formats.</p>
        `
      },
      {
        id: "development-automation",
        title: "Development & Automation Tools",
        content: `
          <h3>Workflow Automation Solutions</h3>
          <p>To optimize processes and automate repetitive tasks:</p>
          
          <ul>
            <li><strong>Make.com</strong>: Automates workflows across platforms, reducing manual tasks.</li>
          </ul>
          
          <p>Automation tools significantly reduce time spent on repetitive tasks and help maintain consistency across processes.</p>
        `
      },
      {
        id: "key-applications",
        title: "Key Applications for AI Tools",
        content: `
          <h3>Practical Applications in Daily Work</h3>
          <p>AI tools are applied to a wide range of Remote Helper tasks:</p>
          
          <ul>
            <li><strong>Communication</strong>: Real-time transcription and automated summaries.</li>
            <li><strong>Task Management</strong>: AI-driven prioritization and deadline tracking.</li>
            <li><strong>Process Automation</strong>: Streamlined scheduling, data entry, and analysis.</li>
          </ul>
          
          <p>These applications enable Remote Helpers to deliver faster, more accurate results while reducing operational overhead and improving team efficiency.</p>
        `
      }
    ]
  },
  {
    id: "creating-project",
    title: "Creating an AI Project",
    subtopics: [
      {
        id: "core-components",
        title: "Core Components of AI Project Development",
        content: `
          <h3>Essential Elements for Success</h3>
          <p>Key phases of AI project development include:</p>
          
          <ul>
            <li><strong>Problem Formulation</strong>: Define business problem, set measurable KPIs, and align with stakeholders.</li>
            <li><strong>Tool Selection</strong>: Choose AI tools based on task requirements, data needs, and team expertise.</li>
            <li><strong>Workflow Development</strong>: Create project lifecycle plan, define roles, and establish feedback loops.</li>
            <li><strong>Testing & Optimization</strong>: Implement testing protocols and use feedback for improvements.</li>
          </ul>
          
          <p>A structured approach to these components ensures more successful AI project outcomes.</p>
        `
      },
      {
        id: "tool-selection",
        title: "Tool Selection for AI Projects",
        content: `
          <h3>Choosing the Right AI Tools</h3>
          <p>Essential AI tools for our work:</p>
          
          <ul>
            <li><strong>Claude AI</strong>: Document processing and analysis</li>
            <li><strong>Perplexity AI</strong>: Information search and verification</li>
            <li><strong>Grok</strong>: Workflow automation</li>
          </ul>
          
          <p>Selecting the appropriate tools is crucial for project success and depends on specific use cases and requirements.</p>
        `
      },
      {
        id: "workflow-development",
        title: "Workflow Development",
        content: `
          <h3>Creating Effective AI Workflows</h3>
          <p>Implementation structure:</p>
          
          <ol>
            <li><strong>Data Collection</strong>: Use Perplexity AI for research</li>
            <li><strong>Analysis</strong>: Apply Claude AI for processing</li>
            <li><strong>Content Generation</strong>: Create outputs with AI assistance</li>
            <li><strong>Iteration</strong>: Refine based on feedback</li>
          </ol>
          
          <p>A well-designed workflow ensures that each AI tool is used optimally within the project lifecycle.</p>
        `
      },
      {
        id: "testing-optimization",
        title: "Testing & Optimization",
        content: `
          <h3>Ensuring Quality and Performance</h3>
          <p>Key aspects of testing and optimization include:</p>
          
          <ul>
            <li><strong>Validation</strong>: Test functionality and performance</li>
            <li><strong>Monitoring</strong>: Track key metrics</li>
            <li><strong>Optimization</strong>: Improve processes</li>
            <li><strong>Feedback</strong>: Incorporate user input</li>
          </ul>
          
          <p>Continuous testing and optimization ensure that AI projects deliver maximum value and improve over time.</p>
        `
      },
      {
        id: "build-prototype",
        title: "Build a Working Prototype",
        content: `
          <h3>Example: Process Optimization Project</h3>
          
          <ol>
            <li><strong>Objective</strong>: Create an automated workflow</li>
            <li><strong>Tools</strong>:
              <ul>
                <li><strong>Claude AI</strong>: Document processing</li>
                <li><strong>Perplexity AI</strong>: Information verification</li>
              </ul>
            </li>
            <li><strong>Steps</strong>:
              <ul>
                <li>Define workflow requirements</li>
                <li>Implement AI tools</li>
                <li>Test and validate results</li>
              </ul>
            </li>
            <li><strong>Optimization</strong>:
              <ul>
                <li>Monitor performance metrics</li>
                <li>Gather user feedback</li>
              </ul>
            </li>
          </ol>
          
          <p>This structured approach ensures that prototypes deliver value and provide a foundation for further development.</p>
        `
      },
      {
        id: "tools-overview",
        title: "Comprehensive Tools Overview",
        content: `
          <h3>AI Tool Ecosystem</h3>
          
          <div class="overflow-x-auto my-4">
            <table class="min-w-full border border-purple-800/30">
              <thead class="bg-purple-900/20">
                <tr>
                  <th class="px-4 py-2 text-left text-purple-300">Tool</th>
                  <th class="px-4 py-2 text-left text-purple-300">Purpose</th>
                  <th class="px-4 py-2 text-left text-purple-300">Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t border-purple-800/30">
                  <td class="px-4 py-2 text-white"><strong>Claude AI</strong></td>
                  <td class="px-4 py-2 text-white">Text generation</td>
                  <td class="px-4 py-2 text-gray-300">Workflow automation</td>
                </tr>
                <tr class="border-t border-purple-800/30 bg-purple-900/10">
                  <td class="px-4 py-2 text-white"><strong>Perplexity</strong></td>
                  <td class="px-4 py-2 text-white">Research</td>
                  <td class="px-4 py-2 text-gray-300">Data verification</td>
                </tr>
                <tr class="border-t border-purple-800/30">
                  <td class="px-4 py-2 text-white"><strong>Grok</strong></td>
                  <td class="px-4 py-2 text-white">Text processing</td>
                  <td class="px-4 py-2 text-gray-300">Documentation</td>
                </tr>
                <tr class="border-t border-purple-800/30 bg-purple-900/10">
                  <td class="px-4 py-2 text-white"><strong>Notebook LM</strong></td>
                  <td class="px-4 py-2 text-white">Analysis</td>
                  <td class="px-4 py-2 text-gray-300">Data handling</td>
                </tr>
                <tr class="border-t border-purple-800/30">
                  <td class="px-4 py-2 text-white"><strong>Midjourney</strong></td>
                  <td class="px-4 py-2 text-white">Images</td>
                  <td class="px-4 py-2 text-gray-300">Visual content</td>
                </tr>
                <tr class="border-t border-purple-800/30 bg-purple-900/10">
                  <td class="px-4 py-2 text-white"><strong>ChatGPT</strong></td>
                  <td class="px-4 py-2 text-white">Content</td>
                  <td class="px-4 py-2 text-gray-300">Communications</td>
                </tr>
                <tr class="border-t border-purple-800/30">
                  <td class="px-4 py-2 text-white"><strong>Gemini</strong></td>
                  <td class="px-4 py-2 text-white">Multimedia</td>
                  <td class="px-4 py-2 text-gray-300">Complex projects</td>
                </tr>
                <tr class="border-t border-purple-800/30 bg-purple-900/10">
                  <td class="px-4 py-2 text-white"><strong>Cursor Pro</strong></td>
                  <td class="px-4 py-2 text-white">Coding</td>
                  <td class="px-4 py-2 text-gray-300">Development</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p>This comprehensive overview helps in selecting the right tools for specific project needs.</p>
        `
      },
      {
        id: "practical-tips",
        title: "Practical Tips for Implementation",
        content: `
          <h3>Best Practices for Success</h3>
          <p>Follow these practical tips for more effective AI project implementation:</p>
          
          <ul>
            <li><strong>Start Small</strong>: Begin with MVPs to validate concepts.</li>
            <li><strong>Collaborate</strong>: Maintain stakeholder engagement throughout the process.</li>
            <li><strong>Monitor</strong>: Track metrics and optimize performance continuously.</li>
          </ul>
          
          <p>These practices ensure efficient AI project development while maintaining quality and innovation.</p>
        `
      }
    ]
  },
  {
    id: "project-presentation",
    title: "Final AI Project Presentation Structure",
    subtopics: [
      {
        id: "problem-description",
        title: "Problem Description",
        content: `
          <h3>Defining the Challenge</h3>
          <p>Describe the specific workplace process or challenge your AI solution aims to improve. Focus on how AI tools can enhance productivity, automate routine tasks, or improve decision-making in your role.</p>
          
          <p>Include specific examples from your daily work that show the need for AI assistance, such as:</p>
          <ul>
            <li>Time-consuming manual processes</li>
            <li>Error-prone tasks</li>
            <li>Information bottlenecks</li>
            <li>Decision-making challenges</li>
          </ul>
          
          <p>A clear problem description establishes the foundation for your AI project.</p>
        `
      },
      {
        id: "tools-implementation",
        title: "AI Tools and Implementation",
        content: `
          <h3>Your AI Solution Approach</h3>
          <p>Detail your chosen AI tools and approach:</p>
          
          <ul>
            <li><strong>Selected AI tools</strong> (Claude AI, Perplexity AI, or Grok)
              <ul>
                <li>Specific use cases for each tool</li>
                <li>Integration into your workflow</li>
              </ul>
            </li>
            <li><strong>Key features utilized</strong></li>
            <li><strong>Implementation process and timeline</strong></li>
          </ul>
          
          <p>Describe how these tools work together to form a complete solution.</p>
        `
      },
      {
        id: "results-impact",
        title: "Results and Impact",
        content: `
          <h3>Measuring Success</h3>
          <p>Present your achievements with quantifiable metrics:</p>
          
          <ul>
            <li><strong>Time saved on tasks</strong>: Before/after comparisons</li>
            <li><strong>Quality improvements in output</strong>: Error reduction</li>
            <li><strong>Workflow efficiency gains</strong>: Process improvements</li>
            <li><strong>Team feedback and adoption</strong>: User satisfaction</li>
          </ul>
          
          <p>Use data visualizations where possible to clearly demonstrate the impact of your AI solution.</p>
        `
      },
      {
        id: "future-development",
        title: "Future Development Plans",
        content: `
          <h3>Next Steps for Your AI Project</h3>
          <p>Outline your vision for continued development:</p>
          
          <ul>
            <li><strong>Short-term</strong>: Expand use cases and team training</li>
            <li><strong>Mid-term</strong>: Integration with more work processes</li>
            <li><strong>Long-term</strong>: Department-wide AI adoption strategy</li>
          </ul>
          
          <p>A clear roadmap demonstrates forward thinking and ensures continued value from your AI implementation.</p>
        `
      },
      {
        id: "presentation-guidelines",
        title: "Presentation Guidelines",
        content: `
          <h3>Effective Presentation Strategies</h3>
          <p>Key elements to include in your presentation:</p>
          
          <ul>
            <li><strong>Show practical examples</strong> of AI tools in use</li>
            <li><strong>Demonstrate actual workflow improvements</strong> with before/after comparisons</li>
            <li><strong>Share lessons learned</strong> and best practices</li>
            <li><strong>Provide recommendations</strong> for others planning similar implementations</li>
          </ul>
          
          <p>Focus on clarity, impact, and actionable takeaways in your presentation to engage your audience effectively.</p>
        `
      }
    ]
  }
];

const Guide: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(courseSections[0]);
  const [activeSubtopic, setActiveSubtopic] = useState(courseSections[0].subtopics[0]);
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const totalTopics = courseSections.reduce((acc, section) => acc + section.subtopics.length, 0);

  useEffect(() => {
    const newProgress = (completedSections.length / totalTopics) * 100;
    setProgress(Math.round(newProgress));
  }, [completedSections, totalTopics]);

  const handleSectionChange = (sectionId: string) => {
    const section = courseSections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section);
    }
  };

  const handleSubtopicChange = (subtopicId: string) => {
    let foundSection = activeSection;
    let foundSubtopic = activeSection.subtopics.find(s => s.id === subtopicId);
    
    if (!foundSubtopic) {
      for (const section of courseSections) {
        const subtopic = section.subtopics.find(s => s.id === subtopicId);
        if (subtopic) {
          foundSection = section;
          foundSubtopic = subtopic;
          break;
        }
      }
    }
    
    if (foundSubtopic) {
      if (foundSection.id !== activeSection.id) {
        setActiveSection(foundSection);
      }
      setActiveSubtopic(foundSubtopic);
      
      if (!completedSections.includes(subtopicId)) {
        setCompletedSections([...completedSections, subtopicId]);
        setXp(xp + 5);
        toast({
          title: "XP Gained!",
          description: "Gained 5 XP for exploring a new topic!",
          variant: "default",
        });
      }

      setShowQuiz(false);
    }
  };

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    
    if (!completedQuizzes.includes(activeSubtopic.id)) {
      const quizXp = 15;
      setXp(prev => prev + quizXp);
      setCompletedQuizzes([...completedQuizzes, activeSubtopic.id]);
      
      toast({
        title: "Quiz Completed!",
        description: `You earned ${quizXp} XP for completing the quiz!`,
        variant: "default",
      });
    }
  };

  const handleStartQuiz = () => {
    const quiz = quizzes[activeSubtopic.id as keyof typeof quizzes];
    if (quiz) {
      setCurrentQuiz(quiz);
      setShowQuiz(true);
    } else {
      toast({
        title: "Quiz Not Available",
        description: "This topic doesn't have a quiz yet. Try another topic!",
        variant: "destructive",
      });
    }
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
                
                {quizzes[activeSubtopic.id as keyof typeof quizzes] && (
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
