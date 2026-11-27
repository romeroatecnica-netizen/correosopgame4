import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Flame,
  Play,
  ShieldAlert,
  Stethoscope,
  Swords,
  Timer,
} from 'lucide-react';
import { OFFICIAL_TOPICS } from '../data/topics';
import { MinigameType, TopicKey, UserProgress } from '../types/opgame';
import { getGlobalLevel } from '../utils/storage';

interface LearningPathProps {
  progress: UserProgress;
  onStartMinigame: (type: MinigameType, topicId?: TopicKey) => void;
  onGoToExam: () => void;
  onOpenChallengeModal: () => void;
  onRestoreHearts: () => void;
}

const BLOCK_ORDER = [
  'Marco y Personas',
  'Productos y Nuevas Líneas',
  'Herramientas y Procesos',
  'Cumplimiento y Seguridad',
  'Aptitudes',
] as const;

export const LearningPath: React.FC<LearningPathProps> = ({
  progress,
  onStartMinigame,
  onGoToExam,
  onOpenChallengeModal,
  onRestoreHearts,
}) => {
  const [duelTopicId, setDuelTopicId] = useState<TopicKey>(3);
  const globalLevel = getGlobalLevel(progress.xp);
  const mistakeCount = Object.keys(progress.mistakes).length;
  const completedTopics = OFFICIAL_TOPICS.filter((t) => (progress.topics[String(t.id)]?.level ?? 1) >= 2).length;
  const levelProgressPct = Math.round((globalLevel.currentIntoLevel / globalLevel.nextThreshold) * 100);

  return (
    <div className="space-y-10">
      {/* Hero Focal Anchor */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Personal Laboral Fijo Correos · Grupo Profesional IV ({progress.selectedSpecialty})
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
              Entrena los 12 temas oficiales y psicotécnicos de Correos jugando y en modo examen real
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
              Combina lecciones cortas con progreso por niveles, racha diaria y Clínica de Fallos con simulacros
              oficiales de 100 preguntas puntuables más 10 de reserva en 110 minutos (0,60 puntos por acierto, sin
              penalización por error).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartMinigame('leccion', 1)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Empezar reto rápido</span>
              </button>

              <button
                type="button"
                onClick={onGoToExam}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Simulacro oficial 100+10</span>
              </button>

              <button
                type="button"
                onClick={onOpenChallengeModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                <Swords className="w-4 h-4 text-[#1D4ED8]" />
                <span>Retar por enlace</span>
              </button>
            </div>
          </div>

          {/* Right Summary Progress Card (1 level elevation, hairline border, no nested bordered boxes) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Progreso actual de oposición</p>
                <p className="font-display text-xl font-bold text-slate-900 tabular-nums">
                  Nivel {globalLevel.level} · {progress.xp} XP
                </p>
              </div>
              <Award className="w-8 h-8 text-[#D97706] shrink-0" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600 tabular-nums">
                <span>Siguiente nivel</span>
                <span>
                  {globalLevel.currentIntoLevel} / {globalLevel.nextThreshold} XP ({levelProgressPct}%)
                </span>
              </div>
              <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1D4ED8] transition-all duration-200"
                  style={{ width: `${levelProgressPct}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs text-slate-500">Temas nivel 2+</p>
                <p className="font-display text-lg font-bold text-slate-900 tabular-nums">
                  {completedTopics} / {OFFICIAL_TOPICS.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Racha</p>
                <p className="font-display text-lg font-bold text-slate-900 tabular-nums flex items-center gap-1">
                  <Flame className="w-4 h-4 text-[#D97706]" />
                  {progress.streakDays}d
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Simulacros</p>
                <p className="font-display text-lg font-bold text-slate-900 tabular-nums">
                  {progress.examHistory.length}
                </p>
              </div>
            </div>

            {!progress.practiceNoHeartsLoss && progress.hearts < 5 && (
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-600 tabular-nums">
                  Te quedan {progress.hearts}/5 vidas en modo estricto.
                </span>
                <button
                  type="button"
                  onClick={onRestoreHearts}
                  className="text-xs font-semibold text-[#1D4ED8] hover:underline whitespace-nowrap shrink-0"
                >
                  Recargar vidas gratis
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Minijuegos de repaso rápido */}
      <section aria-labelledby="minijuegos-heading" className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 id="minijuegos-heading" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Minijuegos de repaso rápido
            </h2>
            <p className="text-sm text-slate-600">
              Sesiones intensivas tipo test de 4 opciones para ganar XP y fijar normativa, procesos y cálculo.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Minijuego 1: Contrarreloj 60s */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Velocidad lectora</span>
                <Timer className="w-4 h-4 text-[#D97706]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">Contrarreloj de 60 segundos</h3>
              <p className="text-sm text-slate-600">
                Responde todas las preguntas posibles en un minuto con multiplicador por racha de aciertos.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartMinigame('contrarreloj')}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Jugar 60s</span>
            </button>
          </div>

          {/* Minijuego 2: Caza el error */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Lectura crítica</span>
                <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">Caza el error de normativa</h3>
              <p className="text-sm text-slate-600">
                Detecta qué afirmación de entre cuatro contiene una trampa sobre plazos, leyes o procesos.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartMinigame('cazaerror')}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Cazar errores</span>
            </button>
          </div>

          {/* Minijuego 3: Duelo de 10 preguntas */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Tema a elegir</span>
                <Swords className="w-4 h-4 text-[#1D4ED8]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">Duelo de 10 preguntas</h3>
              <label htmlFor="duel-topic" className="sr-only">
                Selecciona tema para el duelo
              </label>
              <select
                id="duel-topic"
                value={String(duelTopicId)}
                onChange={(e) => {
                  const val = e.target.value;
                  setDuelTopicId(val === 'psico' ? 'psico' : (Number(val) as TopicKey));
                }}
                className="w-full text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-[#F8FAFC] text-slate-800"
              >
                {OFFICIAL_TOPICS.map((t) => (
                  <option key={String(t.id)} value={String(t.id)}>
                    {t.id === 'psico' ? 'Psicotécnicos' : `Tema ${t.id}: ${t.shortTitle}`}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => onStartMinigame('duelo', duelTopicId)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <span>Iniciar duelo (10)</span>
            </button>
          </div>

          {/* Minijuego 4: Repaso de fallos */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Clínica de Fallos</span>
                <Stethoscope className="w-4 h-4 text-[#059669]" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900">Repaso de fallos acumulados</h3>
              <p className="text-sm text-slate-600 tabular-nums">
                {mistakeCount > 0
                  ? `Tienes ${mistakeCount} pregunta${mistakeCount === 1 ? '' : 's'} pendiente${mistakeCount === 1 ? '' : 's'} de consolidar.`
                  : 'Sin fallos pendientes. Cualquier error futuro aparecerá aquí.'}
              </p>
            </div>
            <button
              type="button"
              disabled={mistakeCount === 0}
              onClick={() => onStartMinigame('fallos')}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                mistakeCount > 0
                  ? 'bg-[#059669] hover:bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{mistakeCount > 0 ? 'Repasar fallos' : 'Al día'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Ruta de Aprendizaje Duolingo: 12 temas + Psicotécnicos */}
      <section aria-labelledby="ruta-heading" className="space-y-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 id="ruta-heading" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              Ruta de aprendizaje por unidades (12 temas + Psicotécnicos)
            </h2>
            <p className="text-sm text-slate-600">
              Sube cada unidad del Nivel 1 al Nivel 5 completando lecciones de 6 preguntas o duelos de 10.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {BLOCK_ORDER.map((blockName, blockIndex) => {
            const blockTopics = OFFICIAL_TOPICS.filter((t) => t.block === blockName);
            return (
              <div key={blockName} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-800">
                    0{blockIndex + 1}. {blockName}
                  </h3>
                  <span className="text-xs text-slate-500 tabular-nums">
                    {blockTopics.length} {blockTopics.length === 1 ? 'módulo' : 'módulos'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blockTopics.map((topic) => {
                    const stats = progress.topics[String(topic.id)] ?? {
                      xp: 0,
                      level: 1,
                      completedSessions: 0,
                      correctCount: 0,
                      attemptCount: 0,
                    };
                    const accuracy =
                      stats.attemptCount > 0 ? Math.round((stats.correctCount / stats.attemptCount) * 100) : 0;
                    const levelPct = Math.min(100, Math.round((stats.xp / 240) * 100));
                    const specialtyMatch =
                      progress.selectedSpecialty === 'Todos' ||
                      topic.primarySpecialties.includes(
                        progress.selectedSpecialty === 'Oficinas' ? 'Oficinas' : progress.selectedSpecialty
                      );

                    return (
                      <article
                        key={String(topic.id)}
                        className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                            <span>
                              {topic.id === 'psico' ? 'Psicotécnicos' : `Tema ${topic.id}`} · {topic.examWeightLabel}
                            </span>
                            {stats.level >= 5 && (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#059669]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Dominado
                              </span>
                            )}
                          </div>

                          <h4 className="font-display text-base font-bold text-slate-900 leading-snug">
                            {topic.shortTitle}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{topic.summary}</p>

                          <div className="pt-1 space-y-1.5">
                            <div className="flex items-center justify-between text-xs text-slate-600 tabular-nums">
                              <span className="font-semibold text-[#1E3A8A]">Nivel {stats.level}/5</span>
                              <span>
                                {stats.xp} XP · {stats.attemptCount > 0 ? `${accuracy}% acierto` : 'Sin intentos'}
                              </span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-200 ${
                                  stats.level >= 5 ? 'bg-[#059669]' : 'bg-[#F59E0B]'
                                }`}
                                style={{ width: `${Math.max(8, levelPct)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => onStartMinigame('leccion', topic.id)}
                            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                              specialtyMatch
                                ? 'bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white'
                                : 'bg-slate-800 hover:bg-slate-900 text-white'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Lección (6)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onStartMinigame('duelo', topic.id)}
                            className="px-3 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                          >
                            Duelo (10)
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
