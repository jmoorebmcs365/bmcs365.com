
(function(){
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  if(toggle){
    toggle.addEventListener('click', (e)=>{
      // set sweep origin
      const sweep = document.createElement('div');
      sweep.className = 'sweep';
      sweep.style.setProperty('--sx', (e.clientX || window.innerWidth-40)+'px');
      sweep.style.setProperty('--sy', (e.clientY || 40)+'px');
      document.body.appendChild(sweep);
      // toggle theme
      root.classList.toggle('light');
      // remove sweep after animation
      setTimeout(()=>sweep.remove(), 650);
    });
  }

  // Shay onboarding
  const orb = document.querySelector('.shay-orb');
  const bubble = document.querySelector('.shay-bubble');
  const arrow = document.querySelector('.tooltip-arrow');
  let step = 0;
  const steps = window.SHAY_STEPS || [];
  function showBubble(text, actions){
    if(!bubble) return;
    bubble.style.display = 'block';
    arrow && (arrow.style.display = 'block');
    bubble.querySelector('.msg').textContent = text;
    const act = bubble.querySelector('.actions');
    act.innerHTML = '';
    (actions||[]).forEach(btn=>{
      const b = document.createElement('button');
      b.className = 'btn ' + (btn.variant || '');
      b.textContent = btn.label;
      b.addEventListener('click', btn.onClick);
      act.appendChild(b);
    });
  }
  function hideBubble(){
    if(!bubble) return;
    bubble.style.display = 'none';
    arrow && (arrow.style.display = 'none');
  }
  orb && orb.addEventListener('click', ()=>{
    // cycle steps
    if(step < steps.length){
      const s = steps[step];
      showBubble(s.text, s.actions);
      // optional highlight
      if(s.highlight){
        const el = document.querySelector(s.highlight);
        if(el){
          el.classList.add('highlight');
          setTimeout(()=>el.classList.remove('highlight'), 1400);
        }
      }
      step++;
    } else {
      hideBubble();
      step = 0;
    }
  });

  // Pipeline ghost slide simulation
  const deals = document.querySelectorAll('.deal');
  deals.forEach(d => {
    d.addEventListener('mousedown', ()=>{
      d.classList.add('ghost');
      setTimeout(()=>d.classList.remove('ghost'), 700);
    });
    d.addEventListener('touchstart', ()=>{
      d.classList.add('ghost');
      setTimeout(()=>d.classList.remove('ghost'), 700);
    });
  });

  // Automation canvas chip snapping
  const chips = document.querySelectorAll('.canvas .chip');
  chips.forEach(ch => {
    ch.addEventListener('click', ()=>{
      ch.classList.add('snap');
      setTimeout(()=>ch.classList.remove('snap'), 650);
    });
  });

})();
