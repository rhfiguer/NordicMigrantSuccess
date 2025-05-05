
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

        <div className="flex flex-col gap-12 max-w-6xl mx-auto">
          {/* Marcela */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <img 
                src="/EPDN Marcela.png" 
                alt="Marcela"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 p-6">
              <h3 className="font-poppins font-bold text-2xl mb-4">Marcela</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Especialista en integración cultural y desarrollo personal, con amplia experiencia ayudando a inmigrantes a prosperar en Noruega. Su enfoque único combina el entendimiento profundo de ambas culturas con estrategias prácticas para el éxito.
              </p>
            </div>
          </div>

          {/* Rodrigo */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <img 
                src="/EPDN Rodrigo.png" 
                alt="Rodrigo"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 p-6">
              <h3 className="font-poppins font-bold text-2xl mb-4">Rodrigo</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Coach especializado en desarrollo profesional y adaptación cultural, dedicado a potenciar el éxito de inmigrantes en Noruega. Con años de experiencia, Rodrigo ha desarrollado metodologías efectivas para ayudar a otros a alcanzar su máximo potencial en su nuevo país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presenters;
