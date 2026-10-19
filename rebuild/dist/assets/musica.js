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
  .mogi-music{position:fixed;z-index:40;right:calc(16px + env(safe-area-inset-right,0px));bottom:calc(64px + env(safe-area-inset-bottom,0px));
    display:flex;align-items:center;gap:10px;height:40px;padding:0 14px;background:rgba(255,255,255,.92);color:#111;border:1px solid #111;
    font:500 10px/1 "Inter Variable","Helvetica Neue",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;
    -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:background .3s,color .3s}
  .mogi-music:hover{background:#111;color:#fff}
  .mogi-music:focus-visible{outline:2px solid #b2ac88;outline-offset:2px}
  .mogi-music .bars{display:flex;align-items:flex-end;gap:2px;height:12px}
  .mogi-music .bars i{display:block;width:2px;height:3px;background:currentColor}
  .mogi-music.on .bars i{animation:mogi-eq 1.1s ease-in-out infinite}
  .mogi-music.on .bars i:nth-child(2){animation-delay:-.4s}.mogi-music.on .bars i:nth-child(3){animation-delay:-.8s}
  @keyframes mogi-eq{0%,100%{height:3px}50%{height:12px}}
  @media (max-width:640px){.mogi-music{width:40px;padding:0;justify-content:center}.mogi-music .lbl{display:none}}
  @media (prefers-reduced-motion:reduce){.mogi-music.on .bars i{animation:none;height:8px}}`
  document.head.appendChild(css)

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'mogi-music'
  btn.innerHTML = '<span class="bars" aria-hidden="true"><i></i><i></i><i></i></span><span class="lbl">Música</span>'
  const lbl = btn.querySelector('.lbl')
  const paint = () => {
    const on = !audio.paused
    btn.classList.toggle('on', on)
    btn.setAttribute('aria-pressed', String(on))
    btn.setAttribute('aria-label', on ? 'Pausar la música' : 'Poner música')
    lbl.textContent = on ? 'Música' : 'Música off'
  }
  document.body.appendChild(btn)

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
