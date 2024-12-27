import { auth } from "@clerk/nextjs/server";
import DiscordClone from "../dashboard/page";
import Image from "next/image";

export default async function Home() {
  const { userId } = await auth();
  return (
    <div className="flex items-center justify-center w-full h-screen relative">
      {userId ? (
        <div className="text-center w-full">
          <DiscordClone />
        </div>
      ) : (
        <div className="text-center relative w-full h-full">
          <Image
            src="/landingImg.jpg"
            alt="Discord Logo"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 flex flex-col items-center justify-around h-full bg-black/30">
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">Welcome Guest</h1>
            <p className="text-2xl text-white drop-shadow-lg mt-80 mb-40 leading-loose">Join our community and start chatting with other users! <br></br> Sign in to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
}
