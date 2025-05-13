
import { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function Cancel() {
  useEffect(() => {
    console.log('Payment cancelled or failed');
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <XCircle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pago No Completado</h1>
          <p className="text-gray-600 mb-4">
            El proceso de pago fue cancelado o no se pudo completar. Por favor, intenta nuevamente.
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
