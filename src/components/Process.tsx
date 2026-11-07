import { Lab } from './Words'

const steps = [
  { k: 'discover', t: ['Descubrimiento', 'Discovery'], d: ['Escuchamos tu idea, tus metas y a tus clientes para entender el reto real.', 'We listen to your idea, goals and customers to understand the real challenge.'] },
  { k: 'design', t: ['Diseño', 'Design'], d: ['Creamos una interfaz única y prototipos que puedes ver y tocar antes de programar.', 'We craft a unique interface and prototypes you can see and touch before code.'] },
  { k: 'build', t: ['Desarrollo', 'Development'], d: ['Construimos con código limpio y entregas frecuentes para que veas avances reales.', 'We build with clean code and frequent releases so you see real progress.'] },
  { k: 'launch', t: ['Lanzamiento', 'Launch'], d: ['Desplegamos en servidores seguros y dejamos todo listo para tus usuarios.', 'We deploy to secure servers and get everything ready for your users.'] },
  { k: 'support', t: ['Soporte', 'Support'], d: ['Seguimos contigo: monitoreo, mejoras y nuevas funciones cuando las necesites.', 'We stay with you: monitoring, improvements and new features when you need them.'] },
]

export const Process = () => (
  <section className="proc on-dark" id="proceso" data-proc data-nav="dark">
    <div className="proc-pin">
      <div className="wrap proc-head">
        <div>
          <Lab es="CÓMO TRABAJAMOS" en="HOW WE WORK" light />
          <h2>
            <span data-es>Un proceso claro,<br />sin sorpresas.</span>
            <span data-en>A clear process,<br />no surprises.</span>
          </h2>
        </div>
        <div>
          <p>
            <span data-es>Te acompañamos en cada paso y mantenemos todo transparente, de principio a fin.</span>
            <span data-en>We walk with you at every step and keep everything transparent, start to finish.</span>
          </p>
        </div>
        <div className="proc-count">
          <b data-proc-n>01</b>
          <span>/ 05</span>
          <div className="proc-bar"><i></i></div>
        </div>
      </div>

      <div className="proc-track" data-proc-track>
        {steps.map((s, i) => (
          <article className={`step${i === 0 ? ' active' : ''}`} key={s.k}>
            <div className="step-n">{String(i + 1).padStart(2, '0')}</div>
            <div className="k">[ {s.k} ]</div>
            <h3><span data-es>{s.t[0]}</span><span data-en>{s.t[1]}</span></h3>
            <p><span data-es>{s.d[0]}</span><span data-en>{s.d[1]}</span></p>
          </article>
        ))}
        <div className="proc-end"></div>
      </div>
    </div>
  </section>
)
