import { useEffect, useRef } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { format } from 'date-fns';

import ChatMessage from './chat-message';
import { Loader2 } from 'lucide-react';

interface ChatMessagesProps {
  channelId: string;
}

const ChatMessages = ({ channelId }: ChatMessagesProps) => {
  const { user } = useUser();
  const messages = useQuery(api.messages.list, { channelId });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  if (!messages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {messages?.map((message) => (
        <ChatMessage
          key={message._id}
          id={message._id}
          currentUser={user?.id === message.userId}
          content={message.content}
          fileUrl={message.fileUrl}
          timestamp={format(new Date(message._creationTime), 'HH:mm')}
        />
      ))}
    </div>
  );
};

export default ChatMessages;