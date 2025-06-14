import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  banner: z.string().optional(),
  type: z.enum(["physical", "webinar"]),
  region: z.enum(["local", "regional", "national"]),
  status: z.enum(["upcoming", "past"]),
  capacity: z.number().optional(),
  currentAttendees: z.number().optional(),
  agenda: z.array(z.string()).optional(),
  speakers: z.array(
    z.object({
      name: z.string(),
      bio: z.string(),
      photo: z.string().optional(),
    })
  ).optional(),
  registrationLink: z.string().optional(),
  mapLink: z.string().optional(),
  archive: z.object({
    photos: z.array(z.string()).optional(),
    presentations: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ).optional(),
    videos: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      })
    ).optional(),
  }).optional(),
  dateTime: z.string().optional(), // ISO 8601 string for countdown
  testimonials: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
    })
  ).optional(),  liveStreamUrl: z.string().optional(),
  newsletterSignupUrl: z.string().optional(),
  registration: z.object({
    isOpen: z.boolean(),
    maxParticipants: z.number().optional(),
    registeredParticipants: z.number().optional(),
    waitingList: z.boolean().optional(),
    deadline: z.string().optional(), // ISO 8601 string
  }).optional(),
  category: z.enum([
    "retirement-planning",
    "pension-education",
    "investment",
    "financial-wellness",
    "general"
  ]).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

export type Event = z.infer<typeof eventSchema>;
