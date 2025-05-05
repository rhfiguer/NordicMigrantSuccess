import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { scrollToElement } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SessionProps {
  number: number;
  title: string;
  description: string;
  bullets: string[];
}

const SESSION_DATA: SessionProps[] = [
  {
    number: 1,
    title: "Descifrando el Terreno Noruego",
    description: "Tu Autodiagnóstico de Capital para la Integración",
    bullets: [
      "Desvelaremos los diferentes tipos de capital que influyen en tu integración",
      "Realizarás una autoevaluación profunda y personalizada",
      "Comprenderás la importancia de establecer prioridades para una integración menos traumática"
    ]
  },
  {
    number: 2,
    title: "Construyendo tu Base Económica",
    description: "Estrategias para Migrantes en el Mercado Laboral",
    bullets: [
      "Exploraremos estrategias prácticas para navegar el mercado laboral noruego",
      "Descubrirás sectores con oportunidades para recién llegados",
      "Obtendrás herramientas para la búsqueda de empleo y gestión financiera"
    ]
  },
  {
    number: 3,
    title: "Tejiendo Redes en Noruega",
    description: "Construyendo tu Capital Social",
    bullets: [
      "Comprenderás el poder de las conexiones para la integración",
      "Aprenderás estrategias concretas para expandir tu red social",
      "Descubrirás cómo tus contactos pueden abrir puertas a oportunidades"
    ]
  },
  {
    number: 4,
    title: "Sumérgete en la Cultura Noruega",
    description: "Desarrollando tu Capital Cultural",
    bullets: [
      "Exploraremos recursos y estrategias efectivas para aprender el idioma",
      "Aprenderás la importancia del \"small talk\" y las costumbres locales",
      "Desarrollarás tu capacidad para interpretar y adaptarte a las normas sociales"
    ]
  },
  {
    number: 5,
    title: "Integración Holística",
    description: "Capital Simbólico, Capital Erótico y el Camino a Seguir",
    bullets: [
      "Comprenderás el impacto del capital simbólico y erótico en tu integración",
      "Aprenderás a encontrar un equilibrio entre tu estilo personal y las normas sociales",
      "Diseñarás un plan de acción para continuar tu camino hacia una integración plena"
    ]
  }
];

const WorkshopSessions = () => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
          ¿Qué aprenderás en este taller transformador?
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Un viaje de 5 encuentros diseñado para maximizar tu integración y potencial en Noruega
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {SESSION_DATA.map((session) => (
              <AccordionItem key={session.number} value={`session-${session.number}`} className="bg-white rounded-lg shadow-md overflow-hidden border-none mb-4">
                <AccordionTrigger className="px-4 py-4 hover:bg-neutral-50 [&[data-state=open]>div>div]:bg-primary [&[data-state=open]>div>div]:text-white">
                  <div className="flex items-center text-left">
                    <div className="w-10 h-10 bg-primary bg-opacity-10 text-primary rounded-full flex items-center justify-center mr-4 transition-colors">
                      <span className="font-semibold">{session.number}</span>
                    </div>
                    <h3 className="font-poppins font-semibold text-lg">{session.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="pl-14">
                    <p className="text-neutral-700 mb-4">{session.description}</p>
                    <ul className="space-y-2 text-neutral-600">
                      {session.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="text-secondary text-sm mt-1 mr-2 h-4 w-4" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <Button 
            onClick={() => scrollToElement('inscripcion')}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-md shadow-lg transition transform hover:-translate-y-1"
          >
            Reserva tu lugar ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSessions;
