import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { AIService } from "./openai";
import { leadsInsertSchema, quizResponsesInsertSchema } from "@shared/schema";
import { ZodError } from "zod-validation-error";
import { EmailService } from "./email";

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
      console.log('Datos recibidos en /api/register:', req.body);
      const validatedData = leadsInsertSchema.parse(req.body);
      console.log('Datos validados:', validatedData);

      try {
        const lead = await storage.createLead(validatedData);

        try {
          const emailService = EmailService.initialize({
            user: process.env.EMAIL_USER || '',
            pass: process.env.EMAIL_APP_PASSWORD || ''
          });

          // Guardar respuestas del quiz en la base de datos si existen
          if (validatedData.quizResults) {
            await storage.createQuizResponse({
              leadId: lead.id,
              ...validatedData.quizResults
            });
          }

          // Determinar el tipo de email basado en si hay resultados del quiz
          const hasQuizResults = validatedData.quizResults && 
            validatedData.quizResults.score !== undefined && 
            validatedData.quizResults.categoryScores !== undefined;

          let emailContent = '';
          let emailSubject = '';

          console.log('Datos de registro validados:', {
            name: validatedData.name,
            email: validatedData.email,
            hasQuizResults,
            quizResults: validatedData.quizResults,
            categoryScores: validatedData.quizResults?.categoryScores
          });

          const isQuizRegistration = hasQuizResults;

          if (isQuizRegistration) {
            console.log('Preparando email de resultados del quiz:', {
              isQuizRegistration,
              quizResults: validatedData.quizResults
            });
            emailSubject = 'Resultados de tu Diagnóstico de Capital MAAS';
            const { score, categoryScores, recommendation } = validatedData.quizResults;
            emailContent = `
              <h1>¡Gracias por completar el diagnóstico, ${validatedData.name}!</h1>
              <h2 style="color: #2C3E50; margin-top: 30px;">Resultados de tu Diagnóstico de Capital MAAS</h2>
              <div style="background-color: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="font-size: 18px;"><strong>Tu puntuación general:</strong> ${score}%</p>

                <h3 style="color: #34495E; margin-top: 20px;">Desglose por categorías:</h3>
                <ul style="list-style-type: none; padding: 0;">
                  <li style="margin: 10px 0;">
                    <strong>Capital Económico:</strong> 
                    <div style="background-color: #E8E8E8; height: 20px; border-radius: 10px; margin-top: 5px;">
                      <div style="background-color: #4CAF50; width: ${validatedData.quizResults.categoryScores.economic}%; height: 100%; border-radius: 10px;"></div>
                    </div>
                    <span>${validatedData.quizResults.categoryScores.economic}%</span>
                  </li>
                  <li style="margin: 10px 0;">
                    <strong>Capital Cultural:</strong>
                    <div style="background-color: #E8E8E8; height: 20px; border-radius: 10px; margin-top: 5px;">
                      <div style="background-color: #2196F3; width: ${validatedData.quizResults.categoryScores.cultural}%; height: 100%; border-radius: 10px;"></div>
                    </div>
                    <span>${validatedData.quizResults.categoryScores.cultural}%</span>
                  </li>
                  <li style="margin: 10px 0;">
                    <strong>Capital Social:</strong>
                    <div style="background-color: #E8E8E8; height: 20px; border-radius: 10px; margin-top: 5px;">
                      <div style="background-color: #FF9800; width: ${validatedData.quizResults.categoryScores.social}%; height: 100%; border-radius: 10px;"></div>
                    </div>
                    <span>${validatedData.quizResults.categoryScores.social}%</span>
                  </li>
                  <li style="margin: 10px 0;">
                    <strong>Capital Erótico:</strong>
                    <div style="background-color: #E8E8E8; height: 20px; border-radius: 10px; margin-top: 5px;">
                      <div style="background-color: #9C27B0; width: ${validatedData.quizResults.categoryScores.erotic}%; height: 100%; border-radius: 10px;"></div>
                    </div>
                    <span>${validatedData.quizResults.categoryScores.erotic}%</span>
                  </li>
                </ul>

                <h3 style="color: #34495E; margin-top: 20px;">Recomendación personalizada:</h3>
                <p style="background-color: #FFFFFF; padding: 15px; border-left: 4px solid #2196F3; margin: 10px 0;">${recommendation}</p>
              </div>

              <h3 style="color: #2C3E50;">¿Quieres profundizar en tu desarrollo?</h3>
              <p>Te invitamos a participar en nuestro taller donde profundizaremos en cada una de estas áreas y desarrollaremos estrategias específicas para mejorar tu capital migrante.</p>
            `;
          } else {
            emailSubject = "¡Bienvenido al Taller de Capital MAAS!";
            emailContent = `
              <h1>¡Gracias por registrarte, ${validatedData.name}!</h1>
              <p>¡Nos alegra que hayas decidido dar este importante paso en tu desarrollo profesional!</p>
              <p>Pronto recibirás más información sobre el taller y los próximos pasos.</p>
              <p>Si aún no has realizado tu diagnóstico gratuito de Capital MAAS, te invitamos a hacerlo visitando nuestra página.</p>
            `;
          }

          await emailService.sendEmail(
            validatedData.email,
            emailSubject,
            emailContent
          );

          console.log("Confirmation email sent to:", validatedData.email);
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }

        res.status(201).json({ 
          message: "Registro exitoso", 
          leadId: lead.id 
        });
      } catch (dbError: any) {
        console.error("Database error:", dbError);

        if (dbError.code === '23505' && dbError.constraint === 'leads_email_unique') {
          return res.status(409).json({ 
            message: "Este email ya está registrado" 
          });
        }

        throw dbError;
      }
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
      const quizResponse = new QuizResponse(req.body);
      const aiService = new AIService();
      await quizResponse.generateRecommendation(aiService);

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

      // Get AI-generated recommendation
      const aiService = new AIService();
      const recommendation = await aiService.generateRecommendation(categoryScores);

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