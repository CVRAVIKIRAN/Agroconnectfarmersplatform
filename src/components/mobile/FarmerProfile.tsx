import { MapPin, Phone, LogOut, User, Shield } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../utils/AuthContext';

export function FarmerProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col h-full bg-background overflow-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">My Profile</h2>
          <Badge className="bg-secondary text-primary">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-8">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-1">{user.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Mobile Number</p>
                <p className="text-sm">{user.mobile}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm">{user.location.address}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user.location.latitude.toFixed(4)}, {user.location.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <p className="text-2xl text-primary mb-1">12</p>
            <p className="text-sm text-muted-foreground">Products Listed</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl text-secondary mb-1">₹24,500</p>
            <p className="text-sm text-muted-foreground">Total Earnings</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl text-primary mb-1">45</p>
            <p className="text-sm text-muted-foreground">Total Sales</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl text-primary mb-1">4.8</p>
            <p className="text-sm text-muted-foreground">Rating</p>
          </Card>
        </div>

        {/* Settings */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Account Settings</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notification Settings
            </Button>
          </div>
        </Card>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
