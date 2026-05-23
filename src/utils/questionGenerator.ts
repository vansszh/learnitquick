import { Question, GameMode, Difficulty, Subject } from '@/store/gameStore';

const generateId = () => Math.random().toString(36).substring(2, 9);

// ---------- Helpers ----------

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate wrong numeric answers near the correct one
const generateWrongAnswers = (correct: number, count: number): number[] => {
  const wrong: number[] = [];
  const offsets = [-3, -2, -1, 1, 2, 3, -5, 5, -10, 10];
  
  while (wrong.length < count) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const wrongAnswer = correct + offset;
    if (wrongAnswer > 0 && !wrong.includes(wrongAnswer) && wrongAnswer !== correct) {
      wrong.push(wrongAnswer);
    }
  }
  
  return wrong;
};

// =====================================================================
// MATH GENERATORS
// =====================================================================

const generateTablesQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxTable = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  const maxMultiplier = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  
  for (let i = 0; i < count; i++) {
    const table = Math.floor(Math.random() * maxTable) + 1;
    const multiplier = Math.floor(Math.random() * maxMultiplier) + 1;
    const answer = table * multiplier;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `${table} × ${multiplier} = ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'tables',
      points: 10,
    });
  }
  
  return questions;
};

const generateComparisonQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 50 : 100;
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    
    let correctAnswer: string;
    if (num1 < num2) correctAnswer = '<';
    else if (num1 > num2) correctAnswer = '>';
    else correctAnswer = '=';
    
    questions.push({
      id: generateId(),
      question: `${num1} __ ${num2}`,
      options: ['<', '=', '>'],
      correctAnswer,
      type: 'comparison',
      points: 10,
    });
  }
  
  return questions;
};

const generateAdditionQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 50;
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 + num2;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `${num1} + ${num2} = ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'addition',
      points: 10,
    });
  }
  
  return questions;
};

const generateSubtractionQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 30 : 50;
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 5;
    const num2 = Math.floor(Math.random() * num1) + 1;
    
    const answer = num1 - num2;
    const wrongAnswers = generateWrongAnswers(answer, 3).map(n => Math.max(0, n));
    
    questions.push({
      id: generateId(),
      question: `${num1} − ${num2} = ?`,
      options: shuffleArray([answer, ...wrongAnswers.slice(0, 3)]),
      correctAnswer: answer,
      type: 'subtraction',
      points: 10,
    });
  }
  
  return questions;
};

const generateMultiplicationQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const maxNum = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 10;
  
  const scenarios = [
    { template: (a: number, b: number) => `If you have ${a} bags with ${b} apples each, how many apples do you have?` },
    { template: (a: number, b: number) => `${a} friends each have ${b} candies. Total candies?` },
    { template: (a: number, b: number) => `${a} boxes × ${b} toys = ?` },
    { template: (a: number, b: number) => `There are ${a} rows with ${b} stars each. Total stars?` },
    { template: (a: number, b: number) => `${a} groups of ${b} = ?` },
  ];
  
  for (let i = 0; i < count; i++) {
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 * num2;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    questions.push({
      id: generateId(),
      question: scenario.template(num1, num2),
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'multiplication',
      points: 10,
    });
  }
  
  return questions;
};

const generateCarryAdditionQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    let num1: number, num2: number;
    
    if (difficulty === 'easy') {
      num1 = Math.floor(Math.random() * 40) + 15;
      const need = 10 - (num1 % 10);
      num2 = Math.floor(Math.random() * (10 - need)) + need; // single digit guaranteeing carry
    } else if (difficulty === 'medium') {
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 50) + 20;
    } else {
      num1 = Math.floor(Math.random() * 100) + 50;
      num2 = Math.floor(Math.random() * 100) + 50;
    }
    
    const answer = num1 + num2;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `${num1} + ${num2} = ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'carry-addition',
      points: 12,
    });
  }
  
  return questions;
};

const generateCountingQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  const emojis = ['🍎', '⭐', '🎈', '🌸', '🐱', '🐶', '🎁', '🌈', '🚀', '🎪'];
  
  for (let i = 0; i < count; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const maxCount = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
    const answer = Math.floor(Math.random() * maxCount) + 3;
    const display = Array(answer).fill(emoji).join(' ');
    const wrongAnswers = generateWrongAnswers(answer, 3).filter(n => n > 0);
    
    questions.push({
      id: generateId(),
      question: `Count: ${display}`,
      options: shuffleArray([answer, ...wrongAnswers.slice(0, 3)]),
      correctAnswer: answer,
      type: 'counting',
      points: 10,
    });
  }
  
  return questions;
};

const generateNumberSequenceQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    const step = difficulty === 'easy' ? 1 : difficulty === 'medium' ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 3) + 2;
    const start = Math.floor(Math.random() * 20) + 1;
    const sequence = [start, start + step, start + step * 2, start + step * 3];
    const answer = start + step * 4;
    const wrongAnswers = generateWrongAnswers(answer, 3);
    
    questions.push({
      id: generateId(),
      question: `What comes next? ${sequence.join(', ')}, ?`,
      options: shuffleArray([answer, ...wrongAnswers]),
      correctAnswer: answer,
      type: 'number-sequence',
      points: 10,
    });
  }
  
  return questions;
};

// =====================================================================
// ENGLISH DATA BANKS
// =====================================================================

interface SpellingItem { correct: string; wrong: string[]; level: Difficulty; }
const SPELLING_BANK: SpellingItem[] = [
  // easy: 3-letter
  { correct: 'cat',   wrong: ['kat', 'cet', 'ckt'],     level: 'easy' },
  { correct: 'dog',   wrong: ['dawg', 'dogg', 'deg'],   level: 'easy' },
  { correct: 'sun',   wrong: ['sone', 'sune', 'snn'],   level: 'easy' },
  { correct: 'red',   wrong: ['rad', 'redd', 'reed'],   level: 'easy' },
  { correct: 'big',   wrong: ['bigg', 'bag', 'biig'],   level: 'easy' },
  { correct: 'cup',   wrong: ['cap', 'cupp', 'kup'],    level: 'easy' },
  { correct: 'hat',   wrong: ['hatt', 'hut', 'het'],    level: 'easy' },
  { correct: 'pen',   wrong: ['penn', 'pin', 'paen'],   level: 'easy' },
  // medium: 4-5 letters
  { correct: 'fish',  wrong: ['fis', 'fihs', 'fissh'],     level: 'medium' },
  { correct: 'tree',  wrong: ['tre', 'treee', 'tri'],      level: 'medium' },
  { correct: 'book',  wrong: ['buk', 'booke', 'bouk'],     level: 'medium' },
  { correct: 'milk',  wrong: ['milc', 'milck', 'milkk'],   level: 'medium' },
  { correct: 'cake',  wrong: ['kake', 'caik', 'cak'],      level: 'medium' },
  { correct: 'star',  wrong: ['stare', 'staar', 'starr'],  level: 'medium' },
  { correct: 'moon',  wrong: ['mone', 'mun', 'mooon'],     level: 'medium' },
  { correct: 'frog',  wrong: ['frug', 'frogg', 'froge'],   level: 'medium' },
  { correct: 'bird',  wrong: ['burd', 'birde', 'birrd'],   level: 'medium' },
  { correct: 'snake', wrong: ['snak', 'snaik', 'snayke'],  level: 'medium' },
  // hard: 6+ letters
  { correct: 'house',     wrong: ['hous', 'howse', 'houze'],            level: 'hard' },
  { correct: 'happy',     wrong: ['hapy', 'hapi', 'happey'],            level: 'hard' },
  { correct: 'water',     wrong: ['watr', 'wattr', 'wuter'],            level: 'hard' },
  { correct: 'school',    wrong: ['scool', 'schol', 'skool'],           level: 'hard' },
  { correct: 'friend',    wrong: ['freind', 'frend', 'frined'],         level: 'hard' },
  { correct: 'because',   wrong: ['becuse', 'becaus', 'becouse'],       level: 'hard' },
  { correct: 'people',    wrong: ['peple', 'peopel', 'peeple'],         level: 'hard' },
  { correct: 'beautiful', wrong: ['butiful', 'beutiful', 'beautyful'],  level: 'hard' },
];

interface RhymeItem { word: string; rhymes: string[]; }
const RHYMES: RhymeItem[] = [
  { word: 'cat',   rhymes: ['bat', 'hat', 'mat', 'rat', 'sat', 'fat'] },
  { word: 'dog',   rhymes: ['log', 'fog', 'frog', 'jog', 'hog'] },
  { word: 'sun',   rhymes: ['fun', 'run', 'bun', 'gun', 'one', 'done'] },
  { word: 'tree',  rhymes: ['bee', 'see', 'free', 'three', 'knee'] },
  { word: 'fish',  rhymes: ['dish', 'wish', 'swish'] },
  { word: 'star',  rhymes: ['car', 'far', 'jar', 'bar', 'guitar'] },
  { word: 'moon',  rhymes: ['spoon', 'balloon', 'soon', 'noon'] },
  { word: 'cake',  rhymes: ['bake', 'lake', 'make', 'snake', 'take'] },
  { word: 'red',   rhymes: ['bed', 'fed', 'led', 'head', 'said'] },
  { word: 'cool',  rhymes: ['pool', 'tool', 'school', 'fool', 'rule'] },
  { word: 'play',  rhymes: ['day', 'say', 'way', 'stay', 'tray'] },
  { word: 'night', rhymes: ['light', 'kite', 'bright', 'right', 'fight'] },
  { word: 'snow',  rhymes: ['blow', 'grow', 'show', 'slow', 'go'] },
];
const RHYME_DISTRACTORS = ['pizza', 'rocket', 'banana', 'water', 'bread', 'green', 'shoe', 'truck', 'lamp', 'doctor', 'pencil', 'teacher'];

const OPPOSITES: [string, string][] = [
  ['hot', 'cold'], ['big', 'small'], ['up', 'down'], ['fast', 'slow'],
  ['happy', 'sad'], ['day', 'night'], ['in', 'out'], ['open', 'closed'],
  ['full', 'empty'], ['hard', 'soft'], ['new', 'old'], ['light', 'dark'],
  ['wet', 'dry'], ['push', 'pull'], ['give', 'take'], ['high', 'low'],
  ['young', 'old'], ['first', 'last'], ['begin', 'end'], ['near', 'far'],
  ['short', 'tall'], ['sweet', 'sour'], ['noisy', 'quiet'], ['rich', 'poor'],
  ['heavy', 'light'], ['clean', 'dirty'], ['easy', 'hard'], ['fast', 'slow'],
];

const SYNONYMS: [string, string][] = [
  ['big', 'large'], ['small', 'tiny'], ['happy', 'glad'], ['sad', 'unhappy'],
  ['fast', 'quick'], ['mad', 'angry'], ['nice', 'kind'], ['scary', 'spooky'],
  ['pretty', 'lovely'], ['smart', 'clever'], ['weird', 'strange'],
  ['silly', 'funny'], ['scared', 'afraid'], ['tired', 'sleepy'],
  ['wet', 'damp'], ['quiet', 'silent'], ['begin', 'start'], ['end', 'finish'],
  ['shout', 'yell'], ['jump', 'leap'], ['little', 'small'], ['cool', 'chilly'],
  ['warm', 'cozy'], ['shiny', 'bright'], ['mistake', 'error'],
];

// Pool of unrelated words used as distractors for opposites/synonyms.
const WORD_POOL = [
  'apple', 'window', 'rocket', 'pencil', 'turtle', 'cloud', 'pizza',
  'bicycle', 'jungle', 'ladder', 'mirror', 'panda', 'banjo', 'feather',
  'castle', 'rainbow', 'puzzle', 'sneaker', 'pillow', 'dolphin', 'lemon',
];
const pickDistractors = (excluded: string[], count: number): string[] => {
  const pool = WORD_POOL.filter(w => !excluded.includes(w.toLowerCase()));
  return shuffleArray(pool).slice(0, count);
};

const PHONICS_WORDS: Record<string, string[]> = {
  A: ['apple', 'ant', 'arm', 'ax'],
  B: ['ball', 'bat', 'bee', 'book', 'bird', 'bus', 'boy'],
  C: ['cat', 'cake', 'car', 'cup', 'cow'],
  D: ['dog', 'duck', 'doll', 'door'],
  E: ['egg', 'ear', 'elephant'],
  F: ['fish', 'fox', 'frog', 'fan'],
  G: ['goat', 'girl', 'glove'],
  H: ['hat', 'hen', 'house', 'horse'],
  J: ['jam', 'jet', 'jar'],
  K: ['key', 'kite', 'king'],
  L: ['lion', 'lamp', 'leaf', 'leg'],
  M: ['mouse', 'milk', 'moon', 'monkey'],
  N: ['nest', 'nose', 'nut'],
  P: ['pig', 'pen', 'pan', 'panda'],
  R: ['rat', 'rose', 'rain', 'rabbit'],
  S: ['sun', 'snake', 'ship', 'star'],
  T: ['tree', 'top', 'toy', 'train'],
  W: ['water', 'wolf', 'wind', 'web'],
  Z: ['zebra', 'zoo', 'zero'],
};

interface MissingLetterItem { emoji: string; word: string; answer: string; level: Difficulty; }
const MISSING_LETTER_BANK: MissingLetterItem[] = [
  { emoji: '🐱', word: 'C_T',  answer: 'A', level: 'easy' },
  { emoji: '🐶', word: 'D_G',  answer: 'O', level: 'easy' },
  { emoji: '🌞', word: 'S_N',  answer: 'U', level: 'easy' },
  { emoji: '🐝', word: 'B_E',  answer: 'E', level: 'easy' },
  { emoji: '🐷', word: 'P_G',  answer: 'I', level: 'easy' },
  { emoji: '🚌', word: 'B_S',  answer: 'U', level: 'easy' },
  { emoji: '🥚', word: '_GG',  answer: 'E', level: 'easy' },
  { emoji: '☂️', word: '_MBRELLA', answer: 'U', level: 'easy' },
  { emoji: '🐟', word: 'F_SH',  answer: 'I', level: 'medium' },
  { emoji: '🌳', word: 'TR_E',  answer: 'E', level: 'medium' },
  { emoji: '🚗', word: 'C_R',   answer: 'A', level: 'medium' },
  { emoji: '🥛', word: 'M_LK',  answer: 'I', level: 'medium' },
  { emoji: '🎁', word: 'G_FT',  answer: 'I', level: 'medium' },
  { emoji: '⭐', word: 'ST_R',  answer: 'A', level: 'medium' },
  { emoji: '🐸', word: 'FR_G',  answer: 'O', level: 'medium' },
  { emoji: '🌙', word: 'MO_N',  answer: 'O', level: 'medium' },
  { emoji: '🦁', word: 'L_ON',     answer: 'I', level: 'hard' },
  { emoji: '🍎', word: 'APP_E',    answer: 'L', level: 'hard' },
  { emoji: '🍰', word: 'C_KE',     answer: 'A', level: 'hard' },
  { emoji: '🐘', word: 'EL_PHANT', answer: 'E', level: 'hard' },
  { emoji: '🦋', word: 'BUTT_RFLY', answer: 'E', level: 'hard' },
  { emoji: '👑', word: 'CR_WN',    answer: 'O', level: 'hard' },
];

interface PluralItem { sing: string; plur: string; wrong: string[]; level: Difficulty; }
const PLURALS: PluralItem[] = [
  { sing: 'cat',   plur: 'cats',   wrong: ['cates', 'caties', 'kats'],     level: 'easy' },
  { sing: 'dog',   plur: 'dogs',   wrong: ['doges', 'dogies', 'dogses'],   level: 'easy' },
  { sing: 'book',  plur: 'books',  wrong: ['bookes', 'bookies', 'bookse'], level: 'easy' },
  { sing: 'ball',  plur: 'balls',  wrong: ['balles', 'ballies', 'balle'],  level: 'easy' },
  { sing: 'pen',   plur: 'pens',   wrong: ['penes', 'penies', 'penn'],     level: 'easy' },
  { sing: 'star',  plur: 'stars',  wrong: ['stares', 'staries', 'starres'], level: 'easy' },
  { sing: 'box',    plur: 'boxes',   wrong: ['boxs', 'boxies', "box's"],     level: 'medium' },
  { sing: 'bus',    plur: 'buses',   wrong: ['buss', 'busies', 'bues'],      level: 'medium' },
  { sing: 'fox',    plur: 'foxes',   wrong: ['foxs', 'foxies', 'foxen'],     level: 'medium' },
  { sing: 'baby',   plur: 'babies',  wrong: ['babys', 'babyies', 'babes'],   level: 'medium' },
  { sing: 'city',   plur: 'cities',  wrong: ['citys', 'cityes', 'citise'],   level: 'medium' },
  { sing: 'fly',    plur: 'flies',   wrong: ['flys', 'flyes', 'fleys'],      level: 'medium' },
  { sing: 'mouse',  plur: 'mice',     wrong: ['mouses', 'mices', 'meeses'],   level: 'hard' },
  { sing: 'foot',   plur: 'feet',     wrong: ['foots', 'feets', 'foots'],     level: 'hard' },
  { sing: 'tooth',  plur: 'teeth',    wrong: ['tooths', 'teeths', 'tothes'],  level: 'hard' },
  { sing: 'man',    plur: 'men',      wrong: ['mans', 'manes', 'mens'],       level: 'hard' },
  { sing: 'child',  plur: 'children', wrong: ['childs', 'childes', 'childrens'], level: 'hard' },
  { sing: 'leaf',   plur: 'leaves',   wrong: ['leafs', 'leafes', 'leves'],    level: 'hard' },
  { sing: 'wolf',   plur: 'wolves',   wrong: ['wolfs', 'wolfes', 'wolfies'],  level: 'hard' },
];

interface PictureItem { emoji: string; word: string; }
const PICTURE_BANK: PictureItem[] = [
  { emoji: '🐱', word: 'cat' },
  { emoji: '🐶', word: 'dog' },
  { emoji: '🐭', word: 'mouse' },
  { emoji: '🐰', word: 'rabbit' },
  { emoji: '🦁', word: 'lion' },
  { emoji: '🐘', word: 'elephant' },
  { emoji: '🐸', word: 'frog' },
  { emoji: '🐝', word: 'bee' },
  { emoji: '🐠', word: 'fish' },
  { emoji: '🐦', word: 'bird' },
  { emoji: '🐔', word: 'chicken' },
  { emoji: '🐢', word: 'turtle' },
  { emoji: '🍎', word: 'apple' },
  { emoji: '🍌', word: 'banana' },
  { emoji: '🍕', word: 'pizza' },
  { emoji: '🍰', word: 'cake' },
  { emoji: '🍦', word: 'icecream' },
  { emoji: '🌞', word: 'sun' },
  { emoji: '🌙', word: 'moon' },
  { emoji: '⭐', word: 'star' },
  { emoji: '☁️', word: 'cloud' },
  { emoji: '🌳', word: 'tree' },
  { emoji: '🌸', word: 'flower' },
  { emoji: '🚗', word: 'car' },
  { emoji: '🚲', word: 'bike' },
  { emoji: '✈️', word: 'plane' },
  { emoji: '🚂', word: 'train' },
  { emoji: '📚', word: 'book' },
  { emoji: '✏️', word: 'pencil' },
  { emoji: '🎈', word: 'balloon' },
  { emoji: '🎁', word: 'gift' },
  { emoji: '👕', word: 'shirt' },
  { emoji: '👟', word: 'shoe' },
  { emoji: '🎩', word: 'hat' },
];

// =====================================================================
// ENGLISH GENERATORS
// =====================================================================

const generateSpellingQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const pool = SPELLING_BANK.filter(item => {
    if (difficulty === 'easy') return item.level === 'easy';
    if (difficulty === 'medium') return item.level === 'easy' || item.level === 'medium';
    return true;
  });
  const shuffled = shuffleArray(pool);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const item = shuffled[i % shuffled.length];
    const options = shuffleArray([item.correct, ...item.wrong.slice(0, 3)]);
    questions.push({
      id: generateId(),
      question: 'Which spelling is correct?',
      options,
      correctAnswer: item.correct,
      type: 'spelling',
      points: 10,
    });
  }
  return questions;
};

const generateRhymesQuestions = (_difficulty: Difficulty, count: number): Question[] => {
  const pool = shuffleArray(RHYMES);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const item = pool[i % pool.length];
    const rhyme = pick(item.rhymes);
    const distractors = shuffleArray(
      RHYME_DISTRACTORS.filter(w => w !== item.word && !item.rhymes.includes(w))
    ).slice(0, 3);

    questions.push({
      id: generateId(),
      question: `Which word rhymes with "${item.word}"?`,
      options: shuffleArray([rhyme, ...distractors]),
      correctAnswer: rhyme,
      type: 'rhymes',
      points: 10,
    });
  }
  return questions;
};

const generateOppositesQuestions = (_difficulty: Difficulty, count: number): Question[] => {
  const pool = shuffleArray(OPPOSITES);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const [a, b] = pool[i % pool.length];
    const askA = Math.random() < 0.5;
    const word = askA ? a : b;
    const answer = askA ? b : a;
    const distractors = pickDistractors([word, answer], 3);

    questions.push({
      id: generateId(),
      question: `What is the opposite of "${word}"?`,
      options: shuffleArray([answer, ...distractors]),
      correctAnswer: answer,
      type: 'opposites',
      points: 10,
    });
  }
  return questions;
};

const generateSynonymsQuestions = (_difficulty: Difficulty, count: number): Question[] => {
  const pool = shuffleArray(SYNONYMS);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const [a, b] = pool[i % pool.length];
    const askA = Math.random() < 0.5;
    const word = askA ? a : b;
    const answer = askA ? b : a;
    const distractors = pickDistractors([word, answer], 3);

    questions.push({
      id: generateId(),
      question: `Which means the same as "${word}"?`,
      options: shuffleArray([answer, ...distractors]),
      correctAnswer: answer,
      type: 'synonyms',
      points: 10,
    });
  }
  return questions;
};

const generatePhonicsQuestions = (_difficulty: Difficulty, count: number): Question[] => {
  const letters = Object.keys(PHONICS_WORDS);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const targetLetter = pick(letters);
    const correctWord = pick(PHONICS_WORDS[targetLetter]);

    const otherLetters = letters.filter(l => l !== targetLetter);
    const distractors: string[] = [];
    let safety = 0;
    while (distractors.length < 3 && safety < 50) {
      safety++;
      const l = pick(otherLetters);
      const w = pick(PHONICS_WORDS[l]);
      if (!distractors.includes(w) && w !== correctWord) distractors.push(w);
    }

    questions.push({
      id: generateId(),
      question: `Which word starts with the letter "${targetLetter}"?`,
      options: shuffleArray([correctWord, ...distractors]),
      correctAnswer: correctWord,
      type: 'phonics',
      points: 10,
    });
  }
  return questions;
};

const generateMissingLetterQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const pool = MISSING_LETTER_BANK.filter(item => {
    if (difficulty === 'easy') return item.level === 'easy';
    if (difficulty === 'medium') return item.level !== 'hard';
    return true;
  });
  const shuffled = shuffleArray(pool);
  const questions: Question[] = [];

  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const consonants = ['L', 'N', 'M', 'R', 'P', 'T', 'B', 'D', 'S'];

  for (let i = 0; i < count; i++) {
    const item = shuffled[i % shuffled.length];
    const isVowel = vowels.includes(item.answer);
    const distractorPool = isVowel ? vowels : consonants;
    const distractors = shuffleArray(
      distractorPool.filter(c => c !== item.answer)
    ).slice(0, 3);

    questions.push({
      id: generateId(),
      question: `${item.word.replace('_', ' _ ')} — fill in the blank`,
      media: { type: 'emoji', value: item.emoji },
      options: shuffleArray([item.answer, ...distractors]),
      correctAnswer: item.answer,
      type: 'missing-letter',
      points: 10,
    });
  }
  return questions;
};

const generatePluralsQuestions = (difficulty: Difficulty, count: number): Question[] => {
  const pool = PLURALS.filter(item => {
    if (difficulty === 'easy') return item.level === 'easy';
    if (difficulty === 'medium') return item.level !== 'hard';
    return true;
  });
  const shuffled = shuffleArray(pool);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const item = shuffled[i % shuffled.length];
    const options = shuffleArray([item.plur, ...item.wrong.slice(0, 3)]);
    questions.push({
      id: generateId(),
      question: `What is the plural of "${item.sing}"?`,
      options,
      correctAnswer: item.plur,
      type: 'plurals',
      points: 10,
    });
  }
  return questions;
};

const generatePictureMatchQuestions = (_difficulty: Difficulty, count: number): Question[] => {
  const pool = shuffleArray(PICTURE_BANK);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const item = pool[i % pool.length];
    const otherWords = PICTURE_BANK
      .filter(p => p.word !== item.word)
      .map(p => p.word);
    const distractors = shuffleArray(otherWords).slice(0, 3);

    questions.push({
      id: generateId(),
      question: 'What is this?',
      media: { type: 'emoji', value: item.emoji },
      options: shuffleArray([item.word, ...distractors]),
      correctAnswer: item.word,
      type: 'picture-match',
      points: 10,
    });
  }
  return questions;
};

// =====================================================================
// PUBLIC API
// =====================================================================

export const generateQuestions = (mode: GameMode, difficulty: Difficulty, count: number = 10): Question[] => {
  switch (mode) {
    // Math
    case 'tables':           return generateTablesQuestions(difficulty, count);
    case 'comparison':       return generateComparisonQuestions(difficulty, count);
    case 'addition':         return generateAdditionQuestions(difficulty, count);
    case 'subtraction':      return generateSubtractionQuestions(difficulty, count);
    case 'multiplication':   return generateMultiplicationQuestions(difficulty, count);
    case 'carry-addition':   return generateCarryAdditionQuestions(difficulty, count);
    case 'counting':         return generateCountingQuestions(difficulty, count);
    case 'number-sequence':  return generateNumberSequenceQuestions(difficulty, count);
    // English
    case 'spelling':         return generateSpellingQuestions(difficulty, count);
    case 'rhymes':           return generateRhymesQuestions(difficulty, count);
    case 'opposites':        return generateOppositesQuestions(difficulty, count);
    case 'synonyms':         return generateSynonymsQuestions(difficulty, count);
    case 'phonics':          return generatePhonicsQuestions(difficulty, count);
    case 'missing-letter':   return generateMissingLetterQuestions(difficulty, count);
    case 'plurals':          return generatePluralsQuestions(difficulty, count);
    case 'picture-match':    return generatePictureMatchQuestions(difficulty, count);
    default:                 return generateAdditionQuestions(difficulty, count);
  }
};

// =====================================================================
// MODE INFO
// =====================================================================

export interface ModeInfo {
  title: string;
  icon: string;
  color: string;     // primary sticker fill
  softColor: string; // soft tint for hover/halo
  description: string;
  subject: Subject;
}

export const getModeInfo = (mode: GameMode): ModeInfo => {
  const modes: Record<GameMode, ModeInfo> = {
    // ----- Math -----
    tables: {
      title: 'Times Tables',
      icon: '✖️',
      color: '#9B5DE5',
      softColor: '#E5D7FA',
      description: 'Master multiplication tables 1-10',
      subject: 'math',
    },
    comparison: {
      title: 'Compare Numbers',
      icon: '⚖️',
      color: '#4FC3F7',
      softColor: '#C7E9FA',
      description: 'Learn less than, greater than, equal',
      subject: 'math',
    },
    addition: {
      title: 'Addition',
      icon: '➕',
      color: '#5BC053',
      softColor: '#D6F0CE',
      description: 'Practice adding numbers',
      subject: 'math',
    },
    subtraction: {
      title: 'Subtraction',
      icon: '➖',
      color: '#FF8E3C',
      softColor: '#FFD6B0',
      description: 'Practice taking away numbers',
      subject: 'math',
    },
    multiplication: {
      title: 'Word Problems',
      icon: '🧮',
      color: '#FF5C8A',
      softColor: '#FFD1DE',
      description: 'Solve fun multiplication stories',
      subject: 'math',
    },
    'carry-addition': {
      title: 'Carry Forward',
      icon: '🔢',
      color: '#2196F3',
      softColor: '#C7E9FA',
      description: 'Addition with carrying over',
      subject: 'math',
    },
    counting: {
      title: 'Counting',
      icon: '🧮',
      color: '#6FE7B0',
      softColor: '#D6F0CE',
      description: 'Count objects and find totals',
      subject: 'math',
    },
    'number-sequence': {
      title: 'Number Patterns',
      icon: '📊',
      color: '#FFC93C',
      softColor: '#FFE5A0',
      description: 'Find the missing number',
      subject: 'math',
    },
    // ----- English -----
    spelling: {
      title: 'Spelling',
      icon: '🔤',
      color: '#FF5C8A',
      softColor: '#FFD1DE',
      description: 'Pick the correctly spelled word',
      subject: 'english',
    },
    rhymes: {
      title: 'Rhyming Words',
      icon: '🎵',
      color: '#9B5DE5',
      softColor: '#E5D7FA',
      description: 'Find words that rhyme',
      subject: 'english',
    },
    opposites: {
      title: 'Opposites',
      icon: '↔️',
      color: '#FF8E3C',
      softColor: '#FFD6B0',
      description: 'Hot is the opposite of cold!',
      subject: 'english',
    },
    synonyms: {
      title: 'Same Meaning',
      icon: '🤝',
      color: '#5BC053',
      softColor: '#D6F0CE',
      description: 'Find words that mean the same',
      subject: 'english',
    },
    phonics: {
      title: 'Letter Sounds',
      icon: '🔊',
      color: '#4FC3F7',
      softColor: '#C7E9FA',
      description: 'What letter does it start with?',
      subject: 'english',
    },
    'missing-letter': {
      title: 'Missing Letter',
      icon: '✏️',
      color: '#FFC93C',
      softColor: '#FFE5A0',
      description: 'Fill in the blank!',
      subject: 'english',
    },
    plurals: {
      title: 'One or Many',
      icon: '👥',
      color: '#2196F3',
      softColor: '#C7E9FA',
      description: 'One cat, two… cats!',
      subject: 'english',
    },
    'picture-match': {
      title: 'Picture Match',
      icon: '🖼️',
      color: '#6FE7B0',
      softColor: '#D6F0CE',
      description: 'Pick the right word',
      subject: 'english',
    },
  };

  return modes[mode];
};
