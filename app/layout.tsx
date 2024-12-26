import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "../ConvexClientProvider";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/(main)/NavBar";
import { ThemeProvider } from "../components/theme-provider";

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "A Discord clone built with Next.js and Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <ClerkProvider>
            <ConvexClientProvider>
              <NavBar />
              <main>{children}</main>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
