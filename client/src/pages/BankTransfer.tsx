
import { Card } from "@/components/ui/card";
import { CopyIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function BankTransfer() {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("32015362307");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Datos para Transferencia Bancaria</h1>
          
          <div className="w-full bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Banco:</p>
            <p className="text-xl font-bold mb-4">Sparebank</p>
            
            <p className="text-sm text-gray-600 mb-2">Número de cuenta:</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-mono font-bold">32015362307</p>
              <button 
                onClick={copyAccountNumber}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <CopyIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="text-left w-full space-y-4">
            <p className="text-sm text-gray-600">
              <strong>Instrucciones:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Envía un correo a <span className="font-medium">elpodcastdenoruega@gmail.com</span> indicando:
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Tu nombre completo</li>
                  <li>El taller que deseas adquirir</li>
                </ul>
              </li>
              <li>Realiza la transferencia por el monto acordado</li>
              <li>Guarda el comprobante de transferencia</li>
              <li>Recibirás un email de confirmación cuando verifiquemos el pago</li>
            </ol>
          </div>

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
