import { Question } from '../types/opgame';

export const QUESTION_BANK: Question[] = [
  // =========================================================
  // TEMA 1: MARCO NORMATIVO POSTAL Y NATURALEZA JURÍDICA (9)
  // =========================================================
  {
    id: 't1-01',
    topicId: 1,
    specialty: 'General',
    level: 1,
    question:
      '¿Qué ley regula actualmente en España el Servicio Postal Universal, los derechos de los usuarios y el mercado postal?',
    options: [
      'La Ley 43/2010, de 30 de diciembre',
      'La Ley 24/1998, de 13 de julio',
      'La Ley 39/2015, de 1 de octubre',
      'El Real Decreto 1829/1999, de 3 de diciembre, con rango de ley orgánica',
    ],
    correctIndex: 0,
    explanation:
      'La Ley 43/2010, de 30 de diciembre, del servicio postal universal, de los derechos de los usuarios y del mercado postal, sustituyó a la anterior Ley 24/1998 e incorporó la Directiva Postal 2008/6/CE.',
    reference: 'Ley 43/2010 · Objeto y ámbito',
    errorHuntStatement: 'La Ley 24/1998 sigue siendo la norma vigente que sustituyó a la Ley 43/2010.',
  },
  {
    id: 't1-02',
    topicId: 1,
    specialty: 'General',
    level: 1,
    question:
      'Según la Ley 43/2010, ¿cuál es el peso máximo de los paquetes postales incluidos dentro del ámbito del Servicio Postal Universal (SPU)?',
    options: ['Hasta 10 kilogramos', 'Hasta 20 kilogramos', 'Hasta 30 kilogramos', 'Hasta 2 kilogramos'],
    correctIndex: 1,
    explanation:
      'El ámbito del Servicio Postal Universal incluye los envíos postales nacionales y transfronterizos de cartas y tarjetas postales de hasta 2 kg y de paquetes postales (con o sin valor comercial) de hasta 20 kg.',
    reference: 'Ley 43/2010 · Art. 21',
    errorHuntStatement: 'Dentro del Servicio Postal Universal, los paquetes postales tienen un límite de peso de 2 kg.',
  },
  {
    id: 't1-03',
    topicId: 1,
    specialty: 'General',
    level: 2,
    question:
      '¿Con qué frecuencia mínima debe realizar Correos, como operador designado del SPU, las recogidas y entregas en todo el territorio nacional?',
    options: [
      'Al menos tres días laborables por semana',
      'Todos los días laborables, de lunes a viernes (5 días a la semana), salvo circunstancias excepcionales',
      'Seis días a la semana, incluyendo sábados en todas las localidades',
      'Únicamente en municipios de más de 5.000 habitantes',
    ],
    correctIndex: 1,
    explanation:
      'El operador designado debe garantizar al menos una recogida en los puntos de acceso y una entrega en el domicilio de cada persona física o jurídica todos los días laborables, al menos cinco días a la semana, salvo fuerza mayor o zonas de muy baja densidad autorizadas.',
    reference: 'Ley 43/2010 · Art. 24',
  },
  {
    id: 't1-04',
    topicId: 1,
    specialty: 'General',
    level: 2,
    question:
      '¿Cuál es la naturaleza jurídica actual de Correos?',
    options: [
      'Organismo autónomo dependiente del Ministerio de Hacienda',
      'Entidad Pública Empresarial sin capital social',
      'Sociedad Anónima Estatal de capital 100 % público (Sociedad Estatal Correos y Telégrafos, S.A., S.M.E.)',
      'Fundación pública estatal adscrita al Ministerio del Interior',
    ],
    correctIndex: 2,
    explanation:
      'Correos adopta la forma jurídica de Sociedad Anónima Estatal de capital íntegramente público (Sociedad Estatal Correos y Telégrafos, S.A., S.M.E.), perteneciente al Grupo SEPI.',
    reference: 'Estatutos Sociales · Grupo Correos',
    errorHuntStatement: 'Correos opera jurídicamente como una Entidad Pública Empresarial fuera del Grupo SEPI.',
  },
  {
    id: 't1-05',
    topicId: 1,
    specialty: 'General',
    level: 3,
    question:
      '¿Qué empresas forman parte del Grupo Correos junto a la matriz Correos y Telégrafos?',
    options: [
      'Correos Express, Nexea y Correos Telecom',
      'Seur, Correos Telecom y Banco Postal',
      'Correos Express, DHL Iberia y Nexea',
      'Correos Logística S.L., Renfe Mercancías y Correos Telecom',
    ],
    correctIndex: 0,
    explanation:
      'El Grupo Correos está integrado por la matriz Correos y Telégrafos y sus filiales Correos Express (paquetería urgente), Nexea (comunicaciones documentales masivas) y Correos Telecom (infraestructuras de telecomunicaciones).',
    reference: 'Estructura del Grupo Correos',
  },
  {
    id: 't1-06',
    topicId: 1,
    specialty: 'Oficinas',
    level: 3,
    question:
      'Según la Ley 43/2010, ¿qué principio constitucional protege directamente el contenido de los envíos postales cerrados?',
    options: [
      'El principio de libertad de empresa del artículo 38 CE',
      'El secreto de las comunicaciones postales del artículo 18.3 CE',
      'El derecho de petición del artículo 29 CE',
      'La autonomía tributaria del artículo 133 CE',
    ],
    correctIndex: 1,
    explanation:
      'El artículo 18.3 de la Constitución Española garantiza el secreto de las comunicaciones, en especial las postales, telegráficas y telefónicas, salvo resolución judicial. La Ley 43/2010 refuerza además el deber de inviolabilidad de los envíos.',
    reference: 'Constitución Española Art. 18.3 · Ley 43/2010 Art. 5',
  },
  {
    id: 't1-07',
    topicId: 1,
    specialty: 'General',
    level: 4,
    question:
      '¿Qué organismo regula y supervisa el mercado postal y vela por la competencia y el cumplimiento del Servicio Postal Universal en España?',
    options: [
      'La Comisión Nacional de los Mercados y la Competencia (CNMC)',
      'El Banco de España',
      'La Agencia Española de Seguridad Aérea',
      'El Tribunal de Cuentas',
    ],
    correctIndex: 0,
    explanation:
      'La CNMC (Comisión Nacional de los Mercados y la Competencia) ejerce las funciones de regulación, supervisión, control del coste neto del SPU y resolución de conflictos en el sector postal.',
    reference: 'Ley 3/2013 y Ley 43/2010',
  },
  {
    id: 't1-08',
    topicId: 1,
    specialty: 'General',
    level: 4,
    question:
      'En caso de pérdida, robo o deterioro de un envío postal certificado, ¿qué derecho asiste al usuario según la Ley 43/2010?',
    options: [
      'Únicamente la devolución de la tasa de franqueo si reclama antes de 24 horas',
      'Derecho a percibir una indemnización predeterminada por el operador postal',
      'Ninguno, salvo que sea envío internacional aéreo',
      'Solo un vale canjeable en sellos de colección',
    ],
    correctIndex: 1,
    explanation:
      'Los usuarios tienen derecho a percibir una indemnización en caso de pérdida, robo, destrucción o deterioro de los envíos postales certificados o con valor declarado, conforme a las condiciones publicadas y la normativa postal.',
    reference: 'Ley 43/2010 · Art. 12',
  },
  {
    id: 't1-09',
    topicId: 1,
    specialty: 'Reparto',
    level: 5,
    question:
      '¿En qué supuesto puede un empleado postal abrir un envío postal cerrado por iniciativa propia durante el reparto o clasificación?',
    options: [
      'Cuando el embalaje parezca sospechoso de pesar menos de lo declarado',
      'Cuando el remitente no figure en el anverso',
      'Nunca; el empleado está sujeto al deber de inviolabilidad y secreto postal salvo los procedimientos legales en envíos rehusados/caducados o mandato judicial',
      'Siempre que falte el código postal del destinatario',
    ],
    correctIndex: 2,
    explanation:
      'Ningún empleado puede vulnerar el secreto de las comunicaciones ni abrir envíos por iniciativa propia. Incluso los envíos no entregables (depósito/rehusados) siguen un procedimiento tasado por personal expresamente autorizado en centros de tratamiento.',
    reference: 'Ley 43/2010 · Art. 5 y RD 1829/1999',
  },

  // =========================================================
  // TEMA 2: EXPERIENCIA DE PERSONAS EN CORREOS (8)
  // =========================================================
  {
    id: 't2-01',
    topicId: 2,
    specialty: 'General',
    level: 1,
    question:
      'Dentro de la clasificación profesional del Convenio Colectivo de Correos, ¿qué puestos integra el Grupo Profesional IV (Personal Operativo)?',
    options: [
      'Titulados Superiores y Jefes de Unidad Provincial',
      'Reparto 1 (motorizado), Reparto 2 (a pie), Agente/Clasificación y Atención al Cliente',
      'Mandos Intermedios y Directores de Oficina',
      'Personal exclusivamente de servicios centrales y asesoría jurídica',
    ],
    correctIndex: 1,
    explanation:
      'El Grupo Profesional IV corresponde al Personal Operativo de Correos y agrupa los puestos base de Reparto 1 (motorizado), Reparto 2 (a pie), Agente / Clasificación y Atención al Cliente.',
    reference: 'Convenio Colectivo Correos · Grupo IV',
    errorHuntStatement: 'El Grupo Profesional IV corresponde a Mandos Intermedios y Directores de Zona.',
  },
  {
    id: 't2-02',
    topicId: 2,
    specialty: 'Reparto',
    level: 2,
    question:
      'En materia de Prevención de Riesgos Laborales (PRL) para el puesto de Reparto 2 a pie, ¿cuál es la pauta ergonómica correcta al manipular un carro de reparto o levantar un paquete?',
    options: [
      'Doblar la espalda manteniendo las piernas totalmente rígidas',
      'Flexionar las rodillas manteniendo la espalda recta y acercando la carga al cuerpo',
      'Girar únicamente el tronco mientras se sostiene el peso con los brazos extendidos',
      'Tirar del carro de reparto siempre por detrás con una sola mano en pendientes',
    ],
    correctIndex: 1,
    explanation:
      'Para evitar lesiones dorsolumbares, la carga debe levantarse flexionando las piernas (rodillas), manteniendo la columna recta y pegando el bulto al centro de gravedad del cuerpo, evitando giros bruscos de tronco.',
    reference: 'PRL Correos · Manipulación manual de cargas',
  },
  {
    id: 't2-03',
    topicId: 2,
    specialty: 'Reparto',
    level: 2,
    question:
      'En el puesto de Reparto 1 (motorizado), ¿qué elemento de protección individual (EPI) y revisión previa es obligatorio antes de iniciar la ruta en motocicleta?',
    options: [
      'Uso del casco homologado correctamente abrochado, calzado adecuado y comprobación visual de frenos, luces y neumáticos',
      'Únicamente el chaleco reflectante en horario nocturno',
      'El casco solo es obligatorio en vías interurbanas, nunca en casco urbano',
      'No se requiere revisión previa si la moto pasó la ITV el año anterior',
    ],
    correctIndex: 0,
    explanation:
      'El motorista de Reparto 1 debe utilizar siempre el casco reglamentario abrochado y el equipamiento EPI asignado (guantes, calzado de seguridad/protección según dotación) y verificar el estado básico del vehículo antes de salir.',
    reference: 'PRL Seguridad Vial · Reparto 1',
  },
  {
    id: 't2-04',
    topicId: 2,
    specialty: 'General',
    level: 3,
    question:
      '¿Qué ley marco rige los derechos y deberes en Prevención de Riesgos Laborales aplicables a toda la plantilla de Correos?',
    options: [
      'La Ley 31/1995, de 8 de noviembre, de Prevención de Riesgos Laborales',
      'La Ley 14/1986, General de Sanidad',
      'La Ley 43/2010 del Servicio Postal Universal',
      'El Real Decreto Legislativo 1/2007 de Defensa de Consumidores',
    ],
    correctIndex: 0,
    explanation:
      'La Ley 31/1995, de Prevención de Riesgos Laborales, establece las obligaciones de vigilancia de la salud, evaluación de riesgos, formación e información preventiva y entrega de EPIs.',
    reference: 'Ley 31/1995 · PRL',
  },
  {
    id: 't2-05',
    topicId: 2,
    specialty: 'General',
    level: 3,
    question:
      'Respecto al Plan de Igualdad y Diversidad de Correos, ¿cuál es uno de sus compromisos esenciales?',
    options: [
      'Reservar los turnos de mañana exclusivamente al personal con mayor antigüedad sin criterios de conciliación',
      'Garantizar la igualdad de trato y oportunidades entre mujeres y hombres, prevenir el acoso y fomentar la conciliación corresponsable',
      'Limitar la formación online solo al personal del Grupo I',
      'Sustituir todos los protocolos disciplinarios por mediación externa obligatoria',
    ],
    correctIndex: 1,
    explanation:
      'El Plan de Igualdad de Correos promueve la igualdad efectiva, la no discriminación por razón de género, edad, origen o discapacidad, la conciliación laboral y familiar y el protocolo de tolerancia cero frente al acoso.',
    reference: 'Plan de Igualdad y Diversidad Correos',
  },
  {
    id: 't2-06',
    topicId: 2,
    specialty: 'Clasificación',
    level: 4,
    question:
      'En los Centros de Tratamiento Automatizado (CTA), ¿qué medida preventiva es prioritaria al trabajar junto a clasificadoras automáticas y cintas transportadoras?',
    options: [
      'Retirar un envío atascado introduciendo la mano con la máquina en marcha para no perder productividad',
      'No anular resguardos de seguridad, usar calzado de seguridad y detener el equipo mediante parada controlada antes de liberar atascos',
      'Llevar prendas sueltas o bufandas largas para protegerse del aire acondicionado',
      'Subirse sobre la cinta transportadora cuando esté parada sin bloquearla',
    ],
    correctIndex: 1,
    explanation:
      'Está terminantemente prohibido manipular partes móviles en funcionamiento o anular dispositivos de seguridad; ante cualquier atasco se debe aplicar la parada segura y evitar ropa holgada susceptible de atrapamiento.',
    reference: 'PRL Centros de Tratamiento · Seguridad en máquinas',
  },
  {
    id: 't2-07',
    topicId: 2,
    specialty: 'General',
    level: 4,
    question:
      '¿Qué herramienta digital interna utiliza Correos para centralizar la formación continua y los cursos obligatorios de su plantilla?',
    options: [
      'IRIS Formación',
      'Campus Virtual de Correos (e-learning corporativo)',
      'SGIE Académico',
      'Sede Electrónica de la CNMC',
    ],
    correctIndex: 1,
    explanation:
      'El Campus Virtual de Correos (junto al portal interno Conecta/Personas) gestiona los itinerarios formativos online en materias clave como PRL, RGPD, PBC y nuevos productos.',
    reference: 'Experiencia de Personas · Formación y Desarrollo',
  },
  {
    id: 't2-08',
    topicId: 2,
    specialty: 'General',
    level: 5,
    question:
      'En la cultura de Experiencia de Personas de Correos, ¿cómo se denomina el entorno/app corporativo de comunicación interna y servicios al empleado?',
    options: [
      'Conecta / Portal del Empleado',
      'Citypaq Interno',
      'Burofax Corporativo',
      'Mercurio Post',
    ],
    correctIndex: 0,
    explanation:
      'La aplicación y portal Conecta permite al personal consultar nóminas, vacaciones, avisos corporativos, ofertas internas y acceso directo a gestiones de Recursos Humanos.',
    reference: 'Experiencia de Personas · Canales internos',
  },

  // =========================================================
  // TEMA 3: PRODUCTOS Y SERVICIOS: COMUNICACIÓN (9)
  // =========================================================
  {
    id: 't3-01',
    topicId: 3,
    specialty: 'General',
    level: 1,
    question:
      '¿Cuál es el peso máximo permitido para una Carta Ordinaria o Carta Certificada nacional en Correos?',
    options: ['500 gramos', '1 kilogramo', '2 kilogramos', '5 kilogramos'],
    correctIndex: 2,
    explanation:
      'Tanto la carta ordinaria como la carta certificada y la carta urgente admiten envíos de hasta 2 kilogramos de peso máximo.',
    reference: 'Productos Comunicación · Carta',
    errorHuntStatement: 'La carta certificada nacional admite un peso máximo de 5 kilogramos.',
  },
  {
    id: 't3-02',
    topicId: 3,
    specialty: 'Reparto',
    level: 2,
    question:
      'En la entrega de una Notificación Administrativa conforme a la Ley 39/2015, si el primer intento en domicilio resulta infructuoso (nadie se hace cargo), ¿cómo debe realizarse el segundo intento?',
    options: [
      'Al día siguiente exactamente a la misma hora para comprobar si ha regresado',
      'Por una sola vez, dentro de los tres días hábiles siguientes y en una hora distinta (con un margen de diferencia mínimo respecto al primer intento)',
      'A los 15 días naturales mediante entrega en buzón domiciliario',
      'No existe segundo intento; pasa directamente a lista el mismo día',
    ],
    correctIndex: 1,
    explanation:
      'La Ley 39/2015 establece que, si nadie se hace cargo en el primer intento, se repetirá por una sola vez y en una hora distinta dentro de los tres días hábiles siguientes (diferenciando mañana antes de las 15h y tarde después de las 15h, con al menos 3 horas de margen).',
    reference: 'Ley 39/2015 Art. 42.2 · Notificaciones',
  },
  {
    id: 't3-03',
    topicId: 3,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Qué producto de comunicación ofrece prueba fehaciente ante terceros y tribunales de la entrega, identidad del destinatario y, opcionalmente, del contenido literal del texto enviado?',
    options: ['Carta Ordinaria Urgente', 'Publicorreo Óptimo', 'Burofax Premium', 'Tarjeta Postal Prepagada'],
    correctIndex: 2,
    explanation:
      'El Burofax Premium permite enviar documentos urgentes con entrega bajo firma y contratar servicios adicionales de Acuse de Recibo y Certificación de Contenido (copia certificada con valor probatorio).',
    reference: 'Productos Comunicación · Burofax Premium',
  },
  {
    id: 't3-04',
    topicId: 3,
    specialty: 'General',
    level: 3,
    question:
      '¿Qué característica define al servicio Publibuzón de Correos?',
    options: [
      'Envíos publicitarios con dirección nominal obligatoria y entrega bajo firma',
      'Envíos publicitarios sin dirección postal personalizada que se depositan en todos los buzones de una zona o código postal seleccionado',
      'Notificaciones judiciales sin sobre cerrado',
      'Envío urgente internacional de prensa diaria',
    ],
    correctIndex: 1,
    explanation:
      'Publibuzón es el servicio de buzoneo sin dirección nominal, ideal para campañas locales o segmentadas por códigos postales o secciones de reparto.',
    reference: 'Productos Comunicación · Marketing Directo',
    errorHuntStatement: 'Publibuzón requiere obligatoriamente nombre, apellidos y entrega bajo firma del destinatario.',
  },
  {
    id: 't3-05',
    topicId: 3,
    specialty: 'Oficinas',
    level: 3,
    question:
      '¿Qué diferencia principal distingue a Publicorreo Óptimo frente a Publibuzón?',
    options: [
      'Publicorreo Óptimo siempre lleva dirección postal del destinatario (marketing directo nominal) y puede incluir muestras promocionales',
      'Publicorreo Óptimo solo se entrega en mano mediante PDA y DNI',
      'Publibuzón permite hasta 2 kg por unidad y Publicorreo solo 20 g',
      'No existe ninguna diferencia operativa entre ambos',
    ],
    correctIndex: 0,
    explanation:
      'Publicorreo (Óptimo y Premium) es un envío dirigido nominalmente (lleva destinatario y dirección postal) para comunicaciones comerciales/promocionales, a diferencia del buzoneo sin dirección (Publibuzón).',
    reference: 'Productos Comunicación · Publicorreo',
  },
  {
    id: 't3-06',
    topicId: 3,
    specialty: 'Reparto',
    level: 4,
    question:
      '¿Cuántos intentos de entrega en domicilio incluye por defecto una Carta Certificada ordinaria (no notificación administrativa)?',
    options: [
      'Tres intentos en días consecutivos',
      'Un intento de entrega en domicilio; si no puede entregarse, se deja aviso de llegada para recogida en oficina durante 15 días naturales',
      'Dos intentos obligatorios en distinta franja horaria siempre',
      'Ningún intento en domicilio; va directamente a lista de oficina',
    ],
    correctIndex: 1,
    explanation:
      'En la Carta Certificada estándar se realiza un intento de entrega en domicilio; si el destinatario está ausente, se deposita aviso de llegada (M4) en el buzón pasando a lista de oficina durante 15 días naturales.',
    reference: 'Manual Operativo · Carta Certificada',
  },
  {
    id: 't3-07',
    topicId: 3,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Qué ocurre si un Burofax no puede entregarse en domicilio por ausencia del destinatario?',
    options: [
      'Se devuelve inmediatamente al remitente ese mismo día',
      'Se deposita en el buzón sin recoger firma',
      'Se deja aviso de llegada en el buzón indicando que permanece en oficina para su recogida (habitualmente 30 días naturales)',
      'Se transforma en carta ordinaria al día siguiente',
    ],
    correctIndex: 2,
    explanation:
      'Ante ausencia en el intento de entrega de un burofax, el cartero deja aviso de llegada para que el destinatario pueda retirarlo en la oficina de referencia dentro del plazo de lista establecido para este producto (30 días naturales).',
    reference: 'Productos Comunicación · Entrega de Burofax',
  },
  {
    id: 't3-08',
    topicId: 3,
    specialty: 'General',
    level: 5,
    question:
      '¿Qué dimensiones mínimas normalizadas debe respetar un envío en forma de sobre para su admisión como carta estándar?',
    options: ['14 × 9 cm', '10 × 7 cm', '21 × 15 cm', '5 × 5 cm'],
    correctIndex: 0,
    explanation:
      'Las dimensiones mínimas de los envíos en forma de sobre o tarjeta son 14 × 9 cm (140 × 90 mm), con una tolerancia de 2 mm, para permitir el paso seguro por las máquinas clasificadoras y el franqueo.',
    reference: 'Requisitos físicos · Envíos postales',
  },
  {
    id: 't3-09',
    topicId: 3,
    specialty: 'Oficinas',
    level: 5,
    question:
      '¿Cuál es la cobertura geográfica y uso principal del servicio Cecograma?',
    options: [
      'Envíos urgentes de paquetería refrigerada',
      'Envíos con impresiones en relieve (Braille) o soportes para personas invidentes o con discapacidad visual, exentos de franqueo ordinario hasta 7 kg',
      'Telegramas internacionales urgentes con acuse telemático',
      'Cartas administrativas de la Seguridad Social',
    ],
    correctIndex: 1,
    explanation:
      'El cecograma está destinado a personas invidentes o instituciones dedicadas a ellas (escritos en sistema Braille, grabaciones o material adaptado), con exención de tarifas básicas dentro del SPU y peso máximo de 7 kg.',
    reference: 'Ley 43/2010 · Cecograma',
  },

  // =========================================================
  // TEMA 4: PRODUCTOS Y SERVICIOS: EN OFICINAS (9)
  // =========================================================
  {
    id: 't4-01',
    topicId: 4,
    specialty: 'Oficinas',
    level: 1,
    question:
      '¿Qué servicio permite a clientes bancarios con convenio retirar o ingresar dinero en efectivo directamente en las oficinas de Correos y mediante carteros rurales?',
    options: ['Correos Cash', 'Publicorreo Financiero', 'Paq Return', 'Citypaq Cash'],
    correctIndex: 0,
    explanation:
      'Correos Cash permite la retirada e ingreso de efectivo en la red de oficinas postales (y entrega a domicilio en zonas rurales) para clientes de entidades bancarias adheridas.',
    reference: 'Productos en Oficinas · Correos Cash',
    errorHuntStatement: 'Correos Cash sirve exclusivamente para cambiar moneda extranjera en aeropuertos.',
  },
  {
    id: 't4-02',
    topicId: 4,
    specialty: 'Oficinas',
    level: 2,
    question:
      'Entre los productos de paquetería en oficinas, ¿qué caracteriza al Paq Ligero frente al Paq Estándar?',
    options: [
      'Admite hasta 30 kg y entrega obligatoria bajo firma',
      'Está diseñado para pequeños envíos de hasta 2 kg con entrega directa en buzón domiciliario (sin firma) y seguimiento básico',
      'Solo puede enviarse a Canarias y Baleares',
      'Incluye seguro obligatorio de 3.000 euros',
    ],
    correctIndex: 1,
    explanation:
      'Paq Ligero está pensado para compras online o envíos pequeños de hasta 2 kg (y grosor reducido apto para buzón) que se entregan directamente en el buzón sin necesidad de firma.',
    reference: 'Paquetería Correos · Paq Ligero',
  },
  {
    id: 't4-03',
    topicId: 4,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Qué peso máximo admite con carácter general el servicio Paq Estándar y Paq Premium en ámbito nacional?',
    options: ['10 kilogramos', '20 kilogramos', '30 kilogramos', '50 kilogramos'],
    correctIndex: 2,
    explanation:
      'Tanto Paq Estándar como Paq Premium permiten enviar paquetes de hasta 30 kg de peso real (aplicándose peso volumétrico si supera el peso real en las tarifas comerciales que corresponda).',
    reference: 'Paquetería Correos · Paq Estándar / Premium',
  },
  {
    id: 't4-04',
    topicId: 4,
    specialty: 'Oficinas',
    level: 3,
    question:
      '¿Cuál es la ventaja principal del servicio ORVE disponible en las oficinas de Correos?',
    options: [
      'Emitir etiquetas de envío internacional para aduanas',
      'Digitalizar y remitir electrónicamente documentos dirigidos a cualquier Administración Pública integrada en el sistema SIR (Registro Electrónico)',
      'Recargar tarjetas de transporte metropolitano en todo el país',
      'Contratar pólizas de seguros de automóvil',
    ],
    correctIndex: 1,
    explanation:
      'ORVE (Oficina de Registro Virtual) permite a los ciudadanos presentar solicitudes, escritos y documentación en oficinas de Correos para su digitalización y envío registro a registro a las Administraciones Públicas.',
    reference: 'Servicios Administrativos en Oficina · ORVE',
  },
  {
    id: 't4-05',
    topicId: 4,
    specialty: 'Oficinas',
    level: 3,
    question:
      '¿Qué trámites relacionados con la Dirección General de Tráfico (DGT) pueden realizarse presencialmente en las oficinas de Correos?',
    options: [
      'Exámenes teóricos del permiso B',
      'Adquisición de distintivos ambientales (etiquetas DGT), duplicado del permiso de circulación e informes de vehículos',
      'Matriculación definitiva de camiones pesados',
      'Renovación presencial del reconocimiento psicotécnico médico',
    ],
    correctIndex: 1,
    explanation:
      'En las oficinas de Correos se gestionan distintivos medioambientales DGT (0, Eco, C, B), duplicados del permiso de circulación, informes de vehículos y notificaciones de cambio de domicilio fiscal del vehículo/conductor.',
    reference: 'Servicios en Oficina · Convenio DGT',
  },
  {
    id: 't4-06',
    topicId: 4,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Cómo funciona la Tarjeta Correos Prepago Mastercard?',
    options: [
      'Es una tarjeta de crédito vinculada obligatoriamente a una hipoteca',
      'Funciona con saldo recargado previamente sin necesidad de abrir cuenta bancaria, permitiendo pagos y retiradas con control del gasto',
      'Solo puede utilizarse para comprar sellos en oficinas de Correos',
      'No permite compras por internet ni pagos contactless',
    ],
    correctIndex: 1,
    explanation:
      'La Tarjeta Correos Prepago es una tarjeta independiente de cuentas bancarias tradicionales que funciona mediante recargas previas (en oficina o app) para pagos físicos, online y retiradas en cajeros.',
    reference: 'Servicios Financieros · Correos Prepago',
  },
  {
    id: 't4-07',
    topicId: 4,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Qué modalidades principales existen para el Giro Nacional en oficinas de Correos?',
    options: [
      'Giro Ordinario (entrega en domicilio o lista en oficina) y Giro Inmediato (disponible al instante en cualquier oficina mediante código)',
      'Giro Aéreo y Giro Marítimo únicamente',
      'Giro Empresarial y Giro Bancario SEPA sin identificación',
      'Únicamente el Giro Telegráfico sin límite de importe en efectivo',
    ],
    correctIndex: 0,
    explanation:
      'El Giro Nacional ofrece la modalidad Ordinaria (en domicilio en efectivo/cheque o en oficina) y el Giro Inmediato (cobro instantáneo en cualquier oficina de la red presentando documento identificativo y localizador).',
    reference: 'Servicios Financieros · Giro Nacional',
  },
  {
    id: 't4-08',
    topicId: 4,
    specialty: 'Oficinas',
    level: 5,
    question:
      '¿Qué servicio en oficina permite el envío urgente de dinero al extranjero en minutos mediante red internacional asociada?',
    options: ['Western Union en Correos', 'Paq Today Internacional', 'Burofax Internacional', 'TuSello Express'],
    correctIndex: 0,
    explanation:
      'Mediante el acuerdo con Western Union (además del Giro Internacional UPU/Eurogiro), los clientes pueden enviar y recibir remesas internacionales en minutos desde las oficinas de Correos.',
    reference: 'Servicios Financieros · Remesas Internacionales',
  },
  {
    id: 't4-09',
    topicId: 4,
    specialty: 'Reparto',
    level: 5,
    question:
      '¿En qué consiste el servicio Paq Today?',
    options: [
      'Entrega garantizada en 72 horas laborables en ámbito rural',
      'Entrega el mismo día (same-day) para envíos urbanos y provinciales dentro de franjas horarias concertadas',
      'Paquetería exclusiva para envío de bicicletas entre ciudades',
      'Recogida únicamente en taquillas Citypaq los domingos',
    ],
    correctIndex: 1,
    explanation:
      'Paq Today ofrece entrega urgente en el mismo día (normalmente en ámbitos urbanos/metropolitanos) orientada al comercio electrónico y entregas urgentes locales.',
    reference: 'Paquetería Correos · Paq Today',
  },

  // =========================================================
  // TEMA 5: NUEVAS LÍNEAS DE NEGOCIO (8)
  // =========================================================
  {
    id: 't5-01',
    topicId: 5,
    specialty: 'General',
    level: 1,
    question:
      '¿Qué son las terminales automatizadas Citypaq de Correos?',
    options: [
      'Cajeros automáticos para retirar únicamente dinero de pensiones',
      'Taquillas inteligentes disponibles en espacios públicos y comunidades/empresas para recoger, enviar y devolver paquetes con flexibilidad horaria',
      'Máquinas de clasificación óptica instaladas en los CTA',
      'Puntos de recarga rápida para motocicletas de reparto',
    ],
    correctIndex: 1,
    explanation:
      'Citypaq es la red de taquillas automatizadas de Correos (públicas en estaciones/centros comerciales y privadas en comunidades o empresas) que permite recoger, enviar o devolver paquetes sin depender de horarios de entrega domiciliaria.',
    reference: 'Nuevas Líneas · Citypaq',
    errorHuntStatement: 'Las taquillas Citypaq solo permiten recibir cartas ordinarias sin código de apertura.',
  },
  {
    id: 't5-02',
    topicId: 5,
    specialty: 'General',
    level: 2,
    question:
      '¿Qué actividad desarrolla la línea de negocio Correos Logística?',
    options: [
      'Exclusivamente venta de material de oficina en ventanilla',
      'Soluciones integrales de almacenamiento, gestión de stock, picking, packing y preparación de pedidos (fulfillment) conectadas con el transporte',
      'Emisión de certificados digitales de la FNMT',
      'Gestión de apartados postales exclusivamente rurales',
    ],
    correctIndex: 1,
    explanation:
      'Correos Logística ofrece a empresas y e-commerce servicios completos de cadena de suministro: almacenaje, preparación de pedidos (picking y packing), logística inversa y distribución.',
    reference: 'Nuevas Líneas · Correos Logística',
  },
  {
    id: 't5-03',
    topicId: 5,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Qué finalidad tiene el servicio Paq Mochila orientado al Camino de Santiago?',
    options: [
      'Vender mochilas homologadas en las oficinas de Madrid',
      'Transportar el equipaje de los peregrinos etapa a etapa entre alojamientos, albergues y hoteles',
      'Guardar equipajes durante un máximo de un año en CTA',
      'Enviar bicicletas desmontadas únicamente al extranjero',
    ],
    correctIndex: 1,
    explanation:
      'Paq Mochila traslada diariamente mochilas y maletas de los peregrinos entre los distintos alojamientos de cada etapa del Camino de Santiago, complementado por Paq Peregrino y Paq Bicicleta.',
    reference: 'Nuevas Líneas · Servicios Camino de Santiago',
  },
  {
    id: 't5-04',
    topicId: 5,
    specialty: 'Oficinas',
    level: 3,
    question:
      '¿Qué producto permite a empresas o particulares crear sellos de curso legal con imágenes o logotipos propios?',
    options: ['TuSello', 'Correos Market', 'Mi Oficina Express', 'Sello Digital NFC'],
    correctIndex: 0,
    explanation:
      'TuSello es el servicio de Correos que permite diseñar sellos postales personalizados válidos para franqueo nacional e internacional.',
    reference: 'Nuevas Líneas · Soluciones de Personalización',
  },
  {
    id: 't5-05',
    topicId: 5,
    specialty: 'Reparto',
    level: 3,
    question:
      '¿Para qué tipo de mercancías está diseñado el servicio Correos Frío?',
    options: [
      'Envíos que requieren transporte a temperatura controlada (refrigerado o congelado) con monitorización térmica mediante sensores IoT',
      'Cartas certificadas con destino a países nórdicos',
      'Paquetería estándar sin control de temperatura durante los meses de invierno',
      'Destrucción segura de papel en centros logísticos',
    ],
    correctIndex: 0,
    explanation:
      'Correos Frío garantiza la cadena de frío (productos farmacéuticos, alimentación fresca o gourmet) utilizando cajas isotérmicas y sensores de control térmico en tiempo real.',
    reference: 'Nuevas Líneas · Correos Frío',
  },
  {
    id: 't5-06',
    topicId: 5,
    specialty: 'General',
    level: 4,
    question:
      '¿Qué objetivo persigue la plataforma Correos Market?',
    options: [
      'Subastar paquetes no reclamados en los CTA',
      'Marketplace online que conecta a productores locales y pequeñas empresas españolas con compradores, apoyando la venta y envío de productos locales',
      'Portal exclusivo de compra de uniformes para empleados',
      'Red de venta mayorista de telecomunicaciones',
    ],
    correctIndex: 1,
    explanation:
      'Correos Market es el mercado digital impulsado por Correos para dar visibilidad, venta online y logística integrada a artesanos y productores locales, especialmente en el ámbito rural.',
    reference: 'Nuevas Líneas · Correos Market',
  },
  {
    id: 't5-07',
    topicId: 5,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Qué ofrece la solución digital "Correos Ecommerce" o las integraciones de Correos para tiendas online?',
    options: [
      'Únicamente el alquiler de locales comerciales físicos',
      'Módulos de conexión (plugins para WooCommerce, PrestaShop, Shopify) para generar etiquetas, gestionar devoluciones y ofrecer entrega en oficina o Citypaq',
      'Solo envío de facturas en papel mediante telegrama',
      'Exención total del IVA en los envíos a Canarias',
    ],
    correctIndex: 1,
    explanation:
      'Las soluciones digitales para e-commerce integran automáticamente la tienda online con la red de Correos para emitir etiquetas de envío, elegir punto de entrega (domicilio, oficina o Citypaq) y gestionar devoluciones.',
    reference: 'Nuevas Líneas · Soluciones Digitales',
  },
  {
    id: 't5-08',
    topicId: 5,
    specialty: 'Reparto',
    level: 5,
    question:
      '¿Qué papel desempeñan los puntos de conveniencia (red Correos Paq / comercios asociados) dentro de la estrategia de última milla?',
    options: [
      'Sustituir completamente a los carteros en todo el territorio nacional',
      'Ampliar la capillaridad de recogida y admisión de paquetes en comercios locales con amplios horarios, reduciendo entregas fallidas y emisiones',
      'Tramitar únicamente giros postales internacionales',
      'Almacenar mercancías peligrosas ADR',
    ],
    correctIndex: 1,
    explanation:
      'La red de puntos de conveniencia complementa a las oficinas y Citypaq, facilitando entregas a la primera, evitando segundas rutas contaminantes y ofreciendo horarios extendidos al destinatario.',
    reference: 'Nuevas Líneas · Sostenibilidad y Última Milla',
  },

  // =========================================================
  // TEMA 6: HERRAMIENTAS (PDA / SGIE / IRIS) (8)
  // =========================================================
  {
    id: 't6-01',
    topicId: 6,
    specialty: 'Oficinas',
    level: 1,
    question:
      '¿Cuál es la aplicación informática principal utilizada en las ventanillas de las oficinas de Correos para admisión, cobro, entrega en lista y servicios financieros?',
    options: ['SGIE', 'IRIS (Integración de Red de Información y Servicios)', 'OCR-CTA', 'VozIP Rural'],
    correctIndex: 1,
    explanation:
      'IRIS es el aplicativo central de oficinas de Correos, desde el que se realizan admisiones, cobros de tasas, giros, Correos Cash, entrega en lista y gestión documental.',
    reference: 'Herramientas · IRIS',
    errorHuntStatement: 'El aplicativo principal que utilizan los carteros en la calle sin conexión es IRIS.',
  },
  {
    id: 't6-02',
    topicId: 6,
    specialty: 'Reparto',
    level: 1,
    question:
      '¿Qué funciones principales realiza el sistema SGIE en una Unidad de Reparto (UR) o Unidad de Servicios Especiales (USE)?',
    options: [
      'Diseñar campañas publicitarias externas',
      'Gestionar el alta/recepción de envíos, asignación a secciones, estacionamientos, liquidación de rutas y control de inventario de la unidad',
      'Emitir nóminas y cuadrantes médicos',
      'Clasificar automáticamente cartas ordinarias por lectura láser',
    ],
    correctIndex: 1,
    explanation:
      'SGIE (Sistema de Gestión Integral de Envíos) es la herramienta informática de las unidades de reparto para dar de alta envíos registrados, asignarlos a carteros/PDAs, registrar incidencias y efectuar la liquidación diaria.',
    reference: 'Herramientas · SGIE',
  },
  {
    id: 't6-03',
    topicId: 6,
    specialty: 'Reparto',
    level: 2,
    question:
      '¿Qué debe registrar el cartero en su PDA en el mismo momento en que efectúa la entrega de un envío certificado o paquete al destinatario?',
    options: [
      'Anotarlo en un cuaderno de papel y pasarlo al sistema al final de la semana',
      'Leer el código de barras, seleccionar la situación de entrega, consignar datos/DNI si procede y recoger la firma digital del receptor en la pantalla de la PDA',
      'Hacer una fotografía del DNI por ambas caras con su teléfono personal',
      'Dejar el envío sin escanear si ya conoce al vecino',
    ],
    correctIndex: 1,
    explanation:
      'La PDA permite la trazabilidad en tiempo real: lectura del código del envío, registro de entrega, comprobación e introducción de datos del receptor y captura de firma biométrica/digital en el acto.',
    reference: 'Herramientas · Operativa PDA',
  },
  {
    id: 't6-04',
    topicId: 6,
    specialty: 'Reparto',
    level: 3,
    question:
      'Al finalizar el turno de reparto, ¿qué procedimiento es obligatorio realizar con la PDA y los envíos no entregados?',
    options: [
      'Llevar la PDA a casa para cargarla y entregar los paquetes al día siguiente',
      'Efectuar la liquidación en SGIE descargando/sincronizando los eventos de la PDA, entregando los importes cobrados (reembolsos) y clasificando los estacionados/aviso de llegada',
      'Borrar la memoria caché de la PDA antes de entrar en la unidad',
      'Dejar los envíos ausentes dentro del carro de reparto sin registrar en SGIE',
    ],
    correctIndex: 1,
    explanation:
      'La liquidación de la sección en SGIE cierra el ciclo diario: confirma las entregas, actualiza los envíos pendientes o destinados a lista/oficina, cuadra los cobros contra reembolso y coloca la PDA en su base de carga.',
    reference: 'Herramientas · Liquidación PDA / SGIE',
  },
  {
    id: 't6-05',
    topicId: 6,
    specialty: 'Clasificación',
    level: 3,
    question:
      'En los Centros de Tratamiento Automatizado, ¿qué función cumple el sistema OCR / Videocodificación de las máquinas clasificadoras?',
    options: [
      'Pesar únicamente paquetes superiores a 30 kg',
      'Leer automáticamente la dirección y código postal de las cartas (OCR) y, si no es legible, mostrar la imagen a un operador para su tecleo manual (videocodificación)',
      'Emitir giros inmediatos en ventanilla',
      'Imprimir sellos TuSello sobre sobres acolchados',
    ],
    correctIndex: 1,
    explanation:
      'El Reconocimiento Óptico de Caracteres (OCR) interpreta direcciones manuscritas o impresas a alta velocidad; cuando la lectura automática falla o es dudosa, la imagen pasa a videocodificación para asignar el código postal correcto.',
    reference: 'Herramientas · Clasificación Automatizada',
  },
  {
    id: 't6-06',
    topicId: 6,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Para qué sirve la funcionalidad de Prerregistro en la web/app de Correos o mediante fichero XML antes de acudir a oficina?',
    options: [
      'Agiliza la admisión en IRIS al generar previamente el código de envío y los datos de remitente y destinatario',
      'Permite enviar paquetes gratis los lunes',
      'Exime de pesar y comprobar el contenido del paquete en ventanilla',
      'Sustituye el DNI en los envíos contra reembolso',
    ],
    correctIndex: 0,
    explanation:
      'El prerregistro permite al cliente introducir online los datos del envío (o generar etiquetas desde su e-commerce), reduciendo el tiempo de espera en ventanilla cuando el operador lee el código en IRIS.',
    reference: 'Herramientas · Prerregistro e IRIS',
  },
  {
    id: 't6-07',
    topicId: 6,
    specialty: 'Reparto',
    level: 4,
    question:
      '¿Qué evento se registra en la PDA cuando en la dirección de reparto resulta imposible localizar el inmueble o falta información esencial para entregar?',
    options: [
      'Entregado en buzón',
      'Dirección incorrecta / Insuficiente (incidencia de reparto)',
      'Admitido en oficina',
      'Liquidado con reembolso cobrado',
    ],
    correctIndex: 1,
    explanation:
      'Cuando no existe la calle/número o faltan datos imprescindibles (piso/puerta en bloque múltiple sin buzón identificable), se registra la incidencia específica (dirección incorrecta/insuficiente) para su gestión o devolución.',
    reference: 'Herramientas · Estados PDA',
  },
  {
    id: 't6-08',
    topicId: 6,
    specialty: 'Clasificación',
    level: 5,
    question:
      '¿Qué máquina de clasificación en los CTA está específicamente destinada al tratamiento de envíos de formato plano grande (Flat / revistas / sobres C4)?',
    options: ['CFC (Clasificadora de Formato Normalizado)', 'FSM / Flat Sorter (Clasificadora de Formato Grande / Flat)', 'Balanza IRIS-10', 'Impresora térmica M4'],
    correctIndex: 1,
    explanation:
      'Las máquinas FSM (Flat Sorting Machine) clasifican envíos planos de mayor tamaño (catálogos, revistas, sobres grandes), mientras que las CFC/IRV tratan correspondencia de formato normalizado.',
    reference: 'Herramientas · Maquinaria CTA',
  },

  // =========================================================
  // TEMA 7: PROCESOS OPERATIVOS I: ADMISIÓN (8)
  // =========================================================
  {
    id: 't7-01',
    topicId: 7,
    specialty: 'Oficinas',
    level: 1,
    question:
      'En el proceso de admisión de un paquete en oficina, ¿qué comprobación se realiza si el cliente presenta un bulto muy voluminoso pero de poco peso real?',
    options: [
      'Se cobra siempre por el peso real exclusivamente',
      'Se calcula también el peso volumétrico (Largo × Alto × Ancho en cm / factor de conversión aplicable) y se aplica el mayor entre peso real y volumétrico cuando el producto lo contemple',
      'Se rechaza automáticamente el paquete aunque cumpla medidas máximas',
      'Se divide el paquete en dos envíos sin consultar al cliente',
    ],
    correctIndex: 1,
    explanation:
      'En la paquetería comercial (como Paq Estándar / Premium), cuando un envío ocupa mucho volumen en relación con su peso en báscula, se aplica el criterio del peso volumétrico si supera al peso real, dentro de los límites máximos de dimensiones.',
    reference: 'Procesos I Admisión · Peso volumétrico',
    errorHuntStatement: 'En paquetería comercial de Correos jamás se tiene en cuenta el volumen del paquete, solo su peso en báscula.',
  },
  {
    id: 't7-02',
    topicId: 7,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Cuáles de los siguientes artículos están prohibidos con carácter general para su admisión como envíos postales ordinarios?',
    options: [
      'Libros impresos y documentos en papel',
      'Materias explosivas, inflamables, sustancias tóxicas/infecciosas no autorizadas, armas y estupefacientes',
      'Ropa embalada en bolsa opaca',
      'Catálogos comerciales con peso inferior a 500 g',
    ],
    correctIndex: 1,
    explanation:
      'La Ley Postal y la normativa internacional (UPU / ADR / IATA) prohíben el envío de explosivos, inflamables, sustancias radiactivas, biológicas peligrosas, armas, drogas y objetos cuya circulación esté prohibida por seguridad.',
    reference: 'Procesos I Admisión · Objetos prohibidos',
  },
  {
    id: 't7-03',
    topicId: 7,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Qué requisito aduanero es imprescindible cumplimentar al admitir paquetes o mercancías con destino a países fuera de la Unión Europea o territorios con régimen fiscal especial (como Canarias, Ceuta o Melilla)?',
    options: [
      'Declaración de contenido / factura proforma y formulario aduanero (CN22 / CN23 según valor y tipo)',
      'Únicamente escribir "Regalo" a mano en la caja',
      'Firmar una autorización de Correos Cash',
      'No se requiere ningún documento si pesa menos de 5 kg',
    ],
    correctIndex: 0,
    explanation:
      'Los envíos con mercancías dirigidos a terceros países o territorios con aduana fiscal propia requieren declaración aduanera (CN22 o CN23) detallando contenido, valor, peso y código arancelario/documentación comercial.',
    reference: 'Procesos I Admisión · Aduanas (CN22/CN23)',
  },
  {
    id: 't7-04',
    topicId: 7,
    specialty: 'General',
    level: 3,
    question:
      '¿Qué modalidad de franqueo permite a grandes remitentes depositar envíos sin adherir sellos físicos, identificándolos mediante una estampación o cajetín autorizado ("Franqueo Pagado")?',
    options: [
      'Sellos conmemorativos únicamente',
      'Franqueo Pagado en oficina o mediante contrato de admisión masiva',
      'Reembolso en destino obligatorio',
      'Franqueo en buzón sin identificación',
    ],
    correctIndex: 1,
    explanation:
      'El Franqueo Pagado permite a clientes con contrato o acuerdos de admisión masiva imprimir el cajetín normalizado "Franqueo Pagado" (o usar máquinas de franquear) liquidando el importe por albarán/facturación.',
    reference: 'Procesos I Admisión · Medios de franqueo',
  },
  {
    id: 't7-05',
    topicId: 7,
    specialty: 'Oficinas',
    level: 3,
    question:
      'Si un usuario deposita en un buzón público una carta ordinaria sin sello o con franqueo insuficiente, ¿qué procede hacer conforme a la normativa postal?',
    options: [
      'Destruir la carta inmediatamente sin aviso',
      'Aplicar el procedimiento de envío insuficiente de franqueo (devolución al remitente si consta o tasa al destinatario para completar el franqueo más recargo reglamentario)',
      'Entregarla siempre como envío urgente gratuito',
      'Guardarla indefinidamente en la oficina más cercana',
    ],
    correctIndex: 1,
    explanation:
      'Los envíos sin franqueo o insuficientemente franqueados se devuelven al remitente para que complete el importe o, en defecto de remitente conocido, pueden cursarse tasados para que el destinatario abone la insuficiencia si acepta el envío.',
    reference: 'RD 1829/1999 · Insuficiencia de franqueo',
  },
  {
    id: 't7-06',
    topicId: 7,
    specialty: 'Clasificación',
    level: 4,
    question:
      '¿Qué son las Unidades de Admisión Masiva (UAM)?',
    options: [
      'Pequeñas oficinas auxiliares en zonas rurales de menos de 200 habitantes',
      'Centros especializados en la recepción, comprobación documental/física y pesaje de grandes remesas de envíos (bancos, administraciones, e-commerce)',
      'Buzones amarillos instalados en estaciones de tren',
      'Taquillas Citypaq de gran formato',
    ],
    correctIndex: 1,
    explanation:
      'Las UAM reciben grandes volúmenes de envíos preclasificados o en contenedores procedentes de grandes clientes con contrato, verificando el albarán de entrega, muestreo de pesos y condiciones de admisión.',
    reference: 'Procesos I Admisión · Admisión Masiva',
  },
  {
    id: 't7-07',
    topicId: 7,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Cuál es la regla general de dimensiones máximas para una caja o paquete estándar nacional (Largo + Alto + Ancho)?',
    options: [
      'Largo + Alto + Ancho ≤ 100 cm, sin que la mayor supere 50 cm',
      'Largo + Alto + Ancho ≤ 210 cm, sin que la mayor dimensión exceda de 120 cm (salvo condiciones especiales/extra)',
      'Largo + Alto + Ancho ≤ 300 cm siempre sin límite por lado',
      'Máximo 60 cm en total sumando las tres caras',
    ],
    correctIndex: 1,
    explanation:
      'De forma general en paquetería estándar (Paq Estándar / Premium), la suma de Largo + Alto + Ancho no debe superar los 210 cm ni la mayor dimensión los 120 cm (existiendo suplementos para envíos no estándar/voluminosos dentro de márgenes permitidos).',
    reference: 'Procesos I Admisión · Dimensiones máximas',
  },
  {
    id: 't7-08',
    topicId: 7,
    specialty: 'Reparto',
    level: 5,
    question:
      '¿Pueden los Servicios Rurales (carteros rurales) realizar admisión de envíos y ciertos servicios financieros en el ámbito rural?',
    options: [
      'No, los carteros rurales únicamente reparten cartas ordinarias',
      'Sí, a través de su PDA y terminal portátil realizan admisión de envíos, cobros y servicios como Correos Cash en el domicilio o puntos de atención rural',
      'Solo pueden recoger cartas para buzones sin emitir recibos',
      'Únicamente admiten telegramas en días festivos',
    ],
    correctIndex: 1,
    explanation:
      'Correos ha equipado a los carteros rurales con PDAs y dispositivos móviles para ofrecer prácticamente los mismos servicios de admisión, pago de recibos, envío de paquetes y Correos Cash directamente en las zonas rurales.',
    reference: 'Procesos I Admisión · Servicios Rurales',
  },

  // =========================================================
  // TEMA 8: PROCESOS OPERATIVOS II: TRATAMIENTO Y TRANSPORTE (8)
  // =========================================================
  {
    id: 't8-01',
    topicId: 8,
    specialty: 'Clasificación',
    level: 1,
    question:
      '¿Qué es un CTA dentro de la red logística y de tratamiento de Correos?',
    options: [
      'Centro de Tarifación Automática',
      'Centro de Tratamiento Automatizado, nodo donde se reciben, segregan, matasellan y clasifican los envíos para su encaminamiento',
      'Centro de Atención Telefónica al Usuario',
      'Contenedor de Transporte Aéreo exclusivo',
    ],
    correctIndex: 1,
    explanation:
      'Los Centros de Tratamiento Automatizado (CTA) constituyen el corazón logístico de clasificación de Correos, dotados de muelles de carga/descarga y maquinaria de clasificación automática y manual.',
    reference: 'Procesos II Tratamiento · Red CTA',
    errorHuntStatement: 'Un CTA es una oficina de ventanilla abierta exclusivamente para la venta de sellos.',
  },
  {
    id: 't8-02',
    topicId: 8,
    specialty: 'Clasificación',
    level: 2,
    question:
      'En la contenerización postal, ¿para qué se utilizan las bandejas de Tipo A, Tipo B y Tipo C?',
    options: [
      'Para transportar combustible de las motocicletas de reparto',
      'Para contener y proteger correspondencia normalizada (A), formato grande/flat (B) y envíos especiales o paquetería pequeña (C), optimizando su apilado en jaulas',
      'Para separar únicamente envíos internacionales por continente',
      'Para archivar nóminas y contratos en oficinas',
    ],
    correctIndex: 1,
    explanation:
      'Las bandejas normalizadas facilitan la ergonomía y protección de la carga: Tipo A para correspondencia normalizada, Tipo B para formato grande/flat y Tipo C para objetos de mayor espesor o paquetería ligera.',
    reference: 'Procesos II Tratamiento · Contenerización',
  },
  {
    id: 't8-03',
    topicId: 8,
    specialty: 'Clasificación',
    level: 2,
    question:
      '¿Qué representan los dos primeros dígitos de un Código Postal español de 5 cifras (por ejemplo, 28014 o 41001)?',
    options: [
      'El número de sección de reparto del cartero',
      'La provincia de destino (código INE de 01 a 52)',
      'El año de admisión del envío',
      'El distrito municipal dentro de la capital exclusivamente',
    ],
    correctIndex: 1,
    explanation:
      'En el código postal español de 5 dígitos, los dos primeros dígitos identifican la provincia (01 Álava hasta 50 Zaragoza, más 51 Ceuta y 52 Melilla), y los tres siguientes concretan la población, distrito postal o unidad de reparto.',
    reference: 'Procesos II Tratamiento · Estructura Código Postal',
    errorHuntStatement: 'Los dos primeros dígitos del código postal español indican el turno de trabajo del CTA.',
  },
  {
    id: 't8-04',
    topicId: 8,
    specialty: 'Clasificación',
    level: 3,
    question:
      '¿En qué consiste el proceso de "segregación" nada más descargar los envíos recogidos de buzones y oficinas en un CTA?',
    options: [
      'Entregarlos directamente a los carteros sin leer el destino',
      'Separar los envíos según sus características físicas y tratamiento requerido (normalizados mecanizables, flat, paquetes, urgentes/certificados o no mecanizables)',
      'Aplicar el sello de devolución a todos los sobres sin ventana',
      'Pesar uno a uno los sobres ordinarios de menos de 20 gramos',
    ],
    correctIndex: 1,
    explanation:
      'La segregación inicial separa los flujos para dirigir cada envío a la línea adecuada (máquinas CFC para normalizados, FSM para formatos grandes, clasificadora de paquetería o clasificación manual para formatos especiales).',
    reference: 'Procesos II Tratamiento · Fase de Segregación',
  },
  {
    id: 't8-05',
    topicId: 8,
    specialty: 'Clasificación',
    level: 3,
    question:
      '¿Qué finalidad tiene el matasellado de los envíos franqueados con sellos?',
    options: [
      'Decorar el sobre antes de devolverlo al remitente',
      'Inutilizar el sello para evitar su reutilización fraudulenta y dejar constancia de la fecha y centro de paso',
      'Aumentar el peso del sobre para mejorar la lectura óptica',
      'Sustituir la firma del destinatario en la entrega',
    ],
    correctIndex: 1,
    explanation:
      'El matasellado anula el signo de franqueo adherido e imprime la fecha y centro/unidad de tratamiento, impidiendo un segundo uso del sello.',
    reference: 'Procesos II Tratamiento · Matasellado',
  },
  {
    id: 't8-06',
    topicId: 8,
    specialty: 'Clasificación',
    level: 4,
    question:
      '¿Cómo se distinguen las fases de clasificación "primaria" y "secundaria" en el flujo logístico?',
    options: [
      'La primaria se realiza de día y la secundaria solo los domingos',
      'La primaria agrupa los envíos por grandes destinos (provincias, CTA o áreas zonales) y la secundaria los desglosa hasta el nivel de unidad de reparto o sección concreta',
      'La primaria es exclusiva de cartas y la secundaria de telegramas',
      'No hay distinción entre ambas fases',
    ],
    correctIndex: 1,
    explanation:
      'La clasificación primaria dirige los envíos hacia los grandes nodos provinciales o zonales, mientras que la secundaria afina el encaminamiento hacia cada Unidad de Reparto, oficina o sección postal.',
    reference: 'Procesos II Tratamiento · Clasificación primaria y secundaria',
  },
  {
    id: 't8-07',
    topicId: 8,
    specialty: 'Clasificación',
    level: 4,
    question:
      '¿Por qué es fundamental colocar etiquetas de destino claras y respetar las zonas de carga y precintado en los carros transportadores (jaulas)?',
    options: [
      'Para evitar que las jaulas puedan abrirse en el muelle de origen',
      'Para asegurar la trazabilidad del despacho, impedir extravíos en transbordos, garantizar la estabilidad de la carga durante el transporte y facilitar la descarga directa en destino',
      'Porque lo exige el código de circulación únicamente para motocicletas',
      'Para duplicar el peso facturable del transporte',
    ],
    correctIndex: 1,
    explanation:
      'El etiquetado correcto de jaulas/bandejas (etiqueta de despacho con código de barras), el reparto equilibrado del peso y el cierre/precintado evitan vuelcos, errores de ruta y pérdidas de trazabilidad en el transporte.',
    reference: 'Procesos II Transporte · Despachos y Jaulas',
  },
  {
    id: 't8-08',
    topicId: 8,
    specialty: 'Clasificación',
    level: 5,
    question:
      '¿Qué tipos principales de rutas articulan el transporte terrestre postal entre centros y unidades?',
    options: [
      'Rutas zonales (entre CTA de distintas regiones), rutas provinciales (entre el CTA y las oficinas/UR de su provincia) y enlaces locales',
      'Únicamente rutas ferroviarias de alta velocidad',
      'Rutas marítimas peninsulares entre provincias interiores',
      'Solo rutas realizadas por carteros a pie entre provincias',
    ],
    correctIndex: 0,
    explanation:
      'El transporte de Correos se estructura en rutas nacionales/zonales (grandes ejes nocturnos entre CTA), rutas provinciales (distribución capilar desde el CTA a oficinas y unidades de reparto) y enlaces locales.',
    reference: 'Procesos II Transporte · Red de Rutas',
  },

  // =========================================================
  // TEMA 9: PROCESOS OPERATIVOS III: ENTREGA / REPARTO (9)
  // =========================================================
  {
    id: 't9-01',
    topicId: 9,
    specialty: 'Reparto',
    level: 1,
    question:
      '¿Qué operación realiza el cartero cada mañana en su casillero antes de salir a la calle, consistente en ordenar la correspondencia siguiendo exactamente el itinerario secuencial de portales y calles de su sección?',
    options: ['Matasellado', 'Embarriado', 'Videocodificación', 'Franqueo en destino'],
    correctIndex: 1,
    explanation:
      'El embarriado es la ordenación secuencial de los envíos de una sección de reparto según el recorrido real de calles, números pares/impares y portales, optimizando el tiempo de entrega.',
    reference: 'Procesos III Entrega · Embarriado',
    errorHuntStatement: 'El embarriado consiste en pesar uno a uno todos los paquetes en el CTA central.',
  },
  {
    id: 't9-02',
    topicId: 9,
    specialty: 'Reparto',
    level: 2,
    question:
      'Durante cuánto tiempo (plazo de permanencia en lista) se conserva por regla general en oficina una carta certificada o paquete estándar tras dejar aviso de llegada (M4) por ausencia?',
    options: [
      '3 días hábiles',
      '15 días naturales',
      '45 días hábiles',
      '6 meses',
    ],
    correctIndex: 1,
    explanation:
      'Con carácter general, los envíos certificados y paquetería ordinaria avisados permanecen en lista de oficina a disposición del destinatario durante 15 días naturales (salvo plazos específicos como notificaciones administrativas: 7 días, o burofax: 30 días).',
    reference: 'Procesos III Entrega · Plazos de lista',
  },
  {
    id: 't9-03',
    topicId: 9,
    specialty: 'Reparto',
    level: 2,
    question:
      '¿A qué personas puede entregarse un envío registrado (carta certificada o paquete) en el domicilio del destinatario?',
    options: [
      'Solo al destinatario personalmente, jamás a un familiar',
      'Al propio destinatario o a cualquier persona que se encuentre en su domicilio (mayor de edad/identificada con DNI/NIE/Pasaporte) que haga constar su identidad y firme, salvo indicación expresa de "Entrega Exclusiva al Destinatario" (EED)',
      'A cualquier transeúnte que pase por el portal',
      'Siempre en el buzón exterior aunque requiera firma',
    ],
    correctIndex: 1,
    explanation:
      'Salvo que el envío lleve el servicio adicional de Entrega Exclusiva al Destinatario (EED) o sea un producto con restricción específica, puede entregarse en el domicilio a un familiar o persona presente debidamente identificada y que firme la recepción.',
    reference: 'RD 1829/1999 · Entrega domiciliaria',
  },
  {
    id: 't9-04',
    topicId: 9,
    specialty: 'Reparto',
    level: 3,
    question:
      '¿Qué debe hacer el cartero si el destinatario de un envío certificado o notificación manifiesta expresamente que "rehúsa" recibirlo?',
    options: [
      'Introducirlo a la fuerza en el buzón del portal',
      'Registrar el estado "Rehusado" en la PDA, recabar si es posible la firma de rehúse (o hacer constar la negativa según normativa en notificaciones) y devolver el envío a origen / trámite correspondiente',
      'Dejar aviso de llegada para que vaya a recogerlo a la oficina 15 días',
      'Entregárselo al presidente de la comunidad de vecinos',
    ],
    correctIndex: 1,
    explanation:
      'Si el destinatario rechaza el envío, se registra como Rehusado. En notificaciones administrativas (Art. 41.5 Ley 39/2015), el rechazo por el interesado o su representante hace constar la circunstancia en el expediente y se tiene por efectuado el trámite.',
    reference: 'Procesos III Entrega · Rehúse y Ley 39/2015',
  },
  {
    id: 't9-05',
    topicId: 9,
    specialty: 'Reparto',
    level: 3,
    question:
      '¿Qué se necesita presentar para retirar un envío avisado en la oficina de Correos cuando acude una persona autorizada en nombre del destinatario?',
    options: [
      'Únicamente el aviso de llegada M4 sin ningún documento de identidad',
      'Autorización firmada por el destinatario, fotocopia/exhibición del documento identificativo del destinatario (o datos verificables según normativa) y el DNI/NIE/Pasaporte original de la persona autorizada que retira',
      'Una llamada telefónica del cartero',
      'Un certificado de empadronamiento reciente',
    ],
    correctIndex: 1,
    explanation:
      'Para entregas en oficina a un autorizado se exige el documento de autorización debidamente cumplimentado (reverso del aviso o escrito), copia/acreditación del documento del titular y el documento oficial original vigente del autorizado.',
    reference: 'Procesos III Entrega · Entrega a autorizados',
  },
  {
    id: 't9-06',
    topicId: 9,
    specialty: 'Reparto',
    level: 4,
    question:
      'En una finca urbana con buzón concentrador (casillero domiciliario), ¿cuál es el orden correcto de entrega cuando un envío ordinario tiene unas dimensiones que no caben por la boca del buzón?',
    options: [
      'Dejarlo apoyado encima de los buzones a la vista de cualquiera',
      'Intentar la entrega en mano en el piso o, si no es posible en envíos ordinarios voluminosos/paquetería, seguir el procedimiento de aviso o devolución según tipo de producto',
      'Doblar o romper el contenido del envío hasta que entre por la ranura',
      'Entregárselo al comercio de enfrente sin permiso',
    ],
    correctIndex: 1,
    explanation:
      'Nunca se debe dañar ni abandonar correspondencia sobre los buzones por seguridad y secreto postal; si no cabe sin riesgo de deterioro o sustracción, se intenta entregar en el domicilio o se tramita según protocolo.',
    reference: 'Procesos III Entrega · Seguridad en buzones',
  },
  {
    id: 't9-07',
    topicId: 9,
    specialty: 'Reparto',
    level: 4,
    question:
      '¿Cómo se gestiona un envío postal cuya modalidad incluye "Entrega con Reembolso"?',
    options: [
      'Se entrega primero al destinatario y Correos le envía una factura a final de mes',
      'No se puede entregar el envío sin cobrar previamente el importe exacto del reembolso indicado (en efectivo dentro de límites legales o medios habilitados en PDA/oficina)',
      'Se cobra solo la mitad si el paquete pesa menos de 1 kg',
      'El cartero adelanta el dinero de su bolsillo al remitente',
    ],
    correctIndex: 1,
    explanation:
      'El contra reembolso condiciona la entrega al pago previo por el destinatario del importe fijado por el remitente, que el cartero o la oficina liquida después para su abono al remitente.',
    reference: 'Procesos III Entrega · Reembolso',
  },
  {
    id: 't9-08',
    topicId: 9,
    specialty: 'Reparto',
    level: 5,
    question:
      'En el caso de las Notificaciones Administrativas avisadas en buzón tras dos intentos infructuosos en domicilio, ¿cuánto tiempo permanecen en lista en la oficina antes de su devolución al organismo remitente?',
    options: ['15 días naturales', '7 días naturales', '30 días hábiles', '2 días naturales'],
    correctIndex: 1,
    explanation:
      'Por norma general operativa de Correos para notificaciones administrativas (Ley 39/2015), el plazo de permanencia en lista en la oficina tras el segundo intento es de 7 días naturales.',
    reference: 'Procesos III Entrega · Lista de Notificaciones',
    errorHuntStatement: 'Las notificaciones administrativas permanecen 30 días hábiles en lista de oficina tras el segundo intento.',
  },
  {
    id: 't9-09',
    topicId: 9,
    specialty: 'Reparto',
    level: 5,
    question:
      '¿Qué indica la sigla "USE" dentro de la estructura operativa de distribución de Correos?',
    options: [
      'Unidad de Servicios Especiales, dedicada principalmente al reparto urgente y paquetería',
      'Unidad de Sellos Especiales',
      'Unión Sindical de Empleados',
      'Unidad de Seguridad Electrónica',
    ],
    correctIndex: 0,
    explanation:
      'Las Unidades de Servicios Especiales (USE) son unidades operativas centradas en la distribución de paquetería, envíos urgentes (Paq Premium, Paq Today, Burofax) y grandes volúmenes con vehículos ligeros y furgonetas.',
    reference: 'Procesos III Entrega · Unidades Operativas (UR/USE)',
  },

  // =========================================================
  // TEMA 10: PROTECCIÓN DE DATOS (RGPD / LOPDGDD) (8)
  // =========================================================
  {
    id: 't10-01',
    topicId: 10,
    specialty: 'General',
    level: 1,
    question:
      '¿Qué normativa europea y española constituye el marco principal de Protección de Datos Personales aplicable en Correos?',
    options: [
      'El Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD)',
      'La Ley 15/1999 (LOPD) en su integridad vigente',
      'La Ley 43/2010 exclusivamente',
      'El Real Decreto 99/2023 de salarios mínimos',
    ],
    correctIndex: 0,
    explanation:
      'La protección de datos se rige por el Reglamento General de Protección de Datos (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).',
    reference: 'RGPD (UE) 2016/679 · LOPDGDD 3/2018',
    errorHuntStatement: 'En España la única norma vigente de protección de datos es la antigua LOPD 15/1999.',
  },
  {
    id: 't10-02',
    topicId: 10,
    specialty: 'General',
    level: 2,
    question:
      '¿Qué significan las siglas ARSULIPO en relación con los derechos de los ciudadanos sobre sus datos personales?',
    options: [
      'Archivo, Registro, Subsanación, Uso, Localización, Impresión, Portabilidad y Ordenación',
      'Acceso, Rectificación, Supresión, Limitación del tratamiento, Portabilidad y Oposición',
      'Autorización, Recogida, Seguridad, Utilidad, Licencia, Identidad y Pago',
      'Acceso, Renovación, Seguridad, Urgencia, Listado y Postal',
    ],
    correctIndex: 1,
    explanation:
      'El RGPD reconoce los derechos de Acceso, Rectificación, Supresión ("derecho al olvido"), Limitación del tratamiento, Portabilidad y Oposición (conocidos mnemotécnicamente como ARSULIPO).',
    reference: 'RGPD · Arts. 15 a 22',
  },
  {
    id: 't10-03',
    topicId: 10,
    specialty: 'General',
    level: 2,
    question:
      'Según el principio de "minimización de datos" del RGPD, ¿qué datos deben recogerse y tratarse en una operativa postal?',
    options: [
      'Todos los posibles por si en el futuro resultan útiles para campañas comerciales',
      'Únicamente los datos adecuados, pertinentes y limitados a lo estrictamente necesario en relación con los fines para los que son tratados',
      'Al menos el teléfono, profesión y estado civil del destinatario en toda entrega',
      'Solo datos médicos y biométricos',
    ],
    correctIndex: 1,
    explanation:
      'El principio de minimización prohíbe recabar o conservar más datos personales de los estrictamente indispensables para prestar el servicio postal o cumplir una obligación legal.',
    reference: 'RGPD · Art. 5.1.c',
  },
  {
    id: 't10-04',
    topicId: 10,
    specialty: 'Oficinas',
    level: 3,
    question:
      'Si se produce una violación o brecha de seguridad de datos personales que entrañe riesgo para los derechos de las personas, ¿en qué plazo máximo debe notificarse a la Agencia Española de Protección de Datos (AEPD)?',
    options: [
      'En un plazo máximo de 15 días hábiles',
      'Sin dilación indebida y, de ser posible, a más tardar en 72 horas después de haber tenido constancia de ella',
      'A final del ejercicio fiscal anual',
      'Solo si lo solicitan por escrito más de diez clientes',
    ],
    correctIndex: 1,
    explanation:
      'El artículo 33 del RGPD exige notificar las brechas de seguridad a la autoridad de control competente (AEPD) en un plazo máximo de 72 horas desde que se tiene constancia, comunicándolo internamente de inmediato al DPD/área de seguridad.',
    reference: 'RGPD · Art. 33',
    errorHuntStatement: 'Las brechas de seguridad de datos personales disponen de 30 días naturales para notificarse a la AEPD.',
  },
  {
    id: 't10-05',
    topicId: 10,
    specialty: 'Reparto',
    level: 3,
    question:
      '¿Puede un cartero o empleado de oficina consultar en SGIE o IRIS los envíos recibidos por un familiar, vecino o personaje público por simple curiosidad?',
    options: [
      'Sí, siempre que no imprima ningún documento',
      'No; constituye una vulneración grave del deber de confidencialidad, secreto profesional y acceso indebido a datos personales, sancionable disciplinariamente',
      'Sí, si conoce el número de DNI de esa persona',
      'Solo fuera del horario de atención al público',
    ],
    correctIndex: 1,
    explanation:
      'El acceso a los sistemas corporativos está estrictamente vinculado al desempeño de las funciones asignadas. Consultar datos de terceros sin causa operativa infringe el RGPD, la LOPDGDD y el Código de Conducta.',
    reference: 'LOPDGDD Art. 5 · Deber de confidencialidad',
  },
  {
    id: 't10-06',
    topicId: 10,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Qué figura supervisa el cumplimiento de la normativa de protección de datos dentro de Correos y sirve de punto de contacto con la AEPD y los interesados?',
    options: [
      'El Delegado de Protección de Datos (DPD / DPO)',
      'El Jefe de Muelles del CTA',
      'El interventor sindical de zona',
      'El inspector de tráfico de la DGT',
    ],
    correctIndex: 0,
    explanation:
      'El Delegado de Protección de Datos (DPD) asesora, supervisa el cumplimiento normativo del RGPD/LOPDGDD y atiende a ciudadanos y a la AEPD en materia de privacidad.',
    reference: 'RGPD · Arts. 37-39',
  },
  {
    id: 't10-07',
    topicId: 10,
    specialty: 'Reparto',
    level: 4,
    question:
      'En una oficina o unidad de reparto, ¿cómo deben desecharse los listados en papel, etiquetas erróneas o documentos con nombres, direcciones y DNIs de clientes?',
    options: [
      'En la papelera normal de residuos orgánicos o reciclaje abierto',
      'Mediante destructora de papel o contenedores seguros de destrucción confidencial',
      'Utilizándolos por la cara trasera como folios de notas para clientes',
      'Dejándolos junto a los buzones exteriores',
    ],
    correctIndex: 1,
    explanation:
      'Cualquier soporte físico con datos personales inservible debe destruirse de forma irreversible (destructora o contenedor seguro) para impedir la exposición accidental de datos a terceros.',
    reference: 'Seguridad física · Destrucción confidencial',
  },
  {
    id: 't10-08',
    topicId: 10,
    specialty: 'General',
    level: 5,
    question:
      '¿Con qué plazo cuenta el responsable del tratamiento para responder a un ciudadano que ejerce un derecho ARSULIPO (como acceso o supresión), con carácter general?',
    options: ['10 días naturales', '1 mes desde la recepción de la solicitud (prorrogable 2 meses en casos complejos)', '6 meses', '24 horas exactas'],
    correctIndex: 1,
    explanation:
      'El RGPD establece el plazo general de 1 mes a partir de la recepción de la solicitud, pudiendo prorrogarse otros 2 meses si la complejidad o número de solicitudes lo justifica, informando al interesado.',
    reference: 'RGPD · Art. 12.3',
  },

  // =========================================================
  // TEMA 11: PREVENCIÓN DE BLANQUEO DE CAPITALES (PBC/FT) (8)
  // =========================================================
  {
    id: 't11-01',
    topicId: 11,
    specialty: 'Oficinas',
    level: 1,
    question:
      '¿Por qué actividad principal tiene Correos la condición de "sujeto obligado" según la Ley 10/2010 de Prevención del Blanqueo de Capitales y de la Financiación del Terrorismo?',
    options: [
      'Por la venta de sellos conmemorativos',
      'Por la prestación del servicio de giros postales y servicios de pago / transferencias',
      'Por el reparto de publicidad directa sin dirección',
      'Por la instalación de buzones amarillos en la vía pública',
    ],
    correctIndex: 1,
    explanation:
      'El artículo 2.1.j) de la Ley 10/2010 incluye expresamente a las entidades dedicadas profesionalmente a los servicios de giro postal o transferencias de fondos como sujetos obligados en PBC/FT.',
    reference: 'Ley 10/2010 · Art. 2.1.j',
    errorHuntStatement: 'Correos está exento de cumplir la Ley 10/2010 de Blanqueo de Capitales por ser una sociedad pública.',
  },
  {
    id: 't11-02',
    topicId: 11,
    specialty: 'Oficinas',
    level: 2,
    question:
      'En aplicación de las medidas de diligencia debida al tramitar un giro postal o envío de dinero en oficina, ¿qué debe hacer obligatoriamente el operador de ventanilla?',
    options: [
      'Aceptar una fotografía borrosa del carné en el móvil del cliente',
      'Identificar formalmente al cliente mediante documento oficial fehaciente y en vigor (DNI, NIE o Pasaporte) antes de ejecutar la operación',
      'Pedir únicamente el nombre verbalmente si el importe es inferior a 1.000 euros',
      'Solicitar únicamente la tarjeta sanitaria autonómica',
    ],
    correctIndex: 1,
    explanation:
      'La identificación formal exige comprobar un documento fehaciente con fotografía y en vigor (DNI, tarjeta de residencia/NIE o pasaporte) previo al establecimiento de la relación de negocio o ejecución de operaciones ocasionales sujetas a control.',
    reference: 'Ley 10/2010 · Art. 3 Identificación formal',
  },
  {
    id: 't11-03',
    topicId: 11,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Cuál es la autoridad u órgano nacional de inteligencia financiera en España encargada de recibir las comunicaciones por indicio de blanqueo de capitales?',
    options: [
      'El SEPBLAC (Servicio Ejecutivo de la Comisión de Prevención del Blanqueo de Capitales)',
      'La CNMC',
      'El Defensor del Pueblo',
      'La Oficina de Patentes y Marcas',
    ],
    correctIndex: 0,
    explanation:
      'El SEPBLAC es la Unidad de Inteligencia Financiera de España y autoridad supervisora ante la que los sujetos obligados (a través de su Órgano de Control Interno) reportan las operaciones sospechosas.',
    reference: 'Ley 10/2010 · SEPBLAC',
  },
  {
    id: 't11-04',
    topicId: 11,
    specialty: 'Oficinas',
    level: 3,
    question:
      'Si un empleado de Correos detecta una operativa inusual o sospechosa (por ejemplo, fraccionamiento reiterado de giros para eludir umbrales) y la comunica internamente, ¿qué debe hacer frente al cliente?',
    options: [
      'Advertirle amablemente de que va a ser reportado al SEPBLAC para que no vuelva',
      'Guardar absoluta reserva y prohibición de revelación ("tipping-off"): nunca informar al cliente ni a terceros de que la operación está siendo analizada o comunicada',
      'Publicar un aviso en el tablón de la oficina',
      'Pedirle que rellene el informe del SEPBLAC personalmente',
    ],
    correctIndex: 1,
    explanation:
      'El artículo 24 de la Ley 10/2010 prohíbe terminantemente revelar al cliente o a terceros que se ha comunicado información o que se está examinando una operación por sospecha de blanqueo (prohibición de revelación).',
    reference: 'Ley 10/2010 · Art. 24 Prohibición de revelación',
    errorHuntStatement: 'El empleado de oficina debe avisar al cliente por escrito cuando remite una alerta sospechosa al SEPBLAC.',
  },
  {
    id: 't11-05',
    topicId: 11,
    specialty: 'Oficinas',
    level: 3,
    question:
      '¿Durante cuántos años deben conservar los sujetos obligados la documentación obtenida en cumplimiento de las obligaciones de diligencia debida en PBC/FT?',
    options: ['2 años', '5 años', '10 años', '25 años'],
    correctIndex: 2,
    explanation:
      'La Ley 10/2010 establece un periodo obligatorio de conservación de documentos y registros de operaciones de 10 años desde la terminación de la relación de negocio o ejecución de la operación ocasional.',
    reference: 'Ley 10/2010 · Art. 25 Conservación',
  },
  {
    id: 't11-06',
    topicId: 11,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Qué es el "pitufeo" o fraccionamiento en el contexto de la prevención del blanqueo de capitales?',
    options: [
      'Clasificar cartas pequeñas en bandejas Tipo A',
      'Dividir una suma elevada de dinero en múltiples operaciones de menor importe (por distintos clientes o en varias oficinas/días) para intentar eludir controles e importes límite',
      'Realizar descuentos comerciales a clientes habituales',
      'Cambiar billetes deteriorados en el Banco de España',
    ],
    correctIndex: 1,
    explanation:
      'El fraccionamiento ("smurfing" o "pitufeo") es una tipología clásica de alerta consistente en trocear importes significativos en múltiples giros o transferencias pequeñas para esquivar los umbrales de control.',
    reference: 'PBC/FT · Señales de alerta',
  },
  {
    id: 't11-07',
    topicId: 11,
    specialty: 'General',
    level: 4,
    question:
      '¿Ante qué órgano interno de Correos deben canalizar los empleados las alertas o comunicaciones internas de operaciones sospechosas en materia de PBC/FT?',
    options: [
      'Ante el Órgano de Control Interno (OCI) / Unidad Técnica de PBC de Correos',
      'Directamente en redes sociales corporativas',
      'Ante cualquier oficina de correos de otra provincia',
      'Ante el servicio de paquetería Correos Express',
    ],
    correctIndex: 0,
    explanation:
      'Todo empleado debe reportar internamente cualquier indicio de operación sospechosa a través de los canales establecidos hacia el Órgano de Control Interno (OCI) de Correos, que analiza el caso y decide su comunicación al SEPBLAC.',
    reference: 'Ley 10/2010 · Art. 26 Control Interno',
  },
  {
    id: 't11-08',
    topicId: 11,
    specialty: 'Oficinas',
    level: 5,
    question:
      '¿Qué debe hacerse si un cliente se niega a facilitar la documentación acreditativa de su identidad o el propósito/origen de los fondos cuando es requerido por normativa PBC/FT?',
    options: [
      'Ejecutar el giro igualmente para evitar quejas en ventanilla',
      'Abstenerse de realizar la operación / rechazar la relación de negocio',
      'Registrar la operación a nombre de otro cliente que sí tenga DNI',
      'Aceptar un recibo de luz en lugar del DNI',
    ],
    correctIndex: 1,
    explanation:
      'Cuando no puedan aplicarse las medidas de diligencia debida obligatorias (falta de identificación fehaciente o negativa del cliente), el sujeto obligado debe abstenerse de ejecutar la operación.',
    reference: 'Ley 10/2010 · Art. 7.3 Abstención',
  },

  // =========================================================
  // TEMA 12: ÉTICA, TRANSPARENCIA Y CIBERSEGURIDAD (9)
  // =========================================================
  {
    id: 't12-01',
    topicId: 12,
    specialty: 'General',
    level: 1,
    question:
      'Según el Código General de Conducta de Correos, ¿cómo debe actuar un empleado si un proveedor o cliente habitual le ofrece un regalo de valor económico o comisión para agilizar trámites?',
    options: [
      'Aceptarlo si el valor no supera los 100 euros',
      'Rechazarlo de plano; rige tolerancia cero frente a sobornos, regalos, favores o ventajas que puedan comprometer la objetividad e integridad',
      'Aceptarlo y repartirlo entre los compañeros de la unidad',
      'Guardarlo hasta final de año sin decir nada',
    ],
    correctIndex: 1,
    explanation:
      'El Código General de Conducta prohíbe aceptar o solicitar regalos, dádivas, favores o beneficios de clientes, proveedores o terceros que puedan influir o aparentar influir en las decisiones profesionales.',
    reference: 'Código General de Conducta · Correos',
    errorHuntStatement: 'Los empleados pueden aceptar gratificaciones económicas de proveedores siempre que sean fuera de horario laboral.',
  },
  {
    id: 't12-02',
    topicId: 12,
    specialty: 'General',
    level: 2,
    question:
      '¿Qué es el "smishing", una de las ciberestafas más frecuentes que suplantan la identidad de Correos?',
    options: [
      'Un fallo mecánico en las máquinas clasificadoras de cartas',
      'Envío de mensajes SMS fraudulentos suplantando a Correos (por ejemplo, "su paquete está retenido, pague una tasa en este enlace") para robar credenciales o datos bancarios',
      'Un sistema oficial de aviso de llegada de cartas certificadas con pago previo',
      'Una herramienta de mensajería interna entre oficinas',
    ],
    correctIndex: 1,
    explanation:
      'El smishing es una variante del phishing realizada por SMS. Los ciberdelincuentes simulan ser Correos solicitando pequeñas tasas aduaneras o actualización de dirección mediante enlaces maliciosos.',
    reference: 'Ciberseguridad · Ingeniería Social y Smishing',
  },
  {
    id: 't12-03',
    topicId: 12,
    specialty: 'Oficinas',
    level: 2,
    question:
      'Si un operador de oficina o clasificación se levanta de su puesto de trabajo con sesión iniciada en IRIS o SGIE aunque sea por un minuto, ¿qué medida básica de Seguridad de la Información es obligatoria?',
    options: [
      'Dejar la pantalla abierta para que un compañero pueda usar su usuario',
      'Bloquear la sesión del equipo (Ctrl+Alt+Supr / Win+L) y nunca compartir credenciales ni contraseñas personales',
      'Apuntar su contraseña en un post-it pegado al monitor',
      'Cerrar el edificio completo',
    ],
    correctIndex: 1,
    explanation:
      'Las credenciales son personales e intransferibles. Todo usuario debe bloquear la pantalla al ausentarse del puesto y proteger sus contraseñas para garantizar la trazabilidad y evitar accesos no autorizados.',
    reference: 'Seguridad de la Información · Control de acceso',
  },
  {
    id: 't12-04',
    topicId: 12,
    specialty: 'General',
    level: 3,
    question:
      '¿Qué garantiza el Canal Ético de Correos (Sistema Interno de Información, Ley 2/2023) a cualquier empleado o tercero que comunique de buena fe una posible irregularidad?',
    options: [
      'La publicación inmediata del nombre del denunciante en la intranet',
      'Confidencialidad (posibilidad de comunicación anónima) y prohibición estricta de represalias contra el informante',
      'Un premio económico automático del 10 % de la sanción',
      'La obligación de acudir primero a los medios de comunicación',
    ],
    correctIndex: 1,
    explanation:
      'El Canal Ético permite reportar incumplimientos normativos o del Código de Conducta de manera confidencial o anónima, garantizando la protección del informante frente a cualquier represalia.',
    reference: 'Canal Ético · Ley 2/2023',
  },
  {
    id: 't12-05',
    topicId: 12,
    specialty: 'General',
    level: 3,
    question:
      'En materia de Transparencia Pública (Ley 19/2013), ¿qué obligación tiene Correos como sociedad mercantil estatal incluida en su ámbito?',
    options: [
      'Publicar información institucional, organizativa, económica, contratos y subvenciones en su Portal de Transparencia y atender solicitudes de acceso a información pública',
      'Publicar los datos médicos y direcciones privadas de todos sus clientes',
      'Está totalmente excluida de la Ley de Transparencia',
      'Solo publica sus cuentas cada diez años',
    ],
    correctIndex: 0,
    explanation:
      'Correos cumple con las obligaciones de publicidad activa (Portal de Transparencia: presupuestos, contratos, retribuciones de alta dirección, estructura) y derecho de acceso a la información pública dentro de los límites legales.',
    reference: 'Ley 19/2013 · Transparencia',
  },
  {
    id: 't12-06',
    topicId: 12,
    specialty: 'Reparto',
    level: 4,
    question:
      '¿Qué debe evitar un trabajador respecto a los dispositivos corporativos (PDA, ordenadores, USB) y correos electrónicos sospechosos?',
    options: [
      'Conectar memorias USB personales o desconocidas en equipos corporativos y abrir archivos adjuntos inesperados con macros o remitentes falsificados',
      'Actualizar el sistema cuando lo indica el departamento de TI',
      'Cerrar sesión al finalizar la jornada laboral',
      'Informar al Centro de Atención al Usuario (CAU) ante un correo sospechoso',
    ],
    correctIndex: 0,
    explanation:
      'Conectar dispositivos externos no autorizados o abrir adjuntos/enlaces de correos phishing es la principal vía de entrada de malware y ransomware en las redes corporativas.',
    reference: 'Ciberseguridad · Uso seguro de dispositivos',
  },
  {
    id: 't12-07',
    topicId: 12,
    specialty: 'General',
    level: 4,
    question:
      '¿Qué situación constituye un "conflicto de intereses" según el Código General de Conducta?',
    options: [
      'Trabajar en turno de tarde cuando se prefiere turno de mañana',
      'Tener intereses personales, familiares o económicos que puedan interferir con la objetividad e imparcialidad exigibles en una decisión o contratación de Correos',
      'Formar parte de dos grupos de estudio internos',
      'Solicitar un cambio de localidad por concurso de traslados',
    ],
    correctIndex: 1,
    explanation:
      'Existe conflicto de intereses cuando un interés privado del empleado o su entorno cercano puede comprometer su juicio profesional independiente; debe comunicarse y abstenerse de intervenir.',
    reference: 'Código General de Conducta · Conflicto de intereses',
  },
  {
    id: 't12-08',
    topicId: 12,
    specialty: 'Clasificación',
    level: 5,
    question:
      '¿Cuáles son los tres pilares clásicos de la Seguridad de la Información (tríada CIA)?',
    options: [
      'Confidencialidad, Integridad y Disponibilidad',
      'Celeridad, Impresión y Archivo',
      'Control, Inspección y Ahorro',
      'Clasificación, Identificación y Aduana',
    ],
    correctIndex: 0,
    explanation:
      'La Seguridad de la Información protege tres propiedades esenciales: Confidencialidad (solo accede quien tiene permiso), Integridad (los datos no se alteran indebidamente) y Disponibilidad (están accesibles cuando se necesitan).',
    reference: 'Seguridad de la Información · ISO 27001 / ENS',
    errorHuntStatement: 'Los tres pilares de la Seguridad de la Información son Publicidad, Rentabilidad y Ahorro.',
  },
  {
    id: 't12-09',
    topicId: 12,
    specialty: 'General',
    level: 5,
    question:
      '¿Qué es la "ingeniería social" en el ámbito de la ciberseguridad?',
    options: [
      'El diseño ergonómico de las oficinas de atención al público',
      'Conjunto de técnicas de manipulación psicológica para engañar a personas y conseguir que revelen contraseñas, datos confidenciales o realicen acciones inseguras',
      'El estudio estadístico de rutas postales urbanas',
      'La programación de aplicaciones móviles corporativas',
    ],
    correctIndex: 1,
    explanation:
      'La ingeniería social explota la confianza, urgencia o miedo de las víctimas (phishing, vishing telefónico, smishing, suplantación de superiores) para obtener credenciales o accesos sin vulnerar directamente el software.',
    reference: 'Ciberseguridad · Ingeniería Social',
  },

  // =========================================================
  // PREGUNTAS EXTRA DE TEMARIO (PARA LLEGAR A 100 DE TEMARIO)
  // =========================================================
  {
    id: 't1-10',
    topicId: 1,
    specialty: 'Oficinas',
    level: 5,
    question:
      '¿Qué norma reglamentaria desarrolla la prestación de los servicios postales en España en todo aquello que no contradiga a la Ley 43/2010?',
    options: [
      'El Real Decreto 1829/1999, de 3 de diciembre',
      'El Código de Comercio de 1885 únicamente',
      'La Ley de Enjuiciamiento Civil',
      'El Reglamento de Servicios Ferroviarios',
    ],
    correctIndex: 0,
    explanation:
      'El Real Decreto 1829/1999 aprobó el Reglamento por el que se regula la prestación de los servicios postales y sigue aplicándose en lo que no se oponga a la Ley 43/2010 (mientras no se apruebe un nuevo reglamento completo).',
    reference: 'RD 1829/1999 · Reglamento Postal',
  },
  {
    id: 't3-10',
    topicId: 3,
    specialty: 'Oficinas',
    level: 3,
    question:
      'En un envío de Carta Certificada o Paquete con "Valor Declarado", ¿qué cubre exactamente ese servicio adicional?',
    options: [
      'Asegura el contenido frente a pérdida, robo o deterioro hasta el importe declarado por el remitente',
      'Garantiza la entrega en menos de 2 horas',
      'Exime del pago de aduanas internacionales',
      'Permite enviar dinero en efectivo dentro de una carta ordinaria sin declarar',
    ],
    correctIndex: 0,
    explanation:
      'El Valor Declarado es una garantía adicional mediante la cual se asegura el contenido del envío hasta la cantidad declarada por el cliente (dentro de los límites máximos del producto), abonando la tarifa correspondiente.',
    reference: 'Servicios Adicionales · Valor Declarado',
  },
  {
    id: 't4-10',
    topicId: 4,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Cuál es la finalidad del "Apartado Postal" contratado por particulares o empresas en una oficina de Correos?',
    options: [
      'Disponer de un casillero numerado en la oficina para recibir correspondencia y avisos con privacidad y flexibilidad de horario de recogida',
      'Enviar paquetes sin pagar franqueo durante un año',
      'Almacenar mercancías paletizadas de más de 500 kg',
      'Tramitar únicamente notificaciones judiciales por SMS',
    ],
    correctIndex: 0,
    explanation:
      'El Apartado Postal asigna un número propio en oficina donde se deposita la correspondencia dirigida a ese apartado (y avisos de envíos registrados/paquetes) para que el titular la recoja cómodamente.',
    reference: 'Productos en Oficinas · Apartado Postal',
  },
  {
    id: 't6-09',
    topicId: 6,
    specialty: 'Oficinas',
    level: 2,
    question:
      '¿Qué documento o comprobante genera IRIS al admitir un envío certificado o paquete en ventanilla?',
    options: [
      'Un resguardo / justificante de admisión con el código de seguimiento del envío, fecha, hora y tarifa abonada',
      'Un aviso de llegada M4 para el propio remitente',
      'Una tarjeta Correos Prepago automática',
      'Ninguno; no se emiten recibos en ventanilla',
    ],
    correctIndex: 0,
    explanation:
      'Al finalizar la admisión de un envío registrado en IRIS, se entrega al cliente el resguardo justificante con el código único de trazabilidad para consultar el estado del envío.',
    reference: 'Herramientas · IRIS Admisión',
  },
  {
    id: 't7-09',
    topicId: 7,
    specialty: 'General',
    level: 2,
    question:
      'Al preparar la dirección postal en el anverso de un envío, ¿en qué orden estándar deben figurar los datos del destinatario para facilitar la lectura óptica OCR?',
    options: [
      'País en primera línea, código postal arriba y nombre al final',
      'Nombre/Razón social, vía pública (calle/número/piso/puerta), y en la última línea el Código Postal seguido de la Localidad (y provincia/país si procede)',
      'Únicamente el teléfono móvil y el correo electrónico',
      'En el reverso del sobre junto a la solapa de cierre',
    ],
    correctIndex: 1,
    explanation:
      'La normalización de direcciones exige situar el bloque del destinatario en la zona inferior derecha del anverso, terminando con Código Postal + Localidad en mayúsculas y evitando subrayados o textos debajo que confundan al lector OCR.',
    reference: 'Procesos I Admisión · Normalización de direcciones',
  },
  {
    id: 't8-09',
    topicId: 8,
    specialty: 'Clasificación',
    level: 2,
    question:
      '¿Qué indica la letra "F" o formato "Flat" en el tratamiento postal?',
    options: [
      'Envío frágil de vidrio de más de 25 kg',
      'Correspondencia plana de gran formato (revistas, catálogos, sobres grandes hasta determinados espesores) superior al formato normalizado estándar',
      'Envío urgente internacional aéreo exclusivamente',
      'Cartas devueltas sin remitente',
    ],
    correctIndex: 1,
    explanation:
      'En la operativa de tratamiento de Correos, los envíos Flat son piezas planas de dimensiones superiores a la carta normalizada (hasta aprox. 38 × 23 × 2 cm según máquina FSM), diferenciadas de la paquetería.',
    reference: 'Procesos II Tratamiento · Formatos',
  },
  {
    id: 't9-10',
    topicId: 9,
    specialty: 'Reparto',
    level: 3,
    question:
      '¿Qué es el "Reenvío Postal" contratado por un ciudadano ante un cambio de domicilio?',
    options: [
      'Devolver todos sus envíos al remitente con coste extra',
      'Servicio mediante el cual la correspondencia que llega a la antigua dirección se reencamina automáticamente durante el periodo contratado al nuevo domicilio indicado',
      'Reenviar únicamente telegramas internacionales',
      'Cambiar el código postal oficial del municipio',
    ],
    correctIndex: 1,
    explanation:
      'El Reenvío Postal permite recibir en el nuevo domicilio (temporal o definitivo) los envíos remitidos a la dirección anterior durante 1, 2 o 6 meses contratados.',
    reference: 'Procesos III Entrega · Reenvío Postal',
  },
  {
    id: 't10-09',
    topicId: 10,
    specialty: 'General',
    level: 3,
    question:
      'Cuando se habla de "pseudonimización" en el RGPD, ¿a qué técnica se refiere?',
    options: [
      'Publicar los datos con un apodo en un tablón público',
      'Tratar datos personales de manera que ya no puedan atribuirse a un interesado sin utilizar información adicional, que figura por separado y sujeta a medidas técnicas/organizativas',
      'Eliminar de forma permanente y definitiva toda base de datos',
      'Sustituir la firma del destinatario por la del cartero',
    ],
    correctIndex: 1,
    explanation:
      'La pseudonimización reduce los riesgos para los interesados al sustituir identificadores directos por códigos o seudónimos cuya tabla de equivalencia se custodia por separado (a diferencia de la anonimización, que es irreversible).',
    reference: 'RGPD · Art. 4.5',
  },
  {
    id: 't11-09',
    topicId: 11,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿A quién se considera "Persona con Responsabilidad Pública" (PRP / PEP) en Prevención de Blanqueo de Capitales?',
    options: [
      'A cualquier funcionario de carrera del Grupo C2',
      'A personas que desempeñan o han desempeñado funciones públicas importantes (jefes de Estado, ministros, parlamentarios, altos cargos judiciales/militares o directivos de empresas públicas), requiriendo medidas reforzadas de diligencia debida',
      'Exclusivamente a periodistas acreditados',
      'A todos los clientes mayores de 65 años',
    ],
    correctIndex: 1,
    explanation:
      'La Ley 10/2010 exige aplicar medidas reforzadas de diligencia debida (autorización superior, comprobación del origen de fondos y seguimiento continuo) cuando intervienen Personas con Responsabilidad Pública (PRP).',
    reference: 'Ley 10/2010 · Art. 14 PRP',
  },
  {
    id: 't12-10',
    topicId: 12,
    specialty: 'General',
    level: 2,
    question:
      '¿Qué política de seguridad se conoce como "mesas limpias y pantallas bloqueadas" en las oficinas y centros de Correos?',
    options: [
      'Limpiar los teclados con alcohol una vez al mes',
      'No dejar documentos con datos sensibles o confidenciales sobre la mesa al ausentarse y bloquear la sesión del ordenador para evitar accesos visuales o físicos indebidos',
      'Retirar todos los bolígrafos de la ventanilla',
      'Apagar los servidores centrales cada mediodía',
    ],
    correctIndex: 1,
    explanation:
      'La política de "escritorio limpio y pantalla bloqueada" previene fugas de información física y digital ante miradas indiscretas o accesos no autorizados durante ausencias del puesto.',
    reference: 'Seguridad de la Información · Buenas prácticas',
  },
  {
    id: 't2-09',
    topicId: 2,
    specialty: 'Reparto',
    level: 3,
    question:
      '¿Qué derecho básico tienen los trabajadores de Correos según la Ley 31/1995 en relación con la vigilancia de la salud?',
    options: [
      'Es siempre obligatorio publicar sus diagnósticos médicos en la unidad',
      'Vigilancia periódica de su estado de salud en función de los riesgos inherentes al trabajo, respetando la intimidad y confidencialidad de los resultados',
      'Solo se aplica tras sufrir un accidente grave',
      'Debe costearla íntegramente el trabajador',
    ],
    correctIndex: 1,
    explanation:
      'El artículo 22 de la Ley 31/1995 garantiza la vigilancia periódica de la salud a cargo de la empresa, con carácter voluntario (salvo excepciones legales imprescindibles) y estricta confidencialidad médica.',
    reference: 'Ley 31/1995 · Art. 22 Vigilancia de la salud',
  },
  {
    id: 't5-09',
    topicId: 5,
    specialty: 'Oficinas',
    level: 4,
    question:
      '¿Qué ventaja principal aporta la "Oficina Virtual" (Mi Oficina) de Correos a particulares y pymes?',
    options: [
      'Permite preparar envíos, enviar burofax/cartas digitales desde el ordenador, comprar embalajes, gestionar el Reenvío Postal y seguir expediciones online 24/7',
      'Sustituye la entrega física de paquetes por descargas PDF',
      'Exime de pagar el franqueo de cartas certificadas',
      'Permite acceder al sistema interno IRIS desde cualquier domicilio particular',
    ],
    correctIndex: 0,
    explanation:
      'Mi Oficina / Oficina Virtual acerca los servicios postales online las 24 horas: envío de cartas y burofax digitales, prerregistro de paquetes, contratación de apartados o reenvío postal y seguimiento integrado.',
    reference: 'Nuevas Líneas · Oficina Virtual',
  },
  {
    id: 't8-10',
    topicId: 8,
    specialty: 'Clasificación',
    level: 4,
    question:
      '¿Qué operación debe realizarse antes de enviar las sacas o jaulas vacías de retorno desde una Unidad de Reparto hacia el CTA?',
    options: [
      'Dejar dentro etiquetas antiguas y envíos olvidados para ahorrar tiempo',
      'Revisar minuciosamente que las sacas y bandejas están completamente vacías ("desembalado / comprobación de vacío") y retirar etiquetas de despachos anteriores',
      'Mojar las etiquetas antiguas para que se borren solas',
      'Aplastar las bandejas rígidas Tipo A',
    ],
    correctIndex: 1,
    explanation:
      'La comprobación de vacío en sacas, bandejas y jaulas impide que queden envíos ocultos o rezagados circulando sin control y evita errores de encaminamiento por etiquetas antiguas.',
    reference: 'Procesos II Tratamiento · Revisión de envases',
  },
  {
    id: 't7-10',
    topicId: 7,
    specialty: 'Oficinas',
    level: 5,
    question:
      '¿Cuál es la diferencia clave entre un envío "Certificado" y un envío "Urgente Ordinario"?',
    options: [
      'El envío Certificado cursa bajo control y firma desde la admisión hasta la entrega (trazabilidad e indemnización), mientras el Urgente Ordinario prioriza la rapidez sin registro de entrega bajo firma',
      'El Urgente Ordinario siempre requiere DNI del destinatario',
      'El Certificado nunca lleva código de barras',
      'No existe ninguna diferencia entre ambos',
    ],
    correctIndex: 0,
    explanation:
      'El carácter "Certificado" aporta registro, seguimiento y prueba de entrega bajo firma; el carácter "Urgente Ordinario" acelera el plazo de entrega pero se deposita en el buzón sin firma ni registro de recepción.',
    reference: 'Procesos I Admisión · Certificados vs Ordinarios',
  },
  {
    id: 't9-11',
    topicId: 9,
    specialty: 'Reparto',
    level: 4,
    question:
      'Si un paquete dirigido a un domicilio tiene asignada como alternativa preferente la entrega en una taquilla Citypaq y no cabe en el compartimento o la taquilla está completa, ¿cuál es la operativa habitual?',
    options: [
      'Abandonar el paquete junto a la taquilla en la vía pública',
      'Redirigirlo a la oficina de referencia (u otro punto concertado según instrucciones del producto) avisando al destinatario mediante SMS/email/app',
      'Devolverlo inmediatamente al remitente sin avisar al destinatario',
      'Entregarlo en cualquier portal cercano',
    ],
    correctIndex: 1,
    explanation:
      'Si el envío excede las dimensiones de los huecos libres de la Citypaq o no hay disponibilidad, el sistema redirige la entrega a la oficina postal más cercana (o según modalidad) notificando al destinatario dónde recogerlo.',
    reference: 'Procesos III Entrega · Incidencias Citypaq',
  },

  // =========================================================
  // BLOQUE PSICOTÉCNICOS (15 PREGUNTAS REALISTAS DE EXAMEN)
  // =========================================================
  {
    id: 'ps-01',
    topicId: 'psico',
    specialty: 'General',
    level: 1,
    question:
      'Serie numérica: ¿Qué número continúa la siguiente serie lógica? 4, 7, 13, 25, 49, ...',
    options: ['73', '97', '98', '85'],
    correctIndex: 1,
    explanation:
      'Cada término se obtiene multiplicando el anterior por 2 y restando 1 (o sumando potencias sucesivas: +3, +6, +12, +24, +48): 49 + 48 = 97 (también 49 × 2 − 1 = 97).',
    reference: 'Psicotécnico · Serie Numérica',
    errorHuntStatement: 'En la serie 4, 7, 13, 25, 49, el siguiente término es 73 porque siempre se suma 24.',
  },
  {
    id: 'ps-02',
    topicId: 'psico',
    specialty: 'General',
    level: 1,
    question:
      'Cálculo postal: Un cartero clasifica 240 cartas en 15 minutos. Manteniendo el mismo ritmo constante, ¿cuántas cartas clasificará en 55 minutos?',
    options: ['780 cartas', '840 cartas', '880 cartas', '920 cartas'],
    correctIndex: 2,
    explanation:
      'Ritmo por minuto: 240 / 15 = 16 cartas por minuto. En 55 minutos: 16 × 55 = 880 cartas.',
    reference: 'Psicotécnico · Cálculo Proporcional',
  },
  {
    id: 'ps-03',
    topicId: 'psico',
    specialty: 'General',
    level: 1,
    question:
      'Razonamiento verbal: Señala el SINÓNIMO más preciso de la palabra "FEHACIENTE":',
    options: ['Dudoso', 'Fidedigno', 'Provisional', 'Inexacto'],
    correctIndex: 1,
    explanation:
      '"Fehaciente" significa que hace fe, que prueba o acredita de modo indiscutible la verdad de un hecho; su sinónimo directo es "fidedigno" o "indubitado".',
    reference: 'Psicotécnico · Razonamiento Verbal',
  },
  {
    id: 'ps-04',
    topicId: 'psico',
    specialty: 'General',
    level: 2,
    question:
      'Cálculo de tarifas: El envío de un paquete cuesta 12,50 € base. Si un cliente contrata un 20 % de descuento por campaña y luego se aplica un suplemento fijo de 1,80 € por aviso de recibo, ¿cuánto pagará en total?',
    options: ['11,80 €', '12,00 €', '11,50 €', '10,80 €'],
    correctIndex: 0,
    explanation:
      'Descuento del 20 % sobre 12,50 €: 12,50 × 0,80 = 10,00 €. Sumando el suplemento fijo de 1,80 €: 10,00 + 1,80 = 11,80 €.',
    reference: 'Psicotécnico · Porcentajes y Tarifas',
  },
  {
    id: 'ps-05',
    topicId: 'psico',
    specialty: 'General',
    level: 2,
    question:
      'Atención y cotejo de códigos postales: ¿Cuál de las siguientes opciones reproduce EXACTAMENTE la secuencia "PQ-28045-ES-9173"?',
    options: ['PQ-28054-ES-9173', 'PQ-28045-ES-9137', 'PQ-28045-ES-9173', 'QP-28045-ES-9173'],
    correctIndex: 2,
    explanation:
      'Comparando bloque a bloque: PQ (ok), 28045 (en A es 28054), ES (ok), 9173 (en B es 9137). Solo la opción C es idéntica.',
    reference: 'Psicotécnico · Atención y Percepción',
  },
  {
    id: 'ps-06',
    topicId: 'psico',
    specialty: 'General',
    level: 2,
    question:
      'Serie alfabética (alfabeto español de 27 letras sin dígrafos ch/ll): A, D, G, J, M, ... ¿Qué letra sigue?',
    options: ['N', 'Ñ', 'O', 'P'],
    correctIndex: 2,
    explanation:
      'En el alfabeto español de 27 letras (con Ñ), cada término salta dos letras respecto al anterior: A (B,C) → D (E,F) → G (H,I) → J (K,L) → M (N,Ñ) → O.',
    reference: 'Psicotécnico · Serie Alfabética',
  },
  {
    id: 'ps-07',
    topicId: 'psico',
    specialty: 'General',
    level: 3,
    question:
      'Ordenación alfabética de archivo: Si ordenas alfabéticamente de la A a la Z los siguientes apellidos, ¿cuál ocupará el TERCER lugar? (1. Morales, 2. Montoya, 3. Molina, 4. Montesinos)',
    options: ['Molina', 'Montesinos', 'Montoya', 'Morales'],
    correctIndex: 2,
    explanation:
      'Orden alfabético: 1º Molina (M-o-l), 2º Montesinos (M-o-n-t-e), 3º Montoya (M-o-n-t-o), 4º Morales (M-o-r). Por tanto, el tercer lugar corresponde a Montoya.',
    reference: 'Psicotécnico · Ordenación Alfabética',
  },
  {
    id: 'ps-08',
    topicId: 'psico',
    specialty: 'General',
    level: 3,
    question:
      'Razonamiento lógico: Si "ningún paquete ligero supera los 2 kg" y "todos los envíos de esta bandeja pesan 3,5 kg", ¿qué afirmación es necesariamente verdadera?',
    options: [
      'Algunos envíos de esta bandeja son paquetes ligeros',
      'Ningún envío de esta bandeja es un paquete ligero',
      'Todos los paquetes ligeros están en esta bandeja',
      'Los envíos de esta bandeja son cartas ordinarias',
    ],
    correctIndex: 1,
    explanation:
      'Si ningún paquete ligero supera los 2 kg y todos los envíos de la bandeja pesan 3,5 kg (> 2 kg), por deducción silogística ningún envío de la bandeja puede ser un paquete ligero.',
    reference: 'Psicotécnico · Silogismo Lógico',
  },
  {
    id: 'ps-09',
    topicId: 'psico',
    specialty: 'General',
    level: 3,
    question:
      'Analogía verbal: "CARTERO es a EMBARRIADO como ..."',
    options: [
      'BUZÓN es a SELLO',
      'OFICINA es a FRONTERA',
      'COCINERO es a RECETA',
      'PAQUETE es a MOTOCICLETA',
    ],
    correctIndex: 2,
    explanation:
      'El cartero organiza y prepara su reparto mediante el embarriado, del mismo modo que el cocinero organiza la preparación de su plato siguiendo la receta (relación profesional -> método de preparación).',
    reference: 'Psicotécnico · Analogía Verbal',
  },
  {
    id: 'ps-10',
    topicId: 'psico',
    specialty: 'General',
    level: 4,
    question:
      'Cálculo de rutas y tiempos: Dos furgonetas salen a las 08:00 del mismo CTA hacia ciudades situadas en direcciones opuestas. Una circula a 80 km/h y la otra a 70 km/h. ¿A qué hora estarán separadas exactamente por 375 km?',
    options: ['A las 10:00', 'A las 10:15', 'A las 10:30', 'A las 11:00'],
    correctIndex: 2,
    explanation:
      'Al ir en direcciones opuestas sus velocidades se suman: 80 + 70 = 150 km/h de separación conjunta. Tiempo = 375 / 150 = 2,5 horas (2 horas y 30 minutos). 08:00 + 2 h 30 min = 10:30.',
    reference: 'Psicotécnico · Velocidad y Tiempo',
  },
  {
    id: 'ps-11',
    topicId: 'psico',
    specialty: 'General',
    level: 4,
    question:
      'Ortografía: Señala la única opción en la que TODAS las palabras están escritas correctamente:',
    options: [
      'Exhuberante, preveer, embalaje',
      'Exuberante, prever, embalaje',
      'Exuberante, prever, envalaje',
      'Exhuberante, prever, embalaje',
    ],
    correctIndex: 1,
    explanation:
      'Se escribe "exuberante" (sin h intercalada), "prever" (derivado de ver, con una sola e, nunca "preveer") y "embalaje" (con b y j).',
    reference: 'Psicotécnico · Ortografía RAE',
  },
  {
    id: 'ps-12',
    topicId: 'psico',
    specialty: 'General',
    level: 4,
    question:
      'Equivalencias numéricas: Si las letras de la palabra "POSTAL" valen P=2, O=5, S=1, T=4, A=3, L=6, ¿cuál es el resultado de multiplicar (S + T) × (P + A) − L?',
    options: ['19', '25', '17', '21'],
    correctIndex: 0,
    explanation:
      'Sustituyendo valores: (S + T) = (1 + 4) = 5. (P + A) = (2 + 3) = 5. Multiplicación: 5 × 5 = 25. Restando L (6): 25 − 6 = 19.',
    reference: 'Psicotécnico · Codificación Numérica',
  },
  {
    id: 'ps-13',
    topicId: 'psico',
    specialty: 'General',
    level: 5,
    question:
      'Antónimos: Indica el ANTÓNIMO directo de la palabra "INALTERABLE":',
    options: ['Perpetuo', 'Mutable', 'Constante', 'Firme'],
    correctIndex: 1,
    explanation:
      '"Inalterable" significa que no puede alterarse ni cambiar; su antónimo directo es "mutable" (que puede cambiar o modificarse).',
    reference: 'Psicotécnico · Antónimos',
  },
  {
    id: 'ps-14',
    topicId: 'psico',
    specialty: 'General',
    level: 5,
    question:
      'Reparto de cargas: En una jaula hay 96 paquetes entre pequeños y grandes. Si hay el triple de paquetes pequeños que de paquetes grandes, ¿cuántos paquetes pequeños hay?',
    options: ['24', '64', '72', '48'],
    correctIndex: 2,
    explanation:
      'Si G es el número de paquetes grandes, los pequeños son 3G. G + 3G = 96 → 4G = 96 → G = 24 grandes. Por tanto, pequeños = 3 × 24 = 72.',
    reference: 'Psicotécnico · Planteamiento Algebraico',
  },
  {
    id: 'ps-15',
    topicId: 'psico',
    specialty: 'General',
    level: 5,
    question:
      'Orientación espacial: Un repartidor sale de la oficina mirando hacia el Norte. Camina 2 calles, gira 90° a la derecha, camina 1 calle, vuelve a girar 90° a la derecha y finalmente da media vuelta (180°). ¿Hacia qué punto cardinal mira ahora?',
    options: ['Norte', 'Sur', 'Este', 'Oeste'],
    correctIndex: 0,
    explanation:
      'Inicio: Norte. Gira 90° derecha → Este. Gira 90° derecha → Sur. Da media vuelta (180°) desde el Sur → Norte.',
    reference: 'Psicotécnico · Orientación Espacial',
  },
];
