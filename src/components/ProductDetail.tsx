import { ArrowLeft, MapPin, User, Phone, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onBuyNow: (product: Product) => void;
}

export function ProductDetail({ product, onBack, onBuyNow }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Product Details</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-24">
        {/* Product Image */}
        <Card className="overflow-hidden mb-4">
          <div className="aspect-video relative bg-gray-100">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Badge 
              className={`absolute top-4 right-4 ${product.category === 'organic' ? 'bg-green-600' : 'bg-blue-600'}`}
            >
              {product.category}
            </Badge>
          </div>
        </Card>

        {/* Product Info */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-[#2E7D32]">₹{product.price}/kg</p>
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-600">{product.quantity} kg available</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-2">Seller Information</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p>{product.farmerName}</p>
                    <p className="text-gray-500 text-sm">Verified Farmer</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-2">Location</h3>
                <div className="flex items-start gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-[#2E7D32] mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{product.location.town}</p>
                    <p className="text-gray-500 text-sm">{product.location.address}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {product.location.latitude.toFixed(4)}, {product.location.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mock Map */}
              <div className="border-t pt-4">
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#2E7D32] mx-auto mb-2" />
                    <p className="text-gray-600">Map View</p>
                    <p className="text-gray-500 text-sm">{product.location.town}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Category</p>
                <p className="capitalize">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <Badge className="bg-green-600">Verified</Badge>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Quantity Available</p>
                <p>{product.quantity} kg</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Price per kg</p>
                <p className="text-[#2E7D32]">₹{product.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.alert(`Contact farmer at: +91-${Math.floor(Math.random() * 9000000000 + 1000000000)}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Farmer
          </Button>
          <Button
            className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
            onClick={() => onBuyNow(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
