import { useState } from 'react';
import { Search, Filter, MapPin, Phone, Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

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
    phone: '+91 98765 43210'
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
    phone: '+91 98765 43211'
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
    phone: '+91 98765 43212'
  },
  {
    id: 4,
    name: 'Fresh Potatoes',
    price: 25,
    quantity: 300,
    seller: 'Anil Sharma',
    location: 'Uttar Pradesh',
    verified: false,
    organic: false,
    rating: 4.2,
    phone: '+91 98765 43213'
  }
];

export function MarketplaceScreen() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary p-4 text-white sticky top-0 z-10">
        <h2 className="text-xl mb-3">Marketplace</h2>
        
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
      <div className="p-4 border-b flex gap-2 overflow-x-auto">
        <Button size="sm" variant="outline" className="whitespace-nowrap">
          <Filter className="w-3 h-3 mr-1" />
          All
        </Button>
        <Button size="sm" variant="outline" className="whitespace-nowrap">
          Organic
        </Button>
        <Button size="sm" variant="outline" className="whitespace-nowrap">
          Verified
        </Button>
        <Button size="sm" variant="outline" className="whitespace-nowrap">
          Price: Low to High
        </Button>
      </div>

      {/* Products Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-square bg-gray-100 relative">
              <ImageWithFallback 
                src={`https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.verified && (
                <Badge className="absolute top-2 right-2 bg-primary text-white">
                  ✓ Verified
                </Badge>
              )}
              {product.organic && (
                <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                  Organic
                </Badge>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm mb-1">{product.name}</h3>
              <p className="text-lg text-primary mb-1">₹{product.price}/kg</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{product.rating}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-[90%] rounded-lg">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={`https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500`}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex gap-2">
                  {selectedProduct.verified && (
                    <Badge className="bg-primary">✓ Government Verified</Badge>
                  )}
                  {selectedProduct.organic && (
                    <Badge className="bg-green-600">Organic</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="text-primary">₹{selectedProduct.price}/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available</span>
                    <span>{selectedProduct.quantity} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seller</span>
                    <span>{selectedProduct.seller}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{selectedProduct.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {selectedProduct.rating}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-accent">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
