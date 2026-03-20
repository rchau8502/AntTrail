import type { MiniDrillItem, QuickExample } from "@/content/schema";

export interface LocalizedCourseText {
  title: string;
  shortDescription: string;
  units: string[];
  chapters: string[];
}

export interface LocalizedCardContent {
  course: string;
  chapter: string;
  unit: string;
  topic: string;
  name: string;
  useItWhen: string;
  looksLike: string;
  doThis: string;
  thinkOfItAs: string;
  watchOutFor: string;
  rememberThis: string;
  quickExample?: QuickExample;
  typicalProblemShapes: string[];
  miniDrill: MiniDrillItem[];
  memoryHook: string;
}

export const esCourseContent: Record<string, LocalizedCourseText> = {
  "calc-1": {
    "title": "Cálculo de una Variable I",
    "shortDescription": "Revisión rápida de cálculo de una sola variable para estudiantes que necesitan el cambio primero.",
    "units": [
      "Límites",
      "Derivadas",
      "Aplicaciones",
      "Integrales",
      "Aplicaciones de la Integración"
    ],
    "chapters": [
      "Capítulo 1: Funciones y Límites",
      "Capítulo 2: Derivadas",
      "Capítulo 3: Aplicaciones de la Derivación",
      "Capítulo 4: Integrales",
      "Capítulo 5: Aplicaciones de la Integración"
    ]
  },
  "calc-2": {
    "title": "Cálculo de una Variable II",
    "shortDescription": "Trucos de integración, ideas polares y paramétricas y reconocimiento de series de una sola variable.",
    "units": [
      "Funciones Inversas, Exponenciales y Logarítmicas",
      "Técnicas de Integración",
      "Aplicaciones y Curvas",
      "Ecuaciones Diferenciales",
      "Sucesiones y Series"
    ],
    "chapters": [
      "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
      "Capítulo 7: Técnicas de Integración",
      "Capítulo 8: Más Aplicaciones de la Integración",
      "Capítulo 9: Ecuaciones Diferenciales",
      "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
      "Capítulo 11: Sucesiones, Series y Series de Potencias"
    ]
  },
  "calc-3": {
    "title": "Cálculo Multivariable I",
    "shortDescription": "Vectores, derivadas parciales, integrales múltiples y cálculo multivariable.",
    "units": [
      "Vectores y 3D",
      "Funciones Vectoriales",
      "Derivadas Parciales",
      "Integrales Múltiples",
      "Cálculo Vectorial"
    ],
    "chapters": [
      "Capítulo 12: Vectores y la Geometría del Espacio",
      "Capítulo 13: Funciones Vectoriales",
      "Capítulo 14: Derivadas Parciales",
      "Capítulo 15: Integrales Múltiples",
      "Capítulo 16: Cálculo Vectorial"
    ]
  },
  "linear-algebra": {
    "title": "Introducción al Álgebra Lineal",
    "shortDescription": "Matrices, espacios vectoriales e ideas propias enseñadas como primeros movimientos de reconocimiento.",
    "units": [
      "Sistemas y Reducción por Filas",
      "Matrices",
      "Determinantes",
      "Espacios Vectoriales",
      "Ortogonalidad",
      "Transformaciones y Eigen"
    ],
    "chapters": [
      "Capítulo 1: Sistemas y Reducción por Filas",
      "Capítulo 2: Álgebra de Matrices",
      "Capítulo 3: Determinantes",
      "Capítulo 4: Espacios Vectoriales",
      "Capítulo 5: Ortogonalidad",
      "Capítulo 6: Eigenvalores y Transformaciones Lineales"
    ]
  },
  "intro-proof": {
    "title": "Introducción a las Matemáticas Abstractas",
    "shortDescription": "Conceptos básicos de lógica, patrones de prueba, conjuntos, inducción y escritura de matemáticas abstractas.",
    "units": [
      "Bases de Pruebas",
      "Lógica y Cuantificadores",
      "Conjuntos y Funciones",
      "Bases de Teoría de Números",
      "Inducción",
      "Teoría de Conjuntos II",
      "Relaciones y Cardinalidad"
    ],
    "chapters": [
      "Capítulo 1: Un Cambio de Paradigma",
      "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
      "Capítulo 3: Conjuntos y Funciones",
      "Capítulo 4: Divisibilidad y el Algoritmo de Euclides",
      "Capítulo 5: Inducción Matemática y Buen Orden",
      "Capítulo 6: Teoría de Conjuntos, Parte II",
      "Capítulo 7: Relaciones y Particiones",
      "Capítulo 8: Cardinalidades de Conjuntos Infinitos"
    ]
  },
  "probability": {
    "title": "Probabilidad I",
    "shortDescription": "Conteo, probabilidad condicional, variables aleatorias y expectativa.",
    "units": [
      "Conteo",
      "Bases de Probabilidad",
      "Variables Aleatorias",
      "Comportamiento Conjunto",
      "Esperanza y Varianza",
      "Concentración y Límites"
    ],
    "chapters": [
      "Capítulo 1: Análisis Combinatorio",
      "Capítulo 2: Probabilidad: Lo Básico",
      "Capítulo 3: Variables Aleatorias Discretas",
      "Capítulo 4: Variables Aleatorias Continuas",
      "Capítulo 5: Distribución Conjunta e Independencia",
      "Capítulo 6: Propiedades de la Esperanza",
      "Capítulo 7: Covarianza y Varianza de Sumas de Variables Aleatorias",
      "Capítulo 8: Introducción a las Desigualdades de Concentración",
      "Capítulo 9: Teorema Central del Límite"
    ]
  }
};

export const esCardContent: Record<string, LocalizedCardContent> = {
  "intuitive-limit": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Idea intuitiva de un límite.",
    "name": "Idea de límite intuitiva",
    "useItWhen": "te importa hacia dónde se dirige la salida",
    "looksLike": "una gráfica, tabla o límite cuando x se convierte en un número",
    "doThis": "mire desde la izquierda y la derecha y nombre el valor objetivo",
    "thinkOfItAs": "Caminar hacia una puerta sin atravesarla.",
    "watchOutFor": "mezclarse en el punto con cerca del punto",
    "rememberThis": "Los límites están cerca, no en",
    "typicalProblemShapes": [
      "Un gráfico pregunta a qué valor de y se aproxima la curva cerca de x = a",
      "Una tabla muestra los valores de x acercándose a un número desde ambos lados"
    ],
    "miniDrill": [
      {
        "prompt": "Si el lado izquierdo llega a 4 y el lado derecho llega a 4, ¿existe el límite?",
        "answer": "Sí. Ambas partes están de acuerdo en 4."
      },
      {
        "prompt": "Si f(2) = 9 pero los valores cercanos llegan a 5, ¿cuál es el límite cuando x se aproxima a 2?",
        "answer": "5. El valor del punto no controla el límite."
      }
    ],
    "memoryHook": "Cerca del punto, no en el punto.",
    "quickExample": {
      "problem": "Cuando x se acerca a 3, ¿a qué se aproxima x^2?",
      "move": "Las salidas se dirigen al 9."
    }
  },
  "direct-substitution": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Sustitución directa",
    "name": "Sustitución directa",
    "useItWhen": "enchufarlo no rompe nada",
    "looksLike": "polinomios o fracciones limpias sin cero abajo",
    "doThis": "enchufar primero",
    "thinkOfItAs": "Probar la puerta de entrada antes de buscar entradas laterales.",
    "watchOutFor": "obteniendo 0/0 y todavía intentando conectar",
    "rememberThis": "sin interrupción significa simplemente enchufar",
    "typicalProblemShapes": [
      "Un polinomio como x^3 - 4x + 7",
      "Una expresión racional donde el denominador no es cero en el objetivo."
    ],
    "miniDrill": [
      {
        "prompt": "Pruebe x = 1 en (x^2 + 5x)/(x + 4). ¿Qué pasa primero?",
        "answer": "Sigue siendo legal, por lo que la sustitución directa funciona."
      },
      {
        "prompt": "Te conectas y obtienes 0/0. ¿Mantener sustitución directa o cambiar?",
        "answer": "Cambiar. 0/0 significa simplificar primero."
      }
    ],
    "memoryHook": "Sin interrupción, solo conéctelo.",
    "quickExample": {
      "problem": "Límite cuando x se aproxima a 2 de x^2 + 1",
      "move": "Conecte 2 y obtenga 5."
    }
  },
  "factoring-0-0": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Factorizando para eliminar 0/0",
    "name": "Factorizando 0/0",
    "useItWhen": "conectarlo da 0/0 y puedes factorizar",
    "looksLike": "(x^2 - 9)/(x - 3) u otra fracción factorizable",
    "doThis": "factor, cancele la pieza compartida, luego conecte",
    "thinkOfItAs": "desabrochar una chaqueta atascada antes de intentar separarla",
    "watchOutFor": "cancelar términos que se suman en lugar de multiplicarse",
    "rememberThis": "0/0 a menudo significa simplificar primero",
    "typicalProblemShapes": [
      "Diferencia de cuadrados arriba o abajo",
      "Cuadráticas o polinomios que se pueden factorizar antes de conectarlos"
    ],
    "miniDrill": [
      {
        "prompt": "Obtienes 0/0 de una fracción polinómica. ¿Primer movimiento?",
        "answer": "Busque factoraje."
      },
      {
        "prompt": "¿Puedes cancelar x - 2 de x^2 - 4 después de factorizar?",
        "answer": "Sí, porque x^2 - 4 se convierte en (x - 2)(x + 2)."
      }
    ],
    "memoryHook": "Cero sobre cero significa limpiarlo.",
    "quickExample": {
      "problem": "Límite cuando x se aproxima a 3 de (x^2 - 9)/(x - 3)",
      "move": "Factoriza (x - 3)(x + 3), cancela y luego reemplaza 3 para obtener 6."
    }
  },
  "rationalizing": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Racionalización",
    "name": "Racionalizando un límite",
    "useItWhen": "conectarlo da 0/0 y hay una raíz involucrada",
    "looksLike": "(raíz(x + 5) - 3)/(x - 4)",
    "doThis": "multiplique por el conjugado, límpielo y luego conecte",
    "thinkOfItAs": "usando una imagen reflejada para hacer desaparecer la raíz",
    "watchOutFor": "errores de signo en el conjugado",
    "rememberThis": "los radicales a menudo quieren el conjugado",
    "typicalProblemShapes": [
      "Una raíz cuadrada menos o más un número en el numerador",
      "Una expresión raíz que se convierte en 0/0 en el punto objetivo"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el conjugado de sqrt(x + 2) - 5?",
        "answer": "raíz cuadrada (x + 2) + 5"
      },
      {
        "prompt": "La sustitución da 0/0 y hay una raíz cuadrada. ¿La mejor herramienta?",
        "answer": "Racionalizar con el conjugado."
      }
    ],
    "memoryHook": "Las raíces se mueven como espejos.",
    "quickExample": {
      "problem": "Límite cuando x se acerca a 4 de (sqrt(x + 5) - 3)/(x - 4)",
      "move": "Multiplica por sqrt(x + 5) + 3, simplifica y luego reemplaza 4."
    }
  },
  "infinite-limits": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Límites infinitos",
    "name": "Límites infinitos",
    "useItWhen": "la salida explota cerca de un valor x",
    "looksLike": "1/(x - 2), 1/(x - 2)^2, asíntotas verticales",
    "doThis": "comprueba el signo de cada lado y decide si sube o baja",
    "thinkOfItAs": "un gráfico que sube o baja por una pared vertical",
    "watchOutFor": "asumiendo que ambas partes hacen lo mismo",
    "rememberThis": "Denominador pequeño, producción enorme.",
    "typicalProblemShapes": [
      "Fracciones con denominador cercano a cero",
      "Preguntas sobre asíntotas verticales y comportamiento unilateral"
    ],
    "miniDrill": [
      {
        "prompt": "Cuando x se aproxima a 2 por la izquierda, ¿es x - 2 positivo o negativo?",
        "answer": "Negativo."
      },
      {
        "prompt": "Si un denominador es minúsculo negativo, ¿qué le puede pasar a 1 sobre ese número?",
        "answer": "Puede caer hacia el infinito negativo."
      }
    ],
    "memoryHook": "Cerca de cero abajo significa caos arriba.",
    "quickExample": {
      "problem": "Cuando x se acerca a 2 por la derecha, ¿qué sucede con 1/(x - 2)?",
      "move": "El denominador es diminuto positivo, por lo que la salida llega al infinito positivo."
    }
  },
  "limits-at-infinity": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Límites al infinito",
    "name": "Límites en el infinito",
    "useItWhen": "x va hacia la izquierda o hacia la derecha",
    "looksLike": "razones de polinomios como (3x^2 + 1)/(x^2 - 4)",
    "doThis": "ignora las cosas pequeñas y compara los poderes más grandes",
    "thinkOfItAs": "el término más ruidoso en la sala ahogando el resto",
    "watchOutFor": "dejar que las pequeñas constantes te distraigan",
    "rememberThis": "El mayor poder gana en los extremos.",
    "typicalProblemShapes": [
      "Razones polinómicas con x dirigida al infinito",
      "Preguntas sobre el comportamiento horizontal de un gráfico."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué importa más en el infinito: x^3 o 7x?",
        "answer": "x^3 domina."
      },
      {
        "prompt": "Grado superior más pequeño que el grado inferior. ¿Qué suele pasar con el límite?",
        "answer": "Suele llegar a 0."
      }
    ],
    "memoryHook": "En los bordes se mueve la mayor potencia.",
    "quickExample": {
      "problem": "Límite cuando x se acerca al infinito de (3x^2 + 1)/(x^2 - 4)",
      "move": "Arriba y abajo tienen el mismo grado, por lo que el límite es 3/1."
    }
  },
  "continuity": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Continuidad",
    "name": "Continuidad",
    "useItWhen": "necesitas comprobar si hay un descanso",
    "looksLike": "gráficos con agujeros, saltos, esquinas o definiciones por partes",
    "doThis": "marque definido, el límite existe y ambos coinciden",
    "thinkOfItAs": "un camino sin huecos, saltos o tablones faltantes",
    "watchOutFor": "Comprobando la imagen pero no el valor en puntos.",
    "rememberThis": "continuo significa que no hay desgarros en ese lugar",
    "typicalProblemShapes": [
      "Funciones por partes que cambian fórmulas en un punto",
      "Un gráfico con un agujero, un salto o una asíntota vertical."
    ],
    "miniDrill": [
      {
        "prompt": "Si los límites izquierdo y derecho no coinciden, ¿la función es continua allí?",
        "answer": "No. El límite no existe."
      },
      {
        "prompt": "Si el límite es 4 y f(1) también es 4, ¿qué más necesitas?",
        "answer": "La función debe definirse en x = 1, que es en este caso."
      }
    ],
    "memoryHook": "Definido, el límite existe, los valores coinciden.",
    "quickExample": {
      "problem": "Una función tiene un hueco en x = 2 aunque ambos lados se aproximan a 5.",
      "move": "No es continua en x = 2 a menos que el valor de la función también sea 5 allí."
    }
  },
  "derivative-slope-rate": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Derivada como pendiente y tasa de cambio",
    "name": "Derivada = Pendiente / Tasa",
    "useItWhen": "quieres la pendiente ahora o la velocidad ahora",
    "looksLike": "f'(x), dy/dx, pendiente tangente, velocidad",
    "doThis": "léelo como cambio ahora mismo",
    "thinkOfItAs": "un velocímetro en lugar de todo el viaje por carretera",
    "watchOutFor": "mezclar el cambio promedio con el cambio instantáneo",
    "rememberThis": "derivada significa qué tan rápido en este momento",
    "typicalProblemShapes": [
      "Palabras como instantáneo, tangente, pendiente ahora o tasa ahora",
      "La posición, el costo, la temperatura o la población cambian con la entrada"
    ],
    "miniDrill": [
      {
        "prompt": "¿Una derivada describe una recta secante o una recta tangente?",
        "answer": "Una recta tangente."
      },
      {
        "prompt": "Si f'(3) es negativa, ¿la gráfica sube o baja allí?",
        "answer": "Descendente."
      }
    ],
    "memoryHook": "Derivada = velocidad actual.",
    "quickExample": {
      "problem": "Si s(t) es posición, ¿qué significa s'(t)?",
      "move": "Velocidad instantánea."
    }
  },
  "derivative-definition": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Derivado de la definición",
    "name": "Derivado de la definición",
    "useItWhen": "el problema dice usar la definición",
    "looksLike": "límite cuando h se aproxima a 0 de [f(x + h) - f(x)] / h",
    "doThis": "constrúyelo, expándelo, cancela y luego deja que h vaya a 0",
    "thinkOfItAs": "acercarse con pasos secantes cada vez más pequeños",
    "watchOutFor": "conectando h = 0 antes de simplificar",
    "rememberThis": "simplifica primero y luego toma el límite",
    "typicalProblemShapes": [
      "Un cociente de diferencias explícito ya escrito.",
      "Un mensaje que dice usar solo la definición de límite"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué suele cancelarse después de expandir f(x + h) - f(x)?",
        "answer": "Los términos originales de f(x)."
      },
      {
        "prompt": "¿Cuándo finalmente dejas que h llegue a 0?",
        "answer": "Después el cociente se simplifica lo suficiente como para evitar 0/0."
      }
    ],
    "memoryHook": "Ampliar, cancelar, dividir, limitar.",
    "quickExample": {
      "problem": "Encuentra la derivada de x^2 a partir de la definición.",
      "move": "Expande (x + h)^2, cancela, divide por h y luego deja que h llegue a 0."
    }
  },
  "power-rule": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "regla de poder",
    "name": "Regla de poder",
    "useItWhen": "ves x a una potencia",
    "looksLike": "x^5, x^-2, x^(1/3)",
    "doThis": "baje la energía y luego bájela en 1",
    "thinkOfItAs": "el exponente baja y uno se afeita",
    "watchOutFor": "Pensando que sólo funciona para números enteros bonitos.",
    "rememberThis": "al frente, menos uno",
    "typicalProblemShapes": [
      "Términos de potencia simples con x como base",
      "Polinomios construidos a partir de múltiples términos de reglas de potencia"
    ],
    "miniDrill": [
      {
        "prompt": "¿Derivada de x^-3?",
        "answer": "-3x^-4"
      },
      {
        "prompt": "¿Derivada de sqrt(x) escrita como x^(1/2)?",
        "answer": "La mitad x^-1/2"
      }
    ],
    "memoryHook": "Bájalo, déjalo caer uno por uno.",
    "quickExample": {
      "problem": "Derivada de x^7",
      "move": "7x^6"
    }
  },
  "constant-rule": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Regla constante",
    "name": "Regla constante",
    "useItWhen": "un término no tiene x",
    "looksLike": "7, pi, -12 o cualquier número fijo",
    "doThis": "convertir ese término constante en 0",
    "thinkOfItAs": "una línea plana con inclinación cero",
    "watchOutFor": "tratar los coeficientes como constantes sin x adjunta",
    "rememberThis": "las constantes desaparecen",
    "typicalProblemShapes": [
      "Un número independiente en un polinomio",
      "Una pregunta sobre la derivada de un valor fijo."
    ],
    "miniDrill": [
      {
        "prompt": "¿Derivada de -4?",
        "answer": "0"
      },
      {
        "prompt": "En 5x^2 + 8, ¿qué parte se convierte en 0?",
        "answer": "El 8."
      }
    ],
    "memoryHook": "Línea plana, pendiente cero.",
    "quickExample": {
      "problem": "Derivada de 9",
      "move": "0"
    }
  },
  "sum-difference-rules": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Reglas de suma y diferencia",
    "name": "Reglas de suma y diferencia",
    "useItWhen": "se suman o restan términos",
    "looksLike": "x^3 + 4x - 7 o 2x^5 - raíz cuadrada (x)",
    "doThis": "diferenciar cada término y mantener los signos",
    "thinkOfItAs": "calificar cada término por separado y luego sumar las puntuaciones",
    "watchOutFor": "dejando caer un signo negativo",
    "rememberThis": "obras término por término",
    "typicalProblemShapes": [
      "Polinomios con varios términos.",
      "Expresiones mixtas donde las piezas se unen por más o menos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Necesita una regla del producto para x^2 + x^5?",
        "answer": "No. Diferenciar término por término."
      },
      {
        "prompt": "¿Qué signo debe quedar con la derivada de -3x^2?",
        "answer": "Negativo."
      }
    ],
    "memoryHook": "Divide los términos, no los signos.",
    "quickExample": {
      "problem": "Derivada de x^3 + 4x - 7",
      "move": "3x^2 + 4"
    }
  },
  "product-rule": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "regla del producto",
    "name": "Regla del producto",
    "useItWhen": "se multiplican dos piezas cambiantes",
    "looksLike": "(x^2 + 1)(x^3 - 4) o x sen x",
    "doThis": "primer primo segundo más primer segundo primo",
    "thinkOfItAs": "ambas piezas se están moviendo, por lo que ambas tienen un turno",
    "watchOutFor": "multiplicar las derivadas juntas",
    "rememberThis": "primer primo segundo más primero segundo primo",
    "typicalProblemShapes": [
      "Dos factores visibles uno al lado del otro",
      "Una pieza de álgebra multiplicada por una pieza trigonométrica o exponencial"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué regla se ajusta a x(x^2 + 4)?",
        "answer": "Regla del producto."
      },
      {
        "prompt": "En la regla del producto, ¿cuántos términos aparecen después de diferenciar?",
        "answer": "Dos términos."
      }
    ],
    "memoryHook": "Ambos cambios significan que ambos se cuentan.",
    "quickExample": {
      "problem": "Derivada de x^2 sen x",
      "move": "2x sen x + x^2 porque x"
    }
  },
  "quotient-rule": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "regla del cociente",
    "name": "Regla del cociente",
    "useItWhen": "una cosa cambia sobre otra",
    "looksLike": "(x^2 + 1)/(x - 3)",
    "doThis": "bajo d-alto menos alto d-bajo, todo sobre bajo al cuadrado",
    "thinkOfItAs": "Golpes comerciales superiores e inferiores, el fondo se mantiene al cuadrado",
    "watchOutFor": "volteando el orden y cambiando el signo",
    "rememberThis": "bajo d-alto menos alto d-bajo sobre bajo al cuadrado",
    "typicalProblemShapes": [
      "Una fracción con x en el numerador y denominador.",
      "Una función racional donde tanto la parte superior como la inferior cambian."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué aparece primero en la parte superior: denominador por derivada del numerador, o al revés?",
        "answer": "Denominador por derivada del numerador."
      },
      {
        "prompt": "¿Qué le sucede al denominador en la regla del cociente?",
        "answer": "Se pone al cuadrado."
      }
    ],
    "memoryHook": "Bajo d-alto, alto d-bajo, bajo al cuadrado.",
    "quickExample": {
      "problem": "Derivada de (x^2 + 1)/(x - 3)",
      "move": "Utilice baja d-alta menos alta d-baja, luego divida por (x - 3)^2."
    }
  },
  "chain-rule": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "regla de la cadena",
    "name": "Regla de la cadena",
    "useItWhen": "una función está dentro de otra",
    "looksLike": "(3x^2 + 1)^5, pecado(x^3), e^(2x)",
    "doThis": "haz el exterior, mantén el interior, luego multiplica por el interior primo",
    "thinkOfItAs": "pelar una cebolla capa por capa",
    "watchOutFor": "olvidando la derivada interna",
    "rememberThis": "primero afuera, luego adentro",
    "typicalProblemShapes": [
      "Una potencia envuelta alrededor de un polinomio.",
      "Trigonométrica, exponencial o logarítmica con otra expresión dentro"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué regla se ajusta al pecado (x ^ 4)?",
        "answer": "Regla de la cadena."
      },
      {
        "prompt": "Después de diferenciar el exterior de (x^2 + 3)^7, ¿qué debe pasar todavía?",
        "answer": "Multiplica por la derivada de x^2 + 3."
      }
    ],
    "memoryHook": "De afuera hacia adentro, luego multiplica.",
    "quickExample": {
      "problem": "Derivada de (3x^2 + 1)^5",
      "move": "5(3x^2 + 1)^4 veces 6x"
    }
  },
  "implicit-differentiation": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Diferenciación implícita",
    "name": "Diferenciación implícita",
    "useItWhen": "x e y están mezclados y y no está solo",
    "looksLike": "x^2 + y^2 = 25 o xy + y^3 = 7",
    "doThis": "diferenciar ambos lados, unir y-primo a los términos y, resolver para y-primo",
    "thinkOfItAs": "sacando a y-prime de entre la multitud",
    "watchOutFor": "olvidando el primo y en términos y",
    "rememberThis": "diferenciar ambos lados y resolver para y-prime",
    "typicalProblemShapes": [
      "Ecuaciones que definen curvas, no explícitas y = ... formas",
      "Productos o poderes que involucran y"
    ],
    "miniDrill": [
      {
        "prompt": "¿Derivada de y^3 con respecto a x?",
        "answer": "3 años ^ 2 años"
      },
      {
        "prompt": "Después de derivar implícitamente, ¿qué paso final de álgebra suele aparecer?",
        "answer": "Resuelve para y'."
      }
    ],
    "memoryHook": "Diferenciar todo, rescatar y-prime.",
    "quickExample": {
      "problem": "Diferenciar x^2 + y^2 = 25",
      "move": "2x + 2y y' = 0, luego resuelve para y'."
    }
  },
  "logarithmic-differentiation": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Diferenciación logarítmica",
    "name": "Diferenciación logarítmica",
    "useItWhen": "potencias o exponentes se vuelven raros",
    "looksLike": "y = x^x o y = (x^2 + 1)^x",
    "doThis": "tomar l, distribuir las cosas, luego diferenciar",
    "thinkOfItAs": "convertir un nudo enredado en hilos separados",
    "watchOutFor": "olvidar que ln(y) se convierte en y primo sobre y",
    "rememberThis": "toma l primero cuando los exponentes se vuelven raros",
    "typicalProblemShapes": [
      "Variable en el exponente como x^x",
      "Grandes productos o cocientes elevados a potencias"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el primer movimiento para y = x^x?",
        "answer": "Tome l de ambos lados."
      },
      {
        "prompt": "Después de derivar ln(y), ¿qué aparece a la izquierda?",
        "answer": "y'/y"
      }
    ],
    "memoryHook": "¿Exponentes extraños? Regístrelo primero.",
    "quickExample": {
      "problem": "Diferenciar y = x^x",
      "move": "Utilice ln(y) = x ln x, diferencie y luego resuelva para encontrar y'."
    }
  },
  "higher-derivatives": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Derivados superiores",
    "name": "Derivados más altos",
    "useItWhen": "Piden segundo, tercero o más.",
    "looksLike": "f''(x), y'', d^3y/dx^3",
    "doThis": "diferenciar de nuevo hasta llegar al orden correcto",
    "thinkOfItAs": "tomando la derivada en capas",
    "watchOutFor": "parando después de la primera derivada",
    "rememberThis": "cebar de nuevo si te lo piden de nuevo",
    "typicalProblemShapes": [
      "Notación con números primos dobles o redacción de segunda derivada",
      "Problemas de concavidad o aceleración."
    ],
    "miniDrill": [
      {
        "prompt": "Si s(t) es posición, ¿cuál es s''(t)?",
        "answer": "Aceleración."
      },
      {
        "prompt": "¿Reutilizas la función original o la primera derivada para encontrar f''?",
        "answer": "Utilice la primera derivada."
      }
    ],
    "memoryHook": "Diferenciar la derivada.",
    "quickExample": {
      "problem": "Si f(x) = x^4, ¿cuál es f''(x)?",
      "move": "La primera derivada es 4x^3, la segunda derivada es 12x^2."
    }
  },
  "tangent-line": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "recta tangente",
    "name": "Línea tangente",
    "useItWhen": "necesitas la línea que coincida con la curva en un punto",
    "looksLike": "encontrar la recta tangente a y = f(x) en x = a",
    "doThis": "encontrar el punto, obtener la pendiente de la derivada, escribir la recta",
    "thinkOfItAs": "la línea que coincide con la dirección de la curva durante un instante",
    "watchOutFor": "usando x = a como pendiente",
    "rememberThis": "punto más pendiente derivada da la recta",
    "typicalProblemShapes": [
      "Un punto en una curva y las palabras línea tangente.",
      "Un mensaje que solicita linealización en un punto."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué da la pendiente tangente: f(a) o f'(a)?",
        "answer": "fa)"
      },
      {
        "prompt": "Después de obtener la pendiente y el punto, ¿qué fórmula de recta es más rápida?",
        "answer": "Forma punto-pendiente."
      }
    ],
    "memoryHook": "Pendiente desde derivada, recta desde punto.",
    "quickExample": {
      "problem": "Encuentra la recta tangente a y = x^2 en x = 2",
      "move": "El punto es (2, 4), la pendiente es 4, entonces y - 4 = 4(x - 2)."
    }
  },
  "normal-line": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "linea normal",
    "name": "Línea Normal",
    "useItWhen": "necesitas la recta perpendicular a la tangente",
    "looksLike": "encontrar la recta normal en x = a",
    "doThis": "encontrar pendiente tangente, darle la vuelta, cambiar el signo, escribir la recta",
    "thinkOfItAs": "compañero lateral de la recta tangente",
    "watchOutFor": "olvidando el recíproco negativo",
    "rememberThis": "la pendiente normal es el recíproco negativo",
    "typicalProblemShapes": [
      "Un problema de recta tangente con la palabra normal en su lugar",
      "Una solicitud de una línea perpendicular a la curva en un punto."
    ],
    "miniDrill": [
      {
        "prompt": "Si la pendiente tangente es -3, ¿cuál es la pendiente normal?",
        "answer": "1/3"
      },
      {
        "prompt": "¿Todavía necesitas el punto de la curva para la línea normal?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Voltear, cambiar de signo, usar el mismo punto.",
    "quickExample": {
      "problem": "Si la pendiente tangente es 2, ¿cuál es la pendiente normal?",
      "move": "-1/2"
    }
  },
  "increasing-decreasing": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Creciendo y disminuyendo",
    "name": "Creciente/Decreciente",
    "useItWhen": "necesitas dónde sube o baja el gráfico",
    "looksLike": "encontrar intervalos de aumento y disminución",
    "doThis": "hacer una tabla de signos f-prime",
    "thinkOfItAs": "Luz verde para subir, luz roja para bajar.",
    "watchOutFor": "usando f en lugar de f-prime para el gráfico de signos",
    "rememberThis": "f-prime positivo significa creciente",
    "typicalProblemShapes": [
      "Preguntas de intervalo sobre dónde sube o baja la gráfica",
      "Gráficos de signos derivados o tablas de puntos críticos"
    ],
    "miniDrill": [
      {
        "prompt": "Si f'(x) > 0, ¿la gráfica sube o baja?",
        "answer": "Arriba."
      },
      {
        "prompt": "¿Dónde suelen comenzar y terminar los intervalos del gráfico de signos?",
        "answer": "En puntos críticos y lugares donde f' no está definido."
      }
    ],
    "memoryHook": "Cebado positivo, cebado negativo.",
    "quickExample": {
      "problem": "Si f'(x) es negativo en (1, 4), ¿qué hace f allí?",
      "move": "Es decreciente en (1, 4)."
    }
  },
  "local-max-min": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Máximo y mínimo locales",
    "name": "Máx./Mín. locales",
    "useItWhen": "quieres picos y valles cercanos",
    "looksLike": "encontrar extremos locales o puntos de inflexión",
    "doThis": "Encuentre puntos críticos y luego pruebe alrededor de ellos.",
    "thinkOfItAs": "colinas y valles en una corta caminata",
    "watchOutFor": "llamar a cada punto crítico un máximo o mínimo sin realizar pruebas",
    "rememberThis": "Punto crítico primero, decisión después.",
    "typicalProblemShapes": [
      "Preguntas sobre puntos de inflexión",
      "Puntos críticos seguidos de pruebas de signos o de segunda derivada"
    ],
    "miniDrill": [
      {
        "prompt": "De positivo a negativo en f'. ¿Máximo o mínimo?",
        "answer": "Máximo local."
      },
      {
        "prompt": "Negativo a positivo en f'. ¿Máximo o mínimo?",
        "answer": "mín. local."
      }
    ],
    "memoryHook": "Encuentra el punto crítico, luego lee el turno.",
    "quickExample": {
      "problem": "En un punto crítico, f' cambia de positivo a negativo. ¿Qué es?",
      "move": "Un máximo local."
    }
  },
  "concavity": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Concavidad",
    "name": "Concavidad",
    "useItWhen": "necesitas la curvatura del gráfico",
    "looksLike": "preguntas sobre cóncavo hacia arriba, cóncavo hacia abajo o segunda derivada",
    "doThis": "marque f-double-prime: más está arriba, menos está abajo",
    "thinkOfItAs": "una sonrisa versus un ceño fruncido",
    "watchOutFor": "usando f-prime en lugar de f-double-prime",
    "rememberThis": "segunda derivada indica la curva",
    "typicalProblemShapes": [
      "Preguntas sobre curvatura o flexión",
      "Una segunda derivada ya dada como función o gráfico de signos."
    ],
    "miniDrill": [
      {
        "prompt": "Si f''(x) < 0, ¿sonreír o fruncir el ceño?",
        "answer": "Fruncir el ceño. Cóncavo hacia abajo."
      },
      {
        "prompt": "¿Qué derivada controla la concavidad?",
        "answer": "La segunda derivada."
      }
    ],
    "memoryHook": "Segunda derivada = sonreír o fruncir el ceño.",
    "quickExample": {
      "problem": "Si f''(x) > 0 en un intervalo, ¿qué forma tiene la gráfica?",
      "move": "Cóncavo hacia arriba."
    }
  },
  "inflection-points": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Puntos de inflexión",
    "name": "Puntos de inflexión",
    "useItWhen": "necesitas donde se voltea la curva",
    "looksLike": "encontrar posibles puntos de inflexión",
    "doThis": "encuentre puntos problemáticos de f-doble prima y luego verifique si hay un cambio de signo",
    "thinkOfItAs": "el lugar donde la curva se voltea",
    "watchOutFor": "llamando a cada cero un punto de inflexión",
    "rememberThis": "solo cuenta si la curva cambia",
    "typicalProblemShapes": [
      "Segunda derivada igual a cero seguida de una verificación de signo",
      "Un gráfico que pasa del ceño fruncido a la sonrisa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Es f''(a) = 0 suficiente por sí solo?",
        "answer": "No. La concavidad debe cambiar."
      },
      {
        "prompt": "¿Qué estás probando en torno a un punto candidato?",
        "answer": "El signo de f'' a cada lado."
      }
    ],
    "memoryHook": "Cero es un tal vez. El cambio de signo es la prueba.",
    "quickExample": {
      "problem": "Si f'' cambia de negativo a positivo en x = 1, ¿qué sucede allí?",
      "move": "Hay un punto de inflexión en x = 1."
    }
  },
  "first-derivative-test": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Prueba de la primera derivada",
    "name": "Primera prueba derivada",
    "useItWhen": "quieres máximo o mínimo de los signos f-prime",
    "looksLike": "un gráfico de signos alrededor de un número crítico",
    "doThis": "verifique f-prime a la izquierda y a la derecha del punto",
    "thinkOfItAs": "observar el tráfico antes y después de una intersección",
    "watchOutFor": "probar solo el punto en sí en lugar de intervalos cercanos",
    "rememberThis": "el interruptor de señal cuenta la historia",
    "typicalProblemShapes": [
      "Números críticos seguidos de pruebas de intervalo",
      "Una tabla de signos para f-prime"
    ],
    "miniDrill": [
      {
        "prompt": "De positivo a negativo en f'. ¿Máximo o mínimo?",
        "answer": "Máximo local."
      },
      {
        "prompt": "Sin cambio de signo en f'. ¿Qué puede pasar?",
        "answer": "El punto puede no ser ni máximo ni mínimo."
      }
    ],
    "memoryHook": "Lea el cambio de señal, no sólo el punto.",
    "quickExample": {
      "problem": "f' se vuelve negativo a positivo alrededor de x = 2. ¿Qué es x = 2?",
      "move": "Un mínimo local."
    }
  },
  "second-derivative-test": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Prueba de la segunda derivada",
    "name": "Prueba de la segunda derivada",
    "useItWhen": "ya tienes un punto crítico y quieres una revisión rápida",
    "looksLike": "encuentre f'(c) = 0, luego verifique f''(c)",
    "doThis": "conecte c a f-double-prime: más mínimo, menos máximo",
    "thinkOfItAs": "dejando que la curva decida el giro",
    "watchOutFor": "usándolo cuando f-double-prime es 0",
    "rememberThis": "la segunda derivada decide solo cuando no es cero",
    "typicalProblemShapes": [
      "Un punto crítico ya encontrado a partir de f' = 0",
      "Preguntas que piden una alternativa más rápida a la prueba de la primera derivada"
    ],
    "miniDrill": [
      {
        "prompt": "Si f''(c) < 0 en un punto crítico, ¿cuál es c?",
        "answer": "Un máximo local."
      },
      {
        "prompt": "Si f''(c) = 0, ¿qué dice la prueba de la segunda derivada?",
        "answer": "Nada definitivo. Utilice otra prueba."
      }
    ],
    "memoryHook": "Cuenco positivo = mín. Límite negativo = máx.",
    "quickExample": {
      "problem": "En un punto crítico c, f''(c) = 5. ¿Max o min?",
      "move": "Mínimo local."
    }
  },
  "optimization": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Optimización",
    "name": "Optimización",
    "useItWhen": "el problema dice más grande, más pequeño, más barato o mejor",
    "looksLike": "maximizar el área, minimizar costos, optimizar el volumen",
    "doThis": "escribir objetivo de una variable, diferenciar, probar el ganador",
    "thinkOfItAs": "convertir un lío de palabras en una colina o valle limpio",
    "watchOutFor": "diferenciar antes de obtener una variable",
    "rememberThis": "una variable primero, optimizar en segundo lugar",
    "typicalProblemShapes": [
      "Palabras como maximizar, minimizar, más, menos, más corto, más grande",
      "Problemas verbales de geometría o negocios con una restricción"
    ],
    "miniDrill": [
      {
        "prompt": "Antes de diferenciar, ¿cuántas variables debe tener su función objetivo?",
        "answer": "Uno."
      },
      {
        "prompt": "Después de encontrar un punto crítico, ¿has terminado?",
        "answer": "No. Aún debes confirmar que ofrece el mejor valor."
      }
    ],
    "memoryHook": "Escribe una variable y luego busca el pico o el valle.",
    "quickExample": {
      "problem": "Un rectángulo tiene perímetro fijo. ¿Qué deberías optimizar?",
      "move": "Escribe el área usando una variable, luego diferencia esa función de área."
    }
  },
  "related-rates": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Tarifas relacionadas",
    "name": "Tarifas relacionadas",
    "useItWhen": "Varias cosas cambiantes están unidas por el tiempo.",
    "looksLike": "un radio crece mientras cambia el volumen, o una escalera se desliza mientras cambia la altura",
    "doThis": "escribe la ecuación, diferencia en el tiempo, luego ingresa",
    "thinkOfItAs": "todas las variables se mueven juntas en un reloj",
    "watchOutFor": "conectar números demasiado pronto",
    "rememberThis": "diferenciar primero, luego conectar el momento",
    "typicalProblemShapes": [
      "Tasas dadas como dx/dt o dV/dt",
      "Una fórmula geométrica con valores que cambian con el tiempo."
    ],
    "miniDrill": [
      {
        "prompt": "¿Suele introducir números antes o después de la diferenciación implícita en las tasas relacionadas?",
        "answer": "Después."
      },
      {
        "prompt": "Si dos variables dependen del tiempo, ¿qué derivada suele aparecer para cada una?",
        "answer": "Una tasa como dx/dt o dy/dt."
      }
    ],
    "memoryHook": "Diferenciarse en el tiempo, luego congelar el momento.",
    "quickExample": {
      "problem": "Se solicita un radio de globo que cambia con el tiempo y el volumen. ¿Con respecto a qué variable debes diferenciar?",
      "move": "Tiempo."
    }
  },
  "linear-approximation": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Aproximación lineal",
    "name": "Aproximación lineal",
    "useItWhen": "necesitas una estimación rápida cerca de un buen punto",
    "looksLike": "aproximar sqrt(4.1) o estimar una función cerca de x = a",
    "doThis": "Usa la fórmula de la recta tangente.",
    "thinkOfItAs": "usando la versión local de línea recta de la curva",
    "watchOutFor": "elegir un punto base que no esté cerca",
    "rememberThis": "cerca de a, usa la recta tangente",
    "typicalProblemShapes": [
      "Aproximar el valor de una función cerca de un buen número",
      "Un mensaje que menciona la linealización local o la estimación de la línea tangente"
    ],
    "miniDrill": [
      {
        "prompt": "Para estimar sqrt(4.1), ¿debe ser 1, 4 o 9?",
        "answer": "4, porque es cercano y fácil."
      },
      {
        "prompt": "¿Qué dos ingredientes necesita la aproximación lineal en x = a?",
        "answer": "f(a) y f'(a)."
      }
    ],
    "memoryHook": "Cerca de un buen punto, usa la línea tangente.",
    "quickExample": {
      "problem": "Estimar sqrt(4.1) usando a = 4",
      "move": "Utilice la recta tangente para sqrt(x) en x = 4."
    }
  },
  "antiderivative-idea": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "idea antiderivada",
    "name": "Idea antiderivada",
    "useItWhen": "quieres deshacer una derivada",
    "looksLike": "encontrar una función cuya derivada sea 6x o cos x",
    "doThis": "preguntar qué función se diferenciaría de esta",
    "thinkOfItAs": "ejecutando la película derivada hacia atrás",
    "watchOutFor": "olvidando la familia constante",
    "rememberThis": "antiderivada significa invertir la derivada",
    "typicalProblemShapes": [
      "Solicita una función cuya derivada se conozca",
      "Preguntas integrales tempranas antes de que aparezca la notación formal"
    ],
    "miniDrill": [
      {
        "prompt": "Si la derivada es 4x^3, ¿qué familia de funciones podrían funcionar?",
        "answer": "x^4 más una constante."
      },
      {
        "prompt": "¿Revertir una derivada da una respuesta o una familia?",
        "answer": "Una familia."
      }
    ],
    "memoryHook": "El pensamiento integral comienza con el modo inverso.",
    "quickExample": {
      "problem": "¿Qué función tiene derivada 6x?",
      "move": "Las funciones de tipo x^2 funcionan; la primitiva básica es 3x^2 más una constante posterior."
    }
  },
  "indefinite-integral": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "Integral indefinida",
    "name": "Integral indefinida",
    "useItWhen": "quieres toda la familia de antiderivadas",
    "looksLike": "integral de f(x) dx",
    "doThis": "encuentra la antiderivada y suma más C",
    "thinkOfItAs": "la respuesta con espacio para cambios verticales",
    "watchOutFor": "olvidando el plus C",
    "rememberThis": "integrales indefinidas viajan con más C",
    "typicalProblemShapes": [
      "Notación integral sin límites superiores o inferiores",
      "Indica que se solicita una antiderivada general."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué pieza extra pertenece a cada respuesta integral indefinida?",
        "answer": "+C"
      },
      {
        "prompt": "¿Una integral definida obtiene + C?",
        "answer": "No."
      }
    ],
    "memoryHook": "Sin límites significa más C.",
    "quickExample": {
      "problem": "Integral de 2x dx",
      "move": "x^2 + C"
    }
  },
  "integral-power-rule": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "Regla de potencia básica para integrales",
    "name": "Regla de potencia integral",
    "useItWhen": "estás integrando x a una potencia, pero no x^-1",
    "looksLike": "integral de x^n dx",
    "doThis": "suma 1, divide por la nueva potencia, suma C",
    "thinkOfItAs": "La regla de la potencia derivada se juega al revés.",
    "watchOutFor": "usándolo en x^-1",
    "rememberThis": "agregar uno, dividir por el nuevo",
    "typicalProblemShapes": [
      "Potencias simples de x en una integral indefinida",
      "Polinomios integrados término por término"
    ],
    "miniDrill": [
      {
        "prompt": "¿Integral de x^2dx?",
        "answer": "x^3/3 + C"
      },
      {
        "prompt": "¿Cuál es el exponente especial que no debes introducir en la regla básica de la potencia?",
        "answer": "-1"
      }
    ],
    "memoryHook": "Suma uno, divide y más C.",
    "quickExample": {
      "problem": "Integral de x^4 dx",
      "move": "x^5/5 + C"
    }
  },
  "definite-integral-area": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "Integral definida como idea de área",
    "name": "Integral definida = Área firmada",
    "useItWhen": "necesitas un cambio total en un intervalo",
    "looksLike": "integral de a a b de f(x) dx",
    "doThis": "léalo como área firmada de izquierda a derecha",
    "thinkOfItAs": "sumando muchos rectángulos pequeños",
    "watchOutFor": "olvidar debajo del eje x cuenta negativamente",
    "rememberThis": "integrales definidas suman cambios en un intervalo",
    "typicalProblemShapes": [
      "Signos integrales con límites reales.",
      "Preguntas gráficas que solicitan área total o neta"
    ],
    "miniDrill": [
      {
        "prompt": "¿El área debajo del eje x cuenta como positiva o negativa en una integral definida bruta?",
        "answer": "Negativo."
      },
      {
        "prompt": "¿Qué controla el intervalo [a, b]?",
        "answer": "Donde comienza y termina la acumulación."
      }
    ],
    "memoryHook": "Los límites significan el total durante un tramo.",
    "quickExample": {
      "problem": "¿Qué mide la integral de 0 a 2 de f(x) dx?",
      "move": "Área neta acumulada de x = 0 a x = 2."
    }
  },
  "ftc-practical": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "Teorema fundamental del cálculo",
    "name": "Uso práctico de la FTC",
    "useItWhen": "necesitas una integral definida rápida o una derivada integral",
    "looksLike": "configuración superior-inferior o d/dx de una integral a x",
    "doThis": "use la parte superior menos la inferior, o desenvuelva el interior",
    "thinkOfItAs": "derivadas e integrales dándose la mano",
    "watchOutFor": "olvidando arriba menos abajo",
    "rememberThis": "antiderivada para evaluar, función original para desenvolver",
    "typicalProblemShapes": [
      "Evaluar una integral definida usando una antiderivada",
      "Derivar una integral cuyo límite superior es x"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el patrón de evaluación rápida para una integral definida?",
        "answer": "Antiderivada arriba menos antiderivada abajo."
      },
      {
        "prompt": "¿Derivada de la integral de 0 a x de cos t dt?",
        "answer": "porque x"
      }
    ],
    "memoryHook": "Arriba menos abajo, o desenvolver hacia adentro.",
    "quickExample": {
      "problem": "Integral de 1 a 3 de 2x dx",
      "move": "Utilice x^2, luego haga 3^2 - 1^2."
    }
  },
  "u-substitution": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "Introducción básica a la sustitución en U",
    "name": "u-sustitución",
    "useItWhen": "Aparecen una expresión interna y su derivada.",
    "looksLike": "integral de 2x(x^2 + 1)^5 dx o integral de cos(3x) dx",
    "doThis": "déjate ser el interior, cambia a du, integra, vuelve a cambiar",
    "thinkOfItAs": "la regla de la cadena corriendo hacia atrás",
    "watchOutFor": "elegir la u equivocada u olvidar du",
    "rememberThis": "Inside Plus Inside-Derivative es la luz verde.",
    "typicalProblemShapes": [
      "Un gran poder exterior con un elegante derivado interior cercano.",
      "Composiciones trigonométricas, exponenciales o polinómicas dentro de una integral"
    ],
    "miniDrill": [
      {
        "prompt": "Para la integral de 6x(3x^2 + 4)^8 dx, ¿cuál es la u natural?",
        "answer": "tu = 3x^2 + 4"
      },
      {
        "prompt": "¿Qué pista derivada te dice que u-sub podría funcionar?",
        "answer": "La derivada de la expresión interna ya está presente o casi presente."
      }
    ],
    "memoryHook": "Dentro más derivada significa sustituirlo.",
    "quickExample": {
      "problem": "Integral de 2x(x^2 + 1)^5 dx",
      "move": "Sea u = x^2 + 1 entonces du = 2x dx."
    }
  },
  "mean-value-theorem": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Teorema del valor medio",
    "name": "Teorema del valor medio",
    "useItWhen": "necesita un punto garantizado de pendiente promedio y pendiente instantánea",
    "looksLike": "continua en [a,b], diferenciable en (a,b)",
    "doThis": "verifique las condiciones, luego haga coincidir la pendiente secante con la pendiente tangente",
    "thinkOfItAs": "En algún lugar el velocímetro coincide con el promedio del viaje.",
    "watchOutFor": "usarlo cuando la función tiene una esquina o rotura",
    "rememberThis": "la pendiente promedio se muestra como una pendiente tangente",
    "typicalProblemShapes": [
      "Una verificación de condición de intervalo cerrado y de intervalo abierto",
      "Preguntas que piden demostrar que existe alguna c"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué dos condiciones debes comprobar primero?",
        "answer": "Continuo en el intervalo cerrado y diferenciable en el intervalo abierto."
      },
      {
        "prompt": "¿Qué pendiente coincide dentro del intervalo?",
        "answer": "La pendiente secante promedio."
      }
    ],
    "memoryHook": "La pendiente promedio aparece en algún lugar del interior.",
    "quickExample": {
      "problem": "¿Qué pendiente comparas en MVT?",
      "move": "La pendiente secante a lo largo del intervalo."
    }
  },
  "curve-sketching": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "Resumen de bocetos de curvas",
    "name": "Dibujo de curvas",
    "useItWhen": "necesitas toda la historia del gráfico",
    "looksLike": "intercepta, asíntotas, creciente, concavidad, extremos",
    "doThis": "encontrar las características clave en un orden fijo y construir el gráfico",
    "thinkOfItAs": "una lista de verificación, no una suposición",
    "watchOutFor": "saltar al boceto sin comprobar los signos derivados",
    "rememberThis": "características primero, boceto segundo",
    "typicalProblemShapes": [
      "Solicita un análisis gráfico completo",
      "Funciones con asíntotas, extremos y cambios de curvatura"
    ],
    "miniDrill": [
      {
        "prompt": "¿Quieres gráficos de signos derivados aquí?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Deben comprobarse las asíntotas antes de dibujar?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Grafica por lista de verificación, no por vibraciones.",
    "quickExample": {
      "problem": "¿Qué viene antes de esbozar la forma final?",
      "move": "Una lista de verificación de funciones."
    }
  },
  "newtons-method": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 3: Aplicaciones de la Derivación",
    "unit": "Aplicaciones",
    "topic": "El método de Newton",
    "name": "El método de Newton",
    "useItWhen": "quieres una aproximación de raíz rápida",
    "looksLike": "x_(n+1) = x_n - f(x_n)/f'(x_n)",
    "doThis": "comienza cerca de la raíz y sigue saltando con líneas tangentes",
    "thinkOfItAs": "caminando hacia el eje x por tangentes",
    "watchOutFor": "comenzar demasiado lejos o dividir por una pequeña derivada",
    "rememberThis": "la siguiente x viene de la recta tangente",
    "typicalProblemShapes": [
      "Aproximar un cero de una función.",
      "Fórmulas de iteración construidas a partir de f y f-prime"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué dos piezas funcionales necesita el método de Newton?",
        "answer": "f(x) y f-primo(x)."
      },
      {
        "prompt": "¿El método de Newton encuentra siempre una respuesta exacta?",
        "answer": "No. Es un método de aproximación."
      }
    ],
    "memoryHook": "Paso tangente, luego paso tangente nuevamente.",
    "quickExample": {
      "problem": "¿Qué utiliza el método de Newton para mejorar una suposición?",
      "move": "Un paso de línea tangente."
    }
  },
  "areas-between-curves": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 5: Aplicaciones de la Integración",
    "unit": "Aplicaciones de la Integración",
    "topic": "Áreas entre curvas",
    "name": "Área entre curvas",
    "useItWhen": "necesitas el espacio atrapado entre dos gráficos",
    "looksLike": "función superior menos función inferior",
    "doThis": "elija la parte superior e inferior, luego integre la parte superior menos la inferior",
    "thinkOfItAs": "restando capas apiladas",
    "watchOutFor": "usando la curva inferior primero",
    "rememberThis": "arriba menos abajo",
    "typicalProblemShapes": [
      "Dos curvas que se cruzan en un intervalo.",
      "Una región sombreada entre gráficos."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué función va primero en el integrando?",
        "answer": "La función superior."
      },
      {
        "prompt": "Si izquierda-derecha es más fácil, ¿puedes integrar con respecto a y?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Área entre curvas = arriba menos abajo.",
    "quickExample": {
      "problem": "¿Cuál es la configuración habitual para el área entre y = f(x) e y = g(x)?",
      "move": "Integre la parte superior menos la inferior."
    }
  },
  "disk-washer-method": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 5: Aplicaciones de la Integración",
    "unit": "Aplicaciones de la Integración",
    "topic": "Volúmenes por discos y arandelas.",
    "name": "Método de disco/lavadora",
    "useItWhen": "una región gira y los cortes son círculos o anillos",
    "looksLike": "volumen de revolución alrededor de un eje",
    "doThis": "utilizar radio grande al cuadrado menos radio pequeño al cuadrado",
    "thinkOfItAs": "apilar monedas o donas",
    "watchOutFor": "usando diámetro en lugar de radio",
    "rememberThis": "arandela = círculo grande menos círculo pequeño",
    "typicalProblemShapes": [
      "Rotación alrededor del eje x o del eje y",
      "Secciones transversales perpendiculares al eje."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué potencia llega al radio?",
        "answer": "Al cuadrado."
      },
      {
        "prompt": "¿Qué constante se encuentra al frente?",
        "answer": "Pi."
      }
    ],
    "memoryHook": "El disco es un radio. La lavadora es exterior menos interior.",
    "quickExample": {
      "problem": "¿Qué cambia de disco a lavadora?",
      "move": "Aparece un agujero, así que resta el radio interior al cuadrado."
    }
  },
  "shell-method": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 5: Aplicaciones de la Integración",
    "unit": "Aplicaciones de la Integración",
    "topic": "Volúmenes por carcasas cilíndricas.",
    "name": "Método de cáscara",
    "useItWhen": "El hilado hace que las carcasas cilíndricas delgadas sean más fáciles que las lavadoras.",
    "looksLike": "2 pi por radio por altura",
    "doThis": "use el radio y la altura del caparazón, luego integre",
    "thinkOfItAs": "envolver el sólido en tubos de papel finos",
    "watchOutFor": "mezclando la altura de la concha con el radio de la concha",
    "rememberThis": "Los proyectiles utilizan radio multiplicado por altura.",
    "typicalProblemShapes": [
      "Rotación donde las lavadoras se sienten incómodas",
      "Cortes paralelos al eje de rotación."
    ],
    "miniDrill": [
      {
        "prompt": "¿Los proyectiles usan radio multiplicado por qué?",
        "answer": "Altura."
      },
      {
        "prompt": "¿Las conchas suelen surgir de cortes paralelos o perpendiculares al eje?",
        "answer": "Paralelo."
      }
    ],
    "memoryHook": "Conchas = altura de radio de 2 pi.",
    "quickExample": {
      "problem": "¿Qué constante inicia la fórmula del shell?",
      "move": "2 pi."
    }
  },
  "work-integrals": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 5: Aplicaciones de la Integración",
    "unit": "Aplicaciones de la Integración",
    "topic": "trabajo",
    "name": "Trabajar como integral",
    "useItWhen": "cambios de fuerza a través de la distancia",
    "looksLike": "muelles, elevación, bombeo, fuerza variable",
    "doThis": "fuerza multiplicada por una pequeña distancia, luego integre",
    "thinkOfItAs": "agregando pequeños empujones",
    "watchOutFor": "usando una fuerza constante cuando la fuerza cambia",
    "rememberThis": "fuerza variable significa fuerza integrada",
    "typicalProblemShapes": [
      "Problemas de resorte de la ley de Hooke",
      "Levantar cadenas, cuerdas o líquidos"
    ],
    "miniDrill": [
      {
        "prompt": "Si la fuerza cambia con x, ¿se multiplica una vez o se integra?",
        "answer": "Integrar."
      },
      {
        "prompt": "¿Qué ley aparece a menudo con los resortes?",
        "answer": "Ley de Hooke."
      }
    ],
    "memoryHook": "Cambiar la fuerza significa agregar pequeños empujones.",
    "quickExample": {
      "problem": "¿Cuál es la pequeña pieza en una integral de trabajo?",
      "move": "Fuerza multiplicada por una distancia pequeña."
    }
  },
  "average-value-function": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 5: Aplicaciones de la Integración",
    "unit": "Aplicaciones de la Integración",
    "topic": "Valor medio de una función",
    "name": "Valor promedio de una función",
    "useItWhen": "necesitas la producción promedio durante un intervalo",
    "looksLike": "1 sobre b-a multiplicado por una integral",
    "doThis": "tomar el total de la integral, luego dividir por la longitud del intervalo",
    "thinkOfItAs": "área convertida en altura promedio",
    "watchOutFor": "olvidando el paso de dividir por longitud",
    "rememberThis": "promedio = integral dividida por el ancho del intervalo",
    "typicalProblemShapes": [
      "Temperatura, velocidad o valor promedio a lo largo del tiempo",
      "Un mensaje directo de fórmula de valor promedio"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué da la integral primero?",
        "answer": "La acumulación total."
      },
      {
        "prompt": "¿Qué convierte ese total en un promedio?",
        "answer": "Dividir por la duración del intervalo."
      }
    ],
    "memoryHook": "Altura promedio = área total dividida por el ancho.",
    "quickExample": {
      "problem": "Después de la integral, ¿por qué sigues dividiendo?",
      "move": "b menos a."
    }
  },
  "limit-laws": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 1: Funciones y Límites",
    "unit": "Límites",
    "topic": "Calcular límites usando leyes de límites",
    "name": "Leyes límite",
    "useItWhen": "El límite se puede dividir en pedazos más pequeños y fáciles.",
    "looksLike": "suma, diferencia, producto, cociente o potencias dentro de un límite",
    "doThis": "dividir el límite y simplificar pieza por pieza",
    "thinkOfItAs": "romper una caja grande en cajas pequeñas",
    "watchOutFor": "usando la ley del cociente cuando el límite inferior es 0",
    "rememberThis": "divide lo que puedas, luego conecta",
    "typicalProblemShapes": [
      "Un polinomio construido a partir de términos más pequeños.",
      "Una fracción donde el límite inferior permanece distinto de cero"
    ],
    "miniDrill": [
      {
        "prompt": "¿Puedes dividir el límite de una suma en dos límites?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Cuándo se infringe la ley del cociente?",
        "answer": "Cuando el límite del denominador es 0."
      }
    ],
    "memoryHook": "Rompe el límite antes de luchar contra él.",
    "quickExample": {
      "problem": "Límite de (x^2 + 3x) cuando x llega a 2",
      "move": "Tome el límite de cada término y luego sume."
    }
  },
  "derivative-as-function": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "La derivada como función.",
    "name": "Función derivada",
    "useItWhen": "quieres la regla para la pendiente, no solo una pendiente",
    "looksLike": "f-primo de x o dy/dx",
    "doThis": "diferenciar una vez, luego tratar el resultado como una nueva función",
    "thinkOfItAs": "una máquina pendiente construida a partir de la función original",
    "watchOutFor": "encontrar la pendiente en un punto cuando el problema quiere la derivada completa",
    "rememberThis": "f-prime da pendiente en todos los lugares donde existe",
    "typicalProblemShapes": [
      "Encuentre f-primo(x), no solo f-primo en un número",
      "Una pregunta gráfica que pregunta dónde la pendiente es positiva o negativa."
    ],
    "miniDrill": [
      {
        "prompt": "¿F-prime es un número o una nueva función?",
        "answer": "Una nueva función."
      },
      {
        "prompt": "¿Qué te dice f-prime?",
        "answer": "El comportamiento de la pendiente de la función original."
      }
    ],
    "memoryHook": "Diferencia una vez y obtén un mapa de pendientes.",
    "quickExample": {
      "problem": "Si f(x) = x^3, ¿cuál es la función derivada?",
      "move": "f-primo(x) = 3x^2."
    }
  },
  "trig-derivatives": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Derivadas de funciones trigonométricas",
    "name": "Derivados trigonométricos",
    "useItWhen": "Aparecen seno, coseno, tangente o amigos.",
    "looksLike": "sen x, cos x, tan x, sec x",
    "doThis": "use los patrones de derivada trigonométrica estándar, luego la regla de la cadena si es necesario",
    "thinkOfItAs": "una pequeña lista que memorizas y despliegas rápidamente",
    "watchOutFor": "olvidando el negativo en d/dx de cos x",
    "rememberThis": "el pecado va a cos, porque va a menos pecado",
    "typicalProblemShapes": [
      "Funciones trigonométricas básicas por sí solas",
      "Funciones trigonométricas con una expresión interna como sin(3x)"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es d/dx del sen x?",
        "answer": "porque x."
      },
      {
        "prompt": "¿Cuál es la trampa en d/dx de cos x?",
        "answer": "Falta el signo negativo."
      }
    ],
    "memoryHook": "Pecado a porque. Porque menos pecado.",
    "quickExample": {
      "problem": "Derivada de cos x",
      "move": "Es menos sen x."
    }
  },
  "differentials": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 2: Derivadas",
    "unit": "Derivadas",
    "topic": "Aproximaciones lineales y diferenciales.",
    "name": "Diferenciales",
    "useItWhen": "necesita una estimación rápida de pequeños cambios",
    "looksLike": "dy = f-primo(x) dx",
    "doThis": "tomar la derivada, multiplicarla por el pequeño cambio de entrada y estimar",
    "thinkOfItAs": "matemáticas ampliadas donde las curvas actúan casi rectas",
    "watchOutFor": "usar grandes cambios como si la estimación lineal se mantuviera perfecta",
    "rememberThis": "Small dx proporciona una estimación útil de dy",
    "typicalProblemShapes": [
      "Calcula cuánto cambia y cuando x cambia un poco",
      "Error de estimación o valores cercanos rápidos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué dos piezas forman dy?",
        "answer": "f-primo(x) y dx."
      },
      {
        "prompt": "¿Los diferenciales funcionan mejor para cambios pequeños o grandes?",
        "answer": "Pequeños cambios."
      }
    ],
    "memoryHook": "Pequeño cambio de entrada, derivada multiplicada por dx.",
    "quickExample": {
      "problem": "¿Cómo se estima un pequeño cambio en la producción?",
      "move": "Utilice dy = f-prime(x) dx."
    }
  },
  "area-distance-problems": {
    "course": "Cálculo de una Variable 1",
    "chapter": "Capítulo 4: Integrales",
    "unit": "Integrales",
    "topic": "Problemas de área y distancia.",
    "name": "Problemas de área y distancia",
    "useItWhen": "necesitas una acumulación total de muchas piezas pequeñas",
    "looksLike": "área bajo una curva o velocidad sumando distancia",
    "doThis": "córtalo en trozos pequeños, suma con una integral y luego interpreta el resultado",
    "thinkOfItAs": "convertir muchas pequeñas piezas en un total",
    "watchOutFor": "mezclando el área firmada con la distancia total",
    "rememberThis": "Las integrales suman pequeñas piezas para formar un total.",
    "typicalProblemShapes": [
      "Área bajo un gráfico de tarifas",
      "La velocidad con el tiempo se convierte en desplazamiento o distancia."
    ],
    "miniDrill": [
      {
        "prompt": "¿Una integral definida suma muchas piezas pequeñas?",
        "answer": "Sí."
      },
      {
        "prompt": "Para la distancia total, ¿las piezas de velocidad negativa permanecen negativas?",
        "answer": "No. Utilice el pensamiento de valor absoluto."
      }
    ],
    "memoryHook": "Integral = total de piezas pequeñas.",
    "quickExample": {
      "problem": "¿Qué da primero la integral de velocidad?",
      "move": "Cambio neto de posición."
    }
  },
  "calc2-integration-by-parts": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "Integración por partes",
    "name": "Integración por Partes",
    "useItWhen": "un producto está dentro de la integral",
    "looksLike": "x e^x, x sen x, x ln x",
    "doThis": "elija u y dv, luego use uv menos integral v du",
    "thinkOfItAs": "regla del producto al revés",
    "watchOutFor": "elegirte para que la nueva integral empeore",
    "rememberThis": "Escogete para simplificar",
    "typicalProblemShapes": [
      "Un polinomio multiplicado por trigonométrico, exponencial o log",
      "Una integral donde un factor se vuelve más simple cuando se diferencia"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué fórmula ejecuta este método?",
        "answer": "uv menos integral v du."
      },
      {
        "prompt": "Para x ln x, ¿cuál es la u natural?",
        "answer": "En x."
      }
    ],
    "memoryHook": "¿Producto dentro? Piense en la regla del producto al revés.",
    "quickExample": {
      "problem": "Integral de x e^x dx",
      "move": "Tome u = x y dv = e^x dx."
    }
  },
  "calc2-trig-integrals": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "Integrales trigonométricas",
    "name": "Integrales trigonométricas",
    "useItWhen": "la integral se construye a partir de potencias de sin, cos, sec o tan",
    "looksLike": "sen^3 x cos^2 x o sec^3 x tan x",
    "doThis": "busca algún poder extraño o el par sec-bronceador y divídelo inteligentemente",
    "thinkOfItAs": "Coincidencia de patrones con trajes trigonométricos.",
    "watchOutFor": "usando una regla para cada mezcla trigonométrica",
    "rememberThis": "poder extraño o pista de sec-tan primero",
    "typicalProblemShapes": [
      "Potencias del seno y el coseno juntas",
      "Potencias secante y tangente mixtas"
    ],
    "miniDrill": [
      {
        "prompt": "Extraño poder del seno presente. ¿Salvar uno qué?",
        "answer": "Guarde un factor seno."
      },
      {
        "prompt": "sec^3 x tan x generalmente sugiere ¿qué?",
        "answer": "Mantenga seg x tan x juntos."
      }
    ],
    "memoryHook": "Los poderes trigonométricos son juegos de patrones.",
    "quickExample": {
      "problem": "Integral de sen^3 x cos^2 x dx",
      "move": "Guarde un sen x y convierta el resto en piezas cos."
    }
  },
  "calc2-trig-substitution": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "sustitución trigonométrica",
    "name": "Sustitución trigonométrica",
    "useItWhen": "una raíz cuadrada tiene a^2 - x^2, a^2 + x^2, o x^2 - a^2",
    "looksLike": "raíz cuadrada (9 - x^2), raíz cuadrada (x^2 + 16), raíz cuadrada (x^2 - 25)",
    "doThis": "hacer coincidir el patrón de raíz con la sustitución sin, tan o sec",
    "thinkOfItAs": "usando una identidad trigonométrica para limpiar la raíz",
    "watchOutFor": "elegir la coincidencia trigonométrica incorrecta",
    "rememberThis": "el patrón raíz elige el trigonograma",
    "typicalProblemShapes": [
      "Raíces cuadradas construidas a partir de formas cuadráticas.",
      "Una raíz que no se simplifica mediante u-sub regular"
    ],
    "miniDrill": [
      {
        "prompt": "¿a^2 - x^2 coincide con qué trigonometría?",
        "answer": "Seno."
      },
      {
        "prompt": "¿x^2 + a^2 coincide con qué trigonometría?",
        "answer": "Tangente."
      }
    ],
    "memoryHook": "Vea la raíz, elija el trigonograma.",
    "quickExample": {
      "problem": "Integral con raíz cuadrada (9 - x^2)",
      "move": "Utilice x = 3 sen theta."
    }
  },
  "calc2-partial-fractions": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "fracciones parciales",
    "name": "fracciones parciales",
    "useItWhen": "tienes una función racional lista para desintegrarse",
    "looksLike": "(2x + 3)/(x^2 - x - 2)",
    "doThis": "factorizar el denominador, dividir la fracción, resolver constantes",
    "thinkOfItAs": "convertir una fracción fea en fracciones fáciles",
    "watchOutFor": "olvidarse de factorizar primero o hacerlo en una fracción impropia",
    "rememberThis": "factorizar, dividir, resolver, integrar",
    "typicalProblemShapes": [
      "Una función racional con denominador factorizable",
      "Fracciones que parecen más difíciles de integrar como una sola pieza"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué verificas antes de fracciones parciales?",
        "answer": "El grado superior debe ser menor que el grado inferior."
      },
      {
        "prompt": "¿Primero pasar a x^2 - x - 2?",
        "answer": "Factorízalo."
      }
    ],
    "memoryHook": "Una fracción, muchas fracciones más fáciles.",
    "quickExample": {
      "problem": "Integral de (2x + 3)/(x^2 - x - 2) dx",
      "move": "Factoriza la parte inferior antes de dividir."
    }
  },
  "calc2-improper-integrals": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "Integrales impropias",
    "name": "Integrales impropias",
    "useItWhen": "un límite es infinito o el integrando explota",
    "looksLike": "integral al infinito o integral con asíntota vertical",
    "doThis": "reemplazar el mal lugar con un límite",
    "thinkOfItAs": "una integral regular con una etiqueta de advertencia",
    "watchOutFor": "conectando el conector defectuoso directamente",
    "rememberThis": "mal límite significa límite primero",
    "typicalProblemShapes": [
      "Un límite superior o inferior es el infinito.",
      "La función no está definida en algún lugar del intervalo."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué reemplaza al infinito en la configuración?",
        "answer": "Un límite."
      },
      {
        "prompt": "¿Puede una integral impropia divergir?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Infinito o explosión significa límites.",
    "quickExample": {
      "problem": "Integral de 1 a infinito de 1/x^2 dx",
      "move": "Convierte el infinito en un límite."
    }
  },
  "calc2-numerical-integration": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "Integración numérica",
    "name": "Integración numérica",
    "useItWhen": "necesita una estimación en lugar de una antiderivada limpia",
    "looksLike": "Regla trapezoidal o regla de Simpson",
    "doThis": "construir subintervalos iguales, luego aplicar la fórmula",
    "thinkOfItAs": "estimar el área con piezas simples",
    "watchOutFor": "mezclar pesos de puntos finales",
    "rememberThis": "estimar con un patrón, no conjeturas",
    "typicalProblemShapes": [
      "Una tabla de valores sin antiderivada fácil",
      "Solicita nombrar trapezoidal o regla de Simpson"
    ],
    "miniDrill": [
      {
        "prompt": "¿Se cuentan los puntos finales una o dos veces en la regla trapezoidal?",
        "answer": "Una vez."
      },
      {
        "prompt": "¿La regla de Simpson necesita qué tipo de recuento de subintervalos?",
        "answer": "Un número par."
      }
    ],
    "memoryHook": "Utilice el patrón de peso, no un globo ocular áspero.",
    "quickExample": {
      "problem": "Usa trapecios para estimar una integral.",
      "move": "Encuentre delta x, enumere los puntos, aplique el patrón de peso."
    }
  },
  "calc2-arc-length": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 8: Más Aplicaciones de la Integración",
    "unit": "Aplicaciones y Curvas",
    "topic": "Longitud del arco",
    "name": "Longitud del arco",
    "useItWhen": "necesitas saber qué tan larga es realmente una curva",
    "looksLike": "encuentre la longitud de y = f(x) de a a b",
    "doThis": "use la fórmula de longitud de arco y simplifique antes de integrar",
    "thinkOfItAs": "medir la curvatura, no la distancia horizontal",
    "watchOutFor": "olvidando la raíz cuadrada",
    "rememberThis": "la longitud necesita la fórmula raíz",
    "typicalProblemShapes": [
      "Una curva suave y un intervalo.",
      "Preguntas sobre la longitud real del camino"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué derivada aparece en la fórmula x?",
        "answer": "y-prime."
      },
      {
        "prompt": "¿La longitud del arco utiliza una raíz cuadrada?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "La longitud curva significa fórmula raíz.",
    "quickExample": {
      "problem": "Encuentre la longitud del arco de una curva en un intervalo.",
      "move": "Comience con 1 + (y-prime)^2 debajo de la raíz."
    }
  },
  "calc2-surface-area": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 8: Más Aplicaciones de la Integración",
    "unit": "Aplicaciones y Curvas",
    "topic": "Área de superficie de revolución",
    "name": "Área de superficie de revolución",
    "useItWhen": "una curva gira alrededor de un eje y necesitas el área de la piel",
    "looksLike": "área de superficie alrededor del eje x o del eje y",
    "doThis": "radio multiplicado por la longitud del arco, luego integrar",
    "thinkOfItAs": "papel de regalo alrededor de una curva hilada",
    "watchOutFor": "usando el radio incorrecto",
    "rememberThis": "el área de la superficie es el radio de giro multiplicado por la longitud de la pieza",
    "typicalProblemShapes": [
      "Girar una curva alrededor de un eje.",
      "Un problema que pide piel exterior, no volumen."
    ],
    "miniDrill": [
      {
        "prompt": "Para la rotación alrededor del eje x, ¿cuál es el radio?",
        "answer": "y."
      },
      {
        "prompt": "¿El área de superficie reutiliza la raíz de longitud de arco?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Área de superficie = radio de giro multiplicado por el factor de longitud.",
    "quickExample": {
      "problem": "Gire y = f(x) alrededor del eje x.",
      "move": "Utilice el radio y y el factor de longitud de arco."
    }
  },
  "calc2-parametric-curves": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Curvas paramétricas",
    "name": "Curvas paramétricas",
    "useItWhen": "x e y están dados en términos de t",
    "looksLike": "x = f(t), y = g(t)",
    "doThis": "Trátelo como al conductor y siga el camino que recorre.",
    "thinkOfItAs": "Una perilla oculta que controla ambas coordenadas.",
    "watchOutFor": "olvidar la curva puede trazarse hacia atrás o repetirse",
    "rememberThis": "t mueve tanto x como y",
    "typicalProblemShapes": [
      "Fórmulas separadas para x e y",
      "Una partícula que traza un camino en el tiempo."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué variable controla tanto x como y?",
        "answer": "t."
      },
      {
        "prompt": "¿Se puede trazar dos veces la misma curva paramétrica?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Un parámetro controla todo el camino.",
    "quickExample": {
      "problem": "x = cos t, y = sen t",
      "move": "Léalo como una curva trazada por el tiempo."
    }
  },
  "calc2-parametric-derivatives": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Derivadas de curvas paramétricas",
    "name": "Derivada paramétrica",
    "useItWhen": "necesitas dy/dx de x(t) e y(t)",
    "looksLike": "x = f(t), y = g(t), encontrar pendiente",
    "doThis": "utilizar dy/dt sobre dx/dt",
    "thinkOfItAs": "cambio en y sobre cambio en x, ambos hasta t",
    "watchOutFor": "usando dy/dt como si fuera dy/dx",
    "rememberThis": "dy/dx = (dy/dt)/(dx/dt)",
    "typicalProblemShapes": [
      "Pendiente de la recta tangente para una trayectoria paramétrica",
      "Preguntas que usan t en lugar de x directamente"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué va en el denominador?",
        "answer": "dx/dt."
      },
      {
        "prompt": "Si dx/dt = 0, ¿qué advertencia aparece?",
        "answer": "La fórmula de la pendiente se rompe ahí."
      }
    ],
    "memoryHook": "La pendiente es la tasa y sobre la tasa x.",
    "quickExample": {
      "problem": "Encuentre la pendiente de una curva paramétrica en t = 1.",
      "move": "Primero deriva xey con respecto a t."
    }
  },
  "calc2-parametric-arc-length": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Longitud de arco para curvas paramétricas",
    "name": "Longitud del arco paramétrico",
    "useItWhen": "necesitas la longitud de una ruta paramétrica",
    "looksLike": "x = f(t), y = g(t), encuentre la longitud de t = a hasta b",
    "doThis": "use la raíz de (dx/dt)^2 + (dy/dt)^2",
    "thinkOfItAs": "Velocidad pitagórica dentro de una integral",
    "watchOutFor": "usando la fórmula x para curvas ordinarias",
    "rememberThis": "La longitud paramétrica utiliza ambas tasas.",
    "typicalProblemShapes": [
      "Longitud del camino del movimiento de una partícula.",
      "Una curva paramétrica con límites de tiempo."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántas derivadas van bajo la raíz?",
        "answer": "Dos: tasa x y tasa y."
      },
      {
        "prompt": "¿La longitud del arco paramétrico se integra en x o en t?",
        "answer": "En t."
      }
    ],
    "memoryHook": "Ambas tasas van por debajo de la raíz.",
    "quickExample": {
      "problem": "Encuentre la longitud en un intervalo paramétrico.",
      "move": "Construya la raíz a partir de la tasa x y la tasa y."
    }
  },
  "calc2-polar-coordinates": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Coordenadas polares",
    "name": "Coordenadas polares",
    "useItWhen": "un punto es más fácil como distancia y ángulo",
    "looksLike": "r = f(theta)",
    "doThis": "lea r como distancia desde el origen y theta como dirección",
    "thinkOfItAs": "un gráfico dibujado por giro y estiramiento",
    "watchOutFor": "olvidar r negativa puede cambiar el punto",
    "rememberThis": "polar significa radio más ángulo",
    "typicalProblemShapes": [
      "Rosas curvas, círculos, limaconas.",
      "Ecuaciones que utilizan r y theta en lugar de x e y"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué controla theta?",
        "answer": "Dirección."
      },
      {
        "prompt": "¿Qué controla r?",
        "answer": "Distancia desde el origen."
      }
    ],
    "memoryHook": "Puntos de ángulo, alcances de radio.",
    "quickExample": {
      "problem": "¿Qué describe r = 2 cos theta?",
      "move": "Piense en términos de radio que cambia con el ángulo."
    }
  },
  "calc2-polar-area": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Área en coordenadas polares",
    "name": "Área polar",
    "useItWhen": "necesitas área dentro de una curva polar",
    "looksLike": "encontrar el área de un bucle de r = f(theta)",
    "doThis": "use la mitad de la integral de r cuadrado d theta",
    "thinkOfItAs": "agregando rebanadas finas de pizza",
    "watchOutFor": "usando los límites theta incorrectos",
    "rememberThis": "el área polar es la mitad de r al cuadrado",
    "typicalProblemShapes": [
      "Área encerrada por un bucle o pétalo",
      "Integrales escritas en theta en lugar de x"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué potencia golpea a r en la fórmula?",
        "answer": "Al cuadrado."
      },
      {
        "prompt": "¿Qué constante se encuentra al frente?",
        "answer": "La mitad."
      }
    ],
    "memoryHook": "Área polar = mitad r al cuadrado.",
    "quickExample": {
      "problem": "Encuentra el área de un pétalo de una curva de rosa.",
      "move": "Utilice los límites de los pétalos, no el círculo completo."
    }
  },
  "calc2-polar-slope": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Pendiente de curvas polares",
    "name": "Pendiente polar",
    "useItWhen": "necesitas una recta tangente a una curva polar",
    "looksLike": "r = f(theta), encuentre dy/dx",
    "doThis": "convierta a x(theta) e y(theta), luego use la pendiente paramétrica",
    "thinkOfItAs": "polar convirtiéndose en paramétrico para un movimiento",
    "watchOutFor": "tratando de usar reglas derivadas ordinarias en r directamente",
    "rememberThis": "la pendiente polar se convierte en pendiente paramétrica",
    "typicalProblemShapes": [
      "Una curva polar con una pregunta tangente o de pendiente horizontal/vertical",
      "Solicitudes de pendiente en forma theta"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué construyes primero a partir de la forma polar?",
        "answer": "x(theta) e y(theta)."
      },
      {
        "prompt": "Después de eso, ¿qué fórmula de pendiente usas?",
        "answer": "estilo dy/dt sobre dx/dt."
      }
    ],
    "memoryHook": "La pendiente polar es realmente una pendiente paramétrica.",
    "quickExample": {
      "problem": "Encuentra la pendiente tangente de una curva polar.",
      "move": "Construya x = r cos theta e y = r sin theta primero."
    }
  },
  "calc2-polar-arc-length": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Longitud del arco en coordenadas polares.",
    "name": "Longitud del arco polar",
    "useItWhen": "necesitas la longitud de una curva polar",
    "looksLike": "encontrar la longitud de r = f(theta)",
    "doThis": "Usa la raíz de r al cuadrado más (dr/dtheta) al cuadrado.",
    "thinkOfItAs": "La longitud polar tiene su propia fórmula de velocidad.",
    "watchOutFor": "olvidando la derivada de r",
    "rememberThis": "la longitud polar usa r y r'",
    "typicalProblemShapes": [
      "Longitud de una pieza de rosa, limacón o espiral",
      "Curva polar con intervalo en theta"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué dos piezas van debajo de la raíz?",
        "answer": "r al cuadrado y (r') al cuadrado."
      },
      {
        "prompt": "¿La longitud del arco polar se integra en theta?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "La longitud polar usa r y r'.",
    "quickExample": {
      "problem": "Encuentra la longitud de un bucle polar.",
      "move": "Utilice la fórmula de longitud de arco polar con límites theta."
    }
  },
  "calc2-sequences": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Secuencias",
    "name": "Secuencias",
    "useItWhen": "Los términos vienen uno tras otro en lugar de una curva continua.",
    "looksLike": "a_n con n yendo al infinito",
    "doThis": "pregunte qué hacen los términos cuando n se vuelve enorme",
    "thinkOfItAs": "una lista con un estado de ánimo a largo plazo",
    "watchOutFor": "Tratar una secuencia como un gráfico de función regular.",
    "rememberThis": "secuencia significa comportamiento término por término",
    "typicalProblemShapes": [
      "Preguntas sobre a_n cuando n tiende al infinito",
      "Listas de términos o fórmulas enésimas explícitas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué variable suele indexar una secuencia?",
        "answer": "n."
      },
      {
        "prompt": "¿Puede una secuencia divergir?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Una secuencia es una lista con una pregunta límite.",
    "quickExample": {
      "problem": "¿Se establece a_n = 1/n en alguna parte?",
      "move": "Sí. Se dirige a 0."
    }
  },
  "calc2-sequence-limits": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Límites de secuencias",
    "name": "Límites de secuencia",
    "useItWhen": "necesitas saber si una secuencia se establece",
    "looksLike": "límite cuando n va al infinito de a_n",
    "doThis": "observe el comportamiento dominante para n grande",
    "thinkOfItAs": "comportamiento final para listas",
    "watchOutFor": "comprobando sólo los primeros términos",
    "rememberThis": "La n grande controla la respuesta.",
    "typicalProblemShapes": [
      "Expresiones racionales en n",
      "Términos construidos a partir de raíces, potencias o factoriales."
    ],
    "miniDrill": [
      {
        "prompt": "¿Los primeros términos garantizan el límite?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué es lo más importante para n grande?",
        "answer": "El crecimiento dominante."
      }
    ],
    "memoryHook": "Los límites de secuencia son comportamientos a largo plazo.",
    "quickExample": {
      "problem": "Límite de (3n + 1)/(n + 5)",
      "move": "El pensamiento de máximo poder todavía funciona."
    }
  },
  "calc2-series-basics": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Conceptos básicos de la serie",
    "name": "Conceptos básicos de la serie",
    "useItWhen": "estás sumando infinitos términos",
    "looksLike": "suma a_n desde n = 1 hasta el infinito",
    "doThis": "Mire las sumas parciales, no solo los términos.",
    "thinkOfItAs": "un total acumulado sin último trimestre final",
    "watchOutFor": "Pensar en el límite de mandatos por sí solo demuestra la convergencia.",
    "rememberThis": "Las series se preocupan por las sumas, no por los términos individuales.",
    "typicalProblemShapes": [
      "Notación sigma con infinito",
      "Preguntas convergentes o divergentes"
    ],
    "miniDrill": [
      {
        "prompt": "¿Una serie utiliza sumas parciales?",
        "answer": "Sí."
      },
      {
        "prompt": "Si los términos no llegan a 0, ¿puede converger la serie?",
        "answer": "No."
      }
    ],
    "memoryHook": "Las series tratan sobre el total acumulado.",
    "quickExample": {
      "problem": "¿Qué decide una serie: términos o sumas parciales?",
      "move": "Las sumas parciales lo deciden."
    }
  },
  "calc2-geometric-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Serie geométrica",
    "name": "Serie Geométrica",
    "useItWhen": "cada término se obtiene multiplicando por la misma razón",
    "looksLike": "a + ar + ar^2 + ...",
    "doThis": "encuentre r y verifique si la r absoluta es menor que 1",
    "thinkOfItAs": "Mismo multiplicador, una y otra vez.",
    "watchOutFor": "olvidar la prueba de proporción para la convergencia está justo en r aquí",
    "rememberThis": "r absoluto menor que 1 significa converger",
    "typicalProblemShapes": [
      "Un multiplicador fijo entre términos.",
      "Poderes como c(r)^n"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el número clave en una serie geométrica?",
        "answer": "La relación r."
      },
      {
        "prompt": "Si r = 2, ¿converge o diverge?",
        "answer": "Divergencia."
      }
    ],
    "memoryHook": "Las series geométricas viven o mueren por r.",
    "quickExample": {
      "problem": "Serie 3 + 3/2 + 3/4 +...",
      "move": "La proporción es 1/2, por lo que converge."
    }
  },
  "calc2-telescoping-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Serie telescópica",
    "name": "Serie telescópica",
    "useItWhen": "términos se cancelan en una cadena",
    "looksLike": "1/(n(n + 1)) después de la división en fracciones parciales",
    "doThis": "escriba sumas parciales anticipadas y observe la cancelación",
    "thinkOfItAs": "dominó noqueándose unos a otros",
    "watchOutFor": "hacer una prueba elegante antes de verificar la cancelación",
    "rememberThis": "si los términos se cancelan, escriba algunos",
    "typicalProblemShapes": [
      "Términos que se dividen en vecinos como 1/n - 1/(n + 1)",
      "Mucha cancelación visible después de la expansión."
    ],
    "miniDrill": [
      {
        "prompt": "¿El mejor primer paso en una serie de aspecto telescópico?",
        "answer": "Escribe sumas parciales."
      },
      {
        "prompt": "¿Sobreviven la mayoría de los términos medios?",
        "answer": "No."
      }
    ],
    "memoryHook": "Escríbalo y deje que se vea la cancelación.",
    "quickExample": {
      "problem": "Serie de 1/(n(n + 1))",
      "move": "Divídelo e inspecciona las primeras sumas parciales."
    }
  },
  "calc2-nth-term-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "prueba del enésimo término",
    "name": "Prueba del enésimo término",
    "useItWhen": "quieres una verificación de divergencia rápida",
    "looksLike": "sum a_n donde el límite de plazo es fácil de ver",
    "doThis": "toma el límite de a_n; si no es 0, la serie diverge",
    "thinkOfItAs": "un portero rápido en la puerta",
    "watchOutFor": "pensar límite 0 significa convergencia",
    "rememberThis": "no 0 significa divergir; 0 significa tal vez",
    "typicalProblemShapes": [
      "Una serie con límite de plazo fácil",
      "Primera prueba antes de probar herramientas más difíciles"
    ],
    "miniDrill": [
      {
        "prompt": "Si a_n llega a 3, ¿qué pasa?",
        "answer": "La serie diverge."
      },
      {
        "prompt": "Si a_n llega a 0, ¿ya terminaste?",
        "answer": "No."
      }
    ],
    "memoryHook": "No cero mata la serie rápidamente.",
    "quickExample": {
      "problem": "Suma de n/(n + 1)",
      "move": "Los términos van a 1, por lo que la serie diverge de inmediato."
    }
  },
  "calc2-integral-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "prueba integral",
    "name": "Prueba integral",
    "useItWhen": "los términos provienen de una función continua positiva decreciente",
    "looksLike": "suma 1/n^p o fórmulas positivas similares",
    "doThis": "integrar la función de coincidencia del 1 al infinito",
    "thinkOfItAs": "dejar que una integral impropia juzgue la serie",
    "watchOutFor": "usarlo cuando la función no es decreciente",
    "rememberThis": "positivo, decreciente, continuo primero",
    "typicalProblemShapes": [
      "Términos positivos con fórmulas similares a funciones.",
      "Series que se parecen a la serie p o potencias recíprocas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tres condiciones deberías comprobar primero?",
        "answer": "Positivo, decreciente, continuo."
      },
      {
        "prompt": "¿Qué tipo de integral aparece?",
        "answer": "Una integral impropia."
      }
    ],
    "memoryHook": "Si actúa como una función positiva agradable, intégrala.",
    "quickExample": {
      "problem": "Suma de prueba 1/n^2",
      "move": "Compárelo con la integral impropia de 1/x^2."
    }
  },
  "calc2-p-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Serie P",
    "name": "Serie p",
    "useItWhen": "la serie se parece a 1/n^p",
    "looksLike": "suma 1/n^p",
    "doThis": "comprobar si p es mayor que 1",
    "thinkOfItAs": "el atajo más rápido en la habitación",
    "watchOutFor": "mezclar el valor de corte",
    "rememberThis": "p mayor que 1 converge",
    "typicalProblemShapes": [
      "Potencias recíprocas de n",
      "Series que se pueden comparar con 1/n^p"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué pasa si p = 1?",
        "answer": "Divergencia."
      },
      {
        "prompt": "¿Qué pasa si p = 4?",
        "answer": "Converge."
      }
    ],
    "memoryHook": "p sobre 1 vidas. p en o por debajo de 1 muere.",
    "quickExample": {
      "problem": "Suma 1/n^(3/2)",
      "move": "p es mayor que 1, por lo que converge."
    }
  },
  "calc2-comparison-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "prueba de comparación",
    "name": "Prueba de comparación",
    "useItWhen": "Tu serie es desordenada pero puedes comparar su tamaño con una conocida.",
    "looksLike": "Términos positivos que puedes atrapar por encima o por debajo de otra serie.",
    "doThis": "comparar con algo más simple que ya sabes",
    "thinkOfItAs": "culpa por asociación por serie",
    "watchOutFor": "usando la dirección de comparación incorrecta",
    "rememberThis": "menor que un convergente o mayor que un divergente",
    "typicalProblemShapes": [
      "Series de términos positivos con constantes adicionales o términos de orden inferior",
      "Fracciones que se asemejan a una serie p conocida"
    ],
    "miniDrill": [
      {
        "prompt": "Para demostrar la convergencia, ¿comparar con algo más grande o más pequeño?",
        "answer": "Mayor punto de referencia convergente."
      },
      {
        "prompt": "Para demostrar la divergencia, ¿comparar con algo más grande o más pequeño?",
        "answer": "Punto de referencia divergente más pequeño."
      }
    ],
    "memoryHook": "Compárelo con una serie en la que ya confía.",
    "quickExample": {
      "problem": "Compare 1/(n^2 + 1) con 1/n^2.",
      "move": "Utilice la serie p más simple como punto de referencia."
    }
  },
  "calc2-limit-comparison-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Prueba de comparación de límites",
    "name": "Prueba de comparación de límites",
    "useItWhen": "dos series de términos positivos tienen la misma forma dominante",
    "looksLike": "expresiones racionales o raíz desordenadas en n",
    "doThis": "tome el límite de a_n sobre b_n y verifique si hay una respuesta finita positiva",
    "thinkOfItAs": "Mismo crecimiento, mismo destino.",
    "watchOutFor": "usando una serie de comparación con un término dominante totalmente diferente",
    "rememberThis": "relación finita positiva significa el mismo resultado",
    "typicalProblemShapes": [
      "Términos positivos con comportamiento dominante similar",
      "Expresiones racionales donde la comparación ordinaria resulta confusa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tipo de límite de relación quieres?",
        "answer": "Positivo y finito."
      },
      {
        "prompt": "Si el límite de la relación es 7, ¿qué significa eso?",
        "answer": "Convergen o divergen juntos."
      }
    ],
    "memoryHook": "La misma forma dominante significa el mismo veredicto.",
    "quickExample": {
      "problem": "Compare n/(n^3 + 2) con 1/n^2.",
      "move": "Utilice poderes dominantes y tome el límite de proporción."
    }
  },
  "calc2-alternating-series-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Prueba de series alternas",
    "name": "Prueba de series alternas",
    "useItWhen": "los letreros se mueven hacia adelante y hacia atrás",
    "looksLike": "(-1)^n, (-1)^(n+1), o más-menos-más-menos",
    "doThis": "compruebe que los tamaños de los términos bajen a 0",
    "thinkOfItAs": "un tira y afloja que se calma",
    "watchOutFor": "comprobando los signos pero no el encogimiento",
    "rememberThis": "alternar, disminuir, presionar 0",
    "typicalProblemShapes": [
      "Signos alternos explícitos",
      "Series con tiempos parciales positivos decrecientes (-1)^n"
    ],
    "miniDrill": [
      {
        "prompt": "¿Es necesario reducir los términos alternos?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Es necesario que los términos lleguen a 0?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "La alternancia por sí sola no es suficiente. Los términos deben calmarse.",
    "quickExample": {
      "problem": "Suma (-1)^n / n",
      "move": "Los signos se alternan y los tamaños de los términos se reducen a 0."
    }
  },
  "calc2-absolute-conditional": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Convergencia absoluta y condicional",
    "name": "Absoluto vs Condicional",
    "useItWhen": "una serie alterna converge y necesitas la etiqueta más fuerte",
    "looksLike": "probar la serie y luego probar la versión de valor absoluto",
    "doThis": "suelte las señales y pruebe nuevamente",
    "thinkOfItAs": "quita los signos y mira qué serie queda",
    "watchOutFor": "llamando absoluta a cada serie alterna convergente",
    "rememberThis": "absoluto significa que todavía funciona sin los signos",
    "typicalProblemShapes": [
      "Series alternas después de que AST dice converger",
      "Preguntas que piden convergencia absoluta o condicional"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué se prueba para la convergencia absoluta?",
        "answer": "La serie de valores absolutos."
      },
      {
        "prompt": "Si esa serie de valor absoluto diverge pero la original converge, ¿cuál es la etiqueta?",
        "answer": "Convergencia condicional."
      }
    ],
    "memoryHook": "Absoluto significa que los signos no importan.",
    "quickExample": {
      "problem": "Si la suma (-1)^n/n converge, ¿qué pasa con la suma 1/n?",
      "move": "Divergencia, por lo que el original es sólo condicional."
    }
  },
  "calc2-ratio-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "prueba de relación",
    "name": "Prueba de relación",
    "useItWhen": "Los factoriales o potencias siguen apareciendo.",
    "looksLike": "n!, c^n, o ambos",
    "doThis": "tomar el límite de a_(n+1)/a_n absoluto",
    "thinkOfItAs": "preguntando cómo se compara cada término con el anterior",
    "watchOutFor": "olvidando el valor absoluto",
    "rememberThis": "la proporción bajo 1 converge, sobre 1 diverge",
    "typicalProblemShapes": [
      "factoriales",
      "Potencias exponenciales en n"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué pasa si el límite de proporción es 1/3?",
        "answer": "Converge."
      },
      {
        "prompt": "¿Qué pasa si el límite de la relación es 2?",
        "answer": "Divergencia."
      }
    ],
    "memoryHook": "Test de ratio de amor de factoriales y potencias.",
    "quickExample": {
      "problem": "Serie con n! en los términos",
      "move": "Pruebe la prueba de proporción con anticipación."
    }
  },
  "calc2-root-test": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "prueba de raíz",
    "name": "Prueba de raíz",
    "useItWhen": "la enésima potencia o raíz enésima está integrada en los términos",
    "looksLike": "(3n/(n+1))^n o enésimas raíces",
    "doThis": "toma la raíz enésima de a_n absoluto y encuentra el límite",
    "thinkOfItAs": "despegando el gran poder exterior",
    "watchOutFor": "usarlo cuando no hay un enésimo patrón de energía presente",
    "rememberThis": "Las potencias enésimas sugieren raíces enésimas.",
    "typicalProblemShapes": [
      "Términos elevados a n",
      "Estructuras de raíz enésima"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué pasa si el límite de la prueba raíz es inferior a 1?",
        "answer": "Converge."
      },
      {
        "prompt": "¿Qué pasa si el límite de la prueba raíz es superior a 1?",
        "answer": "Divergencia."
      }
    ],
    "memoryHook": "¿Gran poder exterior n? Utilice la prueba de raíz.",
    "quickExample": {
      "problem": "Serie con [(2n+1)/(3n)]^n",
      "move": "La prueba de raíz elimina rápidamente la energía externa."
    }
  },
  "calc2-power-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Serie de potencia",
    "name": "Serie de potencia",
    "useItWhen": "Los términos se construyen alrededor de potencias de x - a.",
    "looksLike": "suma c_n (x - a)^n",
    "doThis": "trátelo como una serie móvil de estilo geométrico alrededor de un centro",
    "thinkOfItAs": "un polinomio infinito alrededor de un punto",
    "watchOutFor": "olvidando el centro un",
    "rememberThis": "series de potencias viven alrededor de un centro",
    "typicalProblemShapes": [
      "Serie con x dentro de los términos",
      "Expandido alrededor de x = 0 o x = a"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el centro de la suma c_n (x + 4)^n?",
        "answer": "x = -4."
      },
      {
        "prompt": "¿Una serie de potencias se comporta igual para cada x?",
        "answer": "No."
      }
    ],
    "memoryHook": "Una serie de potencias es un polinomio sin término final.",
    "quickExample": {
      "problem": "Suma c_n (x - 2)^n",
      "move": "El centro es x = 2."
    }
  },
  "calc2-radius-interval": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Radio e intervalo de convergencia.",
    "name": "Radio / Intervalo de Convergencia",
    "useItWhen": "una serie de potencias necesita sus valores x válidos",
    "looksLike": "encontrar dónde converge una serie en x",
    "doThis": "use la prueba de relación o raíz para el radio, luego verifique los puntos finales a mano",
    "thinkOfItAs": "la zona segura alrededor del centro",
    "watchOutFor": "olvidar las comprobaciones de los puntos finales",
    "rememberThis": "radio primero, puntos finales al final",
    "typicalProblemShapes": [
      "Series con patrones x y factoriales o de potencia.",
      "Preguntas que solicitan radio o intervalo de convergencia"
    ],
    "miniDrill": [
      {
        "prompt": "Después de que la prueba de proporción proporcione el radio, ¿ha terminado?",
        "answer": "No. Verifique los puntos finales."
      },
      {
        "prompt": "¿Los puntos finales siempre se comportan igual?",
        "answer": "No."
      }
    ],
    "memoryHook": "El radio da el círculo. Los puntos finales deciden los bordes.",
    "quickExample": {
      "problem": "Encuentre el intervalo de convergencia de una serie de potencias.",
      "move": "Obtenga el radio, luego pruebe ambos extremos por separado."
    }
  },
  "calc2-taylor-polynomials": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "polinomios de Taylor",
    "name": "Polinomio de Taylor",
    "useItWhen": "quieres una aproximación polinómica corta cerca de un punto",
    "looksLike": "encontrar el polinomio de Taylor de enésimo grado alrededor de x = a",
    "doThis": "utilizar derivados en a y construir término por término",
    "thinkOfItAs": "una versión falsa local de la función",
    "watchOutFor": "usando derivadas en el centro equivocado",
    "rememberThis": "todos los caminos pasan por el centro a",
    "typicalProblemShapes": [
      "Aproximación cerca de un punto",
      "Solicita un polinomio de grado n alrededor de a"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué punto controla los coeficientes?",
        "answer": "El centro A."
      },
      {
        "prompt": "¿El grado 2 significa cuántos niveles de derivada?",
        "answer": "Hasta la segunda derivada."
      }
    ],
    "memoryHook": "Los polinomios de Taylor son sustitutos locales.",
    "quickExample": {
      "problem": "Construya un polinomio de Taylor cuadrático en x = 0.",
      "move": "Utilice función, primera derivada y segunda derivada en 0."
    }
  },
  "calc2-taylor-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "serie de taylor",
    "name": "Serie Taylor",
    "useItWhen": "quieres la versión polinómica infinita cerca de un punto",
    "looksLike": "suma construida a partir de derivados a un",
    "doThis": "Encuentra el patrón en las derivadas y escribe la serie completa.",
    "thinkOfItAs": "Polinomio de Taylor sin punto de parada",
    "watchOutFor": "dejando caer el factorial",
    "rememberThis": "derivados en una construcción de toda la serie",
    "typicalProblemShapes": [
      "Solicitudes de expansión de Maclaurin o Taylor",
      "Funciones con patrones derivados repetidos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué cambia entre el polinomio de Taylor y la serie de Taylor?",
        "answer": "La serie continúa para siempre."
      },
      {
        "prompt": "¿Qué se encuentra debajo de cada término de orden n?",
        "answer": "factorial."
      }
    ],
    "memoryHook": "La serie Taylor es la versión completa.",
    "quickExample": {
      "problem": "Encuentre la serie de Taylor para e^x en 0.",
      "move": "Cada derivada permanece e^x, por lo que el patrón es sencillo."
    }
  },
  "calc2-maclaurin-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "serie maclaurin",
    "name": "Serie Maclaurin",
    "useItWhen": "la serie de Taylor está centrada en 0",
    "looksLike": "serie alrededor de x = 0",
    "doThis": "trátelo como Taylor con a = 0",
    "thinkOfItAs": "El primo centrado en cero de Taylor",
    "watchOutFor": "olvidar a Maclaurin solo significa centro 0",
    "rememberThis": "Maclaurin es Taylor en 0",
    "typicalProblemShapes": [
      "sen x, cos x, e^x, 1/(1-x) alrededor de 0",
      "Solicita nombrar a Maclaurin específicamente"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el centro de Maclaurin?",
        "answer": "0."
      },
      {
        "prompt": "¿Todas las series de Maclaurin son también Taylor?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Maclaurin simplemente significa centro en cero.",
    "quickExample": {
      "problem": "¿Qué hace Maclaurin una serie?",
      "move": "Su centro es x = 0."
    }
  },
  "calc2-common-series": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Serie común de Maclaurin",
    "name": "Serie Maclaurin común",
    "useItWhen": "Quieres reconocer los cuatro grandes estándar rápidamente",
    "looksLike": "e^x, sen x, cos x, 1/(1-x)",
    "doThis": "Memorizar los patrones básicos y conectarlos a nuevos problemas.",
    "thinkOfItAs": "la hoja de fórmulas que quieres en tu cabeza",
    "watchOutFor": "mezclar los signos en seno y coseno",
    "rememberThis": "conoce la serie base en frio",
    "typicalProblemShapes": [
      "Reescribir una función como una serie conocida",
      "Utilice una serie base para construir una nueva."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué serie común tiene todos los términos positivos?",
        "answer": "e^x."
      },
      {
        "prompt": "¿Qué serie común alterna potencias impares?",
        "answer": "pecado x."
      }
    ],
    "memoryHook": "Conozca los cuatro grandes y construya a partir de ahí.",
    "quickExample": {
      "problem": "¿Qué es la serie de Maclaurin para e^x?",
      "move": "Suma x^n sobre n factorial."
    }
  },
  "calc2-inverse-functions": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Funciones inversas y sus derivadas.",
    "name": "Funciones inversas",
    "useItWhen": "es necesario deshacer una función",
    "looksLike": "f y f^-1, intercambia x e y",
    "doThis": "invertir x e y, resolver y luego usar reglas de derivada inversa si es necesario",
    "thinkOfItAs": "ejecutando la función hacia atrás",
    "watchOutFor": "olvidar lo inverso significa que las entradas y salidas cambian de trabajo",
    "rememberThis": "inversa deshace la función original",
    "typicalProblemShapes": [
      "Encuentra la inversa de una función uno a uno",
      "Diferenciar una función inversa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el primer movimiento para una inversa?",
        "answer": "Intercambia x e y."
      },
      {
        "prompt": "¿Toda función tiene una función inversa?",
        "answer": "No. Tiene que ser uno a uno."
      }
    ],
    "memoryHook": "Inverso significa deshacer.",
    "quickExample": {
      "problem": "¿Cómo empiezas a encontrar una inversa?",
      "move": "Intercambia x e y."
    }
  },
  "calc2-exponential-derivatives": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Funciones exponenciales y sus derivadas.",
    "name": "Derivadas exponenciales",
    "useItWhen": "la variable esta en el exponente",
    "looksLike": "e^x, a^x, e^(g(x))",
    "doThis": "diferenciar la exponencial y mantener la exponencial",
    "thinkOfItAs": "la función se reproduce",
    "watchOutFor": "olvidando la regla de la cadena en e^(g(x))",
    "rememberThis": "e^x permanece e^x",
    "typicalProblemShapes": [
      "Fórmulas de crecimiento exponencial",
      "e elevado a una expresión lineal o no lineal"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué le sucede a e^x cuando lo diferencias?",
        "answer": "Se queda ex^x."
      },
      {
        "prompt": "¿Qué paso adicional aparece en e^(x^2)?",
        "answer": "Regla de la cadena."
      }
    ],
    "memoryHook": "Exponencial sigue siendo exponencial.",
    "quickExample": {
      "problem": "¿Derivada de e^(3x)?",
      "move": "Mantenga e^(3x), luego multiplique por 3."
    }
  },
  "calc2-log-functions": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Funciones logarítmicas",
    "name": "Funciones de registro",
    "useItWhen": "necesitas deshacer un exponencial o simplificar productos y potencias",
    "looksLike": "ln x, log_a x",
    "doThis": "use reglas logarítmicas para convertir la multiplicación en suma y las potencias en coeficientes frontales",
    "thinkOfItAs": "un desenredador de fórmulas",
    "watchOutFor": "tratando ln(x+y) como ln x + ln y",
    "rememberThis": "los registros rompen productos, no sumas",
    "typicalProblemShapes": [
      "Simplificación de registros",
      "Ecuaciones logarítmicas o preguntas exponenciales inversas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Se divide bien ln(x + y)?",
        "answer": "No."
      },
      {
        "prompt": "¿En qué se convierte ln(a^5)?",
        "answer": "5 en un."
      }
    ],
    "memoryHook": "Los registros dividen productos, no sumas.",
    "quickExample": {
      "problem": "¿Qué es ln(ab)?",
      "move": "En a + en b."
    }
  },
  "calc2-growth-decay": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Crecimiento y decadencia exponencial",
    "name": "Crecimiento y decadencia",
    "useItWhen": "una tasa es proporcional a la cantidad actual",
    "looksLike": "P(t) = P_0 e^(kt)",
    "doThis": "lea k para crecimiento o decadencia y conéctelo al modelo",
    "thinkOfItAs": "cambio que se alimenta de la cantidad actual",
    "watchOutFor": "mezclando k positivo con k negativo",
    "rememberThis": "k positivo crece, k negativo decae",
    "typicalProblemShapes": [
      "Población, enfriamiento, desintegración radiactiva, crecimiento compuesto.",
      "Modelos con e^(kt)"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué signo de k significa crecimiento?",
        "answer": "Positivo."
      },
      {
        "prompt": "¿Qué signo de k significa decadencia?",
        "answer": "Negativo."
      }
    ],
    "memoryHook": "k cuenta la historia.",
    "quickExample": {
      "problem": "¿Qué significa una k negativa en P_0 e^(kt)?",
      "move": "Decadencia."
    }
  },
  "calc2-inverse-trig": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Funciones trigonométricas inversas",
    "name": "Funciones trigonométricas inversas",
    "useItWhen": "necesitas el ángulo que dio un valor trigonométrico",
    "looksLike": "arcsin, arccos, arctan",
    "doThis": "lea la salida como un ángulo y use los patrones derivados estándar cuando sea necesario",
    "thinkOfItAs": "disparador en reversa",
    "watchOutFor": "olvidar que las salidas trigonométricas inversas son ángulos",
    "rememberThis": "ángulos de retorno trigonométrico inverso",
    "typicalProblemShapes": [
      "Recuperación del ángulo de una relación trigonométrica",
      "Fórmulas derivadas que involucran trigonometría inversa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Arcsin genera un número o un ángulo?",
        "answer": "Un ángulo."
      },
      {
        "prompt": "¿Qué hace arctán?",
        "answer": "Deshace la tangente en su rango principal."
      }
    ],
    "memoryHook": "La trigonometría inversa devuelve el ángulo.",
    "quickExample": {
      "problem": "¿Qué significa arctan(1)?",
      "move": "El ángulo cuya tangente es 1."
    }
  },
  "calc2-lhopitals-rule": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Formas indeterminadas y regla de l'Hospital",
    "name": "La regla del hospital",
    "useItWhen": "un límite da 0/0 o infinito/infinito",
    "looksLike": "límites de fracciones con forma indeterminada",
    "doThis": "diferenciar arriba y abajo, luego intentar el límite nuevamente",
    "thinkOfItAs": "Un pase derivado más para salir del punto muerto.",
    "watchOutFor": "usándolo antes de revisar el formulario",
    "rememberThis": "0/0 o inf/inf primero, luego diferenciar arriba y abajo",
    "typicalProblemShapes": [
      "Límites estrictos de fracciones con ampliación coincidente o ceros coincidentes",
      "Límites logarítmicos exponenciales después de la limpieza de álgebra"
    ],
    "miniDrill": [
      {
        "prompt": "¿Se puede utilizar l'Hospital en cualquier límite?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuáles son las dos formas de luz verde?",
        "answer": "0/0 e infinito/infinito."
      }
    ],
    "memoryHook": "Consulta el formulario antes de diferenciar.",
    "quickExample": {
      "problem": "¿Cuándo podrá empezar l'Hospital?",
      "move": "Después de verificar 0/0 o infinito/infinito."
    }
  },
  "calc2-center-of-mass": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 8: Más Aplicaciones de la Integración",
    "unit": "Aplicaciones y Curvas",
    "topic": "centro de masa",
    "name": "Centro de masa",
    "useItWhen": "necesitas el punto de equilibrio de una región o cable",
    "looksLike": "densidad de masa y promedios ponderados",
    "doThis": "encuentre la masa total, luego divida los momentos por la masa",
    "thinkOfItAs": "el punto de equilibrio",
    "watchOutFor": "olvidar la densidad cambia la ponderación",
    "rememberThis": "momento sobre masa",
    "typicalProblemShapes": [
      "Punto de equilibrio de lámina o alambre.",
      "Ubicación promedio ponderada por densidad"
    ],
    "miniDrill": [
      {
        "prompt": "¿Por qué se divide al final?",
        "answer": "Masa total."
      },
      {
        "prompt": "¿Importa la densidad?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Punto de equilibrio = momento sobre la masa.",
    "quickExample": {
      "problem": "¿Qué viene después de la masa total?",
      "move": "Momentos, luego divide por masa."
    }
  },
  "calc2-hydrostatic-force": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 8: Más Aplicaciones de la Integración",
    "unit": "Aplicaciones y Curvas",
    "topic": "fuerza hidrostática",
    "name": "Fuerza hidrostática",
    "useItWhen": "La presión del líquido cambia con la profundidad.",
    "looksLike": "fuerza sobre una placa o puerta en agua",
    "doThis": "use presión multiplicada por el área de la tira delgada, luego integre por profundidad",
    "thinkOfItAs": "más profundo significa empujar más fuerte",
    "watchOutFor": "usando una presión constante en todas partes",
    "rememberThis": "La presión crece con la profundidad.",
    "typicalProblemShapes": [
      "Agua empujando sobre una placa vertical.",
      "Presión variable con profundidad."
    ],
    "miniDrill": [
      {
        "prompt": "¿La presión se mantiene constante en el agua?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué se integra: una tira o todo el plato de una vez?",
        "answer": "Tiras finas."
      }
    ],
    "memoryHook": "Franja más profunda, empuje más fuerte.",
    "quickExample": {
      "problem": "¿Qué variable suele impulsar la fuerza hidrostática?",
      "move": "Profundidad."
    }
  },
  "calc2-probability-density": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 8: Más Aplicaciones de la Integración",
    "unit": "Aplicaciones y Curvas",
    "topic": "Densidad de probabilidad",
    "name": "Densidad de probabilidad",
    "useItWhen": "la probabilidad está dada por una función de densidad en lugar de casos separados",
    "looksLike": "f(x) con área total 1",
    "doThis": "integrar durante el intervalo que le interesa",
    "thinkOfItAs": "probabilidad como área nuevamente",
    "watchOutFor": "olvidando el área total debe ser 1",
    "rememberThis": "la probabilidad de una densidad es el área",
    "typicalProblemShapes": [
      "Variable aleatoria continua",
      "Encuentre una constante para que la probabilidad total sea 1"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál debería ser el área total bajo una densidad?",
        "answer": "1."
      },
      {
        "prompt": "¿Cómo se obtiene la probabilidad en un intervalo?",
        "answer": "Integrar en ese intervalo."
      }
    ],
    "memoryHook": "Densidad de probabilidad significa área bajo la curva.",
    "quickExample": {
      "problem": "¿Cómo se obtiene P(a < X < b)?",
      "move": "Integra la densidad de a a b."
    }
  },
  "calc2-direction-fields": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 9: Ecuaciones Diferenciales",
    "unit": "Ecuaciones Diferenciales",
    "topic": "Campos de dirección y método de Euler",
    "name": "Campos de dirección / Euler",
    "useItWhen": "una ecuación diferencial es más fácil de leer o aproximar que resolverla exactamente",
    "looksLike": "dy/dx = f(x,y) con marcas de pendiente",
    "doThis": "leer el campo de pendiente o dar un paso adelante con el método de Euler",
    "thinkOfItAs": "siguiendo pequeñas flechas de pendiente",
    "watchOutFor": "pensando que Euler da una respuesta exacta",
    "rememberThis": "Euler camina por escalones en pendiente.",
    "typicalProblemShapes": [
      "Campos de pendiente dibujados en el plano.",
      "Valores aproximados de y de una condición inicial"
    ],
    "miniDrill": [
      {
        "prompt": "¿Euler es exacto o aproximado?",
        "answer": "Aproximado."
      },
      {
        "prompt": "¿Qué muestra un campo de dirección en cada punto?",
        "answer": "Una pendiente."
      }
    ],
    "memoryHook": "Pequeñas pendientes guían la curva.",
    "quickExample": {
      "problem": "¿Qué muestra un campo de dirección?",
      "move": "Una pequeña pendiente indica muchos puntos."
    }
  },
  "calc2-separable-equations": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 9: Ecuaciones Diferenciales",
    "unit": "Ecuaciones Diferenciales",
    "topic": "Ecuaciones separables",
    "name": "Ecuaciones separables",
    "useItWhen": "Los términos y y x se pueden separar",
    "looksLike": "dy/dx = g(x)h(y)",
    "doThis": "mover cosas y con dy y cosas x con dx, luego integrar",
    "thinkOfItAs": "poniendo x e y en diferentes lados de la habitación",
    "watchOutFor": "separar términos que en realidad no son separables",
    "rememberThis": "dividir, integrar, resolver",
    "typicalProblemShapes": [
      "Productos de piezas solo x y solo y",
      "Ecuaciones diferenciales que se reordenan limpiamente"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué pasa antes de integrarse?",
        "answer": "Separar las variables."
      },
      {
        "prompt": "Después de integrarse, ¿qué suele aparecer?",
        "answer": "Una condición constante y tal vez inicial."
      }
    ],
    "memoryHook": "Si xey se pueden dividir, sepárelos primero.",
    "quickExample": {
      "problem": "¿Cuál es el movimiento característico en una ecuación separable?",
      "move": "Separar las variables antes de integrar."
    }
  },
  "calc2-population-growth-models": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 9: Ecuaciones Diferenciales",
    "unit": "Ecuaciones Diferenciales",
    "topic": "Modelos de crecimiento poblacional",
    "name": "Modelos de crecimiento poblacional",
    "useItWhen": "una cantidad crece según su tamaño actual",
    "looksLike": "crecimiento exponencial o crecimiento logístico",
    "doThis": "identificar si el modelo es ilimitado o limitado",
    "thinkOfItAs": "crecer libremente o crecer hacia un techo",
    "watchOutFor": "Mezclar el crecimiento logístico con el simple crecimiento exponencial.",
    "rememberThis": "El crecimiento logístico tiene capacidad de carga.",
    "typicalProblemShapes": [
      "La población cambia con el tiempo",
      "Modelos de crecimiento con o sin tope"
    ],
    "miniDrill": [
      {
        "prompt": "¿Tiene el crecimiento exponencial capacidad de carga?",
        "answer": "No."
      },
      {
        "prompt": "¿Se estabiliza el crecimiento logístico?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "El crecimiento logístico se desacelera cerca de un techo.",
    "quickExample": {
      "problem": "¿Qué característica extra tiene el crecimiento logístico?",
      "move": "Un techo o capacidad de carga."
    }
  },
  "calc2-linear-differential-equations": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 9: Ecuaciones Diferenciales",
    "unit": "Ecuaciones Diferenciales",
    "topic": "Ecuaciones lineales",
    "name": "Ecuaciones diferenciales lineales",
    "useItWhen": "una ecuación diferencial de primer orden está en forma lineal",
    "looksLike": "y primo + P(x)y = Q(x)",
    "doThis": "ponlo en forma estándar, luego usa el factor integrante",
    "thinkOfItAs": "una ecuación desordenada desbloqueada por un multiplicador",
    "watchOutFor": "olvidarse de obtener el formulario estándar primero",
    "rememberThis": "lineal de primer orden significa factor integrante",
    "typicalProblemShapes": [
      "Ecuaciones de primer orden con y e y primos solamente",
      "Problemas que mencionan factor integrante."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué viene después de la forma estándar?",
        "answer": "Encuentra el factor integrante."
      },
      {
        "prompt": "¿Este método necesita primero la ecuación en forma estándar?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Forma estándar, luego factor integrante.",
    "quickExample": {
      "problem": "¿Cuál es la forma de configuración de una EDO lineal de primer orden?",
      "move": "y primo + P(x)y = Q(x)."
    }
  },
  "calc2-hyperbolic-functions": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 6: Funciones Inversas, Exponenciales y Logarítmicas",
    "unit": "Funciones Inversas, Exponenciales y Logarítmicas",
    "topic": "Funciones hiperbólicas",
    "name": "Funciones hiperbólicas",
    "useItWhen": "aparece sinh, cosh o tanh",
    "looksLike": "sinh x, cosh x, tanh x",
    "doThis": "trátelos como primos trigonométricos construidos a partir de exponenciales",
    "thinkOfItAs": "funciones trigonométricas con agallas exponenciales",
    "watchOutFor": "asumiendo que usan exactamente las mismas identidades que el seno y el coseno",
    "rememberThis": "Las funciones hiperbólicas actúan trigonométricamente pero provienen de e^x.",
    "typicalProblemShapes": [
      "Un derivado o identidad que involucra sinh o cosh",
      "Un entorno de estilo de sustitución catenaria o hiperbólica"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué impulsa las funciones hiperbólicas detrás de escena?",
        "answer": "Exponenciales."
      },
      {
        "prompt": "¿Sinh x se diferencia de cosh x?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Hiperbólico = sabor trigonométrico, motor exponencial.",
    "quickExample": {
      "problem": "¿Cuál es la derivada de senh x?",
      "move": "cosh x."
    }
  },
  "calc2-integration-strategy": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "Estrategia de integración",
    "name": "Estrategia de integración",
    "useItWhen": "ves una integral y no conoces la primera herramienta",
    "looksLike": "una expresión mixta con varios métodos posibles",
    "doThis": "buscar patrones: u-sub, partes, trigonometría, fracciones parciales o una fórmula",
    "thinkOfItAs": "un árbol de decisión, no una suposición ciega",
    "watchOutFor": "forzar un método favorito en cada problema",
    "rememberThis": "coincide con el patrón antes de hacer swing",
    "typicalProblemShapes": [
      "Expresiones mixtas con productos, raíces o piezas racionales.",
      "Tarea que pregunta qué técnica se debe probar primero"
    ],
    "miniDrill": [
      {
        "prompt": "¿Producto con un factor que simplifica al diferenciarlo?",
        "answer": "Pruebe la integración por partes."
      },
      {
        "prompt": "¿Función interna perfectamente ubicada dentro de su derivada?",
        "answer": "Prueba la sustitución en u."
      }
    ],
    "memoryHook": "No adivines. Haga coincidir el patrón con la integral.",
    "quickExample": {
      "problem": "¿Qué debes hacer antes de elegir un método?",
      "move": "Lee el patrón y clasifica la integral."
    }
  },
  "calc2-integration-tables-tech": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 7: Técnicas de Integración",
    "unit": "Técnicas de Integración",
    "topic": "Integración mediante tablas y tecnología.",
    "name": "Mesas y Tecnología",
    "useItWhen": "la antiderivada es fea pero las herramientas o el software estándar pueden terminarla",
    "looksLike": "un integrando extraño que todavía se ajusta a una forma conocida",
    "doThis": "reescribirlo en un patrón conocido o usar tecnología para evaluar y verificar",
    "thinkOfItAs": "Usar un mapa cuando el camino está demasiado complicado para improvisar.",
    "watchOutFor": "confiar en la salida de una calculadora sin verificar la configuración",
    "rememberThis": "Configúrelo justo antes de dejar que el técnico le ayude",
    "typicalProblemShapes": [
      "Antiderivadas complicadas con una entrada en la tabla",
      "Integrales definidas evaluadas numéricamente por software."
    ],
    "miniDrill": [
      {
        "prompt": "¿Debería la tecnología reemplazar la configuración?",
        "answer": "No. Debería ayudar después de la configuración."
      },
      {
        "prompt": "¿Cuál es la trampa con integrales de calculadora?",
        "answer": "Mala entrada o modo incorrecto."
      }
    ],
    "memoryHook": "La tecnología ayuda una vez configuradas las matemáticas.",
    "quickExample": {
      "problem": "¿Qué debes hacer antes de utilizar la tecnología en una integral?",
      "move": "Limpie el formulario y asegúrese de que la entrada sea correcta."
    }
  },
  "calc2-econ-bio-applications": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 8: Más Aplicaciones de la Integración",
    "unit": "Aplicaciones y Curvas",
    "topic": "Aplicaciones a la economía y la biología.",
    "name": "Integrales de Economía y Biología",
    "useItWhen": "un valor total proviene de una tasa, densidad o cantidad marginal",
    "looksLike": "costo marginal, ingreso marginal, tasa de crecimiento o modelo de densidad",
    "doThis": "integrar la cantidad similar a una tasa para obtener el significado total",
    "thinkOfItAs": "traducir una historia por unidad a la historia completa",
    "watchOutFor": "olvidar la cantidad constante o de referencia",
    "rememberThis": "si el problema da una tasa, integre para obtener el total",
    "typicalProblemShapes": [
      "Preguntas sobre costos marginales o ingresos",
      "Totales de población o biológicos elaborados a partir de datos de tasas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cantidad marginal significa tasa de cambio de qué?",
        "answer": "Una cantidad total."
      },
      {
        "prompt": "¿Cómo se recupera el total de la tarifa?",
        "answer": "Integrar."
      }
    ],
    "memoryHook": "Califica primero, total después de la integral.",
    "quickExample": {
      "problem": "¿Qué se hace con el costo marginal para obtener un cambio en el costo total?",
      "move": "Intégralo."
    }
  },
  "calc2-modeling-differential-equations": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 9: Ecuaciones Diferenciales",
    "unit": "Ecuaciones Diferenciales",
    "topic": "Modelado con ecuaciones diferenciales",
    "name": "Modelado con ecuaciones diferenciales",
    "useItWhen": "un problema escrito dice cómo cambia algo, no la fórmula final",
    "looksLike": "la tasa depende de la cantidad actual, el tiempo u otra variable",
    "doThis": "traducir la historia a una ecuación para la tasa de cambio",
    "thinkOfItAs": "convertir una historia en una regla de cambio",
    "watchOutFor": "escribir la cantidad misma cuando el problema describe su tasa",
    "rememberThis": "modelar el cambio, luego resolver el modelo",
    "typicalProblemShapes": [
      "Problemas verbales sobre crecimiento, enfriamiento, mezcla o movimiento",
      "Le pide que forme, no solo resuelva, el DE"
    ],
    "miniDrill": [
      {
        "prompt": "¿Un DE modela la cantidad o su tasa de cambio?",
        "answer": "Su tasa de cambio."
      },
      {
        "prompt": "¿Cuál es el primer trabajo en un problema de modelado?",
        "answer": "Traduce la historia a una ecuación de tasas."
      }
    ],
    "memoryHook": "¿Historia sobre el cambio? Escribe una ecuación de cambio.",
    "quickExample": {
      "problem": "Si el crecimiento es proporcional a la cantidad, ¿cuál es la forma del modelo?",
      "move": "La tasa es igual a k veces la cantidad."
    }
  },
  "calc2-predator-prey": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 9: Ecuaciones Diferenciales",
    "unit": "Ecuaciones Diferenciales",
    "topic": "Sistemas depredador-presa",
    "name": "Sistemas depredador-presa",
    "useItWhen": "dos poblaciones se empujan hacia arriba y hacia abajo juntas",
    "looksLike": "Una ecuación para presas y otra para depredadores.",
    "doThis": "rastrear cómo cada población afecta a la otra en lugar de resolver una variable sola",
    "thinkOfItAs": "un bucle de tira y afloja poblacional",
    "watchOutFor": "Tratar las dos ecuaciones como si fueran independientes.",
    "rememberThis": "dos poblaciones significa un sistema acoplado",
    "typicalProblemShapes": [
      "Modelos estilo conejos y zorros.",
      "Dos ecuaciones de primer orden unidas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Depredador-presa es una ecuación o un sistema?",
        "answer": "Un sistema."
      },
      {
        "prompt": "¿Las poblaciones se afectan entre sí?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Los depredadores y las presas suben y bajan juntos.",
    "quickExample": {
      "problem": "¿Por qué los gráficos depredador-presa suelen ser cíclicos?",
      "move": "Cada población cambia a la otra con un retraso."
    }
  },
  "calc2-conic-sections": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Secciones cónicas",
    "name": "Secciones cónicas",
    "useItWhen": "la gráfica es una parábola, elipse o hipérbola",
    "looksLike": "términos x e y al cuadrado en un patrón estándar",
    "doThis": "poner la ecuación en forma estándar y nombrar la forma a partir de los signos",
    "thinkOfItAs": "reconocimiento de formas del traje de álgebra",
    "watchOutFor": "nombrar la cónica antes de limpiar la ecuación",
    "rememberThis": "reescribe primero, luego identifica la cónica",
    "typicalProblemShapes": [
      "Identificación de parábola, elipse o hipérbola",
      "Completando el cuadrado para limpiar la ecuación."
    ],
    "miniDrill": [
      {
        "prompt": "¿Identificas la cónica antes o después de la forma estándar?",
        "answer": "Después."
      },
      {
        "prompt": "¿Qué suele señalar una hipérbola?",
        "answer": "Una resta entre términos al cuadrado."
      }
    ],
    "memoryHook": "Limpia la ecuación, luego lee la forma.",
    "quickExample": {
      "problem": "¿Cómo se identifica un ayuno cónico?",
      "move": "Consíguelo en forma estándar y lee el patrón."
    }
  },
  "calc2-polar-conics": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 10: Ecuaciones Paramétricas y Coordenadas Polares",
    "unit": "Aplicaciones y Curvas",
    "topic": "Secciones cónicas en coordenadas polares.",
    "name": "Cónicas polares",
    "useItWhen": "una cónica se escribe con r y theta",
    "looksLike": "r = ed / (1 más o menos e cos theta)",
    "doThis": "Detecta la forma de excentricidad y usa e para indicar la forma.",
    "thinkOfItAs": "las mismas cónicas usando ropa polar",
    "watchOutFor": "ignorando el papel de la excentricidad",
    "rememberThis": "La excentricidad indica el tipo cónico.",
    "typicalProblemShapes": [
      "Ecuaciones polares estilo orbital o directriz de enfoque",
      "Preguntas sobre si la curva es una elipse, una parábola o una hipérbola"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué número decide el tipo cónico aquí?",
        "answer": "Excentricidad e."
      },
      {
        "prompt": "¿Qué da e = 1?",
        "answer": "Una parábola."
      }
    ],
    "memoryHook": "En las cónicas polares, e dirige el espectáculo.",
    "quickExample": {
      "problem": "¿Qué significa e menor que 1 en una cónica polar?",
      "move": "Elipse."
    }
  },
  "calc2-series-strategy": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Estrategia para la serie de pruebas.",
    "name": "Estrategia de prueba de serie",
    "useItWhen": "Aparece una serie y necesitas la primera prueba para intentarlo.",
    "looksLike": "sigma con infinito y sin etiqueta obvia",
    "doThis": "verifique el límite de términos, luego haga coincidir el patrón con geométrico, serie p, comparación, relación, raíz o alternancia",
    "thinkOfItAs": "un paso de clasificación antes del paso de prueba",
    "watchOutFor": "saltar a la prueba de proporción en cada serie",
    "rememberThis": "identificar el patrón antes de elegir la prueba",
    "typicalProblemShapes": [
      "Una nueva serie sin pistas sobre qué prueba se aplica.",
      "Preguntas de reconocimiento que solicitan la mejor primera prueba."
    ],
    "miniDrill": [
      {
        "prompt": "Si los términos no llegan a 0, ¿convergen o divergen?",
        "answer": "Divergencia."
      },
      {
        "prompt": "¿Hacia qué prueba suelen apuntar los factoriales o las potencias?",
        "answer": "Prueba de proporción."
      }
    ],
    "memoryHook": "Ordena la serie antes de probarla.",
    "quickExample": {
      "problem": "¿Cuál es la primera comprobación rápida de cualquier serie?",
      "move": "Vea si los términos llegan a 0."
    }
  },
  "calc2-taylor-applications": {
    "course": "Cálculo de una Variable 2",
    "chapter": "Capítulo 11: Sucesiones, Series y Series de Potencias",
    "unit": "Sucesiones y Series",
    "topic": "Aplicaciones de los polinomios de Taylor",
    "name": "Aplicaciones del polinomio de Taylor",
    "useItWhen": "necesita una estimación cercana con un polinomio en lugar de la función completa",
    "looksLike": "f(x) aproximado cerca de un centro a",
    "doThis": "use un polinomio de Taylor corto cerca del centro y mantenga x cerca de ese centro",
    "thinkOfItAs": "un sustituto local para una función más difícil",
    "watchOutFor": "usando la aproximación lejos del centro",
    "rememberThis": "Taylor trabaja mejor cerca del centro",
    "typicalProblemShapes": [
      "Aproximar el valor de una función sin calculadora",
      "Estimar el error o decidir cuántos términos son suficientes"
    ],
    "miniDrill": [
      {
        "prompt": "¿Taylor mejora cerca o lejos del centro?",
        "answer": "Cerca del centro."
      },
      {
        "prompt": "¿Por qué utilizar un polinomio de Taylor?",
        "answer": "Reemplazar una función difícil con un polinomio local más fácil."
      }
    ],
    "memoryHook": "Taylor = polinomio de atajo local.",
    "quickExample": {
      "problem": "¿Cuándo es más confiable una aproximación de Taylor?",
      "move": "Cerca del centro de expansión."
    }
  },
  "calc3-3d-points": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Puntos 3D y distancia.",
    "name": "Puntos 3D",
    "useItWhen": "pasas del plano al espacio x-y-z",
    "looksLike": "(x, y, z)",
    "doThis": "trazar el punto usando tres coordenadas en lugar de dos",
    "thinkOfItAs": "2D con una dirección más",
    "watchOutFor": "olvidar z añade profundidad",
    "rememberThis": "Misma idea, un eje más.",
    "typicalProblemShapes": [
      "Puntos en el espacio",
      "Distancia o punto medio en 3D"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántas coordenadas utiliza un punto 3D?",
        "answer": "Tres."
      },
      {
        "prompt": "¿Qué agrega z?",
        "answer": "Profundidad."
      }
    ],
    "memoryHook": "El 3D es sólo un eje extra.",
    "quickExample": {
      "problem": "Grafica (2, -1, 3).",
      "move": "Avanza en x, luego en y, y al final sube en z."
    }
  },
  "calc3-vectors": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Vectores",
    "name": "Vectores",
    "useItWhen": "Necesitas magnitud y dirección juntas",
    "looksLike": "<a,b,c>",
    "doThis": "tratar las entradas como un movimiento de dirección",
    "thinkOfItAs": "una flecha, no una ubicación",
    "watchOutFor": "mezclar un punto con un vector",
    "rememberThis": "los puntos localizan, los vectores se mueven",
    "typicalProblemShapes": [
      "Preguntas sobre desplazamiento",
      "Problemas de magnitud y dirección."
    ],
    "miniDrill": [
      {
        "prompt": "¿Un vector representa un lugar o un movimiento?",
        "answer": "Un movimiento."
      },
      {
        "prompt": "¿Pueden los vectores vivir en 2D y 3D?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Un vector es un movimiento con dirección.",
    "quickExample": {
      "problem": "¿Qué significa <2, -1, 3>?",
      "move": "Un movimiento hacia la derecha 2, atrás 1, arriba 3."
    }
  },
  "calc3-dot-product": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Producto escalar",
    "name": "Producto escalar",
    "useItWhen": "necesitas ángulo, proyección u ortogonalidad",
    "looksLike": "u · v",
    "doThis": "multiplicar los componentes coincidentes y sumar",
    "thinkOfItAs": "qué tan alineadas están dos flechas",
    "watchOutFor": "punto confuso con producto cruzado",
    "rememberThis": "punto da un número",
    "typicalProblemShapes": [
      "Ángulo entre vectores",
      "Comprobando si los vectores son perpendiculares"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué produce el producto escalar: número o vector?",
        "answer": "Número."
      },
      {
        "prompt": "Si el producto escalar es 0, ¿cuál es el significado habitual?",
        "answer": "Perpendicular."
      }
    ],
    "memoryHook": "Punto = multiplicar, unir, sumar.",
    "quickExample": {
      "problem": "Calcula <1,2,3> · <4,5,6>.",
      "move": "Multiplica componente con componente y suma."
    }
  },
  "calc3-cross-product": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Producto cruzado",
    "name": "Producto cruzado",
    "useItWhen": "necesitas un vector perpendicular a otros dos",
    "looksLike": "u x v",
    "doThis": "usa el patrón del determinante y la regla de la mano derecha",
    "thinkOfItAs": "dos vectores formando un nuevo vector normal",
    "watchOutFor": "cambiar el orden y olvidar que cambia el signo",
    "rememberThis": "cruz da un vector perpendicular",
    "typicalProblemShapes": [
      "Vectores normales a planos",
      "Área de problemas de paralelogramo."
    ],
    "miniDrill": [
      {
        "prompt": "¿El producto cruzado genera un número o un vector?",
        "answer": "Un vector."
      },
      {
        "prompt": "¿Qué pasa si cambias el pedido?",
        "answer": "Cambia el signo."
      }
    ],
    "memoryHook": "El producto cruzado da un vector normal.",
    "quickExample": {
      "problem": "¿Hacia dónde apunta u x v?",
      "move": "Perpendicular a ambos, por la regla de la mano derecha."
    }
  },
  "calc3-lines": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Líneas en el espacio",
    "name": "Líneas en 3D",
    "useItWhen": "necesitas una línea que pase por un punto con un vector de dirección",
    "looksLike": "r(t) = r0 + tv",
    "doThis": "utilizar un punto y un vector de dirección",
    "thinkOfItAs": "punto de partida más pasos de dirección repetidos",
    "watchOutFor": "usando un punto donde pertenece un vector de dirección",
    "rememberThis": "punto más dirección da la línea",
    "typicalProblemShapes": [
      "Ecuaciones de líneas paramétricas",
      "Ecuaciones de rectas simétricas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántos ingredientes construyen una línea 3D?",
        "answer": "Un punto y un vector dirección."
      },
      {
        "prompt": "¿Qué hace t?",
        "answer": "Te mueve a lo largo de la recta."
      }
    ],
    "memoryHook": "Punto más dirección construye la línea.",
    "quickExample": {
      "problem": "Escribe la recta que pasa por un punto paralelo a v.",
      "move": "Utilice r0 + tv."
    }
  },
  "calc3-planes": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Planos en el espacio",
    "name": "Planos",
    "useItWhen": "necesitas una superficie plana en 3D",
    "looksLike": "ax + by + cz = d",
    "doThis": "usar un punto y un vector normal",
    "thinkOfItAs": "una lámina infinita guiada por un vector normal",
    "watchOutFor": "confundir un vector normal con una dirección dentro del plano",
    "rememberThis": "el vector normal manda en el plano",
    "typicalProblemShapes": [
      "Ecuaciones planas",
      "Preguntas sobre planos paralelos o perpendiculares"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué vector fija la orientación del plano?",
        "answer": "El vector normal."
      },
      {
        "prompt": "¿Es ax + by + cz = d una recta o un plano?",
        "answer": "Un plano."
      }
    ],
    "memoryHook": "Plano = punto más normal.",
    "quickExample": {
      "problem": "¿Qué significa <a,b,c> en la ecuación de un plano?",
      "move": "Es el vector normal."
    }
  },
  "calc3-quadric-surfaces": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Superficies cuádricas",
    "name": "Superficies cuádricas",
    "useItWhen": "quieres mirar la ecuación y reconocer rápido qué superficie es",
    "looksLike": "elipsoide, paraboloide, hiperboloide, cono, cilindro",
    "doThis": "mira los signos, revisa qué variables están al cuadrado y fíjate si falta alguna variable",
    "thinkOfItAs": "una lista de verificación de identificación de formas, no un problema de resolución",
    "watchOutFor": "Tratar cada ecuación de variable al cuadrado como la misma superficie.",
    "rememberThis": "signos y variables faltantes nombran la superficie",
    "typicalProblemShapes": [
      "Nombra la superficie de la ecuación.",
      "Dibuja la forma a partir del patrón de signos."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la pista más rápida para detectar un cilindro?",
        "answer": "Falta una variable."
      },
      {
        "prompt": "¿Importan aquí los cambios de signos?",
        "answer": "Sí. Muchas veces deciden qué superficie es."
      }
    ],
    "memoryHook": "Primero mira signos; luego mira si falta una variable.",
    "quickExample": {
      "problem": "¿Qué es lo primero que hay que comprobar en una ecuación de superficie cuádrica?",
      "move": "El patrón de signos y si falta una variable."
    }
  },
  "calc3-cylinders": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Cilindros",
    "name": "Cilindros",
    "useItWhen": "falta una variable en la ecuación",
    "looksLike": "x^2 + y^2 = 4, y = x^2, x^2/4 + z^2 = 1",
    "doThis": "grafica la curva 2D en las variables que sí aparecen y luego extiéndela a lo largo de la variable que falta",
    "thinkOfItAs": "una gráfica 2D estirada en una dirección",
    "watchOutFor": "creer que cilindro siempre significa cilindro circular",
    "rememberThis": "si falta una variable, la curva se estira en esa dirección",
    "typicalProblemShapes": [
      "Cilindro parabólico: y = x^2",
      "Cilindro elíptico: x^2/4 + y^2 = 1"
    ],
    "miniDrill": [
      {
        "prompt": "Si falta z, ¿en qué dirección se extiende el cilindro?",
        "answer": "A lo largo del eje z."
      },
      {
        "prompt": "¿Puede un cilindro surgir de una parábola y no sólo de un círculo?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Falta una variable, se estira la gráfica.",
    "quickExample": {
      "problem": "¿Qué superficie es y = x^2 en 3D?",
      "move": "Un cilindro parabólico que se extiende a lo largo del eje z."
    }
  },
  "calc3-ellipsoid": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Elipsoides",
    "name": "Elipsoide",
    "useItWhen": "los tres términos al cuadrado son positivos y equivalen a una constante",
    "looksLike": "x^2/a^2 + y^2/b^2 + z^2/c^2 = 1",
    "doThis": "lea las longitudes de intersección de los denominadores e imagine una esfera estirada",
    "thinkOfItAs": "una esfera tirada de manera diferente en cada eje",
    "watchOutFor": "mezclar elipsoides con hiperboloides cuando los signos difieren",
    "rememberThis": "todos los signos más dan una superficie ovalada cerrada",
    "typicalProblemShapes": [
      "Óvalo 3D cerrado centrado en el origen",
      "Ecuación con tres términos cuadrados positivos sobre constantes"
    ],
    "miniDrill": [
      {
        "prompt": "¿Un elipsoide está abierto o cerrado?",
        "answer": "Cerrado."
      },
      {
        "prompt": "¿Qué te dicen los denominadores?",
        "answer": "Las longitudes de los ejes."
      }
    ],
    "memoryHook": "Todos los signos más, todos cerrados.",
    "quickExample": {
      "problem": "¿Qué figura tiene x^2/9 + y^2/4 + z^2 = 1?",
      "move": "Un elipsoide con semiejes 3, 2 y 1."
    }
  },
  "calc3-paraboloids": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Paraboloides",
    "name": "Paraboloides",
    "useItWhen": "una variable es lineal y las otras dos son al cuadrado",
    "looksLike": "z = x^2 + y^2 o z = x^2 - y^2",
    "doThis": "comprobar si los términos al cuadrado tienen el mismo signo o signos opuestos",
    "thinkOfItAs": "El mismo signo forma un cuenco, los signos opuestos forman una silla de montar.",
    "watchOutFor": "llamando cuenco a cada paraboloide",
    "rememberThis": "cuenco del mismo signo, silla de montar del signo opuesto",
    "typicalProblemShapes": [
      "Paraboloide elíptico: z = x^2 + y^2",
      "Paraboloide hiperbólico: z = x^2 - y^2"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué da el mismo signo en los términos al cuadrado?",
        "answer": "Un paraboloide elíptico en forma de cuenco."
      },
      {
        "prompt": "¿Qué da el signo opuesto?",
        "answer": "Un paraboloide hiperbólico en forma de silla de montar."
      }
    ],
    "memoryHook": "Mismo signo: cuenco. Signos opuestos: silla.",
    "quickExample": {
      "problem": "¿Qué forma tiene z = x^2 - y^2?",
      "move": "Un paraboloide hiperbólico, la forma de silla de montar."
    }
  },
  "calc3-hyperboloids-and-cones": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 12: Vectores y la Geometría del Espacio",
    "unit": "Vectores y 3D",
    "topic": "Hiperboloides y conos",
    "name": "Hiperboloides y conos",
    "useItWhen": "Los términos cuadrados muestran cambios de signo y la superficie no está cerrada.",
    "looksLike": "x^2 + y^2 - z^2 = 1, -x^2 - y^2 + z^2 = 1, x^2 + y^2 = z^2",
    "doThis": "use el patrón constante y de signos para separar una hoja, dos hojas y un cono",
    "thinkOfItAs": "los hiperboloides se abren; los conos terminan en punta",
    "watchOutFor": "mezclar el cono con un hiperboloide porque ambos usan cambios de signo",
    "rememberThis": "si todo se junta en una punta, piensa en cono",
    "typicalProblemShapes": [
      "Hiperboloide de una hoja",
      "Hiperboloide de dos hojas o doble cono."
    ],
    "miniDrill": [
      {
        "prompt": "¿Tiene un cono un vértice agudo?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Puede un hiperboloide tener una hoja o dos?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "El cambio de signo abre la superficie; la constante dice la versión.",
    "quickExample": {
      "problem": "¿Cómo se puede diferenciar rápidamente una hoja de dos hojas?",
      "move": "Observa qué variable tiene el signo impar y de qué lado favorece la constante."
    }
  },
  "calc3-vector-valued-functions": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 13: Funciones Vectoriales",
    "unit": "Funciones Vectoriales",
    "topic": "Funciones con valores vectoriales",
    "name": "Funciones con valores vectoriales",
    "useItWhen": "una partícula se mueve a través del espacio con el tiempo",
    "looksLike": "r(t) = <x(t), y(t), z(t)>",
    "doThis": "diferenciar o integrar componente por componente",
    "thinkOfItAs": "movimiento paramétrico en forma vectorial",
    "watchOutFor": "tratando de tratar todo el vector como una fórmula escalar",
    "rememberThis": "trabajo componente por componente",
    "typicalProblemShapes": [
      "Posición, velocidad, aceleración en el espacio.",
      "Ecuaciones vectoriales de curvas."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cómo se diferencia una función vectorial?",
        "answer": "Un componente a la vez."
      },
      {
        "prompt": "¿Cómo se suele llamar r'(t) en movimiento?",
        "answer": "Velocidad."
      }
    ],
    "memoryHook": "Las funciones vectoriales se dividen en componentes.",
    "quickExample": {
      "problem": "Diferenciar <t, t^2, sin t>.",
      "move": "Diferenciar cada entrada."
    }
  },
  "calc3-curvature": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 13: Funciones Vectoriales",
    "unit": "Funciones Vectoriales",
    "topic": "Longitud del arco y curvatura.",
    "name": "Curvatura",
    "useItWhen": "necesitas qué tan bruscamente se dobla una curva espacial",
    "looksLike": "longitud de arco, unidad tangente, fórmulas de curvatura",
    "doThis": "encuentre la velocidad y el comportamiento tangente, luego mida la curvatura",
    "thinkOfItAs": "que duro gira el camino",
    "watchOutFor": "velocidad de mezcla con curvatura",
    "rememberThis": "La curvatura mide el giro, no solo el movimiento.",
    "typicalProblemShapes": [
      "Curvas espaciales con vectores tangentes y normales.",
      "Preguntas sobre cuán bruscamente se curva un camino"
    ],
    "miniDrill": [
      {
        "prompt": "¿Una gran curvatura significa más recto o más flexible?",
        "answer": "Más doblado."
      },
      {
        "prompt": "¿Es la curvatura lo mismo que la velocidad?",
        "answer": "No."
      }
    ],
    "memoryHook": "La curvatura está cambiando de intensidad.",
    "quickExample": {
      "problem": "¿Qué significa gran curvatura?",
      "move": "Allí la curva se curva bruscamente."
    }
  },
  "calc3-multivariable-functions": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Funciones de varias variables.",
    "name": "Funciones multivariables",
    "useItWhen": "La salida depende de dos o más entradas.",
    "looksLike": "f(x, y) o f(x, y, z)",
    "doThis": "leer la función como una superficie o una regla de dimensiones superiores",
    "thinkOfItAs": "una salida alimentada por varios mandos",
    "watchOutFor": "olvidar el dominio puede ser restringido",
    "rememberThis": "más entradas todavía significa una salida",
    "typicalProblemShapes": [
      "Superficies como z = x^2 + y^2",
      "Funciones con dos entradas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Tiene f(x,y) una salida o dos?",
        "answer": "Una salida."
      },
      {
        "prompt": "¿Qué suele hacer z = f(x,y)?",
        "answer": "Una superficie."
      }
    ],
    "memoryHook": "Más entradas, todavía una salida.",
    "quickExample": {
      "problem": "¿Cómo se representa normalmente z = f(x, y)?",
      "move": "Una superficie en 3D."
    }
  },
  "calc3-multivariable-limits": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Límites y continuidad en varias variables.",
    "name": "Límites multivariables",
    "useItWhen": "necesitas el comportamiento cerca de un punto en una superficie",
    "looksLike": "límite cuando (x, y) va a (a, b)",
    "doThis": "probar si diferentes caminos dan la misma respuesta",
    "thinkOfItAs": "comprobación de ruta en lugar de comprobación de izquierda a derecha",
    "watchOutFor": "probando solo un camino",
    "rememberThis": "Diferentes caminos, diferentes respuestas significan que no hay límite.",
    "typicalProblemShapes": [
      "Límites en el origen en x e y",
      "Problemas de comparación de rutas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Los límites multivariables utilizan únicamente la izquierda y la derecha?",
        "answer": "No. Hay muchos caminos."
      },
      {
        "prompt": "Si dos caminos no coinciden, ¿existe el límite?",
        "answer": "No."
      }
    ],
    "memoryHook": "Si los caminos no coinciden, el límite muere.",
    "quickExample": {
      "problem": "¿Cómo puede fallar un límite de dos variables?",
      "move": "Diferentes caminos pueden dar diferentes valores."
    }
  },
  "calc3-partial-derivatives": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Derivadas parciales",
    "name": "Derivados Parciales",
    "useItWhen": "cambias una variable y congelas las demás",
    "looksLike": "f_x, f_y, f_z",
    "doThis": "diferenciar con respecto a una variable a la vez",
    "thinkOfItAs": "Una perilla se mueve mientras las demás permanecen quietas.",
    "watchOutFor": "cambiando las variables congeladas también",
    "rememberThis": "tratar las otras variables como constantes",
    "typicalProblemShapes": [
      "Funciones en xey con subíndices como f_x",
      "Tasa de cambio en una dirección de entrada"
    ],
    "miniDrill": [
      {
        "prompt": "Al encontrar f_x, ¿qué le sucede a y?",
        "answer": "Trátelo como una constante."
      },
      {
        "prompt": "¿Puede una función tener más de una derivada parcial?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Una variable se mueve, el resto se congela.",
    "quickExample": {
      "problem": "Encuentre f_x de x^2 y + y^3.",
      "move": "Trátelo como una constante."
    }
  },
  "calc3-tangent-plane": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Planos tangentes y linealización.",
    "name": "Plano tangente",
    "useItWhen": "necesitas la aproximación local plana a una superficie",
    "looksLike": "encontrar el plano tangente en un punto",
    "doThis": "usa el punto, f_x y f_y",
    "thinkOfItAs": "la zona plana local de la superficie",
    "watchOutFor": "olvidando los valores del punto base",
    "rememberThis": "punto más pendientes parciales construyen el plano",
    "typicalProblemShapes": [
      "Linealización de z = f(x,y)",
      "Aproximación cerca de un punto en una superficie."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántos primeros parciales impulsan el plano tangente en 2 variables?",
        "answer": "Dos."
      },
      {
        "prompt": "¿El plano tangente está exactamente lejos del punto?",
        "answer": "No."
      }
    ],
    "memoryHook": "Utilice el punto y las pendientes parciales.",
    "quickExample": {
      "problem": "¿Qué derivadas impulsan el plano tangente?",
      "move": "f_x y f_y en el punto."
    }
  },
  "calc3-multivariable-chain-rule": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Regla de la cadena en varias variables",
    "name": "Regla de cadena multivariable",
    "useItWhen": "las variables dependen de otras variables en capas",
    "looksLike": "z = f(x, y) con x e y dependiendo de t",
    "doThis": "tener en cuenta todas las rutas de dependencia",
    "thinkOfItAs": "un diagrama de flujo de derivados",
    "watchOutFor": "falta un camino",
    "rememberThis": "cada camino contribuye",
    "typicalProblemShapes": [
      "x e y ambas funciones de t",
      "Diagramas de árbol para derivadas."
    ],
    "miniDrill": [
      {
        "prompt": "Si hay dos rutas de entrada, ¿importan ambas?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Cuál es el error común aquí?",
        "answer": "Falta un camino."
      }
    ],
    "memoryHook": "Siga todos los caminos de dependencia.",
    "quickExample": {
      "problem": "Si z depende de x e y, y ambos dependen de t, ¿qué aparece en dz/dt?",
      "move": "Tanto piezas de ruta x como de ruta y."
    }
  },
  "calc3-directional-derivative": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Derivadas direccionales",
    "name": "Derivada direccional",
    "useItWhen": "necesitas la tasa de cambio en una dirección elegida",
    "looksLike": "D_u f",
    "doThis": "utilizar el vector de dirección de unidad de punto degradado",
    "thinkOfItAs": "que empinado es si caminas por este camino",
    "watchOutFor": "olvidarse de hacer del vector dirección un vector unitario",
    "rememberThis": "derivada direccional = grad f dot u",
    "typicalProblemShapes": [
      "Tasa de cambio en una dirección específica.",
      "Preguntas que dan la dirección de un vector en un punto."
    ],
    "miniDrill": [
      {
        "prompt": "¿Necesitas longitud 1?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Qué vector está emparejado con u?",
        "answer": "El gradiente."
      }
    ],
    "memoryHook": "Elija una dirección, puntee el degradado.",
    "quickExample": {
      "problem": "¿Cómo se prueba la pendiente hacia una dirección u?",
      "move": "Punto el gradiente con el vector unitario."
    }
  },
  "calc3-gradient": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "gradiente",
    "name": "gradiente",
    "useItWhen": "necesitas la dirección del aumento más rápido",
    "looksLike": "graduado de nabla f",
    "doThis": "construir el vector de primeras derivadas parciales",
    "thinkOfItAs": "la flecha cuesta arriba más empinada",
    "watchOutFor": "pensando que el gradiente es un número",
    "rememberThis": "puntos de gradiente cuesta arriba más rápidos",
    "typicalProblemShapes": [
      "Preguntas de ascenso más empinadas",
      "Vectores normales para nivelar curvas o superficies."
    ],
    "miniDrill": [
      {
        "prompt": "¿El gradiente es vectorial o escalar?",
        "answer": "Un vector."
      },
      {
        "prompt": "¿Qué dirección apunta?",
        "answer": "Aumento más rápido."
      }
    ],
    "memoryHook": "El gradiente es la flecha cuesta arriba.",
    "quickExample": {
      "problem": "¿Cuál es la graduación f para f (x, y)?",
      "move": "<f_x, f_y>."
    }
  },
  "calc3-two-variable-extrema": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Extremos locales en dos variables.",
    "name": "Extremos de dos variables",
    "useItWhen": "necesitas máximo o mínimo de f(x,y)",
    "looksLike": "encontrar puntos críticos y clasificarlos",
    "doThis": "establezca los primeros parciales en cero, luego use la prueba de la segunda derivada",
    "thinkOfItAs": "colina, valle o silla de montar sobre una superficie",
    "watchOutFor": "llamando a cada punto crítico un máximo o mínimo",
    "rememberThis": "punto crítico primero, clasificación segundo",
    "typicalProblemShapes": [
      "sistemas f_x = 0 y f_y = 0",
      "Preguntas sobre máximo, mínimo o valor local"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué ecuaciones definen puntos críticos en dos variables?",
        "answer": "f_x = 0 y f_y = 0."
      },
      {
        "prompt": "¿Puede un punto crítico no ser ni máximo ni mínimo?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Las superficies pueden endurecerse, no sólo alcanzar picos o hundimientos.",
    "quickExample": {
      "problem": "¿Qué puede ser un punto crítico además del máximo o el mínimo?",
      "move": "Un punto de silla."
    }
  },
  "calc3-lagrange-multipliers": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 14: Derivadas Parciales",
    "unit": "Derivadas Parciales",
    "topic": "Multiplicadores de Lagrange",
    "name": "Multiplicadores de Lagrange",
    "useItWhen": "optimizas con una restricción",
    "looksLike": "maximizar f sujeto a g = c",
    "doThis": "establezca grad f = lambda grad g y use la restricción también",
    "thinkOfItAs": "El mejor punto mientras estás atrapado en una valla.",
    "watchOutFor": "olvidando la ecuación de restricción original",
    "rememberThis": "optimizar más restricción significa que los gradientes se alinean",
    "typicalProblemShapes": [
      "Máx/mín con una curva o restricción de superficie",
      "Optimización con una restricción explícita"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué ecuación adicional debe permanecer en el sistema?",
        "answer": "La restricción."
      },
      {
        "prompt": "¿Qué símbolo suele aparecer aquí?",
        "answer": "Lambada."
      }
    ],
    "memoryHook": "¿Problema de restricción? Alinea los degradados.",
    "quickExample": {
      "problem": "¿Cómo se inicia la optimización restringida?",
      "move": "Escribe grad f = lambda grad g."
    }
  },
  "calc3-double-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Integrales dobles",
    "name": "Integrales dobles",
    "useItWhen": "agregas valores sobre un área",
    "looksLike": "integral doble sobre una región R",
    "doThis": "establecer los límites e integrar dos veces",
    "thinkOfItAs": "agregar pequeños mosaicos sobre una región",
    "watchOutFor": "usando límites de región incorrectos",
    "rememberThis": "integral doble significa suma sobre el área",
    "typicalProblemShapes": [
      "Regiones de área en el plano xy",
      "Valor promedio o masa en una región"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántas integrales aparecen?",
        "answer": "Dos."
      },
      {
        "prompt": "¿Qué tipo de región se utiliza?",
        "answer": "Una región 2D."
      }
    ],
    "memoryHook": "Mosaicos sobre una región.",
    "quickExample": {
      "problem": "¿Sobre qué se acumula una integral doble?",
      "move": "Una región 2D."
    }
  },
  "calc3-iterated-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Integrales iteradas",
    "name": "Integrales iteradas",
    "useItWhen": "una integral doble se escribe una dentro de otra",
    "looksLike": "integral de integral f(x,y) dy dx",
    "doThis": "leer dentro de los límites primero, fuera de los límites segundo",
    "thinkOfItAs": "una dirección a la vez",
    "watchOutFor": "mezclar qué límites van con qué variable",
    "rememberThis": "los límites interiores coinciden con la variable interior",
    "typicalProblemShapes": [
      "Notación integral anidada",
      "Cambiar las preguntas del orden de integración"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué variable va primero: interna o externa?",
        "answer": "Interior."
      },
      {
        "prompt": "¿Los límites se adjuntan a la variable que está justo al lado de ellos?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Leer desde adentro hacia afuera.",
    "quickExample": {
      "problem": "¿Qué límites pertenecen a dy en una integral iterada?",
      "move": "El par interior."
    }
  },
  "calc3-changing-order": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Cambiando el orden de integración",
    "name": "Cambiar el orden",
    "useItWhen": "la integral iterada actual es fea",
    "looksLike": "dy dx se convierte en dx dy",
    "doThis": "volver a dibujar la región y escribir nuevos límites",
    "thinkOfItAs": "Misma región, diferente corte.",
    "watchOutFor": "voltear los límites sin volver a dibujar",
    "rememberThis": "dibujar primero, reescribir segundo",
    "typicalProblemShapes": [
      "Integrales anidadas con antiderivada interna incómoda",
      "Región dada por curvas en el plano."
    ],
    "miniDrill": [
      {
        "prompt": "¿Primer movimiento al cambiar de orden?",
        "answer": "Dibuja la región."
      },
      {
        "prompt": "¿Cambia la región?",
        "answer": "No."
      }
    ],
    "memoryHook": "Misma región, nuevos sectores.",
    "quickExample": {
      "problem": "¿Cómo se cambia el orden de forma segura?",
      "move": "Primero dibuja la región."
    }
  },
  "calc3-polar-double-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Integrales dobles en coordenadas polares",
    "name": "Integrales dobles polares",
    "useItWhen": "la región es circular o radial",
    "looksLike": "discos, anillos, sectores, x^2 + y^2",
    "doThis": "cambia a r y theta y recuerda la r adicional",
    "thinkOfItAs": "los círculos quieren coordenadas circulares",
    "watchOutFor": "olvidando el factor r extra",
    "rememberThis": "La integral doble polar necesita una r adicional.",
    "typicalProblemShapes": [
      "Regiones circulares",
      "Integrandos con x^2 + y^2 o simetría circular"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué cambio de coordenadas se utiliza?",
        "answer": "x = r cos theta, y = r sin theta."
      },
      {
        "prompt": "¿Qué factor extra debe aparecer?",
        "answer": "r."
      }
    ],
    "memoryHook": "¿Región redonda? Vaya polar y agregue r.",
    "quickExample": {
      "problem": "¿Qué factor extra aparece en las integrales dobles polares?",
      "move": "r."
    }
  },
  "calc3-triple-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Integrales triples",
    "name": "Integrales Triples",
    "useItWhen": "agregas valores sobre un sólido 3D",
    "looksLike": "integral triple sobre un sólido E",
    "doThis": "establecer los límites sólidos e integrar tres veces",
    "thinkOfItAs": "apilar cajas pequeñas en un volumen",
    "watchOutFor": "usando límites de estilo de área en una región 3D",
    "rememberThis": "integrales triples suma sobre volumen",
    "typicalProblemShapes": [
      "Masa o volumen sobre un sólido.",
      "Tres integrales anidadas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántas integrales están anidadas aquí?",
        "answer": "Tres."
      },
      {
        "prompt": "¿Esto cubre área o volumen?",
        "answer": "Volumen."
      }
    ],
    "memoryHook": "Integral triple = cajitas en el espacio.",
    "quickExample": {
      "problem": "¿Qué tipo de región utiliza una integral triple?",
      "move": "Una región sólida 3D."
    }
  },
  "calc3-cylindrical-coordinates": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Coordenadas cilíndricas",
    "name": "Coordenadas cilíndricas",
    "useItWhen": "un sólido 3D tiene simetría circular alrededor del eje z",
    "looksLike": "x^2 + y^2 con z aún separado",
    "doThis": "use polar en la parte xy y mantenga z como z",
    "thinkOfItAs": "polar más altura",
    "watchOutFor": "olvidando el factor jacobiano r",
    "rememberThis": "cilíndrico = polar con z",
    "typicalProblemShapes": [
      "Cilindros y tubos",
      "Integrandos con x^2 + y^2"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué permanece sin cambios en coordenadas cilíndricas?",
        "answer": "z."
      },
      {
        "prompt": "¿Qué factor extra aparece todavía?",
        "answer": "r."
      }
    ],
    "memoryHook": "Polar abajo, z arriba.",
    "quickExample": {
      "problem": "¿Cuándo es mejor cilíndrico que rectangular?",
      "move": "Cuando el sólido es redondo alrededor del eje z."
    }
  },
  "calc3-spherical-coordinates": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Coordenadas esféricas",
    "name": "Coordenadas esféricas",
    "useItWhen": "el sólido tiene forma de bola o esfera",
    "looksLike": "esferas, conos, términos rho^2",
    "doThis": "cambie a rho, theta, phi e incluya el jacobiano completo",
    "thinkOfItAs": "Coordenadas polares 3D",
    "watchOutFor": "mezclar phi y theta u olvidar el factor seno",
    "rememberThis": "problemas de esfera como coordenadas esféricas",
    "typicalProblemShapes": [
      "Bolas, conchas, conos con simetría esférica.",
      "Integrandos en x^2 + y^2 + z^2"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué factor trigonométrico adicional aparece en el jacobiano?",
        "answer": "pecado fi."
      },
      {
        "prompt": "¿Las mejores coordenadas para una esfera?",
        "answer": "Esférico."
      }
    ],
    "memoryHook": "¿Forma de esfera? Vuélvete esférico.",
    "quickExample": {
      "problem": "¿Qué tipo de sólido suele querer coordenadas esféricas?",
      "move": "Una esfera o caparazón esférico."
    }
  },
  "calc3-change-of-variables": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Cambio de variables",
    "name": "Cambio de variables",
    "useItWhen": "una región o integrando se vuelve más limpio en nuevas variables",
    "looksLike": "sustitución u-v para integrales dobles",
    "doThis": "reescribe la región y multiplica por el jacobiano",
    "thinkOfItAs": "cambiar de mapa antes de calcular",
    "watchOutFor": "variables cambiantes pero no el factor de área o volumen",
    "rememberThis": "nuevas variables necesitan el jacobiano",
    "typicalProblemShapes": [
      "Regiones inclinadas o estiradas",
      "Sustituciones personalizadas en integrales dobles"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué factor matricial aparece aquí?",
        "answer": "El jacobiano."
      },
      {
        "prompt": "¿Los límites siguen siendo los mismos?",
        "answer": "No."
      }
    ],
    "memoryHook": "Nuevas variables significan nuevos límites y jacobianos.",
    "quickExample": {
      "problem": "¿Qué debe cambiar además de la fórmula?",
      "move": "La región y el factor jacobiano."
    }
  },
  "calc3-vector-fields": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Campos vectoriales",
    "name": "Campos vectoriales",
    "useItWhen": "cada punto en el espacio tiene su propio vector",
    "looksLike": "F(x, y) = <P, Q> o F(x, y, z) = <P, Q, R>",
    "doThis": "leer el campo como una flecha adjunta a cada punto",
    "thinkOfItAs": "un mapa de viento",
    "watchOutFor": "Tratar un campo vectorial como una función escalar.",
    "rememberThis": "campo vectorial = flecha en cada punto",
    "typicalProblemShapes": [
      "Imágenes de campos de flujo, fuerza o velocidad",
      "Mapas de flechas en el plano o el espacio."
    ],
    "miniDrill": [
      {
        "prompt": "¿Un campo vectorial genera un número o un vector?",
        "answer": "Un vector."
      },
      {
        "prompt": "¿Qué imagen común coincide con los campos vectoriales?",
        "answer": "Un mapa de viento."
      }
    ],
    "memoryHook": "Un campo vectorial es un mapa de flechas.",
    "quickExample": {
      "problem": "¿Qué asigna un campo vectorial a cada punto?",
      "move": "Un vector."
    }
  },
  "calc3-line-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Integrales de línea",
    "name": "Integrales de línea",
    "useItWhen": "agregas un campo a lo largo de una curva",
    "looksLike": "integral sobre C",
    "doThis": "parametrizar la curva, luego integrar a lo largo del camino",
    "thinkOfItAs": "sumando trabajo a lo largo de un viaje",
    "watchOutFor": "olvidar el camino importa",
    "rememberThis": "Las integrales de línea se acumulan a lo largo de las curvas.",
    "typicalProblemShapes": [
      "Trabajo realizado por un campo de fuerza.",
      "Integrales sobre caminos C"
    ],
    "miniDrill": [
      {
        "prompt": "¿Las integrales de línea ocurren sobre regiones o curvas?",
        "answer": "Curvas."
      },
      {
        "prompt": "¿Qué suele iniciar la configuración?",
        "answer": "Una parametrización."
      }
    ],
    "memoryHook": "Las integrales de línea recorren un camino.",
    "quickExample": {
      "problem": "¿Qué ingrediente extra necesitas para una integral de línea?",
      "move": "Un camino o parametrización."
    }
  },
  "calc3-conservative-fields": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Campos vectoriales conservadores",
    "name": "Campos conservadores",
    "useItWhen": "quieres independencia de camino o una integral de línea fácil",
    "looksLike": "F = grado f",
    "doThis": "encontrar una función potencial si el campo es conservador",
    "thinkOfItAs": "un campo que proviene de una función escalar oculta",
    "watchOutFor": "asumiendo que cada campo es conservador",
    "rememberThis": "conservador significa campo gradiente",
    "typicalProblemShapes": [
      "Posibles problemas de funcionamiento",
      "Preguntas sobre la independencia del camino"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué función oculta estás buscando?",
        "answer": "Una función potencial."
      },
      {
        "prompt": "¿Qué suele sugerir la independencia del camino?",
        "answer": "Campo conservador."
      }
    ],
    "memoryHook": "Encuentra el potencial, simplifica el camino.",
    "quickExample": {
      "problem": "¿Por qué son buenos los campos conservadores?",
      "move": "Las integrales de línea se vuelven mucho más fáciles."
    }
  },
  "calc3-ftc-line-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Teorema fundamental para integrales de línea",
    "name": "FTC para integrales de línea",
    "useItWhen": "el campo es conservador",
    "looksLike": "integral de grad f punto dr",
    "doThis": "utilizar el potencial en el punto final menos el punto inicial",
    "thinkOfItAs": "arriba menos abajo para caminos",
    "watchOutFor": "usarlo en un campo que no es conservador",
    "rememberThis": "potencial al final menos al inicio",
    "typicalProblemShapes": [
      "Dada la función potencial f",
      "Campo conservador con puntos de inicio y fin."
    ],
    "miniDrill": [
      {
        "prompt": "¿Importa el camino en este teorema?",
        "answer": "No, no una vez que el campo sea conservador."
      },
      {
        "prompt": "¿Qué dos puntos importan?",
        "answer": "Inicio y fin."
      }
    ],
    "memoryHook": "El principio y el fin superan al camino completo.",
    "quickExample": {
      "problem": "¿Cómo se evalúa rápidamente una integral de línea de campo conservadora?",
      "move": "Potencial en el punto final menos punto inicial."
    }
  },
  "calc3-greens-theorem": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "teorema de verde",
    "name": "Teorema de Green",
    "useItWhen": "una integral de línea alrededor de una curva plana cerrada debería convertirse en una integral doble",
    "looksLike": "curva cerrada C alrededor de la región R en el plano",
    "doThis": "intercambiar trabajo de límites por trabajo de área",
    "thinkOfItAs": "información de borde que se convierte en información de región",
    "watchOutFor": "olvidar que la curva debe cerrarse y orientarse hacia la derecha",
    "rememberThis": "La curva cerrada en el plano puede convertirse en una integral doble.",
    "typicalProblemShapes": [
      "Curvas cerradas en sentido antihorario en 2D",
      "Integrales de línea que parecen más fáciles como integrales dobles"
    ],
    "miniDrill": [
      {
        "prompt": "¿El teorema de Green vive en 2D o 3D?",
        "answer": "2D."
      },
      {
        "prompt": "¿Es necesario cerrar la curva?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "¿Bucle plano cerrado? Piensa en verde.",
    "quickExample": {
      "problem": "¿Cuándo entra en juego el teorema de Green?",
      "move": "Curva cerrada, región plana, integral de línea alrededor del límite."
    }
  },
  "calc3-surface-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Integrales de superficie",
    "name": "Integrales de superficie",
    "useItWhen": "agregas valores a través de una superficie",
    "looksLike": "integral doble sobre una superficie S",
    "doThis": "parametrizar la superficie o utilizar una fórmula gráfica",
    "thinkOfItAs": "integrales dobles levantadas sobre láminas curvas",
    "watchOutFor": "Tratar la superficie como una región plana.",
    "rememberThis": "integrales de superficie repartidas sobre una superficie, no sobre un plano",
    "typicalProblemShapes": [
      "Campo escalar sobre una superficie",
      "Acumulación de área de hoja curva"
    ],
    "miniDrill": [
      {
        "prompt": "¿Una integral de superficie utiliza una región plana directamente?",
        "answer": "No."
      },
      {
        "prompt": "¿Parametrizas a menudo la superficie?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Misma idea que las integrales dobles, pero en una hoja.",
    "quickExample": {
      "problem": "¿Qué tipo de objeto integras aquí?",
      "move": "Una superficie."
    }
  },
  "calc3-flux": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "flujo",
    "name": "flujo",
    "useItWhen": "¿Quieres cuánto campo pasa a través de una superficie?",
    "looksLike": "F punto n sobre una superficie",
    "doThis": "Utilice la dirección normal y mida el flujo pasante.",
    "thinkOfItAs": "cuanto viento pasa por una red",
    "watchOutFor": "usando la orientación normal incorrecta",
    "rememberThis": "El flujo mide a través, no a lo largo.",
    "typicalProblemShapes": [
      "Fluir a través de una superficie",
      "Preguntas normales sobre orientación vectorial"
    ],
    "miniDrill": [
      {
        "prompt": "¿El flujo usa dirección tangente o normal?",
        "answer": "Dirección normal."
      },
      {
        "prompt": "¿Puede la orientación cambiar el letrero?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "El flujo es a través del flujo.",
    "quickExample": {
      "problem": "¿Qué suele significar flujo positivo?",
      "move": "Flujo neto a través de la superficie en la dirección normal elegida."
    }
  },
  "calc3-divergence-and-curl": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Divergencia y rotacional",
    "name": "Divergencia y rotacional",
    "useItWhen": "quieres saber si un campo se abre hacia afuera o gira localmente",
    "looksLike": "div F y curl F",
    "doThis": "lee la divergencia como fuente/sumidero y el rotacional como giro local",
    "thinkOfItAs": "propagación versus giro",
    "watchOutFor": "mezclando lo que mide cada uno",
    "rememberThis": "divergencia abre; rotacional gira",
    "typicalProblemShapes": [
      "Comportamiento del campo en un punto",
      "Pruebas antes de usar grandes teoremas."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál mide el giro?",
        "answer": "Rotacional."
      },
      {
        "prompt": "¿Cuál mide el comportamiento de fuente o sumidero?",
        "answer": "Divergencia."
      }
    ],
    "memoryHook": "Divergencia = se abre. Rotacional = gira.",
    "quickExample": {
      "problem": "¿Qué describe el rotacional?",
      "move": "Rotación local."
    }
  },
  "calc3-divergence-theorem": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Teorema de divergencia",
    "name": "Teorema de la divergencia",
    "useItWhen": "El flujo de superficie cerrada debe convertirse en una integral triple.",
    "looksLike": "flujo a través de una superficie cerrada",
    "doThis": "intercambiar flujo de superficie por integral triple de divergencia",
    "thinkOfItAs": "cambiar flujo por la frontera por suma de divergencia dentro del volumen",
    "watchOutFor": "usarlo en una superficie abierta",
    "rememberThis": "El flujo de superficie cerrada puede convertirse en integral de volumen.",
    "typicalProblemShapes": [
      "Superficies cerradas como esferas o cajas.",
      "Los problemas de flujo son más fáciles desde el interior"
    ],
    "miniDrill": [
      {
        "prompt": "¿Es necesario cerrar la superficie?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Qué aparece dentro de la integral triple?",
        "answer": "Divergencia."
      }
    ],
    "memoryHook": "Superficie cerrada: piensa en el volumen de adentro.",
    "quickExample": {
      "problem": "¿Qué intercambia el teorema?",
      "move": "Flujo sobre una superficie cerrada por una integral triple de la divergencia."
    }
  },
  "calc3-stokes-theorem": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Teorema de Stokes",
    "name": "Teorema de Stokes",
    "useItWhen": "una integral de línea alrededor de una curva espacial debería convertirse en una integral de superficie",
    "looksLike": "curva límite de una superficie en 3D",
    "doThis": "cambia la integral de línea del borde por una integral de superficie del rotacional",
    "thinkOfItAs": "Teorema de Green 3D",
    "watchOutFor": "no coincidir con la orientación del límite y la superficie normal",
    "rememberThis": "integral de línea en el borde = rotacional sobre la superficie",
    "typicalProblemShapes": [
      "Curva de espacio cerrado que delimita una superficie.",
      "Integrales de línea que son más fáciles como problemas de superficie."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué cantidad de campo aparece dentro de la integral de superficie?",
        "answer": "Rotacional."
      },
      {
        "prompt": "¿A qué teorema común se parece esto en 2D?",
        "answer": "Teorema de Green."
      }
    ],
    "memoryHook": "Stokes = Green en 3D.",
    "quickExample": {
      "problem": "¿Qué teorema cambia una integral de línea del borde por una integral de superficie del rotacional?",
      "move": "Teorema de Stokes."
    }
  },
  "calc3-vector-derivatives-integrals": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 13: Funciones Vectoriales",
    "unit": "Funciones Vectoriales",
    "topic": "Derivadas e integrales de funciones vectoriales.",
    "name": "Derivadas vectoriales / Integrales",
    "useItWhen": "una curva espacial se escribe como un vector y necesitas datos de movimiento",
    "looksLike": "r-primo(t), integral de r(t)",
    "doThis": "diferenciar o integrar componente por componente",
    "thinkOfItAs": "Misma regla, tres carriles.",
    "watchOutFor": "Tratar de combinar componentes antes de diferenciarlos.",
    "rememberThis": "hacer cada componente por sí solo",
    "typicalProblemShapes": [
      "Posición, velocidad, aceleración en forma vectorial.",
      "Preguntas derivadas de la curva espacial"
    ],
    "miniDrill": [
      {
        "prompt": "¿De qué está hecha la derivada de una función vectorial?",
        "answer": "Derivados de cada componente."
      },
      {
        "prompt": "¿Qué aparece después de integrar una función vectorial?",
        "answer": "Un vector constante."
      }
    ],
    "memoryHook": "Mismo movimiento, componente por componente.",
    "quickExample": {
      "problem": "¿Cómo se integra <f,g,h>?",
      "move": "Integre cada componente por separado."
    }
  },
  "calc3-motion-in-space": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 13: Funciones Vectoriales",
    "unit": "Funciones Vectoriales",
    "topic": "Movimiento en el espacio",
    "name": "Movimiento en el espacio",
    "useItWhen": "una partícula se mueve en una curva espacial",
    "looksLike": "Vectores de posición, velocidad y aceleración.",
    "doThis": "diferenciar la posición para la velocidad y nuevamente para la aceleración",
    "thinkOfItAs": "movimiento de una variable con flechas 3D",
    "watchOutFor": "velocidad de mezcla con velocidad",
    "rememberThis": "la velocidad es un vector, la velocidad es su longitud",
    "typicalProblemShapes": [
      "Movimiento de partículas en tres dimensiones.",
      "Cadenas de posición a velocidad a aceleración."
    ],
    "miniDrill": [
      {
        "prompt": "¿Es la velocidad un vector?",
        "answer": "No. Es un escalar."
      },
      {
        "prompt": "¿Cómo se obtiene la aceleración?",
        "answer": "Diferenciar velocidad."
      }
    ],
    "memoryHook": "Puntos de velocidad. La velocidad solo mide.",
    "quickExample": {
      "problem": "¿Cómo se obtiene la velocidad a partir de la velocidad?",
      "move": "Tome la magnitud del vector velocidad."
    }
  },
  "calc3-double-integral-applications": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Aplicaciones de integrales dobles",
    "name": "Aplicaciones Integrales Dobles",
    "useItWhen": "necesita masa, valor promedio o totales en una región",
    "looksLike": "densidad sobre una región 2D",
    "doThis": "integrar la cantidad adecuada en la región",
    "thinkOfItAs": "totales de área con significado adicional",
    "watchOutFor": "usando el área sola cuando la densidad no es 1",
    "rememberThis": "Misma doble integral, diferente interpretación.",
    "typicalProblemShapes": [
      "Masa de una lámina",
      "Valor medio en una región"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué integras para la masa?",
        "answer": "Densidad."
      },
      {
        "prompt": "¿Las integrales dobles también pueden encontrar promedios?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Cambia el integrando, cambia el significado.",
    "quickExample": {
      "problem": "¿Cómo se encuentra la masa a partir de la densidad en una región?",
      "move": "Integrar doblemente la densidad."
    }
  },
  "calc3-parametric-surfaces": {
    "course": "Cálculo Multivariable",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Superficies paramétricas y sus áreas.",
    "name": "Superficies paramétricas",
    "useItWhen": "una superficie es más fácil a partir de parámetros que de z = f(x,y)",
    "looksLike": "r(u,v)",
    "doThis": "Construya la superficie a partir de dos parámetros y utilice el factor de área de productos cruzados.",
    "thinkOfItAs": "una sábana tejida por dos deslizadores",
    "watchOutFor": "olvidando la magnitud del producto cruzado en la pieza de área",
    "rememberThis": "dos parámetros hacen el parche de superficie",
    "typicalProblemShapes": [
      "Superficies escritas como vectores en u y v",
      "Área de superficie a partir de una parametrización"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántos parámetros controlan un parche de superficie?",
        "answer": "Dos."
      },
      {
        "prompt": "¿Qué producto vectorial da el factor de área?",
        "answer": "r_u cruz r_v."
      }
    ],
    "memoryHook": "Parche de superficie = dos parámetros más un producto cruzado.",
    "quickExample": {
      "problem": "¿Qué factor de área proviene de una superficie paramétrica?",
      "move": "La magnitud de r_u cruza r_v."
    }
  },
  "calc3-space-curve-arc-length": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 13: Funciones Vectoriales",
    "unit": "Funciones Vectoriales",
    "topic": "Longitud de arco de las curvas espaciales.",
    "name": "Longitud del arco de la curva espacial",
    "useItWhen": "necesitas la longitud real de un camino 3D",
    "looksLike": "r(t) en un intervalo de a a b",
    "doThis": "integra la magnitud de r'(t)",
    "thinkOfItAs": "Distancia 3D sumada a lo largo del camino",
    "watchOutFor": "olvidando la magnitud de la velocidad dentro de la integral",
    "rememberThis": "La longitud del camino proviene de la velocidad.",
    "typicalProblemShapes": [
      "Longitud de la trayectoria de una partícula en el espacio",
      "Una curva valorada por un vector con límites de tiempo."
    ],
    "miniDrill": [
      {
        "prompt": "¿La longitud de arco usa r'(t) o r''(t)?",
        "answer": "r'(t)."
      },
      {
        "prompt": "¿Se integra el vector o su magnitud?",
        "answer": "Su magnitud."
      }
    ],
    "memoryHook": "Longitud de la curva espacial = velocidad integrada.",
    "quickExample": {
      "problem": "¿Qué va dentro de la integral de longitud de arco para r(t)?",
      "move": "La magnitud de r'(t)."
    }
  },
  "calc3-surface-area-double-integrals": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 15: Integrales Múltiples",
    "unit": "Integrales Múltiples",
    "topic": "Área de superficie",
    "name": "Área de superficie con integrales dobles",
    "useItWhen": "quieres el área real de una superficie z = f(x,y)",
    "looksLike": "hallar el área de una superficie sobre una región",
    "doThis": "usa el factor de inclinación sobre la región base",
    "thinkOfItAs": "una región plana abajo y una superficie inclinada arriba",
    "watchOutFor": "olvidando los parciales de 1 más al cuadrado debajo de la raíz",
    "rememberThis": "el área de superficie es dA por un factor de inclinación",
    "typicalProblemShapes": [
      "Área de superficie para z = f(x,y)",
      "Una región en el plano xy emparejada con una superficie encima de ella."
    ],
    "miniDrill": [
      {
        "prompt": "¿La región base vive en el plano xy?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Qué señal de advertencia se encuentra en la fórmula?",
        "answer": "El factor de raíz cuadrada con las derivadas parciales."
      }
    ],
    "memoryHook": "Área de superficie = dA con un factor de inclinación.",
    "quickExample": {
      "problem": "¿Qué derivadas aparecen en el factor de superficie?",
      "move": "Los parciales con respecto a x e y."
    }
  },
  "calc3-summary-theorems": {
    "course": "Cálculo Multivariable I",
    "chapter": "Capítulo 16: Cálculo Vectorial",
    "unit": "Cálculo Vectorial",
    "topic": "Resumen de los grandes teoremas del cálculo vectorial",
    "name": "Panorama general del cálculo vectorial",
    "useItWhen": "sigues confundiendo Green, Stokes, el teorema de la divergencia y el FTC para integrales de línea",
    "looksLike": "diferentes teoremas integrales con límites, superficies o regiones",
    "doThis": "Relacionar el teorema con el objeto: trayectoria, superficie o volumen.",
    "thinkOfItAs": "la misma idea moviéndose a través de 1D, 2D y 3D",
    "watchOutFor": "usando el teorema correcto en el objeto geométrico incorrecto",
    "rememberThis": "El límite te dice el teorema.",
    "typicalProblemShapes": [
      "Preguntas de reconocimiento sobre qué teorema se ajusta",
      "Problemas construidos alrededor de caminos, superficies o volúmenes cerrados."
    ],
    "miniDrill": [
      {
        "prompt": "¿Hacia qué teorema suele apuntar la curva cerrada en el plano?",
        "answer": "Teorema de Green."
      },
      {
        "prompt": "¿La superficie cerrada alrededor de un volumen apunta hacia qué teorema?",
        "answer": "El teorema de la divergencia."
      }
    ],
    "memoryHook": "Camino, superficie, volumen: relaciona el teorema con la forma.",
    "quickExample": {
      "problem": "Si el problema tiene un volumen y un flujo a través de su frontera, ¿en qué piensas?",
      "move": "El teorema de la divergencia."
    }
  },
  "la-linear-systems": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Sistemas de ecuaciones lineales.",
    "name": "Sistemas Lineales",
    "useItWhen": "Varias ecuaciones están ligadas a las mismas variables.",
    "looksLike": "x + y = 3, 2x - y = 1, más ecuaciones que una línea",
    "doThis": "organizar el sistema y resolverlo juntos, no una línea a la vez",
    "thinkOfItAs": "un rompecabezas con muchas pistas",
    "watchOutFor": "Tratar cada ecuación como un problema separado.",
    "rememberThis": "Las mismas variables significan un sistema.",
    "typicalProblemShapes": [
      "Un bloque de ecuaciones que comparten x, y, z.",
      "Preguntas que piden una solución, ninguna solución o infinitas"
    ],
    "miniDrill": [
      {
        "prompt": "Si tres ecuaciones comparten x, y, z, ¿es ese un sistema o tres trabajos separados?",
        "answer": "Un sistema."
      },
      {
        "prompt": "¿Cuál es la primera pista de reconocimiento aquí?",
        "answer": "Las mismas variables repetidas en varias ecuaciones."
      }
    ],
    "memoryHook": "Variables compartidas significa sistema compartido.",
    "quickExample": {
      "problem": "Dos ecuaciones, dos incógnitas. ¿Cuál es la gran configuración?",
      "move": "Trátelo como un sistema y alinee las variables."
    }
  },
  "la-augmented-matrix": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "matriz aumentada",
    "name": "Matriz aumentada",
    "useItWhen": "quieres el sistema en forma de matriz compacta",
    "looksLike": "[coeficientes | constantes]",
    "doThis": "Elimina las variables, conserva los números y usa la barra para las respuestas.",
    "thinkOfItAs": "el sistema con las palabras eliminadas",
    "watchOutFor": "mezclar columnas de coeficientes con la columna de respuestas",
    "rememberThis": "coeficientes del lado izquierdo, constantes del lado derecho",
    "typicalProblemShapes": [
      "Un sistema reescrito como un rectángulo de números",
      "Operaciones de fila realizadas en una matriz en lugar de ecuaciones"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué suele contener la última columna?",
        "answer": "Las constantes."
      },
      {
        "prompt": "¿Aparecen los nombres de las variables dentro de la matriz aumentada?",
        "answer": "No. Sólo los números."
      }
    ],
    "memoryHook": "Sólo números, respuestas a la derecha.",
    "quickExample": {
      "problem": "x + 2y = 5 y 3x - y = 4",
      "move": "Conviértalo en una matriz aumentada con una columna constante a la derecha."
    }
  },
  "la-row-reduction": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Reducción de filas",
    "name": "Reducción de filas",
    "useItWhen": "necesitas limpiar un sistema en una forma más fácil",
    "looksLike": "intercambiar filas, escalar filas, agregar múltiplos de filas",
    "doThis": "use movimientos de fila legales hasta que los pivotes se destaquen",
    "thinkOfItAs": "Limpiar el tráfico para que aparezcan los números importantes.",
    "watchOutFor": "haciendo un movimiento a una fila pero no actualizando toda la fila",
    "rememberThis": "Los movimientos de fila limpian el sistema, no lo cambian.",
    "typicalProblemShapes": [
      "eliminación gaussiana",
      "Preguntas solicitando REF o RREF"
    ],
    "miniDrill": [
      {
        "prompt": "¿Puedes intercambiar dos filas?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Por qué reducir la fila?",
        "answer": "Para facilitar la lectura de la estructura de la solución."
      }
    ],
    "memoryHook": "Limpiar las filas hasta que se vea la estructura.",
    "quickExample": {
      "problem": "Una matriz aumentada desordenada con muchas entradas distintas de cero",
      "move": "Utilice operaciones de fila para crear posiciones de pivote y ceros."
    }
  },
  "la-pivots-free-variables": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Pivote y variables libres",
    "name": "Pivote vs variables libres",
    "useItWhen": "La matriz reducida está terminada y necesitas la forma de la solución.",
    "looksLike": "Algunas columnas tienen pivotes y otras no.",
    "doThis": "marque las columnas dinámicas y luego deje libres las columnas no pivotantes",
    "thinkOfItAs": "Las columnas pivotantes lideran, las columnas libres deambulan.",
    "watchOutFor": "llamando a cada variable una variable pivote",
    "rememberThis": "ningún pivote en la columna significa variable libre",
    "typicalProblemShapes": [
      "RREF con una o más columnas faltando pivotes",
      "Preguntas de solución paramétrica"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué crea parámetros en la respuesta?",
        "answer": "Variables libres."
      },
      {
        "prompt": "¿Cómo se detecta una variable pivote?",
        "answer": "Su columna tiene un pivote."
      }
    ],
    "memoryHook": "Sin pivote, variable libre.",
    "quickExample": {
      "problem": "Una matriz reducida tiene pivotes solo en las columnas 1 y 3",
      "move": "Las columnas 2 y 4 son gratuitas."
    }
  },
  "la-matrix-operations": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "Suma de matrices y multiplicación escalar.",
    "name": "Operaciones matriciales básicas",
    "useItWhen": "las matrices tienen la misma forma o un escalar está escalando la matriz",
    "looksLike": "A + B, 3A",
    "doThis": "sumar entrada por entrada o multiplicar cada entrada por el escalar",
    "thinkOfItAs": "aritmética de hoja de cálculo",
    "watchOutFor": "Sumar matrices de diferentes tamaños.",
    "rememberThis": "Mismo tamaño para agregar, escalar cada entrada.",
    "typicalProblemShapes": [
      "Se agregan dos matrices del mismo tamaño",
      "Un solo número multiplicando toda la matriz."
    ],
    "miniDrill": [
      {
        "prompt": "¿Se puede sumar una matriz de 2 por 3 a una matriz de 3 por 2?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué toca la multiplicación escalar?",
        "answer": "Cada entrada."
      }
    ],
    "memoryHook": "Agregar por lugar. Escale cada ranura.",
    "quickExample": {
      "problem": "Suma dos matrices de 2 por 2",
      "move": "Relaciona cada entrada con la que está en el mismo lugar."
    }
  },
  "la-matrix-multiplication": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "Multiplicación de matrices",
    "name": "Multiplicación de matrices",
    "useItWhen": "estás componiendo acciones matriciales",
    "looksLike": "AB con dimensiones interiores coincidentes",
    "doThis": "fila por columna, puntee cada fila con cada columna",
    "thinkOfItAs": "las filas se encuentran con las columnas y crean nuevas entradas",
    "watchOutFor": "multiplicar entrada por entrada o ignorar la discrepancia de tamaño",
    "rememberThis": "Los tamaños interiores deben coincidir.",
    "typicalProblemShapes": [
      "AB donde la compatibilidad de tamaños importa primero",
      "Productos que cambian el tamaño de la matriz."
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede una matriz de 3 por 2 multiplicar una matriz de 4 por 3 a la derecha?",
        "answer": "No. Las tallas interiores no coinciden."
      },
      {
        "prompt": "¿Qué regla construye una entrada de AB?",
        "answer": "Fila por columna."
      }
    ],
    "memoryHook": "Coincidencia interna, luego fila por columna.",
    "quickExample": {
      "problem": "Multiplicar una matriz de 2 por 3 por una matriz de 3 por 4",
      "move": "Legal porque los 3 y 3 interiores coinciden."
    }
  },
  "la-identity-matrix": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "Matriz de identidad",
    "name": "Matriz de identidad",
    "useItWhen": "necesitas la matriz de no hacer nada",
    "looksLike": "1 en la diagonal, 0 en el resto",
    "doThis": "reconocerlo como la versión matricial de 1",
    "thinkOfItAs": "la configuración neutral",
    "watchOutFor": "usando la matriz de identidad de tamaño incorrecto",
    "rememberThis": "La identidad deja las cosas en paz.",
    "typicalProblemShapes": [
      "Unos diagonales y cero en otros lugares",
      "IA = A y AI = A"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la versión matricial de multiplicar por 1?",
        "answer": "La matriz de identidad."
      },
      {
        "prompt": "¿Funciona una identidad de 2 por 2 para una matriz de 3 por 3?",
        "answer": "No."
      }
    ],
    "memoryHook": "Identidad = matriz uno.",
    "quickExample": {
      "problem": "¿Qué le sucede a Ax si A es la identidad?",
      "move": "Nada cambia."
    }
  },
  "la-inverse-matrix": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "matriz inversa",
    "name": "Matriz inversa",
    "useItWhen": "quieres deshacer una acción matricial",
    "looksLike": "A inversa, AA inversa = I",
    "doThis": "verifique que la matriz sea invertible, luego use la inversa para revertir la acción",
    "thinkOfItAs": "el botón de deshacer de la matriz",
    "watchOutFor": "suponiendo que toda matriz cuadrada tiene una inversa",
    "rememberThis": "la inversa solo existe cuando la matriz es invertible",
    "typicalProblemShapes": [
      "Resuelva Ax = b usando lenguaje matricial",
      "Preguntas sobre si una matriz es invertible"
    ],
    "miniDrill": [
      {
        "prompt": "¿A qué debe equivaler A multiplicado por A inverso?",
        "answer": "La matriz de identidad."
      },
      {
        "prompt": "¿Toda matriz cuadrada tiene inversa?",
        "answer": "No."
      }
    ],
    "memoryHook": "Inverso significa deshacer.",
    "quickExample": {
      "problem": "¿Cómo se deshace Ax = b cuando A es invertible?",
      "move": "Multiplicar por A inverso."
    }
  },
  "la-determinant": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 3: Determinantes",
    "unit": "Determinantes",
    "topic": "Determinante",
    "name": "Determinante",
    "useItWhen": "necesita una señal de invertibilidad rápida o una pista de escala de área-volumen",
    "looksLike": "det A o barras alrededor de una matriz cuadrada",
    "doThis": "Calcular el determinante y comprobar si es cero.",
    "thinkOfItAs": "un control de salud de la matriz",
    "watchOutFor": "tratando de tomar determinantes de matrices no cuadradas",
    "rememberThis": "det cero generalmente significa no invertible",
    "typicalProblemShapes": [
      "Sólo matrices cuadradas",
      "Comprobaciones de invertibilidad y preguntas de escala de área."
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede una matriz rectangular tener un determinante?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuál es el valor de alarma rápida para los determinantes?",
        "answer": "Cero."
      }
    ],
    "memoryHook": "Det cero significa problemas.",
    "quickExample": {
      "problem": "Una matriz de 2 por 2 tiene determinante 0. ¿Cuál es la gran conclusión?",
      "move": "No es reversible."
    }
  },
  "la-rank": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 3: Determinantes",
    "unit": "Determinantes",
    "topic": "Rango",
    "name": "Rango",
    "useItWhen": "quieres el número de direcciones de pivote independientes",
    "looksLike": "rango A, recuento de pivotes, filas distintas de cero en forma escalonada",
    "doThis": "Reducir filas y contar posiciones de pivote.",
    "thinkOfItAs": "¿Cuánta información real guarda la matriz?",
    "watchOutFor": "contando cada fila en lugar de filas dinámicas",
    "rememberThis": "el rango es el recuento de pivotes",
    "typicalProblemShapes": [
      "Conteo de pivotes después de la reducción de filas",
      "Preguntas sobre rango completo o deficiencia de rango"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué es el rango en una frase rápida?",
        "answer": "El número de pivotes."
      },
      {
        "prompt": "¿Una fila cero aumenta la clasificación?",
        "answer": "No."
      }
    ],
    "memoryHook": "Rango = pivotes que sobrevivieron.",
    "quickExample": {
      "problem": "¿Cómo se lee el rango del RREF?",
      "move": "Cuente los pivotes."
    }
  },
  "la-vector-space": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "Idea de espacio vectorial",
    "name": "Espacio vectorial",
    "useItWhen": "se supone que el conjunto admite la suma de vectores y el escalado escalar",
    "looksLike": "conjuntos de vectores, polinomios, matrices o funciones",
    "doThis": "preguntar si el conjunto permanece cerrado bajo suma y multiplicación escalar",
    "thinkOfItAs": "un campo de juego legal para movimientos vectoriales",
    "watchOutFor": "suponiendo que cada conjunto de vectores es automáticamente un espacio vectorial",
    "rememberThis": "cerrado bajo agregar y escalar",
    "typicalProblemShapes": [
      "¿Es este conjunto un espacio vectorial?",
      "Conjuntos definidos por ecuaciones o restricciones."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué dos movimientos deben permanecer dentro del conjunto?",
        "answer": "Suma y multiplicación escalar."
      },
      {
        "prompt": "Si el escalado puede salir del conjunto, ¿es un espacio vectorial?",
        "answer": "No."
      }
    ],
    "memoryHook": "El espacio vectorial significa que agregar y escalar es legal.",
    "quickExample": {
      "problem": "Se propone un conjunto de vectores. ¿Cuál es el primer cheque?",
      "move": "Vea si la suma y la multiplicación escalar permanecen dentro del conjunto."
    }
  },
  "la-subspace-test": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "prueba subespacial",
    "name": "Prueba subespacial",
    "useItWhen": "el problema pregunta si un conjunto dentro de un espacio vectorial es en sí mismo un espacio vectorial",
    "looksLike": "mostrar W es un subespacio de V",
    "doThis": "comprobar cero, cerrado bajo suma, cerrado bajo multiplicación escalar",
    "thinkOfItAs": "la prueba del saltador rápido",
    "watchOutFor": "olvidándose de comprobar el vector cero",
    "rememberThis": "cero, sumar, escalar",
    "typicalProblemShapes": [
      "Conjuntos definidos por condiciones lineales.",
      "Preguntas subespaciales o no subespaciales"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuáles son los tres controles rápidos?",
        "answer": "Cero, suma, multiplicación escalar."
      },
      {
        "prompt": "Si falta el vector cero, ¿puede ser un subespacio?",
        "answer": "No."
      }
    ],
    "memoryHook": "Cero, sumar, escalar.",
    "quickExample": {
      "problem": "Un conjunto está definido por una ecuación lineal. ¿Qué prueba deberías realizar?",
      "move": "La prueba subespacial."
    }
  },
  "la-span": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "lapso",
    "name": "lapso",
    "useItWhen": "necesitas todas las combinaciones lineales de vectores dados",
    "looksLike": "lapso de v1, v2, v3",
    "doThis": "permitir combinaciones escalares arbitrarias y preguntar qué espacio pueden alcanzar",
    "thinkOfItAs": "el alcance de los vectores",
    "watchOutFor": "lapso de pensamiento significa solo los vectores enumerados en sí",
    "rememberThis": "span significa todas las combinaciones lineales",
    "typicalProblemShapes": [
      "¿Qué espacio generan estos vectores?",
      "Preguntas sobre cómo alcanzar un vector objetivo mediante combinaciones"
    ],
    "miniDrill": [
      {
        "prompt": "¿Lapso significa una combinación o todas las combinaciones?",
        "answer": "Todas las combinaciones."
      },
      {
        "prompt": "¿Cuál es la pregunta principal detrás del span?",
        "answer": "¿Qué pueden construir estos vectores?"
      }
    ],
    "memoryHook": "Span = todo lo que estos vectores pueden construir.",
    "quickExample": {
      "problem": "¿Qué suele dar el intervalo de dos vectores no paralelos en R2?",
      "move": "Normalmente todo el plano."
    }
  },
  "la-linear-independence": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "Independencia lineal",
    "name": "Independencia lineal",
    "useItWhen": "necesitas saber si un vector se construye en secreto a partir de los demás",
    "looksLike": "conjunto independiente o dependiente",
    "doThis": "establezca la combinación igual a cero y pruebe si solo funciona la solución trivial",
    "thinkOfItAs": "cada vector tirando de su propio peso",
    "watchOutFor": "llamar a un conjunto independiente cuando un vector es redundante",
    "rememberThis": "sólo la solución de coeficiente cero significa independiente",
    "typicalProblemShapes": [
      "Una lista de vectores probados para determinar la redundancia",
      "Preguntas básicas que preguntan primero si los vectores son independientes."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la mala señal para la independencia?",
        "answer": "Una solución no trivial a la combinación cero."
      },
      {
        "prompt": "Si un vector es una combinación de los demás, ¿independiente o dependiente?",
        "answer": "Dependiente."
      }
    ],
    "memoryHook": "Redundante significa dependiente.",
    "quickExample": {
      "problem": "¿Cómo se prueba la independencia rápidamente?",
      "move": "Resuelva c1v1 + c2v2 + ... = 0."
    }
  },
  "la-basis-dimension": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "Base y dimensión",
    "name": "Base y dimensión",
    "useItWhen": "necesitas los bloques de construcción principales y el tamaño del espacio",
    "looksLike": "encontrar una base, ¿cuál es la dimensión?",
    "doThis": "busque un conjunto que sea independiente y abarcador, luego cuéntelo",
    "thinkOfItAs": "el kit de herramientas completo más pequeño",
    "watchOutFor": "usando un conjunto que se extiende pero no es independiente",
    "rememberThis": "base = independiente + abarcadora",
    "typicalProblemShapes": [
      "Encuentra una base para un subespacio",
      "Cuente la dimensión después de encontrar pivotes o vectores base"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué dos trabajos debe hacer una base?",
        "answer": "Amplía el espacio y mantente independiente."
      },
      {
        "prompt": "¿Qué es la dimensión en una línea?",
        "answer": "El número de vectores en una base."
      }
    ],
    "memoryHook": "Basis construye el espacio sin extras.",
    "quickExample": {
      "problem": "¿Qué cuenta la dimensión?",
      "move": "Cuántos vectores base necesitas."
    }
  },
  "la-dot-orthogonality": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 5: Ortogonalidad",
    "unit": "Ortogonalidad",
    "topic": "Producto escalar y ortogonalidad",
    "name": "Ortogonalidad",
    "useItWhen": "necesitas vectores perpendiculares o geometría de ángulo recto",
    "looksLike": "u punto v = 0, conjunto ortogonal",
    "doThis": "calcular el producto escalar y comprobar si se vuelve cero",
    "thinkOfItAs": "vectores que se cruzan en un ángulo recto limpio",
    "watchOutFor": "suponiendo que un producto escalar pequeño significa exactamente ortogonal",
    "rememberThis": "punto cero significa perpendicular",
    "typicalProblemShapes": [
      "Vectores perpendiculares",
      "Conjuntos ortogonales y proyecciones."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué es la prueba de ortogonalidad rápida?",
        "answer": "El producto escalar es igual a cero."
      },
      {
        "prompt": "¿Ortogonal significa paralelo?",
        "answer": "No. Quiere decir perpendicular."
      }
    ],
    "memoryHook": "Punto cero, ángulo recto.",
    "quickExample": {
      "problem": "¿Cómo se prueba si dos vectores son perpendiculares?",
      "move": "Tome su producto escalar."
    }
  },
  "la-projection": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 5: Ortogonalidad",
    "unit": "Ortogonalidad",
    "topic": "Proyección",
    "name": "Proyección",
    "useItWhen": "necesitas la sombra de un vector en otra dirección",
    "looksLike": "proyecto de u en v",
    "doThis": "tomar el componente en la dirección objetivo",
    "thinkOfItAs": "dejando caer una sombra sobre una línea",
    "watchOutFor": "olvidar qué vector es la dirección objetivo",
    "rememberThis": "La proyección mantiene sólo la parte a lo largo de la línea.",
    "typicalProblemShapes": [
      "Mejor aproximación a una recta",
      "Descomposición vectorial en partes longitudinales y perpendiculares."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué imagen ayuda más aquí?",
        "answer": "Una sombra aterrizando en una línea."
      },
      {
        "prompt": "¿La proyección mantiene la parte lateral?",
        "answer": "No."
      }
    ],
    "memoryHook": "Proyección = sombra sobre la línea.",
    "quickExample": {
      "problem": "¿Qué guarda una proyección?",
      "move": "Sólo la parte que apunta en la dirección elegida."
    }
  },
  "la-linear-transformation": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Transformaciones lineales",
    "name": "Transformación lineal",
    "useItWhen": "una regla toma vectores y los envía de manera que preserve la estructura",
    "looksLike": "T(x), matriz por vector, mapas entre espacios vectoriales",
    "doThis": "comprobar si la regla respeta la suma y la multiplicación escalar",
    "thinkOfItAs": "una máquina que dobla el espacio sin romper las reglas lineales",
    "watchOutFor": "llamando lineal a cada regla vectorial",
    "rememberThis": "lineal significa agregar y escalar sobrevivir",
    "typicalProblemShapes": [
      "Reglas que asignan vectores a vectores.",
      "Preguntas sobre si una transformación es lineal"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuáles dos pruebas lineales son más importantes?",
        "answer": "Aditividad y multiplicación escalar."
      },
      {
        "prompt": "¿Toda regla con valores vectoriales es automáticamente lineal?",
        "answer": "No."
      }
    ],
    "memoryHook": "La regla lineal mantiene la suma y la escala.",
    "quickExample": {
      "problem": "¿Cómo se prueba si T es lineal?",
      "move": "Verifique la aditividad y la compatibilidad escalar."
    }
  },
  "la-eigenvalues-eigenvectors": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Valores propios y vectores propios",
    "name": "Valores propios y vectores propios",
    "useItWhen": "una transformación estira un vector sin alejarlo de su línea",
    "looksLike": "Av = lambdav",
    "doThis": "buscar direcciones que permanezcan en la misma línea después de que actúa la matriz",
    "thinkOfItAs": "direcciones especiales que respeta la matriz",
    "watchOutFor": "pensar que cada vector es un vector propio",
    "rememberThis": "Misma línea, nuevo tamaño.",
    "typicalProblemShapes": [
      "Av = lambdav",
      "Encontrar valores propios o vectores propios de una matriz."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué permanece igual para un vector propio?",
        "answer": "Su línea de dirección."
      },
      {
        "prompt": "¿Qué cambia para un vector propio?",
        "answer": "Su tamaño, por el valor propio."
      }
    ],
    "memoryHook": "Eigenvector mantiene la línea.",
    "quickExample": {
      "problem": "¿Qué hace que v sea un vector propio?",
      "move": "Av cae en la misma línea que v."
    }
  },
  "la-diagonalization": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Diagonalización",
    "name": "Diagonalización",
    "useItWhen": "desea una matriz reescrita en una forma de base propia mucho más sencilla",
    "looksLike": "A = P D P inversa",
    "doThis": "recopilar suficientes vectores propios independientes para construir P",
    "thinkOfItAs": "cambiando a las coordenadas favoritas de la matriz",
    "watchOutFor": "tratando de diagonalizar sin suficientes vectores propios independientes",
    "rememberThis": "suficientes vectores propios hacen que la matriz se vuelva diagonal",
    "typicalProblemShapes": [
      "A = P D P configuración inversa",
      "Preguntas sobre si una matriz es diagonalizable"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tipo de matriz se encuentra en el medio?",
        "answer": "Una matriz diagonal."
      },
      {
        "prompt": "¿Qué suele bloquear la diagonalización?",
        "answer": "No hay suficientes vectores propios independientes."
      }
    ],
    "memoryHook": "Suficientes vectores propios desbloquean la forma diagonal.",
    "quickExample": {
      "problem": "¿Cuál es el gran requisito para la diagonalización?",
      "move": "Necesitas suficientes vectores propios independientes."
    }
  },
  "la-consistency": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Sistemas consistentes versus inconsistentes",
    "name": "Consistente versus inconsistente",
    "useItWhen": "La reducción de filas termina y es necesario clasificar el sistema.",
    "looksLike": "una fila como 0 0 0 | 1 o un sistema limpio y resuelto",
    "doThis": "busca filas imposibles primero",
    "thinkOfItAs": "¿El sistema todavía tiene sentido o se contradice?",
    "watchOutFor": "falta la fila imposible en la parte inferior",
    "rememberThis": "fila imposible significa que no hay solución",
    "typicalProblemShapes": [
      "Preguntas de clasificación del RREF",
      "Una solución, ninguna solución o infinitas comprobaciones de soluciones"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la pista más rápida sin solución?",
        "answer": "Una fila contradictoria como 0 = 1."
      },
      {
        "prompt": "¿Puede un sistema consistente tener variables libres?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Mala pelea, no hay solución.",
    "quickExample": {
      "problem": "¿Qué significa 0 = 1 en la última fila?",
      "move": "El sistema es inconsistente."
    }
  },
  "la-homogeneous-system": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Sistemas homogéneos",
    "name": "Sistema Homogéneo",
    "useItWhen": "el lado derecho es todo ceros",
    "looksLike": "Hacha = 0",
    "doThis": "recuerde que la solución cero siempre existe, luego verifique las variables libres",
    "thinkOfItAs": "El sistema sin empuje externo.",
    "watchOutFor": "olvidar que la solución trivial siempre está ahí",
    "rememberThis": "Ax = 0 siempre tiene al menos la solución cero",
    "typicalProblemShapes": [
      "Configuración de espacio nulo",
      "Preguntas sobre soluciones no triviales"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuándo un sistema homogéneo tiene soluciones no triviales?",
        "answer": "Cuando aparecen variables libres."
      },
      {
        "prompt": "¿Alguna vez falta la solución cero de Ax = 0?",
        "answer": "No."
      }
    ],
    "memoryHook": "Homogéneo significa que cero siempre funciona.",
    "quickExample": {
      "problem": "¿Qué solución tiene todo sistema homogéneo?",
      "move": "La solución trivial cero."
    }
  },
  "la-transpose-symmetric": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "Matrices transpuestas y simétricas.",
    "name": "Transpuesta y simétrica",
    "useItWhen": "una matriz gira a lo largo de la diagonal o se compara con su transpuesta",
    "looksLike": "Una matriz simétrica transpuesta, a_ij es igual a a_ji",
    "doThis": "intercambiar filas con columnas, luego comparar",
    "thinkOfItAs": "reflejando la matriz en su espejo diagonal",
    "watchOutFor": "cambiar entradas en lugar de simplemente intercambiar posiciones",
    "rememberThis": "simétrico significa igual a su transpuesta",
    "typicalProblemShapes": [
      "Calcular una transpuesta",
      "Comprobar si una matriz cuadrada es simétrica"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué hace la transposición primero?",
        "answer": "Intercambia filas y columnas."
      },
      {
        "prompt": "¿Puede una matriz no cuadrada ser simétrica?",
        "answer": "No."
      }
    ],
    "memoryHook": "Transponer volteretas. Simétrico coincide con el flip.",
    "quickExample": {
      "problem": "¿Qué hace que una matriz sea simétrica?",
      "move": "A es igual a A transpuesta."
    }
  },
  "la-cofactor-cramers": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 3: Determinantes",
    "unit": "Determinantes",
    "topic": "Expansión de cofactores y regla de Cramer",
    "name": "Cofactor y regla de Cramer",
    "useItWhen": "un determinante se expande en una fila o columna o un sistema pequeño se resuelve mediante determinantes",
    "looksLike": "signos de cofactor, reemplazar una columna, dividir por det A",
    "doThis": "elija una fila o columna inteligente y use solo la regla de Cramer en sistemas cuadrados invertibles pequeños",
    "thinkOfItAs": "cirugía determinante una fila a la vez",
    "watchOutFor": "usando la regla de Cramer cuando det A es cero",
    "rememberThis": "La regla de Cramer solo funciona cuando det A no es cero",
    "typicalProblemShapes": [
      "3 por 3 expansiones determinantes",
      "Pequeños sistemas resueltos con fórmulas determinantes."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué patrón de signos guía a los cofactores?",
        "answer": "Signos más menos alternos."
      },
      {
        "prompt": "¿Puede la regla de Cramer resolver un sistema singular?",
        "answer": "No."
      }
    ],
    "memoryHook": "Sin determinante distinto de cero, sin regla de Cramer.",
    "quickExample": {
      "problem": "¿Cuál es la primera verificación determinante antes de la regla de Cramer?",
      "move": "Asegúrese de que det A no sea cero."
    }
  },
  "la-column-null-space": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "Espacio de columna y espacio nulo",
    "name": "Espacio de columna frente a espacio nulo",
    "useItWhen": "necesita saber qué resultados puede generar una matriz o qué entradas elimina",
    "looksLike": "Col A, Nul A, Ax = b, Ax = 0",
    "doThis": "piense en salidas para el espacio de columnas y entradas que producen cero para el espacio nulo",
    "thinkOfItAs": "Lo que la matriz puede crear frente a lo que elimina.",
    "watchOutFor": "mezclar vectores en el dominio con vectores en el codominio",
    "rememberThis": "el espacio de columna son salidas, el espacio nulo son cero entradas",
    "typicalProblemShapes": [
      "Resuelva Ax = 0 para describir el espacio nulo",
      "Columnas pivotantes utilizadas para describir el espacio de columnas."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué espacio vive en el lado de entrada?",
        "answer": "El espacio nulo."
      },
      {
        "prompt": "¿Qué espacio describe los resultados alcanzables?",
        "answer": "El espacio de la columna."
      }
    ],
    "memoryHook": "Las columnas generan resultados. Nulo hace cero.",
    "quickExample": {
      "problem": "¿Qué recoge el espacio nulo?",
      "move": "Todos los vectores enviados a cero."
    }
  },
  "la-coordinates-change-basis": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "Coordenadas y cambio de base.",
    "name": "Coordenadas y cambio de base",
    "useItWhen": "el mismo vector se describe de forma no estándar",
    "looksLike": "vector de coordenadas relativo a B, matriz de cambio de base",
    "doThis": "tratar la base como el idioma y convertir el vector a ese idioma",
    "thinkOfItAs": "Mismo punto, diferente acento de coordenadas.",
    "watchOutFor": "olvidar a qué base pertenecen las coordenadas",
    "rememberThis": "las coordenadas dependen de la base",
    "typicalProblemShapes": [
      "Encontrar coordenadas relativas a una base.",
      "Convertir entre coordenadas estándar y no estándar"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cambia el vector real cuando cambia la base?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué cambia con una nueva base?",
        "answer": "Sus coordenadas."
      }
    ],
    "memoryHook": "Mismo vector, nuevo idioma.",
    "quickExample": {
      "problem": "¿Cambian las coordenadas cuando cambia la base?",
      "move": "Sí. El vector sigue siendo el mismo, pero la descripción cambia."
    }
  },
  "la-orthonormal-gram-schmidt": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 5: Ortogonalidad",
    "unit": "Ortogonalidad",
    "topic": "Conjuntos ortonormales y Gram-Schmidt",
    "name": "Ortonormal y Gram-Schmidt",
    "useItWhen": "quieres vectores unitarios perpendiculares de una base desordenada",
    "looksLike": "base ortonormal, proceso de Gram-Schmidt",
    "doThis": "eliminar proyecciones y luego normalizar",
    "thinkOfItAs": "enderezar los vectores, luego cambiar su tamaño",
    "watchOutFor": "normalizando antes de quitar las piezas de dirección antiguas",
    "rememberThis": "restar proyecciones, luego normalizar",
    "typicalProblemShapes": [
      "Construir una base ortonormal",
      "Problemas de ortogonalidad con mucha proyección"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué significa ortonormal en una frase?",
        "answer": "Perpendicular y de longitud uno."
      },
      {
        "prompt": "¿Qué viene después de eliminar las proyecciones?",
        "answer": "Normalizar."
      }
    ],
    "memoryHook": "Enderezar y luego reducir a 1.",
    "quickExample": {
      "problem": "¿Cuáles son las dos grandes etapas de Gram-Schmidt?",
      "move": "Haga vectores ortogonales y luego conviértalos en vectores unitarios."
    }
  },
  "la-least-squares": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 5: Ortogonalidad",
    "unit": "Ortogonalidad",
    "topic": "mínimos cuadrados",
    "name": "Mínimos cuadrados",
    "useItWhen": "Ax = b no tiene solución exacta y quieres el ajuste más cercano",
    "looksLike": "sistema sobredeterminado, línea de mejor ajuste, A transpuesta A x = A transpuesta b",
    "doThis": "proyectar en el espacio de columnas y resolver las ecuaciones normales",
    "thinkOfItAs": "la mejor señorita posible",
    "watchOutFor": "Tratar un sistema sin solución como si todavía tuviera una respuesta exacta.",
    "rememberThis": "mínimos cuadrados encuentra el ajuste más cercano, no un acierto perfecto",
    "typicalProblemShapes": [
      "Preguntas sobre ajuste de línea o de datos de mejor ajuste",
      "Sistemas sobredeterminados"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tipo de sistema suele conducir a mínimos cuadrados?",
        "answer": "Un sistema con más ecuaciones que soluciones exactas."
      },
      {
        "prompt": "¿Los mínimos cuadrados hacen que el residuo sea exactamente cero?",
        "answer": "Normalmente no."
      }
    ],
    "memoryHook": "¿No hay ajuste exacto? Tome el ajuste más cercano.",
    "quickExample": {
      "problem": "¿Cuándo aparecen las ecuaciones normales?",
      "move": "Cuando quieras la solución de mínimos cuadrados."
    }
  },
  "la-characteristic-polynomial": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Polinomio característico",
    "name": "Polinomio característico",
    "useItWhen": "necesitas valores propios de una matriz",
    "looksLike": "det(A - lambda I) = 0",
    "doThis": "establecer A menos lambda I, tomar el determinante y resolver",
    "thinkOfItAs": "la ecuación del buscador de valores propios",
    "watchOutFor": "olvidando la lambda me parte",
    "rememberThis": "los valores propios provienen de det(A menos lambda I)",
    "typicalProblemShapes": [
      "Encontrar valores propios de una matriz.",
      "Configuración polinómica característica"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué se resta de A antes del determinante?",
        "answer": "Lambda multiplica la identidad."
      },
      {
        "prompt": "¿Qué dan las raíces del polinomio característico?",
        "answer": "Los valores propios."
      }
    ],
    "memoryHook": "Resta lambda I y luego resuelve.",
    "quickExample": {
      "problem": "¿Qué ecuación inicia la búsqueda de valores propios?",
      "move": "det(A - lambda I) = 0."
    }
  },
  "la-echelon-vs-rref": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Forma escalonada versus forma escalonada reducida",
    "name": "REF frente a RREF",
    "useItWhen": "una matriz está casi limpia y necesita nombrar el formulario",
    "looksLike": "Pivotes escalonados, ceros debajo de los pivotes, tal vez ceros arriba también.",
    "doThis": "primero verifique la forma del pivote, luego pregunte si cada pivote es solitario 1",
    "thinkOfItAs": "REF se limpia, RREF se pule completamente",
    "watchOutFor": "llamar a una matriz RREF solo porque tiene pivotes",
    "rememberThis": "RREF significa pivote 1 con ceros arriba y abajo",
    "typicalProblemShapes": [
      "Clasificar una matriz reducida",
      "Detener la reducción de filas en REF o continuar con RREF"
    ],
    "miniDrill": [
      {
        "prompt": "¿REF todavía puede tener entradas distintas de cero sobre un pivote?",
        "answer": "Sí."
      },
      {
        "prompt": "¿A qué debe equivaler cada pivote en RREF?",
        "answer": "1."
      }
    ],
    "memoryHook": "RREF es REF más pivotes más limpios.",
    "quickExample": {
      "problem": "¿Qué cosa extra tiene el RREF que quizás el REF no tenga?",
      "move": "Ceros encima de cada pivote también."
    }
  },
  "la-ax-equals-b": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 1: Sistemas y Reducción por Filas",
    "unit": "Sistemas y Reducción por Filas",
    "topic": "Ecuación matricial Ax = b",
    "name": "hacha = b",
    "useItWhen": "un sistema se escribe como una ecuación matricial",
    "looksLike": "Ax = b, matriz de coeficientes multiplicada por vector variable",
    "doThis": "lea A como la acción, x como las incógnitas y b como el objetivo.",
    "thinkOfItAs": "una máquina intentando alcanzar una salida",
    "watchOutFor": "mezclando el papel de x y b",
    "rememberThis": "Ax = b es la versión matricial de un sistema lineal",
    "typicalProblemShapes": [
      "Reescribir un sistema como Ax = b",
      "Pregunte si b se encuentra en el espacio columna de A."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué significa x en Ax = b?",
        "answer": "El vector desconocido."
      },
      {
        "prompt": "¿Qué parte de Ax = b son datos fijos además de A?",
        "answer": "b."
      }
    ],
    "memoryHook": "A actúa, x es desconocido, b es el objetivo.",
    "quickExample": {
      "problem": "¿Qué representa b en Ax = b?",
      "move": "El vector de salida objetivo."
    }
  },
  "la-invertible-matrix-theorem": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "Teorema de la matriz invertible",
    "name": "Teorema de la matriz invertible",
    "useItWhen": "desea muchas formas equivalentes de detectar rápidamente una matriz invertible",
    "looksLike": "det distinto de cero, pivotes en cada columna, solución única, existe inversa",
    "doThis": "reconocer una pista invertible y aprovechar las demás",
    "thinkOfItAs": "una luz verde desbloquea toda la lista",
    "watchOutFor": "memorizar una prueba y olvidar las equivalentes",
    "rememberThis": "El invertible se presenta con muchos disfraces.",
    "typicalProblemShapes": [
      "Decidir si una matriz cuadrada es invertible",
      "Traducir un hecho de invertibilidad a otro"
    ],
    "miniDrill": [
      {
        "prompt": "Para una matriz cuadrada, ¿det no es igual a 0 sugiere invertible o singular?",
        "answer": "Invertibles."
      },
      {
        "prompt": "¿Invertible significa que Ax = 0 solo tiene la solución trivial?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Una pista reversible abre todo el paquete.",
    "quickExample": {
      "problem": "Si una matriz cuadrada tiene un pivote en cada columna, ¿qué más es verdadero rápido?",
      "move": "Es reversible."
    }
  },
  "la-lu-factorization": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 2: Álgebra de Matrices",
    "unit": "Matrices",
    "topic": "factorización LU",
    "name": "Factorización LU",
    "useItWhen": "resuelves muchos sistemas con la misma matriz A",
    "looksLike": "A = LU, inferior por superior",
    "doThis": "factoriza una vez, luego resuelve Ly = b y Ux = y",
    "thinkOfItAs": "dividir previamente el trabajo en dos soluciones más fáciles",
    "watchOutFor": "probar LU antes de comprobar si los problemas de pivote fuerzan el intercambio de filas",
    "rememberThis": "factorizar una vez, resolver dos veces",
    "typicalProblemShapes": [
      "Problemas repetidos de Ax = b con la misma matriz de coeficientes",
      "Preguntas de descomposición inferior-superior"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué formas suelen tener L y U?",
        "answer": "L es triangular inferior y U es triangular superior."
      },
      {
        "prompt": "Después de A = LU, ¿qué sistema resuelves primero?",
        "answer": "Ly = b."
      }
    ],
    "memoryHook": "LU divide una solución difícil en dos fáciles.",
    "quickExample": {
      "problem": "¿Por qué utilizar LU en lugar de reducir filas desde cero cada vez?",
      "move": "Ahorra trabajo cuando A permanece igual."
    }
  },
  "la-determinant-zero-test": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 3: Determinantes",
    "unit": "Determinantes",
    "topic": "¿Qué te dice det = 0?",
    "name": "det = 0 Prueba",
    "useItWhen": "necesita una verificación rápida singular versus invertible",
    "looksLike": "det(A) = 0 o det(A) distinto de 0",
    "doThis": "Tratar el determinante cero como la señal de alerta del colapso y la pérdida de invertibilidad.",
    "thinkOfItAs": "la matriz se aplanó",
    "watchOutFor": "calcular la inversa después de que det ya te haya dicho que no puede existir",
    "rememberThis": "det 0 significa singular",
    "typicalProblemShapes": [
      "Comprobaciones rápidas de invertibilidad",
      "Escalado de área o volumen colapsando a cero"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué suele significar que det no es igual a 0 para una matriz cuadrada?",
        "answer": "Invertibles."
      },
      {
        "prompt": "¿Det = 0 sugiere columnas dependientes?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Determinante cero, sin inversa.",
    "quickExample": {
      "problem": "Si det(A) = 0, ¿puede A ser invertible?",
      "move": "No."
    }
  },
  "la-rank-nullity": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 4: Espacios Vectoriales",
    "unit": "Espacios Vectoriales",
    "topic": "Teorema de nulidad de rango",
    "name": "Nulidad de rango",
    "useItWhen": "necesitas el equilibrio dimensional entre los resultados y la libertad oculta",
    "looksLike": "rango más nulidad es igual al número de columnas",
    "doThis": "contar direcciones de pivote y direcciones libres juntas",
    "thinkOfItAs": "dimensiones usadas más libertad sobrante",
    "watchOutFor": "mezclar el número de filas con el número de columnas en la fórmula",
    "rememberThis": "rango + nulidad = número de columnas",
    "typicalProblemShapes": [
      "Preguntas de recuento de dimensiones",
      "Comparaciones de tamaño de imagen y kernel"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué cuenta la nulidad?",
        "answer": "Direcciones gratuitas en el núcleo."
      },
      {
        "prompt": "¿La nulidad de rango utiliza el número de columnas o filas?",
        "answer": "Columnas."
      }
    ],
    "memoryHook": "Las direcciones utilizadas más las direcciones libres equivalen al total de columnas.",
    "quickExample": {
      "problem": "Si una matriz tiene 6 columnas y rango 4, ¿cuál es la nulidad?",
      "move": "2."
    }
  },
  "la-orthogonal-matrix": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 5: Ortogonalidad",
    "unit": "Ortogonalidad",
    "topic": "Matrices ortogonales",
    "name": "Matriz ortogonal",
    "useItWhen": "las columnas son ortonormales y lo inverso debería ser fácil",
    "looksLike": "Q transponer Q = I",
    "doThis": "verifique las columnas ortonormales, luego cambie el trabajo inverso por una transpuesta",
    "thinkOfItAs": "un movimiento rígido que mantiene longitudes y ángulos",
    "watchOutFor": "suponiendo que las columnas perpendiculares son suficientes sin normalización",
    "rememberThis": "matriz ortogonal significa Q inversa es igual a Q transpuesta",
    "typicalProblemShapes": [
      "Matrices de rotación o reflexión.",
      "Pruebas de columna ortonormal"
    ],
    "miniDrill": [
      {
        "prompt": "¿Las columnas de matriz ortogonal también necesitan una unidad de longitud?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Qué ecuación es la prueba rápida?",
        "answer": "Q transponer Q = I."
      }
    ],
    "memoryHook": "Las columnas ortonormales hacen que la transpuesta sea igual a la inversa.",
    "quickExample": {
      "problem": "¿Cuál es la inversa rápida de una matriz ortogonal?",
      "move": "Su transposición."
    }
  },
  "la-matrix-of-transformation": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Matriz de una transformación lineal",
    "name": "Matriz de una transformación",
    "useItWhen": "una regla geométrica necesita una matriz en coordenadas",
    "looksLike": "T(v), base estándar, imagen de e_1 y e_2",
    "doThis": "enviar vectores base a través de T y usar esas salidas como columnas",
    "thinkOfItAs": "registrar lo que la máquina hace en las direcciones básicas",
    "watchOutFor": "olvidar que las columnas de la matriz provienen de vectores base transformados",
    "rememberThis": "las columnas son T de los vectores base",
    "typicalProblemShapes": [
      "Convertir una fórmula para T en una matriz",
      "Encuentra la matriz estándar de una transformación."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál se convierte en la primera columna de la matriz?",
        "answer": "T del primer vector base."
      },
      {
        "prompt": "¿Las filas o columnas almacenan los vectores base transformados?",
        "answer": "Columnas."
      }
    ],
    "memoryHook": "Transforma la base, luego apila las columnas.",
    "quickExample": {
      "problem": "¿Cómo se construye rápidamente la matriz para T?",
      "move": "Encuentre T en los vectores base y apile las salidas como columnas."
    }
  },
  "la-kernel-range": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Núcleo y rango",
    "name": "Núcleo vs rango",
    "useItWhen": "es necesario separar qué asignaciones a cero de qué salidas son alcanzables",
    "looksLike": "ker(T), rango(T), espacio nulo, imagen",
    "doThis": "Trate el núcleo como entradas perdidas y el rango como posibles salidas.",
    "thinkOfItAs": "Lo que desaparece versus lo que se puede producir.",
    "watchOutFor": "mezclando dónde vive el núcleo y dónde vive el rango",
    "rememberThis": "El kernel vive en el espacio de entrada, el rango vive en el espacio de salida.",
    "typicalProblemShapes": [
      "Encuentre ker(T) o rango(T)",
      "Uno a uno y en cheques"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué salida define el kernel?",
        "answer": "Cero."
      },
      {
        "prompt": "¿Qué recoge la gama?",
        "answer": "Todas las salidas que T puede realizar."
      }
    ],
    "memoryHook": "Kernel = entradas perdidas. Rango = salidas alcanzables.",
    "quickExample": {
      "problem": "¿Dónde vive el núcleo de T?",
      "move": "En el dominio."
    }
  },
  "la-one-to-one-onto": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Uno a uno versus uno para mapas lineales",
    "name": "Uno a uno frente a uno",
    "useItWhen": "un mapa lineal se prueba para determinar el comportamiento inyectivo o sobreyectivo",
    "looksLike": "uno a uno, sobre, núcleo trivial, rango completo",
    "doThis": "use kernel para uno a uno y rango para on",
    "thinkOfItAs": "inyectivo significa que no hay colisiones, hacia significa que no se pierden objetivos",
    "watchOutFor": "comprobando el espacio equivocado para la propiedad equivocada",
    "rememberThis": "conversaciones uno a uno con el núcleo, en conversaciones con el rango",
    "typicalProblemShapes": [
      "Decidir inyectivo o sobreyectivo",
      "Comprobaciones de equivalencia de matrices cuadradas"
    ],
    "miniDrill": [
      {
        "prompt": "Si ker(T) tiene más que cero, ¿es T uno a uno?",
        "answer": "No."
      },
      {
        "prompt": "Si el rango (T) omite salidas, ¿está T activado?",
        "answer": "No."
      }
    ],
    "memoryHook": "Núcleo para inyectiva, rango para sobre.",
    "quickExample": {
      "problem": "¿Cuál es la prueba rápida uno a uno para un mapa lineal?",
      "move": "Compruebe si el kernel es solo cero."
    }
  },
  "la-eigenspace": {
    "course": "Álgebra Lineal",
    "chapter": "Capítulo 6: Eigenvalores y Transformaciones Lineales",
    "unit": "Transformaciones y Eigen",
    "topic": "Espacios propios",
    "name": "Espacio propio",
    "useItWhen": "Se conoce un valor propio y se necesitan sus vectores coincidentes.",
    "looksLike": "(A - lambda I)x = 0",
    "doThis": "Inserte el valor propio y resuelva el sistema homogéneo.",
    "thinkOfItAs": "todos los vectores se extienden en la misma dirección especial",
    "watchOutFor": "olvidar el vector cero no es un vector propio aunque resuelva el sistema",
    "rememberThis": "El espacio propio proviene del espacio nulo de A menos lambda I.",
    "typicalProblemShapes": [
      "Encontrar una base para un espacio propio",
      "Utilice vectores propios después de conocer los valores propios"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué matriz se construye para el trabajo en el espacio propio?",
        "answer": "A - lambda I."
      },
      {
        "prompt": "¿Es el vector cero un vector propio?",
        "answer": "No."
      }
    ],
    "memoryHook": "Primero el valor propio, luego el espacio nulo.",
    "quickExample": {
      "problem": "¿Cómo se encuentran los vectores propios después de encontrar lambda?",
      "move": "Resuelva (A - lambda I)x = 0."
    }
  },
  "proof-what-counts": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 1: Un Cambio de Paradigma",
    "unit": "Bases de Pruebas",
    "topic": "¿Qué cuenta como prueba?",
    "name": "Lo que cuenta como prueba",
    "useItWhen": "necesitas justificar una declaración, no solo ejemplos de prueba",
    "looksLike": "demostrar que..., demostrar que..., justificar por qué...",
    "doThis": "Partir de hechos conocidos y construir una cadena que fuerce la conclusión.",
    "thinkOfItAs": "cerrar todas las lagunas, no solo dar una vibra",
    "watchOutFor": "usando un ejemplo como si probara toda la declaración",
    "rememberThis": "los ejemplos sugieren, las pruebas terminan",
    "typicalProblemShapes": [
      "Una afirmación universal sobre todos los números enteros o todos los números reales.",
      "Un reclamo donde los ejemplos parecen convincentes pero no lo resuelven"
    ],
    "miniDrill": [
      {
        "prompt": "¿Un ejemplo correcto prueba una afirmación universal?",
        "answer": "No. Solo muestra que el reclamo puede ocurrir una vez."
      },
      {
        "prompt": "¿Qué debería hacer una prueba con la conclusión?",
        "answer": "Hágalo inevitable a partir de hechos aceptados."
      }
    ],
    "memoryHook": "Los ejemplos apuntan. Las pruebas lo bloquean.",
    "quickExample": {
      "problem": "¿Por qué no es suficiente comprobar n = 1, 2, 3?",
      "move": "Porque el reclamo se refiere a todos los casos, no a unos pocos casos."
    }
  },
  "proof-definitions": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 1: Un Cambio de Paradigma",
    "unit": "Bases de Pruebas",
    "topic": "Definiciones, teoremas y conjeturas.",
    "name": "Definiciones vs teoremas",
    "useItWhen": "necesita saber si desglosar una definición o probar un reclamo",
    "looksLike": "número par, inyectivo, teorema, conjetura",
    "doThis": "si es una definición, descomprímala; si es un teorema, pruébalo o úsalo",
    "thinkOfItAs": "Las definiciones son reglas del juego, los teoremas son victorias dentro del juego.",
    "watchOutFor": "Tratar de probar una definición en lugar de usarla.",
    "rememberThis": "las definiciones se descomponen, los teoremas se justifican",
    "typicalProblemShapes": [
      "Una prueba comienza con una palabra como par, prima, inyectiva o subconjunto.",
      "Un problema pregunta si una afirmación está probada o sigue siendo una conjetura."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el comienzo más rápido cuando una prueba utiliza una palabra técnica?",
        "answer": "Escribe la definición exacta."
      },
      {
        "prompt": "¿Está ya probada una conjetura?",
        "answer": "No. Es una afirmación que se cree o se sospecha pero aún no se ha establecido."
      }
    ],
    "memoryHook": "¿Palabra técnica? Abra la definición.",
    "quickExample": {
      "problem": "Para demostrar que un número es par, ¿qué buscas primero?",
      "move": "La definición: escríbalo como 2k."
    }
  },
  "proof-direct": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "prueba directa",
    "name": "Prueba directa",
    "useItWhen": "Puedes partir de la hipótesis y seguir adelante.",
    "looksLike": "si P entonces Q y el camino de P a Q es sencillo",
    "doThis": "asumir la hipótesis, usar álgebra o definiciones y llegar a la conclusión",
    "thinkOfItAs": "caminando recto de principio a fin",
    "watchOutFor": "Partiendo de la conclusión y pretendiendo que eso lo prueba.",
    "rememberThis": "asumir P, llegar a Q",
    "typicalProblemShapes": [
      "Enunciados si-entonces con estructura algebraica",
      "Afirmaciones donde las definiciones y la sustitución hacen avanzar la prueba"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué supones primero en una prueba directa de si P entonces Q?",
        "answer": "Supongamos que p."
      },
      {
        "prompt": "¿Una prueba directa suele descomprimir las definiciones temprano?",
        "answer": "Sí. A menudo, ese es todo el movimiento."
      }
    ],
    "memoryHook": "Comience en P y camine hasta Q.",
    "quickExample": {
      "problem": "Si n es par, demuestre que n al cuadrado es par.",
      "move": "Escribe n = 2k y simplifica."
    }
  },
  "proof-contrapositive": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Prueba por contrapositiva",
    "name": "Contraposición",
    "useItWhen": "la conclusión es más fácil de negar que probar directamente",
    "looksLike": "si P entonces Q, pero no Q entonces no P se ve más limpio",
    "doThis": "voltear y negar la afirmación, luego probar esa versión",
    "thinkOfItAs": "tomando el camino de atrás porque el camino de entrada está bloqueado",
    "watchOutFor": "demostrando lo contrario en lugar de lo contrapositivo",
    "rememberThis": "voltear y negar ambas partes",
    "typicalProblemShapes": [
      "Una prueba directa se vuelve complicada pero la conclusión negada es simple",
      "Reclamaciones pares/impares o divisibilidad"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el contrapositivo de si P entonces Q?",
        "answer": "Si no es Q, entonces no es P."
      },
      {
        "prompt": "¿Tiene el contrapositivo el mismo valor de verdad que el original?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Dale la vuelta, niégalo, pruébalo.",
    "quickExample": {
      "problem": "Si n al cuadrado es par, demuestre que n es par.",
      "move": "Utilice el contrapositivo: si n es impar, entonces n al cuadrado es impar."
    }
  },
  "proof-contradiction": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Prueba por contradicción",
    "name": "Contradicción",
    "useItWhen": "asumir lo contrario crea un resultado imposible",
    "looksLike": "asume que no..., luego llega a un choque",
    "doThis": "asumir que el reclamo es falso y presionar hasta que algo se rompa",
    "thinkOfItAs": "siguiendo un mal camino hasta estrellarse",
    "watchOutFor": "terminando con algo sorprendente pero no imposible",
    "rememberThis": "asumir lo contrario, forzar una contradicción",
    "typicalProblemShapes": [
      "Pruebas de existencia o irracionalidad.",
      "Declaraciones en las que es fácil escribir el supuesto opuesto"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué supones primero en una prueba de contradicción?",
        "answer": "Suponga que la afirmación que desea es falsa."
      },
      {
        "prompt": "¿Qué se considera una contradicción?",
        "answer": "Una verdadera imposibilidad como 0 = 1 o tanto P como no P."
      }
    ],
    "memoryHook": "Supongamos lo contrario. Rompe la lógica.",
    "quickExample": {
      "problem": "¿Cómo comienzan muchas pruebas de irracionalidad?",
      "move": "Suponga que el número es racional y luego derive una imposibilidad."
    }
  },
  "proof-quantifiers": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Cuantificadores",
    "name": "Cuantificadores",
    "useItWhen": "una declaración dice para todos o existe",
    "looksLike": "para cada x..., existe y...",
    "doThis": "rastrear quién elige qué y en qué orden",
    "thinkOfItAs": "un guión donde el orden cambia todo el significado",
    "watchOutFor": "intercambiando por todos y existen como si significaran lo mismo",
    "rememberThis": "el orden del cuantificador importa",
    "typicalProblemShapes": [
      "Declaraciones con todos, algunos, todos o existen",
      "Negaciones de enunciados lógicos."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cambiar el orden de los cuantificadores cambia el significado?",
        "answer": "Sí. Mucho."
      },
      {
        "prompt": "¿Qué es lo principal a rastrear en una declaración cuantificada?",
        "answer": "Quién es elegido primero y por quién."
      }
    ],
    "memoryHook": "Todo lo que existe no es intercambiable.",
    "quickExample": {
      "problem": "¿Por qué difieren 'para cada x existe y' y 'existe y para cada x'?",
      "move": "Debido a que el elector cambia, la afirmación también cambia."
    }
  },
  "proof-negating-quantifiers": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Negar declaraciones cuantificadas",
    "name": "Negar cuantificadores",
    "useItWhen": "necesitas lo contrario de una declaración con todo o existe",
    "looksLike": "no para todos..., no existe...",
    "doThis": "intercambiar por todo lo que existe y negar el reclamo interno",
    "thinkOfItAs": "voltear el cuantificador, voltear la declaración",
    "watchOutFor": "negando sólo el interior y olvidándose de cambiar el cuantificador",
    "rememberThis": "no todo se vuelve existe no",
    "typicalProblemShapes": [
      "Declaraciones donde la prueba necesita primero una negación clara",
      "Establecer o funcionar reclamos usando cada y existe"
    ],
    "miniDrill": [
      {
        "prompt": "¿En qué se convierte el no-para-todos?",
        "answer": "Existe al menos un contraejemplo."
      },
      {
        "prompt": "¿En qué se convierte el no-existencia?",
        "answer": "Para todos, no."
      }
    ],
    "memoryHook": "Cambie el cuantificador y niegue el núcleo.",
    "quickExample": {
      "problem": "Negar 'para cada x, P(x)'.",
      "move": "Existe una x tal que no P(x)."
    }
  },
  "proof-sets-subsets": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Pruebas de conjuntos y subconjuntos",
    "name": "Pruebas de subconjunto",
    "useItWhen": "necesitas mostrar que un conjunto se encuentra dentro de otro",
    "looksLike": "demostrar que A es un subconjunto de B",
    "doThis": "Elija un elemento genérico de A y demuestre que también debe estar en B.",
    "thinkOfItAs": "sigue a un miembro aleatorio a través de la valla",
    "watchOutFor": "tratando de comparar conjuntos completos sin usar elementos",
    "rememberThis": "para demostrar subconjunto, perseguir un elemento",
    "typicalProblemShapes": [
      "Identidades de unión, intersección y complemento.",
      "Establecer pruebas de igualdad construidas a partir de dos pruebas de subconjunto"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cómo se demuestra que A es igual a B?",
        "answer": "Muestre un subconjunto de B y un subconjunto B de A."
      },
      {
        "prompt": "¿Cuál es el primer paso estándar para una prueba de subconjunto?",
        "answer": "Elija un elemento arbitrario en el conjunto izquierdo."
      }
    ],
    "memoryHook": "¿Establecer prueba? Coge un elemento.",
    "quickExample": {
      "problem": "¿Cómo se inicia un subconjunto de B?",
      "move": "Tome x en A."
    }
  },
  "proof-functions": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Funciones inyectivas y sobreyectivas",
    "name": "Inyectiva vs Sobreyectiva",
    "useItWhen": "una prueba pregunta si una función es inyectiva, sobreyectiva o biyectiva",
    "looksLike": "mostrar f es inyectiva, sobreyectiva o biyectiva",
    "doThis": "para inyectiva, empieza con salidas iguales; para sobreyectiva, empieza con una salida objetivo",
    "thinkOfItAs": "inyectivo significa que no hay colisión, sobreyectivo significa que no hay fallos",
    "watchOutFor": "usar el punto de partida incorrecto para la propiedad incorrecta",
    "rememberThis": "inyectiva empieza con salidas iguales; sobreyectiva empieza con el objetivo",
    "typicalProblemShapes": [
      "Funciones entre conjuntos o sistemas numéricos",
      "Pruebas que solicitan biyección o lógica de función inversa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el primer paso en una prueba sobreyectiva?",
        "answer": "Tome un objetivo arbitrario y en el codominio."
      },
      {
        "prompt": "¿Qué significa biyectiva?",
        "answer": "Inyectivo y sobreyectivo."
      }
    ],
    "memoryHook": "Sin colisiones, sin fallos.",
    "quickExample": {
      "problem": "¿Cómo se inicia una prueba inyectiva?",
      "move": "Supongamos f(a) = f(b)."
    }
  },
  "proof-divisibility": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 4: Divisibilidad y el Algoritmo de Euclides",
    "unit": "Bases de Teoría de Números",
    "topic": "Divisibilidad y congruencia",
    "name": "Divisibilidad y congruencia",
    "useItWhen": "Aparecen números enteros, restos o lenguaje mod.",
    "looksLike": "a divide a b, a congruente con b mod n",
    "doThis": "reescribir la divisibilidad como múltiplos y la congruencia como la misma clase de resto",
    "thinkOfItAs": "mod significa que los números caen en el mismo cubo",
    "watchOutFor": "Tratar la congruencia como igualdad ordinaria en todos los contextos.",
    "rememberThis": "divide significa múltiple; mod significa el mismo resto",
    "typicalProblemShapes": [
      "Argumentos pares/impares o restantes",
      "Pruebas que reducen expresiones módulo n"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué significa a divide a b?",
        "answer": "b = ak para algún número entero k."
      },
      {
        "prompt": "¿Qué dice el mod que comparten dos números?",
        "answer": "La misma clase restante."
      }
    ],
    "memoryHook": "Mod = mismo depósito después de la división.",
    "quickExample": {
      "problem": "¿Qué significa a congruente con b mod n?",
      "move": "n divide a menos b."
    }
  },
  "proof-euclidean-algorithm": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 4: Divisibilidad y el Algoritmo de Euclides",
    "unit": "Bases de Teoría de Números",
    "topic": "Máximos divisores comunes y el algoritmo euclidiano",
    "name": "Algoritmo euclidiano",
    "useItWhen": "necesitas un gcd rápidamente",
    "looksLike": "mcd(a, b) con división repetida",
    "doThis": "siga reemplazando el par por divisor y resto hasta que el resto sea 0",
    "thinkOfItAs": "Reducir el problema sin cambiar el mcd.",
    "watchOutFor": "detenerse demasiado pronto antes de que el resto llegue a 0",
    "rememberThis": "El último resto distinto de cero es el mcd.",
    "typicalProblemShapes": [
      "Cálculos de mcd grandes",
      "Pruebas de teoría de números utilizando división repetida"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué reemplaza al par (a, b) en el siguiente paso?",
        "answer": "El antiguo divisor y el antiguo resto."
      },
      {
        "prompt": "¿Cuándo paras?",
        "answer": "Cuando el resto se convierte en 0."
      }
    ],
    "memoryHook": "Mantenga el resto de la cadena en funcionamiento.",
    "quickExample": {
      "problem": "¿Cuál es el mcd al final del algoritmo euclidiano?",
      "move": "El último resto distinto de cero."
    }
  },
  "proof-induction": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 5: Inducción Matemática y Buen Orden",
    "unit": "Inducción",
    "topic": "Prueba por inducción",
    "name": "Prueba por inducción",
    "useItWhen": "una declaración depende de un número entero positivo n",
    "looksLike": "probar para todo n, fórmulas recursivas, sumas, desigualdades",
    "doThis": "haga el caso base, suponga k caso, luego pruebe k más 1 caso",
    "thinkOfItAs": "Colocar fichas de dominó y luego inclinar una.",
    "watchOutFor": "Usar lo que estás tratando de probar sin decirlo es la hipótesis inductiva.",
    "rememberThis": "base, asumir, empujar hacia adelante",
    "typicalProblemShapes": [
      "Fórmulas de suma y divisibilidad por n",
      "Declaraciones con n más 1 construidas a partir de n"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el propósito del caso base?",
        "answer": "Inicia la cadena."
      },
      {
        "prompt": "¿Qué sucede en el paso inductivo?",
        "answer": "Utilice el caso k para demostrar el caso k más 1."
      }
    ],
    "memoryHook": "Base, supongamos, siguiente caso.",
    "quickExample": {
      "problem": "¿Cuáles son las tres piezas centrales de la inducción?",
      "move": "Caso base, hipótesis inductiva, paso inductivo."
    }
  },
  "proof-strong-induction": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 5: Inducción Matemática y Buen Orden",
    "unit": "Inducción",
    "topic": "Fuerte inducción",
    "name": "Fuerte inducción",
    "useItWhen": "el siguiente paso necesita algo más que el caso anterior",
    "looksLike": "asumir todos los casos hasta k, probar el caso k más 1",
    "doThis": "asumir todo el bloque antes de k más 1, no solo el caso k único",
    "thinkOfItAs": "usando toda la escalera debajo de ti, ni un solo peldaño",
    "watchOutFor": "usando muchos casos anteriores mientras pretendes que solo asumiste uno",
    "rememberThis": "La inducción fuerte asume todos los casos anteriores.",
    "typicalProblemShapes": [
      "Definiciones recursivas con múltiples términos anteriores.",
      "Argumentos de descomposición o factorización prima"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la gran diferencia en la inducción fuerte?",
        "answer": "Se asumen todos los casos anteriores hasta k."
      },
      {
        "prompt": "¿La inducción fuerte y la ordinaria prueban el mismo tipo de resultado universal?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "¿Necesitas más historia? Utilice una inducción fuerte.",
    "quickExample": {
      "problem": "¿Cuándo es mejor la inducción fuerte que la inducción ordinaria?",
      "move": "Cuando el próximo caso depende de varios casos anteriores."
    }
  },
  "proof-equivalence-relations": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Relaciones de equivalencia",
    "name": "Relaciones de equivalencia",
    "useItWhen": "una relación ~ se supone que dice que dos objetos cuentan como iguales",
    "looksLike": "reflexiva: x~x, simétrica: x~y => y~x, transitiva: x~y y y~z => x~z",
    "doThis": "escribe las tres mini-pruebas: demuestra x~x, asume x~y y demuestra y~x, luego asume x~y y y~z y demuestra x~z",
    "thinkOfItAs": "una regla legal del mismo equipo",
    "watchOutFor": "hacer solo una o dos verificaciones, o no empezar con x, y, z arbitrarios",
    "rememberThis": "misma relación = reflexiva, simétrica, transitiva",
    "typicalProblemShapes": [
      "Relaciones entre números, conjuntos o funciones.",
      "Pruebas de que una relación crea clases o particiones"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cómo suele verse la parte reflexiva?",
        "answer": "Toma un x arbitrario y demuestra x~x."
      },
      {
        "prompt": "¿Cómo suele verse la parte transitiva?",
        "answer": "Asume x~y y y~z, luego demuestra x~z."
      }
    ],
    "memoryHook": "x~x, voltea, encadena.",
    "quickExample": {
      "problem": "¿Qué patrón de prueba escribes para una relación de equivalencia?",
      "move": "Demuestra x~x, luego x~y => y~x, luego x~y y y~z => x~z."
    }
  },
  "proof-countable-uncountable": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 8: Cardinalidades de Conjuntos Infinitos",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Conjuntos contables e incontables.",
    "name": "Contable vs Incontable",
    "useItWhen": "un problema compara tamaños de conjuntos infinitos",
    "looksLike": "contable, incontable, biyección a naturales, argumento diagonal",
    "doThis": "busque una lista si es contable o un escape de estilo diagonal si es incontable",
    "thinkOfItAs": "¿Puedes ponerlos en una lista numerada o no?",
    "watchOutFor": "pensar infinito automáticamente significa incontable",
    "rememberThis": "contable significa listable",
    "typicalProblemShapes": [
      "Comparaciones de números enteros, racionales y reales",
      "Argumentos que utilizan biyecciones o la idea diagonal de Cantor"
    ],
    "miniDrill": [
      {
        "prompt": "¿Son contables los números enteros?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Cuál es el movimiento clásico para demostrar que los reales son incontables?",
        "answer": "Diagonalización."
      }
    ],
    "memoryHook": "Infinite no es una solución única para todos.",
    "quickExample": {
      "problem": "¿Cuál es la cuestión central de la rendición de cuentas?",
      "move": "¿Se puede enumerar el conjunto en secuencia como 1, 2, 3,...?"
    }
  },
  "proof-counterexample": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 1: Un Cambio de Paradigma",
    "unit": "Bases de Pruebas",
    "topic": "Contraejemplos",
    "name": "Contraejemplo",
    "useItWhen": "una afirmación universal podría ser falsa",
    "looksLike": "para todos..., cada..., siempre..., sin excepciones",
    "doThis": "encontrar un caso que rompa el reclamo",
    "thinkOfItAs": "una grieta que rompe toda la pared",
    "watchOutFor": "dando un ejemplo que en realidad no se ajusta a la afirmación",
    "rememberThis": "una excepción real mata una declaración universal",
    "typicalProblemShapes": [
      "Una declaración audaz sobre todos los números o todos los conjuntos.",
      "Pregunta si una afirmación es verdadera o falsa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántos contraejemplos se necesitan para acabar con una afirmación universal?",
        "answer": "Sólo uno válido."
      },
      {
        "prompt": "¿Puede un contraejemplo ignorar las condiciones del enunciado?",
        "answer": "No. Tiene que ajustarse exactamente a la configuración."
      }
    ],
    "memoryHook": "Una excepción es suficiente.",
    "quickExample": {
      "problem": "¿Cómo se refuta que \"todos los números primos son impares\"?",
      "move": "El espectáculo 2 es primo e incluso."
    }
  },
  "proof-converse-inverse": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Inverso e inverso",
    "name": "Inversa vs Inversa",
    "useItWhen": "una declaración si-entonces se invierte o se niega",
    "looksLike": "si P entonces Q, si Q entonces P, si no P entonces no Q",
    "doThis": "etiquetar cada versión antes de probar algo",
    "thinkOfItAs": "Mismas palabras, diferente cableado.",
    "watchOutFor": "mezclar conversar con contrapositivo",
    "rememberThis": "el inverso se voltea, el inverso niega, el contrapositivo hace ambas cosas",
    "typicalProblemShapes": [
      "Calentamiento de lógica con declaraciones de implicaciones.",
      "Problemas al preguntar qué formulario coincide con la declaración original"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué versión es lógicamente equivalente a si P entonces Q: inverso o contrapositivo?",
        "answer": "Contrapositivo."
      },
      {
        "prompt": "¿Cuál es el inverso de si P entonces Q?",
        "answer": "Si no es P, entonces no es Q."
      }
    ],
    "memoryHook": "Nombra la versión antes de probarla.",
    "quickExample": {
      "problem": "¿Cuál es el recíproco de si P entonces Q?",
      "move": "Si Q entonces P."
    }
  },
  "proof-biconditional": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Pruebas bicondicionales",
    "name": "si y solo si",
    "useItWhen": "una declaración dice si y sólo si",
    "looksLike": "P iff Q, necesario y suficiente",
    "doThis": "probar ambas direcciones por separado",
    "thinkOfItAs": "dos puertas, ambas deben abrirse",
    "watchOutFor": "probando solo una dirección y deteniéndose",
    "rememberThis": "siff significa dos pruebas",
    "typicalProblemShapes": [
      "Preguntas sobre condiciones necesarias y suficientes",
      "Declaraciones escritas como afirmaciones if o de equivalencia"
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede una dirección probar una declaración dudosa?",
        "answer": "No. Necesitas ambos."
      },
      {
        "prompt": "¿Cómo se llaman las dos direcciones?",
        "answer": "Hacia delante y hacia atrás, o cada implicación por separado."
      }
    ],
    "memoryHook": "Sif = en ambos sentidos.",
    "quickExample": {
      "problem": "¿Cómo se prueba P si Q?",
      "move": "Muestre que P implica Q y Q implica P."
    }
  },
  "proof-set-operations": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Identidades de unión, intersección y complemento.",
    "name": "Pruebas de operaciones con conjuntos",
    "useItWhen": "un problema afirma que dos expresiones con conjuntos son iguales",
    "looksLike": "unión, intersección, complemento, diferencia de conjunto",
    "doThis": "perseguir un elemento a través de las definiciones en ambos lados",
    "thinkOfItAs": "tablas de verdad de membresía sin la tabla",
    "watchOutFor": "mover símbolos sin verificar el significado de membresía",
    "rememberThis": "las identidades establecidas son persecuciones de elementos",
    "typicalProblemShapes": [
      "Identidades distributivas, De Morgan o de subconjuntos",
      "Establecer igualdades con complementos e intersecciones."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el primer paso estándar en una prueba de identidad establecida?",
        "answer": "Elija un elemento arbitrario."
      },
      {
        "prompt": "¿Demuestras la igualdad de conjuntos en una o dos direcciones?",
        "answer": "Generalmente dos direcciones de subconjunto."
      }
    ],
    "memoryHook": "Sigue un elemento, no los símbolos.",
    "quickExample": {
      "problem": "¿Cómo se prueba que A∩(B∪C) es igual a la otra expresión?",
      "move": "Toma x en un lado y desarma lo que eso significa."
    }
  },
  "proof-composition-inverse": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Composición de funciones y funciones inversas.",
    "name": "Composición e inversa",
    "useItWhen": "Las funciones están apiladas o es necesario deshacer una.",
    "looksLike": "f compuesta con g, f inversa, uno a uno y sobre",
    "doThis": "Rastree la entrada cuidadosamente y verifique el pedido.",
    "thinkOfItAs": "máquinas en cadena y la máquina de deshacer",
    "watchOutFor": "invertir el orden de composición por accidente",
    "rememberThis": "el orden de composición importa",
    "typicalProblemShapes": [
      "Calcular f(g(x)) o g(f(x))",
      "Mostrar que una función tiene una inversa o usar una"
    ],
    "miniDrill": [
      {
        "prompt": "En f compuesta con g, ¿qué función actúa primero?",
        "answer": "g actúa primero."
      },
      {
        "prompt": "¿Qué propiedad necesita una función para que exista bien una inversa?",
        "answer": "Tiene que ser biyectivo."
      }
    ],
    "memoryHook": "La función interna va primero.",
    "quickExample": {
      "problem": "¿Qué está compuesto por f con g de x?",
      "move": "Primero haz g, luego f."
    }
  },
  "proof-division-algorithm": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 4: Divisibilidad y el Algoritmo de Euclides",
    "unit": "Bases de Teoría de Números",
    "topic": "Algoritmo de división",
    "name": "Algoritmo de división",
    "useItWhen": "Los números enteros se dividen en cociente y resto.",
    "looksLike": "a = bq + r con 0 ≤ r < b",
    "doThis": "escribe el número como cociente más resto",
    "thinkOfItAs": "separar el número en parte divisible y resto",
    "watchOutFor": "olvidando los límites restantes",
    "rememberThis": "cociente más resto, con resto pequeño",
    "typicalProblemShapes": [
      "Pruebas con paridad o casos módulo n",
      "MCD y argumentos restantes"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué debe ser cierto acerca de r en a = bq + r?",
        "answer": "Tiene que cumplir 0 ≤ r < b."
      },
      {
        "prompt": "¿Qué te ayuda a aislar el algoritmo de división?",
        "answer": "El resto de la clase."
      }
    ],
    "memoryHook": "Todo número entero es cociente más resto pequeño.",
    "quickExample": {
      "problem": "¿Cuál es la forma del algoritmo de división?",
      "move": "a = bq + r con el resto acotado."
    }
  },
  "proof-bezout": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 4: Divisibilidad y el Algoritmo de Euclides",
    "unit": "Bases de Teoría de Números",
    "topic": "Identidad Bezout",
    "name": "Identidad Bezout",
    "useItWhen": "mcd y combinaciones lineales aparecen juntas",
    "looksLike": "mcd(a, b) = ax + por",
    "doThis": "ejecute el algoritmo euclidiano hacia atrás para construir la combinación",
    "thinkOfItAs": "desenrollando el resto de la cadena",
    "watchOutFor": "encontrar el mcd pero nunca escribirlo como ax plus por",
    "rememberThis": "el mcd se puede construir a partir de a y b",
    "typicalProblemShapes": [
      "Mostrar mcd(a, b) es una combinación lineal",
      "Resolver problemas de teoría de números usando la estructura mcd"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué identidad vincula a mcd con una combinación lineal?",
        "answer": "La identidad de Bezout."
      },
      {
        "prompt": "¿En qué dirección trabajas después de encontrar el mcd?",
        "answer": "Retroceda por los escalones."
      }
    ],
    "memoryHook": "Encuentra gcd, luego relájate.",
    "quickExample": {
      "problem": "¿Cómo se obtiene ax + by del algoritmo euclidiano?",
      "move": "Vuelva a sustituir a través de los pasos restantes."
    }
  },
  "proof-well-ordering": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 5: Inducción Matemática y Buen Orden",
    "unit": "Inducción",
    "topic": "Principio de buen orden",
    "name": "Buen orden",
    "useItWhen": "una prueba quiere el más mínimo mal ejemplo",
    "looksLike": "asumir un conjunto no vacío de contraejemplos y elegir el menos",
    "doThis": "tomar el contraejemplo más pequeño y forzar una contradicción",
    "thinkOfItAs": "cazar el primer fracaso",
    "watchOutFor": "Usar un buen orden sin definir claramente el conjunto incorrecto.",
    "rememberThis": "elige el caso malo más pequeño",
    "typicalProblemShapes": [
      "Argumentos mínimos de contraejemplo",
      "Pruebas ligadas a la inducción o números enteros positivos."
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál debe ser el conjunto de casos incorrectos antes de utilizar el orden correcto?",
        "answer": "No vacío y formado por números enteros positivos o naturales."
      },
      {
        "prompt": "¿Por qué elegir el caso malo más pequeño?",
        "answer": "Porque los casos más pequeños se pueden utilizar contra él."
      }
    ],
    "memoryHook": "El caso grave más pequeño primero.",
    "quickExample": {
      "problem": "¿Cuál es el movimiento clave en una prueba bien ordenada?",
      "move": "Suponga que existen casos malos y elija el más pequeño."
    }
  },
  "proof-equivalence-classes": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Clases de equivalencia",
    "name": "Clases de equivalencia",
    "useItWhen": "una relación de equivalencia agrupa objetos en bloques del mismo tipo",
    "looksLike": "[a], clases de congruencia, mismos grupos de relaciones",
    "doThis": "arreglar un elemento y recolectar todo lo equivalente a él",
    "thinkOfItAs": "un bloque de cosas que cuentan como lo mismo",
    "watchOutFor": "Tratar una clase como un solo elemento en lugar de un conjunto completo.",
    "rememberThis": "una clase es el bloque alrededor de un elemento",
    "typicalProblemShapes": [
      "Congruencia mod n clases",
      "Relaciones que dividen un conjunto en bloques"
    ],
    "miniDrill": [
      {
        "prompt": "¿Pueden dos clases de equivalencia superponerse parcialmente?",
        "answer": "No. Son iguales o disjuntos."
      },
      {
        "prompt": "¿Qué construye una clase de equivalencia?",
        "answer": "Un elemento elegido y la relación."
      }
    ],
    "memoryHook": "Elige un elemento y toma su bloque.",
    "quickExample": {
      "problem": "¿Qué es [a] bajo una relación de equivalencia?",
      "move": "El conjunto de todo lo equivalente a a."
    }
  },
  "proof-partitions": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Particiones",
    "name": "Particiones",
    "useItWhen": "un conjunto se divide en partes que no se superponen",
    "looksLike": "bloques, clases, piezas que cubren todo el conjunto",
    "doThis": "marque cobertura total, no vacío y sin superposición entre diferentes bloques",
    "thinkOfItAs": "Cortar el conjunto en trozos limpios.",
    "watchOutFor": "permitir que los bloques se superpongan o dejen espacios",
    "rememberThis": "Las particiones cubren todo sin superposición.",
    "typicalProblemShapes": [
      "Preguntas que vinculan particiones y relaciones de equivalencia",
      "Familias de subconjuntos propuestos como partición."
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede un bloque de partición estar vacío?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué pasa si dos bloques se superponen?",
        "answer": "Entonces no es una partición a menos que realmente sean el mismo bloque."
      }
    ],
    "memoryHook": "Cubrir todo, no superponer nada.",
    "quickExample": {
      "problem": "¿Cuáles son las dos grandes reglas de partición?",
      "move": "Cubre todo el conjunto y mantén los diferentes bloques separados."
    }
  },
  "proof-bijections-countability": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 8: Cardinalidades de Conjuntos Infinitos",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Biyecciones y contabilidad",
    "name": "Biyecciones para la contabilización",
    "useItWhen": "quieres demostrar que dos conjuntos infinitos tienen el mismo tamaño",
    "looksLike": "encontrar una biyección, enumerar el conjunto, emparejar el conjunto con naturales",
    "doThis": "construir una coincidencia uno a uno o una lista explícita",
    "thinkOfItAs": "El mismo tamaño significa el mismo poder de emparejamiento.",
    "watchOutFor": "mostrando solo inyectivo o solo sobreyectivo cuando necesitas una coincidencia completa",
    "rememberThis": "contable significa comparable con naturales",
    "typicalProblemShapes": [
      "Comparaciones de números enteros, pares, racionales u otras comparaciones de contabilización",
      "Preguntas que solicitan una lista explícita"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tipo de función demuestra que dos conjuntos tienen la misma cardinalidad?",
        "answer": "Una biyección."
      },
      {
        "prompt": "¿Qué conjunto es el objetivo habitual de la contabilidad?",
        "answer": "Los números naturales."
      }
    ],
    "memoryHook": "Contable significa emparejarlo con 1, 2, 3,...",
    "quickExample": {
      "problem": "¿Cómo se demuestra que un conjunto es contable?",
      "move": "Listarlo o construir una biyección con los números naturales."
    }
  },
  "proof-diagonal-argument": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 8: Cardinalidades de Conjuntos Infinitos",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Argumento diagonal de Cantor",
    "name": "Argumento diagonal",
    "useItWhen": "Se afirma que un conjunto es enumerable pero probablemente no lo sea.",
    "looksLike": "supongamos que todos los reales están listados, luego construya uno nuevo fuera de la diagonal",
    "doThis": "cambiar las entradas diagonales para hacer un objeto faltante",
    "thinkOfItAs": "escapar de cada lista cambiando un lugar en cada fila",
    "watchOutFor": "construir un nuevo objeto que coincida accidentalmente con una entrada listada",
    "rememberThis": "El cambio diagonal crea un elemento de escape.",
    "typicalProblemShapes": [
      "Reclamaciones de reales, cadenas binarias o todos los subconjuntos",
      "Pruebas de que no puede existir una lista completa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Por qué el objeto diagonal evita toda la lista?",
        "answer": "Porque se diferencia de todos los elementos enumerados en al menos un punto obligado."
      },
      {
        "prompt": "¿Cuál es la principal contradicción en la diagonalización?",
        "answer": "La supuesta lista completa omitió el nuevo objeto."
      }
    ],
    "memoryHook": "Cambia la diagonal, escapa de la lista.",
    "quickExample": {
      "problem": "¿Cuál es el movimiento diagonal para mostrar que los reales son incontables?",
      "move": "Cree un nuevo decimal que difiera en el enésimo dígito del enésimo número enumerado."
    }
  },
  "proof-cases": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Prueba por casos",
    "name": "Prueba por casos",
    "useItWhen": "El problema naturalmente se divide en algunas situaciones separadas.",
    "looksLike": "par o impar, positivo o negativo, un caso u otro",
    "doThis": "cubrir cada caso y probar el reclamo en cada uno",
    "thinkOfItAs": "varias pruebas breves en lugar de una prueba enredada",
    "watchOutFor": "perder un caso o dejar que dos casos se superpongan gravemente",
    "rememberThis": "dividir limpio, terminar todos los casos",
    "typicalProblemShapes": [
      "Pruebas de paridad",
      "Valor absoluto o argumentos basados en signos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede la prueba por casos omitir una posibilidad?",
        "answer": "No. Hay que cubrir todos los casos reales."
      },
      {
        "prompt": "¿Cuándo la prueba por casos suele ser una buena medida?",
        "answer": "Cuando la configuración ya se divide en categorías naturales."
      }
    ],
    "memoryHook": "Si el problema se divide, que se divida la prueba.",
    "quickExample": {
      "problem": "¿Cómo se prueba una afirmación entera que depende de par o impar?",
      "move": "Haz un caso par y un caso impar."
    }
  },
  "proof-existence-uniqueness": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Existencia y unicidad",
    "name": "Existencia versus unicidad",
    "useItWhen": "una declaración dice que existe exactamente un objeto",
    "looksLike": "existe un único..., uno y sólo uno...",
    "doThis": "probar la existencia primero, luego probar que ningún segundo objeto también puede funcionar",
    "thinkOfItAs": "constrúyelo y luego demuestra que es el único.",
    "watchOutFor": "mostrando la existencia y olvidando la unicidad",
    "rememberThis": "único significa existencia más sólo uno",
    "typicalProblemShapes": [
      "Exactamente una solución afirma",
      "Definiciones que involucran un objeto único"
    ],
    "miniDrill": [
      {
        "prompt": "¿La unicidad por sí sola prueba que algo existe?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué paso adicional aparece en las pruebas de unicidad?",
        "answer": "Suponga que dos objetos funcionan y demuestre que son iguales."
      }
    ],
    "memoryHook": "La existencia recibe uno. La singularidad mata a los extras.",
    "quickExample": {
      "problem": "¿Cuáles son los dos trabajos en una prueba de existencia y unicidad?",
      "move": "Muestre que existe al menos uno y luego muestre que dos de esos objetos deben ser iguales."
    }
  },
  "proof-power-set-cartesian": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 6: Teoría de Conjuntos, Parte II",
    "unit": "Teoría de Conjuntos II",
    "topic": "Conjuntos de potencia y productos cartesianos.",
    "name": "Conjunto de potencias y producto cartesiano",
    "useItWhen": "el problema construye nuevos conjuntos a partir de subconjuntos o pares ordenados",
    "looksLike": "P(A), A cruz B, pares ordenados",
    "doThis": "rastrear si el objeto es un subconjunto o un par",
    "thinkOfItAs": "conjunto de potencia significa todos los grupos, cartesiano significa todos los emparejamientos",
    "watchOutFor": "mezclar elementos de A con subconjuntos de A",
    "rememberThis": "el conjunto de potencias forma subconjuntos, el producto cruzado forma pares",
    "typicalProblemShapes": [
      "Contar o comparar conjuntos de potencias",
      "Construir funciones o relaciones en productos cartesianos."
    ],
    "miniDrill": [
      {
        "prompt": "¿Un elemento del conjunto de potencias es un solo número o un subconjunto?",
        "answer": "Un subconjunto."
      },
      {
        "prompt": "¿Qué contiene A por B?",
        "answer": "Pares ordenados con la primera parte de A y la segunda parte de B."
      }
    ],
    "memoryHook": "Conjunto de potencia = subconjuntos. Producto cruzado = pares.",
    "quickExample": {
      "problem": "¿Qué vive dentro de P(A)?",
      "move": "Subconjuntos de A, no elementos ordinarios de A."
    }
  },
  "proof-images-preimages": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Imágenes y preimágenes",
    "name": "Imagen vs Preimagen",
    "useItWhen": "una función actúa sobre conjuntos, no solo sobre entradas individuales",
    "looksLike": "f(S), f inversa de T, imagen, preimagen",
    "doThis": "rastrear en qué lado de la función comienza el conjunto",
    "thinkOfItAs": "la imagen avanza, la preimagen retrocede",
    "watchOutFor": "tratar la preimagen como una función inversa cuando no existe ninguna",
    "rememberThis": "imagen hacia adelante, preimagen hacia atrás",
    "typicalProblemShapes": [
      "Establecer identidades que involucran funciones.",
      "Preguntas que comparan f (A unión B) y preimágenes de uniones"
    ],
    "miniDrill": [
      {
        "prompt": "¿La preimagen necesita que la función sea invertible?",
        "answer": "No."
      },
      {
        "prompt": "¿En qué dirección se mueve la imagen?",
        "answer": "De las entradas a las salidas."
      }
    ],
    "memoryHook": "La imagen empuja. La preimagen retrocede.",
    "quickExample": {
      "problem": "¿Cuál es la preimagen de un conjunto T?",
      "move": "Todas las entradas cuyas salidas llegan a T."
    }
  },
  "proof-relation-properties": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Propiedades básicas de la relación",
    "name": "Propiedades de relación",
    "useItWhen": "Es necesario probar una relación antes de llamarla especial.",
    "looksLike": "reflexivo, simétrico, antisimétrico, transitivo",
    "doThis": "probar cada propiedad con su definición exacta",
    "thinkOfItAs": "una lista de verificación antes de nombrar la relación",
    "watchOutFor": "confundir simétrico con antisimétrico",
    "rememberThis": "nombrar la propiedad solo después de la prueba exacta",
    "typicalProblemShapes": [
      "Relaciones sobre números o conjuntos.",
      "Calentamiento antes de relaciones de equivalencia u órdenes parciales"
    ],
    "miniDrill": [
      {
        "prompt": "¿Antisimétrico significa lo mismo que no simétrico?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuál es el movimiento más seguro al probar las propiedades de la relación?",
        "answer": "Utilice la definición exacta cada vez."
      }
    ],
    "memoryHook": "Los nombres de las relaciones vienen después de la lista de verificación.",
    "quickExample": {
      "problem": "¿Cuál es la forma más rápida de probar una relación?",
      "move": "Vaya propiedad por propiedad con las definiciones frente a usted."
    }
  },
  "proof-partial-orders": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Órdenes parciales",
    "name": "Órdenes Parciales",
    "useItWhen": "una relación se comporta como una comparación pero no todos los pares son comparables",
    "looksLike": "reflexivo, antisimétrico, transitivo",
    "doThis": "Verifique las tres propiedades del orden y luego pregunte si se pueden comparar todos los pares.",
    "thinkOfItAs": "un ordenamiento con unos lazos o pares incomparables",
    "watchOutFor": "pensar en orden parcial significa que cada par debe compararse",
    "rememberThis": "orden parcial no es orden total",
    "typicalProblemShapes": [
      "Relaciones de divisibilidad",
      "Relaciones de subconjunto en conjuntos de potencias"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tres propiedades definen un orden parcial?",
        "answer": "Reflexivo, antisimétrico, transitivo."
      },
      {
        "prompt": "¿Un pedido parcial puede dejar unos pares incomparables?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "El orden parcial permite que algunos pares no coincidan.",
    "quickExample": {
      "problem": "¿Cuál es la pregunta extra después de probar un pedido parcial?",
      "move": "Pregunte si cada par es comparable."
    }
  },
  "proof-total-orders": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Pedidos totales",
    "name": "Órdenes totales",
    "useItWhen": "un orden parcial también compara cada par",
    "looksLike": "conjuntos ordenados, comparabilidad, cada par",
    "doThis": "Comience desde un pedido parcial y luego verifique la comparabilidad completa.",
    "thinkOfItAs": "una alineación donde se pueden comparar cada dos artículos",
    "watchOutFor": "llamar a una relación total solo porque tiene propiedades de orden",
    "rememberThis": "pedido total = pedido parcial más comparabilidad",
    "typicalProblemShapes": [
      "Relaciones estándar de estilo menor que",
      "Comparar ejemplos de pedidos parciales y totales"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué propiedad extra necesita un pedido total?",
        "answer": "Comparabilidad de cada par."
      },
      {
        "prompt": "¿El subconjunto de un conjunto de potencias suele ser total?",
        "answer": "No."
      }
    ],
    "memoryHook": "Total significa que todos pueden ser comparados.",
    "quickExample": {
      "problem": "¿Qué convierte un pedido parcial en un pedido total?",
      "move": "Cada par tiene que ser comparable."
    }
  },
  "proof-rationals-countable": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 8: Cardinalidades de Conjuntos Infinitos",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Por qué los racionales son contables",
    "name": "Los racionales son contables",
    "useItWhen": "Los estudiantes confunden infinito con demasiado grande para enumerarlo.",
    "looksLike": "fracciones, listado de cuadrículas, diagonales hasta racionales",
    "doThis": "Cree una estrategia de listado y omita los duplicados con cuidado.",
    "thinkOfItAs": "caminando por la cuadrícula de fracciones en un orden inteligente",
    "watchOutFor": "enumerar el mismo razonamiento muchas veces y darlo por hecho",
    "rememberThis": "infinito todavía puede ser listable",
    "typicalProblemShapes": [
      "Compara números naturales, enteros, racionales y reales",
      "Preguntas sobre métodos de listado explícitos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la parte difícil de enumerar racionales?",
        "answer": "Evitando repeticiones como 1/2 y 2/4."
      },
      {
        "prompt": "¿Contable significa finito?",
        "answer": "No."
      }
    ],
    "memoryHook": "Contable simplemente significa listable.",
    "quickExample": {
      "problem": "¿Por qué los racionales son contables pero los reales no?",
      "move": "Se pueden enumerar racionales; la diagonalización rompe listas de reales."
    }
  },
  "proof-planning-writing": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 1: Un Cambio de Paradigma",
    "unit": "Bases de Pruebas",
    "topic": "Planificar y escribir una prueba.",
    "name": "Planifique la prueba primero",
    "useItWhen": "Conoces el reclamo pero no sabes cómo empezar.",
    "looksLike": "prueba que..., página en blanco, demasiadas ideas a la vez",
    "doThis": "reescriba la afirmación, analice las definiciones, pruebe casos pequeños y luego dibuje antes de escribir",
    "thinkOfItAs": "borrador primero, prueba limpia después",
    "watchOutFor": "Tratando de escribir la prueba pulida antes de saber el movimiento.",
    "rememberThis": "rasguño desordenado primero, historia limpia después",
    "typicalProblemShapes": [
      "Un teorema parece verdadero pero la primera línea no está clara",
      "Conoces las definiciones pero no la estructura de prueba."
    ],
    "miniDrill": [
      {
        "prompt": "¿Su primer intento debería ser normalmente la prueba final?",
        "answer": "No. Dibuja primero."
      },
      {
        "prompt": "¿Qué deberías analizar al principio de casi todas las pruebas?",
        "answer": "Las definiciones."
      }
    ],
    "memoryHook": "Interpreta, dibuja y luego escribe.",
    "quickExample": {
      "problem": "¿Qué haces antes de escribir oraciones formales?",
      "move": "Interpretar el reclamo y trazar la ruta."
    }
  },
  "proof-propositions": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 2: Lógica y el Lenguaje de las Pruebas",
    "unit": "Lógica y Cuantificadores",
    "topic": "Proposiciones y conectivos lógicos",
    "name": "Proposiciones y conectivas",
    "useItWhen": "una declaración se construye a partir de y, o, no, o si-entonces",
    "looksLike": "P y Q, P o Q, no P, si P entonces Q",
    "doThis": "divida la oración en declaraciones más pequeñas y rastree el conector",
    "thinkOfItAs": "gramática para declaraciones matemáticas",
    "watchOutFor": "leer 'o' como el habla cotidiana cuando matemáticas generalmente significa inclusivo o",
    "rememberThis": "el conector cambia todo el reclamo",
    "typicalProblemShapes": [
      "Declaraciones compuestas construidas a partir de afirmaciones más pequeñas",
      "Verificaciones y reescrituras del valor de verdad"
    ],
    "miniDrill": [
      {
        "prompt": "¿Pueden 'P o Q' ser verdaderos cuando ambos lo son?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Qué deberías aislar primero en una oración lógica larga?",
        "answer": "El conector principal."
      }
    ],
    "memoryHook": "Encuentra el conector antes de la prueba.",
    "quickExample": {
      "problem": "¿Qué significa normalmente 'P o Q' en matemáticas?",
      "move": "Al menos una es cierta, tal vez ambas."
    }
  },
  "proof-set-notation": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Notación de conjuntos y descripción de un conjunto",
    "name": "Notación de conjuntos",
    "useItWhen": "un problema se escribe con llaves, pertenencia o notación por comprensión",
    "looksLike": "{x en Z : ...}, elemento de, subconjunto de, conjunto vacío",
    "doThis": "traduce la notación a palabras simples antes de demostrar algo",
    "thinkOfItAs": "leer el conjunto en voz alta",
    "watchOutFor": "mezclar elemento de con subconjunto de",
    "rememberThis": "primero lea el conjunto en palabras",
    "typicalProblemShapes": [
      "Notación de creación de conjuntos que necesita traducción",
      "Declaraciones de membresía o subconjunto"
    ],
    "miniDrill": [
      {
        "prompt": "¿x en A significa que x es un conjunto?",
        "answer": "No necesariamente. Significa que x es un elemento de A."
      },
      {
        "prompt": "¿Cuál es el movimiento rápido para la notación de conjuntos aterradora?",
        "answer": "Vuelve a escribirlo con palabras simples."
      }
    ],
    "memoryHook": "Lee las llaves en palabras simples.",
    "quickExample": {
      "problem": "¿Qué significa {x en Z: x es par}?",
      "move": "El conjunto de todos los números pares."
    }
  },
  "proof-union-intersection-complement": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 3: Conjuntos y Funciones",
    "unit": "Conjuntos y Funciones",
    "topic": "Uniones, intersecciones y complementos.",
    "name": "Unión, Intersección, Complemento",
    "useItWhen": "una prueba de conjuntos utiliza símbolos de unión, intersección o complemento",
    "looksLike": "A∪B, A∩B, A complemento",
    "doThis": "traduce cada símbolo a una condición sobre elementos y, si hace falta, demuestra ambas inclusiones",
    "thinkOfItAs": "unión significa o, intersección significa y, complemento significa no",
    "watchOutFor": "mirar solo los símbolos en vez de probar qué elementos pertenecen",
    "rememberThis": "las pruebas con conjuntos suelen convertirse en pruebas de pertenencia",
    "typicalProblemShapes": [
      "Establecer identidades con unión e intersección.",
      "Demostrar que dos conjuntos son iguales"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué significa x en A intersección B?",
        "answer": "x está tanto en A como en B."
      },
      {
        "prompt": "¿Cómo se demuestra normalmente que dos conjuntos son iguales?",
        "answer": "Muestre que cada uno es un subconjunto del otro."
      }
    ],
    "memoryHook": "Unión o, intersección y, complemento no.",
    "quickExample": {
      "problem": "¿Cómo se demuestra que A es subconjunto de B∪C?",
      "move": "Toma x en A y muestra que x cae en B o en C."
    }
  },
  "proof-recursive-processes": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 5: Inducción Matemática y Buen Orden",
    "unit": "Inducción",
    "topic": "Procesos recursivos",
    "name": "Proceso recursivo",
    "useItWhen": "una secuencia u objeto se construye a partir de pasos anteriores",
    "looksLike": "a_n depende de a_(n-1), recurrencia, siguiente término de los términos anteriores",
    "doThis": "identificar el caso base y la regla de actualización antes de usar la inducción",
    "thinkOfItAs": "hoy depende del ayer",
    "watchOutFor": "saltar a la inducción sin conocer claramente la recursividad",
    "rememberThis": "caso base más regla de actualización",
    "typicalProblemShapes": [
      "Secuencias definidas a partir de términos anteriores.",
      "Mosaicos, escalones o conteos construidos etapa a etapa"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué falta si solo sabes a_n = a_(n-1) + 2?",
        "answer": "Un valor inicial."
      },
      {
        "prompt": "¿Qué método de prueba suele coincidir con la recursividad?",
        "answer": "Inducción."
      }
    ],
    "memoryHook": "Valor inicial, luego repita la regla.",
    "quickExample": {
      "problem": "¿Qué dos cosas necesita primero una definición recursiva?",
      "move": "Un valor inicial y una regla para el siguiente paso."
    }
  },
  "proof-indexed-collections": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 6: Teoría de Conjuntos, Parte II",
    "unit": "Teoría de Conjuntos II",
    "topic": "Colecciones indexadas de conjuntos.",
    "name": "Colecciones indexadas",
    "useItWhen": "el problema tiene A_i, uniones sobre i o intersecciones sobre muchos conjuntos",
    "looksLike": "A_i, unión de i = 1 a n, intersección de todos los n",
    "doThis": "Trate el índice como una etiqueta y traduzca la gran unión o intersección en palabras.",
    "thinkOfItAs": "una familia de conjuntos con etiquetas de nombre",
    "watchOutFor": "olvidar si la declaración necesita un índice o todos los índices",
    "rememberThis": "unión grande significa algún índice, gran intersección significa cada índice",
    "typicalProblemShapes": [
      "Declaraciones sobre muchos conjuntos a la vez.",
      "Uniones anidadas e intersecciones"
    ],
    "miniDrill": [
      {
        "prompt": "¿X en la intersección A_i significa un conjunto o todos los conjuntos?",
        "answer": "Cada conjunto."
      },
      {
        "prompt": "¿Qué hace el índice i aquí?",
        "answer": "Etiqueta a qué conjunto te refieres."
      }
    ],
    "memoryHook": "Unión = algunos. Intersección = todos.",
    "quickExample": {
      "problem": "¿Qué significa x en la unión A_i?",
      "move": "x está en al menos un conjunto de la familia."
    }
  },
  "proof-well-defined": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Funciones y operaciones bien definidas.",
    "name": "Bien definida",
    "useItWhen": "un objeto tiene muchos representantes y necesita que el resultado no dependa de la elección",
    "looksLike": "[a] va a..., fracciones, clases de equivalencia, clases mod",
    "doThis": "Elija dos representantes equivalentes y demuestre que dan el mismo resultado.",
    "thinkOfItAs": "diferentes nombres, mismo resultado",
    "watchOutFor": "comprobar solo un representante y llamarlo hecho",
    "rememberThis": "La nueva regla debe ignorar la elección representativa.",
    "typicalProblemShapes": [
      "Funciones sobre conjuntos de cocientes o clases de congruencia",
      "Operaciones definidas usando representantes."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué rompe una regla bien definida?",
        "answer": "Dos entradas equivalentes dan salidas diferentes."
      },
      {
        "prompt": "¿Pruebas un representante o dos equivalentes?",
        "answer": "Dos equivalentes."
      }
    ],
    "memoryHook": "Misma clase, mismo resultado.",
    "quickExample": {
      "problem": "¿Cuál es la prueba clave para un mapa de clases de equivalencia?",
      "move": "Mostrar entradas equivalentes da el mismo resultado."
    }
  },
  "proof-congruence-classes": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Clases de congruencia mod n",
    "name": "Clases de congruencia",
    "useItWhen": "los números están agrupados por el mismo resto mod n",
    "looksLike": "[a] mod n, mismo resto, relojes, clases de residuos",
    "doThis": "traduce la clase a todos los números con ese resto y usa la aritmética del resto",
    "thinkOfItAs": "Números que viven en la misma posición del reloj.",
    "watchOutFor": "mezclar un número con toda su clase",
    "rememberThis": "mismo resto significa misma clase",
    "typicalProblemShapes": [
      "mod aritmético n",
      "Ejemplos de relaciones de equivalencia a partir de restos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Están 7 y 12 en la misma clase mod 5?",
        "answer": "Sí. Ambos dejan resto 2."
      },
      {
        "prompt": "¿Una clase de congruencia significa un número o muchos?",
        "answer": "Muchos."
      }
    ],
    "memoryHook": "Mismo resto, mismo cubo.",
    "quickExample": {
      "problem": "¿Qué números viven en [2] mod 5?",
      "move": "Todos los números enteros que dejan resto 2 al dividirse entre 5."
    }
  },
  "proof-functions-partitions": {
    "course": "Introducción a las Matemáticas Abstractas",
    "chapter": "Capítulo 7: Relaciones y Particiones",
    "unit": "Relaciones y Cardinalidad",
    "topic": "Funciones y particiones",
    "name": "Funciones y particiones",
    "useItWhen": "una función divide un conjunto en fibras o bloques de preimagen",
    "looksLike": "misma salida, preimagen de y, dominio dividido en grupos",
    "doThis": "agrupar las entradas por salida y tratar cada grupo como un bloque",
    "thinkOfItAs": "clasificar las entradas en bloques según la salida",
    "watchOutFor": "olvidar que salidas distintas dan bloques separados",
    "rememberThis": "una función divide el dominio en fibras",
    "typicalProblemShapes": [
      "Conjuntos de preimagen de una función.",
      "Partición construida a partir de salidas iguales"
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede una entrada estar en dos fibras diferentes?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué decide el bloque de una entrada?",
        "answer": "Su valor de salida."
      }
    ],
    "memoryHook": "Misma salida, mismo depósito.",
    "quickExample": {
      "problem": "¿Qué es una fibra de una función?",
      "move": "Todas las entradas que llegan a la misma salida."
    }
  },
  "prob-counting-rules": {
    "course": "Probabilidad",
    "chapter": "Capítulo 1: Análisis Combinatorio",
    "unit": "Conteo",
    "topic": "Reglas básicas de conteo",
    "name": "Reglas básicas de conteo",
    "useItWhen": "un problema pregunta cuántos resultados son posibles",
    "looksLike": "de cuantas maneras..., opciones en etapas, uno/o casos",
    "doThis": "multiplicar por etapas, sumar para casos separados",
    "thinkOfItAs": "y significa multiplicar, o significa sumar",
    "watchOutFor": "agregando cuando las opciones suceden en secuencia",
    "rememberThis": "y multiplicar o sumar",
    "typicalProblemShapes": [
      "Un proceso construido desde el paso 1 y luego el paso 2",
      "Casos separados que no se superponen y que deben combinarse"
    ],
    "miniDrill": [
      {
        "prompt": "Si las elecciones ocurren en etapas, ¿sumas o multiplicas?",
        "answer": "Multiplicar."
      },
      {
        "prompt": "Si los casos son alternativas separadas, ¿se suma o se multiplica?",
        "answer": "Añadir."
      }
    ],
    "memoryHook": "Y multiplicar. O agregar.",
    "quickExample": {
      "problem": "3 opciones de camisa y 4 opciones de pantalones. ¿Cuántos trajes?",
      "move": "Multiplicar: 3 por 4."
    }
  },
  "prob-permutations": {
    "course": "Probabilidad",
    "chapter": "Capítulo 1: Análisis Combinatorio",
    "unit": "Conteo",
    "topic": "Permutaciones",
    "name": "Permutaciones",
    "useItWhen": "el orden importa",
    "looksLike": "arreglos, alineaciones, rankings, contraseñas",
    "doThis": "contar selecciones ordenadas con fórmulas de estilo factorial",
    "thinkOfItAs": "Mismas personas, diferente orden, diferente resultado.",
    "watchOutFor": "usar combinaciones cuando el orden importa",
    "rememberThis": "Las permutaciones se preocupan por el orden.",
    "typicalProblemShapes": [
      "Organizar objetos en una fila",
      "Elige los ganadores con el 1º, 2º y 3º lugar"
    ],
    "miniDrill": [
      {
        "prompt": "¿Importa el orden en una permutación?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Es ABC lo mismo que CBA en un problema de permutación?",
        "answer": "No."
      }
    ],
    "memoryHook": "Permutación = disposición.",
    "quickExample": {
      "problem": "Elige y ordena 3 estudiantes de 10.",
      "move": "Utilice un recuento de permutaciones, no un recuento de combinaciones."
    }
  },
  "prob-combinations": {
    "course": "Probabilidad",
    "chapter": "Capítulo 1: Análisis Combinatorio",
    "unit": "Conteo",
    "topic": "Combinaciones",
    "name": "Combinaciones",
    "useItWhen": "el orden no importa",
    "looksLike": "elegir un comité, elegir una mano, seleccionar un grupo",
    "doThis": "contar selecciones desordenadas con n elegir k",
    "thinkOfItAs": "Mismo grupo, mismo resultado, sin importar el orden.",
    "watchOutFor": "contar el mismo grupo varias veces en diferentes órdenes",
    "rememberThis": "las combinaciones ignoran el orden",
    "typicalProblemShapes": [
      "Selección de comité o equipo",
      "Manos, subconjuntos o grupos elegidos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Importa el orden en las combinaciones?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué es mayor para los mismos n y k: permutaciones o combinaciones?",
        "answer": "Permutaciones, porque cuentan más pedidos."
      }
    ],
    "memoryHook": "Combinación = elige un grupo.",
    "quickExample": {
      "problem": "Elige 5 cartas de una baraja.",
      "move": "Usa una combinación porque no importa el orden de las 5 cartas."
    }
  },
  "prob-multinomial": {
    "course": "Probabilidad",
    "chapter": "Capítulo 1: Análisis Combinatorio",
    "unit": "Conteo",
    "topic": "Coeficientes multinomiales",
    "name": "Coeficientes multinomiales",
    "useItWhen": "un conjunto se divide en varios grupos etiquetados",
    "looksLike": "dividir n objetos en grupos de tamaños a, b, c",
    "doThis": "contar cuántas formas de dividirse en los tamaños de grupo",
    "thinkOfItAs": "combinaciones con más de dos grupos",
    "watchOutFor": "Tratar una división de muchos grupos como una simple elección.",
    "rememberThis": "muchos grupos etiquetados significa multinomial",
    "typicalProblemShapes": [
      "Asignar objetos en categorías etiquetadas",
      "Cuente los resultados con varios totales de categorías fijos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la idea multinomial en una frase?",
        "answer": "Dividir en varios grupos."
      },
      {
        "prompt": "¿Es solo una elección de un paso cuando hay 3 o más grupos etiquetados?",
        "answer": "No."
      }
    ],
    "memoryHook": "¿Más de dos grupos? Piensa en multinomiales.",
    "quickExample": {
      "problem": "Divide a 10 personas en grupos de 4, 3 y 3.",
      "move": "Utilice un recuento multinomial."
    }
  },
  "prob-axioms": {
    "course": "Probabilidad",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Axiomas de probabilidad",
    "name": "Axiomas de probabilidad",
    "useItWhen": "necesitas las reglas básicas que la probabilidad debe obedecer",
    "looksLike": "P(A), P(espacio muestral), eventos disjuntos",
    "doThis": "use no negativo, el espacio completo es igual a 1 y agregue eventos disjuntos",
    "thinkOfItAs": "Las reglas básicas que todo modelo de probabilidad debe seguir.",
    "watchOutFor": "agregar probabilidades de eventos superpuestos como si fueran separados",
    "rememberThis": "todo el espacio es 1",
    "typicalProblemShapes": [
      "Cálculos básicos de eventos",
      "Comprobar si una regla puede ser un modelo de probabilidad"
    ],
    "miniDrill": [
      {
        "prompt": "¿Puede una probabilidad ser negativa?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuándo puedes sumar P(A) y P(B) directamente?",
        "answer": "Cuando A y B son disjuntos."
      }
    ],
    "memoryHook": "Las probabilidades viven entre 0 y 1, y todos los resultados suman 1.",
    "quickExample": {
      "problem": "¿Qué es P (espacio muestral)?",
      "move": "1."
    }
  },
  "prob-conditional": {
    "course": "Probabilidad",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Probabilidad condicional",
    "name": "Probabilidad condicional",
    "useItWhen": "el problema dice dado que algo ya pasó",
    "looksLike": "P(A dado B)",
    "doThis": "reduzca el espacio muestral a B, luego mida A dentro de él",
    "thinkOfItAs": "acercarse después de que llega nueva información",
    "watchOutFor": "Usar el antiguo espacio muestral después de que una condición cambia la configuración.",
    "rememberThis": "El condicionamiento encoge el universo.",
    "typicalProblemShapes": [
      "Dado que una carta es roja, ¿cuál es la probabilidad de que sea un corazón?",
      "Dado que una prueba es positiva, ¿cuál es la probabilidad de que el paciente tenga la enfermedad?"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué efecto tiene la probabilidad condicional en el espacio muestral?",
        "answer": "Lo encoge."
      },
      {
        "prompt": "¿Puede P(A dado B) diferir de P(A)?",
        "answer": "Sí."
      }
    ],
    "memoryHook": "Dado B significa vivir dentro de B.",
    "quickExample": {
      "problem": "¿Qué cambia primero cuando condicionas B?",
      "move": "El espacio muestral se reduce a B."
    }
  },
  "prob-independence": {
    "course": "Probabilidad",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Independencia",
    "name": "Independencia",
    "useItWhen": "Un evento no cambia la probabilidad del otro.",
    "looksLike": "eventos independientes, regla de producto para eventos",
    "doThis": "compruebe si P(A y B) es igual a P(A) multiplicado por P(B)",
    "thinkOfItAs": "conocer uno no te dice nada nuevo sobre el otro",
    "watchOutFor": "confundir disjunto con independiente",
    "rememberThis": "regla del producto de medios independientes",
    "typicalProblemShapes": [
      "Pruebas repetidas como lanzamientos de monedas.",
      "Preguntas que preguntan si la información cambia la probabilidad."
    ],
    "miniDrill": [
      {
        "prompt": "¿Pueden los eventos disjuntos distintos de cero ser independientes?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuál es la fórmula distintiva de la independencia?",
        "answer": "P(A y B) = P(A)P(B)."
      }
    ],
    "memoryHook": "Ninguna influencia significa regla del producto.",
    "quickExample": {
      "problem": "¿Qué ecuación rápida verifica la independencia?",
      "move": "P(A y B) = P(A)P(B)."
    }
  },
  "prob-bayes": {
    "course": "Probabilidad",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Fórmula de Bayes",
    "name": "Fórmula de Bayes",
    "useItWhen": "necesitas revertir la condición",
    "looksLike": "P(A dado B) pero sabes P(B dado A)",
    "doThis": "utilizar la probabilidad de tiempos anteriores sobre la evidencia total",
    "thinkOfItAs": "invirtiendo la flecha después de nueva evidencia",
    "watchOutFor": "olvidando el denominador que suma todas las formas en que B puede suceder",
    "rememberThis": "invertir la condición con cuidado",
    "typicalProblemShapes": [
      "Preguntas de exámenes médicos",
      "Filtros de spam o problemas de reversión de estilo de diagnóstico"
    ],
    "miniDrill": [
      {
        "prompt": "¿Bayes invierte la dirección condicional?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Cuál es la gran trampa de los problemas de Bayes?",
        "answer": "Ignorando las tasas base y el denominador completo."
      }
    ],
    "memoryHook": "Bayes invierte la condición, no la lógica.",
    "quickExample": {
      "problem": "¿Qué suele ir en el denominador de Bayes?",
      "move": "La probabilidad total de la evidencia."
    }
  },
  "prob-expected-value": {
    "course": "Probabilidad",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "Variables aleatorias y expectativas.",
    "name": "Valor esperado",
    "useItWhen": "necesitas el pago promedio a largo plazo",
    "looksLike": "E(X), ganancia promedio, número promedio, media",
    "doThis": "multiplica cada valor por su probabilidad y suma",
    "thinkOfItAs": "el promedio ponderado de todos los resultados posibles",
    "watchOutFor": "promediar valores sin usar probabilidades",
    "rememberThis": "el valor esperado es el promedio ponderado",
    "typicalProblemShapes": [
      "Juegos de azar y recompensa esperada",
      "Preguntas sobre el conteo promedio o el costo promedio"
    ],
    "miniDrill": [
      {
        "prompt": "¿Siguen siendo importantes para las expectativas los grandes resultados improbables?",
        "answer": "Sí, si la recompensa es lo suficientemente grande."
      },
      {
        "prompt": "¿Es la expectativa el valor más probable?",
        "answer": "No."
      }
    ],
    "memoryHook": "Expectativa = promedio ponderado.",
    "quickExample": {
      "problem": "¿Cuál es el movimiento de expectativa básica?",
      "move": "Valor multiplicado por la probabilidad, luego suma."
    }
  },
  "prob-linearity": {
    "course": "Probabilidad",
    "chapter": "Capítulo 6: Propiedades de la Esperanza",
    "unit": "Esperanza y Varianza",
    "topic": "Linealidad de expectativa",
    "name": "Linealidad de la expectativa",
    "useItWhen": "un total aleatorio es una suma de piezas aleatorias más pequeñas",
    "looksLike": "mi(X + Y + ...)",
    "doThis": "dividir la expectativa en la suma incluso si las variables son dependientes",
    "thinkOfItAs": "la expectativa se distribuye sobre la suma",
    "watchOutFor": "Aquí se requiere independencia de pensamiento",
    "rememberThis": "la linealidad no necesita independencia",
    "typicalProblemShapes": [
      "Número esperado de éxitos, coincidencias o colisiones",
      "Argumentos de conteo de variables indicadoras"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el paso rápido para esperar una suma?",
        "answer": "Dividir la suma."
      },
      {
        "prompt": "¿La dependencia rompe la linealidad de las expectativas?",
        "answer": "No."
      }
    ],
    "memoryHook": "La expectativa divide sumas gratis.",
    "quickExample": {
      "problem": "¿Necesita independencia para E(X + Y) = E(X) + E(Y)?",
      "move": "No."
    }
  },
  "prob-variance": {
    "course": "Probabilidad",
    "chapter": "Capítulo 7: Covarianza y Varianza de Sumas de Variables Aleatorias",
    "unit": "Esperanza y Varianza",
    "topic": "Variación",
    "name": "Variación",
    "useItWhen": "te preocupas por la difusión, no solo por el promedio",
    "looksLike": "Var(X), repartido alrededor de la media",
    "doThis": "medir la distancia promedio al cuadrado desde la media",
    "thinkOfItAs": "qué tan ruidosa es la variable aleatoria",
    "watchOutFor": "Tratar la varianza como la desviación estándar o como la media misma.",
    "rememberThis": "medidas de varianza extendidas",
    "typicalProblemShapes": [
      "Preguntas sobre riesgo o volatilidad",
      "Variación de sumas y transformaciones."
    ],
    "miniDrill": [
      {
        "prompt": "¿Pueden dos variables aleatorias tener la misma expectativa pero diferente varianza?",
        "answer": "Sí."
      },
      {
        "prompt": "¿La varianza mide el centro o la dispersión?",
        "answer": "Difundir."
      }
    ],
    "memoryHook": "La media es el centro. La variación está repartida.",
    "quickExample": {
      "problem": "¿Qué le dice la variación que no le dice la expectativa?",
      "move": "Qué tan dispersos están los resultados."
    }
  },
  "prob-distributions": {
    "course": "Probabilidad",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "Distribuciones especiales",
    "name": "Distribuciones comunes",
    "useItWhen": "un problema huele a ensayos repetidos, tiempo de espera o recuentos raros",
    "looksLike": "Bernoulli, Binomial, Geométrica, Poisson, Normal",
    "doThis": "relacionar la historia con el patrón de distribución antes de usar fórmulas",
    "thinkOfItAs": "historia primero, fórmula después",
    "watchOutFor": "usando una fórmula de distribución antes de verificar los supuestos de configuración",
    "rememberThis": "reconocer el patrón de la historia",
    "typicalProblemShapes": [
      "Ensayos repetidos independientes",
      "Recuentos de eventos raros en un intervalo fijo"
    ],
    "miniDrill": [
      {
        "prompt": "Cuente los éxitos en n ensayos independientes. ¿Qué modelo?",
        "answer": "Binomio."
      },
      {
        "prompt": "Espere el primer éxito. ¿Qué modelo?",
        "answer": "Geométrico."
      }
    ],
    "memoryHook": "Une la historia antes de la fórmula.",
    "quickExample": {
      "problem": "Ensayos repetidos de sí/no con p fija. ¿Qué modelo encaja?",
      "move": "Binomial si cuentas los éxitos, geométrico si esperas el primer éxito."
    }
  },
  "prob-continuous-density": {
    "course": "Probabilidad",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Distribuciones continuas y densidad.",
    "name": "Funciones de densidad",
    "useItWhen": "la variable aleatoria puede tomar un continuo de valores",
    "looksLike": "f(x), curva de densidad, integrar para probabilidad",
    "doThis": "utilizar el área bajo la densidad durante un intervalo",
    "thinkOfItAs": "La probabilidad continua vive en el área, no en masas puntuales.",
    "watchOutFor": "pidiendo probabilidad en un punto exacto como si tuviera un trozo de masa",
    "rememberThis": "Las probabilidades continuas provienen de intervalos.",
    "typicalProblemShapes": [
      "Preguntas de densidad normal o uniforme",
      "Probabilidad sobre un rango de valores"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la probabilidad en un punto exacto para una variable continua?",
        "answer": "0."
      },
      {
        "prompt": "¿Qué da probabilidad en un intervalo?",
        "answer": "Área bajo la curva de densidad."
      }
    ],
    "memoryHook": "Densidad significa área, no masa puntual.",
    "quickExample": {
      "problem": "¿Cómo se obtiene la probabilidad de una densidad?",
      "move": "Integrar durante el intervalo."
    }
  },
  "prob-joint-distribution": {
    "course": "Probabilidad",
    "chapter": "Capítulo 5: Distribución Conjunta e Independencia",
    "unit": "Comportamiento Conjunto",
    "topic": "Distribuciones conjuntas",
    "name": "Distribuciones conjuntas",
    "useItWhen": "dos variables aleatorias se rastrean juntas",
    "looksLike": "P(X = x, Y = y) o densidad conjunta f(x, y)",
    "doThis": "Lea primero el comportamiento del par y luego obtenga los marginales o condicionales.",
    "thinkOfItAs": "una mesa o superficie para dos variables a la vez",
    "watchOutFor": "multiplicar marginales cuando no se da independencia",
    "rememberThis": "la articulación es lo primero, los marginales pueden surgir de ella",
    "typicalProblemShapes": [
      "Mesas bidireccionales o superficies de densidad.",
      "Encuentre distribuciones marginales o condicionales a partir de una conjunta"
    ],
    "miniDrill": [
      {
        "prompt": "¿Se pueden obtener marginales de una distribución conjunta?",
        "answer": "Sí."
      },
      {
        "prompt": "¿El conjunto es siempre igual al producto de los marginales?",
        "answer": "No. Sólo bajo la independencia."
      }
    ],
    "memoryHook": "Joint cuenta toda la historia de la pareja.",
    "quickExample": {
      "problem": "¿Qué describe una distribución conjunta?",
      "move": "Cómo se comportan dos variables juntas."
    }
  },
  "prob-covariance-correlation": {
    "course": "Probabilidad",
    "chapter": "Capítulo 7: Covarianza y Varianza de Sumas de Variables Aleatorias",
    "unit": "Comportamiento Conjunto",
    "topic": "Covarianza y correlación",
    "name": "Covarianza y correlación",
    "useItWhen": "necesitas saber si dos variables se mueven juntas",
    "looksLike": "Cov(X,Y), Corr(X,Y)",
    "doThis": "use la covarianza para la dirección de la relación y la correlación para la fuerza escalada",
    "thinkOfItAs": "¿Se elevan juntos, caen opuestos o apenas se conectan?",
    "watchOutFor": "Tratar la correlación cero como independencia garantizada.",
    "rememberThis": "la correlación es covarianza escalada",
    "typicalProblemShapes": [
      "Preguntas de dependencia estilo diagrama de dispersión",
      "Varianza de una suma usando términos de covarianza"
    ],
    "miniDrill": [
      {
        "prompt": "¿La correlación tiene unidades?",
        "answer": "No."
      },
      {
        "prompt": "¿La correlación cero siempre significa independencia?",
        "answer": "No."
      }
    ],
    "memoryHook": "La covarianza muestra la dirección. La correlación lo reescala.",
    "quickExample": {
      "problem": "¿Qué sugiere la covarianza positiva?",
      "move": "Las variables tienden a moverse en la misma dirección."
    }
  },
  "prob-markov-chebyshev": {
    "course": "Probabilidad",
    "chapter": "Capítulo 8: Introducción a las Desigualdades de Concentración",
    "unit": "Concentración y Límites",
    "topic": "Desigualdades de Markov y Chebyshev",
    "name": "Markov y Chebyshev",
    "useItWhen": "necesita un límite superior rápido sin detalles completos de distribución",
    "looksLike": "Limitada la posibilidad de que una variable aleatoria crezca.",
    "doThis": "use Markov para variables no negativas y Chebyshev cuando la varianza esté disponible",
    "thinkOfItAs": "barandillas rugosas pero confiables",
    "watchOutFor": "esperando que estos límites sean nítidos",
    "rememberThis": "Markov usa la media, Chebyshev usa la variación",
    "typicalProblemShapes": [
      "Límites superiores de las probabilidades de cola",
      "Preguntas con expectativa o variación pero sin distribución exacta"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué ingrediente adicional necesita Chebyshev más allá de sus expectativas?",
        "answer": "Variación."
      },
      {
        "prompt": "¿Cuál es la principal función de estas desigualdades?",
        "answer": "Dar límites de probabilidad."
      }
    ],
    "memoryHook": "Markov para límites aproximados y medios, Chebyshev para límites extendidos.",
    "quickExample": {
      "problem": "¿Qué límite utiliza la varianza explícitamente?",
      "move": "Chebyshev."
    }
  },
  "prob-clt": {
    "course": "Probabilidad",
    "chapter": "Capítulo 9: Teorema Central del Límite",
    "unit": "Concentración y Límites",
    "topic": "Teorema del límite central",
    "name": "Teorema del límite central",
    "useItWhen": "aparece una suma o promedio de muchas piezas aleatorias",
    "looksLike": "n grande, media muestral, suma estandarizada",
    "doThis": "normalizar la suma o promediar y aproximar con una forma normal",
    "thinkOfItAs": "muchos bultos aleatorios que se mezclan en una curva de campana",
    "watchOutFor": "usar CLT con tamaños de muestra pequeños o una fuerte dependencia sin verificar los supuestos",
    "rememberThis": "muchas piezas pequeñas al azar a menudo parecen normales",
    "typicalProblemShapes": [
      "Medias muestrales para n grande",
      "Probabilidades aproximadas para sumas de términos independientes."
    ],
    "miniDrill": [
      {
        "prompt": "¿CLT habla de una sola variable o de muchas variables combinadas?",
        "answer": "Muchas variables combinadas."
      },
      {
        "prompt": "¿Qué forma suele aparecer en el límite?",
        "answer": "Una curva de campana normal."
      }
    ],
    "memoryHook": "Grandes sumas aleatorias se acercan a la normalidad.",
    "quickExample": {
      "problem": "¿Qué suele volverse aproximadamente normal bajo CLT?",
      "move": "Una suma o promedio adecuadamente estandarizado de muchas variables."
    }
  },
  "prob-inclusion-exclusion": {
    "course": "Probabilidad",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Inclusión-exclusión",
    "name": "Inclusión-Exclusión",
    "useItWhen": "dos eventos se superponen y la simple suma cuenta dos veces",
    "looksLike": "P(A unión B) con superposición",
    "doThis": "sume ambos eventos, luego reste la superposición una vez",
    "thinkOfItAs": "arreglando el doble conteo",
    "watchOutFor": "agregar eventos superpuestos como si estuvieran separados",
    "rememberThis": "suma ambos, resta la superposición",
    "typicalProblemShapes": [
      "Ocurre al menos uno de dos eventos.",
      "Unión de eventos superpuestos"
    ],
    "miniDrill": [
      {
        "prompt": "¿Por qué restar la intersección?",
        "answer": "Porque se contó dos veces."
      },
      {
        "prompt": "Si los eventos son disjuntos, ¿qué sucede con el término superpuesto?",
        "answer": "Se vuelve 0."
      }
    ],
    "memoryHook": "¿Unión con superposición? Resta el medio.",
    "quickExample": {
      "problem": "¿Qué término se resta en P (A unión B)?",
      "move": "Resta P(A intersección B)."
    }
  },
  "prob-total-probability": {
    "course": "Probabilidad",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Ley de probabilidad total",
    "name": "Ley de probabilidad total",
    "useItWhen": "un evento puede ocurrir a través de varios casos limpios",
    "looksLike": "dividir en casos, partición, piezas condicionales",
    "doThis": "dividir el espacio muestral en casos que no se superpongan y agregar las rutas de los casos",
    "thinkOfItAs": "construir la respuesta puerta por puerta",
    "watchOutFor": "usando casos que se superponen",
    "rememberThis": "dividir en casos, luego agregar",
    "typicalProblemShapes": [
      "Varios grupos o fuentes alimentan un evento.",
      "Configuraciones estilo Bayes con partición"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué tipo de división de caso necesita?",
        "answer": "Una partición."
      },
      {
        "prompt": "¿Se pueden superponer los casos?",
        "answer": "No."
      }
    ],
    "memoryHook": "Divídelo y luego agrega los caminos.",
    "quickExample": {
      "problem": "¿Cuándo es útil la ley de probabilidad total?",
      "move": "Cuando un suceso puede suceder a través de varios casos separados."
    }
  },
  "prob-pmf-cdf": {
    "course": "Probabilidad",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "PMF y CDF",
    "name": "PMF frente a CDF",
    "useItWhen": "necesita probabilidad puntual exacta o probabilidad acumulada hasta un límite",
    "looksLike": "P(X = x), F(x) = P(X <= x)",
    "doThis": "use PMF para un valor exacto y CDF para todo hasta ese valor",
    "thinkOfItAs": "PMF es un lugar, CDF es el choque",
    "watchOutFor": "usando el CDF como si diera la masa puntual exacta automáticamente",
    "rememberThis": "PMF es exacto, CDF se acumula",
    "typicalProblemShapes": [
      "Tablas de valores de variables aleatorias discretas.",
      "Convertir entre probabilidad exacta y acumulada"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál responde P(X = 3) directamente?",
        "answer": "El PMF."
      },
      {
        "prompt": "¿Cuál sigue construyendo a medida que x se mueve hacia la derecha?",
        "answer": "La FCD."
      }
    ],
    "memoryHook": "PMF elige un punto. El CDF se acumula.",
    "quickExample": {
      "problem": "¿Qué recauda un CDF?",
      "move": "Toda probabilidad hasta un límite."
    }
  },
  "prob-binomial": {
    "course": "Probabilidad",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "Distribución binomial",
    "name": "Patrón binomial",
    "useItWhen": "cuentas los éxitos en un número fijo de pruebas independientes de sí o no",
    "looksLike": "n ensayos, mismos p, exactamente k éxitos",
    "doThis": "verifique n fija, misma p, independencia, luego use la configuración binomial",
    "thinkOfItAs": "Repita la misma prueba n veces y cuente las victorias.",
    "watchOutFor": "Usar binomial cuando el número de intentos no es fijo.",
    "rememberThis": "intentos arreglados, contar éxitos",
    "typicalProblemShapes": [
      "Exactamente k éxitos en n intentos",
      "Experimentos independientes repetidos de éxito-fracaso."
    ],
    "miniDrill": [
      {
        "prompt": "¿El binomio necesita un número fijo de ensayos?",
        "answer": "Sí."
      },
      {
        "prompt": "¿Qué estás contando?",
        "answer": "El número de éxitos."
      }
    ],
    "memoryHook": "Intentos fijos, cuenta las victorias.",
    "quickExample": {
      "problem": "¿Cuáles son las principales pistas binomiales?",
      "move": "Número fijo de ensayos independientes con las mismas posibilidades de éxito."
    }
  },
  "prob-geometric": {
    "course": "Probabilidad",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "Distribución geométrica",
    "name": "Patrón geométrico",
    "useItWhen": "esperas el primer éxito",
    "looksLike": "primer éxito en la prueba k",
    "doThis": "Detectar ensayos independientes repetidos y una historia de parada ante el primer éxito.",
    "thinkOfItAs": "Sigue intentándolo hasta que consigas un éxito.",
    "watchOutFor": "Usar formas geométricas cuando la historia cuenta los éxitos totales.",
    "rememberThis": "geométrico significa tiempo de espera",
    "typicalProblemShapes": [
      "Primer éxito en la prueba k",
      "Ensayos independientes repetidos sin recuento de paradas fijo"
    ],
    "miniDrill": [
      {
        "prompt": "¿La geometría cuenta el tiempo de espera o los éxitos totales?",
        "answer": "Tiempo de espera."
      },
      {
        "prompt": "¿Se fija de antemano el número de pruebas?",
        "answer": "No."
      }
    ],
    "memoryHook": "Geométrico = espera una victoria.",
    "quickExample": {
      "problem": "¿Cuál es la historia geométrica en una línea?",
      "move": "¿Cuánto falta para el primer éxito?"
    }
  },
  "prob-poisson": {
    "course": "Probabilidad",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "distribución de Poisson",
    "name": "Patrón de veneno",
    "useItWhen": "cuentas eventos raros en una ventana de tiempo o espacio",
    "looksLike": "llegadas, defectos, llamadas, visitas en un intervalo",
    "doThis": "comprobar el conteo en una ventana con tasa promedio lambda",
    "thinkOfItAs": "Eventos raros que gotean en un cubo.",
    "watchOutFor": "utilizando Poisson en una historia de éxito de prueba fija",
    "rememberThis": "Poisson cuenta eventos en una ventana",
    "typicalProblemShapes": [
      "llamadas por hora",
      "Defectos por página o llegadas por minuto"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué parámetro impulsa a Poisson?",
        "answer": "La tasa promedio lambda."
      },
      {
        "prompt": "¿Poisson cuenta una ventana o tiempo de espera?",
        "answer": "Un recuento de ventanas."
      }
    ],
    "memoryHook": "Poisson = eventos por ventana.",
    "quickExample": {
      "problem": "¿Qué tipo de historia encaja mejor con Poisson?",
      "move": "Cuente las llegadas raras en un intervalo."
    }
  },
  "prob-normal-pattern": {
    "course": "Probabilidad",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Distribución normal",
    "name": "Patrón normal",
    "useItWhen": "Aparece un modelo continuo en forma de campana.",
    "looksLike": "media mu, desviación estándar sigma, curva de campana",
    "doThis": "pensar en el área de intervalo y estandarizar cuando sea necesario",
    "thinkOfItAs": "el modelo de campana clásico",
    "watchOutFor": "Tratar lo normal como un modelo discreto de masa puntual.",
    "rememberThis": "normal significa área de curva de campana",
    "typicalProblemShapes": [
      "Modelos de medición en forma de campana.",
      "Preguntas de estandarización y puntuación Z"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué crea la estandarización?",
        "answer": "Una puntuación z."
      },
      {
        "prompt": "¿Importan las probabilidades puntuales exactas en un modelo normal continuo?",
        "answer": "No. Los intervalos importan."
      }
    ],
    "memoryHook": "Normal = intervalos de curva de campana.",
    "quickExample": {
      "problem": "¿Qué se suele calcular bajo una curva normal?",
      "move": "Área en un intervalo."
    }
  },
  "prob-variance-sum": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 7: Covarianza y Varianza de Sumas de Variables Aleatorias",
    "unit": "Esperanza y Varianza",
    "topic": "Varianza de una suma",
    "name": "Varianza de una suma",
    "useItWhen": "se están agregando varias piezas aleatorias",
    "looksLike": "Var(X + Y), sumas independientes, términos de covarianza",
    "doThis": "primero revisa si hay independencia antes de sumar varianzas",
    "thinkOfItAs": "la dispersión también se suma, pero no siempre gratis",
    "watchOutFor": "sumar varianzas sin revisar dependencia",
    "rememberThis": "la varianza se suma limpio solo con independencia",
    "typicalProblemShapes": [
      "Sumas de variables aleatorias",
      "Comparaciones entre reglas de expectativa y varianza"
    ],
    "miniDrill": [
      {
        "prompt": "¿La varianza se suma tan fácil como la esperanza?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué condición hace que las varianzas se sumen limpio?",
        "answer": "Independencia."
      }
    ],
    "memoryHook": "La esperanza siempre suma. La varianza necesita independencia.",
    "quickExample": {
      "problem": "¿Cuándo Var(X + Y) es igual a Var(X) + Var(Y)?",
      "move": "Cuando X e Y son independientes."
    }
  },
  "prob-indicator": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 6: Propiedades de la Esperanza",
    "unit": "Esperanza y Varianza",
    "topic": "Variables indicadoras",
    "name": "Variables indicadoras",
    "useItWhen": "quieres contar eventos aleatorios con banderas 0-1",
    "looksLike": "I_A, evento ocurrió o no, conteo esperado",
    "doThis": "convierte cada evento en un interruptor 0-1 y luego suma los interruptores",
    "thinkOfItAs": "interruptores pequeños para contar",
    "watchOutFor": "olvidar que los indicadores también son variables aleatorias",
    "rememberThis": "contar con interruptores 0-1",
    "typicalProblemShapes": [
      "Número esperado de coincidencias, colisiones o aciertos",
      "Trucos de linealidad de expectativas."
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué valores puede tomar un indicador?",
        "answer": "Sólo 0 o 1."
      },
      {
        "prompt": "¿Qué facilitan los indicadores?",
        "answer": "Conteo esperado."
      }
    ],
    "memoryHook": "Si puedes contar, prueba con un 0-1.",
    "quickExample": {
      "problem": "¿Por qué utilizar variables indicadoras?",
      "move": "Convierten los problemas de conteo en problemas de expectativas."
    }
  },
  "prob-lln": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 9: Teorema Central del Límite",
    "unit": "Concentración y Límites",
    "topic": "Ley de los grandes números",
    "name": "Ley de los grandes números",
    "useItWhen": "los promedios muestrales crecen y te importa a qué valor se estabilizan",
    "looksLike": "promedio de muchos ensayos, frecuencia a largo plazo, media muestral",
    "doThis": "separar hacia dónde va el promedio y qué forma tiene la distribución",
    "thinkOfItAs": "a la larga, el promedio se pega a la media real",
    "watchOutFor": "confundiendo LLN con CLT",
    "rememberThis": "LLN dice adónde van los promedios; CLT dice cómo se ven",
    "typicalProblemShapes": [
      "Muestreo repetido y resultados promedio.",
      "Preguntas que comparan LLN y CLT"
    ],
    "miniDrill": [
      {
        "prompt": "¿LLN habla más de centro o forma de campana?",
        "answer": "Centro."
      },
      {
        "prompt": "¿Qué teorema trata más sobre la forma normal para grandes sumas o promedios?",
        "answer": "El teorema del límite central."
      }
    ],
    "memoryHook": "La ley de los grandes números dice adónde va el promedio; el CLT dice qué forma toma.",
    "quickExample": {
      "problem": "¿Qué dice la Ley de los Grandes Números en palabras simples?",
      "move": "Los promedios de largo plazo se acercan a la media verdadera."
    }
  },
  "prob-stars-and-bars": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 1: Análisis Combinatorio",
    "unit": "Conteo",
    "topic": "Contar soluciones enteras no negativas",
    "name": "Estrellas y barras",
    "useItWhen": "cuentas formas de dividir un total en grupos",
    "looksLike": "x1 + x2 + ... + xn = k con xi no negativo",
    "doThis": "convierte el total en estrellas y usa barras para separar las cajas",
    "thinkOfItAs": "una fila de objetos con separadores",
    "watchOutFor": "olvidando si se permite el cero",
    "rememberThis": "si repartes un total entre cajas, piensa en estrellas y barras",
    "typicalProblemShapes": [
      "Recuentos de soluciones enteras no negativas",
      "Repartir bolas idénticas en cajas"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué cambia primero si cada xi debe ser al menos 1?",
        "answer": "Cambie cada variable hacia abajo en 1 antes de contar."
      },
      {
        "prompt": "¿En estrellas y barras las cajas tienen orden?",
        "answer": "Sí, las cajas son distintas."
      }
    ],
    "memoryHook": "Estrellas para el total, barras para separar.",
    "quickExample": {
      "problem": "¿Qué patrón se ajusta a x1 + x2 + x3 = 7 con xi no negativo?",
      "move": "Estrellas y barras."
    }
  },
  "prob-equally-likely": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "Resultados igualmente probables",
    "name": "Resultados igualmente probables",
    "useItWhen": "cada resultado es igualmente probable",
    "looksLike": "dado justo, sorteo de cartas justo, permutación aleatoria, espacio muestral uniforme",
    "doThis": "primero confirma que todo sea equiprobable, luego cuenta favorables sobre totales",
    "thinkOfItAs": "la probabilidad se convierte en una fracción del espacio muestral",
    "watchOutFor": "Usar favorable sobre el total cuando los resultados no son igualmente probables.",
    "rememberThis": "el conteo funciona solo después de una verificación de igualdad de probabilidades",
    "typicalProblemShapes": [
      "Cartas, dados, lanzamientos de monedas y permutaciones aleatorias.",
      "Probabilidad del conteo bruto"
    ],
    "miniDrill": [
      {
        "prompt": "¿Se puede utilizar favorable sobre el total si los resultados se ponderan de manera diferente?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuál es el denominador en un espacio muestral igualmente probable?",
        "answer": "El número total de resultados."
      }
    ],
    "memoryHook": "Primero la igualdad de posibilidades, luego cuente.",
    "quickExample": {
      "problem": "¿Cuál es el primer movimiento de probabilidad en un problema de dados justo?",
      "move": "Cuente los buenos resultados y divídalos entre 6."
    }
  },
  "prob-secretary-problem": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 2: Probabilidad: Lo Básico",
    "unit": "Bases de Probabilidad",
    "topic": "problema del secretario",
    "name": "Problema del secretario",
    "useItWhen": "Las opciones llegan una por una y las opciones rechazadas desaparecen para siempre.",
    "looksLike": "secuencia de entrevista, regla del mejor hasta ahora, deténgase y elija ahora",
    "doThis": "omita una muestra inicial y luego elija la primera opción que supere todo lo visto hasta ahora",
    "thinkOfItAs": "primero observa, luego toma al primer candidato que rompa el récord",
    "watchOutFor": "tratando de comparar con futuros candidatos que no has visto",
    "rememberThis": "omita algunos y luego tome el siguiente mejor hasta ahora",
    "typicalProblemShapes": [
      "Problemas de parada óptima",
      "Elija el mejor elemento de una secuencia de una sola pasada"
    ],
    "miniDrill": [
      {
        "prompt": "¿Se puede volver a un candidato rechazado en la configuración clásica?",
        "answer": "No."
      },
      {
        "prompt": "¿Cuál es la forma de estrategia habitual?",
        "answer": "Observe primero, luego elija el siguiente récord."
      }
    ],
    "memoryHook": "Mira un tramo, luego elige al siguiente mejor hasta ahora.",
    "quickExample": {
      "problem": "¿Cuál es la pista de reconocimiento para los problemas estilo secretaria?",
      "move": "Elección secuencial sin vuelta atrás."
    }
  },
  "prob-coupon-collector": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "Coleccionista de cupones",
    "name": "Coleccionista de cupones",
    "useItWhen": "Sigues probando hasta que haya aparecido cada tipo.",
    "looksLike": "recoger todos los n tipos, sorteos repetidos, tiempo de espera",
    "doThis": "divide la espera total en etapas y suma los tiempos esperados de cada etapa",
    "thinkOfItAs": "el último elemento que falta es el que tarda más",
    "watchOutFor": "Tratar cada nueva etapa del cupón como si tuviera la misma oportunidad.",
    "rememberThis": "Los problemas de recopilación de todos se dividen en etapas.",
    "typicalProblemShapes": [
      "Recoge todos los tipos de tarjetas, pegatinas o cupones",
      "Tiempo esperado hasta que aparezcan todas las categorías."
    ],
    "miniDrill": [
      {
        "prompt": "¿El tipo final que falta suele llegar rápida o lentamente?",
        "answer": "Despacio."
      },
      {
        "prompt": "¿Qué teorema facilita la división del escenario?",
        "answer": "Linealidad de expectativas."
      }
    ],
    "memoryHook": "Recoger todo significa esperar etapa por etapa.",
    "quickExample": {
      "problem": "¿Cuál es la medida habitual para la expectativa de cobrar todo?",
      "move": "Agrega los tiempos de espera para cada nuevo cupón."
    }
  },
  "prob-negative-binomial": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "Patrón binomial negativo",
    "name": "Patrón binomial negativo",
    "useItWhen": "esperas el éxito r-ésimo, no solo el primero",
    "looksLike": "número de intentos hasta r éxitos",
    "doThis": "Reconocer esperas geométricas repetidas agrupadas para alcanzar un número objetivo de éxitos.",
    "thinkOfItAs": "geométrico, pero continúa hasta el éxito número r",
    "watchOutFor": "Confundir el número de éxitos con el número de intentos.",
    "rememberThis": "binomio negativo = esperar el éxito r-ésimo",
    "typicalProblemShapes": [
      "Pruebas hasta el 3º o 5º éxito.",
      "Preguntas repetidas de Bernoulli sobre el tiempo de espera"
    ],
    "miniDrill": [
      {
        "prompt": "¿Es geométrico el caso especial r = 1?",
        "answer": "Sí."
      },
      {
        "prompt": "¿El binomio negativo cuenta los éxitos o el total de ensayos?",
        "answer": "Por lo general, pruebas totales hasta el r-ésimo éxito."
      }
    ],
    "memoryHook": "Geométrico espera uno. El binomio negativo espera r.",
    "quickExample": {
      "problem": "¿Qué cambia del binomio geométrico al negativo?",
      "move": "Esperas el éxito r-ésimo en lugar del primero."
    }
  },
  "prob-hypergeometric": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "patrón hipergeométrico",
    "name": "Patrón hipergeométrico",
    "useItWhen": "tomas muestras sin reemplazo de una población finita",
    "looksLike": "baraja de cartas, buenos artículos en una población, sorteos sin reemplazo",
    "doThis": "cuenta buenos sorteos con combinaciones y recuerda que las probabilidades cambian en cada sorteo",
    "thinkOfItAs": "binomio sin reemplazo",
    "watchOutFor": "usar la independencia o el binomio cuando la población se está reduciendo",
    "rememberThis": "sin reemplazo significa hipergeométrico",
    "typicalProblemShapes": [
      "Tarjetas, canicas y muestras de defectos sin reemplazo",
      "Cuente cuántos éxitos aparecen en un tamaño de sorteo fijo"
    ],
    "miniDrill": [
      {
        "prompt": "¿Los sorteos son independientes en el muestreo hipergeométrico?",
        "answer": "No."
      },
      {
        "prompt": "¿A qué distribución común se parece la hipergeométrica?",
        "answer": "Binomial, pero sin reemplazo."
      }
    ],
    "memoryHook": "Sin reemplazo se rompe la independencia.",
    "quickExample": {
      "problem": "¿Cuál es la pista de reconocimiento rápido para hipergeométrico?",
      "move": "Muestreo sin reposición de un pool fijo."
    }
  },
  "prob-uniform-continuous": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Distribución uniforme continua",
    "name": "Uniforme continuo",
    "useItWhen": "cada punto en un intervalo es igualmente probable por densidad",
    "looksLike": "X en [a,b], densidad plana, punto aleatorio en un intervalo",
    "doThis": "Trate la probabilidad como la longitud del intervalo sobre la longitud total.",
    "thinkOfItAs": "probabilidad plana en un tramo",
    "watchOutFor": "tratando de dar una probabilidad positiva a un punto exacto",
    "rememberThis": "uniforme en un intervalo significa relaciones de longitud",
    "typicalProblemShapes": [
      "Puntos aleatorios en un segmento de línea",
      "Densidad plana en un intervalo"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es la probabilidad de que exista un punto exacto en un modelo continuo?",
        "answer": "0."
      },
      {
        "prompt": "¿Qué idea geométrica impulsa el uniforme continuo?",
        "answer": "Longitud."
      }
    ],
    "memoryHook": "Intervalo plano significa longitud sobre longitud.",
    "quickExample": {
      "problem": "¿Cómo se encuentra P(c <= X <= d) para uniforme en [a,b]?",
      "move": "Utilice la longitud del intervalo sobre la longitud total."
    }
  },
  "prob-exponential": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Distribución exponencial",
    "name": "Patrón exponencial",
    "useItWhen": "modelas el tiempo de espera hasta la próxima llegada",
    "looksLike": "tiempo de espera, tasa lambda, modelo continuo sin memoria",
    "doThis": "Piense en el tiempo de espera, no en el recuento de eventos, y utilice el parámetro de tasa.",
    "thinkOfItAs": "el compañero de espera de Poisson",
    "watchOutFor": "mezclar los recuentos de Poisson con esperas exponenciales",
    "rememberThis": "Poisson cuenta, esperas exponenciales",
    "typicalProblemShapes": [
      "Tiempo de espera hasta la próxima llamada o llegada",
      "Modelos continuos sin memoria"
    ],
    "miniDrill": [
      {
        "prompt": "¿El exponencial cuenta eventos o tiempo?",
        "answer": "Tiempo."
      },
      {
        "prompt": "¿Qué distribución discreta es su socio de conteo cercano?",
        "answer": "Poisson."
      }
    ],
    "memoryHook": "Espera exponencial para el próximo evento.",
    "quickExample": {
      "problem": "¿Qué historia encaja mejor exponencialmente?",
      "move": "Tiempo hasta el próximo evento."
    }
  },
  "prob-normal-approximation": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Aproximación normal a un binomio",
    "name": "Aproximación normal",
    "useItWhen": "un binomio tiene n grande y desea una estimación de probabilidad rápida",
    "looksLike": "Bin(n,p) con tamaño de muestra grande, aproximación en forma de campana",
    "doThis": "igualar la media y la dispersión, luego aproximar con una curva normal",
    "thinkOfItAs": "cambie una curva de conteo gruesa por una campana suave",
    "watchOutFor": "usarlo cuando n es demasiado pequeño o el binomio está demasiado sesgado",
    "rememberThis": "El gran binomio puede actuar normal.",
    "typicalProblemShapes": [
      "Aproximar una probabilidad binomial rápidamente",
      "Grandes recuentos de éxito de muestras"
    ],
    "miniDrill": [
      {
        "prompt": "¿Es exacta la aproximación normal?",
        "answer": "No. Es una estimación."
      },
      {
        "prompt": "¿Qué modelo discreto se aproxima aquí?",
        "answer": "Binomio."
      }
    ],
    "memoryHook": "Estimación de campana suave y binomial grande.",
    "quickExample": {
      "problem": "¿Cuándo un binomio debería empezar a hacerte pensar en una aproximación normal?",
      "move": "Cuando n es lo suficientemente grande como para que una estimación en forma de campana tenga sentido."
    }
  },
  "prob-conditional-distribution": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 5: Distribución Conjunta e Independencia",
    "unit": "Comportamiento Conjunto",
    "topic": "Distribuciones condicionales",
    "name": "Distribución condicional",
    "useItWhen": "una variable está fijada y quieres la otra después de esa información",
    "looksLike": "X dado Y = y, PMF condicional, densidad condicional",
    "doThis": "fija la información dada y luego renormaliza dentro de esa parte",
    "thinkOfItAs": "hacer zoom en una rebanada de la distribución conjunta",
    "watchOutFor": "usando la probabilidad total original después del condicionamiento",
    "rememberThis": "condición primero, luego renormalizar",
    "typicalProblemShapes": [
      "Encuentra X dado Y = y",
      "Trabajar desde una tabla conjunta o densidad hasta una ley condicional."
    ],
    "miniDrill": [
      {
        "prompt": "¿El condicionamiento suele reducir el universo en el que trabajas?",
        "answer": "Sí."
      },
      {
        "prompt": "¿A qué deben sumar aún las probabilidades condicionales?",
        "answer": "1 dentro de la rebanada condicionada."
      }
    ],
    "memoryHook": "Primero cortas; luego reescalas.",
    "quickExample": {
      "problem": "¿Qué sucede con una distribución conjunta cuando se condiciona Y = y?",
      "move": "Lo cortas y vuelves a escalar dentro de esa rebanada."
    }
  },
  "prob-conditional-expectation": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 7: Covarianza y Varianza de Sumas de Variables Aleatorias",
    "unit": "Esperanza y Varianza",
    "topic": "Expectativa condicional",
    "name": "Expectativa condicional",
    "useItWhen": "la información adicional cambia su mejor estimación promedio",
    "looksLike": "E[X | Y], promedio después de saber algo, regla de la torre",
    "doThis": "tomar primero el valor esperado dentro del mundo condicionado",
    "thinkOfItAs": "el promedio después de que llega la nueva pista",
    "watchOutFor": "Tratar la expectativa condicional como un único número fijo en cada situación.",
    "rememberThis": "condición primero, promedio segundo",
    "typicalProblemShapes": [
      "Valor esperado con información parcial.",
      "Problemas de la regla de la torre y la ley de la expectativa total"
    ],
    "miniDrill": [
      {
        "prompt": "¿Saber más información suele cambiar la suposición promedio?",
        "answer": "Puede."
      },
      {
        "prompt": "¿Qué orden de operaciones ayuda aquí?",
        "answer": "Condición, luego promedio."
      }
    ],
    "memoryHook": "Nueva pista, nuevo promedio.",
    "quickExample": {
      "problem": "¿Qué significa E[X dado Y] en palabras simples?",
      "move": "El valor promedio de X una vez conocido Y."
    }
  },
  "prob-chernoff": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 8: Introducción a las Desigualdades de Concentración",
    "unit": "Concentración y Límites",
    "topic": "Límites de Chernoff",
    "name": "Cota de Chernoff",
    "useItWhen": "una suma de muchas variables independientes de estilo indicador debe permanecer cerca de su media",
    "looksLike": "probabilidad de cola para una suma binomial, estilo exp(-c n) limitado",
    "doThis": "reconocerlo como la herramienta de concentración más precisa para sumas independientes",
    "thinkOfItAs": "la fuerte barandilla sin grandes desviaciones",
    "watchOutFor": "usando a Chebyshev cuando el problema realmente está construido para Chernoff",
    "rememberThis": "Las sumas independientes de Bernoulli se concentran marcadamente",
    "typicalProblemShapes": [
      "Grandes límites de desviación para sumas de estilo binomial",
      "Mostrar que un recuento aleatorio se mantiene cerca de su media con alta probabilidad"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué estructura suele aparecer antes que Chernoff?",
        "answer": "Indicador independiente o sumas de Bernoulli."
      },
      {
        "prompt": "¿Se trata de Chernoff de probabilidades exactas o de límites fuertes?",
        "answer": "Límites fuertes."
      }
    ],
    "memoryHook": "Las sumas independientes permanecen cercanas con alta probabilidad.",
    "quickExample": {
      "problem": "¿Cuándo suele ser Chernoff más fuerte que Chebyshev?",
      "move": "Para sumas de variables independientes de tipo indicador."
    }
  },
  "prob-bernoulli-pattern": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 3: Variables Aleatorias Discretas",
    "unit": "Variables Aleatorias",
    "topic": "patrón de bernoulli",
    "name": "Patrón de Bernoulli",
    "useItWhen": "Un ensayo tiene solo dos resultados, como éxito o fracaso.",
    "looksLike": "0 o 1, sí o no, un disparo con probabilidad p",
    "doThis": "Trátelo como el componente básico de las variables binomiales e indicadoras.",
    "thinkOfItAs": "un pequeño interruptor de éxito-fracaso",
    "watchOutFor": "Usar Bernoulli cuando el experimento tiene muchas pruebas.",
    "rememberThis": "Bernoulli es una prueba, no muchas",
    "typicalProblemShapes": [
      "Prueba única de éxito-fracaso",
      "0-1 modelos de variables aleatorias"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuántos valores puede tomar una variable de Bernoulli?",
        "answer": "Dos."
      },
      {
        "prompt": "¿Es una variable de Bernoulli un ajuste natural para un ensayo o para muchos?",
        "answer": "Una prueba."
      }
    ],
    "memoryHook": "Un cambio, dos resultados.",
    "quickExample": {
      "problem": "¿Qué distribución coincide con un lanzamiento de moneda codificado como 1 para cara y 0 para cruz?",
      "move": "Bernoulli."
    }
  },
  "prob-gamma-pattern": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Patrón de distribución gamma",
    "name": "Patrón gamma",
    "useItWhen": "esperas varias llegadas estilo Poisson en tiempo continuo",
    "looksLike": "tiempo hasta el r-ésimo evento, parámetro de forma, modelo de espera continua",
    "doThis": "reconocerlo como la versión de llegadas múltiples de la exponencial",
    "thinkOfItAs": "exponencial, pero sigue esperando por más eventos.",
    "watchOutFor": "mezclarlo con una historia discreta de recuento binomial negativo",
    "rememberThis": "gamma espera la r-ésima llegada en el tiempo",
    "typicalProblemShapes": [
      "Tiempo de espera hasta la 3ª o 5ª llegada.",
      "Acumulación continua de tiempos de espera"
    ],
    "miniDrill": [
      {
        "prompt": "¿Cuál es el caso especial de gamma de una sola llegada?",
        "answer": "Exponencial."
      },
      {
        "prompt": "¿Gamma cuenta eventos o tiempo de espera?",
        "answer": "Tiempo de espera."
      }
    ],
    "memoryHook": "Exponencial espera a uno, gamma espera a muchos.",
    "quickExample": {
      "problem": "¿Qué distribución continua generaliza la espera exponencial?",
      "move": "Gamma."
    }
  },
  "prob-independent-rvs": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 5: Distribución Conjunta e Independencia",
    "unit": "Comportamiento Conjunto",
    "topic": "Variables aleatorias independientes",
    "name": "Variables aleatorias independientes",
    "useItWhen": "el comportamiento conjunto debe dividirse en partes separadas",
    "looksLike": "la pmf conjunta factoriza, la densidad conjunta factoriza, una variable no dice nada sobre la otra",
    "doThis": "comprueba si la conjunta es el producto de las marginales",
    "thinkOfItAs": "dos historias aleatorias que no interfieren",
    "watchOutFor": "asumir independencia solo porque las variables parecen no estar relacionadas",
    "rememberThis": "independencia significa conjunto igual al producto",
    "typicalProblemShapes": [
      "pmf conjunta o factorización de densidad",
      "Comprobar si dos variables aleatorias son independientes"
    ],
    "miniDrill": [
      {
        "prompt": "¿A qué valor debería ser P(X = x, Y = y) en condiciones de independencia?",
        "answer": "P(X = x) multiplicado por P(Y = y)."
      },
      {
        "prompt": "¿La covarianza cero siempre demuestra independencia?",
        "answer": "No."
      }
    ],
    "memoryHook": "Independencia = conjunta partida en dos.",
    "quickExample": {
      "problem": "¿Qué es la prueba rápida de independencia de una mesa conjunta?",
      "move": "Compare las entradas conjuntas con los productos marginales."
    }
  },
  "prob-sum-independent-rvs": {
    "course": "Probabilidad I",
    "chapter": "Capítulo 5: Distribución Conjunta e Independencia",
    "unit": "Comportamiento Conjunto",
    "topic": "Sumas de variables aleatorias independientes",
    "name": "Suma de variables independientes",
    "useItWhen": "se construye una nueva variable aleatoria como X + Y",
    "looksLike": "suma de dos variables, combinar distribuciones, sensación de convolución",
    "doThis": "suma de todas las formas en que las piezas pueden contribuir al objetivo",
    "thinkOfItAs": "recoger cada camino que aterriza en el mismo total",
    "watchOutFor": "sumar probabilidades de pares imposibles u olvidar todos los pares válidos",
    "rememberThis": "La distribución de la suma significa reunir todos los casos que se suman al objetivo.",
    "typicalProblemShapes": [
      "Distribución de X + Y",
      "Problemas de estilo de suma de dados"
    ],
    "miniDrill": [
      {
        "prompt": "¿Marcas un par o cada par que hace el total?",
        "answer": "Cada par."
      },
      {
        "prompt": "¿Por qué ayuda la independencia aquí?",
        "answer": "Permite que las piezas de unión se multipliquen limpiamente."
      }
    ],
    "memoryHook": "Sume los totales reuniendo todos los pares coincidentes.",
    "quickExample": {
      "problem": "¿Cómo se encuentra P(X + Y = 5) para variables independientes discretas?",
      "move": "Sume todos los casos conjuntos donde los dos valores suman 5."
    }
  },
  "prob-lotus": {
    "course": "Probabilidad",
    "chapter": "Capítulo 6: Propiedades de la Esperanza",
    "unit": "Esperanza y Varianza",
    "topic": "Expectativa de una función",
    "name": "Función de una variable aleatoria",
    "useItWhen": "necesitas E[g(X)] sin encontrar primero la distribución completa de g(X)",
    "looksLike": "E[g(X)], variable, cuadrado o indicador transformado dentro de la expectativa",
    "doThis": "aplique la función a los resultados primero, luego promedie con la ley original de X",
    "thinkOfItAs": "empujar la función dentro del promedio",
    "watchOutFor": "tratando de reemplazar E[g(X)] con g(E[X])",
    "rememberThis": "promediar los valores transformados, no el promedio primero",
    "typicalProblemShapes": [
      "Expectativa de valores o indicadores al cuadrado",
      "Necesita E[g(X)] de la pmf o densidad original"
    ],
    "miniDrill": [
      {
        "prompt": "¿E[X] al cuadrado suele ser lo mismo que E[X] al cuadrado?",
        "answer": "No."
      },
      {
        "prompt": "¿Qué transformas primero, los resultados o las expectativas?",
        "answer": "Los resultados."
      }
    ],
    "memoryHook": "Transforme primero, segundo promedio.",
    "quickExample": {
      "problem": "¿Cómo se obtiene E[X al cuadrado] a partir de la distribución de X?",
      "move": "Primero eleva cada valor al cuadrado y luego promedia."
    }
  },
  "prob-tail-bound-strategy": {
    "course": "Probabilidad",
    "chapter": "Capítulo 8: Introducción a las Desigualdades de Concentración",
    "unit": "Concentración y Límites",
    "topic": "Estrategia de cola",
    "name": "Estrategia de cola",
    "useItWhen": "un problema necesita un salto rápido para estar lejos de la media",
    "looksLike": "P(X grande), límite de desviación, probabilidad no exacta",
    "doThis": "Elija el límite más aproximado que se ajuste a la información que realmente tiene.",
    "thinkOfItAs": "Elija el martillo correcto: solo media, variación o fuerte independencia.",
    "watchOutFor": "perseguir una distribución exacta cuando el problema sólo quiere un límite",
    "rememberThis": "Markov usa la media, Chebyshev usa la varianza, Chernoff usa la independencia",
    "typicalProblemShapes": [
      "Límite superior de probabilidad de cola rápidamente",
      "Elige entre Markov, Chebyshev y Chernoff"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué ingrediente extra tiene Chebyshev sobre Markov?",
        "answer": "Variación."
      },
      {
        "prompt": "¿Qué estructura suele hacer de Chernoff la mejor opción en este caso?",
        "answer": "Sumas independientes tipo Bernoulli."
      }
    ],
    "memoryHook": "Media, varianza, independencia: elige tu límite.",
    "quickExample": {
      "problem": "¿Qué límite utiliza sólo la no negatividad y la expectativa?",
      "move": "Markov."
    }
  },
  "prob-standardize-clt": {
    "course": "Probabilidad",
    "chapter": "Capítulo 9: Teorema Central del Límite",
    "unit": "Concentración y Límites",
    "topic": "Estandarización para el CLT",
    "name": "Estandarizar para CLT",
    "useItWhen": "una suma o media muestral necesita la configuración de aproximación normal",
    "looksLike": "restar la media, dividir por la desviación estándar, expresión de estilo z",
    "doThis": "centro primero, escala segundo, luego use la imagen normal",
    "thinkOfItAs": "convierta la suma desordenada en una versión estándar a escala de campana",
    "watchOutFor": "olvidarse de dividir por el margen correcto para la suma o promedio",
    "rememberThis": "CLT comienza con centro y escala.",
    "typicalProblemShapes": [
      "Aproximación normal para medias o sumas muestrales",
      "Configure una variable de estilo z antes de usar CLT"
    ],
    "miniDrill": [
      {
        "prompt": "¿Estandariza antes o después de usar la idea de la tabla normal?",
        "answer": "Antes."
      },
      {
        "prompt": "¿Qué hace la estandarización en una frase?",
        "answer": "Centra y reescala la cantidad aleatoria."
      }
    ],
    "memoryHook": "Centro, escala y luego curva de campana.",
    "quickExample": {
      "problem": "¿Cuáles son los dos primeros movimientos de configuración de CLT?",
      "move": "Resta la media y divide por la desviación estándar."
    }
  }
};
