import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  countryOrigin: string;
  city: string;
  testimonial: string;
  imageUrl?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
          Lo que dicen nuestros participantes
        </h2>
        <p className="text-center text-neutral-600 mb-10 max-w-2xl mx-auto">
          Historias de éxito de inmigrantes que han transformado su experiencia en Noruega
        </p>
        
        {testimonials.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-neutral-500">Cargando testimonios...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 bg-secondary rounded-full mr-4 overflow-hidden">
                      <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                      <AvatarFallback className="bg-secondary text-primary">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-poppins font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-500">{testimonial.countryOrigin} → {testimonial.city}</p>
                    </div>
                  </div>
                  <p className="text-neutral-700">
                    "{testimonial.testimonial}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
