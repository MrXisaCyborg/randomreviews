const fs = require('fs');

try {
  let html = fs.readFileSync('index.html', 'utf8');
  const newStyles = fs.readFileSync('new_styles.css', 'utf8');

  // Replace styles
  const styleStart = html.indexOf('<style>');
  const styleEnd = html.indexOf('</style>') + 8;
  
  if (styleStart !== -1 && styleEnd !== -1) {
    html = html.substring(0, styleStart) + '<style>\n' + newStyles + '\n</style>' + html.substring(styleEnd);
  } else {
    console.log("Could not find <style> block");
  }

  // Insert aurora-bg
  if (!html.includes('<div class="aurora-bg"></div>')) {
    html = html.replace('<body>', '<body>\n<div class="aurora-bg"></div>');
  }
  
  // Replace google fonts link
  const oldFont = '<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Familjen+Grotesk:wght@400;500;600;700;800&family=Permanent+Marker&display=swap" rel="stylesheet">';
  const newFont = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';
  html = html.replace(oldFont, newFont);

  fs.writeFileSync('index.html', html, 'utf8');
  console.log("Successfully updated index.html with the new design.");
} catch (e) {
  console.error("Error updating design:", e);
}
