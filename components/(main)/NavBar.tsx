import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="w-full border-b">
      <div className="flex justify-between p-4">
        <div className="flex-start">
          <h1 className="text-2xl font-bold">Discord Clone</h1>
        </div>
        <div className="space-x-4">
          <SignInButton />
          <SignUpButton />
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
}
