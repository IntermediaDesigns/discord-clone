import { Hash, Mic, Video, Plus, Settings } from "lucide-react";
import { Channel, ChannelType, ServerWithMembersWithProfiles } from "../../types";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSidebarProps {
  server: ServerWithMembersWithProfiles;
}

export const ChannelSidebar = ({ server }: ServerSidebarProps) => {
  const { onOpen } = useModal();

  // Group channels by type
  const textChannels: Channel[] = server.channels.filter(
    (channel: Channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels: Channel[] = server.channels.filter(
    (channel: Channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels: Channel[] = server.channels.filter(
    (channel: Channel) => channel.type === ChannelType.VIDEO
  );

  interface Member {
    profileId: string;
    role: string;
  }

  const isAdmin: boolean = !!server.members.find(
    (member: Member) => member.profileId === "currentUserId" && member.role === "ADMIN"
  );

  return (
    <div className="flex flex-col h-full w-full dark:bg-gray-800 bg-gray-100">
      <div className="p-3 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold dark:text-white">
            {server.name}
          </h2>
          {isAdmin && (
            <button
              onClick={() => onOpen("editServer")}
              title="Edit Server"
              aria-label="Edit Server"
            >
              <Settings className="w-4 h-4 dark:text-gray-400 hover:dark:text-white transition" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Text Channels */}
        <div className="p-2">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-xs uppercase font-semibold dark:text-gray-400">
              Text Channels
            </h3>
            {isAdmin && (
              <button
                onClick={() => onOpen("createChannel")}
                className="dark:text-gray-400 hover:dark:text-white"
                title="Create Channel"
                aria-label="Create Channel"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          {textChannels.map(
            (channel: { id: string; name: string; type: ChannelType }) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                icon={<Hash className="w-5 h-5" />}
              />
            )
          )}
        </div>

        {/* Audio Channels */}
        <div className="p-2">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-xs uppercase font-semibold dark:text-gray-400">
              Voice Channels
            </h3>
            {isAdmin && (
              <button
                onClick={() => onOpen("createChannel")}
                className="dark:text-gray-400 hover:dark:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          {audioChannels.map(
            (channel: { id: string; name: string; type: ChannelType }) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                icon={<Mic className="w-5 h-5" />}
              />
            )
          )}
        </div>

        {/* Video Channels */}
        <div className="p-2">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-xs uppercase font-semibold dark:text-gray-400">
              Video Channels
            </h3>
            {isAdmin && (
              <button
                onClick={() => onOpen("createChannel")}
                className="dark:text-gray-400 hover:dark:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          {videoChannels.map(
            (channel: { id: string; name: string; type: ChannelType }) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                icon={<Video className="w-5 h-5" />}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

interface ChannelItemProps {
  channel: {
    id: string;
    name: string;
    type: ChannelType;
  };
  icon: React.ReactNode;
}

const ChannelItem = ({ channel, icon }: ChannelItemProps) => {
  return (
    <div className="flex items-center p-2 rounded hover:bg-gray-700/10 dark:hover:bg-gray-700 cursor-pointer group">
      {icon}
      <span className="ml-2 dark:text-gray-300">{channel.name}</span>
      <button
        className="opacity-0 group-hover:opacity-100 hover:dark:text-white"
        title="Channel Settings"
        aria-label="Channel Settings"
      >
        <Settings className="w-4 h-4" />
        <span className="sr-only">Channel Settings</span>
      </button>
    </div>
  );
};
