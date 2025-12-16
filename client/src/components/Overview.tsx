import { Check } from 'lucide-react';
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
              Un MAAS es un Migrante de Alta Ambición de Superación: personas que llegan a Noruega con grandes metas, experiencias valiosas y el deseo firme de construir una vida plena. Sabemos que adaptarse a una nueva cultura puede ser un reto, especialmente cuando los códigos sociales cambian y tus talentos no siempre se reconocen de inmediato. Por eso creamos este taller: para ayudarte a capitalizar todo lo que ya traes contigo, identificar tus áreas de mejora con un test gratuito de autodiagnóstico, y entregarte herramientas prácticas que impulsen tu integración y desarrollo personal. Porque juntos somos más, y construir comunidad es el primer paso.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-4 text-primary drop-shadow-sm">
              Todo lo que incluye tu Membresía Ambición MAAS
            </h2>
            <p className="text-center text-secondary text-lg mb-12 font-medium">
              Únete y desbloquea herramientas y conexiones para acelerar tu carrera en Noruega
            </p>

            <div className="bg-neutral-50 p-8 rounded-2xl shadow-sm border border-neutral-100 mb-10">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-gold/10 p-2 rounded-full mr-4 mt-0.5">
                    <Check className="text-gold-dim h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-secondary text-lg block mb-1">Analizador Cósmico de CV</span>
                    <p className="text-neutral-600 leading-relaxed">Acceso ilimitado a nuestra IA para optimizar tu perfil profesional y alinearlo con las demandas del mercado nórdico.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold/10 p-2 rounded-full mr-4 mt-0.5">
                    <Check className="text-gold-dim h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-secondary text-lg block mb-1">Networking de Alto Nivel</span>
                    <p className="text-neutral-600 leading-relaxed">Conecta con otros migrantes ambiciosos y mentores en Noruega que comparten tu mentalidad de crecimiento.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-gold/10 p-2 rounded-full mr-4 mt-0.5">
                    <Check className="text-gold-dim h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-secondary text-lg block mb-1">Contenido Exclusivo</span>
                    <p className="text-neutral-600 leading-relaxed">Webinars tácticos, guías de integración y soporte continuo por parte de la comunidad.</p>
                  </div>
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