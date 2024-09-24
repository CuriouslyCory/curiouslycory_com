import { Oswald, Oxygen_Mono, Raleway, Roboto_Serif } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

import { Navigation } from "~/components/navigation";
import { ThemeProvider } from "~/components/theme-provider";
import { PlayerProvider } from "~/components/player/player-provider";

import "~/styles/globals.css";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/sonner";

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

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-serif",
});

export const metadata: Metadata = {
  title: "CuriouslyCory.com",
  description: "CuriouslyCory's Curious Corner of the Internet | Web Developer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground font-sans antialiased",
          raleway.variable,
          oxygenMono.variable,
          oswald.variable,
          robotoSerif.variable,
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PlayerProvider>
              <div className="flex min-h-screen flex-col">
                <Toaster position="bottom-right" richColors />
                <Navigation />
                <main className="">{children}</main>
              </div>
              <footer className="bg-secondary mt-12 py-4">
                <div className="container mx-auto text-center text-sm">
                  © {new Date().getFullYear()} CuriouslyCory. All rights
                  reserved.
                </div>
              </footer>
            </PlayerProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
