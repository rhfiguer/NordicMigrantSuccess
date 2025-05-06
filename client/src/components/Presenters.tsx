
import { Card, CardContent } from "@/components/ui/card";

const Presenters = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
          Conoce a tus guías en este viaje
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Expertos en integración cultural y desarrollo personal que te acompañarán en tu transformación
        </p>

        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {/* Rodrigo */}
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-100">
                  <img 
                    src="/EPDN Rodrigo.png" 
                    alt="Rodrigo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-50 transform rotate-45"></div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-blue-50 before:-left-2 before:top-8 before:rotate-45">
                <h3 className="font-poppins font-bold text-xl text-primary mb-1">Rodrigo Figueroa</h3>
                <p className="text-primary font-medium mb-1">MSc in Management & Softwareutvikler</p>
                <p className="text-rose-600 font-medium mb-4">STAVANGER</p>
                <p className="text-neutral-600 leading-relaxed">
                  Coach especializado en desarrollo profesional y adaptación cultural, dedicado a potenciar el éxito de inmigrantes en Noruega. Con años de experiencia, Rodrigo ha desarrollado metodologías efectivas para ayudar a otros a alcanzar su máximo potencial en su nuevo país.
                </p>
              </div>
            </div>
          </div>

          {/* Marcela */}
          <div className="relative">
            <div className="flex items-start gap-4 flex-row-reverse">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-rose-100">
                  <img 
                    src="/EPDN Marcela.png" 
                    alt="Marcela"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-rose-50 transform rotate-45"></div>
              </div>
              <div className="bg-rose-50 rounded-2xl p-6 relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-rose-50 before:-right-2 before:top-8 before:rotate-45">
                <h3 className="font-poppins font-bold text-xl text-primary mb-1">Marcela Nürnberg</h3>
                <p className="text-primary font-medium mb-1">Utdannet jurist, tekstforfatter, kulturaktivist</p>
                <p className="text-rose-600 font-medium mb-4">KOPPANG</p>
                <p className="text-neutral-600 leading-relaxed">
                  Especialista en integración cultural y desarrollo personal, con amplia experiencia ayudando a inmigrantes a prosperar en Noruega. Su enfoque único combina el entendimiento profundo de ambas culturas con estrategias prácticas para el éxito.
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
