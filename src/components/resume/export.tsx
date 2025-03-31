import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";
import { type Resume } from "~/types/resume";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function DownloadButton({ selectedResume }: { selectedResume: Resume }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const handleDownload = async () => {
    try {
      setIsGenerating(true);

      // Find the resume container element
      const resumeElement = document.getElementById("resume-container")!;
      if (!resumeElement) {
        throw new Error("Resume element not found");
      }

      // Get the current resume data to use in the filename
      const resumeTitle =
        "Cory Sougstad-" + (selectedResume?.title ?? "Resume");
      const filename = `${resumeTitle.replace(/\s+/g, "_")}.pdf`;

      // Create PDF (A4 format)
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 10; // Margin in mm
      const contentWidth = pageWidth - 2 * margin;

      // Always use white background for PDF regardless of theme
      const backgroundColor = "#f7f5f2";

      // Prepare the resume for PDF generation by adding temporary classes
      const sections = resumeElement.querySelectorAll(".resume-content > div");
      if (!sections || sections.length === 0) {
        throw new Error("Resume sections not found");
      }

      // Track our position on the page
      let yPosition = margin;
      let currentPage = 1;

      pdf.setFillColor(247, 245, 242);
      pdf.rect(0, yPosition - margin, pageWidth, pageHeight, "F");

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

        // Hide all external link icons
        const allExternalLinkIcons =
          sectionClone.querySelectorAll(".ext-link-icon");
        allExternalLinkIcons.forEach((icon) => {
          if (icon instanceof SVGElement) {
            icon.style.display = "none";
          } else {
            console.log("icon", icon);
          }
        });

        const allOswaldAlignments =
          sectionClone.querySelectorAll(".oswald-align");
        allOswaldAlignments.forEach((alignment) => {
          if (alignment instanceof HTMLElement) {
            alignment.style.top = "2px";
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

          pdf.setFillColor(247, 245, 242);
          pdf.rect(0, yPosition - margin, pageWidth, pageHeight, "F");
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
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDownload}
      disabled={isGenerating}
      className="print:hidden"
      title="Download PDF"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
    </Button>
  );
}
