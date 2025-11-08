import { useState, useEffect } from 'react';
import { User, Upload, Package, DollarSign, LogOut, Plus, Edit, Trash2, Check, Clock, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User as UserType, Product } from '../App';

interface FarmerDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export function FarmerDashboard({ user, onLogout }: FarmerDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'organic' as 'organic' | 'regular',
    quantity: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    // Load farmer's products from localStorage
    const allProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    const farmerProducts = allProducts.filter((p: Product) => p.farmerId === user.id);
    setProducts(farmerProducts);
  }, [user.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock image upload - in real app, would upload to server
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      farmerId: user.id,
      farmerName: user.fullName,
      name: uploadForm.name,
      category: uploadForm.category,
      quantity: parseFloat(uploadForm.quantity),
      price: parseFloat(uploadForm.price),
      description: uploadForm.description,
      image: uploadForm.image || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400',
      location: user.location,
      status: 'pending',
      uploadedAt: new Date().toISOString(),
    };

    const allProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    allProducts.push(newProduct);
    localStorage.setItem('agroconnect_products', JSON.stringify(allProducts));
    
    setProducts(prev => [newProduct, ...prev]);
    
    // Reset form
    setUploadForm({
      name: '',
      category: 'organic',
      quantity: '',
      price: '',
      description: '',
      image: '',
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const allProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    const updatedProducts = allProducts.filter((p: Product) => p.id !== productId);
    localStorage.setItem('agroconnect_products', JSON.stringify(updatedProducts));
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const calculateEarnings = () => {
    return products
      .filter(p => p.status === 'sold')
      .reduce((total, p) => total + (p.price * p.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1>Farmer Dashboard</h1>
            <p className="text-white/80 mt-1">Welcome, {user.fullName}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Products</CardDescription>
              <CardTitle className="text-[#2E7D32]">{products.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Package className="w-8 h-8 text-[#2E7D32] opacity-20" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Verified Products</CardDescription>
              <CardTitle className="text-green-600">{products.filter(p => p.status === 'verified').length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Check className="w-8 h-8 text-green-600 opacity-20" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Earnings</CardDescription>
              <CardTitle className="text-[#F9A825]">₹{calculateEarnings().toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <DollarSign className="w-8 h-8 text-[#F9A825] opacity-20" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Sales</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#2E7D32] rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3>{user.fullName}</h3>
                    <p className="text-gray-600">{user.mobile}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-[#2E7D32]">Farmer (Seller)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-700">{user.location.town}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {user.location.latitude.toFixed(4)}, {user.location.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-gray-700">{user.location.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Product Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Product</CardTitle>
                <CardDescription>Add a new product to your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadProduct} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="e.g., Organic Tomatoes"
                      value={uploadForm.name}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={uploadForm.category} onValueChange={(value: 'organic' | 'regular') => setUploadForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (kg)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        step="0.1"
                        placeholder="100"
                        value={uploadForm.quantity}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, quantity: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹/kg)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="50"
                        value={uploadForm.price}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product..."
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    {uploadForm.image && (
                      <div className="mt-2 rounded-lg overflow-hidden border">
                        <img src={uploadForm.image} alt="Preview" className="w-full h-48 object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-gray-700">{user.location.town}</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>My Products</CardTitle>
                <CardDescription>Manage your uploaded products</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No products uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
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
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant={product.category === 'organic' ? 'default' : 'secondary'} className={product.category === 'organic' ? 'bg-green-600' : ''}>
                                    {product.category}
                                  </Badge>
                                  <Badge variant={
                                    product.status === 'verified' ? 'default' : 
                                    product.status === 'sold' ? 'secondary' : 
                                    'outline'
                                  } className={
                                    product.status === 'verified' ? 'bg-green-600' :
                                    product.status === 'sold' ? 'bg-blue-600' : ''
                                  }>
                                    {product.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                    {product.status === 'verified' && <Check className="w-3 h-3 mr-1" />}
                                    {product.status === 'sold' && <ShoppingBag className="w-3 h-3 mr-1" />}
                                    {product.status}
                                  </Badge>
                                </div>
                              </div>
                              {product.status === 'pending' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[#2E7D32]">₹{product.price}/kg</p>
                                <p className="text-gray-500 text-sm">{product.quantity} kg available</p>
                              </div>
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

          {/* Sales History Tab */}
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales History</CardTitle>
                <CardDescription>Track your product sales</CardDescription>
              </CardHeader>
              <CardContent>
                {products.filter(p => p.status === 'sold').length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No sales yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.filter(p => p.status === 'sold').map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3>{product.name}</h3>
                          <Badge className="bg-green-600">Sold</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p>{product.quantity} kg</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Amount</p>
                            <p className="text-[#2E7D32]">₹{(product.price * product.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
