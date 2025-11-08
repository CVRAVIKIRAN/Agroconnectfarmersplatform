import { LayoutDashboard, Package, Upload, DollarSign, Users, TrendingUp, Cloud, Droplets, Leaf, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function FarmerWebDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-primary">AgroConnect</span>
        </div>

        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 text-primary">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Package className="w-5 h-5" />
            <span>My Products</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Upload className="w-5 h-5" />
            <span>Upload Product</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <DollarSign className="w-5 h-5" />
            <span>Payments</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50">
            <Users className="w-5 h-5" />
            <span>Buyers</span>
          </a>
        </nav>

        <div className="pt-6 border-t">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="text-sm">Ramesh Kumar</p>
              <p className="text-xs text-muted-foreground">Farmer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-primary">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Ramesh!</p>
          </div>
          <Badge className="bg-primary text-white">
            <CheckCircle className="w-4 h-4 mr-1" />
            Verified Farmer
          </Badge>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Products</p>
              <h3 className="text-3xl">12</h3>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
              <h3 className="text-3xl">₹24,500</h3>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Active Buyers</p>
              <h3 className="text-3xl">48</h3>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">Orders</p>
              <h3 className="text-3xl">156</h3>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Weather Widget */}
            <Card className="col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 p-6 border-none">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg text-blue-900">Weather Today</h3>
              </div>
              <div className="mb-4">
                <div className="text-4xl text-blue-900 mb-1">28°C</div>
                <p className="text-blue-700">Partly Cloudy</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-blue-700">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  <span>Humidity: 65%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-blue-600">
                  Good conditions for irrigation today
                </p>
              </div>
            </Card>

            {/* Recent Products */}
            <Card className="col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg">Recent Products</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Fresh Tomatoes', status: 'Approved', price: '₹45/kg', qty: '50 kg' },
                  { name: 'Organic Wheat', status: 'Pending', price: '₹35/kg', qty: '200 kg' },
                  { name: 'Basmati Rice', status: 'Approved', price: '₹120/kg', qty: '100 kg' }
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div>
                        <p className="text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.qty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm">{product.price}</p>
                      <Badge className={product.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Crop Tips */}
            <Card className="col-span-3 p-6 bg-green-50 border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-2">Today's Farming Tip</h3>
                  <p className="text-muted-foreground mb-4">
                    Wheat Harvest Season: Monitor moisture levels closely. With the current weather conditions, 
                    ideal harvesting conditions are expected this week. Consider early morning harvesting to 
                    minimize grain shattering.
                  </p>
                  <Button size="sm" className="bg-primary hover:bg-accent">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>

            {/* Earnings Summary */}
            <Card className="col-span-3 p-6">
              <h3 className="text-lg mb-4">Earnings Summary (Last 7 Days)</h3>
              <div className="h-48 bg-gradient-to-t from-green-50 to-transparent rounded-lg flex items-end justify-around p-4">
                {[3500, 4200, 3800, 5100, 4800, 3200, 4100].map((amount, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-12 bg-primary rounded-t-lg transition-all hover:bg-accent"
                      style={{ height: `${(amount / 5100) * 100}%` }}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
