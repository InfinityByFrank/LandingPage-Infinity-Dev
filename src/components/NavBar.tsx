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
          <img className="logo-c" src="/logo-color.svg" alt="" width="30" height="34" />
          <img className="logo-l" src="/logo-basic.svg" alt="" aria-hidden="true" width="30" height="34" />
          <span className="brand-name">Infinity <b className="grad-text">by Frank</b></span>
          <span className="brand-chip"><span data-es>Hecho a medida</span><span data-en>Built custom</span></span>
        </a>
        <nav className="nav-links" aria-label={lang === 'en' ? 'Main' : 'Principal'}>
          <a href={`${p}/#nosotros`}
          ><span data-es>Nosotros</span><span data-en>About</span></a
          >
          <a href={`${p}/#servicios`}
          ><span data-es>Servicios</span><span data-en>Services</span></a
          >
          <a href={`${p}/#proceso`}
          ><span data-es>Proceso</span><span data-en>Process</span></a
          >
          <a href={`${p}/#trabajo`}
          ><span data-es>Portafolio</span><span data-en>Work</span></a
          >
          <a href={`${p}/#faq`}>FAQ</a>
        </nav>
        <div className="nav-right">
          <div className="lang" id="lang">
            <a href={alternates.es} hrefLang="es" lang="es" data-lang="es" className={lang === 'es' ? 'active' : undefined} aria-label="ES · Español" aria-current={lang === 'es' ? 'true' : undefined}>ES</a>
            <a href={alternates.en} hrefLang="en" lang="en" data-lang="en" className={lang === 'en' ? 'active' : undefined} aria-label="EN · English" aria-current={lang === 'en' ? 'true' : undefined}>EN</a>
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
