import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { CartItem } from '../../types';

interface CheckoutSummaryProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CheckoutSummary({ cart, onUpdateQuantity }: CheckoutSummaryProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="p-4">
      <h3 className="font-bold mb-3">Productos adicionales</h3>
      
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-white/10 last:border-0 last:pb-0">
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">${item.price} c/u</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                {item.quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
              </button>

              <span className="w-8 text-center font-bold">{item.quantity}</span>

              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="w-20 text-right">
              <p className="font-bold text-[#2ecc71]">${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center">
        <span className="font-semibold">Total productos:</span>
        <span className="font-bold text-xl text-[#2ecc71]">${total}</span>
      </div>
    </Card>
  );
}
