
import { Button } from "@/components/ui/button";
import { useNavigate } from "wouter";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="mb-8"
        >
          ← Volver
        </Button>

        <h1 className="font-poppins font-bold text-3xl mb-8">Política de Privacidad</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            Última actualización: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Información que Recolectamos</h2>
            <p>Recolectamos la siguiente información cuando te registras en nuestro taller:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>País de origen</li>
              <li>Tiempo de residencia en Noruega</li>
              <li>Respuestas al diagnóstico de capital migrante (si decides realizarlo)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
            <p>Utilizamos tu información personal para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Gestionar tu inscripción al taller</li>
              <li>Enviarte información relevante sobre el taller</li>
              <li>Proporcionarte tu diagnóstico personalizado</li>
              <li>Mejorar nuestros servicios y contenidos</li>
              <li>Si has dado tu consentimiento, enviarte información sobre futuros eventos y recursos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Base Legal para el Procesamiento</h2>
            <p>Procesamos tu información personal bajo las siguientes bases legales:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Ejecución del contrato de servicios del taller</li>
              <li>Tu consentimiento explícito para el envío de comunicaciones adicionales</li>
              <li>Nuestros intereses legítimos en mejorar nuestros servicios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Compartiendo tu Información</h2>
            <p>No vendemos ni compartimos tu información personal con terceros, excepto:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cuando sea necesario para proporcionar nuestros servicios</li>
              <li>Cuando estemos legalmente obligados a hacerlo</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Tus Derechos</h2>
            <p>Tienes los siguientes derechos sobre tus datos personales:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Derecho de acceso a tus datos</li>
              <li>Derecho de rectificación</li>
              <li>Derecho de supresión ("derecho al olvido")</li>
              <li>Derecho a la limitación del tratamiento</li>
              <li>Derecho a la portabilidad de los datos</li>
              <li>Derecho de oposición</li>
              <li>Derecho a retirar el consentimiento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales
              contra el acceso, modificación o divulgación no autorizados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
            <p>
              Para ejercer tus derechos o realizar consultas sobre el tratamiento de tus datos,
              puedes contactarnos a través de [tu-email@dominio.com]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
