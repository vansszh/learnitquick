'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Download,
  Smartphone,
  Globe,
  ArrowLeft,
  Wifi,
  ShieldCheck,
  Sparkles,
  Heart,
} from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';

const APK_URL = '/learnitquick.apk';
const APK_SIZE_MB = '4.5';
const VERSION = '0.1.0';

export const ApplicationContent = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl flex justify-between items-center mb-8"
        >
          <Link
            href="/"
            className="sticker-sm sticker-press-sm flex items-center gap-2 px-4 py-2.5 font-black text-ink"
            style={{ background: '#FFFFFF' }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
            <span className="hidden sm:inline">Back to game</span>
          </Link>

          <div className="font-display text-2xl rainbow-text leading-none">LearnItQuick</div>
        </motion.div>

        <div className="w-full max-w-3xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-10"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-[6rem] md:text-[8rem] leading-none">📱</div>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl text-ink leading-none mb-3">
              Get the <span className="rainbow-text">App</span>
            </h1>
            <p className="text-ink-soft text-lg md:text-xl font-bold max-w-xl mx-auto">
              Play offline on any Android phone or tablet — no app store, no signup, no ads.
            </p>
          </motion.div>

          {/* Download card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 140, damping: 14 }}
            className="sticker p-5 md:p-7 mb-8"
            style={{ background: '#FFFFFF' }}
          >
            <a href={APK_URL} download="learnitquick.apk" className="block group">
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="sticker sticker-press p-5 md:p-6 flex items-center gap-4 sm:gap-5 relative overflow-hidden"
                style={{ background: '#FFC93C' }}
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl border-[3px] border-ink bg-paper flex items-center justify-center flex-shrink-0 bouncy"
                  style={{ boxShadow: '4px 4px 0 var(--ink)' }}
                >
                  <Download className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-ink" strokeWidth={3} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-display text-xl sm:text-2xl md:text-3xl text-ink leading-tight mb-1">
                    Download for Android
                  </p>
                  <p className="text-ink/70 font-bold text-xs sm:text-sm md:text-base">
                    {APK_SIZE_MB} MB · APK · v{VERSION}
                  </p>
                </div>
                <div className="hidden sm:block text-3xl text-ink">→</div>
              </motion.div>
            </a>

            <div className="mt-5 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-ink font-extrabold underline decoration-2 decoration-berry underline-offset-4 hover:text-berry transition-colors"
              >
                <Globe className="w-4 h-4" strokeWidth={3} />
                Or play in your browser instead
              </Link>
            </div>
          </motion.div>

          {/* Install steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-display text-3xl md:text-4xl text-ink text-center mb-6">
              How to install
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  n: 1,
                  color: '#FF5C8A',
                  soft: '#FFD1DE',
                  icon: '⬇️',
                  text: 'Tap the download button above on your Android phone.',
                },
                {
                  n: 2,
                  color: '#FFC93C',
                  soft: '#FFE5A0',
                  icon: '📁',
                  text: 'Open the file when it finishes downloading.',
                },
                {
                  n: 3,
                  color: '#5BC053',
                  soft: '#D6F0CE',
                  icon: '✅',
                  text: 'Allow "Install from this source" when prompted, then tap Install.',
                },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 140, damping: 14 }}
                  className="sticker p-5 relative overflow-hidden"
                  style={{ background: step.soft }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-2.5"
                    style={{ background: step.color }}
                  />
                  <div className="flex items-center gap-3 mb-3 mt-1">
                    <div
                      className="w-12 h-12 rounded-2xl border-[3px] border-ink flex items-center justify-center font-display text-2xl text-paper"
                      style={{ background: step.color, boxShadow: '3px 3px 0 var(--ink)' }}
                    >
                      {step.n}
                    </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  <p className="text-ink font-bold leading-snug">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {[
              { icon: <Wifi className="w-4 h-4" strokeWidth={3} />, label: 'Works offline', bg: '#C7E9FA' },
              { icon: <ShieldCheck className="w-4 h-4" strokeWidth={3} />, label: 'No ads, ever', bg: '#D6F0CE' },
              { icon: <Sparkles className="w-4 h-4" strokeWidth={3} />, label: 'Free forever', bg: '#FFE5A0' },
              { icon: <Smartphone className="w-4 h-4" strokeWidth={3} />, label: 'Phone & tablet', bg: '#E5D7FA' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="sticker-sm flex items-center gap-2 px-4 py-2.5 font-extrabold text-ink"
                style={{ background: f.bg }}
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </motion.div>

          {/* Safety note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="sticker-sm p-4 mb-10"
            style={{ background: '#FFFFFF' }}
          >
            <p className="text-ink-soft font-bold text-sm text-center leading-relaxed">
              Your phone may warn that the app is from an &quot;unknown developer&quot;.
              That&apos;s normal for apps installed outside the Play Store —
              just allow the install once. We don&apos;t collect any data.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center pb-4"
          >
            <p className="text-ink-soft font-bold flex items-center justify-center gap-1 text-sm">
              Made with{' '}
              <Heart className="w-4 h-4 text-berry inline" fill="currentColor" /> for kids
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
