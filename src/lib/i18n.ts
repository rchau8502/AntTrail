import {
  zhCourseLabels,
  zhDifficultyLabels,
  zhMessages,
} from "@/lib/i18n-zh";

export const locales = ["en", "es", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
};

const messages = {
  en: {
    appTagline: "Fast pattern-first math review",
    navTopics: "Topics",
    navStudy: "Study Mode",
    navQuiz: "Quiz",
    navBubblegum: "Bubblegum drills",
    navMemoryHooks: "Memory Hooks",
    language: "Language",
    bubbleExpanded: "Bubble Expanded",
    heroTitle: "The outer shell of useful math.",
    heroDescription:
      "Bubble now covers single-variable calculus, multivariable calculus, abstract math, probability, and linear algebra with fast recognition cues, standard moves, and memory hooks.",
    browseAllTopics: "Browse all topics",
    jumpIntoStudyMode: "Jump into study mode",
    bubbleCards: "Bubble Cards",
    courses: "Courses",
    units: "Units",
    starterCards: "Starter cards",
    chapterGroups: "Chapter groups",
    bubblePhilosophy: "Bubble philosophy",
    philosophySubtitle: "Light, useful, easy to scan",
    whatStudentsGet: "What students get",
    fastRecognition: "Fast recognition over fake depth.",
    shallowUsefulNote:
      "Bubble is intentionally shallow. The app aims for “I know what to do” before “I understand every proof.”",
    courseCoverage: "Coverage graph",
    cardsByCourse: "Cards by course",
    visualScanNote: "Visual scan, not a full syllabus audit",
    coursePathways: "Course pathways",
    pickCourseFirst: "Pick your course first.",
    coursePathwaysDescription:
      "Bubble now follows UCI-style course pathways. Start with the class you are actually taking, then hunt for the first technique that fits the shape.",
    professorLens: "Professor lens",
    professorLensBody:
      "If you were in my office hours, I would want you to identify the course shell first, then the technique. Chapter labels matter less than the move you try next.",
    allCoursesDescription:
      "See every Bubble track at once if you want to study across classes or compare methods.",
    cardsWord: "cards",
    unitsWord: "units",
    sampleBubbles: "Sample bubbles",
    sameTeachingPattern: "Three cards, same teaching pattern.",
    name: "Name",
    useItWhen: "Use it when",
    doThis: "Do this",
    rememberThis: "Remember this",
    recognitionItemOne:
      "Spot whether the problem is a chain rule, product rule, or quotient rule situation.",
    recognitionItemTwo:
      "Recognize when a proof wants contradiction, contrapositive, or induction.",
    recognitionItemThree:
      "Read a probability setup fast: count, condition, or use expectation.",
    recognitionItemFour: "See the standard move before the algebra gets loud.",
    recognitionItemFive:
      "Study on mobile without reading a wall of text.",
    topicDashboard: "Topic Dashboard",
    findTheRuleFast: "Find the move fast.",
    topicDashboardDescription:
      "Search by technique first, then by pattern, chapter, or difficulty. Each card should help you spot the move before you start solving.",
    searchEverything: "Search everything",
    searchEverythingHelp:
      "Find by technique, topic, course, chapter, unit, memory hook, or problem shape.",
    clearAll: "Clear all",
    searchPlaceholder:
      "Search plug in directly, L'Hospital, integration by parts, contrapositive...",
    course: "Course",
    unit: "Unit",
    difficulty: "Difficulty",
    chapter: "Chapter",
    cardsReadyToScan: "cards ready to scan",
    topics: "topics",
    noCardsMatch: "No cards match this filter set.",
    problemCue: "Problem cue",
    techniqueToTry: "Technique to try",
    firstMove: "First move",
    trap: "Trap",
    openBubble: "Open bubble",
    studyMode: "Study Mode",
    flipOneBubble: "Flip one bubble at a time.",
    studyDescription:
      "See the concept name first. Try to recall the pattern and move. Reveal only when you are ready.",
    allCourses: "All courses",
    allUnits: "All units",
    allDifficulty: "All difficulty",
    allChapters: "All chapters",
    front: "Front",
    revealBubble: "Reveal the bubble",
    previous: "Previous",
    next: "Next",
    hideDetails: "Hide details",
    revealDetails: "Reveal details",
    typicalProblemShapes: "Typical problem shapes",
    thinkOfItAs: "Think of it as",
    watchOutFor: "Watch out for",
    recognitionQuiz: "Recognition Quiz",
    pickMoveBeforeSolve: "Pick the move before you solve.",
    quizDescription:
      "This is a pattern test, not a grind test. Read the shape, call the technique, move on.",
    score: "Score",
    noQuizCards: "No quiz cards match this filter.",
    sessionComplete: "Session complete",
    missesHelp:
      "Misses are useful here. The goal is to spot the trigger words and shapes faster on the next pass.",
    runItAgain: "Run it again",
    whichTechniqueApplies: "Which technique applies first?",
    nextQuestion: "Next question",
    correct: "Correct.",
    tryAgainNextRound: "Try again next round.",
    bestCall: "Best call",
    hook: "Hook",
    memoryHookView: "Memory Hook View",
    fullPageCramSheet: "A full-page cram sheet.",
    memoryHookDescription:
      "This view strips each topic down to the line you want in your head five minutes before class, homework, or an exam.",
    memoryHooks: "memory hooks",
    recognitionBoard: "Recognition board",
    spotTheShapeFirst: "Spot the shape first",
    problemLikeCue: "Problem-like cue",
    looksLike: "Looks like",
    keepInMind: "Keep in mind",
    memoryHook: "Memory hook",
    problemShapes: "Problem shapes",
    tryThisShape: "Try this shape",
    move: "Move",
    recognitionChecks: "Recognition checks",
    askWhatRuleFitsFirst: "Ask: what rule fits first?",
    quickScan: "Quick scan",
    moreSupport: "More support",
    whyThisFits: "Why this fits",
    whyThatMisses: "Why that misses",
    check: "Check",
    shape: "Shape",
    relatedIn: "Related in",
    cardData: "Card data",
    studyThis: "Study this",
    quizMode: "Quiz mode",
    bubbleComplete: "Bubble complete",
    bubbleIncomplete: "Bubble not complete yet",
    markBubbleComplete: "Mark Bubble complete",
    markBubbleIncomplete: "Mark Bubble incomplete",
    bubblegumUnlocked: "Bubblegum unlocked",
    bubblegumLocked: "Complete this Bubble topic first to unlock Bubblegum drills.",
    openBubblegum: "Open Bubblegum",
    bubblegumTitle: "Keep chewing one topic.",
    bubblegumDescription:
      "Bubblegum stays on one topic and keeps changing the question shape until the move feels soft, pale, and automatic.",
    chewCount: "Chews",
    streak: "Streak",
    softness: "Softness",
    chewNext: "Chew next variation",
    backToBubble: "Back to Bubble",
    spitItOut: "Spit it out",
    keepChewing: "Keep chewing",
    bubblegumReady:
      "The topic is getting soft. One more clean pass and you can spit it out.",
    bubblegumMastered: "Chewed through",
    bubblegumMasteredHelp:
      "You have seen enough variations of this topic. Move on or come back if it gets hard again.",
  },
  es: {
    appTagline: "Repaso matemático rápido y guiado por patrones",
    navTopics: "Temas",
    navStudy: "Modo estudio",
    navQuiz: "Quiz",
    navBubblegum: "Bubblegum",
    navMemoryHooks: "Ganchos de memoria",
    language: "Idioma",
    bubbleExpanded: "Bubble ampliado",
    heroTitle: "La capa exterior de las matemáticas útiles.",
    heroDescription:
      "Bubble ahora cubre cálculo de una variable, cálculo multivariable, matemáticas abstractas, probabilidad y álgebra lineal con pistas de reconocimiento, movimientos estándar y ganchos de memoria.",
    browseAllTopics: "Ver todos los temas",
    jumpIntoStudyMode: "Ir a modo estudio",
    bubbleCards: "Tarjetas Bubble",
    courses: "Cursos",
    units: "Unidades",
    starterCards: "Tarjetas iniciales",
    chapterGroups: "Grupos por capítulo",
    bubblePhilosophy: "Filosofía Bubble",
    philosophySubtitle: "Ligero, útil y fácil de escanear",
    whatStudentsGet: "Lo que recibe el estudiante",
    fastRecognition: "Reconocimiento rápido, no profundidad falsa.",
    shallowUsefulNote:
      "Bubble es intencionalmente superficial. La meta es “sé qué hacer” antes de “entiendo cada prueba.”",
    courseCoverage: "Gráfico de cobertura",
    cardsByCourse: "Tarjetas por curso",
    visualScanNote: "Vista rápida, no una auditoría completa del programa",
    coursePathways: "Rutas de curso",
    pickCourseFirst: "Elige tu curso primero.",
    coursePathwaysDescription:
      "Bubble ahora sigue rutas de curso al estilo UCI. Empieza con la clase que realmente llevas y luego busca la primera técnica que encaja con la forma.",
    professorLens: "Mirada de profesor",
    professorLensBody:
      "Si estuvieras en mis horas de oficina, primero querría que identifiques el curso y luego la técnica. El capítulo importa menos que el siguiente movimiento correcto.",
    allCoursesDescription:
      "Mira todas las rutas Bubble a la vez si quieres estudiar entre clases o comparar métodos.",
    cardsWord: "tarjetas",
    unitsWord: "unidades",
    sampleBubbles: "Bubbles de ejemplo",
    sameTeachingPattern: "Tres tarjetas, mismo patrón de enseñanza.",
    name: "Nombre",
    useItWhen: "Úsalo cuando",
    doThis: "Haz esto",
    rememberThis: "Recuerda esto",
    recognitionItemOne:
      "Detecta si el problema pide regla de la cadena, producto o cociente.",
    recognitionItemTwo:
      "Reconoce cuándo una prueba pide contradicción, contraposición o inducción.",
    recognitionItemThree:
      "Lee un problema de probabilidad rápido: contar, condicionar o usar esperanza.",
    recognitionItemFour:
      "Ve el movimiento estándar antes de que el álgebra haga ruido.",
    recognitionItemFive:
      "Estudia en el celular sin leer un muro de texto.",
    topicDashboard: "Panel de temas",
    findTheRuleFast: "Encuentra el movimiento rápido.",
    topicDashboardDescription:
      "Busca primero por técnica, luego por patrón, capítulo o dificultad. Cada tarjeta debe ayudarte a ver el movimiento antes de empezar a resolver.",
    searchEverything: "Buscar en todo",
    searchEverythingHelp:
      "Busca por técnica, tema, curso, capítulo, unidad, gancho de memoria o forma del problema.",
    clearAll: "Limpiar todo",
    searchPlaceholder:
      "Busca sustitución directa, l'Hospital, integración por partes, contraposición...",
    course: "Curso",
    unit: "Unidad",
    difficulty: "Dificultad",
    chapter: "Capítulo",
    cardsReadyToScan: "tarjetas listas para revisar",
    topics: "temas",
    noCardsMatch: "Ninguna tarjeta coincide con estos filtros.",
    problemCue: "Pista del problema",
    techniqueToTry: "Técnica a probar",
    firstMove: "Primer movimiento",
    trap: "Trampa",
    openBubble: "Abrir Bubble",
    studyMode: "Modo estudio",
    flipOneBubble: "Voltea una Bubble a la vez.",
    studyDescription:
      "Mira primero el nombre del concepto. Trata de recordar el patrón y el movimiento. Revela solo cuando estés listo.",
    allCourses: "Todos los cursos",
    allUnits: "Todas las unidades",
    allDifficulty: "Toda dificultad",
    allChapters: "Todos los capítulos",
    front: "Frente",
    revealBubble: "Revelar bubble",
    previous: "Anterior",
    next: "Siguiente",
    hideDetails: "Ocultar detalles",
    revealDetails: "Revelar detalles",
    typicalProblemShapes: "Formas típicas del problema",
    thinkOfItAs: "Piénsalo como",
    watchOutFor: "Cuidado con",
    recognitionQuiz: "Quiz de reconocimiento",
    pickMoveBeforeSolve: "Elige el movimiento antes de resolver.",
    quizDescription:
      "Esta es una prueba de patrones, no de cálculo largo. Lee la forma, nombra la técnica y sigue.",
    score: "Puntaje",
    noQuizCards: "No hay tarjetas de quiz para estos filtros.",
    sessionComplete: "Sesión completa",
    missesHelp:
      "Equivocarse sirve aquí. La meta es detectar las palabras clave y las formas más rápido en la siguiente pasada.",
    runItAgain: "Intentar otra vez",
    whichTechniqueApplies: "¿Qué técnica aplica primero?",
    nextQuestion: "Siguiente pregunta",
    correct: "Correcto.",
    tryAgainNextRound: "Inténtalo otra vez en la siguiente ronda.",
    bestCall: "Mejor opción",
    hook: "Gancho",
    memoryHookView: "Vista de ganchos de memoria",
    fullPageCramSheet: "Una hoja completa para repasar rápido.",
    memoryHookDescription:
      "Esta vista reduce cada tema a la frase que quieres recordar cinco minutos antes de clase, tarea o examen.",
    memoryHooks: "ganchos de memoria",
    recognitionBoard: "Panel de reconocimiento",
    spotTheShapeFirst: "Primero detecta la forma",
    problemLikeCue: "Pista tipo problema",
    looksLike: "Se ve como",
    keepInMind: "Ten en mente",
    memoryHook: "Gancho de memoria",
    problemShapes: "Formas del problema",
    tryThisShape: "Prueba esta forma",
    move: "Movimiento",
    recognitionChecks: "Chequeos de reconocimiento",
    askWhatRuleFitsFirst: "Pregunta: ¿qué regla encaja primero?",
    quickScan: "Escaneo rápido",
    moreSupport: "Más apoyo",
    whyThisFits: "Por qué encaja",
    whyThatMisses: "Por qué no encaja",
    check: "Chequeo",
    shape: "Forma",
    relatedIn: "Relacionado en",
    cardData: "Datos de la tarjeta",
    studyThis: "Estudiar esto",
    quizMode: "Modo quiz",
    bubbleComplete: "Bubble completado",
    bubbleIncomplete: "Bubble todavía no completado",
    markBubbleComplete: "Marcar Bubble como completado",
    markBubbleIncomplete: "Marcar Bubble como no completado",
    bubblegumUnlocked: "Bubblegum desbloqueado",
    bubblegumLocked: "Completa primero este tema de Bubble para desbloquear Bubblegum.",
    openBubblegum: "Abrir Bubblegum",
    bubblegumTitle: "Sigue masticando un tema.",
    bubblegumDescription:
      "Bubblegum se queda en un solo tema y cambia la forma de la pregunta hasta que el movimiento te salga casi automático.",
    chewCount: "Intentos",
    streak: "Racha",
    softness: "Suavidad",
    chewNext: "Masticar otra variación",
    backToBubble: "Volver a Bubble",
    spitItOut: "Escupirlo",
    keepChewing: "Seguir masticando",
    bubblegumReady:
      "Este tema ya se siente más fácil. Una ronda limpia más y ya lo puedes soltar.",
    bubblegumMastered: "Ya lo tienes bastante masticado",
    bubblegumMasteredHelp:
      "Ya viste suficientes variaciones de este tema. Sigue al siguiente o vuelve si se pone duro otra vez.",
  },
  zh: zhMessages,
} as const;

