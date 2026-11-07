import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Detail } from '../data/projects'
import { Art } from './Art'
import { Lab } from './Words'
import { Lx, T, useLang } from './i18n'

const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const ProjectModal = ({ project, onClose }: { project: Detail; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lang = useLang() ?? 'es'

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [onClose])

  const goContact = () => {
    onClose()
    window.setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  return createPortal(
    <div className="pj-backdrop" data-lenis-prevent onClick={onClose}>
      <button ref={closeRef} className="pj-close" onClick={onClose} aria-label={lang === 'en' ? 'Close' : 'Cerrar'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="pj" role="dialog" aria-modal="true" aria-labelledby="pj-title" onClick={(e) => e.stopPropagation()}>
        <header className="pj-head" style={{ background: project.tone }}>
          <div className="pj-copy">
            <span className="pj-tag"><T t={project.tag} /></span>
            <h3 id="pj-title"><T t={project.title} /></h3>
            <p><T t={project.intro} /></p>
            {project.link && (
              <a className="btn btn-light" href={project.link.href} target="_blank" rel="noopener noreferrer">
                <T t={project.link.label} /> <Plus />
              </a>
            )}
          </div>
          <Art images={project.cover} className="pj-art-head" />
        </header>

        <div className="pj-stats">
          {project.stats.map((s) => (
            <div key={s.n + s.label.es}>
              <b>{s.n}</b>
              <span><T t={s.label} /></span>
            </div>
          ))}
        </div>

        <div className="pj-body">
          {project.articles.map((a, i) => (
            <article key={a.title.es} className={`pj-row ${a.kind}${i % 2 ? ' flip' : ''}`}>
              <figure className="pj-fig" style={{ background: project.tone }}>
                <img src={a.image} alt={a.alt[lang]} loading="lazy" decoding="async" />
              </figure>
              <div className="pj-text">
                <span className="pj-n">{String(i + 1).padStart(2, '0')}.</span>
                <h4><T t={a.title} /></h4>
                {a.text && <p><T t={a.text} /></p>}
                {a.bullets && (
                  <ul>
                    {a.bullets.map((b) => (
                      <li key={b.es}><T t={b} /></li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="pj-info">
          <div className="pj-services">
            <Lab es="LO QUE ENTREGAMOS" en="WHAT WE DELIVERED" />
            <ul>
              {project.services.map((s) => (
                <li key={s.es}><T t={s} /></li>
              ))}
            </ul>
          </div>

          <details className="pj-tech" open>
            <summary><Lx es={<>Ficha técnica</>} en={<>Tech sheet</>} /></summary>
            <dl>
              {project.tech.map((r) => (
                <div key={r.k.es}>
                  <dt><T t={r.k} /></dt>
                  <dd><T t={r.v} /></dd>
                </div>
              ))}
            </dl>
          </details>
        </section>

        <footer className="pj-cta">
          <div>
            <h4><Lx es={<>¿Tienes un proyecto en mente?</>} en={<>Have a project in mind?</>} /></h4>
            <p><Lx es={<>Cuéntanos tu idea y la convertimos en un producto como este.</>} en={<>Tell us your idea and we will turn it into a product like this.</>} /></p>
          </div>
          <button className="btn btn-primary btn-lg" onClick={goContact}>
            <Lx es={<>Cotiza tu proyecto</>} en={<>Quote your project</>} /> <Plus />
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
