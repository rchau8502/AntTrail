export interface BubblegumLocalizedText {
  en: string;
  es: string;
  zh: string;
}

export interface BubblegumBankSeed {
  prompt: BubblegumLocalizedText;
  firstStep: BubblegumLocalizedText;
  setup: BubblegumLocalizedText;
  fullPath: BubblegumLocalizedText[];
  answer: BubblegumLocalizedText;
  selfCheck: BubblegumLocalizedText;
  whyFits?: BubblegumLocalizedText;
  notationHelp?: BubblegumLocalizedText[];
}

type BankLevel = "quiz" | "midterm" | "final";

export const bubblegumBanks: Partial<
  Record<string, Partial<Record<BankLevel, BubblegumBankSeed[]>>>
> = {    "prob-covariance-correlation": {
    quiz: [
      {
        prompt: {
          en: "If X and Y are independent, what is Cov(X,Y)?",
          es: "Si X y Y son independientes, ¿cuanto vale Cov(X,Y)?",
          zh: "若 X 与 Y 独立，Cov(X,Y) 等于多少？",
        },
        firstStep: {
          en: "Replace E[XY] by E[X]E[Y].",
          es: "Sustituye E[XY] por E[X]E[Y].",
          zh: "先把 E[XY] 换成 E[X]E[Y]。",
        },
        setup: {
          en: "Cov(X,Y)=E[XY]-E[X]E[Y].",
          es: "Cov(X,Y)=E[XY]-E[X]E[Y].",
          zh: "Cov(X,Y)=E[XY]-E[X]E[Y]。",
        },
        fullPath: [
          { en: "Independence gives E[XY]=E[X]E[Y].", es: "La independencia da E[XY]=E[X]E[Y].", zh: "独立性给出 E[XY]=E[X]E[Y]。" },
          { en: "Subtract E[X]E[Y].", es: "Resta E[X]E[Y].", zh: "再减去 E[X]E[Y]。" },
          { en: "The result is 0.", es: "El resultado es 0.", zh: "结果就是 0。" },
        ],
        answer: {
          en: "0",
          es: "0",
          zh: "0",
        },
        selfCheck: {
          en: "Independent => covariance 0. The converse is not always true.",
          es: "Independencia => covarianza 0. El recíproco no siempre vale.",
          zh: "独立 => 协方差为 0，但反过来不一定。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "If Cov(X,Y) is positive, what should you say in plain English before doing any algebra?",
          es: "Si Cov(X,Y) es positiva, ¿que debes decir en palabras antes de hacer algebra?",
          zh: "如果 Cov(X,Y) 是正的，在算式之前你该先用白话怎么解释？",
        },
        firstStep: {
          en: "Translate the sign before you touch formulas.",
          es: "Traduce el signo antes de tocar formulas.",
          zh: "先把符号翻成现象，再去碰公式。",
        },
        setup: {
          en: "Positive covariance means the centered pieces of X and Y tend to have the same sign.",
          es: "Una covarianza positiva significa que las partes centradas de X e Y suelen tener el mismo signo.",
          zh: "正协方差表示 X 和 Y 偏离各自平均值时，往往同号。",
        },
        fullPath: [
          { en: "Centering compares each variable to its own mean.", es: "Centrar compara cada variable con su propia media.", zh: "中心化是在拿每个变量和自己的均值比较。" },
          { en: "Positive covariance says those centered deviations tend to move together.", es: "Covarianza positiva dice que esas desviaciones centradas suelen moverse juntas.", zh: "正协方差说明这些中心化后的偏差常常同向变化。" },
          { en: "So high X tends to come with high Y, and low with low, at least on average.", es: "Asi que X alto suele venir con Y alto, y X bajo con Y bajo, al menos en promedio.", zh: "所以平均来看，X 偏高时 Y 也常偏高，X 偏低时 Y 也常偏低。" },
        ],
        answer: {
          en: "They tend to move in the same direction relative to their means.",
          es: "Tienden a moverse en la misma direccion respecto de sus medias.",
          zh: "它们相对各自均值，倾向于同方向变化。",
        },
        selfCheck: {
          en: "Covariance sign is about direction, not exact strength or independence.",
          es: "El signo de la covarianza habla de direccion, no de fuerza exacta ni de independencia.",
          zh: "协方差的符号说的是方向，不是精确强度，更不是独立性。",
        },
      },
    ],
  },

    "prob-clt": {
    quiz: [
      {
        prompt: {
          en: "When does the CLT tell you to standardize a sample mean?",
          es: "¿Cuando la CLT te dice que estandarices una media muestral?",
          zh: "什么时候中心极限定理会提示你把样本均值标准化？",
        },
        firstStep: {
          en: "Look for a large sample and a question about the distribution of the mean or sum.",
          es: "Busca muestra grande y una pregunta sobre la distribucion de la media o la suma.",
          zh: "先看是不是大样本，而且题目在问均值或总和的分布。",
        },
        setup: {
          en: "CLT says the sample mean is approximately normal after standardizing.",
          es: "La CLT dice que la media muestral se vuelve aproximadamente normal despues de estandarizar.",
          zh: "中心极限定理告诉你：标准化后的样本均值近似服从正态分布。",
        },
        fullPath: [
          { en: "Check that n is large enough.", es: "先看 n 是否够大。", zh: "先看 n 是否足够大。" },
          { en: "Center by mu and scale by sigma/sqrt(n).", es: "中心化用 mu，缩放用 sigma/sqrt(n).", zh: "用 mu 做中心化，再除以 sigma/sqrt(n)。" },
          { en: "Then use the standard normal table.", es: "然后查标准正态表。", zh: "然后用标准正态表。" },
        ],
        answer: {
          en: "Use Z=(X̄-μ)/(σ/√n).",
          es: "Usa Z=(X̄-μ)/(σ/√n).",
          zh: "用 Z=(X̄-μ)/(σ/√n)。",
        },
        selfCheck: {
          en: "Large sample mean? Think CLT and standardize.",
          es: "¿Media muestral grande? Piensa CLT y estandariza.",
          zh: "大样本均值？先想 CLT，再标准化。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "X1,...,X100 are iid with mean 5 and variance 4. What normal approximation setup should you write for P(X̄ > 5.3)?",
          es: "X1,...,X100 son iid con media 5 y varianza 4. ¿Que montaje de aproximacion normal escribes para P(X̄ > 5.3)?",
          zh: "X1,...,X100 独立同分布，均值 5、方差 4。要求 P(X̄ > 5.3) 时，正态近似该怎么搭？",
        },
        firstStep: {
          en: "Use the sample-mean CLT scale sigma/sqrt(n).",
          es: "Usa la escala de media muestral sigma/sqrt(n).",
          zh: "先用样本均值的标准差 sigma/sqrt(n)。",
        },
        setup: {
          en: "For a sample mean, CLT says X̄ is approximately Normal(mu, sigma^2/n).",
          es: "Para una media muestral, la CLT dice que X̄ es aproximadamente Normal(mu, sigma^2/n).",
          zh: "对样本均值，CLT 说 X̄ 近似服从 Normal(mu, sigma^2/n)。",
        },
        fullPath: [
          { en: "Here mu = 5 and sigma = 2.", es: "Aqui mu = 5 y sigma = 2.", zh: "这里 mu = 5，sigma = 2。" },
          { en: "So the standard deviation of X̄ is 2/sqrt(100) = 0.2.", es: "Entonces la desviacion estandar de X̄ es 2/sqrt(100) = 0.2.", zh: "所以 X̄ 的标准差是 2/sqrt(100) = 0.2。" },
          { en: "Standardize: Z = (X̄ - 5)/0.2, so P(X̄ > 5.3) becomes P(Z > 1.5).", es: "Estandariza: Z = (X̄ - 5)/0.2, y P(X̄ > 5.3) pasa a P(Z > 1.5).", zh: "标准化：Z = (X̄ - 5)/0.2，所以 P(X̄ > 5.3) 变成 P(Z > 1.5)。" },
        ],
        answer: {
          en: "Write Z = (X̄ - 5)/0.2 and convert to P(Z > 1.5).",
          es: "Escribe Z = (X̄ - 5)/0.2 y convierte a P(Z > 1.5).",
          zh: "写成 Z = (X̄ - 5)/0.2，再转成 P(Z > 1.5)。",
        },
        selfCheck: {
          en: "CLT for a mean uses sigma/sqrt(n), not sigma.",
          es: "La CLT para una media usa sigma/sqrt(n), no sigma.",
          zh: "样本均值的 CLT 要用 sigma/sqrt(n)，不是 sigma。",
        },
      },
    ],
  },

    "prob-indicator": {
    quiz: [
      {
        prompt: {
          en: "A deck is shuffled. Let X be the number of aces that land in the first 10 cards. What rewrite should you try before finding E[X]?",
          es: "Se baraja una baraja. Sea X el numero de ases que caen en las primeras 10 cartas. ¿Que reescritura pruebas antes de hallar E[X]?",
          zh: "一副牌洗匀。设 X 是前 10 张里出现的 A 的个数。求 E[X] 前，先该怎么改写？",
        },
        firstStep: {
          en: "Write X as a sum of indicator variables.",
          es: "Escribe X como suma de variables indicadoras.",
          zh: "先把 X 写成若干指示变量之和。",
        },
        setup: {
          en: "Each ace contributes a 1 if it appears in the first 10 cards and 0 otherwise.",
          es: "Cada as aporta 1 si aparece en las primeras 10 cartas y 0 si no.",
          zh: "每张 A 若落在前 10 张里就贡献 1，否则贡献 0。",
        },
        fullPath: [
          { en: "Define Ii = 1 if ace i is in the first 10 cards, else 0.", es: "Define Ii = 1 si el as i esta entre las primeras 10 cartas, y 0 si no.", zh: "设 Ii = 1 表示第 i 张 A 在前 10 张里，否则为 0。" },
          { en: "Then X = I1 + I2 + I3 + I4.", es: "Entonces X = I1 + I2 + I3 + I4.", zh: "则 X = I1 + I2 + I3 + I4。" },
          { en: "Now E[X] = E[I1] + ... + E[I4] by linearity.", es: "Ahora E[X] = E[I1] + ... + E[I4] por linealidad.", zh: "再由线性性得到 E[X] = E[I1] + ... + E[I4]。" },
        ],
        answer: {
          en: "Rewrite the count as a sum of 0-1 indicators.",
          es: "Reescribe el conteo como suma de indicadores 0-1.",
          zh: "把这个计数改写成若干 0-1 指示变量之和。",
        },
        selfCheck: {
          en: "Expected count problems often become indicator-sum problems first.",
          es: "Los conteos esperados suelen convertirse primero en sumas de indicadores.",
          zh: "“期望个数”题，第一反应常常就是“指示变量求和”。",
        },
      },
    ],
  },

    "prob-lln": {
    quiz: [
      {
        prompt: {
          en: "You flip a fair coin 10,000 times. Which theorem explains why the sample proportion of heads should sit near 0.5?",
          es: "Lanzas una moneda justa 10,000 veces. ¿Que teorema explica que la proporcion muestral de caras debe quedar cerca de 0.5?",
          zh: "把一枚公平硬币掷 10,000 次。哪个定理解释了样本正面比例会靠近 0.5？",
        },
        firstStep: {
          en: "Think long-run average, not bell-curve shape.",
          es: "Piensa en promedio a largo plazo, no en forma de campana.",
          zh: "先想长期平均，不是先想钟形曲线。",
        },
        setup: {
          en: "The sample proportion is just the sample mean of 0-1 trial outcomes.",
          es: "La proporcion muestral no es mas que la media muestral de resultados 0-1.",
          zh: "样本比例其实就是一串 0-1 试验结果的样本均值。",
        },
        fullPath: [
          { en: "Repeated trials create a sample average.", es: "Las repeticiones forman un promedio muestral.", zh: "重复试验形成一个样本平均。" },
          { en: "LLN says that average drifts toward the true mean.", es: "La LLN dice que ese promedio se acerca a la media verdadera.", zh: "大数定律说这个平均值会靠近真实均值。" },
          { en: "For a fair coin, that true mean is 0.5.", es: "Para una moneda justa, esa media verdadera es 0.5.", zh: "对公平硬币，这个真实均值就是 0.5。" },
        ],
        answer: {
          en: "The Law of Large Numbers.",
          es: "La Ley de los Grandes Numeros.",
          zh: "大数定律。",
        },
        selfCheck: {
          en: "LLN is about where averages settle, not about normal-shape approximation.",
          es: "La LLN trata de donde se estabilizan los promedios, no de aproximacion normal.",
          zh: "大数定律管的是平均值会靠哪里，不是管曲线会不会像正态。",
        },
      },
    ],
  },

    "prob-gamma-pattern": {
    quiz: [
      {
        prompt: {
          en: "Customers arrive like a Poisson process. What distribution should you try for the waiting time until the 4th arrival?",
          es: "Los clientes llegan como un proceso de Poisson. ¿Que distribucion pruebas para el tiempo de espera hasta la cuarta llegada?",
          zh: "顾客到达服从 Poisson 过程。等到第 4 次到达的等待时间该先想什么分布？",
        },
        firstStep: {
          en: "Notice this is waiting time, not event count.",
          es: "Fijate en que esto es tiempo de espera, no conteo de eventos.",
          zh: "先看清这是“等待时间”，不是“事件个数”。",
        },
        setup: {
          en: "Exponential is for waiting for one arrival; gamma is for waiting for the r-th arrival.",
          es: "La exponencial espera una llegada; la gamma espera la llegada numero r.",
          zh: "指数分布等一次到达；Gamma 分布等到第 r 次到达。",
        },
        fullPath: [
          { en: "The story is continuous time, so do not use a discrete count model.", es: "La historia vive en tiempo continuo, asi que no uses un modelo discreto de conteo.", zh: "题目发生在连续时间里，所以别拿离散计数模型来套。" },
          { en: "You are waiting for the 4th arrival, not the 1st arrival.", es: "Estas esperando la cuarta llegada, no la primera.", zh: "这里等的是第 4 次到达，不是第 1 次。" },
          { en: "That points to a gamma waiting-time model.", es: "Eso apunta a un modelo gamma de tiempo de espera.", zh: "这就指向 Gamma 型等待时间模型。" },
        ],
        answer: {
          en: "Gamma.",
          es: "Gamma.",
          zh: "Gamma 分布。",
        },
        selfCheck: {
          en: "Exponential waits for one arrival; gamma waits for many.",
          es: "La exponencial espera una llegada; la gamma espera varias.",
          zh: "指数等一次，Gamma 等多次。",
        },
      },
    ],
  },

    "prob-memoryless": {
    quiz: [
      {
        prompt: {
          en: "A bus wait time is said to be exponential. After already waiting 8 minutes, what is the key memoryless conclusion?",
          es: "Se dice que el tiempo de espera del bus es exponencial. Despues de esperar ya 8 minutos, ¿cual es la conclusion memoryless clave?",
          zh: "若等公交的时间服从指数分布，已经等了 8 分钟后，memoryless 的关键结论是什么？",
        },
        firstStep: {
          en: "Translate 'memoryless' into 'the clock resets.'",
          es: "Traduce 'memoryless' como 'el reloj se reinicia'.",
          zh: "先把 memoryless 翻成“时钟重置”。",
        },
        setup: {
          en: "Exponential waiting means the remaining wait after survival has the same law as a fresh wait from time 0.",
          es: "Espera exponencial significa que la espera restante, dado que sobreviviste hasta ahora, tiene la misma ley que una espera nueva desde 0.",
          zh: "指数等待意味着：已经等到现在以后，剩余等待时间的分布和从头开始等是一样的。",
        },
        fullPath: [
          { en: "Condition on having already waited 8 minutes.", es: "Condiciona en haber esperado ya 8 minutos.", zh: "先条件化：你已经等了 8 分钟。" },
          { en: "Memoryless says the future tail does not remember that past wait.", es: "Memoryless dice que la cola futura no recuerda esa espera pasada.", zh: "无记忆性说明未来的尾部分布不记得这段过去等待。" },
          { en: "So the remaining wait behaves like a brand-new exponential wait.", es: "Asi que la espera restante se comporta como una espera exponencial completamente nueva.", zh: "因此剩余等待时间就像一段全新的指数等待。" },
        ],
        answer: {
          en: "The remaining wait has the same distribution as a fresh exponential wait.",
          es: "La espera restante tiene la misma distribucion que una espera exponencial nueva.",
          zh: "剩余等待时间与一段新的指数等待同分布。",
        },
        selfCheck: {
          en: "Memoryless means past waiting does not age the future law.",
          es: "Memoryless significa que la espera pasada no envejece la ley futura.",
          zh: "无记忆性表示过去已经等过，不会改变未来的分布规律。",
        },
      },
    ],
  },

    "analysis140a-monotone-bounded": {
    quiz: [
      {
        prompt: {
          en: "A sequence is increasing and bounded above. What theorem should you call first?",
          es: "Una sucesion es creciente y acotada superiormente. ¿Que teorema llamas primero?",
          zh: "一个数列单调递增且有上界。第一反应该调用什么结论？",
        },
        firstStep: {
          en: "Call the monotone convergence theorem.",
          es: "Llama al teorema de convergencia monotona.",
          zh: "直接调用单调有界收敛定理。",
        },
        setup: {
          en: "Monotone plus bounded is the whole trigger.",
          es: "Monotona mas acotada es toda la pista.",
          zh: "“单调 + 有界”本身就是完整触发线索。",
        },
        fullPath: [
          { en: "Increasing gives one-way motion.", es: "Creciente da movimiento en una sola direccion.", zh: "递增表示它只朝一个方向走。" },
          { en: "Bounded above gives a ceiling.", es: "Acotada arriba da un techo.", zh: "有上界表示上面有天花板。" },
          { en: "So the sequence converges.", es: "Asi que la sucesion converge.", zh: "所以该数列收敛。" },
        ],
        answer: {
          en: "Use monotone convergence: the sequence converges.",
          es: "Usa convergencia monotona: la sucesion converge.",
          zh: "用单调有界收敛：这个数列收敛。",
        },
        selfCheck: {
          en: "One-way motion plus a fence means convergence.",
          es: "Movimiento en una direccion mas una cerca significa convergencia.",
          zh: "单向运动再加一道栅栏，就会收敛。",
        },
      },
    ],
  },

    "analysis140a-ivt": {
    quiz: [
      {
        prompt: {
          en: "A continuous function has f(a)<0 and f(b)>0. What theorem should you try first?",
          es: "Una funcion continua tiene f(a)<0 y f(b)>0. ¿Que teorema intentas primero?",
          zh: "一个连续函数满足 f(a)<0 且 f(b)>0。第一步该想到什么定理？",
        },
        firstStep: {
          en: "Use the Intermediate Value Theorem.",
          es: "Usa el Teorema del Valor Intermedio.",
          zh: "先用介值定理。",
        },
        setup: {
          en: "A sign change in a continuous function is a classic IVT trigger.",
          es: "Un cambio de signo en una funcion continua es una pista clasica para IVT.",
          zh: "连续函数出现变号，是介值定理最经典的触发线索。",
        },
        fullPath: [
          { en: "Continuity keeps the graph from jumping over zero.", es: "La continuidad evita que la grafica salte por encima de cero.", zh: "连续性保证图像不会直接跳过 0。" },
          { en: "If values go from negative to positive, zero must be hit in between.", es: "Si los valores pasan de negativo a positivo, deben tocar cero en medio.", zh: "如果函数值从负变正，中间一定会碰到 0。" },
          { en: "So there exists c in (a,b) with f(c)=0.", es: "Entonces existe c en (a,b) con f(c)=0.", zh: "所以存在 c∈(a,b) 使得 f(c)=0。" },
        ],
        answer: {
          en: "Use IVT to conclude there is a root c in (a,b).",
          es: "Usa IVT para concluir que hay una raiz c en (a,b).",
          zh: "用介值定理可推出在 (a,b) 内有根 c。",
        },
        selfCheck: {
          en: "Continuous plus sign change means root in between.",
          es: "Continua mas cambio de signo significa raiz en medio.",
          zh: "连续再加变号，中间必有根。",
        },
      },
    ],
  },

    "analysis140a-cauchy": {
    quiz: [
      {
        prompt: {
          en: "State the Cauchy condition for a sequence (a_n).",
          es: "Enuncia la condición de Cauchy para una sucesión (a_n).",
          zh: "写出数列 (a_n) 是 Cauchy 的定义。",
        },
        firstStep: {
          en: "Start with: for every epsilon > 0 there exists N...",
          es: "Empieza con: para todo epsilon > 0 existe N...",
          zh: "先写：对任意 epsilon > 0，存在 N...",
        },
        setup: {
          en: "Cauchy compares late terms to each other, not to a known limit.",
          es: "Cauchy compara términos tardíos entre sí, no con un límite ya conocido.",
          zh: "Cauchy 是比较后面的项彼此有多近，不是先拿去跟某个已知极限比。",
        },
        fullPath: [
          { en: "Take epsilon > 0.", es: "Toma epsilon > 0.", zh: "取 epsilon > 0。" },
          { en: "Find N so that m,n >= N implies |a_n-a_m| < epsilon.", es: "Encuentra N tal que m,n >= N implique |a_n-a_m| < epsilon.", zh: "找 N，使得 m,n >= N 时有 |a_n-a_m| < epsilon。" },
          { en: "That is exactly the Cauchy condition.", es: "Esa es exactamente la condición de Cauchy.", zh: "这就是 Cauchy 条件本身。" },
        ],
        answer: {
          en: "For every epsilon > 0 there exists N such that m,n >= N implies |a_n-a_m| < epsilon.",
          es: "Para todo epsilon > 0 existe N tal que m,n >= N implica |a_n-a_m| < epsilon.",
          zh: "对任意 epsilon > 0，存在 N，使得 m,n >= N 时有 |a_n-a_m| < epsilon。",
        },
        selfCheck: {
          en: "Cauchy = late terms bunch together.",
          es: "Cauchy = los términos tardíos se amontonan.",
          zh: "Cauchy = 后面的项会挤在一起。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Show that a_n = 1/n is a Cauchy sequence.",
          es: "Demuestra que a_n = 1/n es una sucesión de Cauchy.",
          zh: "证明 a_n = 1/n 是 Cauchy 数列。",
        },
        firstStep: {
          en: "Bound |1/n - 1/m| by 1/n + 1/m.",
          es: "Acota |1/n - 1/m| por 1/n + 1/m.",
          zh: "先用 1/n + 1/m 去估计 |1/n - 1/m|。",
        },
        setup: {
          en: "Then make both tail terms small by choosing N large.",
          es: "Luego haz pequeños ambos términos del final eligiendo N grande.",
          zh: "然后把 N 取得够大，让尾部两项都很小。",
        },
        fullPath: [
          { en: "If m,n >= N, then |1/n - 1/m| <= 1/n + 1/m <= 2/N.", es: "Si m,n >= N, entonces |1/n - 1/m| <= 1/n + 1/m <= 2/N.", zh: "若 m,n >= N，则 |1/n - 1/m| <= 1/n + 1/m <= 2/N。" },
          { en: "Choose N > 2/epsilon.", es: "Elige N > 2/epsilon.", zh: "取 N > 2/epsilon。" },
          { en: "Then |a_n-a_m| < epsilon.", es: "Entonces |a_n-a_m| < epsilon.", zh: "于是 |a_n-a_m| < epsilon。" },
        ],
        answer: {
          en: "So 1/n is Cauchy.",
          es: "Así que 1/n es Cauchy.",
          zh: "所以 1/n 是 Cauchy 数列。",
        },
        selfCheck: {
          en: "Find an easy tail bound, then solve it with N.",
          es: "Busca una cota sencilla para la cola y luego resuélvela con N.",
          zh: "先给尾差找个简单上界，再用 N 把它压小。",
        },
      },
    ],
  },

    "analysis140a-subsequence-test": {
    quiz: [
      {
        prompt: {
          en: "A sequence has two subsequences with different limits. What is the fast conclusion?",
          es: "Una sucesión tiene dos subsucesiones con límites distintos. ¿Cuál es la conclusión rápida?",
          zh: "一个数列有两个子列收敛到不同极限。最快结论是什么？",
        },
        firstStep: {
          en: "Use the subsequence test backward.",
          es: "Usa la prueba de subsucesiones al revés.",
          zh: "直接反着用子列判别法。",
        },
        setup: {
          en: "A convergent sequence cannot send two subsequences to two different limits.",
          es: "Una sucesión convergente no puede mandar dos subsucesiones a dos límites distintos.",
          zh: "如果原数列收敛，就不可能有两个子列跑向不同极限。",
        },
        fullPath: [
          { en: "Assume the full sequence converged to L.", es: "Supón que la sucesión completa converge a L.", zh: "先假设整个数列收敛到 L。" },
          { en: "Then every subsequence would also converge to L.", es: "Entonces toda subsucesión también convergería a L.", zh: "那每个子列也都必须收敛到 L。" },
          { en: "Different subsequence limits contradict that, so the sequence does not converge.", es: "Límites distintos para subsucesiones contradicen eso, así que la sucesión no converge.", zh: "但现在两个子列极限不同，矛盾，所以原数列不收敛。" },
        ],
        answer: {
          en: "The sequence does not converge.",
          es: "La sucesión no converge.",
          zh: "这个数列不收敛。",
        },
        selfCheck: {
          en: "Two different subsequence limits kill convergence.",
          es: "Dos límites distintos de subsucesiones destruyen la convergencia.",
          zh: "两个不同的子列极限，足以判死不收敛。",
        },
      },
    ],
  },

    "prob-sample-space": {
    quiz: [
      {
        prompt: {
          en: "A problem says: roll one fair die. Before you do any probability, what should you write first?",
          es: "El problema dice: lanza un dado justo una vez. Antes de hacer cualquier probabilidad, ¿qué debes escribir primero?",
          zh: "题目说：掷一次公平骰子。做任何概率计算前，第一步该写什么？",
        },
        firstStep: {
          en: "Write the sample space.",
          es: "Escribe el espacio muestral.",
          zh: "先写样本空间。",
        },
        setup: {
          en: "Probability questions start with the universe of allowed outcomes.",
          es: "Las preguntas de probabilidad empiezan con el universo de resultados permitidos.",
          zh: "概率题先要说清楚允许出现的全部结果。",
        },
        fullPath: [
          { en: "Name the experiment clearly.", es: "Nombra con claridad el experimento.", zh: "先把实验说清楚。" },
          { en: "List every allowed outcome.", es: "Lista todos los resultados permitidos.", zh: "列出所有允许结果。" },
          { en: "Use that set as the universe for later events.", es: "Usa ese conjunto como universo para los eventos posteriores.", zh: "把这个集合当作后面事件的宇宙。" },
        ],
        answer: {
          en: "S = {1,2,3,4,5,6}",
          es: "S = {1,2,3,4,5,6}",
          zh: "S = {1,2,3,4,5,6}",
        },
        selfCheck: {
          en: "No sample space, no clean probability setup.",
          es: "Sin espacio muestral no hay planteamiento limpio.",
          zh: "没有样本空间，就没有干净的概率设定。",
        },
      },
    ],
  },

    "prob-events": {
    quiz: [
      {
        prompt: {
          en: "Roll one die. Let A be 'even result'. What is the right first move?",
          es: "Lanza un dado. Sea A = 'resultado par'. ¿Cuál es el primer movimiento correcto?",
          zh: "掷一次骰子。设 A =“结果为偶数”。正确的第一步是什么？",
        },
        firstStep: {
          en: "Write the event as a set of outcomes.",
          es: "Escribe el evento como un conjunto de resultados.",
          zh: "把事件写成结果集合。",
        },
        setup: {
          en: "An event is not just a sentence. It is a subset of the sample space.",
          es: "Un evento no es solo una frase. Es un subconjunto del espacio muestral.",
          zh: "事件不只是文字描述，它是样本空间里的一个子集。",
        },
        fullPath: [
          { en: "Start from the sample space.", es: "Empieza con el espacio muestral.", zh: "先看样本空间。" },
          { en: "Pick the outcomes matching the condition.", es: "挑出满足条件的 resultados.", zh: "挑出满足条件的结果。" },
          { en: "Write the event set explicitly.", es: "Escribe el conjunto del evento de forma explícita.", zh: "把事件集合明确写出来。" },
        ],
        answer: {
          en: "A = {2,4,6}",
          es: "A = {2,4,6}",
          zh: "A = {2,4,6}",
        },
        selfCheck: {
          en: "Event = subset, not just wording.",
          es: "Evento = subconjunto, no solo palabras.",
          zh: "事件 = 子集，不只是文字。",
        },
      },
    ],
  },

    "prob-event-algebra": {
    quiz: [
      {
        prompt: {
          en: "A means 'red card' and B means 'face card'. How should you read A ∩ B?",
          es: "A significa 'carta roja' y B significa 'figura'. ¿Cómo debes leer A ∩ B?",
          zh: "A 表示“红牌”，B 表示“人头牌”。A ∩ B 该怎么读？",
        },
        firstStep: {
          en: "Read intersection as 'A and B'.",
          es: "Lee la intersección como 'A y B'.",
          zh: "把交集读成“A 且 B”。",
        },
        setup: {
          en: "Event algebra is language translation: or = union, and = intersection, not = complement.",
          es: "El álgebra de eventos es traducción de lenguaje: o = unión, y = intersección, no = complemento.",
          zh: "事件代数本质上是语言翻译：或 = 并，且 = 交，不 = 补。",
        },
        fullPath: [
          { en: "Translate the words before touching formulas.", es: "Traduce las palabras antes de tocar fórmulas.", zh: "先翻译文字，再碰公式。" },
          { en: "Match 'and' with intersection.", es: "Empareja 'y' con intersección.", zh: "把“且”对应成交集。" },
          { en: "Then decide what set of outcomes that means.", es: "Luego decide qué conjunto de resultados significa eso.", zh: "再判断这对应哪些结果。" },
        ],
        answer: {
          en: "Both red and face card.",
          es: "Roja y figura a la vez.",
          zh: "同时是红牌又是人头牌。",
        },
        selfCheck: {
          en: "Translate words first: or/and/not.",
          es: "Primero traduce las palabras: o/y/no.",
          zh: "先翻译词：或 / 且 / 不。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A = 'at least one head in two tosses'. Write A^c in words.",
          es: "A = 'al menos una cara en dos lanzamientos'. Escribe A^c en palabras.",
          zh: "A =“两次投掷中至少有一个正面”。请用文字写出 A^c。",
        },
        firstStep: {
          en: "Flip the event to the exact opposite outcome set.",
          es: "Cambia el evento al conjunto opuesto exacto.",
          zh: "把事件翻成完全相反的结果集合。",
        },
        setup: {
          en: "Complement means every outcome in the sample space that is not in A.",
          es: "Complemento significa todo resultado del espacio muestral que no está en A.",
          zh: "补事件就是样本空间里所有“不在 A 中”的结果。",
        },
        fullPath: [
          { en: "Identify what A allows.", es: "Identifica lo que A permite.", zh: "先看 A 包含什么。" },
          { en: "Take every outcome not in A.", es: "Toma cada resultado que no esté en A.", zh: "把所有不在 A 里的结果拿出来。" },
          { en: "State that opposite event cleanly in words.", es: "Expresa ese evento opuesto claramente en palabras.", zh: "再用一句清楚的话把这个相反事件说出来。" },
        ],
        answer: {
          en: "No heads in two tosses.",
          es: "Ninguna cara en dos lanzamientos.",
          zh: "两次都没有正面。",
        },
        selfCheck: {
          en: "Complement = exact opposite inside the same universe.",
          es: "Complemento = opuesto exacto dentro del mismo universo.",
          zh: "补事件 = 在同一个宇宙里的精确相反事件。",
        },
      },
    ],
  },

    "prob-complement-rule": {
    quiz: [
      {
        prompt: {
          en: "What is the fastest setup for P(at least one head in 4 tosses)?",
          es: "¿Cuál es el planteamiento más rápido para P(al menos una cara en 4 lanzamientos)?",
          zh: "求 P(四次投掷至少出现一个正面) 时，最快的设法是什么？",
        },
        firstStep: {
          en: "Use the complement.",
          es: "Usa el complemento.",
          zh: "先用补事件。",
        },
        setup: {
          en: "\"At least one\" is often easier through the opposite event \"none\".",
          es: "\"Al menos una\" suele ser más fácil pasando por el evento opuesto \"ninguna\".",
          zh: "“至少一个”通常先转成相反事件“一个都没有”更容易。",
        },
        fullPath: [
          { en: "Name the opposite event.", es: "Nombra el evento opuesto.", zh: "先写出相反事件。" },
          { en: "Find its probability.", es: "求它的概率.", zh: "算出它的概率。" },
          { en: "Subtract from 1.", es: "Resta a 1.", zh: "再用 1 去减。" },
        ],
        answer: {
          en: "1 - P(no heads in 4 tosses)",
          es: "1 - P(ninguna cara en 4 lanzamientos)",
          zh: "1 - P(四次都没有正面)",
        },
        selfCheck: {
          en: "At least one -> think none first.",
          es: "Al menos una -> piensa primero en ninguna.",
          zh: "至少一个 -> 先想一个都没有。",
        },
      },
    ],
  },

    "prob-axioms": {
    quiz: [
      {
        prompt: {
          en: "Two events A and B are disjoint. What rule should you use for P(A ∪ B)?",
          es: "Dos eventos A y B son disjuntos. ¿Qué regla debes usar para P(A ∪ B)?",
          zh: "两个事件 A 和 B 互斥。求 P(A ∪ B) 时该用哪条规则？",
        },
        firstStep: {
          en: "Add them directly.",
          es: "Súmalos directamente.",
          zh: "直接相加。",
        },
        setup: {
          en: "One of the axioms says disjoint events add with no overlap correction.",
          es: "Uno de los axiomas dice que los eventos disjuntos se suman sin corrección por traslape.",
          zh: "概率公理里有一条：互斥事件相加时不用做重叠修正。",
        },
        fullPath: [
          { en: "Check disjointness.", es: "Verifica que sean disjuntos.", zh: "先确认它们互斥。" },
          { en: "Use P(A ∪ B) = P(A) + P(B).", es: "Usa P(A ∪ B) = P(A) + P(B).", zh: "用 P(A ∪ B) = P(A) + P(B)。" },
          { en: "Do not subtract an overlap term.", es: "No restes un término de traslape.", zh: "不要再减重叠项。" },
        ],
        answer: {
          en: "P(A ∪ B) = P(A) + P(B)",
          es: "P(A ∪ B) = P(A) + P(B)",
          zh: "P(A ∪ B) = P(A) + P(B)",
        },
        selfCheck: {
          en: "Disjoint means straight addition.",
          es: "Disjunto significa suma directa.",
          zh: "互斥就直接相加。",
        },
      },
    ],
  },

    "prob-conditional": {
    quiz: [
      {
        prompt: {
          en: "A card is known to be red. What happens to the sample space before asking whether it is a heart?",
          es: "Se sabe que una carta es roja. ¿Qué pasa con el espacio muestral antes de preguntar si es corazón?",
          zh: "已知一张牌是红色的。接着问它是不是红桃前，样本空间先发生了什么变化？",
        },
        firstStep: {
          en: "Shrink the sample space to the red cards.",
          es: "Reduce el espacio muestral a las cartas rojas.",
          zh: "先把样本空间缩成所有红牌。",
        },
        setup: {
          en: "Conditional probability means you no longer live in the old universe. You live inside the given event.",
          es: "La probabilidad condicional significa que ya no vives en el universo viejo. Vives dentro del evento dado.",
          zh: "条件概率意味着你已经不在原来的宇宙里了，而是活在给定事件内部。",
        },
        fullPath: [
          { en: "Mark the given event B.", es: "Marca el evento dado B.", zh: "先标出已知事件 B。" },
          { en: "Keep only outcomes inside B.", es: "Conserva solo los resultados dentro de B.", zh: "只保留 B 里面的结果。" },
          { en: "Measure A within that smaller universe.", es: "Mide A dentro de ese universo más pequeño.", zh: "再在这个更小的宇宙里计算 A。" },
        ],
        answer: {
          en: "The universe shrinks to B.",
          es: "El universo se reduce a B.",
          zh: "宇宙会缩成 B。",
        },
        selfCheck: {
          en: "Given B = live inside B.",
          es: "Dado B = vivir dentro de B.",
          zh: "已知 B = 活在 B 里面。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A box has 5 red and 3 blue balls. Two are drawn without replacement. Given that the first ball is red, what is the setup for the probability the second ball is blue?",
          es: "Una caja tiene 5 bolas rojas y 3 azules. Se sacan 2 sin reemplazo. Dado que la primera es roja, ¿cual es el planteamiento para la probabilidad de que la segunda sea azul?",
          zh: "一个盒子里有 5 个红球和 3 个蓝球，不放回抽 2 个。已知第一个球是红色，求第二个球是蓝色的设法是什么？",
        },
        firstStep: {
          en: "Shrink the world to outcomes where the first draw is red.",
          es: "Reduce el mundo a los resultados donde la primera extraccion es roja.",
          zh: "先把世界缩到“第一球是红色”的情况里。",
        },
        setup: {
          en: "Conditional probability changes the population you are working with before you count the second event.",
          es: "La probabilidad condicional cambia la poblacion con la que trabajas antes de contar el segundo evento.",
          zh: "条件概率会先改变你所处的总体，再去计算后面的事件。",
        },
        fullPath: [
          { en: "Condition on first red being already removed.", es: "Condiciona a que ya se quito una roja primero.", zh: "先把“已经拿走一个红球”这个条件固定住。" },
          { en: "That leaves 4 red and 3 blue among 7 balls.", es: "Eso deja 4 rojas y 3 azules entre 7 bolas.", zh: "这时剩下 4 红 3 蓝，共 7 个球。" },
          { en: "Now read the chance the second ball is blue in this smaller world.", es: "Ahora lee la probabilidad de azul en este mundo mas pequeño.", zh: "再在这个缩小后的世界里看第二球是蓝色的概率。" },
        ],
        answer: {
          en: "Use the reduced world: 3/7.",
          es: "Usa el mundo reducido: 3/7.",
          zh: "在缩小后的世界里算，结果是 3/7。",
        },
        selfCheck: {
          en: "Given information changes the denominator first.",
          es: "La informacion dada cambia primero el denominador.",
          zh: "已知条件最先改变的是你分母所在的世界。",
        },
      },
    ],
  },

    "prob-independence": {
    quiz: [
      {
        prompt: {
          en: "What is the fastest equation check for independence?",
          es: "¿Cuál es la comprobación más rápida de independencia?",
          zh: "检验独立性的最快公式是什么？",
        },
        firstStep: {
          en: "Check whether P(A ∩ B) = P(A)P(B).",
          es: "Comprueba si P(A ∩ B) = P(A)P(B).",
          zh: "先检查 P(A ∩ B) 是否等于 P(A)P(B)。",
        },
        setup: {
          en: "Independence means learning one event does not change the chance of the other.",
          es: "Independencia significa que conocer un evento no cambia la probabilidad del otro.",
          zh: "独立的意思是：知道一个事件，不会改变另一个事件的概率。",
        },
        fullPath: [
          { en: "Write the overlap probability.", es: "Escribe la probabilidad del traslape.", zh: "先写重叠事件的概率。" },
          { en: "Write the product P(A)P(B).", es: "Escribe el producto P(A)P(B).", zh: "再写 P(A)P(B) 这个乘积。" },
          { en: "Compare the two expressions.", es: "Compara las dos expresiones.", zh: "把两者比较。" },
        ],
        answer: {
          en: "P(A ∩ B) = P(A)P(B)",
          es: "P(A ∩ B) = P(A)P(B)",
          zh: "P(A ∩ B) = P(A)P(B)",
        },
        selfCheck: {
          en: "No influence means product rule.",
          es: "Sin influencia significa regla del producto.",
          zh: "没有影响，就看乘法公式。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A fair die is rolled once. Let A be 'even' and B be 'greater than 3'. Are A and B independent?",
          es: "Se lanza un dado justo una vez. Sea A = 'par' y B = 'mayor que 3'. ¿Son A y B independientes?",
          zh: "掷一次公平骰子。设 A 表示“偶数”，B 表示“大于 3”。A 和 B 独立吗？",
        },
        firstStep: {
          en: "Compare P(A ∩ B) with P(A)P(B).",
          es: "Compara P(A ∩ B) con P(A)P(B).",
          zh: "比较 P(A ∩ B) 和 P(A)P(B)。",
        },
        setup: {
          en: "Independence is a calculation check: same overlap as product means no influence.",
          es: "La independencia es una comprobacion de calculo: mismo traslape que producto significa que no hay influencia.",
          zh: "独立性是个计算检验：如果重叠概率等于乘积，就说明彼此没有影响。",
        },
        fullPath: [
          { en: "Find A={2,4,6}, so P(A)=3/6.", es: "Halla A={2,4,6}, asi que P(A)=3/6.", zh: "先找 A={2,4,6}，所以 P(A)=3/6。" },
          { en: "Find B={4,5,6}, so P(B)=3/6.", es: "Halla B={4,5,6}, asi que P(B)=3/6.", zh: "再找 B={4,5,6}，所以 P(B)=3/6。" },
          { en: "Their overlap is {4,6}, so P(A ∩ B)=2/6, which is not (3/6)(3/6).", es: "Su traslape es {4,6}, asi que P(A ∩ B)=2/6, que no es (3/6)(3/6).", zh: "它们的交集是 {4,6}，所以 P(A ∩ B)=2/6，不等于 (3/6)(3/6)。" },
        ],
        answer: {
          en: "No, they are not independent.",
          es: "No, no son independientes.",
          zh: "不，它们不独立。",
        },
        selfCheck: {
          en: "Independence lives or dies on the overlap check.",
          es: "La independencia se decide con la comprobacion del traslape.",
          zh: "独不独立，最终就看交集概率检验。",
        },
      },
      {
        prompt: {
          en: "A box has 3 red and 2 blue balls. Two are drawn without replacement. Let A be 'first is red' and B be 'second is red'. Are A and B independent?",
          es: "Una caja tiene 3 bolas rojas y 2 azules. Se extraen 2 sin reemplazo. Sea A = 'la primera es roja' y B = 'la segunda es roja'. ¿Son A y B independientes?",
          zh: "一个盒子里有 3 个红球和 2 个蓝球，不放回抽 2 个。设 A 表示“第一球是红色”，B 表示“第二球是红色”。A 和 B 独立吗？",
        },
        firstStep: {
          en: "Compare P(B) with P(B|A).",
          es: "Compara P(B) con P(B|A).",
          zh: "先比较 P(B) 和 P(B|A)。",
        },
        setup: {
          en: "Without replacement often creates dependence because the first draw changes the second world.",
          es: "Sin reemplazo suele crear dependencia porque la primera extraccion cambia el mundo de la segunda.",
          zh: "不放回常常会造成依赖，因为第一次抽取会改变第二次所在的世界。",
        },
        fullPath: [
          { en: "Before conditioning, the chance the second draw is red is 3/5 by symmetry.", es: "Antes de condicionar, por simetria la probabilidad de que la segunda extraccion sea roja es 3/5.", zh: "在未条件化前，由对称性可知第二次抽到红球的概率是 3/5。" },
          { en: "Given A, one red is already gone, so P(B|A)=2/4=1/2.", es: "Dado A, ya se fue una roja, asi que P(B|A)=2/4=1/2.", zh: "若已知 A，则已经少了一个红球，所以 P(B|A)=2/4=1/2。" },
          { en: "Since P(B|A) ≠ P(B), the events are not independent.", es: "Como P(B|A) ≠ P(B), los eventos no son independientes.", zh: "因为 P(B|A) ≠ P(B)，所以这两个事件不独立。" },
        ],
        answer: {
          en: "No, they are dependent.",
          es: "No, son dependientes.",
          zh: "不，它们不独立。",
        },
        selfCheck: {
          en: "Without replacement is one of the fastest warning signs against independence.",
          es: "Sin reemplazo es una de las señales mas rapidas contra independencia.",
          zh: "不放回，是判断“不独立”的最快警报之一。",
        },
      },
    ],
  },

    "prob-inclusion-exclusion": {
    quiz: [
      {
        prompt: {
          en: "A and B overlap. What is the first safe setup for P(A ∪ B)?",
          es: "A y B se traslapan. ¿Cuál es el primer planteamiento seguro para P(A ∪ B)?",
          zh: "A 和 B 有重叠。求 P(A ∪ B) 时最稳的第一步是什么？",
        },
        firstStep: {
          en: "Add both probabilities, then subtract the overlap once.",
          es: "Suma ambas probabilidades y luego resta una vez el traslape.",
          zh: "先把两个概率加起来，再把重叠部分减掉一次。",
        },
        setup: {
          en: "The overlap is counted twice if you only add P(A) and P(B).",
          es: "El traslape se cuenta dos veces si solo sumas P(A) y P(B).",
          zh: "如果只加 P(A) 和 P(B)，重叠部分会被算两次。",
        },
        fullPath: [
          { en: "Start with P(A) + P(B).", es: "Empieza con P(A) + P(B).", zh: "先写 P(A) + P(B)。" },
          { en: "Identify the overlap A ∩ B.", es: "Identifica el traslape A ∩ B.", zh: "找出重叠部分 A ∩ B。" },
          { en: "Subtract that overlap once.", es: "Resta ese traslape una sola vez.", zh: "把它减掉一次。" },
        ],
        answer: {
          en: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
          es: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
          zh: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
        },
        selfCheck: {
          en: "Union with overlap = add, then subtract the middle.",
          es: "Unión con traslape = suma y luego resta el medio.",
          zh: "并集有重叠 = 先加，再减中间。",
        },
      },
    ],
  },

    "prob-disjoint-events": {
    quiz: [
      {
        prompt: {
          en: "Roll one die. Are A = 'even' and B = 'odd' disjoint?",
          es: "Lanza un dado. ¿Son disjuntos A = 'par' y B = 'impar'?",
          zh: "掷一次骰子。A =“偶数”，B =“奇数”，它们互斥吗？",
        },
        firstStep: {
          en: "Check whether any outcome can belong to both events.",
          es: "Comprueba si algún resultado puede pertenecer a ambos eventos.",
          zh: "先检查有没有结果能同时落进这两个事件。",
        },
        setup: {
          en: "Disjoint means the overlap is empty.",
          es: "Disjunto significa que el traslape es vacío.",
          zh: "互斥的意思是重叠部分为空。",
        },
        fullPath: [
          { en: "List what is in A.", es: "Lista lo que está en A.", zh: "先列出 A 里的结果。" },
          { en: "List what is in B.", es: "Lista lo que está en B.", zh: "再列出 B 里的结果。" },
          { en: "See whether the two sets share anything.", es: "Mira si los dos conjuntos comparten algo.", zh: "看看这两个集合有没有共同元素。" },
        ],
        answer: {
          en: "Yes. They are disjoint.",
          es: "Sí. Son disjuntos.",
          zh: "是，它们互斥。",
        },
        selfCheck: {
          en: "Disjoint = no shared outcomes.",
          es: "Disjunto = sin resultados compartidos.",
          zh: "互斥 = 没有共同结果。",
        },
      },
    ],
  },

    "prob-equally-likely": {
    quiz: [
      {
        prompt: {
          en: "A die is fair. What is the correct first setup for P(even result)?",
          es: "Un dado es justo. ¿Cuál es el primer planteamiento correcto para P(resultado par)?",
          zh: "一个骰子是公平的。求 P(结果为偶数) 时第一步该怎么设？",
        },
        firstStep: {
          en: "Use favorable outcomes over total outcomes.",
          es: "Usa resultados favorables sobre resultados totales.",
          zh: "用“有利结果数 ÷ 全部结果数”。",
        },
        setup: {
          en: "That shortcut works because each single outcome has the same chance.",
          es: "Ese atajo funciona porque cada resultado simple tiene la misma probabilidad.",
          zh: "这个捷径成立，是因为每个单个结果概率都一样。",
        },
        fullPath: [
          { en: "Check equal likelihood first.", es: "Primero verifica igualdad de probabilidades.", zh: "先确认各结果等可能。" },
          { en: "Count favorable outcomes.", es: "Cuenta los resultados favorables.", zh: "数有利结果。" },
          { en: "Divide by the total number of outcomes.", es: "Divide por el total de resultados.", zh: "除以总结果数。" },
        ],
        answer: {
          en: "3/6 = 1/2",
          es: "3/6 = 1/2",
          zh: "3/6 = 1/2",
        },
        selfCheck: {
          en: "Equal chance first, then count.",
          es: "Primero igualdad de probabilidad, luego conteo.",
          zh: "先确认等可能，再计数。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A 5-card hand is drawn uniformly from a standard deck. What setup gives the probability of getting exactly 2 aces?",
          es: "Se extrae una mano de 5 cartas uniformemente de una baraja estandar. ¿Que planteamiento da la probabilidad de obtener exactamente 2 ases?",
          zh: "从一副标准扑克牌中等可能地抽出 5 张牌。求恰好 2 张 A 的设法是什么？",
        },
        firstStep: {
          en: "Use favorable combinations over total combinations.",
          es: "Usa combinaciones favorables sobre combinaciones totales.",
          zh: "用“有利组合数 ÷ 全部组合数”。",
        },
        setup: {
          en: "Because every 5-card hand is equally likely, probability is favorable outcomes over total outcomes.",
          es: "Como toda mano de 5 cartas es igualmente probable, la probabilidad es casos favorables sobre casos totales.",
          zh: "因为每一手 5 张牌都等可能，所以概率就是“有利情况 / 全部情况”。",
        },
        fullPath: [
          { en: "Count ways to choose 2 of the 4 aces.", es: "Cuenta las formas de elegir 2 de los 4 ases.", zh: "先数从 4 张 A 里选 2 张的方法。" },
          { en: "Count ways to choose the other 3 cards from the 48 non-aces.", es: "Cuenta las formas de elegir las otras 3 cartas entre las 48 no ases.", zh: "再数从其余 48 张非 A 里选 3 张的方法。" },
          { en: "Divide by the total number of 5-card hands.", es: "Divide por el numero total de manos de 5 cartas.", zh: "最后除以全部 5 张手牌的总数。" },
        ],
        answer: {
          en: "C(4,2)C(48,3) / C(52,5)",
          es: "C(4,2)C(48,3) / C(52,5)",
          zh: "C(4,2)C(48,3) / C(52,5)",
        },
        selfCheck: {
          en: "Uniform hand model -> favorable combinations over total combinations.",
          es: "Modelo uniforme de manos -> combinaciones favorables sobre combinaciones totales.",
          zh: "等可能手牌模型 -> 有利组合数除以总组合数。",
        },
      },
    ],
  },

    "prob-permutations": {
    quiz: [
      {
        prompt: {
          en: "A race awards gold, silver, and bronze among 10 runners. What counting idea should you use first?",
          es: "Una carrera reparte oro, plata y bronce entre 10 corredores. ¿Que idea de conteo debes usar primero?",
          zh: "一场比赛要在 10 名选手中排出金银铜牌。第一反应该用什么计数思路？",
        },
        firstStep: {
          en: "Use permutations because the order of winners matters.",
          es: "Usa permutaciones porque el orden de los ganadores importa.",
          zh: "用排列，因为名次顺序会改变结果。",
        },
        setup: {
          en: "Gold-silver-bronze are different roles, so switching order creates a new outcome.",
          es: "Oro-plata-bronce son papeles distintos, asi que cambiar el orden crea un nuevo resultado.",
          zh: "金银铜是不同位置，所以顺序一变，结果也变了。",
        },
        fullPath: [
          { en: "Notice first, second, and third are different positions.", es: "Observa que primero, segundo y tercero son posiciones distintas.", zh: "先注意第一、第二、第三名是不同位置。" },
          { en: "That means the same three runners in a different order count differently.", es: "Eso significa que los mismos tres corredores en otro orden cuentan distinto.", zh: "所以同样三个人换个顺序，会算成不同结果。" },
          { en: "That is the permutation trigger.", es: "Ese es el disparador de permutaciones.", zh: "这正是排列的触发条件。" },
        ],
        answer: {
          en: "Permutation",
          es: "Permutacion",
          zh: "排列",
        },
        selfCheck: {
          en: "If the order changes the outcome, use permutations.",
          es: "Si el orden cambia el resultado, usa permutaciones.",
          zh: "只要顺序改变结果，就用排列。",
        },
      },
    ],
  },

    "prob-combinations": {
    quiz: [
      {
        prompt: {
          en: "A club chooses a 4-person committee from 12 students. What counting idea fits first?",
          es: "Un club elige un comite de 4 personas entre 12 estudiantes. ¿Que idea de conteo encaja primero?",
          zh: "一个社团要从 12 名学生里选出 4 人委员会。第一反应该用什么计数思路？",
        },
        firstStep: {
          en: "Use combinations because only the group matters.",
          es: "Usa combinaciones porque solo importa el grupo.",
          zh: "用组合，因为题目只在乎是哪 4 个人。",
        },
        setup: {
          en: "Committee problems ignore order, so all orderings of the same group collapse into one outcome.",
          es: "Los problemas de comites ignoran el orden, asi que todos los ordenes del mismo grupo se colapsan en un solo resultado.",
          zh: "委员会题不看顺序，所以同一组人的不同排列都算同一个结果。",
        },
        fullPath: [
          { en: "No role like first or second is being assigned.", es: "No se asigna un papel como primero o segundo.", zh: "题目没有分第一、第二之类的位置。" },
          { en: "So the same 4 students in another order are still the same committee.", es: "Asi que los mismos 4 estudiantes en otro orden siguen siendo el mismo comite.", zh: "所以同样 4 个人换个顺序，仍然是同一个委员会。" },
          { en: "That makes it a combination count.", es: "Eso la convierte en una cuenta de combinaciones.", zh: "因此这里该用组合计数。" },
        ],
        answer: {
          en: "Combination",
          es: "Combinacion",
          zh: "组合",
        },
        selfCheck: {
          en: "If only the group matters, use combinations.",
          es: "Si solo importa el grupo, usa combinaciones.",
          zh: "只在乎选了谁，不在乎顺序，就用组合。",
        },
      },
    ],
  },

    "prob-partitions": {
    quiz: [
      {
        prompt: {
          en: "A class is split into freshmen, sophomores, juniors, and seniors. What should you check before using these groups as cases?",
          es: "Una clase se divide en estudiantes de primero, segundo, tercero y cuarto año. ¿Qué debes comprobar antes de usar estos grupos como casos?",
          zh: "一个班级分成大一、大二、大三、大四。把这些组当作分情况前，要先检查什么？",
        },
        firstStep: {
          en: "Check no overlap and full coverage.",
          es: "Comprueba que no haya traslape y que cubran todo.",
          zh: "先检查不重叠，而且全部覆盖。",
        },
        setup: {
          en: "A partition means clean cases: disjoint and complete.",
          es: "Una partición significa casos limpios: disjuntos y completos.",
          zh: "划分的意思是：分情况要干净，既互斥又完整。",
        },
        fullPath: [
          { en: "Ask whether one outcome can land in two cases.", es: "Pregunta si un resultado puede caer en dos casos.", zh: "先问一个结果会不会同时落进两个情况。" },
          { en: "Ask whether every outcome lands somewhere.", es: "Pregunta si todo resultado cae en algún caso.", zh: "再问每个结果是不是都被分到某个情况里。" },
          { en: "Only then use the case split.", es: "Solo entonces usa la partición por casos.", zh: "确认后再用分情况。" },
        ],
        answer: {
          en: "Check disjoint + complete.",
          es: "Comprueba disjuntos + completos.",
          zh: "检查互斥 + 完整。",
        },
        selfCheck: {
          en: "Partition = covers everything once.",
          es: "Partición = cubre todo una sola vez.",
          zh: "划分 = 每个结果只归一次，而且全覆盖。",
        },
      },
    ],
  },

    "prob-random-variable": {
    quiz: [
      {
        prompt: {
          en: "Two coin tosses. Let X be the number of heads. What is X(HT)?",
          es: "Dos lanzamientos de moneda. Sea X el número de caras. ¿Qué es X(HT)?",
          zh: "掷两次硬币。设 X 表示正面个数。X(HT) 等于多少？",
        },
        firstStep: {
          en: "Apply the rule 'number of heads' to that outcome.",
          es: "Aplica la regla 'número de caras' a ese resultado.",
          zh: "把“正面个数”这条规则作用到这个结果上。",
        },
        setup: {
          en: "A random variable is a rule from outcomes to numbers.",
          es: "Una variable aleatoria es una regla de resultados a números.",
          zh: "随机变量就是“从结果到数字”的一条规则。",
        },
        fullPath: [
          { en: "Look at the outcome HT.", es: "Mira el resultado HT.", zh: "先看结果 HT。" },
          { en: "Count how many heads it contains.", es: "Cuenta cuántas caras contiene.", zh: "数一数里面有几个正面。" },
          { en: "Return that number as X(HT).", es: "Devuelve ese número como X(HT).", zh: "这个数字就是 X(HT)。" },
        ],
        answer: {
          en: "1",
          es: "1",
          zh: "1",
        },
        selfCheck: {
          en: "Random variable = outcome in, number out.",
          es: "Variable aleatoria = entra un resultado, sale un número.",
          zh: "随机变量 = 结果进去，数字出来。",
        },
      },
    ],
  },

    "prob-pmf-cdf": {
    quiz: [
      {
        prompt: {
          en: "Which one answers P(X = 3) directly: PMF or CDF?",
          es: "¿Cuál responde directamente a P(X = 3): PMF o CDF?",
          zh: "直接回答 P(X = 3) 的是 PMF 还是 CDF？",
        },
        firstStep: {
          en: "Use the PMF for an exact value.",
          es: "Usa la PMF para un valor exacto.",
          zh: "精确取值先看 PMF。",
        },
        setup: {
          en: "PMF is point probability. CDF is cumulative probability up to a cutoff.",
          es: "La PMF es probabilidad puntual. La CDF es probabilidad acumulada hasta un corte.",
          zh: "PMF 是点概率，CDF 是到某个截点为止的累计概率。",
        },
        fullPath: [
          { en: "Ask whether the question wants one exact value or everything up to a value.", es: "Pregunta si la cuestión quiere un valor exacto o todo hasta un valor.", zh: "先问题目要的是一个精确值，还是累计到某个值。" },
          { en: "Exact value means PMF.", es: "Valor exacto significa PMF.", zh: "精确值对应 PMF。" },
          { en: "Accumulated total means CDF.", es: "Total acumulado significa CDF.", zh: "累计总量对应 CDF。" },
        ],
        answer: {
          en: "PMF",
          es: "PMF",
          zh: "PMF",
        },
        selfCheck: {
          en: "PMF = point. CDF = pile-up.",
          es: "PMF = punto. CDF = acumulado.",
          zh: "PMF = 点。CDF = 累计。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A discrete random variable has P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3. What is the setup for F(1)?",
          es: "Una variable aleatoria discreta tiene P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3. ¿Cual es el planteamiento para F(1)?",
          zh: "一个离散随机变量满足 P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3。求 F(1) 的设法是什么？",
        },
        firstStep: {
          en: "Add every probability up to and including 1.",
          es: "Suma todas las probabilidades hasta e incluyendo 1.",
          zh: "把所有不超过 1 的概率加起来。",
        },
        setup: {
          en: "CDF means accumulated probability up to the cutoff, not just the exact point.",
          es: "CDF significa probabilidad acumulada hasta el corte, no solo el punto exacto.",
          zh: "CDF 表示累计到截点为止的概率，不只是某一个点的概率。",
        },
        fullPath: [
          { en: "Write F(1)=P(X<=1).", es: "Escribe F(1)=P(X<=1).", zh: "先写 F(1)=P(X<=1)。" },
          { en: "Include X=0 and X=1.", es: "Incluye X=0 y X=1.", zh: "把 X=0 和 X=1 都算进去。" },
          { en: "Add 0.2 + 0.5.", es: "Suma 0.2 + 0.5.", zh: "把 0.2 + 0.5 加起来。" },
        ],
        answer: {
          en: "F(1)=0.2+0.5=0.7",
          es: "F(1)=0.2+0.5=0.7",
          zh: "F(1)=0.2+0.5=0.7",
        },
        selfCheck: {
          en: "CDF asks for pile-up, not one exact bar.",
          es: "La CDF pide acumulado, no una sola barra exacta.",
          zh: "CDF 要的是累计，不是单点柱子的高度。",
        },
      },
      {
        prompt: {
          en: "A discrete variable has F(2)=0.8 and F(1)=0.55. What setup gives P(X=2)?",
          es: "Una variable discreta tiene F(2)=0.8 y F(1)=0.55. ¿Que planteamiento da P(X=2)?",
          zh: "一个离散随机变量满足 F(2)=0.8, F(1)=0.55。求 P(X=2) 时该怎么设？",
        },
        firstStep: {
          en: "Convert the point probability into a CDF jump.",
          es: "Convierte la probabilidad puntual en un salto de la CDF.",
          zh: "先把单点概率改写成 CDF 的跳跃量。",
        },
        setup: {
          en: "For a discrete variable, the mass at one point is the increase in the CDF at that point.",
          es: "Para una variable discreta, la masa en un punto es el aumento de la CDF en ese punto.",
          zh: "对离散变量来说，某一点的概率质量，就是 CDF 在该点的跳跃大小。",
        },
        fullPath: [
          { en: "Write F(2)=P(X<=2) and F(1)=P(X<=1).", es: "Escribe F(2)=P(X<=2) y F(1)=P(X<=1).", zh: "先写 F(2)=P(X<=2)，F(1)=P(X<=1)。" },
          { en: "Subtract to isolate the probability sitting exactly at 2.", es: "Resta para aislar la probabilidad que cae exactamente en 2.", zh: "再相减，把恰好等于 2 的概率单独抠出来。" },
          { en: "So P(X=2)=F(2)-F(1).", es: "Entonces P(X=2)=F(2)-F(1).", zh: "因此 P(X=2)=F(2)-F(1)。" },
        ],
        answer: {
          en: "P(X=2)=0.8-0.55=0.25",
          es: "P(X=2)=0.8-0.55=0.25",
          zh: "P(X=2)=0.8-0.55=0.25",
        },
        selfCheck: {
          en: "Discrete point mass = CDF jump.",
          es: "Masa puntual discreta = salto de la CDF.",
          zh: "离散单点概率 = CDF 的跳跃量。",
        },
      },
    ],
  },

    "prob-expected-value": {
    quiz: [
      {
        prompt: {
          en: "A random variable takes values 0 and 10 with probabilities 0.9 and 0.1. What setup gives E[X]?",
          es: "Una variable aleatoria toma valores 0 y 10 con probabilidades 0.9 y 0.1. ¿Qué planteamiento da E[X]?",
          zh: "随机变量以概率 0.9 取 0，以概率 0.1 取 10。求 E[X] 的设法是什么？",
        },
        firstStep: {
          en: "Multiply each value by its probability and add.",
          es: "Multiplica cada valor por su probabilidad y suma.",
          zh: "每个值乘以它的概率，再加起来。",
        },
        setup: {
          en: "Expected value is a weighted average, not just the most likely value.",
          es: "El valor esperado es un promedio ponderado, no solo el valor más probable.",
          zh: "期望是加权平均，不是“最可能出现的那个值”。",
        },
        fullPath: [
          { en: "Write each value-probability pair.", es: "Escribe cada par valor-probabilidad.", zh: "先写出每个“值-概率”对。" },
          { en: "Multiply value by probability.", es: "Multiplica valor por probabilidad.", zh: "把值乘上概率。" },
          { en: "Add the weighted pieces.", es: "Suma las piezas ponderadas.", zh: "把这些加权项加起来。" },
        ],
        answer: {
          en: "E[X] = 0(0.9) + 10(0.1)",
          es: "E[X] = 0(0.9) + 10(0.1)",
          zh: "E[X] = 0(0.9) + 10(0.1)",
        },
        selfCheck: {
          en: "Expectation = weighted average.",
          es: "Esperanza = promedio ponderado.",
          zh: "期望 = 加权平均。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A game pays 5 dollars with probability 0.3 and loses 2 dollars with probability 0.7. Is the expected value positive or negative?",
          es: "Un juego paga 5 dólares con probabilidad 0.3 y pierde 2 dólares con probabilidad 0.7. ¿El valor esperado es positivo o negativo?",
          zh: "一个游戏以概率 0.3 赢 5 美元，以概率 0.7 输 2 美元。它的期望是正还是负？",
        },
        firstStep: {
          en: "Compute the weighted average of payoff values.",
          es: "Calcula el promedio ponderado de los pagos.",
          zh: "先算收益值的加权平均。",
        },
        setup: {
          en: "Positive expected value means long-run average gain; negative means long-run average loss.",
          es: "Esperanza positiva significa ganancia promedio a largo plazo; negativa significa pérdida promedio.",
          zh: "期望为正表示长期平均赚钱；为负表示长期平均亏钱。",
        },
        fullPath: [
          { en: "Write 5(0.3) + (-2)(0.7).", es: "Escribe 5(0.3) + (-2)(0.7).", zh: "写出 5(0.3) + (-2)(0.7)。" },
          { en: "Compare the positive and negative weighted pieces.", es: "Compara las piezas ponderadas positiva y negativa.", zh: "比较正负两部分的加权贡献。" },
          { en: "Read the sign of the total.", es: "Lee el signo del total.", zh: "看总和的符号。" },
        ],
        answer: {
          en: "Positive, since 1.5 - 1.4 = 0.1",
          es: "Positivo, porque 1.5 - 1.4 = 0.1",
          zh: "是正的，因为 1.5 - 1.4 = 0.1",
        },
        selfCheck: {
          en: "Expected value reads the long-run average payoff.",
          es: "La esperanza lee el pago promedio a largo plazo.",
          zh: "期望读的是长期平均收益。",
        },
      },
      {
        prompt: {
          en: "A random variable has pmf p(0)=0.1, p(1)=0.4, p(3)=0.5. What setup gives E[X]?",
          es: "Una variable aleatoria tiene pmf p(0)=0.1, p(1)=0.4, p(3)=0.5. ¿Que planteamiento da E[X]?",
          zh: "某随机变量的 pmf 为 p(0)=0.1, p(1)=0.4, p(3)=0.5。求 E[X] 时该怎么设？",
        },
        firstStep: {
          en: "List each value and weight it by its probability.",
          es: "Lista cada valor y ponderalo por su probabilidad.",
          zh: "先把每个取值列出来，再乘上各自概率。",
        },
        setup: {
          en: "Expectation from a pmf is a weighted average over every possible value of X.",
          es: "La esperanza desde una pmf es un promedio ponderado sobre todos los valores posibles de X.",
          zh: "从 pmf 求期望，本质上就是对 X 的所有可能取值做加权平均。",
        },
        fullPath: [
          { en: "Write E[X]=Σ x p(x).", es: "Escribe E[X]=Σ x p(x).", zh: "先写 E[X]=Σ x p(x)。" },
          { en: "Substitute the three support values 0, 1, and 3.", es: "Sustituye los tres valores del soporte: 0, 1 y 3.", zh: "再代入三个支撑点 0、1、3。" },
          { en: "Add the weighted contributions 0(0.1)+1(0.4)+3(0.5).", es: "Suma las contribuciones ponderadas 0(0.1)+1(0.4)+3(0.5).", zh: "最后把加权项 0(0.1)+1(0.4)+3(0.5) 相加。" },
        ],
        answer: {
          en: "E[X]=0(0.1)+1(0.4)+3(0.5)=1.9",
          es: "E[X]=0(0.1)+1(0.4)+3(0.5)=1.9",
          zh: "E[X]=0(0.1)+1(0.4)+3(0.5)=1.9",
        },
        selfCheck: {
          en: "A pmf table turns directly into a weighted-average sum.",
          es: "Una tabla pmf se convierte directamente en una suma ponderada.",
          zh: "pmf 表格题，直接翻译成加权平均求和。",
        },
      },
    ],
  },

    "prob-linearity": {
    quiz: [
      {
        prompt: {
          en: "Do you need independence to write E[X+Y] = E[X] + E[Y]?",
          es: "¿Necesitas independencia para escribir E[X+Y] = E[X] + E[Y]?",
          zh: "写 E[X+Y] = E[X] + E[Y] 需要独立吗？",
        },
        firstStep: {
          en: "No. Split the expectation anyway.",
          es: "No. Divide la esperanza de todos modos.",
          zh: "不需要。直接拆开期望。",
        },
        setup: {
          en: "Linearity of expectation does not require independence.",
          es: "La linealidad de la esperanza no requiere independencia.",
          zh: "期望的线性不需要独立性。",
        },
        fullPath: [
          { en: "Look for a sum of random pieces.", es: "Busca una suma de piezas aleatorias.", zh: "先认出这是随机量的和。" },
          { en: "Split expectation across the plus sign.", es: "Separa la esperanza a través del signo más.", zh: "把期望沿着加号拆开。" },
          { en: "Only ask about independence if variance or distribution needs it.", es: "Solo pregunta por independencia si la varianza o la distribución la necesitan.", zh: "只有在方差或分布问题里才再去问独立性。" },
        ],
        answer: {
          en: "No independence needed.",
          es: "No hace falta independencia.",
          zh: "不需要独立。",
        },
        selfCheck: {
          en: "Expectation splits sums for free.",
          es: "La esperanza separa sumas gratis.",
          zh: "期望拆和是免费的。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A class has 12 students. Let Xi be 1 if student i is present and 0 otherwise. What is the clean setup for the expected number present?",
          es: "Una clase tiene 12 estudiantes. Sea Xi=1 si el estudiante i asiste y 0 si no. ¿Cual es el planteamiento limpio para el numero esperado de asistentes?",
          zh: "一个班有 12 个学生。设 Xi=1 表示第 i 个学生到课，否则 Xi=0。求到课人数期望的干净设法是什么？",
        },
        firstStep: {
          en: "Write the total as a sum of indicators and split expectation.",
          es: "Escribe el total como suma de indicadores y separa la esperanza.",
          zh: "先把总人数写成指标变量之和，再把期望拆开。",
        },
        setup: {
          en: "Linearity turns a messy total into many tiny one-student expectations.",
          es: "La linealidad convierte un total complicado en muchas esperanzas pequeñas de un estudiante.",
          zh: "线性性可以把一个复杂总数，拆成很多个单人小期望。",
        },
        fullPath: [
          { en: "Write X = X1 + ... + X12.", es: "Escribe X = X1 + ... + X12.", zh: "先写 X = X1 + ... + X12。" },
          { en: "Apply E[X] = E[X1] + ... + E[X12].", es: "Aplica E[X] = E[X1] + ... + E[X12].", zh: "再用 E[X] = E[X1] + ... + E[X12]。" },
          { en: "Replace each E[Xi] by P(student i is present).", es: "Sustituye cada E[Xi] por P(el estudiante i asiste).", zh: "最后把每个 E[Xi] 换成“第 i 个学生到课的概率”。" },
        ],
        answer: {
          en: "Use indicator variables and split the sum.",
          es: "Usa variables indicadoras y separa la suma.",
          zh: "用指标变量，把总和拆开。",
        },
        selfCheck: {
          en: "Expected counts often want indicators plus linearity.",
          es: "Los conteos esperados suelen querer indicadores mas linealidad.",
          zh: "期望计数题常常就是“指标变量 + 线性性”。",
        },
      },
    ],
  },

    "prob-variance": {
    quiz: [
      {
        prompt: {
          en: "Two random variables have the same expected value, but one is much more spread out. Which quantity captures that difference?",
          es: "Dos variables aleatorias tienen la misma esperanza, pero una está mucho más dispersa. ¿Qué cantidad capta esa diferencia?",
          zh: "两个随机变量期望相同，但其中一个分散得多。哪个量能体现这种差别？",
        },
        firstStep: {
          en: "Use variance.",
          es: "Usa la varianza.",
          zh: "看方差。",
        },
        setup: {
          en: "Variance measures spread around the mean, not the center itself.",
          es: "La varianza mide la dispersión alrededor de la media, no el centro en sí.",
          zh: "方差衡量的是围绕均值的分散程度，不是中心本身。",
        },
        fullPath: [
          { en: "Notice the means are already the same.", es: "Observa que las medias ya son iguales.", zh: "先注意均值已经一样。" },
          { en: "Ask which variable wanders farther from the mean.", es: "Pregunta cuál se aleja más de la media.", zh: "再问哪个变量离均值更远。" },
          { en: "That spread is what variance measures.", es: "Esa dispersión es lo que mide la varianza.", zh: "这种分散程度就是方差在衡量的东西。" },
        ],
        answer: {
          en: "Variance",
          es: "Varianza",
          zh: "方差",
        },
        selfCheck: {
          en: "Same mean, different spread -> compare variance.",
          es: "Misma media, distinta dispersión -> compara la varianza.",
          zh: "均值一样、分散不同 -> 看方差。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A discrete random variable has P(X=0)=1/2, P(X=1)=1/4, and P(X=3)=1/4. What is the clean setup for Var(X)?",
          es: "Una variable aleatoria discreta tiene P(X=0)=1/2, P(X=1)=1/4 y P(X=3)=1/4. ¿Cual es el planteamiento limpio para Var(X)?",
          zh: "一个离散随机变量满足 P(X=0)=1/2, P(X=1)=1/4, P(X=3)=1/4。求 Var(X) 的干净设法是什么？",
        },
        firstStep: {
          en: "Find E[X] and E[X^2], then use Var(X)=E[X^2]-(E[X])^2.",
          es: "Halla E[X] y E[X^2], y luego usa Var(X)=E[X^2]-(E[X])^2.",
          zh: "先求 E[X] 和 E[X^2]，再用 Var(X)=E[X^2]-(E[X])^2。",
        },
        setup: {
          en: "For a discrete table, variance is usually fastest through E[X^2] minus the square of the mean.",
          es: "Para una tabla discreta, la varianza suele salir mas rapido con E[X^2] menos el cuadrado de la media.",
          zh: "对离散分布表来说，方差通常最快的做法是先算 E[X^2]，再减去均值平方。",
        },
        fullPath: [
          { en: "Compute E[X] from value times probability.", es: "Calcula E[X] con valor por probabilidad.", zh: "先用“值乘概率”算 E[X]。" },
          { en: "Compute E[X^2] from squared value times probability.", es: "Calcula E[X^2] con valor al cuadrado por probabilidad.", zh: "再用“平方后的值乘概率”算 E[X^2]。" },
          { en: "Subtract (E[X])^2 from E[X^2].", es: "Resta (E[X])^2 a E[X^2].", zh: "最后用 E[X^2] 减去 (E[X])^2。" },
        ],
        answer: {
          en: "Use Var(X)=E[X^2]-(E[X])^2.",
          es: "Usa Var(X)=E[X^2]-(E[X])^2.",
          zh: "用 Var(X)=E[X^2]-(E[X])^2。",
        },
        selfCheck: {
          en: "Variance from a table is often easiest through E[X^2].",
          es: "La varianza desde una tabla suele salir mejor por E[X^2].",
          zh: "表格型方差题通常先想 E[X^2] 这条路。",
        },
      },
    ],
  },

    "prob-variance-sum": {
    quiz: [
      {
        prompt: {
          en: "When can you write Var(X+Y)=Var(X)+Var(Y) without extra covariance terms?",
          es: "¿Cuando puedes escribir Var(X+Y)=Var(X)+Var(Y) sin terminos extra de covarianza?",
          zh: "什么时候可以直接写 Var(X+Y)=Var(X)+Var(Y)，不用额外的协方差项？",
        },
        firstStep: {
          en: "Check independence first.",
          es: "Primero revisa la independencia.",
          zh: "先检查是否独立。",
        },
        setup: {
          en: "Variance only adds cleanly when dependence does not create cross terms.",
          es: "La varianza solo se suma limpiamente cuando la dependencia no crea terminos cruzados.",
          zh: "只有在没有相关交叉项时，方差才会干净地相加。",
        },
        fullPath: [
          { en: "Ask whether X and Y are independent.", es: "Pregunta si X y Y son independientes.", zh: "先问 X 和 Y 是否独立。" },
          { en: "If yes, the covariance term drops out.", es: "Si si, el termino de covarianza desaparece.", zh: "若独立，协方差项就会消失。" },
          { en: "Then add the two variances.", es: "Entonces suma las dos varianzas.", zh: "这时再把两个方差相加。" },
        ],
        answer: {
          en: "When X and Y are independent.",
          es: "Cuando X y Y son independientes.",
          zh: "当 X 和 Y 独立时。",
        },
        selfCheck: {
          en: "Expectation always adds. Variance needs independence or covariance handling.",
          es: "La esperanza siempre suma. La varianza necesita independencia o manejar covarianza.",
          zh: "期望总能相加；方差则要独立或处理协方差。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "X and Y are independent with Var(X)=4 and Var(Y)=9. What setup gives Var(X+Y)?",
          es: "X e Y son independientes con Var(X)=4 y Var(Y)=9. ¿Que planteamiento da Var(X+Y)?",
          zh: "X 与 Y 独立，且 Var(X)=4, Var(Y)=9。求 Var(X+Y) 时该怎么设？",
        },
        firstStep: {
          en: "Check independence, then drop the covariance term.",
          es: "Primero verifica independencia y luego elimina el termino de covarianza.",
          zh: "先确认独立，再把协方差项去掉。",
        },
        setup: {
          en: "The full rule is Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y). Independence kills the covariance term.",
          es: "La regla completa es Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y). La independencia mata el termino de covarianza.",
          zh: "完整公式是 Var(X+Y)=Var(X)+Var(Y)+2Cov(X,Y)。独立时协方差项会消失。",
        },
        fullPath: [
          { en: "Start from the full variance-of-a-sum formula.", es: "Empieza con la formula completa de varianza de una suma.", zh: "先从“和的方差”完整公式出发。" },
          { en: "Use independence to set Cov(X,Y)=0.", es: "Usa independencia para poner Cov(X,Y)=0.", zh: "由独立性可知 Cov(X,Y)=0。" },
          { en: "Then add the two variances: 4+9.", es: "Entonces suma las dos varianzas: 4+9.", zh: "再把两个方差相加：4+9。" },
        ],
        answer: {
          en: "Var(X+Y)=4+9=13",
          es: "Var(X+Y)=4+9=13",
          zh: "Var(X+Y)=4+9=13",
        },
        selfCheck: {
          en: "Variance of a sum is 'add + covariance'; independence removes the cross term.",
          es: "La varianza de una suma es 'suma + covarianza'; la independencia quita el termino cruzado.",
          zh: "和的方差 = 两个方差 + 协方差项；独立会删掉交叉项。",
        },
      },
    ],
  },

    "prob-distributions": {
    quiz: [
      {
        prompt: {
          en: "A problem says: fixed number of independent yes-no trials, same success chance, and asks for exactly k successes. What should you identify before any formula?",
          es: "Un problema dice: numero fijo de ensayos si-no independientes, misma probabilidad de exito, y pide exactamente k exitos. ¿Que debes identificar antes de cualquier formula?",
          zh: "题目说：固定次数、彼此独立、每次成功率相同，并要求“恰好 k 次成功”。套公式前先该认出什么？",
        },
        firstStep: {
          en: "Identify the story pattern first.",
          es: "Primero identifica el patron de la historia.",
          zh: "先认出题目的故事模型。",
        },
        setup: {
          en: "Most probability formula mistakes come from choosing the wrong model family.",
          es: "Muchos errores de formulas en probabilidad vienen de elegir la familia de modelo equivocada.",
          zh: "概率题很多公式错误，其实都不是算错，而是模型认错了。",
        },
        fullPath: [
          { en: "Ask what is being counted: one trial, total successes, wait time, or events in a window.", es: "Pregunta que se esta contando: un ensayo, total de exitos, tiempo de espera o eventos en una ventana.", zh: "先问题目到底在数什么：单次结果、成功总数、等待时间，还是一个区间里的事件个数。" },
          { en: "Match the story to the named family.", es: "Empareja la historia con la familia nombrada.", zh: "再把故事和分布家族对上。" },
          { en: "Only then choose the formula.", es: "Solo despues elige la formula.", zh: "最后才选公式。" },
        ],
        answer: {
          en: "Identify the distribution story first.",
          es: "Identifica primero la historia de la distribucion.",
          zh: "先认出分布故事。",
        },
        selfCheck: {
          en: "Story first, formula second.",
          es: "Primero la historia, despues la formula.",
          zh: "先认故事，再套公式。",
        },
      },
    ],
  },

    "prob-continuous-density": {
    quiz: [
      {
        prompt: {
          en: "A graph of f(x) is labeled as a density. If the question asks for P(1 <= X <= 3), what should you compute?",
          es: "Una grafica de f(x) esta etiquetada como densidad. Si la pregunta pide P(1 <= X <= 3), ¿que debes calcular?",
          zh: "一张 f(x) 的图被标成密度函数。若题目要求 P(1 <= X <= 3)，应该计算什么？",
        },
        firstStep: {
          en: "Compute area under the density on that interval.",
          es: "Calcula el area bajo la densidad en ese intervalo.",
          zh: "计算该区间下方的面积。",
        },
        setup: {
          en: "For continuous random variables, interval probability comes from area under the density curve.",
          es: "Para variables aleatorias continuas, la probabilidad en un intervalo viene del area bajo la curva de densidad.",
          zh: "对连续随机变量来说，区间概率来自密度曲线下的面积。",
        },
        fullPath: [
          { en: "Ignore exact-point probability thinking.", es: "Deja de lado la idea de probabilidad puntual exacta.", zh: "先别用离散那套“某一点的概率”去想。" },
          { en: "Focus on the interval [1,3].", es: "Enfocate en el intervalo [1,3].", zh: "把注意力放在区间 [1,3] 上。" },
          { en: "Integrate the density over that interval.", es: "Integra la densidad sobre ese intervalo.", zh: "把密度函数在这个区间上积分。" },
        ],
        answer: {
          en: "Area under f(x) from 1 to 3.",
          es: "Area bajo f(x) de 1 a 3.",
          zh: "f(x) 从 1 到 3 下方的面积。",
        },
        selfCheck: {
          en: "Continuous probability lives in interval area.",
          es: "La probabilidad continua vive en el area de intervalos.",
          zh: "连续概率看的是区间面积。",
        },
      },
    ],
  },

    "prob-bernoulli-pattern": {
    quiz: [
      {
        prompt: {
          en: "One customer either buys or does not buy. If X=1 for buy and X=0 for no buy, what model is this?",
          es: "Un cliente compra o no compra. Si X=1 para compra y X=0 para no compra, ¿que modelo es este?",
          zh: "一个顾客要么购买，要么不购买。若 X=1 表示购买、X=0 表示不购买，这是什么模型？",
        },
        firstStep: {
          en: "Check whether this is just one success-failure trial.",
          es: "Revisa si esto es solo un ensayo exito-fracaso.",
          zh: "先看这是不是只有一次成败试验。",
        },
        setup: {
          en: "Bernoulli is the one-trial 0-1 model.",
          es: "Bernoulli es el modelo 0-1 de un solo ensayo.",
          zh: "Bernoulli 就是单次 0-1 成败模型。",
        },
        fullPath: [
          { en: "There is only one trial.", es: "Solo hay un ensayo.", zh: "这里只有一次试验。" },
          { en: "The output is coded as 0 or 1.", es: "La salida se codifica como 0 o 1.", zh: "输出被编码成 0 或 1。" },
          { en: "That is exactly the Bernoulli pattern.", es: "Eso es exactamente el patron Bernoulli.", zh: "这正是 Bernoulli 的典型形状。" },
        ],
        answer: {
          en: "Bernoulli",
          es: "Bernoulli",
          zh: "Bernoulli",
        },
        selfCheck: {
          en: "One trial, two outcomes, 0-1 coding -> Bernoulli.",
          es: "Un ensayo, dos resultados, codificacion 0-1 -> Bernoulli.",
          zh: "一次试验、两个结果、0-1 编码 -> Bernoulli。",
        },
      },
    ],
  },

    "prob-binomial": {
    quiz: [
      {
        prompt: {
          en: "A quiz has 8 true-false questions. If a student guesses every time, what model fits the number of correct answers?",
          es: "Un quiz tiene 8 preguntas de verdadero-falso. Si un estudiante adivina siempre, ¿que modelo encaja con el numero de aciertos?",
          zh: "一张测验有 8 道判断题。若学生每题都瞎猜，正确题数服从什么模型？",
        },
        firstStep: {
          en: "Check fixed trial count, same p, and success count.",
          es: "Revisa numero fijo de ensayos, misma p y conteo de exitos.",
          zh: "先看是不是固定次数、相同成功率、并且在数成功个数。",
        },
        setup: {
          en: "Binomial counts successes across a fixed number of independent Bernoulli trials.",
          es: "Binomial cuenta exitos a lo largo de un numero fijo de ensayos Bernoulli independientes.",
          zh: "二项分布是在固定次数的独立 Bernoulli 试验里统计成功个数。",
        },
        fullPath: [
          { en: "There are 8 trials total.", es: "Hay 8 ensayos en total.", zh: "总共有 8 次试验。" },
          { en: "Each trial has the same success chance 1/2.", es: "Cada ensayo tiene la misma probabilidad de exito 1/2.", zh: "每次成功概率都相同，都是 1/2。" },
          { en: "The variable counts how many successes occur.", es: "La variable cuenta cuantos exitos ocurren.", zh: "随机变量统计的是成功次数。" },
        ],
        answer: {
          en: "Binomial",
          es: "Binomial",
          zh: "二项分布",
        },
        selfCheck: {
          en: "Fixed tries plus count successes -> binomial.",
          es: "Intentos fijos mas contar exitos -> binomial.",
          zh: "固定次数 + 数成功个数 -> 二项分布。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A machine makes 20 parts. Each part is defective with probability 0.03 independently. What setup gives the probability of exactly 2 defectives?",
          es: "Una maquina fabrica 20 piezas. Cada pieza es defectuosa con probabilidad 0.03 de forma independiente. ¿Que planteamiento da la probabilidad de exactamente 2 defectuosas?",
          zh: "一台机器生产 20 个零件。每个零件独立地以 0.03 的概率次品。求恰好 2 个次品的设法是什么？",
        },
        firstStep: {
          en: "Write a binomial model with n=20, p=0.03, k=2.",
          es: "Escribe un modelo binomial con n=20, p=0.03, k=2.",
          zh: "先写二项模型，n=20, p=0.03, k=2。",
        },
        setup: {
          en: "This is fixed count, independent trials, same defect probability, and exact success count.",
          es: "Aqui hay numero fijo, ensayos independientes, misma probabilidad de defecto y conteo exacto de exitos.",
          zh: "这题同时满足固定次数、独立、相同概率、以及“恰好 k 次成功”的四个条件。",
        },
        fullPath: [
          { en: "Let X be the number of defectives in 20 parts.", es: "Sea X el numero de defectuosas en 20 piezas.", zh: "设 X 表示 20 个零件中的次品数。" },
          { en: "Then X ~ Bin(20, 0.03).", es: "Entonces X ~ Bin(20, 0.03).", zh: "则 X ~ Bin(20, 0.03)。" },
          { en: "The desired probability is P(X=2).", es: "La probabilidad pedida es P(X=2).", zh: "所求就是 P(X=2)。" },
        ],
        answer: {
          en: "Use X ~ Bin(20,0.03) and compute P(X=2).",
          es: "Usa X ~ Bin(20,0.03) y calcula P(X=2).",
          zh: "用 X ~ Bin(20,0.03)，然后求 P(X=2)。",
        },
        selfCheck: {
          en: "If n is fixed and you count successes, binomial is usually first.",
          es: "Si n es fijo y cuentas exitos, binomial suele ser la primera opcion.",
          zh: "只要 n 固定，而且在数成功次数，通常先想二项分布。",
        },
      },
    ],
  },

    "prob-geometric": {
    quiz: [
      {
        prompt: {
          en: "A basketball player keeps shooting until the first make. What model fits the trial number of the first make?",
          es: "Un jugador de baloncesto sigue tirando hasta el primer enceste. ¿Que modelo encaja con el numero de tiro del primer acierto?",
          zh: "一名球员不断投篮直到第一次投进。第一次命中出现在第几次，服从什么模型？",
        },
        firstStep: {
          en: "Check whether the story is waiting for the first success.",
          es: "Revisa si la historia espera al primer exito.",
          zh: "先看这是不是“等到第一次成功”为止。",
        },
        setup: {
          en: "Geometric is the waiting-time model for the first success in repeated independent trials.",
          es: "Geometrica es el modelo de espera hasta el primer exito en ensayos repetidos e independientes.",
          zh: "几何分布就是在重复独立试验里等待第一次成功所用的模型。",
        },
        fullPath: [
          { en: "The process does not stop after a fixed n.", es: "El proceso no se detiene despues de un n fijo.", zh: "题目并不是固定做 n 次。" },
          { en: "It stops as soon as the first success happens.", es: "Se detiene apenas ocurre el primer exito.", zh: "它在第一次成功出现时就停止。" },
          { en: "That is the geometric story.", es: "Esa es la historia geometrica.", zh: "这就是几何分布的故事。" },
        ],
        answer: {
          en: "Geometric",
          es: "Geometrica",
          zh: "几何分布",
        },
        selfCheck: {
          en: "Wait for the first success -> geometric.",
          es: "Esperar el primer exito -> geometrica.",
          zh: "等第一次成功 -> 几何分布。",
        },
      },
    ],
  },

    "prob-poisson": {
    quiz: [
      {
        prompt: {
          en: "A website gets an average of 4 support emails per hour. What model fits the number of emails in the next hour?",
          es: "Un sitio recibe en promedio 4 correos de soporte por hora. ¿Que modelo encaja con el numero de correos en la proxima hora?",
          zh: "某网站平均每小时收到 4 封客服邮件。下一小时邮件数服从什么模型？",
        },
        firstStep: {
          en: "Check whether this is a count in a time window with an average rate.",
          es: "Revisa si esto es un conteo en una ventana de tiempo con una tasa promedio.",
          zh: "先看是不是“固定时间窗口里的事件个数”，并且给了平均速率。",
        },
        setup: {
          en: "Poisson counts arrivals in a fixed window when a rate is given.",
          es: "Poisson cuenta llegadas en una ventana fija cuando se da una tasa.",
          zh: "Poisson 分布用来统计固定窗口内按平均速率到来的事件个数。",
        },
        fullPath: [
          { en: "The variable is a count, not a wait time.", es: "La variable es un conteo, no un tiempo de espera.", zh: "随机变量数的是个数，不是等待时间。" },
          { en: "The count is taken over one fixed hour.", es: "El conteo se toma sobre una hora fija.", zh: "这个个数是在固定的一小时窗口里统计的。" },
          { en: "That matches the Poisson pattern with rate 4.", es: "Eso coincide con el patron Poisson con tasa 4.", zh: "这正符合参数为 4 的 Poisson 故事。" },
        ],
        answer: {
          en: "Poisson with rate 4",
          es: "Poisson con tasa 4",
          zh: "参数为 4 的 Poisson 分布",
        },
        selfCheck: {
          en: "Count in a window -> Poisson.",
          es: "Conteo en una ventana -> Poisson.",
          zh: "窗口里数事件 -> Poisson。",
        },
      },
    ],
  },

    "prob-uniform-continuous": {
    quiz: [
      {
        prompt: {
          en: "A random point is chosen uniformly on the interval [2,10]. What geometric idea should drive P(4 <= X <= 7)?",
          es: "Se elige un punto al azar de manera uniforme en el intervalo [2,10]. ¿Que idea geometrica debe guiar P(4 <= X <= 7)?",
          zh: "在区间 [2,10] 上均匀随机选一点。求 P(4 <= X <= 7) 时，核心几何想法是什么？",
        },
        firstStep: {
          en: "Use interval length over total length.",
          es: "Usa longitud del intervalo sobre longitud total.",
          zh: "用“区间长度 ÷ 总长度”。",
        },
        setup: {
          en: "Continuous uniform probability is flat, so probability becomes a length ratio.",
          es: "La probabilidad uniforme continua es plana, asi que la probabilidad se vuelve una razon de longitudes.",
          zh: "连续均匀分布的密度是平的，所以概率就变成长度比。",
        },
        fullPath: [
          { en: "Find the target interval length: 7-4.", es: "Halla la longitud del intervalo objetivo: 7-4.", zh: "先求目标区间长度：7-4。" },
          { en: "Find the total interval length: 10-2.", es: "Halla la longitud total: 10-2.", zh: "再求总区间长度：10-2。" },
          { en: "Take target length over total length.", es: "Toma longitud objetivo sobre longitud total.", zh: "最后用目标长度除以总长度。" },
        ],
        answer: {
          en: "Use length ratio: (7-4)/(10-2).",
          es: "Usa razon de longitudes: (7-4)/(10-2).",
          zh: "用长度比：(7-4)/(10-2)。",
        },
        selfCheck: {
          en: "Flat interval model -> probability is length over length.",
          es: "Modelo plano en intervalo -> probabilidad es longitud sobre longitud.",
          zh: "平坦区间模型 -> 概率就是长度比。",
        },
      },
    ],
  },

    "prob-exponential": {
    quiz: [
      {
        prompt: {
          en: "Customers arrive at a constant average rate. What model fits the waiting time until the next customer?",
          es: "Los clientes llegan a una tasa promedio constante. ¿Que modelo encaja con el tiempo de espera hasta el siguiente cliente?",
          zh: "顾客以恒定平均速率到来。等到下一位顾客的等待时间服从什么模型？",
        },
        firstStep: {
          en: "Decide whether the variable is a count or a wait.",
          es: "Decide si la variable es un conteo o una espera.",
          zh: "先分清楚随机变量是在数个数，还是在量等待时间。",
        },
        setup: {
          en: "Poisson counts events in a window. Exponential measures time until the next one.",
          es: "Poisson cuenta eventos en una ventana. Exponencial mide el tiempo hasta el siguiente.",
          zh: "Poisson 数的是窗口里的事件个数；指数分布量的是到下一个事件的等待时间。",
        },
        fullPath: [
          { en: "The story asks how long until the next arrival.", es: "La historia pregunta cuanto falta hasta la siguiente llegada.", zh: "题目问的是还要等多久才来下一个。" },
          { en: "That is a waiting-time variable, not a count variable.", es: "Eso es una variable de espera, no de conteo.", zh: "这是等待时间变量，不是计数变量。" },
          { en: "So exponential is the right family.", es: "Asi que la familia correcta es exponencial.", zh: "所以该用指数分布。" },
        ],
        answer: {
          en: "Exponential",
          es: "Exponencial",
          zh: "指数分布",
        },
        selfCheck: {
          en: "Poisson counts, exponential waits.",
          es: "Poisson cuenta, exponencial espera.",
          zh: "Poisson 数个数，指数分布等时间。",
        },
      },
    ],
  },

    "prob-normal-pattern": {
    quiz: [
      {
        prompt: {
          en: "A measurement is modeled by a bell curve with mean 70 and standard deviation 8. Are point probabilities or interval areas the main object?",
          es: "Una medicion se modela con una curva de campana de media 70 y desviacion estandar 8. ¿Lo principal son probabilidades puntuales o areas de intervalos?",
          zh: "某测量值服从均值 70、标准差 8 的钟形曲线。这里主要看的是点概率，还是区间面积？",
        },
        firstStep: {
          en: "Treat it as a continuous interval-area model.",
          es: "Tratalo como un modelo continuo de areas por intervalos.",
          zh: "先把它当成连续模型，概率看区间面积。",
        },
        setup: {
          en: "Normal distribution is continuous, so probability comes from area under the bell curve.",
          es: "La distribucion normal es continua, asi que la probabilidad viene del area bajo la campana.",
          zh: "正态分布是连续分布，所以概率来自钟形曲线下的面积。",
        },
        fullPath: [
          { en: "Notice the variable is continuous.", es: "Observa que la variable es continua.", zh: "先认出它是连续变量。" },
          { en: "Continuous models give 0 probability to one exact point.", es: "Los modelos continuos dan probabilidad 0 a un punto exacto.", zh: "连续模型对单个精确点的概率是 0。" },
          { en: "So you compute interval areas, often after standardizing.", es: "Entonces calculas areas de intervalos, a menudo tras estandarizar.", zh: "因此真正要算的是区间面积，常常还要先标准化。" },
        ],
        answer: {
          en: "Interval areas under the bell curve.",
          es: "Areas de intervalos bajo la curva de campana.",
          zh: "看钟形曲线下的区间面积。",
        },
        selfCheck: {
          en: "Normal model -> bell curve area, not point mass.",
          es: "Modelo normal -> area bajo la campana, no masa puntual.",
          zh: "正态模型 -> 看面积，不看点质量。",
        },
      },
    ],
  },

    "prob-negative-binomial": {
    quiz: [
      {
        prompt: {
          en: "A batter keeps taking swings until the 3rd hit. What model fits the total number of swings?",
          es: "Un bateador sigue haciendo swings hasta el tercer hit. ¿Que modelo encaja con el numero total de swings?",
          zh: "一名击球手一直挥棒，直到第 3 次击中。总挥棒次数服从什么模型？",
        },
        firstStep: {
          en: "Ask whether you are waiting for the r-th success, not just the first.",
          es: "Pregunta si estas esperando el exito numero r, no solo el primero.",
          zh: "先看是不是在等第 r 次成功，而不是第一次成功。",
        },
        setup: {
          en: "Negative binomial counts total trials until success number r arrives.",
          es: "La binomial negativa cuenta ensayos totales hasta que llega el exito numero r.",
          zh: "负二项分布统计的是：为了等到第 r 次成功，总共做了多少次试验。",
        },
        fullPath: [
          { en: "This is a waiting story, not a fixed-n counting story.", es: "Es una historia de espera, no de conteo con n fijo.", zh: "这是一道等待题，不是固定 n 次里的计数题。" },
          { en: "The stop rule is the 3rd success, not the 1st.", es: "La regla de parada es el 3er exito, no el 1ro.", zh: "停止条件是第 3 次成功，不是第 1 次。" },
          { en: "That makes it negative binomial.", es: "Eso la convierte en binomial negativa.", zh: "所以它属于负二项分布。" },
        ],
        answer: {
          en: "Negative binomial",
          es: "Binomial negativa",
          zh: "负二项分布",
        },
        selfCheck: {
          en: "Wait for success number r -> negative binomial.",
          es: "Esperar el exito numero r -> binomial negativa.",
          zh: "等第 r 次成功 -> 负二项分布。",
        },
      },
    ],
  },

    "prob-hypergeometric": {
    quiz: [
      {
        prompt: {
          en: "You draw 5 cards from a deck without replacement and count how many are hearts. What model should you think first?",
          es: "Sacas 5 cartas de una baraja sin reemplazo y cuentas cuantas son corazones. ¿Que modelo debes pensar primero?",
          zh: "从一副牌里不放回抽 5 张，并统计其中有几张红桃。第一反应该想什么模型？",
        },
        firstStep: {
          en: "Check whether the sample is without replacement.",
          es: "Revisa si la muestra es sin reemplazo.",
          zh: "先确认是不是不放回抽样。",
        },
        setup: {
          en: "Hypergeometric is the success-count model for draws without replacement from a finite pool.",
          es: "La hipergeometrica es el modelo de conteo de exitos para extracciones sin reemplazo de un conjunto finito.",
          zh: "超几何分布就是有限总体中不放回抽样时的成功计数模型。",
        },
        fullPath: [
          { en: "You are counting successes in a sample.", es: "Estas contando exitos dentro de una muestra.", zh: "这里是在样本中统计成功个数。" },
          { en: "But the population changes after each draw.", es: "Pero la poblacion cambia despues de cada extraccion.", zh: "但每抽一次，总体都会变化。" },
          { en: "That breaks independence and points to hypergeometric.", es: "Eso rompe la independencia y apunta a hipergeometrica.", zh: "这破坏了独立性，所以该用超几何分布。" },
        ],
        answer: {
          en: "Hypergeometric",
          es: "Hipergeometrica",
          zh: "超几何分布",
        },
        selfCheck: {
          en: "Without replacement -> hypergeometric, not binomial.",
          es: "Sin reemplazo -> hipergeometrica, no binomial.",
          zh: "不放回 -> 超几何，不是二项。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "An urn has 7 red and 5 blue balls. Three are drawn without replacement. What setup gives the probability of exactly 2 red balls?",
          es: "Una urna tiene 7 bolas rojas y 5 azules. Se extraen 3 sin reemplazo. ¿Que planteamiento da la probabilidad de exactamente 2 rojas?",
          zh: "一个盒子里有 7 个红球和 5 个蓝球，不放回地抽 3 个。求恰好 2 个红球的设法是什么？",
        },
        firstStep: {
          en: "Use hypergeometric counting: choose successes and choose failures.",
          es: "Usa el conteo hipergeometrico: elige exitos y elige fracasos.",
          zh: "用超几何计数：先选成功，再选失败。",
        },
        setup: {
          en: "Without replacement means you count favorable samples from a finite population and divide by all samples of that size.",
          es: "Sin reemplazo significa que cuentas muestras favorables de una poblacion finita y divides entre todas las muestras de ese tamaño.",
          zh: "不放回意味着要在有限总体里数有利样本，再除以所有同样大小的样本数。",
        },
        fullPath: [
          { en: "Choose 2 red from the 7 red balls.", es: "Elige 2 rojas entre las 7 rojas.", zh: "先从 7 个红球里选 2 个。" },
          { en: "Choose 1 blue from the 5 blue balls.", es: "Elige 1 azul entre las 5 azules.", zh: "再从 5 个蓝球里选 1 个。" },
          { en: "Divide by the number of all 3-ball samples from 12 balls.", es: "Divide por el numero de todas las muestras de 3 bolas tomadas de 12.", zh: "最后除以从 12 个球里任取 3 个的总样本数。" },
        ],
        answer: {
          en: "C(7,2)C(5,1) / C(12,3)",
          es: "C(7,2)C(5,1) / C(12,3)",
          zh: "C(7,2)C(5,1) / C(12,3)",
        },
        selfCheck: {
          en: "Hypergeometric setup = choose good, choose not-good, divide by all samples.",
          es: "Planteamiento hipergeometrico = elige favorables, elige no favorables, divide entre todas las muestras.",
          zh: "超几何设法 = 选成功、选非成功，再除以总样本数。",
        },
      },
    ],
  },

    "prob-normal-approximation": {
    quiz: [
      {
        prompt: {
          en: "A binomial count has large n and is not too skewed. What shortcut model should you test before doing a long exact sum?",
          es: "Un conteo binomial tiene n grande y no esta muy sesgado. ¿Que modelo atajo debes probar antes de hacer una suma exacta larga?",
          zh: "某个二项计数里 n 很大，而且不太偏。真正做一长串精确求和前，应该先试哪个近似模型？",
        },
        firstStep: {
          en: "Try a normal approximation.",
          es: "Prueba una aproximacion normal.",
          zh: "先试正态近似。",
        },
        setup: {
          en: "Large binomial models often behave like a bell curve, so a normal approximation can replace the exact count model.",
          es: "Los modelos binomiales grandes suelen comportarse como una campana, asi que una aproximacion normal puede reemplazar el modelo exacto.",
          zh: "大样本二项分布常会长得像钟形，所以可以先用正态分布来近似。",
        },
        fullPath: [
          { en: "Start from a binomial story.", es: "Empieza con una historia binomial.", zh: "先认出原题是二项故事。" },
          { en: "Check that n is large enough and the shape is not too skewed.", es: "Verifica que n sea suficientemente grande y que la forma no sea demasiado sesgada.", zh: "再确认 n 够大，而且分布形状没有严重偏斜。" },
          { en: "Then switch to a normal model with matched center and spread.", es: "Luego cambia a un modelo normal con el mismo centro y dispersion.", zh: "最后换成中心和离散度匹配的正态模型。" },
        ],
        answer: {
          en: "Normal approximation to the binomial",
          es: "Aproximacion normal a la binomial",
          zh: "二项分布的正态近似",
        },
        selfCheck: {
          en: "Large, not-too-skewed binomial -> normal approximation.",
          es: "Binomial grande y no muy sesgada -> aproximacion normal.",
          zh: "样本大、偏斜不重的二项 -> 正态近似。",
        },
      },
    ],
  },

    "prob-conditional-distribution": {
    quiz: [
      {
        prompt: {
          en: "A joint table is given, and the problem asks for the distribution of X after you are told Y=2. What should you do first?",
          es: "Se da una tabla conjunta, y el problema pide la distribucion de X despues de saber que Y=2. ¿Que debes hacer primero?",
          zh: "题目给了一张联合分布表，并问在已知 Y=2 后 X 的分布。第一步该做什么？",
        },
        firstStep: {
          en: "Freeze the row or column for Y=2, then renormalize inside that slice.",
          es: "Congela la fila o columna de Y=2 y luego renormaliza dentro de ese corte.",
          zh: "先把 Y=2 那一行或一列固定住，再在那一片里重新归一化。",
        },
        setup: {
          en: "Conditional distribution means the old joint world shrinks to the slice where the condition is true.",
          es: "Distribucion condicional significa que el viejo mundo conjunto se reduce al corte donde la condicion es cierta.",
          zh: "条件分布的意思是：原来的联合世界被缩小到满足条件的那一片。",
        },
        fullPath: [
          { en: "Locate the slice where Y=2.", es: "Ubica el corte donde Y=2.", zh: "先找出 Y=2 对应的那一片。" },
          { en: "Read the X-values only inside that slice.", es: "Lee los valores de X solo dentro de ese corte.", zh: "只看这片里面 X 的概率。" },
          { en: "Rescale so the conditional probabilities add to 1.", es: "Reescala para que las probabilidades condicionales sumen 1.", zh: "再重新归一化，使这些条件概率加起来等于 1。" },
        ],
        answer: {
          en: "Slice first, then renormalize.",
          es: "Primero corta, luego renormaliza.",
          zh: "先切片，再归一化。",
        },
        selfCheck: {
          en: "Conditioning shrinks the world before it changes the numbers.",
          es: "Condicionar encoge el mundo antes de cambiar los numeros.",
          zh: "条件化先缩小世界，再改概率数字。",
        },
      },
    ],
  },

    "prob-conditional-expectation": {
    quiz: [
      {
        prompt: {
          en: "If you know Y already, what does E[X|Y] represent in plain language?",
          es: "Si ya conoces Y, ¿que representa E[X|Y] en lenguaje sencillo?",
          zh: "如果 Y 已经知道了，E[X|Y] 用大白话是什么意思？",
        },
        firstStep: {
          en: "Read it as the average value of X after the new information arrives.",
          es: "Leelo como el valor promedio de X despues de que llega la nueva informacion.",
          zh: "把它读成：在新信息到来后，X 的平均值。",
        },
        setup: {
          en: "Conditional expectation is the best average guess once the condition is known.",
          es: "La esperanza condicional es la mejor conjetura promedio una vez conocida la condicion.",
          zh: "条件期望就是在条件已知后，对 X 的最佳平均预测。",
        },
        fullPath: [
          { en: "Start with the extra information Y.", es: "Empieza con la informacion extra Y.", zh: "先把额外信息 Y 放进来。" },
          { en: "Restrict attention to the world consistent with that information.", es: "Restringe la atencion al mundo consistente con esa informacion.", zh: "把注意力限制在与这条信息一致的世界里。" },
          { en: "Average X inside that smaller world.", es: "Promedia X dentro de ese mundo mas pequeño.", zh: "再在这个缩小后的世界里取 X 的平均。" },
        ],
        answer: {
          en: "The average of X after learning Y.",
          es: "El promedio de X despues de conocer Y.",
          zh: "知道 Y 之后，X 的平均值。",
        },
        selfCheck: {
          en: "Condition first, then average.",
          es: "Primero condiciona, luego promedia.",
          zh: "先条件化，再取平均。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A random payout X equals 10 if a coin is heads and 2 if tails. If Y records whether the coin landed heads, what is E[X|Y=1]?",
          es: "Un pago aleatorio X vale 10 si una moneda sale cara y 2 si sale cruz. Si Y registra si la moneda salio cara, ¿que es E[X|Y=1]?",
          zh: "随机收益 X 在硬币为正面时取 10，反面时取 2。若 Y 记录硬币是否为正面，则 E[X|Y=1] 等于多少？",
        },
        firstStep: {
          en: "Freeze the conditioned world Y=1 and average only there.",
          es: "Congela el mundo condicionado Y=1 y promedia solo ahi.",
          zh: "先把世界固定在 Y=1，再只在这个世界里取平均。",
        },
        setup: {
          en: "Conditional expectation is just the average inside the world where the condition is true.",
          es: "La esperanza condicional es simplemente el promedio dentro del mundo donde la condicion es cierta.",
          zh: "条件期望本质上就是：在条件成立的那个世界里再取平均。",
        },
        fullPath: [
          { en: "Y=1 means the coin landed heads.", es: "Y=1 significa que la moneda salio cara.", zh: "Y=1 表示硬币落在正面。" },
          { en: "Inside that world, X is not random anymore: it equals 10.", es: "Dentro de ese mundo, X ya no es aleatoria: vale 10.", zh: "在这个世界里，X 已经不再随机，而是固定等于 10。" },
          { en: "So the conditional average is 10.", es: "Asi que el promedio condicional es 10.", zh: "所以条件平均值就是 10。" },
        ],
        answer: {
          en: "10",
          es: "10",
          zh: "10",
        },
        selfCheck: {
          en: "Once the condition pins X down, the conditional expectation is that pinned value.",
          es: "Una vez que la condicion fija a X, la esperanza condicional es ese valor fijo.",
          zh: "一旦条件把 X 钉死，条件期望就是那个固定值。",
        },
      },
    ],
  },

    "prob-poisson-approximation": {
    quiz: [
      {
        prompt: {
          en: "A factory makes 5000 chips, each failing independently with probability 0.0008. Which approximation should you try first for the number of failed chips?",
          es: "Una fabrica produce 5000 chips, cada uno falla independientemente con probabilidad 0.0008. ¿Que aproximacion debes intentar primero para el numero de chips fallados?",
          zh: "一家工厂生产 5000 个芯片，每个芯片独立地以 0.0008 的概率失效。要求失效芯片数时，应先试哪个近似？",
        },
        firstStep: {
          en: "Try a Poisson approximation with lambda=np.",
          es: "Prueba una aproximacion Poisson con lambda=np.",
          zh: "先试 Poisson 近似，参数取 lambda=np。",
        },
        setup: {
          en: "Many trials with tiny p and moderate np is the standard Poisson-approximation trigger.",
          es: "Muchos ensayos con p pequeña y np moderado es el disparador clasico de la aproximacion Poisson.",
          zh: "大量试验、极小 p、而 np 仍适中，是 Poisson 近似的经典触发条件。",
        },
        fullPath: [
          { en: "Start from the binomial story: many independent success-failure trials.", es: "Empieza con la historia binomial: muchos ensayos independientes de exito-fracaso.", zh: "先认出它本来是一个二项故事：很多独立成败试验。" },
          { en: "Notice p is tiny and n is huge.", es: "Observa que p es pequeñisima y n es enorme.", zh: "再注意 p 很小而 n 很大。" },
          { en: "Replace with Poisson using lambda=np.", es: "Sustituye por Poisson usando lambda=np.", zh: "然后用 lambda=np 换成 Poisson 模型。" },
        ],
        answer: {
          en: "Poisson approximation with lambda = 5000(0.0008) = 4",
          es: "Aproximacion Poisson con lambda = 5000(0.0008) = 4",
          zh: "Poisson 近似，lambda = 5000(0.0008) = 4",
        },
        selfCheck: {
          en: "Many and rare -> Poisson with lambda=np.",
          es: "Muchos y raros -> Poisson con lambda=np.",
          zh: "多而稀少 -> 用 lambda=np 的 Poisson 近似。",
        },
      },
    ],
  },

    "prob-bayes": {
    quiz: [
      {
        prompt: {
          en: "A test is positive. Should your first setup be Bayes or total probability?",
          es: "Una prueba sale positiva. ¿Tu primer planteamiento debe ser Bayes o probabilidad total?",
          zh: "已知检测结果为阳性。第一反应该是贝叶斯，还是全概率？",
        },
        firstStep: {
          en: "If the question asks for the hidden cause after the result, start with Bayes.",
          es: "Si la pregunta pide la causa escondida después del resultado, empieza con Bayes.",
          zh: "如果题目是在结果已知后反问背后的原因，先想贝叶斯。",
        },
        setup: {
          en: "Bayes flips the condition from result-given-cause to cause-given-result.",
          es: "Bayes invierte la condición: de resultado-dada-causa a causa-dado-resultado.",
          zh: "贝叶斯是在把条件方向从“已知原因看结果”翻成“已知结果找原因”。",
        },
        fullPath: [
          { en: "Identify the hidden cause event A and the observed result B.", es: "Identifica la causa escondida A y el resultado observado B.", zh: "先标出隐藏原因事件 A 和已观察到的结果 B。" },
          { en: "Write P(A|B) = P(B|A)P(A)/P(B).", es: "Escribe P(A|B) = P(B|A)P(A)/P(B).", zh: "写出 P(A|B) = P(B|A)P(A)/P(B)。" },
          { en: "Fill in P(B) with total probability if needed.", es: "Si hace falta, completa P(B) con probabilidad total.", zh: "如果分母还没出来，就再用全概率补上 P(B)。" },
        ],
        answer: {
          en: "Start with Bayes.",
          es: "Empieza con Bayes.",
          zh: "先用贝叶斯。",
        },
        selfCheck: {
          en: "Known result, hidden cause = Bayes.",
          es: "Resultado conocido, causa escondida = Bayes.",
          zh: "结果已知、原因未知 = 贝叶斯。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Three factories make 20%, 30%, and 50% of all chips. Their defect rates are 1%, 2%, and 4%. A chip is defective. What setup gives the probability it came from factory 3?",
          es: "Tres fabricas producen el 20%, 30% y 50% de todos los chips. Sus tasas de defecto son 1%, 2% y 4%. Un chip sale defectuoso. ¿Que planteamiento da la probabilidad de que venga de la fabrica 3?",
          zh: "三家工厂分别生产全部芯片的 20%、30%、50%，次品率分别是 1%、2%、4%。现知某芯片是次品。求它来自第 3 家工厂的设法是什么？",
        },
        firstStep: {
          en: "Write Bayes with factory 3 in the numerator and total defect probability in the denominator.",
          es: "Escribe Bayes con la fabrica 3 en el numerador y la probabilidad total de defecto en el denominador.",
          zh: "先写贝叶斯：分子放“工厂 3 且次品”，分母放总次品概率。",
        },
        setup: {
          en: "This is hidden-source after observed-result, so Bayes is the main move and total probability builds the denominator.",
          es: "Esto es fuente escondida despues de resultado observado, asi que Bayes es el movimiento principal y probabilidad total arma el denominador.",
          zh: "这是“结果已知、来源未知”的题型，所以主招是贝叶斯，分母再靠全概率展开。",
        },
        fullPath: [
          { en: "Let Fi be 'made by factory i' and D be 'defective'.", es: "Sea Fi = 'hecho por la fabrica i' y D = 'defectuoso'.", zh: "设 Fi 表示“来自第 i 家工厂”，D 表示“次品”。" },
          { en: "Write P(F3|D)=P(D|F3)P(F3)/P(D).", es: "Escribe P(F3|D)=P(D|F3)P(F3)/P(D).", zh: "写出 P(F3|D)=P(D|F3)P(F3)/P(D)。" },
          { en: "Expand P(D)=P(D|F1)P(F1)+P(D|F2)P(F2)+P(D|F3)P(F3).", es: "Expande P(D)=P(D|F1)P(F1)+P(D|F2)P(F2)+P(D|F3)P(F3).", zh: "再展开 P(D)=P(D|F1)P(F1)+P(D|F2)P(F2)+P(D|F3)P(F3)。" },
        ],
        answer: {
          en: "Use Bayes with denominator from total probability.",
          es: "Usa Bayes con denominador sacado por probabilidad total.",
          zh: "用贝叶斯，分母再用全概率展开。",
        },
        selfCheck: {
          en: "Known outcome, unknown source -> Bayes. Multiple sources -> total probability in the denominator.",
          es: "Resultado conocido, fuente desconocida -> Bayes. Multiples fuentes -> probabilidad total en el denominador.",
          zh: "结果已知、来源未知 -> 贝叶斯。来源不止一个 -> 分母用全概率。",
        },
      },
    ],
    final: [
      {
        prompt: {
          en: "A disease has prevalence 1%. A test has sensitivity 95% and false positive rate 10%. Find P(disease | positive).",
          es: "Una enfermedad tiene prevalencia del 1%. Una prueba tiene sensibilidad del 95% y tasa de falso positivo del 10%. Halla P(enfermedad | positivo).",
          zh: "某疾病患病率为 1%。某检测的灵敏度为 95%，假阳性率为 10%。求 P(有病 | 阳性)。",
        },
        firstStep: {
          en: "Write Bayes with disease in the numerator and all positive paths in the denominator.",
          es: "Escribe Bayes con enfermedad en el numerador y todos los caminos positivos en el denominador.",
          zh: "先写贝叶斯：分子放“有病且阳性”，分母放所有导致阳性的路径。",
        },
        setup: {
          en: "Use prevalence for P(D), sensitivity for P(+|D), and false positive rate for P(+|D^c).",
          es: "Usa la prevalencia para P(D), la sensibilidad para P(+|D) y la tasa de falso positivo para P(+|D^c).",
          zh: "把患病率当作 P(D)，灵敏度当作 P(+|D)，假阳性率当作 P(+|D^c)。",
        },
        fullPath: [
          { en: "P(D|+) = P(+|D)P(D) / P(+).", es: "P(D|+) = P(+|D)P(D) / P(+).", zh: "P(D|+) = P(+|D)P(D) / P(+)。" },
          { en: "P(+) = 0.95(0.01) + 0.10(0.99) = 0.1085.", es: "P(+) = 0.95(0.01) + 0.10(0.99) = 0.1085.", zh: "P(+) = 0.95(0.01) + 0.10(0.99) = 0.1085。" },
          { en: "So P(D|+) = 0.0095 / 0.1085 ≈ 0.0876.", es: "Entonces P(D|+) = 0.0095 / 0.1085 ≈ 0.0876.", zh: "所以 P(D|+) = 0.0095 / 0.1085 ≈ 0.0876。" },
        ],
        answer: {
          en: "About 0.0876",
          es: "Aproximadamente 0.0876",
          zh: "约 0.0876",
        },
        selfCheck: {
          en: "Rare disease plus moderate false positives means the posterior can stay surprisingly low.",
          es: "Enfermedad rara más falsos positivos moderados suele dejar una probabilidad posterior sorprendentemente baja.",
          zh: "疾病很少见、假阳性又不小，后验概率往往会比直觉低很多。",
        },
      },
    ],
  },

    "prob-markov-chebyshev": {
    quiz: [
      {
        prompt: {
          en: "You know only E[X] and X >= 0. Which inequality should you try first for P(X >= a)?",
          es: "Solo conoces E[X] y que X >= 0. ¿Qué desigualdad pruebas primero para P(X >= a)?",
          zh: "你只知道 E[X]，并且 X >= 0。想估计 P(X >= a) 时先试哪条不等式？",
        },
        firstStep: {
          en: "Use Markov.",
          es: "Usa Markov.",
          zh: "先用 Markov。",
        },
        setup: {
          en: "Markov is the mean-only bound for nonnegative random variables.",
          es: "Markov es la cota que usa solo la media para variables no negativas.",
          zh: "Markov 是“只靠均值”的非负随机变量上界。",
        },
        fullPath: [
          { en: "Check nonnegativity.", es: "Verifica que sea no negativa.", zh: "先确认变量非负。" },
          { en: "Write P(X >= a) <= E[X]/a.", es: "Escribe P(X >= a) <= E[X]/a.", zh: "写出 P(X >= a) <= E[X]/a。" },
          { en: "Plug in the given mean and threshold.", es: "Sustituye la media y el umbral dados.", zh: "把题目给的均值和门槛代进去。" },
        ],
        answer: {
          en: "Use Markov: P(X >= a) <= E[X]/a.",
          es: "Usa Markov: P(X >= a) <= E[X]/a.",
          zh: "用 Markov：P(X >= a) <= E[X]/a。",
        },
        selfCheck: {
          en: "Nonnegative plus only the mean = Markov.",
          es: "No negatividad más solo la media = Markov.",
          zh: "非负 + 只有均值 = Markov。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "You know E[X] and Var(X). Which inequality gives a bound for P(|X-E[X]| >= t)?",
          es: "Conoces E[X] y Var(X). ¿Qué desigualdad da una cota para P(|X-E[X]| >= t)?",
          zh: "已知 E[X] 和 Var(X)。估计 P(|X-E[X]| >= t) 时该用哪条不等式？",
        },
        firstStep: {
          en: "Use Chebyshev.",
          es: "Usa Chebyshev.",
          zh: "用 Chebyshev。",
        },
        setup: {
          en: "Deviation from the mean with variance available points straight to Chebyshev.",
          es: "Desviación respecto a la media con varianza disponible apunta directo a Chebyshev.",
          zh: "一旦是“离均值多远”而且方差已知，基本就是 Chebyshev。",
        },
        fullPath: [
          { en: "Identify the center E[X].", es: "Identifica el centro E[X].", zh: "先看中心 E[X]。" },
          { en: "Write P(|X-E[X]| >= t) <= Var(X)/t^2.", es: "Escribe P(|X-E[X]| >= t) <= Var(X)/t^2.", zh: "写出 P(|X-E[X]| >= t) <= Var(X)/t^2。" },
          { en: "Plug in the variance and t.", es: "Sustituye la varianza y t.", zh: "再把方差和 t 代进去。" },
        ],
        answer: {
          en: "Use Chebyshev: P(|X-E[X]| >= t) <= Var(X)/t^2.",
          es: "Usa Chebyshev: P(|X-E[X]| >= t) <= Var(X)/t^2.",
          zh: "用 Chebyshev：P(|X-E[X]| >= t) <= Var(X)/t^2。",
        },
        selfCheck: {
          en: "Distance from the mean plus variance = Chebyshev.",
          es: "Distancia a la media más varianza = Chebyshev.",
          zh: "离均值的距离 + 方差 = Chebyshev。",
        },
      },
    ],
  },

    "prob-total-probability": {
    quiz: [
      {
        prompt: {
          en: "A student can pass through homework, quiz replacement, or final rescue. What should you set up first?",
          es: "Un estudiante puede aprobar por tarea, reposición de quiz o rescate del final. ¿Qué debes plantear primero?",
          zh: "一个学生可能通过作业、补测或期末补救三条路过关。第一步该怎么想？",
        },
        firstStep: {
          en: "Split the event into clean cases and add the path probabilities.",
          es: "Parte el evento en casos limpios y suma las probabilidades de cada ruta.",
          zh: "先把事件拆成互不重叠的几种情况，再把各条路径加起来。",
        },
        setup: {
          en: "This is total probability because one event can happen through several disjoint routes.",
          es: "Esto es probabilidad total porque un evento puede ocurrir por varias rutas disjuntas.",
          zh: "这是全概率，因为同一个结果可以通过几条互不重叠的路径发生。",
        },
        fullPath: [
          { en: "Choose a partition of cases.", es: "Elige una partición de casos.", zh: "先选一组互不重叠的分情况。" },
          { en: "Write the target event inside each case.", es: "Escribe el evento meta dentro de cada caso.", zh: "把目标事件放进每种情况里。" },
          { en: "Add the case-by-case probabilities.", es: "Suma las probabilidades caso por caso.", zh: "最后把这些路径概率加起来。" },
        ],
        answer: {
          en: "Use total probability.",
          es: "Usa probabilidad total.",
          zh: "用全概率公式。",
        },
        selfCheck: {
          en: "Several clean routes to one event = total probability.",
          es: "Varias rutas limpias hacia un evento = probabilidad total.",
          zh: "一个结果有好几条干净路径 = 全概率。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "40% of students study early, 35% study late, and 25% cram. Their pass rates are 90%, 70%, and 50%. What setup gives the overall pass probability?",
          es: "El 40% de los estudiantes estudia temprano, el 35% estudia tarde y el 25% memoriza al final. Sus tasas de aprobacion son 90%, 70% y 50%. ¿Que planteamiento da la probabilidad total de aprobar?",
          zh: "40% 的学生提前学，35% 晚一点学，25% 临时抱佛脚。他们的通过率分别是 90%、70%、50%。求总体通过概率时，该怎么设？",
        },
        firstStep: {
          en: "Treat the study styles as a partition and weight each pass rate by its group size.",
          es: "Trata los estilos de estudio como una particion y pondera cada tasa de aprobacion por el tamaño del grupo.",
          zh: "先把学习方式看成一个划分，再按各组比例给通过率加权。",
        },
        setup: {
          en: "Total probability rebuilds one final event from several disjoint cases that cover the whole population.",
          es: "La probabilidad total reconstruye un evento final a partir de varios casos disjuntos que cubren toda la poblacion.",
          zh: "全概率就是把一个最终事件，拆成若干互斥且覆盖全部情况的分支，再加总回来。",
        },
        fullPath: [
          { en: "Let E, L, and C be early, late, and cram.", es: "Sea E, L y C = temprano, tarde y cram.", zh: "设 E、L、C 分别表示提前学、晚点学、临时抱佛脚。" },
          { en: "Write P(pass)=P(pass|E)P(E)+P(pass|L)P(L)+P(pass|C)P(C).", es: "Escribe P(pasar)=P(pasar|E)P(E)+P(pasar|L)P(L)+P(pasar|C)P(C).", zh: "写出 P(通过)=P(通过|E)P(E)+P(通过|L)P(L)+P(通过|C)P(C)。" },
          { en: "Then plug in the three weighted paths.", es: "Luego sustituye las tres rutas ponderadas.", zh: "最后把三条加权路径代进去。" },
        ],
        answer: {
          en: "Write a weighted sum across the partition.",
          es: "Escribe una suma ponderada sobre la particion.",
          zh: "把这个划分上的加权和写出来。",
        },
        selfCheck: {
          en: "Total probability is a weighted average across clean cases.",
          es: "La probabilidad total es un promedio ponderado sobre casos limpios.",
          zh: "全概率，本质上就是对干净分情况做加权平均。",
        },
      },
    ],
    final: [
      {
        prompt: {
          en: "A student can pass a course through homework exemption, quiz recovery, or final exam rescue. The pass event can happen through several disjoint routes. What setup should you write before numbers?",
          es: "Un estudiante puede aprobar un curso por exencion de tarea, recuperacion de quiz o rescate del final. El evento 'aprobar' puede ocurrir por varias rutas disjuntas. ¿Que planteamiento debes escribir antes de poner numeros?",
          zh: "一个学生可能通过作业豁免、测验补救或期末翻盘三条互不重叠的路过课。代数字前，应先写什么设法？",
        },
        firstStep: {
          en: "Partition the pass event into the disjoint routes and add those path probabilities.",
          es: "Parte el evento de aprobar en rutas disjuntas y suma esas probabilidades.",
          zh: "先把“通过”事件按几条互斥路径拆开，再把各路径概率相加。",
        },
        setup: {
          en: "Total probability is the clean way to rebuild one event from several disjoint causes or routes.",
          es: "La probabilidad total es la forma limpia de reconstruir un evento desde varias causas o rutas disjuntas.",
          zh: "全概率的核心，就是把一个事件拆成几条互不重叠的成因或路径，再重新加回去。",
        },
        fullPath: [
          { en: "Choose a partition B1, B2, B3 of the route types.", es: "Elige una particion B1, B2, B3 de los tipos de ruta.", zh: "先选一组互斥且全覆盖的路径划分 B1, B2, B3。" },
          { en: "Write P(pass)=P(pass|B1)P(B1)+P(pass|B2)P(B2)+P(pass|B3)P(B3).", es: "Escribe P(aprobar)=P(aprobar|B1)P(B1)+P(aprobar|B2)P(B2)+P(aprobar|B3)P(B3).", zh: "写出 P(通过)=P(通过|B1)P(B1)+P(通过|B2)P(B2)+P(通过|B3)P(B3)。" },
          { en: "Then plug in the route data.", es: "Luego sustituye los datos de cada ruta.", zh: "最后再代入每条路径的数据。" },
        ],
        answer: {
          en: "Write total probability across the disjoint routes.",
          es: "Escribe probabilidad total sobre las rutas disjuntas.",
          zh: "先把全概率公式沿着互斥路径写出来。",
        },
        selfCheck: {
          en: "One event, several clean doors -> total probability.",
          es: "Un evento, varias puertas limpias -> probabilidad total.",
          zh: "一个结果、好几扇干净的门 -> 全概率。",
        },
      },
    ],
  },

    "la121a-subspace-test": {
    quiz: [
      {
        prompt: {
          en: "Is W = {(x,y,z) : x + y + z = 0} a subspace of R^3?",
          es: "¿Es W = {(x,y,z) : x + y + z = 0} un subespacio de R^3?",
          zh: "W = {(x,y,z) : x + y + z = 0} 是 R^3 的子空间吗？",
        },
        firstStep: {
          en: "Run zero, addition, and scalar multiplication in that order.",
          es: "Haz las pruebas de cero, suma y multiplicación escalar, en ese orden.",
          zh: "按顺序跑零向量、加法、数乘这三项检查。",
        },
        setup: {
          en: "A homogeneous linear equation usually signals a subspace, but you still show the three checks.",
          es: "Una ecuación lineal homogénea suele señalar subespacio, pero igual debes mostrar las tres pruebas.",
          zh: "齐次线性方程通常很像子空间，但你还是要把三步检验写出来。",
        },
        fullPath: [
          { en: "(0,0,0) satisfies x+y+z=0.", es: "(0,0,0) cumple x+y+z=0.", zh: "(0,0,0) 满足 x+y+z=0。" },
          { en: "If u and v satisfy the equation, then u+v also satisfies it.", es: "Si u y v satisfacen la ecuación, entonces u+v también la satisface.", zh: "若 u 和 v 都满足方程，则 u+v 也满足。" },
          { en: "If u satisfies it, then cu also satisfies it.", es: "Si u la satisface, entonces cu también.", zh: "若 u 满足，则 cu 也满足。" },
        ],
        answer: {
          en: "Yes, it is a subspace.",
          es: "Sí, es un subespacio.",
          zh: "是，它是子空间。",
        },
        selfCheck: {
          en: "Homogeneous condition + zero/add/scale = subspace pattern.",
          es: "Condición homogénea + cero/suma/escala = patrón de subespacio.",
          zh: "齐次条件 + 零/加/乘 = 子空间套路。",
        },
      },
    ],
  },

    "la121a-basis": {
    midterm: [
      {
        prompt: {
          en: "What are the two separate jobs you must prove to show S is a basis for V?",
          es: "¿Cuáles son las dos tareas separadas que debes probar para mostrar que S es una base de V?",
          zh: "若要证明 S 是 V 的一组基，必须分别证明哪两件事？",
        },
        firstStep: {
          en: "Split the proof into spanning and linear independence.",
          es: "Divide la prueba en generación e independencia lineal.",
          zh: "先把证明拆成“张成”和“线性无关”两半。",
        },
        setup: {
          en: "A basis must do both jobs, and each job is proved differently.",
          es: "Una base debe cumplir ambos trabajos, y cada uno se prueba distinto.",
          zh: "一组基必须两头都过关，而且这两部分的证明方法通常不一样。",
        },
        fullPath: [
          { en: "Show every vector in V can be built from S.", es: "Prueba que todo vector de V se puede construir con S.", zh: "先证 V 里每个向量都能由 S 线性组合出来。" },
          { en: "Then show the zero combination forces all coefficients to be zero.", es: "Luego prueba que la combinación cero obliga a que todos los coeficientes sean cero.", zh: "再证零组合只能让所有系数都为零。" },
          { en: "Once both are done, S is a basis.", es: "Cuando ambas partes están hechas, S es una base.", zh: "两边都做完，S 才是一组基。" },
        ],
        answer: {
          en: "Show S spans V and is linearly independent.",
          es: "Prueba que S genera V y es linealmente independiente.",
          zh: "证明 S 张成 V 且线性无关。",
        },
        selfCheck: {
          en: "Basis = enough vectors, but no extra vectors.",
          es: "Base = suficientes vectores, pero sin sobrar.",
          zh: "基 = 够用，但不冗余。",
        },
      },
    ],
  },

    "la121a-linear-map": {
    quiz: [
      {
        prompt: {
          en: "How do you start proving T is a linear map?",
          es: "¿Cómo empiezas a probar que T es una transformación lineal?",
          zh: "证明 T 是线性映射，第一步怎么开？",
        },
        firstStep: {
          en: "Write the two tests: T(u+v)=T(u)+T(v) and T(cv)=cT(v).",
          es: "Escribe las dos pruebas: T(u+v)=T(u)+T(v) y T(cv)=cT(v).",
          zh: "先写出两条检验：T(u+v)=T(u)+T(v)，以及 T(cv)=cT(v)。",
        },
        setup: {
          en: "Linearity means preserving addition and scalar multiplication on arbitrary inputs.",
          es: "Linealidad significa preservar suma y multiplicación escalar para entradas arbitrarias.",
          zh: "线性映射的核心，就是对任意输入都保住加法和数乘。",
        },
        fullPath: [
          { en: "Take arbitrary u and v.", es: "Toma u y v arbitrarios.", zh: "先取任意 u 和 v。" },
          { en: "Compute T(u+v) and compare to T(u)+T(v).", es: "Calcula T(u+v) y compáralo con T(u)+T(v).", zh: "计算 T(u+v)，并与 T(u)+T(v) 比较。" },
          { en: "Then do the scalar test T(cv)=cT(v).", es: "Luego haz la prueba escalar T(cv)=cT(v).", zh: "再做数乘检验 T(cv)=cT(v)。" },
        ],
        answer: {
          en: "Check additivity and scalar compatibility.",
          es: "Comprueba aditividad y compatibilidad escalar.",
          zh: "检验加法和数乘是否都保住。",
        },
        selfCheck: {
          en: "Linear map = preserve add and scale.",
          es: "Transformación lineal = preservar suma y escala.",
          zh: "线性映射 = 保住加法和数乘。",
        },
      },
    ],
  },

    "la121a-kernel-image": {
    midterm: [
      {
        prompt: {
          en: "To find ker(T), what equation do you solve first?",
          es: "Para hallar ker(T), ¿qué ecuación resuelves primero?",
          zh: "求 ker(T) 时，第一条方程该怎么写？",
        },
        firstStep: {
          en: "Set T(v)=0.",
          es: "Pon T(v)=0.",
          zh: "先令 T(v)=0。",
        },
        setup: {
          en: "The kernel is the full set of inputs that disappear under T.",
          es: "El kernel es el conjunto completo de entradas que desaparecen bajo T.",
          zh: "核空间就是所有被 T 送去 0 的输入。",
        },
        fullPath: [
          { en: "Write T(v)=0.", es: "Escribe T(v)=0.", zh: "先写 T(v)=0。" },
          { en: "Solve for all vectors v that satisfy it.", es: "Resuelve todos los vectores v que la satisfacen.", zh: "解出所有满足它的向量 v。" },
          { en: "That whole solution set is ker(T).", es: "Todo ese conjunto solución es ker(T).", zh: "整个解集就是 ker(T)。" },
        ],
        answer: {
          en: "Solve T(v)=0.",
          es: "Resuelve T(v)=0.",
          zh: "解 T(v)=0。",
        },
        selfCheck: {
          en: "Kernel = what disappears.",
          es: "Kernel = lo que desaparece.",
          zh: "核空间 = 消失掉的输入。",
        },
      },
    ],
  },

    "la121a-rank-nullity": {
    final: [
      {
        prompt: {
          en: "If T: R^6 -> R^4 has nullity 2, what does rank-nullity give you for rank(T)?",
          es: "Si T: R^6 -> R^4 tiene nulidad 2, ¿qué te da rango-nulidad para rank(T)?",
          zh: "若 T: R^6 -> R^4 的零度是 2，秩-零度定理会给出 rank(T) 是多少？",
        },
        firstStep: {
          en: "Use the domain dimension on the left side of the formula.",
          es: "Usa la dimensión del dominio en el lado izquierdo de la fórmula.",
          zh: "公式左边要放定义域的维数。",
        },
        setup: {
          en: "Rank-nullity uses dim(domain) = nullity + rank.",
          es: "Rango-nulidad usa dim(dominio) = nulidad + rango.",
          zh: "秩-零度定理是 dim(定义域) = nullity + rank。",
        },
        fullPath: [
          { en: "dim(domain) = 6.", es: "dim(dominio) = 6.", zh: "定义域维数是 6。" },
          { en: "So 6 = 2 + rank(T).", es: "Entonces 6 = 2 + rank(T).", zh: "所以 6 = 2 + rank(T)。" },
          { en: "Hence rank(T) = 4.", es: "Por tanto rank(T) = 4.", zh: "因此 rank(T) = 4。" },
        ],
        answer: {
          en: "rank(T) = 4",
          es: "rank(T) = 4",
          zh: "rank(T) = 4",
        },
        selfCheck: {
          en: "Rank-nullity starts from the domain, not the codomain.",
          es: "Rango-nulidad empieza con el dominio, no con el codominio.",
          zh: "秩-零度左边看定义域，不看值域。",
        },
      },
    ],
  },

    "la121a-matrix-of-map": {
    final: [
      {
        prompt: {
          en: "How do you build [T]_B when B = {b1, b2, ..., bn}?",
          es: "¿Cómo construyes [T]_B cuando B = {b1, b2, ..., bn}?",
          zh: "当 B = {b1, b2, ..., bn} 时，[T]_B 该怎么构造？",
        },
        firstStep: {
          en: "Apply T to each basis vector first.",
          es: "Aplica T primero a cada vector de la base.",
          zh: "先把 T 作用到每个基向量上。",
        },
        setup: {
          en: "The columns of the matrix come from the images of the basis vectors, written in coordinates.",
          es: "Las columnas de la matriz salen de las imágenes de los vectores base, escritas en coordenadas.",
          zh: "矩阵的列，就是各个基向量送进去后的像，再写成坐标。",
        },
        fullPath: [
          { en: "Compute T(b1), T(b2), ..., T(bn).", es: "Calcula T(b1), T(b2), ..., T(bn).", zh: "先算 T(b1), T(b2), ..., T(bn)。" },
          { en: "Write each output in the target basis.", es: "Escribe cada salida en la base objetivo.", zh: "把每个输出改写成目标基底下的坐标。" },
          { en: "Use those coordinate columns to form [T].", es: "Usa esas columnas de coordenadas para formar [T].", zh: "这些坐标列拼起来就是 [T]。" },
        ],
        answer: {
          en: "Columns come from T applied to the basis vectors.",
          es: "Las columnas salen de aplicar T a los vectores base.",
          zh: "列向量来自 T 作用在各个基向量后的结果。",
        },
        selfCheck: {
          en: "Basis in, columns out.",
          es: "Base entra, columnas salen.",
          zh: "基向量进去，列向量出来。",
        },
      },
    ],
  },

    "analysis140a-contradiction": {
    quiz: [
      {
        prompt: {
          en: "When is contradiction the cleanest first move in analysis?",
          es: "¿Cuándo es contradicción la primera jugada más limpia en análisis?",
          zh: "在分析里，什么时候第一招最适合用反证法？",
        },
        firstStep: {
          en: "Use contradiction when the direct route is messy but the opposite statement quickly forces something impossible.",
          es: "Usa contradicción cuando la ruta directa es sucia pero la negación obliga rápido a algo imposible.",
          zh: "当正面硬证很脏，但否命题一拿出来就能很快逼出矛盾时，先想反证法。",
        },
        setup: {
          en: "Analysis contradiction proofs often assume the opposite of a limit, bound, or supremum claim.",
          es: "En análisis, las contradicciones suelen empezar suponiendo lo contrario de un límite, una cota o una afirmación de supremo.",
          zh: "分析里的反证题，常常是先假设极限、界、上确界之类的结论不成立。",
        },
        fullPath: [
          { en: "Assume the desired conclusion fails.", es: "Supón que falla la conclusión deseada.", zh: "先假设目标结论不成立。" },
          { en: "Push that assumption against the definitions you already know.", es: "Empuja esa suposición contra las definiciones que ya tienes.", zh: "再把这个假设和已有定义或性质硬碰。" },
          { en: "Once an impossible inequality or conflict appears, close the contradiction.", es: "一旦出现不可能的不等式或冲突，就收尾成矛盾。", zh: "一旦出现不可能的不等式或冲突，就收成矛盾。" },
        ],
        answer: {
          en: "Use contradiction when the negation quickly breaks a known definition or bound.",
          es: "Usa contradicción cuando la negación rompe rápido una definición o una cota conocida.",
          zh: "当否命题会很快撞坏某个已知定义或界时，就该用反证法。",
        },
        selfCheck: {
          en: "Assume the opposite, then squeeze it into something impossible.",
          es: "Supón lo contrario y apriétalo hasta algo imposible.",
          zh: "先假设相反，再把它逼进死路。",
        },
      },
    ],
  },

    "analysis140a-bolzano-weierstrass": {
    midterm: [
      {
        prompt: {
          en: "A bounded sequence in R is given. What theorem should you try first if the question asks for a convergent subsequence?",
          es: "Se te da una sucesión acotada en R. ¿Qué teorema debes probar primero si la pregunta pide una subsucesión convergente?",
          zh: "给你一个有界实数列。如果题目要你找收敛子列，第一反应该用什么定理？",
        },
        firstStep: {
          en: "Bisect the bounded interval and keep the half containing infinitely many terms.",
          es: "Bisecciona el intervalo acotado y conserva la mitad que contiene infinitos terminos.",
          zh: "先二分这个有界区间，并保留包含无穷多个项的那一半。",
        },
        setup: {
          en: "The key move is to trap infinitely many terms in a shrinking interval.",
          es: "La jugada clave es atrapar infinitos terminos en un intervalo que se encoge.",
          zh: "关键动作是把无穷多个项困在越来越小的区间里。",
        },
        fullPath: [
          { en: "Bisect the bounded interval.", es: "Bisecciona el intervalo acotado.", zh: "先二分有界区间。" },
          { en: "Keep the half containing infinitely many terms and repeat.", es: "Conserva la mitad que contiene infinitos terminos y repite.", zh: "保留含有无穷多个项的那一半，并重复这个步骤。" },
          { en: "That nested choice gives a convergent subsequence.", es: "Esa eleccion encajada da una subsucesion convergente.", zh: "这种嵌套选择最终给出一个收敛子列。" },
        ],
        answer: {
          en: "Bisect the interval and extract a subsequence that converges.",
          es: "Bisecciona el intervalo y extrae una subsucesion convergente.",
          zh: "二分区间并抽取一个收敛子列。",
        },
        selfCheck: {
          en: "Bounded in R? Start with interval bisection.",
          es: "¿Acotada en R? Empieza con la biseccion de intervalos.",
          zh: "实数列有界？先想到区间二分。",
        },
      },
    ],
  },

    "analysis140a-sequential-continuity": {
    final: [
      {
        prompt: {
          en: "How do you prove f is continuous at a using the sequential definition?",
          es: "¿Cómo pruebas que f es continua en a usando la definición secuencial?",
          zh: "如果用序列定义来证 f 在 a 处连续，该怎么起手？",
        },
        firstStep: {
          en: "Take any sequence x_n -> a and show f(x_n) -> f(a).",
          es: "Toma una sucesión cualquiera x_n -> a y demuestra que f(x_n) -> f(a).",
          zh: "先取任意满足 x_n -> a 的序列，再证 f(x_n) -> f(a)。",
        },
        setup: {
          en: "Sequential continuity turns a pointwise continuity proof into a sequence test.",
          es: "La continuidad secuencial convierte la continuidad puntual en una prueba con sucesiones.",
          zh: "序列连续性就是把点态连续，改写成‘任意靠近 a 的序列都被送到 f(a)’。",
        },
        fullPath: [
          { en: "Start with an arbitrary sequence x_n converging to a.", es: "Empieza con una sucesión arbitraria x_n que converge a a.", zh: "先取任意收敛到 a 的序列 x_n。" },
          { en: "Apply the formula for f(x_n).", es: "Aplica la fórmula de f(x_n).", zh: "把它代进 f(x_n)。" },
          { en: "Show the outputs converge to f(a).", es: "Muestra que las salidas convergen a f(a).", zh: "证明输出收敛到 f(a)。" },
        ],
        answer: {
          en: "Show x_n -> a implies f(x_n) -> f(a).",
          es: "Demuestra que x_n -> a implica f(x_n) -> f(a).",
          zh: "证明 x_n -> a 会推出 f(x_n) -> f(a)。",
        },
        selfCheck: {
          en: "Sequential continuity = send convergent inputs to convergent outputs.",
          es: "Continuidad secuencial = mandar entradas convergentes a salidas convergentes.",
          zh: "序列连续 = 收敛输入送出收敛输出。",
        },
      },
    ],
  },

    "analysis140a-supremum": {
    midterm: [
      {
        prompt: {
          en: "Let S = {n(-1)^n : n in N}. Find inf(S) and sup(S), or explain why they do not exist.",
          es: "Sea S = {n(-1)^n : n en N}. Halla inf(S) y sup(S), o explica por qué no existen.",
          zh: "设 S = {n(-1)^n : n 属于 N}。求 inf(S) 和 sup(S)，或说明为什么不存在。",
        },
        firstStep: {
          en: "Split the set into its positive even terms and negative odd terms.",
          es: "Separa el conjunto en los términos positivos pares y los negativos impares.",
          zh: "先把这个集合拆成正的偶数项和负的奇数项。",
        },
        setup: {
          en: "Before saying anything about sup or inf, check whether the set is bounded above or below.",
          es: "Antes de hablar de sup o inf, revisa si el conjunto está acotado arriba o abajo.",
          zh: "在谈 sup 或 inf 之前，先看这个集合是否有上界或下界。",
        },
        fullPath: [
          { en: "For even n, n(-1)^n = n, so S contains arbitrarily large positive numbers.", es: "Para n par, n(-1)^n = n, así que S contiene positivos arbitrariamente grandes.", zh: "当 n 为偶数时，n(-1)^n = n，所以 S 里有任意大的正数。" },
          { en: "For odd n, n(-1)^n = -n, so S also contains arbitrarily negative numbers.", es: "Para n impar, n(-1)^n = -n, así que S 也 contiene números arbitrariamente negativos.", zh: "当 n 为奇数时，n(-1)^n = -n，所以 S 里也有任意小的负数。" },
          { en: "So S is neither bounded above nor bounded below, and sup(S), inf(S) do not exist in R.", es: "Entonces S no está acotado ni arriba ni abajo, y sup(S), inf(S) no existen en R.", zh: "因此 S 既没有上界也没有下界，所以 sup(S)、inf(S) 在 R 中都不存在。" },
        ],
        answer: {
          en: "Neither sup(S) nor inf(S) exists in R.",
          es: "Ni sup(S) ni inf(S) existen en R.",
          zh: "sup(S) 和 inf(S) 在 R 中都不存在。",
        },
        selfCheck: {
          en: "Sup/inf questions start with boundedness, not with guessing a number.",
          es: "Las preguntas de sup/inf empiezan por la acotación, no por adivinar un número.",
          zh: "sup/inf 题先看有界性，不要先猜数字。",
        },
      },
    ],
  },

    "analysis140a-sequence-limit": {
    midterm: [
      {
        prompt: {
          en: "Find the limit of b_n = (40n^3 + 180n^2 + 270n + 131)/(8n^3 + 36n^2 + 54n + 27) and justify it with the definition of limit.",
          es: "Halla el límite de b_n = (40n^3 + 180n^2 + 270n + 131)/(8n^3 + 36n^2 + 54n + 27) y justifícalo con la definición de límite.",
          zh: "求 b_n = (40n^3 + 180n^2 + 270n + 131)/(8n^3 + 36n^2 + 54n + 27) 的极限，并用定义证明。",
        },
        firstStep: {
          en: "Guess the limit from the leading terms first: 40/8 = 5.",
          es: "Primero adivina el límite por los términos dominantes: 40/8 = 5.",
          zh: "先用最高次项猜极限：40/8 = 5。",
        },
        setup: {
          en: "In a definition proof, you still need algebra that turns |b_n-5| into something you can force below epsilon.",
          es: "En una prueba por definición, igual necesitas álgebra para convertir |b_n-5| en algo menor que epsilon.",
          zh: "即使用定义证明，也要先把 |b_n-5| 化成能用 epsilon 压住的形式。",
        },
        fullPath: [
          { en: "Compute b_n - 5 and simplify the rational expression.", es: "Calcula b_n - 5 y simplifica la expresión racional.", zh: "先算 b_n - 5，再把这个有理式化简。" },
          { en: "Show the numerator has lower degree than the denominator, so the tail behaves like C/n.", es: "Muestra que el numerador tiene menor grado que el denominador, así que la cola se comporta como C/n.", zh: "化简后会看到分子次数低于分母，所以尾项会像 C/n 一样变小。" },
          { en: "Choose N so that n >= N makes |b_n-5| < epsilon.", es: "Elige N para que n >= N implique |b_n-5| < epsilon.", zh: "再选 N，让 n >= N 时有 |b_n-5| < epsilon。" },
        ],
        answer: {
          en: "The limit is 5.",
          es: "El límite es 5.",
          zh: "极限是 5。",
        },
        selfCheck: {
          en: "Guess from top degree, then prove by squeezing the error term.",
          es: "Adivina por el mayor grado y luego prueba acotando el término de error.",
          zh: "先看最高次项猜极限，再把误差项压小。",
        },
      },
    ],
  },

    "analysis140a-limsup-liminf": {
    midterm: [
      {
        prompt: {
          en: "Let s_n and t_n be bounded positive sequences. Prove or disprove: lim sup(s_n+t_n) <= lim sup s_n + lim sup t_n.",
          es: "Sean s_n y t_n sucesiones positivas y acotadas. Demuestra o refuta: lim sup(s_n+t_n) <= lim sup s_n + lim sup t_n.",
          zh: "设 s_n 和 t_n 是有界正数列。证明或反驳：lim sup(s_n+t_n) <= lim sup s_n + lim sup t_n。",
        },
        firstStep: {
          en: "Form tail sets for s_n+t_n, s_n, and t_n, then compare their suprema.",
          es: "Forma los conjuntos de cola de s_n+t_n, s_n y t_n, y compara sus supremos.",
          zh: "先构造 s_n+t_n、s_n、t_n 的尾集，再比较它们的上确界。",
        },
        setup: {
          en: "The problem becomes easier once you turn lim sup into tail sets.",
          es: "El problema se vuelve mas facil cuando conviertes lim sup en conjuntos de cola.",
          zh: "把 lim sup 改写成尾集后，题目会更直接。",
        },
        fullPath: [
          { en: "For each N, sup_{n>N}(s_n+t_n) <= sup_{n>N}s_n + sup_{n>N}t_n.", es: "Para cada N, sup_{n>N}(s_n+t_n) <= sup_{n>N}s_n + sup_{n>N}t_n.", zh: "对每个 N，都有 sup_{n>N}(s_n+t_n) <= sup_{n>N}s_n + sup_{n>N}t_n。" },
          { en: "Take the limit of the tail suprema as N -> infinity.", es: "Toma el limite de los supremos de cola cuando N -> infinito.", zh: "让尾部上确界随着 N -> infinity 取极限。" },
          { en: "The inequality survives, so the statement is true.", es: "La desigualdad se conserva, asi que la afirmacion es verdadera.", zh: "不等式保持成立，所以命题为真。" },
        ],
        answer: {
          en: "The statement is true by comparing tail suprema.",
          es: "La afirmacion es verdadera al comparar supremos de cola.",
          zh: "通过比较尾部上确界可知命题为真。",
        },
        selfCheck: {
          en: "lim sup questions usually start with tail sets.",
          es: "Las preguntas de lim sup suelen empezar con conjuntos de cola.",
          zh: "lim sup 题通常先从尾集开始。",
        },
      },
    ],
  },

    "analysis140a-series-tests": {
    midterm: [
      {
        prompt: {
          en: "Determine whether sum_{n=8}^infinity 1/(n log^2(n) log^4(log n)) converges or diverges.",
          es: "Determina si sum_{n=8}^infinity 1/(n log^2(n) log^4(log n)) converge o diverge.",
          zh: "判断级数 sum_{n=8}^infinity 1/(n log^2(n) log^4(log n)) 收敛还是发散。",
        },
        firstStep: {
          en: "Start by checking whether the series is positive, alternating, or telescoping.",
          es: "Empieza comprobando si la serie es positiva, alternante o telescopica.",
          zh: "先判断这个级数是正项、交错，还是可望成望远镜型。",
        },
        setup: {
          en: "The sign pattern tells you the test family before any algebra does.",
          es: "El patron de signos te dice la familia de pruebas antes que el algebra.",
          zh: "符号模式会先告诉你该用哪一类判别法。",
        },
        fullPath: [
          { en: "Because the terms are positive, try a comparison or integral test.", es: "Como los terminos son positivos, prueba un criterio de comparacion o integral.", zh: "因为各项为正，先试比较或积分判别。" },
          { en: "Rewrite the nested logs in the matching integral form.", es: "Reescribe los logaritmos anidados en la forma integral correspondiente.", zh: "把嵌套对数改写成对应的积分形式。" },
          { en: "The extra log powers make the tail integrable, so the series converges.", es: "Las potencias extra de log hacen integrable la cola, asi que la serie converge.", zh: "额外的对数幂使尾部可积，所以级数收敛。" },
        ],
        answer: {
          en: "The series converges by a positive-term test.",
          es: "La serie converge por un criterio para terminos positivos.",
          zh: "这个级数用正项判别可知收敛。",
        },
        selfCheck: {
          en: "Positive terms with nested logs usually mean comparison or integral test first.",
          es: "Terminos positivos con logaritmos anidados suelen pedir comparacion o integral primero.",
          zh: "正项再加多层对数，通常先想比较或积分判别。",
        },
      },
      {
        prompt: {
          en: "Consider c_n = sqrt(n) when n is a perfect square and c_n = 1/n otherwise. Decide whether sum c_n/n converges.",
          es: "Sea c_n = sqrt(n) cuando n es cuadrado perfecto y c_n = 1/n en otro caso. Decide si sum c_n/n converge.",
          zh: "设 c_n 在 n 为完全平方数时等于 sqrt(n)，否则等于 1/n。判断 sum c_n/n 是否收敛。",
        },
        firstStep: {
          en: "Split the series into square indices and non-square indices.",
          es: "Separa la serie en índices cuadrados y no cuadrados.",
          zh: "先把级数拆成平方下标部分和非平方下标部分。",
        },
        setup: {
          en: "This is not one smooth formula. The shape changes on perfect squares, so split first.",
          es: "No es una sola fórmula suave. La forma cambia en los cuadrados perfectos, así que primero divide.",
          zh: "这不是一条平滑公式；在完全平方数处形状会变，所以第一步要拆开。",
        },
        fullPath: [
          { en: "If n=k^2, then c_n/n = k/k^2 = 1/k.", es: "Si n=k^2, entonces c_n/n = k/k^2 = 1/k.", zh: "当 n=k^2 时，c_n/n = k/k^2 = 1/k。" },
          { en: "The square-index subseries becomes sum 1/k, which diverges.", es: "La subserie sobre cuadrados se vuelve sum 1/k, que diverge.", zh: "平方下标那部分就变成 sum 1/k，它发散。" },
          { en: "A positive subseries diverges, so the whole series diverges.", es: "Si una subserie positiva diverge, la serie completa diverge.", zh: "正项子级数都发散了，整个级数就发散。" },
        ],
        answer: {
          en: "The series diverges.",
          es: "La serie diverge.",
          zh: "这个级数发散。",
        },
        selfCheck: {
          en: "Weird piecewise series often want you to isolate the dangerous subsequence.",
          es: "Las series raras a trozos suelen pedir aislar la subsecuencia peligrosa.",
          zh: "分段奇怪的级数，通常要先抓出最危险的那条子列。",
        },
      },
    ],
  },

    "analysis140a-uniform-continuity": {
    quiz: [
      {
        prompt: {
          en: "A function is continuous on [a,b]. What theorem should you try first if the problem asks for uniform continuity?",
          es: "Una función es continua en [a,b]. ¿Qué teorema intentas primero si la pregunta pide continuidad uniforme?",
          zh: "一个函数在 [a,b] 上连续。如果题目问一致连续，第一步该想什么定理？",
        },
        firstStep: {
          en: "Use Heine-Cantor.",
          es: "Usa Heine-Cantor.",
          zh: "先用 Heine-Cantor 定理。",
        },
        setup: {
          en: "Closed and bounded interval plus continuity is the classic automatic trigger for uniform continuity.",
          es: "Intervalo cerrado y acotado más continuidad es el disparador automático clásico para continuidad uniforme.",
          zh: "闭区间再加连续，是一致连续最经典的自动触发组合。",
        },
        fullPath: [
          { en: "Check the domain is closed and bounded.", es: "Verifica que el dominio sea cerrado y acotado.", zh: "先确认定义域是闭且有界。" },
          { en: "Check the function is continuous on that whole interval.", es: "Verifica que la función sea continua en todo el intervalo.", zh: "再确认函数在整个区间上连续。" },
          { en: "Then conclude uniform continuity by Heine-Cantor.", es: "Entonces concluye continuidad uniforme por Heine-Cantor.", zh: "于是直接由 Heine-Cantor 推出一致连续。" },
        ],
        answer: {
          en: "Use Heine-Cantor to conclude uniform continuity.",
          es: "Usa Heine-Cantor para concluir continuidad uniforme.",
          zh: "用 Heine-Cantor 可推出一致连续。",
        },
        selfCheck: {
          en: "Continuous on [a,b]? Think Heine-Cantor before anything fancy.",
          es: "¿Continua en [a,b]? Piensa en Heine-Cantor antes de algo complicado.",
          zh: "在 [a,b] 上连续？别绕路，先想 Heine-Cantor。",
        },
      },
    ],
  },

    "analysis140a-function-limits": {
    final: [
      {
        prompt: {
          en: "Let f(x)=q/p when x=p/q is in lowest terms with nonzero p, let f(x)=4x for irrational x, and f(0)=0. Find lim_{x→sqrt(2), x in Q} f(x).",
          es: "Sea f(x)=q/p cuando x=p/q está en términos reducidos con p no nulo, f(x)=4x para irracionales y f(0)=0. Halla lim_{x→sqrt(2), x en Q} f(x).",
          zh: "设 f(x) 在 x=p/q 且既约分数、p 非零时等于 q/p；在无理数处等于 4x；且 f(0)=0。求 lim_{x→sqrt(2), x 属于 Q} f(x)。",
        },
        firstStep: {
          en: "On the rational branch, rewrite f(x)=q/p as 1/x.",
          es: "En la rama racional, reescribe f(x)=q/p como 1/x.",
          zh: "在有理数这支上，先把 q/p 改写成 1/x。",
        },
        setup: {
          en: "A piecewise function often becomes easy once you isolate the branch that the limit is actually using.",
          es: "Una función a trozos suele volverse fácil cuando aíslas la rama que de verdad usa el límite.",
          zh: "分段函数的极限，先看题目到底限制你走哪一支。",
        },
        fullPath: [
          { en: "If x=p/q in lowest terms, then f(x)=q/p = 1/x.", es: "Si x=p/q en términos reducidos, entonces f(x)=q/p = 1/x.", zh: "若 x=p/q 为既约分数，则 f(x)=q/p = 1/x。" },
          { en: "So along rational inputs approaching sqrt(2), the problem becomes lim 1/x.", es: "Así que a lo largo de racionales que se acercan a sqrt(2), el problema se vuelve lim 1/x.", zh: "所以沿着趋近 sqrt(2) 的有理数，这题就变成求 1/x 的极限。" },
          { en: "Therefore the rational-limit is 1/sqrt(2).", es: "Por tanto el límite racional es 1/sqrt(2).", zh: "因此这个有理数侧极限是 1/sqrt(2)。" },
        ],
        answer: {
          en: "The limit is 1/sqrt(2).",
          es: "El límite es 1/sqrt(2).",
          zh: "极限是 1/sqrt(2)。",
        },
        selfCheck: {
          en: "For piecewise limits, lock onto the branch the question actually asks about.",
          es: "En límites a trozos, primero fíjate en la rama que realmente pide la pregunta.",
          zh: "分段极限题，先锁定题目真的让你走的那一支。",
        },
      },
    ],
  },

    "analysis140a-uniform-convergence": {
    final: [
      {
        prompt: {
          en: "Let f_n(x)=n/(nx+1) on S=(0,1]. Find the pointwise limit and decide whether f_n converges uniformly on S.",
          es: "Sea f_n(x)=n/(nx+1) en S=(0,1]. Halla el límite puntual y decide si f_n converge uniformemente en S.",
          zh: "设 f_n(x)=n/(nx+1)，定义在 S=(0,1] 上。求点态极限，并判断是否一致收敛。",
        },
        firstStep: {
          en: "Fix x first to get the pointwise limit, then study the worst-case error over all x in S.",
          es: "Primero fija x para hallar el límite puntual; luego estudia el peor error sobre todo x en S.",
          zh: "先固定 x 求点态极限，再去看整个 S 上的最坏误差。",
        },
        setup: {
          en: "Uniform convergence is about one N for the whole set, so after the pointwise limit you must look at sup error.",
          es: "La convergencia uniforme pide un solo N para todo el conjunto, así que después del límite puntual debes mirar el supremo del error.",
          zh: "一致收敛要求整个集合共用一个 N，所以求完点态极限后，必须去看误差的上确界。",
        },
        fullPath: [
          { en: "For fixed x>0, f_n(x)=1/(x+1/n) tends to 1/x.", es: "Para x>0 fijo, f_n(x)=1/(x+1/n) tiende a 1/x.", zh: "对固定的 x>0，有 f_n(x)=1/(x+1/n)，所以它趋于 1/x。" },
          { en: "Now compare |f_n(x)-1/x| = 1/(x(nx+1)).", es: "Ahora compara |f_n(x)-1/x| = 1/(x(nx+1)).", zh: "再看误差 |f_n(x)-1/x| = 1/(x(nx+1))。" },
          { en: "As x approaches 0+, that error can blow up, so there is no uniform convergence on (0,1].", es: "Cuando x se acerca a 0+, ese error puede explotar, así que no hay convergencia uniforme en (0,1].", zh: "当 x 逼近 0+ 时，这个误差会变得很大，所以在 (0,1] 上不一致收敛。" },
        ],
        answer: {
          en: "Pointwise limit: 1/x. Uniform convergence: no.",
          es: "Límite puntual: 1/x. Convergencia uniforme: no.",
          zh: "点态极限是 1/x；一致收敛：否。",
        },
        selfCheck: {
          en: "Pointwise first, then hunt the worst x.",
          es: "Primero punto a punto; luego busca el peor x.",
          zh: "先做点态，再抓最坏的 x。",
        },
      },
    ],
  },

    "math2e-line-integrals": {
    quiz: [
      {
        prompt: {
          en: "What is the universal first move for a line integral over a curve C?",
          es: "¿Cual es el primer movimiento universal para una integral de linea sobre una curva C?",
          zh: "对曲线 C 上的线积分，通用的第一步是什么？",
        },
        firstStep: {
          en: "Parameterize the curve.",
          es: "Parametriza la curva.",
          zh: "先把曲线参数化。",
        },
        setup: {
          en: "No matter whether the integral is scalar or vector, the path has to become a parameter first.",
          es: "No importa si la integral es escalar o vectorial: primero la trayectoria debe convertirse en parametro.",
          zh: "不管是标量线积分还是向量线积分，第一步都必须先把路径写成参数形式。",
        },
        fullPath: [
          { en: "Write the curve as r(t).", es: "Escribe la curva como r(t).", zh: "先把曲线写成 r(t)。" },
          { en: "Rewrite x, y, z, and any ds or dr terms using t.", es: "Reescribe x, y, z y cualquier ds o dr usando t.", zh: "把 x、y、z 以及 ds 或 dr 都改写成 t 的形式。" },
          { en: "Then the line integral becomes an ordinary integral in t.", es: "Entonces la integral de linea se vuelve una integral ordinaria en t.", zh: "这样线积分就变成关于 t 的普通积分了。" },
        ],
        answer: {
          en: "Parameterize the curve first.",
          es: "Primero parametriza la curva.",
          zh: "第一步先参数化曲线。",
        },
        selfCheck: {
          en: "No parameter, no line integral.",
          es: "Sin parametro, no hay integral de linea.",
          zh: "没有参数化，就没有真正开始做线积分。",
        },
      },
    ],
  },

    "math2e-conservative-fields": {
    quiz: [
      {
        prompt: {
          en: "If a vector field is conservative, what shortcut usually replaces the full line integral?",
          es: "Si un campo vectorial es conservativo, ¿que atajo suele reemplazar la integral de linea completa?",
          zh: "如果一个向量场是保守场，通常可以用什么捷径代替整条线积分？",
        },
        firstStep: {
          en: "Look for a potential function and evaluate endpoints.",
          es: "Busca una funcion potencial y evalua los extremos.",
          zh: "先找势函数，再代入起点和终点。",
        },
        setup: {
          en: "Conservative means the work depends on endpoints, not on the whole path.",
          es: "Conservativo significa que el trabajo depende de los extremos, no de toda la trayectoria.",
          zh: "保守场意味着积分值只看端点，不看整条路径怎么走。",
        },
        fullPath: [
          { en: "Find a potential function φ with ∇φ=F.", es: "Encuentra una funcion potencial φ con ∇φ=F.", zh: "先找一个势函数 φ，使得 ∇φ=F。" },
          { en: "Evaluate φ at the ending point and at the starting point.", es: "Evalua φ en el punto final y en el inicial.", zh: "分别计算终点和起点的 φ 值。" },
          { en: "Subtract: φ(end)-φ(start).", es: "Resta: φ(final)-φ(inicial).", zh: "最后做差：φ(终点)-φ(起点)。" },
        ],
        answer: {
          en: "Use a potential function and endpoint subtraction.",
          es: "Usa una funcion potencial y resta extremos.",
          zh: "用势函数做端点相减。",
        },
        selfCheck: {
          en: "Conservative field = endpoint shortcut.",
          es: "Campo conservativo = atajo por extremos.",
          zh: "保守场 = 端点捷径。",
        },
      },
    ],
  },

    "math2e-surface-integrals": {
    quiz: [
      {
        prompt: {
          en: "What is the first setup move for a surface integral over S?",
          es: "¿Cual es el primer paso de preparacion para una integral de superficie sobre S?",
          zh: "做曲面积分时，第一步的设定动作是什么？",
        },
        firstStep: {
          en: "Describe the surface in a usable parameterization or graph form.",
          es: "Describe la superficie con una parametrizacion util o como grafica.",
          zh: "先把曲面写成可用的参数式或图形形式。",
        },
        setup: {
          en: "Surface integrals fail fast if the surface itself is not described clearly first.",
          es: "Las integrales de superficie se rompen rapido si la superficie no esta descrita claramente desde el inicio.",
          zh: "曲面积分如果一开始没有把曲面描述清楚，后面基本都会乱掉。",
        },
        fullPath: [
          { en: "Choose a parameterization or write the surface as z=f(x,y) when possible.", es: "Elige una parametrizacion o escribe la superficie como z=f(x,y) cuando se pueda.", zh: "先选参数式，或者在可能时写成 z=f(x,y) 的图形形式。" },
          { en: "From that description, build the normal and area factor.", es: "A partir de esa descripcion, construye la normal y el factor de area.", zh: "再由这个描述求出法向量和面积因子。" },
          { en: "Only then rewrite the integral.", es: "Solo entonces reescribe la integral.", zh: "这之后才能真正把积分改写出来。" },
        ],
        answer: {
          en: "Describe the surface first.",
          es: "Primero describe la superficie.",
          zh: "第一步先把曲面描述清楚。",
        },
        selfCheck: {
          en: "No surface description, no surface integral.",
          es: "Sin descripcion de la superficie, no hay integral de superficie.",
          zh: "曲面没描述清楚，就还没真正开始做曲面积分。",
        },
      },
    ],
  },

    "math2e-divergence-curl": {
    quiz: [
      {
        prompt: {
          en: "Which operator matches local spinning: divergence or curl?",
          es: "¿Que operador coincide con giro local: divergencia o curl?",
          zh: "描述局部旋转时，应该看 divergence 还是 curl？",
        },
        firstStep: {
          en: "Separate spread-out behavior from twisting behavior.",
          es: "Separa comportamiento de expansion del comportamiento de giro.",
          zh: "先把“向外扩散”和“局部打转”分开。",
        },
        setup: {
          en: "Divergence measures expansion or source behavior. Curl measures local rotation.",
          es: "La divergencia mide expansion o comportamiento de fuente. El curl mide rotacion local.",
          zh: "divergence 看扩散或源汇；curl 看局部旋转。",
        },
        fullPath: [
          { en: "Spinning means the field wants to rotate around a point.", es: "Girar significa que el campo quiere rotar alrededor de un punto.", zh: "“打转”表示场在某点附近有旋转趋势。" },
          { en: "That is not source/sink behavior.", es: "Eso no es comportamiento de fuente o sumidero.", zh: "这不是源点或汇点那种扩散行为。" },
          { en: "So the right operator is curl.", es: "Asi que el operador correcto es curl.", zh: "所以应该看 curl。" },
        ],
        answer: {
          en: "Curl",
          es: "Curl",
          zh: "Curl",
        },
        selfCheck: {
          en: "Div spreads. Curl twists.",
          es: "Divergencia expande. Curl gira.",
          zh: "divergence 看扩散，curl 看旋转。",
        },
      },
    ],
  },

    "math2e-stokes-gauss": {
    quiz: [
      {
        prompt: {
          en: "A closed surface appears with a flux integral and divergence is easy to compute. Which theorem should you try first?",
          es: "Aparece una superficie cerrada con una integral de flujo y la divergencia es facil de calcular. ¿Que teorema pruebas primero?",
          zh: "题目给了闭曲面的通量积分，而且 divergence 很好算。第一步该想到哪个定理？",
        },
        firstStep: {
          en: "Match closed surface plus flux to Gauss.",
          es: "Relaciona superficie cerrada mas flujo con Gauss.",
          zh: "把“闭曲面 + 通量”直接对应到高斯定理。",
        },
        setup: {
          en: "Stokes is about boundary curves and curl. Gauss is about closed surfaces and divergence.",
          es: "Stokes trata de curvas frontera y curl. Gauss trata de superficies cerradas y divergencia.",
          zh: "Stokes 管边界曲线和 curl；Gauss 管闭曲面和 divergence。",
        },
        fullPath: [
          { en: "The geometry is a closed surface, not just an open patch.", es: "La geometria es una superficie cerrada, no solo una pieza abierta.", zh: "这里的几何对象是闭曲面，不是开曲面的一小块。" },
          { en: "The integral is flux, and divergence is available.", es: "La integral es de flujo y la divergencia esta disponible.", zh: "积分类型是通量，而且 divergence 已经很好算。" },
          { en: "So use the Divergence Theorem (Gauss).", es: "Asi que usa el Teorema de la Divergencia (Gauss).", zh: "所以应该用散度定理，也就是高斯定理。" },
        ],
        answer: {
          en: "The Divergence Theorem (Gauss).",
          es: "El Teorema de la Divergencia (Gauss).",
          zh: "散度定理（高斯定理）。",
        },
        selfCheck: {
          en: "Closed surface -> Gauss. Boundary curve -> Stokes.",
          es: "Superficie cerrada -> Gauss. Curva frontera -> Stokes.",
          zh: "闭曲面 -> Gauss；边界曲线 -> Stokes。",
        },
      },
    ],
  },

    "math2e-vector-functions": {
    quiz: [
      {
        prompt: {
          en: "Differentiate r(t)=<t, t^2, sin t>.",
          es: "Deriva r(t)=<t, t^2, sin t>.",
          zh: "求导 r(t)=<t, t^2, sin t>。",
        },
        firstStep: {
          en: "Differentiate each component separately.",
          es: "Deriva cada componente por separado.",
          zh: "把每个分量分别求导。",
        },
        setup: {
          en: "Vector-valued functions use the same derivative rules as single-variable functions, just component by component.",
          es: "Las funciones vectoriales usan las mismas reglas de derivacion que calculo de una variable, solo que componente por componente.",
          zh: "向量值函数的求导规则和一元微积分一样，只是分量逐个来。",
        },
        fullPath: [
          { en: "d/dt of t is 1.", es: "d/dt de t es 1.", zh: "t 的导数是 1。" },
          { en: "d/dt of t^2 is 2t.", es: "d/dt de t^2 es 2t.", zh: "t^2 的导数是 2t。" },
          { en: "d/dt of sin t is cos t, so r'(t)=<1,2t,cos t>.", es: "d/dt de sin t es cos t, asi que r'(t)=<1,2t,cos t>.", zh: "sin t 的导数是 cos t，所以 r'(t)=<1,2t,cos t>。" },
        ],
        answer: {
          en: "<1, 2t, cos t>",
          es: "<1, 2t, cos t>",
          zh: "<1, 2t, cos t>",
        },
        selfCheck: {
          en: "Vector functions differentiate slot by slot.",
          es: "Las funciones vectoriales se derivan casilla por casilla.",
          zh: "向量值函数就是一格一格地求导。",
        },
      },
    ],
  },

    "math2e-arc-length-curvature": {
    quiz: [
      {
        prompt: {
          en: "What quantity do you integrate first to get arc length of a space curve r(t)?",
          es: "¿Que cantidad integras primero para obtener la longitud de arco de una curva espacial r(t)?",
          zh: "要求空间曲线 r(t) 的弧长，首先要积分哪个量？",
        },
        firstStep: {
          en: "Find the speed |r'(t)|.",
          es: "Halla la rapidez |r'(t)|.",
          zh: "先求速度大小 |r'(t)|。",
        },
        setup: {
          en: "Arc length uses speed, not the raw velocity vector.",
          es: "La longitud de arco usa rapidez, no el vector velocidad sin procesar.",
          zh: "弧长公式要用速度大小，不是直接拿速度向量本身。",
        },
        fullPath: [
          { en: "Differentiate the position vector to get r'(t).", es: "Deriva el vector posicion para obtener r'(t).", zh: "先对位置向量求导，得到 r'(t)。" },
          { en: "Take its magnitude |r'(t)|.", es: "Toma su magnitud |r'(t)|.", zh: "再取模长 |r'(t)|。" },
          { en: "Integrate that speed over the parameter interval.", es: "Integra esa rapidez sobre el intervalo del parametro.", zh: "最后在参数区间上积分这个速度大小。" },
        ],
        answer: {
          en: "Integrate |r'(t)|.",
          es: "Integra |r'(t)|.",
          zh: "积分 |r'(t)|。",
        },
        selfCheck: {
          en: "Arc length starts with speed.",
          es: "La longitud de arco empieza con la rapidez.",
          zh: "弧长一定从速度大小开始。",
        },
      },
    ],
  },

    "math2e-greens-theorem": {
    quiz: [
      {
        prompt: {
          en: "A counterclockwise closed curve in the plane surrounds a nice region, and the line integral is P dx + Q dy. What theorem should you test first?",
          es: "Una curva cerrada antihoraria en el plano rodea una region sencilla, y la integral de linea es P dx + Q dy. ¿Que teorema pruebas primero?",
          zh: "平面上一条逆时针闭曲线围住一个好区域，线积分写成 P dx + Q dy。第一步该试哪个定理？",
        },
        firstStep: {
          en: "Check Green's Theorem.",
          es: "Revisa el Teorema de Green.",
          zh: "先看 Green 定理能不能用。",
        },
        setup: {
          en: "Closed plane loop plus P dx + Q dy is the classic Green trigger.",
          es: "Curva plana cerrada mas P dx + Q dy es el disparador clasico de Green.",
          zh: "平面闭曲线加上 P dx + Q dy，就是 Green 定理最典型的触发形状。",
        },
        fullPath: [
          { en: "The curve is closed and lies in the plane.", es: "La curva es cerrada y vive en el plano.", zh: "这条曲线是闭合的，而且就在平面里。" },
          { en: "The integral has the exact P dx + Q dy form.", es: "La integral tiene exactamente la forma P dx + Q dy.", zh: "积分形式也正是 P dx + Q dy。" },
          { en: "So switch to the double integral from Green's Theorem.", es: "Asi que cambia a la integral doble de Green.", zh: "所以应改用 Green 定理对应的二重积分。" },
        ],
        answer: {
          en: "Green's Theorem.",
          es: "El Teorema de Green.",
          zh: "Green 定理。",
        },
        selfCheck: {
          en: "Closed plane loop plus Pdx+Qdy -> Green.",
          es: "Curva plana cerrada mas Pdx+Qdy -> Green.",
          zh: "平面闭曲线加 Pdx+Qdy -> Green。",
        },
      },
    ],
  },

    "math2e-motion-in-space": {
    quiz: [
      {
        prompt: {
          en: "If r(t) is the position vector of a particle, what are r'(t) and r''(t)?",
          es: "Si r(t) es el vector posicion de una particula, ¿que son r'(t) y r''(t)?",
          zh: "如果 r(t) 是粒子的位置向量，那么 r'(t) 和 r''(t) 分别是什么？",
        },
        firstStep: {
          en: "Think of the motion chain: position, then velocity, then acceleration.",
          es: "Piensa en la cadena del movimiento: posicion, luego velocidad, luego aceleracion.",
          zh: "先想清楚运动链条：位置，然后速度，再然后加速度。",
        },
        setup: {
          en: "Motion in space is just vector-valued functions interpreted physically.",
          es: "El movimiento en el espacio es solo una funcion vectorial interpretada fisicamente.",
          zh: "空间运动，本质上就是给向量值函数加上物理意义。",
        },
        fullPath: [
          { en: "Start with r(t) as position.", es: "Empieza con r(t) como posicion.", zh: "先把 r(t) 看成位置。" },
          { en: "Differentiate once to get velocity r'(t).", es: "Deriva una vez para obtener la velocidad r'(t).", zh: "求一次导，得到速度 r'(t)。" },
          { en: "Differentiate again to get acceleration r''(t).", es: "Deriva otra vez para obtener la aceleracion r''(t).", zh: "再求一次导，得到加速度 r''(t)。" },
        ],
        answer: {
          en: "r'(t) is velocity and r''(t) is acceleration.",
          es: "r'(t) es velocidad y r''(t) es aceleracion.",
          zh: "r'(t) 是速度，r''(t) 是加速度。",
        },
        selfCheck: {
          en: "Position -> velocity -> acceleration.",
          es: "Posicion -> velocidad -> aceleracion.",
          zh: "位置 -> 速度 -> 加速度。",
        },
      },
    ],
  },

    "math2e-ftc-line-integrals": {
    quiz: [
      {
        prompt: {
          en: "A line integral runs over a gradient field F=∇φ from A to B. What expression should replace the full integral?",
          es: "Una integral de linea corre sobre un campo gradiente F=∇φ desde A hasta B. ¿Que expresion debe reemplazar la integral completa?",
          zh: "一条线积分对应的是梯度场 F=∇φ，从 A 到 B。完整积分应被什么表达式取代？",
        },
        firstStep: {
          en: "Use the potential at the endpoints.",
          es: "Usa el potencial en los extremos.",
          zh: "直接看势函数在两个端点的值。",
        },
        setup: {
          en: "This theorem is the line-integral version of “antiderivative at the endpoint.”",
          es: "Este teorema es la version para integrales de linea de “antiderivada en el extremo”.",
          zh: "这个定理就是把一元微积分里“原函数代端点”的思想搬到了线积分里。",
        },
        fullPath: [
          { en: "Recognize that F is a gradient field.", es: "Reconoce que F es un campo gradiente.", zh: "先认出 F 是梯度场。" },
          { en: "So the path does not matter; only endpoints matter.", es: "Entonces la trayectoria no importa; solo importan los extremos.", zh: "于是路径本身不重要，只看端点。" },
          { en: "Replace the integral with φ(B)-φ(A).", es: "Reemplaza la integral por φ(B)-φ(A).", zh: "把积分直接改成 φ(B)-φ(A)。" },
        ],
        answer: {
          en: "φ(B)-φ(A)",
          es: "φ(B)-φ(A)",
          zh: "φ(B)-φ(A)",
        },
        selfCheck: {
          en: "Gradient field means endpoint subtraction.",
          es: "Campo gradiente significa resta de extremos.",
          zh: "梯度场就意味着端点相减。",
        },
      },
    ],
  },

    "math2e-parametric-surfaces": {
    quiz: [
      {
        prompt: {
          en: "For a surface r(u,v), what expression gives the surface-area factor?",
          es: "Para una superficie r(u,v), ¿que expresion da el factor de area superficial?",
          zh: "对于参数曲面 r(u,v)，哪个表达式给出面积因子？",
        },
        firstStep: {
          en: "Differentiate with respect to u and v, then cross them.",
          es: "Deriva respecto de u y v, y luego cruza esos vectores.",
          zh: "先分别对 u 和 v 求导，再做叉积。",
        },
        setup: {
          en: "A parameterized surface is built from two tangent directions, so area comes from their cross product.",
          es: "Una superficie parametrizada se construye con dos direcciones tangentes, por eso el area sale de su producto cruz.",
          zh: "参数曲面由两个切向方向织出来，所以面积因子来自这两个方向的叉积。",
        },
        fullPath: [
          { en: "Compute r_u and r_v.", es: "Calcula r_u y r_v.", zh: "先算 r_u 和 r_v。" },
          { en: "Take the cross product r_u × r_v.", es: "Toma el producto cruz r_u × r_v.", zh: "再算叉积 r_u × r_v。" },
          { en: "The area factor is |r_u × r_v|.", es: "El factor de area es |r_u × r_v|.", zh: "面积因子就是 |r_u × r_v|。" },
        ],
        answer: {
          en: "|r_u × r_v|",
          es: "|r_u × r_v|",
          zh: "|r_u × r_v|",
        },
        selfCheck: {
          en: "Two surface directions, then cross.",
          es: "Dos direcciones sobre la superficie, luego producto cruz.",
          zh: "两个曲面方向，最后做叉积。",
        },
      },
    ],
  },

    "analysis140a-completeness": {
    quiz: [
      {
        prompt: {
          en: "What two hypotheses let you invoke completeness to get a supremum?",
          es: "¿Que dos hipotesis te permiten invocar completitud para obtener un supremo?",
          zh: "要调用完备性得到上确界，需要哪两个前提？",
        },
        firstStep: {
          en: "Check the set is nonempty and bounded above.",
          es: "Verifica que el conjunto sea no vacio y acotado superiormente.",
          zh: "先检查这个集合非空而且有上界。",
        },
        setup: {
          en: "Completeness is not a magic word you can say anytime. The set has to satisfy the trigger conditions first.",
          es: "La completitud no es una palabra magica que puedes decir en cualquier momento. El conjunto debe cumplir antes las condiciones de disparo.",
          zh: "完备性不是随时都能喊出来的魔法词，必须先满足触发条件。",
        },
        fullPath: [
          { en: "Check that the set is not empty.", es: "Comprueba que el conjunto no este vacio.", zh: "先确认集合不是空的。" },
          { en: "Check that some upper bound exists.", es: "Comprueba que exista alguna cota superior.", zh: "再确认它确实有某个上界。" },
          { en: "Then completeness guarantees a least upper bound in R.", es: "Entonces la completitud garantiza una minima cota superior en R.", zh: "这样完备性就保证它在 R 中有最小上界。" },
        ],
        answer: {
          en: "Nonempty and bounded above.",
          es: "No vacio y acotado superiormente.",
          zh: "非空，并且有上界。",
        },
        selfCheck: {
          en: "No set check, no completeness call.",
          es: "Sin revisar el conjunto, no puedes llamar a completitud.",
          zh: "不先检查集合条件，就不能乱用完备性。",
        },
      },
    ],
  },

    "analysis140a-nested-intervals": {
    quiz: [
      {
        prompt: {
          en: "What does the nested interval property guarantee for [a1,b1] ⊇ [a2,b2] ⊇ [a3,b3] ⊇ ... ?",
          es: "¿Que garantiza la propiedad de intervalos encajados para [a1,b1] ⊇ [a2,b2] ⊇ [a3,b3] ⊇ ... ?",
          zh: "对 [a1,b1] ⊇ [a2,b2] ⊇ [a3,b3] ⊇ ... 这样的嵌套区间，嵌套区间性质保证什么？",
        },
        firstStep: {
          en: "Focus on the common intersection point, not on each interval separately.",
          es: "Concéntrate en el punto comun de interseccion, no en cada intervalo por separado.",
          zh: "先盯住“共同交点”这个结论，而不是一段一段单独看。",
        },
        setup: {
          en: "Nested closed intervals cannot all slip past each other forever.",
          es: "Los intervalos cerrados encajados no pueden esquivarse para siempre.",
          zh: "嵌套的闭区间不可能永远彼此错开。",
        },
        fullPath: [
          { en: "Each later interval sits inside the earlier ones.", es: "Cada intervalo posterior vive dentro de los anteriores.", zh: "后面的每个区间都包含在前面的区间里。" },
          { en: "Because they are closed and nested, they must share at least one common point.", es: "Como son cerrados y encajados, deben compartir al menos un punto comun.", zh: "因为它们是闭的而且层层嵌套，所以至少共有一个点。" },
          { en: "If the lengths go to 0, that common point is unique.", es: "Si las longitudes tienden a 0, ese punto comun es unico.", zh: "如果长度还趋于 0，那么这个公共点就是唯一的。" },
        ],
        answer: {
          en: "The intersection is nonempty; if lengths go to 0, it is a single point.",
          es: "La interseccion no es vacia; si las longitudes van a 0, es un solo punto.",
          zh: "它们的交集非空；若长度趋于 0，则交集只剩一个点。",
        },
        selfCheck: {
          en: "Nested closed intervals still meet.",
          es: "Los intervalos cerrados encajados siguen intersectandose.",
          zh: "嵌套闭区间一定还会相交。",
        },
      },
    ],
  },

    "analysis140a-series": {
    quiz: [
      {
        prompt: {
          en: "What sequence do you build first when you want to study Σ a_n?",
          es: "¿Que sucesion construyes primero cuando quieres estudiar Σ a_n?",
          zh: "研究 Σ a_n 时，第一步应该先构造哪一个数列？",
        },
        firstStep: {
          en: "Build the partial sums.",
          es: "Construye las sumas parciales.",
          zh: "先构造部分和数列。",
        },
        setup: {
          en: "A series is not a single object floating in space. It is the limit of its partial sums.",
          es: "Una serie no es un objeto suelto en el aire. Es el limite de sus sumas parciales.",
          zh: "级数不是一个凭空悬着的对象，它本质上是部分和数列的极限。",
        },
        fullPath: [
          { en: "Set s_n = a_1 + a_2 + ... + a_n.", es: "Define s_n = a_1 + a_2 + ... + a_n.", zh: "先定义 s_n = a_1 + a_2 + ... + a_n。" },
          { en: "Then ask whether the sequence s_n converges.", es: "Luego pregunta si la sucesion s_n converge.", zh: "然后去问这个部分和数列 s_n 是否收敛。" },
          { en: "If s_n converges, the series converges to that limit.", es: "Si s_n converge, la serie converge a ese limite.", zh: "如果 s_n 收敛，那么这个级数就收敛到那个极限。" },
        ],
        answer: {
          en: "The sequence of partial sums.",
          es: "La sucesion de sumas parciales.",
          zh: "部分和数列。",
        },
        selfCheck: {
          en: "Series = partial sums first.",
          es: "Serie = primero sumas parciales.",
          zh: "级数 = 先看部分和。",
        },
      },
    ],
  },

    "analysis140a-continuity": {
    quiz: [
      {
        prompt: {
          en: "In an epsilon-delta continuity proof at a, what inequality do you usually start from?",
          es: "En una prueba epsilon-delta de continuidad en a, ¿desde que desigualdad sueles empezar?",
          zh: "在 a 点的 epsilon-delta 连续性证明里，通常从哪个不等式开始？",
        },
        firstStep: {
          en: "Start from |f(x)-f(a)|<epsilon and work backward.",
          es: "Empieza con |f(x)-f(a)|<epsilon y trabaja hacia atras.",
          zh: "先从 |f(x)-f(a)|<epsilon 倒推。",
        },
        setup: {
          en: "Continuity proofs are usually backward-design proofs: start from the target and solve for what x must satisfy.",
          es: "Las pruebas de continuidad suelen ser pruebas de diseño hacia atras: empiezas desde la meta y resuelves que debe cumplir x.",
          zh: "连续性证明通常是倒推设计：先从目标出发，再解出 x 需要满足什么条件。",
        },
        fullPath: [
          { en: "Write the target inequality |f(x)-f(a)|<epsilon.", es: "Escribe la desigualdad objetivo |f(x)-f(a)|<epsilon.", zh: "先写出目标不等式 |f(x)-f(a)|<epsilon。" },
          { en: "Algebraically force that target using a condition on |x-a|.", es: "Fuerza esa meta algebraicamente usando una condicion sobre |x-a|.", zh: "再用代数方法把它转化成关于 |x-a| 的条件。" },
          { en: "Choose delta from that condition.", es: "Elige delta a partir de esa condicion.", zh: "最后根据这个条件选出 delta。" },
        ],
        answer: {
          en: "|f(x)-f(a)|<epsilon",
          es: "|f(x)-f(a)|<epsilon",
          zh: "|f(x)-f(a)|<epsilon",
        },
        selfCheck: {
          en: "Continuity proof = target first, delta second.",
          es: "Prueba de continuidad = meta primero, delta despues.",
          zh: "连续性证明 = 目标先写出来，delta 后面再选。",
        },
      },
    ],
  },

};
