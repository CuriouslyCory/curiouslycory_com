import type { Resume } from "~/types/resume";
import { FaHardHat, FaHatCowboy, FaHatWizard } from "react-icons/fa";
import { GiMagicHat } from "react-icons/gi";

const contactData = {
  name: "Cory Sougstad",
  email: "cory@curiouslycory.com",
  links: [
    { text: "https://curiouslycory.com", url: "https://curiouslycory.com" },
    {
      text: "https://www.linkedin.com/in/corysougstad",
      url: "https://www.linkedin.com/in/corysougstad",
    },
  ],
};

export const principalFullStackEngineerResume: Resume = {
  id: "principal-full-stack-engineer",
  ...contactData,
  icon: <FaHatWizard />,
  title: "Principal Full Stack Engineer",
  titles: ["Principal Full Stack Engineer"],
  highlightedTitle: "Highly Experienced Principal Full Stack Engineer",
  summary:
    "Accomplished Principal Full Stack Engineer with 20+ years of experience architecting, developing, and deploying complex and scalable web applications. Deep expertise in modern JavaScript/TypeScript ecosystems (React, Next.js, Node.js), cloud infrastructure (AWS, GCP), and backend technologies. Proven ability to drive technical vision, optimize performance, and deliver high-quality, user-centric solutions.",
  experience: [
    {
      title: "Principal Full Stack Engineer",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Led full-stack architecture for critical initiatives, resulting in significant performance improvements and enhanced user experience.",
        "Successfully transitioned backend systems to serverless architectures, improving scalability, reliability, and reducing operational costs.",
        "Established and championed robust CI/CD pipelines and automated testing frameworks, enhancing development efficiency and software quality.",
        "Optimized API performance and implemented advanced frontend solutions using React, Next.js, and TypeScript.",
      ],
      techStack:
        "TypeScript, React/Next.js, Node.js, Python, Angular, Tailwind CSS, RESTful APIs, GraphQL, AWS, GCP, Serverless, Docker, Kubernetes, PostgreSQL, Redis, CI/CD",
    },
    {
      title: "CEO & Lead Developer",
      company: "CuriouslyCory Corp",
      period: "July 2021 - April 2023",
      accomplishments: [
        "Architected and developed custom full-stack web applications and blockchain-integrated dApps for diverse clients.",
        "Independently managed the entire development lifecycle, from client engagement and scope definition to deployment and launch.",
        "Leveraged React, Next.js, TypeScript, and modern backend technologies to deliver scalable and user-friendly solutions.",
      ],
      techStack:
        "TypeScript, React, Next.js, Node.js, Solidity, Web3.js, RESTful APIs, Serverless, PostgreSQL, IPFS",
    },
    {
      title: "Lead Systems Engineer",
      company: "Insight Enterprises",
      period: "Oct 2015 - Nov 2020",
      accomplishments: [
        "Led the development of complex backend systems and integrations, significantly improving system reliability and performance.",
        "Architected and implemented scalable API solutions to support diverse business needs.",
        "Provided technical leadership and guidance within Agile development teams.",
      ],
      techStack:
        "JavaScript, Backend Systems, API Development, Integrations, Agile",
    },
    {
      title: "Manager of Information Technology",
      company: "Responsive Data",
      period: "Mar 2007 - Oct 2015",
      accomplishments: [
        "Oversaw the development and maintenance of scalable web services and APIs.",
        "Managed infrastructure and optimized backend processes for performance and scalability.",
      ],
      techStack: "Web Services, APIs, Database Administration",
    },
  ],
  skills: [
    [
      "Frontend",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
    ],
    [
      "Backend",
      "Node.js",
      "Python",
      "Fastify",
      "Nest.js",
      "RESTful APIs",
      "GraphQL",
      "Serverless",
    ],
    ["Cloud", "AWS", "GCP", "Vercel", "Netlify", "Docker", "Kubernetes"],
    [
      "Databases",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "MSSQL",
      "MySQL",
      "SQLite",
      "Pinecone",
      "Qdrant",
    ],
    [
      "DevOps",
      "CI/CD",
      "Playwright",
      "Puppeteer",
      "Jest",
      "Mocha",
      "Chai",
      "Jasmine",
      "Cypress",
    ],
    ["Other", "Agile", "Problem-Solving", "Technical Leadership"],
  ],
  keyAchievements: [
    "Led the successful transition of critical backend systems to serverless architectures, improving scalability and reducing operational costs.",
    "Architected and delivered high-performance, scalable web applications and APIs, significantly enhancing user experience and reliability.",
    "Established and promoted best practices in software development, including CI/CD and automated testing.",
  ],
  education: [
    "Continuous professional development in modern software engineering practices and cloud technologies.",
  ],
} as const;

