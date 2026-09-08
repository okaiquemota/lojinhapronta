import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { faq, marca, preco } from './src/data/site.js'

/**
 * Injeta os dados estruturados no HTML na hora do build, lendo do mesmo
 * arquivo que a página usa. Assim o schema nunca fica dessincronizado do
 * texto que está na tela — e o Google enxerga o FAQ sem precisar rodar JS.
 */
function dadosEstruturados() {
  return {
    name: 'dados-estruturados',
    transformIndexHtml(html) {
      const schema = [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: marca.nome,
          slogan: marca.tagline,
          url: marca.dominio,
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

      return {
        html,
        tags: schema.map((bloco) => ({
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(bloco),
          injectTo: 'head',
        })),
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), dadosEstruturados()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
})
