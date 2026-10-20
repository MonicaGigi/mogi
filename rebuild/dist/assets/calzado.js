// MÖGI: Calzado editorial — portada en movimiento, cinta de la selección y "Los pasos de Mónica".
(() => {
  const base = new URL('..', import.meta.url).href
  const zapatos = [
    { f: 'z1', n: 'Botines rojos de ante', sub: 'Botas' },
    { f: 'z3', n: 'Salones fucsia', sub: 'Tacones' },
    { f: 'z4', n: 'Deportivas camel', sub: 'Planos' },
    { f: 'z6', n: 'Zapatillas blancas', sub: 'Zapatillas' },
    { f: 'z2', n: 'Salones azul hielo', sub: 'Tacones' },
    { f: 'z5', n: 'Deportivas bronce', sub: 'Planos' },
    { f: 'z7', n: 'Caña media negras', sub: 'Zapatillas' },
    { f: 'z8', n: 'Zapatillas negras', sub: 'Zapatillas' },
  ]
  const pasos = [
    { f: 'paso1', m: 'Noche', t: 'Salón de charol con corazón' },
    { f: 'paso3', m: 'Mediodía', t: 'Salón rojo de punta' },
    { f: 'paso5', m: 'Tarde', t: 'Botín metalizado' },
  ]

  const css = document.createElement('style')
  css.textContent = `
  @keyframes mogi-kb{0%{transform:scale(1.02) translate3d(0,0,0)}100%{transform:scale(1.12) translate3d(0,-2%,0)}}
  img[src*="calzado-hero"]{animation:mogi-kb 14s ease-in-out infinite alternate;will-change:transform}
  img[src*="calzado-hero-2"]{animation-delay:-5s}
  img[src*="calzado-hero-3"]{animation-delay:-9s;animation-direction:alternate-reverse}
  article img{transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
  article:hover img{transform:scale(1.045)}

  .mogi-zr{position:absolute;left:0;right:0;bottom:44px;z-index:5;overflow:hidden;pointer-events:auto;
    -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
  .mogi-zr .lbl{position:absolute;left:48px;top:-26px;color:#fff;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;text-shadow:0 1px 8px rgba(0,0,0,.4)}
  .mogi-zr .track{display:flex;gap:14px;width:max-content;animation:mogi-mq 46s linear infinite;padding:0 14px}
  .mogi-zr:hover .track{animation-play-state:paused}
  @keyframes mogi-mq{to{transform:translateX(-50%)}}
  .mogi-zr button{all:unset;cursor:pointer;display:flex;flex-direction:column;gap:8px;width:132px}
  .mogi-zr .ph{width:132px;height:132px;overflow:hidden;background:#222;outline:1px solid rgba(255,255,255,.35);outline-offset:-1px}
  .mogi-zr img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .9s cubic-bezier(.2,.7,.2,1),filter .6s}
  .mogi-zr button:hover img{transform:scale(1.1)}
  .mogi-zr span{color:#fff;font:400 11px/1.25 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.04em;text-shadow:0 1px 8px rgba(0,0,0,.5)}
  .mogi-zr button:focus-visible .ph{outline:2px solid #fff}
  @media (max-width:640px){.mogi-zr{bottom:36px}.mogi-zr button,.mogi-zr .ph{width:92px}.mogi-zr .ph{height:92px}.mogi-zr span{font-size:10px}.mogi-zr .lbl{left:20px}}
  @media (prefers-reduced-motion:reduce){img[src*="calzado-hero"],.mogi-zr .track{animation:none}}

  .mogi-pasos{margin:4px 0 36px;display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr;gap:16px;align-items:end}
  .mogi-pasos .intro{align-self:stretch;display:flex;flex-direction:column;justify-content:space-between;padding:6px 8px 4px 0}
  .mogi-pasos .k{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#737373}
  .mogi-pasos h3{font:400 clamp(24px,2.6vw,34px)/1.08 "Playfair Display Variable",Georgia,serif;margin:12px 0 0}
  .mogi-pasos p{font:400 12px/1.6 "Inter Variable",Helvetica,Arial,sans-serif;color:#525252;margin:14px 0 0;max-width:30ch}
  .mogi-pasos figure{margin:0}
  .mogi-pasos .ph{aspect-ratio:4/5;overflow:hidden;background:#f3f2ef}
  .mogi-pasos img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
  .mogi-pasos figure:hover img{transform:scale(1.06)}
  .mogi-pasos figcaption{font:400 12px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;margin-top:10px}
  .mogi-pasos figcaption small{display:block;color:#737373;font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:3px}
  .mogi-pasos figure:nth-of-type(2){transform:translateY(-18px)}
  @media (max-width:900px){.mogi-pasos{grid-template-columns:repeat(3,1fr)}.mogi-pasos .intro{grid-column:1/-1;padding:0}.mogi-pasos figure:nth-of-type(2){transform:none}}`
  document.head.appendChild(css)

  const goSub = sub => {
    const b = [...document.querySelectorAll('button')].find(x => x.textContent.trim().toLowerCase() === sub.toLowerCase() && !x.closest('.mogi-zr'))
    if (b) b.click()
  }

  const ribbon = () => {
    const el = document.createElement('div')
    el.className = 'mogi-zr'
    const tiles = zapatos.map(z => `<button type="button" data-sub="${z.sub}" aria-label="${z.n}"><div class="ph"><img src="${base}fotos/zoom/${z.f}.jpg" alt="" loading="lazy"></div><span>${z.n}</span></button>`).join('')
    el.innerHTML = `<div class="lbl">La selección</div><div class="track">${tiles}${tiles.replace(/<button /g, '<button tabindex="-1" aria-hidden="true" ')}</div>`
    el.addEventListener('click', e => { const b = e.target.closest('button[data-sub]'); if (b) { e.stopPropagation(); goSub(b.dataset.sub) } })
    return el
  }

  const editorial = () => {
    const el = document.createElement('section')
    el.className = 'mogi-pasos'
    el.innerHTML = `<div class="intro"><div><div class="k">Editorial</div><h3>Los pasos de Mónica</h3>
      <p>Del salón de noche al botín de tarde: así combina Mónica el calzado con cada look.</p></div></div>
      ${pasos.map(p => `<figure><div class="ph"><img src="${base}fotos/fb/${p.f}.jpg" alt="${p.t}" loading="lazy"></div><figcaption><small>${p.m}</small>${p.t}</figcaption></figure>`).join('')}`
    return el
  }

  const apply = () => {
    // Portada de Calzado (con el botón "Ver todo el calzado")
    const ver = [...document.querySelectorAll('button')].find(b => /ver todo el calzado/i.test(b.textContent))
    if (ver) {
      let hero = ver
      while (hero && !hero.querySelector('img[src*="calzado-hero"]')) hero = hero.parentElement
      if (hero && !hero.querySelector('.mogi-zr')) {
        if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative'
        hero.appendChild(ribbon())
      }
    }
    // Listado de Calzado: banner con el título "Calzado"
    document.querySelectorAll('h2').forEach(h => {
      if (h.textContent.trim() !== 'Calzado') return
      const banner = h.closest('.relative')
      if (!banner || !banner.querySelector('img[src*="calzado-hero"]') || !/art[ií]culo/i.test(banner.textContent)) return
      const next = banner.nextElementSibling
      if (next && next.classList.contains('mogi-pasos')) return
      banner.insertAdjacentElement('afterend', editorial())
    })
  }
  let t
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(apply, 60) }).observe(document.getElementById('root') || document.body, { childList: true, subtree: true })
  apply()
})()
