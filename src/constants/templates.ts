export const templates = [
	{
		id: "blank",
		label: "Blank Document",
		imageUrl: "/blank-document.svg",
		initialContent: "",
	},
	{
		id: "cover-letter",
		label: "Cover Letter",
		imageUrl: "/cover-letter.svg",
		initialContent: `
        <h3>Dear [Hiring Manager's Name],</h3>
        <p>
          I am writing to express my interest in the <strong>[Job Title]</strong> position at <strong>[Company Name]</strong>.
          With my background in [Your Field], I am confident I can contribute meaningfully to your team.
        </p>
        <p>
          My experience at [Previous Company] has prepared me well for this role, particularly my work in [describe key achievement].
          I am excited about the opportunity to bring my skills to <strong>[Company Name]</strong>.
        </p>
        <p>
          Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.
        </p>
        <p>Sincerely,<br/>[Your Name]</p>
      `,
	},
	{
		id: "letter",
		label: "Letter",
		imageUrl: "/letter.svg",
		initialContent: `
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP Code]</p>
        <p>[Date]</p>
        <br/>
        <p>Dear [Recipient’s Name],</p>
        <p>
          I hope this letter finds you well. I am writing to [reason for writing the letter].
          Please let me know if you have any questions or need further information.
        </p>
        <p>
          Looking forward to your response.
        </p>
        <p>Sincerely,<br/>[Your Name]</p>
      `,
	},
	{
		id: "business-letter",
		label: "Business Letter",
		imageUrl: "/business-letter.svg",
		initialContent: `
        <p>[Your Company Name]</p>
        <p>[Company Address]</p>
        <p>[City, State ZIP Code]</p>
        <p>[Phone Number] • [Email Address]</p>
        <p>[Date]</p>
        <br/>
        <p>[Recipient's Name]</p>
        <p>[Their Position, Company]</p>
        <p>[Their Address]</p>
        <br/>
        <p>Subject: [Letter Subject]</p>
        <p>
          Dear [Recipient's Name],
        </p>
        <p>
          I am writing to formally [state purpose of letter: propose, request, notify, etc.].
          Please review the attached information and feel free to reach out if you have any questions.
        </p>
        <p>
          Best regards,<br/>[Your Name]<br/>[Your Position]
        </p>
      `,
	},
	{
		id: "project-proposal",
		label: "Project Proposal",
		imageUrl: "/project-proposal.svg",
		initialContent: `
        <h1>Project Proposal</h1>
        <h2>Project Title</h2>
        <p>[Enter the project title here]</p>
  
        <h2>Prepared By</h2>
        <p>[Your Name / Team Name]</p>
  
        <h2>Objective</h2>
        <p>[State the objective and goals of the project]</p>
  
        <h2>Scope</h2>
        <p>[Define the scope and boundaries of the project]</p>
  
        <h2>Timeline</h2>
        <ul>
          <li>Phase 1 – Research & Planning</li>
          <li>Phase 2 – Design & Development</li>
          <li>Phase 3 – Testing & Deployment</li>
        </ul>
  
        <h2>Budget</h2>
        <p>[Estimated cost breakdown and justification]</p>
  
        <h2>Conclusion</h2>
        <p>[Final thoughts or call to action]</p>
      `,
	},
	{
		id: "resume",
		label: "Resume",
		imageUrl: "/resume.svg",
		initialContent: `
        <h1>[Your Full Name]</h1>
        <p>
          <strong>Email:</strong> [you@example.com] |
          <strong>Phone:</strong> [Your Number] |
          <strong>LinkedIn:</strong> [linkedin.com/in/yourname]
        </p>
  
        <h2>Professional Summary</h2>
        <p>
          [1–2 sentence summary of your experience, skills, and career goal]
        </p>
  
        <h2>Experience</h2>
        <p><strong>[Job Title]</strong> – [Company Name], [Location]</p>
        <p><em>[Start Date] – [End Date]</em></p>
        <ul>
          <li>[Responsibility or achievement]</li>
          <li>[Responsibility or achievement]</li>
        </ul>
  
        <h2>Education</h2>
        <p><strong>[Degree Name]</strong> – [University Name], [Graduation Year]</p>
  
        <h2>Skills</h2>
        <ul>
          <li>[Skill 1]</li>
          <li>[Skill 2]</li>
          <li>[Skill 3]</li>
        </ul>
      `,
	},
	{
		id: "software-proposal",
		label: "Software Proposal",
		imageUrl: "/software-proposal.svg",
		initialContent: `
        <h1>Software Proposal</h1>
        <h2>Project Overview</h2>
        <p>[Brief description of the software project]</p>
  
        <h2>Problem Statement</h2>
        <p>[What problem does this software aim to solve?]</p>
  
        <h2>Proposed Solution</h2>
        <p>[Describe your solution and how it addresses the problem]</p>
  
        <h2>Technology Stack</h2>
        <ul>
          <li>Frontend: [e.g., React, Vue]</li>
          <li>Backend: [e.g., Node.js, Django]</li>
          <li>Database: [e.g., PostgreSQL, MongoDB]</li>
        </ul>
  
        <h2>Development Timeline</h2>
        <p>
          <strong>Phase 1:</strong> Planning and Wireframing<br/>
          <strong>Phase 2:</strong> Development and Testing<br/>
          <strong>Phase 3:</strong> Deployment and Feedback
        </p>
  
        <h2>Budget Estimate</h2>
        <p>[Cost details and breakdown]</p>
  
        <h2>Contact</h2>
        <p>[Your Name / Company Name]<br/>[Email Address]<br/>[Phone Number]</p>
      `,
	},
];
