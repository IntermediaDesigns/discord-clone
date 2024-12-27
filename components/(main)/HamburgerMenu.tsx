"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HamburgerMenuProps {
  className?: string;
}

const HamburgerMenu = ({ className }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="p-2 hover:bg-[#4B3480] hover:text-white dark:hover:bg-[#7B4DFF] rounded-full flex items-center justify-center  dark:text-white transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar Menu */}
      {isOpen && (
        <div className="absolute left-16 top-0 w-48 bg-white dark:bg-[#1A0B2E] rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 text-[#313338] dark:text-white font-semibold text-lg border-b border-[#e3e5e8] dark:border-[#392766]">
            Menu
          </div>
          <div className="px-2 py-1">
            <button className="w-full text-left px-2 py-2 text-[#6a6f77] dark:text-[#1A0B2E] hover:bg-[#B8A7D9]  hover:text-[#1A0B2E] dark:hover:bg-[#4B3480] rounded transition-colors">
              Server Settings
            </button>
            <button className="w-full text-left px-2 py-2 text-[#6a6f77] dark:text-[#1A0B2E] hover:bg-[#B8A7D9] hover:text-[#1A0B2E] dark:hover:bg-[#4B3480] rounded transition-colors">
              Create Server
            </button>
            <button className="w-full text-left px-2 py-2 text-[#6a6f77] dark:text-[#1A0B2E] hover:bg-[#B8A7D9] hover:text-[#1A0B2E] dark:hover:bg-[#4B3480] rounded transition-colors">
              Join Server
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
