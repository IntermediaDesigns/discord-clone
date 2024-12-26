import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "./providers/theme-provider";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Discord clone with real-time chat and video functionality",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
        >
          <ClerkProvider
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: '#7289da'
              }
            }}
            publishableKey={publishableKey}
          >
            <div className="h-full">
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
              </div>
            </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
