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
  .mogi-frase{display:grid;grid-template-columns:1fr 1.4fr;gap:24px;align-items:end;margin:6px 0 30px;padding-bottom:22px;border-bottom:1px solid #e7e5e0}
  .mogi-frase h3{font:400 clamp(24px,2.6vw,34px)/1.08 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-frase p{font:400 13px/1.65 "Inter Variable",Helvetica,Arial,sans-serif;color:#525252;margin:0;max-width:52ch}
  .mogi-frase.con-video{grid-template-columns:1fr 1.4fr 130px;align-items:center}
  .mogi-fv{margin:0}.mogi-fv .fr{position:relative;aspect-ratio:9/16;overflow:hidden;background:#f3f2ef;cursor:pointer}
  .mogi-fv video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .mogi-fv .hint{position:absolute;left:10px;bottom:10px;display:flex;align-items:center;gap:6px;color:#fff;font:400 9px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;text-shadow:0 1px 6px rgba(0,0,0,.4);transition:opacity .3s}
  .mogi-fv .hint i{width:22px;height:22px;border:1px solid #fff;border-radius:50%;display:grid;place-items:center}
  .mogi-fv .hint i:after{content:"";border-left:6px solid #fff;border-top:4px solid transparent;border-bottom:4px solid transparent;margin-left:2px}
  .mogi-fv .playing .hint{opacity:0}
  .mogi-fv figcaption{font:400 12px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;margin-top:8px}
  .mogi-fv figcaption small{display:block;color:#737373;font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:2px}
  @media (max-width:700px){.mogi-frase,.mogi-frase.con-video{grid-template-columns:1fr;gap:10px}.mogi-fv{width:150px}}
  @media (max-width:900px){.mogi-pasos{grid-template-columns:repeat(3,1fr)}.mogi-pasos .intro{grid-column:1/-1;padding:0}.mogi-pasos figure:nth-of-type(2){transform:none}}`
  document.head.appendChild(css)

  // Frases de inspiración para cada sección, en el tono de "Los pasos de Mónica"
  const frases = {
    'Novedades': ['Fresh From the Closet', 'Recién elegidas, cada una con su historia: piezas únicas de segunda vida que llegan antes de que desaparezcan.'],
    'Colección': ['The Wardrobe', 'Vestidos, blusas y conjuntos que ella misma ha vivido y combinado: prendas con carácter, listas para una nueva historia.'],
    'Accesorios': ['The Finishing Touch', 'De los aretes de rafia al collar de noche: así remata Mónica cada look con un toque de color y artesanía.'],
    'Special Prices': ['Rare Finds', 'Sus favoritas a precio especial: piezas que no se repiten, para quien sabe que el estilo no se mide en dólares.'],
    'Vestidos': ['Effortless Silhouettes', 'Del caftán de mediodía al vestido largo de noche: siluetas que fluyen y se adaptan a cada plan.'],
    'Blusas': ['Silk & Colour', 'Satén, color y caída ligera: la pieza que transforma unos vaqueros en un look.'],
    'Top-bodies': ['The Essentials', 'Básicos con alma: punto, rayas y escotes que suman sin esfuerzo.'],
    'Camisetas': ['Easy Days', 'Algodón estampado y frescura para los días de sol: lo sencillo, bien elegido.'],
    'Pantalones': ['Wide & Bold', 'Pierna ancha, estampados y vaqueros con historia: la base de un armario con personalidad.'],
    'Shorts': ['Summer Mode', 'Flecos, cuentas y denim: el verano de Panamá en clave divertida.'],
    'Faldas': ['In Motion', 'Midi, larga o de lunares: movimiento y feminidad en cada paso.'],
    'Conjuntos': ['Perfect Pairs', 'Dos piezas, mil combinaciones: llévalos juntos o por separado.'],
    'Blazers': ['Sharp Tailoring', 'Cuadros, rayas y príncipe de Gales: la prenda que pone estructura a cualquier look.'],
    'Aretes': ['Frame the Face', 'Flores de rafia, oro martillado y cristal: el brillo que enmarca la mirada.'],
    'Collares y sets': ['The Final Flourish', 'Piezas artesanales que hablan por sí solas: el broche final de cada look.'],
    'Botas': ['Statement Boots', 'Ante, color y tacón ancho: carácter de la cabeza a los pies.'],
    'Tacones': ['High Notes', 'Salones de punta en fucsia y azul hielo: elegancia que se oye al caminar.'],
    'Planos': ['City Walk', 'Comodidad con estilo para recorrer la ciudad.'],
    'Zapatillas': ['Off Duty', 'Del blanco impecable al negro urbano: el toque relajado que todo look necesita.'],
  }
  // Nombres de sección al estilo de las grandes firmas (solo cambia lo que se ve)
  const nombres = {
    'Novedades': 'New In', 'Colección': 'The Collection', 'Calzado': 'Shoes', 'Accesorios': 'Accessories', 'Special Prices': 'The Private Edit',
    'Vestidos': 'Dresses', 'Blusas': 'Blouses', 'Top-bodies': 'Tops & Bodies', 'Camisetas': 'T-Shirts', 'Pantalones': 'Trousers', 'Shorts': 'Shorts',
    'Faldas': 'Skirts', 'Conjuntos': 'Sets', 'Blazers': 'Blazers', 'Aretes': 'Earrings', 'Collares y sets': 'Necklaces & Sets',
    'Botas': 'Boots', 'Tacones': 'Heels', 'Planos': 'Flats', 'Zapatillas': 'Sneakers',
    'Ver novedades': 'Discover New In', 'Ver todo el calzado': 'Shop All Shoes', 'Ver toda la colección': 'Shop the Collection', 'Ver todos los accesorios': 'Shop Accessories',
  }
  const orig = el => el.dataset.orig || el.textContent.trim()
  const rename = () => {
    document.querySelectorAll('aside button, h2, h1, button, a').forEach(el => {
      if (el.closest('.mogi-stories,.mogi-frase,.mogi-pasos')) return
      const tn = [...el.childNodes].find(n => n.nodeType === 3 && n.data.trim())
      if (!tn || [...el.children].some(c => c.textContent.trim())) return
      const t = tn.data.trim()
      if (el.dataset.orig && nombres[el.dataset.orig] === t) return
      if (nombres[t]) { el.dataset.orig = t; tn.data = nombres[t] }
    })
  }
  const frase = key => {
    const el = document.createElement('section')
    el.className = 'mogi-frase'
    el.dataset.key = key
    el.innerHTML = `<h3>${frases[key][0]}</h3><p>${frases[key][1]}</p>`
    if (key === 'Accesorios' || key === 'Collares y sets') {
      el.classList.add('con-video')
      el.insertAdjacentHTML('beforeend', `<figure class="mogi-fv"><div class="fr"><video src="${base}videos/collar-artesanal.mp4" poster="${base}videos/collar-artesanal.jpg" playsinline muted loop preload="metadata"></video><span class="hint"><i></i>Ver en vídeo</span></div><figcaption><small>Collar artesanal plateado</small>$15.00</figcaption></figure>`)
      const f = el.querySelector('.fr'), v = f.querySelector('video')
      v.play().catch(() => {})
      f.addEventListener('click', () => {
        if (f.classList.contains('playing')) { v.muted = true; f.classList.remove('playing'); window.mogiMusic?.unduck(); return }
        window.mogiMusic?.duck(); v.muted = false; v.currentTime = 0; v.loop = false; v.play().catch(() => {}); f.classList.add('playing')
        v.onended = () => { f.classList.remove('playing'); v.muted = true; v.loop = true; v.play().catch(() => {}); window.mogiMusic?.unduck() }
      })
    }
    return el
  }

  const editorial = () => {
    const el = document.createElement('section')
    el.className = 'mogi-pasos'
    el.innerHTML = `<div class="intro"><div><h3>Step by Step</h3>
      <p>Del salón de noche al botín de tarde: así combina Mónica el calzado con cada look.</p></div></div>
      ${pasos.map(p => `<figure><div class="ph"><img src="${base}fotos/fb/${p.f}.jpg" alt="${p.t}" loading="lazy"></div><figcaption><small>${p.m}</small>${p.t}</figcaption></figure>`).join('')}`
    return el
  }

  const apply = () => {
    rename()
    // Fuera de Calzado no debe quedar el bloque (React reutiliza el banner al cambiar de sección)
    document.querySelectorAll('.mogi-pasos').forEach(el => {
      const prev = el.previousElementSibling, h = prev && prev.querySelector('h2')
      if (!h || orig(h) !== 'Calzado' || !prev.querySelector('img[src*="calzado-hero"]')) el.remove()
    })
    // Frases por sección: solo junto al banner de su sección
    document.querySelectorAll('.mogi-frase').forEach(el => {
      const prev = el.previousElementSibling, h = prev && prev.querySelector('h2')
      if (!h || orig(h) !== el.dataset.key) el.remove()
    })
    document.querySelectorAll('h2').forEach(h => {
      const key = orig(h)
      if (!frases[key]) return
      const banner = h.closest('.relative')
      if (!banner || !banner.querySelector('img') || !/art[ií]culo/i.test(banner.textContent)) return
      const next = banner.nextElementSibling
      if (next && next.classList.contains('mogi-frase') && next.dataset.key === key) return
      banner.insertAdjacentElement('afterend', frase(key))
    })
    // Listado de Calzado: banner con el título "Calzado"
    document.querySelectorAll('h2').forEach(h => {
      if (orig(h) !== 'Calzado') return
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
