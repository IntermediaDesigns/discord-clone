import { v, GenericId } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

const getUser = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("You must be logged in to perform this action");
  }
  return identity;
};

export const create = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    profileId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getUser(ctx);
    const server = await ctx.db.insert("servers", {
      name: args.name,
      profileId: args.profileId as GenericId<"profiles">,
      imageUrl: args.imageUrl,
      inviteCode: generateInviteCode(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Create default general channel
    await ctx.db.insert("channels", {
      name: "general",
      serverId: server,
      type: "TEXT",
      profileId: args.profileId as GenericId<"profiles">,
      createdAt: new Date().toISOString(),
    });

    // Add creator as admin member
    await ctx.db.insert("members", {
      serverId: server,
      profileId: args.profileId as GenericId<"profiles">,
      role: "ADMIN",
    });

    return server;
  },
});

export const update = mutation({
  args: {
    id: v.string(),
    name: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getUser(ctx);
    const server = await ctx.db
      .query("servers")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!server) {
      throw new Error("Server not found");
    }

    const normalizedId = ctx.db.normalizeId("servers", args.id);
    if (!normalizedId) {
      throw new Error("Failed to normalize server ID");
    }
    const updatedServer = await ctx.db.patch(normalizedId, {
      name: args.name,
      imageUrl: args.imageUrl,
      updatedAt: new Date().toISOString(),
    });

    return updatedServer;
  },
});

export const remove = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getUser(ctx);
    const server = await ctx.db
      .query("servers")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();

    if (!server) {
      throw new Error("Server not found");
    }

    // Delete all related data
    const channels = await ctx.db
      .query("channels")
      .filter((q) => q.eq(q.field("serverId"), args.id))
      .collect();

    for (const channel of channels) {
      await ctx.db.delete(channel._id);
    }

    const members = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("serverId"), args.id))
      .collect();

    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    const normalizedId = ctx.db.normalizeId("servers", args.id);
    if (!normalizedId) {
      throw new Error("Failed to normalize server ID");
    }
    await ctx.db.delete(normalizedId);
    return server;
  },
});

export const updateInviteCode = mutation({
  args: {
    serverId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getUser(ctx);
    const server = await ctx.db
      .query("servers")
      .filter((q) => q.eq(q.field("_id"), args.serverId))
      .first();

    if (!server) {
      throw new Error("Server not found");
    }

    const normalizedId = ctx.db.normalizeId("servers", args.serverId);
    if (!normalizedId) {
      throw new Error("Failed to normalize server ID");
    }
    const updatedServer = await ctx.db.patch(normalizedId, {
      inviteCode: generateInviteCode(),
      updatedAt: new Date().toISOString(),
    });

    return updatedServer;
  },
});

export const updateMemberRole = mutation({
  args: {
    memberId: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getUser(ctx);
    const member = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("_id"), args.memberId))
      .first();

    if (!member) {
      throw new Error("Member not found");
    }

    const normalizedMemberId = ctx.db.normalizeId("members", args.memberId);
    if (!normalizedMemberId) {
      throw new Error("Failed to normalize member ID");
    }
    const updatedMember = await ctx.db.patch(normalizedMemberId, {
      role: args.role,
    });

    return updatedMember;
  },
});

export const removeMember = mutation({
  args: {
    memberId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await getUser(ctx);
    const member = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("_id"), args.memberId))
      .first();

    if (!member) {
      throw new Error("Member not found");
    }

    const normalizedMemberId = ctx.db.normalizeId("members", args.memberId);
    if (!normalizedMemberId) {
      throw new Error("Failed to normalize member ID");
    }
    await ctx.db.delete(normalizedMemberId);
    return member;
  },
});

// Helper function to generate invite code
function generateInviteCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
