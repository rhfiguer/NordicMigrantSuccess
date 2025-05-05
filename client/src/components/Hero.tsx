import { scrollToElement } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HeroQuizBox from './HeroQuizBox';

const Hero = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M0,300 Q150,250 300,300 T600,300 T900,300 T1200,300 V500 H0 Z"
            fill="white"
            fillOpacity="0.1"
          />
          <path
            d="M0,400 Q150,350 300,400 T600,400 T900,400 T1200,400 V600 H0 Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="max-w-3xl">
            <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-6">
              Descubre y capitaliza tu potencial Migrante en Noruega
            </h1>
            <p className="text-lg md:text-xl mb-8">
              ¿Sueñas con construir una vida plena y exitosa, superando los desafíos iniciales y floreciendo en tu nuevo hogar?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToElement('diagnostico')}
                className="bg-secondary hover:bg-secondary-dark text-primary font-semibold px-8 py-6 rounded-md shadow-lg text-center transition transform hover:-translate-y-1 h-auto"
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
          
          <div className="w-full lg:w-auto mt-6 lg:mt-0 flex justify-center">
            <HeroQuizBox onGetFullDiagnostic={() => scrollToElement('diagnostico')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
