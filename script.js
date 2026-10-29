// Contact options live in the #ct panel and the footer. Without JS, "Get in touch" scrolls to the end of the page.
const CT=document.getElementById("ct");let ret=null;
function openCt(e){e.preventDefault();ret=document.activeElement;CT.hidden=false;document.documentElement.style.overflow="hidden";requestAnimationFrame(()=>{CT.classList.add("on");CT.querySelector("a").focus()})}
function closeCt(){CT.classList.remove("on");document.documentElement.style.overflow="";setTimeout(()=>{CT.hidden=true},250);if(ret&&ret.focus)ret.focus()}
document.querySelectorAll("[data-contact]").forEach(a=>a.addEventListener("click",openCt));
CT.addEventListener("click",e=>{if(e.target===CT||e.target.closest("[data-close]"))closeCt()});
addEventListener("keydown",e=>{if(CT.hidden)return;if(e.key==="Escape")closeCt();if(e.key==="Tab"){const f=[...CT.querySelectorAll("a,button")],i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}});
const nav=document.getElementById("nav");
addEventListener("scroll",()=>nav.classList.toggle("s",scrollY>20),{passive:true});
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;

// Entrance: logo reveal, then the curtain lifts and the hero begins
(function(){
 const sp=document.getElementById("sp"),root=document.documentElement;
 const go=()=>{root.classList.remove("ld");window.GO=true};
 if(RM){sp.remove();go();return}
 setTimeout(()=>{sp.classList.add("out");go();setTimeout(()=>sp.remove(),1000)},1900);
})();
// Custom cursor (fine pointers only)
(function(){
 if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
 const root=document.documentElement,d=document.getElementById("cd"),r=document.getElementById("cr");
 root.classList.add("cur");
 let x=-100,y=-100,rx=-100,ry=-100,last=performance.now();
 addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;if(!root.classList.contains("cv")){rx=x;ry=y;root.classList.add("cv")}d.style.transform=`translate3d(${x}px,${y}px,0)`},{passive:true});
 document.addEventListener("mouseleave",()=>root.classList.remove("cv"));
 document.addEventListener("mouseover",e=>{r.classList.toggle("h",!!e.target.closest("a,button,[role=tab],#drag,.q"))});
 addEventListener("mousedown",()=>r.classList.add("p"));addEventListener("mouseup",()=>r.classList.remove("p"));
 const RMc=matchMedia("(prefers-reduced-motion:reduce)").matches;
 (function loop(now){requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);last=now;const k=RMc?1:1-Math.exp(-dt*16);rx+=(x-rx)*k;ry+=(y-ry)*k;r.style.transform=`translate3d(${rx}px,${ry}px,0)`})(last);
})();
// How it works
const scrs=[0,1,2].map(i=>document.getElementById("s"+i));
document.querySelectorAll(".steps button").forEach(b=>b.onclick=()=>{
 const n=+b.dataset.s;
 document.querySelectorAll(".steps button").forEach(x=>x.setAttribute("aria-selected",x===b));
 scrs.forEach((s,i)=>s.hidden=i!==n);
});
// Use cases
const UC=["A page with your name, role, phone, email and links, ready to save.","A menu page guests open at the table. Dishes, descriptions and prices.","A catalog page showing your products, with details and ways to reach you.","A short introduction for events and meetings, with the links that matter."];
const ucd=document.getElementById("ucd");ucd.textContent=UC[0];
document.querySelectorAll(".uc button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".uc button").forEach(x=>x.setAttribute("aria-selected",x===b));ucd.textContent=UC[+b.dataset.u];
});
const hov=matchMedia("(hover:hover) and (pointer:fine)");
if(!hov.matches)document.getElementById("fh").textContent="Tap a question to see the answer.";
const qs=[...document.querySelectorAll(".q")];let tm;
function only(o){qs.forEach(x=>{const v=x===o;x.classList.toggle("open",v);x.querySelector(".qh").setAttribute("aria-expanded",v)})}
qs.forEach(q=>{const h=q.querySelector(".qh");
 q.addEventListener("mouseenter",()=>{if(!hov.matches)return;clearTimeout(tm);tm=setTimeout(()=>only(q),80)});
 q.addEventListener("mouseleave",()=>clearTimeout(tm));
 h.addEventListener("click",()=>{if(!hov.matches)only(q.classList.contains("open")?null:q)});
 h.addEventListener("focus",()=>{if(h.matches(":focus-visible"))only(q)});
});
// gentle one-time reveal as content enters view
document.documentElement.classList.add("js");
const rvs=document.querySelectorAll(".st .col:not(.intro),.st .phone");
rvs.forEach(e=>e.classList.add("rv"));
if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.2});rvs.forEach(e=>io.observe(e))}else rvs.forEach(e=>e.classList.add("in"));

