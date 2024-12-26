// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    servers: defineTable({
      name: v.string(),
      imageUrl: v.string(),
      inviteCode: v.string(),
      createdAt: v.string(),
      userId: v.string(),
    }),
    channels: defineTable({
      name: v.string(),
      type: v.string(),
      serverId: v.string(),
      createdAt: v.string(),
    }),
    messages: defineTable({
      content: v.string(),
      fileUrl: v.optional(v.string()),
      userId: v.string(),
      channelId: v.string(),
      createdAt: v.string(),
      updatedAt: v.string(),
    }),
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
