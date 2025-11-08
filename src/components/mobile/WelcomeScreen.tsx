import { useState } from 'react';
import { Sprout, Users, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface WelcomeScreenProps {
  onRegister: (role: string) => void;
}

export function WelcomeScreen({ onRegister }: WelcomeScreenProps) {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState<string>('farmer');

  if (!showForm) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-primary to-accent p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Sprout className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-3xl mb-2">AgroConnect</h1>
          <p className="text-center text-green-100 mb-12 px-4">
            Connecting Farmers and Consumers for a sustainable future
          </p>
          
          <div className="w-full space-y-4">
            <Button 
              onClick={() => setShowForm(true)} 
              className="w-full bg-white text-primary hover:bg-green-50 h-12"
            >
              Get Started
            </Button>
          </div>
        </div>
        
        <div className="text-center text-green-100 text-sm">
          Fresh from Farm to Table
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl text-primary mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join AgroConnect today</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">I am a</Label>
          <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <RadioGroupItem value="farmer" id="farmer" />
              <Label htmlFor="farmer" className="cursor-pointer">Farmer</Label>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <RadioGroupItem value="buyer" id="buyer" />
              <Label htmlFor="buyer" className="cursor-pointer">Consumer</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your name" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="Enter your age" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input id="mobile" type="tel" placeholder="+91 XXXXX XXXXX" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter your address" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="location">Location / District</Label>
          <Input id="location" placeholder="Enter location" className="mt-1" />
        </div>

        <Button 
          onClick={() => onRegister(role)} 
          className="w-full bg-primary hover:bg-accent mt-4"
        >
          Register
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <span className="text-primary cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
