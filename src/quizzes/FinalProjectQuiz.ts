
export const finalProjectQuiz = {
  id: "final-project-quiz",
  title: "Final Project Quiz",
  difficulty: "Intermediate",
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
};
