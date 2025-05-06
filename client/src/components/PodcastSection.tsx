
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PodcastSection = () => {
  const episodes = [
    {
      title: "Despliega tu Capital Migrante",
      description: "Descubre el poder del capital migrante y cómo aprovecharlo en tu proceso de integración en Noruega.",
      url: "https://www.youtube.com/embed/R0qrRxH9pS4",
      image: "/EPDN Marcela.png",
    },
    {
      title: "Claves para la Integración",
      description: "Estrategias prácticas y consejos para una integración exitosa en la sociedad noruega.",
      url: "https://www.youtube.com/embed/QlnXVugnimw",
      image: "/EPDN Rodrigo.png",
    },
    {
      title: "Construyendo Redes en Noruega",
      description: "Aprende cómo establecer conexiones significativas y construir una red de apoyo en tu nueva vida.",
      url: "https://www.youtube.com/embed/QlnXVugnimw",
      image: "/EPDN Rodrigo.png",
    },
    {
      title: "Navegando el Sistema Laboral",
      description: "Tips y estrategias para entender y adaptarte al mercado laboral noruego.",
      url: "https://www.youtube.com/embed/R0qrRxH9pS4",
      image: "/EPDN Marcela.png",
    },
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
          Episodios Recomendados
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Escucha estos episodios especialmente seleccionados de El Podcast de Noruega
        </p>

        <div className="max-w-4xl mx-auto px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {episodes.map((episode, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={episode.image}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-12 h-12 text-white"
                        >
                          <path d="M8 4.5a1 1 0 0 0-1 1v13a1 1 0 0 0 1.524.852l11-6.5a1 1 0 0 0 0-1.704l-11-6.5A1 1 0 0 0 8 4.5Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-poppins font-bold text-xl text-primary mb-2">
                        {episode.title}
                      </h3>
                      <p className="text-neutral-600">
                        {episode.description}
                      </p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
