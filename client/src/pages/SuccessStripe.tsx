
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function SuccessStripe() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Muchas gracias</h1>
          <p className="text-gray-600">Tu transacción se ha realizado con éxito.</p>
          <a 
            href="/" 
            className="mt-8 text-primary hover:text-primary-dark underline"
          >
            Volver al inicio
          </a>
        </div>
      </Card>
    </div>
  );
}
