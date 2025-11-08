import { CheckCircle, Package, Calendar, DollarSign, MapPin, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Order } from '../App';

interface OrderConfirmationProps {
  order: Order;
  onBackToMarketplace: () => void;
}

export function OrderConfirmation({ order, onBackToMarketplace }: OrderConfirmationProps) {
  // Get product and user details from localStorage
  const products = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
  const product = products.find((p: any) => p.id === order.productId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h2>Order Confirmation</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Success Message */}
        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your order has been placed successfully</p>
        </div>

        {/* Order Details */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Package className="w-10 h-10 text-[#2E7D32]" />
              <div className="flex-1">
                <p className="text-gray-500 text-sm">Order ID</p>
                <p className="text-mono">#{order.id.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#2E7D32]" />
                  <p className="text-gray-500 text-sm">Order Date</p>
                </div>
                <p>{new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-[#2E7D32]" />
                  <p className="text-gray-500 text-sm">Total Paid</p>
                </div>
                <p className="text-[#2E7D32]">₹{order.amount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Info */}
        {product && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{product.location.town}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Info */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center text-white flex-shrink-0">
                1
              </div>
              <div>
                <p>Farmer Confirmation</p>
                <p className="text-gray-600 text-sm">The farmer will confirm your order and prepare the product</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center text-white flex-shrink-0">
                2
              </div>
              <div>
                <p>Product Preparation</p>
                <p className="text-gray-600 text-sm">Your fresh produce will be harvested and packed</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center text-white flex-shrink-0">
                3
              </div>
              <div>
                <p>Delivery Coordination</p>
                <p className="text-gray-600 text-sm">The farmer will contact you for delivery arrangements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mb-4">
          <CardContent className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-900">
                <span>The farmer will contact you within 24 hours to arrange delivery. You can also reach out to them directly if needed.</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Order Receipt
          </Button>

          <Button 
            className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20]"
            onClick={onBackToMarketplace}
          >
            Continue Shopping
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>Need help? Contact support at support@agroconnect.com</p>
        </div>
      </div>
    </div>
  );
}
