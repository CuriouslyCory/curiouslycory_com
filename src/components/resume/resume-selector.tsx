"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Resume } from "~/types/resume";
import { Suspense } from "react";

interface ResumeSelectorProps {
  resumes: Resume[];
  defaultResumeId: string;
}

function ResumeSelectorComponent({
  resumes,
  defaultResumeId,
}: ResumeSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentResumeId = searchParams.get("id") ?? defaultResumeId;

  const handleResumeChange = (value: string) => {
    router.push(`/cv?id=${value}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 print:hidden">
      {/* Mobile Select Menu */}
      <div className="flex w-full flex-col items-center gap-4 md:hidden">
        <span>I wear many hats, choose one:</span>
        <Select value={currentResumeId} onValueChange={handleResumeChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a resume" />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                <div className="flex items-center gap-2">
                  <span>{resume.icon}</span>
                  <span>{resume.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Card Grid */}
      <div className="hidden w-full max-w-4xl grid-cols-2 gap-4 md:grid lg:grid-cols-4">
        {resumes.map((resume) => (
          <button
            key={resume.id}
            onClick={() => handleResumeChange(resume.id)}
            className={`flex flex-col items-center justify-center gap-4 rounded-lg border p-6 text-center transition-all hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20 ${
              currentResumeId === resume.id
                ? "border-orange-600 bg-orange-50 dark:bg-orange-950/20"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
            }`}
          >
            <div className="text-4xl text-orange-600">{resume.icon}</div>
            <div className="text-lg font-semibold">{resume.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {resume.titles[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ResumeSelector({
  resumes,
  defaultResumeId,
}: ResumeSelectorProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeSelectorComponent
        resumes={resumes}
        defaultResumeId={defaultResumeId}
      />
    </Suspense>
  );
}
