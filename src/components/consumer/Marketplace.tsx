import { useEffect, useState } from 'react';
import { Search, Filter, MapPin, ShoppingCart, Star } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { PRODUCT_CATEGORIES } from '../../constants/categories';
import type { User, Product, CartItem } from '../../App';

interface MarketplaceProps {
  user: User;
  onAddToCart: (item: CartItem) => void;
}

export function Marketplace({ user, onAddToCart }: MarketplaceProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const allProducts: Product[] = JSON.parse(localStorage.getItem('agroconnect_pro_products') || '[]');
    const verified = allProducts.filter(p => p.status === 'verified');
    setProducts(verified);
    setFiltered(verified);
  }, []);

  useEffect(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    setFiltered(result);
  }, [searchQuery, categoryFilter, priceRange, products]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart({ product, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white p-4 shadow-lg sticky top-0 z-10">
        <h2 className="mb-3">AgroConnect Marketplace</h2>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white">
                <Filter className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <label className="text-sm mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {PRODUCT_CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Price Range (₹)</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} />
                  <div className="flex justify-between text-sm mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 mb-4">{filtered.length} products found</p>
        
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(product => {
            const distance = calculateDistance(
              user.location.latitude, user.location.longitude,
              product.location.latitude, product.location.longitude
            );

            return (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    {distance.toFixed(1)} km
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#2E7D32]">₹{product.price}/{product.unit}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#2E7D32] h-8 px-3"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
