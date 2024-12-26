import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function NavBar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="w-full border-b">
      <div className="flex justify-between p-4">
        <div className="flex-start">
          <h1 className="text-2xl font-bold">Discord Clone</h1>
        </div>
        <div className="space-x-4">
          {!isSignedIn && (
            <>
              <Button variant="ghost">
                <SignInButton />
              </Button>
              <Button variant="ghost">
                <SignUpButton />
              </Button>
            </>
          )}
          {isSignedIn && <SignOutButton />}
        </div>
      </div>
    </nav>
  );
}
