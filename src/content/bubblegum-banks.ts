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
};
