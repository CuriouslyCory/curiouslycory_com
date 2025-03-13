"use client";

import { useSearchParams } from "next/navigation";
import { resumes } from "~/data/resume-data";
import type { Resume, Job } from "~/types/resume";
import { ExternalLink } from "lucide-react";

interface ResumeDisplayProps {
  defaultResume: Resume;
}

export default function ResumeDisplay({ defaultResume }: ResumeDisplayProps) {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  // Find the selected resume or use the default
  const selectedResume = resumeId
    ? (resumes.find((r) => r.id === resumeId) ?? defaultResume)
    : defaultResume;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <h1 className="font-oswald text-3xl font-bold text-gray-800">
            {selectedResume.name}
          </h1>
          <div className="mt-1 text-gray-600">
            {selectedResume.titles.map((title, index) => (
              <div key={index}>{title}</div>
            ))}
          </div>
        </div>
        <div className="mt-4 text-right md:mt-0">
          <div className="text-gray-600">{selectedResume.email}</div>
          {selectedResume.links.map((link, index) => (
            <div key={index} className="flex items-center justify-end gap-1">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.text}
              </a>
              <ExternalLink className="h-3 w-3 text-blue-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <h2 className="mb-4 border-b pb-1 text-2xl font-bold text-gray-800">
          Professional Summary
        </h2>
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
    </div>
  );
}

function JobSection({ job }: { job: Job }) {
  return (
    <div>
      <h2 className="mb-4 border-b pb-1 text-2xl font-bold text-gray-800">
        {job.title}
      </h2>
      <div className="mb-2 flex flex-col justify-between sm:flex-row">
        <div className="font-semibold">{job.company}</div>
        <div className="text-gray-600">{job.period}</div>
      </div>
      <div className="font-oswald mb-3 font-semibold text-orange-600">
        Responsibilities and Accomplishments
      </div>
      <ul className="mb-4 space-y-3">
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
