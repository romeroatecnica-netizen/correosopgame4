import React, { useState } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  Compass,
  Flame,
  Heart,
  Infinity as InfinityIcon,
  Stethoscope,
  Swords,
  Trophy,
} from 'lucide-react';
import { MainMode, Specialty, UserProgress } from '../types/opgame';
import { getGlobalLevel } from '../utils/storage';

interface HeaderNavProps {
  activeMode: MainMode;
  onSelectMode: (mode: MainMode) => void;
  progress: UserProgress;
  onChangeSpecialty: (specialty: Specialty) => void;
  onTogglePracticeMode: () => void;
  onOpenChallengeModal: () => void;
  isFocusActive: boolean;
}

const SPECIALTIES: { value: Specialty; label: string }[] = [
  { value: 'Todos', label: 'Todos los puestos' },
  { value: 'Reparto', label: 'Reparto 1 y 2' },
  { value: 'Clasificación', label: 'Agente / Clasificación' },
  { value: 'Oficinas', label: 'Atención al Cliente' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeMode,
  onSelectMode,
  progress,
  onChangeSpecialty,
  onTogglePracticeMode,
  onOpenChallengeModal,
  isFocusActive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mistakeCount = Object.keys(progress.mistakes).length;
  const globalLevel = getGlobalLevel(progress.xp);

  const navItems: { id: MainMode; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'ruta', label: 'Ruta Juego', icon: <Compass className="w-4 h-4" /> },
    { id: 'simulacro', label: 'Simulador 110m', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'temario', label: 'Temario y Bases', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'clinica', label: 'Clínica de Fallos', icon: <Stethoscope className="w-4 h-4" />, count: mistakeCount },
  ];

  return (
    <div className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top Bar Contract: Brand — Nav Links — Primary CTA */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand wordmark */}
        <button
          type="button"
          onClick={() => {
            onSelectMode('ruta');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
        >
          <span className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-[#F59E0B] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
              <path d="M4 13c3.5 0 6.5-2.5 9.5-5.5l2 2c-3 3-5.5 6-5.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17.5" cy="6.5" r="2.5" />
              <path d="M5 19h14" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900">
            CorreosOpGame IV
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        {!isFocusActive && (
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = activeMode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectMode(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded ${
                    isActive ? 'text-[#1D4ED8]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className="tabular-nums text-xs font-semibold text-red-600">({item.count})</span>
                  )}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-[#1D4ED8]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenChallengeModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#1D4ED8] text-white hover:bg-[#1E3A8A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          >
            <Swords className="w-4 h-4 text-amber-300" />
            <span>Retar por enlace</span>
          </button>

          {!isFocusActive && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden px-3 py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 whitespace-nowrap shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de secciones"
            >
              Menú
            </button>
          )}
        </div>
      </header>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && !isFocusActive && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 grid grid-cols-2 gap-2">
          {navItems.map((item) => {
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectMode(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-[#1D4ED8] border border-blue-200'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>
                  {item.label}
                  {typeof item.count === 'number' && item.count > 0 ? ` (${item.count})` : ''}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Workspace Toolbar: Specialty Selector + Gamification Telemetry (Hidden during active focus session to prevent clutter & stay within mobile height cap) */}
      {!isFocusActive && (
        <div className="bg-[#F8FAFC] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
            {/* Specialty Selector */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full">
              <label htmlFor="specialty-select" className="text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
                Puesto Grupo IV:
              </label>
              <div className="hidden sm:flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-lg">
                {SPECIALTIES.map((spec) => {
                  const active = progress.selectedSpecialty === spec.value;
                  return (
                    <button
                      key={spec.value}
                      type="button"
                      onClick={() => onChangeSpecialty(spec.value)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        active ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {spec.label}
                    </button>
                  );
                })}
              </div>
              <select
                id="specialty-select"
                value={progress.selectedSpecialty}
                onChange={(e) => onChangeSpecialty(e.target.value as Specialty)}
                className="sm:hidden text-xs font-medium bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-800"
              >
                {SPECIALTIES.map((spec) => (
                  <option key={spec.value} value={spec.value}>
                    {spec.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Gamification Indicators (clean unboxed metrics with tabular-nums) */}
            <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-slate-700" title="Racha diaria de entrenamiento">
                <Flame className={`w-4 h-4 ${progress.streakDays > 0 ? 'text-[#D97706]' : 'text-slate-400'}`} />
                <span className="font-semibold tabular-nums">{progress.streakDays}</span>
                <span className="text-slate-500 hidden md:inline">días racha</span>
              </div>

              <span className="text-slate-300" aria-hidden="true">·</span>

              <div className="flex items-center gap-1.5 text-slate-700" title="Experiencia total acumulada">
                <Trophy className="w-4 h-4 text-[#1D4ED8]" />
                <span className="font-semibold tabular-nums">{progress.xp} XP</span>
                <span className="text-slate-500 hidden md:inline tabular-nums">(Niv. {globalLevel.level})</span>
              </div>

              <span className="text-slate-300" aria-hidden="true">·</span>

              <button
                type="button"
                onClick={onTogglePracticeMode}
                title="Alternar entre vidas limitadas (5 corazones) y modo práctica sin pérdida de vidas"
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1 py-0.5"
              >
                {progress.practiceNoHeartsLoss ? (
                  <>
                    <InfinityIcon className="w-4 h-4 text-[#059669]" />
                    <span className="font-semibold text-[#059669]">Práctica libre</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-[#DC2626] fill-[#DC2626]" />
                    <span className="font-semibold tabular-nums">{progress.hearts}/5</span>
                    <span className="text-slate-500 hidden md:inline">vidas</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
