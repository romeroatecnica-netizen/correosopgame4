import React from 'react';
import { BookMarked, ExternalLink } from 'lucide-react';
import { AFFILIATE_RESOURCES, FAQ_ITEMS } from '../data/faqAndResources';

interface SeoAndMonetizationProps {
  isFocusActive: boolean;
  onGoToSyllabus: () => void;
  onGoToExam: () => void;
}

export const MidContentAdSlot: React.FC<{ isFocusActive: boolean }> = ({ isFocusActive }) => {
  if (isFocusActive) return null;

  return (
    <aside
      data-ad-slot="medianet-mid-leaderboard"
      aria-label="Espacio publicitario"
      className="no-print my-10 bg-white border border-slate-200 rounded-xl p-4 min-h-[100px] sm:min-h-[90px] flex flex-col items-center justify-center text-center"
    >
      {/*
        MEDIA.NET INTEGRATION SLOT #1 (Mid-Content Leaderboard / Responsive)
        Instrucciones de despliegue:
        1. Inserta el script contextual de Media.net en <head> con tu cid/crid.
        2. Sustituye este contenedor interior por <div id="medianet-slot-mid"></div>
           y ejecuta window._mNHandle.queue.push(...) con dimensiones 728x90 (desktop) / 320x100 (móvil).
        La altura mínima reservada (min-h-[100px] / sm:min-h-[90px]) evita CLS (Cumulative Layout Shift).
      */}
      <p className="text-[11px] font-medium text-slate-400 tracking-wide">
        Publicidad · Unidad Media.net (728×90 / 320×100 adaptable)
      </p>
    </aside>
  );
};

export const SeoAndMonetization: React.FC<SeoAndMonetizationProps> = ({
  isFocusActive,
  onGoToSyllabus,
  onGoToExam,
}) => {
  if (isFocusActive) return null;

  return (
    <div className="space-y-12 pt-4 border-t border-slate-200">
      {/* Long-tail SEO Educational Guide */}
      <section aria-labelledby="seo-guide-heading" className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <h2 id="seo-guide-heading" className="font-display text-2xl font-bold text-slate-900">
            Guía práctica de la oposición a Correos Grupo IV: temario, 0,60 puntos por acierto y psicotécnicos
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            La convocatoria de <strong>Personal Laboral Fijo del Grupo Profesional IV de Correos</strong> reúne los
            puestos operativos de <strong>Reparto 1 (motorizado)</strong>, <strong>Reparto 2 (a pie)</strong>,{' '}
            <strong>Agente / Clasificación</strong> y <strong>Atención al Cliente</strong> en oficinas. Para superar el
            corte con margen, es clave dominar tanto los 12 temas oficiales como la agilidad en las 10 preguntas
            psicotécnicas.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5">
              <h3 className="font-display text-sm font-bold text-slate-900">
                Estructura: 100 preguntas + 10 reserva en 110 min
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                90 preguntas corresponden al temario postal y 10 al bloque psicotécnico. Cada acierto vale{' '}
                <strong className="tabular-nums">0,60 puntos</strong> (hasta <strong className="tabular-nums">60</strong>{' '}
                puntos) y los errores no penalizan.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5">
              <h3 className="font-display text-sm font-bold text-slate-900">
                Concurso de méritos hasta 40 puntos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Superada la prueba tipo test, se suman hasta 40 puntos por experiencia/bolsas, cursos de formación
                oficial, titulaciones, idiomas y permisos de conducir A1 o B.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={onGoToExam}
              className="text-xs sm:text-sm font-semibold text-[#1D4ED8] hover:underline"
            >
              Probar simulacro gratis de 100 preguntas →
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onGoToSyllabus}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:underline"
            >
              Ver los 12 temas y calculadora de méritos →
            </button>
          </div>
        </div>

        {/* Collapsible FAQ */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900">Preguntas frecuentes sobre el examen</h2>
          <div className="space-y-2.5">
            {FAQ_ITEMS.map((faq) => (
              <details
                key={faq.id}
                className="group bg-white border border-slate-200 rounded-xl p-4 open:border-blue-200"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-semibold text-slate-900">
                  <span>{faq.question}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs shrink-0">▼</span>
                </summary>
                <p className="mt-2.5 pt-2.5 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Discreet Affiliate Material Block */}
      <section
        data-affiliate-block="true"
        aria-labelledby="affiliate-heading"
        className="no-print bg-white border border-slate-200 rounded-xl p-6 space-y-4"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#D97706]" />
            <h2 id="affiliate-heading" className="font-display text-lg font-bold text-slate-900">
              Libros, test y material recomendado
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Enlaces de afiliado contextuales · Sin coste adicional para el opositor
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {AFFILIATE_RESOURCES.map((res) => (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group bg-[#F8FAFC] border border-slate-200 hover:border-blue-300 rounded-xl p-4 flex flex-col justify-between gap-3 transition-colors"
            >
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-slate-500">
                  {res.category} · {res.tag}
                </p>
                <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8]">
                <span>Consultar edición</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Media.net Ad Slot #2 (Bottom Rectangle / Multiplex) */}
      <aside
        data-ad-slot="medianet-bottom-rectangle"
        aria-label="Espacio publicitario inferior"
        className="no-print bg-white border border-slate-200 rounded-xl p-6 min-h-[250px] flex flex-col items-center justify-center text-center"
      >
        {/*
          MEDIA.NET INTEGRATION SLOT #2 (Bottom Rectangle / Responsive Native)
          Instrucciones de despliegue:
          1. Inserta aquí tu contenedor Media.net (ej. 336x280, 300x250 o unidad nativa multipanel).
          2. La propiedad min-h-[250px] reserva espacio fijo para evitar saltos visuales (CLS = 0).
          3. Oculto automáticamente durante simulacros activos y en impresión (@media print).
        */}
        <p className="text-xs font-medium text-slate-400">
          Publicidad · Unidad inferior Media.net (300×250 / 336×280 / Nativo · altura reservada 250px)
        </p>
      </aside>
    </div>
  );
};
