import React, { useState } from 'react';
import { Crown, Shield, Trophy, Target, Sparkles, Shirt, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MobileHeader } from '../navigation/MobileHeader';
import { BottomNav } from '../navigation/BottomNav';
import { MOCK_STORE_PRODUCTS } from '../../data/mockData';
import { User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface StoreSectionProps {
  user: User;
  onNavigate: (section: string) => void;
}

type StoreTab = 'premium' | 'cosmetic' | 'booster';

export function StoreSection({ user, onNavigate }: StoreSectionProps) {
  const [activeTab, setActiveTab] = useState<StoreTab>('premium');

  const iconMap: Record<string, React.ElementType> = {
    Crown,
    Shield,
    Trophy,
    Target,
    Sparkles,
    Shirt,
    Zap
  };

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  };

  const products = MOCK_STORE_PRODUCTS.filter((p) => p.category === activeTab);

  const handlePurchase = (product: typeof MOCK_STORE_PRODUCTS[0]) => {
    if (user.coins >= product.price) {
      toast.success(`¡${product.name} comprado!`);
    } else {
      toast.error('No tienes suficientes monedas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-20">
      <MobileHeader title="Tienda" onBack={() => onNavigate('home')} />

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* User Coins */}
        <Card className="p-4 bg-gradient-to-r from-[#f1c40f]/20 to-[#f39c12]/20 border border-[#f1c40f]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#f1c40f] to-[#f39c12] rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Tus monedas</p>
                <p className="text-2xl font-bold text-[#f1c40f]">{user.coins}</p>
              </div>
            </div>
            <Button size="sm" variant="gold">
              Comprar más
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'premium'
                ? 'bg-gradient-to-r from-[#f1c40f] to-[#f39c12] text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Premium
          </button>
          <button
            onClick={() => setActiveTab('cosmetic')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'cosmetic'
                ? 'bg-gradient-to-r from-[#f1c40f] to-[#f39c12] text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Cosméticos
          </button>
          <button
            onClick={() => setActiveTab('booster')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'booster'
                ? 'bg-gradient-to-r from-[#f1c40f] to-[#f39c12] text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Boosters
          </button>
        </div>

        {/* Products */}
        <div className="space-y-4">
          {products.map((product) => {
            const Icon = iconMap[product.icon] || Crown;
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Card
                key={product.id}
                className={`p-4 relative overflow-hidden ${
                  product.rarity
                    ? `bg-gradient-to-br ${rarityColors[product.rarity]}/10`
                    : ''
                }`}
              >
                {product.popular && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="gold" size="sm">
                      Popular
                    </Badge>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                      product.rarity
                        ? `bg-gradient-to-br ${rarityColors[product.rarity]}`
                        : 'bg-gradient-to-br from-[#2ecc71] to-[#27ae60]'
                    }`}
                  >
                    <Icon size={32} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{product.name}</h3>
                      {product.rarity && (
                        <Badge
                          size="sm"
                          className={`bg-gradient-to-r ${rarityColors[product.rarity]} text-white`}
                        >
                          {product.rarity.toUpperCase()}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-400 mb-3">{product.description}</p>

                    {product.features && (
                      <div className="space-y-1 mb-3">
                        {product.features.map((feature, index) => (
                          <p key={index} className="text-xs text-gray-400">
                            ✓ {feature}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#2ecc71]">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <div className="flex flex-col items-start">
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                            <span className="text-xs text-red-400 font-bold">
                              -{discount}%
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        size="sm"
                        onClick={() => handlePurchase(product)}
                        disabled={user.coins < product.price}
                      >
                        Comprar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <BottomNav activeSection="profile" onNavigate={onNavigate} />
    </div>
  );
}
