(function(){
var STG=[['01','Забор воздуха','Свежий воздух поступает через воздухозаборные решётки и воздушные клапаны.'],['02','Фильтрация и очистка','Центральные кондиционеры очищают воздух и поддерживают нужную влажность.'],['03','Нагрев и охлаждение','Узлы терморегулирования и компрессорно-конденсаторные блоки доводят температуру до нужной.'],['04','Подача по каналам','Вентиляторы и канальная группа разводят воздух по помещениям.'],['05','Защита при пожаре','Противопожарные клапаны перекрывают каналы, а вентиляторы подпора и дымоудаления не дают дыму распространяться.']];
var raf,mouse={x:-1,y:-1},tk=0,SL=0,sidx=-1;
function storyInit(){var sp=document.getElementById('sp');if(!sp)return;SL=sp.getTotalLength();sidx=-1;['sq','sqg'].forEach(function(i){var e=document.getElementById(i);e.style.strokeDasharray=SL;e.style.strokeDashoffset=SL});
var h='';for(var i=0;i<5;i++){var pt=sp.getPointAtLength(SL*i/4);h+='<g id="nd'+i+'" transform="translate('+pt.x+' '+pt.y+')"><circle r="17" fill="#0b151d" stroke="#1d3547" stroke-width="3"/><text y="5" text-anchor="middle" font-size="15" font-weight="700" fill="#8fa6b6" font-family="sans-serif">'+(i+1)+'</text></g>'}
document.getElementById('nodes').innerHTML=h;updStory(0)}
function updStory(p){var q=document.getElementById('sq');if(!SL||!q)return;var off=SL*(1-p);q.style.strokeDashoffset=off;document.getElementById('sqg').style.strokeDashoffset=off;
var pt=document.getElementById('sp').getPointAtLength(SL*p);['o1','o2'].forEach(function(i){var o=document.getElementById(i);o.setAttribute('cx',pt.x);o.setAttribute('cy',pt.y)});
document.getElementById('sb').style.width=(p*100)+'%';
for(var i=0;i<5;i++){var n=document.getElementById('nd'+i),on=p>=i/4-.001;n.firstChild.setAttribute('fill',on?'#37c3ff':'#0b151d');n.firstChild.setAttribute('stroke',on?'#aef0ff':'#1d3547');n.lastChild.setAttribute('fill',on?'#04141c':'#8fa6b6')}
var k=Math.min(4,Math.floor(p*5));if(k!=sidx){sidx=k;var T=STG[k];document.getElementById('sn').textContent='ЭТАП '+T[0];document.getElementById('st').textContent=T[1];document.getElementById('sd').textContent=T[2];var cp=document.querySelector('.cap');cp.classList.remove('sw');void cp.offsetWidth;cp.classList.add('sw')}}
function onScroll(){var s=document.getElementById('story');if(s){var b=s.getBoundingClientRect();updStory(Math.max(0,Math.min(1,-b.top/(b.height-innerHeight))))}var hf=document.querySelector('.hf');if(hf)hf.style.transform='translateY('+Math.min(window.scrollY,700)*.12+'px)'}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(function(){tk=0;onScroll()})}},{passive:true});
addEventListener('pointermove',function(e){var g=document.getElementById('glow');if(g){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'}
var c=document.getElementById('air');if(c){var b=c.getBoundingClientRect();mouse.x=e.clientX-b.left;mouse.y=e.clientY-b.top;if(mouse.y<0||mouse.y>b.height)mouse.x=-1}
var cd=e.target.closest&&e.target.closest('.card');if(cd&&e.pointerType!='touch'){var r=cd.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;cd.style.setProperty('--ry',((x-.5)*12)+'deg');cd.style.setProperty('--rx',((.5-y)*10)+'deg');cd.style.setProperty('--mx',x*100+'%');cd.style.setProperty('--my',y*100+'%')}});
addEventListener('pointerout',function(e){var cd=e.target.closest&&e.target.closest('.card');if(cd){cd.style.setProperty('--rx','0deg');cd.style.setProperty('--ry','0deg')}});
function air(){var c=document.getElementById('air');if(!c)return;cancelAnimationFrame(raf);
var cx=c.getContext('2d'),W,H,dpr=Math.min(window.devicePixelRatio||1,2),narrow=innerWidth<700,N=narrow?90:200,Q=[],st=performance.now(),last=st,ang=0,go=document.getElementById('cine'),A=['hbA','hbB','hbC'].map(function(i){return document.getElementById(i)});
if(narrow)[A[1],A[2]].forEach(function(e){e&&e.removeAttribute('filter')});
function rs(){W=c.width=c.offsetWidth*dpr;H=c.height=c.offsetHeight*dpr;cx.fillStyle='#04080c';cx.fillRect(0,0,W,H)}rs();addEventListener('resize',rs);
function mk(q,init){q.x=init?Math.random()*W:-30*dpr;q.y=Math.random()*H;q.v=(1.2+Math.random()*2.8)*dpr;q.p=Math.random()*6.28;q.a=(.6+Math.random()*1.6)*dpr;q.w=(.5+Math.random()*1.3)*dpr;q.h=185+Math.random()*32;q.l=.25+Math.random()*.55;return q}
for(var i=0;i<N;i++)Q.push(mk({},1));
setTimeout(function(){go&&go.classList.add('go')},80);
(function dr(now){if(!document.body.contains(c))return;var dt=Math.min(now-last,50)/1000;last=now;var te=(now-st)/1000,sp=640*(1-Math.exp(-te/1.5));ang=(ang+sp*dt)%360;
if(A[0]){A[0].setAttribute('transform','rotate('+ang+' 200 200)');A[1].setAttribute('transform','rotate('+(ang-sp*.016)+' 200 200)');A[2].setAttribute('transform','rotate('+(ang-sp*.034)+' 200 200)');A[0].style.opacity=Math.max(.3,1-sp/560)}
cx.globalCompositeOperation='source-over';cx.fillStyle='rgba(4,8,12,.17)';cx.fillRect(0,0,W,H);cx.globalCompositeOperation='lighter';cx.lineCap='round';
Q.forEach(function(q){var px=q.x,py=q.y;q.x+=q.v*(.35+Math.min(te/2,1));q.p+=dt*1.4;q.y+=Math.sin(q.p+q.x*.004)*q.a;
if(mouse.x>=0){var dx=q.x-mouse.x*dpr,dy=q.y-mouse.y*dpr,R=150*dpr,d=Math.sqrt(dx*dx+dy*dy)+1;if(d<R){var f=1-d/R;q.y+=dy/d*f*7*dpr;q.x+=dx/d*f*2*dpr}}
cx.strokeStyle='hsla('+q.h+',95%,'+(55+q.l*32)+'%,'+(q.l*.8)+')';cx.lineWidth=q.w;cx.beginPath();cx.moveTo(px-q.v*3,py);cx.lineTo(q.x,q.y);cx.stroke();if(q.x>W+40)mk(q,0)});
raf=requestAnimationFrame(dr)})(st)}

var io=new IntersectionObserver(function(e){e.forEach(function(t){if(t.isIntersecting){t.target.classList.add('on');io.unobserve(t.target);t.target.querySelectorAll('[data-n]').forEach(function(b){var n=+b.dataset.n,s=b.dataset.s||'',i=0,id=setInterval(function(){i++;b.textContent=Math.round(n*i/30)+(i>=30?s:'');if(i>=30)clearInterval(id)},35)})}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
document.querySelectorAll('.gal .th').forEach(function(t){t.addEventListener('click',function(){var m=document.getElementById('mi');if(m)m.innerHTML=t.innerHTML})});
air();storyInit();onScroll();
})();
