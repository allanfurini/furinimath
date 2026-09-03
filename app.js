
const modules = [
  ['👋','Fundamentos','Mãos, falanges, ordens e valor posicional.'],
  ['🔢','Chisanbop','Representação 0–99 e complementos.'],
  ['💻','Binário','Potências de 2 até 1023.'],
  ['🧮','Soroban','Base 1–4, conta de 5 e operações.'],
  ['✋','Método Furini','Três ordens em mãos sobrepostas.'],
  ['➕','Soma','Mesma lógica do soroban.'],
  ['➖','Subtração','Complementos e empréstimos.'],
  ['✖️','Multiplicação','Estratégias por decomposição.'],
  ['➗','Divisão','Raciocínio posicional.'],
  ['⚡','Velocidade','Automatização e treino.']
];
let state = JSON.parse(localStorage.getItem('furinimath_v3') || '{"xp":0,"done":[]}');
let view = 'frente';
let target = 482;
let animating = false;
const $ = s => document.querySelector(s);

function enc(n){
  n = Math.max(0, Math.min(999, parseInt(n)||0));
  const u = n % 10, d = Math.floor(n/10)%10, c = Math.floor(n/100)%10;
  return { n, u, d, c, ub:u%5, u5:u>=5, db:d%5, d5:d>=5, cb:c%5, c5:c>=5 };
}

function rowDots(x0,y,color,active){
  let out='';
  for(let i=1;i<=4;i++){
    const x=x0+(i-1)*28;
    out += `<circle cx="${x}" cy="${y}" r="${i===active?8:6}" fill="${i===active?color:'#dfe3f2'}" stroke="${color}" stroke-width="${i===active?3:1.5}" />`;
    out += `<text x="${x}" y="${y+24}" font-size="11" fill="#75809a" text-anchor="middle">${i}</text>`;
  }
  return out;
}

