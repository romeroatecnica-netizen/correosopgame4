import React, { useCallback, useEffect, useState } from 'react';
import { Play, Swords, X } from 'lucide-react';
import { ChallengeModal } from './components/ChallengeModal';
import { ErrorClinic } from './components/ErrorClinic';
import { ExamSimulator } from './components/ExamSimulator';
import { HeaderNav } from './components/HeaderNav';
import { LearningPath } from './components/LearningPath';
import { QuizChallengeContext, QuizRunner } from './components/QuizRunner';
import { MidContentAdSlot, SeoAndMonetization } from './components/SeoAndMonetization';
import { SyllabusAndCalculator } from './components/SyllabusAndCalculator';
import { syncHeadSeo } from './config/seo';
import { QUESTION_BANK } from './data/questions';
import { OFFICIAL_TOPICS } from './data/topics';
import {
  ChallengeFormat,
  ChallengeHistoryItem,
  ExamHistoryItem,
  MainMode,
  MinigameType,
  Question,
  SharedChallenge,
  Specialty,
  TopicKey,
  UserProgress,
} from './types/opgame';
import {
  buildChallengeDeck,
  buildErrorHuntQuestions,
  buildTimeAttackQuestions,
  buildTopicLessonQuestions,
  CHALLENGE_FORMATS,
} from './utils/quizBuilder';
import {
  calculateTopicLevel,
  decodeChallengeFromUrl,
  formatMinutesSeconds,
  getTodayISO,
  loadProgress,
  saveProgress,
  updateStreakOnActivity,
} from './utils/storage';

