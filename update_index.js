const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Mobile padding and nav background
code = code.replace(
  `nav {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: 1.25rem 4rem;\n  background: rgba(10, 10, 15, 0.5);`,
  `nav {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: 1rem 1.25rem;\n  background: rgba(10, 10, 15, 0.5);`
);

code = code.replace(
  `.nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(10,10,15,0.95); padding: 1.5rem; gap: 1.5rem; border-bottom: 1px solid var(--border); list-style: none; z-index: 501; }`,
  `.nav-links { display: none; flex-direction: column; position: fixed; top: 70px; left: 0; right: 0; background: var(--bg); padding: 1.5rem; gap: 1.5rem; border-bottom: 1px solid var(--border); list-style: none; z-index: 501; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }`
);

// 2. Hamburger links scrolling
code = code.replace(
  `<li><a href="#" class="active" onclick="filterCat('all',this);return false">All</a></li>`,
  `<li><a href="#" class="active" onclick="filterCat('all',this); document.getElementById('feedSection').scrollIntoView({behavior:'smooth'}); return false">All</a></li>`
);
code = code.replace(
  `<li><a href="#" onclick="filterCat('food',this);return false">Food</a></li>`,
  `<li><a href="#" onclick="filterCat('food',this); document.getElementById('feedSection').scrollIntoView({behavior:'smooth'}); return false">Food</a></li>`
);
code = code.replace(
  `<li><a href="#" onclick="filterCat('spot',this);return false">Spots</a></li>`,
  `<li><a href="#" onclick="filterCat('spot',this); document.getElementById('feedSection').scrollIntoView({behavior:'smooth'}); return false">Spots</a></li>`
);
code = code.replace(
  `<li><a href="#" onclick="filterCat('flat',this);return false">Flats</a></li>`,
  `<li><a href="#" onclick="filterCat('flat',this); document.getElementById('feedSection').scrollIntoView({behavior:'smooth'}); return false">Flats</a></li>`
);
code = code.replace(
  `<li><a href="#" onclick="filterCat('travel',this);return false">Travel</a></li>`,
  `<li><a href="#" onclick="filterCat('travel',this); document.getElementById('feedSection').scrollIntoView({behavior:'smooth'}); return false">Travel</a></li>`
);
code = code.replace(
  `<li><a href="#" onclick="document.getElementById('chartsSection').scrollIntoView({behavior:'smooth'});return false">🏆 Charts</a></li>`,
  `<li><a href="#" onclick="document.getElementById('chartsSection').scrollIntoView({behavior:'smooth'}); return false">🏆 Charts</a></li>`
);

// 3. Mobile Card Stack and spacing
code = code.replace(
  `.hero-right { display: flex; position: relative; z-index: 2; align-items: center; justify-content: center; margin-top: 2rem; padding-bottom: 2rem; transform: scale(0.85); transform-origin: center top; }`,
  `.hero-right { display: flex; position: relative; z-index: 2; align-items: center; justify-content: center; margin-top: 2rem; padding-bottom: 2rem; width: 100%; padding-left: 1.5rem; padding-right: 1.5rem; }`
);
code = code.replace(
  `.card-stack { position: relative; width: 340px; max-width: 90vw; height: 480px; perspective: 1000px; }`,
  `.card-stack { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 360px; margin: 0 auto; perspective: none; height: auto; }`
);
code = code.replace(
  `.review-card {\n  position: absolute; background: var(--surface); border: 1px solid var(--border);\n  backdrop-filter: var(--glass-blur); border-radius: 20px; padding: 1.5rem; width: 320px;\n  box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);\n  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n}`,
  `.review-card {\n  position: static; background: var(--surface); border: 1px solid var(--border);\n  backdrop-filter: var(--glass-blur); border-radius: 20px; padding: 1.5rem; width: 100%;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);\n}\n.review-card:nth-child(n) { opacity: 1; transform: none; animation: none; }`
);
code = code.replace(
  `.hero-right { display: flex; transform: none; margin-top: 0; padding-bottom: 0; }`,
  `.hero-right { display: flex; transform: none; margin-top: 0; padding-bottom: 0; padding-left: 0; padding-right: 0; }\n  .card-stack { position: relative; width: 340px; max-width: 90vw; height: 480px; perspective: 1000px; display: block; padding: 0; margin: 0; }\n  .review-card { position: absolute; width: 320px; box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n  .review-card:nth-child(1) { top: 0; left: 10px; z-index: 3; animation: float1 6s ease-in-out infinite; }\n  .review-card:nth-child(2) { top: 60px; left: -20px; z-index: 2; opacity: 0.8; animation: float2 7s ease-in-out infinite; transform: scale(0.95); }\n  .review-card:nth-child(3) { top: 120px; left: 30px; z-index: 1; opacity: 0.6; animation: float3 8s ease-in-out infinite; transform: scale(0.9); }\n  .review-card:nth-child(4) { top: 180px; left: -10px; z-index: 0; opacity: 0.4; animation: float4 9s ease-in-out infinite; transform: scale(0.85); }\n  .review-card:nth-child(5) { top: 240px; left: 15px; z-index: -1; opacity: 0.2; animation: float5 10s ease-in-out infinite; transform: scale(0.8); }`
);

