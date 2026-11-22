import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flame,
  Heart,
  Infinity as InfinityIcon,
  RotateCcw,
  Stethoscope,
  Timer,
  Trophy,
  XCircle,
} from 'lucide-react';
import { OFFICIAL_TOPICS } from '../data/topics';
import { MinigameType, Question, TopicKey } from '../types/opgame';

interface QuizRunnerProps {
  modeType: MinigameType;
  topicId?: TopicKey;
  questions: Question[];
  hearts: number;
  practiceNoHeartsLoss: boolean;
  onAnswerResult: (question: Question, isCorrect: boolean, xpEarned: number, isClinicReview: boolean) => void;
  onSessionComplete: (summary: { correct: number; total: number; xpEarned: number; topicId?: TopicKey }) => void;
  onExit: () => void;
  onGoToClinic: () => void;
  onRestart: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  modeType,
  topicId,
  questions,
  hearts,
  practiceNoHeartsLoss,
  onAnswerResult,
  onSessionComplete,
  onExit,
  onGoToClinic,
  onRestart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(modeType === 'contrarreloj' ? 60 : 0);
  const [finished, setFinished] = useState(false);
  const [outOfHearts, setOutOfHearts] = useState(false);
  const [missedIds, setMissedIds] = useState<string[]>([]);

  const completedNotifiedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  const topicTitle =
    topicId !== undefined
      ? OFFICIAL_TOPICS.find((t) => t.id === topicId)?.shortTitle ?? 'Entrenamiento'
      : modeType === 'contrarreloj'
        ? 'Contrarreloj 60s'
        : modeType === 'cazaerror'
          ? 'Caza el error de normativa'
          : modeType === 'fallos'
            ? 'Repaso Clínica de Fallos'
            : 'Entrenamiento rápido';

