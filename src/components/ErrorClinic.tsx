import React from 'react';
import { CheckCircle2, Play, Stethoscope, Trash2 } from 'lucide-react';
import { QUESTION_BANK } from '../data/questions';
import { OFFICIAL_TOPICS } from '../data/topics';
import { Question, UserProgress } from '../types/opgame';

interface ErrorClinicProps {
  progress: UserProgress;
  onStartMistakeReview: (questions: Question[]) => void;
  onResolveMistake: (questionId: string) => void;
  onClearAllMistakes: () => void;
}

export const ErrorClinic: React.FC<ErrorClinicProps> = ({
  progress,
  onStartMistakeReview,
  onResolveMistake,
  onClearAllMistakes,
}) => {
  const mistakeEntries = Object.values(progress.mistakes);
  const failedQuestions = mistakeEntries
    .map((record) => ({
      record,
      question: QUESTION_BANK.find((q) => q.id === record.questionId),
    }))
    .filter((item): item is { record: typeof item.record; question: Question } => Boolean(item.question));

  return (
    <div className="space-y-8">
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-slate-500">Diagnóstico y consolidación · Correos Grupo IV</p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Mi Clínica de Fallos
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Cada error en lecciones, minijuegos o simulacros queda registrado aquí automáticamente con su explicación
            normativa. Repásalos en sesiones dirigidas hasta dominarlos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={failedQuestions.length === 0}
            onClick={() => onStartMistakeReview(failedQuestions.map((f) => f.question))}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
              failedQuestions.length > 0
                ? 'bg-[#059669] hover:bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Entrenar fallos ({failedQuestions.length})</span>
          </button>

          {failedQuestions.length > 0 && (
            <button
              type="button"
              onClick={onClearAllMistakes}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4" />
              <span>Vaciar lista</span>
            </button>
          )}
        </div>
      </section>

      {failedQuestions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <Stethoscope className="w-10 h-10 text-[#059669] mx-auto" />
          <h2 className="font-display text-lg font-bold text-slate-900">Tu Clínica de Fallos está limpia</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            No tienes preguntas pendientes de repaso. Cuando falles una pregunta en la Ruta de Juego o en un Simulacro
            de 110 minutos aparecerá aquí al instante.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {failedQuestions.map(({ record, question }) => {
            const topic = OFFICIAL_TOPICS.find((t) => t.id === question.topicId);
            return (
              <article
                key={question.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <span>
                    {topic ? topic.shortTitle : 'Temario'} · {question.specialty} ·{' '}
                    <span className="text-[#DC2626] font-semibold tabular-nums">
                      Fallada {record.wrongCount} {record.wrongCount === 1 ? 'vez' : 'veces'}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onResolveMistake(question.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669] hover:underline"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marcar como dominada</span>
                  </button>
                </div>

                <h3 className="font-display text-base font-bold text-slate-900">{question.question}</h3>

                <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 space-y-1">
                  <p className="text-xs font-bold text-[#059669]">
                    Respuesta correcta: {question.options[question.correctIndex]}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{question.explanation}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
