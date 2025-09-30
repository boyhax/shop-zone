import { query, mutation } from "./_generated/server";

import { v } from "convex/values";

// List all custom components
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customComponents").collect();
  },
});

// Add a new custom component
export const add = mutation({
  args: {
    title: v.string(),
    size: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        image: v.string(),
        link: v.string(),
      })
    ),
    backgroundColor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("customComponents", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update a custom component
export const update = mutation({
  args: {
    id: v.id("customComponents"),
    title: v.string(),
    size: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        image: v.string(),
        link: v.string(),
      })
    ),
    backgroundColor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    return await ctx.db.patch(id, {
      ...rest,
      updatedAt: Date.now(),
    });
  },
});

// Delete a custom component
export const remove = mutation({
  args: { id: v.id("customComponents") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
