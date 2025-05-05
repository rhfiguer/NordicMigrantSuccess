
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/EPDN Marcela.png" 
                  alt="Marcela"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-bold text-xl mb-2">Marcela</h3>
                <p className="text-neutral-600">
                  Especialista en integración cultural y desarrollo personal, con amplia experiencia ayudando a inmigrantes a prosperar en Noruega.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="/EPDN Rodrigo.png" 
                  alt="Rodrigo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-bold text-xl mb-2">Rodrigo</h3>
                <p className="text-neutral-600">
                  Coach especializado en desarrollo profesional y adaptación cultural, dedicado a potenciar el éxito de inmigrantes en Noruega.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Presenters;
