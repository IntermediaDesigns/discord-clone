// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_userId", ["userId"]),

  servers: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    inviteCode: v.string(),
    profileId: v.id("profiles"),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_profileId", ["profileId"]),

  members: defineTable({
    role: v.string(),
    profileId: v.id("profiles"),
    serverId: v.id("servers"),
  }).index("by_profileId", ["profileId"])
    .index("by_serverId", ["serverId"]),

  channels: defineTable({
    name: v.string(),
    type: v.string(),
    profileId: v.id("profiles"),
    serverId: v.id("servers"),
    createdAt: v.string(),
  }).index("by_serverId", ["serverId"]),

  messages: defineTable({
    content: v.string(),
    fileUrl: v.optional(v.string()),
    memberId: v.id("members"),
    channelId: v.id("channels"),
    deleted: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_channelId", ["channelId"])
    .index("by_memberId", ["memberId"]),

  directMessages: defineTable({
    content: v.string(),
    fileUrl: v.optional(v.string()),
    memberId: v.id("members"),
    conversationId: v.id("conversations"),
    deleted: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_conversationId", ["conversationId"])
    .index("by_memberId", ["memberId"]),

  conversations: defineTable({
    memberOneId: v.id("members"),
    memberTwoId: v.id("members"),
    createdAt: v.string(),
  }).index("by_members", ["memberOneId", "memberTwoId"]),

  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
}, { schemaValidation: true });
