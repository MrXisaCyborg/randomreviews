import urllib.request
import json
import os

svg_data = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#060613"/>
  <rect width="180" height="180" rx="40" fill="url(#grad)" opacity="0.25"/>
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF2D78"/>
      <stop offset="100%" stop-color="#00D4F5"/>
    </linearGradient>
  </defs>
  <text x="50%" y="52%" font-size="70" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-weight="900" fill="white">RR</text>
</svg>'''

try:
    print("Requesting from convert.run API...")
    req = urllib.request.Request('https://convert.run/api/svg2png', data=svg_data.encode('utf-8'), headers={'Content-Type': 'image/svg+xml', 'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        with open('apple-touch-icon.png', 'wb') as f:
            f.write(response.read())
        print("Success! Downloaded apple-touch-icon.png")
except Exception as e:
    print(f"API Failed: {e}, falling back to public icon API")
    # Fallback to a clear favicon generator API
    req = urllib.request.Request('https://ui-avatars.com/api/?name=RR&background=060613&color=FF2D78&size=180&font-size=0.4&bold=true', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        with open('apple-touch-icon.png', 'wb') as f:
            f.write(response.read())
        print("Success with fallback")
