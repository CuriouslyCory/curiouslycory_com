import { Raleway } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import "~/styles/globals.css";
import { Navigation } from "./_components/navigation";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "./_components/theme-provider";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CuriouslyCory's Personal Website",
  description: "The developer and personal website of CuriouslyCory",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`font-sans ${raleway.variable}`}>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="container mx-auto flex-grow px-4 py-8">
                {children}
              </main>
              <footer className="bg-secondary py-4">
                <div className="container mx-auto text-center text-sm">
                  © {new Date().getFullYear()} Your Name. All rights reserved.
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
