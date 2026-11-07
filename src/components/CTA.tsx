import { TURNSTILE_SITE_KEY } from '../data/site'

import React from 'react'
import { Lab } from './Words'

export const CTA = () => {
  return (
    <section className="cta" id="contacto" data-nav="dark">
      <div className="wrap">
        <div className="on-dark"><Lab es="CONTACTO" en="CONTACT" light /></div>
        <div className="cta-big reveal" aria-hidden="true">
          <span data-es>Hablem<span className="o"></span>s</span>
          <span data-en>Let’s talk</span>
        </div>
        <div className="cta-card">
          <div className="cta-left reveal">
            <h2>
              <span data-es>Cuéntanos tu idea.<br />Te respondemos en 24 h.</span
              ><span data-en>Tell us your idea.<br />We reply within 24 h.</span>
            </h2>
            <p>
              <span data-es
              >Sin compromiso. Recibe una cotización clara y honesta para tu
                proyecto.</span
              ><span data-en
              >No commitment. Get a clear, honest quote for your project.</span>
            </p>
            <ul className="cta-points">
              <li>
                <span className="ck"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"><path d="M5 13l4 4L19 7"></path></svg
                  ></span
                ><span data-es>Primera asesoría gratuita</span><span data-en
                >Free first consultation</span>
              </li>
              <li>
                <span className="ck"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"><path d="M5 13l4 4L19 7"></path></svg
                  ></span
                ><span data-es>Diseño 100% a la medida</span><span data-en
                >100% custom design</span>
              </li>
              <li>
                <span className="ck"
                ><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.6"><path d="M5 13l4 4L19 7"></path></svg
                  ></span
                ><span data-es>Acompañamiento de principio a fin</span><span
                  data-en>End-to-end guidance</span>
              </li>
            </ul>
          </div>
          <div className="form reveal d1">
            <form id="quoteForm" noValidate>
              <h3>
                <span data-es>Solicita tu cotización</span><span data-en
                >Request your quote</span>
              </h3>
              <p className="fsub">
                <span data-es>Cuéntanos lo esencial y te contactamos.</span><span
                  data-en>Give us the essentials and we'll reach out.</span>
              </p>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-name"
                  ><span data-es>Nombre</span><span data-en>Name</span></label
                  ><input id="f-name" type="text" name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Ana Pérez" />
                </div>
                <div className="field">
                  <label htmlFor="f-company"
                  ><span data-es>Empresa</span><span data-en>Company</span
                  ></label
                  ><input id="f-company" type="text" name="company" maxLength={100} autoComplete="organization" placeholder="Acme Inc." />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-email"
                ><span data-es>Correo</span><span data-en>Email</span></label
                ><input id="f-email" type="email" name="email" required maxLength={200} autoComplete="email" placeholder="ana@empresa.com" />
              </div>
              <div className="field">
                <label htmlFor="f-service"
                ><span data-es>¿Qué necesitas?</span><span data-en
                >What do you need?</span
                  ></label
                >
                <select id="f-service" name="service" required>
                  <option
                    value=""
                    data-es-text="Selecciona un servicio"
                    data-en-text="Select a service"></option>
                  <option
                    value="web" data-es-text="Aplicación web"
                    data-en-text="Web application"></option>
                  <option value="mobile" data-es-text="App móvil" data-en-text="Mobile app"
                  ></option>
                  <option
                    value="backend" data-es-text="Servidores / backend"
                    data-en-text="Servers / backend"></option>
                  <option
                    value="dashboard" data-es-text="Dashboard empresarial"
                    data-en-text="Business dashboard"></option>
                  <option
                    value="other" data-es-text="Varios / no estoy seguro"
                    data-en-text="Several / not sure"></option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-message"
                ><span data-es>Cuéntanos tu idea</span><span data-en
                >Tell us your idea</span
                  ></label
                ><textarea id="f-message" name="message" required minLength={10} maxLength={3000} placeholder="..."></textarea>
              </div>
              <div className="hp" aria-hidden="true">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {TURNSTILE_SITE_KEY && (
                <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" data-size="flexible"></div>
              )}
              <div className="form-error" id="formError" role="alert" aria-live="polite">
                <p data-kind="validation" hidden>
                  <span data-es>Revisa tus datos: el nombre, un correo válido y un mensaje de al menos 10 caracteres.</span>
                  <span data-en>Please check your details: your name, a valid email and a message of at least 10 characters.</span>
                </p>
                <p data-kind="captcha" hidden>
                  <span data-es>No pudimos verificar que eres una persona. Espera un momento e inténtalo de nuevo.</span>
                  <span data-en>We could not verify you are human. Wait a moment and try again.</span>
                </p>
                <p data-kind="server" hidden>
                  <span data-es>No se pudo enviar tu solicitud. Inténtalo de nuevo o escríbenos a contacto@infinitydev.agency.</span>
                  <span data-en>Your request could not be sent. Try again or write to us at contacto@infinitydev.agency.</span>
                </p>
              </div>
              <button type="submit" className="btn btn-primary" id="quoteSubmit">
                <span className="btn-label"><span data-es>Enviar solicitud</span><span data-en
                >Send request</span
                ></span
                ><span className="btn-sending"><span data-es>Enviando…</span><span data-en>Sending…</span></span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ><path d="M5 12h14M13 6l6 6-6 6"></path></svg
                >
              </button>
              <p className="form-note">
                <span data-es>Te respondemos en menos de 24 horas hábiles.</span
                ><span data-en>We reply within 24 business hours.</span>
              </p>
            </form>
            <div className="form-success" id="formSuccess">
              <div className="ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"><path d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3>
                <span data-es>¡Solicitud enviada!</span><span data-en
                >Request sent!</span>
              </h3>
              <p>
                <span data-es>Gracias. Te contactaremos muy pronto.</span><span
                  data-en>Thanks. We'll be in touch very soon.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
