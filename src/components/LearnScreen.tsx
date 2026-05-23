'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import {
  ArrowLeft,
  BookOpen,
  Calculator,
  Grid3X3,
  ArrowRight,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Star,
  Lightbulb,
} from 'lucide-react';

type LearnMode = 'menu' | 'tables' | 'tables-practice' | 'carry-forward' | 'comparison';

interface TableData {
  number: number;
  color: string;
  soft: string;
}

const tables: TableData[] = [
  { number: 1, color: '#FF5C8A', soft: '#FFD1DE' },
  { number: 2, color: '#FF8E3C', soft: '#FFD6B0' },
  { number: 3, color: '#FFC93C', soft: '#FFE5A0' },
  { number: 4, color: '#5BC053', soft: '#D6F0CE' },
  { number: 5, color: '#6FE7B0', soft: '#D6F0CE' },
  { number: 6, color: '#4FC3F7', soft: '#C7E9FA' },
  { number: 7, color: '#2196F3', soft: '#C7E9FA' },
  { number: 8, color: '#9B5DE5', soft: '#E5D7FA' },
  { number: 9, color: '#FF6B6B', soft: '#FFD1DE' },
  { number: 10, color: '#FF5C8A', soft: '#FFD1DE' },
];

export const LearnScreen = () => {
  const { setCurrentScreen, playerAvatar, playerName, totalCoins } = useGameStore();
  const [learnMode, setLearnMode] = useState<LearnMode>('menu');
  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [carryStep, setCarryStep] = useState(0);

  const handleBack = () => {
    if (learnMode === 'menu') {
      setCurrentScreen('math-menu');
    } else if (learnMode === 'tables-practice') {
      setLearnMode('tables');
      setPracticeIndex(0);
      setShowAnswer(false);
    } else {
      setLearnMode('menu');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 max-w-6xl mx-auto"
      >
        <motion.button
          onClick={handleBack}
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

      <AnimatePresence mode="wait">
        {learnMode === 'menu' && (
          <LearnMenu key="menu" setLearnMode={setLearnMode} />
        )}

        {learnMode === 'tables' && (
          <TablesLearning
            key="tables"
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            setLearnMode={setLearnMode}
            setPracticeIndex={setPracticeIndex}
            setShowAnswer={setShowAnswer}
          />
        )}

        {learnMode === 'tables-practice' && (
          <TablesPractice
            key="tables-practice"
            selectedTable={selectedTable}
            practiceIndex={practiceIndex}
            setPracticeIndex={setPracticeIndex}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            setLearnMode={setLearnMode}
          />
        )}

        {learnMode === 'carry-forward' && (
          <CarryForwardLearning key="carry" step={carryStep} setStep={setCarryStep} />
        )}

        {learnMode === 'comparison' && <ComparisonLearning key="comparison" />}
      </AnimatePresence>
    </div>
  );
};

// =====================================================
// Learn Menu
// =====================================================
const LearnMenu = ({ setLearnMode }: { setLearnMode: (mode: LearnMode) => void }) => {
  const cards = [
    {
      mode: 'tables' as const,
      title: 'Times Tables',
      desc: 'Learn multiplication tables 1-10 with flashcards',
      bg: '#D6F0CE',
      accent: '#5BC053',
      icon: <Grid3X3 className="w-9 h-9 text-paper" strokeWidth={2.5} />,
      footer: 'Practice 10 tables',
      footerIcon: <BookOpen className="w-4 h-4" strokeWidth={3} />,
      decorative: '✖️',
    },
    {
      mode: 'carry-forward' as const,
      title: 'Carry Forward',
      desc: 'Add big numbers step by step with carrying',
      bg: '#C7E9FA',
      accent: '#2196F3',
      icon: <Calculator className="w-9 h-9 text-paper" strokeWidth={2.5} />,
      footer: 'Visual step-by-step',
      footerIcon: <Lightbulb className="w-4 h-4" strokeWidth={3} />,
      decorative: '➕',
    },
    {
      mode: 'comparison' as const,
      title: 'Compare Numbers',
      desc: 'Learn the < = > signs the easy way',
      bg: '#E5D7FA',
      accent: '#9B5DE5',
      icon: <span className="text-3xl font-display text-paper">{'< >'}</span>,
      footer: 'Fun visual examples',
      footerIcon: <Star className="w-4 h-4" fill="currentColor" />,
      decorative: '⚖️',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      {/* Title */}
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border-[3px] border-ink bg-grass mb-4 wobble"
          style={{ boxShadow: '4px 4px 0 var(--ink)' }}
        >
          <GraduationCap className="w-10 h-10 text-paper" strokeWidth={2.5} />
        </motion.div>
        <h1 className="font-display text-5xl md:text-6xl text-ink leading-none">
          Learning <span className="rainbow-text">Center</span>
        </h1>
        <p className="text-ink-soft text-lg font-bold mt-3">
          Take your time — there&apos;s no timer here! 📚
        </p>
      </div>

      {/* Lesson cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.button
            key={card.mode}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 140, damping: 14 }}
            whileHover={{ y: -5, rotate: i % 2 === 0 ? -1 : 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLearnMode(card.mode)}
            className="sticker sticker-press p-7 text-left relative overflow-hidden"
            style={{ background: card.bg }}
          >
            <div className="absolute inset-x-0 top-0 h-3" style={{ background: card.accent }} />

            <div
              className="w-16 h-16 rounded-2xl border-[3px] border-ink flex items-center justify-center mb-4 mt-1 bouncy"
              style={{ background: card.accent, boxShadow: '4px 4px 0 var(--ink)' }}
            >
              {card.icon}
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-ink mb-2 leading-tight">
              {card.title}
            </h3>
            <p className="text-ink-soft font-bold mb-4">{card.desc}</p>

            <div className="flex items-center gap-2 text-ink font-extrabold" style={{ color: card.accent }}>
              {card.footerIcon}
              <span className="text-sm">{card.footer}</span>
            </div>

            <div className="absolute -bottom-3 -right-2 text-7xl opacity-25 pointer-events-none">
              {card.decorative}
            </div>
          </motion.button>
        ))}

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 140, damping: 14 }}
          className="sticker p-7 relative overflow-hidden sticker-disabled"
          style={{ background: '#FFFFFF' }}
        >
          <div className="absolute inset-x-0 top-0 h-3 bg-ink/30" />
          <div
            className="w-16 h-16 rounded-2xl border-[3px] border-ink bg-ink-soft flex items-center justify-center mb-4 mt-1"
            style={{ boxShadow: '4px 4px 0 var(--ink)' }}
          >
            <Sparkles className="w-9 h-9 text-paper" strokeWidth={2.5} />
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-ink/60 mb-2 leading-tight">
            More Coming
          </h3>
          <p className="text-ink-soft/80 font-bold">
            Subtraction, division and more lessons soon!
          </p>
        </motion.div>
      </div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10"
      >
        <div className="sticker p-5" style={{ background: '#FFE5A0' }}>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl border-[3px] border-ink bg-mango flex items-center justify-center flex-shrink-0 wobble"
              style={{ boxShadow: '3px 3px 0 var(--ink)' }}
            >
              <Lightbulb className="w-6 h-6 text-paper" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-display text-xl text-ink mb-1">Learning Tip!</h4>
              <p className="text-ink-soft font-bold text-sm">
                When you feel ready, head to the Math Arena to test your skills and earn coins! 🌟
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// =====================================================
// Tables Learning
// =====================================================
const TablesLearning = ({
  selectedTable,
  setSelectedTable,
  setLearnMode,
  setPracticeIndex,
  setShowAnswer,
}: {
  selectedTable: number;
  setSelectedTable: (n: number) => void;
  setLearnMode: (mode: LearnMode) => void;
  setPracticeIndex: (n: number) => void;
  setShowAnswer: (b: boolean) => void;
}) => {
  const tableData = tables.find((t) => t.number === selectedTable)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-none">
          Times Tables <span className="rainbow-text">1-10</span>
        </h1>
        <p className="text-ink-soft font-bold mt-2">
          Pick a table to learn, then practice with flashcards!
        </p>
      </div>

      {/* Table picker */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tables.map((table) => {
          const isSelected = selectedTable === table.number;
          return (
            <motion.button
              key={table.number}
              onClick={() => setSelectedTable(table.number)}
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-2xl border-[3px] border-ink font-display text-2xl"
              style={{
                background: isSelected ? table.color : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : 'var(--ink)',
                boxShadow: isSelected ? '4px 4px 0 var(--ink)' : '2px 2px 0 var(--ink)',
                transform: isSelected ? 'translate(-1px, -1px)' : 'none',
              }}
            >
              {table.number}
            </motion.button>
          );
        })}
      </div>

      {/* Selected table */}
      <motion.div
        key={selectedTable}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="sticker p-6 md:p-8 mb-6 relative overflow-hidden"
        style={{ background: tableData.soft }}
      >
        <div className="absolute inset-x-0 top-0 h-3" style={{ background: tableData.color }} />

        <div className="flex items-center justify-between mb-6 mt-2 flex-wrap gap-3">
          <h2 className="font-display text-2xl md:text-3xl text-ink flex items-center gap-3">
            <span
              className="w-12 h-12 rounded-xl border-[3px] border-ink flex items-center justify-center text-paper"
              style={{ background: tableData.color, boxShadow: '3px 3px 0 var(--ink)' }}
            >
              {selectedTable}
            </span>
            Table of {selectedTable}
          </h2>
          <motion.button
            onClick={() => {
              setPracticeIndex(0);
              setShowAnswer(false);
              setLearnMode('tables-practice');
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="sticker-sm sticker-press-sm px-5 py-3 font-display text-lg text-paper flex items-center gap-2"
            style={{ background: tableData.color }}
          >
            Practice <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((multiplier, index) => (
            <motion.div
              key={multiplier}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.04, type: 'spring', stiffness: 160 }}
              className="rounded-2xl border-[3px] border-ink p-3 text-center"
              style={{ background: '#FFFFFF', boxShadow: '3px 3px 0 var(--ink)' }}
            >
              <div className="text-ink-soft font-extrabold text-xs mb-1">
                {selectedTable} × {multiplier}
              </div>
              <div
                className="font-display text-3xl"
                style={{ color: tableData.color }}
              >
                {selectedTable * multiplier}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Memory tips */}
      <div className="sticker p-5" style={{ background: '#FFE5A0' }}>
        <h3 className="font-display text-xl text-ink mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-mango" fill="currentColor" />
          Memory Tip for Table of {selectedTable}
        </h3>
        <div className="text-ink font-bold space-y-1">
          {selectedTable === 1 && <p>🌟 Easy! Any number times 1 stays the same. 5 × 1 = 5.</p>}
          {selectedTable === 2 && <p>🌟 Just double it! 2 × 3 = 3 + 3 = 6. Count by 2s.</p>}
          {selectedTable === 5 && <p>🌟 All answers end in 0 or 5! Count: 5, 10, 15, 20…</p>}
          {selectedTable === 10 && <p>🌟 Just add a zero! 10 × 7 = 70. The easiest table!</p>}
          {selectedTable === 9 && (
            <p>🌟 Finger trick: Hold 10 fingers, fold the multiplier finger. Left = tens, right = ones!</p>
          )}
          {![1, 2, 5, 9, 10].includes(selectedTable) && (
            <p>
              🌟 Say it out loud: &quot;{selectedTable} times 1 is {selectedTable}, {selectedTable}{' '}
              times 2 is {selectedTable * 2}…&quot;
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// =====================================================
// Tables Practice (Flashcards)
// =====================================================
const TablesPractice = ({
  selectedTable,
  practiceIndex,
  setPracticeIndex,
  showAnswer,
  setShowAnswer,
  setLearnMode,
}: {
  selectedTable: number;
  practiceIndex: number;
  setPracticeIndex: (n: number) => void;
  showAnswer: boolean;
  setShowAnswer: (b: boolean) => void;
  setLearnMode: (mode: LearnMode) => void;
}) => {
  const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const currentMultiplier = multipliers[practiceIndex];
  const answer = selectedTable * currentMultiplier;
  const tableData = tables.find((t) => t.number === selectedTable)!;

  const handleNext = () => {
    if (practiceIndex < 9) {
      setPracticeIndex(practiceIndex + 1);
      setShowAnswer(false);
    } else {
      setLearnMode('tables');
      setPracticeIndex(0);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (practiceIndex > 0) {
      setPracticeIndex(practiceIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl text-ink leading-none mb-2">
          Practice: Table of{' '}
          <span style={{ color: tableData.color }}>{selectedTable}</span>
        </h1>
        <p className="text-ink-soft font-bold">Tap the card to flip it! 👆</p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mb-8">
        {multipliers.map((_, idx) => (
          <motion.div
            key={idx}
            className="w-3 h-3 rounded-full border-2 border-ink"
            style={{
              background:
                idx === practiceIndex
                  ? tableData.color
                  : idx < practiceIndex
                  ? '#5BC053'
                  : '#FFFFFF',
            }}
            animate={idx === practiceIndex ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Flashcard */}
      <motion.div
        onClick={() => setShowAnswer(!showAnswer)}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer mb-8"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full h-72 md:h-80"
          animate={{ rotateY: showAnswer ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 16 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 sticker p-8 flex flex-col items-center justify-center"
            style={{
              background: tableData.soft,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="font-display text-7xl md:text-8xl text-ink mb-4 leading-none">
              {selectedTable} × {currentMultiplier}
            </div>
            <div className="text-ink-soft font-extrabold flex items-center gap-2">
              <span>Tap to flip</span>
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                👆
              </motion.span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 sticker p-8 flex flex-col items-center justify-center"
            style={{
              background: tableData.color,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-paper font-extrabold text-lg mb-2">
              {selectedTable} × {currentMultiplier} =
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="font-display text-9xl text-paper leading-none"
              style={{ textShadow: '6px 6px 0 var(--ink)' }}
            >
              {answer}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-3xl"
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Nav */}
      <div className="flex justify-center gap-3">
        <motion.button
          onClick={handlePrev}
          disabled={practiceIndex === 0}
          whileHover={practiceIndex !== 0 ? { scale: 1.04 } : {}}
          whileTap={practiceIndex !== 0 ? { scale: 0.96 } : {}}
          className={`sticker-sm px-5 py-3 font-display text-lg text-ink flex items-center gap-2 ${
            practiceIndex === 0 ? 'sticker-disabled' : 'sticker-press-sm'
          }`}
          style={{ background: '#FFFFFF' }}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} /> Previous
        </motion.button>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="sticker-sm sticker-press-sm px-5 py-3 font-display text-lg text-paper flex items-center gap-2"
          style={{ background: tableData.color }}
        >
          {practiceIndex === 9 ? 'Finish' : 'Next'}
          <ChevronRight className="w-5 h-5" strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// =====================================================
// Carry Forward Learning
// =====================================================
const CarryForwardLearning = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) => {
  const examples = [
    {
      num1: 27,
      num2: 15,
      steps: [
        'Add the ones: 7 + 5 = 12',
        'Write 2, carry 1 to the tens',
        'Add the tens: 2 + 1 + 1 (carry) = 4',
        'Answer: 42! 🎉',
      ],
    },
    {
      num1: 38,
      num2: 45,
      steps: [
        'Add the ones: 8 + 5 = 13',
        'Write 3, carry 1 to the tens',
        'Add the tens: 3 + 4 + 1 (carry) = 8',
        'Answer: 83! 🎉',
      ],
    },
    {
      num1: 56,
      num2: 28,
      steps: [
        'Add the ones: 6 + 8 = 14',
        'Write 4, carry 1 to the tens',
        'Add the tens: 5 + 2 + 1 (carry) = 8',
        'Answer: 84! 🎉',
      ],
    },
  ];

  const [exampleIndex, setExampleIndex] = useState(0);
  const example = examples[exampleIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-none">
          Carry Forward <span className="rainbow-text">Addition</span>
        </h1>
        <p className="text-ink-soft font-bold mt-2">
          When numbers get big, we carry to the next column!
        </p>
      </div>

      {/* Concept */}
      <div className="sticker p-6 md:p-8 mb-6" style={{ background: '#FFFFFF' }}>
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-2xl border-[3px] border-ink bg-ocean flex items-center justify-center flex-shrink-0 wobble"
            style={{ boxShadow: '3px 3px 0 var(--ink)' }}
          >
            <Lightbulb className="w-6 h-6 text-paper" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink mb-2">What does carrying mean?</h3>
            <p className="text-ink-soft font-bold">
              When you add two digits and get{' '}
              <span className="px-2 py-0.5 rounded-md bg-ocean text-paper">10 or more</span>, you
              write the ones digit and &quot;carry&quot; the tens digit to the next column. It&apos;s
              like saying &quot;this column is full — let me move some to the next!&quot;
            </p>
          </div>
        </div>

        {/* Visual + steps */}
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Numbers */}
          <div className="flex justify-center">
            <div
              className="rounded-2xl border-[3px] border-ink p-6 inline-block"
              style={{ background: '#C7E9FA', boxShadow: '4px 4px 0 var(--ink)' }}
            >
              {/* Carry indicator */}
              <div
                className="text-base text-ocean font-display h-7"
                style={{ opacity: step >= 1 ? 1 : 0 }}
              >
                {step >= 2 && <span className="inline-block w-12 text-center">1</span>}
                <span className="inline-block w-12" />
              </div>

              {/* Number 1 */}
              <div className="font-display text-5xl text-ink flex justify-center">
                <span className={`inline-block w-12 text-center ${step >= 2 ? 'text-ocean' : ''}`}>
                  {Math.floor(example.num1 / 10)}
                </span>
                <span
                  className={`inline-block w-12 text-center ${step === 0 ? 'text-mango' : ''}`}
                >
                  {example.num1 % 10}
                </span>
              </div>

              {/* Number 2 with + */}
              <div className="font-display text-5xl text-ink flex justify-center">
                <span className="text-berry mr-2">+</span>
                <span className={`inline-block w-12 text-center ${step >= 2 ? 'text-ocean' : ''}`}>
                  {Math.floor(example.num2 / 10)}
                </span>
                <span
                  className={`inline-block w-12 text-center ${step === 0 ? 'text-mango' : ''}`}
                >
                  {example.num2 % 10}
                </span>
              </div>

              {/* Line */}
              <div className="w-full h-1 bg-ink rounded my-3" />

              {/* Answer */}
              <div className="font-display text-5xl flex justify-center">
                <span
                  className={`inline-block w-12 text-center ${
                    step >= 3 ? 'text-grass' : 'text-ink/30'
                  }`}
                >
                  {step >= 3 ? Math.floor((example.num1 + example.num2) / 10) : '?'}
                </span>
                <span
                  className={`inline-block w-12 text-center ${
                    step >= 1 ? 'text-grass' : 'text-ink/30'
                  }`}
                >
                  {step >= 1 ? (example.num1 + example.num2) % 10 : '?'}
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {example.steps.map((stepText, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={idx <= step ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                className={`p-4 rounded-2xl border-[2.5px] border-ink transition-all ${
                  idx === step
                    ? ''
                    : idx < step
                    ? ''
                    : ''
                }`}
                style={{
                  background:
                    idx === step
                      ? '#C7E9FA'
                      : idx < step
                      ? '#D6F0CE'
                      : '#FFFFFF',
                  boxShadow: idx === step ? '3px 3px 0 var(--ink)' : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl border-[2.5px] border-ink flex items-center justify-center font-display text-base flex-shrink-0`}
                    style={{
                      background:
                        idx < step ? '#5BC053' : idx === step ? '#2196F3' : '#FFFFFF',
                      color: idx <= step ? '#FFFFFF' : 'var(--ink)',
                    }}
                  >
                    {idx < step ? '✓' : idx + 1}
                  </div>
                  <span
                    className={`font-extrabold text-sm md:text-base ${
                      idx <= step ? 'text-ink' : 'text-ink/40'
                    }`}
                  >
                    {stepText}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="flex justify-center gap-3 mt-7 flex-wrap">
          <motion.button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            whileHover={step !== 0 ? { scale: 1.04 } : {}}
            whileTap={step !== 0 ? { scale: 0.96 } : {}}
            className={`sticker-sm px-5 py-3 font-display text-lg text-ink flex items-center gap-2 ${
              step === 0 ? 'sticker-disabled' : 'sticker-press-sm'
            }`}
            style={{ background: '#FFFFFF' }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} /> Back
          </motion.button>

          {step < 3 ? (
            <motion.button
              onClick={() => setStep(step + 1)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="sticker-sm sticker-press-sm px-5 py-3 font-display text-lg text-paper flex items-center gap-2"
              style={{ background: '#2196F3' }}
            >
              Next Step <ChevronRight className="w-5 h-5" strokeWidth={3} />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => {
                setExampleIndex((exampleIndex + 1) % examples.length);
                setStep(0);
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="sticker-sm sticker-press-sm px-5 py-3 font-display text-lg text-paper flex items-center gap-2"
              style={{ background: '#5BC053' }}
            >
              Try Another <Sparkles className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Tip */}
      <div className="sticker p-5" style={{ background: '#FFE5A0' }}>
        <h3 className="font-display text-xl text-ink mb-2">Remember!</h3>
        <p className="text-ink font-bold">
          Always start from the{' '}
          <span className="px-2 py-0.5 rounded-md bg-mango text-paper">right side</span> (the ones
          column) and work your way left. If you get 10 or more, write the ones digit and carry the
          1!
        </p>
      </div>
    </motion.div>
  );
};

// =====================================================
// Comparison Learning
// =====================================================
const ComparisonLearning = () => {
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    { left: 5, right: 8, symbol: '<', explanation: '5 is smaller than 8, so we use < (less than)' },
    {
      left: 12,
      right: 7,
      symbol: '>',
      explanation: '12 is bigger than 7, so we use > (greater than)',
    },
    { left: 9, right: 9, symbol: '=', explanation: '9 is the same as 9, so we use = (equal to)' },
    {
      left: 3,
      right: 10,
      symbol: '<',
      explanation: '3 is smaller than 10, so we use < (less than)',
    },
    {
      left: 15,
      right: 11,
      symbol: '>',
      explanation: '15 is bigger than 11, so we use > (greater than)',
    },
  ];

  const example = examples[currentExample];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl md:text-5xl text-ink leading-none">
          Comparing <span className="rainbow-text">Numbers</span>
        </h1>
        <p className="text-ink-soft font-bold mt-2">
          Learn when to use &lt;, &gt; and = signs!
        </p>
      </div>

      {/* Symbol guide */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        {[
          { symbol: '<', name: 'Less Than', desc: 'Left is smaller', bg: '#C7E9FA', accent: '#4FC3F7', emoji: '⬅️' },
          { symbol: '=', name: 'Equal To', desc: 'Both are same', bg: '#E5D7FA', accent: '#9B5DE5', emoji: '🤝' },
          { symbol: '>', name: 'Greater', desc: 'Left is bigger', bg: '#FFD6B0', accent: '#FF8E3C', emoji: '➡️' },
        ].map((item, idx) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 160 }}
            className="sticker p-4 md:p-5 text-center"
            style={{ background: item.bg }}
          >
            <div
              className="w-14 h-14 mx-auto rounded-2xl border-[3px] border-ink flex items-center justify-center font-display text-3xl text-paper mb-2"
              style={{ background: item.accent, boxShadow: '3px 3px 0 var(--ink)' }}
            >
              {item.symbol}
            </div>
            <h3 className="font-display text-lg text-ink leading-tight">{item.name}</h3>
            <p className="text-ink-soft text-xs font-bold">
              {item.desc} {item.emoji}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Trick */}
      <div className="sticker p-5 mb-6" style={{ background: '#D6F0CE' }}>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl border-[3px] border-ink bg-grass flex items-center justify-center flex-shrink-0 wobble"
            style={{ boxShadow: '3px 3px 0 var(--ink)' }}
          >
            <Lightbulb className="w-6 h-6 text-paper" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl text-ink mb-1">Easy Trick! 🐊</h3>
            <p className="text-ink font-bold">
              The &lt; and &gt; signs are an alligator&apos;s mouth — and the alligator{' '}
              <span className="px-2 py-0.5 rounded-md bg-grass text-paper">always wants to eat the bigger number!</span>
            </p>
          </div>
        </div>
      </div>

      {/* Interactive example */}
      <motion.div
        key={currentExample}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="sticker p-6 md:p-8 mb-6"
        style={{ background: '#FFFFFF' }}
      >
        <p className="text-center text-xs font-black uppercase tracking-wider text-ink-soft mb-5">
          Example {currentExample + 1} of {examples.length}
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-8 mb-8 flex-wrap">
          {/* Left */}
          <motion.div
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-[4px] border-ink bg-sky flex items-center justify-center"
            animate={{ scale: example.symbol === '>' ? [1, 1.08, 1] : 1, rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: '5px 5px 0 var(--ink)' }}
          >
            <span className="font-display text-5xl md:text-6xl text-paper" style={{ textShadow: '3px 3px 0 var(--ink)' }}>
              {example.left}
            </span>
          </motion.div>

          {/* Symbol */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 12 }}
            className="font-display text-7xl md:text-8xl rainbow-text"
            style={{ textShadow: '4px 4px 0 var(--ink)' }}
          >
            {example.symbol}
          </motion.div>

          {/* Right */}
          <motion.div
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-[4px] border-ink bg-berry flex items-center justify-center"
            animate={{ scale: example.symbol === '<' ? [1, 1.08, 1] : 1, rotate: [2, -2, 2] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: '5px 5px 0 var(--ink)' }}
          >
            <span className="font-display text-5xl md:text-6xl text-paper" style={{ textShadow: '3px 3px 0 var(--ink)' }}>
              {example.right}
            </span>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-8 md:gap-16 mb-6">
          <div className="text-center">
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[8rem] mb-2">
              {Array.from({ length: example.left }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                  className="w-4 h-4 rounded-full bg-sky border-2 border-ink"
                />
              ))}
            </div>
            <p className="text-ink-soft text-sm font-extrabold">{example.left} dots</p>
          </div>

          <div className="text-center">
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[8rem] mb-2">
              {Array.from({ length: example.right }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                  className="w-4 h-4 rounded-full bg-berry border-2 border-ink"
                />
              ))}
            </div>
            <p className="text-ink-soft text-sm font-extrabold">{example.right} dots</p>
          </div>
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-4 rounded-2xl border-[3px] border-ink"
          style={{ background: '#FFE5A0', boxShadow: '3px 3px 0 var(--ink)' }}
        >
          <p className="text-ink font-extrabold text-base md:text-lg">{example.explanation}</p>
        </motion.div>
      </motion.div>

      {/* Nav */}
      <div className="flex justify-center gap-3 flex-wrap">
        <motion.button
          onClick={() => setCurrentExample(Math.max(0, currentExample - 1))}
          disabled={currentExample === 0}
          whileHover={currentExample !== 0 ? { scale: 1.04 } : {}}
          whileTap={currentExample !== 0 ? { scale: 0.96 } : {}}
          className={`sticker-sm px-5 py-3 font-display text-lg text-ink flex items-center gap-2 ${
            currentExample === 0 ? 'sticker-disabled' : 'sticker-press-sm'
          }`}
          style={{ background: '#FFFFFF' }}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} /> Previous
        </motion.button>

        <motion.button
          onClick={() => setCurrentExample((currentExample + 1) % examples.length)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="sticker-sm sticker-press-sm px-5 py-3 font-display text-lg text-paper flex items-center gap-2"
          style={{ background: '#9B5DE5' }}
        >
          {currentExample === examples.length - 1 ? 'Start Over' : 'Next'}
          <ChevronRight className="w-5 h-5" strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
};
