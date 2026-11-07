import { langPrefix, type Lang } from './i18n'

/** Agrega aquí la URL de cada red cuando exista; mientras esté vacía no se muestra el ícono */
const socialLinks: Record<'X' | 'LinkedIn' | 'Instagram', string> = {
  X: '',
  LinkedIn: 'https://www.linkedin.com/in/frank-giovanni-s-10a798360',
  Instagram: '',
}

export const Footer = ({ lang = 'es' }: { lang?: Lang }) => {
  const p = langPrefix(lang)

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href={`${p}/#top`} className="brand">
              <img
                src="/logo_basic.webp"
                alt="Infinity Dev"
                style={{ width: '38px', height: '38px' }}
              />
              <span className="brand-name">INFINITY <b className="grad-text">DEV</b></span
              >
            </a>
            <p>
              <span data-es
              >Software a la medida que cuenta tu historia. Diseño único,
                desarrollo sólido y atención pensada siempre en ti.</span
              ><span data-en
              >Custom software that tells your story. Unique design, solid
                development and care always thought around you.</span>
            </p>
          </div>
          <div className="foot-col">
            <h5><span data-es>Servicios</span><span data-en>Services</span></h5>
            <a href={`${p}/#servicios`}
            ><span data-es>Aplicaciones web</span><span data-en>Web apps</span
            ></a
            >
            <a href={`${p}/#servicios`}
            ><span data-es>Apps móviles</span><span data-en>Mobile apps</span
            ></a
            >
            <a href={`${p}/#servicios`}
            ><span data-es>Servidores</span><span data-en>Servers</span></a
            >
            <a href={`${p}/#servicios`}>Dashboards</a>
          </div>
          <div className="foot-col">
            <h5><span data-es>Empresa</span><span data-en>Company</span></h5>
            <a href={`${p}/#proceso`}
            ><span data-es>Proceso</span><span data-en>Process</span></a
            >
            <a href={`${p}/#trabajo`}
            ><span data-es>Portafolio</span><span data-en>Work</span></a
            >
            <a href={`${p}/trabajos/`}
            ><span data-es>Todos los trabajos</span><span data-en>All work</span></a
            >
            <a href={`${p}/#faq`}>FAQ</a>
            <a href={`${p}/#contacto`}
            ><span data-es>Contacto</span><span data-en>Contact</span></a
            >
          </div>
          <div className="foot-col">
            <h5><span data-es>Contacto</span><span data-en>Contact</span></h5>
            <a href="mailto:contacto@infinitydev.agency">contacto@infinitydev.agency</a>
            <a href={`${p}/#contacto`}
            ><span data-es>Cotizar proyecto</span><span data-en
            >Get a quote</span
              ></a
            >
          </div>
        </div>
        <div className="foot-bottom">
          <span
          >© 2026 Infinity Dev — <span data-es>Tu sitio web, tu historia.</span
          ><span data-en>Your website, your story.</span></span
          >
          <div className="socials">
            {socialLinks.X && (
              <a href={socialLinks.X} target="_blank" rel="noopener noreferrer" aria-label="X"
            ><svg viewBox="0 0 24 24" fill="currentColor"
            ><path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            ></path></svg
              ></a>
            )}
            {socialLinks.LinkedIn && (
              <a href={socialLinks.LinkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            ><svg viewBox="0 0 24 24" fill="currentColor"
            ><path
              d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
            ></path></svg
              ></a>
            )}
            {socialLinks.Instagram && (
              <a href={socialLinks.Instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            ><svg viewBox="0 0 24 24" fill="currentColor"
            ><path
              d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
            ></path></svg
              ></a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
