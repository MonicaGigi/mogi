// MoniSale · The Archive — piezas que ya encontraron dueña, presentadas como en las grandes firmas.
{
  const base = new URL('..', import.meta.url).href
  const L = () => { try { return localStorage.getItem('mogi-lang') || 'en' } catch { return 'en' } }
  // [foto, nombre, talla] — de la más reciente a la más antigua
  const piezas = [
    ['x-n09b', 'Set azul con botones de Marruecos', 'XL', 'tr', 'pill'],
    ['x-n06b', 'Caftán mostaza', 'Única', 'sl', 'vertical'],
    ['x-n08b', 'Set gris de top y falda de canalé', 'M', 'br', 'pill'],
    ['x-n07b', 'Set de camisa a rayas y pantalón de flores', 'L', 'tl', 'stamp'],
    ['x-n05', 'Vestido estampado multicolor', 'L/XL', 'tr', 'stamp'],
    ['x-n04b', 'Pantalón stretch de rayas verdes', 'M', 'bl', 'pill'],
    ['x-n03', 'Blusa oversized azul con flores bordadas', 'L', 'tl', 'stamp'],
    ['x-n02', 'Pantalón harem de leopardo', 'L/XL', 'br', 'pill'],
    ['x-n01', 'Jean ancho de rayas chocolate', 'L', 'sl', 'vertical'],
    ['x-h50', 'Falda estampada de aves', 'M', 'tr', 'pill'],
    ['s27', 'Vestido caftán azul estampado', 'XL', 'bl', 'stamp'],
    ['x-h26', 'Set rojo de chaleco y pantalón', 'L', 'sl', 'vertical'],
    ['x-h25', 'Camisa transparente roja con lazo', 'L', 'br', 'stamp'],
    ['x-h23', 'Pantalón balloon gris', 'M', 'tl', 'pill'],
    ['x-h19', 'Camisa azul noche con broche', 'L', 'tr', 'pill'],
    ['x-h18', 'Set beige de chaleco y pantalón', 'L', 'sl', 'vertical'],
    ['x-h17', 'Set verde estampado', 'M', 'bl', 'stamp'],
    ['x-h13', 'Pantalón estampado acuarela', 'M/L', 'br', 'pill'],
    ['x-h12', 'Blazer de cuadros rojo', '', 'br', 'stamp'],
    ['x-h11', 'Blusa de lunares', 'L/XL', 'sr', 'vertical'],
    ['x-f58', 'Blusa azul eléctrico', 'M/L', 'tr', 'stamp'],
    ['x-f55', 'Jean de rayas tela rígida', 'L', 'tr', 'pill'],
    ['x-f54', 'Pantalón de rayas cintura alta', 'L', 'bl', 'pill'],
    ['x-f53', 'Blusa satinada mangas murciélago', 'Única', 'sl', 'vertical'],
    ['x-f51', 'T-shirt koi', 'L', 'br', 'stamp'],
    ['x-f50', 'Pantalón de lunares pierna ancha', 'L', 'tl', 'pill'],
    ['x-f48', 'Set estampado cebra', 'L', 'tr', 'stamp'],
    ['x-f45', 'Blazer de cuadros y falda de tul', 'M', 'sl', 'vertical'],
    ['x-f44', 'Camisa de rayas rosa', 'L', 'bl', 'stamp'],
    ['x-f39', 'Chaleco gráfico', 'L', 'br', 'pill'],
    ['x-f38', 'Top de tirantes celeste', 'M', 'br', 'pill'],
    ['x-f37', 'Blusa satinada fucsia', 'M/L', 'sr', 'vertical'],
    ['x-f36', 'Pantalón de flores', 'M', 'tr', 'stamp'],
    ['x-f35', 'Falda-pantalón patchwork', 'M/L', 'tr', 'pill'],
    ['x-f34', 'Set ejecutivo verde', 'L', 'bl', 'stamp'],
    ['x-f31', 'Vestido floral escalonado', 'L', 'sl', 'vertical'],
    ['x-f29', 'Blusa de rayas con lazo', 'M', 'br', 'stamp'],
    ['x-f28', 'Blusita stretch de tirantes', 'M/L', 'tl', 'pill'],
    ['x-f27', 'Vestido plisado rojo con capa', 'M/L', 'tr', 'pill'],
    ['x-f19', 'Vestido camisero rosa', 'L', 'sl', 'vertical'],
    ['x-f16', 'Camisa de jean', 'L', 'br', 'pill'],
    ['x-f15', 'T-shirt ilustrada', 'XL', 'br', 'stamp'],
    ['x-f11', 'Vestido camisero denim', 'M/L', 'sr', 'vertical'],
    ['x-f10', 'Set denim', 'M/L', 'tr', 'stamp'],
    ['x-f08', 'Blazer fucsia', 'L', 'tr', 'pill'],
    ['x-f07', 'Jeans personalizados', '29', 'bl', 'pill'],
    ['x-f05', 'Set de rayas', 'L', 'sl', 'vertical'],
    ['x-f03', 'Pantalón de rayas azules', 'M/L', 'br', 'stamp'],
  ]
  const src = n => typeof n === 'string' ? `${base}fotos/archivo/${n}.jpg` : `${base}fotos/archivo/a${String(n).padStart(2, '0')}.jpg`
  const t = () => L() === 'es'
    ? { menu: 'El archivo', title: 'El archivo', sub: 'Piezas que ya encontraron dueña', sold: 'Agotado', size: 'Talla', more: 'Ver el archivo', close: 'Cerrar',
        intro: 'Cada prenda de MoniSale es única. Estas ya viven una segunda historia; las nuevas llegan cada semana.' }
    : { menu: 'The Archive', title: 'The Archive', sub: 'Pieces that found their home', sold: 'Sold out', size: 'Size', more: 'View the Archive', close: 'Close',
        intro: 'Every MoniSale piece is one of a kind. These are already living their second story; new arrivals land every week.' }

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
  .mogi-ar .ph{aspect-ratio:2/3;overflow:hidden;background:#f3f2ef;position:relative}
  .mogi-ar img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92);transition:transform 1.4s cubic-bezier(.2,.7,.2,1),filter .6s}
  .mogi-ar figure:hover img{transform:scale(1.04);filter:saturate(1)}
  .mogi-ar .tag{position:absolute;z-index:1;color:#111;pointer-events:none;white-space:nowrap}
  .mogi-ar .tag.tl{left:4%;top:3%}.mogi-ar .tag.tr{right:4%;top:3%}.mogi-ar .tag.bl{left:4%;bottom:3.5%}.mogi-ar .tag.br{right:4%;bottom:3.5%}
  .mogi-ar .tag.sl{left:3%;top:50%;transform:translateY(-50%) rotate(180deg);writing-mode:vertical-rl}.mogi-ar .tag.sr{right:3%;top:50%;transform:translateY(-50%);writing-mode:vertical-rl}
  .mogi-ar .tag.pill{background:rgba(255,255,255,.94);font:500 9px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;padding:7px 10px;border-radius:999px;box-shadow:0 1px 8px rgba(0,0,0,.08)}
  .mogi-ar .tag.serif{color:#fff;font:italic 400 clamp(17px,2vw,24px)/1 "Playfair Display Variable",Georgia,serif;letter-spacing:.02em;text-shadow:0 1px 3px rgba(0,0,0,.35),0 2px 18px rgba(0,0,0,.55)}
  .mogi-ar .tag.vertical{background:rgba(255,255,255,.92);color:#111;font:500 9px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.38em;text-transform:uppercase;padding:12px 7px 9px}
  .mogi-ar .tag.stamp{background:rgba(250,248,244,.9);border:1px solid #111;font:500 9px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;padding:7px 9px;outline:1px solid rgba(250,248,244,.9);outline-offset:2px}
  .mogi-ar figcaption{font:400 12px/1.45 "Inter Variable",Helvetica,Arial,sans-serif;margin-top:10px;color:#111}
  .mogi-ar figcaption small{display:block;color:#8a8a8a;font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-top:3px}
  .mogi-arch-home{width:min(1180px,100%);margin:40px auto 24px}
  .mogi-arch-home .t{display:flex;align-items:baseline;justify-content:space-between;gap:16px;border-top:1px solid #e7e5e0;padding-top:22px;margin-bottom:22px}
  .mogi-arch-home h3{font:400 clamp(22px,2.6vw,32px)/1.1 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-arch-home .more{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111;white-space:nowrap}
  `
  document.head.appendChild(css)

  const card = ([n, name, size, pos = 'tl', sty = 'pill']) => `<figure><div class="ph"><img src="${src(n)}" alt="${name}" loading="lazy"><span class="tag ${pos} ${sty}">${sty === 'serif' ? (L() === 'es' ? 'Vendido' : 'Sold out') : t().sold}</span></div>
    <figcaption>${name}<small>${size ? t().size + ' ' + size + ' · ' : ''}${t().sold}</small></figcaption></figure>`

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
