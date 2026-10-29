// MoniSale · Servicios de casa: Private Styling, Sell With Us, The Journal, avisos e Instagram
{
  const base = new URL('..', import.meta.url).href
  const WA = '50766001620'
  const IG = 'https://www.instagram.com/monisalepty/'
  const L = () => { try { return localStorage.getItem('mogi-lang') || 'en' } catch { return 'en' } }
  const es = () => L() === 'es'
  const wa = txt => `https://wa.me/${WA}?text=${encodeURIComponent(txt)}`

  const T = () => es() ? {
    styling: 'Estilismo privado', sell: 'Confíanos tus piezas', journal: 'El diario', close: 'Cerrar',
    stylingSub: 'Un servicio a medida', stylingIntro: 'Una cita privada para descubrir lo que mejor te sienta. Diseño y estilo al servicio de tu imagen: piezas que te favorecen, combinaciones que funcionan y un armario con intención.',
    stylingItems: [['Asesoría de imagen', 'Colores, siluetas y proporciones que realzan tu figura y tu estilo.'], ['Edición de armario', 'Ordenamos lo que ya tienes y descubrimos nuevas formas de llevarlo.'], ['Personal shopping', 'Una selección hecha para ti, pieza a pieza, dentro y fuera de MoniSale.']],
    stylingCta: 'Reservar una cita', stylingMsg: 'Hola, me gustaría reservar una cita de estilismo privado con MoniSale.',
    sellSub: 'Una segunda vida para tu armario', sellIntro: 'Las piezas extraordinarias merecen seguir contando historias. Si tienes prendas, calzado o accesorios en muy buen estado, los revisamos con mimo y les buscamos una nueva dueña.',
    sellItems: [['01 · Escríbenos', 'Envíanos fotos de tus piezas por WhatsApp.'], ['02 · Selección', 'Valoramos cada pieza por su diseño, estado y estilo.'], ['03 · Segunda vida', 'La presentamos en MoniSale como merece y te avisamos cuando encuentre dueña.']],
    sellCta: 'Iniciar la conversación', sellMsg: 'Hola, me gustaría confiar a MoniSale algunas de mis piezas. Te envío fotos.',
    journalSub: 'Notas de estilo', journalIntro: 'Ideas para llevar cada pieza más allá. Porque el estilo no está en tener más, sino en saber combinar.',
    notes: [
      ['La sastrería que se relaja', 'Un blazer de cuadros sin forro sobre un top chocolate, pantalón ancho color crema y zapatillas. La estructura del blazer y la soltura del pantalón: elegancia que se puede vivir todo el día.', 'fotos/ig/blazer-cuadros-sin-forro.jpg'],
      ['El bordado que cuenta historias', 'Azul intenso y bordado blanco de inspiración artesanal. Una flor en el pelo y unas gafas de sol bastan: cuando la pieza habla por sí sola, el resto se queda en silencio.', 'fotos/ig/vestido-azul-bordado.jpg'],
      ['Tono sobre tono', 'Vestido largo y blazer en el mismo amarillo luminoso. Vestir un solo color de pies a cabeza alarga la silueta y convierte un look sencillo en uno que se recuerda.', 'fotos/ig/vestido-amarillo.jpg'],
    ],
    notify: 'Sé la primera en saberlo', notifySub: 'Recibe las nuevas piezas antes que nadie.', notifyCta: 'Recibir las novedades', notifyMsg: 'Hola, me gustaría recibir las novedades de MoniSale antes que nadie.',
    measures: 'Solicitar medidas exactas', measuresMsg: n => `Hola, ¿me podrías enviar las medidas exactas de "${n}"?`,
    advice: 'Hablar con una estilista', adviceMsg: n => `Hola, me gustaría que me asesoraras sobre "${n}".`,
    alsoLike: 'Quizá también te enamore', follow: 'Síguenos en Instagram',
  } : {
    styling: 'Private Styling', sell: 'Sell With Us', journal: 'The Journal', close: 'Close',
    stylingSub: 'A bespoke service', stylingIntro: 'A private appointment to discover what suits you best. Design and style at the service of your image: pieces that flatter you, combinations that work and a wardrobe with intention.',
    stylingItems: [['Image consulting', 'Colours, silhouettes and proportions that enhance your figure and your style.'], ['Wardrobe edit', 'We organise what you already own and find new ways to wear it.'], ['Personal shopping', 'A selection made for you, piece by piece, in and beyond MoniSale.']],
    stylingCta: 'Book an Appointment', stylingMsg: 'Hello, I would like to book a private styling appointment with MoniSale.',
    sellSub: 'A second life for your wardrobe', sellIntro: 'Extraordinary pieces deserve to keep telling stories. If you have clothing, shoes or accessories in very good condition, we review them with care and find them a new home.',
    sellItems: [['01 · Write to us', 'Send us photos of your pieces on WhatsApp.'], ['02 · Selection', 'We assess each piece for its design, condition and style.'], ['03 · Second life', 'We present it on MoniSale as it deserves and let you know when it finds a new owner.']],
    sellCta: 'Start the Conversation', sellMsg: 'Hello, I would like to entrust MoniSale with some of my pieces. Sending photos.',
    journalSub: 'Style notes', journalIntro: 'Ideas to take every piece further. Because style is not about having more, but about knowing how to combine.',
    notes: [
      ['Relaxed tailoring', 'An unlined checked blazer over a chocolate top, cream wide-leg trousers and sneakers. The structure of the blazer, the ease of the trousers: elegance you can live in all day.', 'fotos/ig/blazer-cuadros-sin-forro.jpg'],
      ['Embroidery that tells a story', 'Deep blue with white artisan-inspired embroidery. A flower in the hair and sunglasses are enough: when the piece speaks for itself, everything else stays quiet.', 'fotos/ig/vestido-azul-bordado.jpg'],
      ['Tone on tone', 'A long dress and blazer in the same luminous yellow. Wearing one colour head to toe lengthens the silhouette and turns a simple look into one that is remembered.', 'fotos/ig/vestido-amarillo.jpg'],
    ],
    notify: 'Be the First to Know', notifySub: 'Discover new pieces before anyone else.', notifyCta: 'Get Early Access', notifyMsg: 'Hello, I would like to receive MoniSale new arrivals before anyone else.',
    measures: 'Request Exact Measurements', measuresMsg: n => `Hello, could you send me the exact measurements of "${n}"?`,
    advice: 'Speak to a Stylist', adviceMsg: n => `Hello, I would like some advice about "${n}".`,
    alsoLike: 'You May Also Like', follow: 'Follow us on Instagram',
  }

  const css = document.createElement('style')
  css.textContent = `
  .mogi-x{position:fixed;inset:0;z-index:60;background:#fff;color:#111;overflow-y:auto;opacity:0;transition:opacity .45s ease;
    padding:calc(20px + env(safe-area-inset-top,0px)) max(20px,env(safe-area-inset-right,0px)) calc(40px + env(safe-area-inset-bottom,0px)) max(20px,env(safe-area-inset-left,0px))}
  .mogi-x.open{opacity:1}
  .mogi-x .in{width:min(980px,100%);margin:0 auto}
  .mogi-x header{display:flex;align-items:baseline;justify-content:space-between;gap:16px}
  .mogi-x h2{font:400 clamp(28px,3.6vw,44px)/1.05 "Playfair Display Variable",Georgia,serif;margin:0}
  .mogi-x .sub{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#737373;margin-top:10px}
  .mogi-x .x{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;background:none;border:0;border-bottom:1px solid #111;padding:4px 0;cursor:pointer;color:#111}
  .mogi-x .intro{font:400 15px/1.75 "Inter Variable",Helvetica,Arial,sans-serif;color:#404040;max-width:620px;margin:28px 0 36px}
  .mogi-x .items{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;border-top:1px solid #e7e5e0;padding-top:28px}
  @media (max-width:760px){.mogi-x .items{grid-template-columns:1fr;gap:22px}}
  .mogi-x .items h4{font:400 20px/1.2 "Playfair Display Variable",Georgia,serif;margin:0 0 8px}
  .mogi-x .items p{font:400 13px/1.65 "Inter Variable",Helvetica,Arial,sans-serif;color:#525252;margin:0}
  .mogi-cta{display:inline-block;margin-top:40px;background:#111;color:#fff !important;text-decoration:none;font:500 11px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;padding:17px 30px;transition:background .3s}
  .mogi-cta:hover{background:#3a3a3a}
  .mogi-cta.light{background:transparent;color:#111 !important;border:1px solid #111}
  .mogi-cta.light:hover{background:#111;color:#fff !important}
  .mogi-x .notes{display:grid;gap:44px}
  .mogi-x .note{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:32px;align-items:center}
  .mogi-x .note:nth-child(2n){grid-template-columns:minmax(0,1.2fr) minmax(0,1fr)}
  .mogi-x .note:nth-child(2n) .ph{order:2}
  @media (max-width:760px){.mogi-x .note,.mogi-x .note:nth-child(2n){grid-template-columns:1fr;gap:16px}.mogi-x .note:nth-child(2n) .ph{order:0}}
  .mogi-x .note .ph{aspect-ratio:4/5;overflow:hidden;background:#f3f2ef}
  .mogi-x .note img{width:100%;height:100%;object-fit:cover;object-position:50% 22%;display:block}
  .mogi-x .note small{font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#8a8a8a}
  .mogi-x .note h3{font:400 clamp(24px,2.8vw,34px)/1.15 "Playfair Display Variable",Georgia,serif;margin:12px 0 14px}
  .mogi-x .note p{font:400 14px/1.75 "Inter Variable",Helvetica,Arial,sans-serif;color:#525252;margin:0}
  .mogi-pdp-links{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:16px}
  .mogi-pdp-links a{font:400 10px/1.4 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#111;text-decoration:none;border-bottom:1px solid #111;padding-bottom:3px}
  .mogi-notify{display:block;margin:0;padding:0;text-align:left;border:0}
  .mogi-notify a{display:inline-block;font:400 9px/1.5 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#8a8a8a;text-decoration:none;border-bottom:1px solid #d4d4d4;padding-bottom:2px;transition:color .3s,border-color .3s}
  .mogi-notify a:hover{color:#111;border-color:#111}
  .mogi-ig{display:block;text-align:center;font:400 10px/1 "Inter Variable",Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#737373;text-decoration:none;padding:10px 0 2px}
  .mogi-ig:hover{color:#111}
  footer.pb-safe{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px 34px;padding:12px 20px calc(12px + env(safe-area-inset-bottom,0px)) !important}
  footer.pb-safe > *{border:0 !important;width:auto !important;padding:0 !important;margin:0 !important}
  footer.pb-safe > :last-child{order:-1;font:400 13px/1 "Playfair Display Variable",Georgia,serif !important;letter-spacing:.32em !important;color:#111 !important;text-transform:uppercase}
  footer.pb-safe > button{gap:0 14px !important;color:#8a8a8a !important;font-size:9px !important;letter-spacing:.16em !important}
  footer.pb-safe > button svg{display:none}
  footer.pb-safe .mogi-ig{font-size:9px;letter-spacing:.2em;color:#8a8a8a;padding:0}
  @media (max-width:640px){footer.pb-safe{gap:6px 22px;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px)) !important}footer.pb-safe > :last-child{width:100% !important;text-align:center;font-size:12px !important}}
  `
  document.head.appendChild(css)

  const panel = (title, sub, body) => {
    const p = document.createElement('div')
    p.className = 'mogi-x'
    p.setAttribute('role', 'dialog')
    p.setAttribute('aria-label', title)
    p.innerHTML = `<div class="in"><header><div><h2>${title}</h2><div class="sub">${sub}</div></div><button type="button" class="x">${T().close}</button></header>${body}</div>`
    document.body.appendChild(p)
    document.documentElement.style.overflow = 'hidden'
    requestAnimationFrame(() => p.classList.add('open'))
    const close = () => { p.classList.remove('open'); document.documentElement.style.overflow = ''; setTimeout(() => p.remove(), 450); document.removeEventListener('keydown', esc) }
    const esc = e => { if (e.key === 'Escape') close() }
    p.querySelector('.x').addEventListener('click', close)
    document.addEventListener('keydown', esc)
  }
  const items = arr => `<div class="items">${arr.map(([h, t]) => `<div><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>`
  const openStyling = () => { const t = T(); panel(t.styling, t.stylingSub, `<p class="intro">${t.stylingIntro}</p>${items(t.stylingItems)}<a class="mogi-cta" target="_blank" rel="noopener" href="${wa(t.stylingMsg)}">${t.stylingCta}</a>`) }
  const openSell = () => { const t = T(); panel(t.sell, t.sellSub, `<p class="intro">${t.sellIntro}</p>${items(t.sellItems)}<a class="mogi-cta" target="_blank" rel="noopener" href="${wa(t.sellMsg)}">${t.sellCta}</a>`) }
  const openJournal = () => { const t = T(); panel(t.journal, t.journalSub, `<p class="intro">${t.journalIntro}</p><div class="notes">${t.notes.map(([h, p, img], i) => `<article class="note"><div class="ph"><img src="${base}${img}" alt="" loading="lazy"></div><div><small>N.º ${String(i + 1).padStart(2, '0')}</small><h3>${h}</h3><p>${p}</p></div></article>`).join('')}</div><div style="text-align:center"><a class="mogi-cta light" target="_blank" rel="noopener" href="${IG}">${t.follow}</a></div>`) }
  window.mogiServices = { styling: openStyling, sell: openSell, journal: openJournal }

  // Menú lateral: después de The Archive
  const mk = (cls, fn) => { const b = document.createElement('button'); b.type = 'button'; b.className = cls + ' py-2 text-left text-[11px] tracking-[0.14em] uppercase transition text-neutral-500 hover:text-ink'; b.addEventListener('click', e => { e.stopPropagation(); fn() }); return b }
  const bJ = mk('mogi-svc-j', openJournal), bS = mk('mogi-svc-s', openStyling), bV = mk('mogi-svc-v', openSell)

  const notify = document.createElement('div')
  notify.className = 'mogi-notify'
  const ig = document.createElement('a')
  ig.className = 'mogi-ig'; ig.target = '_blank'; ig.rel = 'noopener'; ig.href = IG


  // Nombres de casa en inglés (versión por defecto); en español se mantienen los originales
  const EN = {'Favoritos':'Wishlist','Mi cuenta':'Account','Mi bolsa':'Bag','Añadir a la bolsa':'Add to Bag','Comprar ahora':'Buy Now','Guía de tallas':'Size Guide','Volver':'Back','Talla':'Size','Conócenos y pagos':'About & Payments','Sostenibilidad':'Sustainability','Nuevo':'New','Destacados':'Featured','Precio: menor a mayor':'Price: Low to High','Precio: mayor a menor':'Price: High to Low','Mayor descuento':'Best Savings','Pagos:':'Payments:','Música':'Music','Tarjeta':'Card','Efectivo':'Cash','Color:':'Colour:'}
  const ES = {'Mi bolsa':'Mi bolsa'}

  const COND = {'Muy buen estado':'Very good condition','Como nuevo':'Like new','Como nueva':'Like new','Buen estado':'Good condition','Nuevo con etiqueta':'New with tags'}
  const KIND = {'Prenda':'Second-life piece','Accesorio':'Second-life accessory','Calzado':'Second-life footwear'}
  const PH = [['Entrega en 24–48 h en ','Delivery in 24–48 h in '],[' · gratis desde ',' · free from '],['Pieza única de segunda vida · revisada y lista para usar','One-of-a-kind second-life piece · inspected and ready to wear'],['Paga con Yappy, transferencia ACH o efectivo al recibir','Pay with Yappy, ACH transfer or cash on delivery'],['Ciudad de Panamá','Panama City']]
  const trText = raw => {
    const D = window.mogiDescEN || {}
    const m = raw.match(/^(\s*)(.*?)\s*(Prenda|Accesorio|Calzado) de segunda vida · ([^.]+)\.?(\s*)$/)
    if (m) {
      let main = m[2].trim(), out = D[main]
      if (!out && /^Aretes /.test(main)) out = main.replace(/^Aretes (.*?)\. Ligeros y cómodos\.$/, (x, a) => `Earrings: ${a}. Light and comfortable.`)
      if (!out) out = main
      return `${m[1]}${out} ${KIND[m[3]]} · ${COND[m[4].trim()] || m[4]}.${m[5]}`
    }
    let r = raw, hit = false
    for (const [a, b] of PH) if (r.includes(a)) { r = r.split(a).join(b); hit = true }
    return hit ? r : null
  }
  const orig = new WeakMap()
  const relabel = () => {
    const root = document.getElementById('root'); if (!root) return
    const en = !es()
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let n
    while ((n = w.nextNode())) {
      const raw = n.nodeValue, key = raw.trim()
      if (!key) continue
      const o = orig.get(n)
      if (en) {
        const src = o ?? raw
        let tr = EN[src.trim()] ? src.replace(src.trim(), EN[src.trim()]) : trText(src)
        if (tr && tr !== raw) { if (!o) orig.set(n, raw); n.nodeValue = tr }
      }
      else if (o && raw !== o) n.nodeValue = o
    }
  }
  let painted = ''
  const place = () => {
    relabel()
    const t = T(), lang = L()
    if (painted !== lang) {
      bJ.textContent = t.journal; bS.textContent = t.styling; bV.textContent = t.sell
      notify.innerHTML = `<a target="_blank" rel="noopener" title="${t.notifySub}" href="${wa(t.notifyMsg)}">${t.notify}</a>`
      ig.textContent = 'Instagram'
      document.querySelectorAll('.mogi-pdp-links').forEach(x => x.remove())
      painted = lang
    }
    const arch = document.querySelector('aside > .mogi-arch-btn')
    if (arch) {
      if (arch.nextElementSibling !== bJ) arch.insertAdjacentElement('afterend', bJ)
      if (bJ.nextElementSibling !== bS) bJ.insertAdjacentElement('afterend', bS)
    }
    // Aviso de novedades: discreto, en el lateral
    const main = document.querySelector('main')
    const side = document.querySelector('aside > .mt-auto')
    if (side) { if (side.firstElementChild !== notify) side.insertBefore(notify, side.firstChild) }
    else if (notify.isConnected) notify.remove()
    // Ficha de producto: enlaces de servicio y título de recomendaciones
    const h2 = main && main.querySelector('h2.text-2xl')
    if (h2) {
      const name = h2.textContent.trim()
      const col = h2.closest('.flex.flex-col')
      const buy = col && [...col.querySelectorAll('button')].find(b => /comprar ahora|buy now|añadir a la bolsa|add to bag/i.test(b.textContent))
      const row = buy && buy.parentElement
      if (row && !(row.nextElementSibling && row.nextElementSibling.classList.contains('mogi-pdp-links') && row.nextElementSibling.dataset.n === name)) {
        if (row.nextElementSibling && row.nextElementSibling.classList.contains('mogi-pdp-links')) row.nextElementSibling.remove()
        const d = document.createElement('div'); d.className = 'mogi-pdp-links'; d.dataset.n = name
        d.innerHTML = `<a target="_blank" rel="noopener" href="${wa(t.measuresMsg(name))}">${t.measures}</a><a target="_blank" rel="noopener" href="${wa(t.adviceMsg(name))}">${t.advice}</a>`
        row.insertAdjacentElement('afterend', d)
      }
      main.querySelectorAll('section > h3').forEach(h => { if (/también te puede gustar|quizá también te enamore|you may also like/i.test(h.textContent) && h.textContent !== t.alsoLike) h.textContent = t.alsoLike })
    }
    // Instagram en el pie
    const foot = document.querySelector('footer')
    if (foot && ig.parentElement !== foot) foot.insertBefore(ig, foot.firstChild)
  }
  place()
  new MutationObserver(place).observe(document.getElementById('root') || document.body, { childList: true, subtree: true })
}
