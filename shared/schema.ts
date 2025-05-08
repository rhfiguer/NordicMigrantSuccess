import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Leads/Registrations table
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  countryOrigin: text("country_origin"),
  timeInNorway: text("time_in_norway"),
  acceptedPrivacy: boolean("accepted_privacy").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizResultsSchema = z.object({
  score: z.number(),
  categoryScores: z.object({
    economic: z.number(),
    cultural: z.number(),
    social: z.number(),
    erotic: z.number()
  }),
  recommendation: z.string()
});

export const leadsInsertSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  countryOrigin: z.string().optional(),
  timeInNorway: z.string().optional(),
  acceptedPrivacy: z.boolean(),
  quizResults: z.object({
    score: z.number(),
    categoryScores: z.object({
      economic: z.number(),
      cultural: z.number(),
      social: z.number(),
      erotic: z.number()
    }).optional(),
    recommendation: z.string()
  }).optional()
});
export type LeadInsert = z.infer<typeof leadsInsertSchema>;
export type Lead = typeof leads.$inferSelect;

// Quiz responses table
export const quizResponses = pgTable("quiz_responses", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  q1: integer("q1"),
  q2: integer("q2"),
  q3: integer("q3"),
  q4: integer("q4"),
  q5: integer("q5"),
  q6: integer("q6"),
  q7: integer("q7"),
  q8: integer("q8"),
  q9: integer("q9"),
  q10: integer("q10"),
  q11: integer("q11"),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizResponsesInsertSchema = z.object({
  q1: z.number().optional(),
  q2: z.number().optional(),
  q3: z.number().optional(),
  q4: z.number().optional(),
  q5: z.number().optional(),
  q6: z.number().optional(),
  q7: z.number().optional(),
  q8: z.number().optional(),
  q9: z.number().optional(),
  q10: z.number().optional(),
  q11: z.number().optional(),
  leadId: z.number().optional(),
});
export type QuizResponseInsert = z.infer<typeof quizResponsesInsertSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;

// Testimonials table for seeding testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  countryOrigin: text("country_origin").notNull(),
  city: text("city").notNull(),
  testimonial: text("testimonial").notNull(),
  imageUrl: text("image_url"),
});

export const testimonialsInsertSchema = createInsertSchema(testimonials);
export type TestimonialInsert = z.infer<typeof testimonialsInsertSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// FAQ items for seeding FAQs
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull().default(0),
});

export const faqsInsertSchema = createInsertSchema(faqs);
export type FaqInsert = z.infer<typeof faqsInsertSchema>;
export type Faq = typeof faqs.$inferSelect;

// Quiz questions for seeding quiz questions
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  category: text("category").notNull(),
  order: integer("order").notNull().default(0),
});

export const quizQuestionsInsertSchema = createInsertSchema(quizQuestions);
export type QuizQuestionInsert = z.infer<typeof quizQuestionsInsertSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;

// Relations
export const leadsRelations = relations(leads, ({ many }) => ({
  quizResponses: many(quizResponses),
}));

export const quizResponsesRelations = relations(quizResponses, ({ one }) => ({
  lead: one(leads, {
    fields: [quizResponses.leadId],
    references: [leads.id],
  }),
}));