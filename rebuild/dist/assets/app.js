// MoniSale como app: registra el service worker y ofrece instalarla en el móvil
// con un aviso discreto (una vez; si se cierra, no vuelve a salir en 30 días).
(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (standalone) { document.documentElement.classList.add('ms-app'); return; }
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMobile = isIOS || /Android/i.test(ua);
  if (!isMobile) return;
  const KEY = 'ms-app-cerrado';
  try { const t = +localStorage.getItem(KEY); if (t && Date.now() - t < 30 * 864e5) return; } catch (e) {}
  const lang = (() => { let l = null; try { l = localStorage.getItem('mogi-lang'); } catch (e) {} return l || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'); })();
  const T = lang === 'en'
    ? { t: 'MoniSale on your phone', s: 'Install the app: new pieces one tap away.', b: 'Install', ios: 'Tap <b>Share</b> <span class="ms-sh"></span> and then <b>Add to Home Screen</b>.', and: 'Open the menu <b>⋮</b> and tap <b>Install app</b> or <b>Add to Home screen</b>.', x: 'Close' }
    : { t: 'MoniSale en tu móvil', s: 'Instala la app: las novedades, a un toque.', b: 'Instalar', ios: 'Pulsa <b>Compartir</b> <span class="ms-sh"></span> y luego <b>Añadir a pantalla de inicio</b>.', and: 'Abre el menú <b>⋮</b> y pulsa <b>Instalar app</b> o <b>Añadir a pantalla de inicio</b>.', x: 'Cerrar' };
  let deferred = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; });
  const css = `.ms-inst{position:fixed;left:max(12px,env(safe-area-inset-left));right:max(12px,env(safe-area-inset-right));bottom:calc(64px + env(safe-area-inset-bottom));z-index:2147483000;background:#fff;color:#14110d;border:1px solid #b79a66;box-shadow:0 10px 30px rgba(20,17,13,.18);display:flex;gap:12px;align-items:center;padding:12px 12px 12px 12px;font-family:Inter,system-ui,sans-serif;transform:translateY(20px);opacity:0;transition:all .5s ease}
.ms-inst.on{transform:none;opacity:1}.ms-inst img{width:44px;height:44px;border-radius:10px;flex:none}
.ms-inst .tx{flex:1;min-width:0}.ms-inst .t{font-family:'Bodoni Moda',Georgia,serif;font-size:17px;line-height:1.15}.ms-inst .s{font-size:12px;color:#6f6a62;margin-top:3px;line-height:1.35}
.ms-inst button.b{flex:none;background:#14110d;color:#f0dfb4;border:0;padding:10px 14px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}
.ms-inst button.x{position:absolute;top:-10px;right:-6px;width:26px;height:26px;border-radius:50%;border:1px solid #b79a66;background:#fff;color:#14110d;font-size:14px;line-height:1;cursor:pointer}
.ms-sh{display:inline-block;width:12px;height:14px;vertical-align:-2px;background:no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 28' fill='none' stroke='%2314110d' stroke-width='2'%3E%3Cpath d='M12 2v16M6 8l6-6 6 6M4 13v12h16V13'/%3E%3C/svg%3E")}`;
  const show = () => {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const el = document.createElement('div'); el.className = 'ms-inst'; el.setAttribute('role', 'dialog');
    el.innerHTML = `<img src="/icon-192.png" alt=""><div class="tx"><div class="t">${T.t}</div><div class="s">${T.s}</div></div><button class="b" type="button">${T.b}</button><button class="x" type="button" aria-label="${T.x}">×</button>`;
    document.body.appendChild(el); requestAnimationFrame(() => el.classList.add('on'));
    const close = () => { el.classList.remove('on'); setTimeout(() => el.remove(), 500); try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} };
    el.querySelector('.x').onclick = close;
    el.querySelector('.b').onclick = async () => {
      if (deferred) { deferred.prompt(); try { await deferred.userChoice; } catch (e) {} deferred = null; close(); }
      else { el.querySelector('.s').innerHTML = isIOS ? T.ios : T.and; el.querySelector('.b').style.display = 'none'; }
    };
    window.addEventListener('appinstalled', close);
  };
  setTimeout(show, 7000);
})();
