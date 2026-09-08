/**
 * Analytics e pixel: preparados, desligados.
 *
 * Nada carrega enquanto as variáveis estiverem vazias — sem script de
 * terceiro pesando na página e sem cookie de rastreio antes da hora.
 * Pra ligar, preencha .env (veja .env.example) e faça o deploy de novo.
 */

const GA_ID = import.meta.env.VITE_GA_ID
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

function injetarScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function ligarGoogleAnalytics() {
  if (!GA_ID) return
  injetarScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

function ligarMetaPixel() {
  if (!PIXEL_ID) return
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */
  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

/** Dispara um evento nos dois, se estiverem ligados. */
export function evento(nome, dados = {}) {
  if (window.gtag) window.gtag('event', nome, dados)
  if (window.fbq) window.fbq('trackCustom', nome, dados)
}

/**
 * Um listener só, no document: todo clique em [data-analytics] vira evento.
 * Assim nenhum componente precisa saber que analytics existe.
 */
function escutarCliques() {
  document.addEventListener(
    'click',
    (e) => {
      const alvo = e.target.closest('[data-analytics]')
      if (!alvo) return
      const nome = alvo.dataset.analytics
      evento('clique_cta', { cta: nome })
      if (nome.includes('whatsapp')) evento('Contact', { cta: nome })
    },
    { passive: true }
  )
}

export function iniciarAnalytics() {
  ligarGoogleAnalytics()
  ligarMetaPixel()
  escutarCliques()
}
