import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";
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
    <div className="space-y-4">
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
              onClick={() => onSelect('stripe')}
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
                <Wallet className="h-12 w-12 text-primary" />
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