import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs: _faqs }) => {
  // Hardcoded FAQs for the new membership model
  const subscriptionFaqs = [
    {
      id: 1,
      question: "¿Qué incluye exactamente la membresía de $4.99?",
      answer: "Obtienes acceso completo a nuestra Comunidad Privada en Discord/WhatsApp, uso ilimitado de la herramienta 'Analizador Cósmico de CV' con IA, y participación en las sesiones grupales mensuales de mentoría."
    },
    {
      id: 2,
      question: "¿Puedo cancelar en cualquier momento?",
      answer: "Sí, absolutamente. No hay plazos forzosos. Puedes cancelar tu suscripción desde tu panel de usuario en Lemon Squeezy cuando lo desees."
    },
    {
      id: 3,
      question: "¿El 'Analizador de CV' funciona para cualquier industria?",
      answer: "Nuestra IA está entrenada con estándares globales y nórdicos, funcionando bien para la mayoría de las profesiones corporativas, tecnológicas y de servicios. Te ayuda a 'traducir' tu valor al mercado local."
    },
    {
      id: 4,
      question: "¿Necesito vivir ya en Noruega para unirme?",
      answer: "No es obligatorio, pero nuestro enfoque está en el mercado laboral nórdico. Si estás planeando migrar o ya estás aquí, encontrarás el mayor valor."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-10 text-primary">
          Preguntas Frecuentes
        </h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {subscriptionFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-left font-semibold text-neutral-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