// 3D card
(function(){
 let ok=false;try{const c=document.createElement("canvas");ok=!!(window.THREE&&(c.getContext("webgl")||c.getContext("experimental-webgl")))}catch(e){}
 if(!ok){document.documentElement.classList.add("nogl");return}
 const cv=document.getElementById("gl");
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
 R.outputEncoding=THREE.sRGBEncoding;R.setClearColor(0,0);
 const S=new THREE.Scene();const cam=new THREE.PerspectiveCamera(35,1,.1,50);cam.position.z=8;
 S.add(new THREE.HemisphereLight(0xffffff,0xb9c2d6,.85));
 const key=new THREE.DirectionalLight(0xffffff,.9);key.position.set(-3,4,5);S.add(key);
 const rim=new THREE.DirectionalLight(0xdfe7ff,.35);rim.position.set(4,-1,-3);S.add(rim);
 const W=3.4,H=2.14,r=.3,D=.03;
 const sh=new THREE.Shape();const x=-W/2,y=-H/2;
 sh.moveTo(x+r,y);sh.lineTo(x+W-r,y);sh.quadraticCurveTo(x+W,y,x+W,y+r);sh.lineTo(x+W,y+H-r);sh.quadraticCurveTo(x+W,y+H,x+W-r,y+H);sh.lineTo(x+r,y+H);sh.quadraticCurveTo(x,y+H,x,y+H-r);sh.lineTo(x,y+r);sh.quadraticCurveTo(x,y,x+r,y);
 const g=new THREE.ExtrudeGeometry(sh,{depth:D,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:5,curveSegments:20});g.translate(0,0,-D/2);
 const card=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0xf4f5f7,roughness:.62,metalness:0}));
 // logo texture (approximate trace; replace with supplied vector)
 const lc=document.createElement("canvas");lc.width=lc.height=512;const c=lc.getContext("2d");
 c.scale(5.12,5.12);c.fillStyle="#043c93";
 const P=new Path2D("M78.7 38.8 L42.0 51.7 L34.2 55.5 L27.3 60.1 L18.1 68.7 L11.8 77.6 L7.8 85.9 L2.9 99.4 L29.9 89.9 L41.4 60.9 L65.8 64.7ZM96.8 0.3 L49.7 17.2 L42.2 21.0 L36.5 25.0 L29.3 32.5 L25.0 39.7 L17.5 61.2 L23.3 53.4 L29.0 47.7 L36.8 42.2 L47.1 37.4 L78.4 26.1 L85.3 22.4 L91.1 16.1 L93.7 10.3Z");
 c.fill(P);
 const tx=new THREE.CanvasTexture(lc);tx.encoding=THREE.sRGBEncoding;tx.anisotropy=8;
 const lg=new THREE.Mesh(new THREE.PlaneGeometry(1.35,1.35),new THREE.MeshStandardMaterial({map:tx,transparent:true,roughness:.6,polygonOffset:true,polygonOffsetFactor:-2}));
 lg.position.z=D/2+.022;card.add(lg);
 // soft shadow
 const sc=document.createElement("canvas");sc.width=sc.height=128;const sx=sc.getContext("2d");
 const gr=sx.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,"rgba(16,23,42,.38)");gr.addColorStop(1,"rgba(16,23,42,0)");sx.fillStyle=gr;sx.fillRect(0,0,128,128);
 const shd=new THREE.Mesh(new THREE.PlaneGeometry(4.6,3),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}));
 shd.rotation.x=-Math.PI/2;shd.position.y=-1.55;
 const root=new THREE.Group();root.add(shd,card);S.add(root);

 let poses=[],mobile=false,fit=1,aspect=1,insTop=0,insH=1;
 const ins=document.getElementById("inspect");
 function build(){
  poses=[...document.querySelectorAll("[data-pose]")].map(e=>{const p=e.dataset.pose.split(",").map(Number);while(p.length<7)p.push(0);return{top:e.getBoundingClientRect().top+scrollY,h:e.offsetHeight,p}});
  insTop=ins.getBoundingClientRect().top+scrollY;insH=ins.offsetHeight;
 }
 function size(){const w=innerWidth,h=innerHeight;mobile=w<=820;R.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));R.setSize(w,h,false);aspect=w/h;cam.aspect=aspect;cam.updateProjectionMatrix();fit=Math.min(1,(aspect*5.04*.8)/3.4);build()}
 addEventListener("resize",size);size();addEventListener("load",build);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(build);
 if(window.ResizeObserver){let q=0;new ResizeObserver(()=>{cancelAnimationFrame(q);q=requestAnimationFrame(build)}).observe(document.body)}
 const ss=t=>t*t*t*(t*(t*6-15)+10);
 const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 // The card holds each pose and only travels near a section boundary
 function pose(){
  const vh=innerHeight,m=scrollY+vh*.5;let i=0;
  for(let k=0;k<poses.length;k++)if(poses[k].top-vh*.6<=m)i=k;
  const b=poses[i],a=poses[Math.max(i-1,0)];
  const t=i===0?1:ss(cl((m-(b.top-vh*.6))/(vh*.85)));
  const o=a.p.map((v,k)=>v+(b.p[k]-v)*t);
  let [px,py,s,rx,ry,rz,foc]=o;
  if(mobile){px=0;py=py*foc+(1-foc)*1.55;s=s*(foc>.5?1:.62)}
  return [px*(mobile?1:Math.min(1,aspect/1.6)),py,s*fit,rx,ry,rz];
 }
 let cur=null,yaw=0,pit=0,tyaw=0,tpit=0,mx=0,my=0,tmx=0,tmy=0,visible=true,last=performance.now(),el=0,intro=RM?1:0;
 const dr=document.getElementById("drag");let down=false,lx=0,ly=0;
 const lim=()=>{tyaw=cl(tyaw,-1.2,1.2);tpit=cl(tpit,-.7,.7)};
 dr.addEventListener("pointerdown",e=>{down=true;lx=e.clientX;ly=e.clientY;dr.setPointerCapture(e.pointerId)});
 dr.addEventListener("pointermove",e=>{if(!down)return;tyaw+=(e.clientX-lx)*.008;tpit+=(e.clientY-ly)*.006;lim();lx=e.clientX;ly=e.clientY});
 ["pointerup","pointercancel"].forEach(n=>dr.addEventListener(n,()=>down=false));
 dr.addEventListener("keydown",e=>{const k={ArrowLeft:[-.2,0],ArrowRight:[.2,0],ArrowUp:[0,-.15],ArrowDown:[0,.15]}[e.key];if(!k)return;e.preventDefault();tyaw+=k[0];tpit+=k[1];lim()});
 document.getElementById("reset").onclick=()=>{tyaw=0;tpit=0};
 addEventListener("pointermove",e=>{if(mobile||RM)return;tmx=(e.clientX/innerWidth-.5);tmy=(e.clientY/innerHeight-.5)},{passive:true});
 document.addEventListener("visibilitychange",()=>{visible=!document.hidden;last=performance.now()});
 function frame(now){
  requestAnimationFrame(frame);if(!visible)return;
  const dt=Math.min(.05,(now-last)/1000);last=now;el+=dt;
  const p=pose(),k=RM?1:1-Math.exp(-dt*5);
  if(!cur)cur=p.slice();else for(let i=0;i<6;i++)cur[i]+=(p[i]-cur[i])*k;
  if(intro<1&&window.GO)intro=Math.min(1,intro+dt/1.7);
  const ir=1-Math.pow(1-intro,4);
  const fl=RM?0:Math.sin(el*1.05)*.07;
  const mid=insTop+insH*.5,near=cl(1-Math.abs(scrollY+innerHeight*.5-mid)/(insH*.6+innerHeight*.3));
  if(near<=0){tyaw*=1-dt*2;tpit*=1-dt*2}
  const d=1-Math.exp(-dt*10),d2=1-Math.exp(-dt*3.5);
  yaw+=(tyaw-yaw)*d;pit+=(tpit-pit)*d;mx+=(tmx-mx)*d2;my+=(tmy-my)*d2;
  root.position.set(cur[0],cur[1]+fl-(1-ir)*1.2,0);root.scale.setScalar(cur[2]);
  card.rotation.set(cur[3]+pit+my*.18+(RM?0:Math.sin(el*.7)*.03)+(1-ir)*.9,cur[4]+yaw+mx*.25,cur[5]);
  shd.material.opacity=ir*(1-Math.min(.6,Math.abs(Math.sin(cur[3]))*.3));
  R.render(S,cam);
 }
 requestAnimationFrame(frame);
})();
