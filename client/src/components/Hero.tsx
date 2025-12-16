import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-mountain.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/95 to-primary/40 md:to-transparent" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:pr-6 text-white"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-6xl leading-tight mb-6 drop-shadow-lg">
              CAPITALIZA TU POTENCIAL COMO MIGRANTE DE <span className="text-gold relative inline-block">
                ALTA AMBICIÓN
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-gold" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
              <br /> Y SUPERACIÓN (MAAS)
            </h1>

            <p className="text-lg md:text-2xl mb-10 text-white/90 font-light leading-relaxed">
              La red exclusiva para migrantes de alta ambición. Únete a la tribu, accede a mentoría experta y desbloquea herramientas de IA para tu carrera.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://somosmaas.lemonsqueezy.com/buy/9a84d545-268d-42da-b7b8-9b77bd47cf43"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-gold hover:bg-gold-dim text-secondary font-bold px-8 py-6 text-xl rounded-full shadow-[0_0_20px_rgba(232,200,94,0.5)] transition-all transform hover:scale-105"
                >
                  Únete a la Tribu ($4.99/mes)
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm"
            >
              <img
                src="/hero-community-image.png"
                alt="Comunidad MAAS"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;