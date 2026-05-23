'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Coins, Trophy, BookOpen, Calculator, Sparkles } from 'lucide-react';

const avatars = ['🚀', '🦁', '🐯', '🐻', '🐼', '🦊', '🦄', '🐲', '🌟', '🐶', '🎨', '🎪'];

// Each avatar slot rotates through these chip colors for visual variety.
const avatarBgs = [
  '#FFC93C', '#FF8E3C', '#FF5C8A', '#9B5DE5',
  '#4FC3F7', '#2196F3', '#5BC053', '#6FE7B0',
  '#FF6B6B', '#FFC93C', '#9B5DE5', '#4FC3F7',
];

export const HomeScreen = () => {
  const {
    playerName,
    playerAvatar,
    totalCoins,
    gamesPlayed,
    totalCorrect,
    setPlayerName,
    setPlayerAvatar,
    setCurrentScreen,
  } = useGameStore();

  const [editingProfile, setEditingProfile] = useState(false);
  const [inputName, setInputName] = useState(playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(playerAvatar);

  // Show the name/avatar form whenever the player has no saved name,
  // or when they've explicitly tapped the avatar to edit. Derived state
  // avoids the "setState in useEffect" anti-pattern.
  const showNameInput = !playerName || editingProfile;

  const handleStart = () => {
    if (inputName.trim()) {
      setPlayerName(inputName.trim());
      setPlayerAvatar(selectedAvatar);
      setEditingProfile(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 130, damping: 14 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
      <AnimatePresence mode="wait">
        {showNameInput ? (
          <motion.div
            key="name-input"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            className="w-full max-w-lg"
          >
            <div className="sticker p-7 md:p-10 space-y-7">
              {/* Logo */}
              <div className="text-center">
                <motion.div
                  className="inline-block mb-3 wobble"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                >
                  <div className="text-7xl">🎈</div>
                </motion.div>
                <h1 className="font-display text-5xl md:text-6xl rainbow-text leading-none mb-2">
                  LearnItQuick
                </h1>
                <p className="text-ink-soft font-bold">Let&apos;s make learning super fun!</p>
              </div>

              {/* Avatar selection */}
              <div>
                <label className="block text-sm font-extrabold uppercase tracking-wider text-ink-soft mb-3">
                  Pick your buddy
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {avatars.map((avatar, i) => {
                    const isActive = selectedAvatar === avatar;
                    return (
                      <motion.button
                        key={avatar}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        whileHover={{ scale: 1.08, rotate: -4 }}
                        whileTap={{ scale: 0.92 }}
                        className="relative aspect-square rounded-2xl border-[3px] border-ink flex items-center justify-center text-2xl md:text-3xl"
                        style={{
                          background: isActive ? avatarBgs[i] : '#FFF7E0',
                          boxShadow: isActive
                            ? '4px 4px 0 var(--ink)'
                            : '2px 2px 0 var(--ink)',
                          transform: isActive ? 'translate(-1px, -1px)' : 'none',
                        }}
                      >
                        {avatar}
                        {isActive && (
                          <motion.div
                            layoutId="avatar-tick"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-grass border-2 border-ink flex items-center justify-center text-xs font-black"
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Name input */}
              <div>
                <label className="block text-sm font-extrabold uppercase tracking-wider text-ink-soft mb-3">
                  What&apos;s your name?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                    placeholder="Type your name…"
                    maxLength={15}
                    className="w-full pl-5 pr-16 py-4 bg-cream border-[3px] border-ink rounded-2xl text-ink text-lg font-bold placeholder:text-ink-soft/60 focus:outline-none focus:bg-paper transition-colors"
                    style={{ boxShadow: '4px 4px 0 var(--ink)' }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl border-[3px] border-ink bg-sun flex items-center justify-center text-2xl"
                       style={{ boxShadow: '2px 2px 0 var(--ink)' }}>
                    {selectedAvatar}
                  </div>
                </div>
              </div>

              {/* Start button */}
              <motion.button
                onClick={handleStart}
                disabled={!inputName.trim()}
                whileHover={!inputName.trim() ? {} : { scale: 1.02 }}
                whileTap={!inputName.trim() ? {} : { scale: 0.97 }}
                className={`w-full py-5 rounded-2xl border-[4px] border-ink font-display text-2xl text-ink uppercase tracking-wide transition-all ${
                  !inputName.trim() ? 'sticker-disabled' : 'sticker-press'
                }`}
                style={{
                  background: '#FFC93C',
                  boxShadow: '6px 6px 0 var(--ink)',
                }}
              >
                Let&apos;s Go! 🚀
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-5xl"
          >
            {/* Header strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8"
            >
              {/* Player chip */}
              <motion.button
                whileHover={{ scale: 1.03, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setEditingProfile(true)}
                className="sticker-sm sticker-press-sm flex items-center gap-3 px-4 py-3 self-start"
                style={{ background: '#FFD1DE' }}
              >
                <div className="w-12 h-12 rounded-xl border-[3px] border-ink bg-sun flex items-center justify-center text-2xl"
                     style={{ boxShadow: '2px 2px 0 var(--ink)' }}>
                  {playerAvatar}
                </div>
                <div className="text-left pr-2">
                  <p className="text-xs font-black uppercase tracking-wider text-ink-soft">Hi there!</p>
                  <p className="font-display text-xl text-ink leading-tight">{playerName}</p>
                </div>
              </motion.button>

              {/* Stats chips */}
              <div className="flex gap-3">
                <Stat icon={<Coins className="w-5 h-5" />} value={totalCoins} bg="#FFC93C" />
                <Stat icon={<Trophy className="w-5 h-5" />} value={gamesPlayed} bg="#5BC053" />
              </div>
            </motion.div>

            {/* Title block */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <motion.div
                className="inline-block mb-2"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="font-display text-5xl md:text-7xl text-ink leading-none mb-1">
                  Pick a <span className="rainbow-text">subject!</span>
                </div>
              </motion.div>
              <p className="text-ink-soft text-lg font-bold mt-3">
                Tap a card to start your adventure ✨
              </p>
            </motion.div>

            {/* Subject cards */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Math */}
              <motion.button
                variants={itemVariants}
                whileHover={{ y: -4, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen('math-menu')}
                className="sticker sticker-press text-left p-7 relative overflow-hidden"
                style={{ background: '#FFE5A0' }}
              >
                {/* Top color stripe */}
                <div className="absolute inset-x-0 top-0 h-3 bg-mango" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl border-[3px] border-ink bg-mango flex items-center justify-center bouncy"
                       style={{ boxShadow: '4px 4px 0 var(--ink)' }}>
                    <Calculator className="w-10 h-10 text-paper" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full bg-grass border-2 border-ink text-paper"
                        style={{ boxShadow: '2px 2px 0 var(--ink)' }}>
                    Ready!
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-ink mb-2">Math</h3>
                <p className="text-ink-soft font-bold mb-5">
                  Tables · Adding · Subtracting · Patterns
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink font-extrabold">
                    <Sparkles className="w-5 h-5 text-mango" fill="currentColor" />
                    <span>8 fun activities</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-[3px] border-ink bg-paper flex items-center justify-center text-2xl font-black"
                       style={{ boxShadow: '3px 3px 0 var(--ink)' }}>
                    →
                  </div>
                </div>

                {/* Decorative emoji */}
                <div className="absolute -bottom-4 -right-2 text-7xl opacity-30 wobble pointer-events-none">📐</div>
              </motion.button>

              {/* English (now unlocked!) */}
              <motion.button
                variants={itemVariants}
                whileHover={{ y: -4, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen('english-menu')}
                className="sticker sticker-press text-left p-7 relative overflow-hidden"
                style={{ background: '#FFD1DE' }}
              >
                <div className="absolute inset-x-0 top-0 h-3 bg-berry" />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl border-[3px] border-ink bg-berry flex items-center justify-center bouncy"
                       style={{ boxShadow: '4px 4px 0 var(--ink)' }}>
                    <BookOpen className="w-10 h-10 text-paper" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full bg-grass border-2 border-ink text-paper"
                        style={{ boxShadow: '2px 2px 0 var(--ink)' }}>
                    NEW!
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-ink mb-2">English</h3>
                <p className="text-ink-soft font-bold mb-5">
                  Spelling · Rhymes · Words · Phonics
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink font-extrabold">
                    <Sparkles className="w-5 h-5 text-berry" fill="currentColor" />
                    <span>8 word games</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-[3px] border-ink bg-paper flex items-center justify-center text-2xl font-black"
                       style={{ boxShadow: '3px 3px 0 var(--ink)' }}>
                    →
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-2 text-7xl opacity-30 wobble pointer-events-none">📚</div>
              </motion.button>
            </div>

            {/* Stats footer */}
            <motion.div variants={itemVariants} className="mt-10">
              <div className="sticker p-6" style={{ background: '#FFFFFF' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatBig label="Games" value={gamesPlayed} color="#9B5DE5" />
                  <StatBig label="Correct" value={totalCorrect} color="#5BC053" />
                  <StatBig label="Coins" value={totalCoins} color="#FFC93C" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Stat = ({ icon, value, bg }: { icon: React.ReactNode; value: number; bg: string }) => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded-2xl border-[3px] border-ink font-display text-xl text-ink"
    style={{ background: bg, boxShadow: '4px 4px 0 var(--ink)' }}
  >
    {icon}
    <span>{value}</span>
  </div>
);

const StatBig = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <p className="font-display text-4xl md:text-5xl" style={{ color }}>
      {value}
    </p>
    <p className="text-ink-soft text-sm font-extrabold uppercase tracking-wider">{label}</p>
  </div>
);
