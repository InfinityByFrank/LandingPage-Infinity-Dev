import { Lab } from './Words'

const items = [
  { n: '01', k: ['CLARIDAD', 'CLARITY'], t: ['Entender antes de construir', 'Understand before building'], d: ['Empezamos escuchando el problema real, no solo lo que se pide. Primero claridad, después pantallas.', 'We start by listening to the real problem, not just the request. Clarity first, screens after.'] },
  { n: '02', k: ['SIMPLICIDAD', 'SIMPLICITY'], t: ['Quitar lo que sobra', 'Remove what is extra'], d: ['Cada función tiene que ganarse su lugar. Lo que no ayuda a tu usuario, no entra.', 'Every feature has to earn its place. What does not help your user does not ship.'] },
  { n: '03', k: ['OFICIO', 'CRAFT'], t: ['Cuidar cada detalle', 'Sweat every detail'], d: ['Interfaces pulidas, código limpio y servidores confiables: el detalle es parte del producto.', 'Polished interfaces, clean code and reliable servers: detail is part of the product.'] },
  { n: '04', k: ['COMPROMISO', 'COMMITMENT'], t: ['Seguir contigo', 'Stay with you'], d: ['Lanzar no es el final. Mejoramos, monitoreamos y respondemos cuando nos necesitas.', 'Launching is not the end. We improve, monitor and answer when you need us.'] },
]

export const Beliefs = () => (
  <section className="bel" id="creemos" data-bel>
    <div className="bel-pin">
    <div className="wrap bel-grid">
      <aside className="bel-side">
        <div>
          <Lab es="LO QUE CREEMOS" en="WHAT WE BELIEVE" />
          <h2>
            <span data-es>Lo que<br />nos guía</span>
            <span data-en>What<br />guides us</span>
          </h2>
          <p>
            <span data-es>Cuatro principios que se notan en cada proyecto, sin importar el tamaño ni la tecnología.</span>
            <span data-en>Four principles you can feel in every project, whatever the size or technology.</span>
          </p>
        </div>
        <blockquote>
          <span className="q" aria-hidden="true">“</span>
          <span data-es>Un buen producto se nota en lo que decidimos no hacer.</span>
          <span data-en>A good product shows in what we decide not to do.</span>
          <cite>Infinity by Frank</cite>
        </blockquote>
      </aside>

      <div className="bel-cards">
        {items.map((it, i) => (
          <article className={`bel-card${i === 0 ? ' active' : ''}`} key={it.n}>
            <div className="bel-top"><span className="chip">{it.n}.</span><span className="kk"><span data-es>{it.k[0]}</span><span data-en>{it.k[1]}</span></span></div>
            <div className="bel-bot">
              <h3><span data-es>{it.t[0]}</span><span data-en>{it.t[1]}</span></h3>
              <p><span data-es>{it.d[0]}</span><span data-en>{it.d[1]}</span></p>
            </div>
          </article>
        ))}
      </div>
    </div>
    </div>
  </section>
)
