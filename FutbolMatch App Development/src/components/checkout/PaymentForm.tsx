import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Banknote } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { PaymentMethod } from '../../types';
import { toast } from 'sonner@2.0.3';

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onSubmit: () => void;
  processing: boolean;
  total: number;
}

export function PaymentForm({
  paymentMethod,
  onPaymentMethodChange,
  onSubmit,
  processing,
  total
}: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Tarjeta', icon: CreditCard },
    { id: 'mercadopago' as PaymentMethod, name: 'Mercado Pago', icon: Smartphone },
    { id: 'transfer' as PaymentMethod, name: 'Transferencia', icon: Building },
    { id: 'cash' as PaymentMethod, name: 'Efectivo', icon: Banknote }
  ];

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Método de pago</h3>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-4 gap-2">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => onPaymentMethodChange(method.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                paymentMethod === method.id
                  ? 'border-[#2ecc71] bg-[#2ecc71]/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Icon size={24} className="mx-auto mb-1" />
              <p className="text-xs">{method.name}</p>
            </button>
          );
        })}
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <Card className="p-4 space-y-4">
          <Input
            label="Número de tarjeta"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              if (formatted.replace(/\s/g, '').length <= 16) {
                setCardNumber(formatted);
              }
            }}
            maxLength={19}
          />

          <Input
            label="Nombre del titular"
            placeholder="Como aparece en la tarjeta"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Vencimiento"
              placeholder="MM/AA"
              value={cardExpiry}
              onChange={(e) => {
                const formatted = formatExpiry(e.target.value);
                if (formatted.length <= 5) {
                  setCardExpiry(formatted);
                }
              }}
              maxLength={5}
            />

            <Input
              label="CVV"
              placeholder="123"
              type="password"
              value={cardCvv}
              onChange={(e) => {
                if (e.target.value.length <= 4 && /^\d*$/.test(e.target.value)) {
                  setCardCvv(e.target.value);
                }
              }}
              maxLength={4}
            />
          </div>
        </Card>
      )}

      {/* Mercado Pago */}
      {paymentMethod === 'mercadopago' && (
        <Card className="p-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#00B0F0] rounded-full mx-auto flex items-center justify-center">
              <Smartphone size={32} className="text-white" />
            </div>
            <p className="text-sm text-gray-400">
              Serás redirigido a Mercado Pago para completar tu pago de forma segura
            </p>
            <p className="text-2xl font-bold text-[#2ecc71]">${total}</p>
            <button
              onClick={() => toast.info('Redirigiendo a Mercado Pago...')}
              className="w-full bg-[#00B0F0] hover:bg-[#0090C0] text-white font-bold py-3 rounded-lg transition-colors"
            >
              Pagar con Mercado Pago
            </button>
          </div>
        </Card>
      )}

      {/* Bank Transfer */}
      {paymentMethod === 'transfer' && (
        <Card className="p-4 space-y-3">
          <h4 className="font-bold">Datos bancarios</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Banco:</span>
              <span className="font-semibold">Banco Galicia</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CBU:</span>
              <span className="font-mono text-xs">0070999830000123456789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Alias:</span>
              <span className="font-semibold">FUTBOL.MATCH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Titular:</span>
              <span className="font-semibold">FutbolMatch SA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monto:</span>
              <span className="font-bold text-lg text-[#2ecc71]">${total}</span>
            </div>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-3">
            <p className="text-xs text-yellow-300">
              ⚠️ La confirmación del pago puede tardar hasta 24 horas hábiles
            </p>
          </div>
        </Card>
      )}

      {/* Cash */}
      {paymentMethod === 'cash' && (
        <Card className="p-4 space-y-3">
          <h4 className="font-bold">Pago en efectivo</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p>✓ Llega 15 minutos antes del partido</p>
            <p>✓ Trae el monto exacto: ${total}</p>
            <p>✓ Presenta el código de confirmación</p>
          </div>
          <div className="bg-[#2ecc71]/20 border border-[#2ecc71]/30 rounded-lg p-4 mt-3">
            <p className="text-xs text-gray-400 mb-2">Código de confirmación:</p>
            <p className="text-2xl font-bold text-center tracking-wider">FM-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mt-3">
            <p className="text-xs text-blue-300">
              💡 Recibirás este código por email después de confirmar
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
