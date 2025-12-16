import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const VideoSection = () => {
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-white">
          Conoce a tus mentores en acción
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Descubre cómo nuestros expertos te guiarán en tu proceso de integración
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Rodrigo's Video Section */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="overflow-hidden shadow-lg border-2 border-secondary/20 hover:border-secondary/40 transition-all cursor-pointer group">
                <div className="aspect-video relative">
                  <img
                    src="/EPDN Rodrigo.png"
                    alt="Rodrigo Figueroa - Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all group-hover:bg-black/40">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                      <div className="w-0 h-0 border-l-[14px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 border-t border-slate-700">
                  <h3 className="font-poppins font-bold text-xl text-white mb-2">
                    Rodrigo Figueroa
                  </h3>
                  <p className="text-slate-400">
                    "¡Un migrante más, no. Un Migrante MAAS, sí!"
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
              <Card className="overflow-hidden shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
                <div className="aspect-video relative">
                  <img
                    src="/EPDN Marcela.png"
                    alt="Marcela Nürnberg - Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-all group-hover:bg-black/40">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                      <div className="w-0 h-0 border-l-[14px] border-l-primary border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 border-t border-slate-700">
                  <h3 className="font-poppins font-bold text-xl text-white mb-2">
                    Marcela Nürnberg
                  </h3>
                  <p className="text-slate-400">
                    "Migrar implica tener el coraje de rescribir el guión de nuestro destino"
                  </p>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/3ZN9IlXoAak"
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