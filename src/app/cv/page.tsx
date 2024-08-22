import type { Metadata } from "next";
import ResumeSelector from "~/components/resume/resume-selector";
import ResumeDisplay from "~/components/resume/resume-display";
import { resumes } from "~/data/resume-data";
import "./print-styles.css";

export const metadata: Metadata = {
  title: "CV | CuriouslyCory",
  description: "Professional resume and work experience of CuriouslyCory",
  openGraph: {
    title: "CV | CuriouslyCory",
    description: "Professional resume and work experience of CuriouslyCory",
    url: "https://curiouslycory.com/cv",
    siteName: "CuriouslyCory.com",
    images: [
      {
        url: "/images/cv-og-image.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "CuriouslyCory's Resume/CV",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV | CuriouslyCory",
    description: "Professional resume and work experience of CuriouslyCory",
    images: ["/images/cv-og-image.png"], // Same image as OG
  },
};

export default function CVPage() {
  // Default to the first resume in the list
  const defaultResume = resumes[0]!;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 print:hidden">
        <ResumeSelector resumes={resumes} defaultResumeId={defaultResume.id} />
      </div>
      <div
        id="resume-container"
        className="mx-auto max-w-4xl rounded-lg p-8 shadow-lg dark:border dark:shadow-none lg:p-16 print:border-none print:p-0 print:shadow-none"
      >
        <ResumeDisplay defaultResume={defaultResume} />
      </div>
    </main>
  );
}
