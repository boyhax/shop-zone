import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all products
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

// Get a single product by id
export const get = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Add a new product
export const add = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    img: v.string(),
    price: v.number(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("products", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update a product
export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    category: v.string(),
    img: v.string(),
    price: v.number(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    return await ctx.db.patch(id, {
      ...rest,
      updatedAt: Date.now(),
    });
  },
});

// Delete a product
export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
