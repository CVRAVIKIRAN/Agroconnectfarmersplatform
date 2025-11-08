import { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PRODUCT_STATUS } from '../../constants/categories';
import { toast } from 'sonner';
import type { User, Product } from '../../App';

interface MyProductsProps {
  user: User;
}

export function MyProducts({ user }: MyProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected' | 'sold'>('all');

  useEffect(() => {
    loadProducts();
  }, [user.id]);

  const loadProducts = () => {
    const allProducts: Product[] = JSON.parse(localStorage.getItem('agroconnect_pro_products') || '[]');
    const myProducts = allProducts.filter(p => p.farmerId === user.id);
    setProducts(myProducts);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const allProducts: Product[] = JSON.parse(localStorage.getItem('agroconnect_pro_products') || '[]');
      const updated = allProducts.filter(p => p.id !== productId);
      localStorage.setItem('agroconnect_pro_products', JSON.stringify(updated));
      loadProducts();
      toast.success('Product deleted successfully');
    }
  };

  const filtered = filter === 'all' ? products : products.filter(p => p.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <h2>My Products</h2>
          <p className="text-white/80 text-sm mt-1">{products.length} products uploaded</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
          {[
            { key: 'all', label: 'All', icon: Package },
            { key: 'pending', label: 'Pending', icon: Clock },
            { key: 'verified', label: 'Verified', icon: CheckCircle },
            { key: 'rejected', label: 'Rejected', icon: XCircle },
            { key: 'sold', label: 'Sold', icon: ShoppingBag },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === key 
                  ? 'bg-[#2E7D32] text-white' 
                  : 'bg-white text-gray-700 border'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Products List */}
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No products found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map(product => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="mb-1">{product.name}</h3>
                          <Badge 
                            className={`${
                              product.status === 'verified' ? 'bg-green-600' :
                              product.status === 'pending' ? 'bg-orange-500' :
                              product.status === 'rejected' ? 'bg-red-600' :
                              'bg-gray-600'
                            }`}
                          >
                            {PRODUCT_STATUS[product.status].label}
                          </Badge>
                        </div>
                        {product.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-[#2E7D32]">₹{product.price}/{product.unit}</p>
                        <p className="text-gray-500">{product.quantity} {product.unit} available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
