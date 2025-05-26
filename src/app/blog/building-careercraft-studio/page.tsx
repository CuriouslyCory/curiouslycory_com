/* 
---bm
title: Building CareerCraft Studio - How I Architected an AI-Powered Resume Platform with LangChain, tRPC, and Modern TypeScript
excerpt: A deep dive into building an AI-first application that transforms how developers and professionals create tailored resumes, featuring LangChain agents, tRPC for type safety, and modern full-stack architecture.
coverImage: /images/blog/careercraft-studio.webp
publishedAt: 2025-05-26
featured: true
published: true
tags: ai,langchain,typescript,trpc,nextjs,career-tech
---
*/

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title:
    "Building CareerCraft Studio: How I Architected an AI-Powered Resume Platform with LangChain, tRPC, and Modern TypeScript",
  description:
    "A deep dive into building an AI-first application that transforms how developers and professionals create tailored resumes, featuring LangChain agents, tRPC for type safety, and modern full-stack architecture.",
  openGraph: {
    images: [
      {
        url: "/images/blog/careercraft-studio.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building CareerCraft Studio: AI-Powered Resume Platform",
    description:
      "A deep dive into building an AI-first application with LangChain, tRPC, and modern TypeScript.",
  },
};

export default async function CareerCraftStudioPost() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
          Building CareerCraft Studio
        </h1>
        <p className="text-muted-foreground mb-8 text-xl">
          How I architected an AI-powered resume platform that understands your
          career story and tailors it for each opportunity
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">LangChain</Badge>
          <Badge variant="secondary">tRPC</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Next.js 15</Badge>
          <Badge variant="secondary">AI Agents</Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-xl leading-relaxed">
            As a developer, I&apos;ve always been frustrated by the &quot;spray
            and pray&quot; approach to job applications. Generic resumes that
            don&apos;t match job requirements, hours spent manually tailoring
            each application, and the constant worry about ATS compatibility.
            What if I could build something that actually understands your
            career story and intelligently adapts it for each opportunity?
          </p>

          <p>
            That question led me to build <strong>CareerCraft Studio</strong> –
            an AI-powered platform that transforms how professionals create and
            manage their career documents. But this isn&apos;t just another
            resume builder. It&apos;s a showcase of modern AI-first
            architecture, featuring specialized agents, end-to-end type safety,
            and intelligent data processing.
          </p>
        </div>

        <div className="border-border my-8 border-t" />

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            The Problem I Set Out to Solve
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Pain Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    • Generic resumes that don&apos;t match job requirements
                  </li>
                  <li>
                    • Time-intensive manual tailoring for each application
                  </li>
                  <li>• Poor ATS compatibility and keyword optimization</li>
                  <li>
                    • Difficulty organizing and optimizing career achievements
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    • Complex data relationships (skills, work history,
                    achievements)
                  </li>
                  <li>
                    • Real-time AI interactions with proper state management
                  </li>
                  <li>
                    • Intelligent parsing and normalization of unstructured data
                  </li>
                  <li>• Multi-industry skill categorization and matching</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="border-border my-8 border-t" />

        {/* Architecture Overview */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Architecture Overview: The Tech Stack That Made It Possible
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Modern TypeScript Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>Next.js 15</strong> with App Router
                </div>
                <div>
                  <strong>TypeScript</strong> throughout for type safety
                </div>
                <div>
                  <strong>Prisma</strong> for type-safe database operations
                </div>
                <div>
                  <strong>Zod</strong> for runtime validation
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI-First Architecture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>LangChain</strong> for orchestrating AI agents
                </div>
                <div>
                  <strong>LangGraph</strong> for complex workflows
                </div>
                <div>
                  <strong>Google Gemini</strong> as the LLM provider
                </div>
                <div>
                  <strong>Custom agent team</strong> with specialized roles
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Developer Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>tRPC</strong> for end-to-end type safety
                </div>
                <div>
                  <strong>TanStack Query</strong> for data fetching
                </div>
                <div>
                  <strong>Tailwind + shadcn/ui</strong> for rapid UI
                </div>
                <div>
                  <strong>Vercel</strong> for seamless deployment
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* AI Agent Architecture */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            The AI Agent Architecture: Building a Team of Specialists
          </h2>

          <p className="mb-6">
            The heart of CareerCraft Studio is its agent-based architecture.
            Instead of a monolithic AI system, I built a team of specialized
            agents that work together to handle different aspects of career
            management.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>The Supervisor Pattern</CardTitle>
              <CardDescription>
                Intelligent routing based on user intent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted overflow-x-auto rounded-lg p-4">
                <code>{`// Simplified example of the agent routing system
const supervisorAgent = {
  route_to_agent: (userIntent) => {
    if (userIntent.includes("add work experience")) return "data_manager";
    if (userIntent.includes("generate resume")) return "resume_generator";
    if (userIntent.includes("analyze job posting")) return "job_posting_manager";
    // ... intelligent routing logic
  }
};`}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Specialized Agents</h3>
              <ul className="space-y-3">
                <li>
                  <strong>Data Manager Agent:</strong> Handles CRUD operations
                  and resume parsing
                </li>
                <li>
                  <strong>Resume Generator Agent:</strong> Creates tailored
                  resumes based on job requirements
                </li>
                <li>
                  <strong>Cover Letter Generator Agent:</strong> Generates
                  personalized cover letters
                </li>
                <li>
                  <strong>Job Posting Manager Agent:</strong> Analyzes job
                  requirements and compatibility
                </li>
                <li>
                  <strong>User Profile Agent:</strong> Provides insights about
                  stored data
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">
                The Power of LangGraph StateGraph
              </h3>
              <ul className="space-y-3">
                <li>• Cyclical agent interactions</li>
                <li>• Complex workflow orchestration</li>
                <li>• State persistence across agent handoffs</li>
                <li>• Conditional routing based on conversation context</li>
                <li>• Error handling and recovery mechanisms</li>
              </ul>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Technical Deep Dives */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Technical Deep Dives</h2>

          {/* Resume Parsing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. AI-Powered Resume Parsing</CardTitle>
              <CardDescription>
                Converting unstructured resume text into normalized data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
                <code>{`// Example of the intelligent parsing system
class ResumeParsingService {
  async parseResume(resumeText: string, userId: string) {
    // AI extraction of structured data
    const extractedData = await this.llm.extract(resumeText);
    
    // Batch database operations for performance
    await this.db.transaction(async (tx) => {
      await this.createWorkHistory(tx, extractedData.workHistory);
      await this.createSkills(tx, extractedData.skills);
      await this.createAchievements(tx, extractedData.achievements);
    });
    
    // Intelligent skill categorization
    await this.normalizeSkills(userId);
  }
}`}</code>
              </pre>
              <div className="space-y-2">
                <div>
                  <strong>Challenge:</strong> Converting unstructured resume
                  text into normalized data
                </div>
                <div>
                  <strong>Solution:</strong> LLM-powered extraction with batch
                  database operations
                </div>
                <div>
                  <strong>Performance:</strong> Reduced DB calls from hundreds
                  to dozens
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Normalization */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. Multi-Industry Skill Normalization</CardTitle>
              <CardDescription>
                Intelligent deduplication across 30+ industry categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
                <code>{`enum SkillCategory {
  PROGRAMMING_LANGUAGE,
  MEDICAL_PROCEDURE,
  FINANCIAL_ANALYSIS,
  LEGAL_RESEARCH,
  MARKETING_STRATEGY,
  // ... 30+ categories across industries
}

// "React (hooks, context)" vs "React" - same skill, different detail levels`}</code>
              </pre>
              <div className="space-y-2">
                <div>
                  <strong>Challenge:</strong> Handling skill variations and
                  duplicates across industries
                </div>
                <div>
                  <strong>Solution:</strong> Intelligent deduplication with
                  alias preservation for ATS matching
                </div>
                <div>
                  <strong>Impact:</strong> Better job compatibility analysis
                  across all industries
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Type Safety */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>3. Type-Safe Full-Stack with tRPC</CardTitle>
              <CardDescription>
                End-to-end type safety from database to UI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
                <code>{`// End-to-end type safety from DB to UI
const trpcClient = api.chat.useSubscription({
  onData: (aiResponse) => {
    // TypeScript knows the exact shape of aiResponse
    // Autocomplete works perfectly here
    console.log(aiResponse.content, aiResponse.metadata);
  },
  onError: (error) => {
    // Proper error handling with typed errors
  }
});`}</code>
              </pre>
              <div className="space-y-2">
                <div>
                  <strong>Developer Experience:</strong> Autocomplete and type
                  checking across the entire stack
                </div>
                <div>
                  <strong>Refactoring confidence:</strong> Change a schema once,
                  get compile-time errors everywhere
                </div>
                <div>
                  <strong>Real-time AI streaming:</strong> With proper error
                  handling and type safety
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Database Design */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            The Database Design: Modeling Complex Career Data
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Complexity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Users → Work History → Achievements → Skills</li>
                  <li>
                    • Job Postings → Required Skills → User Skill Matching
                  </li>
                  <li>• Documents → Generated Content → Version History</li>
                  <li>• Skills → Categories → Industry Mappings</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimizations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Batch operations for resume imports</li>
                  <li>• Intelligent skill deduplication algorithms</li>
                  <li>• Optimized compatibility scoring queries</li>
                  <li>• Efficient many-to-many relationship handling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Real-World Features */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Real-World Features That Showcase the Architecture
          </h2>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Conversational Resume Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Users can chat naturally: &quot;Add my job at Tech Corp where
                  I built React apps and led a team of 5 developers.&quot;
                </p>
                <ul className="space-y-2">
                  <li>
                    • AI extracts structured data and updates profile
                    automatically
                  </li>
                  <li>
                    • Context-aware follow-up questions for missing details
                  </li>
                  <li>• Intelligent merging with existing work history</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Job Compatibility Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Upload a job posting and get instant analysis of how well your
                  profile matches.
                </p>
                <ul className="space-y-2">
                  <li>• AI extracts requirements from job descriptions</li>
                  <li>• Real-time skill matching with gap analysis</li>
                  <li>
                    • Tailored resume generation highlighting relevant
                    experience
                  </li>
                  <li>• Compatibility scoring across multiple dimensions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Achievement Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Intelligent organization and optimization of career
                  achievements.
                </p>
                <ul className="space-y-2">
                  <li>• AI-powered merging of similar achievements</li>
                  <li>• Smart categorization and impact quantification</li>
                  <li>• Batch editing with transaction safety</li>
                  <li>• Context-aware achievement suggestions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Development Experience */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Development Experience & Lessons Learned
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  What Worked Brilliantly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    • <strong>tRPC + Prisma:</strong> Incredible developer
                    velocity
                  </li>
                  <li>
                    • <strong>LangChain + TypeScript:</strong> Complex AI
                    workflows with type safety
                  </li>
                  <li>
                    • <strong>Next.js App Router:</strong> Server components +
                    client interactions
                  </li>
                  <li>
                    • <strong>Comprehensive docs:</strong> Every feature
                    documented for AI and humans
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">
                  Challenges & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    • <strong>AI unpredictability:</strong> Extensive error
                    handling and fallbacks
                  </li>
                  <li>
                    • <strong>Complex state management:</strong> LangGraph for
                    agent orchestration
                  </li>
                  <li>
                    • <strong>Performance at scale:</strong> Batch operations
                    and intelligent caching
                  </li>
                  <li>
                    • <strong>Multi-industry support:</strong> Flexible skill
                    categorization system
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Code Organization</CardTitle>
              <CardDescription>
                How I structured a complex AI application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  • Feature-based router organization (26KB+ files → focused
                  modules)
                </li>
                <li>• Shared types and utilities across agents</li>
                <li>• Comprehensive tooling infrastructure</li>
                <li>• Clear separation between AI logic and business logic</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Impact */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            The Impact: Real Developer and User Value
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>For Users</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    • <strong>10x faster</strong> resume creation
                  </li>
                  <li>
                    • <strong>95% ATS compatibility</strong> across major
                    systems
                  </li>
                  <li>
                    • <strong>Intelligent job matching</strong> across 50+
                    industries
                  </li>
                  <li>
                    • <strong>Conversational interface</strong> that understands
                    context
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    • <strong>Type-safe full-stack</strong> development patterns
                  </li>
                  <li>
                    • <strong>AI-first architecture</strong> examples and best
                    practices
                  </li>
                  <li>
                    • <strong>Comprehensive feature docs</strong> for rapid
                    onboarding
                  </li>
                  <li>
                    • <strong>Scalable agent patterns</strong> for complex
                    workflows
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Looking Forward */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Looking Forward: What&apos;s Next
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Technical Evolution</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Enhanced AI reasoning capabilities</li>
                  <li>• Multi-modal document processing</li>
                  <li>• Advanced analytics and career insights</li>
                  <li>• Real-time collaboration features</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Open Source Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Extracting reusable AI agent patterns</li>
                  <li>• Sharing skill normalization algorithms</li>
                  <li>• Community-driven feature development</li>
                  <li>• Educational resources for AI-first development</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            Conclusion: Building AI-First Applications
          </h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-inside list-decimal space-y-3">
                <li>
                  <strong>Modern TypeScript tooling</strong> enables rapid AI
                  application development
                </li>
                <li>
                  <strong>Agent-based architectures</strong> provide flexible
                  and maintainable AI systems
                </li>
                <li>
                  <strong>End-to-end type safety</strong> is crucial for complex
                  AI workflows
                </li>
                <li>
                  <strong>Comprehensive documentation</strong> amplifies both AI
                  and human developer productivity
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>For Fellow Developers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The future is AI-first applications built with traditional web
                development patterns. TypeScript and modern tooling make complex
                AI systems approachable, while focusing on real user problems
                ensures we&apos;re building something valuable.
              </p>
              <p>
                The key is to start with the user problem, then let modern tools
                handle the complexity. CareerCraft Studio proves that individual
                developers can build sophisticated AI applications that compete
                with well-funded startups.
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="mb-6 text-lg">
              Want to see CareerCraft Studio in action or dive deeper into the
              technical implementation?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link
                  href="https://careercraft.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try CareerCraft Studio
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Discuss the Architecture</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
