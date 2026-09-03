
const modules=[
["👋","Fundamentos","Mãos, falanges e valor posicional."],
["🔢","Chisanbop","Representação até 99 e complementos."],
["💻","Binário","Dedos como bits, até 1023."],
["🧮","Soroban","Base 1–4, quinário e complementos."],
["✋","Método Furini","Três ordens nas mãos sobrepostas."],
["➕","Soma","Mesma lógica operacional do soroban."],
["➖","Subtração","Complementos e empréstimos."],
["✖️","Multiplicação","Progressão pelo método do soroban."],
["➗","Divisão","Raciocínio posicional."],
["⚡","Velocidade","Automatização e cálculo rápido."]
];
let state=JSON.parse(localStorage.getItem("fm2")||'{"xp":0,"done":[]}');
let view="frente", target=375;
const $=s=>document.querySelector(s);

function enc(n){
 n=Math.max(0,Math.min(999,parseInt(n)||0));
 const u=n%10,d=Math.floor(n/10)%10,c=Math.floor(n/100)%10;
 return {n,u,d,c,ub:u%5,u5:u>=5,db:d%5,d5:d>=5,cb:c%5,c5:c>=5}
}
function imgFor(kind,base){
 if(base===0) return "assets/atlas/u0.png";
 return `assets/atlas/${kind}${base}.png`;
}
function piece(cls,title,img,q){
 return `<div class="piece ${cls} ${view}">
   ${q?`<div class="active-q">${q}</div>`:""}
   <img src="${img}" alt="${title}">
   <div class="cap"><span>${title}</span><span class="tag">${cls.toUpperCase()}</span></div>
 </div>`;
}
function render(){
 let s=enc($("#number").value); $("#number").value=s.n; $("#bigNumber").textContent=s.n; $("#totalText").textContent=s.n;
 $("#cText").textContent=`${s.c5?500:0} + ${s.cb*100} = ${s.c*100}`;
 $("#dText").textContent=`${s.d5?50:0} + ${s.db*10} = ${s.d*10}`;
 $("#uText").textContent=`${s.u5?5:0} + ${s.ub} = ${s.u}`;
 let cimg=imgFor("c",s.cb), dimg=imgFor("d",s.db), uimg=imgFor("u",s.ub);
 $("#pieceStack").innerHTML=
   piece("c",`Centenas: ${s.c*100}`,cimg,s.c5?"+500 • indicador esquerdo":"")+
   piece("d",`Dezenas: ${s.d*10}`,dimg,s.d5?"+50 • médio esquerdo":"")+
   piece("u",`Unidades: ${s.u}`,uimg,s.u5?"+5 • anelar esquerdo":"");
}
$("#minus").onclick=()=>{$("#number").value=Math.max(0,enc($("#number").value).n-1);render()}
$("#plus").onclick=()=>{$("#number").value=Math.min(999,enc($("#number").value).n+1);render()}
$("#random").onclick=()=>{$("#number").value=Math.floor(Math.random()*1000);render()}
$("#number").oninput=render;
document.querySelectorAll(".view").forEach(b=>b.onclick=()=>{document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));b.classList.add("active");view=b.dataset.view;render()});
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go).scrollIntoView({behavior:"smooth"}));

function path(){
 $("#path").innerHTML=modules.map((m,i)=>`<article class="lesson ${state.done.includes(i)?"done":""}">
 <div style="font-size:28px">${m[0]}</div><b>${i+1}. ${m[1]}</b><small>${m[2]}</small>
 <button data-i="${i}">${state.done.includes(i)?"Concluído ✓":"Marcar concluído"}</button></article>`).join("");
 document.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{let i=+b.dataset.i;if(!state.done.includes(i)){state.done.push(i);state.xp+=50;localStorage.setItem("fm2",JSON.stringify(state));$("#xp").textContent=state.xp;path()}})
}
function newTarget(){target=Math.floor(Math.random()*1000);$("#target").textContent=String(target).padStart(3,"0");$("#feedback").textContent=""}
$("#newTarget").onclick=newTarget;
$("#check").onclick=()=>{
 let v=(+$("#cb").value+($("#c5").checked?5:0))*100+(+$("#db").value+($("#d5").checked?5:0))*10+(+$("#ub").value+($("#u5").checked?5:0));
 if(v===target){$("#feedback").textContent="✅ Correto! +10 XP";$("#feedback").style.color="#168d62";state.xp+=10;localStorage.setItem("fm2",JSON.stringify(state));$("#xp").textContent=state.xp}
 else{$("#feedback").textContent=`❌ Você montou ${v}`;$("#feedback").style.color="#c94747"}
}
$("#xp").textContent=state.xp;path();render();newTarget();
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
