import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  handler: async (ctx) => {
    return ctx.db.query('servers').collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const server = await ctx.db.insert('servers', {
      name: args.name,
      imageUrl: args.imageUrl,
      inviteCode: Math.random().toString(36).slice(2, 8),
      ownerId: args.userId,
      members: [{
        userId: args.userId,
        role: 'ADMIN',
      }],
    });

    await ctx.db.insert('channels', {
      name: 'general',
      type: 'TEXT',
      serverId: server,
    });

    return server;
  },
});