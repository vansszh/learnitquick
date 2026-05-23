'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useSoundManager } from '@/utils/sounds';
import { Trophy, Medal, Flame, Target, RotateCcw, Home, Sparkles, Crown } from 'lucide-react';

const CONFETTI_COLORS = ['#FF5C8A', '#FF8E3C', '#FFC93C', '#5BC053', '#4FC3F7', '#9B5DE5'];

export const ResultsScreen = () => {
  const soundManager = useSoundManager();
  const {
    players,
    correctAnswers,
    wrongAnswers,
    coinsEarned,
    maxStreak,
    questions,
    setCurrentScreen,
    resetGame,
    totalCoins,
  } = useGameStore();

  const [showConfetti, setShowConfetti] = useState(false);
  const [revealedRanks, setRevealedRanks] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [winHeight, setWinHeight] = useState(800);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const playerRank = sortedPlayers.findIndex((p) => p.id === 'player') + 1;
  const isTopThree = playerRank <= 3 && playerRank > 0;
  const accuracy =
    questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;

  useEffect(() => {
    setWinHeight(typeof window !== 'undefined' ? window.innerHeight : 800);

    if (isTopThree) {
      setShowConfetti(true);
      soundManager.playVictory();
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rankTimer = setInterval(() => {
      setRevealedRanks((prev) => {
        if (prev >= 5) {
          clearInterval(rankTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 280);

    const statsTimer = setTimeout(() => setShowStats(true), 1800);

    return () => {
      clearInterval(rankTimer);
      clearTimeout(statsTimer);
    };
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    setCurrentScreen('math-menu');
  };
  const handleGoHome = () => {
    resetGame();
    setCurrentScreen('home');
  };

  const podiumColor = (rank: number) => {
    if (rank === 1) return '#FFC93C';
    if (rank === 2) return '#E0E0E0';
    if (rank === 3) return '#FFB07A';
    return '#FFFFFF';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(60)].map((_, i) => {
              const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
              const left = (i * 137) % 100; // pseudo-random spread
              const delay = (i % 20) * 0.1;
              const duration = 3 + ((i * 7) % 20) / 10;
              const drift = ((i * 53) % 200) - 100;
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-4 rounded-sm border-2 border-ink"
                  style={{ left: `${left}%`, top: -30, background: color }}
                  initial={{ y: -30, opacity: 1, rotate: 0 }}
                  animate={{
                    y: winHeight + 100,
                    opacity: [1, 1, 0],
                    rotate: 720,
                    x: drift,
                  }}
                  transition={{ duration, delay, ease: 'easeOut' }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [-5, 5, -5], y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl md:text-8xl mb-3 inline-block"
          >
            {isTopThree ? '🏆' : '⭐'}
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl text-ink leading-none mb-2">
            {isTopThree ? (
              <>
                <span className="rainbow-text">Amazing!</span>
              </>
            ) : (
              <>Great Effort!</>
            )}
          </h1>
          <p className="text-ink-soft text-lg font-bold mt-3">
            You finished{' '}
            <span className="font-display text-2xl text-ink">#{playerRank}</span> out of{' '}
            {players.length} players
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="sticker p-6"
            style={{ background: '#FFFFFF' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl border-[3px] border-ink bg-sun flex items-center justify-center"
                style={{ boxShadow: '3px 3px 0 var(--ink)' }}
              >
                <Trophy className="w-6 h-6 text-ink" strokeWidth={3} />
              </div>
              <h2 className="font-display text-2xl text-ink">Final Standings</h2>
            </div>

            {/* Podium */}
            <div className="flex justify-center items-end gap-2 mb-6 h-44">
              {/* 2nd */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: revealedRanks >= 2 ? '7rem' : 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 14 }}
                className="flex flex-col items-center"
              >
                {revealedRanks >= 2 && sortedPlayers[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-2"
                  >
                    <div className="text-3xl mb-1">{sortedPlayers[1].avatar}</div>
                    <p className="text-xs font-extrabold text-ink truncate max-w-[5rem]">
                      {sortedPlayers[1].id === 'player' ? 'You' : sortedPlayers[1].name}
                    </p>
                  </motion.div>
                )}
                <div
                  className="w-[5.5rem] rounded-t-2xl border-[3px] border-ink flex items-end justify-center pb-2 h-full"
                  style={{ background: podiumColor(2), boxShadow: '4px 4px 0 var(--ink)' }}
                >
                  <span className="text-3xl">🥈</span>
                </div>
              </motion.div>

              {/* 1st */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: revealedRanks >= 1 ? '10rem' : 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 14 }}
                className="flex flex-col items-center"
              >
                {revealedRanks >= 1 && sortedPlayers[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-2 relative"
                  >
                    <Crown className="w-6 h-6 text-sun absolute -top-5 left-1/2 -translate-x-1/2 crown-bounce"
                           fill="currentColor" strokeWidth={2.5} />
                    <div className="text-4xl mb-1">{sortedPlayers[0].avatar}</div>
                    <p className="text-xs font-extrabold text-ink truncate max-w-[5rem]">
                      {sortedPlayers[0].id === 'player' ? 'You' : sortedPlayers[0].name}
                    </p>
                  </motion.div>
                )}
                <div
                  className="w-24 rounded-t-2xl border-[3px] border-ink flex items-end justify-center pb-2 h-full relative"
                  style={{ background: podiumColor(1), boxShadow: '4px 4px 0 var(--ink)' }}
                >
                  <span className="text-3xl">🥇</span>
                </div>
              </motion.div>

              {/* 3rd */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: revealedRanks >= 3 ? '5rem' : 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 14 }}
                className="flex flex-col items-center"
              >
                {revealedRanks >= 3 && sortedPlayers[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-2"
                  >
                    <div className="text-3xl mb-1">{sortedPlayers[2].avatar}</div>
                    <p className="text-xs font-extrabold text-ink truncate max-w-[5rem]">
                      {sortedPlayers[2].id === 'player' ? 'You' : sortedPlayers[2].name}
                    </p>
                  </motion.div>
                )}
                <div
                  className="w-[5.5rem] rounded-t-2xl border-[3px] border-ink flex items-end justify-center pb-2 h-full"
                  style={{ background: podiumColor(3), boxShadow: '4px 4px 0 var(--ink)' }}
                >
                  <span className="text-3xl">🥉</span>
                </div>
              </motion.div>
            </div>

            {/* Full list */}
            <div className="space-y-2">
              {sortedPlayers.slice(0, 5).map((player, index) => {
                const isPlayer = player.id === 'player';
                const isRevealed = index < revealedRanks;

                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 140 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border-[2.5px] border-ink ${
                      isPlayer ? 'sticker-sm' : ''
                    }`}
                    style={{
                      background: isPlayer ? '#FFE5A0' : '#FFFFFF',
                      boxShadow: isPlayer ? '3px 3px 0 var(--ink)' : 'none',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg border-[2.5px] border-ink flex items-center justify-center font-display text-base"
                      style={{ background: podiumColor(index + 1) }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-2xl">{player.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-extrabold truncate ${
                          isPlayer ? 'text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {isPlayer ? 'You' : player.name}
                      </p>
                      <p className="text-xs font-bold text-ink-soft">
                        {player.correctAnswers} correct
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl text-ink">{player.score}</p>
                      <p className="text-xs font-bold text-ink-soft">pts</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats + rewards */}
          <div className="space-y-5">
            {/* Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={showStats ? { opacity: 1, x: 0 } : {}}
              transition={{ type: 'spring', stiffness: 140, damping: 14 }}
              className="sticker p-6"
              style={{ background: '#FFFFFF' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl border-[3px] border-ink bg-grape flex items-center justify-center"
                  style={{ boxShadow: '3px 3px 0 var(--ink)' }}
                >
                  <Target className="w-6 h-6 text-paper" strokeWidth={3} />
                </div>
                <h2 className="font-display text-2xl text-ink">Your Stats</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Accuracy ring */}
                <div
                  className="rounded-2xl border-[3px] border-ink p-3 text-center"
                  style={{ background: '#E5D7FA', boxShadow: '3px 3px 0 var(--ink)' }}
                >
                  <div className="relative w-20 h-20 mx-auto mb-1">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="rgba(27,27,47,0.15)"
                        strokeWidth="9"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="#9B5DE5"
                        strokeWidth="9"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={201}
                        initial={{ strokeDashoffset: 201 }}
                        animate={{ strokeDashoffset: 201 - (201 * accuracy) / 100 }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display text-xl text-ink">
                      {accuracy}%
                    </span>
                  </div>
                  <p className="text-xs font-black uppercase text-ink-soft">Accuracy</p>
                </div>

                {/* Correct/Wrong */}
                <div
                  className="rounded-2xl border-[3px] border-ink p-3 flex flex-col justify-center items-center"
                  style={{ background: '#FFFFFF', boxShadow: '3px 3px 0 var(--ink)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="font-display text-2xl text-grass">{correctAnswers}</p>
                      <p className="text-[10px] font-black uppercase text-ink-soft">Correct</p>
                    </div>
                    <div className="w-px h-10 bg-ink/20" />
                    <div className="text-center">
                      <p className="font-display text-2xl text-tomato">{wrongAnswers}</p>
                      <p className="text-[10px] font-black uppercase text-ink-soft">Wrong</p>
                    </div>
                  </div>
                </div>

                {/* Max streak */}
                <div
                  className="rounded-2xl border-[3px] border-ink p-3 flex items-center gap-3"
                  style={{ background: '#FFD6B0', boxShadow: '3px 3px 0 var(--ink)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl border-[2.5px] border-ink bg-mango flex items-center justify-center"
                    style={{ boxShadow: '2px 2px 0 var(--ink)' }}
                  >
                    <Flame className="w-6 h-6 text-paper" fill="currentColor" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-ink leading-none">{maxStreak}</p>
                    <p className="text-xs font-extrabold text-ink-soft">Best Streak</p>
                  </div>
                </div>

                {/* Rank */}
                <div
                  className="rounded-2xl border-[3px] border-ink p-3 flex items-center gap-3"
                  style={{ background: '#FFE5A0', boxShadow: '3px 3px 0 var(--ink)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl border-[2.5px] border-ink bg-sun flex items-center justify-center"
                    style={{ boxShadow: '2px 2px 0 var(--ink)' }}
                  >
                    <Medal className="w-6 h-6 text-ink" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-display text-2xl text-ink leading-none">#{playerRank}</p>
                    <p className="text-xs font-extrabold text-ink-soft">Final Rank</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coins */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showStats ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 140, damping: 14 }}
              className="sticker p-6"
              style={{ background: '#FFC93C' }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-2xl border-[3px] border-ink bg-paper flex items-center justify-center text-4xl"
                    style={{ boxShadow: '3px 3px 0 var(--ink)' }}
                  >
                    🪙
                  </motion.div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-ink">
                      Coins Earned
                    </p>
                    <motion.p
                      className="font-display text-5xl text-ink leading-none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 12 }}
                    >
                      +{coinsEarned}
                    </motion.p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-wider text-ink">
                    Total
                  </p>
                  <p className="font-display text-3xl text-ink leading-none">{totalCoins}</p>
                </div>
              </div>

              {maxStreak >= 3 && (
                <div className="mt-4 pt-3 border-t-[3px] border-dashed border-ink/40 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-ink">
                    🔥 Streak bonus ({maxStreak}×)
                  </span>
                  <span className="font-display text-lg text-ink">
                    +{Math.floor(maxStreak / 3) * 2}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showStats ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <motion.button
                onClick={handlePlayAgain}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 sticker sticker-press py-4 font-display text-xl text-paper flex items-center justify-center gap-2"
                style={{ background: '#FF5C8A' }}
              >
                <RotateCcw className="w-5 h-5" strokeWidth={3} />
                Play Again
              </motion.button>

              <motion.button
                onClick={handleGoHome}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="sticker sticker-press py-4 px-6 font-display text-xl text-ink flex items-center justify-center gap-2"
                style={{ background: '#FFFFFF' }}
              >
                <Home className="w-5 h-5" strokeWidth={3} />
                Home
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showStats ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <div
            className="sticker-sm inline-flex items-center gap-3 px-5 py-3"
            style={{ background: '#D6F0CE' }}
          >
            <Sparkles className="w-5 h-5 text-grass" fill="currentColor" />
            <p className="text-ink font-extrabold">
              {accuracy >= 80
                ? "You're a math superstar! 🌟"
                : accuracy >= 60
                ? 'Great job — keep practicing! 💪'
                : "Good try! Practice makes perfect 📚"}
            </p>
            <Sparkles className="w-5 h-5 text-grass" fill="currentColor" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
