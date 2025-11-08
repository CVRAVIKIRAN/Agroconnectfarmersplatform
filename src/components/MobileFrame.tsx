import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  title?: string;
}

export function MobileFrame({ children, title = "Mobile View" }: MobileFrameProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      <div className="relative">
        {/* Mobile frame border */}
        <div className="w-[375px] h-[667px] bg-white rounded-[2.5rem] shadow-2xl border-[14px] border-gray-900 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
          {/* Screen content */}
          <div className="w-full h-full overflow-auto bg-background">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
