import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { leadsInsertSchema, quizResponsesInsertSchema } from "@shared/schema";
import { ZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = "/api";

  // Get testimonials
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Error al obtener testimonios" });
    }
  });

  // Get FAQs
  app.get(`${apiPrefix}/faqs`, async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Error al obtener preguntas frecuentes" });
    }
  });

  // Get quiz questions
  app.get(`${apiPrefix}/quiz-questions`, async (req, res) => {
    try {
      const questions = await storage.getQuizQuestions();
      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ message: "Error al obtener preguntas del quiz" });
    }
  });

  // Register a new lead
  // Endpoint de prueba para email
  app.get(`${apiPrefix}/test-email`, async (req, res) => {
    try {
      const emailService = EmailService.initialize({
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_APP_PASSWORD || ''
      });

      await emailService.sendEmail(
        process.env.EMAIL_USER || '',
        "Prueba de Email",
        "Este es un correo de prueba del sistema."
      );

      res.json({ message: "Correo de prueba enviado" });
    } catch (error) {
      console.error("Error sending test email:", error);
      res.status(500).json({ message: "Error al enviar correo de prueba" });
    }
  });

  app.post(`${apiPrefix}/register`, async (req, res) => {
    try {
      const validatedData = leadsInsertSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({ 
        message: "Registro exitoso", 
        leadId: lead.id 
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Datos de registro inválidos", 
          errors: error.errors 
        });
      }
      
      // Check for duplicate email error
      if (error.code === '23505' && error.constraint === 'leads_email_unique') {
        return res.status(409).json({ 
          message: "Este email ya está registrado" 
        });
      }
      
      console.error("Error creating lead:", error);
      res.status(500).json({ message: "Error en el registro" });
    }
  });

  // Submit quiz responses
  app.post(`${apiPrefix}/quiz-responses`, async (req, res) => {
    try {
      const validatedData = quizResponsesInsertSchema.parse(req.body);
      
      // Calculate score based on answers
      const responses = {
        economic: [req.body.q1, req.body.q2],
        cultural: [req.body.q3, req.body.q4, req.body.q5],
        social: [req.body.q6, req.body.q7, req.body.q8],
        erotic: [req.body.q9, req.body.q10, req.body.q11]
      };

      // Calculate scores by category
      const categoryScores = {};
      let totalAnswers = 0;
      let totalSum = 0;

      for (const [category, answers] of Object.entries(responses)) {
        const validAnswers = answers.filter(Boolean);
        if (validAnswers.length > 0) {
          const categoryAvg = validAnswers.reduce((sum, val) => sum + val, 0) / validAnswers.length;
          categoryScores[category] = Math.round((categoryAvg - 1) / 3 * 100);
          totalAnswers += validAnswers.length;
          totalSum += validAnswers.reduce((sum, val) => sum + val, 0);
        }
      }

      if (totalAnswers === 0) {
        return res.status(400).json({ 
          message: "Debes responder al menos una pregunta" 
        });
      }

      const avgScore = totalSum / totalAnswers;
      const percentageScore = Math.round((avgScore - 1) / 3 * 100);
      
      // Add score to validatedData
      const quizResponseData = {
        ...validatedData,
        score: percentageScore
      };
      
      const quizResponse = await storage.createQuizResponse(quizResponseData);
      
      // Get recommendation based on score
      let recommendation;
      if (percentageScore < 40) {
        recommendation = "Tu puntuación indica que hay múltiples áreas donde puedes fortalecer tu capital migrante. El taller te será extremadamente beneficioso.";
      } else if (percentageScore < 60) {
        recommendation = "Tienes algunas bases, pero aún hay importantes oportunidades de mejora en tu integración. El taller te ayudará a potenciar tus fortalezas.";
      } else {
        recommendation = "Has construido buenas bases, pero el taller te permitirá optimizar estratégicamente tu capital migrante para lograr una integración plena.";
      }
      
      res.status(201).json({ 
        message: "Respuestas guardadas exitosamente",
        score: percentageScore,
        categoryScores,
        recommendation
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Datos de quiz inválidos", 
          errors: error.errors 
        });
      }
      console.error("Error saving quiz responses:", error);
      res.status(500).json({ message: "Error al guardar las respuestas" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
