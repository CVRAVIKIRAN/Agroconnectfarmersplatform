import { useState } from 'react';
import { Search, Filter, Star, Map } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { ProductDetails } from './ProductDetails';
import { PaymentScreen } from './PaymentScreen';
import { useAuth } from '../../utils/AuthContext';
import { getProductsWithDistance, Product } from '../../utils/mockData';

export function MarketplaceScreenNew() {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Organic' | 'Regular'>('All');
  const [maxDistance, setMaxDistance] = useState(100);

  const products = user 
    ? getProductsWithDistance(user.location).filter(p => p.status === 'Verified')
    : [];

  const filteredProducts = products.filter(product => {
    if (categoryFilter !== 'All' && product.category !== categoryFilter) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (product.distance && product.distance > maxDistance) return false;
    return true;
  });

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setShowPayment(true);
  };

  if (showPayment && selectedProduct) {
    return (
      <PaymentScreen
        amount={selectedProduct.price}
        productName={selectedProduct.name}
        onSuccess={() => {
          setShowPayment(false);
          setSelectedProduct(null);
        }}
        onCancel={() => {
          setShowPayment(false);
        }}
      />
    );
  }

  if (selectedProduct && !showPayment) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary p-4 text-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl">Marketplace</h2>
          <Button size="sm" variant="secondary" className="bg-secondary text-primary">
            <Map className="w-4 h-4 mr-1" />
            Map
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            className="pl-10 bg-white text-gray-900"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b">
        <div className="flex gap-2 overflow-x-auto mb-3">
          <Button 
            size="sm" 
            variant={categoryFilter === 'All' ? 'default' : 'outline'}
            onClick={() => setCategoryFilter('All')}
            className={categoryFilter === 'All' ? 'bg-primary' : ''}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={categoryFilter === 'Organic' ? 'default' : 'outline'}
            onClick={() => setCategoryFilter('Organic')}
            className={categoryFilter === 'Organic' ? 'bg-primary' : ''}
          >
            Organic
          </Button>
          <Button 
            size="sm" 
            variant={categoryFilter === 'Regular' ? 'default' : 'outline'}
            onClick={() => setCategoryFilter('Regular')}
            className={categoryFilter === 'Regular' ? 'bg-primary' : ''}
          >
            Regular
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-3 h-3 mr-1" />
            More
          </Button>
        </div>

        {showFilters && (
          <Card className="p-3 space-y-3">
            <div>
              <p className="text-xs mb-2">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
              <Slider
                min={0}
                max={150}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div>
              <p className="text-xs mb-2">Distance: Within {maxDistance} km</p>
              <Slider
                min={10}
                max={200}
                step={10}
                value={[maxDistance]}
                onValueChange={(val) => setMaxDistance(val[0])}
              />
            </div>
          </Card>
        )}
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-3">
          {filteredProducts.length} products near you
        </p>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square bg-gray-100 relative">
                <ImageWithFallback 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-white text-xs">
                  ✓
                </Badge>
                {product.category === 'Organic' && (
                  <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                    Organic
                  </Badge>
                )}
                {product.distance && (
                  <Badge className="absolute bottom-2 right-2 bg-white/90 text-primary text-xs">
                    {product.distance} km
                  </Badge>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm mb-1 truncate">{product.name}</h3>
                <p className="text-lg text-primary mb-1">₹{product.price}/kg</p>
                <p className="text-xs text-muted-foreground truncate mb-1">
                  {product.farmerName}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{product.quantity}kg</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
