import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z.string().min(2),
  tagline: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  region: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
  aboutTitle: z.string().min(5),
  aboutBody: z.string().min(20),
  mission: z.string().min(20),
  globalReach: z.string().min(20),
  contactEmail: z.email(),
  contactPhone: z.string().min(6),
  googleMapsEmbedUrl: z.url(),
});

export const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(12),
  iconName: z.string().min(3),
  order: z.coerce.number().int().min(0).default(0),
});

export const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  photoUrl: z.url().optional().or(z.literal("")),
  dob: z.string().min(1),
  personalEmail: z.email(),
  phone: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  dutiesHtml: z.string().min(20),
  isActive: z.coerce.boolean(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(20),
});
