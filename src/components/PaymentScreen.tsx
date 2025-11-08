import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { Product, User, Order } from '../App';

interface PaymentScreenProps {
  product: Product;
  user: User;
  onBack: () => void;
  onPaymentSuccess: (order: Order) => void;
}

export function PaymentScreen({ product, user, onBack, onPaymentSuccess }: PaymentScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('upi');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');

  const totalAmount = product.price * quantity;
  const platformFee = Math.round(totalAmount * 0.02);
  const finalAmount = totalAmount + platformFee;

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      consumerId: user.id,
      farmerId: product.farmerId,
      amount: finalAmount,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('agroconnect_orders') || '[]');
    orders.push(order);
    localStorage.setItem('agroconnect_orders', JSON.stringify(orders));

    // Update product quantity
    const products = JSON.parse(localStorage.getItem('agroconnect_products') || '[]');
    const updatedProducts = products.map((p: Product) => 
      p.id === product.id 
        ? { ...p, quantity: p.quantity - quantity, status: p.quantity - quantity <= 0 ? 'sold' : p.status }
        : p
    );
    localStorage.setItem('agroconnect_products', JSON.stringify(updatedProducts));

    setProcessing(false);
    onPaymentSuccess(order);
  };

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
            disabled={processing}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2>Payment</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-32">
        {/* Order Summary */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3>{product.name}</h3>
                <p className="text-gray-600">by {product.farmerName}</p>
                <p className="text-[#2E7D32] mt-1">₹{product.price}/kg</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(Math.max(1, parseInt(e.target.value) || 1), product.quantity))}
                className="w-full"
              />
              <p className="text-gray-500 text-sm">Maximum available: {product.quantity} kg</p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({quantity} kg × ₹{product.price})</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Platform Fee (2%)</span>
                <span>₹{platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total Amount</span>
                <span className="text-[#2E7D32]">₹{finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value: 'card' | 'upi' | 'wallet') => setPaymentMethod(value)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Smartphone className="w-5 h-5 text-[#2E7D32]" />
                    <div>
                      <p>UPI Payment</p>
                      <p className="text-gray-500 text-sm">Pay using UPI ID</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                    <CreditCard className="w-5 h-5 text-[#2E7D32]" />
                    <div>
                      <p>Credit/Debit Card</p>
                      <p className="text-gray-500 text-sm">Visa, Mastercard, RuPay</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Wallet className="w-5 h-5 text-[#2E7D32]" />
                    <div>
                      <p>Digital Wallet</p>
                      <p className="text-gray-500 text-sm">Paytm, PhonePe, Google Pay</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                    maxLength={19}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                      maxLength={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="username@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p>You will be redirected to your UPI app to complete the payment.</p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                    <div className="w-12 h-12 bg-[#00B9F1] rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm">Paytm</p>
                  </div>

                  <div className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                    <div className="w-12 h-12 bg-[#5F259F] rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm">PhonePe</p>
                  </div>

                  <div className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm">Google Pay</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p>You will be redirected to your wallet app to complete the payment.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-900">
            <p>Your payment is secure and encrypted. AgroConnect uses industry-standard security measures to protect your transaction.</p>
          </div>
        </div>
      </div>

      {/* Bottom Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full h-12 bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay ₹{finalAmount.toLocaleString()}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
