"use client";

import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../theme-provider";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const { isSignedIn, user } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-[#392766] bg-white dark:bg-[#0E061A]">
      <div className="flex justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src="/logo.png" alt="Discord Logo" width={70} height={70} />
          </Link>
          <h1 className="text-2xl font-bold text-[#1A0B2E] dark:text-white">
            Discord Clone
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          <div
            onClick={toggleTheme}
            className="border-[#B8A7D9] dark:border-[#392766] border rounded-md p-1.5 cursor-pointer hover:bg-[#392766] hover:text-[#B8A7D9] dark:hover:bg-[#4B3480] dark:text-[#B8A7D9] dark:hover:text-white transition-colors"
          >
            {theme === "light" ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            )}
          </div>
          {!isSignedIn && (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-gray-700 hover:text-gray-900 hover:bg-[#B8A7D9] dark:text-[#B8A7D9] dark:hover:text-white dark:hover:bg-[#4B3480]"
              >
                <SignInButton mode="modal">Sign In</SignInButton>
              </Button>
              <Button
                asChild
                className="bg-[#7B4DFF] hover:bg-[#9E7DFF] text-white transition-colors"
              >
                <SignUpButton mode="modal">Sign Up</SignUpButton>
              </Button>
            </>
          )}
          {isSignedIn && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-[#B8A7D9]">
                  {user?.username|| user?.fullName}
                </span>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
