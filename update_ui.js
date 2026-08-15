const fs = require('fs');
const file = 'c:\\Users\\aadij\\Downloads\\Random-Reviews\\index.html';
let code = fs.readFileSync(file, 'utf-8');

// 1. Auth Text Diff
code = code.replace(
  /<h2>Welcome 👋<\/h2>\s*<p class="modal-sub">Sign in to drop reviews and help your batch\.<\/p>/,
  `<h2 id="authModalTitle">Welcome Back 👋</h2>
    <p class="modal-sub" id="authModalDesc">Sign in to drop reviews and help your batch.</p>`
);

// Update switchTab function to alter text
const oldSwitchTab = `function switchTab(tab){
  document.getElementById('tabLogin').classList.toggle('active',tab==='login')
  document.getElementById('tabSignup').classList.toggle('active',tab==='signup')
  document.getElementById('loginPanel').classList.toggle('active',tab==='login')
  document.getElementById('signupPanel').classList.toggle('active',tab==='signup')
}`;
const newSwitchTab = `function switchTab(tab){
  document.getElementById('tabLogin').classList.toggle('active',tab==='login')
  document.getElementById('tabSignup').classList.toggle('active',tab==='signup')
  document.getElementById('loginPanel').classList.toggle('active',tab==='login')
  document.getElementById('signupPanel').classList.toggle('active',tab==='signup')
  
  const title = document.getElementById('authModalTitle');
  const desc = document.getElementById('authModalDesc');
  if(title && desc) {
    if(tab === 'login'){
      title.textContent = 'Welcome Back 👋';
      desc.textContent = 'Sign in to drop reviews and help your batch.';
    } else {
      title.textContent = 'Join RandomReviews ✨';
      desc.textContent = 'Create an account to start reviewing places around campus.';
    }
  }
}`;
if (code.includes('function switchTab(tab){')) {
  code = code.replace(/function switchTab\(tab\)\{[\s\S]*?tab==='signup'\)\r?\n?\}/, newSwitchTab);
}

// 2. Remove logos from maps
code = code.replace(/<img class="map-icon-img"[^>]*>/g, '');
code = code.replace(/<span class="map-option-icon">🚗<\/span>/g, '');

// 3. Leaderboard HTML Injection
const lbHtml = `
<!-- LEADERBOARD -->
<section class="charts-section" id="leaderboardSection" style="margin-top:2rem;">
  <div class="charts-header">
    <div class="charts-title-block">
      <div class="section-label">Top Reviewers</div>
      <h2 class="section-title">Hall of Fame 👑</h2>
    </div>
  </div>
  <div class="charts-grid" id="leaderboardGrid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
    <div class="state-box">Loading...</div>
  </div>
</section>
`;
if (!code.includes('id="leaderboardSection"')) {
  code = code.replace('</section>\r\n\r\n<footer>', '</section>\r\n' + lbHtml + '\r\n<footer>');
  code = code.replace('</section>\n\n<footer>', '</section>\n' + lbHtml + '\n<footer>');
}

// 4. Call buildLeaderboard()
if (!code.includes('buildLeaderboard()')) {
  code = code.replace(/buildCharts\(\)/g, 'buildCharts()\n    if(typeof buildLeaderboard === "function") buildLeaderboard()');
}

fs.writeFileSync(file, code);
console.log("UI updated!");
