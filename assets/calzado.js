// MÖGI: Calzado editorial — portada en movimiento, "Los pasos de Mónica".
(() => {
  const base = new URL('..', import.meta.url).href
  const pasos = [
    { f: 'look1', m: 'Noche', t: 'Salón de charol con corazón' },
    { f: 'look3', m: 'Mediodía', t: 'Salón rojo de punta' },
    { f: 'look5', m: 'Tarde', t: 'Botín metalizado' },
  ]

  const css = document.createElement('style')
  css.textContent = `
  @keyframes mogi-kb{0%{transform:scale(1) translate3d(0,0,0)}100%{transform:scale(1.06) translate3d(0,-1%,0)}}
  img[src*="calzado-hero"]{animation:mogi-kb 20s ease-in-out infinite alternate;will-change:transform}
  img[src*="calzado-hero-2"]{animation-delay:-5s}
  img[src*="calzado-hero-3"]{animation-delay:-9s;animation-direction:alternate-reverse}
  article img{transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
  article:hover img{transform:scale(1.045)}

  @media (prefers-reduced-motion:reduce){img[src*="calzado-hero"]{animation:none}}

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

  const editorial = () => {
    const el = document.createElement('section')
    el.className = 'mogi-pasos'
    el.innerHTML = `<div class="intro"><div><h3>Los pasos de Mónica</h3>
      <p>Del salón de noche al botín de tarde: así combina Mónica el calzado con cada look.</p></div></div>
      ${pasos.map(p => `<figure><div class="ph"><img src="${base}fotos/fb/${p.f}.jpg" alt="${p.t}" loading="lazy"></div><figcaption><small>${p.m}</small>${p.t}</figcaption></figure>`).join('')}`
    return el
  }

  const apply = () => {
    // Fuera de Calzado no debe quedar el bloque (React reutiliza el banner al cambiar de sección)
    document.querySelectorAll('.mogi-pasos').forEach(el => {
      const prev = el.previousElementSibling, h = prev && prev.querySelector('h2')
      if (!h || h.textContent.trim() !== 'Calzado' || !prev.querySelector('img[src*="calzado-hero"]')) el.remove()
    })
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