export const engineeringManagerCtoResume: Resume = {
  id: "engineering-manager-cto",
  ...contactData,
  icon: <FaHardHat />,
  title: "Engineering Manager / CTO",
  titles: ["Engineering Manager", "CTO", "Technical Leader"],
  highlightedTitle: "Experienced Engineering Leader with Strategic Vision",
  summary:
    "Results-oriented Engineering Manager with 20+ years of experience leading and mentoring high-performing engineering teams. Proven ability to define technical vision, drive strategic roadmaps, and foster collaborative environments focused on delivering scalable and innovative software solutions. Deep understanding of modern web technologies and cloud infrastructure.",
  experience: [
    {
      title: "Principal Full Stack Engineer (Frontend Lead)",
      company: "Sudorandom Labs",
      period: "March 2022 - Present",
      accomplishments: [
        "Led and mentored frontend engineering teams, fostering a collaborative and innovation-driven environment.",
        "Defined technical direction and established development standards for frontend architecture.",
        "Improved frontend architecture, optimized user experiences, and streamlined developer productivity through modern tooling and processes.",
        "Collaborated on architectural decisions to transition backend infrastructure to serverless, enhancing scalability and reducing costs.",
      ],
      techStack: "React, TypeScript, Next.js, Tailwind CSS, Agile",
    },
    {
      title: "CEO & Lead Developer",
      company: "CuriouslyCory Corp",
      period: "July 2021 - April 2023",
      accomplishments: [
        "Defined project scopes and technical requirements through direct client engagement.",
        "Managed the full development lifecycle of custom web applications and blockchain-integrated dApps.",
        "Provided technical leadership and guidance on project execution and technology selection.",
      ],
      techStack:
        "TypeScript, React, Next.js, Node.js, Solidity, Web3.js, Agile",
    },
    {
      title: "Lead Systems Engineer",
      company: "Insight Enterprises",
      period: "Oct 2015 - Nov 2020",
      accomplishments: [
        "Managed a team of frontend engineers, driving UI/UX initiatives and frontend architecture improvements.",
        "Led cross-functional collaboration and agile planning to ensure successful project delivery.",
        "Mentored team members to foster technical growth and improve code quality.",
      ],
      techStack: "JavaScript, UI/UX, Frontend Architecture, Agile",
    },
    {
      title: "Manager of Information Technology",
      company: "Responsive Data",
      period: "Mar 2007 - Oct 2015",
      accomplishments: [
        "Oversaw frontend and backend development teams and infrastructure management.",
        "Defined technical roadmaps and ensured alignment with business objectives.",
        "Facilitated the professional growth of team members and established best practices for software development.",
      ],
      techStack:
        "Web Application Development, Team Management, Infrastructure Management, Strategic Planning",
    },
  ],
  skills: [
    [
      "Leadership & Management",
      "Team Building",
      "Mentorship",
      "Strategic Planning",
      "Agile",
    ],
    ["Frontend", "React", "Next.js", "TypeScript", "JavaScript"],
    ["Cloud & Infrastructure", "AWS", "GCP", "Serverless Architectures"],
    ["Communication", "Technical Communication", "Stakeholder Management"],
  ],
  keyAchievements: [
    "Successfully led and mentored multiple engineering teams to deliver high-quality, scalable web applications.",
    "Defined and implemented technical strategies that resulted in improved performance, reliability, and team productivity.",
    "Fostered collaborative and innovative engineering cultures.",
  ],
  education: [
    "Continuous professional development in leadership, software architecture, and emerging technologies.",
  ],
} as const;

