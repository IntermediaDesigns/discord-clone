import { useUser } from '@clerk/clerk-react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/user-avatar';

interface ChatMessageProps {
  id: string;
  content: string;
  fileUrl?: string;
  timestamp: string;
  currentUser: boolean;
}

const ChatMessage = ({
  id,
  content,
  fileUrl,
  timestamp,
  currentUser
}: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();

  const fileType = fileUrl?.split('.').pop();
  const isImage = fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif';
  const isVideo = fileType === 'mp4' || fileType === 'webm';

  return (
    <div className={cn(
      'group flex items-center gap-x-3 py-4 px-4 hover:bg-black/5 transition w-full',
      currentUser && 'justify-end'
    )}>
      {!currentUser && <UserAvatar src={user?.imageUrl} />}
      <div className={cn(
        'flex flex-col max-w-[65%]',
        currentUser && 'items-end'
      )}>
        <div className="flex items-center gap-x-2">
          {!currentUser && <p className="font-semibold text-sm">{user?.fullName}</p>}
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {timestamp}
          </span>
        </div>
        {isImage && (
          <a 
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
          >
            <img
              src={fileUrl}
              alt={content}
              className="object-cover"
            />
          </a>
        )}
        {isVideo && (
          <video
            src={fileUrl}
            controls
            className="relative aspect-video rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
          />
        )}
        <p className={cn(
          'text-sm text-zinc-600 dark:text-zinc-300',
          isEditing && 'hidden'
        )}>
          {content}
        </p>
        {currentUser && (
          <div className="hidden group-hover:flex items-center gap-x-2 absolute -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm p-1">
            <Button
              onClick={() => setIsEditing(true)}
              size="icon"
              variant="ghost"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      {currentUser && <UserAvatar src={user?.imageUrl} />}
    </div>
  );
};

export default ChatMessage;