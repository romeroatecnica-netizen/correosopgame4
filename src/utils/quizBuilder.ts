import { QUESTION_BANK } from '../data/questions';
import { OFFICIAL_TOPICS } from '../data/topics';
import { ChallengeFormat, MinigameType, Question, Specialty, TopicKey } from '../types/opgame';

export interface ChallengeFormatMeta {
  id: ChallengeFormat;
  label: string;
  shortDesc: string;
  questionCountLabel: string;
  minigameType: MinigameType;
}

export const CHALLENGE_FORMATS: ChallengeFormatMeta[] = [
  {
    id: 'duelo_mixto',
    label: 'Duelo Mixto (15 preg.)',
    shortDesc: '12 preguntas variadas de los 12 temas + 3 psicotécnicos.',
    questionCountLabel: '15 preguntas',
    minigameType: 'duelo',
  },
  {
    id: 'duelo_tema',
    label: 'Duelo de Tema (10 preg.)',
    shortDesc: 'Prueba enfocada en un tema oficial concreto o psicotécnicos.',
    questionCountLabel: '10 preguntas',
    minigameType: 'duelo',
  },
  {
    id: 'contrarreloj',
    label: 'Contrarreloj 60s',
    shortDesc: 'Carrera de velocidad de 60 segundos con el mismo mazo ordenado.',
    questionCountLabel: '60 segundos',
    minigameType: 'contrarreloj',
  },
  {
    id: 'cazaerror',
    label: 'Caza el Error (8 preg.)',
    shortDesc: 'Detecta la afirmación falsa sobre normativa, plazos y procesos.',
    questionCountLabel: '8 preguntas',
    minigameType: 'cazaerror',
  },
  {
    id: 'express25',
    label: 'Mini Simulacro (25 preg.)',
    shortDesc: '22 preguntas de temario + 3 psicotécnicas con puntuación 0,60.',
    questionCountLabel: '25 preguntas',
    minigameType: 'duelo',
  },
];