export const seniorFullStackWeb3EngineerResume: Resume = {
  id: "senior-full-stack-web3-engineer",
  ...contactData,
  icon: <FaHatCowboy />,
  title: "Senior Full Stack Web3 Engineer",
  titles: ["Senior Software Engineer", "Web3 & Blockchain Specialist"],
  highlightedTitle: "Experienced Senior Full Stack Web3 Engineer",
  summary:
    "Senior Full Stack Engineer with 20+ years of software development experience and a strong focus on building scalable and user-centric Web3 and blockchain solutions. Proficient in TypeScript, React, Next.js, Solidity, and serverless architectures. Proven ability to architect and deliver complex decentralized applications.",
  experience: [
    {
      title: "Principal Full Stack Engineer | Blockchain Development Lead",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Designed and implemented scalable Web3 applications, enhancing reliability and user engagement.",
        "Optimized performance through reduced API calls, enhanced error handling, and streamlined serverless architectures.",
        "Established robust CI/CD pipelines for Web3 projects, improving developer productivity and application stability.",
      ],
      techStack:
        "TypeScript, React, Next.js, Solidity, Ethers.js, Web3.js, Viem, Wagmi, Serverless Architectures, AWS, GCP, CI/CD",
    },
    {
      title: "Owner/Operator | Blockchain & Web3 Specialist",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Developed scalable serverless solutions for complex NFT processing (MechaChaotic Forge).",
        "Crafted interactive Web3 experiences with smart contract integration (Cozy Express).",
        "Built a robust and scalable NFT marketplace and lending platform (LiqdNFT.com).",
      ],
      techStack:
        "TypeScript, React, Next.js, Solidity, Smart Contract Development, Web3.js, Hardhat, IPFS",
    },
  ],
  skills: [
    [
      "Web3 & Blockchain",
      "Ethereum",
      "Solidity",
      "Web3.js",
      "Ethers.js",
      "Viem",
      "Wagmi",
      "NFTs",
      "Smart Contracts",
    ],
    ["Frontend", "React", "Next.js", "TypeScript", "JavaScript"],
    [
      "Backend & Infrastructure",
      "Node.js",
      "Serverless Architectures",
      "AWS",
      "GCP",
    ],
    ["Other", "IPFS", "Hardhat"],
  ],
  keyAchievements: [
    "Successfully delivered multiple complex Web3 and blockchain projects from architecture to deployment.",
    "Transitioned backend systems to serverless architectures, significantly improving scalability and reliability for Web3 applications.",
    "Implemented comprehensive testing and CI/CD strategies for blockchain projects.",
  ],
  education: [
    "Ongoing professional training and self-directed learning in blockchain technology and Web3 innovation.",
  ],
} as const;

export const seniorFullStackAiMlEngineerResume: Resume = {
  id: "senior-full-stack-ai-ml-engineer",
  ...contactData,
  icon: <GiMagicHat />,
  title: "Senior Full Stack AI/ML Engineer",
  titles: ["Senior Software Engineer", "AI & Machine Learning Specialist"],
  highlightedTitle:
    "Experienced Senior Full Stack Engineer with AI/ML Expertise",
  summary:
    "Senior Full Stack Engineer with 20+ years of experience specializing in integrating AI and Machine Learning into scalable web applications. Proficient in Python, TypeScript, LangChain, LangGraph, n8n, React, Next.js, and cloud platforms (AWS, GCP). Proven ability to develop and deploy AI-driven solutions to enhance user experiences and business outcomes.",
  experience: [
    {
      title: "Principal Full Stack Engineer",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Implemented AI-driven solutions, including generative AI and intelligent context management, to optimize web performance and user experience.",
        "Developed automated data processing and analytical systems leveraging AI/ML techniques.",
        "Established robust AI pipelines and integrated them into CI/CD processes.",
      ],
      techStack:
        "Python, TensorFlow/PyTorch, Generative AI, LLMs, Vector Databases, Embeddings, TypeScript, React, Next.js, AWS, GCP, Serverless",
    },
    {
      title: "Owner/Operator | AI & Machine Learning Specialist",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Developed interactive storytelling experiences powered by generative AI.",
        "Engineered a sophisticated personal assistant leveraging LLMs, advanced context management, and memory systems.",
      ],
      techStack:
        "Python, Generative AI, Large Language Models (LLMs), Context & Memory Management",
    },
    {
      title: "Senior Systems Engineer",
      company: "Lighthouse Global Inc.",
      period: "Nov 2020 - Feb 2022",
      accomplishments: [
        "Architected scalable systems integrating machine learning and AI to improve product performance and usability.",
      ],
      techStack: "Machine Learning, AI, Python",
    },
  ],
  skills: [
    [
      "AI & Machine Learning",
      "Generative AI",
      "Large Language Models (LLMs)",
      "TensorFlow",
      "PyTorch",
      "Vector Databases",
      "Embeddings",
    ],
    ["Programming", "Python", "TypeScript", "JavaScript"],
    ["Frontend", "React", "Next.js"],
    ["Backend & Cloud", "Node.js", "AWS", "GCP", "Serverless"],
    ["Databases", "PostgreSQL", "Redis", "MongoDB"],
  ],
  keyAchievements: [
    "Successfully built and deployed sophisticated AI-driven applications, significantly enhancing user engagement and operational efficiency.",
    "Developed robust and scalable AI infrastructure.",
    "Integrated AI/ML pipelines into the software development lifecycle.",
  ],
  education: [
    "Continuous self-directed learning in AI technologies, generative models, and machine learning frameworks.",
    "Completed a deep dive AI/ML course from udacity.com.",
  ],
} as const;

export const resumes: Resume[] = [
  principalFullStackEngineerResume,
  engineeringManagerCtoResume,
  seniorFullStackWeb3EngineerResume,
  seniorFullStackAiMlEngineerResume,
] as const;
