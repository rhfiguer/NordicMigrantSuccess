import { Check, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const PricingSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl md:text-5xl mb-6 text-white"
          >
            Invierte en tu futuro <span className="text-red-500">MAAS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 mb-12 text-lg"
          >
            Una inversión única para maximizar tu potencial de integración y éxito profesional en Noruega.
          </motion.p>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md"
            >
              <Card className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 shadow-[0_0_40px_rgba(220,20,60,0.15)] border border-red-500/30 w-full relative overflow-hidden backdrop-blur-sm rounded-2xl hover:border-red-500/50 transition-colors duration-300">

                {/* Shine Effect */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-red-500/10 rotate-45 blur-3xl transform" />

                <div className="mb-8 relative z-10">
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">Membresía Somos MAAS</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-6xl font-extrabold text-white tracking-tight">$2.99</span>
                    <span className="text-slate-400 font-medium">USD / mes</span>
                  </div>
                  <p className="text-slate-500 mt-2 text-sm italic">Cancela cuando quieras, sin preguntas.</p>
                </div>

                <div className="space-y-4 mb-8 text-left relative z-10">
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-1 rounded-full mr-3 mt-1 border border-slate-700">
                      <Check className="text-red-400 h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-slate-300 font-medium">Acceso a la Comunidad Privada</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-1 rounded-full mr-3 mt-1 border border-slate-700">
                      <Check className="text-red-400 h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-slate-300 font-medium">Nordy: Entrenador de Idioma (IA)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-1 rounded-full mr-3 mt-1 border border-slate-700">
                      <Check className="text-red-400 h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-slate-300 font-medium">Herramienta Analizador de CV</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-1 rounded-full mr-3 mt-1 border border-slate-700">
                      <Check className="text-red-400 h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-slate-300 font-medium">Mindset Groups & Networking</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-1 rounded-full mr-3 mt-1 border border-slate-700">
                      <Check className="text-red-400 h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-slate-300 font-medium">Masterclasses & Webinars Expertos</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-slate-800 p-1 rounded-full mr-3 mt-1 border border-slate-700">
                      <Check className="text-red-400 h-4 w-4 flex-shrink-0" />
                    </div>
                    <span className="text-slate-300 font-medium">Contenido Exclusivo y mucho más</span>
                  </div>

                  <div className="flex items-start bg-slate-800/50 p-4 rounded-xl border border-green-900/30 mt-6 shadow-sm">
                    <div className="flex-shrink-0 mr-3">
                      <div className="relative">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg">
                          <Shield className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-green-400 text-sm leading-tight mb-1">Libertad Total</h4>
                      <p className="text-slate-400 text-sm leading-tight">Sin ataduras. Tu suscripción es mensual y puedes cancelarla en cualquier momento.</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/activate"
                  className="w-full bg-[#D4AF37] hover:bg-[#C09F2F] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 group"
                >
                  <span>Unirme a la Tribu Ahora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;