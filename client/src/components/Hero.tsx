
import { scrollToElement } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import HeroQuizBox from './HeroQuizBox';
import { QuizQuestion } from '@/types/quiz';

interface HeroProps {
  quizQuestions: QuizQuestion[];
}

const Hero: React.FC<HeroProps> = ({ quizQuestions }) => {
  return (
    <section className="relative py-28 text-white bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(135deg, hsla(var(--primary) / 0.75), hsla(var(--primary-dark) / 0.55), hsla(var(--primary) / 0.70)), url('/hero-background.jpg')`
    }}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:pr-6">
            <h1 className="font-poppins font-bold text-3xl md:text-5xl leading-tight mb-6">
              CAPITALIZA TU POTENCIAL COMO MIGRANTE DE <span className="relative">ALTA AMBICION<span className="absolute bottom-0 left-0 w-full h-[25px] bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 500 20\' height=\'25\' preserveAspectRatio=\'none\'%3e%3cpath d=\'M 0 15 Q 125 5, 250 15 T 500 15\' stroke=\'hsl(15, 80%, 55%)\' stroke-width=\'6\' fill=\'none\' stroke-linecap=\'round\'/%3e%3c/svg%3e')] bg-no-repeat bg-cover opacity-40"></span></span> Y SUPERACION (MAAS)
            </h1>
            <p className="text-lg md:text-xl mb-8">
              ¿Sueñas con construir una vida plena y exitosa, superando los desafíos iniciales y floreciendo en tu nuevo hogar?
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => scrollToElement('inscripcion')}
                variant="outline"
                className="bg-white hover:bg-neutral-200 text-primary font-semibold px-8 py-6 rounded-lg shadow-lg text-center transition transform hover:-translate-y-1 h-auto"
              >
                Inscríbete al taller
              </Button>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full lg:max-w-xl">
              <HeroQuizBox 
                questions={quizQuestions} 
                onGetFullDiagnostic={() => scrollToElement('diagnostico')} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
