// Música ambiente de MÖGI: suena suave desde el primer toque en la página.
(() => {
  const tracks = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'].map(n => new URL(`../musica/${n}.mp3`, import.meta.url).href)
  const VOL = 0.28
  const key = 'mogi-musica'
  let off = false
  try { off = localStorage.getItem(key) === 'off' } catch {}

  let order = tracks.map((_, i) => i).sort(() => Math.random() - 0.5)
  let i = 0
  const audio = new Audio()
  audio.preload = 'none'
  audio.volume = 0
  audio.addEventListener('ended', () => { i = (i + 1) % order.length; audio.src = tracks[order[i]]; audio.play().catch(() => {}) })

  const css = document.createElement('style')
  css.textContent = `
  .mogi-music{display:flex;flex-direction:column;align-items:flex-start;gap:7px;padding:2px 0;background:none;border:0;cursor:pointer;
    color:#737373;font:400 10px/1.3 "Inter Variable","Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;transition:color .4s}
  .mogi-music:hover,.mogi-music.on{color:#111}
  .mogi-music:focus-visible{outline:1px solid #111;outline-offset:4px}
  .mogi-music .bars{display:flex;align-items:flex-end;gap:3px;height:14px}
  .mogi-music .bars i{display:block;width:1px;height:2px;background:currentColor;transition:height .6s}
  .mogi-music.on .bars i{animation:mogi-eq 1.8s ease-in-out infinite}
  .mogi-music.on .bars i:nth-child(1){animation-delay:-.2s}.mogi-music.on .bars i:nth-child(2){animation-delay:-.9s}
  .mogi-music.on .bars i:nth-child(3){animation-delay:-1.4s}.mogi-music.on .bars i:nth-child(4){animation-delay:-.5s}
  @keyframes mogi-eq{0%,100%{height:3px}50%{height:14px}}
  .mogi-music.floating{position:fixed;z-index:40;left:calc(16px + env(safe-area-inset-left,0px));bottom:calc(64px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.9);padding:8px}
  @media (prefers-reduced-motion:reduce){.mogi-music.on .bars i{animation:none;height:9px}}`
  document.head.appendChild(css)

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'mogi-music'
  btn.innerHTML = '<span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="lbl">Música</span>'
  const lbl = btn.querySelector('.lbl')
  const paint = () => {
    const on = !audio.paused
    btn.classList.toggle('on', on)
    btn.classList.toggle('off', !on)
    btn.setAttribute('aria-pressed', String(on))
    const t = on ? 'Quitar la música' : 'Poner música'
    btn.setAttribute('aria-label', t)
    btn.title = t
    lbl.textContent = on ? 'Música' : 'Sin música'
  }
  // Va en la barra de la izquierda, justo debajo del botón de WhatsApp.
  const place = () => {
    const wa = document.querySelector('[aria-label="Contactar por WhatsApp"]')
    if (wa) {
      if (btn.previousElementSibling !== wa) { btn.classList.remove('floating'); wa.insertAdjacentElement('afterend', btn) }
    } else if (!btn.isConnected || !btn.classList.contains('floating')) {
      btn.classList.add('floating'); document.body.appendChild(btn)
    }
  }
  place()
  new MutationObserver(place).observe(document.getElementById('root') || document.body, { childList: true, subtree: true })

  let fadeTimer
  const fadeTo = (target, done) => {
    clearInterval(fadeTimer)
    fadeTimer = setInterval(() => {
      const d = target - audio.volume
      if (Math.abs(d) < 0.02) { audio.volume = target; clearInterval(fadeTimer); done && done(); return }
      audio.volume = Math.min(1, Math.max(0, audio.volume + Math.sign(d) * 0.02))
    }, 60)
  }
  const play = () => {
    if (!audio.src) audio.src = tracks[order[i]]
    audio.volume = 0
    audio.play().then(() => { fadeTo(VOL); paint() }).catch(paint)
  }
  const pause = () => fadeTo(0, () => { audio.pause(); paint() })

  btn.addEventListener('click', e => {
    e.stopPropagation()
    if (audio.paused) { off = false; play() } else { off = true; pause() }
    try { localStorage.setItem(key, off ? 'off' : 'on') } catch {}
  })

  // El navegador solo deja sonar música después de que la persona toque la página.
  const first = e => {
    if (btn.contains(e.target)) return
    window.removeEventListener('pointerdown', first, true)
    window.removeEventListener('keydown', first, true)
    if (!off) play()
  }
  window.addEventListener('pointerdown', first, true)
  window.addEventListener('keydown', first, true)
  document.addEventListener('visibilitychange', () => { if (document.hidden && !audio.paused) audio.pause(); else if (!document.hidden && !off && audio.src && audio.paused && btn.classList.contains('on')) audio.play().catch(() => {}) })
  paint()
})()
