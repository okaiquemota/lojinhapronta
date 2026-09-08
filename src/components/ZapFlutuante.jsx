import { marca, zap } from '../data/site.js'
import { usePassouDe } from '../hooks/useAnimacao.js'
import { IconeWhatsApp } from './Icones.jsx'

/**
 * Barra fixa de WhatsApp no celular. Só aparece depois do hero pra não
 * competir com o CTA principal logo na abertura.
 */
export default function ZapFlutuante() {
  const visivel = usePassouDe(620)

  return (
    <div className={`zap-fixo ${visivel ? 'is-visivel' : ''}`} aria-hidden={!visivel}>
      <a
        className="zap-fixo__botao"
        href={zap(`Oi! Vi a landing da ${marca.nome} e quero saber mais sobre a loja virtual.`)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visivel ? 0 : -1}
        data-analytics="cta-fixo-whatsapp"
      >
        <IconeWhatsApp tamanho={20} />
        <span>
          Falar no WhatsApp
          <small>Resposta por mensagem, sem ligação</small>
        </span>
      </a>
    </div>
  )
}
