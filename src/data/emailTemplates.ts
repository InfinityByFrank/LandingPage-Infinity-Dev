/**
 * Plantillas de los correos del formulario de contacto.
 * HTML con tablas y estilos en línea, que es lo único que muestran bien todos los clientes de correo.
 * Son funciones puras (reciben texto ya validado), así que se pueden probar sin el Worker.
 */

export type Lang = 'es' | 'en'

export const SITE_URL = 'https://infinitydev.agency'

/** Logo blanco de la cabecera, servido desde el bucket de R2 `infinity-dev` en cdn.infinitydev.agency */
export const EMAIL_LOGO_URL = 'https://cdn.infinitydev.agency/logo_compleot_blanco.png'

const COLOR = {
  ink: '#171b24',
  slate: '#3a4452',
  muted: '#697586',
  line: '#e7e9ee',
  soft: '#f7f8fb',
  page: '#eef0f6',
  violet: '#8030C0',
  cyan: '#20C0E0',
}

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
const GRADIENT = `linear-gradient(115deg,${COLOR.violet} 0%,#9636cf 35%,${COLOR.cyan} 100%)`

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string)

const nl2br = (value: string) => escapeHtml(value).replace(/\n/g, '<br />')

const button = (href: string, label: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto">
    <tr>
      <td align="center" bgcolor="${COLOR.violet}" style="border-radius:999px;background:${COLOR.violet};background-image:${GRADIENT}">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:15px 32px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`

const section = (content: string, padding = '0 40px 28px') => `<tr><td style="padding:${padding};font-family:${FONT}">${content}</td></tr>`

type ShellOptions = {
  lang: Lang
  title: string
  preheader: string
  eyebrow: string
  heading: string
  body: string
  footerNote: string
}

/** Marco común: cabecera oscura con el logo, tarjeta blanca y pie de marca */
const shell = ({ lang, title, preheader, eyebrow, heading, body, footerNote }: ShellOptions) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px">${escapeHtml(preheader)}${'&nbsp;&zwnj;'.repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.page}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid ${COLOR.line}">

    <tr>
      <td align="center" bgcolor="${COLOR.ink}" style="background:${COLOR.ink};background-image:radial-gradient(circle at 85% 0%,rgba(128,48,192,.55),rgba(23,27,36,0) 55%),radial-gradient(circle at 5% 100%,rgba(32,192,224,.35),rgba(23,27,36,0) 50%);padding:40px 24px 34px">
        <img src="${EMAIL_LOGO_URL}" width="190" alt="Infinity by Frank" style="display:block;width:190px;max-width:70%;height:auto;border:0;margin:0 auto" />
      </td>
    </tr>
    <tr><td height="5" style="height:5px;line-height:5px;font-size:0;background:${COLOR.violet};background-image:${GRADIENT}">&nbsp;</td></tr>

    ${section(
      `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${COLOR.violet}">${escapeHtml(eyebrow)}</p>
       <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:700;color:${COLOR.ink};letter-spacing:-.01em">${escapeHtml(heading)}</h1>`,
      '40px 40px 24px',
    )}

    ${body}

    <tr>
      <td bgcolor="${COLOR.soft}" align="center" style="background:${COLOR.soft};border-top:1px solid ${COLOR.line};padding:26px 40px;font-family:${FONT}">
        <p style="margin:0 0 6px;font-size:13px;line-height:1.55;color:${COLOR.muted}">${footerNote}</p>
        <p style="margin:0;font-size:13px;line-height:1.55;color:${COLOR.muted}">
          <a href="${SITE_URL}" style="color:${COLOR.violet};font-weight:700;text-decoration:none">infinitydev.agency</a>
          &nbsp;·&nbsp;
          <a href="mailto:contacto@infinitydev.agency" style="color:${COLOR.muted};text-decoration:none">contacto@infinitydev.agency</a>
        </p>
      </td>
    </tr>
  </table>
