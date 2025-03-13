"use client";

import { useSearchParams } from "next/navigation";
import { resumes } from "~/data/resume-data";
import type { Resume, Job } from "~/types/resume";
import { ExternalLink } from "lucide-react";
import { Suspense } from "react";

interface ResumeDisplayProps {
  defaultResume: Resume;
}

// Create a client component that uses the search params
function ResumeContent({ defaultResume }: ResumeDisplayProps) {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  // Find the selected resume or use the default
  const selectedResume = resumeId
    ? (resumes.find((r) => r.id === resumeId) ?? defaultResume)
    : defaultResume;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <h1 className="resume-section-title text-4xl font-bold">
            {selectedResume.name}
          </h1>
          <div className="mt-1 text-gray-600 dark:text-gray-300">
            {selectedResume.titles.map((title, index) => (
              <div key={index}>{title}</div>
            ))}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:text-right">
          <div className="text-gray-600 dark:text-gray-300">
            {selectedResume.email}
          </div>
          {selectedResume.links.map((link, index) => (
            <div key={index} className="flex items-center gap-1 md:justify-end">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-500 hover:underline"
              >
                {link.text}
              </a>
              <ExternalLink className="h-3 w-3 flex-shrink-0 text-blue-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <h2 className="resume-section-title">Professional Summary</h2>
        <div className="space-y-2">
          <p>
            <span className="font-oswald font-semibold text-orange-600">
              {selectedResume.highlightedTitle}
            </span>
            {" " + selectedResume.summary}
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <div className="space-y-8">
        {selectedResume.experience.map((job, index) => (
          <JobSection key={index} job={job} />
        ))}
      </div>

      {/* Skills Section - Optional */}
      {selectedResume.skills && (
        <div>
          <h2 className="resume-section-title">Skills</h2>
          <div className="space-y-3">
            {selectedResume.skills.map((skillCategory, index) => (
              <div key={index}>
                {skillCategory.length > 0 && (
                  <div className="">
                    <span className="mr-2 font-oswald font-semibold text-orange-600">
                      {skillCategory[0]}:
                    </span>
                    <span>{skillCategory.slice(1).join(", ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Continuous Learning - Optional */}
      {selectedResume.education && (
        <div>
          <h2 className="resume-section-title">
            Education & Continuous Learning
          </h2>
          <ul className="space-y-3">
            {selectedResume.education.map((item, index) => (
              <li key={index} className="flex">
                <span className="mr-2">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Achievements - Optional */}
      {selectedResume.keyAchievements && (
        <div>
          <h2 className="resume-section-title">Key Achievements</h2>
          <ul className="space-y-3">
            {selectedResume.keyAchievements.map((achievement, index) => (
              <li key={index} className="flex">
                <span className="mr-2">→</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Simple loading state that shows the default resume while loading
function ResumeLoading({ defaultResume }: ResumeDisplayProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <h1 className="resume-section-title text-4xl font-bold">
            {defaultResume.name}
          </h1>
          <div className="mt-1 text-gray-600 dark:text-gray-300">
            {defaultResume.titles.map((title, index) => (
              <div key={index}>{title}</div>
            ))}
          </div>
        </div>
        {/* Simplified loading state */}
      </div>
      <div className="text-center text-gray-500">Loading resume...</div>
    </div>
  );
}

function JobSection({ job }: { job: Job }) {
  return (
    <div>
      <h2 className="resume-section-title">{job.title}</h2>
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="font-semibold">{job.company}</div>
        <div className="text-gray-600 dark:text-gray-300">{job.period}</div>
      </div>
      <div className="mb-3 font-oswald font-semibold text-orange-600">
        Responsibilities and Accomplishments
      </div>
      <ul className="mb-4 space-y-1">
        {job.accomplishments.map((item, index) => (
          <li key={index} className="flex">
            <span className="mr-2">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div>
        <span className="font-oswald font-semibold text-orange-600">
          Tech Stack:{" "}
        </span>
        <span>{job.techStack}</span>
      </div>
    </div>
  );
}

// Main component that wraps the client component with Suspense
export default function ResumeDisplay({ defaultResume }: ResumeDisplayProps) {
  return (
    <Suspense fallback={<ResumeLoading defaultResume={defaultResume} />}>
      <ResumeContent defaultResume={defaultResume} />
    </Suspense>
  );
}
