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
            Invierte en tu futuro MAAS en Noruega
          </h2>
          <p className="text-neutral-600 mb-8">
            Una inversión única para maximizar tu potencial de integración
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-white p-8 shadow-lg">
              <div className="mb-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl font-bold text-neutral-400 line-through">50 NOK</span>
                  <span className="text-4xl font-bold text-rose-600">10 NOK</span>
                </div>
                <p className="text-neutral-600 mt-2">Primera sesión introductoria</p>
                <div className="mt-3 text-rose-600 text-sm font-medium text-center">
                  ¡Oferta especial por tiempo limitado!
                  <CountdownTimer />
                </div>
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
                <span className="text-4xl font-bold text-primary">400 NOK</span>
                <p className="text-neutral-600 mt-2">Una Sesión Individual</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Una sesión a elegir del taller completo</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Material de la sesión</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                  <span className="text-neutral-700">Ejercicios prácticos</span>
                </div>
                <div className="flex items-start bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <div className="flex-shrink-0 mr-3">
                    <div className="relative">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-700 text-sm leading-tight mb-1 whitespace-normal">100% Garantía de satisfacción</h4>
                    <p className="text-green-600 text-sm leading-tight whitespace-normal">Si no quedas satisfecho/a, te devolvemos tu dinero</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => scrollToElement('inscripcion')}
                className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold w-full"
              >
                Reserva tu sesión
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
                <div className="flex items-start bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <div className="flex-shrink-0 mr-3">
                    <div className="relative">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-700 text-sm leading-tight mb-1 whitespace-normal">100% Garantía de satisfacción</h4>
                    <p className="text-green-600 text-sm leading-tight whitespace-normal">Si no quedas satisfecho/a, te devolvemos tu dinero</p>
                  </div>
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