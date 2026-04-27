"""
Tint product images to match drone_v2 aurora palette.
drone_v2 reference colors: purple-pink (#b388ff / #ea80fc) + cyan-blue (#00e5ff / #448aff)
Much stronger color replacement - replaces ALL cyan glow with aurora gradient mix.
"""
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
import os

SRC_DIR = r"d:\AstarGalaxy\Frontend\src\assets\images"

# All images to reprocess (overwrite previous v2)
IMAGES = [
    "robot_walle.png",
    "robot_rover.png",
    "ship_fighter.png",
    "ship_cargo.png",
    "ship_scout.png",
    "hero_spaceship.png",
    "robot_humanoid.png",
]

def apply_aurora_tint(img_path, out_path):
    """Strong aurora tint matching drone_v2 palette."""
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.float64)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    brightness = (r + g + b) / 3.0
    
    # --- DETECT CYAN/TEAL GLOW REGIONS ---
    # Broad cyan detection (the LED accents)
    is_bright_cyan = (b > 60) & (g > 50) & (b + g > r * 2.0) & (brightness > 30)
    # Strong cyan/teal
    is_strong_glow = (b > 100) & (g > 70) & (r < 120)
    # Medium teal ambient
    is_ambient_teal = (b > r * 1.15) & (g > r * 1.05) & (brightness > 15) & (brightness < 120)
    
    glow_mask = is_bright_cyan | is_strong_glow
    
    # Glow intensity (how "cyan" is it, 0-1)
    glow_str = np.zeros_like(r)
    glow_str[glow_mask] = np.clip(
        ((g[glow_mask] + b[glow_mask]) - r[glow_mask] * 1.5) / 350.0, 0, 1
    )
    
    # Ambient intensity (subtle teal reflections)
    ambient_str = np.zeros_like(r)
    ambient_str[is_ambient_teal & (~glow_mask)] = np.clip(
        (b[is_ambient_teal & (~glow_mask)] - r[is_ambient_teal & (~glow_mask)]) / 200.0, 0, 0.4
    )
    
    h, w = data.shape[:2]
    
    # --- AURORA GRADIENT (matching drone_v2 exactly) ---
    # drone_v2 has: purple-pink on one side, cyan-blue on other, with smooth transition
    y_n = np.linspace(0, 1, h)[:, np.newaxis] * np.ones((1, w))
    x_n = np.ones((h, 1)) * np.linspace(0, 1, w)[np.newaxis, :]
    
    # Diagonal gradient like drone_v2
    diag = np.clip((x_n * 0.6 + y_n * 0.4), 0, 1)
    
    # Colors from drone_v2 reference
    c_purple = np.array([160, 100, 255])   # purple
    c_pink   = np.array([220, 100, 250])   # pink/magenta 
    c_cyan   = np.array([0, 210, 255])     # bright cyan
    c_blue   = np.array([80, 130, 255])    # blue
    
    # 3 gradient zones
    aurora = np.zeros((h, w, 3))
    
    # Zone 1: purple-pink (diag 0 - 0.4)
    m1 = diag < 0.4
    f1 = diag / 0.4
    for c in range(3):
        aurora[:,:,c] += m1 * (c_purple[c] * (1-f1) + c_pink[c] * f1)
    
    # Zone 2: pink to cyan (diag 0.4 - 0.7)
    m2 = (diag >= 0.4) & (diag < 0.7)
    f2 = (diag - 0.4) / 0.3
    for c in range(3):
        aurora[:,:,c] += m2 * (c_pink[c] * (1-f2) + c_cyan[c] * f2)
    
    # Zone 3: cyan to blue (diag 0.7 - 1.0)
    m3 = diag >= 0.7
    f3 = (diag - 0.7) / 0.3
    for c in range(3):
        aurora[:,:,c] += m3 * (c_cyan[c] * (1-f3) + c_blue[c] * f3)
    
    aurora_r, aurora_g, aurora_b = aurora[:,:,0], aurora[:,:,1], aurora[:,:,2]
    
    # --- APPLY STRONG GLOW REPLACEMENT ---
    # 95% replacement on glow pixels (very strong)
    glow_blend = glow_str * 0.95
    new_r = r * (1 - glow_blend) + aurora_r * glow_blend
    new_g = g * (1 - glow_blend) + aurora_g * glow_blend
    new_b = b * (1 - glow_blend) + aurora_b * glow_blend
    
    # --- APPLY AMBIENT TINT ---
    # 30% on ambient reflections
    amb_blend = ambient_str * 0.30
    new_r = new_r * (1 - amb_blend) + aurora_r * amb_blend
    new_g = new_g * (1 - amb_blend) + aurora_g * amb_blend
    new_b = new_b * (1 - amb_blend) + aurora_b * amb_blend
    
    # --- ADD PURPLE/PINK TINT TO DARK AREAS (like drone_v2 background glow) ---
    is_dark = (brightness > 8) & (brightness < 45) & (a > 200)
    dark_blend = np.zeros_like(r)
    dark_blend[is_dark] = 0.08  # subtle 8%
    # Use a purple-ish tint for dark areas
    new_r = new_r * (1 - dark_blend) + np.clip(r + 8, 0, 255) * dark_blend
    new_g = new_g * (1 - dark_blend) + np.clip(g - 2, 0, 255) * dark_blend
    new_b = new_b * (1 - dark_blend) + np.clip(b + 12, 0, 255) * dark_blend
    
    # Clamp
    data[:,:,0] = np.clip(new_r, 0, 255)
    data[:,:,1] = np.clip(new_g, 0, 255)
    data[:,:,2] = np.clip(new_b, 0, 255)
    
    result = Image.fromarray(data.astype(np.uint8))
    
    # Boost saturation to make aurora colors pop (like drone_v2)
    enhancer = ImageEnhance.Color(result)
    result = enhancer.enhance(1.25)
    
    # Slight contrast boost
    enhancer = ImageEnhance.Contrast(result)
    result = enhancer.enhance(1.05)
    
    result.save(out_path, "PNG")
    print(f"  OK: {os.path.basename(out_path)}")


if __name__ == "__main__":
    print("Aurora Tint v2 - Using drone_v2 as reference palette")
    print(f"Source: {SRC_DIR}")
    print()
    
    for fname in IMAGES:
        src = os.path.join(SRC_DIR, fname)
        name, ext = os.path.splitext(fname)
        dst = os.path.join(SRC_DIR, f"{name}_v2{ext}")
        
        if not os.path.exists(src):
            print(f"  SKIP: {fname} not found")
            continue
        
        apply_aurora_tint(src, dst)
    
    print()
    print("Done! All v2 images updated with drone_v2 matching palette.")
