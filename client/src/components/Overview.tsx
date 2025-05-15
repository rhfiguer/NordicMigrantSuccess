import { Check } from 'lucide-react';
import { scrollToElement } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Overview = () => {
  return (
    <>
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
            ¿Eres un MAAS?
          </h2>
          <p className="text-neutral-600 text-center leading-relaxed">
            Un MAAS es un Migrante de Alta Ambición y Superación: personas que llegan a Noruega con grandes metas, experiencias valiosas y el deseo firme de construir una vida plena. Sabemos que adaptarse a una nueva cultura puede ser un reto, especialmente cuando los códigos sociales cambian y tus talentos no siempre se reconocen de inmediato. Por eso creamos este taller: para ayudarte a capitalizar todo lo que ya traes contigo, identificar tus áreas de mejora con un test gratuito de autodiagnóstico, y entregarte herramientas prácticas que impulsen tu integración y desarrollo personal. Porque juntos somos más, y construir comunidad es el primer paso.
          </p>
        </div>
      </div>
    </section>
    <section id="taller" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-3 text-primary">
            Despliega tu Capital MAAS
          </h2>
          <p className="text-center text-neutral-600 mb-10">
            Un taller virtual de 4 encuentros diseñado específicamente para inmigrantes ambiciosos como tú
          </p>

          <div className="bg-neutral-100 p-6 rounded-lg mb-10">
            <p className="mb-4">
              Basándonos en las poderosas teorías del capital social, cultural, económico y erótico de Pierre Bourdieu y Catherine Hakim, te proporcionaremos un marco de comprensión profundo sobre:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>Los recursos que ya posees y puedes aprovechar</span>
              </li>
              <li className="flex items-start">
                <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>Las capacidades que necesitas desarrollar para prosperar</span>
              </li>
              <li className="flex items-start">
                <Check className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>Estrategias prácticas para una integración exitosa</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary text-white rounded-lg flex items-center justify-center p-6">
              <div className="text-center">
                <i className="fas fa-users text-4xl mb-3 text-primary"></i>
                <h3 className="font-poppins font-semibold">4 Encuentros</h3>
              </div>
            </div>
            <div className="bg-secondary text-white rounded-lg flex items-center justify-center p-6">
              <div className="text-center">
                <i className="fas fa-globe text-4xl mb-3 text-primary"></i>
                <h3 className="font-poppins font-semibold">100% Virtual</h3>
              </div>
            </div>
            <div className="bg-secondary text-white rounded-lg flex items-center justify-center p-6">
              <div className="text-center">
                <i className="fas fa-file-alt text-4xl mb-3 text-primary"></i>
                <h3 className="font-poppins font-semibold">Material Exclusivo</h3>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Overview;