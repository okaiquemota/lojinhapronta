import { marca, preco, zap } from '../data/site.js'
import { useBrilhoDoMouse, useContador, useReveal } from '../hooks/useAnimacao.js'
import { IconeCheck, IconeWhatsApp } from './Icones.jsx'

const inclusos = [
  'Loja completa instalada no seu domínio',
  'Até 10 produtos cadastrados por mim',
  'Pix, cartão e boleto pelo Mercado Pago',
  'Entrega automática do arquivo digital',
  'SSL, LGPD e e-mail profissional',
  'Vídeos e manual pra você mexer sozinha',
  '1 rodada de ajustes + 15 dias de suporte',
]

export default function Preco() {
  const cabecalho = useReveal()
  const card = useReveal()
  const { ref: brilho, aoMover } = useBrilhoDoMouse()
  const [valor, refValor] = useContador(preco.valor, 1400)

  return (
    <section className="secao secao--preco" id="preco">
      <div className="container">
        <div className="secao__cabecalho secao__cabecalho--centro reveal" ref={cabecalho}>
          <p className="eyebrow">Preço</p>
          <h2 className="secao__titulo">Um preço. Sem proposta, sem reunião, sem pegadinha.</h2>
        </div>

        {/* a aura precisa ser irmã do card: como filha, o blur pinta por cima do fundo */}
        <div className="preco__moldura reveal" ref={card}>
          <span className="preco__aura" aria-hidden="true" />

          <div className="preco__card" ref={brilho} onMouseMove={aoMover}>
            <span className="preco__brilho" aria-hidden="true" />

            <div className="preco__selo">Pacote completo</div>

            <div className="preco__valor" ref={refValor}>
              <span className="preco__moeda">R$</span>
              <span className="preco__numero">{valor}</span>
            </div>

            <p className="preco__forma">
              {preco.formaPagamento} · {preco.parcelamento}
            </p>

            <ul className="preco__lista">
              {inclusos.map((item, i) => (
                <li key={item} style={{ '--i': i }}>
                  <span aria-hidden="true">
                    <IconeCheck tamanho={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              className="btn btn--primario btn--bloco btn--grande"
              href={zap(
                `Oi! Quero contratar a loja da ${marca.nome} por R$ ${preco.valor}. Como funciona?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta-preco-whatsapp"
            >
              <IconeWhatsApp tamanho={20} />
              Quero minha loja
            </a>

            <p className="preco__obs">{preco.observacao}</p>

            <div className="preco__garantia">
              <span className="preco__garantia-selo" aria-hidden="true">
                {preco.garantiaDias}
              </span>
              <p>
                <strong>Garantia de {preco.garantiaDias} dias.</strong> Se você não gostar da loja
                entregue, devolvo o valor inteiro. Sem discussão e sem formulário de cancelamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
