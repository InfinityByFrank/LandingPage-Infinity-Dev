import type { ComponentType } from 'react'
import { Lab } from './Words'
import { VisDash, VisMobile, VisServer, VisWeb } from './ServiceVisuals'

type Svc = {
  n: string
  title: [string, string]
  desc: [string, string]
  cap: string
  tags: string[]
  Vis: ComponentType
}

const items: Svc[] = [
  {
    n: '001',
    title: ['Aplicaciones web', 'Web applications'],
    desc: [
      'Plataformas y sitios rápidos, escalables y con diseños únicos. Experiencias hechas para convertir y para durar.',
      'Fast, scalable platforms and sites with one-of-a-kind designs. Experiences built to convert and to last.',
    ],
    cap: 'app.infinitydev.agency',
    tags: ['React', 'Next.js', 'UI/UX', 'E-commerce'],
    Vis: VisWeb,
  },
  {
    n: '002',
    title: ['Apps móviles', 'Mobile apps'],
    desc: [
      'Aplicaciones iOS y Android fluidas, intuitivas y con tu identidad. Tu marca en el bolsillo de tus clientes.',
      'Smooth, intuitive iOS and Android apps with your identity. Your brand in your customers’ pocket.',
    ],
    cap: 'ios · android',
    tags: ['iOS', 'Android', 'React Native', 'Flutter'],
    Vis: VisMobile,
  },
  {
    n: '003',
    title: ['Servidores & backend', 'Servers & backend'],
    desc: [
      'Infraestructura sólida, APIs seguras y arquitectura que aguanta el crecimiento. Cimientos en los que confiar.',
      'Solid infrastructure, secure APIs and architecture that scales. Foundations you can trust.',
    ],
    cap: 'api · cloud · uptime 99.9%',
    tags: ['Node', 'Cloud', 'APIs', 'DevOps'],
    Vis: VisServer,
  },
  {
    n: '004',
    title: ['Dashboards empresariales', 'Business dashboards'],
    desc: [
      'Paneles a la medida para visualizar tus datos y decidir con claridad. Toda tu operación en una sola pantalla.',
      'Tailored panels to visualize your data and decide with clarity. Your whole operation on one screen.',
    ],
    cap: 'real-time analytics',
    tags: ['Analytics', 'BI', 'Real-time', 'Reportes'],
    Vis: VisDash,
  },
]

export const Services = () => (
  <section className="svcs" id="servicios">
    <div className="wrap svcs-grid">
      <aside className="svcs-side">
        <div>
          <Lab es="SERVICIOS" en="SERVICES" />
          <h2 className="reveal">
            <span data-es>Lo que<br />construimos</span>
            <span data-en>What<br />we build</span>
          </h2>
          <p className="reveal d1">
            <span data-es>Cuatro especialidades, una sola obsesión: tu producto. Cubrimos todo el ciclo, desde la idea hasta el servidor en producción.</span>
            <span data-en>Four specialties, one obsession: your product. We cover the full cycle, from idea to production server.</span>
          </p>
        </div>
        <div className="svcs-aside-foot">
          <div className="k"><span data-es>Más allá de lo estándar</span><span data-en>Beyond standard scope</span></div>
          <div className="v"><span data-es>Hecho distinto. Construido juntos.</span><span data-en>Made different. Built together.</span></div>
          <a href="#contacto" className="btn btn-primary" data-magnet>
            <span data-es>Habla de tu proyecto</span><span data-en>Discuss your project</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"></path></svg>
          </a>
        </div>
      </aside>

      <div className="svcs-list">
        {items.map(({ n, title, desc, cap, tags, Vis }) => (
          <article className="svc" key={n}>
            <div className="reveal">
              <div className="svc-n">{n}.</div>
              <h3><span data-es>{title[0]}</span><span data-en>{title[1]}</span></h3>
            </div>
            <div className="svc-vis reveal d1">
              <Vis />
              <span className="cap">{cap}</span>
            </div>
            <div className="svc-body reveal d2">
              <p><span data-es>{desc[0]}</span><span data-en>{desc[1]}</span></p>
              <div className="svc-tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)
