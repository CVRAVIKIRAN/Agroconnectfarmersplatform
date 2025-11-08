import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { User, Order } from '../../App';

interface MyOrdersProps {
  user: User;
}

export function MyOrders({ user }: MyOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const allOrders: Order[] = JSON.parse(localStorage.getItem('agroconnect_pro_orders') || '[]');
    const myOrders = allOrders.filter(o => o.consumerId === user.id);
    setOrders(myOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <h2>My Orders</h2>
        <p className="text-white/80 text-sm mt-1">{orders.length} orders placed</p>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No orders yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <ImageWithFallback
                      src={order.productImage}
                      alt={order.productName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm mb-1">{order.productName}</h3>
                          <p className="text-xs text-gray-600">Farmer: {order.farmerName}</p>
                        </div>
                        <Badge className="bg-green-600">{order.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Qty: {order.quantity}</span>
                        <span className="text-[#2E7D32]">₹{order.amount}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
