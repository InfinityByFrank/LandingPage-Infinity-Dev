import { Fragment, type CSSProperties } from 'react'
import { Lx } from './i18n'

export type Seg = [text: string, cls?: string]

type Mode = 'mask' | 'scrub'

const Split = ({ segs, mode }: { segs: Seg[]; mode: Mode }) => {
  let n = 0
  const out = segs.flatMap(([text, cls], si) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((word, wi) => {
        const i = n++
        const key = `${si}-${wi}`
        if (mode === 'mask') {
          return (
            <Fragment key={key}>
              <span className="w"><i className={cls} style={{ '--i': i } as CSSProperties}>{word}</i></span>{' '}
            </Fragment>
          )
        }
        return (
          <span className={cls ? `w ${cls}` : 'w'} key={key}>{word}{' '}</span>
        )
      }),
  )
  return <>{out}</>
}

/**
 * Texto bilingüe partido en palabras para animarlas (máscara al entrar, o encendido por scroll).
 * Cada idioma va en su propio <span data-es|data-en>, que el middleware recorta según la ruta.
 */
export const Words = ({ es, en, mode = 'mask' }: { es: Seg[]; en: Seg[]; mode?: Mode }) => (
  <>
    <span data-es><Split segs={es} mode={mode} /></span>
    <span data-en><Split segs={en} mode={mode} /></span>
  </>
)

/** Etiqueta técnica: [ ▮▮▮▮ IF—SECCIÓN / 01 ] */
export const Lab = ({ es, en, n, light }: { es: string; en: string; n?: string; light?: boolean }) => (
  <span className={`lab${light ? ' light' : ''}`}>
    <span className="mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <span>
      [ IF—<Lx es={es} en={en} />
      {n && <> / <em>{n}</em></>} ]
    </span>
  </span>
)
