"use client";

import {
  SignOutButton,
  useUser,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { MoonIcon } from "lucide-react";

export default function NavBar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="w-full border-b">
      <div className="flex justify-between p-4">
        <div className="flex-start">
          <h1 className="text-2xl font-bold">Discord Clone</h1>
        </div>
        <div className="flex space-x-2 items-center">
          <div className="border-gray-300 border rounded-md p-1 cursor-pointer hover:bg-black hover:text-white">
            <MoonIcon className="w-4 h-4 " />
          </div>
          {!isSignedIn && (
            <>
              <Button asChild variant="ghost">
                <SignInButton mode="modal">Sign In</SignInButton>
              </Button>
              <Button asChild variant="ghost">
                <SignUpButton mode="modal">Sign Up</SignUpButton>
              </Button>
            </>
          )}
          {isSignedIn && (
            <Button asChild variant="ghost">
              <SignOutButton redirectUrl="/">Sign Out</SignOutButton>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
