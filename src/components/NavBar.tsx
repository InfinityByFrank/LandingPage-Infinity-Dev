import { langPrefix, type Lang } from './i18n'

type Props = {
  lang?: Lang
  /** Ruta equivalente de la página actual en cada idioma, para el selector ES/EN */
  alternates?: Record<Lang, string>
}

export const NavBar = ({ lang = 'es', alternates = { es: '/', en: '/en/' } }: Props) => {
  const p = langPrefix(lang)

  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <a href={`${p}/#top`} className="brand">
          <img src="/logo_basic.webp" alt="Infinity Dev" />
          <span className="brand-name">INFINITY <b className="grad-text">DEV</b></span>
        </a>
        <nav className="nav-links">
          <a href={`${p}/#servicios`}
          ><span data-es>Servicios</span><span data-en>Services</span></a
          >
          <a href={`${p}/#proceso`}
          ><span data-es>Proceso</span><span data-en>Process</span></a
          >
          <a href={`${p}/#trabajo`}
          ><span data-es>Portafolio</span><span data-en>Work</span></a
          >
          <a href={`${p}/trabajos/`} className="nav-all"
          ><span data-es>Todos los trabajos</span><span data-en>All work</span></a
          >
          <a href={`${p}/#faq`}>FAQ</a>
        </nav>
        <div className="nav-right">
          <div className="lang" id="lang">
            <a href={alternates.es} hrefLang="es" lang="es" data-lang="es" className={lang === 'es' ? 'active' : undefined} aria-label="Español" aria-current={lang === 'es' ? 'true' : undefined}>ES</a>
            <a href={alternates.en} hrefLang="en" lang="en" data-lang="en" className={lang === 'en' ? 'active' : undefined} aria-label="English" aria-current={lang === 'en' ? 'true' : undefined}>EN</a>
          </div>
          <a href={`${p}/#contacto`} className="btn btn-primary nav-cta">
            <span data-es>Cotizar</span><span data-en>Get a quote</span>
          </a>
          <button className="burger" id="burger" aria-label={lang === 'en' ? 'Menu' : 'Menú'}
          ><span></span></button
          >
        </div>
      </div>
    </header>
  )
}
