import type { CSSProperties } from 'react'
import { Words } from './Words'

const WORD = 'infinity'
const STACK = ['React', 'Next.js', 'Astro', 'TypeScript', 'Node', 'React Native', 'Flutter', 'Cloud', 'APIs', 'DevOps', 'Analytics', 'UI/UX']

export const Hero = () => {
  return (
    <section className="hero on-dark" id="inicio" data-nav="dark">
      <canvas className="hero-canvas" id="heroCanvas" aria-hidden="true"></canvas>
      <div className="hero-grain" aria-hidden="true"></div>

      <div className="wrap hero-inner">
        <div className="hero-top hero-fade">
          <span><em>01.</em><span data-es>Aplicaciones web</span><span data-en>Web applications</span></span>
          <span><em>02.</em><span data-es>Apps móviles</span><span data-en>Mobile apps</span></span>
          <span><em>03.</em><span data-es>Servidores &amp; dashboards</span><span data-en>Servers &amp; dashboards</span></span>
        </div>

        <div className="hero-stage">
          <p className="hero-word" aria-hidden="true">
            {WORD.split('').map((c, i) => (
              <span className="ch" key={i}><b style={{ '--i': i } as CSSProperties}>{c}</b></span>
            ))}
          </p>
          <h1 className="hero-tag">
            <span className="sr-only">
              <span data-es>Infinity Dev, desarrollo de software a medida. </span>
              <span data-en>Infinity Dev, custom software development. </span>
            </span>
            <Words
              es={[['Software único, hecho para'], ['tu historia.', 'hl']]}
              en={[['Unique software, built for'], ['your story.', 'hl']]}
            />
          </h1>
        </div>

        <div className="hero-row hero-fade">
          <p className="hero-sub">
            <span data-es
            >Diseñamos y construimos apps web, móviles, servidores y dashboards a la medida de tu negocio. Nada de
              plantillas — pensamos cada detalle en ti y en tus clientes.</span
            >
            <span data-en
            >We design and build custom web apps, mobile apps, servers and dashboards tailored to your business. No
              templates — every detail thought around you and your customers.</span>
          </p>
          <div className="hero-cta">
            <a href="#contacto" className="btn btn-primary btn-lg" data-magnet>
              <span data-es>Cotiza tu proyecto</span><span data-en>Quote your project</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>
            </a>
          </div>
          <div className="hero-meta">
            <span className="live"></span>
            <span data-es>Respuesta en menos de 24 h</span><span data-en>Reply in under 24 h</span>
          </div>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
