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
import { Download, Printer, Loader2 } from "lucide-react";
import type { Resume } from "~/types/resume";
import { Suspense, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTheme } from "next-themes";

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
  const { theme, resolvedTheme } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleResumeChange = (value: string) => {
    router.push(`/cv?id=${value}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Find the resume container element
      const resumeElement = document.getElementById("resume-container")!;
      if (!resumeElement) {
        throw new Error("Resume element not found");
      }

      // Get the current resume data to use in the filename
      const currentResume = resumes.find((r) => r.id === currentResumeId);
      const resumeTitle = "Cory Sougstad-" + (currentResume?.title ?? "Resume");
      const filename = `${resumeTitle.replace(/\s+/g, "_")}.pdf`;

      // Create canvas from the resume element
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
        backgroundColor: resolvedTheme === "dark" ? "#17171c" : "#f7f5f2", // Ensure white background
      });

      // Calculate dimensions for PDF (A4 format)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");

      // Add image to PDF
      let position = 0;
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
      );

      // If the resume is longer than one page, add additional pages
      let heightLeft = imgHeight - pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-x-4 gap-y-2 md:flex-row print:hidden">
      <div className="">
        <span className="">I wear many hats, choose one:</span>
      </div>
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
        <Button
          variant="default"
          size="sm"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
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
