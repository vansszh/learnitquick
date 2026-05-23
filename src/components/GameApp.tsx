'use client';

import { useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { HomeScreen } from '@/components/HomeScreen';
import { MathMenu } from '@/components/MathMenu';
import { EnglishMenu } from '@/components/EnglishMenu';
import { GameScreen } from '@/components/GameScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { LearnScreen } from '@/components/LearnScreen';

// SSR-safe "is mounted on client?" hook — avoids setState-in-effect.
const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export const GameApp = () => {
  const { currentScreen } = useGameStore();
  const mounted = useMounted();

  if (!mounted) {
    // Bouncy sticker-style boot spinner that matches the new theme
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
        <motion.div
          className="w-20 h-20 rounded-2xl border-[4px] border-ink bg-sun flex items-center justify-center text-4xl"
          style={{ boxShadow: '6px 6px 0 var(--ink)' }}
          animate={{ rotate: [0, 12, -12, 0], y: [0, -8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎈
        </motion.div>
        <p className="font-display text-2xl text-ink">Loading…</p>
      </div>
    );
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <HomeScreen />
          </motion.div>
        )}

        {currentScreen === 'math-menu' && (
          <motion.div
            key="math-menu"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <MathMenu />
          </motion.div>
        )}

        {currentScreen === 'english-menu' && (
          <motion.div
            key="english-menu"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <EnglishMenu />
          </motion.div>
        )}

        {currentScreen === 'game' && (
          <motion.div
            key="game"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GameScreen />
          </motion.div>
        )}

        {currentScreen === 'results' && (
          <motion.div
            key="results"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ResultsScreen />
          </motion.div>
        )}

        {currentScreen === 'learn' && (
          <motion.div
            key="learn"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <LearnScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
