// MoniSale · Monilovers: clientas reales con piezas MoniSale y "piezas similares" a la venta.
{
  const base = new URL('..', import.meta.url).href
  const IG = 'https://www.instagram.com/monisalepty/'
  const L = () => { try { return localStorage.getItem('mogi-lang') || 'en' } catch { return 'en' } }
  const es = () => L() === 'es'
  const img = n => `${base}fotos/monilovers/${n}.jpg?v=2`

  // Destacada (la más reciente) y galería. `sim`: prendas a la venta parecidas (ids de la tienda).
  const feat = {
    f: 'turquesa', sim: ['n14', 'q31', 'v7', 'q46', 'v2'],
    es: ['Turquesa, luz y una sonrisa que lo dice todo', 'Un mono turquesa sin mangas, de cuello mao, con bolsillos de solapa y botones de madera, marcado con un cinturón de rafia y combinado con zapatillas blancas. Elegante sin esfuerzo: así se lleva una segunda vida.', 'Mono turquesa sin mangas con cinturón de rafia', 'Fresco · Luminoso · Atemporal'],
    en: ['Turquoise, light and a smile that says it all', 'A sleeveless turquoise jumpsuit with a mandarin collar, flap pockets and wooden buttons, cinched with a raffia belt and worn with white sneakers. Effortless elegance: this is how a second life is worn.', 'Sleeveless turquoise jumpsuit with raffia belt', 'Fresh · Luminous · Timeless'],
  }
  const looks = [
    { f: 'vestido-colores', sim: ['q47', 'q11', 'q33', 'm2'] },
    { f: 'blusa-corazones', sim: ['m7', 'q9', 'q23', 'q22'] },
    { f: 'vestido-largo', sim: ['q47', 'n12', 'q11', 'q48'] },
    { f: 'blusa-blanca', sim: ['q30', 's5', 'q41', 's6'] },
    { f: 'camisa-estampada', sim: ['q35', 'q46', 'q12', 'm14'] },
  ]

  const T = () => es() ? {
    menu: 'Monilovers', kicker: 'Monilovers', title: 'Ellas visten <i>MoniSale</i>',
    intro: 'Mujeres reales que dieron una segunda vida a nuestras piezas. Cada prenda encontró a su dueña, y cada dueña le puso su propio estilo.',
    week: 'La Monilover de la semana', look: 'El look', style: 'Estilo', similar: 'Ver piezas similares',
    gallery: 'Nuestras clientas', city: 'Ciudad de Panamá', who: 'Monilover',
    quote: 'Cada pieza encuentra a su dueña, y cada dueña le da una nueva historia.', share: 'Comparte tu look con #Monilovers',
    simT: 'Piezas parecidas a la venta', simS: 'Piezas únicas · disponibles ahora', none: 'Ahora mismo no hay piezas parecidas a la venta. ¡Vuelve pronto!',
    close: 'Cerrar', teaser: 'Ver sus looks', teaserSub: 'Nuestras clientas', size: 'Talla',
  } : {
    menu: 'Monilovers', kicker: 'Monilovers', title: 'They wear <i>MoniSale</i>',
    intro: 'Real women who gave our pieces a second life. Every piece found its owner, and every owner gave it her own style.',
    week: 'Monilover of the week', look: 'The look', style: 'Style', similar: 'Shop similar pieces',
    gallery: 'Our clients', city: 'Panama City', who: 'Monilover',
    quote: 'Every piece finds its owner, and every owner gives it a new story.', share: 'Share your look with #Monilovers',
    simT: 'Similar pieces for sale', simS: 'One-of-a-kind · available now', none: 'There are no similar pieces for sale right now. Come back soon!',
    close: 'Close', teaser: 'See their looks', teaserSub: 'Our clients', size: 'Size',
  }

  const css = document.createElement('style')
  css.textContent = `
  .mogi-ml{position:fixed;inset:0;z-index:61;background:#faf8f5;color:#111;overflow-y:auto;opacity:0;transition:opacity .5s ease;
    padding:calc(20px + env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) calc(48px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
  .mogi-ml.open{opacity:1}
  .mogi-ml .in{width:min(1180px,100%);margin:0 auto}
  .mogi-ml header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:18px}
  .mogi-ml .brand,.mogi-ml .k{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#8a8580}
  .mogi-ml .x{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111}
  .mogi-ml .head{text-align:center;max-width:660px;margin:28px auto 52px}
  .mogi-ml h2{font:400 clamp(38px,6vw,70px)/1 "Playfair Display Variable",Georgia,serif;margin:16px 0 10px}
  .mogi-ml h2 i{font-style:italic}
  .mogi-ml .intro{font:400 15px/1.85 "Inter Variable",Helvetica,Arial,sans-serif;color:#4a4744;margin:18px auto 0}
  .mogi-ml .feat{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:56px;align-items:center;margin-bottom:84px}
  .mogi-ml .feat img{width:100%;display:block}
  .mogi-ml .feat h3{font:400 clamp(28px,3.4vw,44px)/1.08 "Playfair Display Variable",Georgia,serif;margin:16px 0 22px}
  .mogi-ml .feat p{font:400 15px/1.85 "Inter Variable",Helvetica,Arial,sans-serif;color:#4a4744;margin:0 0 26px}
  .mogi-ml .feat dl{margin:0;border-top:1px solid #e4dfd8}
  .mogi-ml .feat dl div{display:grid;grid-template-columns:110px 1fr;gap:14px;padding:13px 0;border-bottom:1px solid #e4dfd8}
  .mogi-ml .feat dt{font:400 10px/1.6 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8a8580}
  .mogi-ml .feat dd{margin:0;font:400 13px/1.6 "Inter Variable",Helvetica,Arial,sans-serif}
  .mogi-ml .lk{display:inline-block;margin-top:26px;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:0 0 4px;color:#111;cursor:pointer}
  .mogi-ml .gt{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid #e4dfd8;padding-top:24px;margin-bottom:24px}
  .mogi-ml .gt h4{font:400 clamp(24px,2.8vw,34px)/1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-ml .grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-flow:row dense;gap:22px 16px}
  .mogi-ml .c{margin:0}
  .mogi-ml .c:first-child{grid-column:span 2;grid-row:span 2;display:flex;flex-direction:column}
  .mogi-ml .ph{overflow:hidden;background:#ece8e1;aspect-ratio:2/3}
  .mogi-ml .c:first-child .ph{aspect-ratio:auto;flex:1}
  .mogi-ml .ph{cursor:pointer}.mogi-ml .ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
  .mogi-ml .c:hover img{transform:scale(1.035)}
  .mogi-ml figcaption{display:flex;justify-content:space-between;align-items:baseline;gap:8px;padding-top:10px}
  .mogi-ml figcaption b{font:400 italic 15px/1.2 "Playfair Display Variable",Georgia,serif;color:#3a3734}
  .mogi-ml figcaption .lk{margin:0;font-size:9px;letter-spacing:.16em}
  .mogi-ml .quote{text-align:center;margin:76px auto 0;max-width:720px;font:400 italic clamp(20px,2.6vw,28px)/1.55 "Playfair Display Variable",Georgia,serif;color:#3a3734}
  .mogi-ml .quote small{display:block;margin-top:16px;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;font-style:normal;letter-spacing:.24em;text-transform:uppercase;color:#8a8580}
  .mogi-ml .ctaw{text-align:center;margin-top:40px}
  .mogi-ml .cta{display:inline-block;background:#111;color:#fff !important;text-decoration:none;font:500 11px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;padding:18px 32px}
  .mogi-ml-sim{grid-column:1/-1;background:#fff;border:1px solid #ece8e1;padding:22px 22px 24px;margin:6px 0 26px;opacity:0;transform:translateY(-8px);transition:opacity .45s ease,transform .45s ease}
  .mogi-ml-sim.open{opacity:1;transform:none}
  .mogi-ml-sim .in{width:min(1180px,100%);margin:0 auto}
  .mogi-ml-sim .t{display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:18px}
  .mogi-ml-sim h5{font:400 clamp(20px,2.4vw,28px)/1.1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-ml-sim small{display:block;margin-top:6px;font:400 9px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8a8580}
  .mogi-ml-sim .x{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111}
  .mogi-ml-sim .row{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
  .mogi-ml-sim .p{background:none;border:0;padding:0;text-align:left;cursor:pointer;color:#111}
  .mogi-ml-sim .p .ph{aspect-ratio:3/4;overflow:hidden;background:#f3f2ef}
  .mogi-ml-sim .p img{width:100%;height:100%;object-fit:cover;object-position:50% 22%;display:block;transition:transform 1s}
  .mogi-ml-sim .p:hover img{transform:scale(1.04)}
  .mogi-ml-sim .p b{display:block;margin-top:9px;font:400 12px/1.4 "Inter Variable",Helvetica,Arial,sans-serif}
  .mogi-ml-sim .p span{display:block;margin-top:3px;font:400 11px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;color:#737373}
  .mogi-ml-sim .p span em{font-style:normal;color:#dc2626;margin-right:6px}
  .mogi-ml-sim .p span s{color:#a3a3a3;margin-right:6px}
  .mogi-ml-sim .none{font:400 13px/1.6 "Inter Variable",Helvetica,Arial,sans-serif;color:#525252}
  .mogi-ml-teaser{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:center;width:min(980px,100%);margin:28px auto 0;background:#f1ede6;cursor:pointer;border:0;padding:0;text-align:left;color:#111}
  .mogi-ml-teaser .m{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
  .mogi-ml-teaser .m img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:50% 20%;display:block}
  .mogi-ml-teaser div.t{display:block !important;padding:28px 34px;border:0 !important}.mogi-ml-teaser div.t > *{display:block}.mogi-ml-teaser div.t > u{display:inline-block}
  .mogi-ml-teaser b{display:block;font:400 clamp(20px,2.2vw,26px)/1.05 "Playfair Display Variable",Georgia,serif;font-weight:400}
  .mogi-ml-teaser small{display:block;margin-top:12px;font:400 9px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#8a8580}
  .mogi-ml-teaser u{display:inline-block;margin-top:20px;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;border-bottom:1px solid #111;padding-bottom:3px}
  @media (max-width:820px){.mogi-ml .feat{grid-template-columns:1fr;gap:26px}.mogi-ml-sim .row{grid-template-columns:repeat(2,1fr)}}
  @media (max-width:760px){.mogi-ml .grid{grid-template-columns:1fr 1fr;gap:16px 10px}.mogi-ml .c:first-child{grid-column:1/-1;grid-row:auto}.mogi-ml .c:first-child .ph{aspect-ratio:2/3;flex:none}
    .mogi-ml figcaption{flex-direction:column;gap:6px}.mogi-ml-teaser{grid-template-columns:1fr}.mogi-ml-teaser div.t{padding:22px 20px 26px;text-align:center}}
  `
  document.head.appendChild(css)

  const money = n => '$' + Number(n).toFixed(2)
  const photo = p => /^https?:/.test(p) ? p : `${base}fotos/${p.includes('.') ? p : p + '.jpg'}`
  const products = () => (window.mogiProducts ? window.mogiProducts() : [])

  let P = null, S = null, Sk = null
  const closeSim = () => { if (S) { S.remove(); S = null; Sk = null } }
  const close = () => {
    closeSim()
    if (!P) return
    const p = P; P = null; p.classList.remove('open'); document.documentElement.style.overflow = ''
    setTimeout(() => p.remove(), 500); document.removeEventListener('keydown', esc)
  }
  const esc = e => { if (e.key === 'Escape') { if (S) closeSim(); else close() } }

  // Al pinchar una pieza: se cierra Monilovers y se abre la prenda en su sección de la tienda
  const openProduct = id => {
    close()
    setTimeout(() => { if (window.mogiGo) window.mogiGo({ name: 'product', id }) }, 80)
  }

  // Las piezas parecidas se abren justo debajo de la clienta que se ha pinchado
  const showSimilar = (key, ids, after) => {
    if (Sk === key) { closeSim(); return }
    closeSim()
    const t = T(), all = products()
    const list = ids.map(id => all.find(p => p.id === id)).filter(Boolean)
    S = document.createElement('div'); S.className = 'mogi-ml-sim'; Sk = key
    S.innerHTML = `<div class="t"><div><h5>${t.simT}</h5><small>${t.simS}</small></div><button type="button" class="x">${t.close}</button></div>
      ${list.length ? `<div class="row">${list.map(p => `<button type="button" class="p" data-id="${p.id}"><div class="ph"><img src="${photo(p.photo)}" alt="${p.name}" loading="lazy"></div><b>${p.name}</b><span>${p.oldPrice ? `<em>${money(p.price)}</em><s>${money(p.oldPrice)}</s>` : p.price ? money(p.price) : ''}${p.sizes && p.sizes.length ? ' · ' + t.size + ' ' + p.sizes.join(', ') : ''}</span></button>`).join('')}</div>` : `<p class="none">${t.none}</p>`}`
    after.insertAdjacentElement('afterend', S)
    S.querySelector('.x').addEventListener('click', closeSim)
    S.querySelectorAll('.p').forEach(b => b.addEventListener('click', () => openProduct(b.dataset.id)))
    requestAnimationFrame(() => { if (!S) return; S.classList.add('open'); S.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) })
  }

  const open = () => {
    const t = T(), k = es() ? 'es' : 'en', f = feat[k]
    if (!P) {
      P = document.createElement('div'); P.className = 'mogi-ml'; P.setAttribute('role', 'dialog'); P.setAttribute('aria-label', 'Monilovers')
      document.body.appendChild(P); document.documentElement.style.overflow = 'hidden'
      requestAnimationFrame(() => P && P.classList.add('open')); document.addEventListener('keydown', esc)
    }
    P.innerHTML = `<div class="in"><header><span class="brand">MoniSale · Monilovers</span><button type="button" class="x">${t.close}</button></header>
      <div class="head"><div class="k">${t.kicker}</div><h2>${t.title}</h2><p class="intro">${t.intro}</p></div>
      <section class="feat" style="margin-bottom:24px"><div class="ph"><img src="${img(feat.f)}" alt=""></div><div>
        <div class="k">${t.week}</div><h3>${f[0]}</h3><p>${f[1]}</p>
        <dl><div><dt>${t.look}</dt><dd>${f[2]}</dd></div><div><dt>${t.style}</dt><dd>${f[3]}</dd></div></dl>
        <button type="button" class="lk" data-sim="feat">${t.similar}</button></div></section>
      <div class="gt" style="margin-top:60px"><h4>${t.gallery}</h4><span class="k">${t.city}</span></div>
      <section class="grid">${looks.map((l, i) => `<figure class="c"><div class="ph"><img src="${img(l.f)}" alt="" loading="lazy"></div><figcaption><b>${t.who}</b><button type="button" class="lk" data-sim="${i}">${t.similar}</button></figcaption></figure>`).join('')}</section>
      <p class="quote">${t.quote}<small>MoniSale</small></p>
      <div class="ctaw"><a class="cta" target="_blank" rel="noopener" href="${IG}">${t.share}</a></div></div>`
    P.querySelector('.x').addEventListener('click', close)
    const go = v => {
      if (v === 'feat') showSimilar('feat', feat.sim, P.querySelector('.feat'))
      else showSimilar(v, looks[+v].sim, P.querySelectorAll('.grid .c')[+v])
    }
    P.querySelectorAll('[data-sim]').forEach(b => b.addEventListener('click', () => go(b.dataset.sim)))
    P.querySelector('.feat .ph').addEventListener('click', () => go('feat'))
    P.querySelectorAll('.grid .c .ph').forEach((ph, i) => ph.addEventListener('click', () => go(String(i))))
    P.scrollTop = 0
  }
  window.mogiMonilovers = open

  // Menú: después de La Maison
  const btn = document.createElement('button')
  btn.type = 'button'; btn.className = 'mogi-svc-ml py-2 text-left text-[11px] tracking-[0.14em] uppercase transition text-neutral-500 hover:text-ink'
  btn.textContent = 'Monilovers'
  btn.addEventListener('click', e => { e.stopPropagation(); open() })
  // Avance en la portada, debajo de La Maison
  const tz = document.createElement('button')
  tz.type = 'button'; tz.className = 'mogi-ml-teaser'
  tz.addEventListener('click', open)
  let painted = ''
  const place = () => {
    const lang = L()
    if (painted !== lang) {
      const t = T()
      tz.innerHTML = `<div class="m"><img src="${img('blusa-corazones')}" alt="" loading="lazy"><img src="${img(feat.f)}" alt="" loading="lazy"><img src="${img('vestido-colores')}" alt="" loading="lazy"></div><div class="t"><b>Monilovers</b><small>${t.teaserSub}</small><u>${t.teaser}</u></div>`
      painted = lang
    }
    const lm = document.querySelector('aside > .mogi-svc-lm')
    if (lm && lm.nextElementSibling !== btn) lm.insertAdjacentElement('afterend', btn)
    const home = document.querySelector('.mogi-arch-home')
    if (home && tz.parentNode !== home) {
      const lmt = home.querySelector('.mogi-lm-teaser')
      if (lmt) lmt.insertAdjacentElement('afterend', tz)
      else { const nt = home.querySelector('.mogi-notify'); nt ? home.insertBefore(tz, nt) : home.appendChild(tz) }
    } else if (home && tz.previousElementSibling && !tz.previousElementSibling.classList.contains('mogi-lm-teaser')) {
      const lmt = home.querySelector('.mogi-lm-teaser'); if (lmt) lmt.insertAdjacentElement('afterend', tz)
    }
  }
  let q = 0
  new MutationObserver(() => { if (!q) q = requestAnimationFrame(() => { q = 0; place() }) }).observe(document.documentElement, { childList: true, subtree: true })
  place()
}
