import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CourseContent } from '@/components/CourseContent';
import { TableOfContents } from '@/components/TableOfContents';
import { toast } from '@/components/ui/use-toast';
import { Home } from 'lucide-react';

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

  useEffect(() => {
    const totalSubtopics = courseSections.reduce((acc, section) => acc + section.subtopics.length, 0);
    const newProgress = (completedSections.length / totalSubtopics) * 100;
    setProgress(Math.round(newProgress));
  }, [completedSections]);

  const handleSectionChange = (sectionId: string) => {
    const section = courseSections.find(s => s.id === sectionId);
    if (section) {
      setActiveSection(section);
      setActiveSubtopic(section.subtopics[0]);
    }
  };

  const handleSubtopicChange = (subtopicId: string) => {
    const subtopic = activeSection.subtopics.find(s => s.id === subtopicId);
    if (subtopic) {
      setActiveSubtopic(subtopic);
      if (!completedSections.includes(subtopicId)) {
        setCompletedSections([...completedSections, subtopicId]);
        setXp(xp + 5);
        toast({
          title: "XP Gained!",
          description: "Gained 5 XP for exploring a new topic!",
          variant: "default",
        });
      }
    }
  };

  const handleNextSubtopic = () => {
    const currentIndex = activeSection.subtopics.findIndex(s => s.id === activeSubtopic.id);
    if (currentIndex < activeSection.subtopics.length - 1) {
      handleSubtopicChange(activeSection.subtopics[currentIndex + 1].id);
    } else {
      const currentSectionIndex = courseSections.findIndex(s => s.id === activeSection.id);
      if (currentSectionIndex < courseSections.length - 1) {
        const nextSection = courseSections[currentSectionIndex + 1];
        setActiveSection(nextSection);
        setActiveSubtopic(nextSection.subtopics[0]);
        if (!completedSections.includes(nextSection.subtopics[0].id)) {
          setCompletedSections([...completedSections, nextSection.subtopics[0].id]);
          setXp(xp + 5);
          toast({
            title: "XP Gained!",
            description: "Gained 5 XP for moving to a new section!",
            variant: "default",
          });
        }
      }
    }
  };

  const handlePreviousSubtopic = () => {
    const currentIndex = activeSection.subtopics.findIndex(s => s.id === activeSubtopic.id);
    if (currentIndex > 0) {
      handleSubtopicChange(activeSection.subtopics[currentIndex - 1].id);
    } else {
      const currentSectionIndex = courseSections.findIndex(s => s.id === activeSection.id);
      if (currentSectionIndex > 0) {
        const prevSection = courseSections[currentSectionIndex - 1];
        setActiveSection(prevSection);
        setActiveSubtopic(prevSection.subtopics[prevSection.subtopics.length - 1]);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/4 bg-gray-900 p-4 md:p-6 space-y-6 border-r border-purple-900">
        <div className="fantasy-card p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Course Progress</h3>
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-purple-300 text-sm">
            <span>{progress}% complete</span>
            <span>{completedSections.length} topics</span>
          </div>
          <div className="mt-2 text-yellow-300 font-semibold">
            {xp} XP ✨
          </div>
          <div className="mt-3 space-y-1 text-sm text-purple-200">
            <div>Languages: English</div>
            <div>Estimated Effort: Intermediate</div>
            <div>Location: Global</div>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full border-purple-500 text-purple-300 hover:text-white hover:bg-purple-700 flex items-center justify-center gap-2"
          onClick={() => navigate('/')}
        >
          <Home size={16} />
          Return to Home
        </Button>
        
        <TableOfContents 
          sections={courseSections}
          activeSection={activeSection.id}
          activeSubtopic={activeSubtopic.id}
          completedSections={completedSections}
          onSectionChange={handleSectionChange}
          onSubtopicChange={handleSubtopicChange}
        />
      </div>
      
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <CourseContent
          section={activeSection}
          subtopic={activeSubtopic}
        />
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePreviousSubtopic}
            className="border-purple-500 text-purple-300 hover:text-white hover:bg-purple-700"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNextSubtopic}
            className="border-purple-500 text-purple-300 hover:text-white hover:bg-purple-700"
          >
            Next
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/quizzes">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              Take Knowledge Tests
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guide;
