import { IconeCheck, IconeEntrega } from './Icones.jsx'

/**
 * Maquete da loja: ilustração do produto, não print de cliente.
 * Tudo aqui é CSS — sem imagem pra baixar, sem screenshot falso no ar.
 */

const produtos = [
  { nome: 'Alfabeto ilustrado', preco: 'R$ 19,90', tom: 'a' },
  { nome: 'Atividades de Natal', preco: 'R$ 24,90', tom: 'b' },
  { nome: 'Jogos bíblicos', preco: 'R$ 14,90', tom: 'c' },
  { nome: 'Cartelas de sílabas', preco: 'R$ 12,90', tom: 'd' },
]

export default function MaqueteLoja() {
  return (
    <div className="maquete" aria-hidden="true">
      <div className="maquete__janela">
        <div className="maquete__barra">
          <span className="maquete__ponto" />
          <span className="maquete__ponto" />
          <span className="maquete__ponto" />
          <div className="maquete__url">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <rect x="5" y="10.5" width="14" height="10" rx="2" />
              <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" />
            </svg>
            seunome.com.br
          </div>
        </div>

        <div className="maquete__tela">
          <div className="maquete__topo">
            <div className="maquete__logo" />
            <div className="maquete__menu">
              <span />
              <span />
              <span />
            </div>
            <div className="maquete__carrinho">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9.5" cy="20" r="1.3" />
                <circle cx="17.5" cy="20" r="1.3" />
                <path d="M2.5 3.5h2.6l2.3 11.2h11l2.1-8H6.4" />
              </svg>
              <i>2</i>
            </div>
          </div>

          <div className="maquete__faixa">
            <div className="maquete__faixa-texto">
              <span className="maquete__linha maquete__linha--titulo" />
              <span className="maquete__linha maquete__linha--curta" />
            </div>
            <div className="maquete__faixa-botao" />
          </div>

          <div className="maquete__grade">
            {produtos.map((p, i) => (
              <div className={`maquete__produto maquete__produto--${p.tom}`} key={p.nome} style={{ '--i': i }}>
                <div className="maquete__thumb">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="maquete__nome">{p.nome}</div>
                <div className="maquete__rodape">
                  <span className="maquete__preco">{p.preco}</span>
                  <span className="maquete__comprar">Comprar</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* provas de que a loja trabalha sozinha */}
      <div className="maquete__aviso maquete__aviso--pago">
        <span className="maquete__aviso-icone maquete__aviso-icone--verde">
          <IconeCheck tamanho={13} />
        </span>
        <div>
          <strong>Pagamento aprovado</strong>
          <small>Pix · R$ 24,90</small>
        </div>
      </div>

      <div className="maquete__aviso maquete__aviso--entregue">
        <span className="maquete__aviso-icone maquete__aviso-icone--coral">
          <IconeEntrega tamanho={13} />
        </span>
        <div>
          <strong>Arquivo entregue</strong>
          <small>automático, 2 segundos depois</small>
        </div>
      </div>
    </div>
  )
}
