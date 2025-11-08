import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, LogOut, ShoppingBag, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { User, Product } from '../App';

interface ConsumerMarketplaceProps {
  user: User;
  onViewProduct: (product: Product) => void;
  onLogout: () => void;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    farmerId: 'farmer1',
    farmerName: 'Rajesh Kumar',
    name: 'Organic Tomatoes',
    category: 'organic',
    quantity: 50,
    price: 45,
    description: 'Fresh organic tomatoes grown without pesticides. Perfect for salads and cooking.',
    image: 'https://images.unsplash.com/photo-1621872320280-10fbec0c171c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBmYXJtfGVufDF8fHx8MTc2MjU4Njk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'Sector 12, Rohini',
      town: 'New Delhi',
    },
    status: 'verified',
    uploadedAt: '2025-11-01T10:30:00Z',
  },
  {
    id: '2',
    farmerId: 'farmer2',
    farmerName: 'Priya Sharma',
    name: 'Fresh Potatoes',
    category: 'regular',
    quantity: 100,
    price: 30,
    description: 'High quality fresh potatoes directly from farm. Ideal for daily cooking needs.',
    image: 'https://images.unsplash.com/photo-1606836484371-483e90c5d19a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzYyNTQ3MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: {
      latitude: 28.5355,
      longitude: 77.3910,
      address: 'Ghaziabad',
      town: 'Ghaziabad',
    },
    status: 'verified',
    uploadedAt: '2025-11-02T14:20:00Z',
  },
  {
    id: '3',
    farmerId: 'farmer3',
    farmerName: 'Suresh Patel',
    name: 'Organic Wheat',
    category: 'organic',
    quantity: 200,
    price: 40,
    description: 'Premium quality organic wheat. Stone ground and pesticide-free.',
    image: 'https://images.unsplash.com/photo-1582624770223-a52aa657d7be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWluJTIwY3JvcHN8ZW58MXx8fHwxNzYyNTg2OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: {
      latitude: 28.4595,
      longitude: 77.0266,
      address: 'Gurugram',
      town: 'Gurugram',
    },
    status: 'verified',
    uploadedAt: '2025-11-03T09:15:00Z',
  },
  {
    id: '4',
    farmerId: 'farmer4',
    farmerName: 'Amit Singh',
    name: 'Fresh Mangoes',
    category: 'organic',
    quantity: 30,
    price: 120,
    description: 'Sweet and juicy alphonso mangoes. Hand-picked at peak ripeness.',
    image: 'https://images.unsplash.com/photo-1630700490485-66c5a6f879bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGhhcnZlc3R8ZW58MXx8fHwxNzYyNTg2OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    location: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Model Town',
      town: 'Delhi',
    },
    status: 'verified',
    uploadedAt: '2025-11-04T11:45:00Z',
  },
];

export function ConsumerMarketplace({ user, onViewProduct, onLogout }: ConsumerMarketplaceProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'organic' | 'regular'>('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [maxDistance, setMaxDistance] = useState(50);

  useEffect(() => {
    // Load products from localStorage and merge with mock data
    const savedProducts = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    const verifiedProducts = savedProducts.filter((p: Product) => p.status === 'verified');
    const allProducts = [...mockProducts, ...verifiedProducts];
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Distance filter
    filtered = filtered.filter(p => {
      const distance = calculateDistance(
        user.location.latitude,
        user.location.longitude,
        p.location.latitude,
        p.location.longitude
      );
      return distance <= maxDistance;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, priceRange, maxDistance, products, user.location]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPriceRange([0, 500]);
    setMaxDistance(50);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6" />
              <div>
                <h1>AgroConnect</h1>
                <p className="text-white/80 text-sm">{user.location.town}</p>
              </div>
            </div>
            <Button 
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products, farmers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Filter className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  <div className="space-y-3">
                    <label className="text-sm">Category</label>
                    <Select value={categoryFilter} onValueChange={(value: 'all' | 'organic' | 'regular') => setCategoryFilter(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm">Price Range (₹/kg)</label>
                    <div className="pt-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm">Maximum Distance ({maxDistance} km)</label>
                    <div className="pt-2">
                      <Slider
                        value={[maxDistance]}
                        onValueChange={([value]) => setMaxDistance(value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const distance = calculateDistance(
                user.location.latitude,
                user.location.longitude,
                product.location.latitude,
                product.location.longitude
              );

              return (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onViewProduct(product)}
                >
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      className={`absolute top-3 right-3 ${product.category === 'organic' ? 'bg-green-600' : 'bg-blue-600'}`}
                    >
                      {product.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{distance.toFixed(1)} km away</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#2E7D32]">₹{product.price}/kg</p>
                        <p className="text-gray-500 text-sm">{product.quantity} kg available</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-[#2E7D32] hover:bg-[#1B5E20]"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProduct(product);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
