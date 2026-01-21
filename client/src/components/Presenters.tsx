
import { Card, CardContent } from "@/components/ui/card";

const Presenters = () => {
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-white">
          Conoce a tus guías en este viaje
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Expertos en integración cultural y desarrollo personal que te acompañarán en tu transformación
        </p>

        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {/* Rodrigo */}
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-700">
                  <img
                    src="/EPDN Rodrigo.png"
                    alt="Rodrigo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800 transform rotate-45"></div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-slate-900 before:border-l before:border-b before:border-slate-700 before:-left-2 before:top-8 before:rotate-45">
                <h3 className="font-poppins font-bold text-xl text-white mb-1">Rodrigo Figueroa</h3>
                <p className="text-slate-300 font-medium mb-1">Chileno, Emprendedor, Podcaster y Desarrollador Autodidacta </p>
                <p className="text-[#FF5F1F] font-medium mb-4">STAVANGER</p>
                <p className="text-slate-400 leading-relaxed">
                  Rodrigo vive en Stavanger. Padre de dos niños. Podcaster. Con experiencia en emprendimientos en Chile y ahora en Noruega. Tiene estudios en Ciencias Sociales, Ingeniería Comercial y un MSc en Administración en Noruega. Fanático del fútbol.
                </p>
              </div>
            </div>
          </div>

          {/* Marcela */}
          <div className="relative">
            <div className="flex items-start gap-4 flex-row-reverse">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-slate-700">
                  <img
                    src="/EPDN Marcela.png"
                    alt="Marcela"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800 transform rotate-45"></div>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-slate-900 before:border-r before:border-b before:border-slate-700 before:-right-2 before:top-8 before:rotate-45">
                <h3 className="font-poppins font-bold text-xl text-white mb-1">Marcela Nürnberg</h3>
                <p className="text-slate-300 font-medium mb-1">Argentina, abogada, podcaster y activista cultural</p>
                <p className="text-[#FF5F1F] font-medium mb-4">KOPPANG</p>
                <p className="text-slate-400 leading-relaxed">
                  Marcela vive junto a su familia en un pequeño pueblo a 200km de Oslo. Madre de un niño. Con experiencia en defensa de derechos humanos y comunicación intercultural. Apasionada por el arte, la cultura y la integración.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presenters;
