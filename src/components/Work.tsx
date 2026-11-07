import { useCallback, useState } from 'react'
import { projects, type Project } from '../data/projects'
import { ProjectModal } from './ProjectModal'
import { Lab } from './Words'
import { LangContext, Lx, T, langPrefix, type Lang } from './i18n'

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

/** Los dos proyectos grandes y los tres de la lista (el resto vive en /trabajos/) */
const FEATURED = ['cj-store', 'sano']
const MORE = ['food-co', 'pixoteria', 'infinity-lens']

/** Capturas horizontales (de navegador) para presentar cada proyecto: la principal y una de apoyo */
const SHOTS: Record<string, string[]> = {
  'cj-store': ['/projects/cj-store/web-inicio.webp', '/projects/cj-store/dash-inicio.webp'],
  sano: ['/projects/sano/landing-hero.webp', '/projects/sano/dash-inicio.webp'],
  'food-co': ['/projects/food-co/web-hero.webp', '/projects/food-co/dash-r2.webp'],
  pixoteria: ['/projects/pixoteria/web-inicio.webp', '/projects/pixoteria/web-barajas.webp'],
  'infinity-lens': ['/projects/lens-landing/desktop-01-portada.webp'],
}

const pick = (ids: string[]) => ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[]

const Art = ({ project }: { project: Project }) => {
  const [main, extra] = SHOTS[project.id] ?? []
  return (
    <div className="sl-art" aria-hidden="true">
      {main && <img src={main} alt="" loading="lazy" decoding="async" className="sl-img sl-img1" />}
      {extra && <img src={extra} alt="" loading="lazy" decoding="async" className="sl-img sl-img2" />}
    </div>
  )
}

export const Work = ({ lang = 'es' }: { lang?: Lang }) => {
  const [openId, setOpenId] = useState<string | null>(null)
  const [hot, setHot] = useState(0)
  const close = useCallback(() => setOpenId(null), [])
  const active = projects.find((p) => p.id === openId)
  const featured = pick(FEATURED)
  const more = pick(MORE)

  return (
    <LangContext.Provider value={lang}>
      <section className="work-sec" id="trabajo" data-nav="dark">
        <div className="wrap work-head" suppressHydrationWarning>
          <Lab es="PORTAFOLIO" en="SELECTED WORK" light />
          <h2 className="reveal">
            <Lx es={<>Proyectos pensados<br />al detalle.</>} en={<>Projects crafted<br />down to the detail.</>} />
          </h2>
          <p className="reveal d1">
            <Lx es={<>Una muestra de lo que construimos. Toca un proyecto para ver cómo lo hicimos.</>} en={<>A sample of what we build. Tap a project to see how we did it.</>} />
          </p>
        </div>

        <div className="slides">
          {featured.map((p, i) => (
            <article className="slide" key={p.id} suppressHydrationWarning>
              <div className="wrap sl-meta">
                <span>{String(i + 1).padStart(2, '0')}.</span>
                <span><em><Lx es={<>TIPO</>} en={<>TYPE</>} /></em> <T t={p.tag} /></span>
                <span><em><Lx es={<>PROYECTO</>} en={<>PROJECT</>} /></em> <T t={p.title} /></span>
              </div>
              <div className="wrap sl-wrap">
                <div className="sl-panel" style={{ background: p.tone }} onClick={() => setOpenId(p.id)}>
                  <div className="sl-copy">
                    <h3><T t={p.title} /></h3>
                    <p><T t={p.summary} /></p>
                    <button type="button" className="sl-more" aria-haspopup="dialog" onClick={() => setOpenId(p.id)}>
                      <Lx es={<>Ver proyecto</>} en={<>View project</>} /> <Plus />
                    </button>
                  </div>
                  <Art project={p} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="more" id="mas-casos">
          <div className="wrap more-grid" suppressHydrationWarning>
            <div className="more-side">
              <div>
                <Lab es="MÁS CASOS" en="MORE CASES" light />
                <p className="reveal">
                  <Lx es={<>Apps, sitios y paneles: cada producto pensado a la medida de su negocio.</>} en={<>Apps, sites and dashboards: every product shaped around its business.</>} />
                </p>
              </div>
              <a href={`${langPrefix(lang)}/trabajos/`} className="btn btn-primary" data-magnet>
                <Lx es={<>Ver todos los trabajos</>} en={<>View all work</>} /> <Plus />
              </a>
            </div>

            <ul className="more-list">
              {more.map((p, i) => (
                <li key={p.id} className={hot === i ? 'open' : ''}>
                  <button type="button" onMouseEnter={() => setHot(i)} onFocus={() => setHot(i)} onClick={() => setOpenId(p.id)} aria-haspopup="dialog">
                    <span className="ml-idx">{String(i + 1).padStart(2, '0')}.</span>
                    <span className="ml-thumb" style={{ background: p.tone }} aria-hidden="true">
                      <img src={SHOTS[p.id]?.[0] ?? p.cover[0].src} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="ml-info">
                      <span className="ml-tag"><T t={p.tag} /></span>
                      <span className="ml-title"><T t={p.title} /></span>
                      <span className="ml-sum"><T t={p.summary} /></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {active && <ProjectModal project={active} onClose={close} />}
      </section>
    </LangContext.Provider>
  )
}
