import { Lab, Words } from './Words'

export const Manifesto = () => (
  <section className="manifesto" id="nosotros">
    <div className="wrap">
      <div className="reveal"><Lab es="QUIÉNES SOMOS" en="WHO WE ARE" /></div>

      <div className="man-stage">
        <figure className="man-img l" data-parallax="-0.12">
          <img src="/about/foodco-feed.webp" alt="Food&Co: app móvil" width="737" height="1100" loading="lazy" decoding="async" />
        </figure>
        <p className="man-text scrub" data-scrub>
          <Words
            mode="scrub"
            es={[['Somos un estudio de software a la medida que ayuda a las marcas a construir'], ['productos digitales únicos.', 'tail']]}
            en={[['We are a custom software studio that helps brands build'], ['unique digital products.', 'tail']]}
          />
        </p>
        <figure className="man-img r" data-parallax="0.14">
          <img src="/about/lens-oscuro.webp" alt="Infinity Lens: modo oscuro" width="506" height="1100" loading="lazy" decoding="async" />
        </figure>
      </div>

      <div className="man-foot">
        <p className="reveal">
          <span data-es>El buen software no se mide en funciones, sino en lo bien que resuelve tu problema. Escuchamos, simplificamos y construimos solo lo que importa.</span>
          <span data-en>Good software isn’t measured in features, but in how well it solves your problem. We listen, simplify and build only what matters.</span>
        </p>
        <div className="sig reveal d1">
          <img src="/logo-color.svg" alt="" width="40" height="45" loading="lazy" />
          <div>
            <b>Infinity Dev</b>
            <span data-es>Software único · hecho para tu historia</span><span data-en>Unique software · built for your story</span>
          </div>
        </div>
      </div>
    </div>
  </section>
)
