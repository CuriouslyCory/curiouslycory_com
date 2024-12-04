import { Raleway } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

import { Navigation } from "./_components/navigation";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "./_components/theme-provider";

import "~/styles/globals.css";
import { cn } from "~/lib/utils";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", raleway.variable)}>
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
