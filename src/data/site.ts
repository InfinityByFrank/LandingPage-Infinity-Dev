/** Datos del sitio que comparten el formulario y el endpoint de contacto */

/** Correo que recibe las solicitudes */
export const CONTACT_TO = 'contacto@infinitydev.agency'

/** Remitente: debe pertenecer al dominio verificado en Resend (send.infinitydev.agency) */
export const CONTACT_FROM = 'Infinity by Frank <contacto@send.infinitydev.agency>'

/** Enviar un correo de confirmación al visitante (en su idioma) */
export const SEND_CONFIRMATION = true

/**
 * Llave PÚBLICA de Turnstile (la secreta nunca va en el código: es el secreto TURNSTILE_SECRET_KEY del Worker).
 * En desarrollo se usa la llave de prueba de Cloudflare, que siempre pasa la verificación.
 */
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA'
const TURNSTILE_PROD_SITE_KEY = '0x4AAAAAAFWBpR63We2eBw6w'

export const TURNSTILE_SITE_KEY = import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : TURNSTILE_PROD_SITE_KEY

/** Servicios que ofrece el select del formulario (valor que viaja al servidor) */
export const SERVICES = {
  web: { es: 'Aplicación web', en: 'Web application' },
  mobile: { es: 'App móvil', en: 'Mobile app' },
  backend: { es: 'Servidores / backend', en: 'Servers / backend' },
  dashboard: { es: 'Dashboard empresarial', en: 'Business dashboard' },
  other: { es: 'Varios / no estoy seguro', en: 'Several / not sure' },
} as const

export type ServiceKey = keyof typeof SERVICES
