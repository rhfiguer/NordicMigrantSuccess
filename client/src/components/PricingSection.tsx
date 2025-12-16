import { Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const PricingSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-neutral-50">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl md:text-5xl mb-6 text-secondary"
          >
            Invierte en tu futuro <span className="text-primary">MAAS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 mb-12 text-lg"
          >
            Una inversión única para maximizar tu potencial de integración y éxito profesional en Noruega.
          </motion.p>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white p-8 shadow-[0_0_30px_rgba(0,0,0,0.1)] border-2 border-gold/50 max-w-md w-full relative overflow-hidden backdrop-blur-sm">

                {/* Shine Effect */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-gold/20 rotate-45 blur-2xl transform" />

                <div className="mb-8 relative z-10">
                  <h3 className="text-2xl font-bold text-secondary mb-2">Membresía Somos MAAS</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-primary">$4.99</span>
                    <span className="text-neutral-500 font-medium">USD / mes</span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-sm italic">Cancela cuando quieras, sin preguntas.</p>
                </div>

                <div className="space-y-4 mb-8 text-left relative z-10">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <Check className="text-primary h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-neutral-700 font-medium">Acceso a la Comunidad Privada</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <Check className="text-primary h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-neutral-700 font-medium">Herramienta Analizador de CV (IA)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                      <Check className="text-primary h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-neutral-700 font-medium">Sesiones de Mentoría Grupal</span>
                  </div>

                  <div className="flex items-start bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mt-6 shadow-sm">
                    <div className="flex-shrink-0 mr-3">
                      <div className="relative">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
                          <Shield className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-800 text-sm leading-tight mb-1">Satisfacción Garantizada</h4>
                      <p className="text-green-700 text-sm leading-tight">Únete sin riesgo. Reembolso garantizado si no es lo que esperabas.</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://somosmaas.lemonsqueezy.com/buy/9a84d545-268d-42da-b7b8-9b77bd47cf43"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="bg-gold hover:bg-gold-dim text-secondary font-bold w-full py-7 text-lg shadow-[0_4px_14px_rgba(232,200,94,0.4)] transition-all hover:-translate-y-1"
                  >
                    Convertirme en Miembro
                  </Button>
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;