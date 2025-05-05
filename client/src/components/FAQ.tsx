import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
          Preguntas Frecuentes
        </h2>
        <p className="text-center text-neutral-600 mb-10 max-w-2xl mx-auto">
          Respuestas a las dudas más comunes sobre el taller
        </p>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-neutral-500">Cargando preguntas frecuentes...</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`faq-${faq.id}`} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden border-none mb-4"
                >
                  <AccordionTrigger className="p-4 hover:bg-neutral-50 font-poppins font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 border-t border-neutral-200">
                    <p className="text-neutral-700">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
