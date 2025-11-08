import { useState } from 'react';
import { Camera, MapPin, Phone, Plus, X, Upload as UploadIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';
import { PRODUCT_CATEGORIES, UNITS } from '../../constants/categories';
import type { User, Product } from '../../App';

interface UploadProductProps {
  user: User;
}

export function UploadProduct({ user }: UploadProductProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'kg',
    price: '',
    description: '',
    phone: user.mobile,
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    if (!formData.name || !formData.category || !formData.quantity || !formData.price || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }

    setUploading(true);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      farmerId: user.id,
      farmerName: user.fullName,
      farmerPhone: formData.phone,
      name: formData.name,
      category: formData.category,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      price: parseFloat(formData.price),
      description: formData.description,
      images: images,
      location: user.location,
      status: 'pending',
      uploadedAt: new Date().toISOString(),
    };

    const products = JSON.parse(localStorage.getItem('agroconnect_pro_products') || '[]');
    products.push(newProduct);
    localStorage.setItem('agroconnect_pro_products', JSON.stringify(products));

    toast.success('Product uploaded successfully! Waiting for admin approval.');
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: 'kg',
      price: '',
      description: '',
      phone: user.mobile,
    });
    setImages([]);
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <h2>Upload New Product</h2>
          <p className="text-white/80 text-sm mt-1">Add your farm products to the marketplace</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Product Images *
              </CardTitle>
              <CardDescription>Upload 1-5 clear images of your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square">
                    <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#2E7D32] hover:bg-green-50 transition-colors">
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Organic Tomatoes"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <span>{cat.icon} {cat.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.1"
                    placeholder="100"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price per Unit (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="50.00"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product quality, farming methods, freshness, etc."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Location */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    className="pl-12 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Farm Location (GPS)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#2E7D32]" />
                  <div className="pl-12 pr-3 py-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-gray-700">{user.location.town}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.location.address}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      📍 {user.location.latitude.toFixed(4)}, {user.location.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm mb-2 text-blue-900">📝 Important Note</h4>
            <p className="text-sm text-blue-800">
              Your product will be reviewed by our admin team before appearing in the marketplace. 
              This usually takes 24-48 hours. We'll notify you once it's approved!
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={uploading}
            className="w-full h-14 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-lg rounded-xl"
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UploadIcon className="w-5 h-5" />
                <span>Upload Product</span>
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
