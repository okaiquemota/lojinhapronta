import { useState } from 'react'
import { faq } from '../data/site.js'
import { useReveal } from '../hooks/useAnimacao.js'

function Item({ item, aberto, aoClicar, indice }) {
  const ref = useReveal()
  const idPainel = `faq-painel-${indice}`
  const idBotao = `faq-botao-${indice}`

  return (
    <li
      className={`faq__item reveal ${aberto ? 'is-aberto' : ''}`}
      ref={ref}
      style={{ '--reveal-delay': `${indice * 55}ms` }}
    >
      <h3>
        <button
          className="faq__pergunta"
          id={idBotao}
          aria-expanded={aberto}
          aria-controls={idPainel}
          onClick={aoClicar}
        >
          <span>{item.pergunta}</span>
          <span className="faq__sinal" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </h3>

      {/* grid 0fr → 1fr anima a altura sem pulo de layout e sem medir nada em JS */}
      <div className="faq__painel" id={idPainel} role="region" aria-labelledby={idBotao}>
        <div className="faq__painel-interno">
          <p>{item.resposta}</p>
        </div>
      </div>
    </li>
  )
}

export default function Faq() {
  const [abertoEm, setAbertoEm] = useState(0)
  const cabecalho = useReveal()

  return (
    <section className="secao secao--clara secao--faq" id="faq">
      <div className="container faq__interno">
        <div className="faq__coluna-titulo reveal" ref={cabecalho}>
          <p className="eyebrow">Dúvidas</p>
          <h2 className="secao__titulo">O que todo mundo pergunta antes de fechar</h2>
          <p className="secao__lead">
            Se a sua dúvida não estiver aqui, me manda no WhatsApp. Respondo por mensagem mesmo — é
            mais rápido pros dois.
          </p>
        </div>

        <ul className="faq__lista">
          {faq.map((item, i) => (
            <Item
              key={item.pergunta}
              item={item}
              indice={i}
              aberto={abertoEm === i}
              aoClicar={() => setAbertoEm(abertoEm === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
