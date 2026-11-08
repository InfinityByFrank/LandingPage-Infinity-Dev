import { Lab } from './Words'

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
)

const points: [string, string][] = [
  ['Web, app y panel sincronizados', 'Web, app and dashboard in sync'],
  ['Diseño y código en el mismo equipo', 'Design and code in the same team'],
  ['Tus datos cuidados desde el diseño', 'Your data protected by design'],
]

const langs = ['ES', 'EN', 'PT', 'FR', 'DE', 'IT']

export const WhyInfinity = () => (
  <section className="why" id="porque">
    <div className="wrap">
      <div className="why-head">
        <div>
          <Lab es="POR QUÉ INFINITY" en="WHY INFINITY" />
          <p className="reveal">
            <span data-es>Un solo equipo que piensa, diseña y construye el producto completo, para que nada quede a medias entre proveedores.</span>
            <span data-en>One team that thinks, designs and builds the whole product, so nothing is left half-done between vendors.</span>
          </p>
        </div>
        <h2 className="reveal">
          <span data-es>Producto completo,<br />no piezas sueltas.</span>
          <span data-en>A complete product,<br />not loose pieces.</span>
        </h2>
      </div>

      <div className="why-grid">
        <div className="why-cell why-text reveal">
          <div className="why-brand"><img src="/logo-color.svg" alt="" width="28" height="32" loading="lazy" /> <b>Infinity <span className="grad-text">by Frank</span></b></div>
          <div>
            <h3>
              <span data-es>Menos complejidad, más calidad</span>
              <span data-en>Less complexity, more quality</span>
            </h3>
            <p>
              <span data-es>Conectamos las partes de tu negocio en un solo sistema que funciona igual en el navegador, en el celular y en el servidor.</span>
              <span data-en>We connect the parts of your business into one system that works the same in the browser, on the phone and on the server.</span>
            </p>
            <ul className="why-list">
              {points.map(([es, en]) => (
                <li key={es}><span className="ck"><Check /></span><span data-es>{es}</span><span data-en>{en}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="why-cell why-visual reveal d1">
          <div className="why-phone" data-parallax="0.03">
            <img src="/projects/lens/tienda-05-resumen.webp" alt="Infinity Lens" width="460" height="1000" loading="lazy" decoding="async" />
          </div>
          <div className="why-float f1">
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg></span>
            <div><b>Web · App · Panel</b><small><span data-es>Siempre sincronizados</span><span data-en>Always in sync</span></small></div>
          </div>
          <div className="why-float f2">
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg></span>
            <div><b><span data-es>Privacidad</span><span data-en>Privacy</span></b><small><span data-es>Todo queda en tu iPhone</span><span data-en>Everything stays on your iPhone</span></small></div>
          </div>
        </div>

        <div className="why-cell why-hot reveal d2">
          <span className="lab-s">[ <span data-es>ALCANCE</span><span data-en>SCOPE</span> ]</span>
          <div>
            <div className="big">3<small>en 1</small></div>
            <p>
              <span data-es>Sitio web, app móvil y panel de administración en un mismo sistema.</span>
              <span data-en>Website, mobile app and admin panel in one system.</span>
            </p>
          </div>
        </div>

        <div className="why-cell why-mini reveal">
          <div className="mini-top"><b><span data-es>Simplicidad</span><span data-en>Simplicity</span></b></div>
          <p>
            <span data-es>Cada pantalla se gana su lugar: menos pasos para tus usuarios y menos mantenimiento para ti.</span>
            <span data-en>Every screen earns its place: fewer steps for your users and less upkeep for you.</span>
          </p>
        </div>

        <div className="why-cell why-mini dark reveal d1">
          <div className="mini-top"><b><span data-es>Sin plantillas</span><span data-en>No templates</span></b></div>
          <p>
            <span data-es>Diseño y código pensados para tu negocio. Nada reciclado de otro cliente.</span>
            <span data-en>Design and code shaped around your business. Nothing recycled from another client.</span>
          </p>
        </div>

        <div className="why-cell why-mini reveal d2">
          <div className="mini-top"><b><span data-es>Para todo el mundo</span><span data-en>For everyone</span></b></div>
          <p>
            <span data-es>Productos listos en varios idiomas, como nuestras páginas en seis idiomas.</span>
            <span data-en>Products ready in several languages, like our pages in six languages.</span>
          </p>
          <div className="why-langs">{langs.map((l) => <span key={l}>{l}</span>)}</div>
        </div>
      </div>
    </div>
  </section>
)
