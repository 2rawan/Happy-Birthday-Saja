document.addEventListener('DOMContentLoaded', () => {
  const subline = document.getElementById('subline');
  const surpriseBtn = document.getElementById('surprise-btn');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const surpriseMessage = document.getElementById('surprise-message');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confettiBurstBtn = document.getElementById('confetti-burst');
  const openLetter = document.getElementById('open-letter');

  // الرسالة الشخصية
  const RECIPIENT = 'قلبييي❤';
  const MESSAGE = `كل سنة وانتي طيبة ي ${RECIPIENT}! 🎉💖احلى عيد ميلاد دا ولا ايه`;

  // Typewriter effect
  function typeWriter(el, text, speed=28){
    el.textContent = '';
    let i=0;
    const id=setInterval(()=>{
      el.textContent += text[i]==='/'?'\n':text[i]; 
      i++; 
      if(i>=text.length){clearInterval(id);} 
    }, speed);
  }
  setTimeout(()=> typeWriter(subline, `إلى ${RECIPIENT} — جهز نفسك لمفاجأة كبيرة ✨`),700);

  // دالة فتح الرسالة/المفاجأة
  function openModal(){
    modal.classList.add('show');
    surpriseMessage.innerHTML = MESSAGE.replace(/\n/g,'<br>');
  }

  // ربط الزرين بالفتح
  surpriseBtn.addEventListener('click', openModal); // زر المفاجأة
  openLetter.addEventListener('click', openModal);  // زر "افتح الرسالة"

  // إغلاق النافذة
  closeModal.addEventListener('click', ()=> modal.classList.remove('show'));
  modal.addEventListener('click', (e)=> { if(e.target===modal) closeModal.click(); });

  // Confetti canvas setup
  const ctx=confettiCanvas.getContext('2d');
  let W=confettiCanvas.width=innerWidth, H=confettiCanvas.height=innerHeight;
  window.addEventListener('resize', ()=>{W=confettiCanvas.width=innerWidth; H=confettiCanvas.height=innerHeight;});
  const colors=['#ff5c8a','#ffd166','#7fe5d6','#9aa7ff','#c6a6ff','#5fe3ff'];
  let confettiParticles=[];

  function random(min,max){return Math.random()*(max-min)+min;}

  function burstConfetti(n=120){
    for(let i=0;i<n;i++){
      confettiParticles.push({
        x: W/2 + random(-80,80), y: H/2 + random(-40,40),
        r: random(6,12), d: random(2,10),
        color: colors[Math.floor(Math.random()*colors.length)],
        vx: random(-6,6), vy: random(-8,-4),
        opacity:1
      });
    }
  }

  function updateConfetti(){
    ctx.clearRect(0,0,W,H);
    confettiParticles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // gravity
      p.opacity -= 0.01;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.opacity,0);
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
      ctx.fill();
    });
    confettiParticles = confettiParticles.filter(p=>p.opacity>0);
    requestAnimationFrame(updateConfetti);
  }
  updateConfetti();

  // ربط زر الكونفيتي
  confettiBurstBtn.addEventListener('click', ()=> burstConfetti(150));
});
