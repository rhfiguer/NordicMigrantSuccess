import { motion } from "framer-motion";
import { Bot, Play, Compass, Users, Sparkles } from "lucide-react";

const Overview = () => {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden" id="features">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins font-bold text-3xl md:text-5xl text-white mb-6">
            Tu Arsenal para la <span className="text-red-500">Conquista</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Herramientas de élite diseñadas para desbloquear tu potencial en el mercado nórdico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* CARD 1: NORDY (Destacada - Grande) */}
          <motion.a
            href="https://nordy.elpodcastdenoruega.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700 hover:border-red-500/50 transition-all duration-300 block"
          >
            <div className="absolute top-0 right-0 p-4 z-20">
              <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> BETA • PRONTO EN INGLÉS
              </span>
            </div>

            <div className="h-full flex flex-col md:flex-row items-center p-8 gap-8">
              <div className="flex-1 z-10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-poppins font-bold text-3xl text-white mb-4">
                  Nordy: Tu Entrenador Vikingo
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  Entrena entrevistas de trabajo y conversaciones en noruego. Un coach IA que no tiene piedad con tu gramática para que brilles en la vida real.
                </p>
              </div>

              {/* Image Area */}
              <div className="w-full md:w-1/3 flex justify-center items-center relative">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                  <img
                    src="/nordy.png"
                    alt="Nordy Viking AI"
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.a>

          {/* CARD 2: MASTERCLASS (Media) */}
          <motion.div
            whileHover={{ translateY: -5 }}
            className="md:col-span-1 p-8 rounded-3xl bg-slate-900/60 border border-slate-700 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between relative"
          >
            <div className="absolute top-0 right-0 p-4 z-20">
              <span className="bg-slate-700/50 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-600/30">
                PRONTO
              </span>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-white mb-3">
                Masterclass: Capitalización MAAS
              </h3>
              <p className="text-slate-400 text-base">
                Acceso on-demand al curso completo de Capitalización Migrante. Cambia tu mindset y aprende a vender tu perfil internacional.
              </p>
            </div>
          </motion.div>

          {/* CARD 3: PLAYBOOK (Media) */}
          <motion.div
            whileHover={{ translateY: -5 }}
            className="md:col-span-1 p-8 rounded-3xl bg-slate-900/60 border border-slate-700 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between relative"
          >
            <div className="absolute top-0 right-0 p-4 z-20">
              <span className="bg-slate-700/50 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-600/30">
                PRONTO
              </span>
            </div>
            <div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-white mb-3">
                El Playbook Estratégico
              </h3>
              <p className="text-slate-400 text-base">
                La hoja de ruta definitiva. Evita los errores comunes y ahorra años de prueba y error con nuestra guía de estrategia probada.
              </p>
            </div>
          </motion.div>

          {/* CARD 4: COMUNIDAD (Pequeña - Relleno) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 p-8 rounded-3xl bg-slate-900/60 border border-slate-700 hover:border-red-500/50 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-poppins font-bold text-xl text-white mb-1">
                  Comunidad & Networking
                </h3>
                <p className="text-slate-400">
                  Conecta con otros comandantes. Tu red es tu patrimonio.
                </p>
              </div>
            </div>

            {/* Avatar Group Decorations */}
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-500">
                  <span className="sr-only">User {i}</span>
                  <Users className="w-4 h-4 opacity-50" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">
                +50
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Overview;