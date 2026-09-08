import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { faq, marca, preco } from './src/data/site.js'
import { seo } from './src/data/seo.js'

/**
 * Onde a página vai ser publicada. Define de uma vez:
 *   - o `base` do Vite (caminho dos assets)
 *   - canonical, og:url e og:image (precisam ser absolutas pro preview do zap)
 *   - robots.txt e sitemap.xml
 *   - o CNAME, quando for domínio próprio
 *
 * Na Vercel não precisa configurar nada: o próprio build expõe
 * VERCEL_PROJECT_PRODUCTION_URL, e é dele que saem canonical e og:image
 * enquanto o domínio próprio não existir.
 *
 * Domínio próprio:  SITE_URL=https://lojinhapronta.com.br
 * Subcaminho:       SITE_URL=https://usuario.github.io/lojinhapronta
 */
const urlDaVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
const SITE_URL = (
  process.env.SITE_URL ||
  (urlDaVercel && `https://${urlDaVercel}`) ||
  marca.dominio
).replace(/\/+$/, '')
const { origin, pathname } = new URL(`${SITE_URL}/`)
const BASE = pathname // '/' no domínio próprio, '/lojinhapronta/' no Pages de projeto
const ehDominioProprio = !origin.endsWith('.github.io')

/**
 * O endereço definitivo é o declarado em marca.dominio. Qualquer outro
 * (.vercel.app, preview, github.io) é provisório e não deve ser indexado:
 * senão o Google fica com o endereço temporário fichado e, quando o domínio
 * de verdade entrar, sobra trabalho de migração.
 */
const ehEnderecoDefinitivo = new URL(SITE_URL).hostname === new URL(marca.dominio).hostname

const absoluta = (caminho) => `${SITE_URL}/${caminho.replace(/^\//, '')}`

function meta(attrs, conteudo) {
  return { tag: 'meta', attrs: { ...attrs, content: conteudo }, injectTo: 'head' }
}

/**
 * Injeta no HTML tudo que depende de onde o site está hospedado, e emite os
 * arquivos de raiz. Ficam num lugar só: sem URL escrita à mão em quatro
 * arquivos pra dessincronizar quando o domínio mudar.
 */
function seoEArquivosDeRaiz() {
  return {
    name: 'seo-e-arquivos-de-raiz',

    transformIndexHtml() {
      const dadosEstruturados = [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: marca.nome,
          slogan: marca.tagline,
          url: `${SITE_URL}/`,
          telephone: `+${marca.whatsappNumero}`,
          areaServed: 'BR',
          availableLanguage: 'pt-BR',
          description:
            'Criação de loja virtual pronta para venda de material digital, com escopo fechado e preço único.',
          makesOffer: {
            '@type': 'Offer',
            name: 'Criação de loja virtual para material digital',
            price: String(preco.valor),
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.pergunta,
            acceptedAnswer: { '@type': 'Answer', text: item.resposta },
          })),
        },
      ]

      return [
        { tag: 'title', children: seo.titulo, injectTo: 'head' },
        meta({ name: 'description' }, seo.descricao),
        meta(
          { name: 'robots' },
          ehEnderecoDefinitivo ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'
        ),
        { tag: 'link', attrs: { rel: 'canonical', href: `${SITE_URL}/` }, injectTo: 'head' },

        meta({ property: 'og:type' }, 'website'),
        meta({ property: 'og:site_name' }, marca.nome),
        meta({ property: 'og:locale' }, 'pt_BR'),
        meta({ property: 'og:url' }, `${SITE_URL}/`),
        meta({ property: 'og:title' }, seo.ogTitulo),
        meta({ property: 'og:description' }, seo.ogDescricao),
        meta({ property: 'og:image' }, absoluta('og.png')),
        meta({ property: 'og:image:width' }, '1200'),
        meta({ property: 'og:image:height' }, '630'),
        meta({ property: 'og:image:alt' }, seo.ogImagemAlt),

        meta({ name: 'twitter:card' }, 'summary_large_image'),
        meta({ name: 'twitter:title' }, seo.ogTitulo),
        meta({ name: 'twitter:description' }, seo.twitterDescricao),
        meta({ name: 'twitter:image' }, absoluta('og.png')),

        ...dadosEstruturados.map((bloco) => ({
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(bloco),
          injectTo: 'head',
        })),
      ]
    },

    generateBundle() {
      const emitir = (fileName, source) => this.emitFile({ type: 'asset', fileName, source })

      emitir(
        'robots.txt',
        ehEnderecoDefinitivo
          ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluta('sitemap.xml')}\n`
          : `# Endereço provisório — só o domínio definitivo é indexado.\nUser-agent: *\nDisallow: /\n`
      )

      emitir(
        'sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      )

      // Só o GitHub Pages usa esses dois. A Vercel os ignora, então não vão
      // pro dist quando o build roda lá.
      if (!urlDaVercel) {
        if (ehDominioProprio) emitir('CNAME', `${new URL(SITE_URL).hostname}\n`)
        emitir('.nojekyll', '')
      }
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [react(), seoEArquivosDeRaiz()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
})
