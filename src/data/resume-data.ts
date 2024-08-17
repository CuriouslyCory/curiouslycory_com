import type { Resume } from "~/types/resume";

const contactData = {
  name: "Cory Sougstad",
  email: "cory@curiouslycory.com",
  links: [
    {
      text: "https://curiouslycory.com",
      url: "https://curiouslycory.com",
    },
    {
      text: "https://www.linkedin.com/in/corysougstad",
      url: "https://www.linkedin.com/in/corysougstad",
    },
  ],
};

export const leadUIDeveloperResume: Resume = {
  id: "lead-ui-developer",
  ...contactData,
  title: "Lead UI Developer",
  titles: ["Lead UI Engineer", "Full Stack Developer"],
  highlightedTitle: "Seasoned Lead UI Engineer",
  summary:
    "and full stack developer with 20+ years of experience building highly performant, responsive, and scalable user interfaces. Skilled in React, Next.js, TypeScript, and Node.js, with a proven record of improving application performance, optimizing developer workflows, and mentoring teams to deliver exceptional user experiences.",
  experience: [
    {
      title: "Principal Full Stack Engineer",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Led UI engineering initiatives focused on performance optimization, significantly reducing API requests and improving load times.",
        "Established robust testing and CI/CD pipelines, enhancing development speed and reliability.",
        "Successfully migrated infrastructure to serverless architectures, dramatically improving UI responsiveness, scalability, and operational efficiency.",
        "Refactored front-end codebases using best practices in TypeScript, React, and Next.js, enhancing maintainability and developer productivity.",
      ],
      techStack:
        "Angular, TypeScript, React/Next.js, Solidity, Tailwind, SQLite, Vercel, GCP",
    },
    {
      title: "Senior Application Engineer",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Engineered responsive, high-performance user interfaces for diverse client projects, focusing on usability and scalability.",
        "Developed custom UI solutions for blockchain applications, including advanced responsive platforms such as MechaChaotic Forge, Cozy Express, and LiqdNFT.com.",
        "Provided strategic consultation and implementation guidance to ensure seamless and robust user experiences.",
      ],
      techStack:
        "TypeScript, React, Solidity, Next.js, tRPC, Tailwind, IPFS, PostgreSQL, IPFS",
    },
    {
      title: "Senior Systems Engineer | UI/UX Lead",
      company: "Lighthouse Global",
      period: "Nov 2020 - Feb 2021",
      accomplishments: [
        "Engineered responsive, high-performance user interfaces for diverse client projects, focusing on usability and scalability.",
        "Developed custom UI solutions for blockchain applications, including advanced responsive platforms such as MechaChaotic Forge, Cozy Express, and LiqdNFT.com.",
        "Provided strategic consultation and implementation guidance to ensure seamless and robust user experiences.",
      ],
      techStack:
        "TypeScript, React, Solidity, Next.js, tRPC, Tailwind, IPFS, PostgreSQL, IPFS",
    },
  ],
} as const;

