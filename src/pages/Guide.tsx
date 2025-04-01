
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CourseContent } from '@/components/CourseContent';
import { TableOfContents } from '@/components/TableOfContents';
import { toast } from '@/hooks/use-toast';
import { Home, Clock, Users, BookOpen, GraduationCap, Star } from 'lucide-react';
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
    questions: [
      {
        question: "Identify the component that emphasizes mastering AI tools for real business problems.",
        options: ["AI Fluency", "Critical Analysis", "Role-Context-Query Method", "Workflow Planning"],
        correctAnswer: 0
      },
      {
        question: "Sort the following activities into two groups: Practical (Hands-On Experience) and Theoretical.",
        options: [
          "Experimenting with AI tools in projects and participating in AI workshops are practical, while reading academic papers and attending lectures are theoretical.",
          "Reading academic papers and participating in workshops are practical, while experimenting with tools and attending lectures are theoretical.",
          "All four activities are primarily theoretical in nature.",
          "All four activities are primarily practical in nature."
        ],
        correctAnswer: 0
      },
      {
        question: "Arrange the steps for developing AI competencies in the correct order.",
        options: [
          "Understanding basic concepts → Applying AI tools in real projects → Evaluating outcomes → Refining strategies",
          "Applying AI tools → Understanding concepts → Refining strategies → Evaluating outcomes",
          "Evaluating outcomes → Understanding concepts → Applying AI tools → Refining strategies",
          "Refining strategies → Applying AI tools → Understanding concepts → Evaluating outcomes"
        ],
        correctAnswer: 0
      }
    ]
  },
  "proactive-implementation": {
    id: "proactive-implementation-quiz",
    title: "Proactive Implementation Quiz",
    difficulty: "Mixed",
    questions: [
      {
        question: "Identify the element that supports quickly testing AI hypotheses.",
        options: ["Rapid Testing", "Change Management", "Tool Selection", "Strategic Analysis"],
        correctAnswer: 0
      },
      {
        question: "Match each element with its primary function correctly.",
        options: [
          "Rapid Testing → Quick pilot launches, Change Management → Facilitating adoption, Tool Selection → Choosing suitable AI tools",
          "Rapid Testing → Strategic planning, Change Management → Tool integration, Tool Selection → User feedback",
          "Rapid Testing → Continuous refinement, Change Management → Documentation, Tool Selection → Implementation",
          "Rapid Testing → Testing procedures, Change Management → Technical deployment, Tool Selection → Team assignment"
        ],
        correctAnswer: 0
      },
      {
        question: "Arrange the strategic steps for successful AI adoption in order.",
        options: [
          "Analyze business needs → Launch pilot projects → Collect and analyze feedback → Scale successful solutions",
          "Launch pilot projects → Analyze business needs → Scale successful solutions → Collect feedback",
          "Collect feedback → Analyze business needs → Launch pilot projects → Scale successful solutions",
          "Scale successful solutions → Launch pilot projects → Analyze business needs → Collect feedback"
        ],
        correctAnswer: 0
      }
    ]
  },
  "personal-ai-development": {
    id: "personal-ai-quiz",
    title: "Personal AI Development Quiz",
    difficulty: "Mixed",
    questions: [
      {
        question: "Identify the three core components of structured AI learning mentioned in the content.",
        options: [
          "Skills Assessment, Project Focus, Continuous Learning",
          "Skills Assessment, Theoretical Study, Random Practice",
          "Project Focus, Research, Documentation",
          "Continuous Learning, Self-Critique, Evaluation"
        ],
        correctAnswer: 0
      },
      {
        question: "Match each component with its description correctly.",
        options: [
          "Skills Assessment → Identifying areas for improvement, Project Focus → Applying learning to real projects, Continuous Learning → Regular practice through hands-on exercises",
          "Skills Assessment → Creating theoretical plans, Project Focus → Documentation, Continuous Learning → Academic research",
          "Skills Assessment → Team collaboration, Project Focus → Market research, Continuous Learning → Technical documentation",
          "Skills Assessment → Academic study, Project Focus → Tool selection, Continuous Learning → Strategic planning"
        ],
        correctAnswer: 0
      },
      {
        question: "Arrange the steps for personal AI development in a logical order.",
        options: [
          "Conduct a skills assessment → Apply knowledge through projects → Engage in continuous learning",
          "Engage in continuous learning → Conduct a skills assessment → Apply knowledge through projects",
          "Apply knowledge through projects → Engage in continuous learning → Conduct a skills assessment",
          "All steps should happen simultaneously"
        ],
        correctAnswer: 0
      }
    ]
  },
  "final-project": {
    id: "final-project-quiz",
    title: "Final Project Quiz",
    difficulty: "Mixed",
    questions: [
      {
        question: "Identify the main task of the final project.",
        options: [
          "Develop and present an AI-driven solution for a specific business challenge",
          "Write a theoretical paper on AI trends",
          "Create a simple AI chatbot",
          "Design a marketing strategy using AI"
        ],
        correctAnswer: 0
      },
      {
        question: "Match each step of the project with its description correctly.",
        options: [
          "Analysis → Identify opportunities for AI implementation, Tools → Select and implement appropriate AI solutions, Execute → Build and test with stakeholder feedback, Present → Demonstrate results and outline future plans",
          "Analysis → Documentation, Tools → Implementation, Execute → Research, Present → Publication",
          "Analysis → Market research, Tools → Technical documentation, Execute → Developing theories, Present → Statistical review",
          "Analysis → Team formation, Tools → Resource allocation, Execute → Timeline planning, Present → Budget review"
        ],
        correctAnswer: 0
      },
      {
        question: "Arrange the following steps to implement the AI solution for business process improvement.",
        options: [
          "Analyze business needs → Select appropriate AI tools → Build and test the solution → Present the outcomes and future plans",
          "Select appropriate AI tools → Analyze business needs → Present the outcomes → Build and test the solution",
          "Build and test the solution → Analyze business needs → Select appropriate AI tools → Present the outcomes",
          "Present the outcomes → Build and test the solution → Select appropriate AI tools → Analyze business needs"
        ],
        correctAnswer: 0
      }
    ]
  },
  "key-focus-areas": {
    id: "key-focus-areas-quiz",
    title: "Key Focus Areas Quiz",
    difficulty: "Mixed",
    questions: [
      {
        question: "Identify one of the key focus areas mentioned in the content.",
        options: ["Practical Skills", "Market Research", "Theoretical Analysis", "Customer Engagement"],
        correctAnswer: 0
      },
      {
        question: "Sort the focus areas in the order they appear in the text.",
        options: [
          "Practical Skills → Implementation → Results",
          "Results → Implementation → Practical Skills",
          "Implementation → Practical Skills → Results",
          "Practical Skills → Results → Implementation"
        ],
        correctAnswer: 0
      },
      {
        question: "Match each key focus area with its corresponding description.",
        options: [
          "Practical Skills → Hands-on experience with AI tools, Implementation → Strategic deployment of AI solutions, Results → Measurable improvements in workflow efficiency",
          "Practical Skills → Theoretical knowledge, Implementation → Research methods, Results → Documentation standards",
          "Practical Skills → Team management, Implementation → Budget allocation, Results → Project timeline",
          "Practical Skills → Academic research, Implementation → Publication, Results → Peer review"
        ],
        correctAnswer: 0
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
            <li><strong>Tools</strong>: Select and implement appropriate AI solutions.</li>
            <li><strong>Execute</strong>: Build and test solutions with stakeholder feedback.</li>
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
  const totalSections = courseSections.length;
  const completedSectionsCount = [...new Set(completedSections.map(id => {
    const sectionId = courseSections.find(section => 
      section.subtopics.some(subtopic => subtopic.id === id)
    )?.id;
    return sectionId;
  }))].filter(Boolean).length;

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
        setXp(xp + 5); // +5 XP for reading a new topic
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
      const quizXp = 15; // +15 XP for completing a quiz
      setXp(prev => prev + quizXp);
      setCompletedQuizzes([...completedQuizzes, activeSubtopic.id]);
      
      toast({
        title: "Quiz Completed!",
        description: `You earned ${quizXp} XP for completing the quiz!`,
        variant: "default",
      });
    }
  };

  const handleTakeQuiz = () => {
    const quiz = quizzes[activeSubtopic.id as keyof typeof quizzes];
    if (quiz) {
      setCurrentQuiz(quiz);
      setShowQuiz(true);
    } else {
      toast({
        title: "No Quiz Available",
        description: "There is no quiz available for this topic yet.",
        variant: "default",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <h1 className="text-3xl font-bold text-white">AI Course Guide</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-purple-900/30 px-3 py-1 rounded-full flex items-center">
            <GraduationCap className="mr-2 h-4 w-4 text-purple-400" />
            <span className="text-purple-200 font-medium">{xp} XP</span>
          </div>
          <div className="bg-purple-900/30 px-3 py-1 rounded-full flex items-center">
            <Users className="mr-2 h-4 w-4 text-purple-400" />
            <span className="text-purple-200 font-medium">Level {Math.floor(xp / 50) + 1}</span>
          </div>
        </div>
      </div>

      <div className="fantasy-card p-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-3">Course Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <div className="bg-purple-900/30 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Overall Progress</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="bg-purple-900/30 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Sections Completed</span>
              <span className="text-white font-medium">{completedSectionsCount}/{totalSections}</span>
            </div>
            <Progress value={(completedSectionsCount / totalSections) * 100} className="h-2" />
          </div>
          
          <div className="bg-purple-900/30 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200">Topics Explored</span>
              <span className="text-white font-medium">{completedSections.length}/{totalTopics}</span>
            </div>
            <Progress value={(completedSections.length / totalTopics) * 100} className="h-2" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="bg-purple-900/20 px-3 py-1 rounded-full flex items-center">
            <BookOpen className="mr-2 h-4 w-4 text-purple-400" />
            <span className="text-purple-200">Reading a topic: <span className="text-yellow-300 font-medium">+5 <Star className="inline h-3 w-3" /></span></span>
          </div>
          <div className="bg-purple-900/20 px-3 py-1 rounded-full flex items-center">
            <GraduationCap className="mr-2 h-4 w-4 text-purple-400" />
            <span className="text-purple-200">Completing a quiz: <span className="text-yellow-300 font-medium">+15 <Star className="inline h-3 w-3" /></span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 fantasy-card p-4">
          <TableOfContents 
            sections={courseSections}
            activeSection={activeSection.id}
            activeSubtopic={activeSubtopic.id}
            completedSections={completedSections}
            onSectionChange={handleSectionChange}
            onSubtopicChange={handleSubtopicChange}
          />
        </div>

        <div className="md:col-span-3">
          <div className="fantasy-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white glow-text">{activeSubtopic.title}</h2>
              {quizzes[activeSubtopic.id as keyof typeof quizzes] && (
                <Button 
                  onClick={handleTakeQuiz} 
                  className="bg-purple-800 hover:bg-purple-700" 
                  size="sm"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Take Quiz
                </Button>
              )}
            </div>
            
            {showQuiz && currentQuiz ? (
              <QuizComponent 
                quiz={currentQuiz}
                onComplete={handleQuizComplete}
              />
            ) : (
              <CourseContent content={activeSubtopic.content} />
            )}
          </div>

          <div className="flex justify-between">
            {activeSection.subtopics.findIndex(s => s.id === activeSubtopic.id) > 0 && (
              <Button 
                onClick={() => {
                  const currentIndex = activeSection.subtopics.findIndex(s => s.id === activeSubtopic.id);
                  if (currentIndex > 0) {
                    handleSubtopicChange(activeSection.subtopics[currentIndex - 1].id);
                  }
                }}
                variant="outline"
                className="border-purple-500/50 text-purple-300"
              >
                ← Previous Topic
              </Button>
            )}
            
            {activeSection.subtopics.findIndex(s => s.id === activeSubtopic.id) < activeSection.subtopics.length - 1 && (
              <Button 
                onClick={() => {
                  const currentIndex = activeSection.subtopics.findIndex(s => s.id === activeSubtopic.id);
                  if (currentIndex < activeSection.subtopics.length - 1) {
                    handleSubtopicChange(activeSection.subtopics[currentIndex + 1].id);
                  }
                }}
                className="ml-auto bg-purple-800 hover:bg-purple-700"
              >
                Next Topic →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
