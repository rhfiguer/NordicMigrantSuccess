import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import { ArrowRight, Users, Play, Shield } from "lucide-react";
import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900 bg-gradient-to-r from-slate-900 to-slate-800">

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:pr-6 text-white"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl leading-tight mb-6">
              Capitaliza tu potencial como Migrante de Alta Ambición.
            </h1>

            <p className="text-lg md:text-xl mb-10 text-slate-300 font-light leading-relaxed">
              La red exclusiva para migrantes de alta ambición. Únete a la tribu, accede a mentoría experta y desbloquea herramientas de IA para tu carrera.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/activate" className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Unirme a la Tribu <span className="text-sm font-normal opacity-90 ml-1">($2.99/mes)</span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-lg"
            >
              {/* Browser Window Container - 3D Glass Effect */}
              <a href="https://cv.somosmaas.org" target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                <div className="rounded-xl overflow-hidden border border-white/20 bg-slate-900/80 backdrop-blur-sm shadow-[0_20px_50px_rgba(8,112,184,0.7)] transition-all duration-500 ease-out [transform:perspective(2000px)_rotateY(-12deg)_rotateX(6deg)] hover:[transform:perspective(2000px)_rotateY(0deg)_rotateX(0deg)] hover:scale-105 hover:shadow-[0_30px_70px_rgba(8,112,184,0.9)]">
                  {/* Fake Browser Header */}
                  <div className="bg-slate-800/90 p-3 flex items-center gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  {/* Content/Image */}
                  <img
                    src="/hero-community-image.png"
                    alt="Comunidad MAAS"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;