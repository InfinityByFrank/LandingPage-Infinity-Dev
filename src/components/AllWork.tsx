import { useCallback, useEffect, useMemo, useState } from 'react'
import { projects } from '../data/projects'
import { productDetail } from '../data/productDetails'
import { filterLabels, kindLabels, products, type ProductKind } from '../data/products'
import { Art } from './Art'
import { ProjectModal } from './ProjectModal'
import { Lab } from './Words'
import { LangContext, Lx, T, langPrefix, type Lang } from './i18n'

type Filter = 'all' | ProductKind

const PAGE_SIZE = 6
const FILTERS: Filter[] = ['all', 'app', 'web', 'dashboard']

const readUrl = (): { filter: Filter; page: number } => {
  const params = new URLSearchParams(window.location.search)
  const tipo = params.get('tipo') as Filter | null
  const page = Number.parseInt(params.get('p') ?? '1', 10)

  return {
    filter: tipo && FILTERS.includes(tipo) ? tipo : 'all',
    page: Number.isFinite(page) && page > 0 ? page : 1,
  }
}

/** El selector ES/EN conserva el filtro y la página al cambiar de idioma */
const syncLangLinks = () => {
  document.querySelectorAll<HTMLAnchorElement>('#lang a[data-lang]').forEach((link) => {
    const url = new URL(link.getAttribute('href') ?? '/', window.location.origin)
    url.search = window.location.search
    link.setAttribute('href', `${url.pathname}${url.search}`)
  })
}

const writeUrl = (filter: Filter, page: number) => {
  const params = new URLSearchParams()
  if (filter !== 'all') params.set('tipo', filter)
  if (page > 1) params.set('p', String(page))

  const query = params.toString()
  window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`)
  syncLangLinks()
}

export const AllWork = ({ lang = 'es' }: { lang?: Lang }) => {
  const [filter, setFilter] = useState<Filter>('all')
  const [page, setPage] = useState(1)
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])

  useEffect(() => {
    const initial = readUrl()
    setFilter(initial.filter)
    setPage(initial.page)
    syncLangLinks()
  }, [])

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.kind === filter)),
    [filter],
  )
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const slice = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const activeProduct = products.find((p) => p.id === openId)
  const active = activeProduct ? productDetail(activeProduct) : undefined

  const go = (nextFilter: Filter, nextPage: number) => {
    setFilter(nextFilter)
    setPage(nextPage)
    writeUrl(nextFilter, nextPage)
  }

  const goPage = (n: number) => {
    go(filter, n)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const countFor = (f: Filter) => (f === 'all' ? products.length : products.filter((p) => p.kind === f).length)

  return (
    <LangContext.Provider value={lang}>
    <section className="sec aw" id="catalogo">
      <div className="wrap">
        <div className="sec-head">
          <a href={`${langPrefix(lang)}/#trabajo`} className="aw-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            <Lx es={<>Volver al inicio</>} en={<>Back to home</>} />
          </a>
          <Lab es="TODOS LOS TRABAJOS" en="ALL WORK" />
          <h1>
            <Lx es={<>Cada producto,<br />por separado.</>} en={<>Every product,<br />on its own.</>} />
          </h1>
          <p>
            <Lx es={<>
              Apps, sitios y paneles que hemos construido, listados uno por uno. Abre cualquiera para ver el proyecto completo.
            </>} en={<>
              Apps, websites and admin panels we have built, listed one by one. Open any of them to see the whole project.
            </>} />
          </p>
        </div>

        <div className="aw-filters" role="tablist" aria-label={lang === 'en' ? 'Filter' : 'Filtro'}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`aw-chip${filter === f ? ' on' : ''}`}
              onClick={() => go(f, 1)}
            >
              <T t={filterLabels[f]} />
              <i>{countFor(f)}</i>
            </button>
          ))}
        </div>

        <ul className="aw-list">
          {slice.map((product) => {
            const project = projects.find((p) => p.id === product.projectId)
            if (!project) return null

            return (
              <li key={product.id} className="aw-item">
                <button
                  type="button"
                  className="aw-art"
                  style={{ background: project.tone }}
                  onClick={() => setOpenId(product.id)}
                  aria-label={product.name[lang]}
                >
                  <Art images={product.images} />
                </button>

                <div className="aw-body">
                  <div className="aw-meta">
                    <span className={`aw-kind k-${product.kind}`}><T t={kindLabels[product.kind]} /></span>
                    <span className="aw-from">
                      <Lx es={<>Proyecto: </>} en={<>Project: </>} />
                      <T t={project.title} />
                    </span>
                  </div>
                  <h2><T t={product.name} /></h2>
                  <p><T t={product.summary} /></p>
                  <ul className="aw-tags">
                    {product.tags.map((tag) => (
                      <li key={tag.es}><T t={tag} /></li>
                    ))}
                  </ul>
                  <div className="aw-actions">
                    <button type="button" className="btn btn-primary" onClick={() => setOpenId(product.id)}>
                      <Lx es={<>Ver el proyecto</>} en={<>View project</>} />
                    </button>
                    {product.link && (
                      <a className="btn btn-ghost" href={product.link.href} target="_blank" rel="noopener noreferrer">
                        <T t={product.link.label} />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {pages > 1 && (
          <nav className="aw-pager" aria-label={lang === 'en' ? 'Pagination' : 'Paginación'}>
            <button type="button" className="aw-pg" disabled={current === 1} onClick={() => goPage(current - 1)} aria-label={lang === 'en' ? 'Previous' : 'Anterior'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`aw-pg${n === current ? ' on' : ''}`}
                aria-current={n === current ? 'page' : undefined}
                onClick={() => goPage(n)}
              >
                {n}
              </button>
            ))}
            <button type="button" className="aw-pg" disabled={current === pages} onClick={() => goPage(current + 1)} aria-label={lang === 'en' ? 'Next' : 'Siguiente'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </nav>
        )}

        <p className="aw-count">
          <Lx es={<>Mostrando {slice.length} de {visible.length} productos</>} en={<>Showing {slice.length} of {visible.length} products</>} />
        </p>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
    </LangContext.Provider>
  )
}
