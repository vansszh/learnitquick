'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useGameStore, GameMode, Difficulty } from '@/store/gameStore';
import { getModeInfo, generateQuestions } from '@/utils/questionGenerator';
import {
  ArrowLeft,
  Users,
  Star,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

const englishModes: GameMode[] = [
  'spelling',
  'rhymes',
  'opposites',
  'synonyms',
  'phonics',
  'missing-letter',
  'plurals',
  'picture-match',
];

const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; soft: string; stars: number; emoji: string }
> = {
  easy:   { label: 'Easy',   color: '#5BC053', soft: '#D6F0CE', stars: 1, emoji: '🌱' },
  medium: { label: 'Medium', color: '#FFC93C', soft: '#FFE5A0', stars: 2, emoji: '🔥' },
  hard:   { label: 'Hard',   color: '#FF5C8A', soft: '#FFD1DE', stars: 3, emoji: '🚀' },
};

export const EnglishMenu = () => {
  const {
    setCurrentScreen,
    startGame,
    setQuestions,
    playerAvatar,
    playerName,
    totalCoins,
  } = useGameStore();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    setShowDifficultyModal(true);
  };

  const handleStartGame = (difficulty: Difficulty) => {
    if (selectedMode) {
      const questions = generateQuestions(selectedMode, difficulty, 10);
      setQuestions(questions);
      startGame(selectedMode, difficulty);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 130, damping: 14 },
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 max-w-6xl mx-auto"
      >
        <motion.button
          onClick={() => setCurrentScreen('home')}
          whileHover={{ scale: 1.04, x: -3 }}
          whileTap={{ scale: 0.96 }}
          className="sticker-sm sticker-press-sm flex items-center gap-2 px-4 py-2.5 font-black text-ink"
          style={{ background: '#FFFFFF' }}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        <div className="flex items-center gap-3">
          <div
            className="sticker-sm flex items-center gap-2 px-3 py-2"
            style={{ background: '#FFD1DE' }}
          >
            <span className="text-2xl">{playerAvatar}</span>
            <span className="text-ink font-extrabold hidden sm:inline">{playerName}</span>
          </div>
          <div
            className="sticker-sm flex items-center gap-2 px-3 py-2 font-display text-xl text-ink"
            style={{ background: '#FFC93C' }}
          >
            🪙 {totalCoins}
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-5xl md:text-6xl text-ink leading-none">
          English <span className="rainbow-text">Adventure</span>
        </h1>
        <p className="text-ink-soft text-lg font-bold mt-3">
          Words, sounds, spelling and more! 📚
        </p>
      </motion.div>

      {/* Subject hero strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="sticker p-5 md:p-6 relative overflow-hidden" style={{ background: '#FFD1DE' }}>
          <div className="absolute inset-x-0 top-0 h-3 bg-berry" />
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-[3px] border-ink bg-berry flex items-center justify-center bouncy"
              style={{ boxShadow: '4px 4px 0 var(--ink)' }}
            >
              <BookOpen className="w-8 h-8 text-paper" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display text-xl md:text-2xl text-ink leading-none">
                  8 fun word games
                </h3>
                <span
                  className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-grass border-2 border-ink text-paper"
                  style={{ boxShadow: '2px 2px 0 var(--ink)' }}
                >
                  NEW
                </span>
              </div>
              <p className="text-ink-soft font-bold text-sm md:text-base">
                Spelling • Rhymes • Opposites • Pictures and more!
              </p>
            </div>
            <div className="hidden md:block text-5xl wobble">📖</div>
          </div>
        </div>
      </motion.div>

      {/* Live players */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div
          className="sticker-sm px-5 py-2.5 flex items-center gap-3"
          style={{ background: '#FFFFFF' }}
        >
          <div className="flex -space-x-2">
            {['🐼', '🐯', '🦊', '🦄'].map((avatar, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full bg-cream border-[2.5px] border-ink flex items-center justify-center text-base"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              >
                {avatar}
              </motion.div>
            ))}
          </div>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-grass opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-grass" />
          </span>
          <span className="text-ink font-extrabold text-sm">
            <span className="text-grass">192</span> kids reading now
          </span>
        </div>
      </motion.div>

      {/* Mode grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
      >
        {englishModes.map((mode) => {
          const info = getModeInfo(mode);
          return (
            <motion.button
              key={mode}
              variants={itemVariants}
              whileHover={{ y: -5, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleModeSelect(mode)}
              className="sticker sticker-press p-5 text-left relative overflow-hidden"
              style={{ background: info.softColor }}
            >
              <div className="absolute inset-x-0 top-0 h-2.5" style={{ background: info.color }} />

              <div
                className="w-14 h-14 rounded-2xl border-[3px] border-ink flex items-center justify-center text-2xl mb-3 mt-1"
                style={{ background: info.color, boxShadow: '3px 3px 0 var(--ink)' }}
              >
                {info.icon}
              </div>

              <h3 className="font-display text-xl text-ink leading-tight mb-1">{info.title}</h3>
              <p className="text-ink-soft text-xs font-bold mb-4 line-clamp-2">{info.description}</p>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-extrabold text-ink">
                  <Users className="w-3.5 h-3.5" strokeWidth={3} />
                  10 Q
                </span>
                <span
                  className="text-sm font-black px-2 py-0.5 rounded-full border-2 border-ink"
                  style={{ background: info.color, color: '#FFFFFF' }}
                >
                  Play →
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Pro tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 max-w-2xl mx-auto"
      >
        <div className="sticker p-5" style={{ background: '#E5D7FA' }}>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl border-[3px] border-ink bg-grape flex items-center justify-center flex-shrink-0 wobble"
              style={{ boxShadow: '3px 3px 0 var(--ink)' }}
            >
              <Sparkles className="w-6 h-6 text-paper" fill="currentColor" />
            </div>
            <div>
              <h4 className="font-display text-xl text-ink mb-1">Reading Tip!</h4>
              <p className="text-ink-soft font-bold text-sm">
                Say each word out loud — it really helps you learn how it sounds! 🗣️
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Difficulty modal */}
      <AnimatePresence>
        {showDifficultyModal && selectedMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDifficultyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="sticker p-7 max-w-md w-full relative"
              style={{ background: '#FFFFFF' }}
            >
              <button
                onClick={() => setShowDifficultyModal(false)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full border-[3px] border-ink bg-tomato text-paper font-black text-lg flex items-center justify-center hover:rotate-90 transition-transform"
                style={{ boxShadow: '3px 3px 0 var(--ink)' }}
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div
                  className="w-20 h-20 rounded-2xl border-[3px] border-ink flex items-center justify-center text-4xl mx-auto mb-3 bouncy"
                  style={{
                    background: getModeInfo(selectedMode).color,
                    boxShadow: '4px 4px 0 var(--ink)',
                  }}
                >
                  {getModeInfo(selectedMode).icon}
                </div>
                <h2 className="font-display text-3xl text-ink mb-1">
                  {getModeInfo(selectedMode).title}
                </h2>
                <p className="text-ink-soft font-bold text-sm">
                  {getModeInfo(selectedMode).description}
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <p className="text-center text-xs font-black uppercase tracking-wider text-ink-soft">
                  Choose how tricky?
                </p>
                {(Object.keys(difficultyConfig) as Difficulty[]).map((diff) => {
                  const cfg = difficultyConfig[diff];
                  return (
                    <motion.button
                      key={diff}
                      onClick={() => handleStartGame(diff)}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      className="sticker-sm sticker-press-sm w-full flex items-center justify-between p-4"
                      style={{ background: cfg.soft }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl border-[3px] border-ink flex items-center justify-center text-xl"
                          style={{ background: cfg.color, boxShadow: '2px 2px 0 var(--ink)' }}
                        >
                          {cfg.emoji}
                        </div>
                        <div className="text-left">
                          <p className="font-display text-xl text-ink leading-none">{cfg.label}</p>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(3)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < cfg.stars ? 'text-sun' : 'text-ink/20'
                                }`}
                                fill="currentColor"
                                strokeWidth={2}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-ink" strokeWidth={3} />
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center gap-5 text-xs font-extrabold text-ink-soft pt-2 border-t-2 border-dashed border-ink/20">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" strokeWidth={3} /> 8 Players
                </span>
                <span className="flex items-center gap-1">🪙 10/correct</span>
                <span className="flex items-center gap-1">⏱️ 15s/Q</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
