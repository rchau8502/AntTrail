export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

const messages = {
  en: {
    appTagline: "Fast pattern-first math review",
    navTopics: "Topics",
    navStudy: "Study Mode",
    navQuiz: "Quiz",
    navMemoryHooks: "Memory Hooks",
    language: "Language",
    bubbleExpanded: "Bubble Expanded",
    heroTitle: "The outer shell of useful math.",
    heroDescription:
      "Bubble now covers calculus, intro to proof, and probability with fast recognition cues, standard moves, and memory hooks.",
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
    findTheRuleFast: "Find the rule fast.",
    topicDashboardDescription:
      "Search by pattern, filter by chapter or difficulty, and scan each card like a quick study sheet instead of a textbook chapter.",
    searchEverything: "Search everything",
    searchEverythingHelp:
      "Find by topic, course, chapter, unit, memory hook, or problem shape.",
    clearAll: "Clear all",
    searchPlaceholder:
      "Search chain rule, Taylor series, related rates, Chapter 7...",
    course: "Course",
    unit: "Unit",
    difficulty: "Difficulty",
    chapter: "Chapter",
    cardsReadyToScan: "cards ready to scan",
    topics: "topics",
    noCardsMatch: "No cards match this filter set.",
    problemCue: "Problem cue",
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
    check: "Check",
    shape: "Shape",
    relatedIn: "Related in",
    cardData: "Card data",
    studyThis: "Study this",
    quizMode: "Quiz mode",
  },
  es: {
    appTagline: "Repaso matemático rápido y guiado por patrones",
    navTopics: "Temas",
    navStudy: "Modo estudio",
    navQuiz: "Quiz",
    navMemoryHooks: "Ganchos de memoria",
    language: "Idioma",
    bubbleExpanded: "Bubble ampliado",
    heroTitle: "La capa exterior de las matemáticas útiles.",
    heroDescription:
      "Bubble ahora cubre cálculo, introducción a pruebas y probabilidad con pistas de reconocimiento, movimientos estándar y ganchos de memoria.",
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
    findTheRuleFast: "Encuentra la regla rápido.",
    topicDashboardDescription:
      "Busca por patrón, filtra por capítulo o dificultad y revisa cada tarjeta como una hoja rápida de estudio.",
    searchEverything: "Buscar en todo",
    searchEverythingHelp:
      "Busca por tema, curso, capítulo, unidad, gancho de memoria o forma del problema.",
    clearAll: "Limpiar todo",
    searchPlaceholder:
      "Busca regla de la cadena, serie de Taylor, razones relacionadas, Capítulo 7...",
    course: "Curso",
    unit: "Unidad",
    difficulty: "Dificultad",
    chapter: "Capítulo",
    cardsReadyToScan: "tarjetas listas para revisar",
    topics: "temas",
    noCardsMatch: "Ninguna tarjeta coincide con estos filtros.",
    problemCue: "Pista del problema",
    firstMove: "Primer movimiento",
    trap: "Trampa",
    openBubble: "Abrir bubble",
    studyMode: "Modo estudio",
    flipOneBubble: "Voltea una bubble a la vez.",
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
    check: "Chequeo",
    shape: "Forma",
    relatedIn: "Relacionado en",
    cardData: "Datos de la tarjeta",
    studyThis: "Estudiar esto",
    quizMode: "Modo quiz",
  },
} as const;

export type TranslationKey = keyof (typeof messages)["en"];

export function translate(locale: Locale, key: TranslationKey) {
  return messages[locale][key] ?? messages[defaultLocale][key];
}

const courseLabels: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "Calculus 1": "Cálculo 1",
    "Calculus 2": "Cálculo 2",
    "Calculus 3": "Cálculo 3",
    "Intro to Proof": "Introducción a Pruebas",
    Probability: "Probabilidad",
  },
};

const difficultyLabels: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    Starter: "Inicial",
    Standard: "Estándar",
    Stretch: "Avanzado",
  },
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

  return defaultLocale;
}
