import { useEffect } from 'react';
import { Sprout } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-primary to-accent">
      <div className="relative">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Sprout className="w-14 h-14 text-primary" />
        </div>
      </div>
      <h1 className="text-3xl text-white mb-2">AgroConnect</h1>
      <p className="text-green-100">Connecting Farmers & Consumers</p>
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}
