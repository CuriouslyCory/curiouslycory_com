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

interface ResumeSelectorProps {
  resumes: Resume[];
  defaultResumeId: string;
}

export default function ResumeSelector({
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
    // In a real implementation, this would generate a PDF
    // For now, we'll just trigger the print dialog
    window.print();
  };

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center print:hidden">
      <div className="w-full sm:w-64">
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