// Deterministic PRNG (Mulberry32 + FNV-1a string hash)
function hashSeed(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createSeededRng(seed: string): () => number {
  let a = hashSeed(seed) || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleArray<T>(items: T[], rng: () => number = Math.random): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateChallengeSeed(previousSeed?: string): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let seed = '';
  do {
    seed = '';
    for (let i = 0; i < 6; i++) {
      seed += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  } while (seed === previousSeed);
  return seed;
}

export function pickNextVariedChallenge(
  previousFormat?: ChallengeFormat,
  previousTopicId?: TopicKey,
  previousSeed?: string
): { format: ChallengeFormat; topicId: TopicKey; seed: string } {
  const formats = CHALLENGE_FORMATS.map((f) => f.id).filter((id) => id !== previousFormat);
  const chosenFormat = formats[Math.floor(Math.random() * formats.length)];

  const topicIds = OFFICIAL_TOPICS.map((t) => t.id).filter((id) => id !== previousTopicId);
  const chosenTopic = topicIds[Math.floor(Math.random() * topicIds.length)];

  return {
    format: chosenFormat,
    topicId: chosenTopic,
    seed: generateChallengeSeed(previousSeed),
  };
}

export function matchesSpecialtyPriority(q: Question, specialty: Specialty): number {
  if (specialty === 'Todos') return 1;
  if (q.specialty === specialty) return 3;
  if (q.specialty === 'General') return 2;
  return 1;
}

function sortWithSpecialtyPriority(
  pool: Question[],
  specialty: Specialty,
  rng: () => number = Math.random
): Question[] {
  const shuffled = shuffleArray(pool, rng);
  if (specialty === 'Todos') return shuffled;
  return shuffled.sort((a, b) => matchesSpecialtyPriority(b, specialty) - matchesSpecialtyPriority(a, specialty));
}

export function buildTopicLessonQuestions(
  topicId: TopicKey,
  specialty: Specialty,
  count = 6,
  seed?: string
): Question[] {
  const rng = seed ? createSeededRng(`${seed}-topic-${topicId}`) : Math.random;
  const topicPool = QUESTION_BANK.filter((q) => q.topicId === topicId);
  const prioritized = sortWithSpecialtyPriority(topicPool, specialty, rng);
  return prioritized.slice(0, Math.min(count, prioritized.length));
}

export function buildTimeAttackQuestions(specialty: Specialty, count = 25, seed?: string): Question[] {
  const rng = seed ? createSeededRng(`${seed}-time`) : Math.random;
  const prioritized = sortWithSpecialtyPriority(QUESTION_BANK, specialty, rng);
  return prioritized.slice(0, Math.min(count, prioritized.length));
}

export function buildErrorHuntQuestions(specialty: Specialty, count = 8, seed?: string): Question[] {
  const rng = seed ? createSeededRng(`${seed}-hunt`) : Math.random;
  const withErrors = sortWithSpecialtyPriority(
    QUESTION_BANK.filter((q) => Boolean(q.errorHuntStatement)),
    specialty,
    rng
  );
  const selected = withErrors.slice(0, Math.min(count, withErrors.length));

  return selected.map((q, idx) => {
    const otherTruePool = shuffleArray(
      QUESTION_BANK.filter((other) => other.id !== q.id && other.topicId !== 'psico'),
      rng
    ).slice(0, 3);

    const trueStatements = otherTruePool.map((item) => {
      const topicMeta = OFFICIAL_TOPICS.find((t) => t.id === item.topicId);
      const prefix = topicMeta ? `${topicMeta.shortTitle}: ` : '';
      const firstSentence = item.explanation.split('. ')[0].trim();
      const normalized = firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
      return `${prefix}${normalized}`;
    });

    const neutralFalse = q.errorHuntStatement as string;

    const rawOptions = [neutralFalse, ...trueStatements];
    const indexed = rawOptions.map((text, originalIdx) => ({ text, isFalse: originalIdx === 0 }));
    const shuffledOpts = shuffleArray(indexed, rng);
    const correctIndex = shuffledOpts.findIndex((o) => o.isFalse) as 0 | 1 | 2 | 3;

    return {
      id: `hunt-${q.id}-${idx}`,
      topicId: q.topicId,
      specialty: q.specialty,
      level: q.level,
      question:
        'Caza el error de normativa o proceso: ¿cuál de las siguientes afirmaciones es FALSA según el temario oficial de Correos?',
      options: [
        shuffledOpts[0].text,
        shuffledOpts[1].text,
        shuffledOpts[2].text,
        shuffledOpts[3].text,
      ],
      correctIndex,
      explanation: `Afirmación falsa detectada: "${neutralFalse}". Corrección oficial: ${q.explanation}`,
      reference: `Caza el error · ${q.reference}`,
    };
  });
}

export function buildChallengeDeck(
  format: ChallengeFormat,
  specialty: Specialty,
  seed: string,
  topicId?: TopicKey
): Question[] {
  const rng = createSeededRng(`challenge-${seed}-${format}-${specialty}`);

  if (format === 'duelo_tema') {
    const resolvedTopic: TopicKey = topicId ?? OFFICIAL_TOPICS[Math.floor(rng() * OFFICIAL_TOPICS.length)].id;
    return buildTopicLessonQuestions(resolvedTopic, specialty, 10, seed);
  }

  if (format === 'contrarreloj') {
    return buildTimeAttackQuestions(specialty, 30, seed);
  }

  if (format === 'cazaerror') {
    return buildErrorHuntQuestions(specialty, 8, seed);
  }

  const temarioPool = sortWithSpecialtyPriority(
    QUESTION_BANK.filter((q) => q.topicId !== 'psico'),
    specialty,
    rng
  );
  const psicoPool = shuffleArray(
    QUESTION_BANK.filter((q) => q.topicId === 'psico'),
    rng
  );

  if (format === 'express25') {
    return [...temarioPool.slice(0, 22), ...psicoPool.slice(0, 3)];
  }

  // Default: duelo_mixto (12 temario + 3 psicotécnicos = 15 preguntas)
  return [...temarioPool.slice(0, 12), ...psicoPool.slice(0, 3)];
}

export interface ExamDeck {
  mainQuestions: Question[];
  reserveQuestions: Question[];
  temarioCount: number;
  psicoCount: number;
}

export function buildOfficialExamDeck(
  variant: 'oficial100' | 'express50' | 'express25',
  specialty: Specialty
): ExamDeck {
  const temarioPool = sortWithSpecialtyPriority(
    QUESTION_BANK.filter((q) => q.topicId !== 'psico'),
    specialty
  );
  const psicoPool = shuffleArray(QUESTION_BANK.filter((q) => q.topicId === 'psico'));

  const config =
    variant === 'oficial100'
      ? { temarioMain: 90, psicoMain: 10, reserveTemario: 8, reservePsico: 2 }
      : variant === 'express50'
        ? { temarioMain: 45, psicoMain: 5, reserveTemario: 4, reservePsico: 1 }
        : { temarioMain: 22, psicoMain: 3, reserveTemario: 2, reservePsico: 1 };

  const selectedTemario = temarioPool.slice(0, config.temarioMain);
  const selectedPsico = psicoPool.slice(0, config.psicoMain);

  const mainQuestions = [...selectedTemario, ...selectedPsico];

  const remainingTemario = temarioPool.slice(config.temarioMain, config.temarioMain + config.reserveTemario);
  const remainingPsico = psicoPool.slice(config.psicoMain, config.psicoMain + config.reservePsico);
  const reserveQuestions = [...remainingTemario, ...remainingPsico];

  return {
    mainQuestions,
    reserveQuestions,
    temarioCount: selectedTemario.length,
    psicoCount: selectedPsico.length,
  };
}
