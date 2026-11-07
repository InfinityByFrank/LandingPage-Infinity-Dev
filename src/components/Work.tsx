import { useCallback, useState } from 'react'
import { projects, type Project } from '../data/projects'
import { ProjectModal } from './ProjectModal'
import { LangContext, Lx, T, langPrefix, type Lang } from './i18n'

const CardCover = ({ project }: { project: Project }) => (
  <div className={`work-cover ${project.cover[0].kind}`} aria-hidden="true">
    {project.cover.map((img, i) => (
      <img
        key={img.src}
        src={img.src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`cv cv${i + 1} ${img.kind}`}
      />
    ))}
  </div>
)

export const Work = ({ lang = 'es' }: { lang?: Lang }) => {
  const [openId, setOpenId] = useState<string | null>(null)
  const close = useCallback(() => setOpenId(null), [])
  const active = projects.find((p) => p.id === openId)

  return (
    <LangContext.Provider value={lang}>
    <section className="sec" id="trabajo">
      <div className="wrap">
        <div className="sec-head reveal" suppressHydrationWarning>
          <span className="eyebrow">
            <Lx es={<>Portafolio</>} en={<>Selected work</>} />
          </span>
          <h2>
            <Lx es={<>Proyectos pensados<br />al detalle.</>} en={<>Projects crafted<br />down to the detail.</>} />
          </h2>
          <p>
            <Lx es={<>Una muestra de lo que construimos. Toca un proyecto para ver cómo lo hicimos.</>} en={<>A sample of what we build. Tap a project to see how we did it.</>} />
          </p>
        </div>

        <div className="bento">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`work bento-${p.size} reveal${i ? ` d${Math.min(i, 3)}` : ''}`}
              style={{ background: p.tone }}
              onClick={() => setOpenId(p.id)}
              aria-haspopup="dialog"
              suppressHydrationWarning
            >
              <div className="work-meta">
                <span className="tag"><T t={p.tag} /></span>
                <h3><T t={p.title} /></h3>
                <p><T t={p.summary} /></p>
                <span className="work-more">
                  <Lx es={<>Ver proyecto</>} en={<>View project</>} />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
              <CardCover project={p} />
            </button>
          ))}

          <a href="#contacto" className="work bento-banner work-cta reveal d2" suppressHydrationWarning>
            <div className="work-meta">
              <span className="tag"><Lx es={<>Tu proyecto</>} en={<>Your project</>} /></span>
              <h3><Lx es={<>El siguiente podría ser el tuyo.</>} en={<>The next one could be yours.</>} /></h3>
              <span className="work-more">
                <Lx es={<>Hablemos</>} en={<>Let’s talk</>} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </a>
        </div>

        <div className="work-all reveal" suppressHydrationWarning>
          <a href={`${langPrefix(lang)}/trabajos/`} className="btn btn-ghost btn-lg">
            <Lx es={<>Ver todos los trabajos</>} en={<>View all work</>} />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
    </LangContext.Provider>
  )
}
