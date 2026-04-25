"""
Tint product images from cyan-only to aurora gradient (purple/blue/teal/pink).
Creates v2 copies, preserving originals as backup.
"""
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
import os

SRC_DIR = r"d:\AstarGalaxy\Frontend\src\assets\images"

# Images to process (skip drone and humanoid - already generated)
IMAGES = [
    "robot_walle.png",
    "robot_rover.png",
    "ship_fighter.png",
    "ship_cargo.png",
    "ship_scout.png",
    "hero_spaceship.png",
]

def apply_aurora_tint(img_path, out_path):
    """Replace cyan-only glow with aurora gradient (purple/blue/teal/pink mix)."""
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.float64)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Detect cyan/teal glowing pixels (high G and B, low R)
    # These are the LED accents we want to recolor
    brightness = (r + g + b) / 3.0
    
    # Cyan detection: pixels where blue+green are dominant over red
    cyan_mask = ((g > 80) & (b > 80) & (g + b > r * 2.5) & (brightness > 40))
    
    # Also detect bright cyan/teal specifically
    teal_mask = ((b > 100) & (g > 80) & (r < 100) & (brightness > 50))
    
    # Combined glow mask
    glow_mask = cyan_mask | teal_mask
    
    # Calculate glow intensity for each pixel (0-1)
    glow_intensity = np.zeros_like(r)
    glow_intensity[glow_mask] = np.clip(
        ((g[glow_mask] + b[glow_mask]) - r[glow_mask]) / 400.0, 0, 1
    )
    
    # Create gradient based on vertical position (top=purple, mid=blue, bottom=teal/pink)
    h, w = data.shape[:2]
    y_norm = np.linspace(0, 1, h)[:, np.newaxis]  # 0 at top, 1 at bottom
    x_norm = np.linspace(0, 1, w)[np.newaxis, :]  # 0 at left, 1 at right
    
    # Aurora colors
    purple = np.array([179, 136, 255])   # #b388ff
    blue = np.array([68, 138, 255])      # #448aff  
    teal = np.array([0, 191, 165])       # #00bfa5
    pink = np.array([234, 128, 252])     # #ea80fc
    violet = np.array([124, 77, 255])    # #7c4dff
    
    # Create a diagonal gradient pattern
    diag = (y_norm + x_norm) / 2.0  # diagonal from top-left to bottom-right
    
    # Multi-stop gradient
    aurora_r = np.zeros((h, w))
    aurora_g = np.zeros((h, w))
    aurora_b = np.zeros((h, w))
    
    # 4 zones along the diagonal
    for y_idx in range(h):
        for x_idx in range(w):
            t = diag[y_idx, x_idx]
            if t < 0.25:
                # Purple to Blue
                f = t / 0.25
                color = purple * (1-f) + blue * f
            elif t < 0.5:
                # Blue to Teal
                f = (t - 0.25) / 0.25
                color = blue * (1-f) + teal * f
            elif t < 0.75:
                # Teal to Pink
                f = (t - 0.5) / 0.25
                color = teal * (1-f) + pink * f
            else:
                # Pink to Violet
                f = (t - 0.75) / 0.25
                color = pink * (1-f) + violet * f
            
            aurora_r[y_idx, x_idx] = color[0]
            aurora_g[y_idx, x_idx] = color[1]
            aurora_b[y_idx, x_idx] = color[2]
    
    # Apply aurora color to glow pixels
    blend = glow_intensity * 0.85  # 85% color replacement strength
    
    new_r = r * (1 - blend) + aurora_r * blend
    new_g = g * (1 - blend) + aurora_g * blend  
    new_b = b * (1 - blend) + aurora_b * blend
    
    # Also add a subtle aurora tint to the ambient lighting/reflections
    # Detect mid-dark areas with slight cyan tint (ambient reflections)
    ambient_mask = ((brightness > 20) & (brightness < 80) & 
                    (b > r * 1.1) & (~glow_mask))
    ambient_blend = np.zeros_like(r)
    ambient_blend[ambient_mask] = 0.15  # subtle 15% tint
    
    new_r = new_r * (1 - ambient_blend) + aurora_r * ambient_blend
    new_g = new_g * (1 - ambient_blend) + aurora_g * ambient_blend
    new_b = new_b * (1 - ambient_blend) + aurora_b * ambient_blend
    
    # Clamp and reconstruct
    data[:,:,0] = np.clip(new_r, 0, 255)
    data[:,:,1] = np.clip(new_g, 0, 255)
    data[:,:,2] = np.clip(new_b, 0, 255)
    
    result = Image.fromarray(data.astype(np.uint8), "RGBA")
    
    # Slight saturation boost to make aurora colors pop
    enhancer = ImageEnhance.Color(result)
    result = enhancer.enhance(1.15)
    
    result.save(out_path, "PNG")
    print(f"✓ Created: {os.path.basename(out_path)}")