function handSvg(s, showStep=3){
  const xr = view==='raiox';
  const back = view==='verso';
  const showC = showStep>=1, showD = showStep>=2, showU = showStep>=3;
  const unitBaseX = 376 + (s.ub ? (s.ub-1)*28 : 0);
  const tenBaseX = 376 + (s.db ? (s.db-1)*28 : 0);
  const cenBaseX = 376 + (s.cb ? (s.cb-1)*28 : 0);
  const title = view==='frente' ? 'VISTA FRONTAL' : view==='verso' ? 'VISTA POSTERIOR' : 'VISTA RAIO‑X';

  return `
  <svg class="furiniSvg" viewBox="0 0 860 620" aria-label="Representação virtual do Método Furini para ${s.n}">
    <defs>
      <linearGradient id="bgG" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f6f2ff"/></linearGradient>
      <linearGradient id="skinG" x1="0" x2="1"><stop offset="0" stop-color="#f7d0b7"/><stop offset="1" stop-color="#eeb896"/></linearGradient>
      <linearGradient id="skinG2" x1="0" x2="1"><stop offset="0" stop-color="#efc2a4"/><stop offset="1" stop-color="#dfa27f"/></linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#291f6d" flood-opacity=".12"/></filter>
    </defs>
    <rect x="10" y="10" width="840" height="600" rx="28" fill="url(#bgG)" />
    <text x="34" y="48" font-size="16" font-weight="900" fill="#6b4dff">${title}</text>
    <text x="740" y="52" font-size="40" font-weight="1000" fill="#1b2340">${String(s.n).padStart(3,'0')}</text>

    <!-- labels -->
    <g opacity=".9">
      <text x="75" y="171" font-size="14" font-weight="900" fill="#8967ff">CENTENA</text>
      <text x="90" y="286" font-size="14" font-weight="900" fill="#30a7ff">DEZENA</text>
      <text x="87" y="404" font-size="14" font-weight="900" fill="#ff7b61">UNIDADE</text>
    </g>

    <!-- guide rows -->
    <g opacity=".95">
      <line x1="172" y1="160" x2="695" y2="160" stroke="#ece8ff" stroke-width="2" />
      <line x1="172" y1="276" x2="695" y2="276" stroke="#e8f3ff" stroke-width="2" />
      <line x1="172" y1="392" x2="695" y2="392" stroke="#fff0ec" stroke-width="2" />
      ${rowDots(376,160,'#8967ff',showC?s.cb:0)}
      ${rowDots(376,276,'#30a7ff',showD?s.db:0)}
      ${rowDots(376,392,'#ff7b61',showU?s.ub:0)}
    </g>

    <!-- right hand base -->
    <g filter="url(#softShadow)">
      <rect x="316" y="178" width="280" height="272" rx="95" fill="url(#skinG)" stroke="#d59d78" stroke-width="3" />
      <rect x="336" y="52" width="52" height="228" rx="26" fill="url(#skinG)" stroke="#d59d78" stroke-width="3" />
      <rect x="400" y="35" width="56" height="245" rx="28" fill="url(#skinG)" stroke="#d59d78" stroke-width="3" />
      <rect x="468" y="46" width="54" height="234" rx="27" fill="url(#skinG)" stroke="#d59d78" stroke-width="3" />
      <rect x="534" y="78" width="49" height="202" rx="24" fill="url(#skinG)" stroke="#d59d78" stroke-width="3" />
      <path d="M314 344 C252 328, 225 292, 214 260 C206 236,214 212,234 205 C253 197,281 209,299 230 C312 246,319 265,323 283" fill="url(#skinG)" stroke="#d59d78" stroke-width="3" />
    </g>

    <!-- phalange guide stripes -->
    <g opacity=".35">
      <line x1="336" y1="122" x2="582" y2="122" stroke="#8f644e" stroke-width="2" />
      <line x1="336" y1="188" x2="582" y2="188" stroke="#8f644e" stroke-width="2" />
      <line x1="336" y1="244" x2="582" y2="244" stroke="#8f644e" stroke-width="2" />
    </g>

    <!-- left hand overlay / virtual -->
    <g opacity="${back?'.9':'1'}" filter="url(#softShadow)">
      <path d="M286 470 C280 396,293 320,318 286 C333 266,356 260,375 273 C395 286,396 315,390 342 C377 399,348 446,326 481" fill="url(#skinG2)" stroke="#c98f6b" stroke-width="3" />
      <path d="M468 482 C472 410,503 339,544 279 C557 261,579 248,597 256 C617 266,618 293,607 317 C575 382,542 431,515 478" fill="url(#skinG2)" stroke="#c98f6b" stroke-width="3" />
      ${showC && s.c5 ? `<rect x="342" y="98" width="34" height="350" rx="17" fill="#b29cff" opacity=".96" stroke="#6d51f5" stroke-width="3" />` : `<rect x="342" y="98" width="34" height="350" rx="17" fill="url(#skinG2)" stroke="#c98f6b" stroke-width="3" />`}
      ${showD && s.d5 ? `<rect x="405" y="84" width="34" height="362" rx="17" fill="#7fd0ff" opacity=".96" stroke="#1c95eb" stroke-width="3" />` : `<rect x="405" y="84" width="34" height="362" rx="17" fill="url(#skinG2)" stroke="#c98f6b" stroke-width="3" />`}
      ${showU && s.u5 ? `<rect x="468" y="102" width="34" height="346" rx="17" fill="#ffae9d" opacity=".98" stroke="#f35f42" stroke-width="3" />` : `<rect x="468" y="102" width="34" height="346" rx="17" fill="url(#skinG2)" stroke="#c98f6b" stroke-width="3" />`}
    </g>

    <!-- highlighted labels for quinaries -->
    <g>
      ${showC && s.c5 ? `<g><circle cx="359" cy="84" r="12" fill="#8967ff"/><text x="378" y="89" font-size="14" font-weight="900" fill="#8967ff">+500</text></g>` : ''}
      ${showD && s.d5 ? `<g><circle cx="422" cy="70" r="12" fill="#30a7ff"/><text x="441" y="75" font-size="14" font-weight="900" fill="#30a7ff">+50</text></g>` : ''}
      ${showU && s.u5 ? `<g><circle cx="485" cy="88" r="12" fill="#ff7b61"/><text x="504" y="93" font-size="14" font-weight="900" fill="#ff7b61">+5</text></g>` : ''}
    </g>

    <!-- base thumbs -->
    ${showD && s.db ? `<path d="M314 290 C262 276,220 282,197 304 C182 318,186 340,204 349 C231 363,274 348,320 329" fill="#6fc7ff" opacity=".95" stroke="#158ddd" stroke-width="3" />
      <circle cx="${tenBaseX}" cy="276" r="13" fill="#30a7ff" stroke="#fff" stroke-width="4" /><text x="${tenBaseX}" y="280" font-size="11" text-anchor="middle" font-weight="900" fill="#fff">${s.db}</text>` : ''}
    ${showC && s.cb ? `<path d="M602 220 C659 213,702 225,726 247 C742 261,737 286,717 291 C688 299,650 281,597 258" fill="#a78eff" opacity=".97" stroke="#6d51f5" stroke-width="3" />
      <circle cx="${cenBaseX}" cy="160" r="13" fill="#8967ff" stroke="#fff" stroke-width="4" /><text x="${cenBaseX}" y="164" font-size="11" text-anchor="middle" font-weight="900" fill="#fff">${s.cb}</text>` : ''}

    <!-- hidden pinky / unit base -->
    ${showU && s.ub ? `${(xr || back)
      ? `<path d="M262 428 C236 404,236 383,255 365 C283 338,315 352,${unitBaseX-28} 392" fill="none" stroke="#ff7b61" stroke-width="18" stroke-linecap="round" opacity=".95" />`
      : `<path d="M265 422 C242 399,240 382,255 368 C275 350,306 354,${unitBaseX-26} 392" fill="none" stroke="#ff7b61" stroke-width="15" stroke-linecap="round" opacity=".18" stroke-dasharray="12 8" />`}
      <circle cx="${unitBaseX}" cy="392" r="13" fill="#ff7b61" stroke="#fff" stroke-width="4" />
      <text x="${unitBaseX}" y="396" font-size="11" text-anchor="middle" font-weight="900" fill="#fff">${s.ub}</text>` : ''}

    <!-- xray translucent overlay -->
    ${xr ? `<rect x="316" y="178" width="280" height="272" rx="95" fill="#ffffff" opacity=".25" />` : ''}

    <!-- annotations -->
    <g>
      <text x="648" y="142" font-size="13" fill="#8967ff" font-weight="900">Base da centena</text>
      <text x="140" y="316" font-size="13" fill="#30a7ff" font-weight="900">Base da dezena</text>
      <text x="143" y="435" font-size="13" fill="#ff7b61" font-weight="900">Base da unidade</text>
      <line x1="642" y1="146" x2="cenBaseX||376" y2="160" stroke="#8967ff" stroke-width="2" opacity="${showC && s.cb ? 1 : 0.35}" />
      <line x1="232" y1="320" x2="tenBaseX||376" y2="276" stroke="#30a7ff" stroke-width="2" opacity="${showD && s.db ? 1 : 0.35}" />
      <line x1="230" y1="438" x2="unitBaseX||376" y2="392" stroke="#ff7b61" stroke-width="2" opacity="${showU && s.ub ? 1 : 0.35}" />
    </g>

    <!-- key / footer -->
    <rect x="54" y="530" width="752" height="50" rx="16" fill="#ffffff" stroke="#e6e8f6" />
    <text x="78" y="561" font-size="14" fill="#1b2340">C = ${(showC && s.c5)?500:0} + ${(showC?s.cb:0)*100} • D = ${(showD && s.d5)?50:0} + ${(showD?s.db:0)*10} • U = ${(showU && s.u5)?5:0} + ${(showU?s.ub:0)}</text>
  </svg>`;
}

