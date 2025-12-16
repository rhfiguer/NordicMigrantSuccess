import { Check } from 'lucide-react';
const Overview = () => {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-4 text-white drop-shadow-sm">
              Todo lo que incluye tu Membresía Ambición MAAS
            </h2>
            <p className="text-center text-slate-400 text-lg mb-12 font-medium">
              Únete y desbloquea herramientas y conexiones para acelerar tu carrera en Noruega
            </p>

            <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-700/50 mb-10">
              <ul className="space-y-8">
                <li className="flex items-start">
                  <div className="bg-gold/20 p-2 rounded-full mr-4 mt-0.5 shadow-[0_0_15px_rgba(232,200,94,0.3)]">
                    <Check className="text-gold h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 text-xl block mb-2">Analizador Cósmico de CV</span>
                    <p className="text-slate-400 leading-relaxed text-lg">Acceso ilimitado a nuestra IA para optimizar tu perfil profesional y alinearlo con las demandas del mercado nórdico.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold/20 p-2 rounded-full mr-4 mt-0.5 shadow-[0_0_15px_rgba(232,200,94,0.3)]">
                    <Check className="text-gold h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 text-xl block mb-2">Networking de Alto Nivel</span>
                    <p className="text-slate-400 leading-relaxed text-lg">Conecta con otros migrantes ambiciosos y mentores en Noruega que comparten tu mentalidad de crecimiento.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold/20 p-2 rounded-full mr-4 mt-0.5 shadow-[0_0_15px_rgba(232,200,94,0.3)]">
                    <Check className="text-gold h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-100 text-xl block mb-2">Contenido Exclusivo</span>
                    <p className="text-slate-400 leading-relaxed text-lg">Webinars tácticos, guías de integración y soporte continuo por parte de la comunidad.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;