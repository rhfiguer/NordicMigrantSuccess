import { scrollToElement } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative py-24 text-white">
      {/* Fondo de imagen de Noruega */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/images/norway-landscape.svg)' }}></div>
      
      {/* Overlay para asegurar la legibilidad del texto */}
      <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-6 drop-shadow-lg">
            Descubre y capitaliza tu potencial Migrante en Noruega
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            ¿Sueñas con construir una vida plena y exitosa, superando los desafíos iniciales y floreciendo en tu nuevo hogar?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollToElement('diagnostico')}
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-8 py-6 rounded-md shadow-lg text-center transition transform hover:-translate-y-1 h-auto"
            >
              Evalúa tu capital migrante
            </Button>
            <Button
              onClick={() => scrollToElement('inscripcion')}
              variant="outline"
              className="bg-white hover:bg-neutral-200 text-primary font-semibold px-8 py-6 rounded-md shadow-lg text-center transition transform hover:-translate-y-1 h-auto"
            >
              Inscríbete al taller
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
