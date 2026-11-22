import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Flag,
  LayoutGrid,
  Play,
  RefreshCw,
  RotateCcw,
  X,
  XCircle,
} from 'lucide-react';
import { OFFICIAL_TOPICS } from '../data/topics';
import { ExamHistoryItem, Question, UserProgress } from '../types/opgame';
import { buildOfficialExamDeck } from '../utils/quizBuilder';
import { formatMinutesSeconds } from '../utils/storage';

interface ExamSimulatorProps {
  progress: UserProgress;
  onExamActiveChange: (active: boolean) => void;
  onRecordExamResult: (result: ExamHistoryItem, wrongQuestionIds: string[]) => void;
  onUpdateMeritEstimate: (merits: number) => void;
  onGoToClinic: () => void;
}

type ExamVariant = 'oficial100' | 'express50' | 'express25';
type ExamStage = 'setup' | 'running' | 'review';
type ReviewFilter = 'all' | 'wrong' | 'blank' | 'correct' | 'reserve';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  progress,
  onExamActiveChange,
  onRecordExamResult,
  onUpdateMeritEstimate,
  onGoToClinic,
}) => {
  const [stage, setStage] = useState<ExamStage>('setup');
  const [variant, setVariant] = useState<ExamVariant>('oficial100');
  const [untimed, setUntimed] = useState(false);

  // Active exam state
  const [mainQuestions, setMainQuestions] = useState<Question[]>([]);
  const [reserveQuestions, setReserveQuestions] = useState<Question[]>([]);
  const [annulledMap, setAnnulledMap] = useState<Record<number, number>>({}); // mainIdx -> reserveIdx
  const [answers, setAnswers] = useState<Record<number, number>>({}); // slotIdx -> optionIdx
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [currentSlot, setCurrentSlot] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(110 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');

  const maxSecondsForVariant = (v: ExamVariant) => {
    if (v === 'oficial100') return 110 * 60; // 110 minutos reales
    if (v === 'express50') return 55 * 60;
    return 28 * 60;
  };

  const startExam = (chosenVariant: ExamVariant) => {
    const deck = buildOfficialExamDeck(chosenVariant, progress.selectedSpecialty);
    setVariant(chosenVariant);
    setMainQuestions(deck.mainQuestions);
    setReserveQuestions(deck.reserveQuestions);
    setAnnulledMap({});
    setAnswers({});
    setFlagged({});
    setCurrentSlot(0);
    setSecondsLeft(maxSecondsForVariant(chosenVariant));
    setElapsedSeconds(0);
    setConfirmSubmit(false);
    setShowGrid(false);
    setReviewFilter('all');
    setStage('running');
    onExamActiveChange(true);
  };

  // Helper returning active question for a slot (substituting reserve if annulled)
  const getEffectiveQuestion = (slotIdx: number): { question: Question; reserveNumber: number | null } => {
    const reserveIdx = annulledMap[slotIdx];
    if (reserveIdx !== undefined && reserveQuestions[reserveIdx]) {
      return { question: reserveQuestions[reserveIdx], reserveNumber: reserveIdx + 1 };
    }
    return { question: mainQuestions[slotIdx], reserveNumber: null };
  };

  const finishExam = () => {
    let correct = 0;
    let wrong = 0;
    let blank = 0;
    const wrongIds: string[] = [];

    mainQuestions.forEach((_, idx) => {
      const { question } = getEffectiveQuestion(idx);
      const chosen = answers[idx];
      if (chosen === undefined) {
        blank += 1;
      } else if (chosen === question.correctIndex) {
        correct += 1;
      } else {
        wrong += 1;
        wrongIds.push(question.id);
      }
    });

    const totalScorable = mainQuestions.length;
    // Official rule: 0.60 per correct answer on 100-question test (up to 60 pts), 0 penalty.
    // For express tests, calculate equivalent score scaled to 60 for comparison.
    const testScore =
      totalScorable === 100
        ? Number((correct * 0.6).toFixed(2))
        : Number(((correct / totalScorable) * 60).toFixed(2));

    const meritScore = progress.meritEstimate;
    const totalScore = Number((testScore + meritScore).toFixed(2));

    const historyItem: ExamHistoryItem = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString(),
      variant,
      specialty: progress.selectedSpecialty,
      totalScorable,
      correct,
      wrong,
      blank,
      testScore,
      meritScore,
      totalScore,
      durationSeconds: elapsedSeconds,
      annulledUsed: Object.keys(annulledMap).length,
    };

    onRecordExamResult(historyItem, wrongIds);
    setStage('review');
    onExamActiveChange(false);
  };

  // Timer tick during running exam
  useEffect(() => {
    if (stage !== 'running') return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((e) => e + 1);
      if (!untimed) {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(interval);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, untimed, mainQuestions, reserveQuestions, annulledMap, answers]);

  // Simulate annulment of current slot using next available reserve question
  const handleToggleAnnulment = (slotIdx: number) => {
    if (annulledMap[slotIdx] !== undefined) {
      // Restore original question
      const next = { ...annulledMap };
      delete next[slotIdx];
      setAnnulledMap(next);
      return;
    }
    const usedReserveIndices = new Set(Object.values(annulledMap));
    const nextFreeReserveIdx = reserveQuestions.findIndex((_, rIdx) => !usedReserveIndices.has(rIdx));
    if (nextFreeReserveIdx === -1) return;
    setAnnulledMap((prev) => ({ ...prev, [slotIdx]: nextFreeReserveIdx }));
    // Clear previous selection on that substituted slot so the user answers the new reserve question cleanly
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[slotIdx];
      return copy;
    });
  };

  const latestResultStats = useMemo(() => {
    if (stage !== 'review') return null;
    let correct = 0;
    let wrong = 0;
    let blank = 0;
    let temarioCorrect = 0;
    let psicoCorrect = 0;

    mainQuestions.forEach((_, idx) => {
      const { question } = getEffectiveQuestion(idx);
      const chosen = answers[idx];
      if (chosen === undefined) {
        blank += 1;
      } else if (chosen === question.correctIndex) {
        correct += 1;
        if (question.topicId === 'psico') psicoCorrect += 1;
        else temarioCorrect += 1;
      } else {
        wrong += 1;
      }
    });

    const total = mainQuestions.length;
    const rawSixty = total === 100 ? correct * 0.6 : (correct / total) * 60;
    const rawExactPoints = correct * 0.6;
    const projectedTotal = rawSixty + progress.meritEstimate;

    return {
      total,
      correct,
      wrong,
      blank,
      temarioCorrect,
      psicoCorrect,
      rawSixty: Number(rawSixty.toFixed(2)),
      rawExactPoints: Number(rawExactPoints.toFixed(2)),
      projectedTotal: Number(projectedTotal.toFixed(2)),
      annulledCount: Object.keys(annulledMap).length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, mainQuestions, reserveQuestions, annulledMap, answers, progress.meritEstimate]);

  // =====================================
  // STAGE 1: SETUP
  // =====================================
  if (stage === 'setup') {
    return (
      <div className="space-y-8">
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-medium text-slate-500">
              Simulador de Prueba Oficial · Especialidad activa: {progress.selectedSpecialty}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Simulacro de Examen Correos Grupo IV (100 preguntas + 10 reserva)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Idéntico en reglas al examen oficial: 90 preguntas de los 12 temas y 10 psicotécnicas, más 10 preguntas de
              reserva listas para sustituir anulaciones. Cada acierto suma 0,60 puntos (hasta 60,00 puntos) y los fallos
              no restan.
            </p>
          </div>

          {/* Mode Selection Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2 border-[#1D4ED8] bg-blue-50/30 rounded-xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#1D4ED8]">Modalidad Oficial</p>
                <h2 className="font-display text-lg font-bold text-slate-900">Simulacro Real 100 + 10</h2>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>· 90 temario + 10 psicotécnicas</li>
                  <li>· +10 preguntas de reserva activables</li>
                  <li>· Cronómetro de 110 minutos</li>
                  <li>· Escala real: 0,60 pts / acierto (máx. 60)</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => startExam('oficial100')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-sm font-semibold transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Iniciar Simulacro 110 min</span>
              </button>
            </div>

            <div className="border border-slate-200 bg-white rounded-xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">Bloque medio</p>
                <h2 className="font-display text-lg font-bold text-slate-900">Test Exprés 50 + 5</h2>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>· 45 temario + 5 psicotécnicas</li>
                  <li>· +5 preguntas de reserva</li>
                  <li>· Tiempo orientativo: 55 minutos</li>
                  <li>· Nota escalada sobre 60,00 pts</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => startExam('express50')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Lanzar Test 50</span>
              </button>
            </div>

            <div className="border border-slate-200 bg-white rounded-xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">Bloque rápido</p>
                <h2 className="font-display text-lg font-bold text-slate-900">Test Exprés 25 + 3</h2>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                  <li>· 22 temario + 3 psicotécnicas</li>
                  <li>· +3 preguntas de reserva</li>
                  <li>· Tiempo orientativo: 28 minutos</li>
                  <li>· Ideal para entrenamiento diario</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => startExam('express25')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-sm font-semibold transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Lanzar Test 25</span>
              </button>
            </div>
          </div>

          {/* Training Options & Merits Pre-config */}
          <div className="pt-4 border-t border-slate-200 grid md:grid-cols-2 gap-6 items-center">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={untimed}
                onChange={(e) => setUntimed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  Entrenar sin límite de tiempo (cronómetro en pausa/abierto)
                </span>
                <span className="block text-xs text-slate-500">
                  Mantiene el formato de examen oficial sin cerrar automáticamente la prueba al agotarse los minutos.
                </span>
              </span>
            </label>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label htmlFor="exam-merit-slider" className="font-semibold text-slate-800">
                  Tus méritos estimados para proyección final:
                </label>
                <span className="font-bold text-[#1D4ED8] tabular-nums">{progress.meritEstimate} / 40 pts</span>
              </div>
              <input
                id="exam-merit-slider"
                type="range"
                min={0}
                max={40}
                step={0.5}
                value={progress.meritEstimate}
                onChange={(e) => onUpdateMeritEstimate(Number(e.target.value))}
                className="w-full accent-[#1D4ED8]"
              />
            </div>
          </div>
        </section>

        {/* Past Exam History */}
        {progress.examHistory.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">Historial de simulacros realizados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 pr-4 font-medium">Fecha</th>
                    <th className="py-2.5 pr-4 font-medium">Modalidad</th>
                    <th className="py-2.5 pr-4 font-medium">Puesto</th>
                    <th className="py-2.5 pr-4 font-medium">Aciertos / Fallos</th>
                    <th className="py-2.5 pr-4 font-medium">Nota Test (/60)</th>
                    <th className="py-2.5 pr-4 font-medium">Total c/ Méritos</th>
                    <th className="py-2.5 font-medium">Tiempo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  {progress.examHistory.slice(0, 10).map((item) => (
                    <tr key={item.id}>
                      <td className="py-2.5 pr-4 text-slate-600">
                        {new Date(item.date).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        })}
                      </td>
                      <td className="py-2.5 pr-4 font-medium text-slate-900">
                        {item.variant === 'oficial100'
                          ? 'Oficial 100+10'
                          : item.variant === 'express50'
                            ? 'Exprés 50'
                            : 'Exprés 25'}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-600">{item.specialty}</td>
                      <td className="py-2.5 pr-4">
                        <span className="text-[#059669] font-semibold">{item.correct}</span>
                        {' / '}
                        <span className="text-[#DC2626]">{item.wrong}</span>
                        {' / '}
                        <span className="text-slate-400">{item.blank} b.</span>
                      </td>
                      <td className="py-2.5 pr-4 font-bold text-[#1D4ED8]">{item.testScore.toFixed(2)}</td>
                      <td className="py-2.5 pr-4 font-bold text-slate-900">{item.totalScore.toFixed(2)} / 100</td>
                      <td className="py-2.5 text-slate-600">{formatMinutesSeconds(item.durationSeconds)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    );
  }

  // =====================================
  // STAGE 2: RUNNING EXAM
  // =====================================
  if (stage === 'running' && mainQuestions.length > 0) {
    const { question: currentQ, reserveNumber } = getEffectiveQuestion(currentSlot);
    const currentTopic = OFFICIAL_TOPICS.find((t) => t.id === currentQ.topicId);
    const answeredCount = Object.keys(answers).length;
    const usedReservesCount = Object.keys(annulledMap).length;
    const isLowTime = !untimed && secondsLeft <= 600; // last 10 mins

    return (
      <div className="max-w-4xl mx-auto space-y-5 pb-24 sm:pb-8">
        {/* Compact Sticky Exam Control Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm sm:text-base text-slate-900 tabular-nums">
              Pregunta {currentSlot + 1} / {mainQuestions.length}
            </span>
            <span className="text-xs text-slate-500 tabular-nums hidden sm:inline">
              Contestadas: {answeredCount}/{mainQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold tabular-nums ${
                untimed
                  ? 'bg-slate-100 text-slate-700'
                  : isLowTime
                    ? 'bg-red-50 text-[#DC2626] border border-red-200'
                    : 'bg-blue-50 text-[#1E3A8A]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{untimed ? `Libre (${formatMinutesSeconds(elapsedSeconds)})` : formatMinutesSeconds(secondsLeft)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowGrid((g) => !g)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 whitespace-nowrap"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Mapa ({answeredCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setConfirmSubmit(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Entregar</span>
            </button>
          </div>
        </div>

        {/* Confirm Submit Inline Banner (no window.confirm) */}
        {confirmSubmit && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="font-display font-bold text-sm sm:text-base text-slate-900">
                ¿Confirmas la entrega final del simulacro?
              </p>
              <p className="text-xs sm:text-sm text-slate-700 tabular-nums">
                Has respondido {answeredCount} de {mainQuestions.length} preguntas (recuerda que los errores no restan
                puntos).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setConfirmSubmit(false)}
                className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700"
              >
                Seguir revisando
              </button>
              <button
                type="button"
                onClick={finishExam}
                className="px-4 py-2 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                Sí, corregir ahora
              </button>
            </div>
          </div>
        )}

        {/* Question Map Drawer / Panel */}
        {showGrid && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-sm text-slate-900">
                Navegador de preguntas ({mainQuestions.length} puntuables · {reserveQuestions.length - usedReservesCount}{' '}
                reservas libres)
              </h2>
              <button
                type="button"
                onClick={() => setShowGrid(false)}
                className="p-1 text-slate-500 hover:text-slate-900"
                aria-label="Cerrar mapa de preguntas"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {mainQuestions.map((_, idx) => {
                const isCurrent = idx === currentSlot;
                const isAnswered = answers[idx] !== undefined;
                const isFlagged = Boolean(flagged[idx]);
                const isReserve = annulledMap[idx] !== undefined;

                let btnClass = 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100';
                if (isAnswered) btnClass = 'bg-blue-50 border-blue-300 text-[#1E3A8A] font-semibold';
                if (isReserve) btnClass = 'bg-amber-50 border-amber-300 text-[#D97706] font-semibold';
                if (isFlagged) btnClass = 'bg-amber-100 border-[#D97706] text-slate-900 font-bold';
                if (isCurrent) btnClass = 'bg-[#1D4ED8] border-[#1D4ED8] text-white font-bold';

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentSlot(idx);
                      setShowGrid(false);
                    }}
                    className={`h-9 rounded-md border text-xs tabular-nums transition-colors ${btnClass}`}
                  >
                    {idx + 1}
                    {isFlagged ? '*' : ''}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500">
              Azul: contestada · Ámbar con *: marcada para revisar · Blanco: sin responder.
            </p>
          </div>
        )}

        {/* Active Question Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              {currentSlot >= mainQuestions.length - (variant === 'oficial100' ? 10 : variant === 'express50' ? 5 : 3)
                ? 'Bloque Psicotécnico'
                : currentTopic
                  ? `Tema ${currentTopic.id}: ${currentTopic.shortTitle}`
                  : 'Temario'}
              {' · '}
              {currentQ.specialty}
              {reserveNumber !== null && (
                <span className="font-bold text-[#D97706]"> · Sustituida por Pregunta de Reserva #{reserveNumber}</span>
              )}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFlagged((f) => ({ ...f, [currentSlot]: !f[currentSlot] }))}
                className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                  flagged[currentSlot] ? 'text-[#D97706]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flagged[currentSlot] ? 'Marcada' : 'Marcar duda'}</span>
              </button>

              {(annulledMap[currentSlot] !== undefined || usedReservesCount < reserveQuestions.length) && (
                <button
                  type="button"
                  onClick={() => handleToggleAnnulment(currentSlot)}
                  title="Simula la anulación de esta pregunta y entra una de las 10 preguntas de reserva"
                  className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8] hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>
                    {annulledMap[currentSlot] !== undefined
                      ? 'Restaurar original'
                      : `Simular anulación (Reserva ${usedReservesCount + 1}/${reserveQuestions.length})`}
                  </span>
                </button>
              )}
            </div>
          </div>

          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentSlot + 1}. {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const selected = answers[currentSlot] === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [currentSlot]: idx }))}
                  className={`w-full min-h-[52px] text-left p-3.5 sm:p-4 rounded-xl border transition-colors flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    selected
                      ? 'border-[#1D4ED8] bg-blue-50/70 text-slate-900'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums ${
                      selected
                        ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {LETTERS[idx]}
                  </span>
                  <span className="text-sm sm:text-base leading-snug flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Controls (Desktop) */}
          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentSlot === 0}
                onClick={() => setCurrentSlot((s) => Math.max(0, s - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
              {answers[currentSlot] !== undefined && (
                <button
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => {
                      const copy = { ...prev };
                      delete copy[currentSlot];
                      return copy;
                    })
                  }
                  className="px-3 py-2.5 text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  Dejar en blanco
                </button>
              )}
            </div>

            {currentSlot + 1 < mainQuestions.length ? (
              <button
                type="button"
                onClick={() => setCurrentSlot((s) => Math.min(mainQuestions.length - 1, s + 1))}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-sm font-semibold"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmSubmit(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white text-sm font-semibold"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Finalizar y corregir</span>
              </button>
            )}
          </div>
        </div>

        {/* Sticky Mobile Thumb Navigation */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 px-3 py-2.5 z-30 flex items-center justify-between gap-2">
          <button
            type="button"
            disabled={currentSlot === 0}
            onClick={() => setCurrentSlot((s) => Math.max(0, s - 1))}
            className="flex-1 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setFlagged((f) => ({ ...f, [currentSlot]: !f[currentSlot] }))}
            className={`px-3 py-2.5 rounded-lg border text-xs font-semibold ${
              flagged[currentSlot] ? 'border-[#D97706] bg-amber-50 text-[#D97706]' : 'border-slate-300 text-slate-700'
            }`}
          >
            Duda
          </button>
          {currentSlot + 1 < mainQuestions.length ? (
            <button
              type="button"
              onClick={() => setCurrentSlot((s) => Math.min(mainQuestions.length - 1, s + 1))}
              className="flex-1 py-2.5 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmSubmit(true)}
              className="flex-1 py-2.5 rounded-lg bg-[#059669] text-white text-xs font-semibold"
            >
              Corregir
            </button>
          )}
        </div>
      </div>
    );
  }

  // =====================================
  // STAGE 3: REVIEW & SCORE PROJECTION
  // =====================================
  if (stage === 'review' && latestResultStats) {
    const filteredSlots = mainQuestions
      .map((_, idx) => {
        const { question, reserveNumber } = getEffectiveQuestion(idx);
        const chosen = answers[idx];
        const status: 'correct' | 'wrong' | 'blank' =
          chosen === undefined ? 'blank' : chosen === question.correctIndex ? 'correct' : 'wrong';
        return { idx, question, reserveNumber, chosen, status };
      })
      .filter((item) => {
        if (reviewFilter === 'all') return true;
        if (reviewFilter === 'reserve') return item.reserveNumber !== null;
        return item.status === reviewFilter;
      });

    return (
      <div className="space-y-8">
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">
                Corrección oficial ({latestResultStats.total} preguntas · 0,60 pts/acierto · 0 penalización)
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                Resultado del Simulacro
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => startExam(variant)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nuevo simulacro</span>
              </button>
              <button
                type="button"
                onClick={() => setStage('setup')}
                className="px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold"
              >
                Cambiar modalidad
              </button>
            </div>
          </div>

          {/* Scoreboard KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500">Nota prueba test (/60)</p>
              <p className="font-display text-3xl font-extrabold text-[#1D4ED8] tabular-nums">
                {latestResultStats.rawSixty.toFixed(2)} pts
              </p>
              <p className="text-xs text-slate-500 tabular-nums mt-1">
                {latestResultStats.total !== 100
                  ? `${latestResultStats.rawExactPoints.toFixed(2)} pts reales (${latestResultStats.correct}×0,60)`
                  : `${latestResultStats.correct} aciertos × 0,60 pts`}
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500">Proyección total (/100)</p>
              <p className="font-display text-3xl font-extrabold text-[#059669] tabular-nums">
                {latestResultStats.projectedTotal.toFixed(2)} pts
              </p>
              <p className="text-xs text-slate-500 tabular-nums mt-1">
                Test {latestResultStats.rawSixty.toFixed(2)} + Méritos {progress.meritEstimate.toFixed(1)}
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500">Desglose de respuestas</p>
              <p className="font-display text-xl font-bold text-slate-900 tabular-nums mt-1">
                <span className="text-[#059669]">{latestResultStats.correct} aciertos</span> ·{' '}
                <span className="text-[#DC2626]">{latestResultStats.wrong} fallos</span>
              </p>
              <p className="text-xs text-slate-500 tabular-nums mt-1">
                {latestResultStats.blank} en blanco · 0 pts restados
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-500">Bloques y duración</p>
              <p className="font-display text-xl font-bold text-slate-900 tabular-nums mt-1">
                {formatMinutesSeconds(elapsedSeconds)}
              </p>
              <p className="text-xs text-slate-500 tabular-nums mt-1">
                Temario: {latestResultStats.temarioCorrect} · Psico: {latestResultStats.psicoCorrect}
                {latestResultStats.annulledCount > 0 ? ` · ${latestResultStats.annulledCount} reserva(s)` : ''}
              </p>
            </div>
          </div>

          {latestResultStats.wrong > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-800">
                <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>
                  Tus <strong className="tabular-nums">{latestResultStats.wrong}</strong> preguntas falladas se han
                  añadido automáticamente a la Clínica de Fallos.
                </span>
              </div>
              <button
                type="button"
                onClick={onGoToClinic}
                className="text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap"
              >
                Abrir Clínica de Fallos
              </button>
            </div>
          )}
        </section>

        {/* Detailed Question-by-Question Review */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Revisión completa pregunta por pregunta
            </h2>
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'all', label: `Todas (${mainQuestions.length})` },
                  { id: 'wrong', label: `Falladas (${latestResultStats.wrong})` },
                  { id: 'blank', label: `En blanco (${latestResultStats.blank})` },
                  { id: 'correct', label: `Acertadas (${latestResultStats.correct})` },
                  ...(latestResultStats.annulledCount > 0
                    ? [{ id: 'reserve' as const, label: `Reservas (${latestResultStats.annulledCount})` }]
                    : []),
                ] as { id: ReviewFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setReviewFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors tabular-nums ${
                    reviewFilter === tab.id ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredSlots.map(({ idx, question, reserveNumber, chosen, status }) => {
              const topic = OFFICIAL_TOPICS.find((t) => t.id === question.topicId);
              return (
                <article key={`${idx}-${question.id}`} className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500">
                      Pregunta {idx + 1} · {topic ? topic.shortTitle : 'Temario'} · {question.reference}
                      {reserveNumber !== null ? ` · Reserva #${reserveNumber}` : ''}
                    </span>

                    {status === 'correct' && (
                      <span className="inline-flex items-center gap-1 font-bold text-[#059669]">
                        <CheckCircle2 className="w-4 h-4" />
                        Acertada (+0,60 pts)
                      </span>
                    )}
                    {status === 'wrong' && (
                      <span className="inline-flex items-center gap-1 font-bold text-[#DC2626]">
                        <XCircle className="w-4 h-4" />
                        Fallada (0,00 pts)
                      </span>
                    )}
                    {status === 'blank' && (
                      <span className="font-semibold text-slate-500">Sin contestar (0,00 pts)</span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900">{question.question}</h3>

                  <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {question.options.map((opt, optIdx) => {
                      const isRight = optIdx === question.correctIndex;
                      const isUserChoice = optIdx === chosen;

                      let cls = 'border-slate-200 bg-[#F8FAFC] text-slate-700';
                      if (isRight) cls = 'border-[#059669] bg-emerald-50 text-emerald-950 font-semibold';
                      else if (isUserChoice && !isRight) cls = 'border-[#DC2626] bg-red-50 text-red-950';

                      return (
                        <div key={optIdx} className={`p-3 rounded-lg border flex items-start gap-2 ${cls}`}>
                          <span className="font-bold shrink-0">{LETTERS[optIdx]}.</span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 bg-[#F8FAFC] border border-slate-200 rounded-lg p-3 leading-relaxed">
                    <strong className="text-slate-800">Explicación:</strong> {question.explanation}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return null;
};
