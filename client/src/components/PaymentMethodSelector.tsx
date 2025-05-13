
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethodSelectorProps {
  onSelect: (method: 'stripe' | 'transfer') => void;
  onBack: () => void;
}

const WORKSHOPS = [
  { id: 'intro', name: 'Sesión Introductoria', price: 50 },
  { id: 'single', name: 'Una Sesión Individual', price: 400 },
  { id: 'full', name: 'Taller Completo', price: 600 }
];

const PaymentMethodSelector = ({ onSelect, onBack }: PaymentMethodSelectorProps) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const selectedPrice = WORKSHOPS.find(w => w.id === selectedWorkshop)?.price || 0;

  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-auto">
      <h3 className="font-poppins font-semibold text-xl mb-4 text-center">
        Selecciona el taller
      </h3>

      <div className="mb-6">
        <Select onValueChange={setSelectedWorkshop} value={selectedWorkshop}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un taller" />
          </SelectTrigger>
          <SelectContent>
            {WORKSHOPS.map(workshop => (
              <SelectItem key={workshop.id} value={workshop.id}>
                {workshop.name} - {workshop.price} NOK
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedWorkshop && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Card 
              className="p-6 cursor-pointer hover:border-primary transition-colors"
              onClick={async () => {
                try {
                  const selectedWorkshopData = WORKSHOPS.find(w => w.id === selectedWorkshop);
                  if (!selectedWorkshopData) {
                    throw new Error('Por favor selecciona un taller');
                  }
                  
                  console.log('Iniciando creación de sesión de pago para:', selectedWorkshopData.name, 'precio:', selectedWorkshopData.price);
                  const response = await fetch('/api/create-payment-session', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      workshop: selectedWorkshopData.name,
                      price: selectedWorkshopData.price
                    }),
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error del servidor: ${errorData.message || response.statusText}`);
                  }
                  
                  console.log('Sesión de pago creada, obteniendo ID...');
                  const { sessionId } = await response.json();
                  
                  console.log('Cargando Stripe con clave pública:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                  
                  if (!stripe) {
                    throw new Error('No se pudo inicializar Stripe. Verifica la clave pública.');
                  }
                  
                  console.log('Redirigiendo a Stripe Checkout con sessionId:', sessionId);
                  const result = await stripe.redirectToCheckout({ 
                    sessionId: sessionId
                  });
                  
                  console.log('Resultado de redirección:', result);
                  if (result.error) {
                    console.error('Error en redirectToCheckout:', result.error);
                    throw new Error(`Error de Stripe: ${result.error.message}`);
                  }
                } catch (error) {
                  console.error('Error detallado:', error);
                  alert(`Error en el proceso de pago: ${error instanceof Error ? error.message : 'Error desconocido'}`);
                }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <CreditCard className="h-12 w-12 text-primary" />
                <div>
                  <h4 className="font-semibold mb-2">Pago con tarjeta</h4>
                  <p className="text-sm text-neutral-600">Pago seguro con tarjeta de crédito/débito</p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer hover:border-primary transition-colors"
              onClick={() => onSelect('transfer')}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Building2 className="h-12 w-12 text-primary" />
                <div>
                  <h4 className="font-semibold mb-2">Transferencia bancaria</h4>
                  <p className="text-sm text-neutral-600">Recibirás los datos por email</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-6">
            <p className="text-lg font-semibold mb-4">Total a pagar: {selectedPrice} NOK</p>
            <Button 
              variant="outline" 
              onClick={onBack}
              className="mt-2"
            >
              Volver
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
