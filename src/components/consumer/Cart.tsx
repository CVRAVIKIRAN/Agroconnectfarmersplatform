import { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { User, CartItem, Order } from '../../App';

interface CartProps {
  cart: CartItem[];
  user: User;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export function Cart({ cart, user, onUpdateQuantity, onClearCart }: CartProps) {
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const fee = Math.round(subtotal * 0.02);
  const total = subtotal + fee;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orders: Order[] = cart.map(item => ({
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      consumerId: user.id,
      consumerName: user.fullName,
      consumerPhone: user.mobile,
      farmerId: item.product.farmerId,
      farmerName: item.product.farmerName,
      farmerPhone: item.product.farmerPhone,
      quantity: item.quantity,
      amount: item.product.price * item.quantity,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryAddress: user.location.address,
    }));

    const allOrders = JSON.parse(localStorage.getItem('agroconnect_pro_orders') || '[]');
    localStorage.setItem('agroconnect_pro_orders', JSON.stringify([...allOrders, ...orders]));

    onClearCart();
    setProcessing(false);
    toast.success('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <h2>Shopping Cart</h2>
        <p className="text-white/80 text-sm mt-1">{cart.length} items</p>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-32">
        {cart.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Your cart is empty</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <Card key={item.product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{item.product.name}</h3>
                        <p className="text-[#2E7D32] mb-2">₹{item.product.price}/{item.product.unit}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value) || 0)}
                            className="h-8 w-16 text-center"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onUpdateQuantity(item.product.id, 0)}
                            className="ml-auto text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Platform Fee</span>
                  <span>₹{fee}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Total</span>
                  <span className="text-[#2E7D32]">₹{total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 shadow-lg">
          <Button
            onClick={handleCheckout}
            disabled={processing}
            className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Checkout ₹{total.toLocaleString()}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
