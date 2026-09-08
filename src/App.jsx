import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Beneficios from './components/Beneficios.jsx'
import Pacote from './components/Pacote.jsx'
import PreRequisitos from './components/PreRequisitos.jsx'
import Hospedagem from './components/Hospedagem.jsx'
import Portfolio from './components/Portfolio.jsx'
import Preco from './components/Preco.jsx'
import Faq from './components/Faq.jsx'
import Sobre from './components/Sobre.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import Rodape from './components/Rodape.jsx'
import ZapFlutuante from './components/ZapFlutuante.jsx'

export default function App() {
  return (
    <>
      <a className="pular-para-conteudo" href="#beneficios">
        Pular para o conteúdo
      </a>

      <Navbar />

      <main>
        <Hero />
        <Beneficios />
        <Pacote />
        <PreRequisitos />
        <Hospedagem />
        <Portfolio />
        <Preco />
        <Faq />
        <Sobre />
        <CtaFinal />
      </main>

      <Rodape />
      <ZapFlutuante />
    </>
  )
}
