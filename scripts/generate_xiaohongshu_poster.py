import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_xiaohongshu_poster():
    # 3:4 aspect ratio for Xiaohongshu (1080 x 1440)
    width, height = 1080, 1440
    poster = Image.new("RGBA", (width, height), (10, 16, 32, 255))
    draw = ImageDraw.Draw(poster)

    # 1. Gradient Background
    for y in range(height):
        # Blend from dark navy (#091428) at top to deep midnight (#040814) at bottom
        ratio = y / height
        r = int(9 * (1 - ratio) + 4 * ratio)
        g = int(22 * (1 - ratio) + 9 * ratio)
        b = int(42 * (1 - ratio) + 20 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))

    # Decorative radial glow in center-top (Anteater gold & electric blue)
    glow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    glow_draw.ellipse([width//2 - 400, 150, width//2 + 400, 750], fill=(0, 100, 164, 45))
    glow_draw.ellipse([width//2 - 250, 220, width//2 + 250, 600], fill=(255, 210, 0, 30))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(80))
    poster = Image.alpha_composite(poster, glow_layer)
    draw = ImageDraw.Draw(poster)

    # Fonts
    font_cn_bold = "/System/Library/Fonts/STHeiti Medium.ttc"
    font_cn_light = "/System/Library/Fonts/STHeiti Light.ttc"
    font_en = "/System/Library/Fonts/Helvetica.ttc"

    f_tag = ImageFont.truetype(font_cn_bold, 28)
    f_title = ImageFont.truetype(font_cn_bold, 76)
    f_title_sub = ImageFont.truetype(font_cn_bold, 50)
    f_brand = ImageFont.truetype(font_en, 36)
    f_pill_title = ImageFont.truetype(font_cn_bold, 30)
    f_pill_desc = ImageFont.truetype(font_cn_light, 22)
    f_footer = ImageFont.truetype(font_cn_bold, 26)

    # 2. Top Pill Badge: "UC IRVINE 食蚁兽专属 • 零密码泄露"
    badge_text = "🐜 UC IRVINE 食蚁兽专属 • 纯开源零服务器"
    bbox = draw.textbbox((0, 0), badge_text, font=f_tag)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    bx, by = (width - tw) // 2, 70
    draw.rounded_rectangle([bx - 24, by - 12, bx + tw + 24, by + th + 12], radius=25, fill=(0, 100, 164, 80), outline=(255, 210, 0, 200), width=2)
    draw.text((bx, by), badge_text, font=f_tag, fill=(255, 210, 0, 255))

    # 3. Main Title
    title1 = "UCI 选课抢课神器"
    bbox1 = draw.textbbox((0, 0), title1, font=f_title)
    t1_w = bbox1[2] - bbox1[0]
    draw.text(((width - t1_w) // 2, 140), title1, font=f_title, fill=(255, 255, 255, 255))

    title2 = "WebReg 战术雷达 & 转学秒算"
    bbox2 = draw.textbbox((0, 0), title2, font=f_title_sub)
    t2_w = bbox2[2] - bbox2[0]
    draw.text(((width - t2_w) // 2, 235), title2, font=f_title_sub, fill=(255, 210, 0, 255))

    # 4. Central 3D Visual Card (Using the generated 3D image)
    img_path = "public/marketing/anttrail-instagram-promo.jpg"
    if os.path.exists(img_path):
        center_img = Image.open(img_path).convert("RGBA")
        card_w, card_h = 920, 560
        # Crop center portion of the 1:1 image
        cw, ch = center_img.size
        crop_box = (0, int(ch * 0.1), cw, int(ch * 0.72))
        cropped = center_img.crop(crop_box).resize((card_w, card_h), Image.Resampling.LANCZOS)

        # Card mask with rounded corners
        mask = Image.new("L", (card_w, card_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, card_w, card_h], radius=28, fill=255)

        card_x, card_y = (width - card_w) // 2, 320

        # Card subtle border glow
        border_box = [card_x - 3, card_y - 3, card_x + card_w + 3, card_y + card_h + 3]
        draw.rounded_rectangle(border_box, radius=30, fill=None, outline=(0, 163, 255, 140), width=3)

        poster.paste(cropped, (card_x, card_y), mask)
        draw = ImageDraw.Draw(poster)

        # Floating Pill on the image
        live_badge = "● WebReg Live Radar: ACTIVE"
        draw.rounded_rectangle([card_x + 20, card_y + 20, card_x + 360, card_y + 60], radius=15, fill=(10, 24, 48, 220), outline=(52, 211, 153, 200), width=2)
        f_badge = ImageFont.truetype(font_en, 20)
        draw.text((card_x + 40, card_y + 28), live_badge, font=f_badge, fill=(52, 211, 153, 255))

    # 5. Four Feature Bento Cards (2x2 Grid)
    features = [
        ("⚡ ZotSniper 战术雷达", "席位空缺毫秒提醒 • 进班概率数学演算", (0, 100, 164)),
        ("🎓 CC 转学学分秒对齐", "IVC/OCC等8所加州CC先修课秒算导入", (22, 101, 52)),
        ("🧭 4年培养方案求解器", "教务处先修 AST 严谨排期 • 杜绝延毕", (126, 34, 206)),
        ("📅 Canvas DDL 智能看板", "作业重要性加权矩阵 • 成绩模拟器", (180, 83, 9)),
    ]

    grid_y = 910
    col_w = 445
    card_h = 100
    gap_x = 30
    gap_y = 20
    start_x = (width - (col_w * 2 + gap_x)) // 2

    for i, (f_title_text, f_desc_text, border_rgb) in enumerate(features):
        r_idx = i // 2
        c_idx = i % 2
        fx = start_x + c_idx * (col_w + gap_x)
        fy = grid_y + r_idx * (card_h + gap_y)

        # Glassmorphic card
        draw.rounded_rectangle([fx, fy, fx + col_w, fy + card_h], radius=20, fill=(18, 28, 52, 230), outline=(*border_rgb, 180), width=2)
        draw.text((fx + 22, fy + 18), f_title_text, font=f_pill_title, fill=(255, 255, 255, 255))
        draw.text((fx + 22, fy + 58), f_desc_text, font=f_pill_desc, fill=(160, 178, 205, 255))

    # 6. Safety & Trust Assurance Bar
    safety_y = 1170
    draw.rounded_rectangle([start_x, safety_y, start_x + col_w * 2 + gap_x, safety_y + 80], radius=18, fill=(12, 22, 40, 240), outline=(255, 210, 0, 100), width=1)
    f_safe = ImageFont.truetype(font_cn_bold, 24)
    safe_text = "🛡️ 绝对安全承诺：零 NetID 存储 • 零 Duo 破解 • 纯浏览器端运行"
    draw.text((start_x + 50, safety_y + 26), safe_text, font=f_safe, fill=(255, 210, 0, 255))

    # 7. Bottom Call to Action
    cta_y = 1290
    cta_box = [start_x, cta_y, start_x + col_w * 2 + gap_x, cta_y + 90]
    draw.rounded_rectangle(cta_box, radius=24, fill=(0, 100, 164, 255), outline=(255, 210, 0, 255), width=2)
    cta_text = "🌟 GitHub 搜: rchau8502/AntTrail • Zot Zot Zot! 🐜🍴"
    bbox_cta = draw.textbbox((0, 0), cta_text, font=f_footer)
    cta_w = bbox_cta[2] - bbox_cta[0]
    draw.text(((width - cta_w) // 2, cta_y + 30), cta_text, font=f_footer, fill=(255, 255, 255, 255))

    out_path = "public/marketing/anttrail-xiaohongshu-cover.jpg"
    poster.convert("RGB").save(out_path, quality=95)
    print(f"Generated Xiaohongshu poster at {out_path}")

if __name__ == "__main__":
    create_xiaohongshu_poster()
