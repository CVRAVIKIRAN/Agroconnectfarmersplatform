import { useState } from 'react';
import { Upload, Camera, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';

export function ProductUpload() {
  const [productType, setProductType] = useState('organic');
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary p-6 text-white">
        <h2 className="text-xl">Upload Product</h2>
        <p className="text-green-100 text-sm">Add new product to marketplace</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Photo Upload */}
        <div>
          <Label className="mb-2 block">Product Photo</Label>
          <Card className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-primary cursor-pointer transition-colors">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm mb-1">Tap to upload photo</p>
              <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
            </div>
          </Card>
        </div>

        {/* Product Name */}
        <div>
          <Label htmlFor="product-name">Product Name</Label>
          <Input 
            id="product-name" 
            placeholder="e.g., Fresh Tomatoes" 
            className="mt-1"
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="price">Price (per kg)</Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="₹ 50" 
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input 
              id="quantity" 
              type="number" 
              placeholder="100" 
              className="mt-1"
            />
          </div>
        </div>

        {/* Product Type */}
        <div>
          <Label className="mb-2 block">Product Type</Label>
          <RadioGroup value={productType} onValueChange={setProductType} className="flex gap-4">
            <div className="flex-1">
              <div 
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  productType === 'organic' 
                    ? 'border-primary bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <RadioGroupItem value="organic" id="organic" className="sr-only" />
                <Label htmlFor="organic" className="cursor-pointer block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Organic</span>
                    {productType === 'organic' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                </Label>
              </div>
            </div>
            <div className="flex-1">
              <div 
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  productType === 'inorganic' 
                    ? 'border-primary bg-green-50' 
                    : 'border-gray-200'
                }`}
              >
                <RadioGroupItem value="inorganic" id="inorganic" className="sr-only" />
                <Label htmlFor="inorganic" className="cursor-pointer block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Inorganic</span>
                    {productType === 'inorganic' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Government Verification */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="verified" 
              checked={isVerified}
              onCheckedChange={(checked) => setIsVerified(checked as boolean)}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="verified" className="cursor-pointer">
                Verified by Government
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Check this if your product has government certification
              </p>
            </div>
          </div>
        </Card>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <textarea 
            id="description"
            className="w-full mt-1 p-3 border rounded-lg resize-none"
            rows={3}
            placeholder="Add product details..."
          />
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-primary hover:bg-accent h-12">
          <Upload className="w-4 h-4 mr-2" />
          Upload Product
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Product will be reviewed by admin before listing
        </p>
      </div>
    </div>
  );
}
