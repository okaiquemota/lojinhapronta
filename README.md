# Lojinha Pronta

Landing page de vendas da **Lojinha Pronta** — loja virtual pra quem vende material digital.

Marca separada da MovCode. Produto único, escopo fechado, preço único (R$ 597).
Todo CTA aponta pro WhatsApp: `https://wa.me/5516982157266`.

## Rodando

```bash
npm install
npm run dev      # servidor local
npm run build    # gera dist/
npm run preview  # serve o dist/
npm run og       # regera a imagem de compartilhamento
```

## Onde mexer

Praticamente tudo que muda com o tempo está em dois arquivos. Nenhum componente
tem texto de venda escrito por dentro.

| Quero mudar | Arquivo |
|---|---|
| Preço, textos, benefícios, itens do pacote, FAQ, portfólio | `src/data/site.js` |
| Hospedagem parceira e link de afiliado | `src/data/parceiros.js` |
| Cores, tipografia, espaçamento | `src/styles/tokens.css` |
| Estilo de cada seção | `src/styles/app.css` |
| Textos de SEO e de compartilhamento | `src/data/seo.js` |
| Google Analytics / Pixel da Meta | `.env` (modelo em `.env.example`) |

### Ligar a seção de hospedagem

Ela **não vai pro ar** enquanto não existir link — em vez de um botão morto, o
pré-requisito "Hospedagem" cai no WhatsApp. Pra ligar, preencha
`linkAfiliado`, `precoMes` e `empresa` em `src/data/parceiros.js`. A seção
aparece sozinha e o pré-requisito passa a apontar pra ela.

### Adicionar loja no portfólio

Acrescente um objeto no array `portfolio` em `src/data/site.js`. O componente
aceita N itens: com uma loja o card ocupa a linha inteira, com duas ou mais vira
grade. Sem `imagem`, o card usa um preview tipográfico em vez de screenshot
falso. Coloque os prints em `public/portfolio/`.

### Ligar analytics

Copie `.env.example` pra `.env` e preencha. Enquanto estiver vazio nenhum script
de terceiro é carregado. Todo CTA já tem `data-analytics`, e um único listener no
`document` transforma clique em evento — nenhum componente precisa saber que
analytics existe.

## Decisões que valem a pena saber

- **Vite + React, sem biblioteca de animação.** Tudo é CSS + `IntersectionObserver`.
  Um observer compartilhado pra página inteira, porque vários observers em celular
  fraco é justamente o que trava o scroll. JS fica em ~58 KB gzip, CSS em ~8 KB.
- **`prefers-reduced-motion` é respeitado de verdade.** Reveals já entram visíveis,
  contadores vão direto ao valor final, transições desligadas.
- **Contraste.** O coral vivo da marca (`--coral-500`) só aparece em decoração e
  em texto sobre fundo escuro. Botão preenchido e texto sobre fundo claro usam
  `--coral-botao` / `--coral-texto`, que passam no WCAG AA — branco sobre o coral
  vivo dá 2,8:1 e ficaria ilegível no sol.
- **Dados estruturados vêm do mesmo arquivo que a página.** Um plugin do Vite lê
  `src/data/site.js` no build e injeta `ProfessionalService` + `FAQPage` no HTML,
  então o schema nunca dessincroniza do texto da tela.
- **A imagem de compartilhamento é gerada, não desenhada à mão.** `npm run og`
  renderiza HTML no Chromium e salva `public/og.png` (1200×630) — o link vai
  circular no WhatsApp, o preview é a primeira coisa que a pessoa vê.

## Deploy

O endereço de publicação vive numa variável só: **`SITE_URL`**. Ela define de uma
vez o `base` dos assets, o canonical, as tags de compartilhamento, o
`robots.txt`, o `sitemap.xml` e o `CNAME`. Não existe URL escrita à mão em
lugar nenhum — trocar de domínio é trocar essa variável.

```bash
npm run build                                           # usa marca.dominio
SITE_URL=https://okaiquemota.github.io/lojinhapronta npm run build
```

### GitHub Pages (configurado)

`.github/workflows/deploy.yml` publica a cada push no **branch padrão** do
repositório — o job se guia pelo `default_branch`, então funciona com qualquer
nome de branch.

Pra ligar: **Settings → Pages → Source: GitHub Actions**. O repositório precisa
ser público (Pages em repositório privado exige plano pago).

Sem configurar mais nada, o site sai em
`https://okaiquemota.github.io/lojinhapronta/` e o build já ajusta o caminho dos
assets e as URLs absolutas sozinho.

Quando o domínio próprio estiver registrado:

1. **Settings → Secrets and variables → Actions → Variables**, criar
   `SITE_URL = https://lojinhapronta.com.br`
2. **Settings → Pages → Custom domain**, apontar o domínio (o `CNAME` já é
   gerado pelo build)
3. No Registro.br, criar os registros `A` do apex pros IPs do GitHub Pages e um
   `CNAME` de `www` pra `okaiquemota.github.io`
4. Marcar **Enforce HTTPS** depois que o certificado for emitido

### Vercel

Também funciona sem mudar nada: detecta Vite sozinho, build `npm run build`,
saída `dist`. Defina `SITE_URL` nas variáveis de ambiente do projeto.

## Pendências do brief

- [ ] Registrar `lojinhapronta.com.br` e conferir o @ no Instagram
- [ ] Definir programa de afiliado de hospedagem → `src/data/parceiros.js`
- [ ] URL da Loja do Kiwi + screenshot → `src/data/site.js` e `public/portfolio/`
- [ ] Logo e paleta definitivos
