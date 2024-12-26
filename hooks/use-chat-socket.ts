import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member, Message, Profile } from "@/types";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatSocketProps {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(addKey, (message: Message & { member: Member & { profile: Profile } }) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = {...oldData, pages: [...oldData.pages]};
        newData.pages[0] = {
          ...newData.pages[0],
          items: [message, ...newData.pages[0].items]
        };

        return newData;
      });
    });

    socket.on(updateKey, (message: Message & { member: Member & { profile: Profile } }) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = {...oldData, pages: oldData.pages.map((page: any) => ({
          ...page,
          items: page.items.map((item: Message) => {
            if (item.id === message.id) {
              return message;
            }
            return item;
          })
        }))};

        return newData;
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    }
  }, [queryClient, addKey, queryKey, socket, updateKey]);
}