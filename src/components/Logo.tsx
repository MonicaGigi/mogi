// Logotipo: Didone de alto contraste con el "&" en cursiva.
function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-logo leading-none font-bold tracking-tight ${className}`} style={{ fontVariationSettings: '"opsz" 96' }}>
      mo<span className="mx-[0.02em] font-medium italic">&amp;</span>ju
    </span>
  )
}

export default Logo
