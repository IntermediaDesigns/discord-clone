"use client";

import {
  SignOutButton,
  useUser,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../theme-provider";

export default function NavBar() {
  const { isSignedIn } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full border-b dark:border-neutral-700">
      <div className="flex justify-between p-4">
        <div className="flex-start">
          <h1 className="text-2xl font-bold dark:text-white">Discord Clone</h1>
        </div>
        <div className="flex space-x-2 items-center">
          <div 
            onClick={toggleTheme}
            className="border-gray-300 dark:border-neutral-700 border rounded-md p-1 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors dark:text-white"
          >
            {theme === 'light' ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            )}
          </div>
          {!isSignedIn && (
            <>
              <Button asChild variant="ghost" className="dark:text-white dark:hover:bg-neutral-800">
                <SignInButton mode="modal">Sign In</SignInButton>
              </Button>
              <Button asChild variant="ghost" className="dark:text-white dark:hover:bg-neutral-800">
                <SignUpButton mode="modal">Sign Up</SignUpButton>
              </Button>
            </>
          )}
          {isSignedIn && (
            <Button asChild variant="ghost" className="dark:text-white dark:hover:bg-neutral-800">
              <SignOutButton redirectUrl="/">Sign Out</SignOutButton>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
