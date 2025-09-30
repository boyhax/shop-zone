import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    category: v.string(),
    img: v.string(),
    price: v.number(),
    rating: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_category", ["category"]),

  customComponents: defineTable({
    title: v.string(),
    size: v.string(),
    items: v.array(v.object({
      name: v.string(),
      image: v.string(),
      link: v.string(),
    })),
    backgroundColor: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  cartItems: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),
});