export const engineeringManagerResume: Resume = {
  id: "engineering-manager",
  ...contactData,
  title: "Engineering Manager",
  titles: ["Engineering Manager", "Developer Experience & Web"],
  highlightedTitle: "Experienced Engineering Leader",
  summary:
    "Experienced engineering leader with 20+ years in software development and a passion for enhancing developer experiences, scaling distributed systems, and building high-performing teams. Known for clear communication, strategic roadmapping, and a proven track record of delivering robust, globally scalable web infrastructure solutions.",
  experience: [
    {
      title: "Principal Full Stack Engineer",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Led initiatives to transition backend systems to serverless solutions, significantly improving scalability and reducing operational overhead.",
        "Implemented robust CI/CD pipelines and testing frameworks, enhancing team efficiency and product reliability.",
        "Optimized developer productivity and application performance through improved error handling and API request optimization.",
        "Collaborated closely with cross-functional teams to establish technical roadmaps and architectural vision.",
      ],
      techStack:
        "Angular, TypeScript, React/Next.js, Solidity, Tailwind, SQLite, Vercel, GCP",
    },
    {
      title: "Senior Application Engineer",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Managed and delivered scalable Web3 and frontend solutions for clients, utilizing modern infrastructure technologies.",
        "Led technical direction and strategic implementation of projects such as MechaChaotic Forge, Cozy Express, and LiqdNFT.com, each involving complex infrastructure and dynamic user experiences.",
      ],
      techStack:
        "TypeScript, React, Solidity, Next.js, tRPC, Tailwind, IPFS, PostgreSQL, IPFS",
    },
    {
      title: "Senior Systems Engineer | Technical Lead",
      company: "Lighthouse Global",
      period: "Nov 2020 - Feb 2021",
      accomplishments: [
        "Architected and maintained scalable, distributed SaaS solutions used globally.",
        "Provided leadership in agile methodologies and engineering best practices, improving collaboration and developer satisfaction.",
      ],
      techStack: "ServiceNow, AngularJS, Tailwind, IPFS, MSSQL",
    },
  ],
  skills: [
    [
      "Leadership & Management",
      "Team Building",
      "Mentorship",
      "Agile Methodologies",
      "Strategic Roadmapping",
      "Cross-team Collaboration",
    ],
    [
      "Infrastructure & Scaling",
      "Serverless Architectures",
      "Distributed Systems",
      "Global Infrastructure Operations",
      "CI/CD",
      "Cloud Platforms (AWS, GCP, Vercel)",
    ],
    [
      "Developer Experience (DX)",
      "API Optimization",
      "Testing Automation",
      "Error Visibility Improvements",
      "Developer Productivity Tools",
    ],
    [
      "Technical Communication",
      "Clear, Effective Communication",
      "Stakeholder Alignment",
      "Technical Mentorship",
    ],
  ],
  keyAchievements: [
    "Successfully migrated infrastructure to scalable, serverless solutions, significantly enhancing reliability and reducing operational costs.",
    "Built and nurtured high-performing engineering teams, consistently fostering a culture of innovation, accountability, and continuous improvement.",
    "Regularly leveraged clear communication and strategic decision-making to guide teams through complex technical challenges, ensuring consistent product excellence and timely delivery.",
  ],
  education: [
    "Continuous professional development in Web Infrastructure, AI, and Developer Experience optimization.",
    "Regular participation in engineering leadership workshops and conferences.",
  ],
} as const;

export const seniorFullStackEngineerResume: Resume = {
  id: "senior-full-stack-engineer",
  ...contactData,
  title: "Senior Full Stack Engineer",
  titles: [
    "Senior Software Engineer",
    "Full Stack Development & UX Specialist",
  ],
  highlightedTitle: "Experienced Senior Software Engineer",
  summary:
    "Experienced Senior Software Engineer passionate about building impactful web applications that improve lives. Over 20 years of experience in software development with deep expertise in React, TypeScript, Python, and modern cloud infrastructure (GCP/AWS). Proven ability to lead engineering teams, architect scalable solutions, and deliver high-quality, user-centric products.",
  experience: [
    {
      title: "Principal Full Stack Engineer",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Led full-stack architecture, optimized APIs, and implemented advanced frontend solutions to enhance user experience and performance.",
        "Transitioned backend infrastructure to serverless architectures, improving scalability, reliability, and reducing operational costs.",
        "Developed robust CI/CD pipelines and automated testing, increasing development efficiency and software quality.",
      ],
      techStack:
        "Angular, TypeScript, React/Next.js, Python, Tailwind, SQLite, Vercel, GCP",
    },
    {
      title: "Senior Application Engineer",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Built responsive, intuitive front-end solutions tailored to specific client needs, ensuring high scalability and seamless user interactions.",
        "Developed highly interactive responsive UIs integrated with scalable serverless backend processing for MechaChaotic Forge.",
        "Delivered engaging frontend solutions, tailored specifically for user-friendly digital experiences for Cozy Express.",
        "Created robust and scalable UIs for marketplace interactions, significantly enhancing user engagement and satisfaction for LiqdNFT.com.",
      ],
      techStack:
        "TypeScript, React, Solidity, Next.js, Python, tRPC, Tailwind, IPFS, PostgreSQL, IPFS",
    },
    {
      title: "Senior Systems Engineer | UI/UX Lead",
      company: "Lighthouse Global",
      period: "Nov 2020 - Feb 2021",
      accomplishments: [
        "Directed frontend architecture and UI/UX improvements for enterprise applications, enhancing usability and performance.",
        "Mentored development teams in agile methodologies, code quality, and frontend best practices.",
      ],
      techStack: "ServiceNow, AngularJS, MSSQL",
    },
  ],
  skills: [
    [
      "Frontend Technologies",
      "React",
      "Next.js",
      "Remix",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Responsive UI",
    ],
    [
      "Backend & Infrastructure",
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Node.js",
      "RESTful APIs",
      "AWS (ECS, S3)",
      "Docker",
      "Kubernetes",
    ],
    [
      "Databases & Data Stores",
      "PostgreSQL",
      "MSSQL",
      "Redis",
      "MongoDB",
      "Qdrant",
    ],
    ["DevOps & Monitoring", "CI/CD (GitHub Actions)", "Datadog", "PagerDuty"],
    ["Security Practices", "Secure Coding"],
  ],
  keyAchievements: [
    "Successfully led complex projects from architecture to deployment, ensuring scalability, performance, and user satisfaction.",
    "Implemented streamlined development practices and automated pipelines, significantly reducing deployment time and increasing reliability.",
    "Mentored and developed technical teams, consistently fostering collaborative environments and continuous learning.",
  ],
  education: [
    "Continuous professional development in modern software engineering practices, UX/UI design, cloud infrastructure, and data security.",
  ],
} as const;

