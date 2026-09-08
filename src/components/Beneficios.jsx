import { beneficios } from '../data/site.js'
import { useBrilhoDoMouse, useReveal } from '../hooks/useAnimacao.js'
import { iconesBeneficio } from './Icones.jsx'

function Card({ beneficio, indice }) {
  const reveal = useReveal()
  const { ref: brilho, aoMover } = useBrilhoDoMouse()
  const Icone = iconesBeneficio[beneficio.icone]

  return (
    <li
      className="beneficio reveal"
      ref={(el) => {
        reveal.current = el
        brilho.current = el
      }}
      onMouseMove={aoMover}
      style={{ '--reveal-delay': `${indice * 70}ms` }}
    >
      <span className="beneficio__brilho" aria-hidden="true" />
      <span className="beneficio__icone">
        <Icone tamanho={22} />
      </span>
      <h3 className="beneficio__titulo">{beneficio.titulo}</h3>
      <p className="beneficio__texto">{beneficio.texto}</p>
    </li>
  )
}

export default function Beneficios() {
  const cabecalho = useReveal()

  return (
    <section className="secao secao--beneficios" id="beneficios">
      <div className="container">
        <div className="secao__cabecalho reveal" ref={cabecalho}>
          <p className="eyebrow">O que você leva</p>
          <h2 className="secao__titulo">Uma loja que vende sem você estar do outro lado</h2>
          <p className="secao__lead">
            Não é site de apresentação com botão de WhatsApp. É loja de verdade: o cliente entra,
            escolhe, paga e recebe — do começo ao fim, sozinho.
          </p>
        </div>

        <ul className="beneficios__grade">
          {beneficios.map((b, i) => (
            <Card beneficio={b} indice={i} key={b.titulo} />
          ))}
        </ul>
      </div>
    </section>
  )
}
