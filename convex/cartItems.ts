import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List cart items for a user
export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("cartItems").filter(q => q.eq(q.field("userId"), args.userId)).collect();
  },
});

// Add or update a cart item
export const addOrUpdate = mutation({
  args: {
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db.query("cartItems")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .filter(q => q.eq(q.field("productId"), args.productId))
      .first();
    if (existing) {
      return await ctx.db.patch(existing._id, {
        quantity: args.quantity,
        updatedAt: now,
      });
    } else {
      return await ctx.db.insert("cartItems", {
        ...args,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

// Remove a cart item
export const remove = mutation({
  args: { id: v.id("cartItems") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Clear all cart items for a user
export const clear = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db.query("cartItems").filter(q => q.eq(q.field("userId"), args.userId)).collect();
    for (const item of items) {
      await ctx.db.delete(item._id);
    }
    return true;
  },
});
