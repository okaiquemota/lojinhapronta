import { marca, portfolio, zap } from '../data/site.js'
import { useReveal } from '../hooks/useAnimacao.js'
import { IconeLinkExterno } from './Icones.jsx'

/**
 * Aceita N lojas. Com uma só, o card ocupa a linha inteira e vira destaque.
 * Sem screenshot cadastrado, mostra um preview tipográfico — o card continua
 * bonito e nada de imagem falsa vai pro ar.
 */
function Card({ loja, indice, destaque }) {
  const ref = useReveal()
  const temLink = Boolean(loja.url)
  const Envolucro = temLink ? 'a' : 'div'

  return (
    <li
      className={`vitrine reveal ${destaque ? 'vitrine--destaque' : ''}`}
      ref={ref}
      style={{ '--reveal-delay': `${indice * 90}ms` }}
    >
      <Envolucro
        className="vitrine__card"
        {...(temLink ? { href: loja.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <div className="vitrine__visual">
          {loja.imagem ? (
            <img
              src={loja.imagem}
              alt={`Tela inicial da ${loja.nome}`}
              loading="lazy"
              width="960"
              height="640"
            />
          ) : (
            <div className="vitrine__preview" aria-hidden="true">
              <div className="vitrine__preview-barra">
                <span />
                <span />
                <span />
              </div>
              <div className="vitrine__preview-corpo">
                <span className="vitrine__preview-marca">{loja.nome}</span>
                <span className="vitrine__preview-linha" />
                <span className="vitrine__preview-linha vitrine__preview-linha--curta" />
                <div className="vitrine__preview-grade">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="vitrine__corpo">
          <h3 className="vitrine__nome">
            {loja.nome}
            {temLink && <IconeLinkExterno tamanho={16} />}
          </h3>
          <p className="vitrine__descricao">{loja.descricao}</p>
          <ul className="vitrine__tags">
            {loja.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {temLink && <span className="vitrine__visitar">Visitar a loja</span>}
        </div>
      </Envolucro>
    </li>
  )
}

export default function Portfolio() {
  const cabecalho = useReveal()
  const chamada = useReveal()
  const uma = portfolio.length === 1

  return (
    <section className="secao secao--portfolio" id="portfolio">
      <div className="container">
        <div className="secao__cabecalho reveal" ref={cabecalho}>
          <p className="eyebrow">Feito e no ar</p>
          <h2 className="secao__titulo">Loja de verdade, vendendo de verdade</h2>
          <p className="secao__lead">
            Antes de vender pra você, eu montei pra mim.
          </p>
        </div>

        <ul className={`vitrine__grade ${uma ? 'vitrine__grade--uma' : ''}`}>
          {portfolio.map((loja, i) => (
            <Card loja={loja} indice={i} destaque={uma} key={loja.nome} />
          ))}
        </ul>

        <p className="vitrine__chamada reveal" ref={chamada}>
          Quer ver a sua no lugar dessa?{' '}
          <a
            href={zap(`Oi! Vi a landing da ${marca.nome} e quero uma loja igual.`)}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="cta-portfolio-whatsapp"
          >
            Me chama no WhatsApp.
          </a>
        </p>
      </div>
    </section>
  )
}
