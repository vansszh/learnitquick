'use client';

import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <motion.div
        className="w-24 h-24 rounded-3xl border-[4px] border-ink bg-sun flex items-center justify-center text-5xl"
        style={{ boxShadow: '6px 6px 0 var(--ink)' }}
        animate={{ rotate: [0, 12, -12, 0], y: [0, -10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎈
      </motion.div>

      <motion.p
        className="font-display text-3xl text-ink"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Loading...
      </motion.p>

      <div className="flex gap-2">
        {['#FF5C8A', '#FFC93C', '#5BC053', '#4FC3F7'].map((color, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full border-2 border-ink"
            style={{ background: color }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.12,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};
