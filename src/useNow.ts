import { useEffect, useState } from 'react'

// Reloj que se actualiza periódicamente, para que el estado simulado de los pedidos avance en pantalla.
export function useNow(intervalMs = 15000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}
