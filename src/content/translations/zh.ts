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

export const zhCourseContent: Record<string, LocalizedCourseText> = {
  "calc-1": {
    "title": "单变量微积分 1",
    "shortDescription": "给需要先看题型和步骤的学生做的快速单变量微积分复习。",
    "units": [
      "极限",
      "导数",
      "应用",
      "积分",
      "积分应用"
    ],
    "chapters": [
      "第 1 章：函数与极限",
      "第 2 章：导数",
      "第 3 章：导数的应用",
      "第 4 章：积分",
      "第 5 章：积分的应用"
    ]
  },
  "calc-2": {
    "title": "单变量微积分 2",
    "shortDescription": "积分技巧、参数与极坐标，以及单变量级数识别。",
    "units": [
      "反函数、指数与对数函数",
      "积分技巧",
      "应用与曲线",
      "微分方程",
      "数列与级数"
    ],
    "chapters": [
      "第 6 章：反函数、指数与对数函数",
      "第 7 章：积分技巧",
      "第 8 章：积分的更多应用",
      "第 9 章：微分方程",
      "第 10 章：参数方程与极坐标",
      "第 11 章：数列、级数与幂级数"
    ]
  },
  "calc-3": {
    "title": "多元微积分",
    "shortDescription": "向量、偏导数、重积分和多元微积分。",
    "units": [
      "向量与三维空间",
      "向量函数",
      "偏导数",
      "重积分",
      "向量分析"
    ],
    "chapters": [
      "第 12 章：向量与空间几何",
      "第 13 章：向量函数",
      "第 14 章：偏导数",
      "第 15 章：重积分",
      "第 16 章：向量分析"
    ]
  },
  "linear-algebra": {
    "title": "线性代数",
    "shortDescription": "把矩阵、向量空间和特征值概念压缩成识别优先的第一步。",
    "units": [
      "线性方程组与行化简",
      "矩阵",
      "行列式",
      "向量空间",
      "正交性",
      "线性变换与特征值"
    ],
    "chapters": [
      "第 1 章：线性方程组与行化简",
      "第 2 章：矩阵代数",
      "第 3 章：行列式",
      "第 4 章：向量空间",
      "第 5 章：正交性",
      "第 6 章：特征值与线性变换"
    ]
  },
  "intro-proof": {
    "title": "抽象数学导论",
    "shortDescription": "逻辑、证明模式、集合、归纳法与抽象数学写作基础。",
    "units": [
      "证明基础",
      "逻辑与量词",
      "集合与函数",
      "数论基础",
      "数学归纳法",
      "集合论 II",
      "关系与基数"
    ],
    "chapters": [
      "第 1 章：范式转变",
      "第 2 章：逻辑与证明语言",
      "第 3 章：集合与函数",
      "第 4 章：整除与欧几里得算法",
      "第 5 章：数学归纳法与良序原理",
      "第 6 章：集合论 II",
      "第 7 章：关系与划分",
      "第 8 章：无限集合的基数"
    ]
  },
  "probability": {
    "title": "概率论",
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
  "intuitive-limit": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "极限的直观想法",
    "name": "直观的极限理念",
    "useItWhen": "你关心输出的走向",
    "looksLike": "当 x 变为数字时的图形、表格或 lim",
    "doThis": "从左、右看并命名目标值",
    "thinkOfItAs": "走到一扇门前，但没有跨过门",
    "watchOutFor": "在该点与在该点附近混合",
    "rememberThis": "极限是关于接近，而不是在",
    "typicalProblemShapes": [
      "图表询问曲线接近 x = a 时的 y 值",
      "表格显示了两侧接近数字的 x 值"
    ],
    "miniDrill": [
      {
        "prompt": "如果左边到4，右边到4，极限存在吗？",
        "answer": "是的。双方都同意4。"
      },
      {
        "prompt": "如果 f(2) = 9 但附近的值接近 5，那么当 x 接近 2 时，极限是多少？",
        "answer": "5. 点值不受限制。"
      }
    ],
    "memoryHook": "接近要点，而不是要点。",
    "quickExample": {
      "problem": "当 x 接近 3 时，x^2 接近多少？",
      "move": "输出指向 9。"
    }
  },
  "direct-substitution": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "直接替代",
    "name": "直接替代",
    "useItWhen": "插入不会破坏任何东西",
    "looksLike": "楼下没有零的多项式或干净分数",
    "doThis": "先插上",
    "thinkOfItAs": "在寻找侧门之前尝试前门",
    "watchOutFor": "获取 0/0 并仍在尝试插入",
    "rememberThis": "没有中断意味着只需插入",
    "typicalProblemShapes": [
      "像 x^3 - 4x + 7 这样的多项式",
      "目标处分母不为零的有理表达式"
    ],
    "miniDrill": [
      {
        "prompt": "尝试 (x^2 + 5x)/(x + 4) 中 x = 1。首先会发生什么？",
        "answer": "它仍然合法，因此直接替换是有效的。"
      },
      {
        "prompt": "你插入并得到 0/0。保持直接替换还是切换？",
        "answer": "转变。 0/0表示先简化。"
      }
    ],
    "memoryHook": "无需中断，只需插入即可。",
    "quickExample": {
      "problem": "当 x 接近 x^2 + 1 的 2 时的极限",
      "move": "插入 2 并获得 5。"
    }
  },
  "factoring-0-0": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "因式分解去除 0/0",
    "name": "因式分解 0/0",
    "useItWhen": "插入给出 0/0，你可以因式分解",
    "looksLike": "(x^2 - 9)/(x - 3) 或另一个可因式分解的分数",
    "doThis": "因素，取消共享件，然后插入",
    "thinkOfItAs": "在尝试将卡住的夹克拉开之前先将其拉开",
    "watchOutFor": "取消相加而不是相乘的项",
    "rememberThis": "0/0 通常意味着先简化",
    "typicalProblemShapes": [
      "顶部或底部的正方形差异",
      "插入之前可以分解的二次方程或多项式"
    ],
    "miniDrill": [
      {
        "prompt": "从多项式分数中可以得到 0/0。第一个动作？",
        "answer": "寻找保理。"
      },
      {
        "prompt": "因式分解后可以从 x^2 - 4 中取消 x - 2 吗？",
        "answer": "是的，因为 x^2 - 4 变成 (x - 2)(x + 2)。"
      }
    ],
    "memoryHook": "零超过零意味着清理它。",
    "quickExample": {
      "problem": "x 接近 (x^2 - 9)/(x - 3) 中的 3 时的极限",
      "move": "对 (x - 3)(x + 3) 进行因式分解，取消，然后代入 3 得到 6。"
    }
  },
  "rationalizing": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "合理化",
    "name": "合理化限制",
    "useItWhen": "插入时给出 0/0 并涉及根",
    "looksLike": "(sqrt(x + 5) - 3)/(x - 4)",
    "doThis": "乘以结合物，将其清理干净，然后插入",
    "thinkOfItAs": "使用镜像使根消失",
    "watchOutFor": "共轭中的符号错误",
    "rememberThis": "自由基常常需要共轭物",
    "typicalProblemShapes": [
      "平方根减去或加上分子中的数字",
      "在目标点变成 0/0 的根表达式"
    ],
    "miniDrill": [
      {
        "prompt": "sqrt(x + 2) - 5 的共轭是多少？",
        "answer": "开方(x + 2) + 5"
      },
      {
        "prompt": "代入得到 0/0 并且有一个平方根。最好的工具？",
        "answer": "用共轭合理化。"
      }
    ],
    "memoryHook": "根如镜动。",
    "quickExample": {
      "problem": "当 x 接近 (sqrt(x + 5) - 3)/(x - 4) 的 4 时的限制",
      "move": "乘以 sqrt(x + 5) + 3，化简，然后代入 4。"
    }
  },
  "infinite-limits": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "无限极限",
    "name": "无限极限",
    "useItWhen": "输出在接近一个 x 值时爆炸",
    "looksLike": "1/(x - 2)、1/(x - 2)^2、垂直渐近线",
    "doThis": "检查两侧的标志并决定向上或向下",
    "thinkOfItAs": "图表沿着垂直墙向上或向下移动",
    "watchOutFor": "假设双方做同样的事情",
    "rememberThis": "分母小，产出大",
    "typicalProblemShapes": [
      "分母趋近于零的分数",
      "关于垂直渐近线和单边行为的问题"
    ],
    "miniDrill": [
      {
        "prompt": "当 x 从左边接近 2 时，x - 2 是正数还是负数？",
        "answer": "消极的。"
      },
      {
        "prompt": "如果分母是很小的负数，那么 1 除以该数会发生什么？",
        "answer": "它可以下降到负无穷大。"
      }
    ],
    "memoryHook": "楼下接近零意味着楼上混乱。",
    "quickExample": {
      "problem": "当 x 从右侧接近 2 时，1/(x - 2) 会发生什么？",
      "move": "分母很小的正值，因此输出变为正无穷大。"
    }
  },
  "limits-at-infinity": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "无穷大极限",
    "name": "无穷大极限",
    "useItWhen": "x 向左或向右",
    "looksLike": "多项式的比率，如 (3x^2 + 1)/(x^2 - 4)",
    "doThis": "忽略小事，比较最大的力量",
    "thinkOfItAs": "房间里最响亮的词语淹没了其余的词语",
    "watchOutFor": "让小常数分散你的注意力",
    "rememberThis": "最大的力量最终获胜",
    "typicalProblemShapes": [
      "x 趋于无穷大的多项式比率",
      "询问图形的水平行为的问题"
    ],
    "miniDrill": [
      {
        "prompt": "在无穷远，x^3 和 7x 哪个更重要？",
        "answer": "x^3 占主导地位。"
      },
      {
        "prompt": "顶部度数小于底部度数。达到极限通常会发生什么？",
        "answer": "通常会变成 0。"
      }
    ],
    "memoryHook": "在边缘，最高功率驱动。",
    "quickExample": {
      "problem": "x 接近 (3x^2 + 1)/(x^2 - 4) 无穷大时的极限",
      "move": "顶部和底部的度数相同，因此极限为 3/1。"
    }
  },
  "continuity": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "连续性",
    "name": "连续性",
    "useItWhen": "你需要检查一下是否有休息时间",
    "looksLike": "带有孔、跳跃、角点或分段定义的图形",
    "doThis": "检查已定义、限制是否存在且两者匹配",
    "thinkOfItAs": "没有间隙、跳跃或缺少木板的道路",
    "watchOutFor": "检查图片但不检查点值",
    "rememberThis": "连续意味着该点没有撕裂",
    "typicalProblemShapes": [
      "在某一点切换公式的分段函数",
      "带有空洞、跳跃或垂直渐近线的图"
    ],
    "miniDrill": [
      {
        "prompt": "如果左极限和右极限不一致，函数在那里连续吗？",
        "answer": "不。该限制不存在。"
      },
      {
        "prompt": "如果极限是4，f(1)也是4，那还需要什么呢？",
        "answer": "该函数必须在 x = 1 处定义，在本例中就是如此。"
      }
    ],
    "memoryHook": "已定义、限制存在、值匹配。",
    "quickExample": {
      "problem": "函数在 x = 2 处有一个洞，即使两边都接近 5。",
      "move": "它在 x = 2 处不连续，除非那里的函数值也是 5。"
    }
  },
  "derivative-slope-rate": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "导数作为斜率和变化率",
    "name": "导数 = 斜率 / 比率",
    "useItWhen": "你想要现在的坡度或者现在的速度",
    "looksLike": "f'(x)、dy/dx、切线斜率、速度",
    "doThis": "将其解读为“立即改变”",
    "thinkOfItAs": "车速表而不是整个公路旅行",
    "watchOutFor": "将平均变化与瞬时变化混合起来",
    "rememberThis": "导数意味着现在有多快",
    "typicalProblemShapes": [
      "诸如“立即”、“切线”、“立即倾斜”或“立即评分”之类的词",
      "位置、成本、温度或人口随投入而变化"
    ],
    "miniDrill": [
      {
        "prompt": "导数描述的是割线还是切线？",
        "answer": "一条切线。"
      },
      {
        "prompt": "如果 f'(3) 为负，则图形在那里是上升还是下降？",
        "answer": "坠落。"
      }
    ],
    "memoryHook": "导数=当前速度。",
    "quickExample": {
      "problem": "如果 s(t) 是位置，那么 s'(t) 是什么意思？",
      "move": "瞬时速度。"
    }
  },
  "derivative-definition": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "定义的导数",
    "name": "定义的导数",
    "useItWhen": "问题说使用定义",
    "looksLike": "当 h 接近 [f(x + h) - f(x)] / h 0 时的极限",
    "doThis": "构建它，扩展它，取消，然后让 h 变为 0",
    "thinkOfItAs": "以越来越小的割线步长进行放大",
    "watchOutFor": "简化前代入 h = 0",
    "rememberThis": "先化简，再取极限",
    "typicalProblemShapes": [
      "已经写下的显式差商",
      "提示仅使用限制定义"
    ],
    "miniDrill": [
      {
        "prompt": "展开 f(x + h) - f(x) 后通常会抵消什么？",
        "answer": "原始 f(x) 项。"
      },
      {
        "prompt": "你什么时候最终让h变成0？",
        "answer": "将商简化到足以避免 0/0 后。"
      }
    ],
    "memoryHook": "扩大、取消、分割、限制。",
    "quickExample": {
      "problem": "根据定义求 x^2 的导数。",
      "move": "展开(x + h)^2，取消，除以h，然后让h变为0。"
    }
  },
  "power-rule": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "权力法则",
    "name": "幂律",
    "useItWhen": "你看到 x 的幂",
    "looksLike": "x^5、x^-2、x^(1/3)",
    "doThis": "降低功率，然后将其降低 1",
    "thinkOfItAs": "指数下降，一个被剃掉",
    "watchOutFor": "认为它只适用于好的整数",
    "rememberThis": "前面，减一",
    "typicalProblemShapes": [
      "以 x 为底的普通幂项",
      "由多个幂规则项构建的多项式"
    ],
    "miniDrill": [
      {
        "prompt": "x^-3 的导数？",
        "answer": "-3x^-4"
      },
      {
        "prompt": "sqrt(x) 的导数写成 x^(1/2)？",
        "answer": "二分之一x^-1/2"
      }
    ],
    "memoryHook": "把它降下来，降一个。",
    "quickExample": {
      "problem": "x^7 的导数",
      "move": "7x^6"
    }
  },
  "constant-rule": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "不变的规则",
    "name": "恒定规则",
    "useItWhen": "术语中没有 x",
    "looksLike": "7、pi、-12 或任何固定数字",
    "doThis": "将常数项变为 0",
    "thinkOfItAs": "零倾斜的平坦线",
    "watchOutFor": "将系数视为不附加 x 的常数",
    "rememberThis": "常数消失",
    "typicalProblemShapes": [
      "多项式中的独立数",
      "求一个固定值的导数的问题"
    ],
    "miniDrill": [
      {
        "prompt": "-4 的导数？",
        "answer": "0"
      },
      {
        "prompt": "5x^2 + 8 中哪一部分变成了 0？",
        "answer": "8."
      }
    ],
    "memoryHook": "平线，零斜率。",
    "quickExample": {
      "problem": "9 的导数",
      "move": "0"
    }
  },
  "sum-difference-rules": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "和与差规则",
    "name": "和与差规则",
    "useItWhen": "添加或减少项",
    "looksLike": "x^3 + 4x - 7 或 2x^5 - sqrt(x)",
    "doThis": "区分每个术语并保留符号",
    "thinkOfItAs": "分别对每个术语评分，然后将分数相加",
    "watchOutFor": "去掉负号",
    "rememberThis": "逐项作品",
    "typicalProblemShapes": [
      "多项式多项式",
      "各部分通过加号或减号连接的混合表达式"
    ],
    "miniDrill": [
      {
        "prompt": "您需要 x^2 + x^5 的乘积规则吗？",
        "answer": "不。逐个区分。"
      },
      {
        "prompt": "-3x^2 的导数应该保留什么符号？",
        "answer": "消极的。"
      }
    ],
    "memoryHook": "分割术语，而不是符号。",
    "quickExample": {
      "problem": "x^3 + 4x - 7 的导数",
      "move": "3x^2 + 4"
    }
  },
  "product-rule": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "产品规则",
    "name": "产品规则",
    "useItWhen": "两个变化的部分相乘",
    "looksLike": "(x^2 + 1)(x^3 - 4) 或 x sin x",
    "doThis": "第一素数第二加上第一第二素数",
    "thinkOfItAs": "两个棋子都在移动，所以两个棋子都会轮流",
    "watchOutFor": "将导数相乘",
    "rememberThis": "第一个素数第二个加上第一个第二素数",
    "typicalProblemShapes": [
      "两个相邻的可见因素",
      "代数部分乘以三角或指数部分"
    ],
    "miniDrill": [
      {
        "prompt": "哪条规则适合 x(x^2 + 4)？",
        "answer": "产品规则。"
      },
      {
        "prompt": "乘积规则中，微分后出现了多少项？",
        "answer": "两个术语。"
      }
    ],
    "memoryHook": "两者的改变都意味着两者都会被计算在内。",
    "quickExample": {
      "problem": "x^2 sin x 的导数",
      "move": "2x sin x + x^2 cos x"
    }
  },
  "quotient-rule": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "商规则",
    "name": "商规则",
    "useItWhen": "一件正在改变的事情压倒了另一件事",
    "looksLike": "(x^2 + 1)/(x - 3)",
    "doThis": "低 d-高减去高 d-低，总低的平方",
    "thinkOfItAs": "顶部和底部交易触及，底部保持平方",
    "watchOutFor": "翻转顺序并更改符号",
    "rememberThis": "低 d-高减去高 d-低除以低的平方",
    "typicalProblemShapes": [
      "分子和分母为 x 的分数",
      "顶部和底部均发生变化的有理函数"
    ],
    "miniDrill": [
      {
        "prompt": "哪个在顶部第一个：分母乘以分子导数，还是相反？",
        "answer": "分母乘以分子的导数。"
      },
      {
        "prompt": "商规则中的分母会发生什么变化？",
        "answer": "它得到平方。"
      }
    ],
    "memoryHook": "低 d-高、高 d-低、低平方。",
    "quickExample": {
      "problem": "(x^2 + 1)/(x - 3) 的导数",
      "move": "使用低 d-high 减去高 d-low，然后除以 (x - 3)^2。"
    }
  },
  "chain-rule": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "链式法则",
    "name": "链式法则",
    "useItWhen": "一个函数在另一个函数内部",
    "looksLike": "(3x^2 + 1)^5、sin(x^3)、e^(2x)",
    "doThis": "做外侧，保留内侧，然后乘以内侧素数",
    "thinkOfItAs": "一层一层地剥洋葱皮",
    "watchOutFor": "忘记内导数",
    "rememberThis": "先外，后内",
    "typicalProblemShapes": [
      "多项式的幂",
      "内部包含另一个表达式的三角函数、指数函数或对数函数"
    ],
    "miniDrill": [
      {
        "prompt": "哪条规则适合 sin(x^4)？",
        "answer": "链式法则。"
      },
      {
        "prompt": "对 (x^2 + 3)^7 的外面求导后，还一定会发生什么？",
        "answer": "乘以 x^2 + 3 的导数。"
      }
    ],
    "memoryHook": "由外而内，然后相乘。",
    "quickExample": {
      "problem": "(3x^2 + 1)^5 的导数",
      "move": "5(3x^2 + 1)^4 乘以 6x"
    }
  },
  "implicit-differentiation": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "隐式微分",
    "name": "隐式微分",
    "useItWhen": "x 和 y 混合且 y 不单独",
    "looksLike": "x^2 + y^2 = 25 或 xy + y^3 = 7",
    "doThis": "两边微分，将 y 素数附加到 y 项上，求解 y 素数",
    "thinkOfItAs": "将 y-prime 从人群中拉出来",
    "watchOutFor": "忘记 y 项上的 y 素数",
    "rememberThis": "两边微分并求解 y 素数",
    "typicalProblemShapes": [
      "定义曲线的方程，不明确 y = ... 形式",
      "涉及 y 的产品或权力"
    ],
    "miniDrill": [
      {
        "prompt": "y^3 关于 x 的导数？",
        "answer": "3年^2年'"
      },
      {
        "prompt": "隐式微分后，最后的代数步骤通常会出现什么？",
        "answer": "解决你。"
      }
    ],
    "memoryHook": "区分一切，拯救 y-prime。",
    "quickExample": {
      "problem": "微分 x^2 + y^2 = 25",
      "move": "2x + 2y y' = 0，然后求解 y'。"
    }
  },
  "logarithmic-differentiation": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "对数微分",
    "name": "对数微分",
    "useItWhen": "幂或指数变得奇怪",
    "looksLike": "y = x^x 或 y = (x^2 + 1)^x",
    "doThis": "取ln，展开，然后微分",
    "thinkOfItAs": "将缠结的结变成单独的绳子",
    "watchOutFor": "忘记 ln(y) 会变成 y 上的 y 素数",
    "rememberThis": "当指数变得奇怪时先取 ln",
    "typicalProblemShapes": [
      "指数中的变量，如 x^x",
      "大乘积或商的幂"
    ],
    "miniDrill": [
      {
        "prompt": "y = x^x 的第一步是什么？",
        "answer": "取两边的 ln。"
      },
      {
        "prompt": "对 ln(y) 求导后，左边出现什么？",
        "answer": "y'/y"
      }
    ],
    "memoryHook": "奇怪的指数？先记录一下吧",
    "quickExample": {
      "problem": "微分 y = x^x",
      "move": "使用 ln(y) = x ln x，微分，然后解回 y'。"
    }
  },
  "higher-derivatives": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "更高的导数",
    "name": "高阶导数",
    "useItWhen": "他们要求第二次、第三次或更多",
    "looksLike": "f''(x), y'', d^3y/dx^3",
    "doThis": "再次微分，直到找到正确的顺序",
    "thinkOfItAs": "逐层求导",
    "watchOutFor": "一阶导数后停止",
    "rememberThis": "如果他们再次询问，请再次准备",
    "typicalProblemShapes": [
      "双素数或二阶导数的表示法",
      "凹度或加速度问题"
    ],
    "miniDrill": [
      {
        "prompt": "如果 s(t) 是位置，那么 s''(t) 是什么？",
        "answer": "加速。"
      },
      {
        "prompt": "您是否重用原始函数或一阶导数来找到 f''？",
        "answer": "使用一阶导数。"
      }
    ],
    "memoryHook": "对导数进行微分。",
    "quickExample": {
      "problem": "如果 f(x) = x^4，那么 f''(x) 是多少？",
      "move": "一阶导数为 4x^3，二阶导数为 12x^2。"
    }
  },
  "tangent-line": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "切线",
    "name": "切线",
    "useItWhen": "你需要一条与曲线在某一点相匹配的线",
    "looksLike": "求 y = f(x) 在 x = a 处的切线",
    "doThis": "找到点，从导数得到斜率，写出直线",
    "thinkOfItAs": "一瞬间与曲线方向相匹配的线",
    "watchOutFor": "使用 x = a 作为斜率",
    "rememberThis": "点加上导数斜率得出直线",
    "typicalProblemShapes": [
      "曲线上的点和单词切线",
      "要求在某一点进行线性化的提示"
    ],
    "miniDrill": [
      {
        "prompt": "切线斜率由什么给出：f(a) 或 f'(a)？",
        "answer": "f'(a)"
      },
      {
        "prompt": "得到斜率和点后，哪种直线公式最快？",
        "answer": "点斜形式。"
      }
    ],
    "memoryHook": "导数的斜率，点的线。",
    "quickExample": {
      "problem": "求 y = x^2 在 x = 2 处的切线",
      "move": "点为 (2, 4)，斜率为 4，因此 y - 4 = 4(x - 2)。"
    }
  },
  "normal-line": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "正常线",
    "name": "法线",
    "useItWhen": "你需要垂直于切线的线",
    "looksLike": "求 x = a 处的法线",
    "doThis": "找到切线斜率，翻转它，改变符号，写下直线",
    "thinkOfItAs": "切线的侧面伙伴",
    "watchOutFor": "忘记负的倒数",
    "rememberThis": "正常斜率是负倒数",
    "typicalProblemShapes": [
      "用“法线”一词代替的切线问题",
      "请求在一点处与曲线垂直的线"
    ],
    "miniDrill": [
      {
        "prompt": "如果切线斜率为-3，那么法线斜率是多少？",
        "answer": "1/3"
      },
      {
        "prompt": "还需要曲线上的点作为法线吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "翻转，改变符号，使用相同的点。",
    "quickExample": {
      "problem": "如果切线斜率为 2，则正常斜率是多少？",
      "move": "-1/2"
    }
  },
  "increasing-decreasing": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "增加和减少",
    "name": "增加/减少",
    "useItWhen": "你需要图表上升或下降的位置",
    "looksLike": "找出增加和减少的区间",
    "doThis": "制作 f 素数符号图",
    "thinkOfItAs": "绿灯上升，红灯下降",
    "watchOutFor": "使用 f 代替 f-prime 作为符号图",
    "rememberThis": "f-素数正数表示增加",
    "typicalProblemShapes": [
      "关于图表上升或下降位置的区间问题",
      "导数符号图或临界点表"
    ],
    "miniDrill": [
      {
        "prompt": "如果 f'(x) > 0，图形是向上还是向下？",
        "answer": "向上。"
      },
      {
        "prompt": "符号图间隔通常在哪里开始和结束？",
        "answer": "在 f' 未定义的关键点和地方。"
      }
    ],
    "memoryHook": "正质数向上，负质数向下。",
    "quickExample": {
      "problem": "如果 f'(x) 在 (1, 4) 上为负，那么 f 在那里做什么？",
      "move": "它在 (1, 4) 上减少。"
    }
  },
  "local-max-min": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "局部最大值和最小值",
    "name": "局部最大/最小",
    "useItWhen": "你想要附近的山峰和山谷",
    "looksLike": "找到局部极值或转折点",
    "doThis": "找到关键点，然后围绕它们进行测试",
    "thinkOfItAs": "短途徒步的山顶和山谷",
    "watchOutFor": "无需测试即可将每个关键点称为最大值或最小值",
    "rememberThis": "首先是临界点，其次是决策",
    "typicalProblemShapes": [
      "关于转折点的问题",
      "关键点后进行符号或二阶导数测试"
    ],
    "miniDrill": [
      {
        "prompt": "f' 中从正到负。最大还是最小？",
        "answer": "局部最大值"
      },
      {
        "prompt": "f' 中的负数变为正数。最大还是最小？",
        "answer": "当地最小值"
      }
    ],
    "memoryHook": "找到关键点，然后阅读转弯。",
    "quickExample": {
      "problem": "在临界点，f'由正值变为负值。它是什么？",
      "move": "局部最大值。"
    }
  },
  "concavity": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "凹",
    "name": "凹",
    "useItWhen": "你需要图表的弯曲",
    "looksLike": "上凹、下凹或二阶导数符号问题",
    "doThis": "检查 f-double-prime：加号为上，减号为下",
    "thinkOfItAs": "微笑与皱眉",
    "watchOutFor": "使用 f-prime 代替 f-double-prime",
    "rememberThis": "二阶导数表示弯曲",
    "typicalProblemShapes": [
      "关于曲率或弯曲的问题",
      "已以函数或符号图形式给出的二阶导数"
    ],
    "miniDrill": [
      {
        "prompt": "如果 f''(x) < 0，微笑还是皱眉？",
        "answer": "皱眉。凹下去。"
      },
      {
        "prompt": "哪个导数控制凹度？",
        "answer": "二阶导数。"
      }
    ],
    "memoryHook": "二阶导数 = 微笑或皱眉。",
    "quickExample": {
      "problem": "如果在某个区间上 f''(x) > 0，则图形是什么形状？",
      "move": "凹上去。"
    }
  },
  "inflection-points": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "拐点",
    "name": "拐点",
    "useItWhen": "你需要弯曲翻转的地方",
    "looksLike": "寻找可能的拐点",
    "doThis": "找到 f-double-prime 问题点，然后检查符号变化",
    "thinkOfItAs": "弯曲翻转的地方",
    "watchOutFor": "把每一个零称为拐点",
    "rememberThis": "仅当弯曲发生变化时才计数",
    "typicalProblemShapes": [
      "二阶导数等于零，然后进行符号检查",
      "从皱眉到微笑的图表"
    ],
    "miniDrill": [
      {
        "prompt": "f''(a) = 0 本身就足够了吗？",
        "answer": "不，凹度必须改变。"
      },
      {
        "prompt": "您围绕候选点测试什么？",
        "answer": "每边都有 f'' 符号。"
      }
    ],
    "memoryHook": "零是一个可能。符号变化就是证据。",
    "quickExample": {
      "problem": "如果 f'' 在 x = 1 处从负值变为正值，那么会发生什么？",
      "move": "x = 1 处存在拐点。"
    }
  },
  "first-derivative-test": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "一阶导数测试",
    "name": "一阶导数测试",
    "useItWhen": "你想要 f 素数符号的最大值或最小值",
    "looksLike": "围绕关键数字的符号图",
    "doThis": "检查该点左侧和右侧的 f 素数",
    "thinkOfItAs": "观察十字路口前后的交通情况",
    "watchOutFor": "仅测试点本身而不是附近的间隔",
    "rememberThis": "标志开关讲述故事",
    "typicalProblemShapes": [
      "关键数字随后进行区间测试",
      "f 素数的符号表"
    ],
    "miniDrill": [
      {
        "prompt": "f' 中从正到负。最大还是最小？",
        "answer": "局部最大值"
      },
      {
        "prompt": "f' 中没有符号变化。会发生什么？",
        "answer": "该点可能既不是最大值也不是最小值。"
      }
    ],
    "memoryHook": "阅读标志开关，而不仅仅是要点。",
    "quickExample": {
      "problem": "f' 在 x = 2 附近从负值变为正值。x = 2 是多少？",
      "move": "局部最小值。"
    }
  },
  "second-derivative-test": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "二阶导数测试",
    "name": "二阶导数检验",
    "useItWhen": "你已经有了一个临界点并想要快速检查",
    "looksLike": "找到 f'(c) = 0，然后检查 f''(c)",
    "doThis": "将 c 代入 f-双素数：加最小值，减最大值",
    "thinkOfItAs": "让弯道决定转弯",
    "watchOutFor": "当 f-double-prime 为 0 时使用它",
    "rememberThis": "二阶导数仅在不为零时才决定",
    "typicalProblemShapes": [
      "已从 f' = 0 找到临界点",
      "要求一阶导数测试的更快替代方案的问题"
    ],
    "miniDrill": [
      {
        "prompt": "如果在临界点 f''(c) < 0，c 是多少？",
        "answer": "局部最大值"
      },
      {
        "prompt": "如果 f''(c) = 0，二阶导数检验说明了什么？",
        "answer": "没有什么确定的。使用另一个测试。"
      }
    ],
    "memoryHook": "正碗=最小。负上限 = 最大值",
    "quickExample": {
      "problem": "在临界点 c，f''(c) = 5。最大值还是最小值？",
      "move": "局部最小值。"
    }
  },
  "optimization": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "优化",
    "name": "优化",
    "useItWhen": "问题表示最大、最小、最便宜或最好",
    "looksLike": "最大化面积、最小化成本、优化体积",
    "doThis": "编写一变量目标，区分，测试获胜者",
    "thinkOfItAs": "将混乱的文字变成一座干净的山丘或山谷",
    "watchOutFor": "在得到一个变量之前进行微分",
    "rememberThis": "首先一个变量，第二个优化",
    "typicalProblemShapes": [
      "最大化、最小化、最多、最小、最短、最大等单词",
      "有约束的几何或商业应用题"
    ],
    "miniDrill": [
      {
        "prompt": "在进行微分之前，您的目标函数应该有多少个变量？",
        "answer": "一。"
      },
      {
        "prompt": "找到临界点之后，你就完成了吗？",
        "answer": "不。您仍然需要确认它提供最佳价值。"
      }
    ],
    "memoryHook": "写入一个变量，然后寻找峰值或谷值。",
    "quickExample": {
      "problem": "长方形有固定的周长。你应该优化什么？",
      "move": "使用一个变量写入面积，然后对该面积函数进行微分。"
    }
  },
  "related-rates": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "相关价格",
    "name": "相关价格",
    "useItWhen": "一些变化的事物与时间联系在一起",
    "looksLike": "半径随着体积变化而增大，或者梯子随着高度变化而滑动",
    "doThis": "写出方程，对时间求微分，然后代入",
    "thinkOfItAs": "所有变量在一个时钟上一起移动",
    "watchOutFor": "过早插入数字",
    "rememberThis": "先求微分，然后代入矩",
    "typicalProblemShapes": [
      "给定 dx/dt 或 dV/dt 等速率",
      "值随时间变化的几何公式"
    ],
    "miniDrill": [
      {
        "prompt": "您通常是在相关比率的隐式微分之前还是之后插入数字？",
        "answer": "后。"
      },
      {
        "prompt": "如果两个变量取决于时间，那么每个变量通常会出现什么导数？",
        "answer": "类似于 dx/dt 或 dy/dt 的比率。"
      }
    ],
    "memoryHook": "区分时间，然后定格那一刻。",
    "quickExample": {
      "problem": "气球半径随着时间和体积的变化而变化。您应该对什么变量进行微分？",
      "move": "时间。"
    }
  },
  "linear-approximation": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "线性近似",
    "name": "线性近似",
    "useItWhen": "您需要在一个不错的点附近进行快速估计",
    "looksLike": "近似 sqrt(4.1) 或估计 x = a 附近的函数",
    "doThis": "使用切线公式",
    "thinkOfItAs": "使用曲线的局部直线版本",
    "watchOutFor": "选择一个不接近的基点",
    "rememberThis": "靠近a，使用切线",
    "typicalProblemShapes": [
      "近似一个好的数字附近的函数值",
      "提及局部线性化或切线估计的提示"
    ],
    "miniDrill": [
      {
        "prompt": "为了估计 sqrt(4.1)，a 应该是 1、4 还是 9？",
        "answer": "4、因为亲近，容易。"
      },
      {
        "prompt": "x = a 时线性近似需要哪两个成分？",
        "answer": "f(a) 和 f'(a)。"
      }
    ],
    "memoryHook": "在一个好的点附近，使用切线。",
    "quickExample": {
      "problem": "使用 a = 4 估计 sqrt(4.1)",
      "move": "使用 x = 4 处 sqrt(x) 的切线。"
    }
  },
  "antiderivative-idea": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "反派生思想",
    "name": "反派生思想",
    "useItWhen": "你想要撤消导数",
    "looksLike": "求一个导数为 6x 或 cos x 的函数",
    "doThis": "询问什么功能可以区分这个",
    "thinkOfItAs": "向后运行衍生电影",
    "watchOutFor": "忘记了不变的家人",
    "rememberThis": "反导数意味着反转导数",
    "typicalProblemShapes": [
      "提示询问导数已知的函数",
      "正式符号出现之前的早期积分问题"
    ],
    "miniDrill": [
      {
        "prompt": "如果导数是 4x^3，什么函数族可以工作？",
        "answer": "x^4 加一个常数。"
      },
      {
        "prompt": "求逆导数能给出一个答案还是一个系列？",
        "answer": "一个家庭。"
      }
    ],
    "memoryHook": "整体思维从逆向模式开始。",
    "quickExample": {
      "problem": "什么函数有 6x 的导数？",
      "move": "x^2 类型的函数有效；基本的反导数是 3x^2 加上一个常数。"
    }
  },
  "indefinite-integral": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "不定积分",
    "name": "不定积分",
    "useItWhen": "你想要整个反导数家族",
    "looksLike": "f(x) dx 的积分",
    "doThis": "求反导数并加上 C",
    "thinkOfItAs": "答案有垂直移动的空间",
    "watchOutFor": "忘记加C",
    "rememberThis": "使用 plus C 进行不定积分旅行",
    "typicalProblemShapes": [
      "无上限或下限的积分表示法",
      "提示要求一般反导数"
    ],
    "miniDrill": [
      {
        "prompt": "每个不定积分答案都属于什么额外部分？",
        "answer": "+ C"
      },
      {
        "prompt": "定积分可以得到+C吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "无界限意味着加C。",
    "quickExample": {
      "problem": "2x dx 的积分",
      "move": "x^2 + C"
    }
  },
  "integral-power-rule": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "积分的基本幂法则",
    "name": "积分幂法则",
    "useItWhen": "您正在对 x 进行积分，但不是 x^-1",
    "looksLike": "x^n dx 的积分",
    "doThis": "加 1，除以新的幂，加 C",
    "thinkOfItAs": "倒推导数幂法则",
    "watchOutFor": "在 x^-1 上使用它",
    "rememberThis": "加一，除以新的一",
    "typicalProblemShapes": [
      "不定积分中 x 的普通幂",
      "多项式逐项积分"
    ],
    "miniDrill": [
      {
        "prompt": "x^2 dx 的积分？",
        "answer": "x^3 / 3 + C"
      },
      {
        "prompt": "您不应该将哪些特殊指数输入到基本幂规则中？",
        "answer": "-1"
      }
    ],
    "memoryHook": "加一，除以 C。",
    "quickExample": {
      "problem": "x^4 dx 的积分",
      "move": "x^5 / 5 + C"
    }
  },
  "definite-integral-area": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "定积分作为面积概念",
    "name": "定积分 = 有符号面积",
    "useItWhen": "您需要一段时间内的总变化",
    "looksLike": "f(x) dx 从 a 到 b 的积分",
    "doThis": "将其读取为从左边界到右边界的签名区域",
    "thinkOfItAs": "将许多小矩形加起来",
    "watchOutFor": "忘记 x 轴下方算负数",
    "rememberThis": "定积分在区间内添加变化",
    "typicalProblemShapes": [
      "具有实际边界的积分符号",
      "要求总面积或净面积的图形问题"
    ],
    "miniDrill": [
      {
        "prompt": "在原始定积分中，x 轴以下的面积算正数还是负数？",
        "answer": "消极的。"
      },
      {
        "prompt": "区间[a,b]控制什么？",
        "answer": "积累开始和停止的地方。"
      }
    ],
    "memoryHook": "界限是指一段时间内的总数。",
    "quickExample": {
      "problem": "f(x) dx 从 0 到 2 的积分衡量什么？",
      "move": "从 x = 0 到 x = 2 的净累积面积。"
    }
  },
  "ftc-practical": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "微积分基本定理",
    "name": "联邦贸易委员会实际使用",
    "useItWhen": "你需要快速定积分或积分导数",
    "looksLike": "x 积分的顶减底设置或 d/dx",
    "doThis": "使用顶部减底部，或打开内部",
    "thinkOfItAs": "导数和积分握手",
    "watchOutFor": "忘记顶部减去底部",
    "rememberThis": "反导数求值，原始函数解包",
    "typicalProblemShapes": [
      "使用反导数计算定积分",
      "对上限为 x 的积分进行微分"
    ],
    "miniDrill": [
      {
        "prompt": "定积分的快速评估模式是什么？",
        "answer": "顶部的反导数减去底部的反导数。"
      },
      {
        "prompt": "cos t dt 从 0 到 x 的积分的导数？",
        "answer": "余弦 x"
      }
    ],
    "memoryHook": "上减下，或向内展开。",
    "quickExample": {
      "problem": "2x dx 的 1 到 3 的积分",
      "move": "使用 x^2，然后执行 3^2 - 1^2。"
    }
  },
  "u-substitution": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "u-替换基本介绍",
    "name": "u-替代",
    "useItWhen": "内部表达式及其导数都出现",
    "looksLike": "2x(x^2 + 1)^5 dx 的积分或 cos(3x) dx 的积分",
    "doThis": "让你成为内部，交换到du，整合，切换回来",
    "thinkOfItAs": "链式法则向后运行",
    "watchOutFor": "选择错误的 u 或忘记 du",
    "rememberThis": "inside 加上 inside-derivative 就是绿灯",
    "typicalProblemShapes": [
      "一个强大的外部力量，附近有一个整洁的内部导数",
      "积分内的三角、指数或多项式组合"
    ],
    "miniDrill": [
      {
        "prompt": "对于 6x(3x^2 + 4)^8 dx 的积分，自然 u 是多少？",
        "answer": "u = 3x^2 + 4"
      },
      {
        "prompt": "什么衍生线索告诉你 u-sub 可能有效？",
        "answer": "内部表达式的导数已经存在或几乎存在。"
      }
    ],
    "memoryHook": "里面加上导数意味着把它分出去。",
    "quickExample": {
      "problem": "2x(x^2 + 1)^5 dx 的积分",
      "move": "令 u = x^2 + 1 所以 du = 2x dx。"
    }
  },
  "mean-value-theorem": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "中值定理",
    "name": "中值定理",
    "useItWhen": "您需要一个有保证的平均坡度与即时坡度点",
    "looksLike": "在 [a,b] 上连续，在 (a,b) 上可微",
    "doThis": "检查条件，然后将割线斜率与切线斜率匹配",
    "thinkOfItAs": "某处车速表与行程平均值相符",
    "watchOutFor": "当函数有角或断点时使用它",
    "rememberThis": "平均斜率显示为切线斜率",
    "typicalProblemShapes": [
      "闭区间和开区间条件检查",
      "要求证明某些 c 存在的问题"
    ],
    "miniDrill": [
      {
        "prompt": "您必须首先检查哪两个条件？",
        "answer": "在闭区间上连续，在开区间上可微。"
      },
      {
        "prompt": "区间内匹配什么斜率？",
        "answer": "平均正割斜率。"
      }
    ],
    "memoryHook": "平均坡度显示在内部某处。",
    "quickExample": {
      "problem": "您在 MVT 中比较什么斜率？",
      "move": "跨区间的正割斜率。"
    }
  },
  "curve-sketching": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "曲线绘制总结",
    "name": "曲线绘制",
    "useItWhen": "你需要整个图表故事",
    "looksLike": "截距、渐近线、递增、凹性、极值",
    "doThis": "按固定顺序找到关键特征并构建图表",
    "thinkOfItAs": "清单，而不是猜测",
    "watchOutFor": "跳到草图而不检查导数符号",
    "rememberThis": "特征第一，草图第二",
    "typicalProblemShapes": [
      "提示要求进行完整的图形分析",
      "具有渐近线、极值和弯曲变化的函数"
    ],
    "miniDrill": [
      {
        "prompt": "您想要这里的导数符号图吗？",
        "answer": "是的。"
      },
      {
        "prompt": "绘制草图之前是否应该检查渐近线？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "通过清单而不是共鸣来绘制图表。",
    "quickExample": {
      "problem": "在绘制最终形状之前会发生什么？",
      "move": "功能清单。"
    }
  },
  "newtons-method": {
    "course": "单变量微积分 1",
    "chapter": "第 3 章：导数的应用",
    "unit": "应用",
    "topic": "牛顿法",
    "name": "牛顿法",
    "useItWhen": "你想要快速求根近似",
    "looksLike": "x_(n+1) = x_n - f(x_n)/f'(x_n)",
    "doThis": "从根部附近开始并继续沿切线跳跃",
    "thinkOfItAs": "通过切线向 x 轴移动",
    "watchOutFor": "起点太远或除以微小的导数",
    "rememberThis": "下一个 x 来自切线",
    "typicalProblemShapes": [
      "近似函数的零",
      "由 f 和 f-prime 构建的迭代公式"
    ],
    "miniDrill": [
      {
        "prompt": "牛顿法需要哪两个功能块？",
        "answer": "f(x) 和 f-素数(x)。"
      },
      {
        "prompt": "牛顿法每次都能找到准确答案吗？",
        "answer": "不，这是一种近似方法。"
      }
    ],
    "memoryHook": "相切步骤，然后再次相切步骤。",
    "quickExample": {
      "problem": "牛顿法使用什么来改进猜测？",
      "move": "切线步骤。"
    }
  },
  "areas-between-curves": {
    "course": "单变量微积分 1",
    "chapter": "第 5 章：积分的应用",
    "unit": "积分应用",
    "topic": "曲线之间的区域",
    "name": "曲线之间的面积",
    "useItWhen": "你需要两个图表之间的空间",
    "looksLike": "顶部函数减去底部函数",
    "doThis": "选择顶部和底部，然后积分顶部减去底部",
    "thinkOfItAs": "减去堆叠层",
    "watchOutFor": "首先使用下部曲线",
    "rememberThis": "顶部减去底部",
    "typicalProblemShapes": [
      "两条曲线相交于一个区间",
      "图形之间的阴影区域"
    ],
    "miniDrill": [
      {
        "prompt": "哪个函数在被积函数中先出现？",
        "answer": "顶级功能。"
      },
      {
        "prompt": "如果左-右更容易，你可以对 y 进行积分吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "曲线之间的面积 = 顶部减去底部。",
    "quickExample": {
      "problem": "y = f(x) 和 y = g(x) 之间面积的通常设置是什么？",
      "move": "将顶部减去底部进行积分。"
    }
  },
  "disk-washer-method": {
    "course": "单变量微积分 1",
    "chapter": "第 5 章：积分的应用",
    "unit": "积分应用",
    "topic": "按圆盘和垫圈计算的体积",
    "name": "圆盘/垫圈法",
    "useItWhen": "一个区域旋转，切片是圆或环",
    "looksLike": "绕轴旋转的体积",
    "doThis": "使用大半径的平方减去小半径的平方",
    "thinkOfItAs": "堆放硬币或甜甜圈",
    "watchOutFor": "使用直径而不是半径",
    "rememberThis": "垫圈=大圆减去小圆",
    "typicalProblemShapes": [
      "绕 x 轴或 y 轴旋转",
      "垂直于轴线的横截面"
    ],
    "miniDrill": [
      {
        "prompt": "什么力量击中半径？",
        "answer": "平方。"
      },
      {
        "prompt": "前面是什么常数？",
        "answer": "圆周率。"
      }
    ],
    "memoryHook": "圆盘是一个半径。垫圈是外减内。",
    "quickExample": {
      "problem": "从磁盘到洗衣机有什么变化？",
      "move": "出现一个洞，因此减去内半径的平方。"
    }
  },
  "shell-method": {
    "course": "单变量微积分 1",
    "chapter": "第 5 章：积分的应用",
    "unit": "积分应用",
    "topic": "圆柱壳的体积",
    "name": "壳法",
    "useItWhen": "旋压使薄圆柱壳比垫圈更容易",
    "looksLike": "2 pi 乘以半径乘以高度",
    "doThis": "使用壳半径和壳高度，然后积分",
    "thinkOfItAs": "将固体包裹在薄纸管中",
    "watchOutFor": "混合壳高度与壳半径",
    "rememberThis": "壳使用半径乘以高度",
    "typicalProblemShapes": [
      "洗衣机感觉不舒服的旋转",
      "平行于旋转轴的切片"
    ],
    "miniDrill": [
      {
        "prompt": "炮弹使用半径乘以什么？",
        "answer": "高度。"
      },
      {
        "prompt": "壳通常来自平行于轴的切片还是垂直于轴的切片？",
        "answer": "平行线。"
      }
    ],
    "memoryHook": "壳 = 2 pi 半径高度。",
    "quickExample": {
      "problem": "shell 公式的起始常数是什么？",
      "move": "2 圆周长。"
    }
  },
  "work-integrals": {
    "course": "单变量微积分 1",
    "chapter": "第 5 章：积分的应用",
    "unit": "积分应用",
    "topic": "工作",
    "name": "作为一个整体工作",
    "useItWhen": "力随距离变化",
    "looksLike": "弹簧、提升、泵送、变力",
    "doThis": "力乘以微小距离，然后积分",
    "thinkOfItAs": "添加微小的推动",
    "watchOutFor": "当力变化时使用一个恒定的力",
    "rememberThis": "变力就是积分力",
    "typicalProblemShapes": [
      "胡克定律弹簧问题",
      "起重链条、绳索或液体"
    ],
    "miniDrill": [
      {
        "prompt": "如果力随x变化，你是乘一次还是积分？",
        "answer": "整合。"
      },
      {
        "prompt": "弹簧常出现什么规律？",
        "answer": "胡克定律。"
      }
    ],
    "memoryHook": "改变力意味着添加微小的推力。",
    "quickExample": {
      "problem": "工作积分中的微小部分是什么？",
      "move": "力乘以小距离。"
    }
  },
  "average-value-function": {
    "course": "单变量微积分 1",
    "chapter": "第 5 章：积分的应用",
    "unit": "积分应用",
    "topic": "函数的平均值",
    "name": "函数的平均值",
    "useItWhen": "您需要一段时间间隔内的平均输出",
    "looksLike": "1 超过 b-a 乘以积分",
    "doThis": "从积分中取出总和，然后除以间隔长度",
    "thinkOfItAs": "面积转化为平均高度",
    "watchOutFor": "忘记除以长度步骤",
    "rememberThis": "平均值 = 积分除以区间宽度",
    "typicalProblemShapes": [
      "一段时间内的平均温度、速度或值",
      "直接平均值公式提示"
    ],
    "miniDrill": [
      {
        "prompt": "积分首先给出什么？",
        "answer": "总积累。"
      },
      {
        "prompt": "是什么将该总数变成平均值？",
        "answer": "除以间隔长度。"
      }
    ],
    "memoryHook": "平均高度=总面积除以宽度。",
    "quickExample": {
      "problem": "积分之后，还除以什么？",
      "move": "b 减 a。"
    }
  },
  "limit-laws": {
    "course": "单变量微积分 1",
    "chapter": "第 1 章：函数与极限",
    "unit": "极限",
    "topic": "使用极限定律计算极限",
    "name": "限制法则",
    "useItWhen": "极限可以分解成更小的简单部分",
    "looksLike": "极限内的和、差、积、商或幂",
    "doThis": "分解极限并逐项简化",
    "thinkOfItAs": "把一个大盒子拆成小盒子",
    "watchOutFor": "当下限为 0 时使用商定律",
    "rememberThis": "尽可能拆分，然后插入",
    "typicalProblemShapes": [
      "由较小项构建的多项式",
      "下限保持非零的分数"
    ],
    "miniDrill": [
      {
        "prompt": "你能把一个和的极限分成两个极限吗？",
        "answer": "是的。"
      },
      {
        "prompt": "商定律什么时候失效？",
        "answer": "当分母极限为0时。"
      }
    ],
    "memoryHook": "在战斗之前打破限制。",
    "quickExample": {
      "problem": "x 变为 2 时 (x^2 + 3x) 的极限",
      "move": "取每一项的极限，然后相加。"
    }
  },
  "derivative-as-function": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "作为函数的导数",
    "name": "导数函数",
    "useItWhen": "您需要坡度规则，而不仅仅是一个坡度",
    "looksLike": "x 或 dy/dx 的 f 素数",
    "doThis": "微分一次，然后将结果视为新函数",
    "thinkOfItAs": "根据原始功能构建的斜坡机",
    "watchOutFor": "当问题需要全导数时求某一点的斜率",
    "rememberThis": "f-prime 在任何存在的地方都给出斜率",
    "typicalProblemShapes": [
      "求 f-prime(x)，而不仅仅是某个数字的 f-prime",
      "一个图形问题，询问斜率是正还是负"
    ],
    "miniDrill": [
      {
        "prompt": "f-prime 是一个数还是一个新函数？",
        "answer": "一个新功能。"
      },
      {
        "prompt": "f-prime 告诉你什么？",
        "answer": "原函数的斜率行为。"
      }
    ],
    "memoryHook": "微分一次，得到坡度图。",
    "quickExample": {
      "problem": "如果 f(x) = x^3，导函数是什么？",
      "move": "f-素数(x) = 3x^2。"
    }
  },
  "trig-derivatives": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "三角函数的导数",
    "name": "三角导数",
    "useItWhen": "正弦、余弦、正切或朋友出现",
    "looksLike": "sin x、cos x、tan x、sec x",
    "doThis": "使用标准三角导数模式，然后根据需要使用链式法则",
    "thinkOfItAs": "您可以记住并快速部署的一个小列表",
    "watchOutFor": "忘记 cos x 的 d/dx 的负数",
    "rememberThis": "sin 转为 cos，cos 转为负 sin",
    "typicalProblemShapes": [
      "基本三角函数本身",
      "具有内部表达式（如 sin(3x)）的三角函数"
    ],
    "miniDrill": [
      {
        "prompt": "sin x 的 d/dx 是多少？",
        "answer": "因 x。"
      },
      {
        "prompt": "cos x 的 d/dx 上的陷阱是什么？",
        "answer": "缺少负号。"
      }
    ],
    "memoryHook": "罪恶到余弦。因数减去罪数。",
    "quickExample": {
      "problem": "cos x 的导数",
      "move": "它是负sin x。"
    }
  },
  "differentials": {
    "course": "单变量微积分 1",
    "chapter": "第 2 章：导数",
    "unit": "导数",
    "topic": "线性近似和微分",
    "name": "差速器",
    "useItWhen": "您需要快速的小额变更估算",
    "looksLike": "dy = f-素数(x) dx",
    "doThis": "求导数，乘以微小的输入变化，然后估计",
    "thinkOfItAs": "放大的数学，曲线几乎是直线",
    "watchOutFor": "使用大的变化，就好像线性估计保持完美一样",
    "rememberThis": "小 dx 给出了方便的 dy 估计",
    "typicalProblemShapes": [
      "x 稍微变化时 y 大约变化多少",
      "估计误差或快速附近值"
    ],
    "miniDrill": [
      {
        "prompt": "哪两块组成 dy？",
        "answer": "f-素数(x) 和 dx。"
      },
      {
        "prompt": "差异对于小变化还是大变化最有效？",
        "answer": "小变化。"
      }
    ],
    "memoryHook": "微小的输入变化，微分时间 dx。",
    "quickExample": {
      "problem": "您如何估计微小的输出变化？",
      "move": "使用 dy = f-prime(x) dx。"
    }
  },
  "area-distance-problems": {
    "course": "单变量微积分 1",
    "chapter": "第 4 章：积分",
    "unit": "积分",
    "topic": "面积和距离问题",
    "name": "面积和距离问题",
    "useItWhen": "你需要从许多小块中积累起来",
    "looksLike": "曲线下的面积或增加距离的速度",
    "doThis": "将其切成小块，加上积分，然后解释结果",
    "thinkOfItAs": "将许多小块变成一个整体",
    "watchOutFor": "将有符号面积与总距离混合",
    "rememberThis": "积分将微小的部分添加到总数中",
    "typicalProblemShapes": [
      "比率图下的面积",
      "速度随时间变化为位移或距离"
    ],
    "miniDrill": [
      {
        "prompt": "定积分是否会添加许多微小的部分？",
        "answer": "是的。"
      },
      {
        "prompt": "对于总距离，负速度块是否仍为负值？",
        "answer": "不，使用绝对值思维。"
      }
    ],
    "memoryHook": "积分=微小部分的总和。",
    "quickExample": {
      "problem": "速度的积分首先给出什么？",
      "move": "头寸净变化。"
    }
  },
  "calc2-integration-by-parts": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "分部整合",
    "name": "分部整合",
    "useItWhen": "积在积分内",
    "looksLike": "x e^x, x sin x, x ln x",
    "doThis": "选择 u 和 dv，然后用 uv 减去积分 v du",
    "thinkOfItAs": "产品规则落后",
    "watchOutFor": "选择 u 让新的积分变得更糟",
    "rememberThis": "选择你来简化",
    "typicalProblemShapes": [
      "多项式乘以三角函数、指数函数或对数函数",
      "一种积分，其中一个因子在微分时变得更简单"
    ],
    "miniDrill": [
      {
        "prompt": "这个方法运行的公式是什么？",
        "answer": "uv 减去积分 v du。"
      },
      {
        "prompt": "对于 x ln x，自然 u 是多少？",
        "answer": "lnx."
      }
    ],
    "memoryHook": "里面的产品？认为产品规则落后。",
    "quickExample": {
      "problem": "x e^x dx 的积分",
      "move": "取 u = x 和 dv = e^x dx。"
    }
  },
  "calc2-trig-integrals": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "三角积分",
    "name": "三角积分",
    "useItWhen": "积分由 sin、cos、sec 或 tan 的幂构成",
    "looksLike": "sin^3 x cos^2 x 或 sec^3 x tan x",
    "doThis": "寻找奇次幂或正切对并巧妙地分开",
    "thinkOfItAs": "与 trig 服装的图案匹配",
    "watchOutFor": "对每个三角组合使用一个规则",
    "rememberThis": "先奇次幂或正切线索",
    "typicalProblemShapes": [
      "正弦和余弦的幂",
      "混合正割和正切幂"
    ],
    "miniDrill": [
      {
        "prompt": "存在正弦奇次幂。救一个什么？",
        "answer": "保存一个正弦因子。"
      },
      {
        "prompt": "sec^3 x tan x 通常表示什么？",
        "answer": "将 sec x tan x 保持在一起。"
      }
    ],
    "memoryHook": "三角幂是一种模式游戏。",
    "quickExample": {
      "problem": "sin^3 x cos^2 x dx 的积分",
      "move": "保存一个sin x，将其余的变成cos碎片。"
    }
  },
  "calc2-trig-substitution": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "三角函数替换",
    "name": "三角函数替换",
    "useItWhen": "平方根有 a^2 - x^2、a^2 + x^2 或 x^2 - a^2",
    "looksLike": "sqrt(9 - x^2)、sqrt(x^2 + 16)、sqrt(x^2 - 25)",
    "doThis": "将根模式与 sin、tan 或 sec 替换相匹配",
    "thinkOfItAs": "使用三角恒等式来清理根",
    "watchOutFor": "选择错误的三角匹配",
    "rememberThis": "根模式选择三角函数",
    "typicalProblemShapes": [
      "由二次形式建立的平方根",
      "不能用普通 u-sub 简化的根"
    ],
    "miniDrill": [
      {
        "prompt": "a^2 - x^2 匹配哪个三角函数？",
        "answer": "正弦。"
      },
      {
        "prompt": "x^2 + a^2 匹配哪个三角函数？",
        "answer": "切线。"
      }
    ],
    "memoryHook": "看到根，选择三角函数。",
    "quickExample": {
      "problem": "与 sqrt(9 - x^2) 积分",
      "move": "使用 x = 3 sin theta。"
    }
  },
  "calc2-partial-fractions": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "部分分数",
    "name": "部分分数",
    "useItWhen": "你有一个准备好分解的有理函数",
    "looksLike": "(2x + 3)/(x^2 - x - 2)",
    "doThis": "分解分母、分解分数、求解常数",
    "thinkOfItAs": "将难看的分数变成简单的分数",
    "watchOutFor": "忘记先因式分解或使用不正确的分数进行因式分解",
    "rememberThis": "因式分解、分解、求解、积分",
    "typicalProblemShapes": [
      "具有可分解分母的有理函数",
      "看起来更难整合为一个整体的分数"
    ],
    "miniDrill": [
      {
        "prompt": "部分分数之前要检查什么？",
        "answer": "顶部度数必须小于底部度数。"
      },
      {
        "prompt": "首先移动 x^2 - x - 2？",
        "answer": "因素它。"
      }
    ],
    "memoryHook": "一个分数，许多更简单的分数。",
    "quickExample": {
      "problem": "(2x + 3)/(x^2 - x - 2) dx 的积分",
      "move": "分裂前分解底部。"
    }
  },
  "calc2-improper-integrals": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "不恰当的积分",
    "name": "不当积分",
    "useItWhen": "界限无限大或被积函数爆炸",
    "looksLike": "积分至无穷大或积分垂直渐近线",
    "doThis": "用限制替换坏点",
    "thinkOfItAs": "带有警告标签的常规积分",
    "watchOutFor": "直接插入坏的绑定",
    "rememberThis": "坏界意味着首先限制",
    "typicalProblemShapes": [
      "上限或下限是无穷大",
      "该函数在区间内某处未定义"
    ],
    "miniDrill": [
      {
        "prompt": "设置中什么取代了无穷大？",
        "answer": "一个限制。"
      },
      {
        "prompt": "不恰当的积分可以发散吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "无限或爆炸意味着极限。",
    "quickExample": {
      "problem": "1/x^2 dx 从 1 到无穷大的积分",
      "move": "将无穷大变成极限。"
    }
  },
  "calc2-numerical-integration": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "数值积分",
    "name": "数值积分",
    "useItWhen": "你需要一个估计而不是一个干净的反导数",
    "looksLike": "梯形法则或辛普森法则",
    "doThis": "建立相等的子区间，然后应用公式",
    "thinkOfItAs": "用简单的部件估算面积",
    "watchOutFor": "混合端点权重",
    "rememberThis": "用模式来估计，而不是猜测",
    "typicalProblemShapes": [
      "没有简单反导数的值表",
      "提示命名梯形或辛普森规则"
    ],
    "miniDrill": [
      {
        "prompt": "梯形规则中端点被计数一次还是两次？",
        "answer": "一次。"
      },
      {
        "prompt": "辛普森法则需要什么样的子区间计数？",
        "answer": "偶数。"
      }
    ],
    "memoryHook": "使用重量模式，而不是粗略的眼球。",
    "quickExample": {
      "problem": "使用梯形来估计积分。",
      "move": "找到 delta x，列出点，应用权重模式。"
    }
  },
  "calc2-arc-length": {
    "course": "单变量微积分 2",
    "chapter": "第 8 章：积分的更多应用",
    "unit": "应用与曲线",
    "topic": "弧长",
    "name": "弧长",
    "useItWhen": "你需要一条曲线到底有多长",
    "looksLike": "求 y = f(x) 从 a 到 b 的长度",
    "doThis": "使用弧长公式并在积分前进行简化",
    "thinkOfItAs": "测量弯曲，而不是水平距离",
    "watchOutFor": "忘记平方根部分",
    "rememberThis": "长度需要求根公式",
    "typicalProblemShapes": [
      "平滑曲线和区间",
      "关于实际路径长度的问题"
    ],
    "miniDrill": [
      {
        "prompt": "x 公式中出现什么导数？",
        "answer": "y 素数。"
      },
      {
        "prompt": "弧长是否使用平方根？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "曲线长度表示根公式。",
    "quickExample": {
      "problem": "求区间上曲线的弧长。",
      "move": "从根下的 1 + (y-prime)^2 开始。"
    }
  },
  "calc2-surface-area": {
    "course": "单变量微积分 2",
    "chapter": "第 8 章：积分的更多应用",
    "unit": "应用与曲线",
    "topic": "回转表面积",
    "name": "旋转表面积",
    "useItWhen": "曲线绕轴旋转，您需要皮肤区域",
    "looksLike": "绕 x 轴或 y 轴的表面积",
    "doThis": "半径乘以弧长段，然后积分",
    "thinkOfItAs": "将纸包裹在旋转的曲线上",
    "watchOutFor": "使用错误的半径",
    "rememberThis": "表面积是旋转半径乘以长度",
    "typicalProblemShapes": [
      "绕轴旋转曲线",
      "问题是要求外部皮肤，而不是体积"
    ],
    "miniDrill": [
      {
        "prompt": "绕x轴旋转，半径是多少？",
        "answer": "y。"
      },
      {
        "prompt": "表面积是否重用了弧长根？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "表面积=旋转半径乘以长度因子。",
    "quickExample": {
      "problem": "绕 x 轴旋转 y = f(x)。",
      "move": "使用半径 y 和弧长因子。"
    }
  },
  "calc2-parametric-curves": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "参数曲线",
    "name": "参数曲线",
    "useItWhen": "x 和 y 均以 t 形式给出",
    "looksLike": "x = f(t), y = g(t)",
    "doThis": "像司机一样对待 t 并跟踪它所行驶的路径",
    "thinkOfItAs": "一个隐藏旋钮控制两个坐标",
    "watchOutFor": "忘记曲线可以向后追踪或重复",
    "rememberThis": "t 同时移动 x 和 y",
    "typicalProblemShapes": [
      "x 和 y 的单独公式",
      "粒子随时间追踪路径"
    ],
    "miniDrill": [
      {
        "prompt": "什么变量同时控制 x 和 y？",
        "answer": "t。"
      },
      {
        "prompt": "同一条参数曲线可以描两次吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "一个参数驱动整个路径。",
    "quickExample": {
      "problem": "x = 成本 t，y = 正弦 t",
      "move": "将其解读为随时间绘制的曲线。"
    }
  },
  "calc2-parametric-derivatives": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "参数曲线的导数",
    "name": "参数导数",
    "useItWhen": "你需要 x(t) 和 y(t) 的 dy/dx",
    "looksLike": "x = f(t), y = g(t), 求斜率",
    "doThis": "使用 dy/dt 而不是 dx/dt",
    "thinkOfItAs": "y 的变化超过 x 的变化，均通过 t",
    "watchOutFor": "使用 dy/dt 就像使用 dy/dx 一样",
    "rememberThis": "dy/dx = (dy/dt)/(dx/dt)",
    "typicalProblemShapes": [
      "参数路径切线的斜率",
      "直接使用 t 而不是 x 的问题"
    ],
    "miniDrill": [
      {
        "prompt": "分母里有什么？",
        "answer": "dx/dt。"
      },
      {
        "prompt": "如果 dx/dt = 0，会出现什么警告？",
        "answer": "斜率公式在那里破裂。"
      }
    ],
    "memoryHook": "斜率是 y 速率除以 x 速率。",
    "quickExample": {
      "problem": "求参数曲线在 t = 1 时的斜率。",
      "move": "首先对 t 求 x 和 y 的微分。"
    }
  },
  "calc2-parametric-arc-length": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "参数曲线的弧长",
    "name": "参数化弧长",
    "useItWhen": "您需要参数路径的长度",
    "looksLike": "x = f(t), y = g(t)，求从 t = a 到 b 的长度",
    "doThis": "使用 (dx/dt)^2 + (dy/dt)^2 的根",
    "thinkOfItAs": "积分内的毕达哥拉斯速度",
    "watchOutFor": "使用普通曲线的 x 公式",
    "rememberThis": "参数长度使用两种速率",
    "typicalProblemShapes": [
      "粒子运动的路径长度",
      "具有时间界限的参数曲线"
    ],
    "miniDrill": [
      {
        "prompt": "有多少衍生品在根下？",
        "answer": "二：x 速率和 y 速率。"
      },
      {
        "prompt": "参数弧长是否积分在 x 或 t 中？",
        "answer": "在 t。"
      }
    ],
    "memoryHook": "这两个比率都在根下。",
    "quickExample": {
      "problem": "求参数区间的长度。",
      "move": "从 x 速率和 y 速率构建根。"
    }
  },
  "calc2-polar-coordinates": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "极坐标",
    "name": "极坐标",
    "useItWhen": "距离和角度更容易确定一个点",
    "looksLike": "r = f(θ)",
    "doThis": "将 r 读取为距原点的距离，将 theta 读取为方向",
    "thinkOfItAs": "通过旋转和拉伸绘制的图形",
    "watchOutFor": "忘记负数 r 可以翻转点",
    "rememberThis": "极坐标表示半径加角度",
    "typicalProblemShapes": [
      "玫瑰曲线、圆圈、利马康",
      "使用 r 和 theta 代替 x 和 y 的方程"
    ],
    "miniDrill": [
      {
        "prompt": "θ控制什么？",
        "answer": "方向。"
      },
      {
        "prompt": "r控制什么？",
        "answer": "距原点的距离。"
      }
    ],
    "memoryHook": "角度点、半径达到。",
    "quickExample": {
      "problem": "r = 2 cos theta 描述什么？",
      "move": "考虑半径随角度变化的情况。"
    }
  },
  "calc2-polar-area": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "极坐标面积",
    "name": "极地地区",
    "useItWhen": "你需要极曲线内的面积",
    "looksLike": "求 r = f(theta) 的一个环的面积",
    "doThis": "使用 r 平方 d theta 的二分之一积分",
    "thinkOfItAs": "添加薄披萨片",
    "watchOutFor": "使用错误的 theta 范围",
    "rememberThis": "极面积是r平方的二分之一",
    "typicalProblemShapes": [
      "由环或花瓣包围的区域",
      "积分用 theta 书写，而不是 x"
    ],
    "miniDrill": [
      {
        "prompt": "公式中 r 的幂是多少？",
        "answer": "平方。"
      },
      {
        "prompt": "前面是什么常数？",
        "answer": "二分之一。"
      }
    ],
    "memoryHook": "极面积 = r 平方的一半。",
    "quickExample": {
      "problem": "求玫瑰曲线的一个花瓣的面积。",
      "move": "使用花瓣边界，而不是整个圆圈。"
    }
  },
  "calc2-polar-slope": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "极曲线的斜率",
    "name": "极地坡度",
    "useItWhen": "你需要一条极曲线的切线",
    "looksLike": "r = f(theta)，求 dy/dx",
    "doThis": "转换为 x(theta) 和 y(theta)，然后使用参数斜率",
    "thinkOfItAs": "一次将极坐标转换为参数",
    "watchOutFor": "尝试直接在 r 上使用普通导数规则",
    "rememberThis": "极坐标斜率变为参数斜率",
    "typicalProblemShapes": [
      "具有切线或水平/垂直斜率问题的极坐标曲线",
      "theta 形式的斜率请求"
    ],
    "miniDrill": [
      {
        "prompt": "你首先从极坐标形式构建什么？",
        "answer": "x(θ) 和 y(θ)。"
      },
      {
        "prompt": "之后，您使用哪个斜率公式？",
        "answer": "dy/dt 优于 dx/dt 风格。"
      }
    ],
    "memoryHook": "极坐标斜率实际上是参数斜率。",
    "quickExample": {
      "problem": "求极坐标曲线的切线斜率。",
      "move": "首先构建 x = r cos theta 和 y = r sin theta。"
    }
  },
  "calc2-polar-arc-length": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "极坐标中的弧长",
    "name": "极弧长",
    "useItWhen": "你需要极坐标曲线的长度",
    "looksLike": "求 r = f(theta) 的长度",
    "doThis": "使用 r 平方根加上 (dr/dtheta) 平方",
    "thinkOfItAs": "极长有自己的速度公式",
    "watchOutFor": "忘记 r 的导数",
    "rememberThis": "极长需要 r 和 r-prime",
    "typicalProblemShapes": [
      "玫瑰、利马孔或螺旋片的长度",
      "间隔为 θ 的极坐标曲线"
    ],
    "miniDrill": [
      {
        "prompt": "哪两块在根下？",
        "answer": "r 平方和 r 素数平方。"
      },
      {
        "prompt": "极弧长度是否积分到 theta 中？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "极长度使用 r 和 r 素数。",
    "quickExample": {
      "problem": "求极环的长度。",
      "move": "使用带有 theta 界限的极坐标弧长公式。"
    }
  },
  "calc2-sequences": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "序列",
    "name": "序列",
    "useItWhen": "项接连出现，而不是连续曲线",
    "looksLike": "a_n，其中 n 趋于无穷大",
    "doThis": "询问当 n 变得很大时，这些项的作用是什么",
    "thinkOfItAs": "一份具有长期情绪的清单",
    "watchOutFor": "将序列视为常规函数图",
    "rememberThis": "序列意味着逐项行为",
    "typicalProblemShapes": [
      "当 n 趋于无穷大时，关于 a_n 的问题",
      "术语列表或显式第 n 个公式"
    ],
    "miniDrill": [
      {
        "prompt": "通常用什么变量来索引序列？",
        "answer": "名词"
      },
      {
        "prompt": "序列可以发散吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "序列是一个带有极限问题的列表。",
    "quickExample": {
      "problem": "a_n = 1/n 是否在某处稳定？",
      "move": "是的。它走向0。"
    }
  },
  "calc2-sequence-limits": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "序列的极限",
    "name": "序列限制",
    "useItWhen": "你需要知道一个序列是否稳定下来",
    "looksLike": "当 n 趋向 a_n 的无穷大时的限制",
    "doThis": "查看大 n 的主导行为",
    "thinkOfItAs": "列表的结束行为",
    "watchOutFor": "仅检查早期条款",
    "rememberThis": "大n控制着答案",
    "typicalProblemShapes": [
      "n 中的有理式",
      "由根、幂或阶乘构建的项"
    ],
    "miniDrill": [
      {
        "prompt": "前几项能保证极限吗？",
        "answer": "不。"
      },
      {
        "prompt": "对于大n来说什么最重要？",
        "answer": "增长占主导地位。"
      }
    ],
    "memoryHook": "序列限制是长期行为。",
    "quickExample": {
      "problem": "(3n + 1)/(n + 5) 的极限",
      "move": "最高权力思维仍然有效。"
    }
  },
  "calc2-series-basics": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "系列基础知识",
    "name": "系列基础知识",
    "useItWhen": "你正在添加无限多个项",
    "looksLike": "将 a_n 从 n = 1 到无穷大求和",
    "doThis": "查看部分金额，而不仅仅是条款",
    "thinkOfItAs": "没有上学期期末成绩的连续总计",
    "watchOutFor": "仅思考期限限制即可证明收敛性",
    "rememberThis": "级数关心的是总和，而不是单项",
    "typicalProblemShapes": [
      "无穷大的 Sigma 表示法",
      "趋同或发散问题"
    ],
    "miniDrill": [
      {
        "prompt": "级数是否使用部分和？",
        "answer": "是的。"
      },
      {
        "prompt": "如果项不为 0，级数能否收敛？",
        "answer": "不。"
      }
    ],
    "memoryHook": "系列是关于运行总计的。",
    "quickExample": {
      "problem": "什么决定了一个级数：项还是部分和？",
      "move": "部分金额决定它。"
    }
  },
  "calc2-geometric-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "几何系列",
    "name": "几何系列",
    "useItWhen": "每一项都是乘以相同的比率得出的",
    "looksLike": "a + ar + ar^2 + ...",
    "doThis": "找到 r 并检查绝对 r 是否小于 1",
    "thinkOfItAs": "相同的乘数，一遍又一遍",
    "watchOutFor": "忘记收敛的比率测试就在 r 上",
    "rememberThis": "绝对r小于1表示收敛",
    "typicalProblemShapes": [
      "项之间的固定乘数",
      "像 c(r)^n 这样的幂"
    ],
    "miniDrill": [
      {
        "prompt": "几何级数中的关键数字是什么？",
        "answer": "比率 r。"
      },
      {
        "prompt": "如果 r = 2，收敛还是发散？",
        "answer": "发散。"
      }
    ],
    "memoryHook": "几何级数的生死存亡由 r 决定。",
    "quickExample": {
      "problem": "系列 3 + 3/2 + 3/4 + ...",
      "move": "比率为 1/2，因此收敛。"
    }
  },
  "calc2-telescoping-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "伸缩系列",
    "name": "伸缩系列",
    "useItWhen": "条款在链中取消",
    "looksLike": "部分分数分裂后的 1/(n(n + 1))",
    "doThis": "写出早期的部分金额并观察取消情况",
    "thinkOfItAs": "多米诺骨牌互相击倒",
    "watchOutFor": "在检查取消之前尝试一下奇特的测试",
    "rememberThis": "如果条款取消，请写出一些",
    "typicalProblemShapes": [
      "插入相邻项，如 1/n - 1/(n + 1)",
      "扩张后有很多明显的取消"
    ],
    "miniDrill": [
      {
        "prompt": "伸缩式系列的最佳第一步？",
        "answer": "写出部分和。"
      },
      {
        "prompt": "大多数中间条款还能生存吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "把它写下来并让取消显示出来。",
    "quickExample": {
      "problem": "1/(n(n + 1)) 的级数",
      "move": "将其拆分并检查前几个部分和。"
    }
  },
  "calc2-nth-term-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "第N项测试",
    "name": "第 N 学期测试",
    "useItWhen": "你想要快速的分歧检查",
    "looksLike": "sum a_n 其中期限限制很容易看出",
    "doThis": "取a_n的极限；如果不为 0，则级数发散",
    "thinkOfItAs": "门口有一个快速的保镖",
    "watchOutFor": "思维极限0表示收敛",
    "rememberThis": "非0表示发散； 0 表示也许",
    "typicalProblemShapes": [
      "期限宽松的系列",
      "在尝试更难的工具之前先进行测试"
    ],
    "miniDrill": [
      {
        "prompt": "如果 a_n 变为 3，会发生什么？",
        "answer": "该系列存在分歧。"
      },
      {
        "prompt": "如果 a_n 变为 0，就完成了吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "不为零会很快杀死这个系列。",
    "quickExample": {
      "problem": "n/(n + 1) 之和",
      "move": "项变为 1，因此级数立即发散。"
    }
  },
  "calc2-integral-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "整体测试",
    "name": "整体测试",
    "useItWhen": "这些项来自正递减连续函数",
    "looksLike": "sum 1/n^p 或类似的正公式",
    "doThis": "将匹配函数从 1 积分到无穷大",
    "thinkOfItAs": "用不恰当的积分来判断级数",
    "watchOutFor": "当函数不递减时使用它",
    "rememberThis": "正、递减、连续优先",
    "typicalProblemShapes": [
      "具有类函数公式的正项",
      "看起来接近 p 级数或倒数幂的级数"
    ],
    "miniDrill": [
      {
        "prompt": "您应该首先检查哪三个条件？",
        "answer": "正、递减、连续。"
      },
      {
        "prompt": "出现什么样的积分？",
        "answer": "不恰当的积分。"
      }
    ],
    "memoryHook": "如果它的作用像一个很好的正函数，则将其积分。",
    "quickExample": {
      "problem": "测试总和 1/n^2",
      "move": "将其与 1/x^2 的不正确积分进行比较。"
    }
  },
  "calc2-p-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "P系列",
    "name": "p系列",
    "useItWhen": "该系列看起来像 1/n^p",
    "looksLike": "总和 1/n^p",
    "doThis": "检查 p 是否大于 1",
    "thinkOfItAs": "房间内最快的捷径",
    "watchOutFor": "混合截止值",
    "rememberThis": "p 大于 1 收敛",
    "typicalProblemShapes": [
      "n 的倒数幂",
      "可以与 1/n^p 进行比较的级数"
    ],
    "miniDrill": [
      {
        "prompt": "如果 p = 1 呢？",
        "answer": "发散。"
      },
      {
        "prompt": "如果 p = 4 呢？",
        "answer": "收敛。"
      }
    ],
    "memoryHook": "p 超过 1 条生命。 p 等于或低于 1 就会死亡。",
    "quickExample": {
      "problem": "总和 1/n^(3/2)",
      "move": "p大于1，所以收敛。"
    }
  },
  "calc2-comparison-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "对比测试",
    "name": "对比测试",
    "useItWhen": "你的系列很乱，但你可以将它的大小与熟悉的系列进行比较",
    "looksLike": "您可以将积极的术语置于另一个系列之上或之下",
    "doThis": "与您已经知道的更简单的事情进行比较",
    "thinkOfItAs": "系列关联罪",
    "watchOutFor": "使用错误的比较方向",
    "rememberThis": "小于收敛或大于发散",
    "typicalProblemShapes": [
      "具有额外常数或低阶项的正项级数",
      "类似于已知 p 级数的分数"
    ],
    "miniDrill": [
      {
        "prompt": "为了证明收敛性，与更大或更小的东西进行比较？",
        "answer": "更大的收敛基准。"
      },
      {
        "prompt": "为了证明分歧，与更大或更小的东西进行比较？",
        "answer": "较小的发散基准。"
      }
    ],
    "memoryHook": "与您已经信任的系列进行比较。",
    "quickExample": {
      "problem": "将 1/(n^2 + 1) 与 1/n^2 进行比较。",
      "move": "使用更简单的 p 系列作为基准。"
    }
  },
  "calc2-limit-comparison-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "极限对比测试",
    "name": "极限比较测试",
    "useItWhen": "两个正项级数具有相同的主导形状",
    "looksLike": "n 中混乱的有理数或根表达式",
    "doThis": "取 a_n 对 b_n 的限制并检查正有限答案",
    "thinkOfItAs": "同样的成长，同样的命运",
    "watchOutFor": "使用具有完全不同的主导项的比较系列",
    "rememberThis": "正有限比意味着相同的结果",
    "typicalProblemShapes": [
      "具有相似主导行为的积极术语",
      "普通比较感觉混乱的理性表达"
    ],
    "miniDrill": [
      {
        "prompt": "您想要什么样的比例限制？",
        "answer": "积极且有限。"
      },
      {
        "prompt": "如果比率限制为 7，这意味着什么？",
        "answer": "它们会聚或发散在一起。"
      }
    ],
    "memoryHook": "相同的主导形状意味着相同的判决。",
    "quickExample": {
      "problem": "将 n/(n^3 + 2) 与 1/n^2 进行比较。",
      "move": "使用主导权并采取比例限制。"
    }
  },
  "calc2-alternating-series-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "交替串联试验",
    "name": "交替串联测试",
    "useItWhen": "标志来回翻转",
    "looksLike": "(-1)^n、(-1)^(n+1) 或加减加减",
    "doThis": "检查术语大小是否降至 0",
    "thinkOfItAs": "一场拉锯战结束了",
    "watchOutFor": "检查迹象但不检查收缩",
    "rememberThis": "交替、减少、达到 0",
    "typicalProblemShapes": [
      "明确的交替符号",
      "正数部分缩小的级数 (-1)^n"
    ],
    "miniDrill": [
      {
        "prompt": "交替项需要缩小吗？",
        "answer": "是的。"
      },
      {
        "prompt": "项需要变为 0 吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "仅仅交替是不够的。条款必须冷静下来。",
    "quickExample": {
      "problem": "总和 (-1)^n / n",
      "move": "符号交替，术语大小缩小至 0。"
    }
  },
  "calc2-absolute-conditional": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "绝对收敛和条件收敛",
    "name": "绝对与条件",
    "useItWhen": "交替序列收敛，您需要更强的标签",
    "looksLike": "测试该系列，然后测试绝对值版本",
    "doThis": "放下标志并再次测试",
    "thinkOfItAs": "脱掉标志服装，看看还剩下什么",
    "watchOutFor": "称每个收敛交替级数为绝对级数",
    "rememberThis": "绝对意味着没有标志它仍然有效",
    "typicalProblemShapes": [
      "AST 表示收敛后交替序列",
      "要求绝对或条件收敛的问题"
    ],
    "miniDrill": [
      {
        "prompt": "你用什么来测试绝对收敛？",
        "answer": "绝对值系列。"
      },
      {
        "prompt": "如果该绝对值级数发散但原始级数收敛，那么标签是什么？",
        "answer": "条件收敛。"
      }
    ],
    "memoryHook": "绝对意味着符号并不重要。",
    "quickExample": {
      "problem": "如果 sum (-1)^n/n 收敛，那么 sum 1/n 又如何呢？",
      "move": "它是发散的，所以原来的只是有条件的。"
    }
  },
  "calc2-ratio-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "比率测试",
    "name": "比率测试",
    "useItWhen": "阶乘或幂不断出现",
    "looksLike": "n!、c^n 或两者",
    "doThis": "取绝对a_(n+1)/a_n的极限",
    "thinkOfItAs": "询问每一项与前一项相比如何",
    "watchOutFor": "忘记绝对值",
    "rememberThis": "比率小于 1 收敛，大于 1 发散",
    "typicalProblemShapes": [
      "阶乘",
      "n 的指数幂"
    ],
    "miniDrill": [
      {
        "prompt": "如果比例限制是1/3呢？",
        "answer": "收敛。"
      },
      {
        "prompt": "如果比率限制为 2 怎么办？",
        "answer": "发散。"
      }
    ],
    "memoryHook": "阶乘和幂喜欢比率测试。",
    "quickExample": {
      "problem": "系列与 n!在条款中",
      "move": "尽早尝试比率测试。"
    }
  },
  "calc2-root-test": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "根测试",
    "name": "根测试",
    "useItWhen": "项中内置了 n 次方或 n 次方根",
    "looksLike": "(3n/(n+1))^n 或 n 次根",
    "doThis": "取绝对值 a_n 的 n 次方根并求极限",
    "thinkOfItAs": "剥去巨大的外在力量",
    "watchOutFor": "当不存在 n 次方模式时使用它",
    "rememberThis": "n 次方表示 n 次方根",
    "typicalProblemShapes": [
      "条款提升至 n",
      "N 根结构"
    ],
    "miniDrill": [
      {
        "prompt": "如果根测试限制低于 1 怎么办？",
        "answer": "收敛。"
      },
      {
        "prompt": "如果根测试限制高于 1 怎么办？",
        "answer": "发散。"
      }
    ],
    "memoryHook": "外n功率大吗？使用根测试。",
    "quickExample": {
      "problem": "具有 [(2n+1)/(3n)]^n 的级数",
      "move": "根测试快速消除外部电源。"
    }
  },
  "calc2-power-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "动力系列",
    "name": "电源系列",
    "useItWhen": "项是围绕 x - a 的幂构建的",
    "looksLike": "总和 c_n (x - a)^n",
    "doThis": "将其视为围绕中心的可移动几何风格系列",
    "thinkOfItAs": "围绕一点的无限多项式",
    "watchOutFor": "忘记中心a",
    "rememberThis": "幂级数围绕一个中心",
    "typicalProblemShapes": [
      "项中包含 x 的系列",
      "围绕 x = 0 或 x = a 展开"
    ],
    "miniDrill": [
      {
        "prompt": "总和 c_n (x + 4)^n 的中心在哪里？",
        "answer": "x = -4。"
      },
      {
        "prompt": "幂级数对于每个 x 的表现是否相同？",
        "answer": "不。"
      }
    ],
    "memoryHook": "幂级数是没有最终项的多项式。",
    "quickExample": {
      "problem": "总和 c_n (x - 2)^n",
      "move": "中心是 x = 2。"
    }
  },
  "calc2-radius-interval": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "收敛半径和区间",
    "name": "收敛半径/区间",
    "useItWhen": "幂级数需要其有效的 x 值",
    "looksLike": "找出级数在 x 中收敛的位置",
    "doThis": "使用半径的比率或根测试，然后手动检查端点",
    "thinkOfItAs": "中心周围的安全区",
    "watchOutFor": "忘记端点检查",
    "rememberThis": "首先是半径，最后是端点",
    "typicalProblemShapes": [
      "具有 x 和阶乘或幂模式的级数",
      "询问收敛半径或区间的问题"
    ],
    "miniDrill": [
      {
        "prompt": "比率测试给出半径后，你完成了吗？",
        "answer": "否。检查端点。"
      },
      {
        "prompt": "端点的行为总是相同吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "半径给出圆。端点决定边缘。",
    "quickExample": {
      "problem": "求幂级数的收敛区间。",
      "move": "获取半径，然后分别测试两端。"
    }
  },
  "calc2-taylor-polynomials": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "泰勒多项式",
    "name": "泰勒多项式",
    "useItWhen": "你想要一个点附近的短多项式近似",
    "looksLike": "求关于 x = a 的 n 次泰勒多项式",
    "doThis": "在 a 处使用导数并逐项构建",
    "thinkOfItAs": "该函数的本地假版本",
    "watchOutFor": "在错误的中心使用导数",
    "rememberThis": "所有道路都经过中心a",
    "typicalProblemShapes": [
      "逼近一点",
      "提示询问 a 周围的 n 次多项式"
    ],
    "miniDrill": [
      {
        "prompt": "哪个点控制系数？",
        "answer": "中心 A."
      },
      {
        "prompt": "2 阶意味着多少个导数级别？",
        "answer": "直到二阶导数。"
      }
    ],
    "memoryHook": "泰勒多项式是局部替代项。",
    "quickExample": {
      "problem": "在 x = 0 处构建二次泰勒多项式。",
      "move": "使用 0 处的函数、一阶导数和二阶导数。"
    }
  },
  "calc2-taylor-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "泰勒级数",
    "name": "泰勒级数",
    "useItWhen": "你想要一个点附近的无限多项式版本",
    "looksLike": "由衍生品建立的总和",
    "doThis": "发现衍生品中的模式并写出完整的系列",
    "thinkOfItAs": "无停止点的泰勒多项式",
    "watchOutFor": "删除阶乘",
    "rememberThis": "衍生品构建整个系列",
    "typicalProblemShapes": [
      "麦克劳林或泰勒展开请求",
      "具有重复导数模式的函数"
    ],
    "miniDrill": [
      {
        "prompt": "泰勒多项式和泰勒级数之间有什么变化？",
        "answer": "该系列将永远持续下去。"
      },
      {
        "prompt": "每个阶数为 n 的项下面是什么？",
        "answer": "n 阶乘。"
      }
    ],
    "memoryHook": "泰勒级数是全程版本。",
    "quickExample": {
      "problem": "求 e^x 在 0 处的泰勒级数。",
      "move": "每个导数都保持 e^x，因此模式很简单。"
    }
  },
  "calc2-maclaurin-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "麦克劳林级数",
    "name": "麦克劳林级数",
    "useItWhen": "泰勒级数以 0 为中心",
    "looksLike": "x = 0 附近的级数",
    "doThis": "像泰勒一样对待它 a = 0",
    "thinkOfItAs": "泰勒的零中心表弟",
    "watchOutFor": "忘记麦克劳林就意味着中心 0",
    "rememberThis": "麦克劳林为 0 时的泰勒",
    "typicalProblemShapes": [
      "sin x、cos x、e^x、1/(1-x) 约 0",
      "提示具体命名麦克劳林"
    ],
    "miniDrill": [
      {
        "prompt": "麦克劳林的中心在哪里？",
        "answer": "0。"
      },
      {
        "prompt": "每个麦克劳林级数都是泰勒级数吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "麦克劳林只是意味着以零为中心。",
    "quickExample": {
      "problem": "是什么构成了麦克劳林级数？",
      "move": "它的中心是 x = 0。"
    }
  },
  "calc2-common-series": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "常见麦克劳林级数",
    "name": "常见麦克劳林级数",
    "useItWhen": "你想快速认识标准的四大",
    "looksLike": "e^x、sin x、cos x、1/(1-x)",
    "doThis": "记住基本模式并将其应用到新问题中",
    "thinkOfItAs": "你想要的公式表",
    "watchOutFor": "混淆正弦和余弦的符号",
    "rememberThis": "冷知基系列",
    "typicalProblemShapes": [
      "将函数重写为已知级数",
      "使用基础系列构建新系列"
    ],
    "miniDrill": [
      {
        "prompt": "哪个常见系列包含所有正项？",
        "answer": "e^x。"
      },
      {
        "prompt": "哪个常见级数交替奇次幂？",
        "answer": "罪x。"
      }
    ],
    "memoryHook": "了解四大并从那里开始构建。",
    "quickExample": {
      "problem": "e^x 的麦克劳林级数是什么？",
      "move": "对 n 阶乘求和 x^n。"
    }
  },
  "calc2-inverse-functions": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "反函数及其导数",
    "name": "反函数",
    "useItWhen": "需要撤消某个功能",
    "looksLike": "f 和 f^-1，交换 x 和 y",
    "doThis": "翻转 x 和 y，求解，然后根据需要使用逆导数规则",
    "thinkOfItAs": "向后运行函数",
    "watchOutFor": "忘记逆意味着输入和输出交换工作",
    "rememberThis": "逆函数撤销原函数",
    "typicalProblemShapes": [
      "求一对一函数的反函数",
      "求反函数的微分"
    ],
    "miniDrill": [
      {
        "prompt": "反转的第一步是什么？",
        "answer": "交换 x 和 y。"
      },
      {
        "prompt": "每个函数都有反函数吗？",
        "answer": "不，它必须是一对一的。"
      }
    ],
    "memoryHook": "逆向表示撤消。",
    "quickExample": {
      "problem": "你如何开始寻找逆元？",
      "move": "交换 x 和 y。"
    }
  },
  "calc2-exponential-derivatives": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "指数函数及其导数",
    "name": "指数导数",
    "useItWhen": "变量在指数中",
    "looksLike": "e^x, a^x, e^(g(x))",
    "doThis": "对指数求导并保持指数不变",
    "thinkOfItAs": "该函数会自我复制",
    "watchOutFor": "忘记 e^(g(x)) 的链式法则",
    "rememberThis": "e^x 保持 e^x",
    "typicalProblemShapes": [
      "指数增长公式",
      "e 升为线性或非线性表达式"
    ],
    "miniDrill": [
      {
        "prompt": "对 e^x 进行微分时会发生什么？",
        "answer": "它仍然是 e^x。"
      },
      {
        "prompt": "e^(x^2) 中出现了什么额外步骤？",
        "answer": "链式法则。"
      }
    ],
    "memoryHook": "指数保持指数。",
    "quickExample": {
      "problem": "e^(3x) 的导数？",
      "move": "保留 e^(3x)，然后乘以 3。"
    }
  },
  "calc2-log-functions": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "对数函数",
    "name": "日志功能",
    "useItWhen": "你需要撤销指数或简化乘积和幂",
    "looksLike": "ln x, log_a x",
    "doThis": "使用对数规则将乘法转为加法，将幂转为前系数",
    "thinkOfItAs": "公式解开器",
    "watchOutFor": "将 ln(x+y) 视为 ln x + ln y",
    "rememberThis": "日志破坏的是乘积，而不是求和",
    "typicalProblemShapes": [
      "日志简化",
      "对数方程或反指数问题"
    ],
    "miniDrill": [
      {
        "prompt": "ln(x + y) 分裂得很好吗？",
        "answer": "不。"
      },
      {
        "prompt": "ln(a^5) 变成什么？",
        "answer": "5 英寸。"
      }
    ],
    "memoryHook": "日志分割的是乘积，而不是总和。",
    "quickExample": {
      "problem": "什么是ln(ab)？",
      "move": "ln a + ln b。"
    }
  },
  "calc2-growth-decay": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "指数增长和衰退",
    "name": "成长与衰退",
    "useItWhen": "利率与当前金额成正比",
    "looksLike": "P(t) = P_0 e^(kt)",
    "doThis": "读取 k 的增长或衰减并插入模型",
    "thinkOfItAs": "以当前金额为基础的变化",
    "watchOutFor": "将正 k 与负 k 混合",
    "rememberThis": "正 k 增长，负 k 衰减",
    "typicalProblemShapes": [
      "人口、变冷、放射性衰变、复合增长",
      "带有 e^(kt) 的模型"
    ],
    "miniDrill": [
      {
        "prompt": "k 的什么符号表示增长？",
        "answer": "积极的。"
      },
      {
        "prompt": "k 的什么符号表示衰变？",
        "answer": "消极的。"
      }
    ],
    "memoryHook": "k 讲述这个故事。",
    "quickExample": {
      "problem": "P_0 e^(kt) 中的负 k 意味着什么？",
      "move": "衰变。"
    }
  },
  "calc2-inverse-trig": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "反三角函数",
    "name": "反三角函数",
    "useItWhen": "你需要给出三角值的角度",
    "looksLike": "反正弦、反正余、反正切",
    "doThis": "将输出读取为角度，并在需要时使用标准导数模式",
    "thinkOfItAs": "反向触发",
    "watchOutFor": "忘记反三角输出是角度",
    "rememberThis": "反三角函数返回角度",
    "typicalProblemShapes": [
      "从触发比恢复角度",
      "涉及反三角的导数公式"
    ],
    "miniDrill": [
      {
        "prompt": "arcsin 输出的是数字还是角度？",
        "answer": "一个角度。"
      },
      {
        "prompt": "反正切函数有什么作用？",
        "answer": "撤消其主范围上的切线。"
      }
    ],
    "memoryHook": "反三角函数返回角度。",
    "quickExample": {
      "problem": "arctan(1) 是什么意思？",
      "move": "正切为 1 的角。"
    }
  },
  "calc2-lhopitals-rule": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "不定形式和 l'Hospital 规则",
    "name": "医院法则",
    "useItWhen": "极限给出 0/0 或无穷大/无穷大",
    "looksLike": "不定形式的分数极限",
    "doThis": "区分顶部和底部，然后再次尝试限制",
    "thinkOfItAs": "又一传球打破僵局",
    "watchOutFor": "在检查表格之前使用它",
    "rememberThis": "先0/0或inf/inf，然后区分顶部和底部",
    "typicalProblemShapes": [
      "具有匹配放大或匹配零的硬分数限制",
      "代数清理后的指数对数限制"
    ],
    "miniDrill": [
      {
        "prompt": "l'Hospital 可以无限次使用吗？",
        "answer": "不。"
      },
      {
        "prompt": "绿光有哪两种形式？",
        "answer": "0/0 和无穷大/无穷大。"
      }
    ],
    "memoryHook": "在区分之前先检查一下表格。",
    "quickExample": {
      "problem": "l'Hospital什么时候可以开业？",
      "move": "验证 0/0 或无穷大/无穷大后。"
    }
  },
  "calc2-center-of-mass": {
    "course": "单变量微积分 2",
    "chapter": "第 8 章：积分的更多应用",
    "unit": "应用与曲线",
    "topic": "质心",
    "name": "质量中心",
    "useItWhen": "您需要区域或线路的平衡点",
    "looksLike": "质量密度和加权平均值",
    "doThis": "找到总质量，然后将力矩除以质量",
    "thinkOfItAs": "平衡点",
    "watchOutFor": "忘记密度会改变权重",
    "rememberThis": "力矩大于质量",
    "typicalProblemShapes": [
      "薄片或线平衡点",
      "密度加权平均位置"
    ],
    "miniDrill": [
      {
        "prompt": "最后除以什么？",
        "answer": "总质量。"
      },
      {
        "prompt": "密度重要吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "平衡点=力矩除以质量。",
    "quickExample": {
      "problem": "总质量之后是什么？",
      "move": "矩，然后除以质量。"
    }
  },
  "calc2-hydrostatic-force": {
    "course": "单变量微积分 2",
    "chapter": "第 8 章：积分的更多应用",
    "unit": "应用与曲线",
    "topic": "静水力",
    "name": "静水力",
    "useItWhen": "液体压力随深度变化",
    "looksLike": "作用在水中的板或门上的力",
    "doThis": "使用压力乘以薄带面积，然后按深度积分",
    "thinkOfItAs": "更深意味着更用力的推动",
    "watchOutFor": "到处使用一个恒定的压力",
    "rememberThis": "压力随深度增加",
    "typicalProblemShapes": [
      "水在垂直的板上推动",
      "压力随深度变化"
    ],
    "miniDrill": [
      {
        "prompt": "水中的压力保持恒定吗？",
        "answer": "不。"
      },
      {
        "prompt": "什么被集成：一次集成一条带还是整个板？",
        "answer": "细条。"
      }
    ],
    "memoryHook": "条带更深，推力更强。",
    "quickExample": {
      "problem": "通常什么变量驱动静水力？",
      "move": "深度。"
    }
  },
  "calc2-probability-density": {
    "course": "单变量微积分 2",
    "chapter": "第 8 章：积分的更多应用",
    "unit": "应用与曲线",
    "topic": "概率密度",
    "name": "概率密度",
    "useItWhen": "概率由密度函数给出，而不是由单独的情况给出",
    "looksLike": "f(x) 总面积为 1",
    "doThis": "在您关心的时间间隔内积分",
    "thinkOfItAs": "再次作为面积的概率",
    "watchOutFor": "忘记总面积必须为 1",
    "rememberThis": "密度的概率是面积",
    "typicalProblemShapes": [
      "连续随机变量",
      "找到一个常数，使总概率为 1"
    ],
    "miniDrill": [
      {
        "prompt": "密度下的总面积应该是多少？",
        "answer": "1."
      },
      {
        "prompt": "如何获得某个区间的概率？",
        "answer": "在该区间上积分。"
      }
    ],
    "memoryHook": "概率密度是指曲线下的面积。",
    "quickExample": {
      "problem": "如何得到 P(a < X < b)？",
      "move": "对从 a 到 b 的密度进行积分。"
    }
  },
  "calc2-direction-fields": {
    "course": "单变量微积分 2",
    "chapter": "第 9 章：微分方程",
    "unit": "微分方程",
    "topic": "方向场和欧拉方法",
    "name": "方向场/欧拉",
    "useItWhen": "微分方程比精确求解更容易阅读或近似",
    "looksLike": "dy/dx = f(x,y) 带斜率标记",
    "doThis": "读取斜率场或使用欧拉方法向前迈进",
    "thinkOfItAs": "沿着小斜坡箭头",
    "watchOutFor": "思考欧拉给出了确切的答案",
    "rememberThis": "欧拉走斜坡台阶",
    "typicalProblemShapes": [
      "在平面上绘制的坡度场",
      "初始条件的近似 y 值"
    ],
    "miniDrill": [
      {
        "prompt": "欧拉是精确的还是近似的？",
        "answer": "近似。"
      },
      {
        "prompt": "每个点的方向场显示什么？",
        "answer": "一个斜坡。"
      }
    ],
    "memoryHook": "微小的斜坡引导着曲线。",
    "quickExample": {
      "problem": "方向场显示什么？",
      "move": "微小的斜坡暗示了很多点。"
    }
  },
  "calc2-separable-equations": {
    "course": "单变量微积分 2",
    "chapter": "第 9 章：微分方程",
    "unit": "微分方程",
    "topic": "可分离方程",
    "name": "可分离方程",
    "useItWhen": "y 项和 x 项可以分开",
    "looksLike": "dy/dx = g(x)h(y)",
    "doThis": "用 dy 移动 y 的东西，用 dx 移动 x 的东西，然后积分",
    "thinkOfItAs": "将 x 和 y 放在房间的不同侧面",
    "watchOutFor": "分隔实际上不可分离的术语",
    "rememberThis": "分解、整合、解决",
    "typicalProblemShapes": [
      "仅 x 件和仅 y 件的乘积",
      "干净地重新排列的微分方程"
    ],
    "miniDrill": [
      {
        "prompt": "整合之前会发生什么？",
        "answer": "分离变量。"
      },
      {
        "prompt": "整合后，经常会出现什么情况？",
        "answer": "一个常数，也许是一个初始条件。"
      }
    ],
    "memoryHook": "如果x和y可以分开，则先分开。",
    "quickExample": {
      "problem": "可分离方程中的标志性动作是什么？",
      "move": "积分前分离变量。"
    }
  },
  "calc2-population-growth-models": {
    "course": "单变量微积分 2",
    "chapter": "第 9 章：微分方程",
    "unit": "微分方程",
    "topic": "人口增长模型",
    "name": "人口增长模型",
    "useItWhen": "数量根据当前大小增长",
    "looksLike": "指数增长或物流增长",
    "doThis": "确定模型是无限的还是有上限的",
    "thinkOfItAs": "自由生长或向天花板生长",
    "watchOutFor": "将物流增长与普通指数增长相结合",
    "rememberThis": "物流增长有承载能力",
    "typicalProblemShapes": [
      "人口随时间变化",
      "有上限或无上限的增长模型"
    ],
    "miniDrill": [
      {
        "prompt": "指数增长有承载能力吗？",
        "answer": "不。"
      },
      {
        "prompt": "物流增长是否趋于平稳？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "物流增长放缓至接近上限。",
    "quickExample": {
      "problem": "物流增长有什么额外特征？",
      "move": "上限或承载能力。"
    }
  },
  "calc2-linear-differential-equations": {
    "course": "单变量微积分 2",
    "chapter": "第 9 章：微分方程",
    "unit": "微分方程",
    "topic": "线性方程组",
    "name": "线性微分方程",
    "useItWhen": "一阶微分方程是线性形式",
    "looksLike": "y 质数 + P(x)y = Q(x)",
    "doThis": "将其转化为标准形式，然后使用积分因子",
    "thinkOfItAs": "一个乘法器解锁的混乱方程",
    "watchOutFor": "忘记先获取标准表格",
    "rememberThis": "线性一阶均值积分因子",
    "typicalProblemShapes": [
      "仅含 y 和 y 素数的一阶方程",
      "涉及积分因子的问题"
    ],
    "miniDrill": [
      {
        "prompt": "标准形式之后是什么？",
        "answer": "求积分因子。"
      },
      {
        "prompt": "这个方法需要先得到标准形式的方程吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "标准形式，然后积分因子。",
    "quickExample": {
      "problem": "线性一阶 ODE 的设置形式是什么？",
      "move": "y 素数 + P(x)y = Q(x)。"
    }
  },
  "calc2-hyperbolic-functions": {
    "course": "单变量微积分 2",
    "chapter": "第 6 章：反函数、指数与对数函数",
    "unit": "反函数、指数与对数函数",
    "topic": "双曲函数",
    "name": "双曲函数",
    "useItWhen": "sinh、cosh 或 tanh 出现",
    "looksLike": "sinh x、cosh x、tanh x",
    "doThis": "将它们视为由指数构建的三角函数表兄弟",
    "thinkOfItAs": "具有指数胆量的三角函数",
    "watchOutFor": "假设它们使用与正弦和余弦完全相同的恒等式",
    "rememberThis": "双曲函数的行为类似于三角函数，但来自 e^x",
    "typicalProblemShapes": [
      "涉及 sinh 或 cosh 的导数或恒等式",
      "悬链线或双曲线替代样式设置"
    ],
    "miniDrill": [
      {
        "prompt": "双曲函数背后的动力是什么？",
        "answer": "指数。"
      },
      {
        "prompt": "sinh x 与 cosh x 有区别吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "双曲线 = 三角风味，指数引擎。",
    "quickExample": {
      "problem": "sinh x 的导数是什么？",
      "move": "科什 X."
    }
  },
  "calc2-integration-strategy": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "整合策略",
    "name": "整合策略",
    "useItWhen": "你看到一个积分但不知道第一个工具",
    "looksLike": "具有多种可能方法的混合表达式",
    "doThis": "扫描模式：u-sub、部分、三角函数、部分分数或公式",
    "thinkOfItAs": "决策树，而不是盲目猜测",
    "watchOutFor": "对每个问题都采用一种最喜欢的方法",
    "rememberThis": "在挥杆之前先匹配图案",
    "typicalProblemShapes": [
      "与产品、根源或理性片段的混合表达",
      "询问应首先尝试哪种技术的家庭作业"
    ],
    "miniDrill": [
      {
        "prompt": "一种产品在差异化时具有一个简化因素？",
        "answer": "尝试分部分集成。"
      },
      {
        "prompt": "内部函数整齐地位于其导数内？",
        "answer": "尝试用 u 替换。"
      }
    ],
    "memoryHook": "不要猜测。模式匹配积分。",
    "quickExample": {
      "problem": "在选择方法之前你应该做什么？",
      "move": "阅读该模式并对积分进行分类。"
    }
  },
  "calc2-integration-tables-tech": {
    "course": "单变量微积分 2",
    "chapter": "第 7 章：积分技巧",
    "unit": "积分技巧",
    "topic": "使用表格和技术进行集成",
    "name": "桌子和技术",
    "useItWhen": "反导数很难看，但标准工具或软件可以完成它",
    "looksLike": "一个奇怪的被积函数，仍然符合已知的形式",
    "doThis": "将其重写为已知模式或使用技术来评估和检查",
    "thinkOfItAs": "当道路太乱而无法即兴发挥时使用地图",
    "watchOutFor": "信任计算器输出而不检查设置",
    "rememberThis": "在让技术人员提供帮助之前先进行设置",
    "typicalProblemShapes": [
      "带有表格条目的复杂反导数",
      "通过软件进行数值计算的定积分"
    ],
    "miniDrill": [
      {
        "prompt": "技术应该取代设置吗？",
        "answer": "不会。设置后应该会有帮助。"
      },
      {
        "prompt": "计算器积分有什么陷阱？",
        "answer": "输入错误或模式错误。"
      }
    ],
    "memoryHook": "数学建立后，技术会有所帮助。",
    "quickExample": {
      "problem": "在积分上使用技术之前应该做什么？",
      "move": "清理表格并确保输入正确。"
    }
  },
  "calc2-econ-bio-applications": {
    "course": "单变量微积分 2",
    "chapter": "第 8 章：积分的更多应用",
    "unit": "应用与曲线",
    "topic": "在经济学和生物学中的应用",
    "name": "经济学和生物学积分",
    "useItWhen": "总价值来自比率、密度或边际数量",
    "looksLike": "边际成本、边际收入、增长率或密度模型",
    "doThis": "将类似速率的量积分得到总意义",
    "thinkOfItAs": "将每个单元的故事转化为整个故事",
    "watchOutFor": "忘记常数或基线量",
    "rememberThis": "如果问题给出了一个比率，则积分以获得总数",
    "typicalProblemShapes": [
      "边际成本或收入问题",
      "根据比率数据构建的人口或生物总量"
    ],
    "miniDrill": [
      {
        "prompt": "边际数量意味着什么的变化率？",
        "answer": "总数量。"
      },
      {
        "prompt": "如何从费率中恢复总额？",
        "answer": "整合。"
      }
    ],
    "memoryHook": "先评分，后积分。",
    "quickExample": {
      "problem": "你如何利用边际成本来改变总成本？",
      "move": "整合它。"
    }
  },
  "calc2-modeling-differential-equations": {
    "course": "单变量微积分 2",
    "chapter": "第 9 章：微分方程",
    "unit": "微分方程",
    "topic": "使用微分方程建模",
    "name": "使用微分方程建模",
    "useItWhen": "文字问题说明事物如何变化，而不是最终公式",
    "looksLike": "速率取决于当前金额、时间或其他变量",
    "doThis": "将故事转化为变化率的方程式",
    "thinkOfItAs": "将故事变成变革规则",
    "watchOutFor": "当问题描述其速率时写下数量本身",
    "rememberThis": "对变化进行建模，然后求解模型",
    "typicalProblemShapes": [
      "有关生长、冷却、混合或运动的应用题",
      "提示要求您形成 DE，而不仅仅是求解 DE"
    ],
    "miniDrill": [
      {
        "prompt": "DE 是否对数量或其变化率进行建模？",
        "answer": "它的变化率。"
      },
      {
        "prompt": "建模问题的首要任务是什么？",
        "answer": "将故事转化为速率方程。"
      }
    ],
    "memoryHook": "关于改变的故事？写出变化方程。",
    "quickExample": {
      "problem": "如果增长与数量成正比，那么模型的形状是什么？",
      "move": "费率等于金额的 k 倍。"
    }
  },
  "calc2-predator-prey": {
    "course": "单变量微积分 2",
    "chapter": "第 9 章：微分方程",
    "unit": "微分方程",
    "topic": "捕食者-被捕食者系统",
    "name": "捕食者-被捕食者系统",
    "useItWhen": "两个群体一起互相推挤",
    "looksLike": "一个关于猎物的方程，一个关于捕食者的方程",
    "doThis": "跟踪每个群体如何影响另一个群体，而不是单独解决一个变量",
    "thinkOfItAs": "人口拉锯战循环",
    "watchOutFor": "将两个方程视为独立的",
    "rememberThis": "两个群体意味着一个耦合系统",
    "typicalProblemShapes": [
      "兔子和狐狸风格模型",
      "连接在一起的两个一阶方程"
    ],
    "miniDrill": [
      {
        "prompt": "捕食者与被捕食者是一个方程还是一个系统？",
        "answer": "一个系统。"
      },
      {
        "prompt": "人口之间会互相影响吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "捕食者和猎物同升同落。",
    "quickExample": {
      "problem": "为什么捕食者-被捕食者图经常循环？",
      "move": "每个群体都会延迟地改变另一个群体。"
    }
  },
  "calc2-conic-sections": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "圆锥截面",
    "name": "圆锥截面",
    "useItWhen": "该图形是抛物线、椭圆或双曲线",
    "looksLike": "标准模式中 x 和 y 项的平方",
    "doThis": "将方程写成标准形式并根据符号命名形状",
    "thinkOfItAs": "代数服装的形状识别",
    "watchOutFor": "在清理方程之前命名圆锥曲线",
    "rememberThis": "先重写，然后确定圆锥曲线",
    "typicalProblemShapes": [
      "抛物线、椭圆或双曲线识别",
      "完成平方以清理方程"
    ],
    "miniDrill": [
      {
        "prompt": "您是否在标准形式之前或之后确定圆锥曲线？",
        "answer": "后。"
      },
      {
        "prompt": "双曲线通常表示什么？",
        "answer": "平方项之间的减法。"
      }
    ],
    "memoryHook": "清理方程，然后读取形状。",
    "quickExample": {
      "problem": "如何快速识别圆锥曲线？",
      "move": "将其转化为标准形式并读取模式。"
    }
  },
  "calc2-polar-conics": {
    "course": "单变量微积分 2",
    "chapter": "第 10 章：参数方程与极坐标",
    "unit": "应用与曲线",
    "topic": "极坐标中的圆锥曲线",
    "name": "极圆锥曲线",
    "useItWhen": "圆锥曲线是用 r 和 theta 写成的",
    "looksLike": "r = ed / (1 加上或减去 e cos theta)",
    "doThis": "找出偏心形式并使用 e 来判断形状",
    "thinkOfItAs": "穿着极地衣服的同一个圆锥曲线",
    "watchOutFor": "忽略偏心率的作用",
    "rememberThis": "偏心率表明圆锥曲线类型",
    "typicalProblemShapes": [
      "轨道或焦点准线式极坐标方程",
      "询问曲线是椭圆、抛物线还是双曲线的问题"
    ],
    "miniDrill": [
      {
        "prompt": "这里什么数字决定圆锥曲线类型？",
        "answer": "偏心率 e．"
      },
      {
        "prompt": "e = 1 给出什么？",
        "answer": "一条抛物线。"
      }
    ],
    "memoryHook": "在极圆锥曲线中，e 主导一切。",
    "quickExample": {
      "problem": "在极圆锥曲线中 e 小于 1 意味着什么？",
      "move": "椭圆。"
    }
  },
  "calc2-series-strategy": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "测试策略系列",
    "name": "系列测试策略",
    "useItWhen": "出现一系列，您需要进行第一个测试来尝试",
    "looksLike": "西格玛无穷大且没有明显标签",
    "doThis": "检查术语限制，然后将模式与几何、p 级数、比较、比率、根或交替匹配",
    "thinkOfItAs": "测试步骤之前的排序步骤",
    "watchOutFor": "每个系列的跳跃比率测试",
    "rememberThis": "在选择测试之前识别模式",
    "typicalProblemShapes": [
      "一个新鲜的系列，没有提示适用哪个测试",
      "要求第一次测试最好的识别问题"
    ],
    "miniDrill": [
      {
        "prompt": "如果项不为零，收敛还是发散？",
        "answer": "发散。"
      },
      {
        "prompt": "阶乘或幂通常指向哪一个检验？",
        "answer": "比率测试。"
      }
    ],
    "memoryHook": "在测试之前对系列进行排序。",
    "quickExample": {
      "problem": "任何系列的第一个快速检查是什么？",
      "move": "查看项是否变为 0。"
    }
  },
  "calc2-taylor-applications": {
    "course": "单变量微积分 2",
    "chapter": "第 11 章：数列、级数与幂级数",
    "unit": "数列与级数",
    "topic": "泰勒多项式的应用",
    "name": "泰勒多项式应用",
    "useItWhen": "您需要使用多项式而不是完整函数进行附近的估计",
    "looksLike": "在中心 a 附近近似 f(x)",
    "doThis": "在中心附近使用短泰勒多项式并保持 x 靠近该中心",
    "thinkOfItAs": "更难的函数的本地替代品",
    "watchOutFor": "使用远离中心的近似值",
    "rememberThis": "泰勒在中心附近效果最好",
    "typicalProblemShapes": [
      "无需计算器即可近似函数值",
      "估计误差或决定有多少项就足够了"
    ],
    "miniDrill": [
      {
        "prompt": "泰勒是靠近中心还是远离中心变得更好？",
        "answer": "靠近中心。"
      },
      {
        "prompt": "为什么使用泰勒多项式？",
        "answer": "用更简单的局部多项式替换硬函数。"
      }
    ],
    "memoryHook": "泰勒 = 局部捷径多项式。",
    "quickExample": {
      "problem": "泰勒近似何时最值得信赖？",
      "move": "靠近扩张中心。"
    }
  },
  "calc3-3d-points": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "3D 点和距离",
    "name": "3D 点",
    "useItWhen": "你从平面移动到 x-y-z 空间",
    "looksLike": "（x、y、z）",
    "doThis": "使用三个坐标而不是两个坐标绘制点",
    "thinkOfItAs": "多一个方向的 2D",
    "watchOutFor": "忘记 z 会增加深度",
    "rememberThis": "同样的想法，多一个轴",
    "typicalProblemShapes": [
      "空间中的点",
      "3D 中的距离或中点"
    ],
    "miniDrill": [
      {
        "prompt": "3D 点使用多少个坐标？",
        "answer": "三。"
      },
      {
        "prompt": "z 加了什么？",
        "answer": "深度。"
      }
    ],
    "memoryHook": "3D 只是一个额外的轴。",
    "quickExample": {
      "problem": "绘图 (2, -1, 3)。",
      "move": "向 x 方向移动，然后向 y 方向移动，然后向上向 z 方向移动。"
    }
  },
  "calc3-vectors": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "向量",
    "name": "向量",
    "useItWhen": "你需要同时考虑幅度和方向",
    "looksLike": "<a、b、c>",
    "doThis": "将条目视为方向移动",
    "thinkOfItAs": "箭头，而不是位置",
    "watchOutFor": "将点与向量混合",
    "rememberThis": "点定位，向量移动",
    "typicalProblemShapes": [
      "位移问题",
      "幅度和方向问题"
    ],
    "miniDrill": [
      {
        "prompt": "向量代表一个位置或一个动作吗？",
        "answer": "一动。"
      },
      {
        "prompt": "矢量可以存在于 2D 和 3D 中吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "矢量是有方向的移动。",
    "quickExample": {
      "problem": "<2,-1,3>是什么意思？",
      "move": "向右移动2，向后移动1，向上移动3。"
    }
  },
  "calc3-dot-product": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "点积",
    "name": "点积",
    "useItWhen": "你需要角度、投影或正交",
    "looksLike": "你点v",
    "doThis": "乘以匹配的分量并添加",
    "thinkOfItAs": "两个箭头如何对齐",
    "watchOutFor": "混淆点与叉积",
    "rememberThis": "点给出一个数字",
    "typicalProblemShapes": [
      "向量之间的角度",
      "检查向量是否垂直"
    ],
    "miniDrill": [
      {
        "prompt": "点积输出什么：数字还是向量？",
        "answer": "数字。"
      },
      {
        "prompt": "如果点积为0，通常的含义是什么？",
        "answer": "垂直。"
      }
    ],
    "memoryHook": "点=乘法、匹配、加法。",
    "quickExample": {
      "problem": "查找<1,2,3>点<4,5,6>。",
      "move": "相乘并相加。"
    }
  },
  "calc3-cross-product": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "叉积",
    "name": "叉积",
    "useItWhen": "你需要一个垂直于另外两个向量的向量",
    "looksLike": "你交叉v",
    "doThis": "使用行列式模式和右手方向",
    "thinkOfItAs": "两个向量构成一个新的法线向量",
    "watchOutFor": "颠倒顺序并翻转标志",
    "rememberThis": "cross 给出垂直向量",
    "typicalProblemShapes": [
      "平面法线",
      "平行四边形的面积问题"
    ],
    "miniDrill": [
      {
        "prompt": "叉积输出的是数字还是向量？",
        "answer": "一个向量。"
      },
      {
        "prompt": "如果交换订单会发生什么？",
        "answer": "标志翻转。"
      }
    ],
    "memoryHook": "交叉使正常。",
    "quickExample": {
      "problem": "u x v 指向什么？",
      "move": "根据右手定则，与两者垂直。"
    }
  },
  "calc3-lines": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "空间中的线条",
    "name": "3D 线条",
    "useItWhen": "你需要一条穿过具有方向向量的点的线",
    "looksLike": "r(t) = r0 + tv",
    "doThis": "使用一点和一个方向向量",
    "thinkOfItAs": "起点加上重复的方向步骤",
    "watchOutFor": "使用方向向量所属的点",
    "rememberThis": "点加方向给出线",
    "typicalProblemShapes": [
      "参数线方程",
      "对称线方程"
    ],
    "miniDrill": [
      {
        "prompt": "构建 3D 线条需要多少成分？",
        "answer": "一个点和一个方向向量。"
      },
      {
        "prompt": "t 做什么？",
        "answer": "沿着线移动。"
      }
    ],
    "memoryHook": "点加方向构建线。",
    "quickExample": {
      "problem": "画一条穿过与 v 平行的点的线。",
      "move": "使用 r0 + 电视。"
    }
  },
  "calc3-planes": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "太空中的飞机",
    "name": "飞机",
    "useItWhen": "您需要 3D 平面",
    "looksLike": "ax + by + cz = d",
    "doThis": "使用一个点和一个法向量",
    "thinkOfItAs": "所有点都面向相同的法线",
    "watchOutFor": "将法线向量与平面内的方向混淆",
    "rememberThis": "法线向量控制平面",
    "typicalProblemShapes": [
      "平面方程",
      "平行或垂直平面问题"
    ],
    "miniDrill": [
      {
        "prompt": "什么向量定义了平面的方向？",
        "answer": "法向量。"
      },
      {
        "prompt": "ax + by + cz = d 是直线还是平面？",
        "answer": "一架飞机。"
      }
    ],
    "memoryHook": "平面 = 点加法线。",
    "quickExample": {
      "problem": "平面方程中<a,b,c>是什么意思？",
      "move": "它是法向量。"
    }
  },
  "calc3-quadric-surfaces": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "二次曲面",
    "name": "二次曲面",
    "useItWhen": "您需要 3D 表面名称的快速大图地图",
    "looksLike": "椭球面、抛物面、双曲面、圆锥体、圆柱体",
    "doThis": "读取符号，计算变量的平方，然后找出缺失的变量（如果它是圆柱体）",
    "thinkOfItAs": "形状识别清单，而不是解决问题",
    "watchOutFor": "将每个平方变量方程视为同一个曲面",
    "rememberThis": "符号和缺失变量命名表面",
    "typicalProblemShapes": [
      "根据方程命名曲面",
      "根据标志图案绘制形状"
    ],
    "miniDrill": [
      {
        "prompt": "气缸通常意味着什么？",
        "answer": "缺少一个变量。"
      },
      {
        "prompt": "这里标志的改变重要吗？",
        "answer": "是的。他们通常决定表面名称。"
      }
    ],
    "memoryHook": "符号加上缺失的变量可以说明形状。",
    "quickExample": {
      "problem": "在二次曲面方程中首先要检查什么？",
      "move": "符号模式以及变量是否缺失。"
    }
  },
  "calc3-cylinders": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "气缸",
    "name": "3D 圆柱体",
    "useItWhen": "方程中缺少一个变量",
    "looksLike": "x^2 + y^2 = 4，y = x^2，x^2/4 + z^2 = 1",
    "doThis": "在可见变量中绘制二维曲线，然后沿着缺失变量将其永远延伸",
    "thinkOfItAs": "直接穿过空间的二维图形",
    "watchOutFor": "思考圆柱体总是意味着圆柱体",
    "rememberThis": "缺少变量意味着图形朝该方向延伸",
    "typicalProblemShapes": [
      "抛物柱面： y = x^2",
      "椭圆柱：x^2/4 + y^2 = 1"
    ],
    "miniDrill": [
      {
        "prompt": "如果缺少 z，则圆柱体朝哪个方向运行？",
        "answer": "沿 z 轴。"
      },
      {
        "prompt": "圆柱体可以来自抛物线，而不仅仅是圆吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "缺失变量=拉伸图。",
    "quickExample": {
      "problem": "3D 中 y = x^2 是什么曲面？",
      "move": "沿 z 轴延伸的抛物柱面。"
    }
  },
  "calc3-ellipsoid": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "椭球体",
    "name": "椭球体",
    "useItWhen": "所有三个平方项均为正且等于常数",
    "looksLike": "x^2/a^2 + y^2/b^2 + z^2/c^2 = 1",
    "doThis": "从分母读取截距长度并描绘一个拉伸的球体",
    "thinkOfItAs": "每个轴上受到不同拉力的球体",
    "watchOutFor": "当符号不同时将椭球与双曲面混合",
    "rememberThis": "所有加号给出一个封闭的椭圆形表面",
    "typicalProblemShapes": [
      "以原点为中心的闭合 3D 椭圆形",
      "具有常数的三个正平方项的方程"
    ],
    "miniDrill": [
      {
        "prompt": "椭球体是开椭球体还是闭椭球体？",
        "answer": "关闭。"
      },
      {
        "prompt": "分母告诉你什么？",
        "answer": "轴长度。"
      }
    ],
    "memoryHook": "所有加号，全部关闭。",
    "quickExample": {
      "problem": "x^2/9 + y^2/4 + z^2 = 1 是什么形状？",
      "move": "半轴为 3、2 和 1 的椭球。"
    }
  },
  "calc3-paraboloids": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "抛物面",
    "name": "抛物面",
    "useItWhen": "一个变量是线性的，另外两个是平方的",
    "looksLike": "z = x^2 + y^2 或 z = x^2 - y^2",
    "doThis": "检查平方项是否具有相同的符号或相反的符号",
    "thinkOfItAs": "相同的符号是碗，相反的符号是马鞍",
    "watchOutFor": "将每个抛物面称为碗",
    "rememberThis": "相同符号的碗，相反符号的马鞍",
    "typicalProblemShapes": [
      "椭圆抛物面： z = x^2 + y^2",
      "双曲抛物面： z = x^2 - y^2"
    ],
    "miniDrill": [
      {
        "prompt": "平方项上的相同符号给出什么？",
        "answer": "碗形椭圆抛物面。"
      },
      {
        "prompt": "相反的符号表示什么？",
        "answer": "鞍形双曲抛物面。"
      }
    ],
    "memoryHook": "同标碗。相反的标志马鞍。",
    "quickExample": {
      "problem": "z = x^2 - y^2 是什么形状？",
      "move": "双曲抛物面，马鞍形。"
    }
  },
  "calc3-hyperboloids-and-cones": {
    "course": "多元微积分",
    "chapter": "第 12 章：向量与空间几何",
    "unit": "向量与三维空间",
    "topic": "双曲面和圆锥体",
    "name": "双曲面和圆锥体",
    "useItWhen": "平方项显示符号变化并且曲面不闭合",
    "looksLike": "x^2 + y^2 - z^2 = 1、-x^2 - y^2 + z^2 = 1、x^2 + y^2 = z^2",
    "doThis": "使用常量和符号模式来分离单片、两片和锥体",
    "thinkOfItAs": "双曲面是分裂或收缩的管；锥体撞击一个尖点",
    "watchOutFor": "将圆锥体与双曲面混合，因为两者都使用符号变化",
    "rememberThis": "等于0式在一点相遇意味着锥感",
    "typicalProblemShapes": [
      "单片双曲面",
      "两片双曲面或双锥体"
    ],
    "miniDrill": [
      {
        "prompt": "圆锥体有锐角吗？",
        "answer": "是的。"
      },
      {
        "prompt": "双曲面可以有一张还是两张吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "符号变化打开了表面；常量告诉版本。",
    "quickExample": {
      "problem": "如何快速区分一张纸和两张纸？",
      "move": "查看哪个变量具有奇数符号以及常数偏向哪一边。"
    }
  },
  "calc3-vector-valued-functions": {
    "course": "多元微积分",
    "chapter": "第 13 章：向量函数",
    "unit": "向量函数",
    "topic": "向量值函数",
    "name": "向量值函数",
    "useItWhen": "粒子随着时间在空间中移动",
    "looksLike": "r(t) = <x(t), y(t), z(t)>",
    "doThis": "逐个组件区分或集成",
    "thinkOfItAs": "矢量形式的参数运动",
    "watchOutFor": "尝试将整个向量视为一个标量公式",
    "rememberThis": "逐个组件地工作",
    "typicalProblemShapes": [
      "空间位置、速度、加速度",
      "曲线向量方程"
    ],
    "miniDrill": [
      {
        "prompt": "如何对向量函数进行微分？",
        "answer": "一次一个组件。"
      },
      {
        "prompt": "r素数在运动中通常被称为什么？",
        "answer": "速度。"
      }
    ],
    "memoryHook": "向量函数分为多个分量。",
    "quickExample": {
      "problem": "微分<t, t^2, sin t>。",
      "move": "区分每个条目。"
    }
  },
  "calc3-curvature": {
    "course": "多元微积分",
    "chapter": "第 13 章：向量函数",
    "unit": "向量函数",
    "topic": "弧长和曲率",
    "name": "曲率",
    "useItWhen": "你需要空间曲线弯曲的程度",
    "looksLike": "弧长、单位正切、曲率公式",
    "doThis": "找到速度和切线行为，然后测量弯曲",
    "thinkOfItAs": "道路有多艰难",
    "watchOutFor": "混合速度与曲率",
    "rememberThis": "曲率测量转动，而不仅仅是运动",
    "typicalProblemShapes": [
      "具有切线和法线向量的空间曲线",
      "关于路径弯曲程度的问题"
    ],
    "miniDrill": [
      {
        "prompt": "大曲率意味着更直还是更弯曲？",
        "answer": "本迪尔。"
      },
      {
        "prompt": "曲率和速度一样吗",
        "answer": "不。"
      }
    ],
    "memoryHook": "曲率是转动强度。",
    "quickExample": {
      "problem": "大曲率是什么意思？",
      "move": "曲线在那里急剧弯曲。"
    }
  },
  "calc3-multivariable-functions": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "多个变量的函数",
    "name": "多变量函数",
    "useItWhen": "输出取决于两个或多个输入",
    "looksLike": "f(x, y) 或 f(x, y, z)",
    "doThis": "将函数解读为表面或高维规则",
    "thinkOfItAs": "一个输出由多个旋钮供电",
    "watchOutFor": "忘记域名可以被限制",
    "rememberThis": "更多的输入仍然意味着一种输出",
    "typicalProblemShapes": [
      "曲面如 z = x^2 + y^2",
      "有两个输入的函数"
    ],
    "miniDrill": [
      {
        "prompt": "f(x,y) 有一个输出还是两个输出？",
        "answer": "一个输出。"
      },
      {
        "prompt": "z = f(x,y) 通常会产生什么？",
        "answer": "一个表面。"
      }
    ],
    "memoryHook": "更多的输入，仍然是一种输出。",
    "quickExample": {
      "problem": "z = f(x, y) 通常绘制成什么图形？",
      "move": "3D 表面。"
    }
  },
  "calc3-multivariable-limits": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "多个变量的极限和连续性",
    "name": "多变量极限",
    "useItWhen": "您需要表面上某个点附近的行为",
    "looksLike": "当 (x, y) 变为 (a, b) 时的极限",
    "doThis": "测试不同的路径是否给出相同的答案",
    "thinkOfItAs": "路径检查而不是左右检查",
    "watchOutFor": "仅测试一条路径",
    "rememberThis": "不同的路径，不同的答案，意味着没有极限",
    "typicalProblemShapes": [
      "x 和 y 的原点处的极限",
      "路径比较问题"
    ],
    "miniDrill": [
      {
        "prompt": "多变量限制仅使用左和右吗？",
        "answer": "不，有很多条路。"
      },
      {
        "prompt": "如果两条路径不一致，是否存在极限？",
        "answer": "不。"
      }
    ],
    "memoryHook": "如果路径不一致，则限制消失。",
    "quickExample": {
      "problem": "二元极限怎么会失效呢？",
      "move": "不同的路径可以给出不同的值。"
    }
  },
  "calc3-partial-derivatives": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "偏导数",
    "name": "偏导数",
    "useItWhen": "您更改一个变量并冻结其他变量",
    "looksLike": "f_x、f_y、f_z",
    "doThis": "一次对一个变量进行微分",
    "thinkOfItAs": "一个旋钮移动，而其他旋钮保持静止",
    "watchOutFor": "也改变冻结变量",
    "rememberThis": "将其他变量视为常量",
    "typicalProblemShapes": [
      "x 和 y 中带下标的函数，如 f_x",
      "一个输入方向的变化率"
    ],
    "miniDrill": [
      {
        "prompt": "当找到 f_x 时，y 会发生什么？",
        "answer": "将其视为常数。"
      },
      {
        "prompt": "一个函数可以有多个偏导数吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "一个变量发生变化，其余变量则冻结。",
    "quickExample": {
      "problem": "求 x^2 y + y^3 的 f_x。",
      "move": "将 y 视为常数。"
    }
  },
  "calc3-tangent-plane": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "切平面和线性化",
    "name": "切面",
    "useItWhen": "您需要表面的平坦局部近似",
    "looksLike": "求一点的切平面",
    "doThis": "使用点、f_x 和 f_y",
    "thinkOfItAs": "表面的局部平坦斑块",
    "watchOutFor": "忘记基点值",
    "rememberThis": "点加上部分斜率构建平面",
    "typicalProblemShapes": [
      "z = f(x,y) 的线性化",
      "曲面上一点附近的近似"
    ],
    "miniDrill": [
      {
        "prompt": "有多少个第一部分驱动 2 个变量中的切平面？",
        "answer": "二。"
      },
      {
        "prompt": "切平面离该点的距离是否准确？",
        "answer": "不。"
      }
    ],
    "memoryHook": "使用该点和部分斜率。",
    "quickExample": {
      "problem": "什么导数驱动切平面？",
      "move": "f_x 和 f_y 位于该点。"
    }
  },
  "calc3-multivariable-chain-rule": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "多个变量的链式法则",
    "name": "多变量链式法则",
    "useItWhen": "变量依赖于层中的其他变量",
    "looksLike": "z = f(x, y) 其中 x 和 y 均取决于 t",
    "doThis": "考虑所有依赖路径",
    "thinkOfItAs": "衍生品流程图",
    "watchOutFor": "缺少一条路径",
    "rememberThis": "每一条道路都有贡献",
    "typicalProblemShapes": [
      "x 和 y 都是 t 的函数",
      "衍生品的树形图"
    ],
    "miniDrill": [
      {
        "prompt": "如果有两个输入路径，两者都重要吗？",
        "answer": "是的。"
      },
      {
        "prompt": "这里常见的错误是什么？",
        "answer": "缺少一条路。"
      }
    ],
    "memoryHook": "遵循每个依赖路径。",
    "quickExample": {
      "problem": "如果 z 取决于 x 和 y，并且两者都取决于 t，那么 dz/dt 中会显示什么？",
      "move": "x 路径和 y 路径部分。"
    }
  },
  "calc3-directional-derivative": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "定向导数",
    "name": "方向导数",
    "useItWhen": "您需要选定方向的变化率",
    "looksLike": "D_u f",
    "doThis": "使用梯度点单位方向向量",
    "thinkOfItAs": "如果你走这条路有多陡",
    "watchOutFor": "忘记将方向向量设为单位向量",
    "rememberThis": "方向导数 = 梯度 f 点 u",
    "typicalProblemShapes": [
      "特定方向的变化率",
      "给出一点向量方向的问题"
    ],
    "miniDrill": [
      {
        "prompt": "你需要长度1吗？",
        "answer": "是的。"
      },
      {
        "prompt": "什么向量与 u 配对？",
        "answer": "梯度。"
      }
    ],
    "memoryHook": "选择一个方向，点渐变。",
    "quickExample": {
      "problem": "如何测试向 u 方向的斜率？",
      "move": "用单位向量点梯度。"
    }
  },
  "calc3-gradient": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "坡度",
    "name": "坡度",
    "useItWhen": "你需要增长最快的方向",
    "looksLike": "grad f 或 nabla f",
    "doThis": "构建一阶偏导数向量",
    "thinkOfItAs": "最陡的上坡箭头",
    "watchOutFor": "认为梯度是一个数字",
    "rememberThis": "坡度点上坡最快",
    "typicalProblemShapes": [
      "最陡上升问题",
      "水平曲线或曲面的法向量"
    ],
    "miniDrill": [
      {
        "prompt": "梯度是矢量还是标量？",
        "answer": "一个向量。"
      },
      {
        "prompt": "它指向什么方向？",
        "answer": "增幅最快。"
      }
    ],
    "memoryHook": "梯度是上坡箭头。",
    "quickExample": {
      "problem": "f(x,y) 的梯度 f 是多少？",
      "move": "<f_x，f_y>。"
    }
  },
  "calc3-two-variable-extrema": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "两个变量的局部极值",
    "name": "二变量极值",
    "useItWhen": "你需要 f(x,y) 的最大值或最小值",
    "looksLike": "找到关键点并对其进行分类",
    "doThis": "将一阶偏导设置为零，然后使用二阶导数检验",
    "thinkOfItAs": "山丘、山谷或马鞍状表面",
    "watchOutFor": "将每个临界点称为最大值或最小值",
    "rememberThis": "首先是临界点，其次是分类",
    "typicalProblemShapes": [
      "f_x = 0 且 f_y = 0 系统",
      "有关局部最大值、最小值或鞍点的问题"
    ],
    "miniDrill": [
      {
        "prompt": "什么方程定义两个变量的临界点？",
        "answer": "f_x = 0 且 f_y = 0。"
      },
      {
        "prompt": "临界点可以既不是最大值也不是最小值吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "表面可以呈鞍状，而不仅仅是峰或谷。",
    "quickExample": {
      "problem": "除了最大值或最小值之外，临界点还可以是什么呢？",
      "move": "一个鞍点。"
    }
  },
  "calc3-lagrange-multipliers": {
    "course": "多元微积分",
    "chapter": "第 14 章：偏导数",
    "unit": "偏导数",
    "topic": "拉格朗日乘数",
    "name": "拉格朗日乘数",
    "useItWhen": "你在约束条件下进行优化",
    "looksLike": "最大化 f 服从 g = c",
    "doThis": "设置 grad f = lambda grad g 并也使用约束",
    "thinkOfItAs": "卡在栅栏上时的最佳点",
    "watchOutFor": "忘记原来的约束方程",
    "rememberThis": "优化加约束意味着梯度对齐",
    "typicalProblemShapes": [
      "具有曲线或曲面限制的最大/最小",
      "具有一个显式约束的优化"
    ],
    "miniDrill": [
      {
        "prompt": "系统中必须保留哪些额​​外方程？",
        "answer": "约束。"
      },
      {
        "prompt": "这里通常出现什么符号？",
        "answer": "拉姆达。"
      }
    ],
    "memoryHook": "约束问题？排列渐变。",
    "quickExample": {
      "problem": "如何开始约束优化？",
      "move": "写出 grad f = lambda grad g。"
    }
  },
  "calc3-double-integrals": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "二重积分",
    "name": "二重积分",
    "useItWhen": "您在一个区域上添加值",
    "looksLike": "区域 R 上的二重积分",
    "doThis": "设置边界并积分两次",
    "thinkOfItAs": "在一个区域上添加小瓷砖",
    "watchOutFor": "使用错误的区域边界",
    "rememberThis": "双积分意味着面积总和",
    "typicalProblemShapes": [
      "xy 平面中的面积区域",
      "某个区域的平均值或质量"
    ],
    "miniDrill": [
      {
        "prompt": "发生了多少整合？",
        "answer": "二。"
      },
      {
        "prompt": "使用什么样的区域？",
        "answer": "二维区域。"
      }
    ],
    "memoryHook": "在一个区域上平铺。",
    "quickExample": {
      "problem": "二重积分累加什么？",
      "move": "二维区域。"
    }
  },
  "calc3-iterated-integrals": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "迭代积分",
    "name": "迭代积分",
    "useItWhen": "二重积分被写成一个在另一个里面",
    "looksLike": "积分 f(x,y) dy dx 的积分",
    "doThis": "先读内界，后读外界",
    "thinkOfItAs": "一次一个方向",
    "watchOutFor": "混合哪个边界与哪个变量",
    "rememberThis": "内部边界匹配内部变量",
    "typicalProblemShapes": [
      "嵌套积分表示法",
      "更改集成顺序问题"
    ],
    "miniDrill": [
      {
        "prompt": "哪个变量先行：内部变量还是外部变量？",
        "answer": "内。"
      },
      {
        "prompt": "边界是否附加到它们旁边的变量上？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "从内到外阅读。",
    "quickExample": {
      "problem": "迭代积分中哪些界限属于 dy？",
      "move": "内对。"
    }
  },
  "calc3-changing-order": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "改变整合顺序",
    "name": "更改订单",
    "useItWhen": "当前的迭代积分很难看",
    "looksLike": "dy dx 变为 dx dy",
    "doThis": "重新绘制区域并写入新边界",
    "thinkOfItAs": "同一区域，不同切片",
    "watchOutFor": "翻转边界而不重绘",
    "rememberThis": "先画，后重写",
    "typicalProblemShapes": [
      "具有尴尬的内部反导数的嵌套积分",
      "平面上曲线给出的区域"
    ],
    "miniDrill": [
      {
        "prompt": "更改订单时的第一步？",
        "answer": "绘制区域。"
      },
      {
        "prompt": "地区有变化吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "同一区域，新切片。",
    "quickExample": {
      "problem": "如何安全地更改订单？",
      "move": "首先绘制区域草图。"
    }
  },
  "calc3-polar-double-integrals": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "极坐标中的二重积分",
    "name": "极二重积分",
    "useItWhen": "该区域是圆形或放射状的",
    "looksLike": "磁盘、环、扇区、x^2 + y^2",
    "doThis": "切换到 r 和 theta 并记住额外​​的 r",
    "thinkOfItAs": "圆需要圆坐标",
    "watchOutFor": "忘记额外的 r 因素",
    "rememberThis": "极二重积分需要额外的 r",
    "typicalProblemShapes": [
      "圆形区域",
      "x^2 + y^2 或圆对称的被积函数"
    ],
    "miniDrill": [
      {
        "prompt": "使用什么坐标变化？",
        "answer": "x = r cos theta，y = r sin theta。"
      },
      {
        "prompt": "必须出现什么额外因素？",
        "answer": "河"
      }
    ],
    "memoryHook": "圆形区域？转到极坐标并添加 r。",
    "quickExample": {
      "problem": "极坐标二重积分中出现什么额外因子？",
      "move": "河"
    }
  },
  "calc3-triple-integrals": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "三重积分",
    "name": "三重积分",
    "useItWhen": "您可以在 3D 实体上添加值",
    "looksLike": "固体 E 上的三重积分",
    "doThis": "设置实体边界并积分三次",
    "thinkOfItAs": "将小盒子堆放在一个卷中",
    "watchOutFor": "在 3D 区域上使用区域样式边界",
    "rememberThis": "三重积分对体积求和",
    "typicalProblemShapes": [
      "固体的质量或体积",
      "三层嵌套积分"
    ],
    "miniDrill": [
      {
        "prompt": "这里嵌套了多少个积分？",
        "answer": "三。"
      },
      {
        "prompt": "这个覆盖面积还是体积？",
        "answer": "体积。"
      }
    ],
    "memoryHook": "三重积分 = 空间中的小盒子。",
    "quickExample": {
      "problem": "三重积分使用什么样的区域？",
      "move": "3D 实体区域。"
    }
  },
  "calc3-cylindrical-coordinates": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "圆柱坐标",
    "name": "圆柱坐标",
    "useItWhen": "3D 实体绕 z 轴具有圆形对称性",
    "looksLike": "x^2 + y^2，其中 z 仍然分开",
    "doThis": "在 xy 部分使用极坐标并将 z 保留为 z",
    "thinkOfItAs": "极坐标加高度",
    "watchOutFor": "忘记雅可比因子 r",
    "rememberThis": "圆柱 = 极坐标 z",
    "typicalProblemShapes": [
      "气缸和管子",
      "x^2 + y^2 的积函数"
    ],
    "miniDrill": [
      {
        "prompt": "柱坐标系中什么保持不变？",
        "answer": "z。"
      },
      {
        "prompt": "还出现什么额外因素？",
        "answer": "河"
      }
    ],
    "memoryHook": "极地在楼下，z在楼上。",
    "quickExample": {
      "problem": "什么时候圆柱形比矩形更好？",
      "move": "当实体绕 z 轴呈圆形时。"
    }
  },
  "calc3-spherical-coordinates": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "球坐标",
    "name": "球坐标",
    "useItWhen": "固体是球形或球体友好的",
    "looksLike": "球体、锥体、rho^2 项",
    "doThis": "切换到 rho、theta、phi 并包含完整的雅可比行列式",
    "thinkOfItAs": "3D极坐标",
    "watchOutFor": "混淆了 phi 和 theta 或忘记了正弦因子",
    "rememberThis": "球面问题，例如球坐标",
    "typicalProblemShapes": [
      "具有球对称性的球、壳、锥体",
      "x^2 + y^2 + z^2 中的被积函数"
    ],
    "miniDrill": [
      {
        "prompt": "雅可比行列式中出现了什么额外的三角因子？",
        "answer": "新披。"
      },
      {
        "prompt": "球体的最佳坐标？",
        "answer": "球形。"
      }
    ],
    "memoryHook": "球体形状？变成球形。",
    "quickExample": {
      "problem": "什么样的实体通常需要球坐标？",
      "move": "球体或球壳。"
    }
  },
  "calc3-change-of-variables": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "变量的变化",
    "name": "变量的变化",
    "useItWhen": "区域或被积函数在新变量中变得更清晰",
    "looksLike": "u-v 替代二重积分",
    "doThis": "重写该区域并乘以雅可比行列式",
    "thinkOfItAs": "在计算之前切换地图",
    "watchOutFor": "改变变量但不改变面积或体积因子",
    "rememberThis": "新变量需要雅可比行列式",
    "typicalProblemShapes": [
      "倾斜或拉伸区域",
      "二重积分中的自定义替换"
    ],
    "miniDrill": [
      {
        "prompt": "这里出现了什么类似矩阵的因子？",
        "answer": "雅可比行列式。"
      },
      {
        "prompt": "界限保持不变吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "新变量意味着新界限和雅可比行列式。",
    "quickExample": {
      "problem": "除了公式之外还需要改变什么？",
      "move": "区域和雅可比因子。"
    }
  },
  "calc3-vector-fields": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "矢量场",
    "name": "矢量场",
    "useItWhen": "空间中的每个点都有自己的向量",
    "looksLike": "F(x, y) = <P, Q> 或 F(x, y, z) = <P, Q, R>",
    "doThis": "将字段读取为附加到每个点的箭头",
    "thinkOfItAs": "风向图",
    "watchOutFor": "将向量场视为标量函数",
    "rememberThis": "向量场=每个点的箭头",
    "typicalProblemShapes": [
      "流场、力场或速度场图片",
      "平面或空间中的箭头图"
    ],
    "miniDrill": [
      {
        "prompt": "矢量场输出的是数字还是矢量？",
        "answer": "一个向量。"
      },
      {
        "prompt": "什么常见的图片与向量场相匹配？",
        "answer": "风图。"
      }
    ],
    "memoryHook": "矢量场是箭头图。",
    "quickExample": {
      "problem": "矢量场分配给每个点什么？",
      "move": "一个向量。"
    }
  },
  "calc3-line-integrals": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "线积分",
    "name": "线积分",
    "useItWhen": "沿着曲线添加一个字段",
    "looksLike": "C 积分",
    "doThis": "参数化曲线，然后沿路径积分",
    "thinkOfItAs": "增加旅途中的工作量",
    "watchOutFor": "忘记道路很重要",
    "rememberThis": "线积分沿着曲线累积",
    "typicalProblemShapes": [
      "力场所做的功",
      "路径 C 上的积分"
    ],
    "miniDrill": [
      {
        "prompt": "线积分发生在区域或曲线上吗？",
        "answer": "曲线。"
      },
      {
        "prompt": "什么经常启动设置？",
        "answer": "参数化。"
      }
    ],
    "memoryHook": "线积分沿着路径行驶。",
    "quickExample": {
      "problem": "线积分需要什么额外的成分？",
      "move": "路径或参数化。"
    }
  },
  "calc3-conservative-fields": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "保守向量场",
    "name": "保守领域",
    "useItWhen": "您想要路径独立性或简单的线积分",
    "looksLike": "F = 梯度 f",
    "doThis": "如果场是保守的，求一个势函数",
    "thinkOfItAs": "来自一个隐藏标量函数的字段",
    "watchOutFor": "假设每个领域都是保守的",
    "rememberThis": "保守意味着梯度场",
    "typicalProblemShapes": [
      "潜在的功能问题",
      "路径独立问题"
    ],
    "miniDrill": [
      {
        "prompt": "您在寻找什么隐藏功能？",
        "answer": "一个潜在的函数。"
      },
      {
        "prompt": "路径独立性通常意味着什么？",
        "answer": "保守领域。"
      }
    ],
    "memoryHook": "发现潜力，简化工作路径。",
    "quickExample": {
      "problem": "为什么保守领域很好？",
      "move": "线积分变得更加容易。"
    }
  },
  "calc3-ftc-line-integrals": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "线积分基本定理",
    "name": "FTC 线积分",
    "useItWhen": "该领域是保守的",
    "looksLike": "梯度 f 点 dr 的积分",
    "doThis": "使用终点处的电势减去起点处的电势",
    "thinkOfItAs": "路径的顶部减去底部",
    "watchOutFor": "在不保守的领域使用它",
    "rememberThis": "结束时的电位减去开始时的电位",
    "typicalProblemShapes": [
      "给定势函数 f",
      "有起点和终点的保守场"
    ],
    "miniDrill": [
      {
        "prompt": "路径在这个定理中重要吗？",
        "answer": "不，一旦这个领域变得保守，就不会了。"
      },
      {
        "prompt": "哪两点重要？",
        "answer": "开始和结束。"
      }
    ],
    "memoryHook": "起点胜过完整路径。",
    "quickExample": {
      "problem": "如何快速评估保守场线积分？",
      "move": "最终点的电势减去初始点的电势。"
    }
  },
  "calc3-greens-theorem": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "格林定理",
    "name": "格林定理",
    "useItWhen": "围绕闭合平面曲线的线积分应变为二重积分",
    "looksLike": "平面内区域 R 周围的闭合曲线 C",
    "doThis": "将边界工作替换为区域工作",
    "thinkOfItAs": "边缘信息转化为区域信息",
    "watchOutFor": "忘记曲线必须闭合且方向正确",
    "rememberThis": "平面内的闭合曲线可以变成二重积分",
    "typicalProblemShapes": [
      "二维逆时针闭合曲线",
      "线积分看起来像二重积分更容易"
    ],
    "miniDrill": [
      {
        "prompt": "格林定理是 2D 还是 3D？",
        "answer": "2D。"
      },
      {
        "prompt": "曲线需要闭合吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "平面闭环？想想绿色。",
    "quickExample": {
      "problem": "格林定理什么时候起作用？",
      "move": "闭合曲线、平面区域、边界周围的线积分。"
    }
  },
  "calc3-surface-integrals": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "表面积分",
    "name": "表面积分",
    "useItWhen": "您可以在表面上添加值",
    "looksLike": "曲面 S 上的二重积分",
    "doThis": "参数化曲面或使用图形公式",
    "thinkOfItAs": "双积分提升到曲面片材上",
    "watchOutFor": "将表面视为平坦区域",
    "rememberThis": "表面积分分布在表面上，而不是平面上",
    "typicalProblemShapes": [
      "表面上的标量场",
      "弯片面积累加"
    ],
    "miniDrill": [
      {
        "prompt": "曲面积分是否直接使用平坦区域？",
        "answer": "不。"
      },
      {
        "prompt": "您经常对表面进行参数化吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "与二重积分的想法相同，但在一张纸上。",
    "quickExample": {
      "problem": "您在这里集成了什么样的对象？",
      "move": "一个表面。"
    }
  },
  "calc3-flux": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "通量",
    "name": "通量",
    "useItWhen": "你想要有多少场穿过表面",
    "looksLike": "F 在表面上点 n",
    "doThis": "使用法线方向并测量流量",
    "thinkOfItAs": "有多少风穿过网",
    "watchOutFor": "使用错误的法线方向",
    "rememberThis": "通量测量通过，而不是沿着",
    "typicalProblemShapes": [
      "流经表面",
      "法向量方向问题"
    ],
    "miniDrill": [
      {
        "prompt": "通量使用切线方向还是法线方向？",
        "answer": "正常方向。"
      },
      {
        "prompt": "方向可以改变标志吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "通量是通流。",
    "quickExample": {
      "problem": "正通量通常意味着什么？",
      "move": "沿所选法线方向流过表面的净流量。"
    }
  },
  "calc3-divergence-and-curl": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "发散和旋度",
    "name": "发散和卷曲",
    "useItWhen": "你需要一个领域的局部展开或局部旋转",
    "looksLike": "div F 和curl F",
    "doThis": "将散度读作源/汇，将旋度读作旋转",
    "thinkOfItAs": "传播与旋转",
    "watchOutFor": "混合每个人的衡量标准",
    "rememberThis": "散度扩散，旋度旋转",
    "typicalProblemShapes": [
      "某一点的场行为",
      "使用大定理之前的测试"
    ],
    "miniDrill": [
      {
        "prompt": "哪一个测量旋转？",
        "answer": "卷曲。"
      },
      {
        "prompt": "哪一个衡量源行为或汇行为？",
        "answer": "分歧。"
      }
    ],
    "memoryHook": "发散=传播。卷曲=旋转。",
    "quickExample": {
      "problem": "卷曲描述什么？",
      "move": "本地轮换。"
    }
  },
  "calc3-divergence-theorem": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "散度定理",
    "name": "散度定理",
    "useItWhen": "闭面通量应该成为三重积分",
    "looksLike": "穿过封闭表面的通量",
    "doThis": "将表面通量交换为散度三重积分",
    "thinkOfItAs": "皮肤流动向内扩散",
    "watchOutFor": "在开放表面上使用它",
    "rememberThis": "闭合表面通量可以变成体积积分",
    "typicalProblemShapes": [
      "封闭的表面，如球体或盒子",
      "从内部更容易解决通量问题"
    ],
    "miniDrill": [
      {
        "prompt": "曲面需要封闭吗？",
        "answer": "是的。"
      },
      {
        "prompt": "三重积分里面显示了什么？",
        "answer": "分歧。"
      }
    ],
    "memoryHook": "封闭皮肤？向内移动，发散。",
    "quickExample": {
      "problem": "该定理交易什么？",
      "move": "内部三重积分的闭面通量。"
    }
  },
  "calc3-stokes-theorem": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "斯托克斯定理",
    "name": "斯托克斯定理",
    "useItWhen": "空间曲线周围的线积分应该变成曲面积分",
    "looksLike": "3D 曲面的边界曲线",
    "doThis": "将边界线积分替换为旋度的表面积分",
    "thinkOfItAs": "3D 格林定理",
    "watchOutFor": "边界方向和表面法线不匹配",
    "rememberThis": "边界功可以变成穿过表面的卷曲",
    "typicalProblemShapes": [
      "包围曲面的闭合空间曲线",
      "线积分比曲面问题更容易"
    ],
    "miniDrill": [
      {
        "prompt": "表面积分内部出现什么场量？",
        "answer": "卷曲。"
      },
      {
        "prompt": "这在二维中是什么样的常见定理？",
        "answer": "格林定理。"
      }
    ],
    "memoryHook": "斯托克斯在 3D 中是绿色的。",
    "quickExample": {
      "problem": "什么定理将边界线积分转化为旋度的表面积分？",
      "move": "斯托克斯定理。"
    }
  },
  "calc3-vector-derivatives-integrals": {
    "course": "多元微积分",
    "chapter": "第 13 章：向量函数",
    "unit": "向量函数",
    "topic": "向量函数的导数和积分",
    "name": "向量导数/积分",
    "useItWhen": "空间曲线被写成向量并且您需要运动数据",
    "looksLike": "r-prime(t)，r(t) 的积分",
    "doThis": "逐个组件区分或集成",
    "thinkOfItAs": "同样的规则，三车道",
    "watchOutFor": "在区分之前尝试组合组件",
    "rememberThis": "单独完成每个组件",
    "typicalProblemShapes": [
      "矢量形式的位置、速度、加速度",
      "空间曲线导数问题"
    ],
    "miniDrill": [
      {
        "prompt": "向量函数的导数是由什么构成的？",
        "answer": "每个组件的衍生物。"
      },
      {
        "prompt": "对向量函数积分后会出现什么？",
        "answer": "一个常数向量。"
      }
    ],
    "memoryHook": "相同的动作，逐个组件。",
    "quickExample": {
      "problem": "如何整合<f,g,h>？",
      "move": "分别集成每个组件。"
    }
  },
  "calc3-motion-in-space": {
    "course": "多元微积分",
    "chapter": "第 13 章：向量函数",
    "unit": "向量函数",
    "topic": "空间运动",
    "name": "空间运动",
    "useItWhen": "粒子在空间曲线上运动",
    "looksLike": "位置、速度、加速度矢量",
    "doThis": "区分速度的位置和加速度",
    "thinkOfItAs": "使用 3D 箭头计算 1 运动",
    "watchOutFor": "混合速度与速度",
    "rememberThis": "速度是矢量，速度是它的长度",
    "typicalProblemShapes": [
      "粒子在三维空间中的运动",
      "位置到速度到加速度链"
    ],
    "miniDrill": [
      {
        "prompt": "速度是矢量吗",
        "answer": "不，它是一个标量。"
      },
      {
        "prompt": "你如何获得加速？",
        "answer": "求速度微分。"
      }
    ],
    "memoryHook": "速度点。速度只是衡量标准。",
    "quickExample": {
      "problem": "如何从速度得到速度？",
      "move": "取速度矢量的大小。"
    }
  },
  "calc3-double-integral-applications": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "二重积分的应用",
    "name": "二重积分应用",
    "useItWhen": "您需要整个区域的质量、平均值或总计",
    "looksLike": "二维区域的密度",
    "doThis": "在该地区整合适当的数量",
    "thinkOfItAs": "具有额外意义的面积总计",
    "watchOutFor": "当密度不为 1 时单独使用面积",
    "rememberThis": "相同的二重积分，不同的解释",
    "typicalProblemShapes": [
      "层板的质量",
      "一个地区的平均值"
    ],
    "miniDrill": [
      {
        "prompt": "您为质量整合了什么？",
        "answer": "密度。"
      },
      {
        "prompt": "二重积分也能求平均值吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "改变被积函数，改变意义。",
    "quickExample": {
      "problem": "如何从一个区域的密度中找到质量？",
      "move": "双积分密度。"
    }
  },
  "calc3-parametric-surfaces": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "参数化曲面及其面积",
    "name": "参数化曲面",
    "useItWhen": "从参数得到表面比从 z = f(x,y) 得到表面更容易",
    "looksLike": "r(u,v)",
    "doThis": "从两个参数构建曲面并使用叉积面积因子",
    "thinkOfItAs": "由两个滑块编织而成的床单",
    "watchOutFor": "忘记面积块中的叉积大小",
    "rememberThis": "两个参数构成表面补丁",
    "typicalProblemShapes": [
      "将曲面写为 u 和 v 中的向量",
      "参数化的表面积"
    ],
    "miniDrill": [
      {
        "prompt": "有多少参数驱动表面补丁？",
        "answer": "二。"
      },
      {
        "prompt": "什么向量积给出了面积因子？",
        "answer": "r_u 交叉 r_v。"
      }
    ],
    "memoryHook": "曲面片 = 两个参数加上叉积。",
    "quickExample": {
      "problem": "什么面积系数来自参数化曲面？",
      "move": "r_u 与 r_v 的大小。"
    }
  },
  "calc3-space-curve-arc-length": {
    "course": "多元微积分",
    "chapter": "第 13 章：向量函数",
    "unit": "向量函数",
    "topic": "空间曲线的弧长",
    "name": "空间曲线弧长",
    "useItWhen": "您需要 3D 路径的实际长度",
    "looksLike": "r(t) 在从 a 到 b 的区间上",
    "doThis": "对 t 的 r 素数的大小进行积分",
    "thinkOfItAs": "沿路径累加的 3D 距离",
    "watchOutFor": "忘记积分内的速度大小",
    "rememberThis": "路径长度来自速度",
    "typicalProblemShapes": [
      "空间中粒子路径的长度",
      "具有时间界限的向量值曲线"
    ],
    "miniDrill": [
      {
        "prompt": "弧长使用r-素数还是r-双素数？",
        "answer": "r-素数。"
      },
      {
        "prompt": "你对向量或其大小进行积分吗？",
        "answer": "它的大小。"
      }
    ],
    "memoryHook": "空间曲线长度=积分速度。",
    "quickExample": {
      "problem": "r(t) 的弧长积分里面有什么？",
      "move": "r-prime(t) 的大小。"
    }
  },
  "calc3-surface-area-double-integrals": {
    "course": "多元微积分",
    "chapter": "第 15 章：重积分",
    "unit": "重积分",
    "topic": "表面积",
    "name": "二重积分表面积",
    "useItWhen": "表面 z = f(x,y) 需要实际皮肤面积",
    "looksLike": "求一个区域上的表面面积",
    "doThis": "使用基础区域的表面积根因子",
    "thinkOfItAs": "下面是平坦区域，上面是倾斜的皮肤",
    "watchOutFor": "忘记了根下的 1 加部分平方",
    "rememberThis": "表面积为 dA 添加根因子",
    "typicalProblemShapes": [
      "z 的表面积 = f(x,y)",
      "xy 平面中的区域与其上方的表面配对"
    ],
    "miniDrill": [
      {
        "prompt": "基区是否位于 xy 平面内？",
        "answer": "是的。"
      },
      {
        "prompt": "配方中有什么警告标志？",
        "answer": "具有偏导数的平方根因子。"
      }
    ],
    "memoryHook": "表面积 = dA 带倾斜系数。",
    "quickExample": {
      "problem": "表面积因子中出现哪些导数？",
      "move": "关于 x 和 y 的部分。"
    }
  },
  "calc3-summary-theorems": {
    "course": "多元微积分",
    "chapter": "第 16 章：向量分析",
    "unit": "向量分析",
    "topic": "大向量微积分定理总结",
    "name": "向量微积分大图",
    "useItWhen": "你总是混淆格林、斯托克斯、散度和线积分 FTC",
    "looksLike": "具有边界、表面或区域的不同积分定理",
    "doThis": "将定理与对象匹配：路径、表面或体积",
    "thinkOfItAs": "相同的想法在 1D、2D 和 3D 中移动",
    "watchOutFor": "在错误的几何对象上使用正确的定理",
    "rememberThis": "边界告诉你定理",
    "typicalProblemShapes": [
      "关于哪个定理适合的识别问题",
      "围绕路径、曲面或封闭体积构建的问题"
    ],
    "miniDrill": [
      {
        "prompt": "平面内的闭合曲线通常指向什么定理？",
        "answer": "格林定理。"
      },
      {
        "prompt": "体积周围的封闭表面指向什么定理？",
        "answer": "发散定理。"
      }
    ],
    "memoryHook": "路径、曲面、体积：将定理与形状相匹配。",
    "quickExample": {
      "problem": "如果问题有一个体积和通过其边界的通量，您会怎么想？",
      "move": "发散定理。"
    }
  },
  "la-linear-systems": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "线性方程组",
    "name": "线性系统",
    "useItWhen": "多个方程与相同的变量相关",
    "looksLike": "x + y = 3、2x - y = 1，方程多于一行",
    "doThis": "组织系统并一起解决，而不是一次一行",
    "thinkOfItAs": "一个谜题有很多线索",
    "watchOutFor": "将每个方程视为一个单独的问题",
    "rememberThis": "相同的变量意味着一个系统",
    "typicalProblemShapes": [
      "共享 x、y、z 的方程组",
      "要求一个解决方案、无解决方案或无数个解决方案的问题"
    ],
    "miniDrill": [
      {
        "prompt": "如果三个方程共享 x、y、z，那么这是一个系统还是三个独立的工作？",
        "answer": "一个系统。"
      },
      {
        "prompt": "这里的第一个识别线索是什么？",
        "answer": "相同的变量在多个方程中重复出现。"
      }
    ],
    "memoryHook": "共享变量意味着共享系统。",
    "quickExample": {
      "problem": "两个方程，两个未知数。大的设定是什么？",
      "move": "将其视为一个系统并排列变量。"
    }
  },
  "la-augmented-matrix": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "增广矩阵",
    "name": "增广矩阵",
    "useItWhen": "你想要紧凑矩阵形式的系统",
    "looksLike": "[系数|常数]",
    "doThis": "去掉变量，保留数字，然后使用条形图得出答案",
    "thinkOfItAs": "删除该词的系统",
    "watchOutFor": "将系数列与答案列混合",
    "rememberThis": "左侧系数，右侧常数",
    "typicalProblemShapes": [
      "重写为数字矩形的系统",
      "对矩阵而不是方程进行行运算"
    ],
    "miniDrill": [
      {
        "prompt": "最后一栏通常包含什么？",
        "answer": "常数。"
      },
      {
        "prompt": "变量名是否出现在增广矩阵内？",
        "answer": "不，只是数字。"
      }
    ],
    "memoryHook": "仅数字，答案在右侧。",
    "quickExample": {
      "problem": "x + 2y = 5 和 3x - y = 4",
      "move": "把它变成一个增广矩阵，右边有一个常量列。"
    }
  },
  "la-row-reduction": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "行减少",
    "name": "减少行数",
    "useItWhen": "你需要将系统清理成更简单的形式",
    "looksLike": "交换行、缩放行、添加行的倍数",
    "doThis": "使用合法的行移动直到枢轴突出",
    "thinkOfItAs": "清理流量，以便显示重要数字",
    "watchOutFor": "移动到一行但不更新整行",
    "rememberThis": "行移动清理系统，而不是改变它",
    "typicalProblemShapes": [
      "高斯消去法",
      "询问 REF 或 RREF 的问题"
    ],
    "miniDrill": [
      {
        "prompt": "可以交换两行吗？",
        "answer": "是的。"
      },
      {
        "prompt": "为什么要减少行数？",
        "answer": "使解决方案结构更易于阅读。"
      }
    ],
    "memoryHook": "清理行，直到结构显示出来。",
    "quickExample": {
      "problem": "具有大量非零条目的杂乱增广矩阵",
      "move": "使用行操作创建枢轴位置和零点。"
    }
  },
  "la-pivots-free-variables": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "枢轴变量和自由变量",
    "name": "枢轴变量与自由变量",
    "useItWhen": "简化的矩阵已完成，您需要解决方案的形状",
    "looksLike": "有些柱子有枢轴，有些没有",
    "doThis": "标记枢轴列，然后让非枢轴列空闲",
    "thinkOfItAs": "枢轴列领先，自由列漫游",
    "watchOutFor": "将每个变量称为枢轴变量",
    "rememberThis": "列中没有主元意味着自由变量",
    "typicalProblemShapes": [
      "一列或多列缺少主元的 RREF",
      "参数化求解问题"
    ],
    "miniDrill": [
      {
        "prompt": "什么在答案中创建参数？",
        "answer": "自由变量。"
      },
      {
        "prompt": "如何发现主元变量？",
        "answer": "它的立柱有一个枢轴。"
      }
    ],
    "memoryHook": "无主元，自由变量。",
    "quickExample": {
      "problem": "简化矩阵仅在第 1 列和第 3 列中具有主元",
      "move": "第 2 列和第 4 列免费。"
    }
  },
  "la-matrix-operations": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "矩阵加法和标量乘法",
    "name": "基本矩阵运算",
    "useItWhen": "矩阵具有相同的形状或标量对矩阵进行缩放",
    "looksLike": "A+B，3A",
    "doThis": "将条目逐个添加或将每个条目乘以标量",
    "thinkOfItAs": "电子表格算术",
    "watchOutFor": "添加不同大小的矩阵",
    "rememberThis": "添加相同的大小，缩放每个条目",
    "typicalProblemShapes": [
      "两个相同大小的矩阵相加",
      "单个数字乘以整个矩阵"
    ],
    "miniDrill": [
      {
        "prompt": "2 x 3 矩阵可以与 3 x 2 矩阵相加吗？",
        "answer": "不。"
      },
      {
        "prompt": "标量乘法涉及什么？",
        "answer": "每个条目。"
      }
    ],
    "memoryHook": "按点添加。缩放每个插槽。",
    "quickExample": {
      "problem": "将两个 2 x 2 矩阵相加",
      "move": "将每个条目与同一位置的条目相匹配。"
    }
  },
  "la-matrix-multiplication": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "矩阵乘法",
    "name": "矩阵乘法",
    "useItWhen": "你正在编写矩阵动作",
    "looksLike": "AB 内部尺寸匹配",
    "doThis": "逐列，每行与每列点",
    "thinkOfItAs": "行与列相遇并形成新条目",
    "watchOutFor": "将条目乘以条目或忽略大小不匹配",
    "rememberThis": "内部尺寸必须匹配",
    "typicalProblemShapes": [
      "AB，尺寸兼容性最重要",
      "改变矩阵大小的产品"
    ],
    "miniDrill": [
      {
        "prompt": "3 x 2 矩阵可以乘以右边的 4 x 3 矩阵吗？",
        "answer": "不，内部尺寸不匹配。"
      },
      {
        "prompt": "AB 的一个条目由什么规则构建？",
        "answer": "逐行。"
      }
    ],
    "memoryHook": "内部匹配，然后逐列。",
    "quickExample": {
      "problem": "将 2 x 3 矩阵乘以 3 x 4 矩阵",
      "move": "合法，因为里面的 3 和 3 匹配。"
    }
  },
  "la-identity-matrix": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "单位矩阵",
    "name": "单位矩阵",
    "useItWhen": "你需要什么都不做的矩阵",
    "looksLike": "对角线上为 1，其他地方为 0",
    "doThis": "将其识别为 1 的矩阵版本",
    "thinkOfItAs": "中性设置",
    "watchOutFor": "使用错误大小的单位矩阵",
    "rememberThis": "身份让事情变得孤立无援",
    "typicalProblemShapes": [
      "对角线和其他地方为零",
      "IA = A 且 AI = A"
    ],
    "miniDrill": [
      {
        "prompt": "乘以 1 的矩阵形式是什么？",
        "answer": "单位矩阵。"
      },
      {
        "prompt": "2 x 2 恒等式适用于 3 x 3 矩阵吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "恒等式 = 矩阵一。",
    "quickExample": {
      "problem": "如果 A 是身份，Axe 会发生什么？",
      "move": "没有任何改变。"
    }
  },
  "la-inverse-matrix": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "逆矩阵",
    "name": "逆矩阵",
    "useItWhen": "您想要撤消矩阵操作",
    "looksLike": "A 的逆元，AA 的逆元 = I",
    "doThis": "检查矩阵是否可逆，然后使用逆矩阵来反转操作",
    "thinkOfItAs": "矩阵撤消按钮",
    "watchOutFor": "假设每个方阵都有一个逆矩阵",
    "rememberThis": "仅当矩阵可逆时才存在逆矩阵",
    "typicalProblemShapes": [
      "使用矩阵语言求解 Ax = b",
      "询问矩阵是否可逆的问题"
    ],
    "miniDrill": [
      {
        "prompt": "A 乘以 A 的倒数应该等于多少？",
        "answer": "单位矩阵。"
      },
      {
        "prompt": "每个方阵都有逆矩阵吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "逆向表示撤消。",
    "quickExample": {
      "problem": "当 A 可逆时如何撤销 Ax = b？",
      "move": "乘以 A 的倒数。"
    }
  },
  "la-determinant": {
    "course": "线性代数",
    "chapter": "第 3 章：行列式",
    "unit": "行列式",
    "topic": "行列式",
    "name": "行列式",
    "useItWhen": "您需要快速可逆信号或面积体积缩放线索",
    "looksLike": "det A 或方阵周围的条",
    "doThis": "计算行列式并检查它是否为零",
    "thinkOfItAs": "矩阵健康检查",
    "watchOutFor": "尝试取非方阵的行列式",
    "rememberThis": "det 零通常意味着不可逆",
    "typicalProblemShapes": [
      "仅方阵",
      "可逆性检查和面积缩放问题"
    ],
    "miniDrill": [
      {
        "prompt": "矩形矩阵可以有行列式吗？",
        "answer": "不。"
      },
      {
        "prompt": "决定因素的快速警报值是多少？",
        "answer": "零。"
      }
    ],
    "memoryHook": "零意味着麻烦。",
    "quickExample": {
      "problem": "2 x 2 矩阵的行列式为 0。主要结论是什么？",
      "move": "它是不可逆的。"
    }
  },
  "la-rank": {
    "course": "线性代数",
    "chapter": "第 3 章：行列式",
    "unit": "行列式",
    "topic": "秩",
    "name": "秩",
    "useItWhen": "你想要独立枢轴方向的数量",
    "looksLike": "等级 A，主元计数，梯形形式的非零行",
    "doThis": "行减少并计算枢轴位置",
    "thinkOfItAs": "矩阵保留了多少真实信息",
    "watchOutFor": "计算每一行而不是枢轴行",
    "rememberThis": "排名是枢轴数",
    "typicalProblemShapes": [
      "行减少后的枢轴计数",
      "关于满级或不足级的问题"
    ],
    "miniDrill": [
      {
        "prompt": "快速短语中的排名是什么？",
        "answer": "枢轴的数量。"
      },
      {
        "prompt": "零行会增加排名吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "排名 = 幸存的枢轴。",
    "quickExample": {
      "problem": "如何从 RREF 中读取排名？",
      "move": "计算枢轴。"
    }
  },
  "la-vector-space": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "向量空间的想法",
    "name": "向量空间",
    "useItWhen": "该集合应该支持向量加法和标量缩放",
    "looksLike": "向量、多项式、矩阵或函数的集合",
    "doThis": "询问集合在加法和标量乘法下是否保持闭集",
    "thinkOfItAs": "矢量移动的合法游乐场",
    "watchOutFor": "假设每组向量都是向量空间",
    "rememberThis": "在添加和缩放下关闭",
    "typicalProblemShapes": [
      "这是一个向量空间吗？",
      "由方程或限制定义的集合"
    ],
    "miniDrill": [
      {
        "prompt": "哪两个动作必须留在集合内？",
        "answer": "加法和标量乘法。"
      },
      {
        "prompt": "如果缩放可以离开集合，它是向量空间吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "向量空间意味着相加和缩放保持合法。",
    "quickExample": {
      "problem": "提出了一组向量。第一个检查是什么？",
      "move": "查看加法和标量乘法是否保留在集合内。"
    }
  },
  "la-subspace-test": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "子空间测试",
    "name": "子空间测试",
    "useItWhen": "该问题询问向量空间内的集合本身是否是向量空间",
    "looksLike": "证明 W 是 V 的子空间",
    "doThis": "检查零，在加法下关闭，在标量乘法下关闭",
    "thinkOfItAs": "快速弹跳测试",
    "watchOutFor": "忘记检查零向量",
    "rememberThis": "归零、相加、缩放",
    "typicalProblemShapes": [
      "由线性条件定义的集合",
      "子空间与非子空间问题"
    ],
    "miniDrill": [
      {
        "prompt": "什么是三项快速检查？",
        "answer": "零、加法、标量乘法。"
      },
      {
        "prompt": "如果零向量缺失，它会是一个子空间吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "归零、相加、缩放。",
    "quickExample": {
      "problem": "集合由线性方程定义。您应该运行什么测试？",
      "move": "子空间测试。"
    }
  },
  "la-span": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "跨度",
    "name": "跨度",
    "useItWhen": "你需要给定向量的所有线性组合",
    "looksLike": "v1、v2、v3 的跨度",
    "doThis": "允许任意标量组合并询问它们可以到达什么空间",
    "thinkOfItAs": "向量的范围",
    "watchOutFor": "思维广度意味着列出的向量本身",
    "rememberThis": "span 表示所有线性组合",
    "typicalProblemShapes": [
      "这些向量生成什么空间？",
      "关于通过组合达到目标向量的问题"
    ],
    "miniDrill": [
      {
        "prompt": "跨度是指一种组合还是所有组合？",
        "answer": "所有组合。"
      },
      {
        "prompt": "跨度背后的主要问题是什么？",
        "answer": "这些向量可以构建什么？"
      }
    ],
    "memoryHook": "跨度 = 这些向量可以构建的所有内容。",
    "quickExample": {
      "problem": "R2 中两个不平行向量的跨度通常给出什么？",
      "move": "通常是整个飞机。"
    }
  },
  "la-linear-independence": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "线性独立性",
    "name": "线性无关性",
    "useItWhen": "你需要知道一个向量是否是由其他向量秘密构建的",
    "looksLike": "独立集或从属集",
    "doThis": "将组合设置为零并测试是否只有简单的解决方案有效",
    "thinkOfItAs": "每个向量都有自己的重量",
    "watchOutFor": "当一个向量冗余时调用一组独立",
    "rememberThis": "只有零系数解才意味着独立",
    "typicalProblemShapes": [
      "测试冗余的向量列表",
      "首先询问向量是否独立的基本问题"
    ],
    "miniDrill": [
      {
        "prompt": "独立的坏兆头是什么？",
        "answer": "零组合的一个重要解决方案。"
      },
      {
        "prompt": "如果一个向量是其他向量的组合，是独立的还是相关的？",
        "answer": "依赖。"
      }
    ],
    "memoryHook": "冗余意味着依赖。",
    "quickExample": {
      "problem": "如何快速测试独立性？",
      "move": "求解 c1v1 + c2v2 + ... = 0。"
    }
  },
  "la-basis-dimension": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "依据和维度",
    "name": "依据与维度",
    "useItWhen": "您需要主要构建块和空间大小",
    "looksLike": "找到一个基础，维度是什么",
    "doThis": "寻找一个既独立又跨越的集合，然后对它进行计数",
    "thinkOfItAs": "最小的完整工具包",
    "watchOutFor": "使用跨越但不独立的集合",
    "rememberThis": "基础=独立+跨越",
    "typicalProblemShapes": [
      "找到子空间的基础",
      "找到枢轴或基向量后计算维度"
    ],
    "miniDrill": [
      {
        "prompt": "基础必须完成哪两项工作？",
        "answer": "跨越空间并保持独立。"
      },
      {
        "prompt": "一条直线的尺寸是多少？",
        "answer": "基中向量的数量。"
      }
    ],
    "memoryHook": "基础构建空间，无需额外的东西。",
    "quickExample": {
      "problem": "维度算什么？",
      "move": "您需要多少个基向量。"
    }
  },
  "la-dot-orthogonality": {
    "course": "线性代数",
    "chapter": "第 5 章：正交性",
    "unit": "正交性",
    "topic": "点积和正交性",
    "name": "正交性",
    "useItWhen": "你需要垂直向量或直角几何",
    "looksLike": "u 点 v = 0，正交集",
    "doThis": "计算点积并检查它是否变为零",
    "thinkOfItAs": "向量以干净的直角交叉",
    "watchOutFor": "假设小点积意味着完全正交",
    "rememberThis": "零点表示垂直",
    "typicalProblemShapes": [
      "垂直向量",
      "正交集和投影"
    ],
    "miniDrill": [
      {
        "prompt": "什么是快速正交性检验？",
        "answer": "点积等于零。"
      },
      {
        "prompt": "正交就是平行的意思吗",
        "answer": "不，它的意思是垂直。"
      }
    ],
    "memoryHook": "点零，直角。",
    "quickExample": {
      "problem": "如何测试两个向量是否垂直？",
      "move": "取他们的点积。"
    }
  },
  "la-projection": {
    "course": "线性代数",
    "chapter": "第 5 章：正交性",
    "unit": "正交性",
    "topic": "投影",
    "name": "投影",
    "useItWhen": "你需要一个向量在另一个方向上的阴影",
    "looksLike": "u 到 v 的投影",
    "doThis": "沿目标方向取分量",
    "thinkOfItAs": "将阴影投射到线上",
    "watchOutFor": "忘记哪个向量是方向目标",
    "rememberThis": "投影仅保留沿线部分",
    "typicalProblemShapes": [
      "直线上的最佳近似",
      "矢量分解为沿和垂直部分"
    ],
    "miniDrill": [
      {
        "prompt": "什么图片在这里最有帮助？",
        "answer": "影子落在一条线上。"
      },
      {
        "prompt": "投影是否保留侧面部分？",
        "answer": "不。"
      }
    ],
    "memoryHook": "投影=线上的阴影。",
    "quickExample": {
      "problem": "投影保留了什么？",
      "move": "仅指向所选方向的部分。"
    }
  },
  "la-linear-transformation": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "线性变换",
    "name": "线性变换",
    "useItWhen": "规则以保留结构的方式接收向量并发送向量",
    "looksLike": "T(x)，矩阵乘以向量，向量空间之间的映射",
    "doThis": "检查规则是否遵循加法和标量乘法",
    "thinkOfItAs": "一台在不打破线性规则的情况下弯曲空间的机器",
    "watchOutFor": "称每个向量规则为线性",
    "rememberThis": "线性意味着相加和规模生存",
    "typicalProblemShapes": [
      "向量到向量的映射规则",
      "询问变换是否是线性的问题"
    ],
    "miniDrill": [
      {
        "prompt": "哪两个线性检验最重要？",
        "answer": "加法和标量乘法。"
      },
      {
        "prompt": "每个向量值规则都是自动线性的吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "线性规则保持相加和缩放。",
    "quickExample": {
      "problem": "如何测试 T 是否是线性的？",
      "move": "检查可加性和标量兼容性。"
    }
  },
  "la-eigenvalues-eigenvectors": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "特征值和特征向量",
    "name": "特征值和特征向量",
    "useItWhen": "变换拉伸向量而不使其偏离其线",
    "looksLike": "Av = 拉姆达 v",
    "doThis": "寻找矩阵作用后保持在同一直线上的方向",
    "thinkOfItAs": "矩阵遵循的特殊方向",
    "watchOutFor": "认为每个向量都是特征向量",
    "rememberThis": "同一条线，新尺寸",
    "typicalProblemShapes": [
      "Av = 拉姆达 v",
      "查找矩阵的特征值或特征向量"
    ],
    "miniDrill": [
      {
        "prompt": "对于特征向量来说，什么保持不变？",
        "answer": "其方向线。"
      },
      {
        "prompt": "特征向量会发生什么变化？",
        "answer": "它的大小，由特征值决定。"
      }
    ],
    "memoryHook": "特征向量保持直线。",
    "quickExample": {
      "problem": "是什么使 v 成为特征向量？",
      "move": "Av 与 v 落在同一行。"
    }
  },
  "la-diagonalization": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "对角化",
    "name": "对角化",
    "useItWhen": "你想要一个更容易的特征基形式重写的矩阵",
    "looksLike": "A = P D P 逆",
    "doThis": "收集足够的独立特征向量来构建 P",
    "thinkOfItAs": "更改为矩阵最喜欢的坐标",
    "watchOutFor": "在没有足够独立特征向量的情况下尝试对角化",
    "rememberThis": "足够的特征向量使矩阵呈对角线",
    "typicalProblemShapes": [
      "A = P D P 逆设定",
      "询问矩阵是否可对角化的问题"
    ],
    "miniDrill": [
      {
        "prompt": "中间是什么样的矩阵？",
        "answer": "对角矩阵。"
      },
      {
        "prompt": "通常什么会阻碍对角化？",
        "answer": "没有足够的独立特征向量。"
      }
    ],
    "memoryHook": "足够的特征向量解锁对角形式。",
    "quickExample": {
      "problem": "对角化的最大要求是什么？",
      "move": "您需要足够的独立特征向量。"
    }
  },
  "la-consistency": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "一致与不一致系统",
    "name": "一致与不一致",
    "useItWhen": "行缩减完成，需要对系统进行分类",
    "looksLike": "像 0 0 0 | 这样的行1 或一个干净的解决系统",
    "doThis": "首先寻找不可能的行",
    "thinkOfItAs": "该系统是否仍然有意义或者是否自相矛盾",
    "watchOutFor": "错过了底部不可能的行",
    "rememberThis": "不可能行意味着无解",
    "typicalProblemShapes": [
      "RREF分类问题",
      "一个解、无解或无限多个解检查"
    ],
    "miniDrill": [
      {
        "prompt": "最快的无解线索是什么？",
        "answer": "矛盾的行，如 0 = 1。"
      },
      {
        "prompt": "一致的系统可以有自由变量吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "坏行，无解。",
    "quickExample": {
      "problem": "最后一行 0 = 1 是什么意思？",
      "move": "系统不一致。"
    }
  },
  "la-homogeneous-system": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "均质系统",
    "name": "均质系统",
    "useItWhen": "右边全是零",
    "looksLike": "斧头 = 0",
    "doThis": "记住零解总是存在，然后检查自由变量",
    "thinkOfItAs": "没有外部推动的系统",
    "watchOutFor": "忘记琐碎的解决方案始终存在",
    "rememberThis": "Ax = 0 总是至少有零解",
    "typicalProblemShapes": [
      "零空间设置",
      "关于非平凡解决方案的问题"
    ],
    "miniDrill": [
      {
        "prompt": "齐次系统什么时候有非平凡解？",
        "answer": "当自由变量出现时。"
      },
      {
        "prompt": "Ax = 0 是否缺少零解？",
        "answer": "不。"
      }
    ],
    "memoryHook": "同质意味着零总是有效的。",
    "quickExample": {
      "problem": "每个同构系统都有什么解决方案？",
      "move": "平凡的零解。"
    }
  },
  "la-transpose-symmetric": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "转置和对称矩阵",
    "name": "转置和对称",
    "useItWhen": "矩阵翻转对角线或与其转置进行比较",
    "looksLike": "转置、对称矩阵，a_ij 等于 a_ji",
    "doThis": "交换行与列，然后比较",
    "thinkOfItAs": "在对角镜中反射矩阵",
    "watchOutFor": "更改条目而不仅仅是交换位置",
    "rememberThis": "对称意味着等于其转置",
    "typicalProblemShapes": [
      "计算转置",
      "检查方阵是否对称"
    ],
    "miniDrill": [
      {
        "prompt": "转置首先做什么？",
        "answer": "它交换行和列。"
      },
      {
        "prompt": "非方阵可以对称吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "转置翻转。对称搭配翻盖。",
    "quickExample": {
      "problem": "是什么使矩阵对称？",
      "move": "A 等于 A 转置。"
    }
  },
  "la-cofactor-cramers": {
    "course": "线性代数",
    "chapter": "第 3 章：行列式",
    "unit": "行列式",
    "topic": "辅因子展开和克莱默规则",
    "name": "辅因子和克莱默规则",
    "useItWhen": "行列式通过行或列扩展，或者小系统通过行列式求解",
    "looksLike": "辅因子符号，替换一列，除以 det A",
    "doThis": "选择一个智能行或列，并且仅在小型可逆方形系统上使用克莱默规则",
    "thinkOfItAs": "一次一行的决定性手术",
    "watchOutFor": "当 det A 为零时使用克莱默法则",
    "rememberThis": "克莱默法则仅在 det A 不为零时有效",
    "typicalProblemShapes": [
      "3 x 3 行列式展开",
      "用行列式求解小型系统"
    ],
    "miniDrill": [
      {
        "prompt": "什么符号模式引导辅助因子？",
        "answer": "交替加减号。"
      },
      {
        "prompt": "克莱默法则可以解决奇异系统吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "没有非零行列式，没有克莱默规则。",
    "quickExample": {
      "problem": "克莱默规则之前的第一个决定性检查是什么？",
      "move": "确保 det A 不为零。"
    }
  },
  "la-column-null-space": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "列空间和零空间",
    "name": "列空间与零空间",
    "useItWhen": "你需要知道矩阵可以产生什么输出或者它会杀死什么输入",
    "looksLike": "列 A，无 A，Ax = b，Ax = 0",
    "doThis": "考虑列空间的输出和空空间的零产生输入",
    "thinkOfItAs": "矩阵可以创造什么与它消除什么",
    "watchOutFor": "将域中的向量与共域中的向量混合",
    "rememberThis": "列空间是输出，空空间是零输入",
    "typicalProblemShapes": [
      "求解 Ax = 0 来描述零空间",
      "用于描述列空间的透视列"
    ],
    "miniDrill": [
      {
        "prompt": "哪个空间位于输入侧？",
        "answer": "零空间。"
      },
      {
        "prompt": "哪个空间描述了可达到的输出？",
        "answer": "柱空间。"
      }
    ],
    "memoryHook": "列产生输出。空则为零。",
    "quickExample": {
      "problem": "零空间收集什么？",
      "move": "所有向量均发送至零。"
    }
  },
  "la-coordinates-change-basis": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "坐标和基础变化",
    "name": "坐标和基础的变化",
    "useItWhen": "相同的向量以非标准的方式描述",
    "looksLike": "相对于 B 的坐标向量，变化基矩阵",
    "doThis": "将基础视为语言并将向量转换为该语言",
    "thinkOfItAs": "同一点，不同的坐标重音",
    "watchOutFor": "忘记坐标属于哪个基础",
    "rememberThis": "坐标取决于基础",
    "typicalProblemShapes": [
      "查找相对于基准的坐标",
      "标准坐标和非标准坐标之间的转换"
    ],
    "miniDrill": [
      {
        "prompt": "当基改变时，实际向量会改变吗？",
        "answer": "不。"
      },
      {
        "prompt": "新的基础有什么变化？",
        "answer": "它的坐标。"
      }
    ],
    "memoryHook": "相同的向量，新的语言。",
    "quickExample": {
      "problem": "当基础改变时坐标会改变吗？",
      "move": "是的。向量保持不变，但描述发生了变化。"
    }
  },
  "la-orthonormal-gram-schmidt": {
    "course": "线性代数",
    "chapter": "第 5 章：正交性",
    "unit": "正交性",
    "topic": "正交集和 Gram-Schmidt",
    "name": "正交和格拉姆-施密特",
    "useItWhen": "你想要来自凌乱基础的垂直单位向量",
    "looksLike": "正交基，Gram-Schmidt 过程",
    "doThis": "去掉投影，然后标准化",
    "thinkOfItAs": "拉直向量，然后调整它们的大小",
    "watchOutFor": "在移除旧方向件之前进行正火处理",
    "rememberThis": "减去投影，然后标准化",
    "typicalProblemShapes": [
      "建立正交基",
      "投影密集的正交性问题"
    ],
    "miniDrill": [
      {
        "prompt": "正交在一个短语中意味着什么？",
        "answer": "垂直且长度一。"
      },
      {
        "prompt": "去除投影后会发生什么？",
        "answer": "正常化。"
      }
    ],
    "memoryHook": "拉直，然后收缩到 1。",
    "quickExample": {
      "problem": "Gram-Schmidt 的两大阶段是什么？",
      "move": "使向量正交，然后将它们转换为单位向量。"
    }
  },
  "la-least-squares": {
    "course": "线性代数",
    "chapter": "第 5 章：正交性",
    "unit": "正交性",
    "topic": "最小二乘法",
    "name": "最小二乘法",
    "useItWhen": "Ax = b 没有精确解，您需要最接近的拟合",
    "looksLike": "超定系统，最佳拟合线，A 转置 A x = A 转置 b",
    "doThis": "投影到列空间并求解正规方程",
    "thinkOfItAs": "最好的可能错过",
    "watchOutFor": "对待无解系统就像它仍然有一个确切的答案一样",
    "rememberThis": "最小二乘找到最接近的拟合，而不是完美的命中",
    "typicalProblemShapes": [
      "最佳拟合线或数据拟合问题",
      "超定系统"
    ],
    "miniDrill": [
      {
        "prompt": "什么样的系统经常导致最小二乘？",
        "answer": "方程组多于精确解的系统。"
      },
      {
        "prompt": "最小二乘法是否使残差恰好为零？",
        "answer": "通常不会。"
      }
    ],
    "memoryHook": "没有精确的配合吗？采取最接近的配合。",
    "quickExample": {
      "problem": "正规方程什么时候出现？",
      "move": "当您想要最小二乘解时。"
    }
  },
  "la-characteristic-polynomial": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "特征多项式",
    "name": "特征多项式",
    "useItWhen": "你需要矩阵的特征值",
    "looksLike": "det(A - 拉姆达 I) = 0",
    "doThis": "设 A 减去 lambda I，求行列式，并求解",
    "thinkOfItAs": "特征值查找方程",
    "watchOutFor": "忘记 lambda I 部分",
    "rememberThis": "特征值来自 det(A 减去 lambda I)",
    "typicalProblemShapes": [
      "求矩阵的特征值",
      "特征多项式设置"
    ],
    "miniDrill": [
      {
        "prompt": "A 在行列式之前减去什么？",
        "answer": "Lambda 乘以恒等式。"
      },
      {
        "prompt": "特征多项式的根给出什么？",
        "answer": "特征值。"
      }
    ],
    "memoryHook": "减去 lambda I，然后求解。",
    "quickExample": {
      "problem": "什么方程开始特征值搜索？",
      "move": "det(A - 拉姆达 I) = 0。"
    }
  },
  "la-echelon-vs-rref": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "梯形形式与简化梯形形式",
    "name": "REF 与 RREF",
    "useItWhen": "矩阵几乎已清理完毕，您需要命名该形式",
    "looksLike": "阶梯枢轴，枢轴下方有零，上方也可能有零",
    "doThis": "首先检查枢轴形状，然后询问每个枢轴是否是单独的 1",
    "thinkOfItAs": "REF已清洁，RREF已完全抛光",
    "watchOutFor": "仅仅因为它有主元而调用矩阵 RREF",
    "rememberThis": "RREF 表示主元 1，上方和下方均为零",
    "typicalProblemShapes": [
      "对简化矩阵进行分类",
      "在 REF 处停止行减少或继续转到 RREF"
    ],
    "miniDrill": [
      {
        "prompt": "REF 是否仍然可以在主元之上有非零条目？",
        "answer": "是的。"
      },
      {
        "prompt": "RREF 中的每个主元必须等于什么？",
        "answer": "1."
      }
    ],
    "memoryHook": "RREF 是 REF 加上更清洁的枢轴。",
    "quickExample": {
      "problem": "RREF 具有哪些 REF 可能没有的额外功能？",
      "move": "每个枢轴上方也有零。"
    }
  },
  "la-ax-equals-b": {
    "course": "线性代数",
    "chapter": "第 1 章：线性方程组与行化简",
    "unit": "线性方程组与行化简",
    "topic": "矩阵方程 Ax = b",
    "name": "轴=b",
    "useItWhen": "系统被写成一个矩阵方程",
    "looksLike": "Ax = b，系数矩阵乘以变量向量",
    "doThis": "将 A 视为动作，x 视为未知数，b 视为目标",
    "thinkOfItAs": "一台机器试图达到一个输出",
    "watchOutFor": "混合x和b的作用",
    "rememberThis": "Ax = b 是线性系统的矩阵版本",
    "typicalProblemShapes": [
      "将系统重写为 Ax = b",
      "询问b是否位于A的列空间中"
    ],
    "miniDrill": [
      {
        "prompt": "Ax = b 中的 x 代表什么？",
        "answer": "未知向量。"
      },
      {
        "prompt": "Ax = b 中除了 A 之外还有哪一部分是固定数据？",
        "answer": "b."
      }
    ],
    "memoryHook": "A 起作用，x 未知，b 是目标。",
    "quickExample": {
      "problem": "Ax = b 中的 b 代表什么？",
      "move": "目标输出向量。"
    }
  },
  "la-invertible-matrix-theorem": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "可逆矩阵定理",
    "name": "可逆矩阵定理",
    "useItWhen": "你需要许多等效的方法来快速发现可逆矩阵",
    "looksLike": "det 非零，每列中的枢轴，唯一解，逆存在",
    "doThis": "识别一条可逆线索并兑现其他线索",
    "thinkOfItAs": "一盏绿灯解锁整个列表",
    "watchOutFor": "记住一项测试并忘记同等的测试",
    "rememberThis": "可逆以多种形式出现",
    "typicalProblemShapes": [
      "判断方阵是否可逆",
      "将一个可逆性事实转化为另一个可逆性事实"
    ],
    "miniDrill": [
      {
        "prompt": "对于方阵，det 不等于 0 是否表示可逆或奇异？",
        "answer": "可逆。"
      },
      {
        "prompt": "可逆是否意味着 Ax = 0 只有平凡解？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "一条可逆的线索可以解开整个包裹。",
    "quickExample": {
      "problem": "如果方阵的每一列都有一个主元，还有什么是真正的快呢？",
      "move": "它是可逆的。"
    }
  },
  "la-lu-factorization": {
    "course": "线性代数",
    "chapter": "第 2 章：矩阵代数",
    "unit": "矩阵",
    "topic": "LU 因式分解",
    "name": "LU 因式分解",
    "useItWhen": "您可以使用相同的矩阵 A 求解多个系统",
    "looksLike": "A = LU，下限乘以上限",
    "doThis": "因式分解一次，然后求解 Ly = b 和 Ux = y",
    "thinkOfItAs": "将工作预先分成两个更容易的解决方案",
    "watchOutFor": "在检查主元问题是否强制行交换之前尝试 LU",
    "rememberThis": "因式分解一次，求解两次",
    "typicalProblemShapes": [
      "具有相同系数矩阵的重复 Ax = b 问题",
      "下上分解题"
    ],
    "miniDrill": [
      {
        "prompt": "L型和U型通常有哪些形状？",
        "answer": "L 是下三角形，U 是上三角形。"
      },
      {
        "prompt": "A = LU 后，首先求解什么系统？",
        "answer": "Ly = b。"
      }
    ],
    "memoryHook": "LU 将一个困难的解决方案分成两个简单的解决方案。",
    "quickExample": {
      "problem": "为什么每次都使用 LU 而不是从头开始行缩减？",
      "move": "当 A 保持不变时，可以节省工作量。"
    }
  },
  "la-determinant-zero-test": {
    "course": "线性代数",
    "chapter": "第 3 章：行列式",
    "unit": "行列式",
    "topic": "det = 0 告诉您什么",
    "name": "det = 0 测试",
    "useItWhen": "您需要快速的单数与可逆检查",
    "looksLike": "det(A) = 0 或 det(A) 不等于 0",
    "doThis": "将零行列式视为崩溃和失去可逆性的危险信号",
    "thinkOfItAs": "矩阵变平了",
    "watchOutFor": "在 det 已经告诉你它不存在之后计算逆数",
    "rememberThis": "det 0 表示单数",
    "typicalProblemShapes": [
      "快速可逆性检查",
      "面积或体积缩放缩小到零"
    ],
    "miniDrill": [
      {
        "prompt": "对于方阵来说，det 不等于 0 通常表示什么？",
        "answer": "可逆。"
      },
      {
        "prompt": "det = 0 是否建议依赖列？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "行列式为零，无逆矩阵。",
    "quickExample": {
      "problem": "如果 det(A) = 0，A 可以可逆吗？",
      "move": "不。"
    }
  },
  "la-rank-nullity": {
    "course": "线性代数",
    "chapter": "第 4 章：向量空间",
    "unit": "向量空间",
    "topic": "秩无效定理",
    "name": "等级无效",
    "useItWhen": "你需要输出和隐藏自由之间的维度平衡",
    "looksLike": "排名加上无效性等于列数",
    "doThis": "将枢轴方向和自由方向一起计数",
    "thinkOfItAs": "已用尺寸加上剩余自由度",
    "watchOutFor": "将公式中的行数与列数混合",
    "rememberThis": "排名 + 无效性 = 列数",
    "typicalProblemShapes": [
      "维度计数问题",
      "内核和图像大小比较"
    ],
    "miniDrill": [
      {
        "prompt": "无效性算什么？",
        "answer": "内核中的自由指令。"
      },
      {
        "prompt": "排名无效是否使用列数或行数？",
        "answer": "专栏。"
      }
    ],
    "memoryHook": "使用的方向加上自由方向等于总列数。",
    "quickExample": {
      "problem": "如果一个矩阵有 6 列，秩为 4，那么零度是多少？",
      "move": "2."
    }
  },
  "la-orthogonal-matrix": {
    "course": "线性代数",
    "chapter": "第 5 章：正交性",
    "unit": "正交性",
    "topic": "正交矩阵",
    "name": "正交矩阵",
    "useItWhen": "这些列是正交的，逆矩阵应该很容易",
    "looksLike": "Q 转置 Q = I",
    "doThis": "检查正交列，然后将逆功换成转置",
    "thinkOfItAs": "保持长度和角度的刚性动作",
    "watchOutFor": "假设垂直列无需归一化就足够了",
    "rememberThis": "正交矩阵意味着 Q 逆等于 Q 转置",
    "typicalProblemShapes": [
      "旋转或反射矩阵",
      "正交列检验"
    ],
    "miniDrill": [
      {
        "prompt": "正交矩阵列也需要单位长度吗？",
        "answer": "是的。"
      },
      {
        "prompt": "快速测试的方程式是什么？",
        "answer": "Q 转置 Q = I。"
      }
    ],
    "memoryHook": "正交列使转置等于逆。",
    "quickExample": {
      "problem": "什么是正交矩阵的快速逆矩阵？",
      "move": "它的转置。"
    }
  },
  "la-matrix-of-transformation": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "线性变换的矩阵",
    "name": "变换矩阵",
    "useItWhen": "几何规则需要坐标矩阵",
    "looksLike": "T(v)，标准基，e_1和e_2的图像",
    "doThis": "通过 T 发送基向量并将这些输出用作列",
    "thinkOfItAs": "记录机器按照基本指令执行的操作",
    "watchOutFor": "忘记矩阵列来自变换后的基向量",
    "rememberThis": "列是基向量的 T",
    "typicalProblemShapes": [
      "将 T 的公式转化为矩阵",
      "求变换的标准矩阵"
    ],
    "miniDrill": [
      {
        "prompt": "矩阵的第一列是什么？",
        "answer": "第一个基向量的 T。"
      },
      {
        "prompt": "行或列存储变换后的基向量吗？",
        "answer": "专栏。"
      }
    ],
    "memoryHook": "变换基础，然后堆叠列。",
    "quickExample": {
      "problem": "如何快速构建 T 的矩阵？",
      "move": "在基向量上求 T 并将输出堆叠为列。"
    }
  },
  "la-kernel-range": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "内核和范围",
    "name": "内核与范围",
    "useItWhen": "您需要将映射为零的内容与可到达的输出分开",
    "looksLike": "ker(T)、范围(T)、零空间、图像",
    "doThis": "将内核视为丢失的输入，将范围视为可能的输出",
    "thinkOfItAs": "消失的东西与可以产生的东西",
    "watchOutFor": "混淆内核所在位置和范围所在位置",
    "rememberThis": "内核位于输入空间，范围位于输出空间",
    "typicalProblemShapes": [
      "求 ker(T) 或 range(T)",
      "一对一检查"
    ],
    "miniDrill": [
      {
        "prompt": "什么输出定义了内核？",
        "answer": "零。"
      },
      {
        "prompt": "该范围收集什么？",
        "answer": "T 可以做出的所有输出。"
      }
    ],
    "memoryHook": "内核=丢失输入。范围 = 可达到的输出。",
    "quickExample": {
      "problem": "T 的内核位于哪里？",
      "move": "在域中。"
    }
  },
  "la-one-to-one-onto": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "线性映射的一对一与onto",
    "name": "一对一 vs Onto",
    "useItWhen": "测试线性映射的单射或满射行为",
    "looksLike": "一对一、onto、琐碎内核、全方位",
    "doThis": "使用 kernel 进行一对一，使用 range 进行 onon",
    "thinkOfItAs": "单射意味着没有碰撞，上意味着没有错过目标",
    "watchOutFor": "检查错误空间中的错误属性",
    "rememberThis": "与内核一对一对话，与范围对话",
    "typicalProblemShapes": [
      "决定单射或满射",
      "方阵等价检查"
    ],
    "miniDrill": [
      {
        "prompt": "如果 ker(T) 大于零，T 是一对一的吗？",
        "answer": "不。"
      },
      {
        "prompt": "如果 range(T) 错过输出，T 是否正常？",
        "answer": "不。"
      }
    ],
    "memoryHook": "内核用于单射，范围用于上。",
    "quickExample": {
      "problem": "什么是线性映射的快速一对一测试？",
      "move": "检查内核是否只有零。"
    }
  },
  "la-eigenspace": {
    "course": "线性代数",
    "chapter": "第 6 章：特征值与线性变换",
    "unit": "线性变换与特征值",
    "topic": "特征空间",
    "name": "特征空间",
    "useItWhen": "特征值已知，您需要其匹配向量",
    "looksLike": "(A - λ I)x = 0",
    "doThis": "代入特征值并求解齐次系统",
    "thinkOfItAs": "所有向量在相同的特殊方向上拉伸",
    "watchOutFor": "忘记零向量不是特征向量，即使它解决了系统",
    "rememberThis": "特征空间来自 A 的零空间减去 lambda I",
    "typicalProblemShapes": [
      "寻找特征空间的基础",
      "已知特征值后使用特征向量"
    ],
    "miniDrill": [
      {
        "prompt": "您为特征空间工作构建什么矩阵？",
        "answer": "A——拉姆达 I。"
      },
      {
        "prompt": "零向量是特征向量吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "首先是特征值，其次是零空间。",
    "quickExample": {
      "problem": "找到 lambda 后如何找到特征向量？",
      "move": "求解 (A - lambda I)x = 0。"
    }
  },
  "proof-what-counts": {
    "course": "抽象数学导论",
    "chapter": "第 1 章：范式转变",
    "unit": "证明基础",
    "topic": "什么才算证明",
    "name": "什么才算证明",
    "useItWhen": "你需要证明一个陈述的合理性，而不仅仅是测试示例",
    "looksLike": "证明……，证明……，证明为什么……",
    "doThis": "从已知事实开始，建立一条强制得出结论的链条",
    "thinkOfItAs": "堵住每一个漏洞，而不仅仅是营造一种氛围",
    "watchOutFor": "使用一个例子来证明整个陈述",
    "rememberThis": "例子表明，证明完成",
    "typicalProblemShapes": [
      "关于所有整数或所有实数的通用陈述",
      "例子令人信服但不能解决问题的主张"
    ],
    "miniDrill": [
      {
        "prompt": "一个正确的例子能证明一个普遍的说法吗？",
        "answer": "不。它仅表明索赔可以发生一次。"
      },
      {
        "prompt": "证明应该如何得出结论？",
        "answer": "使其不可避免地脱离公认的事实。"
      }
    ],
    "memoryHook": "举例说明。证据锁定它。",
    "quickExample": {
      "problem": "为什么检查 n = 1, 2, 3 还不够？",
      "move": "因为索赔是针对所有案件，而不是少数案件。"
    }
  },
  "proof-definitions": {
    "course": "抽象数学导论",
    "chapter": "第 1 章：范式转变",
    "unit": "证明基础",
    "topic": "定义、定理和猜想",
    "name": "定义与定理",
    "useItWhen": "你需要知道是解压定义还是证明主张",
    "looksLike": "偶数、单射、定理、猜想",
    "doThis": "如果是定义，则将其解压；如果它是一个定理，请证明它或使用它",
    "thinkOfItAs": "定义是游戏规则，定理是游戏中的胜利",
    "watchOutFor": "试图证明一个定义而不是使用它",
    "rememberThis": "定义被解开，定理被证明",
    "typicalProblemShapes": [
      "证明以偶数、素数、单射或子集等词开头",
      "一个问题询问一个陈述是否被证明还是仍然是一个猜想"
    ],
    "miniDrill": [
      {
        "prompt": "当证明使用技术术语时最快的开始是什么？",
        "answer": "写下确切的定义。"
      },
      {
        "prompt": "猜想已经被证明了吗？",
        "answer": "不。这是一种相信或怀疑但尚未证实的说法。"
      }
    ],
    "memoryHook": "技术词？打开定义。",
    "quickExample": {
      "problem": "为了证明一个数是偶数，你首先要达到什么目的？",
      "move": "定义：写为2k。"
    }
  },
  "proof-direct": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "直接证明",
    "name": "直接证明",
    "useItWhen": "你可以从假设开始并推进",
    "looksLike": "if P then Q 并且从 P 到 Q 的路径很简单",
    "doThis": "假设假设，使用代数或定义，得出结论",
    "thinkOfItAs": "从起点直走到终点",
    "watchOutFor": "从结论开始并假装证明了这一点",
    "rememberThis": "假设P，达到Q",
    "typicalProblemShapes": [
      "具有代数结构的 If-then 语句",
      "定义和替换推动证明的主张"
    ],
    "miniDrill": [
      {
        "prompt": "在直接证明“如果 P 那么 Q”时，你首先假设什么？",
        "answer": "假设P。"
      },
      {
        "prompt": "直接证明通常会提前解开定义吗？",
        "answer": "是的。这通常就是整个行动。"
      }
    ],
    "memoryHook": "从 P 出发，步行至 Q。",
    "quickExample": {
      "problem": "如果n是偶数，证明n的平方是偶数。",
      "move": "写成 n = 2k 并化简。"
    }
  },
  "proof-contrapositive": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "逆否命题证明",
    "name": "逆否证明",
    "useItWhen": "结论比直接证明更容易否定",
    "looksLike": "如果 P 那么 Q，但不是 Q 那么不是 P 看起来更干净",
    "doThis": "翻转并否定该陈述，然后证明该版本",
    "thinkOfItAs": "因为前面的路被堵住了，所以走后面的路",
    "watchOutFor": "把逆命题和逆否命题搞混",
    "rememberThis": "翻转并否定两个部分",
    "typicalProblemShapes": [
      "直接证明会变得混乱，但否定的结论很简单",
      "奇数/偶数或整除性声明"
    ],
    "miniDrill": [
      {
        "prompt": "if P then Q 的逆否命题是什么？",
        "answer": "如果不是Q，那么就不是P。"
      },
      {
        "prompt": "逆否命题与原命题是否具有相同的真值？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "翻转它，否定它，证明这一点。",
    "quickExample": {
      "problem": "如果n的平方是偶数，则证明n是偶数。",
      "move": "用逆否命题：如果 n 是奇数，那么 n 的平方也是奇数。"
    }
  },
  "proof-contradiction": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "反证法",
    "name": "反证法",
    "useItWhen": "假设相反会产生不可能的结果",
    "looksLike": "假设不...，然后发生冲突",
    "doThis": "假设该声明是错误的并推动直到出现问题",
    "thinkOfItAs": "走一条糟糕的路直到崩溃",
    "watchOutFor": "以令人惊讶但实际上并非不可能的事情结束",
    "rememberThis": "假设相反，强迫矛盾",
    "typicalProblemShapes": [
      "存在性或非理性证明",
      "容易写出相反假设的陈述"
    ],
    "miniDrill": [
      {
        "prompt": "在矛盾证明中你首先假设什么？",
        "answer": "假设您想要的声明是错误的。"
      },
      {
        "prompt": "什么算矛盾？",
        "answer": "真正的不可能，例如 0 = 1 或既是 P 又不是 P。"
      }
    ],
    "memoryHook": "假设相反。破坏逻辑。",
    "quickExample": {
      "problem": "诸多非理性证明如何开始？",
      "move": "先假设这个数是有理数，再推出矛盾。"
    }
  },
  "proof-quantifiers": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "量词",
    "name": "量词",
    "useItWhen": "声明说对于所有人或存在",
    "looksLike": "对于每一个 x...，都存在 y...",
    "doThis": "跟踪谁选择了什么以及以什么顺序",
    "thinkOfItAs": "顺序改变整体含义的脚本",
    "watchOutFor": "交换所有并且存在就像它们意味着相同的事情",
    "rememberThis": "量词顺序很重要",
    "typicalProblemShapes": [
      "包含 all、some、every 或存在的语句",
      "逻辑陈述的否定"
    ],
    "miniDrill": [
      {
        "prompt": "改变量词顺序会改变含义吗？",
        "answer": "是的。很多。"
      },
      {
        "prompt": "量化陈述中要跟踪的主要内容是什么？",
        "answer": "谁首先被选择以及被谁选择。"
      }
    ],
    "memoryHook": "所有和存在不可互换。",
    "quickExample": {
      "problem": "为什么“对于每个 x 都存在 y”和“对于每个 x 都存在 y”不同？",
      "move": "因为选择者改变了，所以声明也改变了。"
    }
  },
  "proof-negating-quantifiers": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "否定量化陈述",
    "name": "否定量词",
    "useItWhen": "您需要与 all 或存在语句相反的语句",
    "looksLike": "不适合所有...，不存在...",
    "doThis": "交换所有存在并否定内部声明",
    "thinkOfItAs": "翻转量词，翻转语句",
    "watchOutFor": "仅否定内部并忘记交换量词",
    "rememberThis": "并非所有都成为存在不",
    "typicalProblemShapes": [
      "证明首先需要明确否定的陈述",
      "使用 every 和exists 设置或函数声明"
    ],
    "miniDrill": [
      {
        "prompt": "不为所有人会变成什么？",
        "answer": "至少存在一个反例。"
      },
      {
        "prompt": "不存在会变成什么？",
        "answer": "对于所有人来说，不是。"
      }
    ],
    "memoryHook": "交换量词并否定核心。",
    "quickExample": {
      "problem": "否定“对于每个 x，P(x)”。",
      "move": "存在一个 x 使得不是 P(x)。"
    }
  },
  "proof-sets-subsets": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "集合和子集证明",
    "name": "子集证明",
    "useItWhen": "你需要证明一组位于另一组内",
    "looksLike": "证明A是B的子集",
    "doThis": "选择 A 的通用元素并表明它也必须在 B 中",
    "thinkOfItAs": "跟随一名随机成员穿过栅栏",
    "watchOutFor": "尝试在不使用元素的情况下比较整个集合",
    "rememberThis": "为了证明子集，追逐一个元素",
    "typicalProblemShapes": [
      "并集、交集和补集恒等式",
      "设置由两个子集证明构建的相等证明"
    ],
    "miniDrill": [
      {
        "prompt": "如何证明A等于B？",
        "answer": "显示 B 的 A 子集和 A 的 B 子集。"
      },
      {
        "prompt": "子集证明的标准第一步是什么？",
        "answer": "在左侧集合中选取任意元素。"
      }
    ],
    "memoryHook": "设置证明？抓取一个元素。",
    "quickExample": {
      "problem": "如何开始 B 的 A 子集？",
      "move": "在 A 中取 x。"
    }
  },
  "proof-functions": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "单射与满射函数",
    "name": "单射与满射",
    "useItWhen": "证明要你判断函数是不是单射、满射或双射",
    "looksLike": "显示 f 是单射、满射或双射",
    "doThis": "证单射时从 f(a)=f(b) 开始；证满射时从目标输出 y 开始",
    "thinkOfItAs": "单射是不撞车，满射是不漏目标",
    "watchOutFor": "把单射和满射的起手方式用反",
    "rememberThis": "单射看输出相等；满射从目标 y 开始",
    "typicalProblemShapes": [
      "集合或数系之间的函数",
      "要求双射或反函数逻辑的证明"
    ],
    "miniDrill": [
      {
        "prompt": "满射的第一步是什么？",
        "answer": "在共域中取任意目标 y。"
      },
      {
        "prompt": "双射是什么意思？",
        "answer": "内射和满射。"
      }
    ],
    "memoryHook": "没有碰撞，没有失误。",
    "quickExample": {
      "problem": "如何开始内射证明？",
      "move": "假设 f(a) = f(b)。"
    }
  },
  "proof-divisibility": {
    "course": "抽象数学导论",
    "chapter": "第 4 章：整除与欧几里得算法",
    "unit": "数论基础",
    "topic": "可除性和同余性",
    "name": "可除性和同余性",
    "useItWhen": "显示整数、余数或 mod 语言",
    "looksLike": "a 除 b，a 与 b mod n 全等",
    "doThis": "将整除性重写为倍数，将同余重写为相同的余数类",
    "thinkOfItAs": "mod 表示数字落在同一个桶中",
    "watchOutFor": "在任何情况下都将一致性视为普通平等",
    "rememberThis": "除意味着多重； mod表示余数相同",
    "typicalProblemShapes": [
      "偶数/奇数或余数参数",
      "减少模 n 表达式的证明"
    ],
    "miniDrill": [
      {
        "prompt": "a除b是什么意思？",
        "answer": "对于某个整数 k，b = ak。"
      },
      {
        "prompt": "mod 说两个数字共享什么？",
        "answer": "其余班级相同。"
      }
    ],
    "memoryHook": "Mod = 划分后的同一个桶。",
    "quickExample": {
      "problem": "a 同余 b mod n 是什么意思？",
      "move": "n 除 a 减 b。"
    }
  },
  "proof-euclidean-algorithm": {
    "course": "抽象数学导论",
    "chapter": "第 4 章：整除与欧几里得算法",
    "unit": "数论基础",
    "topic": "最大公约数和欧几里得算法",
    "name": "欧几里得算法",
    "useItWhen": "你很快就需要一个gcd",
    "looksLike": "gcd(a, b) 重复除法",
    "doThis": "继续用除数和余数替换该对，直到余数为 0",
    "thinkOfItAs": "在不改变 gcd 的情况下缩小问题",
    "watchOutFor": "在余数为 0 之前停止得太早",
    "rememberThis": "最后一个非零余数是 gcd",
    "typicalProblemShapes": [
      "大量 gcd 计算",
      "使用重复除法的数论证明"
    ],
    "miniDrill": [
      {
        "prompt": "在下一步中什么取代 (a, b) 对？",
        "answer": "旧除数和旧余数。"
      },
      {
        "prompt": "你什么时候停下来？",
        "answer": "当余数变为0时。"
      }
    ],
    "memoryHook": "保持剩余链继续运行。",
    "quickExample": {
      "problem": "欧几里得算法最后的gcd是多少？",
      "move": "最后一个非零余数。"
    }
  },
  "proof-induction": {
    "course": "抽象数学导论",
    "chapter": "第 5 章：数学归纳法与良序原理",
    "unit": "数学归纳法",
    "topic": "归纳证明",
    "name": "归纳证明",
    "useItWhen": "语句取决于正整数 n",
    "looksLike": "证明所有 n、递归公式、和、不等式",
    "doThis": "做基本情况，假设k情况，然后证明k加1情况",
    "thinkOfItAs": "搭建多米诺骨牌，然后倾斜其中一个",
    "watchOutFor": "使用你试图证明的东西而不说它是归纳假设",
    "rememberThis": "基础、假定、推进",
    "typicalProblemShapes": [
      "求和公式以及能被 n 整除",
      "由 n 构建的 n 加 1 的语句"
    ],
    "miniDrill": [
      {
        "prompt": "基本案例的目的是什么？",
        "answer": "启动链条。"
      },
      {
        "prompt": "归纳步骤中会发生什么？",
        "answer": "用k的情况来证明k加1的情况。"
      }
    ],
    "memoryHook": "基础，假设，下一个案例。",
    "quickExample": {
      "problem": "归纳法的三个核心部分是什么？",
      "move": "基本情况、归纳假设、归纳步骤。"
    }
  },
  "proof-strong-induction": {
    "course": "抽象数学导论",
    "chapter": "第 5 章：数学归纳法与良序原理",
    "unit": "数学归纳法",
    "topic": "感应力强",
    "name": "强感应",
    "useItWhen": "下一步需要的不仅仅是前面的案例",
    "looksLike": "假设所有情况达到 k，证明情况 k 加 1",
    "doThis": "假设 k 加 1 之前的整个块，而不仅仅是单个 k 的情况",
    "thinkOfItAs": "使用你下面的整个梯子，而不是一个梯级",
    "watchOutFor": "使用许多早期的案例，同时假装您只假设了一个",
    "rememberThis": "强归纳假设所有早期案例",
    "typicalProblemShapes": [
      "具有多个先前术语的递归定义",
      "质因数分解或分解参数"
    ],
    "miniDrill": [
      {
        "prompt": "强感应最大的区别是什么？",
        "answer": "您假设所有较早的情况直至 k。"
      },
      {
        "prompt": "强归纳法和普通归纳法能证明同一种普遍结果吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "需要更多历史吗？使用强感应。",
    "quickExample": {
      "problem": "什么时候强感应比普通感应更好？",
      "move": "当下一个案例取决于几个较早的案例时。"
    }
  },
  "proof-equivalence-relations": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "等价关系",
    "name": "等价关系",
    "useItWhen": "一个关系 ~ 想表达两个对象在某种意义下算同一类",
    "looksLike": "自反：x~x，对称：x~y => y~x，传递：x~y 且 y~z => x~z",
    "doThis": "把三段小证明写出来：先证 x~x，再假设 x~y 证 y~x，最后假设 x~y 和 y~z 证 x~z",
    "thinkOfItAs": "合法的同队规则",
    "watchOutFor": "只做一两个检查，或忘了先取任意的 x、y、z",
    "rememberThis": "同类关系 = 自反、对称、传递",
    "typicalProblemShapes": [
      "数、集合或函数的关系",
      "关系创建类或分区的证明"
    ],
    "miniDrill": [
      {
        "prompt": "自反这一步通常长什么样？",
        "answer": "先取任意 x，再证明 x~x。"
      },
      {
        "prompt": "传递这一步通常长什么样？",
        "answer": "先假设 x~y 和 y~z，再证明 x~z。"
      }
    ],
    "memoryHook": "x~x，翻一下，串起来。",
    "quickExample": {
      "problem": "等价关系的证明套路怎么写？",
      "move": "先证 x~x，再证 x~y => y~x，最后证 x~y 且 y~z => x~z。"
    }
  },
  "proof-countable-uncountable": {
    "course": "抽象数学导论",
    "chapter": "第 8 章：无限集合的基数",
    "unit": "关系与基数",
    "topic": "可数集和不可数集",
    "name": "可数与不可数",
    "useItWhen": "比较无限集大小的问题",
    "looksLike": "可数、不可数、双射自然数、对角论证",
    "doThis": "如果可数则查找列表，如果不可数则查找对角线式转义",
    "thinkOfItAs": "你能把它们放在一个编号列表中吗",
    "watchOutFor": "自动思考无限意味着不可数",
    "rememberThis": "可数意味着可列出",
    "typicalProblemShapes": [
      "整数、有理数和实数比较",
      "使用双射或康托尔对角思想的论证"
    ],
    "miniDrill": [
      {
        "prompt": "整数是可数的吗？",
        "answer": "是的。"
      },
      {
        "prompt": "证明实数不可数的经典举动是什么？",
        "answer": "对角化。"
      }
    ],
    "memoryHook": "无限并不是一刀切的。",
    "quickExample": {
      "problem": "可数性的核心问题是什么？",
      "move": "该集合可以按 1、2、3、... 的顺序列出吗？"
    }
  },
  "proof-counterexample": {
    "course": "抽象数学导论",
    "chapter": "第 1 章：范式转变",
    "unit": "证明基础",
    "topic": "反例",
    "name": "反例",
    "useItWhen": "普遍的主张可能是错误的",
    "looksLike": "对于所有人...、每一个...、总是...、无一例外",
    "doThis": "找到一个违反索赔要求的案例",
    "thinkOfItAs": "一条裂缝就能打破整面墙",
    "watchOutFor": "给出一个实际上不符合主张的例子",
    "rememberThis": "一个真正的例外会杀死一条通用语句",
    "typicalProblemShapes": [
      "关于所有数字或所有集合的大胆陈述",
      "提示询问某个说法是真是假"
    ],
    "miniDrill": [
      {
        "prompt": "你需要多少反例才能推翻一个普遍的主张？",
        "answer": "只有一张有效的。"
      },
      {
        "prompt": "反例可以忽略陈述的条件吗？",
        "answer": "不可以。它必须完全符合设置。"
      }
    ],
    "memoryHook": "一个例外就足够了。",
    "quickExample": {
      "problem": "你如何反驳“所有素数都是奇数”？",
      "move": "显示 2 是素数且偶数。"
    }
  },
  "proof-converse-inverse": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "逆与逆",
    "name": "逆向与逆向",
    "useItWhen": "if-then 语句被翻转或否定",
    "looksLike": "如果 P 则 Q，如果 Q 则 P，如果不是 P 则不是 Q",
    "doThis": "在证明任何事情之前标记每个版本",
    "thinkOfItAs": "相同的词，不同的接线",
    "watchOutFor": "将逆命题与反命题混淆",
    "rememberThis": "逆向翻转、逆否定、反证两者都做",
    "typicalProblemShapes": [
      "使用蕴涵语句进行逻辑预热",
      "询问哪种形式与原始陈述相符时出现问题"
    ],
    "miniDrill": [
      {
        "prompt": "哪个版本在逻辑上等同于 if P then Q：逆向或逆向？",
        "answer": "反证。"
      },
      {
        "prompt": "if P then Q 的倒数是什么？",
        "answer": "如果不是 P 则不是 Q。"
      }
    ],
    "memoryHook": "在证明之前命名版本。",
    "quickExample": {
      "problem": "if P then Q 的逆命题是什么？",
      "move": "如果是 Q 那么 P。"
    }
  },
  "proof-biconditional": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "双条件证明",
    "name": "当且仅当",
    "useItWhen": "一个声明说当且仅当",
    "looksLike": "P iff Q，必要且充分",
    "doThis": "分别证明两个方向",
    "thinkOfItAs": "两扇门，都必须打开",
    "watchOutFor": "仅证明一个方向并停止",
    "rememberThis": "iff 表示两个证明",
    "typicalProblemShapes": [
      "必要条件和充分条件问题",
      "写成 iff 或等价声明的陈述"
    ],
    "miniDrill": [
      {
        "prompt": "一个方向可以证明 iff 语句吗？",
        "answer": "不，你两者都需要。"
      },
      {
        "prompt": "这两个方向叫什么？",
        "answer": "向前和向后，或者分别表示每个含义。"
      }
    ],
    "memoryHook": "当且仅当=双向。",
    "quickExample": {
      "problem": "如何证明 P iff Q ？",
      "move": "显示 P 隐含 Q，Q 隐含 P。"
    }
  },
  "proof-set-operations": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "并集、交集和补集恒等式",
    "name": "集合运算证明",
    "useItWhen": "题目声称两个集合表达式相等",
    "looksLike": "并集、交集、补集、差集",
    "doThis": "通过两侧的定义追逐一个元素",
    "thinkOfItAs": "没有表的隶属真值表",
    "watchOutFor": "移动符号而不检查成员含义",
    "rememberThis": "集合身份是元素追逐",
    "typicalProblemShapes": [
      "分配恒等式、德摩根恒等式或子集恒等式",
      "用补集和交集设置等式"
    ],
    "miniDrill": [
      {
        "prompt": "一套身份证明的标准第一步是什么？",
        "answer": "选择任意元素。"
      },
      {
        "prompt": "你能证明一个或两个方向上的集合相等吗？",
        "answer": "通常是两个子集方向。"
      }
    ],
    "memoryHook": "遵循一个元素，而不是符号。",
    "quickExample": {
      "problem": "怎么证明 A∩(B∪C) 等于另一边？",
      "move": "任取 x 在一边，把它的集合含义拆开。"
    }
  },
  "proof-composition-inverse": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "复合函数和反函数",
    "name": "复合和逆",
    "useItWhen": "函数已堆叠或者您需要撤消其中一个",
    "looksLike": "f 与 g 的复合、f 的逆函数、单射与满射",
    "doThis": "仔细跟踪输入并检查顺序",
    "thinkOfItAs": "链式机器和撤消机器",
    "watchOutFor": "不小心颠倒了构图顺序",
    "rememberThis": "构图顺序很重要",
    "typicalProblemShapes": [
      "计算 f(g(x)) 或 g(f(x))",
      "显示一个函数有反函数或使用一个函数"
    ],
    "miniDrill": [
      {
        "prompt": "在f和g组成的函数中，哪个函数先起作用？",
        "answer": "g 首先行动。"
      },
      {
        "prompt": "函数需要什么属性才能使逆函数很好地存在？",
        "answer": "它必须是双射的。"
      }
    ],
    "memoryHook": "内部函数优先。",
    "quickExample": {
      "problem": "f 和 x 的 g 组成什么？",
      "move": "先做g，再做f。"
    }
  },
  "proof-division-algorithm": {
    "course": "抽象数学导论",
    "chapter": "第 4 章：整除与欧几里得算法",
    "unit": "数论基础",
    "topic": "除法算法",
    "name": "除法算法",
    "useItWhen": "整数分为商和余数",
    "looksLike": "a = bq + r，其中 0 ≤ r < b",
    "doThis": "把整数写成商加余数的形式",
    "thinkOfItAs": "把数拆成整除部分和余数部分",
    "watchOutFor": "忘记余数界限",
    "rememberThis": "每个整数都能写成商加小余数",
    "typicalProblemShapes": [
      "奇偶校验或案例模 n 的证明",
      "Gcd 和余数参数"
    ],
    "miniDrill": [
      {
        "prompt": "a = bq + r 中的 r 一定是正确的吗？",
        "answer": "必须满足 0 ≤ r < b。"
      },
      {
        "prompt": "除法算法可以帮助你隔离什么？",
        "answer": "余数类。"
      }
    ],
    "memoryHook": "每个整数都是商加上小余数。",
    "quickExample": {
      "problem": "除法算法是什么形式？",
      "move": "a = bq + r，而且余数满足 0 ≤ r < b。"
    }
  },
  "proof-bezout": {
    "course": "抽象数学导论",
    "chapter": "第 4 章：整除与欧几里得算法",
    "unit": "数论基础",
    "topic": "贝祖特身份",
    "name": "贝祖特身份",
    "useItWhen": "gcd 和线性组合同时出现",
    "looksLike": "gcd(a, b) = ax + by",
    "doThis": "向后运行欧几里得算法来构建组合",
    "thinkOfItAs": "展开剩余链",
    "watchOutFor": "找到 gcd 但从未将其写为 ax plus by",
    "rememberThis": "gcd 可以由 a 和 b 构建",
    "typicalProblemShapes": [
      "证明gcd(a, b)是一个线性组合",
      "使用 gcd 结构解决数论问题"
    ],
    "miniDrill": [
      {
        "prompt": "什么恒等式将 gcd 与线性组合联系起来？",
        "answer": "贝佐特的身份。"
      },
      {
        "prompt": "找到gcd后你往什么方向工作？",
        "answer": "向后通过步骤。"
      }
    ],
    "memoryHook": "找到 gcd，然后放松。",
    "quickExample": {
      "problem": "如何从欧几里得算法中得到 ax + by ？",
      "move": "通过剩余步骤进行回代。"
    }
  },
  "proof-well-ordering": {
    "course": "抽象数学导论",
    "chapter": "第 5 章：数学归纳法与良序原理",
    "unit": "数学归纳法",
    "topic": "良序原则",
    "name": "秩序井然",
    "useItWhen": "证明需要最小的坏例子",
    "looksLike": "假设一组非空反例并选择至少一个",
    "doThis": "取最小的反例，强行矛盾",
    "thinkOfItAs": "追寻第一次失败",
    "watchOutFor": "使用良排序而不明确定义坏集合",
    "rememberThis": "选择最小的坏情况",
    "typicalProblemShapes": [
      "最小反例论证",
      "与归纳法或正整数相关的证明"
    ],
    "miniDrill": [
      {
        "prompt": "在使用良好排序之前，坏情况集必须是什么？",
        "answer": "非空且由正整数或自然数组成。"
      },
      {
        "prompt": "为什么选择最小的坏案例？",
        "answer": "因为较小的情况可以用来对付它。"
      }
    ],
    "memoryHook": "首先是最小的坏案例。",
    "quickExample": {
      "problem": "有序证明的关键一步是什么？",
      "move": "假设存在坏情况并选择最小的一个。"
    }
  },
  "proof-equivalence-classes": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "等价类",
    "name": "等价类",
    "useItWhen": "等价关系将对象分组到相同类型的桶中",
    "looksLike": "[a]，同余类，相同关系桶",
    "doThis": "修复一个元素并收集与其等效的所有元素",
    "thinkOfItAs": "一桶东西算一样",
    "watchOutFor": "将类视为单个元素而不是整个集合",
    "rememberThis": "类是围绕一个元素的桶",
    "typicalProblemShapes": [
      "n类同余模",
      "将集合分成桶的关系"
    ],
    "miniDrill": [
      {
        "prompt": "两个等价类可以部分重叠吗？",
        "answer": "不。它们要么相同，要么不相交。"
      },
      {
        "prompt": "什么构建了等价类？",
        "answer": "一个选定的元素和关系。"
      }
    ],
    "memoryHook": "选择一个元素，获取它的桶。",
    "quickExample": {
      "problem": "等价关系下的[a]是什么？",
      "move": "一切等价于 a 的集合。"
    }
  },
  "proof-partitions": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "分区",
    "name": "分区",
    "useItWhen": "一组被分成不重叠的部分",
    "looksLike": "覆盖整个集合的块、类、片段",
    "doThis": "检查覆盖全部、非空以及不同块之间没有重叠",
    "thinkOfItAs": "将套装切成干净的块",
    "watchOutFor": "允许块重叠或留有间隙",
    "rememberThis": "分区覆盖所有内容，没有重叠",
    "typicalProblemShapes": [
      "连接分区和等价关系的问题",
      "建议作为分区的子集族"
    ],
    "miniDrill": [
      {
        "prompt": "分区块可以为空吗？",
        "answer": "不。"
      },
      {
        "prompt": "如果两个块重叠会发生什么？",
        "answer": "那么它就不是一个分区，除非它们确实是同一个块。"
      }
    ],
    "memoryHook": "覆盖全部，不重叠。",
    "quickExample": {
      "problem": "两大分区规则是什么？",
      "move": "覆盖整个集合并保持不同的块不相交。"
    }
  },
  "proof-bijections-countability": {
    "course": "抽象数学导论",
    "chapter": "第 8 章：无限集合的基数",
    "unit": "关系与基数",
    "topic": "双射和可数性",
    "name": "可数性的双射",
    "useItWhen": "你想证明两个无限集具有相同的大小",
    "looksLike": "找到双射，列出集合，将集合与自然数配对",
    "doThis": "建立一对一的匹配或显式列表",
    "thinkOfItAs": "相同的尺寸意味着相同的配对功率",
    "watchOutFor": "当您需要完整匹配时仅显示单射或仅显示满射",
    "rememberThis": "可数意味着与自然数相匹配",
    "typicalProblemShapes": [
      "整数、偶数、有理数或其他可数比较",
      "要求明确列表的问题"
    ],
    "miniDrill": [
      {
        "prompt": "什么样的函数可以证明两个集合具有相同的基数？",
        "answer": "双射。"
      },
      {
        "prompt": "可数性的通常目标是什么？",
        "answer": "自然数。"
      }
    ],
    "memoryHook": "可数意味着将其与 1, 2, 3, ... 配对",
    "quickExample": {
      "problem": "如何证明集合是可数的？",
      "move": "列出它或用自然数构建双射。"
    }
  },
  "proof-diagonal-argument": {
    "course": "抽象数学导论",
    "chapter": "第 8 章：无限集合的基数",
    "unit": "关系与基数",
    "topic": "康托对角论证",
    "name": "对角线论证",
    "useItWhen": "一个集合声称可以列出，但可能不是",
    "looksLike": "假设列出了所有实数，然后在对角线上构建一个新的实数",
    "doThis": "更改对角线条目以制作丢失的对象",
    "thinkOfItAs": "通过更改每一行中的一个位置来转义每个列表",
    "watchOutFor": "构建一个意外匹配列出的条目的新对象",
    "rememberThis": "对角线的变化使一个逃逸项目",
    "typicalProblemShapes": [
      "实数、二进制字符串或所有子集声明",
      "证明不存在完整列表"
    ],
    "miniDrill": [
      {
        "prompt": "为什么对角线对象避开整个列表？",
        "answer": "因为它与列出的每一项至少有一个强制位置不同。"
      },
      {
        "prompt": "对角化的主要矛盾是什么？",
        "answer": "所谓的完整列表错过了新对象。"
      }
    ],
    "memoryHook": "改变对角线，退出列表。",
    "quickExample": {
      "problem": "显示实数不可数的对角线移动是多少？",
      "move": "创建一个新的小数，其第 n 位与第 n 个列出的数字不同。"
    }
  },
  "proof-cases": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "案例证明",
    "name": "案例证明",
    "useItWhen": "问题自然地分为几种不同的情况",
    "looksLike": "偶数或奇数，正数或负数，一种情况或另一种情况",
    "doThis": "涵盖每一个案例并证明每一个案例中的主张",
    "thinkOfItAs": "几个简短的证明而不是一个复杂的证明",
    "watchOutFor": "遗漏一个案例或让两个案例严重重叠",
    "rememberThis": "拆分干净，完成所有案件",
    "typicalProblemShapes": [
      "奇偶校验证明",
      "绝对值或基于符号的参数"
    ],
    "miniDrill": [
      {
        "prompt": "案例证明可以跳过一种可能性吗？",
        "answer": "不，必须涵盖每一个真实案例。"
      },
      {
        "prompt": "什么时候通过案例证明通常是一个好的举措？",
        "answer": "当设置已经分解为自然类别时。"
      }
    ],
    "memoryHook": "如果问题分裂，就让证明分裂。",
    "quickExample": {
      "problem": "如何证明依赖于偶数或奇数的整数陈述？",
      "move": "处理一种偶数情况和一种奇数情况。"
    }
  },
  "proof-existence-uniqueness": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "存在性和唯一性",
    "name": "存在性与唯一性",
    "useItWhen": "一份声明说存在一个对象",
    "looksLike": "存在着一种独特的……，唯一的……",
    "doThis": "首先证明存在，然后证明没有第二个对象也可以工作",
    "thinkOfItAs": "构建它，然后证明它是唯一的",
    "watchOutFor": "展示存在而忘记独特性",
    "rememberThis": "唯一意味着存在加上只有一个",
    "typicalProblemShapes": [
      "只有一种解决方案声称",
      "涉及唯一对象的定义"
    ],
    "miniDrill": [
      {
        "prompt": "唯一性能证明某物存在吗？",
        "answer": "不。"
      },
      {
        "prompt": "唯一性证明中出现了什么额外步骤？",
        "answer": "假设两个对象工作并证明它们是相等的。"
      }
    ],
    "memoryHook": "存在得到一个。独特性会杀死额外的人。",
    "quickExample": {
      "problem": "存在唯一性证明的两个工作是什么？",
      "move": "显示至少存在一个，则显示两个这样的对象必须是相同的。"
    }
  },
  "proof-power-set-cartesian": {
    "course": "抽象数学导论",
    "chapter": "第 6 章：集合论 II",
    "unit": "集合论 II",
    "topic": "发电机组和笛卡尔积",
    "name": "幂集和笛卡尔积",
    "useItWhen": "该问题从子集或有序对构建新的集合",
    "looksLike": "P(A)，A交叉B，有序对",
    "doThis": "跟踪对象是子集还是一对",
    "thinkOfItAs": "幂集表示所有组，笛卡尔表示所有配对",
    "watchOutFor": "将 A 的元素与 A 的子集混合",
    "rememberThis": "幂集生成子集，叉积生成对",
    "typicalProblemShapes": [
      "计算或比较幂集",
      "在笛卡尔积上建立函数或关系"
    ],
    "miniDrill": [
      {
        "prompt": "幂集的元素是单个数字还是子集？",
        "answer": "一个子集。"
      },
      {
        "prompt": "A叉B包含什么？",
        "answer": "有序对，第一部分来自 A，第二部分来自 B。"
      }
    ],
    "memoryHook": "幂集 = 子集。叉积=对。",
    "quickExample": {
      "problem": "P(A) 里面住着什么？",
      "move": "A 的子集，而不是 A 的普通元素。"
    }
  },
  "proof-images-preimages": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "图像和原像",
    "name": "图像与原像",
    "useItWhen": "函数作用于集合，而不仅仅是单个输入",
    "looksLike": "f(S)、T 的 f 逆、图像、原像",
    "doThis": "跟踪该集合从函数的哪一侧开始",
    "thinkOfItAs": "图像向前，原像向后拉",
    "watchOutFor": "当不存在原像时，将原像视为反函数",
    "rememberThis": "前像、后像",
    "typicalProblemShapes": [
      "设置涉及函数的恒等式",
      "比较 f(A union B) 和并集原像的问题"
    ],
    "miniDrill": [
      {
        "prompt": "原像需要函数可逆吗？",
        "answer": "不。"
      },
      {
        "prompt": "图像向哪个方向移动？",
        "answer": "从输入到输出。"
      }
    ],
    "memoryHook": "图像推送。原像向后拉。",
    "quickExample": {
      "problem": "集合 T 的原像是什么？",
      "move": "输出落在 T 中的所有输入。"
    }
  },
  "proof-relation-properties": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "基本关系属性",
    "name": "关系属性",
    "useItWhen": "在将关系称为特殊关系之前需要对其进行测试",
    "looksLike": "自反、对称、反对称、传递",
    "doThis": "测试每个属性的确切定义",
    "thinkOfItAs": "命名关系之前的清单",
    "watchOutFor": "混淆对称与反对称",
    "rememberThis": "仅在精确测试后命名属性",
    "typicalProblemShapes": [
      "数字或集合的关系",
      "等价关系或偏序之前的预热"
    ],
    "miniDrill": [
      {
        "prompt": "反对称和不对称的意思一样吗？",
        "answer": "不。"
      },
      {
        "prompt": "测试关系属性时最安全的做法是什么？",
        "answer": "每次都使用准确的定义。"
      }
    ],
    "memoryHook": "关系名称位于清单之后。",
    "quickExample": {
      "problem": "测试关系的最快方法是什么？",
      "move": "使用您面前的定义逐个属性。"
    }
  },
  "proof-partial-orders": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "部分订单",
    "name": "部分订单",
    "useItWhen": "关系的行为类似于比较，但并非每一对都具有可比性",
    "looksLike": "自反、反对称、传递",
    "doThis": "检查三个顺序属性，然后询问是否所有对都可以比较",
    "thinkOfItAs": "具有一些联系或无法比较的对的排序",
    "watchOutFor": "思考偏序意味着每一对都必须进行比较",
    "rememberThis": "偏序不是全序",
    "typicalProblemShapes": [
      "整除关系",
      "幂集上的子集关系"
    ],
    "miniDrill": [
      {
        "prompt": "哪三个属性定义偏序？",
        "answer": "自反、反对称、传递。"
      },
      {
        "prompt": "偏序可以使某些配对变得不可比较吗？",
        "answer": "是的。"
      }
    ],
    "memoryHook": "部分顺序可以让某些对保持不匹配的状态。",
    "quickExample": {
      "problem": "证明部分顺序后额外的问题是什么？",
      "move": "询问每对是否具有可比性。"
    }
  },
  "proof-total-orders": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "订单总数",
    "name": "订单总数",
    "useItWhen": "偏序也会比较每一对",
    "looksLike": "有序集、可比性、每对",
    "doThis": "从部分顺序开始，然后检查完​​全可比性",
    "thinkOfItAs": "每两个项目都可以进行比较的阵容",
    "watchOutFor": "调用关系总计只是因为它具有顺序属性",
    "rememberThis": "全序 = 偏序加上可比性",
    "typicalProblemShapes": [
      "标准小于样式关系",
      "比较部分订单和全订单示例"
    ],
    "miniDrill": [
      {
        "prompt": "总订单需要什么额外属性？",
        "answer": "每对的可比性。"
      },
      {
        "prompt": "幂集上的子集通常是总的吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "总计意味着每个人都可以进行比较。",
    "quickExample": {
      "problem": "是什么将部分订单变成全订单？",
      "move": "每对都必须具有可比性。"
    }
  },
  "proof-rationals-countable": {
    "course": "抽象数学导论",
    "chapter": "第 8 章：无限集合的基数",
    "unit": "关系与基数",
    "topic": "为什么有理数是可数的",
    "name": "有理数是可数的",
    "useItWhen": "学生将无穷大与大到无法列出混淆",
    "looksLike": "分数、网格列表、有理数对角线",
    "doThis": "制定列表策略并小心跳过重复项",
    "thinkOfItAs": "以智能顺序遍历分数网格",
    "watchOutFor": "多次列出相同的理由并结束",
    "rememberThis": "无限仍然可以列出",
    "typicalProblemShapes": [
      "比较自然数、整数、有理数和实数",
      "关于显式列表方法的问题"
    ],
    "miniDrill": [
      {
        "prompt": "上市理由的难点是什么？",
        "answer": "避免重复，如 1/2 和 2/4。"
      },
      {
        "prompt": "可数意味着有限吗？",
        "answer": "不。"
      }
    ],
    "memoryHook": "可数只是意味着可列出。",
    "quickExample": {
      "problem": "为什么有理数可数而实数不可数？",
      "move": "可以列出有理数；对角化打破了实数列表。"
    }
  },
  "proof-planning-writing": {
    "course": "抽象数学导论",
    "chapter": "第 1 章：范式转变",
    "unit": "证明基础",
    "topic": "规划并撰写证明",
    "name": "首先计划证明",
    "useItWhen": "您知道该主张但不知道如何开始",
    "looksLike": "证明...，空白页，一次有太多想法",
    "doThis": "重写声明，解压定义，测试小案例，然后在写作前绘制草图",
    "thinkOfItAs": "首先是草稿，其次是干净的校样",
    "watchOutFor": "在你知道下一步之前尝试写出完美的证明",
    "rememberThis": "首先是凌乱的草稿，然后是干净的故事",
    "typicalProblemShapes": [
      "一个定理感觉正确，但第一行不清楚",
      "你知道定义但不知道证明结构"
    ],
    "miniDrill": [
      {
        "prompt": "你的第一次尝试通常应该是最终的证明吗？",
        "answer": "不，先画草图。"
      },
      {
        "prompt": "在几乎每一个证明中你应该尽早解开什么？",
        "answer": "定义。"
      }
    ],
    "memoryHook": "解释、素描，然后写作。",
    "quickExample": {
      "problem": "在写正式句子之前你会做什么？",
      "move": "解释索赔并绘制路线。"
    }
  },
  "proof-propositions": {
    "course": "抽象数学导论",
    "chapter": "第 2 章：逻辑与证明语言",
    "unit": "逻辑与量词",
    "topic": "命题和逻辑连接词",
    "name": "命题和连接词",
    "useItWhen": "语句由 and、or、not 或 if-then 构成",
    "looksLike": "P 和 Q，P 或 Q，不是 P，如果 P 那么 Q",
    "doThis": "将句子分成更小的陈述并跟踪连接器",
    "thinkOfItAs": "数学陈述的语法",
    "watchOutFor": "当数学通常意味着包容或时，像日常用语一样阅读“或”",
    "rememberThis": "连接器改变了整个声明",
    "typicalProblemShapes": [
      "由较小的主张构建的复合陈述",
      "真值检查和重写"
    ],
    "miniDrill": [
      {
        "prompt": "当“P”或“Q”都为真时，它们还能为真吗？",
        "answer": "是的。"
      },
      {
        "prompt": "在一个长逻辑句子中，你应该首先分离出什么？",
        "answer": "主连接器。"
      }
    ],
    "memoryHook": "在证明之前找到连接器。",
    "quickExample": {
      "problem": "数学中“P 或 Q”通常意味着什么？",
      "move": "至少有一个是正确的，也许两者都是正确的。"
    }
  },
  "proof-set-notation": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "集合记号与集合描述",
    "name": "集合记号",
    "useItWhen": "题目用了花括号、属于符号或集合构造表示法",
    "looksLike": "{x in Z : ...}、属于、子集、空集",
    "doThis": "先把记号翻成白话，再开始证明",
    "thinkOfItAs": "先把这个集合念出来",
    "watchOutFor": "把“元素属于”跟“子集属于”混在一起",
    "rememberThis": "先用话说清集合是什么意思",
    "typicalProblemShapes": [
      "需要翻译的集合构建器符号",
      "成员资格或子集声明"
    ],
    "miniDrill": [
      {
        "prompt": "A 中的 x 是否意味着 x 是一个集合？",
        "answer": "不一定。这只表示 x 是 A 的一个元素。"
      },
      {
        "prompt": "可怕的集合符号的快速移动是什么？",
        "answer": "先用简单的话把它重写出来。"
      }
    ],
    "memoryHook": "先把花括号念成人话。",
    "quickExample": {
      "problem": "{x in Z : x 是偶数} 表示什么？",
      "move": "所有偶数的集合。"
    }
  },
  "proof-union-intersection-complement": {
    "course": "抽象数学导论",
    "chapter": "第 3 章：集合与函数",
    "unit": "集合与函数",
    "topic": "并集、交集和补集",
    "name": "并集、交集、补集",
    "useItWhen": "集合证明里出现并集、交集或补集符号",
    "looksLike": "A∪B、A∩B、A 的补集",
    "doThis": "把每个符号翻成元素条件；必要时做双向包含证明",
    "thinkOfItAs": "并集表示或，交集表示和，补集表示非",
    "watchOutFor": "只盯着符号看，却不去证明元素属于哪边",
    "rememberThis": "集合证明常常就是元素追踪",
    "typicalProblemShapes": [
      "通过并集和交集设置身份",
      "证明两个集合相等"
    ],
    "miniDrill": [
      {
        "prompt": "x ∈ A∩B 是什么意思？",
        "answer": "x 既在 A 又在 B 中。"
      },
      {
        "prompt": "通常如何证明两个集合相等？",
        "answer": "显示每个都是另一个的子集。"
      }
    ],
    "memoryHook": "并是或，交是且，补是否。",
    "quickExample": {
      "problem": "怎么证明 A ⊆ B∪C？",
      "move": "先取任意 x∈A，再证明 x 在 B 或 C 里。"
    }
  },
  "proof-recursive-processes": {
    "course": "抽象数学导论",
    "chapter": "第 5 章：数学归纳法与良序原理",
    "unit": "数学归纳法",
    "topic": "递归过程",
    "name": "递归过程",
    "useItWhen": "序列或对象是从前面的步骤构建的",
    "looksLike": "a_n 取决于 a_(n-1)、递归、旧项中的下一项",
    "doThis": "在使用归纳之前确定基本情况和更新规则",
    "thinkOfItAs": "今天取决于昨天",
    "watchOutFor": "在不清楚递归的情况下跳入归纳法",
    "rememberThis": "基本情况加更新规则",
    "typicalProblemShapes": [
      "从前面的术语定义的序列",
      "分阶段建造的瓷砖、台阶或计数"
    ],
    "miniDrill": [
      {
        "prompt": "如果您只知道 a_n = a_(n-1) + 2，那么缺少什么？",
        "answer": "一个起始值。"
      },
      {
        "prompt": "什么证明方法经常与递归相匹配？",
        "answer": "归纳法。"
      }
    ],
    "memoryHook": "起始值，然后重复规则。",
    "quickExample": {
      "problem": "递归定义首先需要哪两件事？",
      "move": "下一步的起始值和规则。"
    }
  },
  "proof-indexed-collections": {
    "course": "抽象数学导论",
    "chapter": "第 6 章：集合论 II",
    "unit": "集合论 II",
    "topic": "按索引编号的一族集合",
    "name": "索引集合族",
    "useItWhen": "题目里有 A_i、对 i 的并集，或很多集合的交集",
    "looksLike": "A_i、从 i=1 到 n 的并集、对所有 i 的交集",
    "doThis": "把索引当成标签，再把大并集或大交集翻成白话",
    "thinkOfItAs": "一串带编号的集合",
    "watchOutFor": "忘了题目说的是“某个索引”还是“所有索引”",
    "rememberThis": "大并集是至少一个，大交集是每一个",
    "typicalProblemShapes": [
      "同时关于多个集合的陈述",
      "嵌套并集和交集"
    ],
    "miniDrill": [
      {
        "prompt": "x 在 ⋂A_i 里，表示属于一个还是每一个集合？",
        "answer": "每一个集合。"
      },
      {
        "prompt": "这里的索引 i 是干什么的？",
        "answer": "它只是给这族集合编号。"
      }
    ],
    "memoryHook": "并集看至少一个，交集看每一个。",
    "quickExample": {
      "problem": "x ∈ ⋃A_i 是什么意思？",
      "move": "x 至少属于这族集合中的一个。"
    }
  },
  "proof-well-defined": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "定义良好的函数与运算",
    "name": "定义良好",
    "useItWhen": "一个对象有很多代表，您需要输出不依赖于选择",
    "looksLike": "[a] 映到…、分数、等价类、模类",
    "doThis": "选两个等价代表，证明它们给出的结果一样",
    "thinkOfItAs": "不同的名称，相同的结果",
    "watchOutFor": "只检查一个代表就收工",
    "rememberThis": "规则不能依赖你挑了哪个代表",
    "typicalProblemShapes": [
      "商集或同余类上的函数",
      "使用代表定义的操作"
    ],
    "miniDrill": [
      {
        "prompt": "什么会让一个定义不良好？",
        "answer": "两个等效的输入给出不同的输出。"
      },
      {
        "prompt": "你要测一个代表还是两个等价代表？",
        "answer": "两个等价的。"
      }
    ],
    "memoryHook": "相同的类，相同的输出。",
    "quickExample": {
      "problem": "等价类映射的关键测试是什么？",
      "move": "显示等效的输入给出相同的输出。"
    }
  },
  "proof-congruence-classes": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "同余类 mod n",
    "name": "同余类",
    "useItWhen": "数字按相同的余数 mod n 分组",
    "looksLike": "[a] mod n，相同的余数，时钟，剩余类别",
    "doThis": "将类转换为具有该余数的所有数字并使用余数算术",
    "thinkOfItAs": "位于同一时钟位置的数字",
    "watchOutFor": "将一个数字与它的整个类别混淆",
    "rememberThis": "相同的余数意味着相同的类别",
    "typicalProblemShapes": [
      "算术模数",
      "余数的等价关系示例"
    ],
    "miniDrill": [
      {
        "prompt": "7 和 12 属于同一类 mod 5 吗？",
        "answer": "是的。两者都留下余数 2。"
      },
      {
        "prompt": "同余类是指一个数还是多个数？",
        "answer": "许多。"
      }
    ],
    "memoryHook": "相同的余数，相同的桶。",
    "quickExample": {
      "problem": "[2] mod 5 中有哪些数字？",
      "move": "除以 5 后余数为 2 的所有整数。"
    }
  },
  "proof-functions-partitions": {
    "course": "抽象数学导论",
    "chapter": "第 7 章：关系与划分",
    "unit": "关系与基数",
    "topic": "函数与划分",
    "name": "函数与划分",
    "useItWhen": "函数把一个集合按输出分成原像块",
    "looksLike": "相同输出、y 的原像、定义域分成几组",
    "doThis": "按输出给输入分组，把每一组看成一个块",
    "thinkOfItAs": "把输入按输出分桶",
    "watchOutFor": "忘了不同输出对应的块彼此不重叠",
    "rememberThis": "函数会把定义域按输出划分成块",
    "typicalProblemShapes": [
      "函数的原像集",
      "由相等输出构建的分区"
    ],
    "miniDrill": [
      {
        "prompt": "一个输入会落在两个不同的块里吗？",
        "answer": "不。"
      },
      {
        "prompt": "什么决定输入属于哪个块？",
        "answer": "其输出值。"
      }
    ],
    "memoryHook": "同输出，同一块。",
    "quickExample": {
      "problem": "函数里的一个原像块是什么？",
      "move": "就是所有会映到同一个输出的输入。"
    }
  },
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
        "prompt": "如果案例是单独的选择，您会加还是乘？",
        "answer": "添加。"
      }
    ],
    "memoryHook": "并繁殖。或者添加。",
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
    "looksLike": "将n个对象分成大小为a、b、c的桶",
    "doThis": "计算有多少种方法可以分成小组大小",
    "thinkOfItAs": "两个以上桶的组合",
    "watchOutFor": "将多组分裂视为一个简单的选择",
    "rememberThis": "许多桶意味着多项式",
    "typicalProblemShapes": [
      "将对象分配到标记类别中",
      "计算多个类别总数固定的结果"
    ],
    "miniDrill": [
      {
        "prompt": "一个短语中的多项式概念是什么？",
        "answer": "分成几个桶。"
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
    "looksLike": "E(X)、平均增益、平均数量、平均值",
    "doThis": "将每个值乘以其概率并添加",
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
    "doThis": "即使变量是相关的，也将期望拆分为总和",
    "thinkOfItAs": "期望分布于加法",
    "watchOutFor": "这里需要独立思考",
    "rememberThis": "线性不需要独立性",
    "typicalProblemShapes": [
      "预期成功、匹配或冲突的数量",
      "指示变量计数参数"
    ],
    "miniDrill": [
      {
        "prompt": "预期金额的快速变动是多少？",
        "answer": "分摊总金额。"
      },
      {
        "prompt": "依赖性是否会破坏期望的线性？",
        "answer": "不。"
      }
    ],
    "memoryHook": "期望可以免费分割金额。",
    "quickExample": {
      "problem": "您需要 E(X + Y) = E(X) + E(Y) 的独立性吗？",
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
        "answer": "传播。"
      }
    ],
    "memoryHook": "平均值是中心。方差被扩散。",
    "quickExample": {
      "problem": "方差告诉你什么而期望却没有告诉你什么？",
      "move": "结果的分散程度如何。"
    }
  },
  "prob-distributions": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "特别发行版",
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
    "looksLike": "Cov(X,Y)，Corr(X,Y)",
    "doThis": "使用协方差来确定关系的方向，使用相关性来确定缩放强度",
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
    "memoryHook": "协方差表明方向。相关性重新调整了它的尺度。",
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
    "useItWhen": "您需要快速的上限，而无需完整的分布详细信息",
    "looksLike": "限制随机变量变大的机会",
    "doThis": "对于非负变量使用马尔可夫，当方差可用时使用切比雪夫",
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
    "memoryHook": "马尔可夫用于粗略平均边界，切比雪夫用于扩展边界。",
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
    "useItWhen": "显示许多随机片段的总和或平均值",
    "looksLike": "大 n、样本均值、标准化总和",
    "doThis": "将总和或平均值归一化并近似为正常形状",
    "thinkOfItAs": "许多随机的凹凸混合成钟形曲线",
    "watchOutFor": "在样本量很小或依赖性很强的情况下使用 CLT，而不检查假设",
    "rememberThis": "许多小的随机碎片通常看起来很正常",
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
    "memoryHook": "大的随机总和逐渐趋于正常。",
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
        "prompt": "您需要什么样的案例拆分？",
        "answer": "一个分区。"
      },
      {
        "prompt": "案件可以重叠吗？",
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
    "useItWhen": "您需要精确的点概率或累积概率直至截止",
    "looksLike": "P(X = x), F(x) = P(X <= x)",
    "doThis": "对一个精确值使用 PMF，对达到该值的所有内容使用 CDF",
    "thinkOfItAs": "PMF 是一个点，CDF 是堆积",
    "watchOutFor": "使用 CDF，就像它自动给出精确的点质量一样",
    "rememberThis": "PMF精确，CDF累积",
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
    "memoryHook": "PMF 选择一个点。 CDF 堆积起来。",
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
    "useItWhen": "您通过固定数量的独立是-否试验来计算成功",
    "looksLike": "n 次试验，相同的 p，正好 k 次成功",
    "doThis": "检查固定 n、相同 p、独立性，然后使用二项式设置",
    "thinkOfItAs": "重复相同的尝试 n 次并计算胜利",
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
    "memoryHook": "固定尝试，计算胜利。",
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
    "doThis": "发现重复的独立试验和一次成功的故事",
    "thinkOfItAs": "不断尝试，直到成功",
    "watchOutFor": "当故事计算总体成功时使用几何",
    "rememberThis": "几何平均等待时间",
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
    "useItWhen": "您计算时间或空间窗口中的罕见事件",
    "looksLike": "某个时间间隔内的到达、缺陷、呼叫、点击",
    "doThis": "检查平均速率 lambda 的窗口计数",
    "thinkOfItAs": "罕见事件滴入桶中",
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
        "answer": "一个窗口计数。"
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
    "name": "正常模式",
    "useItWhen": "钟形连续模型出现",
    "looksLike": "平均 mu、标准差 sigma、钟形曲线",
    "doThis": "考虑区间面积并在需要时标准化",
    "thinkOfItAs": "经典的钟模型",
    "watchOutFor": "将法线视为点质量离散模型",
    "rememberThis": "正常表示钟形曲线面积",
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
    "memoryHook": "正常 = 钟形曲线间隔。",
    "quickExample": {
      "problem": "您通常在正态曲线下计算什么？",
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
    "looksLike": "Var(X + Y)、独立和、协方差项",
    "doThis": "在添加方差之前先检查独立性",
    "thinkOfItAs": "传播结合，但并不总是免费的",
    "watchOutFor": "不检查依赖性而盲目添加方差",
    "rememberThis": "方差只有在独立的情况下才会干净地增加",
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
    "memoryHook": "期望总是会增加。方差需要帮助。",
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
    "useItWhen": "您想要使用 0-1 标志对随机事件进行计数",
    "looksLike": "I_A，事件发生与否，预期计数",
    "doThis": "将每个事件转化为 0-1 开关，然后对开关求和",
    "thinkOfItAs": "小型开关柜台",
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
    "memoryHook": "如果可以算的话，尝试0-1切换。",
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
    "useItWhen": "样本平均值不断增长，您关心长期中心",
    "looksLike": "多次试验的平均值、长期频率、样本平均值",
    "doThis": "将平均值的走向与分布的形状分开",
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
    "memoryHook": "LLN 求平均值。 CLT 找到形状。",
    "quickExample": {
      "problem": "大数定律用简单的英语怎么说？",
      "move": "长期平均值逐渐接近真实平均值。"
    }
  },
  "prob-stars-and-bars": {
    "course": "概率论",
    "chapter": "第 1 章：组合分析",
    "unit": "计数",
    "topic": "计算非负整数解",
    "name": "星星和酒吧",
    "useItWhen": "你计算将总数分成不同桶的方法",
    "looksLike": "x1 + x2 + ... + xn = k 且 xi 非负",
    "doThis": "将总数变成星星并使用条形图分割桶",
    "thinkOfItAs": "一排带有分隔线的物体",
    "watchOutFor": "忘记是否允许零",
    "rememberThis": "总和放入桶中意味着星形和条形",
    "typicalProblemShapes": [
      "非负整数解计数",
      "将相同的球分配到垃圾箱中"
    ],
    "miniDrill": [
      {
        "prompt": "如果每个 xi 必须至少为 1，那么首先会发生什么变化？",
        "answer": "计数前将每个变量向下移动 1。"
      },
      {
        "prompt": "星形和条形是否​​计算有序桶或无序组？",
        "answer": "订购了桶。"
      }
    ],
    "memoryHook": "对象和分隔线。",
    "quickExample": {
      "problem": "什么模式适合 x1 + x2 + x3 = 7 且 xi 非负？",
      "move": "星星和酒吧。"
    }
  },
  "prob-equally-likely": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "同等可能的结果",
    "name": "同等可能的结果",
    "useItWhen": "每个结果都有相同的可能性",
    "looksLike": "公平骰子、公平抽牌、随机排列、均匀样本空间",
    "doThis": "将有利结果计入总结果",
    "thinkOfItAs": "概率成为样本空间的一部分",
    "watchOutFor": "当结果的可能性不同时，使用有利而非总体",
    "rememberThis": "仅在等似然检查后计数才有效",
    "typicalProblemShapes": [
      "纸牌、骰子、抛硬币和随机排列",
      "原始计数的概率"
    ],
    "miniDrill": [
      {
        "prompt": "如果结果的权重不同，您可以使用有利优于总计吗？",
        "answer": "不。"
      },
      {
        "prompt": "等概率样本空间中的分母是多少？",
        "answer": "结果总数。"
      }
    ],
    "memoryHook": "先机会均等，再算数。",
    "quickExample": {
      "problem": "公平骰子问题的第一个概率移动是什么？",
      "move": "数出好的结果并除以 6。"
    }
  },
  "prob-secretary-problem": {
    "course": "概率论",
    "chapter": "第 2 章：概率基础",
    "unit": "概率基础",
    "topic": "秘书问题",
    "name": "秘书问题",
    "useItWhen": "选择一一到来，被拒绝的选项就永远消失了",
    "looksLike": "面试顺序，迄今为止最好的规则，现在就停下来选择",
    "doThis": "跳过早期样本，然后采用第一个选项，击败迄今为止看到的所有选项",
    "thinkOfItAs": "先采样，然后扑向第一个杰出的",
    "watchOutFor": "尝试与您未见过的未来候选人进行比较",
    "rememberThis": "跳过一些，然后采取下一个迄今为止最好的",
    "typicalProblemShapes": [
      "最优停止问题",
      "从一次性序列中选择最佳项目"
    ],
    "miniDrill": [
      {
        "prompt": "您可以在经典设置中返回被拒绝的候选人吗？",
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
    "useItWhen": "你等待第r次成功，而不仅仅是第一个",
    "looksLike": "r 成功之前的试验次数",
    "doThis": "识别重复的几何等待捆绑以达到成功的目标数量",
    "thinkOfItAs": "几何，但继续前进，直到成功数字 r",
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
        "answer": "通常进行总尝试直到第r次成功。"
      }
    ],
    "memoryHook": "几何等一。负二项式等待 r。",
    "quickExample": {
      "problem": "从几何到负二项式有什么变化？",
      "move": "您等待第 r 次成功，而不是第一个。"
    }
  },
  "prob-hypergeometric": {
    "course": "概率论",
    "chapter": "第 3 章：离散随机变量",
    "unit": "随机变量",
    "topic": "超几何图案",
    "name": "超几何图案",
    "useItWhen": "您从有限总体中进行无放回抽样",
    "looksLike": "一副牌，群体中的好物品，无需更换的抽奖",
    "doThis": "通过组合计算好的抽奖并记住每次抽奖的概率变化",
    "thinkOfItAs": "二项式无放回",
    "watchOutFor": "当人口减少时使用独立或二项式",
    "rememberThis": "没有替代意味着超几何",
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
        "answer": "二项式，但没有替换。"
      }
    ],
    "memoryHook": "如果不进行替换，就会破坏独立性。",
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
    "useItWhen": "根据密度，区间中的每个点的可能性均等",
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
    "memoryHook": "平间隔意味着长度除以长度。",
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
    "useItWhen": "您可以模拟下次到达之前的等待时间",
    "looksLike": "等待时间、速率 lambda、无记忆连续模型",
    "doThis": "考虑等待时间，而不是事件计数，并使用速率参数",
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
    "memoryHook": "指数等待下一个事件。",
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
    "useItWhen": "二项式的 n 很大，并且您需要快速的概率估计",
    "looksLike": "Bin(n,p)，样本量大，钟形近似",
    "doThis": "匹配平均值和散布，然后用正态曲线近似",
    "thinkOfItAs": "将粗壮的计数曲线换成平滑的钟形",
    "watchOutFor": "当 n 太小或二项式太倾斜时使用它",
    "rememberThis": "大二项式可以表现正常",
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
    "memoryHook": "大二项式、平滑钟形估计。",
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
    "name": "条件分配",
    "useItWhen": "一个变量已确定，您需要在该信息之后再添加另一个变量",
    "looksLike": "X 给定 Y = y，条件 PMF，条件密度",
    "doThis": "冻结给定的信息，然后在该切片内重新规范化",
    "thinkOfItAs": "放大联合图片的一条",
    "watchOutFor": "使用条件化后的原始总概率",
    "rememberThis": "先条件化，然后再归一化",
    "typicalProblemShapes": [
      "给定 Y = y 求 X",
      "从联合表或密度到条件定律"
    ],
    "miniDrill": [
      {
        "prompt": "调节通常会缩小你工作的宇宙吗？",
        "answer": "是的。"
      },
      {
        "prompt": "条件概率还必须添加什么？",
        "answer": "1 在条件切片内。"
      }
    ],
    "memoryHook": "先切片，然后重新缩放。",
    "quickExample": {
      "problem": "当您以 Y = y 为条件时，联合分布会发生什么？",
      "move": "您将其切片并在该切片内重新缩放。"
    }
  },
  "prob-conditional-expectation": {
    "course": "概率论",
    "chapter": "第 7 章：协方差与随机变量和的方差",
    "unit": "期望与方差",
    "topic": "条件期望",
    "name": "条件期望",
    "useItWhen": "额外的信息会改变你的最佳平均猜测",
    "looksLike": "E[X给定Y]，信息后的平均值，塔规则",
    "doThis": "首先取条件世界内的期望值",
    "thinkOfItAs": "新线索到达后的平均值",
    "watchOutFor": "在每种情况下将条件期望视为单个固定数字",
    "rememberThis": "条件第一，平均第二",
    "typicalProblemShapes": [
      "部分信息的期望值",
      "塔楼法则和总期望定律问题"
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
    "memoryHook": "新线索，新平均。",
    "quickExample": {
      "problem": "E[X给定Y]用简单的英语意味着什么？",
      "move": "一旦 Y 已知，X 的平均值。"
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
        "answer": "一审。"
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
    "topic": "伽马分布图",
    "name": "伽玛模式",
    "useItWhen": "你在连续的时间内等待几个泊松式的到达",
    "looksLike": "直到第 r 个事件的时间、形状参数、连续等待模型",
    "doThis": "将其视为指数的多次到达版本",
    "thinkOfItAs": "呈指数增长，但请继续等待更多事件",
    "watchOutFor": "将其与离散负二项式计数故事混合起来",
    "rememberThis": "gamma 等待第 r 个及时到达",
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
  "prob-independent-rvs": {
    "course": "概率论",
    "chapter": "第 5 章：联合分布与独立性",
    "unit": "联合分布",
    "topic": "独立随机变量",
    "name": "独立随机变量",
    "useItWhen": "联合行为应该分成单独的部分",
    "looksLike": "联合 pmf 因子、联合密度因子，一个变量无法告诉您其他变量的任何信息",
    "doThis": "检查联合是否等于边际的乘积",
    "thinkOfItAs": "两个互不干扰的随机故事",
    "watchOutFor": "仅仅因为变量看起来不相关就假设独立",
    "rememberThis": "独立意味着联合等于产品",
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
    "memoryHook": "关节分裂成两部分。",
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
    "name": "自变量之和",
    "useItWhen": "一个新的随机变量被构建为 X + Y",
    "looksLike": "两个变量的总和，组合分布，卷积感觉",
    "doThis": "总结这些碎片可以添加到目标的所有方式",
    "thinkOfItAs": "收集总数相同的每条路径",
    "watchOutFor": "添加不可能对的概率或忘记所有有效对",
    "rememberThis": "总和分配是指收集所有加起来达到目标​​的情况",
    "typicalProblemShapes": [
      "X + Y 的分布",
      "骰子和式问题"
    ],
    "miniDrill": [
      {
        "prompt": "您检查总数中的一对还是每对？",
        "answer": "每对。"
      },
      {
        "prompt": "为什么独立在这里有帮助？",
        "answer": "它让关节碎片干净地繁殖。"
      }
    ],
    "memoryHook": "通过收集所有匹配对来添加总数。",
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
    "doThis": "选择适合您实际拥有的信息的最粗略的界限",
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
        "prompt": "您在使用普通表格想法之前还是之后进行标准化？",
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
  }
};
