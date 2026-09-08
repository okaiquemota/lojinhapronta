import { useEffect, useState } from 'react'
import { marca, nav, zap } from '../data/site.js'
import { usePassouDe, useSecaoAtiva } from '../hooks/useAnimacao.js'
import { IconeWhatsApp } from './Icones.jsx'

const IDS = nav.map((item) => item.href.slice(1))

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const rolou = usePassouDe(24)
  const ativa = useSecaoAtiva(IDS)

  // menu aberto no celular não deixa a página rolar por baixo
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [])

  return (
    <header className={`navbar ${rolou ? 'navbar--rolou' : ''} ${aberto ? 'navbar--aberto' : ''}`}>
      <div className="container navbar__interno">
        <a href="#topo" className="navbar__marca" onClick={() => setAberto(false)}>
          <span className="navbar__selo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5 5 4.2h14l1.5 4.3" />
              <path d="M5 8.5v10.3h14V8.5" />
              <path d="m9.5 13 1.8 1.8 3.4-3.4" />
            </svg>
          </span>
          <span className="navbar__nome">{marca.nome}</span>
        </a>

        <nav className="navbar__links" aria-label="Seções da página">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar__link ${ativa === item.href.slice(1) ? 'is-ativo' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--primario navbar__cta"
          href={zap(`Oi! Vi a landing da ${marca.nome} e quero saber mais sobre a loja virtual.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconeWhatsApp tamanho={18} />
          Falar no WhatsApp
        </a>

        <button
          className="navbar__hamburguer"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="navbar__mobile" id="menu-mobile" hidden={!aberto}>
        <nav aria-label="Seções da página (celular)">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              style={{ '--i': i }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="btn btn--primario btn--bloco"
          href={zap(`Oi! Vi a landing da ${marca.nome} e quero saber mais sobre a loja virtual.`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setAberto(false)}
        >
          <IconeWhatsApp tamanho={18} />
          Falar no WhatsApp
        </a>
      </div>
    </header>
  )
}
