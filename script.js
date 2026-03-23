
const OBJECTIONS=[
{num:1,title:'No me explicaron bien el cambio de nombre',g:['Es normal, el cambio se hace por fases.'],p:['Te doy la info actualizada desde central.'],s:'¿Retomamos tu estudio hoy?'},
{num:2,title:'Yo contraté con Securitas Direct; así no quiero nada',g:['Es lógico sorprenderse con un rebranding.'],p:['Somos los mismos; servicio y tecnología iguales.'],s:'¿Dejamos fijada la instalación?'},
{num:3,title:'El comercial no sabía del cambio; no me fío',g:['Es común recibir versiones distintas.'],p:['El cambio va por equipos; tu estudio es correcto.'],s:'¿Dejamos preparada la instalación?'},
{num:4,title:'Verisure y Securitas dijeron estafa',g:['Dos imágenes desconciertan.'],p:['Tu estudio está registrado y verificado.'],s:'¿Cerramos la instalación?'},
{num:5,title:'La competencia dice que subiréis precios',g:['La competencia aprovecha cambios grandes.'],p:['Tus condiciones se mantienen iguales.'],s:'¿Fijamos ya la instalación?'},
{num:6,title:'Uniforme/coche de Securitas, no Verisure',g:['La implantación es progresiva.'],p:['El uniforme no afecta a tu instalación.'],s:'¿Retomamos la propuesta?'},
{num:7,title:'La visita fue poco profesional',g:['Lamento la experiencia.'],p:['El servicio no depende de una persona.'],s:'¿Revisamos el estudio?'},
{num:8,title:'No me fío de que el servicio sea el mismo',g:['Suele ser duda de precio/equipo.'],p:['Tu estudio sigue siendo la mejor opción.'],s:'¿Mañana por la mañana o tarde?'},
{num:9,title:'Confusión por el cambio de marca',g:['Es normal ver dos imágenes.'],p:['Tu instalación no cambia.'],s:'¿Retomamos la propuesta?'}];

const canvas=document.getElementById('wheel'); const ctx=canvas.getContext('2d');
const W=canvas.width,H=canvas.height,CX=W/2,CY=H/2,R=W/2-10;
let angle=-Math.PI/2; const N=OBJECTIONS.length; const SLICE=2*Math.PI/N;
function drawWheel(a=angle){ctx.clearRect(0,0,W,H);ctx.save();ctx.translate(CX,CY);ctx.rotate(a);
 for(let i=0;i<N;i++){let s=i*SLICE;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,s,s+SLICE);
 ctx.fillStyle=`hsl(${i*40},80%,55%)`;ctx.fill();ctx.save();ctx.rotate(s+SLICE/2);
 ctx.translate(R*0.7,0);ctx.rotate(Math.PI/2);ctx.fillStyle='#000';ctx.font='bold 26px system-ui';
 ctx.fillText(OBJECTIONS[i].num,-8,8);ctx.restore();}ctx.restore();}
drawWheel();
function shortest(a,b){let d=(b-a)%(2*Math.PI);return d>Math.PI?d-2*Math.PI:d<-Math.PI?d+2*Math.PI:d;}
function spin(){const btn=document.getElementById('spinBtn');btn.disabled=true;let tIndex=Math.floor(Math.random()*N);
 let target=-Math.PI/2-(tIndex*SLICE+SLICE/2);let final=angle+6*Math.PI+shortest(angle,target);
 let start=performance.now();let dur=2500;
 function frame(now){let p=Math.min(1,(now-start)/dur);let e=1-Math.pow(1-p,3);
 let a=angle+(final-angle)*e;drawWheel(a);if(p<1)requestAnimationFrame(frame);
 else{angle=a;btn.disabled=false;showCard(tIndex);}}
 requestAnimationFrame(frame);} document.getElementById('spinBtn').onclick=spin;

const card=document.getElementById('card'); const cardTitle=document.getElementById('cardTitle');
const cardBody=document.getElementById('cardBody');
function showCard(i){let o=OBJECTIONS[i];cardTitle.textContent=`${o.num}. ${o.title}`;
 cardBody.innerHTML='';[['GUIAR',o.g],['PERSONALIZAR',o.p],['SELLAR',[o.s]]].forEach(([t,l])=>{
 let d=document.createElement('div');d.className='gps-block';let h=document.createElement('h4');h.textContent=t;d.appendChild(h);
 let ul=document.createElement('ul');l.forEach(x=>{let li=document.createElement('li');li.textContent=x;ul.appendChild(li);});d.appendChild(ul);
 cardBody.appendChild(d);}); card.showModal();}
document.getElementById('closeCard').onclick=()=>card.close();
document.getElementById('spinAgain').onclick=()=>{card.close();spin();};

// legend
document.getElementById('legend').innerHTML = OBJECTIONS.map(o=>`<li data-n='${o.num}'>${o.num}. ${o.title}</li>`).join('');
document.querySelectorAll('.legend li').forEach(li=>li.onclick=()=>showCard(parseInt(li.dataset.n)-1));
