import { Shield, Check, X, Package, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const pendingProducts = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    farmer: 'Ramesh Kumar',
    price: 45,
    quantity: 50,
    type: 'Organic',
    verified: true,
    date: '2025-10-25'
  },
  {
    id: 2,
    name: 'Wheat Grains',
    farmer: 'Suresh Patel',
    price: 35,
    quantity: 200,
    type: 'Organic',
    verified: true,
    date: '2025-10-25'
  },
  {
    id: 3,
    name: 'Fresh Potatoes',
    farmer: 'Vijay Singh',
    price: 25,
    quantity: 100,
    type: 'Inorganic',
    verified: false,
    date: '2025-10-26'
  }
];

export function AdminPanel() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-primary">Admin Panel</span>
        </div>

        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 text-primary">
            <Package className="w-5 h-5" />
            <span>Product Verification</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Users className="w-5 h-5" />
            <span>Manage Users</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <TrendingUp className="w-5 h-5" />
            <span>Transactions</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <AlertCircle className="w-5 h-5" />
            <span>Reports</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4">
          <h1 className="text-2xl text-primary">Product Verification</h1>
          <p className="text-sm text-muted-foreground">Review and approve farmer product listings</p>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <h3 className="text-3xl">3</h3>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Approved Today</p>
              <h3 className="text-3xl">15</h3>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Rejected</p>
              <h3 className="text-3xl">2</h3>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Products</p>
              <h3 className="text-3xl">234</h3>
            </Card>
          </div>

          {/* Pending Products Table */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Pending Product Verifications</h2>
              <Badge className="bg-yellow-100 text-yellow-700">
                {pendingProducts.length} Pending
              </Badge>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Gov. Verified</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.farmer}</TableCell>
                    <TableCell>₹{product.price}/kg</TableCell>
                    <TableCell>{product.quantity} kg</TableCell>
                    <TableCell>
                      <Badge className={product.type === 'Organic' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                        {product.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.verified ? (
                        <Badge className="bg-primary text-white">
                          <Check className="w-3 h-3 mr-1" />
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>{product.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 mt-6">
            <h2 className="text-xl mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'Approved', product: 'Organic Rice', farmer: 'Amit Sharma', time: '2 hours ago' },
                { action: 'Rejected', product: 'Mixed Vegetables', farmer: 'Ravi Kumar', time: '3 hours ago' },
                { action: 'Approved', product: 'Fresh Mangoes', farmer: 'Sanjay Patel', time: '5 hours ago' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.action === 'Approved' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-sm">
                        <span className={activity.action === 'Approved' ? 'text-green-600' : 'text-red-600'}>
                          {activity.action}
                        </span>
                        {' '}<span className="text-muted-foreground">product</span> {activity.product}
                      </p>
                      <p className="text-xs text-muted-foreground">by {activity.farmer}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
