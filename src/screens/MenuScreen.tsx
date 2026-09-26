import { ChevronRight } from 'lucide-react'
import { menus, photoUrl, SPECIAL, type MenuSection } from '../data/products'
import { useNav } from '../nav'

// Menú desglosado de una sección, sobre una imagen de fondo que ocupa toda la pantalla de menú.
function MenuScreen({ section }: { section: MenuSection }) {
  const { go } = useNav()
  const { subs, background } = menus[section]

  return (
    <div className="relative -mx-4 -my-6 min-h-[calc(100%+3rem)] overflow-hidden sm:-mx-10 sm:-my-8 sm:min-h-[calc(100%+4rem)]">
      <img src={photoUrl(background, 1200, 1400)} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

      <nav className="relative flex flex-col items-start gap-0.5 px-6 py-8 sm:px-12 sm:py-12">
        <h2 className="mb-6 text-3xl text-white drop-shadow sm:text-4xl">{section}</h2>
        {subs.map((sub) => (
          <button
            key={sub}
            onClick={() => go({ name: 'catalog', listing: { kind: 'section', section, sub } })}
            className={`group flex items-center gap-1 py-2 text-left text-[11px] tracking-[0.18em] text-white uppercase drop-shadow transition sm:text-xs ${
              sub === SPECIAL ? 'mt-3 bg-red-600 px-3' : 'hover:underline underline-offset-4'
            }`}
          >
            {sub}
            <ChevronRight className="size-3 opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
        <button
          onClick={() => go({ name: 'catalog', listing: { kind: 'section', section } })}
          className="mt-8 border border-white px-4 py-2.5 text-[10px] tracking-[0.18em] text-white uppercase backdrop-blur-[2px]"
        >
          Ver todo {section === 'Colección' ? 'la colección' : 'en accesorios'}
        </button>
      </nav>
    </div>
  )
}

export default MenuScreen