export type TranslationKey = keyof (typeof messages)["en"];

export function translate(locale: Locale, key: TranslationKey) {
  return messages[locale][key] ?? messages[defaultLocale][key];
}

const courseLabels: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "Single-Variable Calculus I": "Cálculo de una Variable I",
    "Single-Variable Calculus II": "Cálculo de una Variable II",
    "Multivariable Calculus I": "Cálculo Multivariable I",
    "Introduction to Abstract Mathematics":
      "Introducción a las Matemáticas Abstractas",
    "Introduction to Linear Algebra": "Introducción al Álgebra Lineal",
    "Probability I": "Probabilidad I",
    "Multivariable Calculus II": "Cálculo Multivariable II",
    "Elementary Differential Equations": "Ecuaciones Diferenciales Elementales",
    "Introduction to Abstract Algebra: Groups":
      "Introducción al Álgebra Abstracta: Grupos",
    "Linear Algebra I": "Álgebra Lineal I",
    "Probability II": "Probabilidad II",
    "Elementary Analysis I": "Análisis Elemental I",
  },
  zh: zhCourseLabels,
};

const difficultyLabels: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    Starter: "Inicial",
    Standard: "Estándar",
    Stretch: "Avanzado",
  },
  zh: zhDifficultyLabels,
};

export function translateCourseTitle(locale: Locale, title: string) {
  return courseLabels[locale][title] ?? title;
}

export function translateDifficulty(locale: Locale, difficulty: string) {
  return difficultyLabels[locale][difficulty] ?? difficulty;
}

export function detectLocale(preferred: string | null | undefined): Locale {
  if (!preferred) {
    return defaultLocale;
  }

  const normalized = preferred.toLowerCase();

  if (normalized.startsWith("es")) {
    return "es";
  }

  if (normalized.startsWith("zh")) {
    return "zh";
  }

  return defaultLocale;
}