def apply_aurora_tint_fast(img_path, out_path):
    """Vectorized version - much faster than pixel-by-pixel."""
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img, dtype=np.float64)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    brightness = (r + g + b) / 3.0
    
    # Glow mask (cyan/teal LEDs)
    cyan_mask = ((g > 80) & (b > 80) & (g + b > r * 2.5) & (brightness > 40))
    teal_mask = ((b > 100) & (g > 80) & (r < 100) & (brightness > 50))
    glow_mask = cyan_mask | teal_mask
    
    glow_intensity = np.zeros_like(r)
    glow_intensity[glow_mask] = np.clip(
        ((g[glow_mask] + b[glow_mask]) - r[glow_mask]) / 400.0, 0, 1
    )
    
    h, w = data.shape[:2]
    y_norm = np.linspace(0, 1, h)[:, np.newaxis] * np.ones((1, w))
    x_norm = np.ones((h, 1)) * np.linspace(0, 1, w)[np.newaxis, :]
    diag = (y_norm + x_norm) / 2.0
    
    # Aurora colors
    purple = np.array([179, 136, 255])
    blue = np.array([68, 138, 255])
    teal_c = np.array([0, 191, 165])
    pink = np.array([234, 128, 252])
    violet = np.array([124, 77, 255])
    
    # Vectorized 4-zone gradient
    aurora = np.zeros((h, w, 3))
    
    m1 = diag < 0.25
    f1 = diag / 0.25
    for c in range(3):
        aurora[:,:,c] += m1 * (purple[c] * (1-f1) + blue[c] * f1)
    
    m2 = (diag >= 0.25) & (diag < 0.5)
    f2 = (diag - 0.25) / 0.25
    for c in range(3):
        aurora[:,:,c] += m2 * (blue[c] * (1-f2) + teal_c[c] * f2)
    
    m3 = (diag >= 0.5) & (diag < 0.75)
    f3 = (diag - 0.5) / 0.25
    for c in range(3):
        aurora[:,:,c] += m3 * (teal_c[c] * (1-f3) + pink[c] * f3)
    
    m4 = diag >= 0.75
    f4 = (diag - 0.75) / 0.25
    for c in range(3):
        aurora[:,:,c] += m4 * (pink[c] * (1-f4) + violet[c] * f4)
    
    aurora_r, aurora_g, aurora_b = aurora[:,:,0], aurora[:,:,1], aurora[:,:,2]
    
    # Apply to glow pixels
    blend = glow_intensity * 0.85
    new_r = r * (1 - blend) + aurora_r * blend
    new_g = g * (1 - blend) + aurora_g * blend
    new_b = b * (1 - blend) + aurora_b * blend
    
    # Ambient reflections
    ambient_mask = ((brightness > 20) & (brightness < 80) & (b > r * 1.1) & (~glow_mask))
    ambient_blend = np.zeros_like(r)
    ambient_blend[ambient_mask] = 0.15
    new_r = new_r * (1 - ambient_blend) + aurora_r * ambient_blend
    new_g = new_g * (1 - ambient_blend) + aurora_g * ambient_blend
    new_b = new_b * (1 - ambient_blend) + aurora_b * ambient_blend
    
    data[:,:,0] = np.clip(new_r, 0, 255)
    data[:,:,1] = np.clip(new_g, 0, 255)
    data[:,:,2] = np.clip(new_b, 0, 255)
    
    result = Image.fromarray(data.astype(np.uint8), "RGBA")
    enhancer = ImageEnhance.Color(result)
    result = enhancer.enhance(1.15)
    result.save(out_path, "PNG")
    print(f"✓ Created: {os.path.basename(out_path)}")


if __name__ == "__main__":
    print("🎨 Aurora Gradient Tinting - Creating v2 images...")
    print(f"   Source: {SRC_DIR}")
    print()
    
    for fname in IMAGES:
        src = os.path.join(SRC_DIR, fname)
        name, ext = os.path.splitext(fname)
        dst = os.path.join(SRC_DIR, f"{name}_v2{ext}")
        
        if not os.path.exists(src):
            print(f"✗ Not found: {fname}")
            continue
        
        apply_aurora_tint_fast(src, dst)
    
    print()
    print("✅ Done! Original images preserved, v2 versions created.")
