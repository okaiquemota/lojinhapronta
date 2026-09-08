import { hero, marca, numeros, zap } from '../data/site.js'
import { useContador } from '../hooks/useAnimacao.js'
import { IconeSetaBaixo, IconeWhatsApp } from './Icones.jsx'
import MaqueteLoja from './MaqueteLoja.jsx'

function Numero({ dado, indice }) {
  // começa junto com a entrada do hero, casando com o atraso da animação de cada item
  const [valor, ref] = useContador(dado.valor, 1500, {
    imediato: true,
    atraso: 900 + indice * 100,
  })

  return (
    <li className="hero__numero" ref={ref} style={{ '--i': indice }}>
      <strong>
        {dado.prefixo || ''}
        {valor}
        {dado.sufixo || ''}
      </strong>
      <span>{dado.rotulo}</span>
    </li>
  )
}

export default function Hero() {
  const mensagem = `Oi! Vi a landing da ${marca.nome} e quero saber mais sobre a loja virtual.`

  return (
    <section className="hero" id="topo">
      {/* fundo: manchas de cor em movimento lento + granulado por cima */}
      <div className="hero__aurora" aria-hidden="true">
        <span className="hero__mancha hero__mancha--coral" />
        <span className="hero__mancha hero__mancha--azul" />
        <span className="hero__mancha hero__mancha--petroleo" />
      </div>
      <div className="hero__grao" aria-hidden="true" />

      <div className="container hero__interno">
        <div className="hero__texto">
          <h1 className="hero__titulo">
            {hero.titulo.map((linha, i) => (
              <span className="hero__linha" key={linha}>
                <span style={{ '--i': i }}>{linha}</span>
              </span>
            ))}
          </h1>

          <p className="hero__sub">{hero.subtitulo}</p>

          <div className="hero__botoes">
            <a
              className="btn btn--primario btn--grande"
              href={zap(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta-hero-whatsapp"
            >
              <IconeWhatsApp tamanho={20} />
              {hero.ctaPrimario}
            </a>
            <a className="btn btn--fantasma btn--grande" href="#pacote">
              {hero.ctaSecundario}
              <IconeSetaBaixo tamanho={18} />
            </a>
          </div>

          <ul className="hero__numeros">
            {numeros.map((dado, i) => (
              <Numero dado={dado} indice={i} key={dado.rotulo} />
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <MaqueteLoja />
        </div>
      </div>
    </section>
  )
}
