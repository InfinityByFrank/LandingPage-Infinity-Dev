type Img = { src: string; kind: 'phone' | 'wide' }

/** Composición de capturas (celulares o navegador) recortada dentro de su contenedor */
export const Art = ({ images, className = '' }: { images: Img[]; className?: string }) => (
  <span className={`art ${images[0]?.kind ?? 'wide'} ${className}`} aria-hidden="true">
    {images.slice(0, 2).map((img, i) => (
      <img key={img.src} src={img.src} alt="" loading="lazy" decoding="async" className={`a${i + 1} ${img.kind}`} />
    ))}
  </span>
)
