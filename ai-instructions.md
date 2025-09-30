## Data Schema (Expected)

### Product
```ts
type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	stock: number;
	categoryIds: string[];
	tagIds: string[];
	variants: Variant[];
};
```

### Variant
```ts
type Variant = {
	id: string;
	productId: string;
	name: string; // e.g., "Size: M", "Color: Red"
	price: number;
	stock: number;
	attributes: Record<string, string>; // e.g., { size: "M", color: "Red" }
};
```

### Category
```ts
type Category = {
	id: string;
	name: string;
	description?: string;
};
```

### Tag
```ts
type Tag = {
	id: string;
	name: string;
};
```

### User
```ts
type User = {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	isAdmin: boolean;
};
```

### Cart
```ts
type CartItem = {
	id: string;
	productId: string;
	variantId?: string;
	quantity: number;
};

type Cart = {
	id: string;
	userId: string;
	items: CartItem[];
};
```

### Order
```ts
type Order = {
	id: string;
	userId: string;
	items: CartItem[];
	total: number;
	status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
	createdAt: string;
	updatedAt: string;
};
```

---
## Main Expected Public Functions & Data Flow

### Public Functions (API/Backend)

#### Product Management
- `getProducts(params)`: Fetch list of products with optional filters (category, tag, search, pagination)
- `getProductById(productId)`: Fetch details for a single product
- `createProduct(productData)`: Add a new product (admin only)
- `updateProduct(productId, updates)`: Edit product details (admin only)
- `deleteProduct(productId)`: Remove a product (admin only)

#### Variant Management
- `getVariants(productId)`: Fetch variants for a product
- `createVariant(productId, variantData)`: Add a variant to a product
- `updateVariant(variantId, updates)`: Edit variant details
- `deleteVariant(variantId)`: Remove a variant

#### Category Management
- `getCategories()`: Fetch all categories
- `createCategory(categoryData)`: Add a new category
- `updateCategory(categoryId, updates)`: Edit category details
- `deleteCategory(categoryId)`: Remove a category

#### Tag Management
- `getTags()`: Fetch all tags
- `createTag(tagData)`: Add a new tag
- `updateTag(tagId, updates)`: Edit tag details
- `deleteTag(tagId)`: Remove a tag

#### Cart & Checkout
- `getCart(userId)`: Fetch user's cart
- `addToCart(userId, productId, variantId, quantity)`: Add item to cart
- `removeFromCart(userId, cartItemId)`: Remove item from cart
- `updateCartItem(userId, cartItemId, updates)`: Update cart item quantity/variant
- `checkout(userId, cartData)`: Process checkout and create order

#### User & Order Management
- `getUserOrders(userId)`: Fetch user's order history
- `getOrderById(orderId)`: Fetch details for a single order

### Data Flow

1. **User visits shop page:**
	- Frontend calls `getProducts()` and `getCategories()` to display products and categories.
2. **User filters/searches products:**
	- Frontend sends filter/search params to `getProducts(params)`.
3. **User views product details:**
	- Frontend calls `getProductById(productId)` and `getVariants(productId)`.
4. **User adds product to cart:**
	- Frontend calls `addToCart(userId, productId, variantId, quantity)`.
5. **User checks out:**
	- Frontend calls `checkout(userId, cartData)`; backend creates order and updates inventory.
6. **User views order history:**
	- Frontend calls `getUserOrders(userId)`.
7. **Admin manages products/categories/tags/variants:**
	- Admin dashboard uses create/update/delete functions for each entity.

---
# AI Instructions for Future Development

This file contains guidelines and rules for any AI agent or developer working on this project. Please review and follow these instructions before making changes or adding features.

## Project Overview
- **Frontend:** React (with Vite)
- **Routing:** React Router (using @react-router/fs-routes)
- **Backend:** Convex

## General Guidelines
1. **Always check this file for instructions before making changes.**
2. **Maintain code consistency:** Follow existing code style and structure.
3. **Use mock data for UI features unless real backend integration is required.**
4. **Keep UI simple and modern.**
5. **Document any new features or changes in the README.md.**
6. **For backend logic, use Convex best practices and keep functions modular.**
7. **When adding new routes, update `app/routes.ts` and use the fs-routes convention.**
8. **Test new features before committing.**
9. **If unsure, ask for clarification or provide options.**

## React & Vite
- Use functional components and hooks.
- Prefer TypeScript for type safety.
- Use Vite for fast development and builds.

## React Router
- Use file-based routing via `@react-router/fs-routes`.
- Keep route definitions clear and organized.

## Convex Backend
- Store backend functions in the appropriate Convex directory.
- Use Convex for real-time data and backend logic.
- Mock backend responses for UI development if needed.

## AI Agent Behavior
- Always check for existing instructions and context before acting.
- Avoid unnecessary changes; make only what is requested or needed.
- Communicate clearly about any assumptions or decisions.

---

## Project Plan: Ecommerce App

This app will be a fully featured ecommerce platform. Below is a high-level plan for features and structure:

### 1. Core Features
#### Products
- List, view, create, edit, and delete products
- Each product can have multiple variants (e.g., size, color)
- Product details: name, description, price, images, stock

#### Variants
- Support for product variants (attributes like size, color, material)
- Variant-specific pricing and stock

#### Categories
- Organize products into categories
- Category management: create, edit, delete
- Products can belong to multiple categories

#### Tags
- Tag products for flexible filtering/search
- Tag management: create, edit, delete

### 2. User Features
- Product search and filtering (by category, tag, price, etc.)
- Product detail pages
- Shopping cart and checkout flow
- User authentication (login/register)
- Order history and management

### 3. Admin Features
- Dashboard for managing products, categories, variants, tags
- Order management
- User management

### 4. Backend (Convex)
- Real-time product and order data
- Secure user authentication and authorization
- Modular backend functions for CRUD operations

### 5. Frontend (React + Vite)
- Modern, responsive UI
- File-based routing with React Router
- State management for cart, user, and product data

### 6. Future Enhancements
- Payment integration
- Reviews and ratings
- Inventory management
- Analytics and reporting

---
_Last updated: September 3, 2025_