// 4. Leaderboard HTML
code = code.replace(
  `  <div class="charts-updated">Charts based on reviews from the <span id="weekRange">current week</span></div>\n</section>`,
  `  <div class="charts-updated">Charts based on reviews from the <span id="weekRange">current week</span></div>\n  \n  <div class="charts-header" style="margin-top: 4rem; margin-bottom: 2rem;">\n    <div class="charts-title-block">\n      <div class="section-label">All Time</div>\n      <h2 class="section-title">Top Reviewers 🏆</h2>\n    </div>\n  </div>\n  <div class="charts-grid" id="leaderboardGrid" style="grid-template-columns: 1fr;">\n    <div class="state-box">Building leaderboard...</div>\n  </div>\n</section>`
);

// 5. Timeout logic in loadReviews
code = code.replace(
  `async function loadReviews(){\n  document.getElementById('reviewsGrid').innerHTML='<div class="state-box">Loading reviews...</div>'\n  try{\n    const {data,error}=await db.from('reviews').select('*, profiles(username)').order('created_at',{ascending:false})`,
  `async function loadReviews(){\n  document.getElementById('reviewsGrid').innerHTML='<div class="state-box">Loading reviews...</div>'\n  try{\n    const fetchPromise = db.from('reviews').select('id, created_at, user_id, category, title, body, rating, location_name, image_url, profiles(username)').order('created_at',{ascending:false});\n    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000));\n    \n    const {data,error} = await Promise.race([fetchPromise, timeoutPromise]);`
);
code = code.replace(
  `  }catch(e){\n    console.error(e)\n    document.getElementById('reviewsGrid').innerHTML='<div class="state-box">⚠️ Could not load reviews. See setup instructions above.</div>'\n    document.getElementById('sqlHelper').style.display='block'`,
  `  }catch(e){\n    console.error(e)\n    document.getElementById('reviewsGrid').innerHTML='<div class="state-box" onclick="loadReviews()" style="cursor:pointer">⚠️ Failed to load reviews. Tap to retry.</div>'\n    // document.getElementById('sqlHelper').style.display='block'`
);

// 6. Gated Reviews limit
code = code.replace(
  `  if(!list.length){\n    grid.innerHTML='<div class="empty-state"><div class="icon">🏜️</div><h3>Nothing here yet</h3><p>Be the first to drop a review in this category.</p></div>'\n    return\n  }\n\n  const html=list.map(r=>{`,
  `  let isLimited = false;\n  let remainingCount = 0;\n  if (!currentUser && list.length > 5) {\n    remainingCount = list.length - 5;\n    list = list.slice(0, 5);\n    isLimited = true;\n  }\n\n  if(!list.length){\n    grid.innerHTML='<div class="empty-state"><div class="icon">🏜️</div><h3>Nothing here yet</h3><p>Be the first to drop a review in this category.</p></div>'\n    return\n  }\n\n  let html=list.map(r=>{`
);

let findStr = `      </div>\n    \`\n  }).join('')\n\n  grid.innerHTML=html\n}`;
let replaceStr = `      </div>\n    \`\n  }).join('')\n  \n  if (isLimited) {\n    html += \`\n      <div class="r-card locked-card" onclick="openAuth()" style="cursor:pointer; display:flex; align-items:center; justify-content:center; text-align:center; padding: 3rem 1.5rem; background: rgba(0,0,0,0.4); border: 1px dashed var(--border);">\n        <div style="filter: blur(4px); opacity: 0.3; position:absolute; inset:0; pointer-events:none;"></div>\n        <div style="z-index:2; position:relative;">\n          <div style="font-size:2rem; margin-bottom:1rem;">🔒</div>\n          <h3 style="font-size:1.25rem; margin-bottom:0.5rem; color:#fff;">Login to see more</h3>\n          <p style="font-size:0.85rem; color:var(--muted);">Join SRM's community to read \${remainingCount} more reviews.</p>\n        </div>\n      </div>\n    \`;\n  }\n  \n  grid.innerHTML=html\n}`;

