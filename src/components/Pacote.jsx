import { marca, pacote, preco, zap } from '../data/site.js'
import { useReveal } from '../hooks/useAnimacao.js'
import { IconeCheck, IconeWhatsApp } from './Icones.jsx'

const totalItens = pacote.reduce((soma, g) => soma + g.itens.length, 0)

function Grupo({ grupo, indice }) {
  const ref = useReveal()

  return (
    <div className="pacote__grupo reveal" ref={ref} style={{ '--reveal-delay': `${indice * 80}ms` }}>
      <h3 className="pacote__grupo-titulo">
        <span className="pacote__grupo-num">{String(indice + 1).padStart(2, '0')}</span>
        {grupo.grupo}
      </h3>
      <ul className="pacote__itens">
        {grupo.itens.map((item, i) => (
          <li key={item} style={{ '--i': i }}>
            <span className="pacote__check" aria-hidden="true">
              <IconeCheck tamanho={13} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Pacote() {
  const cabecalho = useReveal()
  const fecho = useReveal()

  return (
    <section className="secao secao--escura secao--pacote" id="pacote">
      <div className="container">
        <div className="secao__cabecalho reveal" ref={cabecalho}>
          <p className="eyebrow">O pacote inteiro</p>
          <h2 className="secao__titulo">
            {totalItens} itens entregues por R$ {preco.valor}
          </h2>
          <p className="secao__lead">
            Escopo fechado e escrito. O que está nesta lista está incluso; o que não está, eu falo
            antes de fazer. Sem surpresa no fim.
          </p>
        </div>

        <div className="pacote__grade">
          {pacote.map((g, i) => (
            <Grupo grupo={g} indice={i} key={g.grupo} />
          ))}
        </div>

        <div className="pacote__fecho reveal" ref={fecho}>
          <p>
            Tudo isso por <strong>R$ {preco.valor}</strong>, {preco.formaPagamento}.
          </p>
          <a
            className="btn btn--primario"
            href={zap(`Oi! Quero a loja da ${marca.nome}. Pode me explicar como começa?`)}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="cta-pacote-whatsapp"
          >
            <IconeWhatsApp tamanho={18} />
            Quero começar
          </a>
        </div>
      </div>
    </section>
  )
}
