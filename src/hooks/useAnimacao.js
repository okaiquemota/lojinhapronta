import { useCallback, useEffect, useRef, useState } from 'react'

/** O usuário pediu menos movimento no sistema? */
export function prefereMenosMovimento() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Um único IntersectionObserver pra página inteira.
 * Vários observers em celular fraco é justamente o que trava o scroll.
 */
let observadorCompartilhado = null
const inscritos = new WeakMap()

function pegarObservador() {
  if (observadorCompartilhado) return observadorCompartilhado

  observadorCompartilhado = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        const aoAparecer = inscritos.get(entrada.target)
        if (aoAparecer) aoAparecer()
        // reveal é de mão única: soltou o observer, acabou o custo
        observadorCompartilhado.unobserve(entrada.target)
        inscritos.delete(entrada.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
  )

  return observadorCompartilhado
}

/**
 * Devolve uma ref. Quando o elemento entra na tela, ganha `is-visivel`.
 * Sem estado no React: a classe entra direto no DOM, então não re-renderiza.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefereMenosMovimento() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visivel')
      return
    }

    const observador = pegarObservador()
    inscritos.set(el, () => el.classList.add('is-visivel'))
    observador.observe(el)

    return () => {
      observador.unobserve(el)
      inscritos.delete(el)
    }
  }, [])

  return ref
}

/**
 * Conta de 0 até `alvo` com requestAnimationFrame — nada de setInterval.
 *
 * `imediato` dispara na carga em vez de esperar o scroll: é o caso dos
 * números do hero, que ficam na dobra e ficariam mostrando "0" pro visitante.
 */
export function useContador(alvo, duracao = 1600, { imediato = false, atraso = 0 } = {}) {
  const [valor, setValor] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (prefereMenosMovimento()) {
      setValor(alvo)
      return
    }

    let frame = null
    let temporizador = null

    const contar = () => {
      const inicio = performance.now()
      const passo = (agora) => {
        const t = Math.min((agora - inicio) / duracao, 1)
        // easeOutExpo: rápido no começo, freia no fim
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        setValor(Math.round(alvo * eased))
        if (t < 1) frame = requestAnimationFrame(passo)
      }
      frame = requestAnimationFrame(passo)
    }

    if (imediato || !('IntersectionObserver' in window)) {
      temporizador = setTimeout(contar, atraso)
      return () => {
        clearTimeout(temporizador)
        if (frame) cancelAnimationFrame(frame)
      }
    }

    const el = ref.current
    if (!el) return

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return
        observador.disconnect()
        contar()
      },
      { threshold: 0.5 }
    )
    observador.observe(el)

    return () => {
      observador.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [alvo, duracao, imediato, atraso])

  return [valor, ref]
}

/** true depois que a página rolou mais que `limite` pixels. */
export function usePassouDe(limite) {
  const [passou, setPassou] = useState(false)

  useEffect(() => {
    let travado = false

    const aoRolar = () => {
      if (travado) return
      travado = true
      requestAnimationFrame(() => {
        setPassou(window.scrollY > limite)
        travado = false
      })
    }

    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [limite])

  return passou
}

/** Sabe qual âncora está na tela, pra marcar o item ativo da navbar. */
export function useSecaoAtiva(ids) {
  const [ativa, setAtiva] = useState(null)

  useEffect(() => {
    const alvos = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!alvos.length || !('IntersectionObserver' in window)) return

    const observador = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visiveis[0]) setAtiva(visiveis[0].target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    )

    alvos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [ids])

  return ativa
}

/** Brilho que segue o mouse dentro do card. Desliga sozinho no touch. */
export function useBrilhoDoMouse() {
  const ref = useRef(null)

  const aoMover = useCallback((evento) => {
    const el = ref.current
    if (!el) return
    const caixa = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${evento.clientX - caixa.left}px`)
    el.style.setProperty('--my', `${evento.clientY - caixa.top}px`)
  }, [])

  return { ref, aoMover }
}