</td></tr>
</table>
</body>
</html>`

const detailRow = (label: string, value: string, last = false) => `
  <tr>
    <td style="padding:13px 0;${last ? '' : `border-bottom:1px solid ${COLOR.line};`}font-size:13px;color:${COLOR.muted};width:34%;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:13px 0;${last ? '' : `border-bottom:1px solid ${COLOR.line};`}font-size:15px;font-weight:600;color:${COLOR.ink};vertical-align:top">${value}</td>
  </tr>`

const detailsCard = (rows: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.soft};border:1px solid ${COLOR.line};border-radius:16px">
    <tr><td style="padding:6px 22px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
  </table>`

const messageBlock = (label: string, message: string) => `
  <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${COLOR.muted}">${escapeHtml(label)}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="4" style="width:4px;background:${COLOR.violet};background-image:linear-gradient(180deg,${COLOR.violet},${COLOR.cyan});border-radius:4px">&nbsp;</td>
      <td style="padding:6px 0 6px 16px;font-size:15px;line-height:1.65;color:${COLOR.slate}">${nl2br(message)}</td>
    </tr>
  </table>`

type OwnerData = {
  name: string
  company: string
  email: string
  service: string
  message: string
  lang: Lang
  receivedAt: Date
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('es-MX', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Mexico_City' }).format(date)

/** Correo que recibe el equipo cuando alguien llena el formulario */
export const ownerEmail = (data: OwnerData) => {
  const mailto = `mailto:${data.email}`
  const languageLabel = data.lang === 'en' ? 'Inglés (/en)' : 'Español'

  const body = [
    section(
      `<p style="margin:0;font-size:15px;line-height:1.65;color:${COLOR.slate}"><strong style="color:${COLOR.ink}">${escapeHtml(data.name)}</strong> acaba de pedir una cotización desde el sitio. Responde a este correo para escribirle directamente.</p>`,
      '0 40px 24px',
    ),
    section(
      detailsCard(
        detailRow('Nombre', escapeHtml(data.name)) +
          detailRow('Empresa', data.company ? escapeHtml(data.company) : `<span style="color:${COLOR.muted};font-weight:400">No indicó</span>`) +
          detailRow('Correo', `<a href="${escapeHtml(mailto)}" style="color:${COLOR.violet};text-decoration:none">${escapeHtml(data.email)}</a>`) +
          detailRow('Servicio', escapeHtml(data.service)) +
          detailRow('Idioma del sitio', languageLabel, true),
      ),
      '0 40px 26px',
    ),
    section(messageBlock('Su mensaje', data.message), '0 40px 32px'),
    section(button(mailto, `Responder a ${data.name.split(' ')[0]}`), '0 40px 40px'),
  ].join('')

  const html = shell({
    lang: 'es',
    title: `Nueva cotización: ${data.name}`,
    preheader: `${data.name} · ${data.service} — ${data.message.slice(0, 90)}`,
    eyebrow: 'Nueva solicitud',
    heading: 'Tienes una solicitud de cotización',
    body,
    footerNote: `Recibida el ${escapeHtml(formatDate(data.receivedAt))} desde el formulario del sitio.`,
  })

  const text = [
    'NUEVA SOLICITUD DE COTIZACIÓN',
    '',
    `Nombre: ${data.name}`,
    `Empresa: ${data.company || 'No indicó'}`,
    `Correo: ${data.email}`,
    `Servicio: ${data.service}`,
    `Idioma del sitio: ${languageLabel}`,
    '',
    'Mensaje:',
    data.message,
    '',
    `Recibida el ${formatDate(data.receivedAt)}. Responde a este correo para escribirle directamente.`,
  ].join('\n')

  return { html, text }
}

const copy = {
  es: {
    subject: 'Recibimos tu solicitud — Infinity by Frank',
    preheader: 'Gracias por escribirnos. Te respondemos en menos de 24 horas hábiles.',
    eyebrow: 'Solicitud recibida',
    heading: (name: string) => `Gracias, ${name}`,
    intro:
      'Recibimos tu solicitud y ya la tiene el equipo. Te respondemos en menos de <strong style="color:#171b24">24 horas hábiles</strong> con una primera propuesta.',
    summary: 'Lo que nos contaste',
    service: 'Servicio',
    message: 'Tu mensaje',
    next: 'Qué sigue',
    steps: [
      ['Revisamos tu idea', 'Leemos tu mensaje con calma para entender tu negocio y lo que necesitas.'],
      ['Te escribimos', 'Te respondemos desde este mismo correo con dudas o una primera propuesta.'],
      ['Platicamos el proyecto', 'Si hay química, agendamos una llamada sin compromiso.'],
    ],
    cta: 'Conoce nuestros trabajos',
    ignore: 'Si no enviaste esta solicitud, puedes ignorar este mensaje.',
    works: `${SITE_URL}/trabajos`,
    reply: 'Puedes responder a este correo si quieres agregar algo.',
  },
  en: {
    subject: 'We received your request — Infinity by Frank',
    preheader: 'Thanks for writing to us. We reply within 24 business hours.',
    eyebrow: 'Request received',
    heading: (name: string) => `Thank you, ${name}`,
    intro:
      'We received your request and the team already has it. We will get back to you within <strong style="color:#171b24">24 business hours</strong> with a first proposal.',
    summary: 'What you told us',
    service: 'Service',
    message: 'Your message',
    next: 'What happens next',
    steps: [
      ['We review your idea', 'We read your message carefully to understand your business and what you need.'],
      ['We write back', 'We reply from this same email with questions or a first proposal.'],
      ['We talk it through', 'If it is a good fit, we schedule a no-strings call.'],
    ],
    cta: 'See our work',
    ignore: 'If you did not send this request, you can ignore this message.',
    works: `${SITE_URL}/en/trabajos`,
    reply: 'You can reply to this email if you want to add anything.',
  },
}

type ConfirmationData = { name: string; service: string; message: string; lang: Lang }

const stepRow = (index: number, title: string, text: string) => `
  <tr>
    <td width="44" valign="top" style="width:44px;padding:0 0 18px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td align="center" valign="middle" width="32" height="32" bgcolor="${COLOR.violet}" style="width:32px;height:32px;border-radius:16px;background:${COLOR.violet};background-image:${GRADIENT};font-family:${FONT};font-size:14px;font-weight:700;color:#ffffff">${index}</td>
      </tr></table>
    </td>
    <td valign="top" style="padding:0 0 18px;font-family:${FONT}">
      <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:${COLOR.ink}">${escapeHtml(title)}</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:${COLOR.muted}">${escapeHtml(text)}</p>
    </td>
  </tr>`

/** Confirmación que recibe quien llenó el formulario, en su idioma */
export const confirmationEmail = (data: ConfirmationData) => {
  const t = copy[data.lang]
  const firstName = data.name.split(' ')[0]
  const excerpt = data.message.length > 320 ? `${data.message.slice(0, 320).trimEnd()}…` : data.message

  const body = [
    section(`<p style="margin:0;font-size:16px;line-height:1.7;color:${COLOR.slate}">${t.intro}</p>`, '0 40px 28px'),
    section(
      `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${COLOR.muted}">${escapeHtml(t.summary)}</p>` +
        detailsCard(detailRow(t.service, escapeHtml(data.service)) + detailRow(t.message, `<span style="font-weight:400;color:${COLOR.slate};line-height:1.6">${nl2br(excerpt)}</span>`, true)),
      '0 40px 30px',
    ),
    section(
      `<p style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${COLOR.muted}">${escapeHtml(t.next)}</p>
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${t.steps.map(([title, text], i) => stepRow(i + 1, title, text)).join('')}</table>`,
      '0 40px 12px',
    ),
    section(button(t.works, t.cta), '8px 40px 40px'),
  ].join('')

  const html = shell({
    lang: data.lang,
    title: t.subject,
    preheader: t.preheader,
    eyebrow: t.eyebrow,
    heading: t.heading(firstName),
    body,
    footerNote: `${escapeHtml(t.reply)}<br />${escapeHtml(t.ignore)}`,
  })

  const text = [
    t.heading(firstName),
    '',
    t.intro.replace(/<[^>]+>/g, ''),
    '',
    `${t.service}: ${data.service}`,
    `${t.message}: ${excerpt}`,
    '',
    `${t.next}:`,
    ...t.steps.map(([title, line], i) => `${i + 1}. ${title} — ${line}`),
    '',
    `${t.cta}: ${t.works}`,
    '',
    `${t.reply} ${t.ignore}`,
    'Infinity by Frank · infinitydev.agency',
  ].join('\n')

  return { subject: t.subject, html, text }
}
