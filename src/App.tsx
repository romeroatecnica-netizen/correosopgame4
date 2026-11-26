import React, { useCallback, useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { ErrorClinic } from './components/ErrorClinic';
import { ExamSimulator } from './components/ExamSimulator';
import { HeaderNav } from './components/HeaderNav';
import { LearningPath } from './components/LearningPath';
import { QuizRunner } from './components/QuizRunner';
import { MidContentAdSlot, SeoAndMonetization } from './components/SeoAndMonetization';
import { syncHeadSeo } from './config/seo';
import { QUESTION_BANK } from './data/questions';
import { SyllabusAndCalculator } from './components/SyllabusAndCalculator';
import {
  buildErrorHuntQuestions,
  buildTimeAttackQuestions,
  buildTopicLessonQuestions,
} from './utils/quizBuilder';
import {
  calculateTopicLevel,
  decodeChallengeFromUrl,
  encodeChallengeUrl,
  getTodayISO,
  loadProgress,
  saveProgress,
  updateStreakOnActivity,
} from './utils/storage';
import {
  ExamHistoryItem,
  MainMode,
  MinigameType,
  Question,
  SharedChallenge,
  Specialty,
  TopicKey,
  UserProgress,
} from './types/opgame';

interface ActiveQuizState {
  id: number;
  type: MinigameType;
  topicId?: TopicKey;
  questions: Question[];
}

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [activeMode, setActiveMode] = useState<MainMode>('ruta');
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuizState | null>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [incomingChallenge, setIncomingChallenge] = useState<SharedChallenge | null>(() =>
    decodeChallengeFromUrl()
  );

  // Sync canonical, hreflang, and og:url with CANONICAL_ORIGIN
  useEffect(() => {
    syncHeadSeo();
  }, [activeMode]);

  // Sync incoming challenge specialty/mode on initial load if present
  useEffect(() => {
    if (!incomingChallenge) return;
    setActiveMode(incomingChallenge.mode);
    setProgress((prev) => {
      const updated = { ...prev, selectedSpecialty: incomingChallenge.specialty };
      saveProgress(updated);
      return updated;
    });
  }, [incomingChallenge]);

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const isFocusActive = Boolean(activeQuiz) || isExamRunning;

  const handleSelectMode = (mode: MainMode) => {
    setActiveQuiz(null);
    setIsExamRunning(false);
    setActiveMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartMinigame = (type: MinigameType, topicId?: TopicKey, customQuestions?: Question[]) => {
    let deck: Question[] = [];
    if (customQuestions) {
      deck = customQuestions;
    } else if (type === 'leccion') {
      deck = buildTopicLessonQuestions(topicId ?? 1, progress.selectedSpecialty, 6);
    } else if (type === 'duelo') {
      deck = buildTopicLessonQuestions(topicId ?? 1, progress.selectedSpecialty, 10);
    } else if (type === 'contrarreloj') {
      deck = buildTimeAttackQuestions(progress.selectedSpecialty, 30);
    } else if (type === 'cazaerror') {
      deck = buildErrorHuntQuestions(progress.selectedSpecialty, 8);
    }

    setActiveMode('ruta');
    setActiveQuiz({
      id: Date.now(),
      type,
      topicId,
      questions: deck,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerResult = useCallback(
    (question: Question, isCorrect: boolean, xpEarned: number, isClinicReview: boolean) => {
      updateProgress((prev) => {
        const streakInfo = updateStreakOnActivity(prev);
        const topicKey = String(question.topicId);
        const currentTopic = prev.topics[topicKey] ?? {
          xp: 0,
          level: 1,
          completedSessions: 0,
          correctCount: 0,
          attemptCount: 0,
        };

        const nextTopicXp = currentTopic.xp + (isCorrect ? xpEarned : 3);
        const nextTopic = {
          ...currentTopic,
          xp: nextTopicXp,
          level: calculateTopicLevel(nextTopicXp),
          correctCount: currentTopic.correctCount + (isCorrect ? 1 : 0),
          attemptCount: currentTopic.attemptCount + 1,
        };

        const nextMistakes = { ...prev.mistakes };
        // Do not store temporary generated hunt-* IDs in Error Clinic unless mapped; store standard question IDs
        const baseId = question.id.startsWith('hunt-') ? question.id.split('-').slice(1, -1).join('-') : question.id;

        if (!isCorrect) {
          const existing = nextMistakes[baseId];
          nextMistakes[baseId] = {
            questionId: baseId,
            wrongCount: (existing?.wrongCount ?? 0) + 1,
            lastMissedAt: getTodayISO(),
            resolvedCount: existing?.resolvedCount ?? 0,
          };
        } else if (isClinicReview && nextMistakes[baseId]) {
          delete nextMistakes[baseId];
        }

        const nextHearts =
          !isCorrect && !prev.practiceNoHeartsLoss && !isClinicReview ? Math.max(0, prev.hearts - 1) : prev.hearts;

        return {
          ...prev,
          xp: prev.xp + (isCorrect ? xpEarned : 3),
          streakDays: streakInfo.streakDays,
          lastActiveDate: streakInfo.lastActiveDate,
          hearts: nextHearts,
          topics: { ...prev.topics, [topicKey]: nextTopic },
          mistakes: nextMistakes,
        };
      });
    },
    [updateProgress]
  );

  const handleSessionComplete = useCallback(
    (summary: { correct: number; total: number; xpEarned: number; topicId?: TopicKey }) => {
      if (!summary.topicId) return;
      updateProgress((prev) => {
        const key = String(summary.topicId);
        const curr = prev.topics[key] ?? {
          xp: 0,
          level: 1,
          completedSessions: 0,
          correctCount: 0,
          attemptCount: 0,
        };
        return {
          ...prev,
          topics: {
            ...prev.topics,
            [key]: { ...curr, completedSessions: curr.completedSessions + 1 },
          },
        };
      });
    },
    [updateProgress]
  );

  const handleRecordExamResult = useCallback(
    (result: ExamHistoryItem, wrongQuestionIds: string[]) => {
      updateProgress((prev) => {
        const streakInfo = updateStreakOnActivity(prev);
        const nextMistakes = { ...prev.mistakes };
        wrongQuestionIds.forEach((qId) => {
          const existing = nextMistakes[qId];
          nextMistakes[qId] = {
            questionId: qId,
            wrongCount: (existing?.wrongCount ?? 0) + 1,
            lastMissedAt: getTodayISO(),
            resolvedCount: existing?.resolvedCount ?? 0,
          };
        });

        const xpBonus = Math.max(20, result.correct * 3);

        return {
          ...prev,
          xp: prev.xp + xpBonus,
          streakDays: streakInfo.streakDays,
          lastActiveDate: streakInfo.lastActiveDate,
          mistakes: nextMistakes,
          examHistory: [result, ...prev.examHistory].slice(0, 25),
        };
      });
    },
    [updateProgress]
  );

  const handleShareChallenge = async () => {
    const bestScore =
      progress.examHistory.length > 0
        ? Math.max(...progress.examHistory.map((h) => h.testScore))
        : undefined;

    const url = encodeChallengeUrl({
      mode: activeMode,
      specialty: progress.selectedSpecialty,
      topicId: activeQuiz?.topicId,
      challengerXp: progress.xp,
      challengerStreak: progress.streakDays,
      challengerBestScore: bestScore,
    });

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback: update URL bar with relative query if clipboard is blocked
      window.history.replaceState({}, '', new URL(url).search);
    }
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <HeaderNav
        activeMode={activeMode}
        onSelectMode={handleSelectMode}
        progress={progress}
        onChangeSpecialty={(specialty: Specialty) =>
          updateProgress((prev) => ({ ...prev, selectedSpecialty: specialty }))
        }
        onTogglePracticeMode={() =>
          updateProgress((prev) => ({
            ...prev,
            practiceNoHeartsLoss: !prev.practiceNoHeartsLoss,
            hearts: prev.hearts === 0 ? 5 : prev.hearts,
          }))
        }
        onShareChallenge={handleShareChallenge}
        shareCopied={shareCopied}
        isFocusActive={isFocusActive}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Shared Challenge Banner decoded from URL */}
        {incomingChallenge && !isFocusActive && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-sm text-slate-800">
              <Trophy className="w-5 h-5 text-[#1D4ED8] shrink-0" />
              <p>
                <strong>Reto compartido de CorreosOpGame IV:</strong> Puesto{' '}
                <strong>{incomingChallenge.specialty}</strong> · Tu retador acumula{' '}
                <strong className="tabular-nums">{incomingChallenge.challengerXp} XP</strong> y{' '}
                <strong className="tabular-nums">{incomingChallenge.challengerStreak}</strong> días de racha
                {incomingChallenge.challengerBestScore !== undefined
                  ? ` (mejor test: ${incomingChallenge.challengerBestScore.toFixed(2)}/60)`
                  : ''}
                .
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIncomingChallenge(null)}
              className="p-1 text-slate-500 hover:text-slate-900"
              aria-label="Cerrar aviso de reto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Active Quiz Runner (Duolingo-style lesson / minigame) */}
        {activeQuiz ? (
          <QuizRunner
            key={activeQuiz.id}
            modeType={activeQuiz.type}
            topicId={activeQuiz.topicId}
            questions={activeQuiz.questions}
            hearts={progress.hearts}
            practiceNoHeartsLoss={progress.practiceNoHeartsLoss}
            onAnswerResult={handleAnswerResult}
            onSessionComplete={handleSessionComplete}
            onExit={() => setActiveQuiz(null)}
            onGoToClinic={() => {
              setActiveQuiz(null);
              setActiveMode('clinica');
            }}
            onRestart={() => handleStartMinigame(activeQuiz.type, activeQuiz.topicId)}
          />
        ) : activeMode === 'ruta' ? (
          <LearningPath
            progress={progress}
            onStartMinigame={(type, topicId) => {
              if (type === 'fallos') {
                setActiveMode('clinica');
                return;
              }
              handleStartMinigame(type, topicId);
            }}
            onGoToExam={() => handleSelectMode('simulacro')}
            onRestoreHearts={() => updateProgress((prev) => ({ ...prev, hearts: 5 }))}
          />
        ) : activeMode === 'simulacro' ? (
          <ExamSimulator
            progress={progress}
            onExamActiveChange={setIsExamRunning}
            onRecordExamResult={handleRecordExamResult}
            onUpdateMeritEstimate={(merits) =>
              updateProgress((prev) => ({ ...prev, meritEstimate: merits }))
            }
            onGoToClinic={() => handleSelectMode('clinica')}
          />
        ) : activeMode === 'temario' ? (
          <SyllabusAndCalculator
            meritEstimate={progress.meritEstimate}
            onUpdateMeritEstimate={(merits) =>
              updateProgress((prev) => ({ ...prev, meritEstimate: merits }))
            }
            onTrainTopic={(topicId) => handleStartMinigame('leccion', topicId)}
          />
        ) : (
          <ErrorClinic
            progress={progress}
            onStartMistakeReview={(questions) => handleStartMinigame('fallos', undefined, questions)}
            onResolveMistake={(qId) =>
              updateProgress((prev) => {
                const copy = { ...prev.mistakes };
                delete copy[qId];
                return { ...prev, mistakes: copy };
              })
            }
            onClearAllMistakes={() => updateProgress((prev) => ({ ...prev, mistakes: {} }))}
          />
        )}

        {/* Media.net Slot #1 + SEO Guide + Affiliate + Media.net Slot #2 (automatically hidden during active tests) */}
        <MidContentAdSlot isFocusActive={isFocusActive} />
        <SeoAndMonetization
          isFocusActive={isFocusActive}
          onGoToSyllabus={() => handleSelectMode('temario')}
          onGoToExam={() => handleSelectMode('simulacro')}
        />
      </main>

      <footer className="no-print border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            CorreosOpGame IV · Herramienta independiente de entrenamiento para Personal Operativo Grupo IV (100 % local
            en tu navegador).
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleSelectMode('temario')}
              className="hover:text-slate-900 transition-colors"
            >
              Bases y Temario
            </button>
            <button
              type="button"
              onClick={() => handleSelectMode('simulacro')}
              className="hover:text-slate-900 transition-colors"
            >
              Simulacro 100+10
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="hover:text-slate-900 transition-colors"
            >
              Imprimir guía
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
