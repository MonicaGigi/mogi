import type { Section } from './data/products'

// Vendedores de cada sección, para el contacto por WhatsApp (simulado).
export const sellers: Record<Section, { name: string; phone: string }> = {
  Colección: { name: 'Carla', phone: '62345678' },
  Calzado: { name: 'Luis', phone: '63456789' },
  Accesorios: { name: 'Marta', phone: '64567890' },
}

// La tienda vende y entrega solo en su localidad. Para otra ciudad, cambia estos datos.
export const store = {
  city: 'Ciudad de Panamá',
  zones: [
    'Ancón',
    'Bella Vista',
    'Betania',
    'Calidonia',
    'Curundú',
    'El Chorrillo',
    'Juan Díaz',
    'Las Cumbres',
    'Parque Lefevre',
    'Pedregal',
    'Pueblo Nuevo',
    'Río Abajo',
    'San Felipe',
    'San Francisco',
    'Santa Ana',
    'Tocumen',
    '24 de Diciembre',
  ],
} as const
