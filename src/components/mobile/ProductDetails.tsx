import { useState } from 'react';
import { MapPin, Phone, Star, ShoppingCart, MessageCircle, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Product } from '../../utils/mockData';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onBuyNow: (product: Product) => void;
}

export function ProductDetails({ product, onBack, onBuyNow }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-primary p-4 text-white flex items-center gap-3">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg">Product Details</h2>
      </div>

      {/* Product Image */}
      <div className="aspect-square bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-2xl mb-1">{product.name}</h1>
              <div className="flex gap-2">
                <Badge className={product.category === 'Organic' ? 'bg-green-600' : 'bg-gray-600'}>
                  {product.category}
                </Badge>
                <Badge className="bg-primary">
                  ✓ Verified
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg">{product.rating}</span>
            </div>
          </div>
          <p className="text-3xl text-primary mb-2">₹{product.price}/kg</p>
          <p className="text-sm text-muted-foreground">
            Available: {product.quantity} kg
          </p>
        </div>

        {/* Description */}
        <Card className="p-4">
          <h3 className="text-sm mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </Card>

        {/* Seller Info */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Seller Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span>{product.farmerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Location</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {product.location.address}
              </span>
            </div>
            {product.distance && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Distance</span>
                <span className="text-primary">{product.distance} km away</span>
              </div>
            )}
          </div>
        </Card>

        {/* Quantity Selector */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Select Quantity (kg)</h3>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="text-xl w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
            >
              +
            </Button>
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl text-primary">₹{product.price * quantity}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-accent h-12"
            onClick={() => onBuyNow(product)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Now
          </Button>
          <Button variant="outline" className="h-12">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="h-12">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
