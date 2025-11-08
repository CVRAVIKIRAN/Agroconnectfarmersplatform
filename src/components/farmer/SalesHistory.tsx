import { useEffect, useState } from 'react';
import { DollarSign, Package, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User, Order } from '../../App';

interface SalesHistoryProps {
  user: User;
}

export function SalesHistory({ user }: SalesHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ total: 0, earnings: 0 });

  useEffect(() => {
    const allOrders: Order[] = JSON.parse(localStorage.getItem('agroconnect_pro_orders') || '[]');
    const myOrders = allOrders.filter(o => o.farmerId === user.id);
    setOrders(myOrders);
    setStats({
      total: myOrders.length,
      earnings: myOrders.reduce((sum, o) => sum + o.amount, 0)
    });
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <h2>Sales History</h2>
        <p className="text-white/80 text-sm mt-1">Track your orders and earnings</p>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <Package className="w-8 h-8 text-[#2E7D32] mb-2" />
              <p className="text-2xl mb-1">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <DollarSign className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-2xl mb-1">₹{stats.earnings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </CardContent>
          </Card>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No sales yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm">{order.productName}</h3>
                    <Badge className="bg-green-600">{order.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Customer: {order.consumerName}</p>
                  <div className="flex justify-between text-sm">
                    <span>Quantity: {order.quantity}</span>
                    <span className="text-[#2E7D32]">₹{order.amount}</span>
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
