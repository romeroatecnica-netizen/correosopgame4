import React, { useState } from 'react';
import { BookOpen, Calculator, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { OFFICIAL_BASES_HIGHLIGHTS } from '../data/faqAndResources';
import { OFFICIAL_TOPICS } from '../data/topics';
import { TopicKey } from '../types/opgame';

interface SyllabusAndCalculatorProps {
  meritEstimate: number;
  onUpdateMeritEstimate: (merits: number) => void;
  onTrainTopic: (topicId: TopicKey) => void;
}

export const SyllabusAndCalculator: React.FC<SyllabusAndCalculatorProps> = ({
  meritEstimate,
  onUpdateMeritEstimate,
  onTrainTopic,
}) => {
  const [simulatedHits, setSimulatedHits] = useState(78);
  const [expandedTopic, setExpandedTopic] = useState<string>('1');

  // Merit sub-calculator helper (up to 40 pts total)
  const [seniorityPts, setSeniorityPts] = useState(8);
  const [coursesPts, setCoursesPts] = useState(6);
  const [drivingPts, setDrivingPts] = useState(4);
  const [languagesDegreePts, setLanguagesDegreePts] = useState(2);

  const computedMerits = Math.min(40, Number((seniorityPts + coursesPts + drivingPts + languagesDegreePts).toFixed(2)));
  const testPoints = Number((simulatedHits * 0.6).toFixed(2));
  const finalTotalPoints = Number((testPoints + computedMerits).toFixed(2));

  const syncMerits = (s: number, c: number, d: number, l: number) => {
    const sum = Math.min(40, Number((s + c + d + l).toFixed(2)));
    onUpdateMeritEstimate(sum);
  };

  return (
    <div className="space-y-10">
      {/* Bases Summary */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 max-w-3xl">
          <p className="text-xs font-medium text-slate-500">Convocatoria Personal Laboral Fijo Correos</p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Bases del examen, temario oficial Grupo IV y calculadora de nota
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Resumen operativo de la estructura de pruebas para Reparto 1 (motorizado), Reparto 2 (a pie), Agente /
            Clasificación y Atención al Cliente en oficinas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OFFICIAL_BASES_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 space-y-1.5">
              <p className="text-xs font-medium text-slate-500">{item.label}</p>
              <p className="font-display text-lg font-bold text-[#1E3A8A] tabular-nums">{item.value}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Score & Merits Calculator */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-[#1D4ED8]" />
          <h2 className="font-display text-xl font-bold text-slate-900">
            Simulador de puntuación total (Prueba 60 pts + Méritos 40 pts)
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="calc-hits" className="font-semibold text-slate-800">
                  Aciertos en la prueba tipo test (100 preguntas)
                </label>
                <span className="font-bold text-[#1D4ED8] tabular-nums">
                  {simulatedHits} aciertos → {testPoints.toFixed(2)} / 60,00 pts
                </span>
              </div>
              <input
                id="calc-hits"
                type="range"
                min={0}
                max={100}
                value={simulatedHits}
                onChange={(e) => setSimulatedHits(Number(e.target.value))}
                className="w-full accent-[#1D4ED8]"
              />
              <p className="text-xs text-slate-500">
                Cada acierto suma 0,60 puntos. Los fallos o preguntas en blanco suman 0 puntos (no restan).
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700 tabular-nums">
                  <label htmlFor="m-seniority">Antigüedad / Bolsas</label>
                  <span>{seniorityPts} pts</span>
                </div>
                <input
                  id="m-seniority"
                  type="range"
                  min={0}
                  max={22}
                  step={0.5}
                  value={seniorityPts}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSeniorityPts(val);
                    syncMerits(val, coursesPts, drivingPts, languagesDegreePts);
                  }}
                  className="w-full accent-[#F59E0B]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700 tabular-nums">
                  <label htmlFor="m-courses">Formación homologada</label>
                  <span>{coursesPts} pts</span>
                </div>
                <input
                  id="m-courses"
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={coursesPts}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCoursesPts(val);
                    syncMerits(seniorityPts, val, drivingPts, languagesDegreePts);
                  }}
                  className="w-full accent-[#F59E0B]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700 tabular-nums">
                  <label htmlFor="m-driving">Permisos conducción (A1/B)</label>
                  <span>{drivingPts} pts</span>
                </div>
                <input
                  id="m-driving"
                  type="range"
                  min={0}
                  max={6}
                  step={1}
                  value={drivingPts}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setDrivingPts(val);
                    syncMerits(seniorityPts, coursesPts, val, languagesDegreePts);
                  }}
                  className="w-full accent-[#F59E0B]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700 tabular-nums">
                  <label htmlFor="m-lang">Titulación / Idiomas</label>
                  <span>{languagesDegreePts} pts</span>
                </div>
                <input
                  id="m-lang"
                  type="range"
                  min={0}
                  max={6}
                  step={0.5}
                  value={languagesDegreePts}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLanguagesDegreePts(val);
                    syncMerits(seniorityPts, coursesPts, drivingPts, val);
                  }}
                  className="w-full accent-[#F59E0B]"
                />
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-4">
            <p className="text-xs font-medium text-slate-500">Proyección combinada (máx. 100 puntos)</p>
            <p className="font-display text-4xl font-extrabold text-slate-900 tabular-nums">
              {finalTotalPoints.toFixed(2)} <span className="text-lg font-semibold text-slate-500">/ 100</span>
            </p>
            <div className="space-y-2 text-sm tabular-nums pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600">Prueba tipo test ({simulatedHits} × 0,60):</span>
                <span className="font-bold text-[#1D4ED8]">{testPoints.toFixed(2)} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Méritos estimados (tope 40,00):</span>
                <span className="font-bold text-[#D97706]">{computedMerits.toFixed(2)} pts</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 pt-1">
                <span>Guardado en tu perfil de simulacros:</span>
                <span>{meritEstimate.toFixed(1)} pts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official 12 Topics + Psychotechnics Breakdown */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#1D4ED8]" />
          <h2 className="font-display text-xl font-bold text-slate-900">
            Guía detallada de los 12 temas oficiales y bloque psicotécnico
          </h2>
        </div>

        <div className="space-y-3">
          {OFFICIAL_TOPICS.map((topic) => {
            const key = String(topic.id);
            const isOpen = expandedTopic === key;
            return (
              <div key={key} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedTopic(isOpen ? '' : key)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="text-xs text-slate-500">
                      {topic.block} · {topic.examWeightLabel}
                    </p>
                    <h3 className="font-display text-base font-bold text-slate-900">{topic.title}</h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">{topic.summary}</p>
                    <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
                      {topic.keyPoints.map((kp) => (
                        <li key={kp}>{kp}</li>
                      ))}
                    </ul>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => onTrainTopic(topic.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white text-xs font-semibold transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Entrenar {topic.id === 'psico' ? 'Psicotécnicos' : `Tema ${topic.id}`} ahora</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