  // Timer for 60s contrarreloj
  useEffect(() => {
    if (modeType !== 'contrarreloj' || finished) return;
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [modeType, finished]);

  // Notify session completion once
  useEffect(() => {
    if (finished && !completedNotifiedRef.current) {
      completedNotifiedRef.current = true;
      onSessionComplete({
        correct: correctCount,
        total: modeType === 'contrarreloj' ? answeredCount : questions.length,
        xpEarned: sessionXp,
        topicId,
      });
    }
  }, [finished, correctCount, answeredCount, questions.length, sessionXp, topicId, modeType, onSessionComplete]);

  const handleSelectAndCheck = (optionIdx: number) => {
    if (isSubmitted || finished || !currentQuestion) return;

    setSelectedOption(optionIdx);
    setIsSubmitted(true);
    setAnsweredCount((c) => c + 1);

    const isCorrect = optionIdx === currentQuestion.correctIndex;
    const nextCombo = isCorrect ? combo + 1 : 0;
    setCombo(nextCombo);

    let earned = 0;
    if (isCorrect) {
      const baseXp = modeType === 'contrarreloj' ? 12 : 15;
      const comboBonus = nextCombo >= 3 ? 5 : 0;
      earned = baseXp + comboBonus;
      setSessionXp((x) => x + earned);
      setCorrectCount((c) => c + 1);
    } else {
      setMissedIds((prev) => [...prev, currentQuestion.id]);
    }

    onAnswerResult(currentQuestion, isCorrect, earned, modeType === 'fallos');

    if (!isCorrect && !practiceNoHeartsLoss && modeType !== 'fallos') {
      const remainingHearts = hearts - 1;
      if (remainingHearts <= 0) {
        setOutOfHearts(true);
        setFinished(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  // Keyboard shortcuts for speed on desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (finished) return;
      const key = e.key.toLowerCase();
      if (!isSubmitted) {
        if (key === '1' || key === 'a') handleSelectAndCheck(0);
        if (key === '2' || key === 'b') handleSelectAndCheck(1);
        if (key === '3' || key === 'c') handleSelectAndCheck(2);
        if (key === '4' || key === 'd') handleSelectAndCheck(3);
      } else if (key === 'enter' || key === ' ') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900">No hay preguntas disponibles en este filtro</h2>
        <p className="text-sm text-slate-600">
          Cambia el puesto seleccionado en la barra superior o vuelve a la ruta principal.
        </p>
        <button
          type="button"
          onClick={onExit}
          className="px-4 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-sm font-semibold"
        >
          Volver a la ruta
        </button>
      </div>
    );
  }

  if (finished) {
    const totalEvaluated = modeType === 'contrarreloj' ? answeredCount : questions.length;
    const accuracy = totalEvaluated > 0 ? Math.round((correctCount / totalEvaluated) * 100) : 0;

    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900">
            {outOfHearts ? 'Sesión detenida: sin vidas restantes' : '¡Sesión completada!'}
          </h2>
          <p className="text-sm text-slate-600">
            {outOfHearts
              ? 'Puedes activar "Práctica libre" en la barra superior para entrenar sin perder corazones.'
              : `${topicTitle} · Progreso guardado automáticamente en tu dispositivo.`}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 border-y border-slate-200 py-5 text-center">
          <div>
            <p className="text-xs text-slate-500">XP ganados</p>
            <p className="font-display text-2xl font-extrabold text-[#1D4ED8] tabular-nums">+{sessionXp} XP</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Aciertos</p>
            <p className="font-display text-2xl font-extrabold text-[#059669] tabular-nums">
              {correctCount}/{totalEvaluated}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Precisión</p>
            <p className="font-display text-2xl font-extrabold text-slate-900 tabular-nums">{accuracy}%</p>
          </div>
        </div>

        {missedIds.length > 0 && (
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <Stethoscope className="w-5 h-5 text-[#DC2626] shrink-0" />
              <span>
                Se han guardado <strong className="tabular-nums">{missedIds.length}</strong> preguntas falladas en tu
                Clínica de Fallos para repaso.
              </span>
            </div>
            <button
              type="button"
              onClick={onGoToClinic}
              className="text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap"
            >
              Ir a Clínica de Fallos
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir reto</span>
          </button>
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la ruta</span>
          </button>
        </div>
      </div>
    );
  }

  const progressPct = Math.round(((currentIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100);
  const isCorrectAnswer = selectedOption === currentQuestion.correctIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-20 sm:pb-6">
      {/* Top Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Salir</span>
        </button>

        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] transition-all duration-200"
              style={{ width: `${Math.max(4, progressPct)}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-600 tabular-nums whitespace-nowrap">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold shrink-0 tabular-nums">
          {modeType === 'contrarreloj' && (
            <span className={`inline-flex items-center gap-1 ${timeLeft <= 10 ? 'text-[#DC2626]' : 'text-[#D97706]'}`}>
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </span>
          )}
          {combo >= 2 && (
            <span className="inline-flex items-center gap-1 text-[#D97706]">
              <Flame className="w-4 h-4" />
              x{combo}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-slate-700">
            {practiceNoHeartsLoss ? (
              <InfinityIcon className="w-4 h-4 text-[#059669]" />
            ) : (
              <>
                <Heart className="w-4 h-4 text-[#DC2626] fill-[#DC2626]" />
                {hearts}
              </>
            )}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">
            {topicTitle} · {currentQuestion.specialty} · Nivel {currentQuestion.level}
          </p>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options A/B/C/D - Thumb-friendly targets >= 52px */}
        <div className="space-y-3" role="radiogroup" aria-label="Opciones de respuesta">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isRight = idx === currentQuestion.correctIndex;

            let stateStyle =
              'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';
            let letterStyle = 'bg-slate-100 text-slate-700 border-slate-200';

            if (isSubmitted) {
              if (isRight) {
                stateStyle = 'border-[#059669] bg-emerald-50/70 text-slate-900';
                letterStyle = 'bg-[#059669] text-white border-[#059669]';
              } else if (isSelected && !isRight) {
                stateStyle = 'border-[#DC2626] bg-red-50/70 text-slate-900';
                letterStyle = 'bg-[#DC2626] text-white border-[#DC2626]';
              } else {
                stateStyle = 'border-slate-200 bg-slate-50/50 text-slate-400';
                letterStyle = 'bg-slate-100 text-slate-400 border-slate-200';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelectAndCheck(idx)}
                className={`w-full min-h-[52px] text-left p-3.5 sm:p-4 rounded-xl border transition-colors flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${stateStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums ${letterStyle}`}
                >
                  {LETTERS[idx]}
                </span>
                <span className="text-sm sm:text-base leading-snug flex-1">{opt}</span>
                {isSubmitted && isRight && (
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" aria-label="Respuesta correcta" />
                )}
                {isSubmitted && isSelected && !isRight && (
                  <XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" aria-label="Respuesta incorrecta" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Panel */}
        {isSubmitted && (
          <div
            className={`rounded-xl border p-4 sm:p-5 space-y-2 ${
              isCorrectAnswer
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-red-50 border-red-200 text-red-950'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base">
                {isCorrectAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                    <span>
                      ¡Correcto! +{modeType === 'contrarreloj' ? 12 : 15}
                      {combo >= 3 ? ' (+5 racha)' : ''} XP
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-[#DC2626]" />
                    <span>Respuesta incorrecta · Guardada en Clínica de Fallos</span>
                  </>
                )}
              </div>
              <span className="text-xs font-medium opacity-80">{currentQuestion.reference}</span>
            </div>

            <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>

            <div className="pt-2 hidden sm:flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
              >
                <span>{currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Siguiente pregunta'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Next Action for One-Handed Ergonomics */}
      {isSubmitted && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 z-30">
          <button
            type="button"
            onClick={handleNext}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#1D4ED8] text-white text-sm font-semibold"
          >
            <span>{currentIndex + 1 >= questions.length ? 'Ver resultado final' : 'Siguiente pregunta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
