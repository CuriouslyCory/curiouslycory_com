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

      // Create PDF (A4 format)
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 10; // Margin in mm
      const contentWidth = pageWidth - 2 * margin;

      // Always use white background for PDF regardless of theme
      const backgroundColor = "#ffffff";

      // Prepare the resume for PDF generation by adding temporary classes
      const sections = resumeElement.querySelectorAll(".resume-content > div");
      if (!sections || sections.length === 0) {
        throw new Error("Resume sections not found");
      }

      // Track our position on the page
      let yPosition = margin;
      let currentPage = 1;

      // Process each section
      for (const section of Array.from(sections)) {
        const sectionElement = section as HTMLElement;

        // Create a clone of the section to avoid modifying the original
        const sectionClone = sectionElement.cloneNode(true) as HTMLElement;

        // Force all text to be black for PDF except for specific elements
        const allTextElements = sectionClone.querySelectorAll(
          "p, span, div, h1, h2, h3, h4, h5, h6",
        );
        allTextElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            // Preserve orange elements but make everything else black
            if (
              !el.classList.contains("text-orange-600") &&
              !(
                el.classList.contains("font-oswald") &&
                el.classList.contains("font-semibold")
              )
            ) {
              el.style.color = "#000000";
            } else {
              el.style.color = "#c25000"; // Use print-friendly orange
            }
          }
        });

        // Style links for PDF
        const links = sectionClone.querySelectorAll("a");
        links.forEach((link) => {
          if (link instanceof HTMLElement) {
            link.style.color = "#000000";
          }
        });

        // Create a temporary container with the same styling as the resume
        const tempContainer = document.createElement("div");
        tempContainer.style.width = `${contentWidth}mm`;
        tempContainer.style.backgroundColor = backgroundColor;
        tempContainer.style.color = "#000000"; // Force black text color
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.padding = "10px";
        tempContainer.style.fontFamily =
          window.getComputedStyle(sectionElement).fontFamily;
        tempContainer.style.fontSize =
          window.getComputedStyle(sectionElement).fontSize;
        tempContainer.appendChild(sectionClone);
        document.body.appendChild(tempContainer);

        // Capture this section as canvas
        const canvas = await html2canvas(tempContainer, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: backgroundColor,
        });

        // Remove the temporary container
        document.body.removeChild(tempContainer);

        // Calculate dimensions for this section
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if this section fits on the current page
        if (yPosition + imgHeight > pageHeight - margin) {
          // This section doesn't fit, add a new page
          pdf.addPage();
          currentPage++;
          yPosition = margin;
        }

        // Add the section to the PDF
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          margin,
          yPosition,
          imgWidth,
          imgHeight,
        );

        // Update position for next section
        yPosition += imgHeight; // Add more spacing between sections
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
