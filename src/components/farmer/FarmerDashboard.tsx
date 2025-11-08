import { useState } from 'react';
import { Home, Upload, Package, DollarSign, User as UserIcon } from 'lucide-react';
import { FarmerHome } from './FarmerHome';
import { UploadProduct } from './UploadProduct';
import { MyProducts } from './MyProducts';
import { SalesHistory } from './SalesHistory';
import { FarmerProfile } from './FarmerProfile';
import type { User } from '../../App';

interface FarmerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function FarmerDashboard({ user, onLogout }: FarmerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'upload' | 'products' | 'sales' | 'profile'>('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && <FarmerHome user={user} />}
        {activeTab === 'upload' && <UploadProduct user={user} />}
        {activeTab === 'products' && <MyProducts user={user} />}
        {activeTab === 'sales' && <SalesHistory user={user} />}
        {activeTab === 'profile' && <FarmerProfile user={user} onLogout={onLogout} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5 h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'home' 
                ? 'text-[#2E7D32] bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'upload' 
                ? 'text-[#2E7D32] bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span className="text-xs">Upload</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'products' 
                ? 'text-[#2E7D32] bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Products</span>
          </button>

          <button
            onClick={() => setActiveTab('sales')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'sales' 
                ? 'text-[#2E7D32] bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-xs">Sales</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'profile' 
                ? 'text-[#2E7D32] bg-green-50' 
                : 'text-gray-500'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
