import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { AIService } from "./openai";
import { leadsInsertSchema, quizResponsesInsertSchema, clientsInsertSchema } from "@shared/schema";
import { ZodError } from "zod-validation-error";
import { EmailService } from "./email";
import { QuizResponse } from "@shared/types";
import { StripeService } from "./stripe";

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

  app.post(`${apiPrefix}/bank-transfer`, async (req, res) => {
    try {
      const clientData = {
        name: req.body.name,
        email: req.body.email,
        workshopId: "capital-maas-2024",
        paymentMethod: 'transfer',
        paymentStatus: 'pending'
      };

      const client = await storage.createClient(clientData);
      res.status(201).json({ 
        message: "Cliente registrado exitosamente",
        clientId: client.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Datos de registro inválidos",
          errors: error.errors
        });
      }
      console.error("Error registering client:", error);
      res.status(500).json({ message: "Error en el registro" });
    }
  });

  app.post(`${apiPrefix}/register`, async (req, res) => {
    try {
      const validatedData = leadsInsertSchema.parse(req.body);
      
      try {
        const lead = await storage.createLead({
          name: validatedData.name,
          email: validatedData.email,
          workshopId: "capital-maas-2024",
          paymentMethod: "pending",
          paymentStatus: "pending"
        });

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

              <div style="background-color: #FDF6E3; padding: 25px; border-radius: 8px; margin: 30px 0; text-align: center;">
                <h3 style="color: #D4AF37; font-size: 24px; margin-bottom: 15px;">¡Potencia tu Capital MAAS!</h3>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Basado en tus resultados, te invitamos a participar en nuestro taller especializado donde:
                  <ul style="text-align: left; margin: 20px 0;">
                    <li>✓ Profundizaremos en cada área de tu capital MAAS</li>
                    <li>✓ Desarrollaremos estrategias personalizadas para mejorar tus puntuaciones</li>
                    <li>✓ Crearás conexiones valiosas con otros migrantes MAAS</li>
                    <li>✓ Recibirás mentoría directa de expertos en integración</li>
                  </ul>
                </p>
                <a href="https://www.somosmaas.no/#inscripcion" 
                   style="display: inline-block; background-color: #D4AF37; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px; margin-top: 20px;">
                   INSCRÍBETE AHORA →
                </a>
              </div>

              <p style="color: #666; font-size: 14px; text-align: center; margin-top: 20px;">
                * Las plazas son limitadas y se asignan por orden de inscripción
              </p>
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
  // Crear sesión de pago con Stripe
  app.post(`${apiPrefix}/create-payment-session`, async (req, res) => {
    try {
      const { workshop, price } = req.body;

      if (!workshop || !price) {
        return res.status(400).json({ message: 'Faltan datos requeridos (workshop o price)' });
      }

      const stripeService = new StripeService();
      const session = await stripeService.createPaymentSession(workshop, price);
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating payment session:', error);
      res.status(500).json({ 
        message: 'Error al crear la sesión de pago',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  });

  app.post(`${apiPrefix}/quiz-responses`, async (req, res) => {
    try {
      const validatedData = quizResponsesInsertSchema.parse(req.body);

      if (Object.keys(validatedData).length === 0) {
        return res.status(400).json({ 
          message: "Debes responder al menos una pregunta" 
        });
      }

      // Usar la clase QuizResponse para procesar los datos
      const quizResponse = new QuizResponse(validatedData);

      // Get AI-generated recommendation
      const aiService = new AIService();
      await quizResponse.generateRecommendation(aiService);

      res.status(201).json({ 
        message: "Respuestas guardadas exitosamente",
        score: quizResponse.score,
        categoryScores: quizResponse.categoryScores,
        recommendation: quizResponse.recommendation
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