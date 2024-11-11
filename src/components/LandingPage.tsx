import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Discord Clone</h1>
      <div className="max-w-2xl text-center space-y-4 mb-8">
        <p className="text-lg text-muted-foreground">
          A modern communication platform where you can create servers, chat with friends,
          and build communities. Experience real-time messaging, voice chat, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Create Communities</h3>
            <p className="text-muted-foreground">
              Build and manage your own servers with customizable channels and roles.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
            <p className="text-muted-foreground">
              Engage in instant messaging with text, voice, and media sharing capabilities.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Link to="/(navigation)/signin">
          <Button size="lg">Sign In</Button>
        </Link>
        <Link to="/(navigation)/signup">
          <Button size="lg" variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
