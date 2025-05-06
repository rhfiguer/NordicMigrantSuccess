
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const VideoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
          Conoce a tus mentores en acción
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Descubre cómo nuestros expertos te guiarán en tu proceso de integración
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Rodrigo's Video Section */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="overflow-hidden shadow-lg border-2 border-secondary/20 hover:border-secondary/40 transition-all cursor-pointer">
                <div className="aspect-video relative">
                  <img
                    src="/EPDN Rodrigo.png"
                    alt="Rodrigo Figueroa - Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-primary border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-secondary/5 to-transparent">
                  <h3 className="font-poppins font-bold text-xl text-primary mb-2">
                    Rodrigo Figueroa
                  </h3>
                  <p className="text-neutral-600">
                    "Descubre cómo transformar tu experiencia migratoria en una historia de éxito"
                  </p>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/QlnXVugnimw"
                  title="Rodrigo Figueroa - Taller de Integración"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>

          {/* Marcela's Video Section */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="overflow-hidden shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer">
                <div className="aspect-video relative">
                  <img
                    src="/EPDN Marcela.png"
                    alt="Marcela Nürnberg - Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-primary border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent">
                  <h3 className="font-poppins font-bold text-xl text-primary mb-2">
                    Marcela Nürnberg
                  </h3>
                  <p className="text-neutral-600">
                    "Aprende las claves para una integración cultural exitosa en Noruega"
                  </p>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/R0qrRxH9pS4"
                  title="Marcela Nürnberg - Taller de Integración"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
