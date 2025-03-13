import type { Resume } from "~/types/resume";

export const resumes: Resume[] = [
  {
    id: "full-stack",
    title: "Full Stack Developer Resume",
    name: "Cory Sougstad",
    titles: ["Lead UI Engineer", "Full Stack Developer"],
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
          "Developed custom UI solutions for blockchain applications, including advanced responsive platforms such as MechaChaotic Forge, Cozy Express, and LiqhtNFT.com.",
          "Provided strategic consultation and implementation guidance to ensure seamless and robust user experiences.",
        ],
        techStack:
          "TypeScript, React, Solidity, Next.js, IPRC, Tailwind, IPFS, PostgreSQL, IPFS",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Developer Resume",
    name: "Cory Sougstad",
    titles: ["Lead UI Engineer", "Frontend Developer"],
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
    highlightedTitle: "Seasoned Lead UI Engineer",
    summary:
      "with 20+ years of experience crafting beautiful, responsive, and accessible user interfaces. Expert in React, Next.js, TypeScript, and modern CSS frameworks, with a passion for creating exceptional user experiences and mentoring junior developers.",
    experience: [
      {
        title: "Lead Frontend Engineer",
        company: "Sudorandom",
        period: "March 2022 - Present",
        accomplishments: [
          "Architected and implemented responsive UI components using React and TypeScript, resulting in a 40% improvement in user engagement metrics.",
          "Optimized frontend performance by implementing code splitting and lazy loading, reducing initial load time by 35%.",
          "Established comprehensive UI testing strategies using Jest and React Testing Library, achieving 90% test coverage.",
          "Mentored junior developers on frontend best practices, accessibility standards, and modern React patterns.",
        ],
        techStack:
          "React, TypeScript, Next.js, Tailwind CSS, Jest, React Testing Library, Storybook",
      },
      {
        title: "Senior UI Developer",
        company: "CuriouslyCory Corp",
        period: "Feb 2021 - March 2022",
        accomplishments: [
          "Developed responsive UI components for a design system used across multiple client projects.",
          "Implemented advanced animations and transitions using Framer Motion, enhancing user experience and visual appeal.",
          "Collaborated with UX designers to translate wireframes and mockups into pixel-perfect implementations.",
          "Improved accessibility across all applications, achieving WCAG AA compliance.",
        ],
        techStack: "React, TypeScript, CSS-in-JS, Framer Motion, Figma, GSAP",
      },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain Developer Resume",
    name: "Cory Sougstad",
    titles: ["Lead Blockchain Engineer", "Full Stack Developer"],
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
    highlightedTitle: "Experienced Blockchain Engineer",
    summary:
      "with expertise in smart contract development, decentralized applications, and Web3 technologies. Proficient in Solidity, Ethereum, and related blockchain frameworks, with a strong background in frontend development using React and TypeScript.",
    experience: [
      {
        title: "Lead Blockchain Engineer",
        company: "Sudorandom",
        period: "March 2022 - Present",
        accomplishments: [
          "Architected and developed smart contracts for NFT marketplaces and DeFi applications, handling over $5M in transaction volume.",
          "Implemented gas optimization techniques, reducing transaction costs by 30% for users.",
          "Built frontend interfaces for blockchain applications using React, Next.js, and ethers.js.",
          "Conducted security audits and implemented best practices to ensure contract safety and reliability.",
        ],
        techStack:
          "Solidity, Ethereum, Hardhat, ethers.js, React, TypeScript, Next.js, The Graph",
      },
      {
        title: "Blockchain Developer",
        company: "CuriouslyCory Corp",
        period: "Feb 2021 - March 2022",
        accomplishments: [
          "Developed and deployed ERC-721 and ERC-1155 smart contracts for various NFT projects.",
          "Created user-friendly minting interfaces and gallery displays for NFT collections.",
          "Integrated wallet connections and transaction handling using Web3 libraries.",
          "Collaborated with artists and creators to implement their vision on the blockchain.",
        ],
        techStack:
          "Solidity, Web3.js, React, IPFS, Polygon, OpenSea API, Metamask",
      },
    ],
  },
] as const;
