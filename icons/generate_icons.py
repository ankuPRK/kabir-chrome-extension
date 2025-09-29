#!/usr/bin/env python3
"""
Generate icons for Kabir Doha Chrome Extension
Requires: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Create an icon with the given size"""
    # Create image with gradient background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Create gradient effect (simplified)
    for i in range(size):
        for j in range(size):
            # Simple gradient from blue to purple
            r = int(102 + (118 - 102) * i / size)
            g = int(126 + (75 - 126) * i / size)
            b = int(234 + (162 - 234) * i / size)
            img.putpixel((i, j), (r, g, b, 255))
    
    # Add rounded corners
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = size // 5
    mask_draw.rounded_rectangle([0, 0, size, size], corner_radius, fill=255)
    
    # Apply mask
    img.putalpha(mask)
    
    # Add "क" (Ka) letter
    try:
        # Try to use a system font
        font_size = int(size * 0.6)
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()
    
    # Draw the letter
    text = "क"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - 2  # Slight adjustment for centering
    
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    
    # Save the image
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

def main():
    """Generate all required icons"""
    # Ensure we're in the icons directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Create icons
    create_icon(16, 'icon16.png')
    create_icon(48, 'icon48.png')
    create_icon(128, 'icon128.png')
    
    print("\nAll icons generated successfully!")
    print("Icons are ready for the Chrome extension.")

if __name__ == "__main__":
    main()
