import { hospedagem, hospedagemAtiva } from '../data/parceiros.js'
import { useReveal } from '../hooks/useAnimacao.js'
import { IconeCheck, IconeSeta } from './Icones.jsx'

export default function Hospedagem() {
  const cabecalho = useReveal()
  const card = useReveal()

  // Sem link de afiliado configurado, a seção inteira não vai pro ar.
  if (!hospedagemAtiva) return null

  return (
    <section className="secao secao--hospedagem" id="hospedagem">
      <div className="container hospedagem__interno">
        <div className="hospedagem__texto reveal" ref={cabecalho}>
          <p className="eyebrow">Hospedagem parceira</p>
          <h2 className="secao__titulo">{hospedagem.chamada}</h2>
          <p className="secao__lead">{hospedagem.texto}</p>
          <p className="hospedagem__aviso">{hospedagem.aviso}</p>
        </div>

        <div className="hospedagem__card reveal" ref={card}>
          <div className="hospedagem__empresa">{hospedagem.empresa}</div>
          <div className="hospedagem__plano">{hospedagem.plano}</div>

          {hospedagem.precoMes != null && (
            <div className="hospedagem__preco">
              {hospedagem.precoDe && <s>R$ {hospedagem.precoDe}</s>}
              <strong>
                <small>R$</small>
                {hospedagem.precoMes}
                <small>/mês</small>
              </strong>
              <span>{hospedagem.periodo}</span>
            </div>
          )}

          <ul className="hospedagem__vantagens">
            {hospedagem.vantagens.map((v) => (
              <li key={v}>
                <span aria-hidden="true">
                  <IconeCheck tamanho={13} />
                </span>
                {v}
              </li>
            ))}
          </ul>

          <a
            className="btn btn--primario btn--bloco"
            href={hospedagem.linkAfiliado}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-analytics="cta-hospedagem-afiliado"
          >
            Contratar hospedagem
            <IconeSeta tamanho={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
