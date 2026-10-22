from PIL import Image, ImageDraw, ImageFont
import os

FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"

def create_anttrail_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Outer squircle
    radius = int(size * 0.22)
    
    # Gradient background
    for y in range(size):
        ratio = y / size
        # #0064a4 to #0c2340
        r = int(0 * (1 - ratio) + 12 * ratio)
        g = int(100 * (1 - ratio) + 35 * ratio)
        b = int(164 * (1 - ratio) + 64 * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))
        
    # Mask to rounded rectangle
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, size, size], radius=radius, fill=255)
    
    # Composite
    base = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    base.paste(img, (0, 0), mask)
    draw = ImageDraw.Draw(base)
    
    # Subtle inner border
    draw.rounded_rectangle([2, 2, size - 2, size - 2], radius=radius, outline=(255, 255, 255, 45), width=max(1, int(size * 0.015)))
    
    # Text "AT" in Anteater Gold #ffd200
    font_size = int(size * 0.48)
    font = ImageFont.truetype(FONT_PATH, font_size)
    text = "AT"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (size - tw) // 2 - int(size * 0.02)
    ty = (size - th) // 2 - int(size * 0.04)
    
    # Text shadow
    draw.text((tx + int(size * 0.015), ty + int(size * 0.02)), text, font=font, fill=(0, 0, 0, 100))
    # Text fill
    draw.text((tx, ty), text, font=font, fill=(255, 210, 0, 255))
    
    # Gold accent dot at top right
    dot_r = int(size * 0.065)
    dot_x = int(size * 0.78)
    dot_y = int(size * 0.24)
    draw.ellipse([dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r], fill=(255, 210, 0, 255), outline=(255, 255, 255, 180), width=max(1, int(size * 0.012)))
    
    return base

os.makedirs("public", exist_ok=True)

# 1. 192x192
icon192 = create_anttrail_icon(192)
icon192.save("public/icon-192.png", "PNG")

# 2. 512x512
icon512 = create_anttrail_icon(512)
icon512.save("public/icon-512.png", "PNG")

# 3. 180x180 Apple Touch Icon
icon180 = create_anttrail_icon(180)
icon180.save("public/apple-touch-icon.png", "PNG")

# 4. 32x32 Favicon ICO
icon32 = create_anttrail_icon(32)
icon32.save("public/favicon.ico", format="ICO", sizes=[(32, 32)])

print("Successfully generated PWA and App icon assets in public/!")
