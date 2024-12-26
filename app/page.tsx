
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {userId ? (
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Discord Clone!</h1>
          <p className="text-xl">You are signed in and ready to chat</p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome Guest</h1>
          <p className="text-xl">Please sign in to start chatting</p>
        </div>
      )}
    </div>
  );
}
