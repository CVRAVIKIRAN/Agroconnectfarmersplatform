import { User, MapPin, Phone, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import type { User as UserType } from '../../App';

interface ConsumerProfileProps {
  user: UserType;
  onLogout: () => void;
}

export function ConsumerProfile({ user, onLogout }: ConsumerProfileProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#2E7D32] text-white p-4 shadow-lg">
        <h2>Profile</h2>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <CardTitle>{user.fullName}</CardTitle>
                <p className="text-gray-600 mt-1">Consumer</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-[#2E7D32]" />
              <span>{user.mobile}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-[#2E7D32] mt-0.5" />
              <div>
                <p>{user.location.town}</p>
                <p className="text-sm text-gray-500">{user.location.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 border-red-300 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
