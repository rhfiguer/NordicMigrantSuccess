import { db } from "@db";
import { eq } from "drizzle-orm";
import * as schema from "@shared/schema";

// Interface for lead data
export interface LeadData extends schema.LeadInsert {}

// Interface for quiz response data
export interface QuizResponseData extends schema.QuizResponseInsert {}

export const storage = {
  // Client functions
  async createClient(data: schema.ClientInsert) {
    const [client] = await db.insert(schema.clients)
      .values(data)
      .returning();
    return client;
  },

  async getClientById(id: number) {
    return await db.query.clients.findFirst({
      where: eq(schema.clients.id, id)
    });
  },

  async updateClientPaymentStatus(id: number, status: string) {
    const [client] = await db.update(schema.clients)
      .set({ paymentStatus: status })
      .where(eq(schema.clients.id, id))
      .returning();
    return client;
  },
  // Get all testimonials
  async getTestimonials() {
    return await db.query.testimonials.findMany({
      orderBy: (testimonials, { asc }) => [asc(testimonials.name)]
    });
  },

  // Get all FAQs
  async getFaqs() {
    return await db.query.faqs.findMany({
      orderBy: (faqs, { asc }) => [asc(faqs.order)]
    });
  },

  // Get all quiz questions
  async getQuizQuestions() {
    return await db.query.quizQuestions.findMany({
      orderBy: (questions, { asc }) => [asc(questions.order)]
    });
  },

  // Create a new lead
  async createLead(data: LeadData) {
    const [lead] = await db.insert(schema.leads)
      .values(data)
      .returning();
    return lead;
  },

  // Get lead by email
  async getLeadByEmail(email: string) {
    return await db.query.leads.findFirst({
      where: eq(schema.leads.email, email)
    });
  },

  // Get lead by ID
  async getLeadById(id: number) {
    return await db.query.leads.findFirst({
      where: eq(schema.leads.id, id)
    });
  },

  // Create quiz response
  async createQuizResponse(data: QuizResponseData) {
    const [response] = await db.insert(schema.quizResponses)
      .values(data)
      .returning();
    return response;
  },

  // Get quiz responses by lead ID
  async getQuizResponsesByLeadId(leadId: number) {
    return await db.query.quizResponses.findMany({
      where: eq(schema.quizResponses.leadId, leadId)
    });
  }
};
