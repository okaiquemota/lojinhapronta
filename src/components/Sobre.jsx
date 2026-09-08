import { sobre } from '../data/site.js'
import { useReveal } from '../hooks/useAnimacao.js'

export default function Sobre() {
  const ref = useReveal()

  return (
    <section className="secao secao--sobre" id="sobre">
      <div className="container sobre__interno">
        <div className="sobre__texto reveal" ref={ref}>
          <p className="eyebrow">Sobre</p>
          <h2 className="secao__titulo">{sobre.titulo}</h2>
          {sobre.paragrafos.map((p) => (
            <p className="sobre__paragrafo" key={p.slice(0, 32)}>
              {p}
            </p>
          ))}
          <p className="sobre__assinatura">— Kaique</p>
        </div>
      </div>
    </section>
  )
}
