'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { getModeInfo } from '@/utils/questionGenerator';
import { useSoundManager } from '@/utils/sounds';
import { Trophy, Clock, Coins, CheckCircle, XCircle, Flame } from 'lucide-react';

export const GameScreen = () => {
  const soundManager = useSoundManager();
  const {
    questions,
    currentQuestion,
    currentGameMode,
    players,
    correctAnswers,
    wrongAnswers,
    coinsEarned,
    streak,
    answerQuestion,
    nextQuestion,
    endGame,
    updateBotScores,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownNum, setCountdownNum] = useState(3);
  const [coinAnim, setCoinAnim] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  const handleAnswerRef = useRef<((answer: string | number) => void) | null>(null);

  const question = questions[currentQuestion];
  const modeInfo = currentGameMode ? getModeInfo(currentGameMode) : null;
  const progress = (currentQuestion / questions.length) * 100;

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const playerRank = sortedPlayers.findIndex((p) => p.id === 'player') + 1;

  // ===== Countdown =====
  useEffect(() => {
    if (!showCountdown) return;
    const timer = setInterval(() => {
      soundManager.playCountdown();
      setCountdownNum((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showCountdown, soundManager]);

  // ===== Per-question timer =====
  useEffect(() => {
    if (showCountdown || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswerRef.current?.(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showCountdown, showResult, currentQuestion]);

  const handleAnswer = useCallback(
    (answer: string | number) => {
      if (showResult) return;

      setSelectedAnswer(answer);
      const correct = answerQuestion(answer);
      setShowResult(true);

      if (correct) {
        setCoinAnim(true);
        soundManager.playCorrect();
        soundManager.playCoin();
        setTimeout(() => setCoinAnim(false), 1000);
      } else {
        setShakeWrong(true);
        soundManager.playWrong();
        setTimeout(() => setShakeWrong(false), 500);
      }

      updateBotScores();

      setTimeout(() => {
        if (currentQuestion >= questions.length - 1) {
          endGame();
        } else {
          nextQuestion();
          setShowResult(false);
          setSelectedAnswer(null);
          setTimeLeft(15);
        }
      }, 1500);
    },
    [showResult, answerQuestion, updateBotScores, currentQuestion, questions.length, endGame, nextQuestion, soundManager]
  );

  // Keep ref in sync so the timer effect doesn't need it as a dep
  useEffect(() => {
    handleAnswerRef.current = handleAnswer;
  }, [handleAnswer]);

  // ===== Countdown screen =====
  if (showCountdown) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <motion.div
            key={countdownNum}
            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14 }}
            className="mb-6"
          >
            {countdownNum > 0 ? (
              <div
                className="font-display text-[10rem] md:text-[14rem] leading-none"
                style={{
                  color: countdownNum === 3 ? '#FF5C8A' : countdownNum === 2 ? '#FFC93C' : '#5BC053',
                  textShadow: '8px 8px 0 var(--ink)',
                }}
              >
                {countdownNum}
              </div>
            ) : (
              <div className="font-display text-[7rem] md:text-[10rem] leading-none rainbow-text">
                GO!
              </div>
            )}
          </motion.div>

          <motion.p
            className="text-ink-soft text-2xl font-extrabold mb-10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Get ready... 🎯
          </motion.p>

          {/* Players in match */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="sticker p-5 max-w-md mx-auto"
            style={{ background: '#FFFFFF' }}
          >
            <p className="text-xs font-black uppercase tracking-wider text-ink-soft mb-3">
              Players in this match
            </p>
            <div className="flex justify-center gap-1.5 flex-wrap">
              {players.slice(0, 8).map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1 * i, type: 'spring', stiffness: 200, damping: 12 }}
                  className={`w-11 h-11 rounded-xl border-[3px] border-ink flex items-center justify-center text-xl ${
                    player.id === 'player' ? 'bouncy' : ''
                  }`}
                  style={{
                    background: player.id === 'player' ? '#FFC93C' : '#FFFFFF',
                    boxShadow: '2px 2px 0 var(--ink)',
                  }}
                >
                  {player.avatar}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!question || !modeInfo) return null;

  return (
    <div className="min-h-screen p-3 md:p-6 flex flex-col">
      {/* Floating coin animation */}
      <AnimatePresence>
        {coinAnim && (
          <motion.div
            initial={{ scale: 0, y: 0, opacity: 1 }}
            animate={{ scale: 1.4, y: -120, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 z-50 font-display text-5xl text-ink"
            style={{ textShadow: '4px 4px 0 #FFC93C' }}
          >
            +10 🪙
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-2 sm:gap-3 mb-5 max-w-5xl mx-auto w-full"
      >
        {/* Mode badge */}
        <div
          className="sticker-sm flex items-center gap-2 px-3 py-2"
          style={{ background: modeInfo.color }}
        >
          <span className="text-xl">{modeInfo.icon}</span>
          <span className="text-paper font-display text-sm md:text-base hidden sm:inline">
            {modeInfo.title}
          </span>
        </div>

        {/* Timer */}
        <motion.div
          className="sticker-sm flex items-center gap-2 px-4 py-2 font-display text-xl"
          animate={timeLeft <= 5 ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
          style={{
            background: timeLeft <= 5 ? '#FF6B6B' : '#FFFFFF',
            color: timeLeft <= 5 ? '#FFFFFF' : 'var(--ink)',
          }}
        >
          <Clock className="w-5 h-5" strokeWidth={3} />
          {timeLeft}s
        </motion.div>

        {/* Coins earned */}
        <motion.div
          className="sticker-sm flex items-center gap-2 px-4 py-2 font-display text-xl text-ink"
          animate={coinAnim ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
          style={{ background: '#FFC93C' }}
        >
          <Coins className="w-5 h-5" strokeWidth={3} />
          {coinsEarned}
        </motion.div>
      </motion.div>

      {/* Progress strip */}
      <div className="max-w-5xl mx-auto w-full mb-6">
        <div className="flex justify-between text-sm font-extrabold text-ink mb-2 px-1">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="flex items-center gap-1">
            <Flame
              className={`w-4 h-4 ${streak >= 3 ? 'text-mango' : 'text-ink/30'}`}
              fill={streak >= 3 ? 'currentColor' : 'none'}
              strokeWidth={3}
            />
            {streak} streak
          </span>
        </div>
        <div className="h-5 rounded-full border-[3px] border-ink bg-paper overflow-hidden"
             style={{ boxShadow: '3px 3px 0 var(--ink)' }}>
          <motion.div
            className="h-full rounded-full progress-stripes"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ background: modeInfo.color }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-5 max-w-6xl mx-auto w-full">
        {/* Main question + answers */}
        <div className="flex-1 flex flex-col">
          {/* Question card */}
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30, rotate: -1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 16 }}
            className={`sticker p-5 sm:p-7 md:p-10 mb-6 relative ${shakeWrong ? 'shake' : ''}`}
            style={{ background: '#FFFFFF' }}
          >
            <div className="absolute -top-4 left-6">
              <span
                className="px-4 py-1 rounded-full border-[3px] border-ink font-display text-base text-paper"
                style={{ background: modeInfo.color, boxShadow: '3px 3px 0 var(--ink)' }}
              >
                Question {currentQuestion + 1}
              </span>
            </div>
            {question.media?.type === 'emoji' && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                className="flex justify-center mb-3 pt-1"
              >
                <div
                  className="text-7xl md:text-9xl leading-none"
                  style={{ filter: 'drop-shadow(4px 4px 0 var(--ink))' }}
                >
                  {question.media.value}
                </div>
              </motion.div>
            )}
            <p className="font-display text-3xl md:text-5xl text-ink text-center leading-snug pt-2">
              {question.question}
            </p>
          </motion.div>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = String(option) === String(question.correctAnswer);

              const palette = ['#FFC93C', '#FF5C8A', '#4FC3F7', '#5BC053'];
              const baseColor = palette[index % palette.length];

              let bg = baseColor;
              let textColor = '#1B1B2F';

              if (showResult) {
                if (isCorrectAnswer) {
                  bg = '#5BC053';
                  textColor = '#FFFFFF';
                } else if (isSelected && !isCorrectAnswer) {
                  bg = '#FF6B6B';
                  textColor = '#FFFFFF';
                } else {
                  bg = '#F0F0F0';
                  textColor = '#1B1B2F';
                }
              }

              // Adapt text size: numbers/short tokens get the giant treatment,
              // longer word answers get a more readable size.
              const optionStr = String(option);
              const len = optionStr.length;
              let textSize: string;
              if (len <= 3) textSize = 'text-3xl md:text-5xl';
              else if (len <= 6) textSize = 'text-2xl md:text-4xl';
              else if (len <= 10) textSize = 'text-xl md:text-3xl';
              else textSize = 'text-lg md:text-2xl';

              return (
                <motion.button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.08, type: 'spring', stiffness: 160, damping: 14 }}
                  whileHover={!showResult ? { y: -3, scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.96 } : {}}
                  className={`relative p-4 sm:p-6 md:p-8 rounded-3xl border-[4px] border-ink font-display ${textSize} transition-all break-words ${
                    showResult ? '' : 'sticker-press'
                  }`}
                  style={{
                    background: bg,
                    color: textColor,
                    boxShadow: '6px 6px 0 var(--ink)',
                  }}
                >
                  {option}

                  {showResult && isCorrectAnswer && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-[3px] border-ink bg-paper flex items-center justify-center"
                      style={{ boxShadow: '2px 2px 0 var(--ink)' }}
                    >
                      <CheckCircle className="w-6 h-6 text-grass" strokeWidth={3} />
                    </motion.div>
                  )}

                  {showResult && isSelected && !isCorrectAnswer && (
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-[3px] border-ink bg-paper flex items-center justify-center"
                      style={{ boxShadow: '2px 2px 0 var(--ink)' }}
                    >
                      <XCircle className="w-6 h-6 text-tomato" strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Streak indicator */}
          <AnimatePresence>
            {streak >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                className="mt-6 flex justify-center"
              >
                <div
                  className="sticker-sm flex items-center gap-3 px-5 py-2.5 font-display text-xl"
                  style={{ background: '#FF8E3C', color: '#FFFFFF' }}
                >
                  <Flame className="w-6 h-6" fill="currentColor" strokeWidth={2.5} />
                  {streak}× Streak! +{Math.floor(streak / 3) * 2} bonus
                  <Flame className="w-6 h-6" fill="currentColor" strokeWidth={2.5} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-80 sticker p-5 h-fit"
          style={{ background: '#FFFFFF' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl border-[3px] border-ink bg-sun flex items-center justify-center"
                style={{ boxShadow: '2px 2px 0 var(--ink)' }}
              >
                <Trophy className="w-5 h-5 text-ink" strokeWidth={3} />
              </div>
              <span className="font-display text-xl text-ink">Live Rank</span>
            </div>
            <span
              className="text-xs font-black uppercase tracking-wider px-2 py-1 rounded-full border-2 border-ink bg-berry text-paper"
              style={{ boxShadow: '2px 2px 0 var(--ink)' }}
            >
              #{playerRank}
            </span>
          </div>

          <div className="space-y-2">
            {sortedPlayers.slice(0, 5).map((player, index) => {
              const isPlayer = player.id === 'player';
              const rankBg = ['#FFC93C', '#E5E5E5', '#FFC2A0', '#FFFFFF', '#FFFFFF'][index];
              return (
                <motion.div
                  key={player.id}
                  layout
                  className={`flex items-center gap-3 p-2.5 rounded-xl border-[2.5px] border-ink ${
                    isPlayer ? '' : ''
                  }`}
                  style={{
                    background: isPlayer ? '#FFE5A0' : '#FFFFFF',
                    boxShadow: isPlayer ? '3px 3px 0 var(--ink)' : 'none',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg border-[2.5px] border-ink flex items-center justify-center font-display text-base"
                    style={{ background: rankBg }}
                  >
                    {index === 0 ? '👑' : index + 1}
                  </div>
                  <span className="text-xl">{player.avatar}</span>
                  <p
                    className={`flex-1 truncate font-extrabold text-sm ${
                      isPlayer ? 'text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {isPlayer ? 'You' : player.name}
                  </p>
                  <span className="font-display text-base text-ink">{player.score}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Quick stats */}
          <div className="mt-4 pt-4 border-t-[3px] border-dashed border-ink/30 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border-[2.5px] border-ink p-2" style={{ background: '#D6F0CE' }}>
              <p className="font-display text-2xl text-grass">{correctAnswers}</p>
              <p className="text-xs font-black uppercase text-ink-soft">Correct</p>
            </div>
            <div className="rounded-xl border-[2.5px] border-ink p-2" style={{ background: '#FFD1DE' }}>
              <p className="font-display text-2xl text-tomato">{wrongAnswers}</p>
              <p className="text-xs font-black uppercase text-ink-soft">Wrong</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
