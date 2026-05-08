import type { LocalizedCardContent, LocalizedCourseText } from "@/content/schema";

export const esCourseContent: Record<string, LocalizedCourseText> = {
  "multivariable-calculus-2": {
    "title": "Cálculo Multivariable II",
    "shortDescription": "MATH 2E alineado con un flujo Stewart: repaso rapido de 13.1-13.3 y luego las secciones 16.1-16.9.",
    "units": [
      "Secciones 13.1-13.3: Repaso de Funciones Vectoriales",
      "Secciones 16.1-16.4: Campos Vectoriales e Integrales de Línea",
      "Secciones 16.5-16.7: Rotacional, Divergencia e Integrales de Superficie",
      "Secciones 16.8-16.9: Grandes Teoremas del Cálculo Vectorial"
    ],
    "chapters": [
      "Secciones 13.1-13.3: Repaso de Funciones Vectoriales",
      "Secciones 16.1-16.4: Campos Vectoriales e Integrales de Línea",
      "Secciones 16.5-16.7: Rotacional, Divergencia e Integrales de Superficie",
      "Secciones 16.8-16.9: Teoremas de Stokes y de la Divergencia"
    ]
  },
  "linear-algebra-1": {
    "title": "Introducción al Álgebra Lineal",
    "shortDescription": "MATH 3A alineado con el texto: sistemas, matrices, determinantes, espacios vectoriales, espacios con producto interno e ideas propias.",
    "units": [
      "Sistemas de Ecuaciones Lineales",
      "Matrices",
      "Determinantes",
      "Espacios Vectoriales",
      "Espacios con Producto Interno",
      "Transformaciones Lineales y Valores Propios"
    ],
    "chapters": [
      "Capítulo 1: Sistemas de Ecuaciones Lineales",
      "Capítulo 2: Matrices",
      "Capítulo 3: Determinantes",
      "Capítulo 4: Espacios Vectoriales",
      "Capítulo 5: Espacios con Producto Interno",
      "Capítulo 6: Transformaciones Lineales y Valores Propios"
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
    "whatItMeans": "El valor esperado es el promedio ponderado de la variable aleatoria cuando repites el experimento muchas veces.",
    "looksLike": "E(X), ganancia promedio, número promedio, media",
    "doThis": "multiplica cada valor por su probabilidad y suma",
    "whyThisMove": "Cada valor importa según dos cosas: cuánto vale y qué tan probable es. La esperanza junta ambas con un promedio ponderado.",
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
    "rememberThis": "la varianza mide la dispersión",
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
        "answer": "La dispersión."
      }
    ],
    "memoryHook": "La media marca el centro. La varianza mide qué tanto se abre.",
    "quickExample": {
      "problem": "¿Qué te dice la varianza que no te dice la esperanza?",
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
    "whatItMeans": "La covarianza mide si dos variables tienden a subir y bajar juntas respecto a sus medias. La correlación es esa misma idea, pero sin unidades.",
    "looksLike": "Cov(X,Y), Corr(X,Y)",
    "doThis": "usa la covarianza para la dirección y la correlación para la fuerza sin unidades",
    "whyThisMove": "La covarianza nace del producto de las desviaciones respecto a la media. Ese producto es justo lo que detecta si las dos variables se mueven en la misma dirección o en direcciones opuestas.",
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
    "whatItMeans": "Son cotas de emergencia: no dan la probabilidad exacta, pero sí un techo seguro usando solo información parcial.",
    "looksLike": "cota para la probabilidad de una cola grande",
    "doThis": "use Markov para variables no negativas y Chebyshev cuando la varianza esté disponible",
    "whyThisMove": "Cuando el problema solo te da media o varianza, estas desigualdades convierten esa información pobre en una cota útil sin conocer toda la distribución.",
    "thinkOfItAs": "barandillas rugosas pero confiables",
    "watchOutFor": "esperando que estos límites sean nítidos",
    "rememberThis": "Markov usa la media; Chebyshev usa la varianza",
    "typicalProblemShapes": [
      "Límites superiores de las probabilidades de cola",
      "Preguntas con esperanza o varianza pero sin distribución exacta"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué ingrediente adicional necesita Chebyshev más allá de sus expectativas?",
        "answer": "Varianza."
      },
      {
        "prompt": "¿Cuál es la principal función de estas desigualdades?",
        "answer": "Dar límites de probabilidad."
      }
    ],
    "memoryHook": "Markov usa media; Chebyshev usa varianza.",
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
    "whatItMeans": "El TCL dice que, después de centrar y escalar, muchas piezas aleatorias independientes empiezan a parecer normales aunque la variable original no lo sea.",
    "looksLike": "n grande, media muestral, suma estandarizada",
    "doThis": "estandariza la suma o la media y luego usa la aproximación normal",
    "whyThisMove": "La suma en bruto vive en su propia escala. Restar la media y dividir por la desviación correcta la pone en la escala campana donde sí puedes aproximar con normal.",
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
    "doThis": "usa la PMF para un valor exacto y la CDF para todo lo acumulado hasta ese valor",
    "thinkOfItAs": "la PMF es un punto; la CDF es lo acumulado",
    "watchOutFor": "usar la CDF como si diera automáticamente la masa puntual exacta",
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
        "answer": "La CDF."
      }
    ],
    "memoryHook": "PMF da un punto. CDF acumula.",
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
    "doThis": "revisa n fijo, misma p e independencia; luego usa el modelo binomial",
    "thinkOfItAs": "repite el mismo ensayo n veces y cuenta cuántos éxitos salen",
    "watchOutFor": "usar binomial cuando el número de intentos no es fijo",
    "rememberThis": "n fijo, cuenta éxitos",
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
    "doThis": "detecta ensayos independientes repetidos y una historia que se detiene en el primer éxito",
    "thinkOfItAs": "seguir intentando hasta que salga el primer éxito",
    "watchOutFor": "usar geométrica cuando la historia cuenta éxitos totales",
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
    "name": "Patrón de Poisson",
    "useItWhen": "cuentas eventos raros en una ventana de tiempo o espacio",
    "looksLike": "llegadas, defectos, llamadas, visitas en un intervalo",
    "doThis": "comprobar el conteo en una ventana con tasa promedio lambda",
    "thinkOfItAs": "eventos raros cayendo en una ventana",
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
        "answer": "Un conteo en una ventana."
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
    "useItWhen": "aparece un modelo continuo con forma de campana",
    "looksLike": "media mu, desviación estándar sigma, curva de campana",
    "doThis": "pensar en el área de intervalo y estandarizar cuando sea necesario",
    "thinkOfItAs": "el modelo de campana clásico",
    "watchOutFor": "tratar la normal como si fuera un modelo discreto de masa puntual",
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
    "memoryHook": "Normal = áreas bajo la campana.",
    "quickExample": {
      "problem": "¿Qué se suele calcular bajo una curva normal?",
      "move": "Área en un intervalo."
    }
  },

    "prob-variance-sum": {
    "course": "Probabilidad",
    "chapter": "Capítulo 7: Covarianza y Varianza de Sumas de Variables Aleatorias",
    "unit": "Esperanza y Varianza",
    "topic": "Varianza de una suma",
    "name": "Varianza de una suma",
    "useItWhen": "se están agregando varias piezas aleatorias",
    "whatItMeans": "La varianza de una suma no siempre es solo 'sumar varianzas'; también puede aparecer interacción entre las variables mediante covarianza.",
    "looksLike": "Var(X + Y), sumas independientes, términos de covarianza",
    "doThis": "primero revisa si hay independencia antes de sumar varianzas",
    "whyThisMove": "La fórmula completa trae un término cruzado. Si hay independencia, ese término desaparece; si no, ignorarlo te rompe la cuenta.",
    "thinkOfItAs": "la dispersión también se suma, pero no siempre gratis",
    "watchOutFor": "sumar varianzas sin revisar dependencia",
    "rememberThis": "la varianza se suma limpia solo con independencia",
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
    "course": "Probabilidad",
    "chapter": "Capítulo 6: Propiedades de la Esperanza",
    "unit": "Esperanza y Varianza",
    "topic": "Variables indicadoras",
    "name": "Variables indicadoras",
    "useItWhen": "quieres contar eventos aleatorios con banderas 0-1",
    "whatItMeans": "Una variable indicadora vale 1 cuando un evento ocurre y 0 cuando no. Eso convierte un conteo en una suma de interruptores sencillos.",
    "looksLike": "I_A, evento ocurrió o no, conteo esperado",
    "doThis": "convierte cada evento en un interruptor 0-1 y luego suma los interruptores",
    "whyThisMove": "Muchos conteos difíciles se vuelven fáciles cuando los escribes como I1 + I2 + ... y luego aplicas linealidad de la esperanza.",
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
    "course": "Probabilidad",
    "chapter": "Capítulo 9: Teorema Central del Límite",
    "unit": "Concentración y Límites",
    "topic": "Ley de los grandes números",
    "name": "Ley de los grandes números",
    "useItWhen": "los promedios muestrales crecen y te importa a qué valor se estabilizan",
    "whatItMeans": "La ley de los grandes números dice que, a largo plazo, los promedios muestrales se pegan al valor esperado real.",
    "looksLike": "promedio de muchos ensayos, frecuencia a largo plazo, media muestral",
    "doThis": "separar hacia dónde va el promedio y qué forma tiene la distribución",
    "whyThisMove": "La LLN habla del destino del promedio, no de la forma de su distribución. La pregunta correcta aquí es '¿a qué valor se acerca?'",
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
    "watchOutFor": "usar favorables sobre total cuando los resultados no son realmente equiprobables",
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
    "doThis": "reconoce una espera geométrica repetida hasta alcanzar el éxito número r",
    "thinkOfItAs": "geométrico, pero continúa hasta el éxito número r",
    "watchOutFor": "confundir el número de éxitos con el número total de intentos",
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
        "answer": "Normalmente cuenta intentos totales hasta el éxito número r."
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
    "topic": "Patrón hipergeométrico",
    "name": "Patrón hipergeométrico",
    "useItWhen": "tomas muestras sin reemplazo de una población finita",
    "looksLike": "baraja de cartas, buenos artículos en una población, sorteos sin reemplazo",
    "doThis": "cuenta éxitos con combinaciones y recuerda que las probabilidades cambian en cada extracción",
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
        "answer": "A la binomial, pero sin reemplazo."
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
    "doThis": "trata la probabilidad como longitud del intervalo entre longitud total",
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
    "doThis": "piensa en tiempo de espera, no en conteo de eventos, y usa la tasa",
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
    "memoryHook": "Exponencial = esperar al siguiente evento.",
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
    "rememberThis": "binomial grande puede parecer normal",
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
      "Pasar de una tabla o densidad conjunta a una ley condicional."
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
    "doThis": "toma primero el valor esperado dentro del mundo condicionado",
    "thinkOfItAs": "el promedio después de que llega la nueva información",
    "watchOutFor": "tratar la esperanza condicional como un único número fijo en toda situación",
    "rememberThis": "condición primero, promedio segundo",
    "typicalProblemShapes": [
      "Valor esperado con información parcial.",
      "Problemas de regla de la torre y ley de la esperanza total"
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
    "memoryHook": "Nueva información, nuevo promedio.",
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
    "topic": "Patrón de Bernoulli",
    "name": "Patrón de Bernoulli",
    "useItWhen": "un ensayo tiene solo dos resultados, como éxito o fracaso",
    "looksLike": "0 o 1, sí o no, un disparo con probabilidad p",
    "doThis": "trátalo como el bloque básico de las variables binarias, binomiales e indicadoras",
    "thinkOfItAs": "un pequeño interruptor de éxito-fracaso",
    "watchOutFor": "usar Bernoulli cuando el experimento tiene muchas pruebas",
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
    "course": "Probabilidad",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Patrón gamma",
    "name": "Patrón gamma",
    "useItWhen": "esperas varias llegadas estilo Poisson en tiempo continuo",
    "whatItMeans": "Gamma modela el tiempo de espera hasta la llegada número r. Es la versión de 'muchas llegadas' del caso exponencial.",
    "looksLike": "tiempo hasta el r-ésimo evento, parámetro de forma, modelo de espera continua",
    "doThis": "reconocerlo como la versión de llegadas múltiples de la exponencial",
    "whyThisMove": "Aquí sigues en una historia de tiempo de espera, no de conteo. Cuando la pregunta dice 'hasta la tercera, cuarta o r-ésima llegada', la exponencial sube a gamma.",
    "thinkOfItAs": "exponencial, pero esperando varias llegadas",
    "watchOutFor": "mezclarlo con una historia discreta de recuento binomial negativo",
    "rememberThis": "gamma = tiempo hasta la llegada número r",
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

    "prob-memoryless": {
    "course": "Probabilidad",
    "chapter": "Capítulo 4: Variables Aleatorias Continuas",
    "unit": "Variables Aleatorias",
    "topic": "Patrón sin memoria",
    "name": "Patrón sin memoria",
    "useItWhen": "el problema pregunta si el futuro ignora cuánto tiempo ya has esperado",
    "whatItMeans": "Sin memoria significa que la espera restante tiene la misma ley que una espera nueva: el pasado no envejece la distribución futura.",
    "looksLike": "P(X > s + t | X > s), geométrica, exponencial",
    "doThis": "comprueba si la cola conserva la misma forma después de condicionar por haber sobrevivido hasta ahora",
    "whyThisMove": "La prueba clave compara la cola futura después de haber esperado con la cola original desde tiempo 0. Si coinciden en forma, el reloj se resetea.",
    "thinkOfItAs": "esperaste, pero el reloj se reinicia",
    "watchOutFor": "pensar que cualquier distribución de espera es sin memoria",
    "rememberThis": "en las familias clásicas, solo geométrica y exponencial son sin memoria",
    "typicalProblemShapes": [
      "problemas de espera donde ya pasó parte del tiempo",
      "colas condicionales que se comportan como un reinicio"
    ],
    "miniDrill": [
      {
        "prompt": "¿Qué distribución discreta clásica es sin memoria?",
        "answer": "Geométrica."
      },
      {
        "prompt": "¿Qué distribución continua clásica es sin memoria?",
        "answer": "Exponencial."
      }
    ],
    "memoryHook": "Sin memoria = el reloj se reinicia.",
    "quickExample": {
      "problem": "Si ya esperaste y nada pasó, ¿qué distribuciones clásicas siguen viéndose iguales?",
      "move": "Geométrica y exponencial."
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
    "thinkOfItAs": "elige la herramienta correcta: solo media, varianza o independencia fuerte",
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
  },
};
