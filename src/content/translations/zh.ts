import type { LocalizedCardContent, LocalizedCourseText } from "@/content/schema";

export const zhCourseContent: Record<string, LocalizedCourseText> = {
  "multivariable-calculus-2": {
    "title": "多元微积分 II",
    "shortDescription": "这版 MATH 2E 按 Stewart 流程整理：先快速复习 13.1-13.3，再学 16.1-16.9。",
    "units": [
      "13.1-13.3：向量函数复习",
      "16.1-16.4：向量场与线积分",
      "16.5-16.7：旋度、散度与曲面积分",
      "16.8-16.9：向量分析大定理"
    ],
    "chapters": [
      "13.1-13.3：向量函数复习",
      "16.1-16.4：向量场与线积分",
      "16.5-16.7：旋度、散度与曲面积分",
      "16.8-16.9：Stokes 与散度定理"
    ]
  },
  "linear-algebra-1": {
    "title": "线性代数导论",
    "shortDescription": "按 MATH 3A 教材整理：线性方程组、矩阵、行列式、向量空间、内积空间，以及特征值主题。",
    "units": [
      "线性方程组",
      "矩阵",
      "行列式",
      "向量空间",
      "内积空间",
      "线性变换与特征值"
    ],
    "chapters": [
      "第 1 章：线性方程组",
      "第 2 章：矩阵",
      "第 3 章：行列式",
      "第 4 章：向量空间",
      "第 5 章：内积空间",
      "第 6 章：线性变换与特征值"
    ]
  },
  "probability": {
    "title": "概率论 I",
    "shortDescription": "计数、条件概率、随机变量和期望。",
    "units": [
      "计数",
      "概率基础",
      "随机变量",
      "联合分布",
      "期望与方差",
      "集中与极限定理"
    ],
    "chapters": [
      "第 1 章：组合分析",
      "第 2 章：概率基础",
      "第 3 章：离散随机变量",
      "第 4 章：连续随机变量",
      "第 5 章：联合分布与独立性",
      "第 6 章：期望的性质",
      "第 7 章：协方差与随机变量和的方差",
      "第 8 章：集中不等式导论",
      "第 9 章：中心极限定理"
    ]
  }
};

