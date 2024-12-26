import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    serverId: v.id("servers"),
    profileId: v.id("profiles"),
  },
  handler: async (ctx, args) => {
    const channel = await ctx.db.insert("channels", {
      name: args.name,
      type: args.type,
      serverId: args.serverId,
      profileId: args.profileId,
      createdAt: new Date().toISOString(),
    });

    return channel;
  },
});

export const update = mutation({
  args: {
    id: v.id("channels"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const channel = await ctx.db.get(args.id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    const updatedChannel = await ctx.db.patch(args.id, {
      name: args.name,
    });

    return updatedChannel;
  },
});

export const remove = mutation({
  args: {
    id: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const channel = await ctx.db.get(args.id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    await ctx.db.delete(args.id);
    return channel;
  },
});

export const getChannels = query({
  args: {
    serverId: v.id("servers"),
  },
  handler: async (ctx, args) => {
    const channels = await ctx.db
      .query("channels")
      .filter((q) => q.eq(q.field("serverId"), args.serverId))
      .collect();

    return channels;
  },
});