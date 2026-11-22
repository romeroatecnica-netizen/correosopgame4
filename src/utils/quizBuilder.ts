import { QUESTION_BANK } from '../data/questions';
import { OFFICIAL_TOPICS } from '../data/topics';
import { Question, Specialty, TopicKey } from '../types/opgame';

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function matchesSpecialtyPriority(q: Question, specialty: Specialty): number {
  if (specialty === 'Todos') return 1;
  if (q.specialty === specialty) return 3;
  if (q.specialty === 'General') return 2;
  return 1;
}

function sortWithSpecialtyPriority(pool: Question[], specialty: Specialty): Question[] {
  const shuffled = shuffleArray(pool);
  if (specialty === 'Todos') return shuffled;
  return shuffled.sort((a, b) => matchesSpecialtyPriority(b, specialty) - matchesSpecialtyPriority(a, specialty));
}

export function buildTopicLessonQuestions(
  topicId: TopicKey,
  specialty: Specialty,
  count = 6
): Question[] {
  const topicPool = QUESTION_BANK.filter((q) => q.topicId === topicId);
  const prioritized = sortWithSpecialtyPriority(topicPool, specialty);
  return prioritized.slice(0, Math.min(count, prioritized.length));
}

export function buildTimeAttackQuestions(specialty: Specialty, count = 25): Question[] {
  const prioritized = sortWithSpecialtyPriority(QUESTION_BANK, specialty);
  return prioritized.slice(0, Math.min(count, prioritized.length));
}

export function buildErrorHuntQuestions(specialty: Specialty, count = 8): Question[] {
  // Build deterministic "Spot the false statement" rounds using curated errorHuntStatement items
  const withErrors = sortWithSpecialtyPriority(
    QUESTION_BANK.filter((q) => Boolean(q.errorHuntStatement)),
    specialty
  );
  const selected = withErrors.slice(0, Math.min(count, withErrors.length));

  return selected.map((q, idx) => {
    // Pick 3 true statements from other questions' correct options + explanations or short factual truths
    const otherTruePool = shuffleArray(
      QUESTION_BANK.filter((other) => other.id !== q.id && other.topicId !== 'psico')
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
    const shuffledOpts = shuffleArray(indexed);
    const correctIndex = shuffledOpts.findIndex((o) => o.isFalse) as 0 | 1 | 2 | 3;

    return {
      id: `hunt-${q.id}-${idx}`,
      topicId: q.topicId,
      specialty: q.specialty,
      level: q.level,
      question: 'Caza el error de normativa o proceso: ¿cuál de las siguientes afirmaciones es FALSA según el temario oficial de Correos?',
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

  // Interleave or place 90 temario + 10 psico (official order: 90 temario followed by 10 psicotécnicos)
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
