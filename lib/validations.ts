import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(150).optional(),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  service: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  projectLocation: z.string().max(150).optional(),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

export const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(150).optional(),
  email: z.string().email(),
  phone: z.string().min(5).max(30),
  location: z.string().max(150).optional(),
  industry: z.string().max(100).optional(),
  service: z.string().min(2).max(150),
  description: z.string().min(20).max(8000),
  timeline: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  notes: z.string().max(5000).optional(),
  website: z.string().max(0).optional(),
});

export const jobApplicationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  coverLetter: z.string().max(5000).optional(),
  linkedIn: z.string().url().optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
