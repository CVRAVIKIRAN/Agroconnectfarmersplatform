import { useState, useEffect } from 'react';
import { Sprout, User, Phone, Lock, MapPin, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import type { User as UserType, UserRole } from '../App';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    password: '',
    role: 'consumer' as UserRole,
    address: '',
  });
  const [location, setLocation] = useState<{ 
    latitude: number; 
    longitude: number; 
    town: string;
  } | null>(null);

  useEffect(() => {
    if (!isLogin) {
      detectLocation();
    }
  }, [isLogin]);

  const detectLocation = () => {
    // Mock GPS detection with Indian cities
    const mockLocations = [
      { latitude: 28.6139, longitude: 77.2090, town: 'New Delhi' },
      { latitude: 19.0760, longitude: 72.8777, town: 'Mumbai' },
      { latitude: 13.0827, longitude: 80.2707, town: 'Chennai' },
      { latitude: 12.9716, longitude: 77.5946, town: 'Bangalore' },
      { latitude: 22.5726, longitude: 88.3639, town: 'Kolkata' },
      { latitude: 17.3850, longitude: 78.4867, town: 'Hyderabad' },
      { latitude: 23.0225, longitude: 72.5714, town: 'Ahmedabad' },
      { latitude: 18.5204, longitude: 73.8567, town: 'Pune' },
    ];
    
    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    setLocation(randomLocation);
    setFormData(prev => ({ ...prev, address: `${randomLocation.town}, India` }));
    toast.success('Location detected successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('agroconnect_pro_users') || '[]');
      const user = users.find((u: any) => 
        u.mobile === formData.mobile && u.password === formData.password
      );
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        onLogin(userWithoutPassword);
        toast.success(`Welcome back, ${user.fullName}!`);
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } else {
      // Signup logic
      if (!formData.fullName || !formData.mobile || !formData.password || !location) {
        toast.error('Please fill all required fields');
        setLoading(false);
        return;
      }

      if (formData.mobile.length < 10) {
        toast.error('Please enter a valid mobile number');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const newUser: UserType & { password: string } = {
        id: `user_${Date.now()}`,
        fullName: formData.fullName,
        mobile: formData.mobile,
        password: formData.password,
        role: formData.role,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: formData.address,
          town: location.town,
        },
        createdAt: new Date().toISOString(),
      };

      const users = JSON.parse(localStorage.getItem('agroconnect_pro_users') || '[]');
      users.push(newUser);
      localStorage.setItem('agroconnect_pro_users', JSON.stringify(users));

      const { password, ...userWithoutPassword } = newUser;
      onLogin(userWithoutPassword);
      toast.success('Account created successfully!');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F8F4] to-[#E8F5E9] flex flex-col">
      {/* Header */}
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Sprout className="w-8 h-8" />
          <div>
            <h2>AgroConnect Pro</h2>
            <p className="text-white/80 text-sm">Join the farming revolution</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto">
          {/* Toggle Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-8 bg-white rounded-xl p-1 shadow-md">
            <button
              onClick={() => setIsLogin(true)}
              className={`py-3 rounded-lg transition-all ${
                isLogin 
                  ? 'bg-[#2E7D32] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`py-3 rounded-lg transition-all ${
                !isLogin 
                  ? 'bg-[#2E7D32] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="fullName">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="pl-12 h-12 rounded-xl bg-white"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      className="pl-12 h-12 rounded-xl bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isLogin ? 'Enter password' : 'Min. 6 characters'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-12 pr-12 h-12 rounded-xl bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="role">I am a *</Label>
                      <Select 
                        value={formData.role} 
                        onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farmer">
                            <div className="flex items-center gap-2">
                              <span>🧑‍🌾</span>
                              <span>Farmer (I want to sell)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="consumer">
                            <div className="flex items-center gap-2">
                              <span>🛒</span>
                              <span>Consumer (I want to buy)</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label>Location (GPS) *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#2E7D32]" />
                        <div className="pl-12 pr-3 py-3 bg-green-50 border border-green-200 rounded-xl">
                          {location ? (
                            <div>
                              <p className="text-sm text-gray-700">{location.town}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Detecting location...</p>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="address">Detailed Address</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Village, District, State"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="h-12 rounded-xl bg-white"
                      />
                    </motion.div>
                  </>
                )}

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-lg mt-6"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    isLogin ? 'Login' : 'Create Account'
                  )}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#2E7D32] hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-2">🧑‍🌾</div>
              <p className="text-xs text-gray-600">Verified Farmers</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-xs text-gray-600">Fresh Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
