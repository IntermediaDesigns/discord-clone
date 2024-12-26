import { Id } from "@/convex/_generated/dataModel";

export enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST",
}

export enum ChannelType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

export interface Profile {
  id: Id<"profiles">;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Server {
  id: Id<"servers">;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: Id<"profiles">;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: Id<"members">;
  role: MemberRole;
  profileId: Id<"profiles">;
  serverId: Id<"servers">;
  profile?: Profile;
}

export interface Channel {
  id: Id<"channels">;
  name: string;
  type: ChannelType;
  profileId: Id<"profiles">;
  serverId: Id<"servers">;
  createdAt: string;
}

export interface Message {
  id: Id<"messages">;
  content: string;
  fileUrl?: string;
  memberId: Id<"members">;
  channelId: Id<"channels">;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  member?: Member;
}

export interface DirectMessage {
  id: Id<"directMessages">;
  content: string;
  fileUrl?: string;
  memberId: Id<"members">;
  conversationId: Id<"conversations">;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  member?: Member;
}

export interface Conversation {
  id: Id<"conversations">;
  memberOneId: Id<"members">;
  memberTwoId: Id<"members">;
  createdAt: string;
}

// Composite Types for UI
export interface ServerWithMembersWithProfiles extends Server {
  members: (Member & {
    profile: Profile;
  })[];
  channels: Channel[];
}

export interface ChannelWithMessages extends Channel {
  messages: (Message & {
    member: Member & {
      profile: Profile;
    };
  })[];
}