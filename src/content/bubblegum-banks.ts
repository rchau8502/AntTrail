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
> = {
  "calc3-parametric-equations": {
    quiz: [
      {
        prompt: {
          en: "A curve is given by x=t^2-1 and y=t+2. What should you track first before sketching?",
          es: "Una curva viene dada por x=t^2-1 y y=t+2. ¿Que debes seguir primero antes de esbozarla?",
          zh: "一条曲线由 x=t^2-1 和 y=t+2 给出。下笔前第一件该跟踪什么？",
        },
        firstStep: {
          en: "Read how x and y both move as t changes.",
          es: "Lee como cambian x e y al cambiar t.",
          zh: "先看 t 变化时，x 和 y 怎么一起动。",
        },
        setup: {
          en: "Parametric-curve questions start by treating t as the driver, not by forcing everything into y=f(x) too early.",
          es: "Las preguntas de curvas parametrizadas empiezan tratando a t como el conductor, no forzando todo a y=f(x) demasiado pronto.",
          zh: "参数曲线题先把 t 当成驾驶员，不要一上来就硬改成 y=f(x)。",
        },
        fullPath: [
          { en: "Pick a few t-values and see where the point lands.", es: "Prueba algunos valores de t y mira donde cae el punto.", zh: "先代几个 t 值，看看点落在哪里。" },
          { en: "Notice how the point moves as t increases.", es: "Observa como se mueve el punto cuando t aumenta.", zh: "再观察 t 变大时，点是怎么移动的。" },
          { en: "Only after that should you worry about the traced shape.", es: "Solo despues de eso conviene pensar en la forma completa.", zh: "最后再去判断整条曲线的形状。" },
        ],
        answer: {
          en: "Track the motion of the point as t changes.",
          es: "Sigue el movimiento del punto al cambiar t.",
          zh: "先跟踪点随 t 变化的运动。",
        },
        selfCheck: {
          en: "Parametric sketch first asks how the point moves.",
          es: "Un bosquejo parametrico primero pregunta como se mueve el punto.",
          zh: "参数图第一问永远是：这个点怎么动。",
        },
      },
    ],
  },
  "calc3-parametric-calculus": {
    quiz: [
      {
        prompt: {
          en: "For x=t^2+1 and y=t^3-t, what is the first formula to write if the problem asks for dy/dx?",
          es: "Para x=t^2+1 y y=t^3-t, ¿que formula escribes primero si te piden dy/dx?",
          zh: "若 x=t^2+1, y=t^3-t，题目要 dy/dx，第一步该写什么公式？",
        },
        firstStep: {
          en: "Write dy/dx as (dy/dt)/(dx/dt).",
          es: "Escribe dy/dx como (dy/dt)/(dx/dt).",
          zh: "先写 dy/dx = (dy/dt)/(dx/dt)。",
        },
        setup: {
          en: "Parametric slope problems are about comparing the y-rate to the x-rate.",
          es: "Los problemas de pendiente parametrica comparan la tasa en y con la tasa en x.",
          zh: "参数曲线的斜率，本质上是 y 的变化率除以 x 的变化率。",
        },
        fullPath: [
          { en: "Differentiate y with respect to t.", es: "Deriva y respecto de t.", zh: "先对 y 关于 t 求导。" },
          { en: "Differentiate x with respect to t.", es: "Deriva x respecto de t.", zh: "再对 x 关于 t 求导。" },
          { en: "Divide the two rates to get dy/dx.", es: "Divide las dos tasas para obtener dy/dx.", zh: "最后把两个变化率相除，得到 dy/dx。" },
        ],
        answer: {
          en: "dy/dx = (dy/dt)/(dx/dt)",
          es: "dy/dx = (dy/dt)/(dx/dt)",
          zh: "dy/dx = (dy/dt)/(dx/dt)",
        },
        selfCheck: {
          en: "Parametric slope = y-rate over x-rate.",
          es: "Pendiente parametrica = tasa en y sobre tasa en x.",
          zh: "参数斜率 = y 变化率 ÷ x 变化率。",
        },
      },
    ],
  },
  "calc3-polar-coordinates": {
    quiz: [
      {
        prompt: {
          en: "A curve is given by r = 2 + 2 cos theta. What two things should you think first before sketching?",
          es: "Una curva viene dada por r = 2 + 2 cos theta. ¿Que dos cosas debes pensar primero antes de dibujarla?",
          zh: "曲线给成 r = 2 + 2 cos theta。下笔前最先要想哪两件事？",
        },
        firstStep: {
          en: "Think radius and angle, not x and y.",
          es: "Piensa en radio y angulo, no en x e y.",
          zh: "先想半径和角度，不是先想 x 和 y。",
        },
        setup: {
          en: "Polar-graph questions become easier once you treat r as distance from the origin and theta as direction.",
          es: "Las graficas polares se vuelven mas faciles cuando tratas r como distancia al origen y theta como direccion.",
          zh: "极坐标图一旦把 r 看成离原点多远、把 theta 看成朝哪个方向，就会好很多。",
        },
        fullPath: [
          { en: "Check how far the point is from the origin for key theta-values.", es: "Mira que tan lejos esta el punto del origen para angulos clave.", zh: "先看几个关键角度时，点离原点有多远。" },
          { en: "Use theta to know which direction that radius points.", es: "Usa theta para saber hacia que direccion apunta ese radio.", zh: "再用 theta 判断这个半径朝哪个方向。" },
          { en: "Then connect the traced positions into the curve.", es: "Luego conecta esas posiciones para formar la curva.", zh: "最后把这些位置连起来形成整条曲线。" },
        ],
        answer: {
          en: "Think distance from the origin and direction angle.",
          es: "Piensa en la distancia al origen y en el angulo de direccion.",
          zh: "先想离原点多远，再想朝哪个角度。",
        },
        selfCheck: {
          en: "Polar = radius first, angle second.",
          es: "Polar = primero radio, luego angulo.",
          zh: "极坐标 = 先半径，后角度。",
        },
      },
    ],
  },
  "proof-functions": {
    quiz: [
      {
        prompt: {
          en: "Prove that f(x)=2x+1 on R is injective.",
          es: "Demuestra que f(x)=2x+1 en R es inyectiva.",
          zh: "证明定义在 R 上的 f(x)=2x+1 是单射。",
        },
        firstStep: {
          en: "Assume f(a)=f(b) and compare outputs.",
          es: "Supone f(a)=f(b) y compara las salidas.",
          zh: "先设 f(a)=f(b)，再比较输出。",
        },
        setup: {
          en: "Injective proofs usually start from equal outputs.",
          es: "Las pruebas de inyectividad suelen empezar con salidas iguales.",
          zh: "证明单射通常从“输出相等”开始。",
        },
        fullPath: [
          { en: "Assume 2a+1 = 2b+1.", es: "Supone 2a+1 = 2b+1.", zh: "设 2a+1 = 2b+1。" },
          { en: "Then 2a = 2b, so a = b.", es: "Entonces 2a = 2b, asi que a = b.", zh: "则 2a = 2b，所以 a = b。" },
          { en: "Therefore f is injective.", es: "Por tanto f es inyectiva.", zh: "因此 f 是单射。" },
        ],
        answer: {
          en: "f is injective.",
          es: "f es inyectiva.",
          zh: "f 是单射。",
        },
        selfCheck: {
          en: "Injective = same output forces same input.",
          es: "Inyectiva = misma salida obliga a misma entrada.",
          zh: "单射 = 输出相同就逼出输入相同。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Show that f(x)=x^2 on R is not injective.",
          es: "Muestra que f(x)=x^2 en R no es inyectiva.",
          zh: "说明定义在 R 上的 f(x)=x^2 不是单射。",
        },
        firstStep: {
          en: "Look for two different inputs with the same output.",
          es: "Busca dos entradas distintas con la misma salida.",
          zh: "找两个不同输入却有相同输出。",
        },
        setup: {
          en: "To kill injectivity, one good pair is enough.",
          es: "Para negar la inyectividad, basta una buena pareja.",
          zh: "要否定单射，只要找到一对就够了。",
        },
        fullPath: [
          { en: "Take 1 and -1.", es: "Toma 1 y -1.", zh: "取 1 和 -1。" },
          { en: "f(1)=1 and f(-1)=1.", es: "f(1)=1 y f(-1)=1.", zh: "f(1)=1 且 f(-1)=1。" },
          { en: "Inputs differ, outputs match, so f is not injective.", es: "Las entradas son distintas y las salidas coinciden, asi que f no es inyectiva.", zh: "输入不同但输出相同，所以 f 不是单射。" },
        ],
        answer: {
          en: "f is not injective.",
          es: "f no es inyectiva.",
          zh: "f 不是单射。",
        },
        selfCheck: {
          en: "Not injective = find one repeated output from different inputs.",
          es: "No inyectiva = encuentra una salida repetida desde entradas distintas.",
          zh: "不是单射 = 找到不同输入却撞到同一输出。",
        },
      },
    ],
  },
  "proof-set-operations": {
    quiz: [
      {
        prompt: {
          en: "Prove A ∩ B ⊆ A.",
          es: "Demuestra A ∩ B ⊆ A.",
          zh: "证明 A ∩ B ⊆ A。",
        },
        firstStep: {
          en: "Take x in A ∩ B.",
          es: "Toma x en A ∩ B.",
          zh: "先取 x ∈ A ∩ B。",
        },
        setup: {
          en: "Intersection proofs are element-chasing proofs.",
          es: "Las pruebas con interseccion se hacen persiguiendo elementos.",
          zh: "交集证明本质上是元素追踪。",
        },
        fullPath: [
          { en: "If x ∈ A ∩ B, then x ∈ A and x ∈ B.", es: "Si x ∈ A ∩ B, entonces x ∈ A y x ∈ B.", zh: "若 x ∈ A ∩ B，则 x ∈ A 且 x ∈ B。" },
          { en: "In particular, x ∈ A.", es: "En particular, x ∈ A.", zh: "尤其有 x ∈ A。" },
          { en: "Therefore A ∩ B ⊆ A.", es: "Por tanto A ∩ B ⊆ A.", zh: "因此 A ∩ B ⊆ A。" },
        ],
        answer: {
          en: "A ∩ B ⊆ A.",
          es: "A ∩ B ⊆ A.",
          zh: "A ∩ B ⊆ A。",
        },
        selfCheck: {
          en: "Start with an element. Unpack the set operation. Land in the target set.",
          es: "Empieza con un elemento, abre la operacion y llega al conjunto meta.",
          zh: "先取元素，拆开集合运算，再落到目标集合里。",
        },
      },
    ],
  },
  "la-basis-dimension": {
    quiz: [
      {
        prompt: {
          en: "What is the dimension of span{(1,0),(0,1)} in R^2?",
          es: "¿Cual es la dimension de span{(1,0),(0,1)} en R^2?",
          zh: "span{(1,0),(0,1)} 在 R^2 中的维数是多少？",
        },
        firstStep: {
          en: "Check how many vectors are in a basis for the space.",
          es: "Mira cuantos vectores hay en una base del espacio.",
          zh: "先看这个空间的一组基里有几个向量。",
        },
        setup: {
          en: "Those two vectors are independent and span R^2.",
          es: "Esos dos vectores son independientes y generan R^2.",
          zh: "这两个向量线性无关，而且张成 R^2。",
        },
        fullPath: [
          { en: "The set already spans R^2.", es: "Ese conjunto ya genera R^2.", zh: "这组向量本身就张成 R^2。" },
          { en: "It has 2 independent basis vectors.", es: "Tiene 2 vectores base independientes.", zh: "它有 2 个线性无关的基向量。" },
          { en: "So the dimension is 2.", es: "Asi que la dimension es 2.", zh: "所以维数是 2。" },
        ],
        answer: {
          en: "2",
          es: "2",
          zh: "2",
        },
        selfCheck: {
          en: "Dimension = number of vectors in a basis.",
          es: "Dimension = numero de vectores en una base.",
          zh: "维数 = 一组基里向量的个数。",
        },
      },
    ],
  },
  "la-diagonalization": {
    quiz: [
      {
        prompt: {
          en: "A 2x2 matrix has two distinct eigenvalues. What is the fast diagonalization conclusion?",
          es: "Una matriz 2x2 tiene dos eigenvalores distintos. ¿Cual es la conclusion rapida sobre diagonalizacion?",
          zh: "一个 2x2 矩阵有两个不同的特征值。关于对角化，最快的结论是什么？",
        },
        firstStep: {
          en: "Use the distinct-eigenvalues shortcut.",
          es: "Usa el atajo de eigenvalores distintos.",
          zh: "直接用“特征值互异”的捷径。",
        },
        setup: {
          en: "Distinct eigenvalues give independent eigenvectors.",
          es: "Eigenvalores distintos dan eigenvectores independientes.",
          zh: "不同特征值会给出线性无关的特征向量。",
        },
        fullPath: [
          { en: "Two distinct eigenvalues give two independent eigenvectors.", es: "Dos eigenvalores distintos dan dos eigenvectores independientes.", zh: "两个不同特征值会给出两个线性无关的特征向量。" },
          { en: "A 2x2 matrix only needs two independent eigenvectors to diagonalize.", es: "Una matriz 2x2 solo necesita dos eigenvectores independientes para diagonalizarse.", zh: "2x2 矩阵只要有两个线性无关的特征向量就能对角化。" },
          { en: "So the matrix is diagonalizable.", es: "Asi que la matriz es diagonalizable.", zh: "所以该矩阵可对角化。" },
        ],
        answer: {
          en: "It is diagonalizable.",
          es: "Es diagonalizable.",
          zh: "它可对角化。",
        },
        selfCheck: {
          en: "Distinct eigenvalues are one of the fastest diagonalization triggers.",
          es: "Eigenvalores distintos son una de las pistas mas rapidas para diagonalizar.",
          zh: "特征值互异，是判断可对角化最快的线索之一。",
        },
      },
    ],
  },
  "prob-covariance-correlation": {
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
  "la-characteristic-polynomial": {
    quiz: [
      {
        prompt: {
          en: "For A = [[2,1],[0,3]], write the characteristic polynomial.",
          es: "Para A = [[2,1],[0,3]], escribe el polinomio característico.",
          zh: "对 A = [[2,1],[0,3]]，写出特征多项式。",
        },
        firstStep: {
          en: "Set up det(A - λI).",
          es: "Plantea det(A - λI).",
          zh: "先写 det(A - λI)。",
        },
        setup: {
          en: "Characteristic polynomial always starts from det(A - λI).",
          es: "El polinomio característico siempre empieza con det(A - λI).",
          zh: "特征多项式永远从 det(A - λI) 起步。",
        },
        fullPath: [
          { en: "A - λI = [[2-λ,1],[0,3-λ]].", es: "A - λI = [[2-λ,1],[0,3-λ]].", zh: "A - λI = [[2-λ,1],[0,3-λ]]。" },
          { en: "det(A - λI) = (2-λ)(3-λ).", es: "det(A - λI) = (2-λ)(3-λ).", zh: "det(A - λI) = (2-λ)(3-λ)。" },
          { en: "So the characteristic polynomial is (2-λ)(3-λ).", es: "Así que el polinomio característico es (2-λ)(3-λ).", zh: "所以特征多项式是 (2-λ)(3-λ)。" },
        ],
        answer: {
          en: "(2-λ)(3-λ)",
          es: "(2-λ)(3-λ)",
          zh: "(2-λ)(3-λ)",
        },
        selfCheck: {
          en: "Characteristic polynomial = determinant after subtracting λI.",
          es: "Polinomio característico = determinante después de restar λI.",
          zh: "特征多项式 = 减去 λI 之后的行列式。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Find the eigenvalues of A = [[4,0],[1,2]].",
          es: "Halla los valores propios de A = [[4,0],[1,2]].",
          zh: "求 A = [[4,0],[1,2]] 的特征值。",
        },
        firstStep: {
          en: "Solve det(A - λI) = 0.",
          es: "Resuelve det(A - λI) = 0.",
          zh: "解 det(A - λI) = 0。",
        },
        setup: {
          en: "Once the characteristic polynomial is factored, its roots are the eigenvalues.",
          es: "Una vez factorizado el polinomio característico, sus raíces son los valores propios.",
          zh: "特征多项式因式分解后，它的根就是特征值。",
        },
        fullPath: [
          { en: "det([[4-λ,0],[1,2-λ]]) = (4-λ)(2-λ).", es: "det([[4-λ,0],[1,2-λ]]) = (4-λ)(2-λ).", zh: "det([[4-λ,0],[1,2-λ]]) = (4-λ)(2-λ)。" },
          { en: "Set it equal to 0.", es: "Iguala a 0.", zh: "令它等于 0。" },
          { en: "The eigenvalues are λ = 4 and λ = 2.", es: "Los valores propios son λ = 4 y λ = 2.", zh: "所以特征值是 λ = 4 和 λ = 2。" },
        ],
        answer: {
          en: "λ = 4, 2",
          es: "λ = 4, 2",
          zh: "λ = 4, 2",
        },
        selfCheck: {
          en: "Roots of det(A - λI) are the eigenvalues.",
          es: "Las raíces de det(A - λI) son los valores propios.",
          zh: "det(A - λI) 的根就是特征值。",
        },
      },
    ],
  },
  "la-eigenspace": {
    quiz: [
      {
        prompt: {
          en: "If λ = 2 is an eigenvalue of A, what system do you solve to find its eigenspace?",
          es: "Si λ = 2 es un valor propio de A, ¿qué sistema resuelves para hallar su espacio propio?",
          zh: "如果 λ = 2 是 A 的特征值，要解什么方程组来找对应特征空间？",
        },
        firstStep: {
          en: "Set up (A - 2I)x = 0.",
          es: "Plantea (A - 2I)x = 0.",
          zh: "先写 (A - 2I)x = 0。",
        },
        setup: {
          en: "Eigenspace means the null space of A - λI.",
          es: "El espacio propio es el espacio nulo de A - λI.",
          zh: "特征空间就是 A - λI 的零空间。",
        },
        fullPath: [
          { en: "Subtract λI from A.", es: "Resta λI a A.", zh: "先从 A 里减去 λI。" },
          { en: "Solve the homogeneous system.", es: "Resuelve el sistema homogéneo.", zh: "再解对应的齐次方程组。" },
          { en: "The solution set is the eigenspace.", es: "El conjunto solución es el espacio propio.", zh: "解集就是该特征空间。" },
        ],
        answer: {
          en: "(A - 2I)x = 0",
          es: "(A - 2I)x = 0",
          zh: "(A - 2I)x = 0",
        },
        selfCheck: {
          en: "Eigenspace = null space after subtracting λI.",
          es: "Espacio propio = espacio nulo después de restar λI.",
          zh: "特征空间 = 减去 λI 之后的零空间。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Find a basis for the eigenspace of A = [[2,0],[0,3]] corresponding to λ = 2.",
          es: "Halla una base del espacio propio de A = [[2,0],[0,3]] correspondiente a λ = 2.",
          zh: "求 A = [[2,0],[0,3]] 在 λ = 2 时的特征空间的一组基。",
        },
        firstStep: {
          en: "Solve (A - 2I)x = 0.",
          es: "Resuelve (A - 2I)x = 0.",
          zh: "解 (A - 2I)x = 0。",
        },
        setup: {
          en: "That null space tells you every eigenvector direction for λ = 2.",
          es: "Ese espacio nulo te da todas las direcciones propias para λ = 2.",
          zh: "这个零空间给出 λ = 2 对应的全部特征向量方向。",
        },
        fullPath: [
          { en: "A - 2I = [[0,0],[0,1]].", es: "A - 2I = [[0,0],[0,1]].", zh: "A - 2I = [[0,0],[0,1]]。" },
          { en: "The system says x_2 = 0, with x_1 free.", es: "El sistema dice x_2 = 0 y x_1 libre.", zh: "方程组给出 x_2 = 0，而 x_1 自由。" },
          { en: "So the eigenspace basis is {(1,0)}.", es: "Así que una base del espacio propio es {(1,0)}.", zh: "所以该特征空间的一组基是 {(1,0)}。" },
        ],
        answer: {
          en: "{(1,0)}",
          es: "{(1,0)}",
          zh: "{(1,0)}",
        },
        selfCheck: {
          en: "Solve the null space, then read off a basis.",
          es: "Resuelve el espacio nulo y luego lee una base.",
          zh: "先解零空间，再读出一组基。",
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
    midterm: [
      {
        prompt: {
          en: "Three factories make a product: 50%, 30%, 20% of output. Their defect rates are 1%, 2%, and 5%. A chosen item is defective. What setup finds the chance it came from factory 3?",
          es: "Tres fabricas producen un articulo: 50%, 30%, 20% de la produccion. Sus tasas de defecto son 1%, 2% y 5%. Un articulo elegido es defectuoso. ¿Que planteamiento halla la probabilidad de que venga de la fabrica 3?",
          zh: "三家工厂分别生产某产品的 50%、30%、20%。它们的次品率分别是 1%、2%、5%。随机拿到一个次品，求它来自 3 号工厂的设法是什么？",
        },
        firstStep: {
          en: "Write Bayes with factory 3 in the numerator and all defect paths in the denominator.",
          es: "Escribe Bayes con la fabrica 3 en el numerador y todos los caminos de defecto en el denominador.",
          zh: "先写贝叶斯：分子放“3 号工厂且次品”，分母放所有导致次品的路径。",
        },
        setup: {
          en: "This is a hidden-source-after-result problem, so Bayes is the right reversal move.",
          es: "Este es un problema de fuente escondida despues de observar el resultado, asi que Bayes es el movimiento correcto.",
          zh: "这题是“先看到结果，再反推来源”，所以该用贝叶斯反转条件。",
        },
        fullPath: [
          { en: "Let Fi be the event 'made by factory i' and D be 'defective'.", es: "Sea Fi el evento 'hecho por la fabrica i' y D 'defectuoso'.", zh: "设 Fi 表示“来自第 i 家工厂”，D 表示“次品”。" },
          { en: "Write P(F3|D)=P(D|F3)P(F3)/P(D).", es: "Escribe P(F3|D)=P(D|F3)P(F3)/P(D).", zh: "写出 P(F3|D)=P(D|F3)P(F3)/P(D)。" },
          { en: "Expand P(D) by total probability across the three factories.", es: "Expande P(D) por probabilidad total a traves de las tres fabricas.", zh: "再用全概率把 P(D) 按三家工厂展开。" },
        ],
        answer: {
          en: "Use Bayes with denominator from total probability.",
          es: "Usa Bayes con denominador sacado por probabilidad total.",
          zh: "用贝叶斯，分母再靠全概率展开。",
        },
        selfCheck: {
          en: "Observed result, hidden source -> Bayes plus total probability.",
          es: "Resultado observado, fuente escondida -> Bayes mas probabilidad total.",
          zh: "结果已知、来源未知 -> 贝叶斯 + 全概率。",
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
  "calc3-line-integrals": {
    quiz: [
      {
        prompt: {
          en: "You are given a vector field F and a curve C. What is the first setup for a line integral?",
          es: "Te dan un campo vectorial F y una curva C. ¿Cuál es el primer planteamiento para una integral de línea?",
          zh: "给你一个向量场 F 和一条曲线 C。线积分第一步该怎么设？",
        },
        firstStep: {
          en: "Parameterize the curve and rewrite everything in one variable.",
          es: "Parametriza la curva y reescribe todo en una sola variable.",
          zh: "先把曲线参数化，再把所有东西改写成一个参数。",
        },
        setup: {
          en: "Line integrals turn a path problem into a one-variable integral along that path.",
          es: "Las integrales de línea convierten un problema sobre una trayectoria en una integral de una variable sobre esa trayectoria.",
          zh: "线积分就是把“沿着这条路走”的问题，变成一个参数上的一元积分。",
        },
        fullPath: [
          { en: "Write r(t) for the curve.", es: "Escribe r(t) para la curva.", zh: "先写曲线参数式 r(t)。" },
          { en: "Substitute x(t), y(t), z(t) into F.", es: "Sustituye x(t), y(t), z(t) dentro de F.", zh: "把 x(t), y(t), z(t) 代进 F。" },
          { en: "Use r'(t) and integrate over the parameter interval.", es: "Usa r'(t) e integra en el intervalo del parámetro.", zh: "再用 r'(t)，按参数区间去积分。" },
        ],
        answer: {
          en: "Parameterize C first.",
          es: "Primero parametriza C.",
          zh: "先参数化曲线 C。",
        },
        selfCheck: {
          en: "No parameterization, no line integral setup.",
          es: "Sin parametrización no hay planteamiento de integral de línea.",
          zh: "不先参数化，线积分就立不起来。",
        },
      },
    ],
  },
  "calc3-conservative-fields": {
    midterm: [
      {
        prompt: {
          en: "In a simply connected region, F = <P,Q> has P_y = Q_x. What should you conclude first?",
          es: "En una región simplemente conexa, F = <P,Q> cumple P_y = Q_x. ¿Qué debes concluir primero?",
          zh: "在单连通区域内，F = <P,Q> 满足 P_y = Q_x。第一结论该是什么？",
        },
        firstStep: {
          en: "Conclude the field is conservative and hunt for a potential function.",
          es: "Concluye que el campo es conservativo y busca una función potencial.",
          zh: "先判断它是保守场，再去找势函数。",
        },
        setup: {
          en: "Equal cross-partials in the right region trigger the conservative-field shortcut.",
          es: "Igualdad de derivadas cruzadas en la región correcta activa el atajo de campo conservativo.",
          zh: "在合适区域里，偏导交叉相等就是保守场的快捷触发线索。",
        },
        fullPath: [
          { en: "Check the region condition.", es: "Verifica la condición sobre la región.", zh: "先确认区域条件。" },
          { en: "Use P_y = Q_x to conclude conservativeness.", es: "Usa P_y = Q_x para concluir que es conservativo.", zh: "再用 P_y = Q_x 判断它是保守场。" },
          { en: "Then solve for f with ∇f = F.", es: "Luego resuelve f con ∇f = F.", zh: "最后找满足 ∇f = F 的势函数 f。" },
        ],
        answer: {
          en: "It is conservative; now find a potential.",
          es: "Es conservativo; ahora busca un potencial.",
          zh: "它是保守场；接着去找势函数。",
        },
        selfCheck: {
          en: "Cross-partials match + nice region = conservative shortcut.",
          es: "Derivadas cruzadas iguales + región buena = atajo conservativo.",
          zh: "交叉偏导相等 + 区域够好 = 保守场捷径。",
        },
      },
    ],
  },
  "calc3-greens-theorem": {
    final: [
      {
        prompt: {
          en: "A closed counterclockwise plane curve bounds region D. When should you replace a line integral with Green's Theorem?",
          es: "Una curva plana cerrada y orientada en sentido antihorario encierra la región D. ¿Cuándo conviene cambiar la integral de línea por el Teorema de Green?",
          zh: "一条逆时针闭合平面曲线围住区域 D。什么时候该把线积分换成 Green 定理？",
        },
        firstStep: {
          en: "Use Green when the curve is closed in the plane and the interior region is easier to integrate over.",
          es: "Usa Green cuando la curva es cerrada en el plano y la región interior es más fácil de integrar.",
          zh: "当曲线是平面闭合曲线，而且内部区域更好积分时，就该用 Green。",
        },
        setup: {
          en: "Green trades a circulation line integral for a double integral over the enclosed region.",
          es: "Green cambia una integral de circulación por una integral doble sobre la región encerrada.",
          zh: "Green 定理会把绕边界的线积分，换成区域内部的二重积分。",
        },
        fullPath: [
          { en: "Check closed plane curve and positive orientation.", es: "Verifica curva plana cerrada y orientación positiva.", zh: "先确认是平面闭曲线，且方向为正向。" },
          { en: "Compute Q_x - P_y.", es: "Calcula Q_x - P_y.", zh: "再算 Q_x - P_y。" },
          { en: "Integrate that over D.", es: "Integra eso sobre D.", zh: "最后在区域 D 上做二重积分。" },
        ],
        answer: {
          en: "Use Green's Theorem when the enclosed-region integral is cleaner.",
          es: "Usa Green cuando la integral sobre la región encerrada es más limpia.",
          zh: "当区域积分更干净时，就该用 Green 定理。",
        },
        selfCheck: {
          en: "Closed plane curve? Think Green.",
          es: "¿Curva plana cerrada? Piensa en Green.",
          zh: "平面闭曲线？先想 Green。",
        },
      },
    ],
  },
  "calc3-divergence-theorem": {
    final: [
      {
        prompt: {
          en: "A vector field flows across a closed surface S enclosing solid E. When is the Divergence Theorem the right move?",
          es: "Un campo vectorial fluye a través de una superficie cerrada S que encierra un sólido E. ¿Cuándo es correcta la jugada de usar el Teorema de la Divergencia?",
          zh: "一个向量场穿过闭合曲面 S，包住实体 E。什么时候该用散度定理？",
        },
        firstStep: {
          en: "Use it when flux through the closed surface is harder than integrating div F over the volume.",
          es: "Úsalo cuando el flujo por la superficie cerrada sea más difícil que integrar div F sobre el volumen.",
          zh: "当直接算闭曲面通量更麻烦，而体积分 div F 更容易时，就该用它。",
        },
        setup: {
          en: "Divergence Theorem swaps closed-surface flux for a triple integral over the enclosed solid.",
          es: "El Teorema de la Divergencia cambia el flujo por una superficie cerrada por una integral triple sobre el sólido encerrado.",
          zh: "散度定理会把闭曲面通量换成包围实体上的三重积分。",
        },
        fullPath: [
          { en: "Check that S is closed and oriented outward.", es: "Verifica que S sea cerrada y con orientación exterior.", zh: "先确认 S 是闭合曲面，而且朝外定向。" },
          { en: "Compute div F.", es: "算出 div F。", zh: "计算 div F。" },
          { en: "Integrate div F over the solid E.", es: "Integra div F sobre el sólido E.", zh: "在实体 E 上做三重积分。" },
        ],
        answer: {
          en: "Use the Divergence Theorem when the volume integral is cleaner than the surface flux.",
          es: "Usa el Teorema de la Divergencia cuando la integral de volumen es más limpia que el flujo por la superficie.",
          zh: "当体积分比曲面通量更好算时，就该用散度定理。",
        },
        selfCheck: {
          en: "Closed surface flux? Try divergence before grinding.",
          es: "¿Flujo en superficie cerrada? Prueba divergencia antes de grindear.",
          zh: "闭曲面通量题？先想散度定理，别急着硬算。",
        },
      },
    ],
  },
  "proof-quantifiers": {
    quiz: [
      {
        prompt: {
          en: "Negate: 'For every real x, x^2 >= 0.'",
          es: "Niega: 'Para todo real x, x^2 >= 0.'",
          zh: "否定：‘对所有实数 x，都有 x^2 >= 0。’",
        },
        firstStep: {
          en: "Flip 'for every' to 'there exists' and negate the statement after it.",
          es: "Cambia 'para todo' por 'existe' y niega la afirmación de adentro.",
          zh: "先把‘对所有’翻成‘存在’，再把后面的条件否掉。",
        },
        setup: {
          en: "Quantifier negation always flips the quantifier and negates the property.",
          es: "Negar cuantificadores siempre cambia el cuantificador y niega la propiedad.",
          zh: "量词否定的固定套路，就是先翻量词，再否条件。",
        },
        fullPath: [
          { en: "Start from 'for every x'.", es: "从 'para todo x' 开始。", zh: "先看到‘对所有 x’。" },
          { en: "Negation becomes 'there exists x'.", es: "否定后变成 'existe x'.", zh: "否定后先变成‘存在某个 x’。" },
          { en: "Then negate x^2 >= 0 to x^2 < 0.", es: "Luego niega x^2 >= 0 a x^2 < 0.", zh: "再把 x^2 >= 0 否成 x^2 < 0。" },
        ],
        answer: {
          en: "There exists a real x such that x^2 < 0.",
          es: "Existe un real x tal que x^2 < 0.",
          zh: "存在实数 x，使得 x^2 < 0。",
        },
        selfCheck: {
          en: "Negate a quantifier by flipping it first.",
          es: "Niega un cuantificador cambiándolo primero.",
          zh: "量词先翻，再否内容。",
        },
      },
    ],
  },
  "proof-biconditional": {
    midterm: [
      {
        prompt: {
          en: "How do you prove 'n is even if and only if n^2 is even'?",
          es: "¿Cómo pruebas 'n es par si y solo si n^2 es par'?",
          zh: "怎么证明‘n 是偶数，当且仅当 n^2 是偶数’？",
        },
        firstStep: {
          en: "Split it into two directions.",
          es: "Sepáralo en dos direcciones.",
          zh: "先拆成两个方向来证。",
        },
        setup: {
          en: "An 'if and only if' proof is always two proofs unless one direction is already known.",
          es: "Una prueba de 'si y solo si' siempre son dos pruebas, salvo que una dirección ya esté hecha.",
          zh: "‘当且仅当’本质上就是双向证明，除非有一边已经现成。",
        },
        fullPath: [
          { en: "Prove: if n is even, then n^2 is even.", es: "Prueba: si n es par, entonces n^2 es par.", zh: "先证：若 n 是偶数，则 n^2 是偶数。" },
          { en: "Then prove: if n^2 is even, then n is even.", es: "Luego prueba: si n^2 es par, entonces n es par.", zh: "再证：若 n^2 是偶数，则 n 是偶数。" },
          { en: "Once both directions are done, the biconditional is done.", es: "Cuando ambas direcciones están hechas, queda probado el bicondicional.", zh: "两个方向都做完，双条件就证完了。" },
        ],
        answer: {
          en: "Prove both directions separately.",
          es: "Prueba las dos direcciones por separado.",
          zh: "把两个方向分别证明。",
        },
        selfCheck: {
          en: "Iff = forward and backward.",
          es: "Iff = ida y vuelta.",
          zh: "当且仅当 = 正向 + 反向。",
        },
      },
    ],
  },
  "proof-equivalence-classes": {
    quiz: [
      {
        prompt: {
          en: "For congruence mod 3, what belongs in the class [1]?",
          es: "Para congruencia módulo 3, ¿qué pertenece a la clase [1]?",
          zh: "模 3 同余里，[1] 这个等价类里有哪些数？",
        },
        firstStep: {
          en: "List numbers that differ from 1 by a multiple of 3.",
          es: "Enumera números que difieren de 1 por un múltiplo de 3.",
          zh: "先写所有和 1 相差 3 的倍数的数。",
        },
        setup: {
          en: "An equivalence class gathers everything related to one representative.",
          es: "Una clase de equivalencia reúne todo lo relacionado con un representante.",
          zh: "等价类就是把所有跟这个代表元有同样关系的元素收在一起。",
        },
        fullPath: [
          { en: "Start from 1.", es: "Empieza con 1.", zh: "从 1 开始。" },
          { en: "Add or subtract multiples of 3: ..., -5, -2, 1, 4, 7, ...", es: "Suma o resta múltiplos de 3: ..., -5, -2, 1, 4, 7, ...", zh: "加减 3 的倍数：..., -5, -2, 1, 4, 7, ..." },
          { en: "Those are exactly the integers congruent to 1 mod 3.", es: "Esos son exactamente los enteros congruentes con 1 módulo 3.", zh: "这些正是所有模 3 余 1 的整数。" },
        ],
        answer: {
          en: "{..., -5, -2, 1, 4, 7, ...}",
          es: "{..., -5, -2, 1, 4, 7, ...}",
          zh: "{..., -5, -2, 1, 4, 7, ...}",
        },
        selfCheck: {
          en: "Equivalence class = everything related to one representative.",
          es: "Clase de equivalencia = todo lo relacionado con un representante.",
          zh: "等价类 = 跟某个代表元有关的全部元素。",
        },
      },
    ],
  },
  "proof-well-defined": {
    final: [
      {
        prompt: {
          en: "A function is defined on equivalence classes by picking representatives. What must you prove first?",
          es: "Una función se define sobre clases de equivalencia eligiendo representantes. ¿Qué debes probar primero?",
          zh: "一个函数是在等价类上通过选代表元来定义的。第一件必须证明的事是什么？",
        },
        firstStep: {
          en: "Show the output does not depend on which representative you chose.",
          es: "Demuestra que la salida no depende del representante elegido.",
          zh: "先证输出不依赖你选的是哪个代表元。",
        },
        setup: {
          en: "Well-defined means different names for the same class cannot give different outputs.",
          es: "Bien definida significa que dos nombres distintos de la misma clase no pueden dar salidas distintas.",
          zh: "定义良好就是：同一个等价类换个代表元，不能跑出不同答案。",
        },
        fullPath: [
          { en: "Take two representatives a and b from the same class.", es: "Toma dos representantes a y b de la misma clase.", zh: "取同一个等价类里的两个代表元 a 和 b。" },
          { en: "Assume a ~ b.", es: "Supón a ~ b.", zh: "先假设 a ~ b。" },
          { en: "Show the formula gives the same output for a and b.", es: "Demuestra que la fórmula produce la misma salida para a y b.", zh: "证明代入公式后，a 和 b 的输出相同。" },
        ],
        answer: {
          en: "Prove the rule is independent of the representative.",
          es: "Prueba que la regla es independiente del representante.",
          zh: "证明这条规则与代表元无关。",
        },
        selfCheck: {
          en: "Well-defined = same class, same output.",
          es: "Bien definida = misma clase, misma salida.",
          zh: "定义良好 = 同类同输出。",
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
          en: "Use Bolzano-Weierstrass.",
          es: "Usa Bolzano-Weierstrass.",
          zh: "先用 Bolzano-Weierstrass 定理。",
        },
        setup: {
          en: "Bounded sequence in R plus convergent subsequence request is the classic trigger.",
          es: "Sucesión acotada en R más petición de subsucesión convergente es el disparador clásico.",
          zh: "‘实数列有界’再加‘找收敛子列’，这就是最标准的触发组合。",
        },
        fullPath: [
          { en: "Check boundedness.", es: "Verifica que esté acotada.", zh: "先确认数列有界。" },
          { en: "Invoke Bolzano-Weierstrass.", es: "Invoca Bolzano-Weierstrass.", zh: "直接调用 Bolzano-Weierstrass。" },
          { en: "Conclude that a convergent subsequence exists.", es: "Concluye que existe una subsucesión convergente.", zh: "于是可推出存在收敛子列。" },
        ],
        answer: {
          en: "Use Bolzano-Weierstrass: a bounded sequence has a convergent subsequence.",
          es: "Usa Bolzano-Weierstrass: una sucesión acotada tiene una subsucesión convergente.",
          zh: "用 Bolzano-Weierstrass：有界实数列一定有收敛子列。",
        },
        selfCheck: {
          en: "Bounded in R? Think convergent subsequence.",
          es: "¿Acotada en R? Piensa en subsucesión convergente.",
          zh: "实数列有界？就先想收敛子列。",
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
          en: "Compare tail suprema of s_n+t_n with tail suprema of s_n and t_n separately.",
          es: "Compara los supremos de cola de s_n+t_n con los de s_n y t_n por separado.",
          zh: "先把 s_n+t_n 的尾部上确界，和 s_n、t_n 各自的尾部上确界比较。",
        },
        setup: {
          en: "lim sup is built from tail suprema, so tail inequalities are the right language here.",
          es: "lim sup se construye con supremos de cola, así que las desigualdades de cola son el lenguaje correcto.",
          zh: "lim sup 本来就是由尾部上确界构成的，所以这题要直接比尾部上确界。",
        },
        fullPath: [
          { en: "For each N, sup_{n>N}(s_n+t_n) <= sup_{n>N}s_n + sup_{n>N}t_n.", es: "Para cada N, sup_{n>N}(s_n+t_n) <= sup_{n>N}s_n + sup_{n>N}t_n.", zh: "对每个 N，都有 sup_{n>N}(s_n+t_n) <= sup_{n>N}s_n + sup_{n>N}t_n。" },
          { en: "Now send N to infinity on both sides.", es: "Ahora manda N al infinito en ambos lados.", zh: "然后让 N 趋于无穷。" },
          { en: "The inequality survives in the limit, so the statement is true.", es: "La desigualdad sobrevive al límite, así que la afirmación es verdadera.", zh: "这个不等式在极限下仍成立，所以命题为真。" },
        ],
        answer: {
          en: "The statement is true.",
          es: "La afirmación es verdadera.",
          zh: "这个命题是真的。",
        },
        selfCheck: {
          en: "lim sup questions usually become tail-sup questions first.",
          es: "Las preguntas de lim sup suelen convertirse primero en preguntas sobre supremos de cola.",
          zh: "做 lim sup 题，第一步通常是改写成尾部上确界。",
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
          en: "Read it as a positive-term comparison or integral-test problem, not an alternating-series problem.",
          es: "Léelo como un problema de comparación o criterio integral para términos positivos, no como uno alternante.",
          zh: "先把它看成正项级数的比较/积分判别题，不是交错级数题。",
        },
        setup: {
          en: "The shape 1/(n times logs) is a classic integral-test family.",
          es: "La forma 1/(n por logaritmos) es una familia clásica del criterio integral.",
          zh: "这种 1/(n 乘若干对数) 的形状，是积分判别的经典家族。",
        },
        fullPath: [
          { en: "Notice all terms are positive, so focus on a positive-term test.", es: "Nota que todos los términos son positivos, así que usa un criterio para términos positivos.", zh: "先看每项都为正，所以要用正项级数判别。" },
          { en: "Match it to the integral of 1/(x log^2 x (log log x)^4).", es: "Empáralo con la integral de 1/(x log^2 x (log log x)^4).", zh: "把它对应到积分 1/(x log^2 x (log log x)^4)。" },
          { en: "The extra powers of the logs make the tail integrable, so the series converges.", es: "Las potencias extra de los logaritmos hacen integrable la cola, así que la serie converge.", zh: "这些额外的对数幂会把尾部压到可积，所以级数收敛。" },
        ],
        answer: {
          en: "The series converges.",
          es: "La serie converge.",
          zh: "这个级数收敛。",
        },
        selfCheck: {
          en: "Positive terms with nested logs usually mean comparison or integral test.",
          es: "Términos positivos con logaritmos anidados suelen pedir comparación o criterio integral.",
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
  "tangent-velocity-problems": {
    quiz: [
      {
        prompt: {
          en: "For s(t)=t^2+3t, find the average velocity on [1,3].",
          es: "Para s(t)=t^2+3t, halla la velocidad promedio en [1,3].",
          zh: "设 s(t)=t^2+3t，求区间 [1,3] 上的平均速度。",
        },
        firstStep: {
          en: "Use change in position over change in time.",
          es: "Usa cambio de posicion sobre cambio de tiempo.",
          zh: "先用“位置变化量 ÷ 时间变化量”。",
        },
        setup: {
          en: "Velocity questions usually start by separating average velocity from instantaneous velocity.",
          es: "Las preguntas de velocidad suelen empezar separando velocidad promedio de velocidad instantanea.",
          zh: "做速度题，第一步通常是先分清平均速度还是瞬时速度。",
        },
        fullPath: [
          { en: "Compute s(3)=18 and s(1)=4.", es: "Calcula s(3)=18 y s(1)=4.", zh: "先算 s(3)=18，s(1)=4。" },
          { en: "Average velocity = (18-4)/(3-1).", es: "Velocidad promedio = (18-4)/(3-1).", zh: "平均速度 = (18-4)/(3-1)。" },
          { en: "That gives 14/2 = 7.", es: "Eso da 14/2 = 7.", zh: "得到 14/2 = 7。" },
        ],
        answer: {
          en: "7",
          es: "7",
          zh: "7",
        },
        selfCheck: {
          en: "Average velocity = secant slope on the position graph.",
          es: "Velocidad promedio = pendiente secante en la grafica de posicion.",
          zh: "平均速度 = 位置图像上的割线斜率。",
        },
        whyFits: {
          en: "The problem gives a position function and an interval, which is the classic average-velocity setup.",
          es: "La pregunta da una funcion de posicion y un intervalo, que es la forma clasica de velocidad promedio.",
          zh: "题目给了位置函数和一个时间区间，这正是平均速度的标准形状。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "A ball has height h(t)=16+24t-4t^2. Find the instantaneous velocity at t=2.",
          es: "Una pelota tiene altura h(t)=16+24t-4t^2. Halla la velocidad instantanea en t=2.",
          zh: "一个球的高度函数是 h(t)=16+24t-4t^2。求 t=2 时的瞬时速度。",
        },
        firstStep: {
          en: "Instantaneous velocity means take the derivative first.",
          es: "Velocidad instantanea significa derivar primero.",
          zh: "看到瞬时速度，第一步就是先求导。",
        },
        setup: {
          en: "Average velocity uses two times. Instantaneous velocity uses h'(t).",
          es: "La velocidad promedio usa dos tiempos. La instantanea usa h'(t).",
          zh: "平均速度要两个时刻；瞬时速度要看 h'(t)。",
        },
        fullPath: [
          { en: "Differentiate: h'(t)=24-8t.", es: "Deriva: h'(t)=24-8t.", zh: "先求导：h'(t)=24-8t。" },
          { en: "Plug in t=2.", es: "Sustituye t=2.", zh: "再代入 t=2。" },
          { en: "h'(2)=24-16=8.", es: "h'(2)=24-16=8.", zh: "h'(2)=24-16=8。" },
        ],
        answer: {
          en: "8",
          es: "8",
          zh: "8",
        },
        selfCheck: {
          en: "Instantaneous velocity = derivative of position.",
          es: "Velocidad instantanea = derivada de la posicion.",
          zh: "瞬时速度 = 位置函数的导数。",
        },
      },
    ],
  },
  "precise-limit-definition": {
    quiz: [
      {
        prompt: {
          en: "Which quantity must be made small first in an epsilon-delta limit proof: |f(x)-L| or |x-a|?",
          es: "En una prueba epsilon-delta, ¿que cantidad quieres hacer pequena primero: |f(x)-L| o |x-a|?",
          zh: "在 epsilon-delta 极限证明里，先想控制哪一项：|f(x)-L| 还是 |x-a|？",
        },
        firstStep: {
          en: "Start from the target |f(x)-L|<epsilon and work backward.",
          es: "Empieza desde la meta |f(x)-L|<epsilon y trabaja hacia atras.",
          zh: "先从目标 |f(x)-L|<epsilon 倒推。",
        },
        setup: {
          en: "In a precise limit proof, epsilon is the target and delta is the tool you choose to hit that target.",
          es: "En una prueba precisa de limite, epsilon es la meta y delta es la herramienta que eliges para llegar a ella.",
          zh: "在严格极限证明里，epsilon 是目标，delta 是你为了达到目标而选出来的工具。",
        },
        fullPath: [
          { en: "The limit statement promises outputs close to L.", es: "La afirmacion del limite promete salidas cercanas a L.", zh: "极限命题真正保证的是函数值接近 L。" },
          { en: "So begin with |f(x)-L| and ask what bound on |x-a| would force it.", es: "Asi que empieza con |f(x)-L| y pregunta que acotacion de |x-a| la forzaria.", zh: "所以先看 |f(x)-L|，再问 |x-a| 多小才能逼出它。" },
          { en: "That backward bound becomes your delta choice.", es: "Esa cota hacia atras se convierte en tu eleccion de delta.", zh: "这样倒推出来的约束，就是你最后选的 delta。" },
        ],
        answer: {
          en: "Start from |f(x)-L|<epsilon.",
          es: "Empieza desde |f(x)-L|<epsilon.",
          zh: "先从 |f(x)-L|<epsilon 开始。",
        },
        selfCheck: {
          en: "Epsilon is the target. Delta is the response.",
          es: "Epsilon es la meta. Delta es la respuesta.",
          zh: "epsilon 是目标，delta 是回应。",
        },
        notationHelp: [
          {
            en: "epsilon = how close you want the output to be to L",
            es: "epsilon = que tan cerca quieres que este la salida de L",
            zh: "epsilon = 你希望函数值离 L 有多近",
          },
          {
            en: "delta = how close x must stay to a to make that happen",
            es: "delta = que tan cerca debe quedarse x de a para lograrlo",
            zh: "delta = 为了做到这一点，x 必须离 a 多近",
          },
        ],
        whyFits: {
          en: "This topic is about the exact order of thought in a formal limit proof, not just the vocabulary words.",
          es: "Este tema trata del orden exacto de pensamiento en una prueba formal de limite, no solo del vocabulario.",
          zh: "这题考的是严格极限证明的思路顺序，不只是背术语。",
        },
      },
    ],
  },
  "la-system-applications": {
    quiz: [
      {
        prompt: {
          en: "A ticket booth sold 20 tickets total: adult tickets cost $8 and student tickets cost $5, for $127 total revenue. What is the first math move?",
          es: "Una taquilla vendio 20 boletos en total: los de adulto cuestan $8 y los de estudiante $5, para un ingreso total de $127. ¿Cual es el primer movimiento matematico?",
          zh: "售票处一共卖了 20 张票：成人票 8 美元，学生票 5 美元，总收入 127 美元。第一步该怎么建模？",
        },
        firstStep: {
          en: "Set one variable for each ticket count and write a system.",
          es: "Pon una variable para cada cantidad de boletos y escribe un sistema.",
          zh: "先给两类票数各设一个变量，再列方程组。",
        },
        setup: {
          en: "Application problems become linear algebra when one sentence gives a count equation and another gives a money equation.",
          es: "Los problemas de aplicacion se vuelven algebra lineal cuando una frase da una ecuacion de cantidad y otra una ecuacion de dinero.",
          zh: "应用题一旦出现“总数量方程 + 总金额方程”，就该把它看成线性方程组。",
        },
        fullPath: [
          { en: "Let a = adult tickets and s = student tickets.", es: "Sea a = boletos de adulto y s = boletos de estudiante.", zh: "设 a 为成人票数，s 为学生票数。" },
          { en: "Write a+s=20 and 8a+5s=127.", es: "Escribe a+s=20 y 8a+5s=127.", zh: "列出 a+s=20 和 8a+5s=127。" },
          { en: "Now solve that 2x2 system.", es: "Ahora resuelve ese sistema 2x2.", zh: "然后去解这个二元一次方程组。" },
        ],
        answer: {
          en: "Write the system a+s=20, 8a+5s=127.",
          es: "Escribe el sistema a+s=20, 8a+5s=127.",
          zh: "先列方程组 a+s=20，8a+5s=127。",
        },
        selfCheck: {
          en: "Count equation plus revenue equation usually means system of equations.",
          es: "Ecuacion de cantidad mas ecuacion de ingreso suele significar sistema de ecuaciones.",
          zh: "数量方程加金额方程，通常就是方程组题。",
        },
      },
    ],
  },
  "la-elementary-matrices": {
    quiz: [
      {
        prompt: {
          en: "What does left-multiplying by an elementary matrix do to A?",
          es: "¿Que hace multiplicar A por la izquierda con una matriz elemental?",
          zh: "用一个初等矩阵左乘 A，会对 A 做什么？",
        },
        firstStep: {
          en: "Think of one row operation written as a matrix.",
          es: "Piensa en una operacion elemental por filas escrita como matriz.",
          zh: "把它看成“用矩阵写出来的一次初等行变换”。",
        },
        setup: {
          en: "Elementary matrices are row operations turned into matrix form.",
          es: "Las matrices elementales son operaciones por filas convertidas en forma matricial.",
          zh: "初等矩阵本质上就是把初等行变换写成矩阵。",
        },
        fullPath: [
          { en: "Build the elementary matrix by doing one row operation to the identity matrix.", es: "Construye la matriz elemental haciendo una operacion por filas a la identidad.", zh: "先对单位矩阵做一次初等行变换，得到对应的初等矩阵。" },
          { en: "Then multiply E·A.", es: "Luego multiplica E·A.", zh: "然后去算 E·A。" },
          { en: "That performs the same row operation on A.", es: "Eso ejecuta la misma operacion por filas sobre A.", zh: "这样就会在 A 上执行同样的行变换。" },
        ],
        answer: {
          en: "It performs the matching row operation on A.",
          es: "Realiza sobre A la operacion por filas correspondiente.",
          zh: "它会在 A 上执行对应的初等行变换。",
        },
        selfCheck: {
          en: "Left multiply by E = do a row move to A.",
          es: "Multiplicar por la izquierda con E = hacer un movimiento por filas en A.",
          zh: "左乘 E = 对 A 做一次行变换。",
        },
      },
    ],
  },
  "la-markov-chains": {
    quiz: [
      {
        prompt: {
          en: "A transition matrix P and current state vector x_n are given. What expression gives the next state?",
          es: "Se da una matriz de transicion P y un vector de estado actual x_n. ¿Que expresion da el siguiente estado?",
          zh: "已知转移矩阵 P 和当前状态向量 x_n。下一步状态该写成什么？",
        },
        firstStep: {
          en: "Apply the transition matrix once.",
          es: "Aplica una vez la matriz de transicion.",
          zh: "先把转移矩阵作用一次。",
        },
        setup: {
          en: "Markov-chain questions are repeated matrix-action questions.",
          es: "Las preguntas de cadenas de Markov son preguntas de aplicar matrices repetidamente.",
          zh: "马尔可夫链题，本质上是在重复作用同一个矩阵。",
        },
        fullPath: [
          { en: "The state vector stores the current distribution.", es: "El vector de estado guarda la distribucion actual.", zh: "状态向量记录当前分布。" },
          { en: "One time step means apply P once to that vector.", es: "Un paso temporal significa aplicar P una vez a ese vector.", zh: "走一步，就把 P 作用一次。" },
          { en: "So the next state is x_(n+1)=P x_n.", es: "Asi que el siguiente estado es x_(n+1)=P x_n.", zh: "所以下一步状态是 x_(n+1)=P x_n。" },
        ],
        answer: {
          en: "x_(n+1)=P x_n",
          es: "x_(n+1)=P x_n",
          zh: "x_(n+1)=P x_n",
        },
        selfCheck: {
          en: "One step = one multiplication by the transition matrix.",
          es: "Un paso = una multiplicacion por la matriz de transicion.",
          zh: "走一步 = 乘一次转移矩阵。",
        },
        notationHelp: [
          {
            en: "P = transition matrix",
            es: "P = matriz de transicion",
            zh: "P = 转移矩阵",
          },
          {
            en: "x_n = state/distribution at step n",
            es: "x_n = estado o distribucion en el paso n",
            zh: "x_n = 第 n 步的状态或分布",
          },
        ],
      },
    ],
  },
  "calc2-integration-by-parts": {
    quiz: [
      {
        prompt: {
          en: "Evaluate ∫ x e^x dx.",
          es: "Evalua ∫ x e^x dx.",
          zh: "计算 ∫ x e^x dx。",
        },
        firstStep: {
          en: "Pick u=x and dv=e^x dx.",
          es: "Toma u=x y dv=e^x dx.",
          zh: "先取 u=x，dv=e^x dx。",
        },
        setup: {
          en: "A polynomial times an exponential is one of the most standard integration-by-parts shapes.",
          es: "Un polinomio por una exponencial es una de las formas mas clasicas de integracion por partes.",
          zh: "多项式乘指数函数，是分部积分最经典的题型之一。",
        },
        fullPath: [
          { en: "Let u=x and dv=e^x dx, so du=dx and v=e^x.", es: "Sea u=x y dv=e^x dx, entonces du=dx y v=e^x.", zh: "设 u=x，dv=e^x dx，则 du=dx，v=e^x。" },
          { en: "Use ∫u dv = uv - ∫v du.", es: "Usa ∫u dv = uv - ∫v du.", zh: "套用 ∫u dv = uv - ∫v du。" },
          { en: "That gives x e^x - ∫ e^x dx = x e^x - e^x + C.", es: "Eso da x e^x - ∫ e^x dx = x e^x - e^x + C.", zh: "得到 x e^x - ∫ e^x dx = x e^x - e^x + C。" },
        ],
        answer: {
          en: "x e^x - e^x + C",
          es: "x e^x - e^x + C",
          zh: "x e^x - e^x + C",
        },
        selfCheck: {
          en: "Differentiate your answer: product rule should give x e^x back.",
          es: "Deriva tu respuesta: la regla del producto debe devolver x e^x.",
          zh: "把答案求导检查，乘法法则应该能还原出 x e^x。",
        },
        whyFits: {
          en: "One factor gets simpler when differentiated and the other stays easy to integrate.",
          es: "Un factor se simplifica al derivar y el otro sigue siendo facil de integrar.",
          zh: "一个因子求导会变简单，另一个因子积分也很容易。",
        },
      },
    ],
  },
  "calc2-partial-fractions": {
    quiz: [
      {
        prompt: {
          en: "Set up the partial fraction decomposition for (2x+3)/(x^2-x-2).",
          es: "Plantea la descomposicion en fracciones parciales de (2x+3)/(x^2-x-2).",
          zh: "把 (2x+3)/(x^2-x-2) 设成部分分式分解的形式。",
        },
        firstStep: {
          en: "Factor the denominator first.",
          es: "Factoriza primero el denominador.",
          zh: "第一步先因式分解分母。",
        },
        setup: {
          en: "Partial fractions starts with factoring. If you do not factor first, you are guessing blind.",
          es: "Las fracciones parciales empiezan factorizando. Si no lo haces, estas adivinando a ciegas.",
          zh: "部分分式的第一步一定是分解分母，不然就是盲猜。",
        },
        fullPath: [
          { en: "Factor x^2-x-2 as (x-2)(x+1).", es: "Factoriza x^2-x-2 como (x-2)(x+1).", zh: "先把 x^2-x-2 分解成 (x-2)(x+1)。" },
          { en: "Write (2x+3)/(x^2-x-2) = A/(x-2) + B/(x+1).", es: "Escribe (2x+3)/(x^2-x-2) = A/(x-2) + B/(x+1).", zh: "写成 (2x+3)/(x^2-x-2) = A/(x-2) + B/(x+1)。" },
          { en: "Then clear denominators to solve for A and B.", es: "Luego elimina denominadores para hallar A y B.", zh: "接着通分并比较系数，解出 A 和 B。" },
        ],
        answer: {
          en: "A/(x-2) + B/(x+1)",
          es: "A/(x-2) + B/(x+1)",
          zh: "A/(x-2) + B/(x+1)",
        },
        selfCheck: {
          en: "Top degree smaller, denominator factored, then split.",
          es: "Grado de arriba menor, denominador factorizado y luego dividir.",
          zh: "先确认分子次数更低，再分解分母，最后拆开。",
        },
      },
    ],
  },
  "calc2-improper-integrals": {
    quiz: [
      {
        prompt: {
          en: "Determine whether ∫_1^∞ 1/x^2 dx converges.",
          es: "Determina si ∫_1^∞ 1/x^2 dx converge.",
          zh: "判断 ∫_1^∞ 1/x^2 dx 是否收敛。",
        },
        firstStep: {
          en: "Replace the infinite bound with a limit.",
          es: "Sustituye el extremo infinito por un limite.",
          zh: "先把无穷上限改成极限。",
        },
        setup: {
          en: "Improper integrals are regular integrals only after you rewrite the bad bound as a limit.",
          es: "Las integrales impropias solo se vuelven integrales normales despues de reescribir el extremo malo como limite.",
          zh: "瑕积分要先把坏端点改写成极限，才能开始正常计算。",
        },
        fullPath: [
          { en: "Write the integral as lim_{b→∞} ∫_1^b x^-2 dx.", es: "Escribe la integral como lim_{b→∞} ∫_1^b x^-2 dx.", zh: "先写成 lim_{b→∞} ∫_1^b x^-2 dx。" },
          { en: "Antidifferentiate to get lim_{b→∞}[-1/x]_1^b.", es: "Integra para obtener lim_{b→∞}[-1/x]_1^b.", zh: "积分得到 lim_{b→∞}[-1/x]_1^b。" },
          { en: "This becomes lim_{b→∞}(1-1/b)=1, so it converges.", es: "Eso se vuelve lim_{b→∞}(1-1/b)=1, asi que converge.", zh: "化简成 lim_{b→∞}(1-1/b)=1，所以它收敛。" },
        ],
        answer: {
          en: "It converges to 1.",
          es: "Converge a 1.",
          zh: "它收敛到 1。",
        },
        selfCheck: {
          en: "Infinity in the bound means limit first, not plug in first.",
          es: "Si aparece infinito en el extremo, primero va el limite, no la sustitucion directa.",
          zh: "上下限里出现无穷，第一步永远是极限，不是直接代入。",
        },
      },
    ],
  },
  "calc2-separable-equations": {
    quiz: [
      {
        prompt: {
          en: "Solve dy/dx = 3xy with y(0)=2.",
          es: "Resuelve dy/dx = 3xy con y(0)=2.",
          zh: "求解 dy/dx = 3xy，且 y(0)=2。",
        },
        firstStep: {
          en: "Separate the y-part and x-part onto different sides.",
          es: "Separa la parte con y y la parte con x en lados distintos.",
          zh: "先把含 y 的部分和含 x 的部分分到两边。",
        },
        setup: {
          en: "Separable equations want all y terms with dy and all x terms with dx.",
          es: "Las ecuaciones separables quieren todos los terminos con y junto a dy y todos los de x junto a dx.",
          zh: "可分离方程的标准动作，就是把 y 全部和 dy 放一起，把 x 全部和 dx 放一起。",
        },
        fullPath: [
          { en: "Rewrite as (1/y) dy = 3x dx.", es: "Reescribe como (1/y) dy = 3x dx.", zh: "改写成 (1/y) dy = 3x dx。" },
          { en: "Integrate to get ln|y| = (3/2)x^2 + C.", es: "Integra y obtienes ln|y| = (3/2)x^2 + C.", zh: "两边积分，得到 ln|y| = (3/2)x^2 + C。" },
          { en: "Exponentiate and use y(0)=2, so y=2e^{(3/2)x^2}.", es: "Exponentia y usa y(0)=2, asi que y=2e^{(3/2)x^2}.", zh: "再指数化并代入 y(0)=2，得到 y=2e^{(3/2)x^2}。" },
        ],
        answer: {
          en: "y = 2e^{(3/2)x^2}",
          es: "y = 2e^{(3/2)x^2}",
          zh: "y = 2e^{(3/2)x^2}",
        },
        selfCheck: {
          en: "Separable DEs are all about moving variables apart before integrating.",
          es: "Las ecuaciones diferenciales separables dependen de separar las variables antes de integrar.",
          zh: "可分离方程的核心，就是先把变量分开，再积分。",
        },
      },
    ],
  },
  "calc2-polar-area": {
    midterm: [
      {
        prompt: {
          en: "Set up the area inside r=2cos(theta) from -pi/2 to pi/2.",
          es: "Plantea el area dentro de r=2cos(theta) desde -pi/2 hasta pi/2.",
          zh: "把 r=2cos(theta) 在 -pi/2 到 pi/2 之间围成的面积写成积分。",
        },
        firstStep: {
          en: "Use the polar area formula with r^2.",
          es: "Usa la formula de area polar con r^2.",
          zh: "先套极坐标面积公式，里面要放 r^2。",
        },
        setup: {
          en: "Polar area questions want one-half times the integral of radius squared.",
          es: "Las preguntas de area polar quieren un medio por la integral del radio al cuadrado.",
          zh: "极坐标面积题，标准模板就是二分之一乘上 r 平方的积分。",
        },
        fullPath: [
          { en: "Start with A = (1/2)∫ r^2 dθ.", es: "Empieza con A = (1/2)∫ r^2 dθ.", zh: "先写 A = (1/2)∫ r^2 dθ。" },
          { en: "Substitute r=2cosθ, so r^2 = 4cos^2θ.", es: "Sustituye r=2cosθ, entonces r^2 = 4cos^2θ.", zh: "代入 r=2cosθ，所以 r^2 = 4cos^2θ。" },
          { en: "The setup is A = (1/2)∫_{-pi/2}^{pi/2} 4cos^2θ dθ.", es: "La preparacion queda A = (1/2)∫_{-pi/2}^{pi/2} 4cos^2θ dθ.", zh: "于是积分设定为 A = (1/2)∫_{-pi/2}^{pi/2} 4cos^2θ dθ。" },
        ],
        answer: {
          en: "A = (1/2)∫_{-pi/2}^{pi/2} 4cos^2θ dθ",
          es: "A = (1/2)∫_{-pi/2}^{pi/2} 4cos^2θ dθ",
          zh: "A = (1/2)∫_{-pi/2}^{pi/2} 4cos^2θ dθ",
        },
        selfCheck: {
          en: "Polar area = one-half times radius squared.",
          es: "Area polar = un medio por radio al cuadrado.",
          zh: "极坐标面积 = 二分之一乘半径平方。",
        },
      },
    ],
  },
  "calc2-ratio-test": {
    quiz: [
      {
        prompt: {
          en: "Use the ratio test on Σ n!/3^n.",
          es: "Usa el criterio del cociente en Σ n!/3^n.",
          zh: "用比值判别法判断 Σ n!/3^n。",
        },
        firstStep: {
          en: "Form |a_(n+1)/a_n| before simplifying.",
          es: "Forma |a_(n+1)/a_n| antes de simplificar.",
          zh: "第一步先写出 |a_(n+1)/a_n|。",
        },
        setup: {
          en: "Factorials and powers are one of the clearest triggers for the ratio test.",
          es: "Factoriales y potencias son una de las señales mas claras para usar el criterio del cociente.",
          zh: "阶乘和幂次同时出现，是比值判别法最明显的触发信号之一。",
        },
        fullPath: [
          { en: "Let a_n = n!/3^n, so a_(n+1) = (n+1)!/3^(n+1).", es: "Sea a_n = n!/3^n, entonces a_(n+1) = (n+1)!/3^(n+1).", zh: "设 a_n = n!/3^n，则 a_(n+1) = (n+1)!/3^(n+1)。" },
          { en: "Compute a_(n+1)/a_n = (n+1)/3.", es: "Calcula a_(n+1)/a_n = (n+1)/3.", zh: "计算 a_(n+1)/a_n = (n+1)/3。" },
          { en: "That ratio tends to infinity, so the series diverges.", es: "Ese cociente tiende a infinito, asi que la serie diverge.", zh: "这个比值趋于无穷，所以级数发散。" },
        ],
        answer: {
          en: "The series diverges.",
          es: "La serie diverge.",
          zh: "这个级数发散。",
        },
        selfCheck: {
          en: "If the ratio limit is bigger than 1, the series diverges.",
          es: "Si el limite del cociente es mayor que 1, la serie diverge.",
          zh: "如果比值极限大于 1，级数就发散。",
        },
      },
    ],
  },
  "intuitive-limit": {
    quiz: [
      {
        prompt: {
          en: "A graph approaches y=4 from the left of x=2 and also approaches y=4 from the right. What is lim_{x→2} f(x)?",
          es: "Una grafica se acerca a y=4 por la izquierda de x=2 y tambien a y=4 por la derecha. ¿Cual es lim_{x→2} f(x)?",
          zh: "一张图像在 x=2 左边逼近 y=4，右边也逼近 y=4。求 lim_{x→2} f(x)。",
        },
        firstStep: {
          en: "Check whether both sides head to the same y-value.",
          es: "Primero mira si ambos lados van al mismo valor de y.",
          zh: "先看左右两边是不是都逼近同一个 y 值。",
        },
        setup: {
          en: "An intuitive limit question is really a left-side and right-side agreement check.",
          es: "Una pregunta intuitiva de limite en realidad es revisar si izquierda y derecha coinciden.",
          zh: "直观极限题，本质上就是检查左右两边是否达成一致。",
        },
        fullPath: [
          { en: "The left-hand approach goes to 4.", es: "El acercamiento por la izquierda va a 4.", zh: "左边逼近的值是 4。" },
          { en: "The right-hand approach also goes to 4.", es: "El acercamiento por la derecha tambien va a 4.", zh: "右边逼近的值也等于 4。" },
          { en: "So the two-sided limit is 4.", es: "Asi que el limite bilateral es 4.", zh: "所以双侧极限就是 4。" },
        ],
        answer: {
          en: "4",
          es: "4",
          zh: "4",
        },
        selfCheck: {
          en: "Same left and right target means the limit exists there.",
          es: "Si izquierda y derecha apuntan al mismo valor, el limite existe.",
          zh: "左右两边逼近同一个值，极限就存在。",
        },
      },
    ],
  },
  "direct-substitution": {
    quiz: [
      {
        prompt: {
          en: "Evaluate lim_{x→2} (x^2+1).",
          es: "Evalua lim_{x→2} (x^2+1).",
          zh: "计算 lim_{x→2} (x^2+1)。",
        },
        firstStep: {
          en: "Try plugging in x=2 immediately.",
          es: "Prueba sustituir x=2 de inmediato.",
          zh: "第一步直接把 x=2 代进去。",
        },
        setup: {
          en: "Polynomials are the cleanest direct-substitution problems because nothing breaks when you plug in.",
          es: "Los polinomios son los casos mas limpios de sustitucion directa porque nada se rompe al sustituir.",
          zh: "多项式是最标准的直接代入题，因为代进去不会出问题。",
        },
        fullPath: [
          { en: "Substitute x=2 into x^2+1.", es: "Sustituye x=2 en x^2+1.", zh: "把 x=2 代入 x^2+1。" },
          { en: "That gives 2^2+1.", es: "Eso da 2^2+1.", zh: "得到 2^2+1。" },
          { en: "So the limit is 5.", es: "Entonces el limite es 5.", zh: "所以极限是 5。" },
        ],
        answer: {
          en: "5",
          es: "5",
          zh: "5",
        },
        selfCheck: {
          en: "No zero denominator and no root issue means plug first.",
          es: "Si no aparece denominador cero ni problema con raices, primero sustituye.",
          zh: "没有分母变零，也没有根号麻烦，第一步就先代入。",
        },
      },
    ],
  },
  "limit-laws": {
    quiz: [
      {
        prompt: {
          en: "If lim f(x)=3 and lim g(x)=-2 as x→a, what is lim (2f(x)-g(x))?",
          es: "Si lim f(x)=3 y lim g(x)=-2 cuando x→a, ¿cuanto vale lim (2f(x)-g(x))?",
          zh: "若 x→a 时 lim f(x)=3，lim g(x)=-2，那么 lim (2f(x)-g(x)) 等于多少？",
        },
        firstStep: {
          en: "Apply the sum and constant-multiple laws term by term.",
          es: "Aplica las leyes de suma y multiplicacion por constante termino a termino.",
          zh: "按项使用和法则与常数倍法则。",
        },
        setup: {
          en: "Limit laws let you move the limit through algebra when each piece already has a limit.",
          es: "Las leyes de limites te dejan pasar el limite a traves del algebra cuando cada parte ya tiene limite.",
          zh: "当每一部分的极限都已知时，极限定律允许你把极限直接带进代数运算里。",
        },
        fullPath: [
          { en: "First compute 2·lim f(x)=2·3=6.", es: "Primero calcula 2·lim f(x)=2·3=6.", zh: "先算 2·lim f(x)=2·3=6。" },
          { en: "Then subtract lim g(x), which is -2.", es: "Luego resta lim g(x), que es -2.", zh: "再减去 lim g(x)，它等于 -2。" },
          { en: "So 6-(-2)=8.", es: "Entonces 6-(-2)=8.", zh: "所以 6-(-2)=8。" },
        ],
        answer: {
          en: "8",
          es: "8",
          zh: "8",
        },
        selfCheck: {
          en: "Known piece limits mean do the algebra on the limit values.",
          es: "Si ya conoces los limites de las piezas, haz el algebra con esos valores.",
          zh: "各部分极限都知道时，就直接对这些极限值做代数运算。",
        },
      },
    ],
  },
  "derivative-as-function": {
    quiz: [
      {
        prompt: {
          en: "If f(x)=x^2, what is the derivative function f'(x)?",
          es: "Si f(x)=x^2, ¿cual es la funcion derivada f'(x)?",
          zh: "若 f(x)=x^2，那么导函数 f'(x) 是什么？",
        },
        firstStep: {
          en: "Think of the derivative as a new function that gives slope at each x.",
          es: "Piensa en la derivada como una nueva funcion que da la pendiente en cada x.",
          zh: "把导数看成一个新函数：它在每个 x 都给出切线斜率。",
        },
        setup: {
          en: "This topic is about not stopping at one slope value. You want the whole slope rule.",
          es: "Este tema trata de no quedarse en una sola pendiente. Quieres la regla completa de pendientes.",
          zh: "这类题不是求某一点的斜率，而是要求出“整个斜率规律”。",
        },
        fullPath: [
          { en: "For x^2, the slope changes with x.", es: "Para x^2, la pendiente cambia con x.", zh: "对 x^2 来说，斜率会随着 x 改变。" },
          { en: "Differentiate to get the general slope rule.", es: "Deriva para obtener la regla general de la pendiente.", zh: "要求导，得到一般形式的斜率规则。" },
          { en: "So f'(x)=2x.", es: "Asi que f'(x)=2x.", zh: "所以 f'(x)=2x。" },
        ],
        answer: {
          en: "f'(x)=2x",
          es: "f'(x)=2x",
          zh: "f'(x)=2x",
        },
        selfCheck: {
          en: "Derivative function = slope rule, not just one slope number.",
          es: "Funcion derivada = regla de pendiente, no solo un numero de pendiente.",
          zh: "导函数 = 整个斜率公式，不只是某一个斜率数值。",
        },
      },
    ],
  },
  "chain-rule": {
    quiz: [
      {
        prompt: {
          en: "Differentiate (3x^2+1)^5.",
          es: "Deriva (3x^2+1)^5.",
          zh: "求导 (3x^2+1)^5。",
        },
        firstStep: {
          en: "Differentiate the outside first and keep the inside unchanged.",
          es: "Deriva primero la parte de afuera y deja adentro sin tocar.",
          zh: "先求外层导数，里面先原样保留。",
        },
        setup: {
          en: "A power wrapped around another expression is the classic chain-rule shape.",
          es: "Una potencia envolviendo otra expresion es la forma clasica de la regla de la cadena.",
          zh: "一个整体外面再套一个幂，是链式法则最经典的形状。",
        },
        fullPath: [
          { en: "Differentiate the outside: 5(3x^2+1)^4.", es: "Deriva afuera: 5(3x^2+1)^4.", zh: "先求外层导数：5(3x^2+1)^4。" },
          { en: "Now multiply by the derivative of the inside, which is 6x.", es: "Ahora multiplica por la derivada de adentro, que es 6x.", zh: "再乘以内层导数，也就是 6x。" },
          { en: "So the derivative is 30x(3x^2+1)^4.", es: "Asi que la derivada es 30x(3x^2+1)^4.", zh: "所以导数是 30x(3x^2+1)^4。" },
        ],
        answer: {
          en: "30x(3x^2+1)^4",
          es: "30x(3x^2+1)^4",
          zh: "30x(3x^2+1)^4",
        },
        selfCheck: {
          en: "Outside first, inside next, then multiply.",
          es: "Afuera primero, adentro despues y luego multiplicar.",
          zh: "外层先，内层后，最后相乘。",
        },
      },
    ],
  },
  "mean-value-theorem": {
    midterm: [
      {
        prompt: {
          en: "For f(x)=x^2 on [1,3], find a value c guaranteed by the Mean Value Theorem.",
          es: "Para f(x)=x^2 en [1,3], encuentra un valor c garantizado por el Teorema del Valor Medio.",
          zh: "对 f(x)=x^2 在区间 [1,3] 上，求一个由中值定理保证存在的 c。",
        },
        firstStep: {
          en: "Match f'(c) to the average slope on [1,3].",
          es: "Iguala f'(c) con la pendiente promedio en [1,3].",
          zh: "先令 f'(c) 等于区间 [1,3] 上的平均斜率。",
        },
        setup: {
          en: "MVT problems are about finding where the tangent slope equals the secant slope.",
          es: "Los problemas de TVM buscan donde la pendiente tangente iguala la pendiente secante.",
          zh: "中值定理题，本质上是在找“切线斜率 = 割线斜率”的点。",
        },
        fullPath: [
          { en: "Compute the average slope: (f(3)-f(1))/(3-1)=(9-1)/2=4.", es: "Calcula la pendiente promedio: (f(3)-f(1))/(3-1)=(9-1)/2=4.", zh: "先算平均斜率：(f(3)-f(1))/(3-1)=(9-1)/2=4。" },
          { en: "Since f'(x)=2x, solve 2c=4.", es: "Como f'(x)=2x, resuelve 2c=4.", zh: "因为 f'(x)=2x，所以解 2c=4。" },
          { en: "This gives c=2.", es: "Eso da c=2.", zh: "得到 c=2。" },
        ],
        answer: {
          en: "c=2",
          es: "c=2",
          zh: "c=2",
        },
        selfCheck: {
          en: "MVT = average slope first, derivative match second.",
          es: "TVM = primero pendiente promedio, luego igualar con la derivada.",
          zh: "中值定理 = 先算平均斜率，再和导数相等。",
        },
      },
    ],
  },
  "factoring-0-0": {
    quiz: [
      {
        prompt: {
          en: "Evaluate lim_{x→3} (x^2-9)/(x-3).",
          es: "Evalua lim_{x→3} (x^2-9)/(x-3).",
          zh: "计算 lim_{x→3} (x^2-9)/(x-3)。",
        },
        firstStep: {
          en: "Factor the numerator before doing anything else.",
          es: "Factoriza el numerador antes de hacer cualquier otra cosa.",
          zh: "第一步先把分子因式分解。",
        },
        setup: {
          en: "When direct substitution gives 0/0 and the algebra is polynomial, factoring is usually the first rescue move.",
          es: "Cuando la sustitucion directa da 0/0 y el algebra es polinomica, factorizar suele ser el primer rescate.",
          zh: "如果直接代入得到 0/0，而且式子是多项式型，第一反应通常就是因式分解。",
        },
        fullPath: [
          { en: "Factor x^2-9 as (x-3)(x+3).", es: "Factoriza x^2-9 como (x-3)(x+3).", zh: "把 x^2-9 分解成 (x-3)(x+3)。" },
          { en: "Cancel the common factor x-3.", es: "Cancela el factor comun x-3.", zh: "约去公共因子 x-3。" },
          { en: "Now plug in x=3 to get 6.", es: "Ahora sustituye x=3 y obtienes 6.", zh: "再代入 x=3，得到 6。" },
        ],
        answer: {
          en: "6",
          es: "6",
          zh: "6",
        },
        selfCheck: {
          en: "0/0 from a polynomial fraction usually means simplify first, plug second.",
          es: "0/0 en una fraccion polinomica suele significar simplifica primero y sustituye despues.",
          zh: "多项式分式出现 0/0，通常就是先化简，再代入。",
        },
      },
    ],
  },
  rationalizing: {
    quiz: [
      {
        prompt: {
          en: "Evaluate lim_{x→4} (sqrt(x+5)-3)/(x-4).",
          es: "Evalua lim_{x→4} (sqrt(x+5)-3)/(x-4).",
          zh: "计算 lim_{x→4} (sqrt(x+5)-3)/(x-4)。",
        },
        firstStep: {
          en: "Multiply by the conjugate.",
          es: "Multiplica por el conjugado.",
          zh: "第一步乘以共轭式。",
        },
        setup: {
          en: "A root causing 0/0 usually wants the conjugate, not factoring.",
          es: "Una raiz que produce 0/0 suele pedir el conjugado, no factorizacion.",
          zh: "如果根号导致 0/0，通常该想到共轭，不是因式分解。",
        },
        fullPath: [
          { en: "Multiply top and bottom by sqrt(x+5)+3.", es: "Multiplica arriba y abajo por sqrt(x+5)+3.", zh: "上下同时乘以 sqrt(x+5)+3。" },
          { en: "The numerator becomes x+5-9 = x-4.", es: "El numerador se vuelve x+5-9 = x-4.", zh: "分子化成 x+5-9 = x-4。" },
          { en: "Cancel x-4 and plug in x=4 to get 1/6.", es: "Cancela x-4 y sustituye x=4 para obtener 1/6.", zh: "约去 x-4 后代入 x=4，得到 1/6。" },
        ],
        answer: {
          en: "1/6",
          es: "1/6",
          zh: "1/6",
        },
        selfCheck: {
          en: "Root plus 0/0 means mirror move: conjugate first.",
          es: "Raiz mas 0/0 significa movimiento espejo: conjugado primero.",
          zh: "根号加 0/0，就先做镜像动作：乘共轭。",
        },
      },
    ],
  },
  continuity: {
    quiz: [
      {
        prompt: {
          en: "What three checks decide whether f is continuous at x=a?",
          es: "¿Que tres revisiones deciden si f es continua en x=a?",
          zh: "判断 f 在 x=a 处连续，需要检查哪三件事？",
        },
        firstStep: {
          en: "Check value, limit, and agreement.",
          es: "Revisa valor, limite y que coincidan.",
          zh: "先检查函数值、极限值，以及二者是否相等。",
        },
        setup: {
          en: "Continuity is not one condition. It is a three-part checklist.",
          es: "La continuidad no es una sola condicion. Es una lista de tres pasos.",
          zh: "连续不是单个条件，而是一张三步检查表。",
        },
        fullPath: [
          { en: "First check that f(a) exists.", es: "Primero verifica que f(a) exista.", zh: "先看 f(a) 是否存在。" },
          { en: "Then check that lim_{x→a} f(x) exists.", es: "Luego verifica que lim_{x→a} f(x) exista.", zh: "再看 lim_{x→a} f(x) 是否存在。" },
          { en: "Finally check that lim_{x→a} f(x)=f(a).", es: "Finalmente verifica que lim_{x→a} f(x)=f(a).", zh: "最后检查 lim_{x→a} f(x) 是否等于 f(a)。" },
        ],
        answer: {
          en: "f(a) exists, the limit exists, and they are equal.",
          es: "f(a) existe, el limite existe y ambos son iguales.",
          zh: "f(a) 存在、极限存在，而且两者相等。",
        },
        selfCheck: {
          en: "Value, limit, match.",
          es: "Valor, limite, coincidencia.",
          zh: "函数值、极限、相等。",
        },
      },
    ],
  },
  "power-rule": {
    quiz: [
      {
        prompt: {
          en: "Differentiate x^7.",
          es: "Deriva x^7.",
          zh: "求导 x^7。",
        },
        firstStep: {
          en: "Bring the exponent down and subtract one from it.",
          es: "Baja el exponente y restale uno.",
          zh: "把指数拿下来，再减一。",
        },
        setup: {
          en: "A plain power of x with no product or composition is the cleanest power-rule case.",
          es: "Una potencia simple de x sin producto ni composicion es el caso mas limpio de la regla de la potencia.",
          zh: "如果只是单纯的 x 的幂，没有乘积也没有复合，就是幂法则最直接的情形。",
        },
        fullPath: [
          { en: "Start with x^7.", es: "Empieza con x^7.", zh: "从 x^7 开始。" },
          { en: "Move the 7 to the front.", es: "Mueve el 7 al frente.", zh: "把 7 放到前面。" },
          { en: "Lower the power to 6, so the derivative is 7x^6.", es: "Baja la potencia a 6, asi que la derivada es 7x^6.", zh: "指数减成 6，所以导数是 7x^6。" },
        ],
        answer: {
          en: "7x^6",
          es: "7x^6",
          zh: "7x^6",
        },
        selfCheck: {
          en: "Power rule = front times one-less power.",
          es: "Regla de la potencia = coeficiente al frente por potencia una menos.",
          zh: "幂法则 = 指数拿下来，次数减一。",
        },
      },
    ],
  },
  "product-rule": {
    quiz: [
      {
        prompt: {
          en: "Differentiate x^2 sin x.",
          es: "Deriva x^2 sin x.",
          zh: "求导 x^2 sin x。",
        },
        firstStep: {
          en: "Use first times derivative of second plus second times derivative of first.",
          es: "Usa primera por derivada de la segunda mas segunda por derivada de la primera.",
          zh: "用“前者乘后者导数，再加后者乘前者导数”。",
        },
        setup: {
          en: "A true product of two changing factors is the trigger for the product rule.",
          es: "Un producto real de dos factores que cambian activa la regla del producto.",
          zh: "两个都会变化的因子真正相乘，就是乘法法则的触发点。",
        },
        fullPath: [
          { en: "Differentiate x^2 to get 2x.", es: "Deriva x^2 para obtener 2x.", zh: "先求 x^2 的导数，得到 2x。" },
          { en: "Differentiate sin x to get cos x.", es: "Deriva sin x para obtener cos x.", zh: "再求 sin x 的导数，得到 cos x。" },
          { en: "So the derivative is x^2 cos x + 2x sin x.", es: "Entonces la derivada es x^2 cos x + 2x sin x.", zh: "所以导数是 x^2 cos x + 2x sin x。" },
        ],
        answer: {
          en: "x^2 cos x + 2x sin x",
          es: "x^2 cos x + 2x sin x",
          zh: "x^2 cos x + 2x sin x",
        },
        selfCheck: {
          en: "Product rule = both factors get a turn.",
          es: "Regla del producto = ambos factores participan.",
          zh: "乘法法则 = 两个因子都要轮到一次。",
        },
      },
    ],
  },
  "quotient-rule": {
    quiz: [
      {
        prompt: {
          en: "Differentiate (x^2+1)/x.",
          es: "Deriva (x^2+1)/x.",
          zh: "求导 (x^2+1)/x。",
        },
        firstStep: {
          en: "Use low times derivative of high minus high times derivative of low, over low squared.",
          es: "Usa abajo por derivada de arriba menos arriba por derivada de abajo, sobre abajo al cuadrado.",
          zh: "用“下乘上导，减去上乘下导，再除以下平方”。",
        },
        setup: {
          en: "A fraction where top and bottom both change is the standard quotient-rule shape.",
          es: "Una fraccion donde cambian arriba y abajo es la forma clasica de la regla del cociente.",
          zh: "分子分母都会变化的分式，就是商法则的标准形状。",
        },
        fullPath: [
          { en: "Top derivative is 2x and bottom derivative is 1.", es: "La derivada de arriba es 2x y la de abajo es 1.", zh: "分子导数是 2x，分母导数是 1。" },
          { en: "Apply the rule: [x(2x) - (x^2+1)(1)]/x^2.", es: "Aplica la regla: [x(2x) - (x^2+1)(1)]/x^2.", zh: "套公式：[x(2x) - (x^2+1)(1)]/x^2。" },
          { en: "Simplify to (x^2-1)/x^2.", es: "Simplifica a (x^2-1)/x^2.", zh: "化简得到 (x^2-1)/x^2。" },
        ],
        answer: {
          en: "(x^2-1)/x^2",
          es: "(x^2-1)/x^2",
          zh: "(x^2-1)/x^2",
        },
        selfCheck: {
          en: "Quotient rule = low d-high minus high d-low, all over low squared.",
          es: "Regla del cociente = abajo por d-arriba menos arriba por d-abajo, todo sobre abajo al cuadrado.",
          zh: "商法则 = 下乘上导减上乘下导，再除以下平方。",
        },
      },
    ],
  },
  "implicit-differentiation": {
    midterm: [
      {
        prompt: {
          en: "For x^2+y^2=25, find dy/dx.",
          es: "Para x^2+y^2=25, halla dy/dx.",
          zh: "由 x^2+y^2=25 求 dy/dx。",
        },
        firstStep: {
          en: "Differentiate both sides with respect to x and remember y is a function of x.",
          es: "Deriva ambos lados respecto de x y recuerda que y es funcion de x.",
          zh: "先对两边关于 x 求导，并记住 y 其实是 x 的函数。",
        },
        setup: {
          en: "Implicit differentiation is about treating y like y(x), so y-terms need a dy/dx factor.",
          es: "La derivacion implicita trata a y como y(x), asi que los terminos con y necesitan un factor dy/dx.",
          zh: "隐函数求导的关键是把 y 看成 y(x)，所以含 y 的项求导后要带上 dy/dx。",
        },
        fullPath: [
          { en: "Differentiate to get 2x + 2y(dy/dx) = 0.", es: "Deriva y obtienes 2x + 2y(dy/dx) = 0.", zh: "求导得到 2x + 2y(dy/dx) = 0。" },
          { en: "Move 2x to the other side.", es: "Pasa 2x al otro lado.", zh: "把 2x 移到右边。" },
          { en: "Solve: dy/dx = -x/y.", es: "Resuelve: dy/dx = -x/y.", zh: "解得 dy/dx = -x/y。" },
        ],
        answer: {
          en: "-x/y",
          es: "-x/y",
          zh: "-x/y",
        },
        selfCheck: {
          en: "Whenever y is mixed with x, expect a dy/dx factor after differentiating y-terms.",
          es: "Cuando y esta mezclada con x, espera un factor dy/dx al derivar terminos con y.",
          zh: "只要 y 和 x 混在一起，含 y 的项求导后通常都要带 dy/dx。",
        },
      },
    ],
  },
  "tangent-line": {
    midterm: [
      {
        prompt: {
          en: "Find the tangent line to y=x^2 at x=2.",
          es: "Encuentra la recta tangente a y=x^2 en x=2.",
          zh: "求 y=x^2 在 x=2 处的切线方程。",
        },
        firstStep: {
          en: "Find the slope from the derivative, then use point-slope form.",
          es: "Halla la pendiente con la derivada y luego usa la forma punto-pendiente.",
          zh: "先用导数找斜率，再用点斜式写直线。",
        },
        setup: {
          en: "Tangent-line problems always need two things: the point and the slope there.",
          es: "Los problemas de recta tangente siempre necesitan dos cosas: el punto y la pendiente alli.",
          zh: "切线题永远要两样东西：切点和该点处的斜率。",
        },
        fullPath: [
          { en: "The point is (2,4).", es: "El punto es (2,4).", zh: "切点是 (2,4)。" },
          { en: "Since y'=2x, the slope at x=2 is 4.", es: "Como y'=2x, la pendiente en x=2 es 4.", zh: "因为 y'=2x，所以 x=2 处斜率是 4。" },
          { en: "Use y-4=4(x-2), so y=4x-4.", es: "Usa y-4=4(x-2), asi que y=4x-4.", zh: "代入点斜式 y-4=4(x-2)，化简得 y=4x-4。" },
        ],
        answer: {
          en: "y=4x-4",
          es: "y=4x-4",
          zh: "y=4x-4",
        },
        selfCheck: {
          en: "Tangent line = point + derivative slope.",
          es: "Recta tangente = punto + pendiente de la derivada.",
          zh: "切线 = 点 + 导数给出的斜率。",
        },
      },
    ],
  },
  optimization: {
    midterm: [
      {
        prompt: {
          en: "A rectangle has perimeter 20. What area expression should you maximize after using one variable?",
          es: "Un rectangulo tiene perimetro 20. ¿Que expresion de area debes maximizar despues de usar una sola variable?",
          zh: "一个长方形周长是 20。化成一个变量后，应该最大化哪个面积表达式？",
        },
        firstStep: {
          en: "Use the constraint to write one side in terms of the other.",
          es: "Usa la restriccion para escribir un lado en funcion del otro.",
          zh: "先用约束把一个边长写成另一个边长的函数。",
        },
        setup: {
          en: "Optimization is usually not calculus first. It is algebra first, then calculus.",
          es: "La optimizacion normalmente no empieza con calculo, sino con algebra y luego calculo.",
          zh: "最优化题通常不是先求导，而是先做代数整理，再上微积分。",
        },
        fullPath: [
          { en: "Perimeter 20 means 2x+2y=20, so y=10-x.", es: "Perimetro 20 significa 2x+2y=20, asi que y=10-x.", zh: "周长 20 表示 2x+2y=20，所以 y=10-x。" },
          { en: "Area is A=xy.", es: "El area es A=xy.", zh: "面积是 A=xy。" },
          { en: "Substitute to get A(x)=x(10-x).", es: "Sustituye y obtienes A(x)=x(10-x).", zh: "代入后得到 A(x)=x(10-x)。" },
        ],
        answer: {
          en: "A(x)=x(10-x)",
          es: "A(x)=x(10-x)",
          zh: "A(x)=x(10-x)",
        },
        selfCheck: {
          en: "Optimization = one variable first, derivative second.",
          es: "Optimizacion = primero una variable, despues derivada.",
          zh: "最优化 = 先化成一个变量，再求导。",
        },
      },
    ],
  },
  "u-substitution": {
    quiz: [
      {
        prompt: {
          en: "Evaluate ∫ 2x cos(x^2) dx.",
          es: "Evalua ∫ 2x cos(x^2) dx.",
          zh: "计算 ∫ 2x cos(x^2) dx。",
        },
        firstStep: {
          en: "Let u=x^2 because the inside has its derivative sitting outside.",
          es: "Toma u=x^2 porque la derivada de adentro ya esta afuera.",
          zh: "令 u=x^2，因为里面那一层的导数正好就在外面。",
        },
        setup: {
          en: "u-sub works best when you can spot an inside expression and its derivative nearby.",
          es: "La sustitucion u funciona mejor cuando ves una expresion interior y su derivada cerca.",
          zh: "u 代换最舒服的情形，就是你能看见“里面那层”和它的导数就在旁边。",
        },
        fullPath: [
          { en: "Let u=x^2, so du=2x dx.", es: "Sea u=x^2, entonces du=2x dx.", zh: "设 u=x^2，则 du=2x dx。" },
          { en: "The integral becomes ∫ cos(u) du.", es: "La integral se vuelve ∫ cos(u) du.", zh: "积分变成 ∫ cos(u) du。" },
          { en: "So the answer is sin(u)+C = sin(x^2)+C.", es: "Entonces la respuesta es sin(u)+C = sin(x^2)+C.", zh: "所以答案是 sin(u)+C = sin(x^2)+C。" },
        ],
        answer: {
          en: "sin(x^2)+C",
          es: "sin(x^2)+C",
          zh: "sin(x^2)+C",
        },
        selfCheck: {
          en: "Inside function plus its derivative nearby means try u-sub.",
          es: "Funcion interior mas su derivada cerca significa prueba sustitucion u.",
          zh: "看到内层函数和它的导数一起出现，就先想 u 代换。",
        },
      },
    ],
  },
  "infinite-limits": {
    quiz: [
      {
        prompt: {
          en: "Evaluate lim_{x→2} 1/(x-2)^2.",
          es: "Evalua lim_{x→2} 1/(x-2)^2.",
          zh: "计算 lim_{x→2} 1/(x-2)^2。",
        },
        firstStep: {
          en: "Check what the denominator does as x gets close to 2.",
          es: "Mira que hace el denominador cuando x se acerca a 2.",
          zh: "先看分母在 x 接近 2 时会发生什么。",
        },
        setup: {
          en: "Infinite-limit questions are about a denominator shrinking toward 0 while the whole fraction blows up.",
          es: "Las preguntas de limite infinito tratan de un denominador que se acerca a 0 mientras la fraccion explota.",
          zh: "无穷极限题的核心，是分母逼近 0，而整个分式却冲向无穷大。",
        },
        fullPath: [
          { en: "As x→2, (x-2)^2→0 from the positive side.", es: "Cuando x→2, (x-2)^2→0 por el lado positivo.", zh: "当 x→2 时，(x-2)^2 从正方向逼近 0。" },
          { en: "So 1/(x-2)^2 becomes a huge positive number.", es: "Entonces 1/(x-2)^2 se vuelve un numero positivo enorme.", zh: "所以 1/(x-2)^2 会变成很大的正数。" },
          { en: "Therefore the limit is +∞.", es: "Por tanto el limite es +∞.", zh: "因此极限是 +∞。" },
        ],
        answer: {
          en: "+∞",
          es: "+∞",
          zh: "+∞",
        },
        selfCheck: {
          en: "Tiny positive denominator under 1 means huge positive output.",
          es: "Un denominador positivo diminuto bajo 1 significa una salida positiva enorme.",
          zh: "1 除以一个很小的正数，就会得到很大的正数。",
        },
      },
    ],
  },
  "limits-at-infinity": {
    quiz: [
      {
        prompt: {
          en: "Evaluate lim_{x→∞} (3x^2-1)/(x^2+5).",
          es: "Evalua lim_{x→∞} (3x^2-1)/(x^2+5).",
          zh: "计算 lim_{x→∞} (3x^2-1)/(x^2+5)。",
        },
        firstStep: {
          en: "Compare the top degree and bottom degree.",
          es: "Compara el grado de arriba con el de abajo.",
          zh: "先比较分子和分母的最高次数。",
        },
        setup: {
          en: "At infinity, rational functions are usually ruled by the highest powers.",
          es: "En el infinito, las funciones racionales suelen estar dominadas por las potencias mas altas.",
          zh: "在无穷远处，有理函数通常由最高次项控制。",
        },
        fullPath: [
          { en: "Both top and bottom have degree 2.", es: "Arriba y abajo tienen grado 2.", zh: "分子分母都是二次。" },
          { en: "So compare leading coefficients 3 and 1.", es: "Entonces compara los coeficientes principales 3 y 1.", zh: "所以比较首项系数 3 和 1。" },
          { en: "The limit is 3.", es: "El limite es 3.", zh: "极限是 3。" },
        ],
        answer: {
          en: "3",
          es: "3",
          zh: "3",
        },
        selfCheck: {
          en: "Same degree means leading-coefficient ratio.",
          es: "Mismo grado significa cociente de coeficientes principales.",
          zh: "次数相同，就看首项系数之比。",
        },
      },
    ],
  },
  "increasing-decreasing": {
    quiz: [
      {
        prompt: {
          en: "If f'(x)>0 on an interval, what does that say about f there?",
          es: "Si f'(x)>0 en un intervalo, ¿que dice eso sobre f alli?",
          zh: "如果在一个区间上 f'(x)>0，这说明 f 在那里怎样？",
        },
        firstStep: {
          en: "Read the sign of the derivative as the direction of motion.",
          es: "Lee el signo de la derivada como direccion de movimiento.",
          zh: "把导数的符号看成函数运动的方向。",
        },
        setup: {
          en: "Increasing/decreasing questions are sign-chart questions in disguise.",
          es: "Las preguntas de crecimiento y decrecimiento son realmente preguntas de signo disfrazadas.",
          zh: "增减性题本质上就是导数符号题。",
        },
        fullPath: [
          { en: "Positive derivative means tangent slopes are positive.", es: "Derivada positiva significa pendientes tangentes positivas.", zh: "导数为正，表示切线斜率为正。" },
          { en: "Positive slope means the graph rises as x increases.", es: "Pendiente positiva significa que la grafica sube cuando x aumenta.", zh: "斜率为正，说明 x 增大时图像往上走。" },
          { en: "So f is increasing on that interval.", es: "Asi que f es creciente en ese intervalo.", zh: "所以函数在这个区间上递增。" },
        ],
        answer: {
          en: "f is increasing.",
          es: "f es creciente.",
          zh: "f 在该区间上递增。",
        },
        selfCheck: {
          en: "Derivative sign tells graph direction.",
          es: "El signo de la derivada te dice la direccion de la grafica.",
          zh: "导数的符号会告诉你图像往哪边走。",
        },
      },
    ],
  },
  "local-max-min": {
    quiz: [
      {
        prompt: {
          en: "At a local maximum, how does the derivative sign usually change?",
          es: "En un maximo local, ¿como suele cambiar el signo de la derivada?",
          zh: "在局部极大值点附近，导数符号通常怎样变化？",
        },
        firstStep: {
          en: "Think about what the graph is doing before and after the point.",
          es: "Piensa que hace la grafica antes y despues del punto.",
          zh: "先想图像在这个点前后分别怎么走。",
        },
        setup: {
          en: "Local extrema are about a change in direction, not just a derivative equaling zero.",
          es: "Los extremos locales tratan de un cambio de direccion, no solo de que la derivada valga cero.",
          zh: "局部极值看的不是“导数等于零”这一件事，而是函数方向有没有改变。",
        },
        fullPath: [
          { en: "Before a local max, the graph is usually rising.", es: "Antes de un maximo local, la grafica suele subir.", zh: "到达局部极大之前，图像通常在上升。" },
          { en: "After a local max, the graph is usually falling.", es: "Despues de un maximo local, la grafica suele bajar.", zh: "过了局部极大之后，图像通常在下降。" },
          { en: "So f' changes from positive to negative.", es: "Asi que f' cambia de positivo a negativo.", zh: "所以 f' 会从正变负。" },
        ],
        answer: {
          en: "Positive to negative.",
          es: "De positivo a negativo.",
          zh: "从正变负。",
        },
        selfCheck: {
          en: "Max = up then down. Min = down then up.",
          es: "Maximo = sube y luego baja. Minimo = baja y luego sube.",
          zh: "极大 = 先上后下；极小 = 先下后上。",
        },
      },
    ],
  },
  "first-derivative-test": {
    midterm: [
      {
        prompt: {
          en: "Suppose f'(x) is positive for x<1 and negative for x>1. What does the first derivative test say happens at x=1?",
          es: "Supongamos que f'(x) es positiva para x<1 y negativa para x>1. ¿Que dice la primera prueba de la derivada en x=1?",
          zh: "若 x<1 时 f'(x) 为正，x>1 时 f'(x) 为负，那么一阶导数检验说明 x=1 处是什么？",
        },
        firstStep: {
          en: "Read the derivative sign change, not just the point itself.",
          es: "Lee el cambio de signo de la derivada, no solo el punto.",
          zh: "先看导数符号有没有变化，不要只盯着这个点本身。",
        },
        setup: {
          en: "The first derivative test uses sign changes of f' to classify the critical point.",
          es: "La primera prueba de la derivada usa cambios de signo de f' para clasificar el punto critico.",
          zh: "一阶导数检验，就是靠 f' 的符号变化来判断临界点类型。",
        },
        fullPath: [
          { en: "Positive derivative on the left means the function rises into x=1.", es: "Derivada positiva a la izquierda significa que la funcion sube hacia x=1.", zh: "左边导数为正，说明函数在靠近 x=1 时一直上升。" },
          { en: "Negative derivative on the right means the function falls after x=1.", es: "Derivada negativa a la derecha significa que la funcion cae despues de x=1.", zh: "右边导数为负，说明过了 x=1 之后函数开始下降。" },
          { en: "So x=1 is a local maximum.", es: "Asi que x=1 es un maximo local.", zh: "所以 x=1 是一个局部极大值点。" },
        ],
        answer: {
          en: "A local maximum at x=1.",
          es: "Un maximo local en x=1.",
          zh: "x=1 处是局部极大值。",
        },
        selfCheck: {
          en: "First derivative test = sign chart in, classification out.",
          es: "Primera prueba de la derivada = entra una tabla de signos y sale una clasificacion.",
          zh: "一阶导数检验 = 看符号表，然后给出极值分类。",
        },
      },
    ],
  },
  "linear-approximation": {
    midterm: [
      {
        prompt: {
          en: "Use linear approximation at x=9 to estimate sqrt(9.4).",
          es: "Usa aproximacion lineal en x=9 para estimar sqrt(9.4).",
          zh: "在 x=9 处用线性近似估算 sqrt(9.4)。",
        },
        firstStep: {
          en: "Use L(x)=f(a)+f'(a)(x-a) with a=9.",
          es: "Usa L(x)=f(a)+f'(a)(x-a) con a=9.",
          zh: "先用 L(x)=f(a)+f'(a)(x-a)，这里 a=9。",
        },
        setup: {
          en: "Linear approximation works best near a friendly number where the function and derivative are easy.",
          es: "La aproximacion lineal funciona mejor cerca de un numero amigable donde funcion y derivada son faciles.",
          zh: "线性近似最好用在靠近“好算点”的地方：函数值和导数都容易算。",
        },
        fullPath: [
          { en: "Let f(x)=sqrt(x), so f(9)=3 and f'(x)=1/(2sqrt(x)).", es: "Sea f(x)=sqrt(x), entonces f(9)=3 y f'(x)=1/(2sqrt(x)).", zh: "设 f(x)=sqrt(x)，则 f(9)=3，且 f'(x)=1/(2sqrt(x))。" },
          { en: "Compute f'(9)=1/6.", es: "Calcula f'(9)=1/6.", zh: "算出 f'(9)=1/6。" },
          { en: "L(9.4)=3+(1/6)(0.4)=3.0666..., so sqrt(9.4)≈3.067.", es: "L(9.4)=3+(1/6)(0.4)=3.0666..., asi que sqrt(9.4)≈3.067.", zh: "L(9.4)=3+(1/6)(0.4)=3.0666...，所以 sqrt(9.4)≈3.067。" },
        ],
        answer: {
          en: "About 3.067",
          es: "Aproximadamente 3.067",
          zh: "约 3.067",
        },
        selfCheck: {
          en: "Linear approximation = tangent line used as a local stand-in.",
          es: "Aproximacion lineal = usar la recta tangente como reemplazo local.",
          zh: "线性近似 = 用切线在附近临时代替原函数。",
        },
      },
    ],
  },
  "definite-integral-area": {
    quiz: [
      {
        prompt: {
          en: "What geometric meaning does ∫_a^b f(x) dx have when f(x) stays above the x-axis?",
          es: "¿Que significado geometrico tiene ∫_a^b f(x) dx cuando f(x) se mantiene sobre el eje x?",
          zh: "当 f(x) 始终在 x 轴上方时，∫_a^b f(x) dx 的几何意义是什么？",
        },
        firstStep: {
          en: "Translate the integral into area language.",
          es: "Traduce la integral al lenguaje de area.",
          zh: "先把积分翻译成面积语言。",
        },
        setup: {
          en: "A first definite-integral question usually wants the area idea before any antiderivative work.",
          es: "Una primera pregunta de integral definida suele querer la idea de area antes de cualquier antiderivada.",
          zh: "最初的定积分题，往往先考“面积意义”，不是马上去求原函数。",
        },
        fullPath: [
          { en: "The graph sits above the x-axis on [a,b].", es: "La grafica esta sobre el eje x en [a,b].", zh: "图像在区间 [a,b] 上位于 x 轴上方。" },
          { en: "So signed area and ordinary area match.", es: "Entonces el area con signo y el area ordinaria coinciden.", zh: "所以带符号面积和普通面积是一样的。" },
          { en: "The integral equals the area under the curve from a to b.", es: "La integral es el area bajo la curva desde a hasta b.", zh: "这个积分就是从 a 到 b 曲线下方的面积。" },
        ],
        answer: {
          en: "The area under the curve on [a,b].",
          es: "El area bajo la curva en [a,b].",
          zh: "区间 [a,b] 上曲线下方的面积。",
        },
        selfCheck: {
          en: "Above the axis means definite integral = ordinary area.",
          es: "Encima del eje significa integral definida = area ordinaria.",
          zh: "如果一直在 x 轴上方，定积分就等于普通面积。",
        },
      },
    ],
  },
  "calc3-planes": {
    quiz: [
      {
        prompt: {
          en: "What geometric role does <a,b,c> play in the plane equation ax+by+cz=d?",
          es: "¿Que papel geometrico juega <a,b,c> en la ecuacion del plano ax+by+cz=d?",
          zh: "在平面方程 ax+by+cz=d 中，<a,b,c> 的几何角色是什么？",
        },
        firstStep: {
          en: "Read the coefficients as the normal vector.",
          es: "Lee los coeficientes como el vector normal.",
          zh: "先把这些系数看成法向量。",
        },
        setup: {
          en: "Plane equations are controlled by a normal vector, not by a direction inside the plane.",
          es: "Las ecuaciones de planos las controla un vector normal, no una direccion dentro del plano.",
          zh: "平面方程是由法向量决定的，不是由平面内的方向向量决定的。",
        },
        fullPath: [
          { en: "In ax+by+cz=d, the coefficients package into <a,b,c>.", es: "En ax+by+cz=d, los coeficientes se agrupan en <a,b,c>.", zh: "在 ax+by+cz=d 里，系数可以打包成 <a,b,c>。" },
          { en: "That vector is perpendicular to every direction lying in the plane.", es: "Ese vector es perpendicular a toda direccion contenida en el plano.", zh: "这个向量垂直于平面内的所有方向。" },
          { en: "So <a,b,c> is the normal vector.", es: "Asi que <a,b,c> es el vector normal.", zh: "所以 <a,b,c> 就是法向量。" },
        ],
        answer: {
          en: "It is the normal vector.",
          es: "Es el vector normal.",
          zh: "它是法向量。",
        },
        selfCheck: {
          en: "Plane equation coefficients point normal to the plane.",
          es: "Los coeficientes del plano apuntan normal al plano.",
          zh: "平面方程的系数，就是平面的法向量。",
        },
      },
    ],
  },
  "calc3-quadric-surfaces": {
    quiz: [
      {
        prompt: {
          en: "Identify the surface x^2+y^2=9.",
          es: "Identifica la superficie x^2+y^2=9.",
          zh: "识别曲面 x^2+y^2=9。",
        },
        firstStep: {
          en: "Check whether a variable is missing.",
          es: "Primero revisa si falta una variable.",
          zh: "第一步先看有没有变量缺席。",
        },
        setup: {
          en: "Surface-recognition questions often become easy once you notice a missing variable.",
          es: "Las preguntas de reconocimiento de superficies suelen volverse faciles cuando notas una variable ausente.",
          zh: "识别曲面时，只要先注意有没有缺失变量，很多题就会立刻变简单。",
        },
        fullPath: [
          { en: "Only x and y appear; z is missing.", es: "Solo aparecen x e y; z falta.", zh: "方程里只有 x 和 y，z 没有出现。" },
          { en: "In the xy-plane, x^2+y^2=9 is a circle of radius 3.", es: "En el plano xy, x^2+y^2=9 es un circulo de radio 3.", zh: "在 xy 平面里，x^2+y^2=9 是半径为 3 的圆。" },
          { en: "Extending that circle through all z gives a circular cylinder.", es: "Al extender ese circulo para todos los z obtienes un cilindro circular.", zh: "把这个圆沿着所有 z 方向拉开，就得到圆柱面。" },
        ],
        answer: {
          en: "A circular cylinder of radius 3.",
          es: "Un cilindro circular de radio 3.",
          zh: "半径为 3 的圆柱面。",
        },
        selfCheck: {
          en: "Missing variable often means cylinder.",
          es: "Variable ausente suele significar cilindro.",
          zh: "缺少一个变量，往往就是柱面。",
        },
      },
    ],
  },
  "calc3-partial-derivatives": {
    quiz: [
      {
        prompt: {
          en: "Find ∂/∂x of f(x,y)=x^2y+sin(xy).",
          es: "Halla ∂/∂x de f(x,y)=x^2y+sin(xy).",
          zh: "求 f(x,y)=x^2y+sin(xy) 关于 x 的偏导数。",
        },
        firstStep: {
          en: "Treat y like a constant while differentiating with respect to x.",
          es: "Trata y como constante mientras derivas respecto de x.",
          zh: "对 x 求偏导时，把 y 当成常数。",
        },
        setup: {
          en: "Partial derivatives are ordinary derivatives with one variable moving and the others frozen.",
          es: "Las derivadas parciales son derivadas ordinarias donde una variable se mueve y las demas quedan congeladas.",
          zh: "偏导数本质上就是：让一个变量动，其他变量全部冻结。",
        },
        fullPath: [
          { en: "Differentiate x^2y as 2xy because y is constant.", es: "Deriva x^2y como 2xy porque y es constante.", zh: "x^2y 对 x 求偏导得到 2xy，因为 y 当常数。" },
          { en: "Differentiate sin(xy) by chain rule: cos(xy)·y.", es: "Deriva sin(xy) con regla de la cadena: cos(xy)·y.", zh: "sin(xy) 用链式法则，得到 cos(xy)·y。" },
          { en: "So ∂f/∂x = 2xy + y cos(xy).", es: "Entonces ∂f/∂x = 2xy + y cos(xy).", zh: "所以 ∂f/∂x = 2xy + y cos(xy)。" },
        ],
        answer: {
          en: "2xy + y cos(xy)",
          es: "2xy + y cos(xy)",
          zh: "2xy + y cos(xy)",
        },
        selfCheck: {
          en: "Partial in x = freeze y.",
          es: "Parcial en x = congelar y.",
          zh: "对 x 求偏导 = 冻结 y。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "For f(x,y)=e^(xy)+x/y, find f_y.",
          es: "Para f(x,y)=e^(xy)+x/y, halla f_y.",
          zh: "设 f(x,y)=e^(xy)+x/y，求 f_y。",
        },
        firstStep: {
          en: "Freeze x and differentiate every term with respect to y.",
          es: "Congela x y deriva cada termino respecto de y.",
          zh: "先把 x 冻结，然后每一项都对 y 求偏导。",
        },
        setup: {
          en: "Midterm partials usually mix product and chain-rule behavior, but the freeze-the-other-variable rule still controls the whole move.",
          es: "En parcial, las parciales suelen mezclar producto y regla de la cadena, pero la regla de congelar la otra variable sigue mandando.",
          zh: "考试里的偏导常会混上乘法和链式法则，但最核心的规则仍然是：其他变量先冻结。",
        },
        fullPath: [
          { en: "Differentiate e^(xy) as x e^(xy), because xy has y-derivative x.", es: "Deriva e^(xy) como x e^(xy), porque la derivada de xy respecto de y es x.", zh: "e^(xy) 对 y 求偏导时得到 x e^(xy)，因为 xy 对 y 的导数是 x。" },
          { en: "Differentiate x/y as -x/y^2, treating x as constant.", es: "Deriva x/y como -x/y^2, tratando x como constante.", zh: "x/y 对 y 求偏导得到 -x/y^2，把 x 当常数。" },
          { en: "So f_y = x e^(xy) - x/y^2.", es: "Entonces f_y = x e^(xy) - x/y^2.", zh: "所以 f_y = x e^(xy) - x/y^2。" },
        ],
        answer: {
          en: "x e^(xy) - x/y^2",
          es: "x e^(xy) - x/y^2",
          zh: "x e^(xy) - x/y^2",
        },
        selfCheck: {
          en: "Harder partial, same rule: freeze the other variable.",
          es: "Parcial mas dura, misma regla: congela la otra variable.",
          zh: "偏导再难，核心规则也没变：别动另一个变量。",
        },
      },
    ],
  },
  "calc3-double-integrals": {
    quiz: [
      {
        prompt: {
          en: "What does a double integral over a rectangle usually add up?",
          es: "¿Que suma normalmente una integral doble sobre un rectangulo?",
          zh: "在一个矩形区域上的二重积分，通常在累加什么？",
        },
        firstStep: {
          en: "Think of tiny area tiles instead of one long strip.",
          es: "Piensa en azulejos de area pequenos en vez de una sola tira larga.",
          zh: "先想很多小面积方块，而不是一长条。",
        },
        setup: {
          en: "A double integral is the 2D version of accumulation: small area pieces instead of small width pieces.",
          es: "Una integral doble es la version 2D de acumular: piezas pequenas de area en lugar de piezas pequenas de ancho.",
          zh: "二重积分就是把一维“很多小宽度”升级成二维“很多小面积块”的累加。",
        },
        fullPath: [
          { en: "The region is chopped into tiny rectangles.", es: "La region se divide en rectangulos diminutos.", zh: "先把区域切成很多很小的矩形。" },
          { en: "Each tile contributes f(x,y) times a tiny area.", es: "Cada pedazo aporta f(x,y) por un area pequena.", zh: "每一小块贡献的是 f(x,y) 乘上一个很小的面积。" },
          { en: "The double integral adds all those tiny contributions together.", es: "La integral doble suma todas esas contribuciones pequenas.", zh: "二重积分就是把这些小贡献全部加起来。" },
        ],
        answer: {
          en: "It adds up tiny area-weighted contributions f(x,y) dA.",
          es: "Suma contribuciones pequenas ponderadas por area, f(x,y) dA.",
          zh: "它在累加很多形如 f(x,y) dA 的小面积贡献。",
        },
        selfCheck: {
          en: "Single integral = strips. Double integral = tiles.",
          es: "Integral simple = tiras. Integral doble = azulejos.",
          zh: "单积分像条带，二重积分像小方块。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Set up ∬_R (x+2y) dA over the rectangle 0≤x≤2, 1≤y≤4 as an iterated integral.",
          es: "Plantea ∬_R (x+2y) dA sobre el rectangulo 0≤x≤2, 1≤y≤4 como integral iterada.",
          zh: "把矩形区域 0≤x≤2, 1≤y≤4 上的 ∬_R (x+2y) dA 写成迭代积分。",
        },
        firstStep: {
          en: "Read the x- and y-bounds directly from the rectangle.",
          es: "Lee directamente los limites de x e y a partir del rectangulo.",
          zh: "先直接从矩形读出 x 和 y 的上下限。",
        },
        setup: {
          en: "For a rectangle, the bounds are independent, so setup should feel clean and direct.",
          es: "En un rectangulo, los limites son independientes, asi que el planteamiento debe salir limpio y directo.",
          zh: "矩形区域的积分限彼此独立，所以设定应该非常直接。",
        },
        fullPath: [
          { en: "Use 0 to 2 for x and 1 to 4 for y.", es: "Usa 0 a 2 para x y 1 a 4 para y.", zh: "x 用 0 到 2，y 用 1 到 4。" },
          { en: "Either order works because it is a rectangle.", es: "Cualquier orden sirve porque es un rectangulo.", zh: "因为是矩形，所以两种积分次序都可以。" },
          { en: "One clean setup is ∫_0^2 ∫_1^4 (x+2y) dy dx.", es: "Un planteamiento limpio es ∫_0^2 ∫_1^4 (x+2y) dy dx.", zh: "一种干净写法是 ∫_0^2 ∫_1^4 (x+2y) dy dx。" },
        ],
        answer: {
          en: "∫_0^2 ∫_1^4 (x+2y) dy dx",
          es: "∫_0^2 ∫_1^4 (x+2y) dy dx",
          zh: "∫_0^2 ∫_1^4 (x+2y) dy dx",
        },
        selfCheck: {
          en: "Rectangle region = independent bounds.",
          es: "Region rectangular = limites independientes.",
          zh: "矩形区域 = 积分限互不依赖。",
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
  "calc3-gradient": {
    quiz: [
      {
        prompt: {
          en: "For f(x,y)=x^2y+y^3, find ∇f.",
          es: "Para f(x,y)=x^2y+y^3, halla ∇f.",
          zh: "设 f(x,y)=x^2y+y^3，求 ∇f。",
        },
        firstStep: {
          en: "Compute the x-partial and y-partial, then package them together.",
          es: "Calcula la parcial en x y la parcial en y, y luego jun­talas.",
          zh: "先分别求 x 偏导和 y 偏导，再把它们打包起来。",
        },
        setup: {
          en: "The gradient is just the vector of first partial derivatives.",
          es: "El gradiente es simplemente el vector de derivadas parciales primeras.",
          zh: "梯度本质上就是一阶偏导数组成的向量。",
        },
        fullPath: [
          { en: "∂f/∂x = 2xy.", es: "∂f/∂x = 2xy.", zh: "∂f/∂x = 2xy。" },
          { en: "∂f/∂y = x^2 + 3y^2.", es: "∂f/∂y = x^2 + 3y^2.", zh: "∂f/∂y = x^2 + 3y^2。" },
          { en: "So ∇f = <2xy, x^2+3y^2>.", es: "Entonces ∇f = <2xy, x^2+3y^2>.", zh: "所以 ∇f = <2xy, x^2+3y^2>。" },
        ],
        answer: {
          en: "<2xy, x^2+3y^2>",
          es: "<2xy, x^2+3y^2>",
          zh: "<2xy, x^2+3y^2>",
        },
        selfCheck: {
          en: "Gradient = collect the first partials into one vector.",
          es: "Gradiente = juntar las derivadas parciales primeras en un vector.",
          zh: "梯度 = 把一阶偏导收集成一个向量。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "For f(x,y)=x^2+y^2 at (1,-2), what direction gives the fastest increase?",
          es: "Para f(x,y)=x^2+y^2 en (1,-2), ¿que direccion da el aumento mas rapido?",
          zh: "对 f(x,y)=x^2+y^2，在点 (1,-2) 处，哪个方向增长最快？",
        },
        firstStep: {
          en: "Compute the gradient at the point.",
          es: "Calcula el gradiente en ese punto.",
          zh: "先算出该点的梯度。",
        },
        setup: {
          en: "Fastest increase means follow the gradient at that point, not some random direction.",
          es: "Aumento mas rapido significa seguir el gradiente en ese punto, no una direccion al azar.",
          zh: "“增长最快”就等于沿着该点的梯度方向走，不是随便挑个方向。",
        },
        fullPath: [
          { en: "∇f = <2x,2y>.", es: "∇f = <2x,2y>.", zh: "先求得 ∇f = <2x,2y>。" },
          { en: "At (1,-2), that becomes <2,-4>.", es: "En (1,-2), eso da <2,-4>.", zh: "代入 (1,-2) 得到 <2,-4>。" },
          { en: "So the fastest-increase direction is along <2,-4> or its unit version.", es: "Entonces la direccion de aumento mas rapido es <2,-4> 或 su version unitaria.", zh: "所以最快上升方向就是 <2,-4>，或它对应的单位向量方向。" },
        ],
        answer: {
          en: "Along the gradient direction <2,-4>.",
          es: "En la direccion del gradiente <2,-4>.",
          zh: "沿梯度方向 <2,-4>。",
        },
        selfCheck: {
          en: "Fastest increase = gradient direction.",
          es: "Aumento mas rapido = direccion del gradiente.",
          zh: "增长最快 = 梯度方向。",
        },
      },
    ],
  },
  "calc3-lagrange-multipliers": {
    midterm: [
      {
        prompt: {
          en: "What system do you set up first to optimize f(x,y)=xy subject to x^2+y^2=1?",
          es: "¿Que sistema armas primero para optimizar f(x,y)=xy con la restriccion x^2+y^2=1?",
          zh: "要在约束 x^2+y^2=1 下优化 f(x,y)=xy，第一步该列什么方程组？",
        },
        firstStep: {
          en: "Write ∇f = λ∇g together with the constraint.",
          es: "Escribe ∇f = λ∇g junto con la restriccion.",
          zh: "先写 ∇f = λ∇g，再加上原约束。",
        },
        setup: {
          en: "Lagrange multiplier problems begin with parallel gradients, not with plugging random points.",
          es: "Los problemas de multiplicadores de Lagrange empiezan con gradientes paralelos, no probando puntos al azar.",
          zh: "拉格朗日乘子法的第一步是“梯度平行”，不是乱代点。",
        },
        fullPath: [
          { en: "Take g(x,y)=x^2+y^2.", es: "Toma g(x,y)=x^2+y^2.", zh: "先设约束函数 g(x,y)=x^2+y^2。" },
          { en: "Compute ∇f=<y,x> and ∇g=<2x,2y>.", es: "Calcula ∇f=<y,x> y ∇g=<2x,2y>.", zh: "计算 ∇f=<y,x>，∇g=<2x,2y>。" },
          { en: "Set <y,x> = λ<2x,2y> and keep x^2+y^2=1.", es: "Plantea <y,x> = λ<2x,2y> y conserva x^2+y^2=1.", zh: "列出 <y,x> = λ<2x,2y>，并保留 x^2+y^2=1。" },
        ],
        answer: {
          en: "Use <y,x> = λ<2x,2y> with x^2+y^2=1.",
          es: "Usa <y,x> = λ<2x,2y> con x^2+y^2=1.",
          zh: "列出 <y,x> = λ<2x,2y>，并加上 x^2+y^2=1。",
        },
        selfCheck: {
          en: "Lagrange = gradient of objective parallel to gradient of constraint.",
          es: "Lagrange = gradiente del objetivo paralelo al gradiente de la restriccion.",
          zh: "拉格朗日乘子法 = 目标函数梯度与约束梯度平行。",
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
  "calc3-multivariable-limits": {
    quiz: [
      {
        prompt: {
          en: "Why is trying two different paths a fast test for whether a multivariable limit does not exist?",
          es: "¿Por que probar dos caminos distintos es una prueba rapida de que un limite multivariable no existe?",
          zh: "为什么试两条不同路径，是判断多元极限不存在的快捷方法？",
        },
        firstStep: {
          en: "Compare what the function approaches along different routes to the same point.",
          es: "Compara a que valor se acerca la funcion por rutas distintas al mismo punto.",
          zh: "先比较函数沿不同路径逼近同一点时，各自逼近什么值。",
        },
        setup: {
          en: "A multivariable limit can exist only if every path agrees on the same target.",
          es: "Un limite multivariable solo puede existir si todos los caminos coinciden en el mismo valor.",
          zh: "多元极限若存在，所有路径都必须逼近同一个值。",
        },
        fullPath: [
          { en: "Choose two easy paths, like y=0 and y=x.", es: "Elige dos caminos faciles, como y=0 y y=x.", zh: "先选两条简单路径，比如 y=0 和 y=x。" },
          { en: "Compute the limiting value along each path.", es: "Calcula el valor limite en cada camino.", zh: "分别算这两条路径上的极限值。" },
          { en: "If the two answers differ, the overall limit does not exist.", es: "Si las dos respuestas difieren, el limite total no existe.", zh: "如果两个答案不同，那么总极限不存在。" },
        ],
        answer: {
          en: "Different path limits kill the overall limit.",
          es: "Si los limites por caminos difieren, el limite total no existe.",
          zh: "不同路径给出不同极限值，就说明总极限不存在。",
        },
        selfCheck: {
          en: "Two paths, two answers, no limit.",
          es: "Dos caminos, dos respuestas, no hay limite.",
          zh: "两条路径、两个答案、极限不存在。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Test whether lim_(x,y)->(0,0) (xy)/(x^2+y^2) exists.",
          es: "Comprueba si existe lim_(x,y)->(0,0) (xy)/(x^2+y^2).",
          zh: "判断 lim_(x,y)->(0,0) (xy)/(x^2+y^2) 是否存在。",
        },
        firstStep: {
          en: "Try two simple paths that hit the origin.",
          es: "Prueba dos caminos sencillos que lleguen al origen.",
          zh: "先试两条简单路径逼近原点。",
        },
        setup: {
          en: "This is a classic path-comparison limit. One clean disagreement is enough to kill the limit.",
          es: "Este es un limite clasico de comparacion por caminos. Una sola discrepancia limpia basta para matar el limite.",
          zh: "这是典型的路径比较极限题。只要找到一次明确不一致，极限就直接不存在。",
        },
        fullPath: [
          { en: "Along y=0, the expression becomes 0.", es: "Por y=0, la expresion se vuelve 0.", zh: "沿 y=0 这条路径，式子变成 0。" },
          { en: "Along y=x, it becomes x^2/(2x^2)=1/2.", es: "Por y=x, se vuelve x^2/(2x^2)=1/2.", zh: "沿 y=x，式子变成 x^2/(2x^2)=1/2。" },
          { en: "The path limits disagree, so the limit does not exist.", es: "Los limites por caminos no coinciden, asi que el limite no existe.", zh: "两条路径给出的极限不同，所以总极限不存在。" },
        ],
        answer: {
          en: "The limit does not exist.",
          es: "El limite no existe.",
          zh: "极限不存在。",
        },
        selfCheck: {
          en: "One path 0, one path 1/2 -> dead limit.",
          es: "Un camino da 0 y otro da 1/2 -> limite muerto.",
          zh: "一路是 0，一路是 1/2 -> 极限直接死掉。",
        },
      },
    ],
  },
  "calc3-tangent-plane": {
    quiz: [
      {
        prompt: {
          en: "What ingredients do you need first to write the tangent plane to z=f(x,y) at (a,b)?",
          es: "¿Que ingredientes necesitas primero para escribir el plano tangente a z=f(x,y) en (a,b)?",
          zh: "要写 z=f(x,y) 在 (a,b) 处的切平面，最先需要哪几个量？",
        },
        firstStep: {
          en: "Get the point, f_x(a,b), and f_y(a,b).",
          es: "Consigue el punto, f_x(a,b) y f_y(a,b).",
          zh: "先拿到切点、f_x(a,b) 和 f_y(a,b)。",
        },
        setup: {
          en: "A tangent plane is the two-variable version of a tangent line: point plus slope data.",
          es: "Un plano tangente es la version de dos variables de una recta tangente: punto mas datos de pendiente.",
          zh: "切平面就是二元函数版本的切线：一点再加上两个方向的斜率信息。",
        },
        fullPath: [
          { en: "Find the point (a,b,f(a,b)).", es: "Encuentra el punto (a,b,f(a,b)).", zh: "先找到切点 (a,b,f(a,b))。" },
          { en: "Compute the partial derivatives f_x(a,b) and f_y(a,b).", es: "Calcula las derivadas parciales f_x(a,b) y f_y(a,b).", zh: "再计算偏导数 f_x(a,b) 和 f_y(a,b)。" },
          { en: "Use z-f(a,b)=f_x(a,b)(x-a)+f_y(a,b)(y-b).", es: "Usa z-f(a,b)=f_x(a,b)(x-a)+f_y(a,b)(y-b).", zh: "代入公式 z-f(a,b)=f_x(a,b)(x-a)+f_y(a,b)(y-b)。" },
        ],
        answer: {
          en: "Point plus the two partials: f(a,b), f_x(a,b), f_y(a,b).",
          es: "El punto mas las dos parciales: f(a,b), f_x(a,b), f_y(a,b).",
          zh: "切点加两个偏导：f(a,b)、f_x(a,b)、f_y(a,b)。",
        },
        selfCheck: {
          en: "Tangent plane = point plus x-slope plus y-slope.",
          es: "Plano tangente = punto mas pendiente en x mas pendiente en y.",
          zh: "切平面 = 一点 + x 方向斜率 + y 方向斜率。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Find the tangent plane to z=x^2+y^2 at (1,2).",
          es: "Halla el plano tangente a z=x^2+y^2 en (1,2).",
          zh: "求曲面 z=x^2+y^2 在 (1,2) 处的切平面。",
        },
        firstStep: {
          en: "Compute the point on the surface and the two first partials there.",
          es: "Calcula el punto sobre la superficie y las dos parciales en ese lugar.",
          zh: "先求曲面上的点，再求该点的两个一阶偏导。",
        },
        setup: {
          en: "This is the most standard tangent-plane workflow: point, partials, formula.",
          es: "Este es el flujo mas estandar para plano tangente: punto, parciales, formula.",
          zh: "这是最标准的切平面流程：点、偏导、套公式。",
        },
        fullPath: [
          { en: "f(1,2)=5, so the point is (1,2,5).", es: "f(1,2)=5, asi que el punto es (1,2,5).", zh: "f(1,2)=5，所以切点是 (1,2,5)。" },
          { en: "f_x=2x and f_y=2y, so at (1,2) they are 2 and 4.", es: "f_x=2x y f_y=2y, asi que en (1,2) valen 2 y 4.", zh: "f_x=2x，f_y=2y，所以在 (1,2) 处它们分别是 2 和 4。" },
          { en: "Use z-5 = 2(x-1) + 4(y-2).", es: "Usa z-5 = 2(x-1) + 4(y-2).", zh: "代入公式得到 z-5 = 2(x-1) + 4(y-2)。" },
        ],
        answer: {
          en: "z-5 = 2(x-1) + 4(y-2)",
          es: "z-5 = 2(x-1) + 4(y-2)",
          zh: "z-5 = 2(x-1) + 4(y-2)",
        },
        selfCheck: {
          en: "Point on surface first, then partial slopes.",
          es: "Primero el punto de la superficie, luego las pendientes parciales.",
          zh: "先找曲面上的点，再带入偏导斜率。",
        },
      },
    ],
  },
  "calc3-directional-derivative": {
    quiz: [
      {
        prompt: {
          en: "What two objects do you need to compute a directional derivative fast with the gradient formula?",
          es: "¿Que dos objetos necesitas para calcular rapido una derivada direccional con la formula del gradiente?",
          zh: "用梯度公式快速算方向导数，需要先准备哪两个对象？",
        },
        firstStep: {
          en: "Find the gradient and a unit direction vector.",
          es: "Encuentra el gradiente y un vector direccion unitario.",
          zh: "先找到梯度向量和单位方向向量。",
        },
        setup: {
          en: "Directional derivatives become a dot-product problem once the direction is normalized.",
          es: "Las derivadas direccionales se vuelven un problema de producto punto una vez que la direccion esta normalizada.",
          zh: "方向导数一旦把方向单位化，本质上就变成一个点积问题。",
        },
        fullPath: [
          { en: "Compute ∇f at the point.", es: "Calcula ∇f en el punto.", zh: "先算出该点处的 ∇f。" },
          { en: "Turn the direction into a unit vector u.", es: "Convierte la direccion en un vector unitario u.", zh: "把给定方向化成单位向量 u。" },
          { en: "Then D_u f = ∇f · u.", es: "Entonces D_u f = ∇f · u.", zh: "然后用 D_u f = ∇f · u。" },
        ],
        answer: {
          en: "The gradient and a unit direction vector.",
          es: "El gradiente y un vector direccion unitario.",
          zh: "梯度向量和单位方向向量。",
        },
        selfCheck: {
          en: "Directional derivative = gradient dot unit direction.",
          es: "Derivada direccional = gradiente por direccion unitaria en producto punto.",
          zh: "方向导数 = 梯度点乘单位方向向量。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "For f(x,y)=x^2y at (1,2), find the directional derivative toward v=<3,4>.",
          es: "Para f(x,y)=x^2y en (1,2), halla la derivada direccional hacia v=<3,4>.",
          zh: "设 f(x,y)=x^2y，在 (1,2) 处求沿 v=<3,4> 方向的方向导数。",
        },
        firstStep: {
          en: "Normalize the direction vector before dotting with the gradient.",
          es: "Normaliza el vector direccion antes de hacer el producto punto con el gradiente.",
          zh: "先把方向向量单位化，再去和梯度做点积。",
        },
        setup: {
          en: "Most directional-derivative mistakes come from skipping the unit-vector step.",
          es: "La mayoria de los errores en derivadas direccionales vienen de saltarse el paso de vector unitario.",
          zh: "方向导数最常见的错误，就是忘了先把方向向量变成单位向量。",
        },
        fullPath: [
          { en: "Compute ∇f=<2xy,x^2>, so at (1,2) it is <4,1>.", es: "Calcula ∇f=<2xy,x^2>, asi que en (1,2) es <4,1>.", zh: "先算 ∇f=<2xy,x^2>，所以在 (1,2) 处是 <4,1>。" },
          { en: "Turn <3,4> into the unit vector <3/5,4/5>.", es: "Convierte <3,4> en el vector unitario <3/5,4/5>.", zh: "把 <3,4> 化成单位向量 <3/5,4/5>。" },
          { en: "Dot them: <4,1>·<3/5,4/5> = 16/5.", es: "Haz el producto punto: <4,1>·<3/5,4/5> = 16/5.", zh: "做点积：<4,1>·<3/5,4/5> = 16/5。" },
        ],
        answer: {
          en: "16/5",
          es: "16/5",
          zh: "16/5",
        },
        selfCheck: {
          en: "Gradient first, unit direction second.",
          es: "Gradiente primero, direccion unitaria despues.",
          zh: "先梯度，后单位方向。",
        },
      },
    ],
  },
  "calc3-iterated-integrals": {
    quiz: [
      {
        prompt: {
          en: "In an iterated integral ∫∫_R f(x,y) dA over a rectangle, what does the inner integral do?",
          es: "En una integral iterada ∫∫_R f(x,y) dA sobre un rectangulo, ¿que hace la integral interior?",
          zh: "对矩形区域上的迭代积分 ∫∫_R f(x,y) dA，内层积分在做什么？",
        },
        firstStep: {
          en: "Treat the outer variable as frozen while the inner variable runs first.",
          es: "Trata la variable exterior como congelada mientras la interior corre primero.",
          zh: "先把外层变量冻结，让内层变量先跑完。",
        },
        setup: {
          en: "Iterated integrals are double integrals unpacked into one variable at a time.",
          es: "Las integrales iteradas son integrales dobles desempacadas, una variable a la vez.",
          zh: "迭代积分就是把二重积分拆成“一次先积一个变量”。",
        },
        fullPath: [
          { en: "The inner integral sweeps along one direction first.", es: "La integral interior barre primero en una direccion.", zh: "内层积分先沿一个方向扫过去。" },
          { en: "During that sweep, the outer variable stays fixed.", es: "Durante ese barrido, la variable exterior queda fija.", zh: "在这一步里，外层变量保持不动。" },
          { en: "The outer integral then adds those accumulated slices.", es: "Luego la integral exterior suma esas tiras acumuladas.", zh: "外层积分再把这些累积好的切片加起来。" },
        ],
        answer: {
          en: "It accumulates along one variable while the other stays fixed.",
          es: "Acumula en una variable mientras la otra queda fija.",
          zh: "它先对一个变量累加，而另一个变量保持固定。",
        },
        selfCheck: {
          en: "Inner runs first, outer waits.",
          es: "La interior va primero y la exterior espera.",
          zh: "内层先跑，外层先等着。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "Evaluate ∫_0^1 ∫_1^3 (x+2y) dy dx. What should you do with the inner integral first?",
          es: "Evalua ∫_0^1 ∫_1^3 (x+2y) dy dx. ¿Que haces primero con la integral interior?",
          zh: "计算 ∫_0^1 ∫_1^3 (x+2y) dy dx。第一步内层积分该怎么做？",
        },
        firstStep: {
          en: "Treat x as a constant while integrating in y.",
          es: "Trata x como constante mientras integras en y.",
          zh: "内层对 y 积分时，把 x 当成常数。",
        },
        setup: {
          en: "The whole point of iterated integrals is that the inner variable moves first while the outer one stays frozen.",
          es: "La idea central de las integrales iteradas es que la variable interior se mueve primero mientras la exterior queda congelada.",
          zh: "迭代积分的核心就是：内层变量先动，外层变量暂时不动。",
        },
        fullPath: [
          { en: "Integrate x+2y with respect to y to get xy+y^2.", es: "Integra x+2y respecto de y para obtener xy+y^2.", zh: "对 y 积分，x+2y 变成 xy+y^2。" },
          { en: "Evaluate from y=1 to y=3, keeping x untouched.", es: "Evalua de y=1 a y=3 dejando x intacta.", zh: "再把 y 从 1 代到 3，x 先不动。" },
          { en: "Then integrate the resulting x-expression from 0 to 1.", es: "Luego integra la expresion resultante en x desde 0 hasta 1.", zh: "最后再把得到的 x 表达式从 0 到 1 积分。" },
        ],
        answer: {
          en: "Treat x as constant in the inner y-integral.",
          es: "Trata x como constante en la integral interior en y.",
          zh: "内层关于 y 的积分里，把 x 当常数。",
        },
        selfCheck: {
          en: "Inner variable moves. Outer variable waits.",
          es: "La variable interior se mueve. La exterior espera.",
          zh: "内层变量先走，外层变量先等。",
        },
      },
    ],
  },
  "calc3-change-of-variables": {
    quiz: [
      {
        prompt: {
          en: "What extra factor must appear when you change variables in a double or triple integral?",
          es: "¿Que factor extra debe aparecer cuando cambias variables en una integral doble o triple?",
          zh: "在二重或三重积分里换变量时，必须额外出现哪个因子？",
        },
        firstStep: {
          en: "Look for the Jacobian.",
          es: "Busca el Jacobiano.",
          zh: "先找 Jacobian 因子。",
        },
        setup: {
          en: "Change of variables is not only swapping symbols. You must also scale area or volume correctly.",
          es: "Cambiar variables no es solo cambiar simbolos. Tambien hay que escalar bien el area o el volumen.",
          zh: "换元不只是把符号改掉，还必须把面积或体积的缩放一起补上。",
        },
        fullPath: [
          { en: "Write the transformation between old and new variables.", es: "Escribe la transformacion entre variables viejas y nuevas.", zh: "先写出新旧变量之间的变换关系。" },
          { en: "Compute the determinant of the Jacobian matrix.", es: "Calcula el determinante de la matriz Jacobiana.", zh: "再计算 Jacobian 矩阵的行列式。" },
          { en: "Use its absolute value as the extra factor.", es: "Usa su valor absoluto como factor extra.", zh: "把它的绝对值作为额外因子乘进去。" },
        ],
        answer: {
          en: "The absolute value of the Jacobian determinant.",
          es: "El valor absoluto del determinante Jacobiano.",
          zh: "Jacobian 行列式的绝对值。",
        },
        selfCheck: {
          en: "Change variables -> do not forget the Jacobian.",
          es: "Cambio de variables -> no olvides el Jacobiano.",
          zh: "一换元，就要想到 Jacobian。",
        },
      },
    ],
  },
  "calc3-vector-fields": {
    quiz: [
      {
        prompt: {
          en: "What is a vector field in plain language?",
          es: "¿Que es un campo vectorial en palabras simples?",
          zh: "用最直白的话讲，什么是向量场？",
        },
        firstStep: {
          en: "Think of every point in space getting its own arrow.",
          es: "Piensa en cada punto del espacio recibiendo su propia flecha.",
          zh: "先想成：空间里每个点都分配到一支箭头。",
        },
        setup: {
          en: "A vector field is not one vector. It is a vector attached to every point in a region.",
          es: "Un campo vectorial no es un solo vector. Es un vector pegado a cada punto de una region.",
          zh: "向量场不是一个向量，而是区域里每个点都带着一个向量。",
        },
        fullPath: [
          { en: "Pick a point (x,y,z).", es: "Elige un punto (x,y,z).", zh: "先看一个点 (x,y,z)。" },
          { en: "The field assigns a vector to that point.", es: "El campo asigna un vector a ese punto.", zh: "向量场会给这个点分配一个向量。" },
          { en: "Doing that at every point creates the whole field picture.", es: "Hacer eso en todos los puntos crea la imagen completa del campo.", zh: "所有点都这样分配起来，就组成了整个向量场。" },
        ],
        answer: {
          en: "A rule that assigns a vector to each point.",
          es: "Una regla que asigna un vector a cada punto.",
          zh: "给每个点分配一个向量的规则。",
        },
        selfCheck: {
          en: "One point, one arrow; all points, a field.",
          es: "Un punto, una flecha; todos los puntos, un campo.",
          zh: "一个点一支箭头，所有点合起来就是向量场。",
        },
      },
    ],
  },
  "calc3-flux": {
    quiz: [
      {
        prompt: {
          en: "What physical picture does flux usually measure?",
          es: "¿Que imagen fisica suele medir el flujo?",
          zh: "通量通常在测什么样的物理图像？",
        },
        firstStep: {
          en: "Think of how much field passes through a surface.",
          es: "Piensa en cuanto campo atraviesa una superficie.",
          zh: "先想有多少场穿过一个曲面。",
        },
        setup: {
          en: "Flux is about flow through a surface, not movement along a curve.",
          es: "El flujo trata del paso a traves de una superficie, no del movimiento a lo largo de una curva.",
          zh: "通量看的是穿过曲面的流动，不是沿着曲线走的累积。",
        },
        fullPath: [
          { en: "Take the vector field and the surface normal.", es: "Toma el campo vectorial y la normal de la superficie.", zh: "先看向量场和曲面的法向量。" },
          { en: "The dot product checks how much the field points through the surface.", es: "El producto punto revisa cuanto del campo apunta a traves de la superficie.", zh: "点积会测出场有多少是朝着穿过曲面的方向。" },
          { en: "Adding that over the whole surface gives flux.", es: "Sumar eso sobre toda la superficie da el flujo.", zh: "再把这些穿过量在整个曲面上累加起来，就是通量。" },
        ],
        answer: {
          en: "How much of the field passes through the surface.",
          es: "Cuanto del campo atraviesa la superficie.",
          zh: "有多少向量场穿过这个曲面。",
        },
        selfCheck: {
          en: "Flux = through the surface, not along the edge.",
          es: "Flujo = a traves de la superficie, no a lo largo del borde.",
          zh: "通量 = 穿过曲面，不是沿着边走。",
        },
      },
    ],
  },
  "calc3-stokes-theorem": {
    quiz: [
      {
        prompt: {
          en: "A surface has a boundary curve and the integrand uses curl F. Which theorem should you try first?",
          es: "Una superficie tiene curva frontera y el integrando usa curl F. ¿Que teorema debes probar primero?",
          zh: "一个曲面带有边界曲线，而且被积对象出现了 curl F。第一步该试哪个定理？",
        },
        firstStep: {
          en: "Match boundary-plus-curl to Stokes.",
          es: "Relaciona frontera mas curl con Stokes.",
          zh: "把“边界曲线 + curl”直接对应到 Stokes 定理。",
        },
        setup: {
          en: "Stokes turns a curl surface integral into a line integral around the boundary curve.",
          es: "Stokes convierte una integral de superficie con curl en una integral de linea sobre la curva frontera.",
          zh: "Stokes 定理会把含 curl 的曲面积分，变成边界曲线上的线积分。",
        },
        fullPath: [
          { en: "You are not on a closed surface; you have a boundary curve.", es: "No estas en una superficie cerrada; tienes una curva frontera.", zh: "这里不是闭曲面，而是带边界的曲面。" },
          { en: "The integrand uses curl F, not divergence.", es: "El integrando usa curl F, no divergencia.", zh: "被积对象是 curl F，不是 divergence。" },
          { en: "So the geometry and operator both point to Stokes' Theorem.", es: "Asi que la geometria y el operador apuntan a Stokes.", zh: "所以从几何和算子两边看，都应该想到 Stokes 定理。" },
        ],
        answer: {
          en: "Stokes' Theorem.",
          es: "El Teorema de Stokes.",
          zh: "Stokes 定理。",
        },
        selfCheck: {
          en: "Boundary curve + curl -> Stokes.",
          es: "Curva frontera + curl -> Stokes.",
          zh: "边界曲线 + curl -> Stokes。",
        },
      },
    ],
  },
  "calc3-vector-valued-functions": {
    quiz: [
      {
        prompt: {
          en: "For r(t)=<t, t^2, 1-t>, what is r(2)?",
          es: "Para r(t)=<t, t^2, 1-t>, ¿cuanto vale r(2)?",
          zh: "设 r(t)=<t, t^2, 1-t>，求 r(2)。",
        },
        firstStep: {
          en: "Plug the parameter into each component separately.",
          es: "Sustituye el parametro en cada componente por separado.",
          zh: "把参数分别代入每个分量。",
        },
        setup: {
          en: "A vector-valued function is just a package of ordinary functions moving together.",
          es: "Una funcion vectorial es solo un paquete de funciones ordinarias moviendose juntas.",
          zh: "向量值函数本质上就是几个普通函数打包在一起一起动。",
        },
        fullPath: [
          { en: "The first component at t=2 is 2.", es: "La primera componente en t=2 es 2.", zh: "第一个分量在 t=2 时是 2。" },
          { en: "The second component is 2^2=4.", es: "La segunda componente es 2^2=4.", zh: "第二个分量是 2^2=4。" },
          { en: "The third component is 1-2=-1, so r(2)=<2,4,-1>.", es: "La tercera componente es 1-2=-1, asi que r(2)=<2,4,-1>.", zh: "第三个分量是 1-2=-1，所以 r(2)=<2,4,-1>。" },
        ],
        answer: {
          en: "<2,4,-1>",
          es: "<2,4,-1>",
          zh: "<2,4,-1>",
        },
        selfCheck: {
          en: "Vector-valued function evaluation is slot-by-slot.",
          es: "Evaluar una funcion vectorial se hace casilla por casilla.",
          zh: "向量值函数代值，就是一格一格来。",
        },
      },
    ],
  },
  "calc3-curvature": {
    quiz: [
      {
        prompt: {
          en: "In plain language, what does curvature measure?",
          es: "En palabras simples, ¿que mide la curvatura?",
          zh: "用最直白的话说，曲率在测什么？",
        },
        firstStep: {
          en: "Think about how sharply the path turns.",
          es: "Piensa en que tan bruscamente gira la trayectoria.",
          zh: "先想这条路径转弯有多急。",
        },
        setup: {
          en: "Curvature is a turning question, not a speed question.",
          es: "La curvatura es una pregunta de giro, no de rapidez.",
          zh: "曲率看的是转弯，不是速度大小。",
        },
        fullPath: [
          { en: "A straight line barely turns.", es: "Una recta casi no gira.", zh: "直线几乎不转弯。" },
          { en: "A tight bend turns quickly.", es: "Una curva cerrada gira rapidamente.", zh: "弯得很紧的曲线会很快转向。" },
          { en: "So curvature measures how sharply the curve bends.", es: "Asi que la curvatura mide que tan bruscamente se dobla la curva.", zh: "所以曲率就是在衡量曲线弯得有多厉害。" },
        ],
        answer: {
          en: "How sharply a curve turns.",
          es: "Que tan bruscamente gira una curva.",
          zh: "曲线转弯有多急。",
        },
        selfCheck: {
          en: "Curvature = turning, not just moving.",
          es: "Curvatura = girar, no solo moverse.",
          zh: "曲率看转弯，不只是看在动。",
        },
      },
    ],
  },
  "calc3-polar-double-integrals": {
    quiz: [
      {
        prompt: {
          en: "What extra factor appears when you switch a double integral from x,y to polar coordinates?",
          es: "¿Que factor extra aparece al cambiar una integral doble de x,y a coordenadas polares?",
          zh: "把二重积分从 x,y 换到极坐标时，会多出哪个因子？",
        },
        firstStep: {
          en: "Look for the Jacobian factor r.",
          es: "Busca el factor Jacobiano r.",
          zh: "先想到 Jacobian 因子 r。",
        },
        setup: {
          en: "Polar double integrals are not just x=r cosθ and y=r sinθ. The area element changes too.",
          es: "Las integrales dobles polares no son solo x=r cosθ y y=r sinθ. El elemento de area tambien cambia.",
          zh: "极坐标二重积分不只是把 x,y 改成 r cosθ、r sinθ，面积元也一起变了。",
        },
        fullPath: [
          { en: "Rewrite x and y using r and θ.", es: "Reescribe x e y usando r y θ.", zh: "先用 r 和 θ 改写 x、y。" },
          { en: "The area element dA becomes r dr dθ.", es: "El elemento de area dA se vuelve r dr dθ.", zh: "面积元 dA 会变成 r dr dθ。" },
          { en: "So every polar double integral needs that extra r factor.", es: "Asi que toda integral doble polar necesita ese factor extra r.", zh: "所以每个极坐标二重积分都要多乘一个 r。" },
        ],
        answer: {
          en: "An extra factor of r.",
          es: "Un factor extra r.",
          zh: "额外的 r 因子。",
        },
        selfCheck: {
          en: "Polar double integral -> do not forget the r.",
          es: "Integral doble polar -> no olvides la r.",
          zh: "极坐标二重积分，一定别忘了 r。",
        },
      },
    ],
  },
  "calc3-triple-integrals": {
    quiz: [
      {
        prompt: {
          en: "What does a triple integral usually accumulate?",
          es: "¿Que acumula normalmente una integral triple?",
          zh: "三重积分通常在累加什么？",
        },
        firstStep: {
          en: "Think of tiny volume boxes instead of tiny area tiles.",
          es: "Piensa en pequenas cajas de volumen en vez de pequenos mosaicos de area.",
          zh: "先想很多小体积盒子，而不是小面积块。",
        },
        setup: {
          en: "A triple integral is the 3D version of accumulation over a region.",
          es: "Una integral triple es la version 3D de acumular sobre una region.",
          zh: "三重积分就是在三维区域上做累加的版本。",
        },
        fullPath: [
          { en: "The region is chopped into tiny boxes.", es: "La region se corta en cajitas diminutas.", zh: "先把区域切成很多很小的盒子。" },
          { en: "Each box contributes f(x,y,z) times a tiny volume.", es: "Cada caja aporta f(x,y,z) por un volumen pequeno.", zh: "每个小盒子贡献的是 f(x,y,z) 乘一个很小的体积。" },
          { en: "The triple integral adds all those volume contributions.", es: "La integral triple suma todas esas contribuciones de volumen.", zh: "三重积分就是把这些体积贡献全部加起来。" },
        ],
        answer: {
          en: "Tiny volume-weighted contributions f(x,y,z) dV.",
          es: "Pequenas contribuciones ponderadas por volumen, f(x,y,z) dV.",
          zh: "很多形如 f(x,y,z) dV 的小体积贡献。",
        },
        selfCheck: {
          en: "Double integral = tiles. Triple integral = boxes.",
          es: "Integral doble = mosaicos. Integral triple = cajas.",
          zh: "二重积分像小方块，三重积分像小盒子。",
        },
      },
    ],
  },
  "calc3-cylindrical-coordinates": {
    quiz: [
      {
        prompt: {
          en: "When should you try cylindrical coordinates first?",
          es: "¿Cuando deberias probar primero coordenadas cilindricas?",
          zh: "什么时候应该第一时间想到柱坐标？",
        },
        firstStep: {
          en: "Look for circular symmetry around the z-axis.",
          es: "Busca simetria circular alrededor del eje z.",
          zh: "先看是不是绕 z 轴有圆形对称。",
        },
        setup: {
          en: "Cylindrical coordinates are polar coordinates plus height z.",
          es: "Las coordenadas cilindricas son coordenadas polares mas la altura z.",
          zh: "柱坐标本质上就是“极坐标 + 高度 z”。",
        },
        fullPath: [
          { en: "If x^2+y^2 shows up a lot, think radial symmetry.", es: "Si aparece mucho x^2+y^2, piensa en simetria radial.", zh: "如果经常出现 x^2+y^2，就先想径向对称。" },
          { en: "Keep z as z, and change only the x-y part to polar form.", es: "Deja z como z y cambia solo la parte x-y a forma polar.", zh: "保留 z 不动，只把 x-y 平面部分改成极坐标。" },
          { en: "That is exactly cylindrical coordinates.", es: "Eso es exactamente coordenadas cilindricas.", zh: "这正是柱坐标。" },
        ],
        answer: {
          en: "When the region or integrand has circular symmetry in x and y.",
          es: "Cuando la region o el integrando tienen simetria circular en x y y.",
          zh: "当区域或被积函数在 x-y 平面里有圆对称时。",
        },
        selfCheck: {
          en: "Polar in x-y, keep z alone.",
          es: "Polar en x-y y deja z sola.",
          zh: "x-y 用极坐标，z 保持不变。",
        },
      },
    ],
  },
  "calc3-spherical-coordinates": {
    quiz: [
      {
        prompt: {
          en: "What kind of geometry usually signals spherical coordinates?",
          es: "¿Que tipo de geometria suele indicar coordenadas esfericas?",
          zh: "什么样的几何形状通常会提示你用球坐标？",
        },
        firstStep: {
          en: "Look for spheres or expressions built from x^2+y^2+z^2.",
          es: "Busca esferas o expresiones hechas de x^2+y^2+z^2.",
          zh: "先看有没有球体，或经常出现 x^2+y^2+z^2。",
        },
        setup: {
          en: "Spherical coordinates are best when the geometry is centered and radial in all three dimensions.",
          es: "Las coordenadas esfericas sirven mejor cuando la geometria es centrada y radial en las tres dimensiones.",
          zh: "球坐标最适合的是三维里处处径向、以原点为中心的几何形状。",
        },
        fullPath: [
          { en: "A sphere depends on distance from the origin.", es: "Una esfera depende de la distancia al origen.", zh: "球体的本质是“离原点多远”。" },
          { en: "That distance is built from x^2+y^2+z^2.", es: "Esa distancia se construye con x^2+y^2+z^2.", zh: "这个距离正是由 x^2+y^2+z^2 组成的。" },
          { en: "So spherical coordinates are the natural fit.", es: "Asi que las coordenadas esfericas son el ajuste natural.", zh: "所以球坐标就是最自然的选择。" },
        ],
        answer: {
          en: "Spheres and full 3D radial symmetry.",
          es: "Esferas y simetria radial completa en 3D.",
          zh: "球体以及三维的整体径向对称。",
        },
        selfCheck: {
          en: "If it looks spherical, try spherical.",
          es: "Si parece esferico, prueba esfericas.",
          zh: "像球，就先想球坐标。",
        },
      },
    ],
  },
  "calc3-double-integral-applications": {
    quiz: [
      {
        prompt: {
          en: "What extra ingredient turns a plain double integral into a mass problem?",
          es: "¿Que ingrediente extra convierte una integral doble simple en un problema de masa?",
          zh: "把普通二重积分变成质量问题，需要额外加上什么？",
        },
        firstStep: {
          en: "Look for density.",
          es: "Busca la densidad.",
          zh: "先找密度函数。",
        },
        setup: {
          en: "Application problems usually keep the same region but change what the integrand means.",
          es: "Los problemas de aplicacion suelen mantener la misma region y cambiar lo que significa el integrando.",
          zh: "应用题通常不是换区域，而是换被积函数代表的意义。",
        },
        fullPath: [
          { en: "Area uses integrand 1.", es: "El area usa integrando 1.", zh: "求面积时，被积函数可以看成 1。" },
          { en: "Mass uses density ρ(x,y).", es: "La masa usa densidad ρ(x,y).", zh: "求质量时，被积函数变成密度 ρ(x,y)。" },
          { en: "So mass is built by integrating density over the region.", es: "Asi que la masa se construye integrando la densidad sobre la region.", zh: "所以质量就是把密度在整个区域上积分起来。" },
        ],
        answer: {
          en: "A density function.",
          es: "Una funcion de densidad.",
          zh: "密度函数。",
        },
        selfCheck: {
          en: "Same region, new meaning in the integrand.",
          es: "Misma region, nuevo significado en el integrando.",
          zh: "区域不变，被积函数的意义变了。",
        },
      },
    ],
  },
  "calc3-surface-area-double-integrals": {
    quiz: [
      {
        prompt: {
          en: "For z=f(x,y), what square-root factor appears in the surface-area formula?",
          es: "Para z=f(x,y), ¿que factor con raiz aparece en la formula de area superficial?",
          zh: "对曲面 z=f(x,y)，曲面积分公式里会出现哪个根号因子？",
        },
        firstStep: {
          en: "Start from the partial derivatives f_x and f_y.",
          es: "Empieza con las derivadas parciales f_x y f_y.",
          zh: "先从偏导数 f_x 和 f_y 开始。",
        },
        setup: {
          en: "Surface area of a graph is area in the xy-plane times a tilt factor.",
          es: "El area superficial de una grafica es el area en el plano xy multiplicada por un factor de inclinacion.",
          zh: "图形曲面的面积，本质上是 xy 平面面积再乘上一个倾斜修正因子。",
        },
        fullPath: [
          { en: "Compute f_x and f_y.", es: "Calcula f_x y f_y.", zh: "先算 f_x 和 f_y。" },
          { en: "Build the tilt factor sqrt(1+f_x^2+f_y^2).", es: "Construye el factor de inclinacion sqrt(1+f_x^2+f_y^2).", zh: "构造倾斜因子 sqrt(1+f_x^2+f_y^2)。" },
          { en: "Multiply that factor into dA before integrating.", es: "Multiplica ese factor por dA antes de integrar.", zh: "积分前要把这个因子乘进 dA。" },
        ],
        answer: {
          en: "sqrt(1+f_x^2+f_y^2)",
          es: "sqrt(1+f_x^2+f_y^2)",
          zh: "sqrt(1+f_x^2+f_y^2)",
        },
        selfCheck: {
          en: "Surface area of z=f(x,y) always starts with 1+f_x^2+f_y^2 under the root.",
          es: "El area superficial de z=f(x,y) siempre empieza con 1+f_x^2+f_y^2 bajo la raiz.",
          zh: "z=f(x,y) 的曲面积分，一定从根号下 1+f_x^2+f_y^2 开始。",
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
  "calc3-cross-product": {
    quiz: [
      {
        prompt: {
          en: "What does the cross product u x v give you immediately?",
          es: "¿Que te da inmediatamente el producto cruz u x v?",
          zh: "向量叉积 u x v 最直接给出什么？",
        },
        firstStep: {
          en: "Think perpendicular direction first, not just determinant mechanics.",
          es: "Primero piensa en una direccion perpendicular, no solo en el determinante.",
          zh: "先想“垂直方向”，不要只想行列式计算。",
        },
        setup: {
          en: "Cross product is the standard move when a problem asks for a normal vector in 3D.",
          es: "El producto cruz es la jugada estandar cuando el problema pide un vector normal en 3D.",
          zh: "只要题目要三维里的法向量，叉积通常就是标准动作。",
        },
        fullPath: [
          { en: "Check that you are in R^3 and need something perpendicular to both vectors.", es: "Primero confirma que estas en R^3 y necesitas algo perpendicular a ambos vectores.", zh: "先确认你在 R^3，而且需要一个同时垂直于两个向量的东西。" },
          { en: "Compute u x v with the determinant pattern.", es: "再用行列式模板算出 u x v.", zh: "再按行列式模板算出 u x v。" },
          { en: "Use that result as the normal direction.", es: "把结果当作法向方向来用.", zh: "把结果当作法向方向使用。" },
        ],
        answer: {
          en: "A vector perpendicular to both u and v.",
          es: "Un vector perpendicular a u y v.",
          zh: "一个同时垂直于 u 和 v 的向量。",
        },
        selfCheck: {
          en: "Cross product = normal vector generator.",
          es: "Producto cruz = generador de vectores normales.",
          zh: "叉积 = 法向量生成器。",
        },
      },
    ],
  },
  "calc3-lines": {
    quiz: [
      {
        prompt: {
          en: "A line passes through P0 and points in direction v. What form should you write first?",
          es: "Una recta pasa por P0 y apunta en la direccion v. ¿Que forma escribes primero?",
          zh: "一条直线经过点 P0，方向是 v。第一步应写什么形式？",
        },
        firstStep: {
          en: "Start with point plus parameter times direction.",
          es: "Empieza con punto mas parametro por direccion.",
          zh: "先写“点 + 参数乘方向向量”。",
        },
        setup: {
          en: "Lines in space are easiest when you treat them as one anchor point plus one direction vector.",
          es: "Las rectas en el espacio son mas faciles si las tratas como un punto base mas un vector direccion.",
          zh: "空间直线最自然的写法，就是一个基点加一个方向向量。",
        },
        fullPath: [
          { en: "Take the given point P0 as the anchor.", es: "Toma el punto dado P0 como base.", zh: "把给定点 P0 当成起点。" },
          { en: "Use v as the direction vector.", es: "Usa v como vector direccion.", zh: "把 v 当作方向向量。" },
          { en: "Write r(t)=P0+t v.", es: "Escribe r(t)=P0+t v.", zh: "写成 r(t)=P0+t v。" },
        ],
        answer: {
          en: "r(t)=P0+t v",
          es: "r(t)=P0+t v",
          zh: "r(t)=P0+t v",
        },
        selfCheck: {
          en: "Line = anchor point plus direction times parameter.",
          es: "Recta = punto base mas direccion por parametro.",
          zh: "直线 = 基点 + 参数 × 方向。",
        },
      },
    ],
  },
  "calc3-cylinders": {
    quiz: [
      {
        prompt: {
          en: "If an equation in x, y, z is missing one variable entirely, what surface should you suspect first?",
          es: "Si una ecuacion en x, y, z omite por completo una variable, ¿que superficie debes sospechar primero?",
          zh: "如果一个 x, y, z 的方程完全少掉一个变量，第一反应该是什么曲面？",
        },
        firstStep: {
          en: "Spot the missing variable and extend the 2D curve along that axis.",
          es: "Detecta la variable ausente y extiende la curva 2D a lo largo de ese eje.",
          zh: "先找缺失的变量，再把对应二维曲线沿那个轴拉伸出去。",
        },
        setup: {
          en: "Missing-variable surfaces are classic cylinder-recognition questions.",
          es: "Las superficies con una variable ausente son preguntas clasicas de reconocimiento de cilindros.",
          zh: "少一个变量的曲面，基本就是柱面识别题。",
        },
        fullPath: [
          { en: "Ignore the missing variable for a moment.", es: "Ignora por un momento la variable ausente.", zh: "先暂时忽略那个没出现的变量。" },
          { en: "Read the remaining equation as a 2D curve.", es: "Lee la ecuacion restante como una curva en 2D.", zh: "把剩下的方程先看成二维平面曲线。" },
          { en: "Extrude that curve along the missing-variable axis to get a cylinder.", es: "Extiende esa curva a lo largo del eje de la variable ausente para obtener un cilindro.", zh: "再沿缺失变量对应的轴方向拉伸，就得到柱面。" },
        ],
        answer: {
          en: "A cylinder built by extending a 2D curve along the missing axis.",
          es: "Un cilindro formado al extender una curva 2D por el eje ausente.",
          zh: "把二维曲线沿缺失变量方向拉伸出来的柱面。",
        },
        selfCheck: {
          en: "Missing variable = think cylinder.",
          es: "Variable ausente = piensa en cilindro.",
          zh: "少一个变量 = 先想柱面。",
        },
      },
    ],
  },
  "calc3-ellipsoid": {
    quiz: [
      {
        prompt: {
          en: "What surface does x^2/a^2 + y^2/b^2 + z^2/c^2 = 1 represent?",
          es: "¿Que superficie representa x^2/a^2 + y^2/b^2 + z^2/c^2 = 1?",
          zh: "方程 x^2/a^2 + y^2/b^2 + z^2/c^2 = 1 表示什么曲面？",
        },
        firstStep: {
          en: "See all three squared variables added with positive signs and equal to 1.",
          es: "Fijate en las tres variables al cuadrado, todas con signo positivo, igualadas a 1.",
          zh: "先看到三个平方项全是正号，而且和等于 1。",
        },
        setup: {
          en: "An ellipsoid is just the 3D stretched-sphere pattern.",
          es: "Un elipsoide es simplemente el patron de una esfera estirada en 3D.",
          zh: "椭球面就是三维里被拉伸过的球面形状。",
        },
        fullPath: [
          { en: "Check that x^2, y^2, z^2 all appear and all have positive coefficients.", es: "Comprueba que x^2, y^2, z^2 aparecen con coeficientes positivos.", zh: "先确认 x^2、y^2、z^2 都出现，而且系数都是正的。" },
          { en: "Check the equation is normalized to 1.", es: "Comprueba que la ecuacion esta igualada a 1.", zh: "再确认方程右边是 1。" },
          { en: "That is the standard ellipsoid form.", es: "Esa es la forma estandar del elipsoide.", zh: "这就是椭球面的标准形式。" },
        ],
        answer: {
          en: "An ellipsoid.",
          es: "Un elipsoide.",
          zh: "椭球面。",
        },
        selfCheck: {
          en: "All plus signs, all squares, equals 1 -> ellipsoid.",
          es: "Todos positivos, todos cuadrados, igual a 1 -> elipsoide.",
          zh: "全是平方、全是正号、和等于 1 -> 椭球面。",
        },
      },
    ],
  },
  "calc3-paraboloids": {
    quiz: [
      {
        prompt: {
          en: "Which visual clue usually separates a paraboloid from an ellipsoid?",
          es: "¿Que pista visual suele separar un paraboloide de un elipsoide?",
          zh: "抛物面和椭球面最常见的区分线索是什么？",
        },
        firstStep: {
          en: "Look for one variable not squared, acting like the output direction.",
          es: "Busca una variable sin cuadrado, actuando como direccion de salida.",
          zh: "看有没有一个变量没有平方，像是在当输出方向。",
        },
        setup: {
          en: "Paraboloids usually look like one variable equals a sum or difference of squares.",
          es: "Los paraboloides suelen verse como una variable igual a una suma o diferencia de cuadrados.",
          zh: "抛物面常见形状是“一个变量 = 若干平方项的和或差”。",
        },
        fullPath: [
          { en: "Check whether one variable is linear while the others are squared.", es: "Comprueba si una variable es lineal y las otras aparecen al cuadrado.", zh: "先看是不是一个变量一次、另外几个变量是平方。" },
          { en: "If the squares add, think elliptic paraboloid; if they subtract, think hyperbolic paraboloid.", es: "Si los cuadrados se suman, piensa en paraboloide eliptico; si se restan, piensa en paraboloide hiperbolico.", zh: "平方项相加，多半是椭圆抛物面；平方项相减，多半是双曲抛物面。" },
          { en: "Use the linear variable to see which axis the surface opens along.", es: "Usa la variable lineal para ver a lo largo de que eje se abre la superficie.", zh: "再用那个一次变量判断曲面朝哪个轴张开。" },
        ],
        answer: {
          en: "One unsquared variable equals a sum or difference of squares.",
          es: "Una variable sin cuadrado igual a una suma o diferencia de cuadrados.",
          zh: "一个没平方的变量等于若干平方项的和或差。",
        },
        selfCheck: {
          en: "Unsquared variable + squared variables = paraboloid territory.",
          es: "Variable sin cuadrado + variables al cuadrado = territorio de paraboloides.",
          zh: "一个一次变量配上几个平方项 = 抛物面地盘。",
        },
      },
    ],
  },
  "calc3-hyperboloids-and-cones": {
    quiz: [
      {
        prompt: {
          en: "What sign pattern tells you a quadric might be a hyperboloid or cone instead of an ellipsoid?",
          es: "¿Que patron de signos te dice que una cuadrica puede ser un hiperboloide o un cono en vez de un elipsoide?",
          zh: "什么符号模式会提醒你这可能是双曲面或圆锥，而不是椭球面？",
        },
        firstStep: {
          en: "Look for mixed plus and minus signs among the squared terms.",
          es: "Busca signos positivos y negativos mezclados entre los terminos cuadrados.",
          zh: "先看平方项之间是不是正负号混在一起。",
        },
        setup: {
          en: "Once the squared terms split into positive and negative groups, the surface stops being a closed ball-like shape.",
          es: "Cuando los terminos cuadrados se separan en grupos positivos y negativos, la superficie deja de ser una forma cerrada tipo bola.",
          zh: "只要平方项开始分成正负两组，曲面通常就不再是封闭的球状物了。",
        },
        fullPath: [
          { en: "Check the signs on x^2, y^2, z^2.", es: "Mira los signos de x^2, y^2, z^2.", zh: "先检查 x^2、y^2、z^2 前面的正负号。" },
          { en: "Mixed signs suggest hyperboloid-style geometry.", es: "Los signos mezclados sugieren geometria de hiperboloide.", zh: "正负号混合，通常就进入双曲面类的几何。" },
          { en: "If the equation equals 0 with that pattern, think cone; if it equals 1, think hyperboloid.", es: "Si la ecuacion vale 0 con ese patron, piensa en cono; si vale 1, piensa en hiperboloide.", zh: "如果这种符号模式右边等于 0，先想圆锥；若右边等于 1，先想双曲面。" },
        ],
        answer: {
          en: "Mixed signs on the squared terms; equals 0 suggests cone, equals 1 suggests hyperboloid.",
          es: "Signos mezclados en los cuadrados; igual a 0 sugiere cono, igual a 1 sugiere hiperboloide.",
          zh: "平方项正负混合；右边等于 0 常是圆锥，等于 1 常是双曲面。",
        },
        selfCheck: {
          en: "Mixed signs break the ellipsoid pattern.",
          es: "Los signos mezclados rompen el patron del elipsoide.",
          zh: "正负混合，就不是椭球那套了。",
        },
      },
    ],
  },
  "calc3-multivariable-chain-rule": {
    quiz: [
      {
        prompt: {
          en: "If z = f(x,y), x = x(t), and y = y(t), what is the first idea you should write for dz/dt?",
          es: "Si z = f(x,y), x = x(t), y = y(t), ¿cual es la primera idea que debes escribir para dz/dt?",
          zh: "如果 z = f(x,y)，而 x = x(t), y = y(t)，那么写 dz/dt 时第一想法是什么？",
        },
        firstStep: {
          en: "Add the x-path contribution and the y-path contribution.",
          es: "Suma la contribucion por la ruta de x y la contribucion por la ruta de y.",
          zh: "把 x 路径贡献和 y 路径贡献加起来。",
        },
        setup: {
          en: "Multivariable chain rule means every changing input gets its own partial-derivative term.",
          es: "La regla de la cadena multivariable significa que cada entrada cambiante aporta su propio termino con derivada parcial.",
          zh: "多元链式法则的意思是：每个在变的输入，都要贡献自己那一项。",
        },
        fullPath: [
          { en: "Take f_x times dx/dt.", es: "Toma f_x por dx/dt.", zh: "先写 f_x 乘 dx/dt。" },
          { en: "Take f_y times dy/dt.", es: "Toma f_y por dy/dt.", zh: "再写 f_y 乘 dy/dt。" },
          { en: "Add them: dz/dt = f_x dx/dt + f_y dy/dt.", es: "Sumalos: dz/dt = f_x dx/dt + f_y dy/dt.", zh: "把它们相加：dz/dt = f_x dx/dt + f_y dy/dt。" },
        ],
        answer: {
          en: "dz/dt = f_x dx/dt + f_y dy/dt",
          es: "dz/dt = f_x dx/dt + f_y dy/dt",
          zh: "dz/dt = f_x dx/dt + f_y dy/dt",
        },
        selfCheck: {
          en: "One changing input, one term.",
          es: "Una entrada que cambia, un termino.",
          zh: "一个变化输入，对应一项。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "If z=x^2+y^2, x=t^2, and y=3t, what is dz/dt?",
          es: "Si z=x^2+y^2, x=t^2 y y=3t, ¿cual es dz/dt?",
          zh: "若 z=x^2+y^2，x=t^2，y=3t，求 dz/dt。",
        },
        firstStep: {
          en: "Write one term for the x-path and one term for the y-path.",
          es: "Escribe un termino para la ruta de x y otro para la ruta de y.",
          zh: "先为 x 路径写一项，再为 y 路径写一项。",
        },
        setup: {
          en: "Midterm chain-rule questions often become easy once you force yourself to account for every dependency path.",
          es: "Las preguntas de parcial sobre regla de la cadena se vuelven faciles cuando obligas a contar cada ruta de dependencia.",
          zh: "考试里的多元链式法则，一旦老老实实把每条依赖路径都写出来，就会简单很多。",
        },
        fullPath: [
          { en: "Compute f_x=2x and f_y=2y.", es: "Calcula f_x=2x y f_y=2y.", zh: "先算 f_x=2x，f_y=2y。" },
          { en: "Compute dx/dt=2t and dy/dt=3.", es: "Calcula dx/dt=2t y dy/dt=3.", zh: "再算 dx/dt=2t，dy/dt=3。" },
          { en: "Use dz/dt = f_x dx/dt + f_y dy/dt = 2x(2t)+2y(3), then replace x=t^2 and y=3t to get 4t^3+18t.", es: "Usa dz/dt = f_x dx/dt + f_y dy/dt = 2x(2t)+2y(3), luego sustituye x=t^2 e y=3t para obtener 4t^3+18t.", zh: "代入 dz/dt = f_x dx/dt + f_y dy/dt = 2x(2t)+2y(3)，再用 x=t^2、y=3t 得到 4t^3+18t。" },
        ],
        answer: {
          en: "4t^3 + 18t",
          es: "4t^3 + 18t",
          zh: "4t^3 + 18t",
        },
        selfCheck: {
          en: "Every changing input contributes a term.",
          es: "Cada entrada que cambia aporta un termino.",
          zh: "每个在变的输入都要出一项。",
        },
      },
    ],
  },
  "calc3-two-variable-extrema": {
    quiz: [
      {
        prompt: {
          en: "What point should you hunt first when looking for local extrema of f(x,y)?",
          es: "¿Que puntos debes buscar primero al buscar extremos locales de f(x,y)?",
          zh: "找 f(x,y) 的局部极值时，第一步要找什么点？",
        },
        firstStep: {
          en: "Find the critical points where both first partials vanish or fail to exist.",
          es: "Busca los puntos criticos donde ambas derivadas parciales valen cero o no existen.",
          zh: "先找临界点：两个一阶偏导都为零，或至少有一个不存在。",
        },
        setup: {
          en: "Second-derivative tests come after you locate the candidate points.",
          es: "Las pruebas de segunda derivada vienen despues de localizar los puntos candidatos.",
          zh: "二阶导数判别法要等你先找到候选点以后才上场。",
        },
        fullPath: [
          { en: "Compute f_x and f_y.", es: "Calcula f_x y f_y.", zh: "先算 f_x 和 f_y。" },
          { en: "Solve f_x = 0 and f_y = 0 together, while also checking where partials fail.", es: "Resuelve f_x = 0 y f_y = 0 al mismo tiempo, y tambien revisa donde las parciales no existen.", zh: "联立 f_x = 0 与 f_y = 0，并额外检查偏导不存在的点。" },
          { en: "Those points are the candidates for the second-derivative test.", es: "Esos puntos son los candidatos para la prueba de segunda derivada.", zh: "这些点就是后面做二阶导数判别的候选点。" },
        ],
        answer: {
          en: "Critical points.",
          es: "Puntos criticos.",
          zh: "临界点。",
        },
        selfCheck: {
          en: "No critical points, no local-extrema test.",
          es: "Sin puntos criticos, no hay prueba de extremos locales.",
          zh: "不先找临界点，就没法谈局部极值。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "For f(x,y)=x^2+y^2-4x-6y, what is the first system to solve when looking for local extrema?",
          es: "Para f(x,y)=x^2+y^2-4x-6y, ¿cual es el primer sistema que resuelves al buscar extremos locales?",
          zh: "设 f(x,y)=x^2+y^2-4x-6y，找局部极值时第一步要解什么方程组？",
        },
        firstStep: {
          en: "Set both first partial derivatives equal to zero.",
          es: "Iguala a cero las dos derivadas parciales primeras.",
          zh: "先把两个一阶偏导都设为 0。",
        },
        setup: {
          en: "Two-variable extrema problems start by locating critical points before any second-derivative classification.",
          es: "Los extremos en dos variables empiezan localizando puntos criticos antes de cualquier clasificacion de segunda derivada.",
          zh: "二元极值题永远先找临界点，之后才谈二阶导数判别。",
        },
        fullPath: [
          { en: "Compute f_x = 2x-4 and f_y = 2y-6.", es: "Calcula f_x = 2x-4 y f_y = 2y-6.", zh: "先算 f_x = 2x-4，f_y = 2y-6。" },
          { en: "Set 2x-4=0 and 2y-6=0.", es: "Plantea 2x-4=0 y 2y-6=0.", zh: "联立 2x-4=0 和 2y-6=0。" },
          { en: "So the critical point is (2,3).", es: "Asi que el punto critico es (2,3).", zh: "所以临界点是 (2,3)。" },
        ],
        answer: {
          en: "Solve f_x=0 and f_y=0.",
          es: "Resolver f_x=0 y f_y=0.",
          zh: "先解 f_x=0 和 f_y=0。",
        },
        selfCheck: {
          en: "Critical point first, classification second.",
          es: "Punto critico primero, clasificacion despues.",
          zh: "先找临界点，再做分类。",
        },
      },
    ],
  },
  "calc3-changing-order": {
    midterm: [
      {
        prompt: {
          en: "When should you change the order of integration in a double integral?",
          es: "¿Cuando conviene cambiar el orden de integracion en una integral doble?",
          zh: "二重积分什么时候应该换积分次序？",
        },
        firstStep: {
          en: "Redraw the region and see whether the current order creates ugly bounds.",
          es: "Vuelve a dibujar la region y mira si el orden actual produce limites feos.",
          zh: "先重画积分区域，看看当前次序是不是把上下限搞得很难看。",
        },
        setup: {
          en: "Changing order is a region-reading move, not a symbol-pushing move.",
          es: "Cambiar el orden es una jugada de leer regiones, no de empujar simbolos.",
          zh: "换次序本质上是“读区域”，不是盲目搬符号。",
        },
        fullPath: [
          { en: "Sketch or mentally rebuild the region from the current bounds.", es: "Haz un dibujo o reconstruye mentalmente la region a partir de los limites actuales.", zh: "先根据原来的积分限画出区域。" },
          { en: "Describe the same region with the opposite slicing direction.", es: "Describe la misma region con el corte en la direccion opuesta.", zh: "再用相反方向的切片方式重新描述这个区域。" },
          { en: "Use the new order if it makes the bounds or the integrand easier.", es: "Usa el nuevo orden si hace mas facil los limites o el integrando.", zh: "如果新次序让积分限或被积函数明显更简单，就改用它。" },
        ],
        answer: {
          en: "Change order when the opposite slicing makes the region or integral easier.",
          es: "Cambia el orden cuando el corte opuesto vuelve mas facil la region o la integral.",
          zh: "当反方向切片能让区域描述或积分本身更简单时，就该换次序。",
        },
        selfCheck: {
          en: "Change order = redraw region, then reslice.",
          es: "Cambiar orden = redibujar region y volver a cortar.",
          zh: "换次序 = 先重画区域，再重新切片。",
        },
      },
    ],
  },
  "calc3-ftc-line-integrals": {
    quiz: [
      {
        prompt: {
          en: "If F is conservative and F = grad f, what replaces the whole line integral from A to B?",
          es: "Si F es conservativo y F = grad f, ¿que reemplaza toda la integral de linea de A a B?",
          zh: "如果 F 是保守场且 F = grad f，那么从 A 到 B 的整条线积分可直接换成什么？",
        },
        firstStep: {
          en: "Jump from the path to the potential values at the endpoints.",
          es: "Salta del camino a los valores del potencial en los extremos.",
          zh: "直接从路径跳到势函数在两个端点的取值。",
        },
        setup: {
          en: "The fundamental theorem for line integrals kills the path once a potential function exists.",
          es: "El teorema fundamental de las integrales de linea elimina el camino una vez existe una funcion potencial.",
          zh: "一旦存在势函数，线积分基本定理就让你不用再管路径细节。",
        },
        fullPath: [
          { en: "Identify the potential function f.", es: "Identifica la funcion potencial f.", zh: "先认出势函数 f。" },
          { en: "Evaluate f at the endpoint B.", es: "算出终点 B 的 f 值.", zh: "算终点 B 处的 f 值。" },
          { en: "Subtract the value at the start A: f(B)-f(A).", es: "Resta el valor del inicio A: f(B)-f(A).", zh: "再减去起点 A 的值：f(B)-f(A)。" },
        ],
        answer: {
          en: "f(B)-f(A)",
          es: "f(B)-f(A)",
          zh: "f(B)-f(A)",
        },
        selfCheck: {
          en: "Conservative field + potential = endpoint subtraction.",
          es: "Campo conservativo + potencial = resta de extremos.",
          zh: "保守场 + 势函数 = 端点相减。",
        },
      },
    ],
  },
  "calc3-divergence-and-curl": {
    quiz: [
      {
        prompt: {
          en: "What is the quick meaning difference between divergence and curl?",
          es: "¿Cual es la diferencia rapida de significado entre divergencia y rotacional?",
          zh: "散度和旋度最简短的意义区别是什么？",
        },
        firstStep: {
          en: "Think outflow for divergence and spin for curl.",
          es: "Piensa en salida neta para divergencia y giro para rotacional.",
          zh: "散度先想净流出，旋度先想打转。",
        },
        setup: {
          en: "These are field-behavior detectors: one for source/sink behavior and one for local rotation.",
          es: "Son detectores del comportamiento del campo: uno para fuente/sumidero y otro para rotacion local.",
          zh: "它们都是向量场行为探测器：一个看源汇，一个看局部旋转。",
        },
        fullPath: [
          { en: "Use divergence to measure net outflow from a tiny box.", es: "Usa divergencia para medir el flujo neto que sale de una cajita.", zh: "散度衡量一个小盒子里的净流出。" },
          { en: "Use curl to measure local spinning tendency.", es: "Usa rotacional para medir la tendencia local a girar.", zh: "旋度衡量局部打转的趋势。" },
          { en: "Keep those physical pictures before computing formulas.", es: "Mantén esas imagenes fisicas antes de calcular formulas.", zh: "先抓住这两个物理图像，再去算公式。" },
        ],
        answer: {
          en: "Divergence measures outflow; curl measures local rotation.",
          es: "La divergencia mide salida neta; el rotacional mide rotacion local.",
          zh: "散度看净流出；旋度看局部旋转。",
        },
        selfCheck: {
          en: "Divergence = source/sink. Curl = spin.",
          es: "Divergencia = fuente/sumidero. Rotacional = giro.",
          zh: "散度 = 源汇；旋度 = 打转。",
        },
      },
    ],
  },
  "calc3-parametric-surfaces": {
    quiz: [
      {
        prompt: {
          en: "If a surface is given by r(u,v), what two tangent vectors do you form first?",
          es: "Si una superficie viene dada por r(u,v), ¿que dos vectores tangentes formas primero?",
          zh: "如果曲面由 r(u,v) 给出，第一步要先形成哪两个切向量？",
        },
        firstStep: {
          en: "Differentiate with respect to u and v.",
          es: "Deriva respecto de u y de v.",
          zh: "分别对 u 和 v 求偏导。",
        },
        setup: {
          en: "Parametric surfaces naturally come with two tangent directions, one for each parameter.",
          es: "Las superficies parametrizadas vienen naturalmente con dos direcciones tangentes, una por cada parametro.",
          zh: "参数曲面天然带着两条切向方向，每个参数对应一条。",
        },
        fullPath: [
          { en: "Compute r_u.", es: "Calcula r_u.", zh: "先算 r_u。" },
          { en: "Compute r_v.", es: "Calcula r_v.", zh: "再算 r_v。" },
          { en: "Use r_u and r_v to build the tangent plane or normal vector.", es: "Usa r_u y r_v para construir el plano tangente o el vector normal.", zh: "再用 r_u 和 r_v 去构造切平面或法向量。" },
        ],
        answer: {
          en: "r_u and r_v",
          es: "r_u y r_v",
          zh: "r_u 和 r_v",
        },
        selfCheck: {
          en: "Parametric surface = two parameters, two tangent vectors.",
          es: "Superficie parametrizada = dos parametros, dos vectores tangentes.",
          zh: "参数曲面 = 两个参数，两条切向量。",
        },
      },
    ],
  },
  "calc3-3d-points": {
    quiz: [
      {
        prompt: {
          en: "Plot the point (2, -1, 3). What should you read first before drawing?",
          es: "Traza el punto (2, -1, 3). ¿Que debes leer primero antes de dibujarlo?",
          zh: "画出点 (2, -1, 3)。下笔前第一步先看什么？",
        },
        firstStep: {
          en: "Read the coordinates in x, then y, then z order.",
          es: "Lee las coordenadas en orden x, luego y, luego z.",
          zh: "先按 x、y、z 的顺序读坐标。",
        },
        setup: {
          en: "Early 3D questions are mostly recognition questions: which axis does each coordinate control?",
          es: "Las primeras preguntas de 3D suelen ser de reconocimiento: que eje controla cada coordenada.",
          zh: "最早的三维题本质上是识别题：每个坐标到底控制哪一条轴。",
        },
        fullPath: [
          { en: "Move 2 units along the x-axis.", es: "先沿 x 轴走 2 个单位.", zh: "先沿 x 轴走 2 格。" },
          { en: "Then move -1 in the y-direction.", es: "再沿 y 方向走 -1.", zh: "再沿 y 方向走 -1 格。" },
          { en: "Then move up 3 in z.", es: "最后在 z 方向上走 3.", zh: "最后在 z 方向上升 3 格。" },
        ],
        answer: {
          en: "Read x, then y, then z.",
          es: "Lee x, luego y, luego z.",
          zh: "先读 x，再读 y，最后读 z。",
        },
        selfCheck: {
          en: "3D point = three axes, fixed order.",
          es: "Punto 3D = tres ejes, orden fijo.",
          zh: "三维点 = 三条轴，顺序固定。",
        },
      },
    ],
  },
  "calc3-vectors": {
    quiz: [
      {
        prompt: {
          en: "What is the fastest way to read the vector <2, -1, 3>?",
          es: "¿Cual es la forma mas rapida de leer el vector <2, -1, 3>?",
          zh: "向量 <2, -1, 3> 最快该怎么理解？",
        },
        firstStep: {
          en: "Read it as a move, not as a location.",
          es: "Leelo como un movimiento, no como una ubicacion.",
          zh: "把它看成一个位移，不是一个地点。",
        },
        setup: {
          en: "The biggest beginner mistake is mixing up points and vectors.",
          es: "El mayor error al empezar es mezclar puntos con vectores.",
          zh: "刚学时最大的错误，就是把点和向量混为一谈。",
        },
        fullPath: [
          { en: "Use the entries as directional changes.", es: "Usa las entradas como cambios de direccion.", zh: "把各分量看成沿坐标轴的位移量。" },
          { en: "Think right 2, back 1, up 3.", es: "Piensa: 2 a la derecha, 1 hacia atras, 3 hacia arriba.", zh: "想成：向右 2、向后 1、向上 3。" },
          { en: "That is an arrow, not a pinned point.", es: "Eso es una flecha, no un punto fijo.", zh: "这是一支箭头，不是固定的点。" },
        ],
        answer: {
          en: "As a move with direction and size.",
          es: "Como un movimiento con direccion y tamaño.",
          zh: "看成一个有方向和长度的位移。",
        },
        selfCheck: {
          en: "Point locates. Vector moves.",
          es: "El punto ubica. El vector mueve.",
          zh: "点是位置，向量是位移。",
        },
      },
    ],
  },
  "calc3-dot-product": {
    quiz: [
      {
        prompt: {
          en: "Given u=<1,2,3> and v=<4,5,6>, what move starts the dot product?",
          es: "Dados u=<1,2,3> y v=<4,5,6>, ¿que movimiento inicia el producto punto?",
          zh: "给定 u=<1,2,3>, v=<4,5,6>，点积第一步做什么？",
        },
        firstStep: {
          en: "Multiply matching components and add.",
          es: "Multiplica componentes que corresponden y suma.",
          zh: "对应分量相乘，再相加。",
        },
        setup: {
          en: "Dot-product questions are usually about alignment, angle, or orthogonality, but the raw move is always the same.",
          es: "Las preguntas de producto punto suelen tratar de alineacion, angulo u ortogonalidad, pero el movimiento base siempre es el mismo.",
          zh: "点积题常常包着角度、投影或垂直外壳，但底层动作始终一样。",
        },
        fullPath: [
          { en: "Pair 1 with 4, 2 with 5, and 3 with 6.", es: "Empareja 1 con 4, 2 con 5 y 3 con 6.", zh: "先把 1 配 4，2 配 5，3 配 6。" },
          { en: "Multiply each pair.", es: "Multiplica cada pareja.", zh: "每一对分别相乘。" },
          { en: "Add the three products to get one number.", es: "Suma los tres productos para obtener un solo numero.", zh: "再把三项乘积加起来，得到一个数。" },
        ],
        answer: {
          en: "Match, multiply, add.",
          es: "Emparejar, multiplicar y sumar.",
          zh: "对应、相乘、再相加。",
        },
        selfCheck: {
          en: "Dot product outputs a number.",
          es: "El producto punto da un numero.",
          zh: "点积的结果是一个数。",
        },
      },
    ],
  },
  "calc3-motion-in-space": {
    quiz: [
      {
        prompt: {
          en: "A particle has position r(t). What are the first two derivative ideas you should know?",
          es: "Una particula tiene posicion r(t). ¿Cuales son las dos primeras ideas de derivada que debes saber?",
          zh: "一个粒子的位置是 r(t)。你最先要知道哪两个导数动作？",
        },
        firstStep: {
          en: "Differentiate once for velocity and again for acceleration.",
          es: "Deriva una vez para la velocidad y otra vez para la aceleracion.",
          zh: "先求一次导得速度，再求一次导得加速度。",
        },
        setup: {
          en: "Motion-in-space questions are just single-variable motion wearing vector notation.",
          es: "Las preguntas de movimiento en el espacio son movimiento de una variable usando notacion vectorial.",
          zh: "空间运动题本质上还是单变量运动，只是换成了向量写法。",
        },
        fullPath: [
          { en: "Start from the position vector r(t).", es: "Empieza desde el vector de posicion r(t).", zh: "先从位置向量 r(t) 出发。" },
          { en: "Differentiate to get v(t)=r'(t).", es: "Deriva para obtener v(t)=r'(t).", zh: "求导得到 v(t)=r'(t)。" },
          { en: "Differentiate again to get a(t)=r''(t).", es: "Deriva otra vez para obtener a(t)=r''(t).", zh: "再求一次导得到 a(t)=r''(t)。" },
        ],
        answer: {
          en: "Velocity is r'(t) and acceleration is r''(t).",
          es: "La velocidad es r'(t) y la aceleracion es r''(t).",
          zh: "速度是 r'(t)，加速度是 r''(t)。",
        },
        selfCheck: {
          en: "Position -> velocity -> acceleration.",
          es: "Posicion -> velocidad -> aceleracion.",
          zh: "位置 -> 速度 -> 加速度。",
        },
      },
    ],
  },
  "calc3-multivariable-functions": {
    quiz: [
      {
        prompt: {
          en: "If z=f(x,y), what should you picture first?",
          es: "Si z=f(x,y), ¿que debes imaginar primero?",
          zh: "如果 z=f(x,y)，第一时间该想成什么？",
        },
        firstStep: {
          en: "Picture a surface sitting in 3D.",
          es: "Imagina una superficie en 3D.",
          zh: "先把它想成三维空间里的一张曲面。",
        },
        setup: {
          en: "This section gets easier once students stop thinking 'two outputs' and remember it is still one output from two inputs.",
          es: "Esta seccion se vuelve mas facil cuando recuerdas que no son dos salidas, sino una sola salida producida por dos entradas.",
          zh: "这节课会简单很多，只要记住它不是“两输出”，而是“两个输入对应一个输出”。",
        },
        fullPath: [
          { en: "Treat x and y as the inputs.", es: "Trata x y y como entradas.", zh: "先把 x 和 y 当作输入。" },
          { en: "Treat z as the single output value.", es: "Trata z como el valor unico de salida.", zh: "把 z 当成唯一输出值。" },
          { en: "That usually graphs as a surface in 3D.", es: "Eso suele graficarse como una superficie en 3D.", zh: "这种关系通常画成三维曲面。" },
        ],
        answer: {
          en: "A surface in 3D.",
          es: "Una superficie en 3D.",
          zh: "三维空间中的一张曲面。",
        },
        selfCheck: {
          en: "Two inputs, one output.",
          es: "Dos entradas, una salida.",
          zh: "两个输入，一个输出。",
        },
      },
    ],
  },
  "calc3-vector-derivatives-integrals": {
    quiz: [
      {
        prompt: {
          en: "If r(t)=<t^2, sin t, e^t>, what is the first move to find r'(t)?",
          es: "Si r(t)=<t^2, sin t, e^t>, ¿cual es el primer paso para hallar r'(t)?",
          zh: "若 r(t)=<t^2, sin t, e^t>，求 r'(t) 的第一步是什么？",
        },
        firstStep: {
          en: "Differentiate each component separately.",
          es: "Deriva cada componente por separado.",
          zh: "把每个分量分别求导。",
        },
        setup: {
          en: "Vector derivatives look bigger than scalar derivatives, but the rule is simpler than students expect: lane by lane.",
          es: "Las derivadas vectoriales parecen mas grandes que las escalares, pero la regla es mas simple de lo que parece: carril por carril.",
          zh: "向量求导看起来更大，但规则反而很直接：每个分量各做各的。",
        },
        fullPath: [
          { en: "Differentiate t^2 to get 2t.", es: "Deriva t^2 y obtienes 2t.", zh: "t^2 求导得到 2t。" },
          { en: "Differentiate sin t to get cos t.", es: "Deriva sin t y obtienes cos t.", zh: "sin t 求导得到 cos t。" },
          { en: "Differentiate e^t to get e^t, so r'(t)=<2t, cos t, e^t>.", es: "Deriva e^t y obtienes e^t, asi que r'(t)=<2t, cos t, e^t>.", zh: "e^t 求导还是 e^t，所以 r'(t)=<2t, cos t, e^t>。" },
        ],
        answer: {
          en: "Differentiate component by component.",
          es: "Derivar componente por componente.",
          zh: "按分量分别求导。",
        },
        selfCheck: {
          en: "Vector derivative = one component at a time.",
          es: "Derivada vectorial = una componente a la vez.",
          zh: "向量求导 = 一个分量一个分量来。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "If r'(t)=<2t, cos t, e^t>, what should an antiderivative vector look like?",
          es: "Si r'(t)=<2t, cos t, e^t>, ¿como debe verse un vector antiderivado?",
          zh: "如果 r'(t)=<2t, cos t, e^t>，它的一个原函数向量应该长什么样？",
        },
        firstStep: {
          en: "Integrate each component and remember the constant vector.",
          es: "Integra cada componente y recuerda el vector constante.",
          zh: "每个分量分别积分，并记得最后要加常向量。",
        },
        setup: {
          en: "Vector antiderivatives work the same way as scalar ones, except the constant becomes a vector.",
          es: "Las antiderivadas vectoriales funcionan igual que las escalares, excepto que la constante ahora es un vector.",
          zh: "向量积分和普通积分本质一样，只是积分常数变成了一个常向量。",
        },
        fullPath: [
          { en: "Integrate 2t to get t^2.", es: "Integra 2t y obtienes t^2.", zh: "2t 积分得到 t^2。" },
          { en: "Integrate cos t to get sin t, and e^t to get e^t.", es: "Integra cos t para obtener sin t, y e^t para obtener e^t.", zh: "cos t 积分得到 sin t，e^t 积分还是 e^t。" },
          { en: "So one antiderivative is <t^2, sin t, e^t> + C.", es: "Entonces una antiderivada es <t^2, sin t, e^t> + C.", zh: "所以一个原函数向量是 <t^2, sin t, e^t> + C。" },
        ],
        answer: {
          en: "<t^2, sin t, e^t> + C",
          es: "<t^2, sin t, e^t> + C",
          zh: "<t^2, sin t, e^t> + C",
        },
        selfCheck: {
          en: "Vector integral = integrate each lane, then add a constant vector.",
          es: "Integral vectorial = integra cada carril y luego suma un vector constante.",
          zh: "向量积分 = 分量分别积分，再加常向量。",
        },
      },
    ],
  },
  "calc3-space-curve-arc-length": {
    quiz: [
      {
        prompt: {
          en: "What goes inside the arc-length integral for a space curve r(t)?",
          es: "¿Que va dentro de la integral de longitud de arco para una curva espacial r(t)?",
          zh: "空间曲线 r(t) 的弧长积分里，积分号里面该放什么？",
        },
        firstStep: {
          en: "Differentiate r(t) and take the magnitude.",
          es: "Deriva r(t) y toma la magnitud.",
          zh: "先求 r(t) 的导数，再取它的长度。",
        },
        setup: {
          en: "Arc length in space uses speed, not the raw vector and not the acceleration.",
          es: "La longitud de arco en el espacio usa rapidez, no el vector crudo ni la aceleracion.",
          zh: "空间弧长用的是速度大小，不是原向量本身，也不是加速度。",
        },
        fullPath: [
          { en: "Find r'(t).", es: "Halla r'(t).", zh: "先求 r'(t)。" },
          { en: "Compute |r'(t)|.", es: "Calcula |r'(t)|.", zh: "再算 |r'(t)|。" },
          { en: "Integrate |r'(t)| over the t-interval.", es: "Integra |r'(t)| en el intervalo de t.", zh: "最后在给定 t 区间上积分 |r'(t)|。" },
        ],
        answer: {
          en: "|r'(t)|",
          es: "|r'(t)|",
          zh: "|r'(t)|",
        },
        selfCheck: {
          en: "Space-curve length = integrate speed.",
          es: "Longitud de curva espacial = integrar la rapidez.",
          zh: "空间曲线弧长 = 积分速度大小。",
        },
      },
    ],
    midterm: [
      {
        prompt: {
          en: "For r(t)=<t, t^2, 2t> on 0≤t≤1, what is the setup for the arc length?",
          es: "Para r(t)=<t, t^2, 2t> en 0≤t≤1, ¿cual es el planteamiento de la longitud de arco?",
          zh: "对 r(t)=<t, t^2, 2t>，0≤t≤1，弧长的设定式是什么？",
        },
        firstStep: {
          en: "Differentiate first, then build the speed under the root.",
          es: "Deriva primero y luego construye la rapidez bajo la raiz.",
          zh: "先求导，再把速度大小写进根号里。",
        },
        setup: {
          en: "Arc-length setup questions usually test whether you can get from r(t) to the speed formula cleanly.",
          es: "Las preguntas de planteamiento de longitud de arco suelen medir si puedes pasar limpiamente de r(t) a la formula de rapidez.",
          zh: "弧长设定题通常考的是：你能不能从 r(t) 干净地走到速度大小公式。",
        },
        fullPath: [
          { en: "Compute r'(t)=<1,2t,2>.", es: "Calcula r'(t)=<1,2t,2>.", zh: "先求得 r'(t)=<1,2t,2>。" },
          { en: "Then |r'(t)| = sqrt(1 + 4t^2 + 4) = sqrt(5+4t^2).", es: "Entonces |r'(t)| = sqrt(1 + 4t^2 + 4) = sqrt(5+4t^2).", zh: "所以 |r'(t)| = sqrt(1 + 4t^2 + 4) = sqrt(5+4t^2)。" },
          { en: "So the setup is ∫_0^1 sqrt(5+4t^2) dt.", es: "Asi que el planteamiento es ∫_0^1 sqrt(5+4t^2) dt.", zh: "因此弧长设定式是 ∫_0^1 sqrt(5+4t^2) dt。" },
        ],
        answer: {
          en: "∫_0^1 sqrt(5+4t^2) dt",
          es: "∫_0^1 sqrt(5+4t^2) dt",
          zh: "∫_0^1 sqrt(5+4t^2) dt",
        },
        selfCheck: {
          en: "Differentiate first, then square-sum-root.",
          es: "Primero deriva, luego suma cuadrados y saca raiz.",
          zh: "先求导，再平方相加开根号。",
        },
      },
    ],
  },
};
