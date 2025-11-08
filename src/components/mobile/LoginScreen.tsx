import { useState } from 'react';
import { Sprout, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../utils/AuthContext';
import { mockLocations } from '../../utils/mockData';

interface LoginScreenProps {
  onSignup: () => void;
}

export function LoginScreen({ onSignup }: LoginScreenProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    // Mock login - in real app would validate against backend
    const mockUser = {
      id: '1',
      name: 'Demo User',
      mobile,
      role: 'farmer' as const,
      location: mockLocations[0],
    };
    login(mockUser);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-auto p-6">
      {/* Logo */}
      <div className="flex flex-col items-center mt-12 mb-8">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
          <Sprout className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl text-primary">Welcome Back</h1>
        <p className="text-muted-foreground text-sm">Login to AgroConnect</p>
      </div>

      {/* Login Form */}
      <div className="space-y-4 flex-1">
        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Eye className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-primary">
            Forgot Password?
          </a>
        </div>

        <Button onClick={handleLogin} className="w-full bg-primary hover:bg-accent h-12">
          Login
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button onClick={onSignup} className="text-primary">
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          Demo: Use any mobile number and password to login
        </p>
      </div>
    </div>
  );
}
