import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1080, 1440

FONT_BOLD = "/System/Library/Fonts/Helvetica.ttc"
FONT_LIGHT = "/System/Library/Fonts/Helvetica.ttc"
FONT_CODE = "/System/Library/Fonts/Menlo.ttc"

def get_fonts():
    return {
        "tag": ImageFont.truetype(FONT_BOLD, 22),
        "title": ImageFont.truetype(FONT_BOLD, 54),
        "subtitle": ImageFont.truetype(FONT_LIGHT, 26),
        "card_title": ImageFont.truetype(FONT_BOLD, 28),
        "card_desc": ImageFont.truetype(FONT_LIGHT, 22),
        "card_text_bold": ImageFont.truetype(FONT_BOLD, 24),
        "stat_huge": ImageFont.truetype(FONT_BOLD, 76),
        "stat_label": ImageFont.truetype(FONT_BOLD, 26),
        "footer": ImageFont.truetype(FONT_BOLD, 26),
        "small": ImageFont.truetype(FONT_LIGHT, 19),
        "code": ImageFont.truetype(FONT_CODE, 24),
        "code_large": ImageFont.truetype(FONT_CODE, 28),
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
    draw.text((85, 60), page_badge, font=fonts["tag"], fill=(255, 210, 0, 255))

    sys_tag = "🐜 AntTrail • Academic OS for UC Irvine"
    draw.text((WIDTH - 490, 60), sys_tag, font=fonts["tag"], fill=(160, 185, 225, 255))

    # 3. Category Pill
    draw.rounded_rectangle([60, 125, 60 + len(cat_text)*14 + 40, 175], radius=15, fill=(*accent_color, 40), outline=(*accent_color, 180), width=1)
    draw.text((80, 137), cat_text, font=fonts["tag"], fill=(*accent_color, 255))

    # 4. Main Title
    draw.text((60, 195), title_text, font=fonts["title"], fill=(255, 255, 255, 255))

    # 5. Subtitle
    draw.text((60, 275), sub_text, font=fonts["subtitle"], fill=(200, 215, 240, 255))

    # Decorative dividing line
    draw.line([(60, 330), (WIDTH - 60, 330)], fill=(255, 255, 255, 40), width=2)

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
    draw = draw_base_card(poster, draw, fonts, 1, "⚡ OFFICIAL LAUNCH • 100% FREE & OPEN-SOURCE", "The Academic OS UCI Deserves", "WebReg Seat Radar • CC Articulation • Zero Password Storage", accent_color=(255, 210, 0))

    # 3D Center Image
    img_path = "public/marketing/anttrail-instagram-promo.jpg"
    if os.path.exists(img_path):
        center_img = Image.open(img_path).convert("RGBA")
        card_w, card_h = 960, 520
        cw, ch = center_img.size
        cropped = center_img.crop((0, int(ch * 0.12), cw, int(ch * 0.70))).resize((card_w, card_h), Image.Resampling.LANCZOS)
        mask = Image.new("L", (card_w, card_h), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, card_w, card_h], radius=26, fill=255)
        card_x, card_y = (WIDTH - card_w) // 2, 355
        draw.rounded_rectangle([card_x - 3, card_y - 3, card_x + card_w + 3, card_y + card_h + 3], radius=28, outline=(0, 163, 255, 180), width=3)
        poster.paste(cropped, (card_x, card_y), mask)
        draw = ImageDraw.Draw(poster)

        # Status badge
        draw.rounded_rectangle([card_x + 24, card_y + 24, card_x + 360, card_y + 68], radius=16, fill=(10, 24, 48, 220), outline=(52, 211, 153, 220), width=2)
        draw.text((card_x + 44, card_y + 36), "● WebReg Radar: ONLINE", font=fonts["tag"], fill=(52, 211, 153, 255))

    # 4 Feature Pills (2x2)
    features = [
        ("⚡ ZotSniper Radar", "Sub-second seat alerts • Waitlist odds", (0, 100, 164)),
        ("🎓 CC Articulation", "Instant credit evaluation for 8 CA CCs", (22, 101, 52)),
        ("🧭 4-Year Planner", "Deterministic prerequisite AST validation", (126, 34, 206)),
        ("📅 Canvas Task Matrix", "Eisenhower urgency queue • Grade sim", (180, 83, 9)),
    ]
    grid_y = 905
    col_w = 460
    card_h = 95
    for i, (ft, fd, border_rgb) in enumerate(features):
        r, c = i // 2, i % 2
        fx = 60 + c * (col_w + 40)
        fy = grid_y + r * (card_h + 20)
        draw.rounded_rectangle([fx, fy, fx + col_w, fy + card_h], radius=20, fill=(16, 28, 54, 240), outline=(*border_rgb, 200), width=2)
        draw.text((fx + 20, fy + 16), ft, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((fx + 20, fy + 54), fd, font=fonts["card_desc"], fill=(160, 185, 220, 255))

    # Safety banner
    draw.rounded_rectangle([60, 1145, WIDTH - 60, 1235], radius=18, fill=(12, 24, 44, 255), outline=(255, 210, 0, 140), width=2)
    draw.text((85, 1175), "🛡️ 100% Privacy-First: Zero NetID Storage • Zero Credential Scraping • Client-Side Only", font=fonts["card_text_bold"], fill=(255, 210, 0, 255))

    draw_footer_cta(draw, fonts, "👉 Swipe left to explore all 8 tactical modules • Zot Zot Zot! 🐜")
    poster.convert("RGB").save(os.path.join(out_dir, "p1_cover.jpg"), quality=95)

# --- SLIDE 2: WEBREG SEAT RADAR ---
def generate_p2(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 2, "⚡ CORE MODULE 1: ENROLLMENT RADAR", "ZotSniper WebReg Drop Radar", "Real-time seat monitoring with instant multi-channel alert routing", accent_color=(0, 163, 255))

    channels = [
        ("🔊 Local Web Audio Chime (Millisecond)", "Synthesizes an audible Anteater frequency chime in your browser the instant a seat opens.", (0, 163, 255)),
        ("🔔 Native Desktop Push Notifications", "Chrome / Safari OS-level alerts let you monitor classes in the background while studying.", (52, 211, 153)),
        ("💬 Private Discord Webhook Alerts", "Connect your private Discord server to receive push notifications with 5-digit course codes.", (168, 85, 247))
    ]
    y_start = 365
    for title, desc, col in channels:
        draw.rounded_rectangle([60, y_start, WIDTH - 60, y_start + 140], radius=20, fill=(16, 28, 54, 240), outline=(*col, 180), width=2)
        draw.text((95, y_start + 24), title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((95, y_start + 72), desc, font=fonts["card_desc"], fill=(170, 195, 225, 255))
        y_start += 165

    # Fast Action Box
    draw.rounded_rectangle([60, 885, WIDTH - 60, 1245], radius=24, fill=(10, 22, 44, 255), outline=(255, 210, 0, 180), width=2)
    draw.text((95, 915), "🚀 1-Click WebReg Bookmarklet & Fast Copy", font=fonts["card_title"], fill=(255, 210, 0, 255))

    draw.rounded_rectangle([95, 970, WIDTH - 95, 1050], radius=15, fill=(6, 14, 28, 255), outline=(0, 163, 255, 140), width=1)
    draw.text((120, 995), "Preloaded Sequence: 34010 (ICS 46)   34025 (Lab)   44100 (MATH 3A)", font=fonts["code"], fill=(0, 163, 255, 255))

    draw.text((95, 1075), "• 1-Click Bookmarklet: Drag to browser bar, click on WebReg to populate all codes in 1s.", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((95, 1120), "• Eliminate typing lag and session timeouts during peak 7:00 AM enrollment windows.", font=fonts["card_desc"], fill=(170, 195, 225, 255))
    draw.text((95, 1165), "• 100% compliant client-side script. Zero automated botting or scraping.", font=fonts["card_desc"], fill=(52, 211, 153, 255))

    draw_footer_cta(draw, fonts, "Next: What are your real odds of getting off the waitlist? →")
    poster.convert("RGB").save(os.path.join(out_dir, "p2_webreg.jpg"), quality=95)

# --- SLIDE 3: WAITLIST PROBABILITY ---
def generate_p3(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 3, "📊 CORE MODULE 2: WAITLIST ODDS", "Waitlist Probability Prediction Model", "Mathematical modeling based on historical UCI registrar drop curves", accent_color=(52, 211, 153))

    # Gauge Card
    draw.rounded_rectangle([60, 360, WIDTH - 60, 680], radius=24, fill=(12, 26, 50, 255), outline=(52, 211, 153, 220), width=3)
    draw.text((95, 395), "Waitlist Admission Probability Gauge", font=fonts["card_title"], fill=(255, 255, 255, 255))

    draw.text((95, 455), "87%", font=fonts["stat_huge"], fill=(52, 211, 153, 255))
    draw.rounded_rectangle([300, 475, 540, 525], radius=15, fill=(22, 101, 52, 200), outline=(52, 211, 153, 255), width=2)
    draw.text((320, 487), "HIGH PROBABILITY", font=fonts["card_text_bold"], fill=(255, 255, 255, 255))

    draw.text((95, 565), "💡 Tactical Advice: High likelihood of admission. Maintain position!", font=fonts["card_title"], fill=(255, 210, 0, 255))
    draw.text((95, 615), "If discussion section is locked, pre-load secondary discussion codes immediately.", font=fonts["card_desc"], fill=(180, 205, 235, 255))

    # 4 Factor Cards
    factors = [
        ("Course Capacity", "250 Seats", "Large lecture size yields higher natural drops"),
        ("Waitlist Position", "Position #4", "Well within top 5% golden admission window"),
        ("Dept Historical Drop Rate", "Math 14% / ICS 10%", "Rigorous STEM courses experience higher churn"),
        ("Time Window Multiplier", "Fee Drop Window (1.25x)", "Tuition deadline triggers a massive vacancy wave")
    ]
    y = 705
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
    draw.rounded_rectangle([60, 1015, WIDTH - 60, 1245], radius=22, fill=(10, 22, 44, 255), outline=(255, 255, 255, 40), width=1)
    draw.text((95, 1045), "📌 Why Anteaters Trust This Probability Model:", font=fonts["card_title"], fill=(255, 255, 255, 255))
    draw.text((95, 1090), "• Built on empirical registration patterns rather than generic guesswork;", font=fonts["card_desc"], fill=(180, 205, 235, 255))
    draw.text((95, 1135), "• Real-time sensitivity to Week 1, Week 2, and Fee Drop liquidity decay;", font=fonts["card_desc"], fill=(180, 205, 235, 255))
    draw.text((95, 1180), "• Informs strategic choices: hold your slot or pivot to an alternate section.", font=fonts["card_desc"], fill=(52, 211, 153, 255))

    draw_footer_cta(draw, fonts, "Next: Instant California CC transfer credit evaluation →")
    poster.convert("RGB").save(os.path.join(out_dir, "p3_waitlist.jpg"), quality=95)

# --- SLIDE 4: TRANSFER ARTICULATION ---
def generate_p4(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 4, "🎓 CORE MODULE 3: CC ARTICULATION", "ScholarStack: Transfer Credit Tray", "Direct articulation mapping for 8 California Community Colleges", accent_color=(255, 210, 0))

    # CC Pills
    draw.rounded_rectangle([60, 360, WIDTH - 60, 480], radius=22, fill=(12, 26, 50, 255), outline=(255, 210, 0, 160), width=2)
    draw.text((90, 385), "🏫 Pre-loaded with 8 Top California Community Colleges:", font=fonts["card_title"], fill=(255, 210, 0, 255))
    cc_list = "IVC • OCC • De Anza • SMC • Mt. SAC • Foothill • DVC • PCC"
    draw.text((90, 430), cc_list, font=fonts["subtitle"], fill=(255, 255, 255, 255))

    # Unit conversion gauge
    draw.rounded_rectangle([60, 505, WIDTH - 60, 665], radius=22, fill=(16, 28, 54, 255), outline=(0, 163, 255, 160), width=2)
    draw.text((90, 530), "Automatic Unit Conversion (Semester → Quarter 1.5x)", font=fonts["card_title"], fill=(0, 163, 255, 255))

    # Progress bar
    draw.rounded_rectangle([90, 580, WIDTH - 90, 620], radius=12, fill=(8, 16, 32, 255), outline=(255, 255, 255, 40), width=1)
    draw.rounded_rectangle([90, 580, int(90 + (WIDTH - 180) * 0.95), 620], radius=12, fill=(52, 211, 153, 255))
    draw.text((90, 630), "Completed: 58 / 60 Semester Units (equals 87 / 90 Quarter Units • 97% Progress)", font=fonts["card_desc"], fill=(180, 205, 235, 255))

    # Mappings list
    draw.rounded_rectangle([60, 690, WIDTH - 60, 1140], radius=22, fill=(10, 22, 44, 255), outline=(52, 211, 153, 140), width=1)
    draw.text((90, 715), "🎯 Instant Course-to-Course Prerequisite Articulation:", font=fonts["card_title"], fill=(255, 255, 255, 255))

    maps = [
        ("MATH 3A (IVC) Calculus I", "UCI MATH 2A (Calculus I)", "4.0 Units • Completed (Grade: A)"),
        ("MATH 3B (IVC) Calculus II", "UCI MATH 2B (Calculus II)", "4.0 Units • Completed (Grade: A-)"),
        ("CS 36 (IVC) C++ Programming", "UCI I&C SCI 31 (Intro to Prog)", "3.0 Units • Completed (Grade: A)"),
        ("CS 37 (IVC) Data Structures", "UCI I&C SCI 45C (Data Struct)", "3.0 Units • Planned (In Progress)")
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
    draw.text((95, 1195), "✨ 1-Click Import: Bridges transferred credits directly into the 4-year degree planner!", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "Next: 4-Year Schedule Engine & AST Prerequisite Solver →")
    poster.convert("RGB").save(os.path.join(out_dir, "p4_transfer.jpg"), quality=95)

# --- SLIDE 5: DEGREE PLANNER AST ---
def generate_p5(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 5, "🧭 CORE MODULE 4: DEGREE ENGINE", "4-Year Schedule & Prerequisite Engine", "Deterministic boolean AST validator prevents missing prerequisites", accent_color=(168, 85, 247))

    # Grid preview box
    draw.rounded_rectangle([60, 360, WIDTH - 60, 780], radius=24, fill=(12, 24, 48, 255), outline=(168, 85, 247, 200), width=2)
    draw.text((90, 395), "📅 Interactive Multi-Quarter Visual Roadmap", font=fonts["card_title"], fill=(255, 255, 255, 255))

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
    draw.text((90, 840), "🔒 Deterministic Abstract Syntax Tree (AST) Validation:", font=fonts["card_title"], fill=(255, 210, 0, 255))

    rules = [
        ("• Prerequisite Chain Validation", "e.g., ICS 46 requires (ICS 33 AND MATH 2B). Flags red if unfulfilled."),
        ("• Class Standing & Unit Gating", "Detects Upper-Division standing requirements (90+ completed units)."),
        ("• Term-Offering Anomaly Check", "Flags courses offered strictly in specific quarters (e.g. Spring only)."),
        ("• Zero LLM Hallucinations", "Avoids AI prerequisite mistakes. All rules run on 100% verified UCI logic.")
    ]
    ry = 900
    for r_title, r_desc in rules:
        draw.text((90, ry), r_title, font=fonts["card_title"], fill=(0, 163, 255, 255))
        draw.text((90, ry + 40), r_desc, font=fonts["card_desc"], fill=(180, 205, 235, 255))
        ry += 85

    draw_footer_cta(draw, fonts, "Next: UCI official repeat policies & target GPA reverse solver →")
    poster.convert("RGB").save(os.path.join(out_dir, "p5_planner.jpg"), quality=95)

# --- SLIDE 6: GPA ENGINE ---
def generate_p6(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 6, "🎯 CORE MODULE 5: GPA CALCULUS", "Official UCI GPA Engine & Simulator", "Strict compliance with Academic Senate Regulations A340 & A345", accent_color=(255, 210, 0))

    policies = [
        ("📜 16-Unit Repeat Policy (Senate A345)", "First 16 repeated units replace original grades (C- or below) in cumulative GPA calculation.", (255, 210, 0)),
        ("🚫 Transfer GPA Exclusion", "Adheres to UC policy: CC transfer credits add to unit totals but never dilute UCI GPA.", (0, 163, 255)),
        ("🎖️ Dean's Honor List Verification", "Automatically checks 12+ graded units with GPA >= 3.50 (no F/NP) to unlock honor status.", (52, 211, 153))
    ]
    py = 370
    for p_title, p_desc, p_col in policies:
        draw.rounded_rectangle([60, py, WIDTH - 60, py + 140], radius=20, fill=(16, 28, 54, 240), outline=(*p_col, 180), width=2)
        draw.text((90, py + 24), p_title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((90, py + 72), p_desc, font=fonts["card_desc"], fill=(175, 200, 230, 255))
        py += 165

    # Target GPA Solver Box
    draw.rounded_rectangle([60, 890, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(52, 211, 153, 200), width=2)
    draw.text((90, 920), "🧮 Target GPA Reverse Solver", font=fonts["card_title"], fill=(52, 211, 153, 255))

    draw.text((90, 980), "Current Cumulative GPA: 3.42 (48 units completed)", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((90, 1025), "Desired Graduation GPA: 3.70 (Magna Cum Laude Target)", font=fonts["card_desc"], fill=(255, 210, 0, 255))

    draw.rounded_rectangle([90, 1080, WIDTH - 90, 1190], radius=16, fill=(18, 34, 64, 255), outline=(0, 163, 255, 160), width=1)
    draw.text((115, 1105), "⚡ Solver Recommendation:", font=fonts["card_title"], fill=(0, 163, 255, 255))
    draw.text((115, 1145), "Maintain a 3.82 term average over the next 6 quarters (approx. 3 As and 1 A- per term).", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "Next: Canvas assignment priority matrix & grade What-If simulator →")
    poster.convert("RGB").save(os.path.join(out_dir, "p6_gpa.jpg"), quality=95)

# --- SLIDE 7: CANVAS TACTICAL DASHBOARD ---
def generate_p7(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 7, "📅 CORE MODULE 6: TASK MANAGEMENT", "Canvas Tactical Priority Matrix", "Eisenhower urgency-weighted deadline queue & final grade simulator", accent_color=(244, 63, 94))

    tasks = [
        ("🔴 [DO FIRST] ICS 46 Project 1 (Weight 15%)", "Due in 18 hrs • High point-weight assignment. Prioritize immediate execution.", (244, 63, 94)),
        ("🟡 [SCHEDULE] MATH 3A Quiz 3 (Weight 5%)", "Due in 2 days • Review Chapter 4 Linear Transformations tonight.", (255, 210, 0)),
        ("🟢 [IN PROGRESS] WRITING 60 Draft 1 (Weight 10%)", "Due in 5 days • Research outline currently underway.", (52, 211, 153))
    ]
    ty = 370
    for t_title, t_desc, t_col in tasks:
        draw.rounded_rectangle([60, ty, WIDTH - 60, ty + 125], radius=20, fill=(16, 28, 54, 240), outline=(*t_col, 180), width=2)
        draw.text((90, ty + 22), t_title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((90, ty + 70), t_desc, font=fonts["card_desc"], fill=(175, 200, 230, 255))
        ty += 145

    # What-If Final Grade Simulator
    draw.rounded_rectangle([60, 835, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(0, 163, 255, 180), width=2)
    draw.text((90, 865), "🎯 Final Exam What-If Grade Simulator", font=fonts["card_title"], fill=(0, 163, 255, 255))

    draw.text((90, 920), "• Midterm Exam (25%): 84% (Grade: B)", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((90, 965), "• Homework Assignments (35%): 96% (Grade: A)", font=fonts["card_desc"], fill=(255, 255, 255, 255))
    draw.text((90, 1010), "• Final Exam (40%): [Interactive Slider Calculation]", font=fonts["card_desc"], fill=(255, 210, 0, 255))

    draw.rounded_rectangle([90, 1070, WIDTH - 90, 1200], radius=16, fill=(18, 34, 64, 255), outline=(52, 211, 153, 160), width=1)
    draw.text((115, 1095), "✨ Simulation Projection:", font=fonts["card_title"], fill=(52, 211, 153, 255))
    draw.text((115, 1140), "Score 88% on Final to secure an A-; score 93% to lock in an overall A!", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "Next: Alumni-vetted booster courses & campus survival guide →")
    poster.convert("RGB").save(os.path.join(out_dir, "p7_canvas.jpg"), quality=95)

# --- SLIDE 8: CAMPUS SURVIVAL & BOOSTER COURSES ---
def generate_p8(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 8, "💡 CORE MODULE 7: SURVIVAL GUIDES", "Alumni-Vetted GPA Boosters & Deadlines", "Avoid administrative holds and protect your academic standing", accent_color=(255, 210, 0))

    # Water courses box
    draw.rounded_rectangle([60, 360, WIDTH - 60, 800], radius=24, fill=(12, 24, 48, 255), outline=(255, 210, 0, 180), width=2)
    draw.text((90, 395), "🌟 Top Alumni-Reviewed GPA Booster Courses (GE Breadth)", font=fonts["card_title"], fill=(255, 210, 0, 255))

    courses = [
        ("DRAMA 10 (Intro to Theater)", "Rating: ★★★★★ • Avg GPA 3.85 • Fulfills GE IV (Arts), low exam pressure"),
        ("EARTHSS 3 (Oceanography)", "Rating: ★★★★★ • Avg GPA 3.90 • Fulfills GE II (Science), generous curves"),
        ("UNI STU 1 (Freshman Seminar)", "Rating: ★★★★★ • 1-Unit P/NP • Faculty networking & campus orientation"),
        ("DANCE 3 (Dance History)", "Rating: ★★★★☆ • Fulfills GE IV (Arts) • Excellent GPA stabilizer")
    ]
    cy = 460
    for c_title, c_desc in courses:
        draw.rounded_rectangle([90, cy, WIDTH - 90, cy + 70], radius=14, fill=(18, 32, 60, 240), outline=(0, 163, 255, 100), width=1)
        draw.text((110, cy + 12), c_title, font=fonts["card_desc"], fill=(255, 255, 255, 255))
        draw.text((110, cy + 40), c_desc, font=fonts["small"], fill=(170, 195, 225, 255))
        cy += 80

    # Survival guides box
    draw.rounded_rectangle([60, 830, WIDTH - 60, 1250], radius=24, fill=(10, 20, 42, 255), outline=(52, 211, 153, 160), width=1)
    draw.text((90, 860), "📑 Essential Campus Deadlines & Financial Hold Prevention:", font=fonts["card_title"], fill=(52, 211, 153, 255))

    guides = [
        ("💰 ZotAccount Payment & Hold Clearances", "Pay tuition before 5:00 PM on deadline to prevent automatic class drops!"),
        ("📝 Week 2 Drop Deadline (Transcript Clear)", "Drop unwanted classes by Friday of Week 2 with zero transcript notation."),
        ("📅 1-Click Academic Calendar Sync", "Export .ics calendar files with 10-minute alarms to Apple / Google Calendar.")
    ]
    gy = 920
    for g_title, g_desc in guides:
        draw.text((90, gy), g_title, font=fonts["card_title"], fill=(0, 163, 255, 255))
        draw.text((90, gy + 40), g_desc, font=fonts["card_desc"], fill=(180, 205, 235, 255))
        gy += 95

    draw_footer_cta(draw, fonts, "Next: 100% open-source security guarantee & launch link →")
    poster.convert("RGB").save(os.path.join(out_dir, "p8_guides.jpg"), quality=95)

# --- SLIDE 9: CTA & PRIVACY GUARANTEE ---
def generate_p9(out_dir, fonts):
    poster = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(poster)
    draw = draw_base_card(poster, draw, fonts, 9, "🛡️ GETTING STARTED & SECURITY PLEDGE", "100% Free & Open-Source", "Student-engineered, zero credential scraping, zero security risks", accent_color=(52, 211, 153))

    securities = [
        ("❌ Never Collects UCINetID or Passwords", "Runs 100% locally in your browser. Zero backend servers handling credentials.", (244, 63, 94)),
        ("❌ Zero Duo 2FA Bypass or Automated Scraping", "Strictly adheres to UCI Computer Network Policies & OAISC academic conduct.", (255, 210, 0)),
        ("✅ Local IndexedDB Private Vault", "All transcripts and 4-year schedules remain securely stored on your own device.", (52, 211, 153))
    ]
    sy = 370
    for s_title, s_desc, s_col in securities:
        draw.rounded_rectangle([60, sy, WIDTH - 60, sy + 140], radius=20, fill=(16, 28, 54, 240), outline=(*s_col, 180), width=2)
        draw.text((90, sy + 24), s_title, font=fonts["card_title"], fill=(255, 255, 255, 255))
        draw.text((90, sy + 72), s_desc, font=fonts["card_desc"], fill=(175, 200, 230, 255))
        sy += 165

    # Hub Info Box
    draw.rounded_rectangle([60, 890, WIDTH - 60, 1250], radius=24, fill=(10, 22, 44, 255), outline=(0, 163, 255, 200), width=2)
    draw.text((90, 925), "🌐 How to Launch AntTrail Today:", font=fonts["card_title"], fill=(0, 163, 255, 255))

    draw.rounded_rectangle([90, 985, WIDTH - 90, 1070], radius=16, fill=(18, 34, 64, 255), outline=(255, 210, 0, 160), width=1)
    draw.text((115, 1005), "🔗 Web App: anttrail.vercel.app", font=fonts["card_title"], fill=(255, 210, 0, 255))
    draw.text((115, 1040), "No browser extensions required. Instant launch on mobile & desktop!", font=fonts["small"], fill=(180, 205, 235, 255))

    draw.rounded_rectangle([90, 1090, WIDTH - 90, 1175], radius=16, fill=(18, 34, 64, 255), outline=(52, 211, 153, 160), width=1)
    draw.text((115, 1110), "🌟 GitHub Repository: github.com/rchau8502/AntTrail", font=fonts["card_title"], fill=(52, 211, 153, 255))
    draw.text((115, 1145), "100% audit-transparent code. Stars and Pull Requests are welcome!", font=fonts["small"], fill=(180, 205, 235, 255))

    draw.text((90, 1205), "❤️ Share this with your fellow Anteaters & roommates for a smooth enrollment!", font=fonts["card_desc"], fill=(255, 255, 255, 255))

    draw_footer_cta(draw, fonts, "Zot Zot Zot! Wishing every Anteater straight A's! 🐜🍴", bg_color=(22, 101, 52), border_color=(52, 211, 153))
    poster.convert("RGB").save(os.path.join(out_dir, "p9_cta.jpg"), quality=95)

def main():
    out_dir = "public/marketing/9grid_en"
    os.makedirs(out_dir, exist_ok=True)
    fonts = get_fonts()

    print("Generating English Slide 1: Cover...")
    generate_p1(out_dir, fonts)
    print("Generating English Slide 2: WebReg Radar...")
    generate_p2(out_dir, fonts)
    print("Generating English Slide 3: Waitlist Probability...")
    generate_p3(out_dir, fonts)
    print("Generating English Slide 4: Transfer Articulation...")
    generate_p4(out_dir, fonts)
    print("Generating English Slide 5: Degree Planner AST...")
    generate_p5(out_dir, fonts)
    print("Generating English Slide 6: GPA Engine...")
    generate_p6(out_dir, fonts)
    print("Generating English Slide 7: Canvas Dashboard...")
    generate_p7(out_dir, fonts)
    print("Generating English Slide 8: Campus Guides & Booster Courses...")
    generate_p8(out_dir, fonts)
    print("Generating English Slide 9: CTA & Security...")
    generate_p9(out_dir, fonts)

    print(f"Successfully generated all 9 English posters in {out_dir}/!")

if __name__ == "__main__":
    main()
