import { MainMode, SharedChallenge, Specialty, TopicKey, UserProgress } from '../types/opgame';

const STORAGE_KEY = 'correos_opgame_iv_v1';

export function getTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayISO(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function createInitialProgress(): UserProgress {
  return {
    xp: 0,
    streakDays: 0,
    lastActiveDate: null,
    hearts: 5,
    practiceNoHeartsLoss: false,
    selectedSpecialty: 'Todos',
    meritEstimate: 18,
    topics: {},
    mistakes: {},
    examHistory: [],
  };
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    const base = createInitialProgress();
    const merged: UserProgress = {
      ...base,
      ...parsed,
      topics: parsed.topics ?? {},
      mistakes: parsed.mistakes ?? {},
      examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
    };
    // Validate streak if more than 1 day has passed without activity
    const today = getTodayISO();
    const yesterday = getYesterdayISO();
    if (merged.lastActiveDate && merged.lastActiveDate !== today && merged.lastActiveDate !== yesterday) {
      merged.streakDays = 0;
    }
    return merged;
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors silently
  }
}

export function calculateTopicLevel(topicXp: number): number {
  if (topicXp >= 240) return 5;
  if (topicXp >= 160) return 4;
  if (topicXp >= 95) return 3;
  if (topicXp >= 45) return 2;
  return 1;
}

export function getGlobalLevel(xp: number): { level: number; currentIntoLevel: number; nextThreshold: number } {
  const step = 150;
  const level = Math.floor(xp / step) + 1;
  const currentIntoLevel = xp % step;
  return { level, currentIntoLevel, nextThreshold: step };
}

export function updateStreakOnActivity(prev: UserProgress): { streakDays: number; lastActiveDate: string } {
  const today = getTodayISO();
  const yesterday = getYesterdayISO();

  if (prev.lastActiveDate === today) {
    return { streakDays: Math.max(1, prev.streakDays), lastActiveDate: today };
  }
  if (prev.lastActiveDate === yesterday) {
    return { streakDays: prev.streakDays + 1, lastActiveDate: today };
  }
  return { streakDays: 1, lastActiveDate: today };
}

export function encodeChallengeUrl(challenge: SharedChallenge): string {
  const payload = JSON.stringify(challenge);
  const bytes = new TextEncoder().encode(payload);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const url = new URL(window.location.href);
  url.searchParams.set('reto', encoded);
  return url.toString();
}

export function decodeChallengeFromUrl(): SharedChallenge | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('reto');
    if (!raw) return null;
    const base64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
    const binary = atob(base64 + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as Partial<SharedChallenge>;
    const validModes: MainMode[] = ['ruta', 'simulacro', 'temario', 'clinica'];
    const validSpecialties: Specialty[] = ['Todos', 'Reparto', 'Clasificación', 'Oficinas'];
    if (!parsed.mode || !validModes.includes(parsed.mode)) return null;
    return {
      mode: parsed.mode,
      specialty: parsed.specialty && validSpecialties.includes(parsed.specialty) ? parsed.specialty : 'Todos',
      topicId: parsed.topicId as TopicKey | undefined,
      challengerXp: typeof parsed.challengerXp === 'number' ? parsed.challengerXp : 0,
      challengerStreak: typeof parsed.challengerStreak === 'number' ? parsed.challengerStreak : 0,
      challengerBestScore: typeof parsed.challengerBestScore === 'number' ? parsed.challengerBestScore : undefined,
    };
  } catch {
    return null;
  }
}

export function formatMinutesSeconds(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
