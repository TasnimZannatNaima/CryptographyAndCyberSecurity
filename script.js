const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function mod(n, m) { return ((n % m) + m) % m; }
function modInverse(a, m) { a = mod(a, m); for (let i = 1; i < m; i++) if ((a * i) % m === 1) return i; return null; }

// ---- THEORY TABS ----
window.showTheory = function(t) {
  document.querySelectorAll('.theory-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.theory-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('th-'+t).classList.add('active');
};
window.showLab = function(t) {
  document.querySelectorAll('.lab-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.lab-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('lab-'+t).classList.add('active');
};

// ========== MONOALPHABETIC ==========
function monoRenderAlpha(key) {
  const plainRow = document.getElementById('mono-plain-row');
  const cipherRow = document.getElementById('mono-cipher-row');
  plainRow.innerHTML = ''; cipherRow.innerHTML = '';
  for (let i=0;i<26;i++) {
    let pDiv = document.createElement('div'); pDiv.textContent = A[i];
    let cDiv = document.createElement('div'); cDiv.textContent = key[i] || '?';
    plainRow.appendChild(pDiv); cipherRow.appendChild(cDiv);
  }
}
window.monoFromKeyword = function() {
  let kw = document.getElementById('mono-keyword').value.toUpperCase().replace(/[^A-Z]/g, '');
  if (!kw) { document.getElementById('mono-err').innerText = 'Enter keyword'; return; }
  let seen = new Set(), key = '';
  for(let c of kw) if(!seen.has(c)){ seen.add(c); key+=c; }
  for(let c of A) if(!seen.has(c)){ seen.add(c); key+=c; }
  document.getElementById('mono-key').value = key;
  monoRenderAlpha(key);
  document.getElementById('mono-err').innerText = '';
};
window.monoRandomKey = function() {
  let arr = [...A];
  for (let i=arr.length-1;i>0;i--) { let j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  let key = arr.join('');
  document.getElementById('mono-key').value = key;
  monoRenderAlpha(key);
};
window.monoRun = function(mode) {
  let key = document.getElementById('mono-key').value.toUpperCase();
  let unique = new Set(key.split(''));
  if(key.length !== 26 || unique.size !== 26){
    document.getElementById('mono-err').innerText = 'Key must have 26 unique letters A-Z.';
    return;
  }
  let input = document.getElementById('mono-input').value.toUpperCase();
  let result='', steps='';
  for(let ch of input){
    let idx = A.indexOf(ch);
    if(idx===-1){ result+=ch; steps+=ch+' '; continue; }
    if(mode==='enc') { let c = key[idx]; result+=c; steps+=`${ch}→${c} `; }
    else { let pos = key.indexOf(ch); let p = pos>=0?A[pos]:ch; result+=p; steps+=`${ch}→${p} `; }
  }
  document.getElementById('mono-output').innerHTML = result || '—';
  document.getElementById('mono-steps').innerHTML = steps || '(no transformation)';
};
window.clearMono = function(){ document.getElementById('mono-input').value=''; document.getElementById('mono-output').innerHTML='—'; document.getElementById('mono-steps').innerHTML=''; };

// ========== PLAYFAIR ==========
function pfBuildSquare(keyword){
  keyword = keyword.toUpperCase().replace(/J/g,'I').replace(/[^A-Z]/g,'');
  let seen = new Set(), sq='';
  for(let c of keyword) if(!seen.has(c)){ seen.add(c); sq+=c; }
  for(let c of A.replace('J','')) if(!seen.has(c)){ seen.add(c); sq+=c; }
  return sq;
}
function pfPos(sq, c){ let i=sq.indexOf(c); return {row:Math.floor(i/5), col:i%5}; }
function pfEncryptPair(sq, a, b, decrypt){
  let pa=pfPos(sq,a), pb=pfPos(sq,b);
  if(pa.row===pb.row){
    let shift = decrypt?-1:1;
    return sq[pa.row*5+mod(pa.col+shift,5)] + sq[pb.row*5+mod(pb.col+shift,5)];
  } else if(pa.col===pb.col){
    let shift = decrypt?-1:1;
    return sq[mod(pa.row+shift,5)*5+pa.col] + sq[mod(pb.row+shift,5)*5+pb.col];
  } else {
    return sq[pa.row*5+pb.col] + sq[pb.row*5+pa.col];
  }
}
function pfPrepare(text, decrypt){
  text = text.toUpperCase().replace(/J/g,'I').replace(/[^A-Z]/g,'');
  if(!decrypt){
    let prep='', i=0;
    while(i<text.length){
      if(i+1>=text.length){ prep+=text[i]+'X'; break; }
      let a=text[i], b=text[i+1];
      if(a===b){ prep+=a+'X'; i++; }
      else { prep+=a+b; i+=2; }
    }
    return prep;
  } else {
    if(text.length%2!==0) text+='X';
    return text;
  }
}
window.pfUpdate = function(){
  let kw = document.getElementById('pf-key').value;
  if(!kw) return;
  let sq = pfBuildSquare(kw);
  let grid=''; for(let i=0;i<5;i++) grid+=sq.slice(i*5,i*5+5).split('').join(' ') + '\n';
  document.getElementById('pf-square').innerHTML = `<pre style="margin:0;font-family:monospace;">${grid}</pre>`;
};
window.pfRun = function(mode){
  let kw = document.getElementById('pf-key').value;
  if(!kw){ document.getElementById('pf-err').innerText='Enter keyword'; return; }
  let sq = pfBuildSquare(kw);
  let raw = document.getElementById('pf-input').value;
  // preserve non-letter characters (spaces, punctuation)
  const orig = raw.split('');
  const letters = orig.map(c=>c.toUpperCase()).filter(c=>/[A-Z]/.test(c)).map(c=>c==='J'?'I':c).join('');
  const prep = pfPrepare(letters, mode==='dec');
  let outLetters = '' , steps='';
  for(let i=0;i<prep.length;i+=2){
    let a=prep[i], b=prep[i+1]||'X';
    let out = pfEncryptPair(sq,a,b,mode==='dec');
    outLetters+=out;
    let pa=pfPos(sq,a), pb=pfPos(sq,b);
    let rule = (pa.row===pb.row)?'same row':(pa.col===pb.col)?'same col':'rectangle';
    steps+=`${a}${b} → ${out} (${rule})\n`;
  }
  // reconstruct result by placing encrypted letters back into original positions
  let result=''; let li=0;
  for(let i=0;i<orig.length;i++){
    if(/[A-Za-z]/.test(orig[i])){
      result += outLetters[li]||''; li += 1;
    } else {
      result += orig[i];
    }
  }
  // if there are leftover encrypted letters (due to padding), append them
  if(li < outLetters.length) result += outLetters.slice(li);
  document.getElementById('pf-output').innerHTML = result || '—';
  document.getElementById('pf-steps').innerHTML = steps || '(no transformation)';
  document.getElementById('pf-err').innerText='';
};
window.clearPf = function(){ document.getElementById('pf-input').value=''; document.getElementById('pf-output').innerHTML='—'; document.getElementById('pf-steps').innerHTML=''; };

// ========== HILL ==========
function getHillKey(){ return [[parseInt(document.getElementById('h00').value)||0, parseInt(document.getElementById('h01').value)||0],[parseInt(document.getElementById('h10').value)||0, parseInt(document.getElementById('h11').value)||0]]; }
function hillDet(K){ return mod(K[0][0]*K[1][1]-K[0][1]*K[1][0],26); }
function hillInverse(K){
  let det=hillDet(K), detInv=modInverse(det,26);
  if(detInv===null) return null;
  return [[mod(detInv*K[1][1],26), mod(-detInv*K[0][1],26)],[mod(-detInv*K[1][0],26), mod(detInv*K[0][0],26)]];
}
window.hillRandom = function(){
  let validDets=[1,3,5,7,9,11,15,17,19,21,23,25];
  let K,det;
  do {
    let a=Math.floor(Math.random()*26), b=Math.floor(Math.random()*26), c=Math.floor(Math.random()*26), d=Math.floor(Math.random()*26);
    K=[[a,b],[c,d]]; det=hillDet(K);
  } while(!validDets.includes(det));
  document.getElementById('h00').value=K[0][0]; document.getElementById('h01').value=K[0][1];
  document.getElementById('h10').value=K[1][0]; document.getElementById('h11').value=K[1][1];
  hillLabUpdate();
};
function hillLabUpdate(){
  let K=getHillKey(); let det=hillDet(K); let invFlag=modInverse(det,26)!==null;
  document.getElementById('hill-info').innerHTML = `det = ${det} | ${invFlag?'✓ invertible (decrypt ready)':'✗ not invertible (decrypt impossible)'}`;
}
window.hillRun = function(mode){
  let K=getHillKey(); let det=hillDet(K);
  if(mode==='dec'){
    let invMat = hillInverse(K);
    if(invMat===null){ document.getElementById('hill-err').innerText='Error: matrix not invertible mod 26 (det not coprime)'; return; }
    K=invMat;
  }
  // preserve non-letter chars (spaces, punctuation)
  const raw = document.getElementById('hill-input').value;
  const orig = raw.split('');
  let letters = orig.map(c=>c.toUpperCase()).filter(c=>/[A-Z]/.test(c)).join('');
  if(letters.length%2!==0) letters += 'X';
  let outLetters = '', steps='';
  for(let i=0;i<letters.length;i+=2){
    let p1=A.indexOf(letters[i]), p2=A.indexOf(letters[i+1]);
    let c1=mod(K[0][0]*p1+K[0][1]*p2,26);
    let c2=mod(K[1][0]*p1+K[1][1]*p2,26);
    outLetters += A[c1] + A[c2];
    steps+=`[${letters[i]}${letters[i+1]}] → [${p1},${p2}] → (${K[0][0]}·${p1}+${K[0][1]}·${p2}=${c1}, ${K[1][0]}·${p1}+${K[1][1]}·${p2}=${c2}) = ${A[c1]}${A[c2]}\n`;
  }
  // reconstruct result by placing output letters back into original positions
  let result=''; let li=0;
  for(let i=0;i<orig.length;i++){
    if(/[A-Za-z]/.test(orig[i])){ result += outLetters[li]||''; li += 1; }
    else result += orig[i];
  }
  if(li < outLetters.length) result += outLetters.slice(li);
  document.getElementById('hill-output').innerHTML=result || '—';
  document.getElementById('hill-steps').innerHTML=steps || '(no transformation)';
  document.getElementById('hill-err').innerText='';
  hillLabUpdate();
};
window.clearHill = function(){ document.getElementById('hill-input').value=''; document.getElementById('hill-output').innerHTML='—'; document.getElementById('hill-steps').innerHTML=''; hillLabUpdate(); };

// INITIALIZATION
window.addEventListener('load',()=>{
  monoFromKeyword();
  pfUpdate();
  hillLabUpdate();
  document.getElementById('mono-keyword').value='MONARCHY'; monoFromKeyword();
  const observer = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const sections=document.querySelectorAll('section[id]'), links=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    let cur='';
    sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-100) cur=s.id; });
    links.forEach(l=>{ l.classList.toggle('active',l.getAttribute('href')==='#'+cur); });
  });
  document.getElementById('mono-key').value='MONARCHYBDFEGIJKLPQSTUVWXZ'; monoRenderAlpha('MONARCHYBDFEGIJKLPQSTUVWXZ');
});