interface ActiveQuizState {
  id: number;
  type: MinigameType;
  topicId?: TopicKey;
  questions: Question[];
  challengeContext?: QuizChallengeContext;
}

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [activeMode, setActiveMode] = useState<MainMode>('ruta');
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuizState | null>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
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
    } else if (type === 'fallos') {
      const failedIds = new Set(Object.keys(progress.mistakes));
      deck = QUESTION_BANK.filter((q) => failedIds.has(q.id));
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

  const handlePlayNewChallenge = (config: {
    format: ChallengeFormat;
    topicId?: TopicKey;
    seed: string;
    specialty: Specialty;
  }) => {
    const meta = CHALLENGE_FORMATS.find((f) => f.id === config.format) ?? CHALLENGE_FORMATS[0];
    const deck = buildChallengeDeck(config.format, config.specialty, config.seed, config.topicId);
    setActiveMode('ruta');
    setActiveQuiz({
      id: Date.now(),
      type: meta.minigameType,
      topicId: config.topicId,
      questions: deck,
      challengeContext: {
        kind: 'creating',
        format: config.format,
        seed: config.seed,
        topicId: config.topicId,
        specialty: config.specialty,
        playerName: progress.playerName,
        playerXp: progress.xp,
        playerStreak: progress.streakDays,
      },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptIncomingChallenge = (challenge: SharedChallenge) => {
    const meta = CHALLENGE_FORMATS.find((f) => f.id === challenge.format) ?? CHALLENGE_FORMATS[0];
    const deck = buildChallengeDeck(challenge.format, challenge.specialty, challenge.seed, challenge.topicId);
    setActiveMode('ruta');
    setActiveQuiz({
      id: Date.now(),
      type: meta.minigameType,
      topicId: challenge.topicId,
      questions: deck,
      challengeContext: {
        kind: 'accepting',
        incoming: challenge,
        playerName: progress.playerName,
        playerXp: progress.xp,
        playerStreak: progress.streakDays,
      },
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

        const isChallengeSession = Boolean(activeQuiz?.challengeContext);
        const nextHearts =
          !isCorrect && !prev.practiceNoHeartsLoss && !isClinicReview && !isChallengeSession
            ? Math.max(0, prev.hearts - 1)
            : prev.hearts;

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
    [updateProgress, activeQuiz?.challengeContext]
  );

  const handleSessionComplete = useCallback(
    (summary: { correct: number; total: number; xpEarned: number; durationSeconds: number; topicId?: TopicKey }) => {
      const challengeCtx = activeQuiz?.challengeContext;

      updateProgress((prev) => {
        let nextTopics = prev.topics;
        if (summary.topicId) {
          const key = String(summary.topicId);
          const curr = prev.topics[key] ?? {
            xp: 0,
            level: 1,
            completedSessions: 0,
            correctCount: 0,
            attemptCount: 0,
          };
          nextTopics = {
            ...prev.topics,
            [key]: { ...curr, completedSessions: curr.completedSessions + 1 },
          };
        }

        let nextChallengeHistory = prev.challengeHistory;
        if (challengeCtx?.kind === 'creating') {
          const item: ChallengeHistoryItem = {
            id: `ch-${Date.now()}`,
            date: new Date().toISOString(),
            seed: challengeCtx.seed,
            format: challengeCtx.format,
            specialty: challengeCtx.specialty,
            topicId: challengeCtx.topicId,
            myCorrect: summary.correct,
            myTotal: summary.total,
            myTimeSec: summary.durationSeconds,
            outcome: 'sent',
          };
          nextChallengeHistory = [item, ...prev.challengeHistory].slice(0, 20);
        } else if (challengeCtx?.kind === 'accepting') {
          const inc = challengeCtx.incoming;
          let outcome: ChallengeHistoryItem['outcome'] = 'win';
          if (inc.challengerCorrect !== undefined) {
            if (summary.correct > inc.challengerCorrect) outcome = 'win';
            else if (summary.correct < inc.challengerCorrect) outcome = 'loss';
            else if (inc.challengerTimeSec !== undefined) {
              outcome =
                summary.durationSeconds < inc.challengerTimeSec
                  ? 'win'
                  : summary.durationSeconds > inc.challengerTimeSec
                    ? 'loss'
                    : 'tie';
            } else {
              outcome = 'tie';
            }
          }
          const item: ChallengeHistoryItem = {
            id: `ch-${Date.now()}`,
            date: new Date().toISOString(),
            seed: inc.seed,
            format: inc.format,
            specialty: inc.specialty,
            topicId: inc.topicId,
            myCorrect: summary.correct,
            myTotal: summary.total,
            myTimeSec: summary.durationSeconds,
            opponentName: inc.challengerName,
            opponentCorrect: inc.challengerCorrect,
            opponentTotal: inc.challengerTotal,
            opponentTimeSec: inc.challengerTimeSec,
            outcome,
          };
          nextChallengeHistory = [item, ...prev.challengeHistory].slice(0, 20);
        }

        return {
          ...prev,
          topics: nextTopics,
          challengeHistory: nextChallengeHistory,
        };
      });
    },
    [updateProgress, activeQuiz?.challengeContext]
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

  const incomingFormatLabel = incomingChallenge
    ? CHALLENGE_FORMATS.find((f) => f.id === incomingChallenge.format)?.label ?? 'Duelo mixto'
    : '';
  const incomingTopicLabel =
    incomingChallenge?.topicId !== undefined
      ? incomingChallenge.topicId === 'psico'
        ? 'Psicotécnicos'
        : `Tema ${incomingChallenge.topicId}: ${
            OFFICIAL_TOPICS.find((t) => t.id === incomingChallenge.topicId)?.shortTitle ?? ''
          }`
      : null;

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
        onOpenChallengeModal={() => setChallengeModalOpen(true)}
        isFocusActive={isFocusActive}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Incoming Challenge Invitation Banner decoded from ?reto=... */}
        {incomingChallenge && !isFocusActive && (
          <section className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#1D4ED8] text-amber-300 flex items-center justify-center shrink-0">
                <Swords className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#1D4ED8]">
                  Invitación a duelo · Semilla #{incomingChallenge.seed} · Puesto {incomingChallenge.specialty}
                </p>
                <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
                  {incomingChallenge.challengerName} te reta en {incomingFormatLabel}
                  {incomingTopicLabel ? ` (${incomingTopicLabel})` : ''}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 tabular-nums">
                  {incomingChallenge.challengerCorrect !== undefined ? (
                    <>
                      Marca a batir:{' '}
                      <strong>
                        {incomingChallenge.challengerCorrect}/{incomingChallenge.challengerTotal ?? '?'} aciertos
                      </strong>
                      {incomingChallenge.challengerTimeSec !== undefined
                        ? ` en ${formatMinutesSeconds(incomingChallenge.challengerTimeSec)}`
                        : ''}
                      .
                    </>
                  ) : (
                    <>
                      Mismo mazo de preguntas garantizado por semilla. Nivel del retador: {incomingChallenge.challengerXp}{' '}
                      XP · {incomingChallenge.challengerStreak}d racha.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => handleAcceptIncomingChallenge(incomingChallenge)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Aceptar y jugar este reto</span>
              </button>
              <button
                type="button"
                onClick={() => setIncomingChallenge(null)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-blue-100/60"
                aria-label="Cerrar invitación de reto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Active Quiz Runner (Duolingo-style lesson / minigame / peer link challenge) */}
        {activeQuiz ? (
          <QuizRunner
            key={activeQuiz.id}
            modeType={activeQuiz.type}
            topicId={activeQuiz.topicId}
            questions={activeQuiz.questions}
            hearts={progress.hearts}
            practiceNoHeartsLoss={progress.practiceNoHeartsLoss}
            challengeContext={activeQuiz.challengeContext}
            onAnswerResult={handleAnswerResult}
            onSessionComplete={handleSessionComplete}
            onExit={() => setActiveQuiz(null)}
            onGoToClinic={() => {
              setActiveQuiz(null);
              setActiveMode('clinica');
            }}
            onRestart={() => handleStartMinigame(activeQuiz.type, activeQuiz.topicId)}
            onLaunchCounterChallenge={(cfg) => handlePlayNewChallenge(cfg)}
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
            onOpenChallengeModal={() => setChallengeModalOpen(true)}
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

      <ChallengeModal
        isOpen={challengeModalOpen}
        progress={progress}
        onClose={() => setChallengeModalOpen(false)}
        onUpdatePlayerName={(name) => updateProgress((prev) => ({ ...prev, playerName: name }))}
        onPlayNewChallenge={handlePlayNewChallenge}
      />

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
