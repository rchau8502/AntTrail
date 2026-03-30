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
};
