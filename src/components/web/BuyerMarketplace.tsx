import { useState } from 'react';
import { Search, Filter, MapPin, Phone, Star, ShoppingCart, Leaf } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const products = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    price: 45,
    quantity: 50,
    seller: 'Ramesh Kumar',
    location: 'Punjab',
    verified: true,
    organic: true,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1745791562822-7ac21012bbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXN8ZW58MXx8fHwxNzYxNDU5NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: 'Basmati Rice',
    price: 120,
    quantity: 200,
    seller: 'Suresh Patel',
    location: 'Haryana',
    verified: true,
    organic: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1595360584848-6404da6fe097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWlucyUyMGhhcnZlc3R8ZW58MXx8fHwxNzYxMzgyMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'Organic Wheat',
    price: 35,
    quantity: 500,
    seller: 'Vijay Singh',
    location: 'Madhya Pradesh',
    verified: true,
    organic: true,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1595360584848-6404da6fe097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWlucyUyMGhhcnZlc3R8ZW58MXx8fHwxNzYxMzgyMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    name: 'Fresh Vegetables Mix',
    price: 55,
    quantity: 100,
    seller: 'Anil Sharma',
    location: 'Uttar Pradesh',
    verified: false,
    organic: true,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1665315302321-46989ca7829a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MTQxNTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: 'Fresh Potatoes',
    price: 25,
    quantity: 300,
    seller: 'Rakesh Verma',
    location: 'Gujarat',
    verified: true,
    organic: false,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1665315302321-46989ca7829a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MTQxNTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    name: 'Organic Onions',
    price: 40,
    quantity: 150,
    seller: 'Mohan Das',
    location: 'Maharashtra',
    verified: true,
    organic: true,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1665315302321-46989ca7829a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtfGVufDF8fHx8MTc2MTQxNTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function BuyerMarketplace() {
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [showOrganic, setShowOrganic] = useState(false);
  const [showVerified, setShowVerified] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-primary">AgroConnect</span>
        </div>

        <nav className="space-y-2 mb-8">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 text-primary">
            <ShoppingCart className="w-5 h-5" />
            <span>Marketplace</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <ShoppingCart className="w-5 h-5" />
            <span>My Orders</span>
          </a>
        </nav>

        {/* Filters */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm mb-3">Filters</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="organic" 
                  checked={showOrganic}
                  onCheckedChange={(checked) => setShowOrganic(checked as boolean)}
                />
                <Label htmlFor="organic" className="cursor-pointer text-sm">
                  Organic Only
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="verified" 
                  checked={showVerified}
                  onCheckedChange={(checked) => setShowVerified(checked as boolean)}
                />
                <Label htmlFor="verified" className="cursor-pointer text-sm">
                  Verified Only
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm mb-3">Price Range</h3>
            <div className="space-y-3">
              <Slider 
                min={0}
                max={150}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-accent">
            Apply Filters
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Search for products..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-primary">Fresh Products</h1>
              <p className="text-sm text-muted-foreground">{products.length} products available</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-100 relative">
                  <ImageWithFallback 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.verified && (
                      <Badge className="bg-primary text-white">
                        ✓ Verified
                      </Badge>
                    )}
                    {product.organic && (
                      <Badge className="bg-green-600 text-white">
                        Organic
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl text-primary">₹{product.price}/kg</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{product.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available: {product.quantity} kg
                    </p>
                    <p className="text-sm">
                      Seller: {product.seller}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-accent" size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
