'use client';

import { motion } from 'framer-motion';

/**
 * Cheerful animated background for kids:
 *  - A big smiling sun with rotating rays in the corner
 *  - Slow drifting puffy clouds
 *  - Bouncing twinkly stars in primary colors
 *  - A faint rainbow arc tucked at the bottom-left
 */
export const AnimatedBackground = () => {
  // Pre-computed positions so SSR + client agree (no Math.random in render)
  const stars = [
    { x: 6, y: 14, size: 22, color: '#FFC93C', delay: 0.0, rot: -10 },
    { x: 92, y: 28, size: 18, color: '#FF5C8A', delay: 0.4, rot: 8 },
    { x: 14, y: 72, size: 20, color: '#9B5DE5', delay: 1.2, rot: -4 },
    { x: 88, y: 70, size: 24, color: '#5BC053', delay: 1.8, rot: 12 },
    { x: 50, y: 92, size: 18, color: '#4FC3F7', delay: 2.2, rot: -8 },
    { x: 30, y: 36, size: 14, color: '#FF8E3C', delay: 0.8, rot: 5 },
    { x: 72, y: 50, size: 16, color: '#9B5DE5', delay: 1.4, rot: -3 },
    { x: 8, y: 50, size: 14, color: '#5BC053', delay: 2.0, rot: 9 },
    { x: 60, y: 18, size: 12, color: '#FF5C8A', delay: 2.6, rot: -6 },
  ];

  const clouds = [
    { y: 6, scale: 1.0, duration: 95, offset: 0 },
    { y: 24, scale: 0.65, duration: 130, offset: -55 },
    { y: 58, scale: 0.85, duration: 110, offset: -90 },
    { y: 80, scale: 0.5, duration: 150, offset: -25 },
  ];

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* A subtle dotted layer for storybook texture */}
      <div className="absolute inset-0 dot-bg opacity-60" />

      {/* Big sun, top right */}
      <div className="absolute top-4 right-4 md:top-8 md:right-12">
        <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px]">
          {/* Rays */}
          <div className="absolute inset-0 spin-slow">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="96"
                  y="6"
                  width="8"
                  height="24"
                  rx="4"
                  fill="#FFC93C"
                  stroke="#1B1B2F"
                  strokeWidth="2"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
            </svg>
          </div>
          {/* Face */}
          <div className="absolute inset-[22%] rounded-full bg-sun border-4 border-ink flex items-center justify-center"
               style={{ boxShadow: '4px 4px 0 var(--ink)' }}>
            <SunFace />
          </div>
        </div>
      </div>

      {/* Drifting clouds */}
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute drift-r"
          style={{
            top: `${c.y}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.offset}s`,
          }}
        >
          <div style={{ transform: `scale(${c.scale})` }}>
            <Cloud />
          </div>
        </div>
      ))}

      {/* Twinkly stars */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            y: [0, -14, 0],
            rotate: [s.rot, s.rot + 14, s.rot],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          <Star size={s.size} color={s.color} />
        </motion.div>
      ))}

      {/* Rainbow arc, bottom-left */}
      <div className="absolute -bottom-24 -left-16 opacity-60">
        <svg width="360" height="200" viewBox="0 0 360 200" fill="none">
          <path d="M 20 200 A 160 160 0 0 1 340 200" stroke="#FF5C8A" strokeWidth="16" strokeLinecap="round" />
          <path d="M 44 200 A 136 136 0 0 1 316 200" stroke="#FF8E3C" strokeWidth="16" strokeLinecap="round" />
          <path d="M 68 200 A 112 112 0 0 1 292 200" stroke="#FFC93C" strokeWidth="16" strokeLinecap="round" />
          <path d="M 92 200 A 88 88 0 0 1 268 200" stroke="#5BC053" strokeWidth="16" strokeLinecap="round" />
          <path d="M 116 200 A 64 64 0 0 1 244 200" stroke="#4FC3F7" strokeWidth="16" strokeLinecap="round" />
          <path d="M 140 200 A 40 40 0 0 1 220 200" stroke="#9B5DE5" strokeWidth="16" strokeLinecap="round" />
        </svg>
      </div>

      {/* A balloon in the bottom-right for extra cheer */}
      <div className="absolute bottom-8 right-6 md:right-16 float-y" style={{ animationDelay: '1s' }}>
        <Balloon color="#FF5C8A" />
      </div>
      <div className="absolute bottom-16 right-24 md:right-44 float-y" style={{ animationDelay: '2.4s' }}>
        <Balloon color="#4FC3F7" small />
      </div>
    </div>
  );
};

const SunFace = () => (
  <svg viewBox="0 0 80 80" className="w-3/5 h-3/5">
    {/* eyes */}
    <circle cx="28" cy="32" r="5" fill="#1B1B2F" />
    <circle cx="52" cy="32" r="5" fill="#1B1B2F" />
    {/* cheeks */}
    <circle cx="20" cy="46" r="5" fill="#FF5C8A" opacity="0.55" />
    <circle cx="60" cy="46" r="5" fill="#FF5C8A" opacity="0.55" />
    {/* smile */}
    <path d="M 26 46 Q 40 60 54 46" stroke="#1B1B2F" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

const Cloud = () => (
  <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
    {/* outline */}
    <ellipse cx="90" cy="56" rx="78" ry="20" fill="white" stroke="#1B1B2F" strokeWidth="3" />
    <circle cx="55" cy="38" r="22" fill="white" stroke="#1B1B2F" strokeWidth="3" />
    <circle cx="110" cy="32" r="28" fill="white" stroke="#1B1B2F" strokeWidth="3" />
    <circle cx="140" cy="44" r="18" fill="white" stroke="#1B1B2F" strokeWidth="3" />
    {/* hide internal seams */}
    <ellipse cx="90" cy="56" rx="76" ry="18" fill="white" />
    <circle cx="55" cy="38" r="20" fill="white" />
    <circle cx="110" cy="32" r="26" fill="white" />
    <circle cx="140" cy="44" r="16" fill="white" />
  </svg>
);

const Star = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size * 2}
    height={size * 2}
    viewBox="0 0 32 32"
    fill="none"
    style={{ filter: 'drop-shadow(2px 2px 0 #1B1B2F)' }}
  >
    <path
      d="M16 2 L19.5 12 L30 12.5 L21.5 19 L24.5 29 L16 23 L7.5 29 L10.5 19 L2 12.5 L12.5 12 Z"
      fill={color}
      stroke="#1B1B2F"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  </svg>
);

const Balloon = ({ color, small = false }: { color: string; small?: boolean }) => {
  const w = small ? 36 : 48;
  const h = small ? 50 : 64;
  return (
    <svg width={w} height={h + 30} viewBox="0 0 48 94" fill="none">
      <ellipse cx="24" cy="32" rx="22" ry="28" fill={color} stroke="#1B1B2F" strokeWidth="3" />
      <ellipse cx="16" cy="22" rx="5" ry="7" fill="white" opacity="0.4" />
      <path d="M 22 60 L 26 60 L 24 66 Z" fill={color} stroke="#1B1B2F" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 24 66 Q 20 76 26 84 Q 22 90 24 94" stroke="#1B1B2F" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
};
