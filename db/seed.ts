import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // Seed testimonials
    const testimonials = [
      {
        name: "Ana Martinez",
        countryOrigin: "Colombia",
        city: "Oslo",
        testimonial: "Este taller me dio las herramientas prácticas que necesitaba para construir mi red en Noruega. Ahora tengo amigos noruegos y he encontrado un trabajo en mi campo.",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      {
        name: "Miguel Rodríguez",
        countryOrigin: "México",
        city: "Bergen",
        testimonial: "Cambió mi perspectiva por completo. Ahora entiendo las sutilezas culturales y me siento mucho más integrado. Mi confianza ha aumentado notablemente.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      {
        name: "Carmen Suárez",
        countryOrigin: "Chile",
        city: "Trondheim",
        testimonial: "Las estrategias para desarrollar mi capital cultural fueron reveladoras. En 6 meses, mi noruego ha mejorado significativamente y he hecho conexiones valiosas.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
      }
    ];
    
    // Check if testimonials already exist
    const existingTestimonials = await db.query.testimonials.findMany();
    if (existingTestimonials.length === 0) {
      console.log('Seeding testimonials...');
      await db.insert(schema.testimonials).values(testimonials);
    }

    // Seed FAQs
    const faqs = [
      {
        question: "¿En qué idioma se imparte el taller?",
        answer: "El taller se imparte en español, lo que facilita una comprensión profunda de los conceptos para hispanohablantes. Todo el material complementario también estará en español.",
        order: 1
      },
      {
        question: "¿Qué sucede si no puedo asistir a alguna sesión?",
        answer: "Todas las sesiones se graban y estarán disponibles para los participantes durante 30 días. También recibirás un resumen con los puntos clave de cada sesión por correo electrónico.",
        order: 2
      },
      {
        question: "¿Cuál es el precio del taller?",
        answer: "Al registrarte, recibirás información detallada sobre los precios y opciones de pago disponibles. Ofrecemos planes flexibles y accesibles para que puedas invertir en tu integración.",
        order: 3
      },
      {
        question: "¿Necesito tener algún nivel de noruego para participar?",
        answer: "No, no necesitas hablar noruego para participar. De hecho, el taller está diseñado para ayudarte a desarrollar estrategias efectivas para aprender el idioma como parte de tu integración.",
        order: 4
      }
    ];
    
    // Check if FAQs already exist
    const existingFaqs = await db.query.faqs.findMany();
    if (existingFaqs.length === 0) {
      console.log('Seeding FAQs...');
      await db.insert(schema.faqs).values(faqs);
    }

    // Seed quiz questions
    const quizQuestions = [
      {
        question: "¿Qué tan seguro/a te sientes con tu situación financiera actual en Noruega? ¿Tienes ahorros para cubrir imprevistos?",
        category: "Capital Económico (Finanzas)",
        order: 1
      },
      {
        question: "¿Qué tan satisfecho/a estás con tus oportunidades laborales actuales o potenciales en Noruega? ¿Sientes que tienes acceso a empleos adecuados para ti?",
        category: "Capital Económico (Empleo)",
        order: 2
      },
      {
        question: "¿Qué tan bien dominas el idioma noruego para tus necesidades diarias y profesionales? ¿Qué habilidades o conocimientos de tu país de origen son transferibles y valorados en Noruega?",
        category: "Capital Cultural Incorporado",
        order: 3
      },
      {
        question: "¿Tienes acceso a recursos para aprender sobre la cultura noruega (libros, internet, etc.)? ¿Utilizas estos recursos activamente?",
        category: "Capital Cultural Objetivado",
        order: 4
      },
      {
        question: "¿Has validado o estás en proceso de validar tus títulos y experiencia laboral en Noruega? ¿Son reconocidas tus cualificaciones aquí?",
        category: "Capital Cultural Institucionalizado",
        order: 5
      },
      {
        question: "¿Cuántos amigos o conocidos tienes en Noruega (noruegos e internacionales)? ¿Sientes que tienes una red de apoyo social?",
        category: "Capital Social (Red de Apoyo)",
        order: 6
      },
      {
        question: "¿Qué tan involucrado/a estás en actividades sociales, clubes, voluntariado u otras iniciativas comunitarias en Noruega?",
        category: "Capital Social (Participación)",
        order: 7
      },
      {
        question: "¿Tienes contactos en tu área profesional en Noruega? ¿Te sientes conectado/a con personas que pueden ayudarte en tu carrera?",
        category: "Capital Social (Profesional)",
        order: 8
      },
      {
        question: "¿Sientes que tu forma de vestir y tu apariencia general son apropiadas y te hacen sentir seguro/a en el contexto noruego?",
        category: "Capital Erótico (Apariencia)",
        order: 9
      },
      {
        question: "¿Qué tan cómodo/a te sientes al iniciar y mantener conversaciones con personas en Noruega? ¿Sientes que puedes comunicarte de manera efectiva?",
        category: "Capital Erótico (Comunicación)",
        order: 10
      },
      {
        question: "¿Qué tan seguro/a te sientes en tus interacciones sociales y profesionales en Noruega? ¿Proyectas confianza y autenticidad?",
        category: "Capital Erótico (Confianza)",
        order: 11
      }
    ];
    
    // Check if quiz questions already exist
    const existingQuizQuestions = await db.query.quizQuestions.findMany();
    if (existingQuizQuestions.length === 0) {
      console.log('Seeding quiz questions...');
      await db.insert(schema.quizQuestions).values(quizQuestions);
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seed();
