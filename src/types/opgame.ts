export type Specialty = 'Todos' | 'Reparto' | 'Clasificación' | 'Oficinas';

export type QuestionSpecialty = 'General' | 'Reparto' | 'Clasificación' | 'Oficinas';

export type TopicKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'psico';

export type MainMode = 'ruta' | 'simulacro' | 'temario' | 'clinica';

export type MinigameType = 'leccion' | 'contrarreloj' | 'cazaerror' | 'duelo' | 'fallos';

export interface TopicInfo {
  id: TopicKey;
  order: number;
  shortTitle: string;
  title: string;
  block: 'Marco y Personas' | 'Productos y Nuevas Líneas' | 'Herramientas y Procesos' | 'Cumplimiento y Seguridad' | 'Aptitudes';
  summary: string;
  keyPoints: string[];
  examWeightLabel: string;
  primarySpecialties: QuestionSpecialty[];
}

export interface Question {
  id: string;
  topicId: TopicKey;
  specialty: QuestionSpecialty;
  level: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  reference: string;
  errorHuntStatement?: string;
}

export interface TopicProgress {
  xp: number;
  level: number; // 1 to 5
  completedSessions: number;
  correctCount: number;
  attemptCount: number;
}

export interface MistakeRecord {
  questionId: string;
  wrongCount: number;
  lastMissedAt: string;
  resolvedCount: number;
}

export interface ExamHistoryItem {
  id: string;
  date: string;
  variant: 'oficial100' | 'express50' | 'express25';
  specialty: Specialty;
  totalScorable: number;
  correct: number;
  wrong: number;
  blank: number;
  testScore: number; // up to 60 (or scaled)
  meritScore: number; // 0 to 40
  totalScore: number; // up to 100
  durationSeconds: number;
  annulledUsed: number;
}

export type ChallengeFormat = 'duelo_mixto' | 'duelo_tema' | 'contrarreloj' | 'cazaerror' | 'express25';

export interface ChallengeHistoryItem {
  id: string;
  date: string;
  seed: string;
  format: ChallengeFormat;
  specialty: Specialty;
  topicId?: TopicKey;
  myCorrect: number;
  myTotal: number;
  myTimeSec: number;
  opponentName?: string;
  opponentCorrect?: number;
  opponentTotal?: number;
  opponentTimeSec?: number;
  outcome: 'win' | 'tie' | 'loss' | 'sent';
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  hearts: number; // 0 to 5
  practiceNoHeartsLoss: boolean;
  selectedSpecialty: Specialty;
  meritEstimate: number; // 0 to 40
  playerName: string;
  topics: Record<string, TopicProgress>;
  mistakes: Record<string, MistakeRecord>;
  examHistory: ExamHistoryItem[];
  challengeHistory: ChallengeHistoryItem[];
}

export interface SharedChallenge {
  mode: MainMode;
  seed: string;
  format: ChallengeFormat;
  specialty: Specialty;
  topicId?: TopicKey;
  challengerName: string;
  challengerCorrect?: number;
  challengerTotal?: number;
  challengerTimeSec?: number;
  challengerXp: number;
  challengerStreak: number;
  challengerBestScore?: number;
}
