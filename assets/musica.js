// MÖGI: música ambiente + lookbook en vídeo de Mónica.
// La música suena suave y continua. Al reproducir un vídeo baja y queda sutil por debajo;
// al terminar o cerrar, vuelve a su volumen.
(() => {
  const base = new URL('..', import.meta.url).href
  const tracks = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'].map(n => `${base}musica/${n}.mp3`)
  const VOL = 0.28
  const LOW = 0.14
  const XF = 6 // segundos de fundido encadenado entre canciones
  const key = 'mogi-musica'
  let off = false
  try { off = localStorage.getItem(key) === 'off' } catch {}

  const order = tracks.map((_, i) => i).sort(() => Math.random() - 0.5)
  let i = 0
  // La música nunca se corta: cada canción se funde con la siguiente sin silencios.
  let audio = new Audio()
  audio.preload = 'none'
  audio.volume = 0
  let wanted = 0, xfading = false
  const watch = a => {
    a.addEventListener('timeupdate', () => {
      if (a !== audio || xfading || !a.duration || a.paused) return
      if (a.duration - a.currentTime < XF) crossfade()
    })
    a.addEventListener('ended', () => { if (a === audio && !xfading) crossfade() })
  }
  const crossfade = () => {
    xfading = true
    const old = audio, v0 = old.volume, t0 = performance.now()
    i = (i + 1) % order.length
    const nxt = new Audio(tracks[order[i]]); nxt.volume = 0; watch(nxt)
    audio = nxt
    nxt.play().catch(() => {})
    fadeTo(wanted, null, XF * 1000)
    const step = now => {
      const k = Math.min(1, (now - t0) / (XF * 1000))
      old.volume = Math.max(0, v0 * (1 - k) * (1 - k))
      if (k < 1) requestAnimationFrame(step); else { old.pause(); xfading = false }
    }
    requestAnimationFrame(step)
  }
  watch(audio)

  // Orden: lo más reciente primero. La música de la web sigue sonando por debajo de cada vídeo.
  const historias = [
    { v: 'blusita-corazones-jeans', name: 'Blusita de punto con corazones y jeans wide leg', talla: 'M/L · L', price: 'Desde $15.50' },
    { v: 'blusa-pedreria', name: 'Blusa celeste con pedrería', talla: 'M', price: '' },
    { v: 'falda-estampada', name: 'Falda larga estampada', talla: '', price: '' },
    { v: 'set-rosa-lunares', name: 'Set de blazer rosa y pantalón de lunares', talla: 'M/L', price: '$26.50', old: '$30.00' },
    { v: 'set-rayas-flores', name: 'Set de camisa a rayas y pantalón de flores', talla: 'M/L', price: '$24.00' },
    { v: 'jacket-militar', name: 'Jacket militar', talla: 'M/L', price: '$25.00' },
    { v: 'falda-tul', name: 'Falda doble de tul', talla: 'L', price: '$15.00' },
    { v: 'sobretodo-stretch', name: 'Sobretodo stretch', talla: 'L', price: '$15.00' },
    { v: 'bolso-de-mano', name: 'Bolso de mano', talla: '', price: '$15.00' },
    { v: 'set-tres-piezas', name: 'Set de 3 piezas: chaleco, blazer y pantalón', talla: 'L', price: '$50.00' },
    { v: 'blusa-pantalon-coral', name: 'Blusa estampada y pantalón pierna ancha', talla: 'L · M/L', price: 'Desde $12.00', silent: true },
    { v: 'set-azul-marruecos', name: 'Set azul con botones de Marruecos', talla: 'XL', price: '$25.00' },
    { v: 'caftan-mostaza', name: 'Caftán mostaza', talla: 'Única', price: '$6.50', old: '$13.50' },
    { v: 'vestido-patchwork', name: 'Vestido largo patchwork', talla: 'L/XL', price: '$15.50' },
    { v: 'set-floral', name: 'Set de blusa y short floral', talla: 'M/L', price: '$22.00' },
    { v: 'blusa-satinada-roja', name: 'Blusa satinada y short de flecos', talla: 'L/XL', price: 'Desde $12.00' },
    { v: 'camisa-blanca', name: 'Camisa blanca', talla: 'XL', price: '$10.50', old: '$15.00' },
    { v: 'pantalon-estampado', name: 'Pantalón estampado', talla: 'M/L', price: '$8.50', old: '$15.50', silent: true },
    { v: 'camisero-verde', name: 'Camisero largo con cinturón', talla: 'L', price: '$13.50', silent: true },
    { v: 'looks-invierno', name: 'Looks de invierno de Mónica', talla: '', price: '', silent: true },
  ]

  // Looks de Mónica (Facebook)
  const looks = [
    { f: 'look1', t: 'Corsé floral y falda con abertura', m: 'Noche' },
    { f: 'look2', t: 'Conjunto de lunares turquesa', m: 'Brunch' },
    { f: 'look3', t: 'Vestido amarillo y salón rojo', m: 'Mediodía' },
    { f: 'look4', t: 'Vestido largo de rayas', m: 'Paseo' },
    { f: 'look5', t: 'Falda estampada y gabardina', m: 'Tarde' },
  ]

  const css = document.createElement('style')
  css.textContent = `
  .mogi-side{display:flex;flex-direction:column;align-items:flex-start;gap:14px}
  .mogi-link{display:flex;align-items:center;gap:10px;padding:2px 0;background:none;border:0;cursor:pointer;color:#737373;
    font:400 10px/1.3 "Inter Variable","Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;transition:color .4s}
  .mogi-link:hover,.mogi-music.on{color:#111}
  .mogi-link:focus-visible{outline:1px solid #111;outline-offset:4px}
  .mogi-music svg{width:28px;height:12px;overflow:hidden;flex:none}
  .mogi-music .wave{stroke:currentColor;stroke-width:1;fill:none;transform-box:fill-box;transform-origin:center;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
  .mogi-music.on .wave{animation:mogi-flow 2.6s linear infinite}
  .mogi-music:not(.on) .wave{transform:scaleY(.06)}
  @keyframes mogi-flow{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .mogi-music .state{color:inherit;opacity:.55;margin-left:-4px}
  .mogi-play{width:28px;height:12px;display:flex;align-items:center}
  .mogi-play i{display:block;width:0;height:0;border-left:7px solid currentColor;border-top:4.5px solid transparent;border-bottom:4.5px solid transparent;margin-left:9px}
  .mogi-floating{position:fixed;z-index:40;left:calc(16px + env(safe-area-inset-left,0px));bottom:calc(64px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.92);padding:10px 12px}
  @media (prefers-reduced-motion:reduce){.mogi-music.on .wave{animation:none}}

  .mogi-stories{position:fixed;inset:0;z-index:60;background:#fff;color:#111;display:flex;flex-direction:column;overflow-y:auto;
    padding:calc(20px + env(safe-area-inset-top,0px)) max(20px,env(safe-area-inset-right,0px)) calc(24px + env(safe-area-inset-bottom,0px)) max(20px,env(safe-area-inset-left,0px));
    opacity:0;transition:opacity .45s ease}
  .mogi-stories.open{opacity:1}
  .mogi-stories header{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin:0 auto 22px;width:min(1180px,100%)}
  .mogi-stories h2{font:400 clamp(26px,3.4vw,40px)/1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-stories .sub{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin-top:8px}
  .mogi-close{background:none;border:0;cursor:pointer;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#111;padding:8px 0;border-bottom:1px solid #111}
  .mogi-rail{flex:none;height:calc(100vh - 150px);min-height:420px;display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 auto;width:min(1180px,100%);padding-bottom:8px}
  .mogi-card{flex:0 0 auto;width:min(300px,72vw);scroll-snap-align:start;display:flex;flex-direction:column;gap:12px;min-height:0}
  .mogi-frame{position:relative;flex:1;min-height:0;max-height:calc(100vh - 220px);aspect-ratio:9/16;background:#f3f2ef;overflow:hidden;cursor:pointer}
  .mogi-frame video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
  .mogi-frame .hint{position:absolute;left:14px;bottom:14px;display:flex;align-items:center;gap:8px;color:#fff;
    font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;text-shadow:0 1px 8px rgba(0,0,0,.35);transition:opacity .3s}
  .mogi-frame .hint i{width:26px;height:26px;border:1px solid #fff;border-radius:50%;display:grid;place-items:center}
  .mogi-frame .hint i:after{content:"";border-left:7px solid #fff;border-top:4.5px solid transparent;border-bottom:4.5px solid transparent;margin-left:2px}
  .mogi-frame.playing .hint{opacity:0}
  .mogi-cap{display:flex;justify-content:space-between;gap:10px;font:400 13px/1.35 "Inter Variable",Helvetica,Arial,sans-serif}
  .mogi-cap small{display:block;color:#737373;font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-top:4px}
  .mogi-cap .p{white-space:nowrap;text-align:right}
  .mogi-cap s{display:block;color:#9a9a9a;font-size:11px}
  .mogi-cap .sale{color:#c0392b}
  .mogi-looks{width:min(1180px,100%);margin:56px auto 24px}
  .mogi-looks .t{display:flex;align-items:baseline;justify-content:space-between;gap:16px;border-top:1px solid #e7e5e0;padding-top:22px;margin-bottom:22px}
  .mogi-looks h3{font:400 clamp(22px,2.6vw,32px)/1.1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-looks .t span{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#737373}
  .mogi-looks .g{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
  .mogi-looks figure{margin:0}
  .mogi-looks .ph{aspect-ratio:4/5;overflow:hidden;background:#f3f2ef}
  .mogi-looks img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
  .mogi-looks figure:hover img{transform:scale(1.05)}
  .mogi-looks figcaption{font:400 12px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;margin-top:10px}
  .mogi-looks figcaption small{display:block;color:#737373;font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:3px}
  @media (max-width:900px){.mogi-looks .g{grid-template-columns:repeat(2,1fr)}.mogi-looks figure:first-child{grid-column:span 2}}`
  document.head.appendChild(css)

  // Botones de la barra lateral
  const wrap = document.createElement('div')
  wrap.className = 'mogi-side'
  wrap.innerHTML = `
    <button type="button" class="mogi-link mogi-music">
      <svg viewBox="0 0 28 12" aria-hidden="true"><path class="wave" d="M0 6 C3.5 0 7 0 10.5 6 S17.5 12 21 6 S28 0 31.5 6 S38.5 12 42 6 S49 0 52.5 6 S56 12 56 6"/></svg>
      <span class="lbl">Música</span><span class="state"></span>
    </button>
`
  const btn = wrap.querySelector('.mogi-music')
  const state = wrap.querySelector('.state')
  const paint = () => {
    const on = !audio.paused
    btn.classList.toggle('on', on)
    btn.setAttribute('aria-pressed', String(on))
    btn.setAttribute('aria-label', on ? 'Quitar la música' : 'Poner música')
    state.textContent = on ? '' : 'Off'
  }
  const place = () => {
    const wa = document.querySelector('[aria-label="Contactar por WhatsApp"]')
    if (wa) {
      if (wrap.previousElementSibling !== wa) { wrap.classList.remove('mogi-floating'); wa.insertAdjacentElement('afterend', wrap) }
    } else if (!wrap.isConnected || !wrap.classList.contains('mogi-floating')) {
      wrap.classList.add('mogi-floating'); document.body.appendChild(wrap)
    }
  }
  // Lookbook en el menú principal, junto a las secciones
  const look = document.createElement('button')
  look.type = 'button'
  look.className = 'mogi-hist py-2 text-left text-[11px] tracking-[0.14em] uppercase transition text-neutral-500 hover:text-ink'
  look.textContent = 'Lookbook'
  const placeLook = () => {
    const sp = [...document.querySelectorAll('aside > button')].find(x => /special prices/i.test(x.textContent))
    if (sp && look.nextElementSibling !== sp) sp.insertAdjacentElement('beforebegin', look)
  }
  const place2 = () => { place(); placeLook() }
  place2()
  new MutationObserver(place2).observe(document.getElementById('root') || document.body, { childList: true, subtree: true })

  // Fundidos suaves por tiempo (subidas lentas, bajadas algo más rápidas)
  let fadeRaf
  const fadeTo = (target, done, ms) => {
    cancelAnimationFrame(fadeRaf)
    wanted = target
    const from = audio.volume, d = ms ?? (target > from ? 3500 : 1400), t0 = performance.now()
    const step = now => {
      const k = Math.min(1, (now - t0) / d), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * e))
      if (k < 1) fadeRaf = requestAnimationFrame(step); else done && done()
    }
    fadeRaf = requestAnimationFrame(step)
  }
  const play = () => {
    if (!audio.src) audio.src = tracks[order[i]]
    audio.volume = 0
    audio.play().then(() => { fadeTo(VOL, null, 5000); paint() }).catch(paint)
  }
  const pause = () => fadeTo(0, () => { audio.pause(); paint() })

  btn.addEventListener('click', e => {
    e.stopPropagation()
    if (audio.paused) { off = false; play() } else { off = true; pause() }
    try { localStorage.setItem(key, off ? 'off' : 'on') } catch {}
  })

  // Mientras suena un vídeo, la música baja y sigue sonando suave por debajo; luego vuelve.
  let ducked = false
  let lifted = false
  const duck = () => {
    if (off) { if (lifted) { lifted = false; ducked = false; fadeTo(0, () => { audio.pause(); paint() }) } return }
    lifted = false
    ducked = true
    if (audio.paused) { if (!audio.src) audio.src = tracks[order[i]]; audio.volume = 0; audio.play().then(paint).catch(() => {}) }
    fadeTo(LOW)
  }
  // Vídeos sin sonido propio: la música sigue a su volumen normal (y arranca si estaba esperando).
  const keep = () => {
    if (off) return
    ducked = true; lifted = false
    if (audio.paused) { if (!audio.src) audio.src = tracks[order[i]]; audio.volume = 0; audio.play().then(paint).catch(() => {}) }
    fadeTo(VOL, null, 2500)
  }
  const unduck = () => {
    if (!ducked) return
    ducked = false
    const wasLifted = lifted; lifted = false
    if (off) { if (wasLifted) fadeTo(0, () => { audio.pause(); paint() }, 2500); return }
    if (audio.paused) play(); else fadeTo(VOL)
  }

  window.mogiMusic = { duck: () => duck(), unduck: () => unduck() }
  // Lookbook
  let panel
  const openStories = () => {
    panel = document.createElement('div')
    panel.className = 'mogi-stories'
    panel.setAttribute('role', 'dialog')
    panel.setAttribute('aria-label', 'Lookbook de MÖGI')
    panel.innerHTML = `
      <header><h2>Lookbook</h2>
      <button type="button" class="mogi-close">Cerrar</button></header>
      <div class="mogi-rail">${historias.map(h => `
        <figure class="mogi-card" style="margin:0">
          <div class="mogi-frame"><video src="${base}videos/${h.v}.mp4" poster="${base}videos/${h.v}.jpg" playsinline muted loop preload="none"></video>
            <span class="hint"><i></i>Reproducir</span></div>
          <figcaption class="mogi-cap"><div>${h.name}${h.talla ? `<small>Talla ${h.talla}</small>` : ''}</div>
            <div class="p">${h.old ? `<s>${h.old}</s><span class="sale">${h.price}</span>` : h.price}</div></figcaption>
        </figure>`).join('')}</div>
      <section class="mogi-looks"><div class="t"><h3>Los looks de Mónica</h3><span>Inspiración</span></div>
        <div class="g">${looks.map(l => `<figure><div class="ph"><img src="${base}fotos/fb/${l.f}.jpg" alt="${l.t}" loading="lazy"></div>
          <figcaption><small>${l.m}</small>${l.t}</figcaption></figure>`).join('')}</div></section>`
    document.body.appendChild(panel)
    requestAnimationFrame(() => panel.classList.add('open'))
    const vids = [...panel.querySelectorAll('video')]
    // Vista previa silenciosa
    const io = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target
      if (e.isIntersecting) v.play().catch(() => {}); else if (!v.parentElement.classList.contains('playing')) v.pause()
    }), { root: panel.querySelector('.mogi-rail'), threshold: 0.4 })
    vids.forEach(v => io.observe(v))
    panel.querySelectorAll('.mogi-frame').forEach((f, k) => f.addEventListener('click', () => {
      const v = vids[k]
      const wasActive = f.classList.contains('playing')
      vids.forEach((o, j) => { if (j !== k) { o.muted = true; o.parentElement.classList.remove('playing') } })
      if (wasActive) { v.muted = true; f.classList.remove('playing'); unduck(); return }
      historias[k].silent ? keep() : duck(); v.muted = false; v.loop = false; v.currentTime = 0; v.play().catch(() => {}); f.classList.add('playing')
      v.onended = () => { f.classList.remove('playing'); v.muted = true; v.loop = true; v.play().catch(() => {}); unduck() }
    }))
    const close = () => { vids.forEach(v => v.pause()); panel.classList.remove('open'); setTimeout(() => panel.remove(), 450); unduck(); document.removeEventListener('keydown', esc) }
    const esc = e => { if (e.key === 'Escape') close() }
    panel.querySelector('.mogi-close').addEventListener('click', close)
    document.addEventListener('keydown', esc)
  }
  look.addEventListener('click', e => { e.stopPropagation(); openStories() })

  // El navegador solo deja sonar música después de que la persona toque la página.
  const first = e => {
    if (wrap.contains(e.target) || look.contains(e.target)) return
    window.removeEventListener('pointerdown', first, true)
    window.removeEventListener('keydown', first, true)
    if (!off && !panel?.isConnected) play()
  }
  window.addEventListener('pointerdown', first, true)
  window.addEventListener('keydown', first, true)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (!audio.paused) audio.pause() }
    else if (!off && !ducked && audio.src && btn.classList.contains('on')) audio.play().catch(() => {})
  })
  paint()
})()