function render(n){
  const s = enc(n ?? $('#num').value);
  $('#num').value = s.n;
  $('#outN').textContent = String(s.n).padStart(3,'0');
  $('#cDesc').textContent = `${s.c5?500:0} + ${s.cb*100} = ${s.c*100}`;
  $('#dDesc').textContent = `${s.d5?50:0} + ${s.db*10} = ${s.d*10}`;
  $('#uDesc').textContent = `${s.u5?5:0} + ${s.ub} = ${s.u}`;
  $('#formula').textContent = `${String(s.n).padStart(3,'0')} = (${s.c5?500:0}+${s.cb*100}) + (${s.d5?50:0}+${s.db*10}) + (${s.u5?5:0}+${s.ub})`;
  $('#svgWrap').innerHTML = handSvg(s,3);
}

function animateBuild(){
  if(animating) return;
  animating = true;
  const s = enc($('#num').value);
  const steps = [0,1,2,3];
  let i=0;
  const tick = ()=>{
    $('#svgWrap').innerHTML = handSvg(s,steps[i]);
    i++;
    if(i<steps.length) setTimeout(tick, 420);
    else animating = false;
  };
  tick();
}

function renderPath(){
  $('#path').innerHTML = modules.map((m,i)=>`
    <article class="lesson ${state.done.includes(i)?'done':''}">
      <div class="i">${m[0]}</div>
      <b>${i+1}. ${m[1]}</b>
      <small>${m[2]}</small>
      <button data-i="${i}">${state.done.includes(i)?'Concluído ✓':'Marcar concluído'}</button>
    </article>`).join('');
  document.querySelectorAll('[data-i]').forEach(btn=>btn.onclick=()=>{
    const i=+btn.dataset.i;
    if(!state.done.includes(i)) { state.done.push(i); state.xp += 50; save(); }
  });
}
function save(){ localStorage.setItem('furinimath_v3', JSON.stringify(state)); $('#xp').textContent = state.xp; renderPath(); }

function newTarget(){ target = Math.floor(Math.random()*1000); $('#target').textContent = String(target).padStart(3,'0'); $('#feedback').textContent=''; }
function checkTarget(){
  const v = (+$('#cb').value + ($('#c5').checked?5:0))*100 + (+$('#db').value + ($('#d5').checked?5:0))*10 + (+$('#ub').value + ($('#u5').checked?5:0));
  if(v===target){ $('#feedback').textContent = '✅ Correto! +10 XP'; $('#feedback').style.color='#169165'; state.xp += 10; save(); }
  else { $('#feedback').textContent = `❌ Você montou ${v}`; $('#feedback').style.color='#c64545'; }
}

document.querySelectorAll('[data-go]').forEach(btn=>btn.onclick=()=>document.getElementById(btn.dataset.go).scrollIntoView({behavior:'smooth'}));
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{ document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); view = btn.dataset.view; render(); });
$('#minus').onclick=()=>render(enc($('#num').value).n-1); $('#plus').onclick=()=>render(enc($('#num').value).n+1); $('#rand').onclick=()=>render(Math.floor(Math.random()*1000)); $('#num').oninput=()=>render(); $('#animate').onclick=animateBuild; $('#newTarget').onclick=newTarget; $('#check').onclick=checkTarget;
$('#xp').textContent = state.xp; renderPath(); render(); newTarget();


console.log('FuriniMath v3.2 carregado - mão virtual corrigida');
