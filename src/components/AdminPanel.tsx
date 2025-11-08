import { useState, useEffect } from 'react';
import { Shield, Check, X, Users, Package, DollarSign, LogOut, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User, Product } from '../App';

interface AdminPanelProps {
  user: User;
  onLogout: () => void;
}

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load all products
    const allProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    setProducts(allProducts);

    // Load all users
    const allUsers = JSON.parse(localStorage.getItem('agroconnect_users') || '[]');
    setUsers(allUsers);
  }, []);

  const handleVerifyProduct = (productId: string) => {
    const allProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    const updatedProducts = allProducts.map((p: Product) =>
      p.id === productId ? { ...p, status: 'verified' } : p
    );
    localStorage.setItem('agroconnect_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleRejectProduct = (productId: string) => {
    const allProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    const updatedProducts = allProducts.filter((p: Product) => p.id !== productId);
    localStorage.setItem('agroconnect_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const pendingProducts = products.filter(p => p.status === 'pending');
  const verifiedProducts = products.filter(p => p.status === 'verified');
  const farmers = users.filter(u => u.role === 'farmer');
  const consumers = users.filter(u => u.role === 'consumer');

  const filteredPendingProducts = pendingProducts.filter(p =>
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
              <p className="text-white/80 mt-1">AgroConnect Management</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Verification</CardDescription>
              <CardTitle className="text-orange-600">{pendingProducts.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Package className="w-8 h-8 text-orange-600 opacity-20" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Verified Products</CardDescription>
              <CardTitle className="text-green-600">{verifiedProducts.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Check className="w-8 h-8 text-green-600 opacity-20" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Farmers</CardDescription>
              <CardTitle className="text-blue-600">{farmers.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="w-8 h-8 text-blue-600 opacity-20" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Consumers</CardDescription>
              <CardTitle className="text-purple-600">{consumers.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="w-8 h-8 text-purple-600 opacity-20" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Pending</span>
              {pendingProducts.length > 0 && (
                <Badge className="ml-1 bg-orange-600">{pendingProducts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Verified</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
          </TabsList>

          {/* Pending Products */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Products Awaiting Verification</CardTitle>
                <CardDescription>Review and verify farmer-uploaded products</CardDescription>
                
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search products or farmers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredPendingProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchQuery ? 'No products match your search' : 'No products pending verification'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPendingProducts.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="mb-1">{product.name}</h3>
                                <p className="text-gray-600 text-sm">by {product.farmerName}</p>
                                <Badge variant="outline" className="mt-2">
                                  {product.category}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                              <div>
                                <p className="text-gray-500">Price</p>
                                <p className="text-[#2E7D32]">₹{product.price}/kg</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Quantity</p>
                                <p>{product.quantity} kg</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Location</p>
                                <p>{product.location.town}</p>
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
                <CardDescription>All verified products in the marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                {verifiedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Check className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No verified products yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {verifiedProducts.map((product) => (
                      <Card key={product.id}>
                        <div className="aspect-square relative">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-3 right-3 bg-green-600">
                            Verified
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="mb-1">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">by {product.farmerName}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-[#2E7D32]">₹{product.price}/kg</p>
                            <p className="text-gray-500 text-sm">{product.quantity} kg</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Farmers</CardTitle>
                  <CardDescription>{farmers.length} registered farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  {farmers.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No farmers registered</p>
                  ) : (
                    <div className="space-y-3">
                      {farmers.map((farmer) => (
                        <div key={farmer.id} className="border rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white">
                              {farmer.fullName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate">{farmer.fullName}</p>
                              <p className="text-gray-500 text-sm">{farmer.mobile}</p>
                            </div>
                            <Badge variant="outline">Farmer</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consumers</CardTitle>
                  <CardDescription>{consumers.length} registered consumers</CardDescription>
                </CardHeader>
                <CardContent>
                  {consumers.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No consumers registered</p>
                  ) : (
                    <div className="space-y-3">
                      {consumers.map((consumer) => (
                        <div key={consumer.id} className="border rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                              {consumer.fullName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate">{consumer.fullName}</p>
                              <p className="text-gray-500 text-sm">{consumer.mobile}</p>
                            </div>
                            <Badge variant="outline" className="bg-blue-50">Consumer</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
