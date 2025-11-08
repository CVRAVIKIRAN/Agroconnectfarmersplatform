import { Shield, Check, X, Users, Package, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockProducts } from '../../utils/mockData';

export function AdminMobile() {
  const pendingProducts = mockProducts.filter(p => p.status === 'Pending');

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-primary p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6" />
          <h2 className="text-xl">Admin Panel</h2>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
          <p className="text-2xl">{pendingProducts.length}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-sm text-muted-foreground">Approved</span>
          </div>
          <p className="text-2xl">15</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-muted-foreground">Users</span>
          </div>
          <p className="text-2xl">150</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Sales</span>
          </div>
          <p className="text-2xl">234</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="space-y-3">
              <h3 className="text-sm">Pending Verification</h3>
              {pendingProducts.map((product) => (
                <Card key={product.id} className="p-3">
                  <div className="flex gap-3 mb-3">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">{product.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        by {product.farmerName}
                      </p>
                      <div className="flex gap-2">
                        <Badge className="text-xs bg-green-100 text-green-700">
                          {product.category}
                        </Badge>
                        <span className="text-xs text-primary">₹{product.price}/kg</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-600">
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-2">
              {['Ramesh Kumar', 'Suresh Patel', 'Vijay Singh'].map((name, i) => (
                <Card key={i} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">Farmer</p>
                    </div>
                    <Badge className="bg-primary">Active</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Order #{1000 + i}</span>
                    <Badge className="bg-green-100 text-green-700">Completed</Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2025-10-{20 + i}</span>
                    <span className="text-primary">₹{450 * i}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
