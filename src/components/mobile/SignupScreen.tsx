import { useState, useEffect } from 'react';
import { Sprout, MapPin, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAuth } from '../../utils/AuthContext';
import { mockLocations } from '../../utils/mockData';

interface SignupScreenProps {
  onLogin: () => void;
}

export function SignupScreen({ onLogin }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'consumer'>('farmer');
  const [location, setLocation] = useState(mockLocations[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const { login } = useAuth();

  const detectLocation = () => {
    setDetectingLocation(true);
    // Simulate GPS detection
    setTimeout(() => {
      const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      setLocation(randomLocation);
      setDetectingLocation(false);
    }, 1500);
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const handleSignup = () => {
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      mobile,
      role,
      location,
    };
    login(newUser);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-auto p-6">
      {/* Logo */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-3">
          <Sprout className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl text-primary">Create Account</h1>
        <p className="text-muted-foreground text-sm">Join AgroConnect today</p>
      </div>

      {/* Signup Form */}
      <div className="space-y-4 flex-1">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>

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
              placeholder="Create a password"
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

        <div>
          <Label htmlFor="role">I am a</Label>
          <Select value={role} onValueChange={(value: any) => setRole(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farmer">Farmer (Seller)</SelectItem>
              <SelectItem value="consumer">Consumer (Buyer)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Location</Label>
          <div className="mt-1 p-3 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                {detectingLocation ? (
                  <p className="text-sm text-muted-foreground">Detecting location...</p>
                ) : (
                  <>
                    <p className="text-sm">{location.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={detectLocation}
            className="mt-2 w-full"
            disabled={detectingLocation}
          >
            {detectingLocation ? 'Detecting...' : 'Detect Location Again'}
          </Button>
        </div>

        <Button 
          onClick={handleSignup} 
          className="w-full bg-primary hover:bg-accent h-12"
          disabled={!name || !mobile || !password}
        >
          Sign Up
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button onClick={onLogin} className="text-primary">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
