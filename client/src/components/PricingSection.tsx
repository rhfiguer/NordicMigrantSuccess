
import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { scrollToElement } from '@/lib/utils';

const PricingSection = () => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-3 text-primary">
            Invierte en tu futuro en Noruega
          </h2>
          <p className="text-neutral-600 mb-8">
            Una inversión única para maximizar tu potencial de integración
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white p-8 shadow-lg">
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">50 NOK</span>
                <p className="text-neutral-600 mt-2">Primera sesión introductoria</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Descubre si el taller es para ti</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Conoce la metodología</span>
                </div>
              </div>

              <Button 
                onClick={() => scrollToElement('inscripcion')}
                className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold w-full"
              >
                Reserva tu introducción
              </Button>
            </Card>

            <Card className="bg-white p-8 shadow-lg">
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">600 NOK</span>
                <p className="text-neutral-600 mt-2">Taller completo</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">4 sesiones interactivas</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Material exclusivo</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Certificado de participación</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Red de apoyo entre participantes</span>
                </div>
                <div className="flex items-start text-green-600">
                  <Shield className="mt-1 mr-2 h-5 w-5" />
                  <span className="font-semibold">100% Garantía de satisfacción</span>
                </div>
              </div>

              <Button 
                onClick={() => scrollToElement('inscripcion')}
                className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold w-full"
              >
                Reserva tu lugar ahora
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
