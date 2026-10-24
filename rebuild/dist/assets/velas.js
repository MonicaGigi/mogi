// MÖGI · La Maison: velas perfumadas (colección en preparación)
{
  const base = new URL('..', import.meta.url).href
  const WA = '50766001620'
  const L = () => { try { return localStorage.getItem('mogi-lang') || 'en' } catch { return 'en' } }
  const es = () => L() === 'es'
  const wa = txt => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`
  const img = n => `${base}fotos/velas/vela-${n}.jpg`

  const C = [
    { id: 'segunda-piel', es: ['Segunda Piel', 'Algodón limpio, iris y almizcle blanco', 'La calma de una camisa recién planchada. Un aroma íntimo y luminoso, como la piel después del sol.', 'Vaso de cerámica marfil'],
      en: ['Segunda Piel', 'Clean cotton, iris and white musk', 'The calm of a freshly pressed shirt. An intimate, luminous scent, like skin after the sun.', 'Ivory ceramic vessel'] },
    { id: 'jardin-de-noche', es: ['Jardín de Noche', 'Jazmín, nardo y madera de cedro', 'Un jardín tropical cuando cae la tarde. Flores blancas que se abren en la oscuridad sobre un fondo de maderas suaves.', 'Vaso de cerámica negra'],
      en: ['Jardín de Noche', 'Jasmine, tuberose and cedarwood', 'A tropical garden as evening falls. White flowers opening in the dark over a base of soft woods.', 'Black ceramic vessel'] },
    { id: 'brisa-del-pacifico', es: ['Brisa del Pacífico', 'Sal marina, higuera y vetiver', 'El aire del mar entrando por la ventana. Verde, salino y sereno, para casas que miran al horizonte.', 'Vaso de cerámica verde salvia'],
      en: ['Brisa del Pacífico', 'Sea salt, fig leaf and vetiver', 'Ocean air drifting through an open window. Green, saline and serene, for homes that face the horizon.', 'Sage green ceramic vessel'] },
    { id: 'atelier', es: ['Atelier', 'Rosa, cuero suave y ámbar', 'El taller donde las piezas reciben su segunda vida. Rosa empolvada, cuero gastado y un calor ambarino que abraza.', 'Vaso de cerámica rosa arcilla'],
      en: ['Atelier', 'Rose, soft leather and amber', 'The atelier where pieces receive their second life. Powdery rose, worn leather and an embracing amber warmth.', 'Clay rose ceramic vessel'] },
  ]

  const T = () => es() ? {
    menu: 'La Maison', title: 'La Maison', sub: 'Velas perfumadas · Próximamente',
    intro: 'Una pequeña colección de velas para vestir la casa con la misma intención con la que elegimos cada pieza. Cera vegetal, mecha de algodón y vasos de cerámica pensados para tener una segunda vida cuando la vela se apaga.',
    soon: 'Próximamente', size: '220 g · aprox. 50 horas', notes: 'Notas', vessel: 'Recipiente',
    wax: 'Cera vegetal de coco y colza · Mecha de algodón', reuse: 'Segunda vida: el vaso, limpio, se convierte en joyero, macetero o portabrochas.',
    ritualT: 'El ritual', ritual: [['Primer encendido', 'Deja que la cera se funda hasta los bordes, unas 3–4 horas. Así arderá siempre de forma uniforme.'], ['La mecha', 'Recórtala a 5 mm antes de cada encendido para una llama limpia y serena.'], ['Apagar', 'Usa un apagavelas o una tapa: sin humo, el aroma permanece en la estancia.']],
    secondT: 'Una segunda vida, también aquí', second: 'Cuando la vela termina, su vaso de cerámica empieza otra historia. Retira la cera con agua caliente y dale un nuevo uso en tu tocador o en tu escritorio.',
    cta: 'Unirme a la lista de espera', ctaOne: n => `Hola, me gustaría reservar la vela «${n}» de MÖGI en cuanto esté disponible.`,
    ctaAll: 'Hola, me gustaría unirme a la lista de espera de las velas de MÖGI La Maison.',
    reserve: 'Reservar', back: 'Volver a La Maison', close: 'Cerrar', disc: 'Imágenes ilustrativas de la colección en preparación.',
    teaser: 'Descubrir La Maison', teaserSub: 'Velas perfumadas · Próximamente',
  } : {
    menu: 'La Maison', title: 'La Maison', sub: 'Scented candles · Coming soon',
    intro: 'A small collection of candles to dress the home with the same intention we put into every piece. Plant wax, cotton wicks and ceramic vessels designed for a second life once the candle is spent.',
    soon: 'Coming soon', size: '220 g · approx. 50 hours', notes: 'Notes', vessel: 'Vessel',
    wax: 'Coconut and rapeseed plant wax · Cotton wick', reuse: 'Second life: once clean, the vessel becomes a jewellery dish, planter or brush holder.',
    ritualT: 'The ritual', ritual: [['First burn', 'Let the wax melt all the way to the edges, about 3–4 hours. It will then always burn evenly.'], ['The wick', 'Trim it to 5 mm before each use for a clean, calm flame.'], ['Extinguish', 'Use a snuffer or a lid: no smoke, and the scent lingers in the room.']],
    secondT: 'A second life, here too', second: 'When the candle ends, its ceramic vessel begins another story. Remove the wax with hot water and give it a new purpose on your dresser or your desk.',
    cta: 'Join the Waitlist', ctaOne: n => `Hello, I would like to reserve the MÖGI "${n}" candle as soon as it is available.`,
    ctaAll: 'Hello, I would like to join the waitlist for MÖGI La Maison candles.',
    reserve: 'Reserve', back: 'Back to La Maison', close: 'Close', disc: 'Illustrative images of the collection in preparation.',
    teaser: 'Discover La Maison', teaserSub: 'Scented candles · Coming soon',
  }

  const css = document.createElement('style')
  css.textContent = `
  .mogi-lm{position:fixed;inset:0;z-index:61;background:#faf8f5;color:#111;overflow-y:auto;opacity:0;transition:opacity .5s ease;
    padding:calc(20px + env(safe-area-inset-top,0px)) max(20px,env(safe-area-inset-right,0px)) calc(48px + env(safe-area-inset-bottom,0px)) max(20px,env(safe-area-inset-left,0px))}
  .mogi-lm.open{opacity:1}
  .mogi-lm .in{width:min(1120px,100%);margin:0 auto}
  .mogi-lm header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:18px}
  .mogi-lm .brand{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#8a8580}
  .mogi-lm .x{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111}
  .mogi-lm .hero{position:relative;overflow:hidden;background:#e9e4dc}
  .mogi-lm .hero img{display:block;width:100%;aspect-ratio:2400/550;object-fit:cover}
  @media (max-width:760px){.mogi-lm .hero img{aspect-ratio:4/3;object-position:12% 50%}}
  .mogi-lm .head{text-align:center;padding:40px 0 8px}
  .mogi-lm h2{font:400 clamp(34px,5vw,60px)/1 "Playfair Display Variable",Georgia,serif;margin:0;letter-spacing:.02em}
  .mogi-lm .sub{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#8a8580;margin-top:16px}
  .mogi-lm .intro{font:400 15px/1.85 "Inter Variable",Helvetica,Arial,sans-serif;color:#4a4744;max-width:600px;margin:26px auto 0;text-align:center}
  .mogi-lm .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:56px}
  @media (max-width:900px){.mogi-lm .grid{grid-template-columns:repeat(2,1fr);gap:26px 14px}}
  .mogi-lm .card{background:none;border:0;padding:0;text-align:left;cursor:pointer;color:inherit}
  .mogi-lm .card .ph{aspect-ratio:4/5;overflow:hidden;background:#e9e4dc}
  .mogi-lm .card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
  .mogi-lm .card:hover img{transform:scale(1.035)}
  .mogi-lm .card h3{font:400 19px/1.2 "Playfair Display Variable",Georgia,serif;margin:16px 0 6px}
  .mogi-lm .card p{font:400 11.5px/1.55 "Inter Variable",Helvetica,Arial,sans-serif;color:#6b6762;margin:0}
  .mogi-lm .card small{display:block;margin-top:10px;font:400 9px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#a09a93}
  .mogi-lm .rit{margin-top:84px;border-top:1px solid #e4dfd8;padding-top:44px}
  .mogi-lm .rit h4,.mogi-lm .sec h4{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#8a8580;margin:0 0 30px;text-align:center}
  .mogi-lm .rit .r{display:grid;grid-template-columns:repeat(3,1fr);gap:34px}
  @media (max-width:760px){.mogi-lm .rit .r{grid-template-columns:1fr;gap:24px}}
  .mogi-lm .rit b{display:block;font:400 21px/1.2 "Playfair Display Variable",Georgia,serif;margin-bottom:10px}
  .mogi-lm .rit span{font:400 13px/1.7 "Inter Variable",Helvetica,Arial,sans-serif;color:#5a5650}
  .mogi-lm .rit .n{display:block;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;color:#a09a93;margin-bottom:14px}
  .mogi-lm .sec{margin-top:72px;text-align:center}
  .mogi-lm .sec p{font:400 italic clamp(18px,2.2vw,24px)/1.6 "Playfair Display Variable",Georgia,serif;color:#3a3734;max-width:720px;margin:0 auto}
  .mogi-lm .ctaw{text-align:center;margin-top:44px}
  .mogi-lm .cta{display:inline-block;background:#111;color:#fff !important;text-decoration:none;font:500 11px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;padding:18px 34px;transition:background .3s}
  .mogi-lm .cta:hover{background:#3a3a3a}
  .mogi-lm .disc{text-align:center;font:400 10px/1.5 "Inter Variable",Helvetica,Arial,sans-serif;color:#aaa49d;margin-top:28px}
  .mogi-lm .pd{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:56px;align-items:center;margin-top:8px}
  @media (max-width:820px){.mogi-lm .pd{grid-template-columns:1fr;gap:28px}}
  .mogi-lm .pd .ph{aspect-ratio:4/5;overflow:hidden;background:#e9e4dc}
  .mogi-lm .pd img{width:100%;height:100%;object-fit:cover;display:block}
  .mogi-lm .pd small{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#a09a93}
  .mogi-lm .pd h3{font:400 clamp(32px,4vw,48px)/1.05 "Playfair Display Variable",Georgia,serif;margin:16px 0 22px}
  .mogi-lm .pd .desc{font:400 15px/1.8 "Inter Variable",Helvetica,Arial,sans-serif;color:#4a4744;margin:0 0 30px}
  .mogi-lm .pd dl{margin:0;border-top:1px solid #e4dfd8}
  .mogi-lm .pd dl div{display:grid;grid-template-columns:120px 1fr;gap:16px;padding:14px 0;border-bottom:1px solid #e4dfd8}
  .mogi-lm .pd dt{font:400 10px/1.6 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8a8580}
  .mogi-lm .pd dd{margin:0;font:400 13px/1.6 "Inter Variable",Helvetica,Arial,sans-serif;color:#2a2826}
  .mogi-lm .pd .acts{display:flex;flex-wrap:wrap;align-items:center;gap:22px;margin-top:34px}
  .mogi-lm .lk{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#111;background:none;border:0;border-bottom:1px solid #111;padding:0 0 3px;cursor:pointer}
  .mogi-lm-teaser{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);align-items:center;gap:0;width:min(1180px,100%);margin:56px auto 0;background:#f1ede7;cursor:pointer;border:0;padding:0;text-align:left;color:#111}
  .mogi-lm-teaser img{display:block;width:100%;aspect-ratio:2400/1100;object-fit:cover;object-position:0 50%}
  .mogi-lm-teaser div{padding:28px 34px}
  .mogi-lm-teaser b{display:block;font:400 clamp(24px,3vw,36px)/1.05 "Playfair Display Variable",Georgia,serif;font-weight:400}
  .mogi-lm-teaser small{display:block;margin-top:12px;font:400 9px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#8a8580}
  .mogi-lm-teaser u{display:inline-block;margin-top:20px;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;border-bottom:1px solid #111;padding-bottom:3px}
  @media (max-width:700px){.mogi-lm-teaser{grid-template-columns:1fr}.mogi-lm-teaser img{aspect-ratio:16/9}.mogi-lm-teaser div{padding:22px 20px 26px;text-align:center}}
  `
  document.head.appendChild(css)

  let P = null
  const close = () => { if (!P) return; const p = P; P = null; p.classList.remove('open'); document.documentElement.style.overflow = ''; setTimeout(() => p.remove(), 500); document.removeEventListener('keydown', esc) }
  const esc = e => { if (e.key === 'Escape') close() }
  const shell = inner => {
    const t = T()
    if (!P) {
      P = document.createElement('div'); P.className = 'mogi-lm'; P.setAttribute('role', 'dialog'); P.setAttribute('aria-label', 'La Maison')
      document.body.appendChild(P); document.documentElement.style.overflow = 'hidden'
      requestAnimationFrame(() => P && P.classList.add('open')); document.addEventListener('keydown', esc)
    }
    P.innerHTML = `<div class="in"><header><span class="brand">MÖGI · La Maison</span><button type="button" class="x">${t.close}</button></header>${inner}</div>`
    P.querySelector('.x').addEventListener('click', close)
    P.scrollTop = 0
  }
  const list = () => {
    const t = T(), k = es() ? 'es' : 'en'
    shell(`<div class="head"><h2>${t.title}</h2><div class="sub">${t.sub}</div><p class="intro">${t.intro}</p></div>
      <div class="grid">${C.map((c, i) => `<button type="button" class="card" data-i="${i}"><div class="ph"><img src="${img(c.id)}" alt="${c[k][0]}" loading="lazy"></div><h3>${c[k][0]}</h3><p>${c[k][1]}</p><small>${t.soon}</small></button>`).join('')}</div>
      <section class="rit"><h4>${t.ritualT}</h4><div class="r">${t.ritual.map(([h, p], i) => `<div><span class="n">0${i + 1}</span><b>${h}</b><span>${p}</span></div>`).join('')}</div></section>
      <section class="sec"><h4>${t.secondT}</h4><p>${t.second}</p></section>
      <div class="ctaw"><a class="cta" target="_blank" rel="noopener" href="${wa(t.ctaAll)}">${t.cta}</a></div>
      <p class="disc">${t.disc}</p>`)
    P.querySelectorAll('.card').forEach(b => b.addEventListener('click', () => detail(+b.dataset.i)))
  }
  const detail = i => {
    const t = T(), k = es() ? 'es' : 'en', c = C[i][k]
    shell(`<div class="pd"><div class="ph"><img src="${img(C[i].id)}" alt="${c[0]}"></div><div>
      <small>${t.soon} · N.º ${String(i + 1).padStart(2, '0')}</small><h3>${c[0]}</h3><p class="desc">${c[2]}</p>
      <dl><div><dt>${t.notes}</dt><dd>${c[1]}</dd></div><div><dt>${t.vessel}</dt><dd>${c[3]} · ${t.size}</dd></div><div><dt>Cera / Wax</dt><dd>${t.wax}</dd></div><div><dt>MÖGI</dt><dd>${t.reuse}</dd></div></dl>
      <div class="acts"><a class="cta" target="_blank" rel="noopener" href="${wa(t.ctaOne(c[0]))}">${t.cta}</a><button type="button" class="lk back">${t.back}</button></div>
      </div></div><p class="disc">${t.disc}</p>`)
    P.querySelector('.back').addEventListener('click', list)
  }
  window.mogiMaison = list

  // Menú: después de "Sell With Us"
  const btn = document.createElement('button')
  btn.type = 'button'; btn.className = 'mogi-svc-lm py-2 text-left text-[11px] tracking-[0.14em] uppercase transition text-neutral-500 hover:text-ink'
  btn.textContent = 'La Maison'
  btn.addEventListener('click', e => { e.stopPropagation(); list() })
  // Teaser en portada
  const tz = document.createElement('button')
  tz.type = 'button'; tz.className = 'mogi-lm-teaser'
  tz.addEventListener('click', list)
  let painted = ''
  const place = () => {
    const lang = L()
    if (painted !== lang) { const t = T(); tz.innerHTML = `<img src="${base}fotos/velas/la-maison.jpg" alt="" loading="lazy"><div><b>La Maison</b><small>${t.teaserSub}</small><u>${t.teaser}</u></div>`; painted = lang }
    const sv = document.querySelector('aside > .mogi-svc-v')
    if (sv && sv.nextElementSibling !== btn) sv.insertAdjacentElement('afterend', btn)
    const home = document.querySelector('.mogi-arch-home')
    if (home && tz.parentNode !== home) {
      const nt = home.querySelector('.mogi-notify')
      nt ? home.insertBefore(tz, nt) : home.appendChild(tz)
    }
  }
  let q = 0
  new MutationObserver(() => { if (!q) q = requestAnimationFrame(() => { q = 0; place() }) }).observe(document.documentElement, { childList: true, subtree: true })
  place()
}
