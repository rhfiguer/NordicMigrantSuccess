import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative py-28 text-white bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(135deg, hsla(var(--primary) / 0.75), hsla(var(--primary-dark) / 0.55), hsla(var(--primary) / 0.70)), url('/hero-mountain.jpg')`
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
              CAPITALIZA TU POTENCIAL COMO MIGRANTE DE <span className="relative inline-block">ALTA AMBICION<span className="absolute -bottom-1 left-0 w-full">
                <svg className="w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path className="watercolor" d="M0,8 Q25,0 50,0 T100,8" stroke="#D4AF37" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.4">
                    <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2s" fill="freeze" />
                  </path>
                  <path className="watercolor" d="M0,8 Q25,0 50,0 T100,8" stroke="#D4AF37" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.3" transform="translate(0, 0.5)">
                    <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2s" fill="freeze" />
                  </path>
                </svg>
              </span></span><br className="md:hidden" /> Y SUPERACION (MAAS)
            </h1>
            <p className="text-lg md:text-xl mb-8">
              La red exclusiva para migrantes de alta ambición. Únete a la tribu, accede a mentoría experta y desbloquea herramientas de IA para tu carrera.
            </p>
            <div className="flex justify-center">
              <a
                href="https://somosmaas.lemonsqueezy.com/buy/9a84d545-268d-42da-b7b8-9b77bd47cf43"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="bg-[#D4AF37] hover:bg-[#C09F2F] text-white font-semibold px-6 py-4 text-lg rounded-lg shadow-lg text-center transition transform hover:-translate-y-1 h-auto"
                >
                  Únete a la Tribu ($4.99/mes)
                </Button>
              </a>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
              <img
                src="/hero-community-image.png"
                alt="Comunidad MAAS"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;