import { Package, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockProducts } from '../../utils/mockData';

export function MyProducts() {
  const myProducts = mockProducts.filter(p => p.farmerId === 'f1');

  const renderProduct = (product: typeof mockProducts[0]) => (
    <Card key={product.id} className="overflow-hidden mb-3">
      <div className="flex gap-3 p-3">
        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-sm mb-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>
            <Badge
              className={
                product.status === 'Verified'
                  ? 'bg-green-100 text-green-700'
                  : product.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : product.status === 'Sold'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-red-100 text-red-700'
              }
            >
              {product.status === 'Verified' && <CheckCircle className="w-3 h-3 mr-1" />}
              {product.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
              {product.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
              {product.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-primary">₹{product.price}/kg</span>
              <span className="text-muted-foreground text-xs ml-2">
                {product.quantity} kg available
              </span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Uploaded: {product.uploadDate}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary p-6 text-white">
        <h2 className="text-xl mb-1">My Products</h2>
        <p className="text-green-100 text-sm">Manage your product listings</p>
      </div>

      <div className="p-4">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {myProducts.map(renderProduct)}
          </TabsContent>

          <TabsContent value="pending">
            {myProducts.filter(p => p.status === 'Pending').map(renderProduct)}
          </TabsContent>

          <TabsContent value="verified">
            {myProducts.filter(p => p.status === 'Verified').map(renderProduct)}
          </TabsContent>

          <TabsContent value="sold">
            {myProducts.filter(p => p.status === 'Sold').map(renderProduct)}
          </TabsContent>
        </Tabs>

        {myProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No products yet</p>
            <p className="text-sm text-muted-foreground">Upload your first product to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
