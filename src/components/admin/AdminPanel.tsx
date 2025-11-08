import { useState, useEffect } from 'react';
import { Shield, Check, X, Users, Package, TrendingUp, Star, Search, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import type { User as UserType, Product, Order } from '../../App';

interface AdminPanelProps {
  user: UserType;
  onLogout: () => void;
}

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(JSON.parse(localStorage.getItem('agroconnect_pro_products') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('agroconnect_pro_users') || '[]'));
    setOrders(JSON.parse(localStorage.getItem('agroconnect_pro_orders') || '[]'));
  };

  const handleVerifyProduct = (productId: string) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, status: 'verified' as const } : p
    );
    localStorage.setItem('agroconnect_pro_products', JSON.stringify(updated));
    setProducts(updated);
    toast.success('Product verified successfully!');
  };

  const handleRejectProduct = (productId: string) => {
    if (confirm('Are you sure you want to reject this product?')) {
      const updated = products.map(p => 
        p.id === productId ? { ...p, status: 'rejected' as const } : p
      );
      localStorage.setItem('agroconnect_pro_products', JSON.stringify(updated));
      setProducts(updated);
      toast.success('Product rejected');
    }
  };

  const handleFeatureProduct = (productId: string) => {
    const updated = products.map(p => 
      p.id === productId ? { ...p, featured: !p.featured } : p
    );
    localStorage.setItem('agroconnect_pro_products', JSON.stringify(updated));
    setProducts(updated);
    toast.success('Product featured status updated');
  };

  const pending = products.filter(p => p.status === 'pending');
  const verified = products.filter(p => p.status === 'verified');
  const farmers = users.filter(u => u.role === 'farmer');
  const consumers = users.filter(u => u.role === 'consumer');

  const filteredPending = pending.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1>Admin Panel</h1>
              <p className="text-white/80 text-sm mt-1">AgroConnect Pro Management</p>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <Package className="w-8 h-8 opacity-80 mb-2" />
              <p className="text-2xl mb-1">{pending.length}</p>
              <p className="text-sm opacity-90">Pending</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <Check className="w-8 h-8 opacity-80 mb-2" />
              <p className="text-2xl mb-1">{verified.length}</p>
              <p className="text-sm opacity-90">Verified</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <Users className="w-8 h-8 opacity-80 mb-2" />
              <p className="text-2xl mb-1">{farmers.length}</p>
              <p className="text-sm opacity-90">Farmers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 opacity-80 mb-2" />
              <p className="text-2xl mb-1">{orders.length}</p>
              <p className="text-sm opacity-90">Orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Pending ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Verified
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Pending Products */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Products Awaiting Verification</CardTitle>
                <CardDescription>Review and approve farmer-uploaded products</CardDescription>
                
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredPending.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending products</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPending.map(product => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 flex-shrink-0">
                            <ImageWithFallback
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">by {product.farmerName}</p>
                            <p className="text-sm text-gray-700 line-clamp-2 mb-3">{product.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                              <div>
                                <p className="text-gray-500">Price</p>
                                <p className="text-[#2E7D32]">₹{product.price}/{product.unit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Quantity</p>
                                <p>{product.quantity} {product.unit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Category</p>
                                <p>{product.category}</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleVerifyProduct(product.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Verify
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectProduct(product.id)}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verified Products */}
          <TabsContent value="verified">
            <Card>
              <CardHeader>
                <CardTitle>Verified Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {verified.map(product => (
                    <Card key={product.id}>
                      <div className="aspect-square relative">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.featured && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500">
                            <Star className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h3 className="text-sm mb-1 line-clamp-1">{product.name}</h3>
                        <p className="text-[#2E7D32] text-sm">₹{product.price}/{product.unit}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFeatureProduct(product.id)}
                          className="w-full mt-2"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {product.featured ? 'Unfeature' : 'Feature'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Farmers ({farmers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {farmers.map(farmer => (
                      <div key={farmer.id} className="border rounded p-3">
                        <p>{farmer.fullName}</p>
                        <p className="text-sm text-gray-600">{farmer.mobile}</p>
                        <p className="text-xs text-gray-500">{farmer.location.town}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consumers ({consumers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {consumers.map(consumer => (
                      <div key={consumer.id} className="border rounded p-3">
                        <p>{consumer.fullName}</p>
                        <p className="text-sm text-gray-600">{consumer.mobile}</p>
                        <p className="text-xs text-gray-500">{consumer.location.town}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
