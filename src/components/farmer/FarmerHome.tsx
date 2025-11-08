import { useEffect, useState } from 'react';
import { Package, CheckCircle, Clock, DollarSign, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User, Product, Order } from '../../App';

interface FarmerHomeProps {
  user: User;
}

export function FarmerHome({ user }: FarmerHomeProps) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    verified: 0,
    pending: 0,
    totalSales: 0,
    earnings: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadStats();
  }, [user.id]);

  const loadStats = () => {
    const products: Product[] = JSON.parse(localStorage.getItem('agroconnect_pro_products') || '[]');
    const myProducts = products.filter(p => p.farmerId === user.id);
    
    const orders: Order[] = JSON.parse(localStorage.getItem('agroconnect_pro_orders') || '[]');
    const myOrders = orders.filter(o => o.farmerId === user.id);

    setStats({
      totalProducts: myProducts.length,
      verified: myProducts.filter(p => p.status === 'verified').length,
      pending: myProducts.filter(p => p.status === 'pending').length,
      totalSales: myOrders.length,
      earnings: myOrders.reduce((sum, o) => sum + o.amount, 0),
    });

    setRecentProducts(myProducts.slice(0, 3));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2">Welcome Back!</h1>
          <p className="text-white/90">{user.fullName}</p>
          <p className="text-white/80 text-sm mt-1">📍 {user.location.town}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Package className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-3xl mb-1">{stats.totalProducts}</p>
              <p className="text-sm opacity-90">Total Products</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <CheckCircle className="w-8 h-8 opacity-80" />
                <Star className="w-5 h-5" />
              </div>
              <p className="text-3xl mb-1">{stats.verified}</p>
              <p className="text-sm opacity-90">Verified</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Clock className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-3xl mb-1">{stats.pending}</p>
              <p className="text-sm opacity-90">Pending Approval</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-3xl mb-1">₹{stats.earnings.toLocaleString()}</p>
              <p className="text-sm opacity-90">Total Earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No products uploaded yet</p>
                <p className="text-sm mt-1">Start by uploading your first product!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProducts.map(product => (
                  <div key={product.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 truncate">{product.name}</h3>
                      <p className="text-xs text-gray-600">₹{product.price}/{product.unit}</p>
                      <Badge 
                        variant={product.status === 'verified' ? 'default' : 'outline'}
                        className={`mt-1 text-xs ${
                          product.status === 'verified' ? 'bg-green-600' :
                          product.status === 'pending' ? 'bg-orange-500 text-white' :
                          ''
                        }`}
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
          <CardContent className="p-6">
            <h3 className="mb-2">🚀 Quick Tip</h3>
            <p className="text-white/90 text-sm">
              Upload high-quality product images and detailed descriptions to attract more buyers. 
              Products with clear photos sell 3x faster!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
