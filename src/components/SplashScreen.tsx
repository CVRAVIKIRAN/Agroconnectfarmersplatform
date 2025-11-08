import { Sprout, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onClick?: () => void;
}

export function SplashScreen({ onClick }: SplashScreenProps) {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#1B5E20] flex flex-col items-center justify-center p-6 relative overflow-hidden"
      onClick={onClick}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Leaf className="w-32 h-32 text-white" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Leaf className="w-40 h-40 text-white" />
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1
        }}
        className="relative"
      >
        <div className="bg-white rounded-full p-6 shadow-2xl">
          <Sprout className="w-20 h-20 text-[#2E7D32]" />
        </div>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 bg-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* App Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <h1 className="text-white text-5xl mb-2">AgroConnect Pro</h1>
        <p className="text-white/90 text-xl tracking-wide">Farm to Consumer Direct</p>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-white/80 text-sm">Fresh. Local. Trusted.</p>
        <div className="flex gap-2 mt-4 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Secret hint for admin access */}
      <div className="absolute bottom-2 text-white/20 text-xs">
        v1.0.0
      </div>
    </div>
  );
}
