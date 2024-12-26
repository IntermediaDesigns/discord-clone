import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const send = mutation({
  args: {
    content: v.string(),
    fileUrl: v.optional(v.string()),
    channelId: v.id("channels"),
    memberId: v.id("members"),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.insert("messages", {
      content: args.content,
      fileUrl: args.fileUrl,
      channelId: args.channelId,
      memberId: args.memberId,
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return message;
  },
});

export const update = mutation({
  args: {
    id: v.id("messages"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.id);

    if (!message) {
      throw new Error("Message not found");
    }

    const updatedMessage = await ctx.db.patch(args.id, {
      content: args.content,
      updatedAt: new Date().toISOString(),
    });

    return updatedMessage;
  },
});

export const remove = mutation({
  args: {
    id: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.id);

    if (!message) {
      throw new Error("Message not found");
    }

    // Soft delete the message
    const deletedMessage = await ctx.db.patch(args.id, {
      deleted: true,
      content: "This message has been deleted.",
      fileUrl: undefined,
      updatedAt: new Date().toISOString(),
    });

    return deletedMessage;
  },
});

export const getMessages = query({
  args: {
    channelId: v.id("channels"),
    cursor: v.optional(v.id("messages")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("channelId"), args.channelId))
      .order("desc")
      .filter((q) => args.cursor ? q.lt(q.field("_id"), args.cursor) : true)
      .take(limit);

    let nextCursor = null;
    if (messages.length === limit) {
      nextCursor = messages[messages.length - 1]._id;
    }

    // Get member details for each message
    const messagesWithMembers = await Promise.all(
      messages.map(async (message: Doc<"messages">) => {
        const member = await ctx.db.get(message.memberId);

        if (!member) {
          throw new Error("Member not found");
        }

        // Get profile for member
        const profile = await ctx.db.get((member as Doc<"members">).profileId);

        if (!profile) {
          throw new Error("Profile not found");
        }

        return {
          ...message,
          member: {
            ...member,
            profile,
          },
        };
      })
    );

    return {
      items: messagesWithMembers,
      nextCursor,
    };
  },
});

export const getDirectMessages = query({
  args: {
    conversationId: v.id("conversations"),
    cursor: v.optional(v.id("directMessages")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const messages = await ctx.db
      .query("directMessages")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .order("desc")
      .filter((q) => args.cursor ? q.lt(q.field("_id"), args.cursor) : true)
      .take(limit);

    let nextCursor = null;
    if (messages.length === limit) {
      nextCursor = messages[messages.length - 1]._id;
    }

    // Get member details for each message
    const messagesWithMembers = await Promise.all(
      messages.map(async (message: Doc<"directMessages">) => {
        const member = await ctx.db.get(message.memberId);

        if (!member) {
          throw new Error("Member not found");
        }

        // Get profile for member
        const profile = await ctx.db.get((member as Doc<"members">).profileId);

        if (!profile) {
          throw new Error("Profile not found");
        }

        return {
          ...message,
          member: {
            ...member,
            profile,
          },
        };
      })
    );

    return {
      items: messagesWithMembers,
      nextCursor,
    };
  },
});