import { ctaFinal, marca, zap } from '../data/site.js'
import { useReveal } from '../hooks/useAnimacao.js'
import { IconeWhatsApp } from './Icones.jsx'

export default function CtaFinal() {
  const ref = useReveal()

  return (
    <section className="secao secao--cta" id="contato">
      <div className="cta__aurora" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="container cta__interno reveal" ref={ref}>
        <h2 className="cta__titulo">{ctaFinal.titulo}</h2>
        <p className="cta__texto">{ctaFinal.texto}</p>

        <a
          className="btn btn--primario btn--grande cta__botao"
          href={zap(`Oi! Vi a landing da ${marca.nome} e quero saber mais sobre a loja virtual.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="cta-final-whatsapp"
        >
          <IconeWhatsApp tamanho={20} />
          {ctaFinal.botao}
        </a>

        <p className="cta__numero">{marca.whatsappVisivel}</p>
      </div>
    </section>
  )
}
