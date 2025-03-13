"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Download, Printer } from "lucide-react";
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement PDF Generation & Download
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-2 md:flex-row print:hidden">
      <div className="">
        <Select value={currentResumeId} onValueChange={handleResumeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a resume" />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                {resume.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="default" size="sm" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
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
