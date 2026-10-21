// MÖGI · The Archive — piezas que ya encontraron dueña, presentadas como en las grandes firmas.
{
  const base = new URL('..', import.meta.url).href
  const L = () => { try { return localStorage.getItem('mogi-lang') || 'en' } catch { return 'en' } }
  // [foto, nombre, talla] — de la más reciente a la más antigua
  const piezas = [
    [58, 'Blusa azul eléctrico', 'M/L'],
    [55, 'Jean de rayas tela rígida', 'L'],
    [54, 'Pantalón de rayas cintura alta', 'L'],
    [53, 'Blusa satinada mangas murciélago', 'Única'],
    [51, 'T-shirt koi', 'L'],
    [50, 'Pantalón de lunares pierna ancha', 'L'],
    [48, 'Set estampado cebra', 'L'],
    [45, 'Blazer de cuadros y falda de tul', 'M'],
    [44, 'Camisa de rayas rosa', 'L'],
    [39, 'Chaleco gráfico', 'L'],
    [38, 'Top de tirantes celeste', 'M'],
    [37, 'Blusa satinada fucsia', 'M/L'],
    [36, 'Pantalón de flores', 'M'],
    [35, 'Falda-pantalón patchwork', 'M/L'],
    [34, 'Set ejecutivo verde', 'L'],
    [31, 'Vestido floral escalonado', 'L'],
    [29, 'Blusa de rayas con lazo', 'M'],
    [28, 'Blusita stretch de tirantes', 'M/L'],
    [27, 'Vestido plisado rojo con capa', 'M/L'],
    [19, 'Vestido camisero rosa', 'L'],
    [17, 'Vestido estampado de tirantes', 'L'],
    [16, 'Camisa de jean', 'L'],
    [15, 'T-shirt ilustrada', 'XL'],
    [11, 'Vestido camisero denim', 'M/L'],
    [10, 'Set denim', 'M/L'],
    [8, 'Blazer fucsia', 'L'],
    [7, 'Jeans personalizados', '29'],
    [5, 'Set de rayas', 'L'],
    [3, 'Pantalón de rayas azules', 'M/L'],
  ]
  const src = n => `${base}fotos/archivo/a${String(n).padStart(2, '0')}.jpg`
  const t = () => L() === 'es'
    ? { menu: 'El archivo', title: 'El archivo', sub: 'Piezas que ya encontraron dueña', sold: 'Agotado', size: 'Talla', more: 'Ver el archivo', close: 'Cerrar',
        intro: 'Cada prenda de MÖGI es única. Estas ya viven una segunda historia; las nuevas llegan cada semana.' }
    : { menu: 'The Archive', title: 'The Archive', sub: 'Pieces that found their home', sold: 'Sold out', size: 'Size', more: 'View the Archive', close: 'Close',
        intro: 'Every MÖGI piece is one of a kind. These are already living their second story; new arrivals land every week.' }

  const css = document.createElement('style')
  css.textContent = `
  .mogi-arch{position:fixed;inset:0;z-index:60;background:#fff;color:#111;overflow-y:auto;opacity:0;transition:opacity .45s ease;
    padding:calc(20px + env(safe-area-inset-top,0px)) max(20px,env(safe-area-inset-right,0px)) calc(32px + env(safe-area-inset-bottom,0px)) max(20px,env(safe-area-inset-left,0px))}
  .mogi-arch.open{opacity:1}
  .mogi-arch header,.mogi-arch .intro,.mogi-arch .grid{width:min(1180px,100%);margin-left:auto;margin-right:auto}
  .mogi-arch header{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:10px}
  .mogi-arch h2{font:400 clamp(26px,3.4vw,40px)/1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-arch .sub,.mogi-arch-home .sub{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin-top:8px}
  .mogi-arch .x{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111}
  .mogi-arch .intro{font:400 13px/1.7 "Inter Variable",Helvetica,Arial,sans-serif;color:#525252;max-width:560px;margin:14px auto 30px 0}
  @media (min-width:1220px){.mogi-arch .intro{margin-left:calc((100% - 1180px)/2)}}
  .mogi-arch .grid,.mogi-arch-home .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 16px}
  @media (max-width:900px){.mogi-arch .grid,.mogi-arch-home .grid{grid-template-columns:repeat(2,1fr);gap:22px 10px}}
  .mogi-ar figure{margin:0}
  .mogi-ar .ph{aspect-ratio:4/5;overflow:hidden;background:#f3f2ef;position:relative}
  .mogi-ar img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92);transition:transform 1.4s cubic-bezier(.2,.7,.2,1),filter .6s}
  .mogi-ar figure:hover img{transform:scale(1.04);filter:saturate(1)}
  .mogi-ar .tag{position:absolute;left:10px;top:10px;background:rgba(255,255,255,.92);color:#111;font:500 9px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;padding:6px 8px}
  .mogi-ar figcaption{font:400 12px/1.45 "Inter Variable",Helvetica,Arial,sans-serif;margin-top:10px;color:#111}
  .mogi-ar figcaption small{display:block;color:#8a8a8a;font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-top:3px}
  .mogi-arch-home{width:min(1180px,100%);margin:40px auto 24px}
  .mogi-arch-home .t{display:flex;align-items:baseline;justify-content:space-between;gap:16px;border-top:1px solid #e7e5e0;padding-top:22px;margin-bottom:22px}
  .mogi-arch-home h3{font:400 clamp(22px,2.6vw,32px)/1.1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-arch-home .more{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111;white-space:nowrap}
  `
  document.head.appendChild(css)

  const card = ([n, name, size]) => `<figure><div class="ph"><img src="${src(n)}" alt="${name}" loading="lazy"><span class="tag">${t().sold}</span></div>
    <figcaption>${name}<small>${t().size} ${size} · ${t().sold}</small></figcaption></figure>`

  const open = () => {
    const p = document.createElement('div')
    p.className = 'mogi-arch mogi-ar'
    p.setAttribute('role', 'dialog')
    p.setAttribute('aria-label', t().title)
    p.innerHTML = `<header><div><h2>${t().title}</h2><div class="sub">${t().sub}</div></div><button type="button" class="x">${t().close}</button></header>
      <p class="intro">${t().intro}</p><div class="grid">${piezas.map(card).join('')}</div>`
    document.body.appendChild(p)
    document.documentElement.style.overflow = 'hidden'
    requestAnimationFrame(() => p.classList.add('open'))
    const close = () => { p.classList.remove('open'); document.documentElement.style.overflow = ''; setTimeout(() => p.remove(), 450); document.removeEventListener('keydown', esc) }
    const esc = e => { if (e.key === 'Escape') close() }
    p.querySelector('.x').addEventListener('click', close)
    document.addEventListener('keydown', esc)
  }
  window.mogiArchive = open

  // Entrada en el menú lateral, al final de las secciones
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'mogi-arch-btn py-2 text-left text-[11px] tracking-[0.14em] uppercase transition text-neutral-500 hover:text-ink'
  btn.addEventListener('click', e => { e.stopPropagation(); open() })

  // Avance en la portada, debajo de los looks
  const home = document.createElement('section')
  home.className = 'mogi-arch-home mogi-ar'
  const paintHome = () => {
    home.innerHTML = `<div class="t"><div><h3>${t().title}</h3><div class="sub">${t().sub}</div></div><button type="button" class="more">${t().more}</button></div>
      <div class="grid">${piezas.slice(0, 4).map(card).join('')}</div>`
    home.querySelector('.more').addEventListener('click', open)
    home.querySelectorAll('figure').forEach(f => f.addEventListener('click', open))
  }
  let painted = ''
  const place = () => {
    const lang = L()
    if (btn.textContent !== t().menu) btn.textContent = t().menu
    const side = [...document.querySelectorAll('aside > button')]
    const sp = side.find(x => /special prices|private edit|precios especiales|selecci/i.test(x.textContent))
    if (sp && sp.nextElementSibling !== btn) sp.insertAdjacentElement('afterend', btn)
    const main = document.querySelector('main')
    const isHome = main && main.firstElementChild && main.firstElementChild.querySelector(':scope > nav')
    if (isHome) {
      if (painted !== lang) { paintHome(); painted = lang }
      if (main.lastElementChild !== home) main.appendChild(home)
    } else if (home.isConnected) home.remove()
  }
  place()
  new MutationObserver(place).observe(document.getElementById('root') || document.body, { childList: true, subtree: true })
}
