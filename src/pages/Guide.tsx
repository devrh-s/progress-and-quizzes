
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
          <p>In this section, we'll explore how to apply AI tools in real-world scenarios. Unlike theoretical knowledge, practical skills focus on implementation and results.</p>
          
          <h4>Key Concepts</h4>
          <ul>
            <li>Distinguishing between AI capabilities and limitations</li>
            <li>Developing effective prompting techniques</li>
            <li>Creating workflows that incorporate AI assistance</li>
            <li>Evaluating and improving AI outputs</li>
          </ul>
          
          <p>Throughout this course, you'll learn not just what AI can do, but how to direct it effectively to achieve your specific goals, whether for research, content creation, data analysis, or problem-solving.</p>
        `
      },
      {
        id: "proactive-implementation",
        title: "Proactive Implementation Strategies",
        content: `
          <h3>Taking the Initiative with AI Tools</h3>
          <p>Proactive implementation means anticipating how AI can be integrated into your workflow before problems arise. This forward-thinking approach maximizes efficiency and results.</p>
          
          <h4>Implementation Framework</h4>
          <ol>
            <li><strong>Identify opportunities</strong>: Analyze your current workflow for repetitive or time-consuming tasks</li>
            <li><strong>Select appropriate tools</strong>: Match AI capabilities to specific needs</li>
            <li><strong>Develop prompting strategies</strong>: Create templates for common requests</li>
            <li><strong>Evaluate results</strong>: Continuously assess output quality and refine approaches</li>
            <li><strong>Scale successful implementations</strong>: Expand proven techniques to new areas</li>
          </ol>
          
          <p>By adopting a proactive mindset, you'll transform from a casual AI user to someone who strategically leverages these tools for maximum impact.</p>
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
          <p>The Role-Context-Task (RCT) Framework provides a structured approach to crafting effective AI prompts. By clearly defining these three elements, you can dramatically improve the quality and relevance of AI responses.</p>
          
          <h4>The Three Components</h4>
          <ul>
            <li><strong>Role</strong>: The expertise or perspective you want the AI to adopt</li>
            <li><strong>Context</strong>: Background information and constraints relevant to the task</li>
            <li><strong>Task</strong>: The specific action or output you want from the AI</li>
          </ul>
          
          <p>This framework transforms vague requests into focused instructions that leverage the AI's capabilities effectively.</p>
        `
      },
      {
        id: "role-definition",
        title: "Defining Effective Roles",
        content: `
          <h3>The Power of Role Assignment</h3>
          <p>The role element in the RCT Framework defines the perspective, expertise, or character the AI should adopt when responding. Effective role assignment can dramatically improve results.</p>
          
          <h4>Guidelines for Role Selection</h4>
          <ul>
            <li>Choose roles with well-defined knowledge domains</li>
            <li>Be specific about expertise level (e.g., "expert," "professor," "researcher")</li>
            <li>Consider multiple roles for complex tasks (e.g., "Act as both a critic and advocate")</li>
            <li>Align roles with your intended audience</li>
          </ul>
          
          <p>Examples of effective roles include "experienced data scientist," "UX researcher with 10 years of experience," or "expert in Renaissance art history." The more clearly defined the role, the more tailored the response will be.</p>
        `
      },
      {
        id: "context-setting",
        title: "Setting Clear Context",
        content: `
          <h3>The Importance of Context</h3>
          <p>Context provides the AI with necessary background information, constraints, and parameters. Well-defined context eliminates ambiguity and helps the AI generate more relevant responses.</p>
          
          <h4>Elements of Effective Context</h4>
          <ul>
            <li>Background information relevant to the task</li>
            <li>Scope and limitations (what should be included or excluded)</li>
            <li>Target audience and their level of expertise</li>
            <li>Format requirements or preferences</li>
            <li>Relevant examples or references</li>
          </ul>
          
          <p>Context setting might include statements like "This is for an undergraduate audience with basic knowledge of economics" or "The response should follow APA citation format and include only peer-reviewed sources from the last 5 years."</p>
        `
      },
      {
        id: "task-formulation",
        title: "Formulating Clear Tasks",
        content: `
          <h3>Crafting Actionable Tasks</h3>
          <p>The task component specifies exactly what you want the AI to do. Clear task formulation eliminates guesswork and ensures you receive the type of output you need.</p>
          
          <h4>Characteristics of Well-Defined Tasks</h4>
          <ul>
            <li>Uses specific action verbs (analyze, compare, summarize, evaluate)</li>
            <li>Indicates the desired output format (list, essay, table, code)</li>
            <li>Specifies length or comprehensiveness</li>
            <li>Includes evaluation criteria when relevant</li>
          </ul>
          
          <p>Examples of clear tasks include "Create a 500-word summary highlighting the three main arguments," "Develop a step-by-step troubleshooting guide with code examples," or "Compare these two research methodologies using a table with at least 5 criteria."</p>
        `
      }
    ]
  },
  {
    id: "ai-tools",
    title: "AI Tools in Remote Helpers: Overview",
    subtopics: [
      {
        id: "ai-tools-landscape",
        title: "The AI Tools Landscape",
        content: `
          <h3>Navigating the AI Ecosystem</h3>
          <p>The landscape of AI tools is vast and rapidly evolving. Understanding the different categories and capabilities helps you select the right tool for each task.</p>
          
          <h4>Major Categories of AI Tools</h4>
          <ul>
            <li><strong>Language Models</strong>: GPT-4, Claude, LLaMA, PaLM</li>
            <li><strong>Image Generation</strong>: DALL-E, Stable Diffusion, Midjourney</li>
            <li><strong>Audio/Voice Tools</strong>: Whisper, ElevenLabs, Murf</li>
            <li><strong>Code Assistants</strong>: GitHub Copilot, CodeWhisperer</li>
            <li><strong>Specialized Research Tools</strong>: Elicit, Consensus, Scholarcy</li>
          </ul>
          
          <p>Each category offers distinct capabilities and limitations. The most effective researchers understand how to combine multiple tools into integrated workflows.</p>
        `
      },
      {
        id: "selecting-right-tool",
        title: "Selecting the Right Tool for the Job",
        content: `
          <h3>Matching Tools to Tasks</h3>
          <p>Choosing the appropriate AI tool for a specific task is critical for efficiency and quality. This decision depends on understanding both your requirements and each tool's strengths.</p>
          
          <h4>Selection Criteria</h4>
          <ul>
            <li><strong>Task complexity</strong>: More complex tasks may require more advanced models</li>
            <li><strong>Domain specificity</strong>: Some tools are optimized for particular fields</li>
            <li><strong>Output format needs</strong>: Consider whether you need text, code, images, or data</li>
            <li><strong>Integration requirements</strong>: How the tool needs to fit into your workflow</li>
            <li><strong>Speed vs. quality tradeoffs</strong>: Balance processing time with output quality</li>
          </ul>
          
          <p>For example, while GPT-4 excels at general knowledge tasks, specialized tools like Elicit may perform better for academic research, and domain-specific models might be optimal for technical fields.</p>
        `
      },
      {
        id: "effectiveness-evaluation",
        title: "Evaluating Tool Effectiveness",
        content: `
          <h3>Measuring AI Tool Impact</h3>
          <p>Systematically evaluating AI tool effectiveness helps you optimize your toolset and improve your results over time.</p>
          
          <h4>Evaluation Framework</h4>
          <ol>
            <li><strong>Define success metrics</strong>: Time saved, quality improvements, error reduction</li>
            <li><strong>Benchmark against alternatives</strong>: Compare with manual methods or other AI tools</li>
            <li><strong>Collect quantitative data</strong>: Track completion times, revision rates, accuracy</li>
            <li><strong>Gather qualitative feedback</strong>: User satisfaction, perceived usefulness</li>
            <li><strong>Assess ROI</strong>: Balance benefits against costs (financial, time, complexity)</li>
          </ol>
          
          <p>Regular evaluation helps you build an optimized AI toolkit that evolves with your needs and with the rapidly changing technology landscape.</p>
        `
      }
    ]
  },
  {
    id: "creating-project",
    title: "Creating an AI Project",
    subtopics: [
      {
        id: "project-planning",
        title: "Planning Your AI Project",
        content: `
          <h3>Structured Approach to AI Projects</h3>
          <p>Successful AI projects begin with thorough planning that considers goals, resources, and potential challenges.</p>
          
          <h4>Project Planning Framework</h4>
          <ol>
            <li><strong>Define clear objectives</strong>: What specific problem are you solving?</li>
            <li><strong>Identify success criteria</strong>: How will you measure results?</li>
            <li><strong>Select appropriate tools</strong>: Which AI capabilities match your needs?</li>
            <li><strong>Outline workflow integration</strong>: How will AI fit into existing processes?</li>
            <li><strong>Anticipate limitations</strong>: What are potential bottlenecks or challenges?</li>
            <li><strong>Create evaluation protocol</strong>: How will you assess and refine results?</li>
          </ol>
          
          <p>A well-planned AI project has clearly defined phases, from initial exploration to full implementation, with feedback loops for continuous improvement.</p>
        `
      },
      {
        id: "data-preparation",
        title: "Data Preparation and Management",
        content: `
          <h3>The Foundation of AI Success</h3>
          <p>High-quality data preparation is crucial for effective AI project outcomes. This process ensures the AI has the information it needs in the optimal format.</p>
          
          <h4>Data Preparation Best Practices</h4>
          <ul>
            <li><strong>Data cleaning</strong>: Remove irrelevant information and standardize formats</li>
            <li><strong>Structuring information</strong>: Organize data in logical hierarchies</li>
            <li><strong>Chunking content</strong>: Break large datasets into manageable pieces</li>
            <li><strong>Context preservation</strong>: Maintain relationships between data elements</li>
            <li><strong>Metadata creation</strong>: Add descriptive tags for improved retrieval</li>
          </ul>
          
          <p>Effective data management creates a foundation for AI to generate more accurate, relevant outputs while reducing the need for extensive prompt engineering.</p>
        `
      },
      {
        id: "implementation-strategies",
        title: "Implementation Strategies",
        content: `
          <h3>From Concept to Application</h3>
          <p>Implementing AI projects requires a strategic approach that balances ambition with practicality. Successful implementation often follows an iterative path.</p>
          
          <h4>Implementation Models</h4>
          <ol>
            <li><strong>Pilot-first approach</strong>: Test concepts with limited scope before scaling</li>
            <li><strong>Modular implementation</strong>: Build and perfect individual components sequentially</li>
            <li><strong>Parallel development</strong>: Work on multiple aspects simultaneously with coordination</li>
            <li><strong>Agile adaptation</strong>: Continuously refine based on feedback and results</li>
          </ol>
          
          <h4>Common Implementation Challenges</h4>
          <ul>
            <li>Integration with existing workflows and systems</li>
            <li>User adoption and training</li>
            <li>Managing expectations around capabilities</li>
            <li>Handling edge cases and exceptions</li>
            <li>Scaling from prototype to production</li>
          </ul>
          
          <p>Successful implementation requires both technical excellence and change management skills to ensure the AI solution delivers its promised value.</p>
        `
      }
    ]
  },
  {
    id: "project-presentation",
    title: "Final AI Project Presentation Structure",
    subtopics: [
      {
        id: "presentation-framework",
        title: "Creating an Effective Presentation Framework",
        content: `
          <h3>Structuring Your AI Project Presentation</h3>
          <p>A well-structured presentation communicates your AI project's value clearly and convincingly to stakeholders.</p>
          
          <h4>Essential Components</h4>
          <ol>
            <li><strong>Executive Summary</strong>: Core problem, solution, and key results</li>
            <li><strong>Problem Statement</strong>: Clear articulation of the challenge addressed</li>
            <li><strong>Methodology</strong>: AI tools selected and implementation approach</li>
            <li><strong>Results and Analysis</strong>: Quantitative and qualitative outcomes</li>
            <li><strong>Challenges and Solutions</strong>: Obstacles encountered and how they were overcome</li>
            <li><strong>Lessons Learned</strong>: Insights gained through the process</li>
            <li><strong>Future Directions</strong>: Potential expansions or refinements</li>
          </ol>
          
          <p>Tailoring this framework to your audience's technical knowledge and interests ensures your presentation resonates effectively.</p>
        `
      },
      {
        id: "results-visualization",
        title: "Visualizing Results and Impact",
        content: `
          <h3>Making Data Compelling</h3>
          <p>Effective visualization transforms raw results into compelling evidence of your AI project's value.</p>
          
          <h4>Visualization Best Practices</h4>
          <ul>
            <li><strong>Select appropriate chart types</strong> for different data relationships</li>
            <li><strong>Create before/after comparisons</strong> to highlight improvements</li>
            <li><strong>Use consistent visual language</strong> throughout presentations</li>
            <li><strong>Incorporate progressive disclosure</strong> from summary to detail</li>
            <li><strong>Balance quantitative metrics with qualitative examples</strong></li>
          </ul>
          
          <h4>Recommended Visualization Types</h4>
          <ul>
            <li><strong>Time series</strong>: For showing improvement over time</li>
            <li><strong>Comparison charts</strong>: For benchmarking against baselines</li>
            <li><strong>Process flows</strong>: For illustrating system integration</li>
            <li><strong>Heat maps</strong>: For highlighting patterns in complex data</li>
            <li><strong>Interactive demos</strong>: For bringing capabilities to life</li>
          </ul>
          
          <p>Effective visualization not only communicates results but builds confidence in your AI implementation.</p>
        `
      },
      {
        id: "future-recommendations",
        title: "Developing Future Recommendations",
        content: `
          <h3>Looking Beyond the Current Implementation</h3>
          <p>Strong AI project presentations conclude with thoughtful recommendations that demonstrate vision and sustainability.</p>
          
          <h4>Types of Recommendations</h4>
          <ul>
            <li><strong>Scalability opportunities</strong>: How to expand successful elements</li>
            <li><strong>Enhancement possibilities</strong>: Next-generation features or capabilities</li>
            <li><strong>Integration pathways</strong>: Connections with other systems or processes</li>
            <li><strong>Potential new applications</strong>: Adjacent problems the approach could solve</li>
            <li><strong>Technology evolution planning</strong>: Adapting to emerging AI capabilities</li>
          </ul>
          
          <h4>Structuring Recommendations</h4>
          <ol>
            <li><strong>Short-term wins</strong>: Immediate next steps with high ROI</li>
            <li><strong>Medium-term developments</strong>: 3-6 month horizon initiatives</li>
            <li><strong>Long-term vision</strong>: Strategic direction for continued evolution</li>
          </ol>
          
          <p>Well-crafted recommendations position your project not as a one-time effort but as the beginning of an ongoing transformation journey.</p>
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
        setXp(xp + 10);
        toast({
          title: "XP Gained!",
          description: "Gained 10 XP for exploring a new topic!",
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
          setXp(xp + 10);
          toast({
            title: "XP Gained!",
            description: "Gained 10 XP for moving to a new section!",
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
