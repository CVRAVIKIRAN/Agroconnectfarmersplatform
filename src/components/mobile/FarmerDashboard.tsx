import { Cloud, Droplets, Upload, Users, DollarSign, TrendingUp, Leaf } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function FarmerDashboard() {
  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
        <h2 className="text-xl mb-1">Welcome Back, Ramesh</h2>
        <p className="text-green-100 text-sm">Farmer • Verified ✓</p>
      </div>

      {/* Weather Widget */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 border-none">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-900">Today's Weather</span>
              </div>
              <p className="text-2xl text-blue-900">28°C</p>
              <p className="text-sm text-blue-700">Partly Cloudy</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-blue-700">
                <Droplets className="w-4 h-4" />
                <span className="text-sm">65%</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">Good for irrigation</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Upload className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Products</span>
          </div>
          <p className="text-2xl">12</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-sm text-muted-foreground">Earnings</span>
          </div>
          <p className="text-2xl">₹24,500</p>
        </Card>
      </div>

      {/* Crop Tips */}
      <div className="px-4 pb-4">
        <h3 className="text-sm mb-3 text-muted-foreground">Today's Crop Tips</h3>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm mb-1">Wheat Harvest Season</p>
              <p className="text-xs text-muted-foreground">
                Monitor moisture levels closely. Ideal harvesting conditions expected this week.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <h3 className="text-sm mb-3 text-muted-foreground">Quick Actions</h3>
        <div className="space-y-2">
          <Button className="w-full justify-start bg-primary hover:bg-accent">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Product
          </Button>
          <Button variant="outline" className="w-full justify-start border-primary text-primary">
            <Users className="w-4 h-4 mr-2" />
            View Buyers
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
