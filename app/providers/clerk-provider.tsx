"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkClientProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: "bg-indigo-500 hover:bg-indigo-600",
          footerActionLink: "text-indigo-500 hover:text-indigo-600"
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}