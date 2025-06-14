// lib/schemas/blog-schema.ts
import { z } from 'zod';

export const authorSchema = z.object({
  name: z.string(),
  avatar: z.string().url().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
});

export const blogPostSchema = z.object({
  id: z.string().cuid2(), 
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  title: z.string().min(5, "Title must be at least 5 characters long"),
  content: z.string().min(100, "Content must be at least 100 characters long"), // This will likely be Markdown or HTML
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters long").max(300, "Excerpt must be at most 300 characters long"),
  featuredImage: z.object({
    url: z.string().url(),
    alt: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
  category: z.string(), // For now, a string. Later, can be linked to blogCategorySchema via ID
  tags: z.array(z.string()).optional(),
  author: authorSchema,
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    canonicalUrl: z.string().url().optional(),
  }).optional(),
  readingTimeMinutes: z.number().int().positive().optional(),
  relatedPosts: z.array(z.string().cuid2()).optional(), // Array of related post IDs
  allowComments: z.boolean().default(true),
  views: z.number().int().nonnegative().default(0).optional(),
});

// Explicitly define Comment type for recursion
interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    website?: string | undefined;
  };
  content: string;
  createdAt: Date;
  approvedAt?: Date | undefined;
  status: "pending" | "approved" | "rejected" | "spam";
  parentId?: string | undefined;
  replies?: Comment[] | undefined;
  likes?: number | undefined;
}

export const commentSchema: z.ZodType<Comment> = z.object({
  id: z.string().cuid2(),
  postId: z.string().cuid2(),
  author: z.object({
    name: z.string(),
    email: z.string().email(), // For notifications, not necessarily public
    website: z.string().url().optional(),
  }),
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
  createdAt: z.date(),
  approvedAt: z.date().optional(),
  status: z.enum(["pending", "approved", "rejected", "spam"]).default("pending") as z.ZodType<"pending" | "approved" | "rejected" | "spam">, // Ensure the output type matches the interface
  parentId: z.string().cuid2().optional(), // For threaded comments
  replies: z.array(z.lazy(() => commentSchema)).optional(), // For nested replies
  likes: z.number().int().nonnegative().default(0).optional(),
});

export const blogCategorySchema = z.object({
  id: z.string().cuid2(),
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().optional(),
  featuredImage: z.string().url().optional(),
  postCount: z.number().int().nonnegative().default(0).optional(),
});

// TypeScript types derived from schemas
export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogComment = z.infer<typeof commentSchema>;
export type BlogCategory = z.infer<typeof blogCategorySchema>;
export type Author = z.infer<typeof authorSchema>;
