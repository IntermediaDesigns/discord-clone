import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  servers: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    inviteCode: v.string(),
    ownerId: v.string(),
    members: v.array(
      v.object({
        userId: v.string(),
        role: v.union(v.literal('ADMIN'), v.literal('MODERATOR'), v.literal('GUEST')),
      })
    ),
  }),
  channels: defineTable({
    name: v.string(),
    type: v.union(v.literal('TEXT'), v.literal('AUDIO'), v.literal('VIDEO')),
    serverId: v.id('servers'),
  }),
  messages: defineTable({
    content: v.string(),
    fileUrl: v.optional(v.string()),
    channelId: v.id('channels'),
    userId: v.string(),
  }).index('by_channel', ['channelId']),
});