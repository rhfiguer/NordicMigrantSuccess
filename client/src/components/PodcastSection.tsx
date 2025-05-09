
import React from "react";
import Autoplay from 'embla-carousel-autoplay';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PodcastSection = () => {
  const episodes = [
    {
      title: "Episodio 1",
      videoId: "AP3tYwcK2hU",
      description: "Estrategias para maximizar tu potencial como inmigrante.",
    },
    {
      title: "Episodio 2",
      videoId: "DK61ELg8DG8",
      description: "Claves para una adaptación exitosa a la cultura noruega.",
    },
    {
      title: "Episodio 3",
      videoId: "u0lNm5sDeXQ",
      description: "Consejos para tu crecimiento profesional en Noruega.",
    },
    {
      title: "Episodio 4",
      videoId: "C45npAwITQM",
      description: "Cómo construir una red de contactos valiosa.",
    },
    {
      title: "Episodio 5",
      videoId: "Ego013xxLWM",
      description: "Herramientas para enfrentar los retos de la migración.",
    },
    {
      title: "Episodio 6",
      videoId: "1VhVfUZfaXQ",
      description: "Pasos clave para construir tu futuro en Noruega.",
    },
    {
      title: "Episodio 7",
      videoId: "5Tdw1Jkc4bM",
      description: "Experiencias y consejos para alcanzar el éxito.",
    },
    {
      title: "Episodio 8",
      videoId: "G-RIHSD_n9c",
      description: "Estrategias efectivas para adaptarte a tu nueva vida.",
    },
    {
      title: "Episodio 9",
      videoId: "cuWn7VP0i3A",
      description: "Más consejos para tu integración en Noruega.",
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
