
import React from "react";
import Autoplay from 'embla-carousel-autoplay';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PodcastSection = () => {
  const episodes = [
    {
      title: "Cómo Aprovechar tu Capital Migrante",
      videoId: "Z5D5xh4i1z4",
      description: "Estrategias para maximizar tu potencial como inmigrante.",
    },
    {
      title: "Integración Cultural en Noruega",
      videoId: "TbdmDMgVm-I",
      description: "Claves para una adaptación exitosa a la cultura noruega.",
    },
    {
      title: "Desarrollo Profesional",
      videoId: "hBIDdcpG7gI",
      description: "Consejos para tu crecimiento profesional en Noruega.",
    },
    {
      title: "Networking Efectivo",
      videoId: "1r5DcASE8hs",
      description: "Cómo construir una red de contactos valiosa.",
    },
    {
      title: "Superando Desafíos",
      videoId: "PWpColjoWKo",
      description: "Herramientas para enfrentar los retos de la migración.",
    },
    {
      title: "Construyendo tu Futuro",
      videoId: "dknVxRK1YR4",
      description: "Pasos clave para construir tu futuro en Noruega.",
    },
    {
      title: "El Camino del Éxito",
      videoId: "ipucJGlXZbk",
      description: "Experiencias y consejos para alcanzar el éxito.",
    },
    {
      title: "Adaptación e Integración",
      videoId: "PLWF_j3s4zc",
      description: "Estrategias efectivas para adaptarte a tu nueva vida.",
    }
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
              align: "center",
              loop: true,
              dragFree: true,
            }}
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                playOnInit: true,
              })
            ]}
            className="w-full relative"
          >
            <CarouselContent>
              {episodes.map((episode, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-video relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${episode.videoId}`}
                        title={episode.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                      ></iframe>
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