code = code.replace(findStr, replaceStr);

// 7. Hamburger outside click and Leaderboard JS
code = code.replace(
  `// ── WEEKLY TOP CHARTS ─────────────────────────────────────────\nfunction buildCharts(){\n  const grid=document.getElementById('chartsGrid')`,
  `// ── WEEKLY TOP CHARTS ─────────────────────────────────────────\nfunction buildCharts(){\n  buildLeaderboard();\n  const grid=document.getElementById('chartsGrid')`
);

const leaderboardCode = `
// ── LEADERBOARD ───────────────────────────────────────────────
function buildLeaderboard() {
  const lbGrid = document.getElementById('leaderboardGrid');
  if(!lbGrid) return;
  if(!allReviews.length){
    lbGrid.innerHTML='<div class="state-box">No reviewers yet!</div>';
    return;
  }
  
  const userMap = {};
  allReviews.forEach(r => {
    const uid = r.user_id || r.username; // fallback to username if no uid
    if (!uid) return;
    if (!userMap[uid]) {
      userMap[uid] = { 
        id: uid,
        username: r.profiles?.username || r.username || 'anon',
        count: 0,
        totalRating: 0,
        firstDate: new Date(r.created_at)
      };
    }
    userMap[uid].count++;
    userMap[uid].totalRating += r.rating;
    const rDate = new Date(r.created_at);
    if (rDate < userMap[uid].firstDate) {
      userMap[uid].firstDate = rDate;
    }
  });
  
  const sortedUsers = Object.values(userMap).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    
    const avgA = a.totalRating / a.count;
    const avgB = b.totalRating / b.count;
    if (Math.abs(avgB - avgA) > 0.01) return avgB - avgA;
    
    return a.firstDate - b.firstDate;
  });
  
  const rankClass = ['r1','r2','r3'];
  const rankLabel = ['🥇','🥈','🥉'];
  
  const itemsHTML = sortedUsers.slice(0, 10).map((u, i) => \`
    <div class="chart-item">
      <span class="chart-rank \${rankClass[i] || 'rn'}\">\${rankLabel[i] || (i+1)}</span>
      <span class="chart-name" title="@\${esc(u.username)}">@\${esc(u.username)}</span>
      <span class="chart-score">\${(u.totalRating / u.count).toFixed(1)}★ avg</span>
      <span class="chart-reviews">\${u.count} reviews</span>
    </div>
  \`).join('');
  
  lbGrid.innerHTML = \`
    <div class="chart-card" style="width: 100%;">
      <div class="chart-podium">\${itemsHTML}</div>
    </div>
  \`;
}
`;

code = code.replace(
  `// ── COUNTDOWN to next Sunday 5pm IST ──────────────────────────`,
  leaderboardCode + '\n// ── COUNTDOWN to next Sunday 5pm IST ──────────────────────────'
);

code = code.replace(
  `document.addEventListener('DOMContentLoaded', () => {\n  document.querySelectorAll('.nav-links a, .nav-right button').forEach(el => {\n    el.addEventListener('click', () => {\n      const nav = document.querySelector('.nav-links');\n      if (nav && nav.classList.contains('active')) {\n        nav.classList.remove('active');\n        const btn = document.querySelector('.hamburger');\n        if (btn) btn.textContent = '☰';\n      }\n    });\n  });\n});`,
  `document.addEventListener('click', (e) => {\n  const nav = document.querySelector('.nav-links');\n  const btn = document.querySelector('.hamburger');\n  if (nav && nav.classList.contains('active')) {\n    if (e.target.closest('.nav-links a') || e.target.closest('.nav-right button') || !e.target.closest('nav')) {\n      nav.classList.remove('active');\n      if (btn) btn.textContent = '☰';\n    }\n  }\n});`
);

fs.writeFileSync('index.html', code);
console.log('Update complete!');
