import { useState } from 'react';
import { Home, ShoppingCart, Package, User as UserIcon } from 'lucide-react';
import { Marketplace } from './Marketplace';
import { Cart } from './Cart';
import { MyOrders } from './MyOrders';
import { ConsumerProfile } from './ConsumerProfile';
import type { User, CartItem } from '../../App';

interface ConsumerMainProps {
  user: User;
  onLogout: () => void;
}

export function ConsumerMain({ user, onLogout }: ConsumerMainProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'cart' | 'orders' | 'profile'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === item.product.id);
      if (existing) {
        return prev.map(i => 
          i.product.id === item.product.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => 
      quantity > 0
        ? prev.map(i => i.product.id === productId ? { ...i, quantity } : i)
        : prev.filter(i => i.product.id !== productId)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && <Marketplace user={user} onAddToCart={addToCart} />}
        {activeTab === 'cart' && <Cart cart={cart} user={user} onUpdateQuantity={updateCartQuantity} onClearCart={clearCart} />}
        {activeTab === 'orders' && <MyOrders user={user} />}
        {activeTab === 'profile' && <ConsumerProfile user={user} onLogout={onLogout} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-[#2E7D32] bg-green-50' : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
              activeTab === 'cart' ? 'text-[#2E7D32] bg-green-50' : 'text-gray-500'
            }`}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs">Cart</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'orders' ? 'text-[#2E7D32] bg-green-50' : 'text-gray-500'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'profile' ? 'text-[#2E7D32] bg-green-50' : 'text-gray-500'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
