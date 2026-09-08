/**
 * Gera a imagem de compartilhamento (og.png) e o ícone de app.
 *
 * A landing vai circular como link no WhatsApp e no Instagram — o preview é
 * a primeira coisa que a pessoa vê. Renderiza HTML no Chromium e salva PNG.
 *
 *   npm run og
 */
import { chromium } from 'playwright-core'
import { mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const saida = resolve(raiz, 'public')

const { preco } = await import(resolve(raiz, 'src/data/site.js'))

const fonte = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
`

const og = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${fonte}<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; flex-direction: column;
    justify-content: space-between; padding: 58px 74px;
    background: #0a2531; color: #f7f5f2; position: relative; overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .mancha { position: absolute; border-radius: 50%; filter: blur(90px); }
  .m1 { width: 620px; height: 620px; top: -190px; right: -140px;
        background: radial-gradient(circle, rgba(255,107,91,.6), transparent 68%); }
  .m2 { width: 540px; height: 540px; bottom: -240px; left: -160px;
        background: radial-gradient(circle, rgba(89,131,146,.62), transparent 68%); }
  .conteudo { position: relative; z-index: 1; }
  .marca { display: flex; align-items: center; gap: 16px; font-family: 'Fraunces', serif;
           font-size: 30px; font-weight: 700; letter-spacing: -.025em; }
  .selo { width: 48px; height: 48px; border-radius: 13px; background: #ff6b5b;
          display: grid; place-items: center; }
  h1 { font-family: 'Fraunces', serif; font-size: 67px; font-weight: 600;
       line-height: 1.02; letter-spacing: -.038em; margin-top: 38px; }
  .coral { background: linear-gradient(100deg,#ff8b7d,#ff6b5b 60%,#ffb59f);
           -webkit-background-clip: text; background-clip: text; color: transparent; }
  p { margin-top: 22px; font-size: 26px; line-height: 1.4; color: #c3d5db; max-width: 34ch; }
  .rodape { position: relative; z-index: 1; display: flex; align-items: center;
            justify-content: space-between; gap: 30px;
            padding-top: 26px; border-top: 1px solid rgba(255,255,255,.16); }
  .tags { display: flex; gap: 12px; flex-wrap: wrap; }
  .tag { padding: 10px 20px; border-radius: 999px; background: rgba(255,255,255,.09);
         border: 1px solid rgba(255,255,255,.15); font-size: 20px; font-weight: 500; color: #c3d5db; }
  .preco { display: flex; align-items: baseline; gap: 9px; font-family: 'Fraunces', serif;
           letter-spacing: -.04em; color: #fff; white-space: nowrap; }
  .preco b { font-size: 68px; font-weight: 600; }
  .preco span { font-size: 28px; }
</style></head><body>
  <div class="mancha m1"></div><div class="mancha m2"></div>
  <div class="conteudo">
    <div class="marca">
      <span class="selo">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff"
             stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3.5 8.5 5 4.2h14l1.5 4.3"/><path d="M5 8.5v10.3h14V8.5"/>
          <path d="m9.5 13 1.8 1.8 3.4-3.4"/>
        </svg>
      </span>
      Lojinha Pronta
    </div>
    <h1>Sua loja pronta<br><span class="coral">pra vender</span></h1>
    <p>Pra quem vende apostila, molde e material digital.</p>
  </div>
  <div class="rodape">
    <div class="tags">
      <span class="tag">Pix e cartão</span>
      <span class="tag">Entrega automática</span>
      <span class="tag">Loja no seu domínio</span>
    </div>
    <div class="preco"><span>R$</span><b>${preco.valor}</b></div>
  </div>
</body></html>`

const icone = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 180px; height: 180px; display: grid; place-items: center; background: #0a2531; }
</style></head><body>
  <svg viewBox="0 0 24 24" width="108" height="108" fill="none" stroke-width="1.9"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M3.5 8.5 5 4.2h14l1.5 4.3" stroke="#ff6b5b"/>
    <path d="M5 8.5v10.3h14V8.5" stroke="#ff6b5b"/>
    <path d="m9.5 13 1.8 1.8 3.4-3.4" stroke="#f7f5f2" stroke-width="2.2"/>
  </svg>
</body></html>`

/**
 * Acha o Chromium: primeiro o que a máquina já tem instalado (o caminho é
 * versionado, então varremos a pasta), senão deixa o Playwright resolver.
 */
async function acharChromium() {
  const raizBrowsers = process.env.PLAYWRIGHT_BROWSERS_PATH
  if (!raizBrowsers) return undefined
  try {
    const pastas = await readdir(raizBrowsers)
    for (const pasta of pastas.filter((p) => p.startsWith('chromium-')).sort().reverse()) {
      const caminho = resolve(raizBrowsers, pasta, 'chrome-linux/chrome')
      if (existsSync(caminho)) return caminho
    }
  } catch {
    /* sem pasta de browsers: cai no padrão do Playwright */
  }
  return undefined
}

await mkdir(saida, { recursive: true })
const navegador = await chromium.launch({ executablePath: await acharChromium() })

async function render(html, largura, altura, arquivo) {
  const pagina = await navegador.newPage({
    viewport: { width: largura, height: altura },
    deviceScaleFactor: 1,
  })
  await pagina.setContent(html, { waitUntil: 'networkidle' })
  await pagina.evaluate(() => document.fonts.ready)
  await pagina.screenshot({ path: resolve(saida, arquivo) })
  await pagina.close()
  console.log(`  ✓ public/${arquivo}  (${largura}×${altura})`)
}

await render(og, 1200, 630, 'og.png')
await render(icone, 180, 180, 'apple-touch-icon.png')

await navegador.close()
console.log('Imagens geradas.')