export const web3BlockchainSpecialistResume: Resume = {
  id: "web3-blockchain-specialist",
  ...contactData,
  title: "Senior Blockchain Software Engineer",
  titles: ["Senior Software Engineer", "Web3 & Blockchain Specialist"],
  highlightedTitle:
    "Experienced Software Engineer | Web3 & Blockchain Specialist",
  summary:
    "Experienced Software Engineer with deep expertise in building scalable, user-centric blockchain and Web3 solutions. With over 20 years in software development and hands-on experience in TypeScript, React, Next.js, Solidity, and serverless architectures, I have successfully delivered complex projects across multiple domains. Passionate about leveraging blockchain technologies to drive innovation and deliver impactful user experiences.",
  experience: [
    {
      title: "Principal Full Stack Engineer | Blockchain Development Lead",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Designed and implemented scalable Web3 applications, enhancing reliability and user engagement.",
        "Optimized performance through reduced API calls, enhanced error handling, and streamlined serverless architectures.",
        "Established robust CI/CD pipelines, significantly improving developer productivity and application stability.",
      ],
      techStack:
        "TypeScript, React, Next.js, Solidity, Serverless Architectures, AWS, GCP, Ethers.js, Web3.js, Viem, Wagmi, Tailwind",
    },
    {
      title: "Owner/Operator | Blockchain & Web3 Specialist",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Developed scalable serverless solutions for complex NFT processing for MechaChaotic Forge.",
        "Crafted interactive Web3 experiences, including smart contract integration and user-friendly front-ends for Cozy Express.",
        "Built robust, scalable NFT marketplace and lending platform for LiqdNFT.com.",
      ],
      techStack:
        "TypeScript, React, Next.js, Solidity, Smart Contract Development, Web3.js, Hardhat, Tailwind, Wagmi, Viem",
    },
    {
      title: "Senior Systems Engineer",
      company: "Lighthouse Global Inc.",
      period: "Nov 2020 - Feb 2022",
      accomplishments: [
        "Architected and implemented scalable solutions for enterprise applications, emphasizing performance and usability.",
        "Mentored and guided teams in adopting best practices for agile development and code quality.",
      ],
      techStack: "ServiceNow, AngularJS",
    },
  ],
  skills: [
    [
      "Web3 & Blockchain",
      "Ethereum",
      "Solidity",
      "Web3.js",
      "NFTs",
      "Smart Contract Development",
    ],
    [
      "Frontend",
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Jest",
    ],
    [
      "Backend & Infrastructure",
      "Node.js",
      "Serverless Architectures",
      "AWS",
      "GCP",
      "API Development",
    ],
    ["Databases", "PostgreSQL", "Redis", "MongoDB"],
    ["CI/CD & DevOps", "GitHub Actions", "Jenkins", "Docker", "Kubernetes"],
  ],
  keyAchievements: [
    "Successfully delivered multiple complex Web3 and blockchain projects from architecture to deployment.",
    "Transitioned critical backend systems to serverless architectures, significantly improving scalability and reliability.",
    "Implemented comprehensive testing and CI/CD strategies, streamlining deployment processes and enhancing product stability.",
  ],
  education: [
    "Ongoing professional training and self-directed learning in blockchain technology, Web3 innovation, and software engineering best practices.",
  ],
} as const;

