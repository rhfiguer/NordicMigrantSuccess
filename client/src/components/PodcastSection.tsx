import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const PodcastSection = () => {
  const playlistId = "PL-KYEmHUPb-01pAuGWY-mCu5LypebYORA";
  const [episodes, setEpisodes] = useState([
    {
      title: "Despliega tu Capital Migrante",
      description: "Descubre el poder del capital migrante y cómo aprovecharlo en tu proceso de integración en Noruega.",
      videoId: "R0qrRxH9pS4",
      image: "/EPDN Marcela.png",
    },
    {
      title: "Claves para la Integración",
      description: "Estrategias prácticas y consejos para una integración exitosa en la sociedad noruega.",
      videoId: "QlnXVugnimw",
      image: "/EPDN Rodrigo.png",
    },
  ]);

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
                      <iframe
                        src={`https://www.youtube.com/embed/${episode.videoId}?list=${playlistId}`}
                        title={episode.title}
                        className="w-full h-full absolute inset-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
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