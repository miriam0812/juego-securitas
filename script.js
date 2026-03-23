// ====== Datos: Objeciones con Método GPS (Guiar, Personalizar, Sellar) ======
// Puedes editar este arreglo. La ruleta se adapta automáticamente al número de elementos.
const OBJECTIONS = [
  {
    title: "No me explicaron bien el cambio de nombre",
    g: [
      "Es normal, el cambio se está haciendo por fases y a veces coincide con días de transición.",
      "No todos han recibido el material/brief actualizado a la vez."
    ],
    p: [
      "Por eso te llamo desde central: para darte la información correcta y actualizada.",
      "Te aclaro exactamente qué afecta o no a tu instalación."
    ],
    s: "Con esto claro, ¿retomamos tu estudio y lo dejamos bien cerrado hoy?"
  },
  {
    title: "Yo contraté con Securitas Direct; así no quiero nada",
    g: [
      "Es lógico que un cambio de imagen sorprenda al principio.",
      "A todos nos cuesta ver una marca nueva cuando estamos habituados a otra."
    ],
    p: [
      "Somos los mismos profesionales que hicieron tu estudio; servicio y tecnología siguen iguales.",
      "La CRA y la respuesta en 20 segundos no cambian."
    ],
    s: "Entendido. Con esto claro, ¿dejamos fijada la instalación?"
  },
  {
    title: "El comercial no sabía nada del cambio, no me fío",
    g: [
      "Entiendo que recibir explicaciones distintas genere duda; es una situación común en cambios grandes."
    ],
    p: [
      "El cambio se gestiona por equipos y no todos se actualizan al mismo tiempo.",
      "Tu estudio está registrado y es correcto; nada cambia en protección ni precio."
    ],
    s: "Déjame revisar tu estudio y te doy toda la claridad. ¿Te encaja dejar la instalación preparada?"
  },
  {
    title: "Han venido uno de Verisure y otro de Securitas; me dicen que es estafa",
    g: [
      "Es lógico que dos imágenes distintas desconcierten; le ocurre a muchos durante el rebranding."
    ],
    p: [
      "Tu estudio está registrado oficialmente con nosotros: es real y verificado desde central.",
      "Somos la misma empresa bajo la nueva marca global; tu protección no cambia."
    ],
    s: "Te lo aclaro para evitar confusiones. ¿Retomamos la propuesta y cerramos la instalación?"
  },
  {
    title: "La competencia dice que con el cambio subiréis precios/servicios",
    g: [
      "Es habitual que la competencia aproveche cambios grandes para generar miedo."
    ],
    p: [
      "Te confirmo condiciones reales: tu precio y estudio se mantienen igual.",
      "Ganas marca global sin cambiar tu precio ni tus condiciones."
    ],
    s: "Con esto claro, ¿fijamos ya la instalación?"
  },
  {
    title: "Vino con ropa/coche de Securitas en lugar de Verisure",
    g: [
      "Es normal que llame la atención; la implantación de imagen es progresiva y convivirán ambas unas semanas."
    ],
    p: [
      "La imagen del uniforme no afecta a tu instalación ni a tus condiciones.",
      "Misma tecnología, misma CRA, mismo servicio; la nueva marca aporta reconocimiento internacional."
    ],
    s: "Con esta claridad, ¿retomamos la propuesta?"
  },
  {
    title: "La visita fue poco profesional; prefiero otra empresa",
    g: [
      "Entiendo que una mala experiencia deje esa sensación; lamento que no fuera como esperabas."
    ],
    p: [
      "Tecnología, instalación y CRA no dependen de una persona concreta.",
      "Desde central te acompaño punto por punto para decidir con seguridad."
    ],
    s: "¿Revisamos juntos el estudio y cierras con tranquilidad?"
  },
  {
    title: "No me fío de que el servicio sea el mismo que antes",
    g: [
      "Suele reducirse a dudas de precio, equipo o condiciones."
    ],
    p: [
      "Hicimos un estudio completo en tu vivienda; esta sigue siendo la mejor opción para ti.",
      "Te recuerdo en 30 segundos propuesta y diferenciales de servicio y producto."
    ],
    s: "¿Te encaja dejarlo instalado hoy por la mañana o por la tarde?"
  },
  {
    title: "Con el cambio de marca me he quedado confuso; prefiero no seguir",
    g: [
      "Es normal sentirse confundido viendo dos imágenes durante el cambio."
    ],
    p: [
      "Tu estudio es correcto y no cambia; lo que cambia es la imagen, no la empresa.",
      "Instalación, tecnología y servicio siguen tal cual revisaste."
    ],
    s: "Con las cosas claras, ¿retomamos la propuesta y ves si te encaja?"
  },
  // Placeholders para completar hasta 12 (edítalos cuando tengas las 3 restantes)
  {
    title: "[Añadir objeción 10]",
    g: ["Añade aquí el paso 'Guiar'"],
    p: ["Añade aquí el paso 'Personalizar'"],
    s: "Añade aquí el 'Sellar'"
  },
  {
    title: "[Añadir objeción 11]",
    g: ["Añade aquí el paso 'Guiar'"],
    p: ["Añade aquí el paso 'Personalizar'"],
    s: "Añade aquí el 'Sellar'"
  },
  {
    title: "[Añadir objeción 12]",
    g: ["Añade aquí el paso 'Guiar'"],
    p: ["Añade aquí el paso 'Personalizar'"],
    s: "Añade aquí el 'Sellar'"
  }
];

