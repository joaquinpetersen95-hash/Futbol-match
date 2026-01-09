import React, { useState } from 'react';
import { Shield, Mail, Clock, HeadphonesIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MobileHeader } from '../navigation/MobileHeader';
import { PaymentForm } from './PaymentForm';
import { CheckoutSummary } from './CheckoutSummary';
import { AdditionalProducts } from './AdditionalProducts';
import { CartItem, PaymentMethod } from '../../types';
import { toast } from 'sonner@2.0.3';

interface CheckoutScreenProps {
  matchData: any;
  onComplete: () => void;
  onBack: () => void;
}

export function CheckoutScreen({ matchData, onComplete, onBack }: CheckoutScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [processing, setProcessing] = useState(false);

  const basePrice = matchData.price || 300;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = basePrice + cartTotal;

  const handleAddToCart = (item: CartItem) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)));
    } else {
      setCart([...cart, item]);
    }
    toast.success(`${item.name} agregado al carrito`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success('¡Pago procesado exitosamente!');
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-8">
      <MobileHeader title="Checkout" onBack={onBack} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Reservation Summary */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Resumen de tu reserva</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Tipo de cancha:</span>
              <span className="font-semibold">{matchData.format}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fecha:</span>
              <span className="font-semibold">{matchData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hora:</span>
              <span className="font-semibold">{matchData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duración:</span>
              <span className="font-semibold">{matchData.duration} min</span>
            </div>
            <div className="border-t border-white/10 pt-2 mt-2 flex justify-between">
              <span className="font-semibold">Subtotal cancha:</span>
              <span className="font-bold text-lg text-[#2ecc71]">${basePrice}</span>
            </div>
          </div>
        </Card>

        {/* Additional Products */}
        <AdditionalProducts onAddToCart={handleAddToCart} />

        {/* Cart Summary */}
        {cart.length > 0 && (
          <CheckoutSummary cart={cart} onUpdateQuantity={handleUpdateQuantity} />
        )}

        {/* Payment Method */}
        <PaymentForm
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          onSubmit={handlePayment}
          processing={processing}
          total={grandTotal}
        />

        {/* Total */}
        <Card className="p-4 bg-gradient-to-r from-[#2ecc71]/20 to-[#27ae60]/20 border border-[#2ecc71]/30">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total a pagar:</span>
            <span className="text-3xl font-bold text-[#2ecc71]">${grandTotal}</span>
          </div>
        </Card>

        {/* Confirm Payment Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handlePayment}
          disabled={processing}
          className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60]"
        >
          {processing ? 'Procesando...' : 'Confirmar Pago'}
        </Button>

        {/* Security Guarantees */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 text-center">
            <Shield size={24} className="mx-auto mb-2 text-[#2ecc71]" />
            <p className="text-xs text-gray-400">Pago seguro SSL</p>
          </Card>
          <Card className="p-3 text-center">
            <Mail size={24} className="mx-auto mb-2 text-[#2ecc71]" />
            <p className="text-xs text-gray-400">Confirmación por email</p>
          </Card>
          <Card className="p-3 text-center">
            <Clock size={24} className="mx-auto mb-2 text-[#2ecc71]" />
            <p className="text-xs text-gray-400">Cancelación gratis 24h</p>
          </Card>
          <Card className="p-3 text-center">
            <HeadphonesIcon size={24} className="mx-auto mb-2 text-[#2ecc71]" />
            <p className="text-xs text-gray-400">Soporte 24/7</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
