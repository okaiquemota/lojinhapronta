import { marca, preRequisitos, zap } from '../data/site.js'
import { hospedagemAtiva } from '../data/parceiros.js'
import { useReveal } from '../hooks/useAnimacao.js'
import { IconeLinkExterno } from './Icones.jsx'

/**
 * Resolve o destino de cada pré-requisito.
 * A hospedagem só aponta pra seção parceira quando existe link de afiliado —
 * senão, cai no WhatsApp em vez de virar botão morto.
 */
function destino(item) {
  if (item.ancora) {
    return hospedagemAtiva
      ? { href: item.ancora, externo: false, texto: item.linkTexto }
      : {
          href: zap(`Oi! Vi a landing da ${marca.nome} e queria saber qual hospedagem contratar.`),
          externo: true,
          texto: 'Me pergunte qual contratar',
        }
  }
  return { href: item.link, externo: true, texto: item.linkTexto }
}

function Passo({ item, indice }) {
  const ref = useReveal()
  const { href, externo, texto } = destino(item)

  return (
    <li className="prereq reveal" ref={ref} style={{ '--reveal-delay': `${indice * 80}ms` }}>
      <div className="prereq__num" aria-hidden="true">
        {indice + 1}
      </div>
      <div className="prereq__corpo">
        <div className="prereq__topo">
          <h3 className="prereq__titulo">{item.titulo}</h3>
          <span className="prereq__custo">{item.custo}</span>
        </div>
        <p className="prereq__texto">{item.texto}</p>
        <a
          className="prereq__link"
          href={href}
          {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {texto}
          <IconeLinkExterno tamanho={14} />
        </a>
      </div>
    </li>
  )
}

export default function PreRequisitos() {
  const cabecalho = useReveal()
  const nota = useReveal()

  return (
    <section className="secao secao--clara secao--prereq" id="antes">
      <div className="container">
        <div className="secao__cabecalho reveal" ref={cabecalho}>
          <p className="eyebrow">Antes de começar</p>
          <h2 className="secao__titulo">Quatro coisas que precisam estar no seu nome</h2>
          <p className="secao__lead">
            Nenhuma delas fica comigo. Domínio, hospedagem e conta de pagamento são seus, do
            primeiro dia — se um dia você quiser levar a loja pra outro lugar, leva.
          </p>
        </div>

        <ul className="prereq__lista">
          {preRequisitos.map((item, i) => (
            <Passo item={item} indice={i} key={item.titulo} />
          ))}
        </ul>

        <p className="prereq__nota reveal" ref={nota}>
          Não sabe fazer nenhuma dessas? Sem problema — me chama que eu te guio por mensagem, passo
          a passo. Não precisa de ligação.
        </p>
      </div>
    </section>
  )
}
