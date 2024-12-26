import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn appearance={{
        elements: {
          card: "bg-discord-dark",
          formButtonPrimary: "bg-discord-primary hover:bg-discord-primary/90",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          formFieldLabel: "text-gray-200",
          formFieldInput: "bg-discord-darker text-white border-gray-700",
          footerActionLink: "text-discord-primary hover:text-discord-primary/90"
        }
      }} />
    </div>
  );
}