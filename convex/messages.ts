import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {
    channelId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_channel', (q) => q.eq('channelId', args.channelId))
      .order('desc')
      .take(50);

    return messages.reverse();
  },
});

export const send = mutation({
  args: {
    content: v.string(),
    channelId: v.string(),
    userId: v.string(),
    fileUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('messages', {
      content: args.content,
      channelId: args.channelId,
      userId: args.userId,
      fileUrl: args.fileUrl,
    });
  },
});