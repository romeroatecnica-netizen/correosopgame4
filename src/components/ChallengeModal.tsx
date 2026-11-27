import React, { useState } from 'react';
import { Check, Copy, Play, RefreshCw, Shuffle, Swords, Trophy, X } from 'lucide-react';
import { OFFICIAL_TOPICS } from '../data/topics';
import {
  ChallengeFormat,
  Specialty,
  TopicKey,
  UserProgress,
} from '../types/opgame';
import {
  CHALLENGE_FORMATS,
  generateChallengeSeed,
  pickNextVariedChallenge,
} from '../utils/quizBuilder';
import { encodeChallengeUrl, formatMinutesSeconds } from '../utils/storage';

interface ChallengeModalProps {
  isOpen: boolean;
  progress: UserProgress;
  onClose: () => void;
  onUpdatePlayerName: (name: string) => void;
  onPlayNewChallenge: (config: {
    format: ChallengeFormat;
    topicId?: TopicKey;
    seed: string;
    specialty: Specialty;
  }) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  progress,
  onClose,
  onUpdatePlayerName,
  onPlayNewChallenge,
}) => {
  const [format, setFormat] = useState<ChallengeFormat>('duelo_mixto');
  const [topicId, setTopicId] = useState<TopicKey>(3);
  const [seed, setSeed] = useState<string>(() => generateChallengeSeed());
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const selectedFormatMeta = CHALLENGE_FORMATS.find((f) => f.id === format) ?? CHALLENGE_FORMATS[0];
  const effectiveName = progress.playerName.trim() || 'Opositor/a';

  const previewUrl = encodeChallengeUrl({
    mode: 'ruta',
    seed,
    format,
    specialty: progress.selectedSpecialty,
    topicId: format === 'duelo_tema' ? topicId : undefined,
    challengerName: effectiveName,
    challengerXp: progress.xp,
    challengerStreak: progress.streakDays,
  });

  const handleRandomizeChallenge = () => {
    const next = pickNextVariedChallenge(format, topicId, seed);
    setFormat(next.format);
    setTopicId(next.topicId);
    setSeed(next.seed);
    setCopied(false);
  };

  const handleRegenerateSeedOnly = () => {
    setSeed((prev) => generateChallengeSeed(prev));
    setCopied(false);
  };

  const handleCopyDirectLink = async () => {
    try {
      await navigator.clipboard.writeText(previewUrl);
    } catch {
      // Selectable input below acts as reliable fallback
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  };

  const handleStartAndSetMark = () => {
    onPlayNewChallenge({
      format,
      topicId: format === 'duelo_tema' ? topicId : undefined,
      seed,
      specialty: progress.selectedSpecialty,
    });
    onClose();
  };

  const topicLabel =
    topicId === 'psico'
      ? 'Psicotécnicos'
      : `Tema ${topicId}: ${OFFICIAL_TOPICS.find((t) => t.id === topicId)?.shortTitle ?? ''}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 space-y-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">
              Duelos por enlace · Misma semilla = exactamente las mismas preguntas
            </p>
            <h2 id="challenge-modal-title" className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              Retar a alguien por enlace
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Cerrar ventana de reto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Challenger Name & Randomizer */}
        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div className="space-y-1.5">
            <label htmlFor="challenger-alias" className="block text-xs font-semibold text-slate-700">
              Tu nombre o alias en el reto
            </label>
            <input
              id="challenger-alias"
              type="text"
              maxLength={30}
              value={progress.playerName}
              onChange={(e) => onUpdatePlayerName(e.target.value)}
              placeholder="Ej. Laura (Cartería)"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-[#F8FAFC] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
            />
          </div>

          <button
            type="button"
            onClick={handleRandomizeChallenge}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
          >
            <Shuffle className="w-4 h-4" />
            <span>Cambiar a prueba distinta</span>
          </button>
        </div>

        {/* Format Selection */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Tipo de prueba del reto</span>
            <span className="text-slate-500 tabular-nums">
              Semilla activa: <strong className="text-slate-900">#{seed}</strong> ·{' '}
              <button
                type="button"
                onClick={handleRegenerateSeedOnly}
                className="inline-flex items-center gap-1 text-[#1D4ED8] font-semibold hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                Nuevas preguntas
              </button>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {CHALLENGE_FORMATS.map((item) => {
              const active = format === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFormat(item.id);
                    setSeed((prev) => generateChallengeSeed(prev));
                    setCopied(false);
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-colors ${
                    active
                      ? 'border-[#1D4ED8] bg-blue-50/60 text-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold">{item.label}</span>
                    <span className="text-[11px] font-medium text-slate-500">{item.questionCountLabel}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{item.shortDesc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Picker when Duelo de Tema is active */}
        {format === 'duelo_tema' && (
          <div className="space-y-1.5">
            <label htmlFor="challenge-topic-select" className="block text-xs font-semibold text-slate-700">
              Tema oficial para este duelo
            </label>
            <select
              id="challenge-topic-select"
              value={String(topicId)}
              onChange={(e) => {
                const v = e.target.value;
                setTopicId(v === 'psico' ? 'psico' : (Number(v) as TopicKey));
                setSeed((prev) => generateChallengeSeed(prev));
              }}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-[#F8FAFC] text-slate-900"
            >
              {OFFICIAL_TOPICS.map((t) => (
                <option key={String(t.id)} value={String(t.id)}>
                  {t.id === 'psico' ? 'Psicotécnicos oficiales' : `Tema ${t.id}: ${t.shortTitle}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Active Preview Summary */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <span>
              <strong>Prueba lista:</strong> {selectedFormatMeta.label}
              {format === 'duelo_tema' ? ` (${topicLabel})` : ''}
            </span>
            <span>
              Puesto: <strong>{progress.selectedSpecialty}</strong> · Código <strong className="tabular-nums">#{seed}</strong>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleStartAndSetMark}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Jugar ahora y enviar mi marca</span>
            </button>

            <button
              type="button"
              onClick={handleCopyDirectLink}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-[#059669]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Enlace copiado!' : 'Copiar enlace directo sin jugar'}</span>
            </button>
          </div>

          <div className="pt-1">
            <label htmlFor="challenge-preview-url" className="sr-only">
              Enlace del reto
            </label>
            <input
              id="challenge-preview-url"
              type="text"
              readOnly
              value={previewUrl}
              onFocus={(e) => e.currentTarget.select()}
              className="w-full text-[11px] font-mono text-slate-500 bg-white border border-slate-200 rounded-md px-2.5 py-1.5"
            />
          </div>
        </div>

        {/* Recent Challenge History */}
        {progress.challengeHistory.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-[#1D4ED8]" />
              <span>Últimos duelos por enlace</span>
            </h3>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {progress.challengeHistory.slice(0, 6).map((item) => {
                const fmt = CHALLENGE_FORMATS.find((f) => f.id === item.format)?.label ?? item.format;
                return (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 text-xs bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-2 tabular-nums"
                  >
                    <span className="text-slate-700">
                      <strong>#{item.seed}</strong> · {fmt}
                      {item.opponentName ? ` vs ${item.opponentName}` : ''}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {item.myCorrect}/{item.myTotal} ({formatMinutesSeconds(item.myTimeSec)})
                      </span>
                      {item.outcome === 'win' && (
                        <span className="inline-flex items-center gap-0.5 font-bold text-[#059669]">
                          <Trophy className="w-3.5 h-3.5" /> Ganado
                        </span>
                      )}
                      {item.outcome === 'tie' && <span className="font-bold text-[#D97706]">Empate</span>}
                      {item.outcome === 'loss' && <span className="font-bold text-[#DC2626]">Superado</span>}
                      {item.outcome === 'sent' && <span className="font-semibold text-[#1D4ED8]">Marca fijada</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
