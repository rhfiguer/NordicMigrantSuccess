
import { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Success() {
  useEffect(() => {
    // Podemos agregar lógica adicional aquí si es necesario
    console.log('Payment successful');
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-600 mb-4">
            Tu pago ha sido procesado correctamente. Pronto recibirás un correo electrónico con los detalles del taller.
          </p>
          <a 
            href="/" 
            className="text-primary hover:text-primary-dark underline"
          >
            Volver al inicio
          </a>
        </div>
      </Card>
    </div>
  );
}
