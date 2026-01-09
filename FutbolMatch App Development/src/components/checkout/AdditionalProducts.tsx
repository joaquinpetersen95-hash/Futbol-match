import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CartItem } from '../../types';

interface AdditionalProductsProps {
  onAddToCart: (item: CartItem) => void;
}

const PRODUCTS = [
  { id: 'ball', name: 'Pelota de fútbol', price: 150, icon: '⚽' },
  { id: 'cones', name: 'Conos de entrenamiento', price: 80, icon: '🔺' },
  { id: 'bibs', name: 'Petos/chalecos (set 10)', price: 120, icon: '👕' },
  { id: 'drinks', name: 'Bebidas isotónicas', price: 50, icon: '🥤' },
  { id: 'snacks', name: 'Snacks', price: 40, icon: '🍫' }
];

export function AdditionalProducts({ onAddToCart }: AdditionalProductsProps) {
  const [expanded, setExpanded] = useState(false);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Productos adicionales</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-[#2ecc71] hover:underline"
        >
          {expanded ? 'Ocultar' : 'Ver todo'}
        </button>
      </div>

      <div className={`grid ${expanded ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
        {PRODUCTS.slice(0, expanded ? PRODUCTS.length : 4).map((product) => (
          <Card
            key={product.id}
            className="p-3 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{product.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{product.name}</p>
                <p className="text-[#2ecc71] font-bold">${product.price}</p>
              </div>
              <button
                onClick={() => handleAdd(product)}
                className="w-8 h-8 bg-[#2ecc71] hover:bg-[#27ae60] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Plus size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
