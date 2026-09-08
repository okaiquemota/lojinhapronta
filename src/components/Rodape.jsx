import { marca, nav } from '../data/site.js'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape__interno">
        <div className="rodape__marca">
          <strong>{marca.nome}</strong>
          <span>{marca.tagline}</span>
        </div>

        <nav className="rodape__links" aria-label="Rodapé">
          {nav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>

        <p className="rodape__legal">
          © {new Date().getFullYear()} {marca.nome} · WhatsApp {marca.whatsappVisivel}
        </p>
      </div>
    </footer>
  )
}
