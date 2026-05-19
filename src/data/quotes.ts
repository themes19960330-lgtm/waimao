export interface BilingualQuote {
  en: string;
  zh: string;
}

export const brandQuotes: BilingualQuote[] = [
  {
    en: 'Great design takes a little longer.',
    zh: '好的设计，总是需要多一点点时间。',
  },
  {
    en: 'True quality is never rushed.',
    zh: '真正的品质，从不赶时间。',
  },
  {
    en: 'Patience is the ultimate craft.',
    zh: '耐心，是最高级的工匠艺术。',
  },
  {
    en: 'Pause. Observe. Create.',
    zh: '驻足，观察，去创造。',
  },
  {
    en: 'Beauty arrives when the noise subsides.',
    zh: '当噪音散去，美方可抵达。',
  },
  {
    en: 'Rare things are never finished in a day.',
    zh: '珍贵的事物，从来不会在一夜之间达成。',
  },
  {
    en: 'In the slow lane, we find the extraordinary.',
    zh: '在慢行道上，我们发现了非凡。',
  },
  {
    en: 'Silence is the canvas of innovation.',
    zh: '沉默，是创新的画布。',
  },
  {
    en: 'Craftsmanship ignores the clock.',
    zh: '工匠精神，从不向时钟妥协。',
  },
  {
    en: 'Waiting is part of the work.',
    zh: '等待，是创作过程的一部分。',
  },
  {
    en: 'Details are hidden in the quiet moments.',
    zh: '细节，藏在安静的时刻里。',
  },
  {
    en: 'We prefer deep work over quick wins.',
    zh: '比起即时的胜利，我们更钟情于深度的创作。',
  },
  {
    en: 'Let the vision settle before it speaks.',
    zh: '让愿景沉淀，再让它开口说话。',
  },
  {
    en: 'Time is the most expensive material.',
    zh: '时间，是最昂贵的原材料。',
  },
];

/**
 * Pick a random quote from the brand quotes array.
 * Uses Math.random with a simple seed to avoid SSR hydration mismatch.
 */
export function getRandomQuote(): BilingualQuote {
  const index = Math.floor(Math.random() * brandQuotes.length);
  return brandQuotes[index];
}
