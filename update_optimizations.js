const fs = require('fs');
let code = fs.readFileSync('c:\\Users\\aadij\\Downloads\\Random-Reviews\\index.html', 'utf-8');

// 1. Fix doLogin
const oldLoginBlockRegex = /async function doLogin\(\)\{[\s\S]*?else\{sucEl\.style\.display='block'; showToast\('Account created! 📬','success'\); setTimeout\(\(\) => closeModal\('authModal'\), 1500\);\}\s*\}/;

const newLoginBlock = `async function doLogin(){
  const email=document.getElementById('loginEmail').value.trim()
  const pass=document.getElementById('loginPassword').value
  const errEl=document.getElementById('loginError')
  const btn=document.getElementById('loginBtn2')
  errEl.style.display='none'
  if(!email||!pass){showErr(errEl,'Fill in all fields');return}
  btn.disabled=true;btn.textContent='Logging in...'
  const {error}=await db.auth.signInWithPassword({email,password:pass})
  btn.disabled=false;btn.textContent='Login →'
  if(error){
    if(error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')) {
      showErr(errEl, error.message);
    } else {
      console.error(error);
      showErr(errEl, 'Something went wrong, try again');
    }
  }
  else {
    showToast('Logged in! 👋', 'success');
  }
}`;

code = code.replace(oldLoginBlockRegex, newLoginBlock);

// 2. Restore doSignup
const signupCode = `
async function doSignup(){
  const email=document.getElementById('signupEmail').value.trim()
  const pass=document.getElementById('signupPassword').value
  const username=document.getElementById('signupUsername').value.trim()
  const errEl=document.getElementById('signupError')
  const sucEl=document.getElementById('signupSuccess')
  const btn=document.getElementById('signupBtn2')
  errEl.style.display='none'; sucEl.style.display='none'
  if(!email||!pass||!username){showErr(errEl,'Fill in all fields');return}
  if(pass.length<8){showErr(errEl,'Password needs at least 8 characters');return}
  btn.disabled=true;btn.textContent='Creating account...'
  
  const {data,error}=await db.auth.signUp({
    email, password:pass, options:{data:{username}}
  })
  btn.disabled=false;btn.textContent='Create Account →'
  if(error){
    if(error.message.includes('unique constraint') || error.message.includes('duplicate key value')) {
      showErr(errEl, 'Username @' + username + ' is already taken — pick another one');
    } else if(error.message.includes('weak_password') || error.message.includes('Password')) {
      showErr(errEl, error.message);
    } else {
      console.error(error);
      showErr(errEl, 'Something went wrong: ' + error.message);
    }
  } else {
    if(data?.user?.id) {
      await db.from('profiles').upsert({ id: data.user.id, username });
    }
    sucEl.style.display='block'; 
    showToast('Account created! Check your email. 📬', 'success');
    setTimeout(() => {
      switchTab('login');
      document.getElementById('loginEmail').value = email;
    }, 2000);
  }
}
`;

if(!code.includes('async function doSignup()')) {
  code = code.replace('async function doLogout(){', signupCode + '\nasync function doLogout(){');
}

// 3. Optimize loadReviews
code = code.replace(
  /document\.getElementById\('reviewsGrid'\)\.innerHTML='<div class="state-box">Loading reviews\.\.\.<\/div>'/,
  `if(allReviews.length === 0) {
    document.getElementById('reviewsGrid').innerHTML='<div class="state-box">Loading reviews...</div>'
  }`
);

// 4. Optimistic UI for submitReview
const submitReviewRegex = /const \{error\}=await db\.from\('reviews'\)\.insert\(\{[\s\S]*?\}\)[\s\S]*?btn\.textContent='Post Review →'[\s\S]*?buildLeaderboard\(\)\s*\}/;

const newSubmitBlock = `
  const {data: insertedRows, error}=await db.from('reviews').insert({
    user_id:currentUser.id, username:uname,
    title, body, category, rating:currentRating,
    location_name:location||null, image_url:imageUrl,
    lat:currentLat||null, lng:currentLng||null
  }).select('*, profiles(username)');

  btn.disabled=false;btn.textContent='Post Review →'
  if(error){
    if(error.message.includes('policy')||error.message.includes('permission')){
      showErr(errEl,'DB not set up yet — run the SQL setup from the panel above first.');
    } else {
      console.error(error);
      showErr(errEl,'Something went wrong, try again');
    }
  } else {
    showToast('Review posted! 🔥 Keeping it real.','success')
    closeModal('reviewModal')
    resetForm()
    
    if (insertedRows && insertedRows.length > 0) {
      allReviews.unshift(insertedRows[0]);
    }
    renderReviews();
    buildTicker();
    buildCharts(); buildLeaderboard();
  }
`;

code = code.replace(submitReviewRegex, newSubmitBlock.trim());

fs.writeFileSync('c:\\Users\\aadij\\Downloads\\Random-Reviews\\index.html', code);
console.log('Optimizations applied.');
