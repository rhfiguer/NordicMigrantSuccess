import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

          <div className="flex justify-center">
            <Card className="bg-white p-8 shadow-lg max-w-md w-full border-2 border-[#D4AF37]">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Membresía Somos MAAS</h3>
                <span className="text-4xl font-bold text-primary">$4.99 USD</span>
                <span className="text-neutral-500 font-medium"> / mes</span>
                <p className="text-neutral-600 mt-2 text-sm">Cancela cuando quieras.</p>
              </div>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                  <span className="text-neutral-700">Acceso a la Comunidad Privada</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                  <span className="text-neutral-700">Herramienta Analizador de CV (SaaS)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-secondary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                  <span className="text-neutral-700">Sesiones de Mentoría Grupal</span>
                </div>
                <div className="flex items-start bg-green-50 p-4 rounded-lg border-2 border-green-200 mt-4">
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
                    <h4 className="font-bold text-green-700 text-sm leading-tight mb-1 whitespace-normal">Satisfacción Garantizada</h4>
                    <p className="text-green-600 text-sm leading-tight whitespace-normal">Únete sin riesgo.</p>
                  </div>
                </div>
              </div>

              <a
                href="https://somosmaas.lemonsqueezy.com/buy/9a84d545-268d-42da-b7b8-9b77bd47cf43"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold w-full py-6 text-lg"
                >
                  Convertirme en Miembro
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;