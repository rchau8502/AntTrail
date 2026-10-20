import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1080, 1440

FONT_CN_BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"
FONT_CN_LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"
FONT_EN = "/System/Library/Fonts/Helvetica.ttc"

def get_fonts():
    return {
        "tag": ImageFont.truetype(FONT_CN_BOLD, 26),
        "title": ImageFont.truetype(FONT_CN_BOLD, 68),
        "subtitle": ImageFont.truetype(FONT_CN_LIGHT, 30),
        "card_title": ImageFont.truetype(FONT_CN_BOLD, 34),
        "card_desc": ImageFont.truetype(FONT_CN_LIGHT, 24),
        "card_text_bold": ImageFont.truetype(FONT_CN_BOLD, 26),
        "stat_huge": ImageFont.truetype(FONT_EN, 80),
        "stat_label": ImageFont.truetype(FONT_CN_BOLD, 28),
        "footer": ImageFont.truetype(FONT_CN_BOLD, 28),
        "small": ImageFont.truetype(FONT_CN_LIGHT, 20),
        "code": ImageFont.truetype(FONT_EN, 32),
    }

def draw_base_card(poster, draw, fonts, page_num, cat_text, title_text, sub_text, accent_color=(0, 163, 255)):
    # 1. Gradient Background
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(6 * (1 - ratio) + 2 * ratio)
        g = int(17 * (1 - ratio) + 6 * ratio)
        b = int(36 * (1 - ratio) + 16 * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b, 255))

    # Glow layer at top
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([WIDTH//2 - 350, 60, WIDTH//2 + 350, 480], fill=(*accent_color, 40))
    glow_draw.ellipse([WIDTH//2 - 200, 100, WIDTH//2 + 200, 360], fill=(255, 210, 0, 25))
    glow = glow.filter(ImageFilter.GaussianBlur(70))
    poster.paste(glow, (0, 0), glow)
    draw = ImageDraw.Draw(poster)

    # 2. Top Navigation Bar: Page Indicator & App Identity
    page_badge = f"{page_num:02d} / 09"
    draw.rounded_rectangle([60, 50, 190, 95], radius=22, fill=(15, 28, 55, 230), outline=(255, 210, 0, 220), width=2)
    draw.text((85, 58), page_badge, font=fonts["tag"], fill=(255, 210, 0, 255))

    sys_tag = "🐜 AntTrail 食蚁兽学术操作系统"
    draw.text((WIDTH - 420, 58), sys_tag, font=fonts["tag"], fill=(160, 185, 225, 255))

    # 3. Category Pill
    draw.rounded_rectangle([60, 125, 60 + len(cat_text)*30 + 40, 175], radius=15, fill=(*accent_color, 40), outline=(*accent_color, 180), width=1)
    draw.text((80, 134), cat_text, font=fonts["tag"], fill=(*accent_color, 255))

    # 4. Main Title
    draw.text((60, 195), title_text, font=fonts["title"], fill=(255, 255, 255, 255))

    # 5. Subtitle
    draw.text((60, 280), sub_text, font=fonts["subtitle"], fill=(200, 215, 240, 255))

    # Decorative dividing line
    draw.line([(60, 335), (WIDTH - 60, 335)], fill=(255, 255, 255, 40), width=2)

    return draw

def draw_footer_cta(draw, fonts, text, bg_color=(0, 100, 164), border_color=(255, 210, 0)):
    y = 1300
    box = [60, y, WIDTH - 60, y + 85]
    draw.rounded_rectangle(box, radius=22, fill=(*bg_color, 240), outline=(*border_color, 255), width=2)
    bbox = draw.textbbox((0, 0), text, font=fonts["footer"])
    tw = bbox[2] - bbox[0]
    draw.text(((WIDTH - tw) // 2, y + 26), text, font=fonts["footer"], fill=(255, 255, 255, 255))

# --- SLIDE 1: COVER ---
def generate_p1(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 1, "🔥 全网首发 • UCI 食蚁兽神器", "UCI 选课抢课神器 AntTrail", "WebReg 战术雷达 • CC 转学秒算 • 零密码保存", accent_color=(255, 210, 0))

    # 3D Center Image
    img_path = "public/marketing/anttrail-instagram-promo.jpg"
    if os.path.exists(img_path):
        center_img = Image.open(img_path).convert("RGBA")
        card_w, card_h = 960, 520
        cw, ch = center_img.size
        cropped = center_img.crop((0, int(ch * 0.12), cw, int(ch * 0.70))).resize((card_w, card_h), Image.Resampling.LANCZOS)
        mask = Image.new("L", (card_w, card_h), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, card_w, card_h], radius=26, fill=255)
        card_x, card_y = (WIDTH - card_w) // 2, 360
        draw.rounded_rectangle([card_x - 3, card_y - 3, card_x + card_w + 3, card_y + card_h + 3], radius=28, outline=(0, 163, 255, 180), width=3)
        poster.paste(cropped, (card_x, card_y), mask)
        draw = ImageDraw.Draw(poster)

        # Status badge
        draw.rounded_rectangle([card_x + 24, card_y + 24, card_x + 360, card_y + 68], radius=16, fill=(10, 24, 48, 220), outline=(52, 211, 153, 220), width=2)
        f_badge = ImageFont.truetype(FONT_EN, 22)
        draw.text((card_x + 44, card_y + 34), "● WebReg Radar: ONLINE", font=f_badge, fill=(52, 211, 153, 255))

    # 4 Feature Pills (2x2)
    features = [
        ("⚡ ZotSniper 战术雷达", "出座毫秒级多端报警 • 进班概率演算法", (0, 100, 164)),
        ("🎓 CC 转学学分秒对齐", "IVC/OCC等加州8大CC先修课秒算导入", (22, 101, 52)),
        ("🧭 4年培养方案求解器", "教务处先修 AST 严谨排期 • 杜绝延毕", (126, 34, 206)),
        ("📅 Canvas DDL 智能看板", "作业重要性加权矩阵 • 成绩模拟器", (180, 83, 9)),
    ]
    grid_y = 910
    col_w = 460
    card_h = 95
    for i, (ft, fd, border_rgb) in enumerate(features):
        r, c = i // 2, i % 2
        fx = 60 + c * (col_w + 40)
        fy = grid_y + r * (card_h + 20)
        draw.rounded_rectangle([fx, fy, fx + col_w, fy + card_h], radius=20, fill=(16, 28, 54, 240), outline=(*border_rgb, 200), width=2)
        draw.text((fx + 20, fy + 16), ft, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((fx + 20, fy + 56), fd, font=fonts["card_desc"], fill=(160, 185, 220, 255))

    # Safety banner
    draw.rounded_rectangle([60, 1150, WIDTH - 60, 1240], radius=18, fill=(12, 24, 44, 255), outline=(255, 210, 0, 140), width=2)
    draw.text((95, 1180), "🛡️ 绝对安全背书：零 NetID 存储 • 零 Duo 破解 • 纯浏览器运行", font=fonts["tag"], fill=(255, 210, 0, 255))

    draw_footer_cta(draw, fonts, "👉 左右滑动查看 8 大核心功能图解 • Zot Zot Zot! 🐜")
    poster.convert("RGB").save(os.path.join(out_dir, "p1_cover.jpg"), quality=95)

# --- SLIDE 2: WEBREG SEAT RADAR ---
def generate_p2(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 2, "⚡ 核心功能 1", "ZotSniper WebReg 席位战术雷达", "公开 WebSoc 席位毫秒级巡检，多通道极限轰炸", accent_color=(0, 163, 255))

    # 3 Multi-channel Cards
    channels = [
        ("🔊 Web Audio 本地毫秒级警报", "浏览器直接合成 Anteater 高频警报音效，出座瞬间秒响，不依赖任何第三方服务。", (0, 163, 255)),
        ("🔔 桌面原生 Push 弹窗通知", "支持 Chrome / Safari 桌面推送，写作业或刷剧后台挂机也能瞬间弹出席位变更。", (52, 211, 153)),
        ("💬 私人 Discord Webhook 轰炸", "填入自己的频道 Webhook，手机 Discord 秒级同步收到包含 5 位代码的抢课私信！", (168, 85, 247))
    ]
    y_start = 370
    for title, desc, col in channels:
        draw.rounded_rectangle([60, y_start, WIDTH - 60, y_start + 140], radius=20, fill=(16, 28, 54, 240), outline=(*col, 180), width=2)
        draw.text((95, y_start + 24), title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((95, y_start + 75), desc, font=fonts["card_desc"], fill=(170, 195, 225, 255))
        y_start += 165

    # WebReg Fast-Action Sequence Box
    draw.rounded_rectangle([60, 890, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(255, 210, 0, 180), width=2)
    draw.text((95, 920), "🚀 选课窗口冲刺特权：5 位代码闪电复制与小书签", font=fonts["card_title"], fill=(255, 210, 0, 255))

    # Fast codes demo
    draw.rounded_rectangle([95, 980, WIDTH - 95, 1060], radius=15, fill=(6, 14, 28, 255), outline=(0, 163, 255, 140), width=1)
    draw.text((120, 1000), "已选备战代码: 34010 (ICS 46)   34025 (Lab)   44100 (MATH 3A)", font=fonts["code"], fill=(0, 163, 255, 255))

    draw.text((95, 1090), "• 1-Click Bookmarklet: 拖拽到书签栏，在官方 WebReg 窗口一点即可秒填表单！", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((95, 1135), "• 彻底告别选课高峰因手动逐个敲 5 位数字造成的延迟和选课冲突！", font=fonts["card_desc"], fill=(170, 195, 225, 255))
    draw.text((95, 1180), "• 100% 合规纯客户端操作，零自动化破解，完全符合 UCI 计算机条例！", font=fonts["card_desc"], fill=(52, 211, 153, 255))

    draw_footer_cta(draw, fonts, "下一页：Waitlist 排队到底能不能混进班？数学演算 →")
    poster.convert("RGB").save(os.path.join(out_dir, "p2_webreg.jpg"), quality=95)

# --- SLIDE 3: WAITLIST PROBABILITY ---
def generate_p3(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 3, "📊 核心功能 2", "Waitlist 进班概率数学模型", "告别盲目死等，科学推演到底能不能混进班", accent_color=(52, 211, 153))

    # Gauge Card
    draw.rounded_rectangle([60, 360, WIDTH - 60, 680], radius=24, fill=(12, 26, 50, 255), outline=(52, 211, 153, 220), width=3)
    draw.text((95, 395), "进班胜率测算仪表盘 (Waitlist Probability)", font=fonts["card_title"], fill=(255, 255, 255, 255))

    draw.text((95, 460), "87%", font=fonts["stat_huge"], fill=(52, 211, 153, 255))
    draw.rounded_rectangle([320, 480, 520, 530], radius=15, fill=(22, 101, 52, 200), outline=(52, 211, 153, 255), width=2)
    draw.text((345, 490), "HIGH 极大概率", font=fonts["card_text_bold"], fill=(255, 255, 255, 255))

    draw.text((95, 570), "💡 战术建议: 当前位次进班胜率极高，建议保持位置！", font=fonts["card_title"], fill=(255, 210, 0, 255))
    draw.text((95, 620), "若对应 Discussion 满员，建议立即预加载后备讨论班 5 位 Code 待命。", font=fonts["card_desc"], fill=(180, 205, 235, 255))

    # 4 Factor Cards
    factors = [
        ("大课总容量 (Capacity)", "250 人", "大班底数大，自然退课名额更多"),
        ("排队位次 (Position)", "第 4 位", "位于前 5% 黄金进班缓冲区"),
        ("院系历史退课率", "Math 14% / ICS 10%", "硬核 STEM 专业退课率显著更高"),
        ("时间窗口倍率", "Fee Drop 截止 (1.25x)", "学费清退日会有大批未缴费空位析出")
    ]
    y = 710
    col_w = 460
    h = 120
    for i, (title, stat, desc) in enumerate(factors):
        r, c = i // 2, i % 2
        fx = 60 + c * (col_w + 40)
        fy = y + r * (h + 20)
        draw.rounded_rectangle([fx, fy, fx + col_w, fy + h], radius=20, fill=(16, 28, 54, 240), outline=(0, 163, 255, 140), width=1)
        draw.text((fx + 20, fy + 16), title, font=fonts["card_desc"], fill=(170, 195, 225, 255))
        draw.text((fx + 20, fy + 48), stat, font=fonts["card_title"], fill=(255, 210, 0, 255))
        draw.text((fx + 20, fy + 86), desc, font=fonts["small"], fill=(130, 160, 200, 255))

    # Summary callout
    draw.rounded_rectangle([60, 1020, WIDTH - 60, 1250], radius=22, fill=(10, 22, 44, 255), outline=(255, 255, 255, 40), width=1)
    draw.text((95, 1050), "📌 为什么这个概率模型更值得信任？", font=fonts["card_title"], fill=(255, 255, 255, 255))
    draw.text((95, 1100), "• 拒绝 LLM 的瞎猜与玄学，完全基于 UCI 历史教务退选规律进行数学建模；", font=fonts["card_desc"], fill=(180, 205, 235, 255))
    draw.text((95, 1145), "• 实时感知 Week 1 / Week 2 / Fee Deadline 等关键时间节点的流动性衰减；", font=fonts["card_desc"], fill=(180, 205, 235, 255))
    draw.text((95, 1190), "• 帮你判断是该坚守阵地，还是果断换教授或改选备选课！", font=fonts["card_desc"], fill=(52, 211, 153, 255))

    draw_footer_cta(draw, fonts, "下一页：加州 CC 转学生如何秒算先修学分？→")
    poster.convert("RGB").save(os.path.join(out_dir, "p3_waitlist.jpg"), quality=95)

# --- SLIDE 4: TRANSFER ARTICULATION ---
def generate_p4(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 4, "🎓 核心功能 3", "加州 CC 转学学分秒算工作台", "告别翻断手的 ASSIST.org，加州 8 大 CC 课程秒匹配", accent_color=(255, 210, 0))

    # 8 CC Pills
    draw.rounded_rectangle([60, 360, WIDTH - 60, 480], radius=22, fill=(12, 26, 50, 255), outline=(255, 210, 0, 160), width=2)
    draw.text((90, 385), "🏫 预置加州 8 所核心社区大学课程库：", font=fonts["card_title"], fill=(255, 210, 0, 255))
    cc_list = "IVC • OCC • De Anza • SMC • Mt. SAC • Foothill • DVC • PCC"
    draw.text((90, 430), cc_list, font=fonts["subtitle"], fill=(255, 255, 255, 255))

    # Unit conversion gauge
    draw.rounded_rectangle([60, 505, WIDTH - 60, 665], radius=22, fill=(16, 28, 54, 255), outline=(0, 163, 255, 160), width=2)
    draw.text((90, 530), "可转学分自动折算 (Semester → Quarter 1.5x)", font=fonts["card_title"], fill=(0, 163, 255, 255))

    # Progress bar
    draw.rounded_rectangle([90, 580, WIDTH - 90, 620], radius=12, fill=(8, 16, 32, 255), outline=(255, 255, 255, 40), width=1)
    draw.rounded_rectangle([90, 580, int(90 + (WIDTH - 180) * 0.95), 620], radius=12, fill=(52, 211, 153, 255))
    draw.text((90, 630), "已修 58 / 60 Semester Units (折合 87 / 90 Quarter Units • 进度 97%)", font=fonts["card_desc"], fill=(180, 205, 235, 255))

    # Mappings list
    draw.rounded_rectangle([60, 690, WIDTH - 60, 1140], radius=22, fill=(10, 22, 44, 255), outline=(52, 211, 153, 140), width=1)
    draw.text((90, 715), "🎯 课程先修关系秒级自动匹配对齐：", font=fonts["card_title"], fill=(255, 255, 255, 255))

    maps = [
        ("MATH 3A (IVC) 微积分 I", "UCI MATH 2A (Calculus I)", "4.0 Units • 已通过 (A)"),
        ("MATH 3B (IVC) 微积分 II", "UCI MATH 2B (Calculus II)", "4.0 Units • 已通过 (A-)"),
        ("CS 36 (IVC) C++ 编程基础", "UCI I&C SCI 31 (Intro to Prog)", "3.0 Units • 已通过 (A)"),
        ("CS 37 (IVC) 数据结构与算法", "UCI I&C SCI 45C (Data Structures)", "3.0 Units • 规划中 (IP)")
    ]
    my = 770
    for origin, uci, meta in maps:
        draw.rounded_rectangle([90, my, WIDTH - 90, my + 75], radius=14, fill=(16, 28, 54, 240), outline=(0, 163, 255, 100), width=1)
        draw.text((110, my + 14), origin, font=fonts["card_desc"], fill=(255, 255, 255, 255))
        draw.text((540, my + 14), "➔ " + uci, font=fonts["card_desc"], fill=(52, 211, 153, 255))
        draw.text((110, my + 44), meta, font=fonts["small"], fill=(150, 175, 210, 255))
        my += 90

    # Bridge Button Card
    draw.rounded_rectangle([60, 1165, WIDTH - 60, 1255], radius=20, fill=(0, 100, 164, 230), outline=(255, 210, 0, 220), width=2)
    draw.text((95, 1195), "✨ 一键导入培养方案：自动桥接合并到 4 年排课引擎，免手动重复录入！", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "下一页：4 年选课排期与先修课 AST 严格求解器 →")
    poster.convert("RGB").save(os.path.join(out_dir, "p4_transfer.jpg"), quality=95)

# --- SLIDE 5: DEGREE PLANNER AST ---
def generate_p5(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 5, "🧭 核心功能 4", "4 年培养方案严格求解器", "官方先修课 AST 逻辑校验，杜绝选错课延毕", accent_color=(168, 85, 247))

    # Grid preview box
    draw.rounded_rectangle([60, 360, WIDTH - 60, 780], radius=24, fill=(12, 24, 48, 255), outline=(168, 85, 247, 200), width=2)
    draw.text((90, 395), "📅 4 学年多学期可视化拖拽计划表", font=fonts["card_title"], fill=(255, 255, 255, 255))

    terms = [
        ("Fall 2026", ["ICS 31", "MATH 2A", "WRITING 39B", "GE IV"]),
        ("Winter 2027", ["ICS 32", "MATH 2B", "ICS 6B", "GE III"]),
        ("Spring 2027", ["ICS 33", "ICS 6D", "STATS 67", "GE VII"])
    ]
    ty = 460
    for term_name, courses in terms:
        draw.rounded_rectangle([90, ty, WIDTH - 90, ty + 90], radius=16, fill=(18, 30, 58, 240), outline=(0, 163, 255, 120), width=1)
        draw.text((110, ty + 15), term_name, font=fonts["card_title"], fill=(255, 210, 0, 255))
        cx = 320
        for c in courses:
            draw.rounded_rectangle([cx, ty + 18, cx + 130, ty + 68], radius=10, fill=(6, 14, 28, 255), outline=(52, 211, 153, 180), width=1)
            draw.text((cx + 14, ty + 28), c, font=fonts["code"], fill=(255, 255, 255, 255))
            cx += 150
        ty += 105

    # AST validation rules box
    draw.rounded_rectangle([60, 810, WIDTH - 60, 1250], radius=24, fill=(10, 20, 40, 255), outline=(255, 255, 255, 40), width=1)
    draw.text((90, 840), "🔒 确定性抽象语法树 (Deterministic AST) 规则约束：", font=fonts["card_title"], fill=(255, 210, 0, 255))

    rules = [
        ("• 严格先修链路校验", "如 ICS 46 必须同时完成 ICS 33 + MATH 2B，若前序学期未选直接标红报警！"),
        ("• 年级学分限制拦截", "检测 Upper-Division 高阶课程的大三 Standing 学分门槛（90+ Units）。"),
        ("• 开课季度冲突预警", "部分专业课仅在特定学期开设（如只在 Spring 开设），跨学期排期自动纠错。"),
        ("• 零大模型幻觉", "规避 ChatGPT 经常算错先修与误报课号的问题，所有逻辑 100% 规则化验证。")
    ]
    ry = 900
    for r_title, r_desc in rules:
        draw.text((90, ry), r_title, font=fonts["card_title"], fill=(0, 163, 255, 255))
        draw.text((90, ry + 40), r_desc, font=fonts["card_desc"], fill=(180, 205, 235, 255))
        ry += 85

    draw_footer_cta(draw, fonts, "下一页：UCI 官方 GPA 政策与重修覆盖计算 →")
    poster.convert("RGB").save(os.path.join(out_dir, "p5_planner.jpg"), quality=95)

# --- SLIDE 6: GPA ENGINE ---
def generate_p6(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 6, "🎯 核心功能 5", "UCI 官方 GPA 计算与推演", "严格遵循 Academic Senate A340 / A345 规程", accent_color=(255, 210, 0))

    # 3 Policy Cards
    policies = [
        ("📜 16-Unit Repeat Policy (A345 重修规程)", "前 16 个重修学分直接替换旧低分成绩（C- 或更低），旧成绩不计入累计 GPA，瞬间拉升积点！", (255, 210, 0)),
        ("🚫 Transfer GPA Exclusion (转学学分排除)", "严格执行加州大学规程：CC 转学分仅增加学分总量，绝对不稀释也不计入 UCI GPA 分母！", (0, 163, 255)),
        ("🎖️ Dean's Honor List (院长荣誉榜资格)", "自动检测单学期修满 12 个 Graded 学分且 GPA ≥ 3.50（无 F/NP），秒级生成荣誉徽章！", (52, 211, 153))
    ]
    py = 370
    for p_title, p_desc, p_col in policies:
        draw.rounded_rectangle([60, py, WIDTH - 60, py + 140], radius=20, fill=(16, 28, 54, 240), outline=(*p_col, 180), width=2)
        draw.text((90, py + 24), p_title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((90, py + 75), p_desc, font=fonts["card_desc"], fill=(175, 200, 230, 255))
        py += 165

    # Target GPA Solver Box
    draw.rounded_rectangle([60, 890, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(52, 211, 153, 200), width=2)
    draw.text((90, 920), "🧮 Target GPA 目标绩点逆向求解器", font=fonts["card_title"], fill=(52, 211, 153, 255))

    draw.text((90, 980), "当前 Cumulative GPA: 3.42 (已修 48 学分)", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((90, 1025), "期望 Graduation GPA: 3.70 (大四毕业荣誉目标)", font=fonts["card_desc"], fill=(255, 210, 0, 255))

    draw.rounded_rectangle([90, 1080, WIDTH - 90, 1190], radius=16, fill=(18, 34, 64, 255), outline=(0, 163, 255, 160), width=1)
    draw.text((115, 1105), "⚡ 智能逆向推演结论：", font=fonts["card_title"], fill=(0, 163, 255, 255))
    draw.text((115, 1145), "未来 6 个 Quarter 平均每门课需达到 3.82 (即每季保持 3 个 A 与 1 个 A-)。", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "下一页：Canvas DDL 战术看板与成绩模拟器 →")
    poster.convert("RGB").save(os.path.join(out_dir, "p6_gpa.jpg"), quality=95)

# --- SLIDE 7: CANVAS TACTICAL DASHBOARD ---
def generate_p7(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 7, "📅 核心功能 6", "Canvas DDL 战术看板", "艾森豪威尔紧急重要加权，期末成绩 What-If 模拟", accent_color=(244, 63, 94))

    # Priority Task Cards
    tasks = [
        ("🔴 [DO FIRST] ICS 46 Project 1 (Weight 15%)", "截止倒计时: 18 小时 • 分值权重极高，优先排期攻坚", (244, 63, 94)),
        ("🟡 [SCHEDULE] MATH 3A Quiz 3 (Weight 5%)", "截止倒计时: 2 天 • 建议今晚复习 Chapter 4 线性变换", (255, 210, 0)),
        ("🟢 [IN PROGRESS] WRITING 60 Draft 1 (Weight 10%)", "截止倒计时: 5 天 • 已进入大纲撰写阶段", (52, 211, 153))
    ]
    ty = 370
    for t_title, t_desc, t_col in tasks:
        draw.rounded_rectangle([60, ty, WIDTH - 60, ty + 125], radius=20, fill=(16, 28, 54, 240), outline=(*t_col, 180), width=2)
        draw.text((90, ty + 22), t_title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((90, ty + 72), t_desc, font=fonts["card_desc"], fill=(175, 200, 230, 255))
        ty += 145

    # What-If Final Grade Simulator
    draw.rounded_rectangle([60, 835, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(0, 163, 255, 180), width=2)
    draw.text((90, 865), "🎯 期末成绩 What-If 模拟计算器", font=fonts["card_title"], fill=(0, 163, 255, 255))

    draw.text((90, 920), "• 期中 Midterm (25%): 84% (B)", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((90, 965), "• 平时作业 Homework (35%): 96% (A)", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((90, 1010), "• 期末 Final Exam (40%): [动态滑块测算]", font=fonts["card_desc"], fill=(255, 210, 0, 255))

    draw.rounded_rectangle([90, 1070, WIDTH - 90, 1200], radius=16, fill=(18, 34, 64, 255), outline=(52, 211, 153, 160), width=1)
    draw.text((115, 1095), "✨ 模拟推演结果：", font=fonts["card_title"], fill=(52, 211, 153, 255))
    draw.text((115, 1140), "期末只需考到 88% 即可总评锁定 A-；考到 93% 即可冲刺总评 A！", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "下一页：食蚁兽高分水课榜单与校历避坑指南 →")
    poster.convert("RGB").save(os.path.join(out_dir, "p7_canvas.jpg"), quality=95)

# --- SLIDE 8: CAMPUS SURVIVAL & WATER COURSES ---
def generate_p8(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 8, "💡 核心功能 7", "食蚁兽生存指南 & 水课库", "历届学长学姐真实评测，ZotAccount 财务避坑", accent_color=(255, 210, 0))

    # Water courses box
    draw.rounded_rectangle([60, 360, WIDTH - 60, 800], radius=24, fill=(12, 24, 48, 255), outline=(255, 210, 0, 180), width=2)
    draw.text((90, 395), "🌟 历届高分“神仙水课”精选清单 (GE Boosters)", font=fonts["card_title"], fill=(255, 210, 0, 255))

    courses = [
        ("DRAMA 10 (戏剧与舞台艺术)", "推荐度: ★★★★★ • 平均 GPA 3.85 • 期中无大考，作业轻松"),
        ("EARTHSS 3 (海洋学与地球科学)", "推荐度: ★★★★★ • 平均 GPA 3.90 • 满足 GE II 理工通识，给分极甜"),
        ("UNI STU 1 (新生学业发展研讨)", "推荐度: ★★★★★ • 1-Unit P/NP • 快速熟悉教授科研与校园资源"),
        ("DANCE 3 (舞蹈历史与鉴赏)", "推荐度: ★★★★☆ • 满足 GE IV 艺术人文 • 适合水学分拉高均分")
    ]
    cy = 460
    for c_title, c_desc in courses:
        draw.rounded_rectangle([90, cy, WIDTH - 90, cy + 70], radius=14, fill=(18, 32, 60, 240), outline=(0, 163, 255, 100), width=1)
        draw.text((110, cy + 12), c_title, font=fonts["card_desc"], fill=(255, 255, 255, 255))
        draw.text((110, cy + 40), c_desc, font=fonts["small"], fill=(170, 195, 225, 255))
        cy += 80

    # Survival guides box
    draw.rounded_rectangle([60, 830, WIDTH - 60, 1250], radius=24, fill=(10, 20, 42, 255), outline=(52, 211, 153, 160), width=1)
    draw.text((90, 860), "📑 食蚁兽必看校历与财务避坑指引：", font=fonts["card_title"], fill=(52, 211, 153, 255))

    guides = [
        ("💰 ZotAccount 缴费与 Holds 解除", "每学期学费缴纳最后节点，逾期直接掉课！教你如何快速解除 Registration Hold。"),
        ("📝 Week 2 Drop Deadline 无痕退课", "学期第 2 周周五 5:00 PM 前退课成绩单无痕记录，全额退费最后期限。"),
        ("📅 官方校历 DDL 一键导出到日历", "一键生成带有 10 分钟闹钟的 .ics 选课日历文件，导入 Apple / Google Calendar。")
    ]
    gy = 920
    for g_title, g_desc in guides:
        draw.text((90, gy), g_title, font=fonts["card_title"], fill=(0, 163, 255, 255))
        draw.text((90, gy + 40), g_desc, font=fonts["card_desc"], fill=(180, 205, 235, 255))
        gy += 95

    draw_footer_cta(draw, fonts, "下一页：100% 开源安全承诺与体验入口 →")
    poster.convert("RGB").save(os.path.join(out_dir, "p8_guides.jpg"), quality=95)

# --- SLIDE 9: CTA & PRIVACY GUARANTEE ---
def generate_p9(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 9, "🛡️ 体验入口 & 安全背书", "100% 开源免费 • 零服务器留存", "学生独立开发，零爬取 NetID，永无封号风险", accent_color=(52, 211, 153))

    # 3 Security Pillars
    securities = [
        ("❌ 绝不收集 UCINetID 与密码", "纯前端浏览器本地执行，无任何中间服务器偷存凭据，杜绝黑客撞库泄露风险！", (244, 63, 94)),
        ("❌ 零 Duo 2FA 越权破解", "严守 UCI 计算机网络规范与 OAISC 学术诚信条例，绝对不搞黑客撞库与挂机脚本！", (255, 210, 0)),
        ("✅ 本地 IndexedDB 高容量保险库", "数据全部保存在你自己的电脑浏览器里，支持数年培养方案与海量成绩单历史！", (52, 211, 153))
    ]
    sy = 370
    for s_title, s_desc, s_col in securities:
        draw.rounded_rectangle([60, sy, WIDTH - 60, sy + 140], radius=20, fill=(16, 28, 54, 240), outline=(*s_col, 180), width=2)
        draw.text((90, sy + 24), s_title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((90, sy + 75), s_desc, font=fonts["card_desc"], fill=(175, 200, 230, 255))
        sy += 165

    # Hub Info Box
    draw.rounded_rectangle([60, 890, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(0, 163, 255, 200), width=2)
    draw.text((90, 925), "🌐 如何开始使用 AntTrail？", font=fonts["card_title"], fill=(0, 163, 255, 255))

    draw.rounded_rectangle([90, 985, WIDTH - 90, 1070], radius=16, fill=(18, 34, 64, 255), outline=(255, 210, 0, 160), width=1)
    draw.text((115, 1005), "🔗 在线体验主页: anttrail.vercel.app", font=fonts["card_title"], fill=(255, 210, 0, 255))
    draw.text((115, 1040), "免安装任何插件，手机与电脑浏览器即开即用！", font=fonts["small"], fill=(180, 205, 235, 255))

    draw.rounded_rectangle([90, 1090, WIDTH - 90, 1175], radius=16, fill=(18, 34, 64, 255), outline=(52, 211, 153, 160), width=1)
    draw.text((115, 1110), "🌟 GitHub 完整开源: rchau8502/AntTrail", font=fonts["card_title"], fill=(52, 211, 153, 255))
    draw.text((115, 1145), "代码 100% 审计透明，欢迎食蚁兽工程师 Star & PR！", font=fonts["small"], fill=(180, 205, 235, 255))

    draw.text((90, 1205), "❤️ 收藏本篇并转发给你在 UCI 的好友与室友，祝大家选课全绿！", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "Zot Zot Zot! 祝全体食蚁兽每门课都拿 A+! 🐜🍴", bg_color=(22, 101, 52), border_color=(52, 211, 153))
    poster.convert("RGB").save(os.path.join(out_dir, "p9_cta.jpg"), quality=95)

def main():
    out_dir = "public/marketing/9grid"
    os.makedirs(out_dir, exist_ok=True)
    fonts = get_fonts()

    print("Generating Slide 1: Cover...")
    generate_p1(out_dir, fonts)
    print("Generating Slide 2: WebReg Radar...")
    generate_p2(out_dir, fonts)
    print("Generating Slide 3: Waitlist Probability...")
    generate_p3(out_dir, fonts)
    print("Generating Slide 4: Transfer Articulation...")
    generate_p4(out_dir, fonts)
    print("Generating Slide 5: Degree Planner AST...")
    generate_p5(out_dir, fonts)
    print("Generating Slide 6: GPA Engine...")
    generate_p6(out_dir, fonts)
    print("Generating Slide 7: Canvas Dashboard...")
    generate_p7(out_dir, fonts)
    print("Generating Slide 8: Campus Guides & Water Courses...")
    generate_p8(out_dir, fonts)
    print("Generating Slide 9: CTA & Security...")
    generate_p9(out_dir, fonts)

    print(f"Successfully generated all 9 posters in {out_dir}/!")

if __name__ == "__main__":
    main()
