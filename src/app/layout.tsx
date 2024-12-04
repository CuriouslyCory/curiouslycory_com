import { Oxygen_Mono, Raleway } from "next/font/google";
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

const oxygenMono = Oxygen_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oxygen-mono",
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
      <body
        className={cn(
          "bg-background font-sans text-foreground antialiased",
          raleway.variable,
          oxygenMono.variable,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="mx-auto">{children}</main>
              <footer className="mt-auto bg-secondary py-4">
                <div className="container mx-auto text-center text-sm">
                  © {new Date().getFullYear()} CuriouslyCory. All rights
                  reserved.
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
