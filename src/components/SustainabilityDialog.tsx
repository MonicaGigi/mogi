import { Leaf, Package, Recycle, Shirt } from 'lucide-react'
import Dialog from './Dialog'

const commitments = [
  { icon: Shirt, title: 'Prendas para durar', text: 'Elegimos tejidos y acabados de calidad, pensados para acompañarte muchas temporadas y no solo una.' },
  { icon: Leaf, title: 'Materiales más responsables', text: 'Damos prioridad al algodón orgánico, al lino y a las fibras recicladas o certificadas siempre que es posible.' },
  { icon: Package, title: 'Entregas locales', text: 'Vendemos y entregamos solo en nuestra ciudad: trayectos cortos, menos emisiones y envíos sin plásticos de un solo uso.' },
  { icon: Recycle, title: 'Segunda vida', text: 'Te ayudamos a cuidar, arreglar y dar una segunda vida a tus prendas antes de desecharlas.' },
]

function SustainabilityDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto p-6">
        <div className="mb-3 flex size-11 items-center justify-center rounded-none bg-neutral-100">
          <Leaf className="size-5 text-ink" />
        </div>
        <h2 className="text-2xl">Sostenibilidad</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">
          En mo&amp;ju trabajamos para ofrecer una selección de artículos que combine diseño, calidad y un enfoque más responsable. Creemos
          que la moda puede ser actual sin ser desechable: por eso seleccionamos cada prenda pensando en quién la hace, con qué materiales y
          cuánto tiempo va a acompañarte.
        </p>
        <ul className="mt-5 space-y-4">
          {commitments.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-4 shrink-0 text-ink" />
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          No somos perfectos y nos queda camino por recorrer, pero cada temporada damos un paso más. Comprar menos y mejor también es una
          forma de vestir bien.
        </p>
      </div>
    </Dialog>
  )
}

export default SustainabilityDialog