export const zhCardContent: Record<string, LocalizedCardContent> = {
    "prob-counting-rules": {
    "course": "概率论",
    "chapter": "第 1 章：组合分析",
    "unit": "计数",
    "topic": "基本计数规则",
    "name": "基本计数规则",
    "useItWhen": "一个问题询问有多少种可能的结果",
    "looksLike": "有多少种方式...，分阶段选择，非此即彼",
    "doThis": "阶段相乘，单独情况相加",
    "thinkOfItAs": "and 表示乘法，or 表示加法",
    "watchOutFor": "当选择按顺序发生时添加",
    "rememberThis": "并相乘或相加",
    "typicalProblemShapes": [
      "从步骤 1 然后步骤 2 构建的流程",
      "必须合并的单独的非重叠案例"
    ],
    "miniDrill": [
      {
        "prompt": "如果选择分阶段进行，你会加法还是乘法？",
        "answer": "乘。"
      },
      {
        "prompt": "如果案例是单独的选择，你会加还是乘？",
        "answer": "添加。"
      }
    ],
    "memoryHook": "分步完成就乘，互斥选择就加。",
    "quickExample": {
      "problem": "3 种衬衫选择和 4 种裤子选择。几套衣服？",
      "move": "乘法：3 乘以 4。"
    }
  },

    "prob-permutations": {
    "course": "概率论",
    "chapter": "第 1 章：组合分析",
    "unit": "计数",
    "topic": "排列",
    "name": "排列",
    "useItWhen": "订单事宜",
    "looksLike": "安排、阵容、排名、密码",
    "doThis": "使用阶乘式公式对有序选择进行计数",
    "thinkOfItAs": "相同的人，不同的顺序，不同的结果",
    "watchOutFor": "当顺序很重要时使用组合",
    "rememberThis": "排列关心顺序",
    "typicalProblemShapes": [
      "将对象排列成一行",
      "选出一、二、三等奖得主"
    ],
    "miniDrill": [
      {
        "prompt": "排列中的顺序重要吗？",
        "answer": "是的。"
      },
      {
        "prompt": "在排列问题中 ABC 与 CBA 相同吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "排列=排列。",
    "quickExample": {
      "problem": "从 10 名学生中选择并订购 3 名。",
      "move": "使用排列计数，而不是组合计数。"
    }
  },

    "prob-combinations": {
    "course": "概率论",
    "chapter": "第 1 章：组合分析",
    "unit": "计数",
    "topic": "组合",
    "name": "组合",
    "useItWhen": "顺序并不重要",
    "looksLike": "选择一个委员会，选择一个人，选择一个小组",
    "doThis": "使用 n 选择 k 对无序选择进行计数",
    "thinkOfItAs": "相同的组，相同的结果，无论顺序如何",
    "watchOutFor": "以不同的顺序多次计数同一组",
    "rememberThis": "组合忽略顺序",
    "typicalProblemShapes": [
      "委员会或团队选择",
      "手牌、子集或选定的组"
    ],
    "miniDrill": [
      {
        "prompt": "组合中的顺序重要吗？",
        "answer": "不。"
      },
      {
        "prompt": "对于相同的 n 和 k：排列或组合哪个更大？",
        "answer": "排列，因为它们计算更多的顺序。"
      }
    ],
    "memoryHook": "组合=选择一个组。",
    "quickExample": {
      "problem": "从一副牌中选择 5 张牌。",
      "move": "使用组合，因为 5 张牌的顺序并不重要。"
    }
  },

    "prob-multinomial": {
    "course": "概率论",
    "chapter": "第 1 章：组合分析",
    "unit": "计数",
    "topic": "多项式系数",
    "name": "多项式系数",
    "useItWhen": "一个集合被分成几个标记组",
    "looksLike": "把 n 个对象分成大小为 a、b、c 的几组",
    "doThis": "计算有多少种方法可以分成小组大小",
    "thinkOfItAs": "不止两组的分组计数",
    "watchOutFor": "将多组分裂视为一个简单的选择",
    "rememberThis": "多组分配通常就会想到多项式系数",
    "typicalProblemShapes": [
      "将对象分配到标记类别中",
      "计算多个类别总数固定的结果"
    ],
    "miniDrill": [
      {
        "prompt": "一个短语中的多项式概念是什么？",
        "answer": "分成几组。"
      },
      {
        "prompt": "当有3个或更多标记组时，它只是一步选择吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "超过两组？思考多项式。",
    "quickExample": {
      "problem": "将 10 个人分成 4 人、3 人、3 人一组。",
      "move": "使用多项式计数。"
    }
  },

    "prob-axioms": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "概率公理",
    "name": "概率公理",
    "useItWhen": "你需要概率必须遵守的基本规则",
    "looksLike": "P(A)、P(样本空间)、不相交事件",
    "doThis": "使用非负数，整个空间等于 1，并添加不相交事件",
    "thinkOfItAs": "每个概率模型必须遵循的基本规则",
    "watchOutFor": "添加重叠事件的概率，就像它们是不相交的一样",
    "rememberThis": "整个空间为1",
    "typicalProblemShapes": [
      "基本事件计算",
      "检查规则是否可以是概率模型"
    ],
    "miniDrill": [
      {
        "prompt": "概率可以为负吗？",
        "answer": "不。"
      },
      {
        "prompt": "什么时候可以直接将P(A)和P(B)相加？",
        "answer": "当A和B不相交时。"
      }
    ],
    "memoryHook": "概率介于 0 和 1 之间，所有结果总计为 1。",
    "quickExample": {
      "problem": "什么是P（样本空间）？",
      "move": "1."
    }
  },

    "prob-conditional": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "条件概率",
    "name": "条件概率",
    "useItWhen": "问题说鉴于已经发生了一些事情",
    "looksLike": "P(A给定B)",
    "doThis": "将样本空间缩小到B，然后测量其中的A",
    "thinkOfItAs": "新信息到达后放大",
    "watchOutFor": "条件更改设置后使用旧样本空间",
    "rememberThis": "条件作用使宇宙缩小",
    "typicalProblemShapes": [
      "假设一张牌是红色的，那么它是红心的可能性有多大？",
      "如果检测呈阳性，患者患病的可能性有多大？"
    ],
    "miniDrill": [
      {
        "prompt": "条件概率对样本空间有什么作用？",
        "answer": "它缩小了它。"
      },
      {
        "prompt": "P(A 给定 B) 可以与 P(A) 不同吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "给定 B 意味着住在 B 内。",
    "quickExample": {
      "problem": "当你以 B 为条件时，首先发生什么变化？",
      "move": "样本空间缩小到B。"
    }
  },

    "prob-independence": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "独立",
    "name": "独立",
    "useItWhen": "一个事件不会改变另一事件发生的机会",
    "looksLike": "独立事件，事件的乘积规则",
    "doThis": "检查 P(A 和 B) 是否等于 P(A) 乘以 P(B)",
    "thinkOfItAs": "了解其中一个并不能告诉你关于另一个的任何新信息",
    "watchOutFor": "混淆脱节与独立",
    "rememberThis": "独立意味着产品规则",
    "typicalProblemShapes": [
      "像抛硬币一样反复尝试",
      "询问信息是否改变概率的问题"
    ],
    "miniDrill": [
      {
        "prompt": "不相交的非零事件可以独立吗？",
        "answer": "不。"
      },
      {
        "prompt": "独立的签名公式是什么？",
        "answer": "P(A 和 B) = P(A)P(B)。"
      }
    ],
    "memoryHook": "没有影响力就意味着产品规则。",
    "quickExample": {
      "problem": "什么快速方程式可以检查独立性？",
      "move": "P(A 和 B) = P(A)P(B)。"
    }
  },

    "prob-bayes": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "贝叶斯公式",
    "name": "贝叶斯公式",
    "useItWhen": "你需要逆转条件",
    "looksLike": "P(A 给定 B) 但你知道 P(B 给定 A)",
    "doThis": "使用先验可能性而不是总证据",
    "thinkOfItAs": "在新证据出现后扭转箭头",
    "watchOutFor": "忘记了 B 可能发生的所有方式的总和的分母",
    "rememberThis": "小心地逆转条件",
    "typicalProblemShapes": [
      "医学测试题",
      "垃圾邮件过滤器或诊断风格逆转问题"
    ],
    "miniDrill": [
      {
        "prompt": "贝叶斯会反转条件方向吗？",
        "answer": "是的。"
      },
      {
        "prompt": "贝叶斯问题的大陷阱是什么？",
        "answer": "忽略基本利率和完整分母。"
      }
    ],
    "memoryHook": "贝叶斯翻转的是条件，而不是逻辑。",
    "quickExample": {
      "problem": "贝叶斯的分母通常是什么？",
      "move": "证据的总概率。"
    }
  },

    "prob-expected-value": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "随机变量和期望",
    "name": "期望值",
    "useItWhen": "你需要长期平均回报",
    "whatItMeans": "期望值就是把每个可能结果按它出现的概率加权后得到的长期平均。",
    "looksLike": "E(X)、平均增益、平均数量、平均值",
    "doThis": "把每个取值乘上它的概率，再加起来",
    "whyThisMove": "每个结果既要看它有多大，也要看它有多可能。期望就是把“大小”和“概率”一起揉进加权平均。",
    "thinkOfItAs": "所有可能结果的加权平均值",
    "watchOutFor": "不使用概率求平均值",
    "rememberThis": "期望值是加权平均值",
    "typicalProblemShapes": [
      "机会游戏和预期收益",
      "平均计数或平均成本问题"
    ],
    "miniDrill": [
      {
        "prompt": "不太可能发生的重大结果对预期仍然重要吗？",
        "answer": "是的，如果回报足够大的话。"
      },
      {
        "prompt": "期望只是最可能的值吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "期望=加权平均。",
    "quickExample": {
      "problem": "基本预期走势是什么？",
      "move": "值乘以概率，然后相加。"
    }
  },

    "prob-linearity": {
    "course": "概率论",
    "chapter": "第 6 章：期望的性质",
    "unit": "期望与方差",
    "topic": "期望的线性度",
    "name": "期望的线性度",
    "useItWhen": "随机总数是较小随机部分的总和",
    "looksLike": "E(X + Y + ...)",
    "doThis": "即使变量相关，也可以把期望沿着加号拆开",
    "thinkOfItAs": "期望会顺着加法拆开",
    "watchOutFor": "误以为这里也需要独立性",
    "rememberThis": "线性不需要独立性",
    "typicalProblemShapes": [
      "成功次数、匹配数或碰撞数的期望",
      "指示变量计数题"
    ],
    "miniDrill": [
      {
        "prompt": "求和的期望最先该怎么做？",
        "answer": "沿着加号拆开。"
      },
      {
        "prompt": "依赖性是否会破坏期望的线性？",
        "answer": "不。"
      }
    ],
    "memoryHook": "期望拆和，不用先证独立。",
    "quickExample": {
      "problem": "你需要 E(X + Y) = E(X) + E(Y) 的独立性吗？",
      "move": "不。"
    }
  },

    "prob-variance": {
    "course": "概率论",
    "chapter": "第 7 章：协方差与随机变量和的方差",
    "unit": "期望与方差",
    "topic": "方差",
    "name": "方差",
    "useItWhen": "你关心点差，而不仅仅是平均值",
    "looksLike": "Var(X)，围绕平均值分布",
    "doThis": "测量与平均值的平均平方距离",
    "thinkOfItAs": "随机变量的噪声有多大",
    "watchOutFor": "像标准差或均值本身一样对待方差",
    "rememberThis": "方差衡量散布",
    "typicalProblemShapes": [
      "风险或波动性问题",
      "求和与变换的方差"
    ],
    "miniDrill": [
      {
        "prompt": "两个随机变量可以具有相同的期望但不同的方差吗？",
        "answer": "是的。"
      },
      {
        "prompt": "方差衡量的是中心还是散布？",
        "answer": "散布。"
      }
    ],
    "memoryHook": "均值看中心，方差看散布。",
    "quickExample": {
      "problem": "方差告诉你什么而期望却没有告诉你什么？",
      "move": "结果的分散程度如何。"
    }
  },

    "prob-distributions": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "常见分布",
    "name": "常见分布",
    "useItWhen": "问题听起来像是重复试验、等待时间或罕见计数",
    "looksLike": "伯努利、二项式、几何、泊松、正态",
    "doThis": "在使用公式之前将故事与分布模式相匹配",
    "thinkOfItAs": "故事第一，公式第二",
    "watchOutFor": "在检查设置假设之前使用分布公式",
    "rememberThis": "认识故事模式",
    "typicalProblemShapes": [
      "独立重复试验",
      "固定间隔内的罕见事件计数"
    ],
    "miniDrill": [
      {
        "prompt": "计算 n 次独立试验的成功次数。哪个型号？",
        "answer": "二项式。"
      },
      {
        "prompt": "等待第一次成功。哪个型号？",
        "answer": "几何的。"
      }
    ],
    "memoryHook": "将公式前面的故事连起来。",
    "quickExample": {
      "problem": "使用固定 p 重复是/否试验。什么型号适合？",
      "move": "如果计算成功，则为二项式；如果等待第一次成功，则为几何数。"
    }
  },

    "prob-continuous-density": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "连续分布和密度",
    "name": "密度函数",
    "useItWhen": "随机变量可以取连续值",
    "looksLike": "f(x)，密度曲线，概率积分",
    "doThis": "使用一定间隔内密度下的面积",
    "thinkOfItAs": "连续概率存在于区域中，而不是点质量中",
    "watchOutFor": "要求某个精确点的概率，就像它有一大块质量一样",
    "rememberThis": "连续概率来自区间",
    "typicalProblemShapes": [
      "正态或均匀密度问题",
      "某个值范围内的概率"
    ],
    "miniDrill": [
      {
        "prompt": "连续变量在某一精确点的概率是多少？",
        "answer": "0。"
      },
      {
        "prompt": "什么给出了区间上的概率？",
        "answer": "密度曲线下的面积。"
      }
    ],
    "memoryHook": "密度意味着面积，而不是点质量。",
    "quickExample": {
      "problem": "如何从密度中获得概率？",
      "move": "在区间上积分。"
    }
  },

    "prob-joint-distribution": {
    "course": "概率论",
    "chapter": "第 5 章：联合分布与独立性",
    "unit": "联合分布",
    "topic": "联合分配",
    "name": "联合分配",
    "useItWhen": "两个随机变量一起跟踪",
    "looksLike": "P(X = x, Y = y) 或联合密度 f(x, y)",
    "doThis": "首先读取配对行为，然后从中获取边际或条件",
    "thinkOfItAs": "一个表或表面同时用于两个变量",
    "watchOutFor": "未给出独立性时乘以边际",
    "rememberThis": "联合优先，边缘可以从中产生",
    "typicalProblemShapes": [
      "双向表或密度表面",
      "从联合分布中查找边际分布或条件分布"
    ],
    "miniDrill": [
      {
        "prompt": "你能从联合分配中获得边际收益吗？",
        "answer": "是的。"
      },
      {
        "prompt": "联合总是等于边际的乘积吗？",
        "answer": "不，只有在独立的情况下。"
      }
    ],
    "memoryHook": "联合讲述了整个情侣的故事。",
    "quickExample": {
      "problem": "联合分布描述了什么？",
      "move": "两个变量如何一起表现。"
    }
  },

    "prob-covariance-correlation": {
    "course": "概率论",
    "chapter": "第 7 章：协方差与随机变量和的方差",
    "unit": "联合分布",
    "topic": "协方差和相关性",
    "name": "协方差和相关性",
    "useItWhen": "你需要知道两个变量是否一起移动",
    "whatItMeans": "协方差看的是两个变量相对各自均值时，是否倾向同向变化。相关系数是去掉单位后的缩放版。",
    "looksLike": "Cov(X,Y)，Corr(X,Y)",
    "doThis": "先用协方差看同向还是反向，再用相关系数看强弱",
    "whyThisMove": "协方差来自“偏离均值后的乘积”。这个乘积正好能看出它们是同涨同跌，还是一个高时另一个低。",
    "thinkOfItAs": "它们是一起上升、相反还是几乎没有联系",
    "watchOutFor": "将零相关性视为保证独立性",
    "rememberThis": "相关性是缩放协方差",
    "typicalProblemShapes": [
      "散点图式依赖性问题",
      "使用协方差项求和的方差"
    ],
    "miniDrill": [
      {
        "prompt": "相关性有单位吗？",
        "answer": "不。"
      },
      {
        "prompt": "零相关性是否总是意味着独立性？",
        "answer": "不。"
      }
    ],
    "memoryHook": "协方差看方向，相关系数看强弱。",
    "quickExample": {
      "problem": "正协方差表明什么？",
      "move": "变量往往朝同一方向移动。"
    }
  },

    "prob-markov-chebyshev": {
    "course": "概率论",
    "chapter": "第 8 章：集中不等式导论",
    "unit": "集中与极限定理",
    "topic": "马尔可夫和切比雪夫不等式",
    "name": "马尔可夫和切比雪夫",
    "useItWhen": "你只知道均值或方差，但还想快速给尾概率一个上界",
    "whatItMeans": "这两条是不求精确值的保险界：只靠少量信息，也能给出一个不会错的上界。",
    "looksLike": "给 P(X 很大) 或 P(|X-均值| 很大) 做上界",
    "doThis": "对于非负变量使用马尔可夫，当方差可用时使用切比雪夫",
    "whyThisMove": "题目不给完整分布时，别硬算精确概率。Markov 和 Chebyshev 就是把“只有均值/方差”的信息变成可用上界。",
    "thinkOfItAs": "粗糙但可靠的护栏",
    "watchOutFor": "期望这些界限是尖锐的",
    "rememberThis": "马尔可夫使用均值，切比雪夫使用方差",
    "typicalProblemShapes": [
      "尾部概率的上限",
      "有期望或方差但没有精确分布的问题"
    ],
    "miniDrill": [
      {
        "prompt": "切比雪夫还需要什么超出预期的额外成分？",
        "answer": "方差。"
      },
      {
        "prompt": "这些不平等的主要作用是什么？",
        "answer": "给出概率界限。"
      }
    ],
    "memoryHook": "Markov 用均值，Chebyshev 用方差。",
    "quickExample": {
      "problem": "哪个界限明确使用方差？",
      "move": "切比雪夫。"
    }
  },

    "prob-clt": {
    "course": "概率论",
    "chapter": "第 9 章：中心极限定理",
    "unit": "集中与极限定理",
    "topic": "中心极限定理",
    "name": "中心极限定理",
    "useItWhen": "题目在问很多随机量的总和或样本均值",
    "whatItMeans": "中心极限定理说：很多独立随机量加在一起，经过中心化和标准化后，往往会长得像正态。",
    "looksLike": "大 n、样本均值、标准化总和",
    "doThis": "先把总和或均值标准化，再用正态近似",
    "whyThisMove": "原来的总和活在自己的尺度里，不方便比较。减去均值再除以标准差，才会落到正态近似能工作的钟形尺度上。",
    "thinkOfItAs": "很多小随机扰动混在一起，最后磨成钟形曲线",
    "watchOutFor": "在样本量很小或依赖性很强的情况下使用 CLT，而不检查假设",
    "rememberThis": "很多小随机量加起来，常常会看起来像正态",
    "typicalProblemShapes": [
      "大 n 的样本均值",
      "独立项之和的近似概率"
    ],
    "miniDrill": [
      {
        "prompt": "CLT 讨论的是单个变量还是多个组合变量？",
        "answer": "许多组合变量。"
      },
      {
        "prompt": "极限中通常出现什么形状？",
        "answer": "正常的钟形曲线。"
      }
    ],
    "memoryHook": "大样本下，总和和均值常往正态靠。",
    "quickExample": {
      "problem": "在 CLT 下什么通常会变得近似正常？",
      "move": "许多变量的适当标准化的总和或平均值。"
    }
  },

    "prob-inclusion-exclusion": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "包含-排除",
    "name": "包含-排除",
    "useItWhen": "两个事件重叠和简单加法重复计算",
    "looksLike": "P(A 并 B) 有重叠",
    "doThis": "添加两个事件，然后减去一次重叠",
    "thinkOfItAs": "修复双重计数",
    "watchOutFor": "添加重叠事件，就像它们是不相交的一样",
    "rememberThis": "将两者相加，减去重叠部分",
    "typicalProblemShapes": [
      "至少发生以下两个事件之一",
      "重叠事件的并集"
    ],
    "miniDrill": [
      {
        "prompt": "为什么要减去交集呢？",
        "answer": "因为被算了两次。"
      },
      {
        "prompt": "如果事件不相交，重叠项会怎样？",
        "answer": "就变成0了。"
      }
    ],
    "memoryHook": "联盟有重叠吗？减去中间。",
    "quickExample": {
      "problem": "P(A 并 B) 中减去什么项？",
      "move": "减去 P(A 交点 B)。"
    }
  },

    "prob-total-probability": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "全概率定律",
    "name": "全概率定律",
    "useItWhen": "一个事件可以通过几个干净的案例发生",
    "looksLike": "分成案例、分区、条件块",
    "doThis": "将样本空间分解为不重叠的案例并添加案例路径",
    "thinkOfItAs": "挨家挨户建立答案",
    "watchOutFor": "使用重叠的案例",
    "rememberThis": "分成案例，然后添加",
    "typicalProblemShapes": [
      "多个团体或来源为一项活动提供信息",
      "带有分区的贝叶斯式设置"
    ],
    "miniDrill": [
      {
        "prompt": "你需要什么样的案例拆分？",
        "answer": "一个分区。"
      },
      {
        "prompt": "不同情况之间可以重叠吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "将其分解，然后添加路径。",
    "quickExample": {
      "problem": "全概率定律什么时候有用？",
      "move": "当一个事件可以通过几个单独的案例发生时。"
    }
  },

    "prob-pmf-cdf": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "PMF 和 CDF",
    "name": "PMF 与 CDF",
    "useItWhen": "你需要精确点概率，或要算累计到某个位置为止的概率",
    "looksLike": "P(X = x), F(x) = P(X <= x)",
    "doThis": "精确取值看 PMF；算累计到某个位置看 CDF",
    "thinkOfItAs": "PMF 看一个点，CDF 看累计到哪儿",
    "watchOutFor": "把 CDF 当成会自动给出单点概率",
    "rememberThis": "PMF 看单点，CDF 看累计",
    "typicalProblemShapes": [
      "离散随机变量值表",
      "精确概率和累积概率之间的转换"
    ],
    "miniDrill": [
      {
        "prompt": "哪一个直接回答 P(X = 3)？",
        "answer": "PMF。"
      },
      {
        "prompt": "当 x 向右移动时，哪一个继续构建？",
        "answer": "CDF。"
      }
    ],
    "memoryHook": "PMF 看一点，CDF 看累积。",
    "quickExample": {
      "problem": "CDF 收集什么？",
      "move": "所有概率都达到一个截止值。"
    }
  },

    "prob-binomial": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "二项分布",
    "name": "二项式模式",
    "useItWhen": "你在固定次数的独立成败试验里数成功次数",
    "looksLike": "n 次试验，相同的 p，正好 k 次成功",
    "doThis": "先检查 n 固定、p 相同、试验独立，再用二项模型",
    "thinkOfItAs": "同样的试验做 n 次，再数成功几次",
    "watchOutFor": "当试验次数不固定时使用二项式",
    "rememberThis": "固定尝试，计算成功次数",
    "typicalProblemShapes": [
      "n 次尝试中恰好 k 次成功",
      "重复独立的成功-失败实验"
    ],
    "miniDrill": [
      {
        "prompt": "二项式是否需要固定次数的试验？",
        "answer": "是的。"
      },
      {
        "prompt": "你在数什么？",
        "answer": "成功的次数。"
      }
    ],
    "memoryHook": "次数固定，数成功。",
    "quickExample": {
      "problem": "主要的二项式线索是什么？",
      "move": "固定数量的独立试验具有相同的成功机会。"
    }
  },

    "prob-geometric": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "几何分布",
    "name": "几何图案",
    "useItWhen": "你等待第一个成功",
    "looksLike": "试验 k 首次成功",
    "doThis": "认出重复独立试验，而且题目在等第一次成功",
    "thinkOfItAs": "不断尝试，直到成功",
    "watchOutFor": "如果题目在数总成功次数，就别用几何分布",
    "rememberThis": "几何分布看等待时间",
    "typicalProblemShapes": [
      "试验 k 首次成功",
      "无固定停止计数的重复独立试验"
    ],
    "miniDrill": [
      {
        "prompt": "几何计算的是等待时间还是总成功数？",
        "answer": "等待时间。"
      },
      {
        "prompt": "试验次数是预先确定的吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "几何=等一胜。",
    "quickExample": {
      "problem": "一行中的几何故事是什么？",
      "move": "距离第一次成功还有多久。"
    }
  },

    "prob-poisson": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "泊松分布",
    "name": "泊松模式",
    "useItWhen": "你在一个时间窗或空间窗里数稀有事件",
    "looksLike": "某个时间间隔内的到达、缺陷、呼叫、点击",
    "doThis": "认出这是“窗口里的计数”，并且给了平均速率 lambda",
    "thinkOfItAs": "稀有事件在一个时间窗里慢慢出现",
    "watchOutFor": "在固定试验的成功案例中使用泊松",
    "rememberThis": "泊松对窗口中的事件进行计数",
    "typicalProblemShapes": [
      "每小时通话次数",
      "每页缺陷数或每分钟到达数"
    ],
    "miniDrill": [
      {
        "prompt": "什么参数驱动泊松？",
        "answer": "平均速率 lambda。"
      },
      {
        "prompt": "泊松计算窗口时间或等待时间吗？",
        "answer": "窗口里的事件个数。"
      }
    ],
    "memoryHook": "泊松 = 每个窗口的事件。",
    "quickExample": {
      "problem": "什么样的故事最适合泊松？",
      "move": "计算一段时间内罕见的到达次数。"
    }
  },

    "prob-normal-pattern": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "正态分布",
    "name": "正态模式",
    "useItWhen": "钟形连续模型出现",
    "looksLike": "平均 mu、标准差 sigma、钟形曲线",
    "doThis": "考虑区间面积并在需要时标准化",
    "thinkOfItAs": "经典的钟模型",
    "watchOutFor": "把正态分布当成离散点质量模型",
    "rememberThis": "正态分布看的是钟形曲线下面积",
    "typicalProblemShapes": [
      "钟形测量模型",
      "Z 分数和标准化问题"
    ],
    "miniDrill": [
      {
        "prompt": "标准化会创造什么？",
        "answer": "z 分数。"
      },
      {
        "prompt": "精确的点概率在连续正态模型中重要吗？",
        "answer": "不，间隔很重要。"
      }
    ],
    "memoryHook": "正态 = 看钟形曲线下的面积。",
    "quickExample": {
      "problem": "你通常在正态曲线下计算什么？",
      "move": "一段区间内的面积。"
    }
  },

    "prob-variance-sum": {
    "course": "概率论",
    "chapter": "第 7 章：协方差与随机变量和的方差",
    "unit": "期望与方差",
    "topic": "总和的方差",
    "name": "总和的方差",
    "useItWhen": "正在添加几个随机片段",
    "whatItMeans": "和的方差不一定只是“把方差相加”；变量之间如果会一起波动，还会多出协方差项。",
    "looksLike": "Var(X + Y)、独立和、协方差项",
    "doThis": "在添加方差之前先检查独立性",
    "whyThisMove": "完整公式里有交叉项。独立时它会消失；不独立时，如果你把它忘了，答案通常就会错。",
    "thinkOfItAs": "离散程度也会合并，但不是总能直接相加",
    "watchOutFor": "不检查依赖性而盲目添加方差",
    "rememberThis": "方差只会在独立时干净地相加",
    "typicalProblemShapes": [
      "随机变量的总和",
      "期望规则和方差规则之间的比较"
    ],
    "miniDrill": [
      {
        "prompt": "方差总是像期望一样增加吗？",
        "answer": "不。"
      },
      {
        "prompt": "什么条件可以使方差干净地相加？",
        "answer": "独立。"
      }
    ],
    "memoryHook": "期望总能相加；方差要先看协方差。",
    "quickExample": {
      "problem": "什么时候 Var(X + Y) 等于 Var(X) + Var(Y)？",
      "move": "当 X 和 Y 独立时。"
    }
  },

    "prob-indicator": {
    "course": "概率论",
    "chapter": "第 6 章：期望的性质",
    "unit": "期望与方差",
    "topic": "指示变量",
    "name": "指示变量",
    "useItWhen": "你想把“发生几次”这类问题改写成 0-1 计数",
    "whatItMeans": "指示变量就是一个 0-1 开关：事件发生记 1，不发生记 0。把很多开关加起来，就得到总个数。",
    "looksLike": "I_A，事件发生与否，预期计数",
    "doThis": "将每个事件转化为 0-1 开关，然后对开关求和",
    "whyThisMove": "很多难数的总数，一旦写成 I1 + I2 + ...，就能立刻接上线性期望，把难题拆小。",
    "thinkOfItAs": "一排会亮或不亮的小开关",
    "watchOutFor": "忘记指标也是随机变量",
    "rememberThis": "用0-1开关计数",
    "typicalProblemShapes": [
      "预期的匹配、碰撞或命中次数",
      "期望技巧的线性"
    ],
    "miniDrill": [
      {
        "prompt": "指标可以取什么值？",
        "answer": "只有 0 或 1。"
      },
      {
        "prompt": "指标使什么变得更容易？",
        "answer": "预期计数。"
      }
    ],
    "memoryHook": "能数的东西，先试着写成 0-1 开关。",
    "quickExample": {
      "problem": "为什么使用指示变量？",
      "move": "他们将计数问题转化为期望问题。"
    }
  },

    "prob-lln": {
    "course": "概率论",
    "chapter": "第 9 章：中心极限定理",
    "unit": "集中与极限定理",
    "topic": "大数定律",
    "name": "大数定律",
    "useItWhen": "样本平均值越来越多，而你关心它最后会靠近哪里",
    "whatItMeans": "大数定律说，重复很多次以后，样本平均值会贴近真实期望值。",
    "looksLike": "多次试验的平均值、长期频率、样本平均值",
    "doThis": "将平均值的走向与分布的形状分开",
    "whyThisMove": "LLN 讲的是“平均值会往哪儿去”，不是“图形会不会像正态”。这里重点是落点，不是形状。",
    "thinkOfItAs": "长期运行稳定在真实均值附近",
    "watchOutFor": "LLN 与 CLT 混淆",
    "rememberThis": "LLN 表示平均值的走向； CLT 说明它们的外观",
    "typicalProblemShapes": [
      "重复采样和平均结果",
      "比较 LLN 和 CLT 的问题"
    ],
    "miniDrill": [
      {
        "prompt": "LLN更多地谈论中心形状还是钟形形状？",
        "answer": "中心。"
      },
      {
        "prompt": "什么定理更能说明大和或平均值的正态形状？",
        "answer": "中心极限定理。"
      }
    ],
    "memoryHook": "LLN 看落点，CLT 看形状。",
    "quickExample": {
      "problem": "大数定律用简单的英语怎么说？",
      "move": "长期平均值逐渐接近真实平均值。"
    }
  },

    "prob-stars-and-bars": {
    "course": "概率论 I",
    "chapter": "第 1 章：组合分析",
    "unit": "计数",
    "topic": "计算非负整数解",
    "name": "插板法（Stars and Bars）",
    "useItWhen": "你在数把总数分到几个盒子里的方法数",
    "looksLike": "x1 + x2 + ... + xn = k 且 xi 非负",
    "doThis": "把总数看成一排星号，再插分隔板把它们分进不同盒子",
    "thinkOfItAs": "一排带有分隔线的物体",
    "watchOutFor": "忘记是否允许零",
    "rememberThis": "总数分盒子，先想插板法",
    "typicalProblemShapes": [
      "非负整数解计数",
      "把相同的球分到不同盒子里"
    ],
    "miniDrill": [
      {
        "prompt": "如果每个 xi 必须至少为 1，那么首先会发生什么变化？",
        "answer": "计数前将每个变量向下移动 1。"
      },
      {
        "prompt": "插板法里，盒子是有顺序的吗？",
        "answer": "有顺序。"
      }
    ],
    "memoryHook": "星号排开，隔板插进去。",
    "quickExample": {
      "problem": "什么模式适合 x1 + x2 + x3 = 7 且 xi 非负？",
      "move": "插板法。"
    }
  },

    "prob-equally-likely": {
    "course": "概率论 I",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "同等可能的结果",
    "name": "同等可能的结果",
    "useItWhen": "每个结果都有相同的可能性",
    "looksLike": "公平骰子、公平抽牌、随机排列、均匀样本空间",
    "doThis": "先确认等可能，再用有利结果除以总结果",
    "thinkOfItAs": "概率成为样本空间的一部分",
    "watchOutFor": "当结果的可能性不同时，使用有利而非总体",
    "rememberThis": "仅在等似然检查后计数才有效",
    "typicalProblemShapes": [
      "纸牌、骰子、抛硬币和随机排列",
      "原始计数的概率"
    ],
    "miniDrill": [
      {
        "prompt": "如果各结果机会不一样，还能直接用有利比总数吗？",
        "answer": "不。"
      },
      {
        "prompt": "等概率样本空间中的分母是多少？",
        "answer": "结果总数。"
      }
    ],
    "memoryHook": "先机会均等，再算数。",
    "quickExample": {
      "problem": "公平骰子题的第一步通常是什么？",
      "move": "数出好的结果并除以 6。"
    }
  },

    "prob-secretary-problem": {
    "course": "概率论 I",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "秘书问题",
    "name": "秘书问题",
    "useItWhen": "选择一一到来，被拒绝的选项就永远消失了",
    "looksLike": "面试顺序，迄今为止最好的规则，现在就停下来选择",
    "doThis": "跳过早期样本，然后采用第一个选项，击败迄今为止看到的所有选项",
    "thinkOfItAs": "先采样，然后扑向第一个杰出的",
    "watchOutFor": "尝试与你未见过的未来候选人进行比较",
    "rememberThis": "跳过一些，然后采取下一个迄今为止最好的",
    "typicalProblemShapes": [
      "最优停止问题",
      "从一次性序列中选择最佳项目"
    ],
    "miniDrill": [
      {
        "prompt": "经典秘书问题里，被拒的人还能回头选吗？",
        "answer": "不。"
      },
      {
        "prompt": "通常的策略形状是什么？",
        "answer": "先观察，然后选择下一个纪录打破者。"
      }
    ],
    "memoryHook": "样品，然后抓住下一个杰出的。",
    "quickExample": {
      "problem": "秘书式问题的识别线索是什么？",
      "move": "连续的选择，没有回头路。"
    }
  },

    "prob-coupon-collector": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "优惠券收集者",
    "name": "优惠券收集者",
    "useItWhen": "你不断采样直到每种类型都出现",
    "looksLike": "收集所有n种，重复抽奖，等待时间",
    "doThis": "将总等待分为几个阶段并添加预期等待",
    "thinkOfItAs": "最后一个缺失的项目花费的时间最长",
    "watchOutFor": "对待每个新的优惠券阶段就像它有相同的机会一样",
    "rememberThis": "收集所有问题分为几个阶段",
    "typicalProblemShapes": [
      "收集所有卡片、贴纸或优惠券类型",
      "所有类别出现之前的预计时间"
    ],
    "miniDrill": [
      {
        "prompt": "最终缺失的类型通常到达得快还是慢？",
        "answer": "慢慢地。"
      },
      {
        "prompt": "什么定理使得阶段分割变得容易？",
        "answer": "期望的线性。"
      }
    ],
    "memoryHook": "全部收集意味着逐步等待。",
    "quickExample": {
      "problem": "收集所有期望的通常举动是什么？",
      "move": "添加每张新优惠券的等待时间。"
    }
  },

    "prob-negative-binomial": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "负二项式模式",
    "name": "负二项式模式",
    "useItWhen": "你在等第 r 次成功，而不只是第一次成功",
    "looksLike": "直到第 r 次成功所需的试验次数",
    "doThis": "把它看成重复的几何等待，一直等到成功次数达到目标",
    "thinkOfItAs": "几何分布的升级版：不是等一次，而是等到第 r 次",
    "watchOutFor": "混淆成功次数与试验次数",
    "rememberThis": "负二项式=等待第r次成功",
    "typicalProblemShapes": [
      "尝试直到第三次或第五次成功",
      "重复伯努利等待时间问题"
    ],
    "miniDrill": [
      {
        "prompt": "r = 1 的特殊情况是几何吗？",
        "answer": "是的。"
      },
      {
        "prompt": "负二项式是否计算成功次数或总试验次数？",
        "answer": "通常数的是到第 r 次成功为止的总试验次数。"
      }
    ],
    "memoryHook": "几何等一次；负二项等第 r 次。",
    "quickExample": {
      "problem": "从几何到负二项式有什么变化？",
      "move": "你等的是第 r 次成功，不是第一次成功。"
    }
  },

    "prob-hypergeometric": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "超几何模式",
    "name": "超几何模式",
    "useItWhen": "你在有限总体里做不放回抽样",
    "looksLike": "抽牌、抽球、总体里有成功项，而且不放回",
    "doThis": "用组合数去数成功样本，并记住每抽一次总体都会变",
    "thinkOfItAs": "不放回版本的二项分布",
    "watchOutFor": "总体会变的时候，还硬把它当成独立二项试验",
    "rememberThis": "不放回，就先想超几何",
    "typicalProblemShapes": [
      "卡片、弹珠和缺陷样品无需更换",
      "计算在固定抽签大小中出现的成功次数"
    ],
    "miniDrill": [
      {
        "prompt": "超几何采样中的绘制是否独立？",
        "answer": "不。"
      },
      {
        "prompt": "超几何类似于什么常见分布？",
        "answer": "像二项分布，但它是不放回的。"
      }
    ],
    "memoryHook": "不放回，就别再假装独立。",
    "quickExample": {
      "problem": "超几何的快速识别线索是什么？",
      "move": "从固定池中取样，无需更换。"
    }
  },

    "prob-uniform-continuous": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "连续均匀分布",
    "name": "连续均匀",
    "useItWhen": "区间里每个位置按密度来看都一样可能",
    "looksLike": "[a,b] 上的 X，平坦密度，区间上的随机点",
    "doThis": "将概率视为间隔长度除以总长度",
    "thinkOfItAs": "跨越一段平坦的机会",
    "watchOutFor": "尝试对一个精确点给出正概率",
    "rememberThis": "在区间上均匀意味着长度比",
    "typicalProblemShapes": [
      "线段上的随机点",
      "一段时间内的平坦密度"
    ],
    "miniDrill": [
      {
        "prompt": "连续模型中一个精确点的概率是多少？",
        "answer": "0。"
      },
      {
        "prompt": "什么几何思想驱动连续均匀？",
        "answer": "长度。"
      }
    ],
    "memoryHook": "平的区间模型，就看长度比。",
    "quickExample": {
      "problem": "如何找到 [a,b] 上均匀分布的 P(c <= X <= d)？",
      "move": "使用间隔长度除以总长度。"
    }
  },

    "prob-exponential": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "指数分布",
    "name": "指数模式",
    "useItWhen": "你在建模“等到下一次到达还要多久”",
    "looksLike": "等待时间、速率 lambda、无记忆连续模型",
    "doThis": "先认出它是在算等待时间，不是在数事件个数，再用速率参数",
    "thinkOfItAs": "泊松的等待时间伙伴",
    "watchOutFor": "将泊松计数与指数等待混合",
    "rememberThis": "泊松计数、指数等待",
    "typicalProblemShapes": [
      "直到下一次呼叫或到达为止的等待时间",
      "无记忆连续模型"
    ],
    "miniDrill": [
      {
        "prompt": "指数计算事件还是时间？",
        "answer": "时间。"
      },
      {
        "prompt": "它的紧密合作伙伴是什么离散分布？",
        "answer": "泊松。"
      }
    ],
    "memoryHook": "指数分布 = 等下一个事件。",
    "quickExample": {
      "problem": "什么故事最适合指数？",
      "move": "距离下一个活动还有时间。"
    }
  },

    "prob-normal-approximation": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "二项式的正态近似",
    "name": "正态近似",
    "useItWhen": "二项分布里 n 很大，而且你想快速估计概率",
    "looksLike": "Bin(n,p)，样本量大，钟形近似",
    "doThis": "匹配平均值和散布，然后用正态曲线近似",
    "thinkOfItAs": "将粗壮的计数曲线换成平滑的钟形",
    "watchOutFor": "当 n 太小或二项式太倾斜时使用它",
    "rememberThis": "大的二项分布常能用正态近似",
    "typicalProblemShapes": [
      "快速近似二项式概率",
      "大样本成功很重要"
    ],
    "miniDrill": [
      {
        "prompt": "正态近似准确吗？",
        "answer": "不，这是一个估计。"
      },
      {
        "prompt": "这里近似的是哪个离散模型？",
        "answer": "二项式。"
      }
    ],
    "memoryHook": "大二项式，常能换成平滑钟形估计。",
    "quickExample": {
      "problem": "二项式什么时候应该开始让你思考正态近似？",
      "move": "当 n 足够大时，钟形估计才有意义。"
    }
  },

    "prob-conditional-distribution": {
    "course": "概率论",
    "chapter": "第 5 章：联合分布与独立性",
    "unit": "联合分布",
    "topic": "条件分布",
    "name": "条件分布",
    "useItWhen": "一个变量被固定后，你想看另一个变量在这个条件下的分布",
    "looksLike": "X 给定 Y = y，条件 PMF，条件密度",
    "doThis": "先把给定信息固定住，再在那个切片里重新归一化",
    "thinkOfItAs": "把联合分布切一刀，再只看那一片",
    "watchOutFor": "条件化以后还继续用原来的总概率",
    "rememberThis": "先条件化，然后再归一化",
    "typicalProblemShapes": [
      "给定 Y = y 求 X",
      "从联合表或密度到条件定律"
    ],
    "miniDrill": [
      {
        "prompt": "条件化通常会把你工作的世界缩小吗？",
        "answer": "是的。"
      },
      {
        "prompt": "条件概率还必须添加什么？",
        "answer": "在那个条件切片里仍然要加到 1。"
      }
    ],
    "memoryHook": "先切片，再归一化。",
    "quickExample": {
      "problem": "当你以 Y = y 为条件时，联合分布会发生什么？",
      "move": "先切出那一片，再在那一片里重新归一化。"
    }
  },

    "prob-conditional-expectation": {
    "course": "概率论",
    "chapter": "第 7 章：协方差与随机变量和的方差",
    "unit": "期望与方差",
    "topic": "条件期望",
    "name": "条件期望",
    "useItWhen": "额外的信息会改变你的最佳平均猜测",
    "looksLike": "E[X|Y]，已知信息后的平均值，塔式法则",
    "doThis": "先在条件成立的那个世界里取平均",
    "thinkOfItAs": "知道新线索之后的平均值",
    "watchOutFor": "把条件期望误当成处处一样的固定数字",
    "rememberThis": "先条件化，再取平均",
    "typicalProblemShapes": [
      "部分信息的期望值",
      "塔式法则和全期望定律问题"
    ],
    "miniDrill": [
      {
        "prompt": "了解更多信息通常会改变平均猜测吗？",
        "answer": "可以。"
      },
      {
        "prompt": "什么操作顺序在这里有帮助？",
        "answer": "条件，然后平均。"
      }
    ],
    "memoryHook": "新信息，新平均。",
    "quickExample": {
      "problem": "用大白话说，E[X|Y] 是什么意思？",
      "move": "Y 已知以后，X 的平均值。"
    }
  },

    "prob-chernoff": {
    "course": "概率论",
    "chapter": "第 8 章：集中不等式导论",
    "unit": "集中与极限定理",
    "topic": "切尔诺夫界限",
    "name": "切尔诺夫束缚",
    "useItWhen": "许多独立指标式变量的总和应保持在其平均值附近",
    "looksLike": "类似二项式和的尾部概率，exp(-c n) 样式界限",
    "doThis": "认识到它是独立求和的更清晰的集中工具",
    "thinkOfItAs": "坚固无大偏差护栏",
    "watchOutFor": "当问题真正为切尔诺夫构建时使用切比雪夫",
    "rememberThis": "独立伯努利和急剧集中",
    "typicalProblemShapes": [
      "二项式求和的大偏差范围",
      "显示随机计数以高概率保持在其平均值附近"
    ],
    "miniDrill": [
      {
        "prompt": "切尔诺夫之前通常出现什么结构？",
        "answer": "独立指标或伯努利总和。"
      },
      {
        "prompt": "切尔诺夫是关于精确概率还是强界限？",
        "answer": "强界限。"
      }
    ],
    "memoryHook": "独立总和很有可能保持接近。",
    "quickExample": {
      "problem": "切尔诺夫通常什么时候比切比雪夫强？",
      "move": "对于独立指标类型变量的总和。"
    }
  },

    "prob-bernoulli-pattern": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "伯努利模式",
    "name": "伯努利模式",
    "useItWhen": "一次试验只有两种结果，例如成功或失败",
    "looksLike": "0 或 1，是或否，一次概率为 p",
    "doThis": "将其视为二项式和指示变量的基本构建块",
    "thinkOfItAs": "一个微小的成功与失败开关",
    "watchOutFor": "当实验有很多次试验时使用伯努利",
    "rememberThis": "伯努利只是一次试验，不是多次",
    "typicalProblemShapes": [
      "单次成功-失败试验",
      "0-1随机变量模型"
    ],
    "miniDrill": [
      {
        "prompt": "伯努利变量可以取多少个值？",
        "answer": "二。"
      },
      {
        "prompt": "伯努利变量是否适合一次试验或多次试验？",
        "answer": "一次试验。"
      }
    ],
    "memoryHook": "一个开关，两种结果。",
    "quickExample": {
      "problem": "什么分布与编码为 1 表示正面、0 表示反面的硬币翻转相匹配？",
      "move": "伯努利。"
    }
  },

    "prob-gamma-pattern": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "Gamma 模式",
    "name": "伽玛模式",
    "useItWhen": "你在连续的时间内等待几个泊松式的到达",
    "whatItMeans": "Gamma 分布描述的是“等到第 r 次到达”为止的连续等待时间。它是指数分布的多次到达版本。",
    "looksLike": "直到第 r 个事件的时间、形状参数、连续等待模型",
    "doThis": "把它认成“指数等待的一般化”：不是等第一次，而是等第 r 次",
    "whyThisMove": "这里还是等待时间故事，不是计数故事。题目一旦说“等到第三次、第四次或第 r 次到达”，就该从指数升级到 Gamma。",
    "thinkOfItAs": "指数分布在等一次，Gamma 在等很多次",
    "watchOutFor": "将其与离散负二项式计数故事混合起来",
    "rememberThis": "Gamma = 等到第 r 次到达的时间",
    "typicalProblemShapes": [
      "等待第三次或第五次到达的时间",
      "等待时间不断累积"
    ],
    "miniDrill": [
      {
        "prompt": "伽马的一次性到达特例是什么？",
        "answer": "指数。"
      },
      {
        "prompt": "gamma 是否计算事件或等待时间？",
        "answer": "等待时间。"
      }
    ],
    "memoryHook": "指数等一，伽玛等多。",
    "quickExample": {
      "problem": "什么连续分布概括了指数等待？",
      "move": "伽玛。"
    }
  },

    "prob-memoryless": {
    "course": "概率论",
    "chapter": "第 4 章：连续随机变量",
    "unit": "随机变量",
    "topic": "无记忆模式",
    "name": "无记忆模式",
    "useItWhen": "题目在问：已经等了这么久，未来的等待会不会因此改变",
    "whatItMeans": "无记忆性表示：即使你已经等了一段时间，剩余等待时间的分布仍和刚开始等待时一样。",
    "looksLike": "P(X > s + t | X > s)、几何分布、指数分布",
    "doThis": "检查条件化后的尾部，看看它是否仍保持原来的形状",
    "whyThisMove": "无记忆的定义就是比较“已经等过以后”的未来尾部，和“从头开始等”的尾部是否同型。如果同型，就说明时钟重置了。",
    "thinkOfItAs": "虽然已经等过了，但时钟像重新开始一样",
    "watchOutFor": "以为所有等待时间模型都有无记忆性",
    "rememberThis": "经典家族里，只有几何和指数是无记忆的",
    "typicalProblemShapes": [
      "已经等了一段时间后，还要再等多久",
      "条件尾概率看起来像重启"
    ],
    "miniDrill": [
      {
        "prompt": "经典离散分布里，哪一个是无记忆的？",
        "answer": "几何分布。"
      },
      {
        "prompt": "经典连续分布里，哪一个是无记忆的？",
        "answer": "指数分布。"
      }
    ],
    "memoryHook": "无记忆 = 时钟重置。",
    "quickExample": {
      "problem": "如果已经等了很久，哪两类经典模型看起来还是像重新开始？",
      "move": "几何分布和指数分布。"
    }
  },

    "prob-independent-rvs": {
    "course": "概率论",
    "chapter": "第 5 章：联合分布与独立性",
    "unit": "联合分布",
    "topic": "独立随机变量",
    "name": "独立随机变量",
    "useItWhen": "联合行为应该分成单独的部分",
    "looksLike": "联合 pmf 可分解、联合密度可分解、知道一个变量也不会改变另一个变量",
    "doThis": "检查联合是否等于边际的乘积",
    "thinkOfItAs": "两个互不干扰的随机故事",
    "watchOutFor": "仅仅因为变量看起来没关系，就直接假设独立",
    "rememberThis": "独立 = 联合分布能拆成乘积",
    "typicalProblemShapes": [
      "联合 pmf 或密度分解",
      "检查两个随机变量是否独立"
    ],
    "miniDrill": [
      {
        "prompt": "在独立条件下 P(X = x, Y = y) 应该等于什么？",
        "answer": "P(X = x) 乘以 P(Y = y)。"
      },
      {
        "prompt": "零协方差总是证明独立性吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "独立时，联合会干净地拆成两块。",
    "quickExample": {
      "problem": "什么是联合表的快速独立性测试？",
      "move": "将联合条目与边际产品进行比较。"
    }
  },

    "prob-sum-independent-rvs": {
    "course": "概率论",
    "chapter": "第 5 章：联合分布与独立性",
    "unit": "联合分布",
    "topic": "独立随机变量的总和",
    "name": "独立随机变量之和",
    "useItWhen": "一个新的随机变量被构建为 X + Y",
    "looksLike": "两个变量的总和，组合分布，卷积感觉",
    "doThis": "把所有能凑出目标总和的配对都收集起来",
    "thinkOfItAs": "收集总数相同的每条路径",
    "watchOutFor": "添加不可能对的概率或忘记所有有效对",
    "rememberThis": "求和分布 = 把所有凑出该总数的配对加起来",
    "typicalProblemShapes": [
      "X + Y 的分布",
      "骰子和式问题"
    ],
    "miniDrill": [
      {
        "prompt": "你要检查一对，还是所有能凑出这个总数的配对？",
        "answer": "每对。"
      },
      {
        "prompt": "为什么独立在这里有帮助？",
        "answer": "它让联合概率可以干净地拆成乘积。"
      }
    ],
    "memoryHook": "和的分布，就是把所有配对路径都收进来。",
    "quickExample": {
      "problem": "如何找到离散自变量的 P(X + Y = 5)？",
      "move": "将两个值总计为 5 的所有联合案例相加。"
    }
  },

    "prob-lotus": {
    "course": "概率论",
    "chapter": "第 6 章：期望的性质",
    "unit": "期望与方差",
    "topic": "函数的期望",
    "name": "随机变量的函数",
    "useItWhen": "你需要 E[g(X)] 而无需首先找到 g(X) 的完整分布",
    "looksLike": "E[g(X)]，期望内的变换变量、平方或指标",
    "doThis": "首先将函数应用于结果，然后用 X 的原始定律求平均",
    "thinkOfItAs": "将函数推入平均值内",
    "watchOutFor": "尝试用 g(E[X]) 替换 E[g(X)]",
    "rememberThis": "对转换后的值求平均值，而不是先求平均值",
    "typicalProblemShapes": [
      "平方值或指标的期望",
      "需要来自原始 pmf 或密度的 E[g(X)]"
    ],
    "miniDrill": [
      {
        "prompt": "E[X 平方] 通常与 E[X] 平方相同吗？",
        "answer": "不。"
      },
      {
        "prompt": "你首先要改变什么：结果还是期望？",
        "answer": "结果。"
      }
    ],
    "memoryHook": "首先是转型，其次是平均。",
    "quickExample": {
      "problem": "如何从 X 的分布中得到 E[X 平方]？",
      "move": "首先对每个值求平方，然后求平均值。"
    }
  },

    "prob-tail-bound-strategy": {
    "course": "概率论",
    "chapter": "第 8 章：集中不等式导论",
    "unit": "集中与极限定理",
    "topic": "尾部绑定策略",
    "name": "尾部绑定策略",
    "useItWhen": "问题需要快速限制远离均值",
    "looksLike": "P(X 大)，偏差界限，非精确概率",
    "doThis": "选择适合你实际拥有的信息的最粗略的界限",
    "thinkOfItAs": "选择正确的锤子：仅均值、方差或强独立性",
    "watchOutFor": "当问题只需要一个界限时，追求精确的分布",
    "rememberThis": "马尔可夫使用均值，切比雪夫使用方差，切尔诺夫使用独立性",
    "typicalProblemShapes": [
      "快速尾部概率上限",
      "在马尔可夫、切比雪夫和切尔诺夫之间选择"
    ],
    "miniDrill": [
      {
        "prompt": "切比雪夫比马尔可夫有什么额外的成分？",
        "answer": "方差。"
      },
      {
        "prompt": "什么样的结构通常使切尔诺夫成为这里的最佳选择？",
        "answer": "独立伯努利型和。"
      }
    ],
    "memoryHook": "均值、方差、独立性：选择你的界限。",
    "quickExample": {
      "problem": "什么界限只使用非负性和期望？",
      "move": "马尔可夫。"
    }
  },

    "prob-standardize-clt": {
    "course": "概率论",
    "chapter": "第 9 章：中心极限定理",
    "unit": "集中与极限定理",
    "topic": "CLT 标准化",
    "name": "CLT 标准化",
    "useItWhen": "总和或样本均值需要正态近似设置",
    "looksLike": "减去平均值，除以标准差，z 式表达式",
    "doThis": "先居中，再缩放，然后使用普通图片",
    "thinkOfItAs": "将杂乱的总和变成标准的钟表版本",
    "watchOutFor": "忘记除以正确的差值以获得总和或平均值",
    "rememberThis": "CLT 从中心和比例开始",
    "typicalProblemShapes": [
      "样本均值或总和的正态近似",
      "在使用 CLT 之前设置 z 样式变量"
    ],
    "miniDrill": [
      {
        "prompt": "你在使用普通表格想法之前还是之后进行标准化？",
        "answer": "前。"
      },
      {
        "prompt": "简而言之，标准化有什么作用？",
        "answer": "居中并重新缩放随机数量。"
      }
    ],
    "memoryHook": "居中、缩放，然后是钟形曲线。",
    "quickExample": {
      "problem": "前两个 CLT 准备动作是什么？",
      "move": "减去平均值并除以标准差。"
    }
  },
};