export const aiMachineLearningSpecialistResume: Resume = {
  id: "ai-machine-learning-specialist",
  ...contactData,
  title: "AI & Machine Learning Specialist",
  titles: ["Senior Software Engineer", "AI & Machine Learning Specialist"],
  highlightedTitle:
    "Seasoned Software Engineer | AI & Machine Learning Specialist",
  summary:
    "Seasoned Software Engineer with over 20 years of experience, specializing in AI-driven solutions and scalable web applications. Skilled in integrating advanced machine learning techniques, generative AI, and intelligent automation to enhance user experiences and business outcomes. Passionate about leveraging cutting-edge AI technologies to solve complex problems and drive innovation.",
  experience: [
    {
      title: "Principal Full Stack Engineer",
      company: "Sudorandom",
      period: "March 2022 - Present",
      accomplishments: [
        "Implemented AI-driven solutions and optimized web performance using generative AI and intelligent context management.",
        "Developed automated data processing and analytical systems to enhance user experiences.",
        "Established robust CI/CD pipelines, significantly improving developer productivity and application stability.",
      ],
      techStack:
        "Generative AI, Gemini, Python, TypeScript, React, Next.js, Serverless Architectures, AWS, GCP",
    },
    {
      title: "Owner/Operator",
      company: "CuriouslyCory Corp",
      period: "Feb 2021 - March 2022",
      accomplishments: [
        "Developed interactive experiences powered by generative AI for dynamic, context-aware storytelling.",
        "Engineered sophisticated personal assistant leveraging LLMs, advanced context management, and memory systems.",
      ],
      techStack:
        "Generative AI, Large Language Models (LLMs), Context & Memory Management, Python, TypeScript, React, Next.js, Serverless Architectures, AWS, GCP",
    },
    {
      title: "Senior Systems Engineer",
      company: "Lighthouse Global Inc.",
      period: "Nov 2020 - Feb 2022",
      accomplishments: [
        "Architected scalable systems integrating machine learning and AI, significantly improving product performance and usability.",
        "Mentored engineering teams in adopting AI best practices and agile methodologies.",
      ],
      techStack: "Machine Learning, AI",
    },
  ],
  skills: [
    [
      "AI & Machine Learning",
      "Generative AI",
      "Large Language Models (LLMs)",
      "Context & Memory Management",
      "Vector Databases",
      "Embeddings",
    ],
    [
      "Programming & Frameworks",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
    ],
    [
      "Cloud & Infrastructure",
      "AWS",
      "GCP",
      "Serverless Architectures",
      "Kubernetes",
      "Docker",
    ],
    ["Databases & Data Management", "PostgreSQL", "Redis", "MongoDB", "SQL"],
    ["CI/CD & DevOps", "GitHub Actions", "Jenkins", "Automated Testing"],
  ],
  keyAchievements: [
    "Successfully built and deployed sophisticated AI-driven applications, significantly enhancing user engagement and operational efficiency.",
    "Developed robust and scalable AI infrastructure, enabling advanced data processing and intelligent automation.",
    "Fostered a culture of continuous innovation, mentoring teams to effectively integrate cutting-edge AI solutions into product development cycles.",
  ],
  education: [
    "Continuous self-directed learning in AI technologies, generative models, machine learning frameworks, and software engineering best practices.",
  ],
} as const;

export const resumes: Resume[] = [
  seniorFullStackEngineerResume,
  engineeringManagerResume,
  leadUIDeveloperResume,
  aiMachineLearningSpecialistResume,
  web3BlockchainSpecialistResume,
] as const;
