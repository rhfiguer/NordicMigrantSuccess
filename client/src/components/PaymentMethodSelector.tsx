
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, BankTransfer } from "lucide-react";

interface PaymentMethodSelectorProps {
  amount: number;
  onSelect: (method: 'stripe' | 'transfer') => void;
  onBack: () => void;
}

const PaymentMethodSelector = ({ amount, onSelect, onBack }: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-poppins font-semibold text-xl mb-4 text-center">
        Selecciona tu método de pago
      </h3>
      
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
            <BankTransfer className="h-12 w-12 text-primary" />
            <div>
              <h4 className="font-semibold mb-2">Transferencia bancaria</h4>
              <p className="text-sm text-neutral-600">Recibirás los datos por email</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center mt-6">
        <p className="text-lg font-semibold mb-4">Total a pagar: {amount} NOK</p>
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mt-2"
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
