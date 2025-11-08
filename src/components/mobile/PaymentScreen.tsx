import { useState } from 'react';
import { CreditCard, Building2, Smartphone, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface PaymentScreenProps {
  amount: number;
  productName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentScreen({ amount, productName, onSuccess, onCancel }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary p-6 text-white">
        <h2 className="text-xl mb-1">Payment</h2>
        <p className="text-green-100 text-sm">Complete your order</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Product</span>
              <span>{productName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span>₹{amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing Fee</span>
              <span>₹10</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span>Total</span>
              <span className="text-primary">₹{amount + 10}</span>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span>Debit/Credit Card</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <span>UPI</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>Net Banking</span>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Card Details (if card selected) */}
        {paymentMethod === 'card' && (
          <Card className="p-4">
            <h3 className="text-sm mb-3">Card Details</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber" className="text-xs">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry" className="text-xs">Expiry</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-xs">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* UPI Details */}
        {paymentMethod === 'upi' && (
          <Card className="p-4">
            <h3 className="text-sm mb-3">UPI ID</h3>
            <Input placeholder="yourname@upi" />
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handlePayment} 
            className="flex-1 bg-primary hover:bg-accent"
            disabled={processing}
          >
            {processing ? 'Processing...' : `Pay ₹${amount + 10}`}
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={success}>
        <DialogContent className="max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-center">Payment Successful!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-center text-muted-foreground mb-2">
              Your order has been placed successfully
            </p>
            <p className="text-2xl text-primary">₹{amount + 10}</p>
            <p className="text-sm text-muted-foreground mt-4">
              Payment ID: pay_{Date.now()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
