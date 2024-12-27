"use client";
import React from "react";
import { useTheme } from "../../../components/theme-provider";
import {
  Hash,
  Settings,
  Plus,
  Users,
  Mic,
  Headphones,
  Sun,
  Moon,
} from "lucide-react";
import HamburgerMenu from "@/components/(main)/HamburgerMenu";

const DiscordClone = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-screen w-full flex">
      {/* Servers Sidebar */}
      <div className="w-16 bg-[#f2f3f5] dark:bg-[#1A0B2E] flex flex-col items-center py-3 space-y-4">
        <div className="w-12 h-12 bg-white  dark:bg-[#2D1B4E] hover:bg-[#4B3480] hover:text-white dark:hover:bg-[#7B4DFF] rounded-full flex items-center justify-center text-[#313338] dark:text-white transition-colors">
          <HamburgerMenu />
        </div>
        <div className="border-b-[#b8a7d980] border-b-2 border w-full"></div>
        {/* Home Button */}
        <div className="w-12 h-12 bg-white dark:bg-[#2D1B4E] hover:bg-[#9E7DFF] dark:hover:bg-[#7B4DFF] rounded-full flex items-center justify-center text-[#313338] dark:text-white transition-colors">
          DC
        </div>

        {/* Server List */}
        <div className="space-y-3">
          <div className="w-12 h-12 bg-white dark:bg-[#2D1B4E] hover:bg-[#9E7DFF] dark:hover:bg-[#7B4DFF] rounded-2xl flex items-center justify-center text-[#313338] dark:text-white transition-colors">
            S1
          </div>
          <div className="w-12 h-12 bg-white dark:bg-[#2D1B4E] hover:bg-[#9E7DFF] dark:hover:bg-[#7B4DFF] rounded-2xl flex items-center justify-center text-[#313338] dark:text-white transition-colors">
            S2
          </div>
          <div className="w-12 h-12 bg-white dark:bg-[#2D1B4E] hover:bg-[#9E7DFF] dark:hover:bg-[#7B4DFF] rounded-2xl flex items-center justify-center text-[#313338] dark:text-white cursor-pointer transition-colors">
            <Plus size={24} />
          </div>
        </div>
      </div>

      {/* Channels Sidebar */}
      <div className="w-60 bg-[#f2f3f5] dark:bg-[#2D1B4E] flex flex-col">
        <div className="p-4 border-b border-[#e3e5e8] dark:border-[#392766]">
          <h2 className="text-[#313338] dark:text-white font-semibold">
            Server Name
          </h2>
        </div>

        {/* Channel List */}
        <div className="flex-1 p-2 space-y-2">
          <div className="text-[#6a6f77] dark:text-[#B8A7D9] flex items-center p-2 hover:bg-[#e3e5e8] dark:hover:bg-[#4B3480] rounded cursor-pointer group">
            <Hash size={20} className="mr-2 group-hover:text-[#7B4DFF]" />
            general
          </div>
          <div className="text-[#6a6f77] dark:text-[#B8A7D9] flex items-center p-2 hover:bg-[#e3e5e8] dark:hover:bg-[#4B3480] rounded cursor-pointer group">
            <Hash size={20} className="mr-2 group-hover:text-[#7B4DFF]" />
            announcements
          </div>
        </div>

        {/* User Info */}
        <div className="p-3 bg-[#ebedef] dark:bg-[#392766] flex items-center">
          <div className="w-8 h-8 bg-white dark:bg-[#2D1B4E] rounded-full mr-2"></div>
          <div className="flex-1">
            <div className="text-[#313338] dark:text-white text-sm">
              Username
            </div>
            <div className="text-[#6a6f77] dark:text-[#7A6B99] text-xs">
              #1234
            </div>
          </div>
          <div className="flex space-x-2">
            <Mic className="w-5 h-5 text-[#6a6f77] dark:text-[#B8A7D9] hover:text-[#313338] dark:hover:text-[#9E7DFF] cursor-pointer" />
            <Headphones className="w-5 h-5 text-[#6a6f77] dark:text-[#B8A7D9] hover:text-[#313338] dark:hover:text-[#9E7DFF] cursor-pointer" />
            <Settings className="w-5 h-5 text-[#6a6f77] dark:text-[#B8A7D9] hover:text-[#313338] dark:hover:text-[#9E7DFF] cursor-pointer" />
            <button
              onClick={toggleTheme}
              className="text-[#6a6f77] dark:text-[#B8A7D9] hover:text-[#313338] dark:hover:text-[#9E7DFF] transition-colors"
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#0E061A]">
        {/* Channel Header */}
        <div className="h-12 border-b border-[#e3e5e8] dark:border-[#392766] flex items-center px-4">
          <Hash size={24} className="text-[#6a6f77] dark:text-[#B8A7D9] mr-2" />
          <span className="text-[#313338] dark:text-white font-semibold">
            general
          </span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-[#e3e5e8] dark:bg-[#2D1B4E] rounded-full mr-3"></div>
            <div>
              <div className="flex items-center">
                <span className="text-[#313338] dark:text-white font-semibold mr-2">
                  User1
                </span>
                <span className="text-[#6a6f77] dark:text-[#7A6B99] text-xs">
                  Today at 12:00 PM
                </span>
              </div>
              <p className="text-[#313338] dark:text-[#B8A7D9]">
                Hello, welcome to the server!
              </p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="bg-[#e3e5e8] dark:bg-[#392766] rounded-lg p-4">
            <input
              type="text"
              placeholder="Message #general"
              className="w-full bg-transparent text-[#313338] dark:text-white outline-none placeholder-[#6a6f77] dark:placeholder-[#7A6B99]"
            />
          </div>
        </div>
      </div>

      {/* Members Sidebar */}
      <div className="w-60 bg-[#f2f3f5] dark:bg-[#2D1B4E] p-4">
        <div className="flex items-center text-[#6a6f77] dark:text-[#B8A7D9] mb-4">
          <Users size={20} className="mr-2" />
          <span>Online - 3</span>
        </div>

        {/* Member List */}
        <div className="space-y-2">
          <div className="flex items-center text-[#313338] dark:text-[#B8A7D9] hover:bg-[#e3e5e8] dark:hover:bg-[#4B3480] p-2 rounded">
            <div className="w-8 h-8 bg-[#e3e5e8] dark:bg-[#392766] rounded-full mr-2"></div>
            <span>User1</span>
          </div>
          <div className="flex items-center text-[#313338] dark:text-[#B8A7D9] hover:bg-[#e3e5e8] dark:hover:bg-[#4B3480] p-2 rounded">
            <div className="w-8 h-8 bg-[#e3e5e8] dark:bg-[#392766] rounded-full mr-2"></div>
            <span>User2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordClone;
