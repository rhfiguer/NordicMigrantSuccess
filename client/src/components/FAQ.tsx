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
      question: "¿Por qué el precio es de solo $2.99 USD?",
      answer: "Es una oferta exclusiva de lanzamiento para los primeros 20 inscritos. Queremos premiar a los pioneros (Early Adopters) de nuestra comunidad. Después, el precio subirá gradualmente a su valor real."
    },
    {
      id: 2,
      question: "¿Qué recibo exactamente por mi inversión?",
      answer: "Acceso total a: Nordy (Entrenador de Idiomas IA), Analizador de CV con IA, Mindset Groups, Masterclasses, Webinars con expertos, Contenido Exclusivo y una red de networking de alto nivel."
    },
    {
      id: 3,
      question: "¿Puedo cancelar en cualquier momento?",
      answer: "Sí, absolutamente. Sin contratos ni letras pequeñas. Eres libre de quedarte solo si sientes que recibes valor masivo."
    },
    {
      id: 4,
      question: "¿Debo estar ya viviendo en el extranjero para unirme?",
      answer: "¡Para nada! Somos MAAS está diseñado para acompañarte en todo el viaje: desde la planificación en tu país de origen, durante la mudanza y hasta tu establecimiento exitoso."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-10 text-white">
          Preguntas Frecuentes
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {subscriptionFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border border-slate-700 rounded-lg bg-slate-900/50 overflow-hidden px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-200 hover:text-white hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-4">
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
