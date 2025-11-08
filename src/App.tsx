import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { ConsumerMain } from './components/consumer/ConsumerMain';
import { AdminPanel } from './components/admin/AdminPanel';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'farmer' | 'consumer' | 'admin';

export interface User {
  id: string;
  fullName: string;
  mobile: string;
  role: UserRole;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    town: string;
  };
  createdAt: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  description: string;
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    town: string;
  };
  status: 'pending' | 'verified' | 'rejected' | 'sold';
  uploadedAt: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  consumerId: string;
  consumerName: string;
  consumerPhone: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress: string;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminAttempts, setAdminAttempts] = useState(0);

  useEffect(() => {
    // Initialize demo data on first load
    initializeDemoData();

    // Check for logged in user
    const savedUser = localStorage.getItem('agroconnect_pro_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Show splash screen
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const initializeDemoData = () => {
    if (!localStorage.getItem('agroconnect_pro_initialized')) {
      // Initialize with admin account
      const adminUser = {
        id: 'admin_secret',
        fullName: 'System Administrator',
        mobile: 'admin',
        password: 'admin@2025',
        role: 'admin',
        location: {
          latitude: 28.6139,
          longitude: 77.2090,
          address: 'System',
          town: 'System',
        },
        createdAt: new Date().toISOString(),
      };

      const users = [adminUser];
      localStorage.setItem('agroconnect_pro_users', JSON.stringify(users));
      localStorage.setItem('agroconnect_pro_products', JSON.stringify([]));
      localStorage.setItem('agroconnect_pro_orders', JSON.stringify([]));
      localStorage.setItem('agroconnect_pro_initialized', 'true');
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('agroconnect_pro_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('agroconnect_pro_user');
  };

  // Secret gesture to access admin (tap splash screen 5 times)
  const handleSplashClick = () => {
    setAdminAttempts(prev => prev + 1);
    if (adminAttempts >= 4) {
      setShowSplash(false);
      setAdminAttempts(0);
    }
  };

  if (showSplash) {
    return <SplashScreen onClick={handleSplashClick} />;
  }

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (currentUser.role === 'farmer') {
    return <FarmerDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === 'admin') {
    return <AdminPanel user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <>
      <ConsumerMain user={currentUser} onLogout={handleLogout} />
      <Toaster />
    </>
  );
}
