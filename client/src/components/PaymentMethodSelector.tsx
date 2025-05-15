import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from "@/components/ui/card";
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { CreditCard, Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethodSelectorProps {
  onSelect: (method: 'stripe' | 'transfer') => void;
  onBack: () => void;
  registrationData: {
    name: string;
    email: string;
    phone?: string;
    countryOrigin?: string;
    timeInNorway?: string;
    acceptedPrivacy: boolean;
    acceptedPrivacy: boolean;
  };
}

const WORKSHOPS = [
  { id: 'intro', name: 'Sesión Introductoria', price: 10 },
  { id: 'single', name: 'Una Sesión Individual', price: 400 },
  { id: 'full', name: 'Taller Completo', price: 600 }
];

const PaymentMethodSelector = ({ onSelect, onBack, registrationData }: PaymentMethodSelectorProps) => {
  const [, setLocation] = useLocation();
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [isTransferLoading, setIsTransferLoading] = useState(false);
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
              className={`p-6 cursor-pointer hover:border-primary transition-colors ${isStripeLoading ? 'opacity-50' : ''}`}
              onClick={async () => {
                if (isStripeLoading) return;
                setIsStripeLoading(true);
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

                  console.log('Cargando Stripe con clave pública:', 'pk_live_51ROHXFF7OOrZyCwXf3jbYJ0jq1dkaQyKwusY4g5SUU4ygTzoNhtj0h4CB5UqP13zuPJr5xEZyL3LlXbVgZDTMmjo00yiLZpEEl');
                  const stripe = await loadStripe('pk_live_51ROHXFF7OOrZyCwXf3jbYJ0jq1dkaQyKwusY4g5SUU4ygTzoNhtj0h4CB5UqP13zuPJr5xEZyL3LlXbVgZDTMmjo00yiLZpEEl');

                  if (!stripe) {
                    throw new Error('No se pudo inicializar Stripe. Verifica la clave pública.');
                  }

                  console.log('Redirigiendo a Stripe Checkout con sessionId:', sessionId);
                  console.log('Redirigiendo a Stripe con sessionId:', sessionId);
                  const { error } = await stripe.redirectToCheckout({ 
                    sessionId: sessionId
                  });

                  if (error) {
                    console.error('Error en redirectToCheckout:', error);
                    throw new Error(`Error de Stripe: ${error.message}`);
                  } else {
                    console.log('Redirección exitosa');
                    // La redirección ocurrirá automáticamente
                  }
                } catch (error) {
                  console.error('Error detallado:', error);
                  alert(`Error en el proceso de pago: ${error instanceof Error ? error.message : 'Error desconocido'}`);
                } finally {
                  setIsStripeLoading(false);
                }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4 relative">
                {isStripeLoading ? (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : null}
                <CreditCard className={`h-12 w-12 ${isStripeLoading ? 'text-primary/50' : 'text-primary'}`} />
                <div>
                  <h4 className="font-semibold mb-2">Pago con tarjeta</h4>
                  <p className="text-sm text-neutral-600">
                    {isStripeLoading ? 'Procesando pago...' : 'Pago seguro con tarjeta de crédito/débito'}
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 cursor-pointer hover:border-primary transition-colors ${isTransferLoading ? 'opacity-50' : ''}`}
              onClick={async () => {
                if (isTransferLoading) return;
                setIsTransferLoading(true);

                try {
                  const selectedWorkshopData = WORKSHOPS.find(w => w.id === selectedWorkshop);
                  if (!selectedWorkshopData) {
                    throw new Error('Por favor selecciona un taller');
                  }

                  const response = await fetch('/api/bank-transfer', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: registrationData.name,
                      email: registrationData.email,
                      workshopId: selectedWorkshopData.id,
                      amount: selectedWorkshopData.price,
                      phone: registrationData.phone,
                      countryOrigin: registrationData.countryOrigin,
                      timeInNorway: registrationData.timeInNorway,
                      acceptedPrivacy: registrationData.acceptedPrivacy
                    }),
                  });

                  const result = await response.json();

                  if (!response.ok) {
                    throw new Error(result.message || 'Error al procesar el registro');
                  }

                  setLocation('/success');
                } catch (error) {
                  console.error('Error:', error);
                  alert(error instanceof Error ? error.message : 'Hubo un error al procesar tu registro. Por favor intenta nuevamente.');
                  setIsTransferLoading(false);
                }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4 relative">
                {isTransferLoading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}
                <Building2 className={`h-12 w-12 ${isTransferLoading ? 'text-primary/50' : 'text-primary'}`} />
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