const fs = require('fs');
let code = fs.readFileSync('c:\\Users\\aadij\\Downloads\\Random-Reviews\\index.html', 'utf-8');

// 1. Add animation CSS
const animCss = `
/* REVIEW CARD ANIMATION */
@keyframes slideBounceIn {
  0% { opacity: 0; transform: translateY(40px) scale(0.95); }
  60% { opacity: 1; transform: translateY(-5px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.r-card.animate-in {
  animation: slideBounceIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}
`;
if (!code.includes('slideBounceIn')) {
  code = code.replace('</style>', animCss + '\n</style>');
}

// 2. Update renderReviews
const oldRenderListSort = `  // Sort reviews
  list.sort((a,b)=>{
    if(currentSort==='newest') return new Date(b.created_at) - new Date(a.created_at);
    if(currentSort==='oldest') return new Date(a.created_at) - new Date(b.created_at);
    if(currentSort==='highest') return b.rating - a.rating;
    if(currentSort==='lowest') return a.rating - b.rating;
  });`;

const newRenderListSort = `  // Filter out samples if we have enough real reviews
  const sampleTitles = ["Saravana Bhavan Near Gate 3", "Terrace Behind C Block", "Sai Residency, Potheri"];
  const realReviewsCount = allReviews.filter(r => !sampleTitles.includes(r.title)).length;
  if (realReviewsCount >= 10) {
    list = list.filter(r => !sampleTitles.includes(r.title));
  }

  // Sort reviews
  list.sort((a,b)=>{
    if(currentSort==='newest') return new Date(b.created_at) - new Date(a.created_at);
    if(currentSort==='oldest') return new Date(a.created_at) - new Date(b.created_at);
    if(currentSort==='highest') return b.rating - a.rating;
    if(currentSort==='lowest') return a.rating - b.rating;
  });`;
code = code.replace(oldRenderListSort, newRenderListSort);

const oldMapIter = `  grid.innerHTML=list.map(r=>{
    const stars='★'.repeat(r.rating)+'☆'.repeat(5-r.rating)`;

const newMapIter = `  grid.innerHTML=list.map((r, idx)=>{
    const sampleTitles = ["Saravana Bhavan Near Gate 3", "Terrace Behind C Block", "Sai Residency, Potheri"];
    const isSample = sampleTitles.includes(r.title);
    const sampleBadge = isSample ? '<div style="position:absolute; top:1rem; right:1rem; background:rgba(0,0,0,0.5); color:var(--muted); font-size:0.6rem; font-weight:700; padding:0.25rem 0.5rem; border-radius:100px; border:1px solid var(--border); letter-spacing:0.05em; z-index:10; pointer-events:none; backdrop-filter:blur(4px);">SAMPLE</div>' : '';
    const delay = (idx * 0.05).toFixed(2);
    const stars='★'.repeat(r.rating)+'☆'.repeat(5-r.rating)`;
code = code.replace(oldMapIter, newMapIter);

const oldCardHTML = `return \`<div class="r-card \${r.category}" onclick="openDetail('\${r.id}')" style="cursor:pointer">\${img}<div class="card-tag \${tagMap[r.category]}">\${catLabel[r.category]}</div><div class="r-card-title">\${esc(r.title)}</div><div class="r-card-body">\${esc(r.body)}</div>\${locHtml}\${aggHtml}<div class="r-card-meta" style="margin-top:.75rem"><span class="stars">\${stars}</span><span class="r-card-author">@\${esc(uname)} · \${date}</span></div></div>\``;

const newCardHTML = `return \`<div class="r-card \${r.category} animate-in" onclick="openDetail('\${r.id}')" style="cursor:pointer; animation-delay: \${delay}s;">\${sampleBadge}\${img}<div class="card-tag \${tagMap[r.category]}">\${catLabel[r.category]}</div><div class="r-card-title">\${esc(r.title)}</div><div class="r-card-body">\${esc(r.body)}</div>\${locHtml}\${aggHtml}<div class="r-card-meta" style="margin-top:.75rem"><span class="stars">\${stars}</span><span class="r-card-author">@\${esc(uname)} · \${date}</span></div></div>\``;

code = code.replace(oldCardHTML, newCardHTML);

fs.writeFileSync('c:\\Users\\aadij\\Downloads\\Random-Reviews\\index.html', code);
console.log("Done");