// ====== Ruleta (Canvas) ======
const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const card = document.getElementById('card');
const cardTitle = document.getElementById('cardTitle');
const cardBody = document.getElementById('cardBody');
const closeCard = document.getElementById('closeCard');
const spinAgain = document.getElementById('spinAgain');

const W = canvas.width, H = canvas.height; 
const CX = W/2, CY = H/2, R = Math.min(W, H)/2 - 10;
const N = OBJECTIONS.length;
const SLICE = 2*Math.PI / N;
let angle = -Math.PI/2; // que apunte "arriba" inicialmente
let spinning = false;

const COLORS = [
  '#ef4444','#f59e0b','#22c55e','#3b82f6','#a855f7','#06b6d4',
  '#f97316','#84cc16','#10b981','#6366f1','#e11d48','#14b8a6'
];

function drawWheel(a=angle){
  ctx.clearRect(0,0,W,H);
  // Sombra
  ctx.save();
  ctx.translate(CX, CY);
  ctx.rotate(a);
  for(let i=0;i<N;i++){
    const start = i*SLICE;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,0,R,start,start+SLICE);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();

    // Texto
    ctx.save();
    ctx.rotate(start + SLICE/2);
    ctx.translate(R*0.72, 0);
    ctx.rotate(Math.PI/2);
    ctx.fillStyle = '#0b1020';
    ctx.font = '600 14px system-ui, -apple-system, Segoe UI, Roboto';
    const t = OBJECTIONS[i].title;
    wrapText(ctx, t, -R*0.50, -6, R*1.0, 16);
    ctx.restore();
  }
  ctx.restore();

  // Círculo central
  ctx.beginPath();
  ctx.arc(CX, CY, 54, 0, 2*Math.PI);
  ctx.fillStyle = '#0b162f';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.18)';
  ctx.lineWidth = 1.25;
  ctx.stroke();
  ctx.fillStyle = '#e5e7eb';
  ctx.font = '700 14px system-ui, -apple-system, Segoe UI, Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('GIRAR', CX, CY+5);
}

function wrapText(context, text, x, y, maxWidth, lineHeight){
  const words = text.split(' ');
  let line = '';
  for(let n=0;n<words.length;n++){
    let testLine = line + words[n] + ' ';
    let metrics = context.measureText(testLine);
    if(metrics.width > maxWidth && n>0){
      context.fillText(line, x + maxWidth/2, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x + maxWidth/2, y);
}

drawWheel();

function spin(){
  if(spinning) return;
  spinning = true;
  spinBtn.disabled = true;

  const turns = 5 + Math.random()*2; // 5-7 vueltas
  const targetIndex = Math.floor(Math.random()*N);
  const offset = (Math.random()-0.5) * (SLICE*0.4); // un poco de variación
  // Queremos que al final el índice target quede apuntando a la flecha (arriba = -PI/2)
  const targetAngle = -Math.PI/2 - (targetIndex*SLICE + SLICE/2) + offset; 
  const finalAngle = angle + turns*2*Math.PI + shortestDelta(angle, targetAngle);

  const duration = 2200 + Math.random()*800; // 2.2-3.0s
  const start = performance.now();

  function frame(now){
    const t = Math.min(1, (now-start)/duration);
    // easing out cubic
    const eased = 1 - Math.pow(1-t, 3);
    const current = angle + (finalAngle - angle)*eased;
    drawWheel(current);
    if(t < 1){
      requestAnimationFrame(frame);
    } else {
      angle = current;
      spinning = false;
      spinBtn.disabled = false;
      showCard(targetIndex);
    }
  }
  requestAnimationFrame(frame);
}

function shortestDelta(from, to){
  let diff = (to - from) % (2*Math.PI);
  if(diff > Math.PI) diff -= 2*Math.PI;
  if(diff < -Math.PI) diff += 2*Math.PI;
  return diff;
}

function showCard(i){
  const item = OBJECTIONS[i];
  cardTitle.textContent = item.title;
  cardBody.innerHTML = '';

  const blocks = [
    { key: 'g', title: 'GUIAR', color: '#06b6d4' },
    { key: 'p', title: 'PERSONALIZAR', color: '#a855f7' },
    { key: 's', title: 'SELLAR', color: '#22c55e' },
  ];

  blocks.forEach(b => {
    const div = document.createElement('div');
    div.className = 'gps-block';
    const h4 = document.createElement('h4');
    h4.textContent = b.title;
    h4.style.color = b.color;
    div.appendChild(h4);

    if(b.key === 's'){
      const p = document.createElement('p');
      p.textContent = item.s;
      div.appendChild(p);
    } else {
      const ul = document.createElement('ul');
      (item[b.key] || []).forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
      });
      div.appendChild(ul);
    }

    cardBody.appendChild(div);
  });

  if(typeof card.showModal === 'function'){
    card.showModal();
  } else {
    alert(''+item.title+'\n\nGUIAR: '+(item.g||[]).join(' | ')+'\nPERSONALIZAR: '+(item.p||[]).join(' | ')+'\nSELLAR: '+item.s);
  }
}

spinBtn.addEventListener('click', spin);
closeCard.addEventListener('click', ()=> card.close());
spinAgain.addEventListener('click', ()=> { card.close(); spin(); });
