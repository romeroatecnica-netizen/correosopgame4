export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AffiliateResource {
  id: string;
  title: string;
  category: string;
  description: string;
  tag: string;
  url: string;
}

export const OFFICIAL_BASES_HIGHLIGHTS = [
  {
    label: 'Cuestionario oficial',
    value: '100 preguntas + 10 reserva',
    detail: '90 preguntas de los 12 temas oficiales y 10 psicotécnicas (más 10 de reserva para anulaciones).',
  },
  {
    label: 'Duración máxima',
    value: '110 minutos',
    detail: 'Equivale a 66 segundos de media por pregunta puntuable en la prueba presencial.',
  },
  {
    label: 'Valor del acierto',
    value: '0,60 puntos / acierto',
    detail: 'Hasta 60 puntos máximos en el test. Las respuestas erróneas o en blanco no penalizan (0 puntos).',
  },
  {
    label: 'Fase de méritos',
    value: 'Hasta 40 puntos',
    detail: 'Antigüedad, bolsas de empleo, cursos de formación, titulaciones, idiomas y permisos de conducción.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cuántas preguntas tiene el examen de Correos Grupo IV y cuánto tiempo dura?',
    answer:
      'El ejercicio único tipo test consta de 100 preguntas puntuables (90 sobre el temario oficial de 12 temas y 10 preguntas psicotécnicas), acompañadas de 10 preguntas adicionales de reserva que solo puntúan en orden correlativo si el órgano de selección anula alguna de las 100 principales. El tiempo máximo oficial es de 110 minutos.',
  },
  {
    id: 'faq-2',
    question: '¿Cuánto vale cada pregunta acertada y restan los errores en el test de Correos?',
    answer:
      'Cada pregunta correctamente contestada suma 0,60 puntos, permitiendo alcanzar un máximo de 60,00 puntos en la fase de examen. Las respuestas incorrectas o dejadas en blanco no restan puntuación, por lo que en el examen real siempre conviene contestar todas las preguntas aunque exista duda razonable.',
  },
  {
    id: 'faq-3',
    question: '¿Qué puestos componen el Grupo Profesional IV (Personal Operativo)?',
    answer:
      'Comprende los puestos operativos de Reparto 1 (motorizado en moto o vehículo ligero), Reparto 2 (a pie), Agente / Clasificación en centros de tratamiento y unidades logísticas, y Atención al Cliente en la red de oficinas postales.',
  },
  {
    id: 'faq-4',
    question: '¿Cómo funciona la suma de la prueba tipo test (60 pts) y los méritos (40 pts)?',
    answer:
      'Para acceder a la valoración de méritos es imprescindible superar la puntuación mínima de corte establecida en la prueba tipo test (habitualmente fijada por la Comisión de Empleo tras el examen según el puesto). Una vez superada, a tu nota del test (hasta 60 puntos) se suman tus méritos acreditados (hasta 40 puntos) para obtener la calificación final sobre 100.',
  },
  {
    id: 'faq-5',
    question: '¿Qué materias entran en los 12 temas del temario oficial y en psicotécnicos?',
    answer:
      'El temario oficial abarca: 1) Marco normativo postal, 2) Experiencia de personas, 3) Productos de Comunicación, 4) Productos en Oficinas, 5) Nuevas líneas de negocio, 6) Herramientas (PDA, SGIE, IRIS), 7) Admisión, 8) Tratamiento y transporte, 9) Entrega y reparto, 10) Protección de datos, 11) Prevención de blanqueo de capitales, y 12) Ética, transparencia y ciberseguridad. Las 10 psicotécnicas evalúan razonamiento verbal, numérico, lógico y atención.',
  },
  {
    id: 'faq-6',
    question: '¿Mis avances, rachas y fallos se guardan sin necesidad de crear cuenta?',
    answer:
      'Sí. CorreosOpGame IV funciona de forma 100 % local y determinista en tu navegador mediante localStorage. Tu racha diaria, XP, niveles de cada tema, historial de simulacros y preguntas guardadas en la Clínica de Fallos permanecen en tu dispositivo, y puedes compartir retos mediante enlace directo.',
  },
];

export const AFFILIATE_RESOURCES: AffiliateResource[] = [
  {
    id: 'res-temario',
    title: 'Manual Completo Temario Correos Grupo IV (12 Temas Actualizados)',
    category: 'Temario en papel y PDF',
    description:
      'Edición revisada con normativa postal, productos vigentes, operativa PDA/SGIE/IRIS, RGPD y Prevención de Blanqueo de Capitales.',
    tag: 'Material editorial recomendado',
    url: 'https://www.amazon.es/s?k=temario+oposiciones+correos+grupo+4',
  },
  {
    id: 'res-psico',
    title: 'Cuaderno de Psicotécnicos y Test Comentados Personal Operativo',
    category: 'Práctica intensiva',
    description:
      'Colección de baterías psicotécnicas (series, cálculo postal, atención y sinónimos) y simulacros cronometrados de 100 preguntas.',
    tag: 'Práctica complementaria',
    url: 'https://www.amazon.es/s?k=test+psicotecnicos+oposiciones+correos',
  },
  {
    id: 'res-repaso',
    title: 'Esquemas Visuales de Procesos Operativos, Tarifas y Plazos',
    category: 'Síntesis rápida',
    description:
      'Tablas comparativas de pesos, dimensiones máximas, intentos de entrega y plazos de lista para repaso en los últimos 15 días.',
    tag: 'Guía de bolsillo',
    url: 'https://www.amazon.es/s?k=esquemas+oposiciones+correos',
  },
];
