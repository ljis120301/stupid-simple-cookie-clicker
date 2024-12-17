import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AutoClicker({ angle, index, total }) {
  const delay = (index / total) * 1;

  return (
    <motion.div 
      className="absolute w-8 h-8 z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        rotate: `${angle}deg`,
        transformOrigin: 'center center',
      }}
    >
      <motion.div
        initial={{ x: 80 }}
        animate={{
          x: [80, 65, 80],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          delay: delay,
        }}
        style={{
          transformOrigin: 'left center',
        }}
      >
        <div style={{ transform: `rotate(${-angle - 45}deg)` }}>
          <Image
            src="/upgrades/cursor.png"
            alt="Auto Clicker"
            width={32}
            height={32}
            className="pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
} 