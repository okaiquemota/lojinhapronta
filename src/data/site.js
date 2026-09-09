/**
 * Fonte única de verdade da landing.
 * Tudo que muda com o tempo (preço, links, portfólio, FAQ) mora aqui.
 * Nenhum componente tem texto de venda escrito por dentro.
 */

const WHATSAPP_NUMERO = '5516982157266'

/** Monta o link do WhatsApp já com a mensagem digitada pro cliente. */
export function zap(mensagem) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

export const marca = {
  nome: 'Lojinha Pronta',
  tagline: 'Loja virtual pra quem vende material digital',
  whatsappNumero: WHATSAPP_NUMERO,
  whatsappVisivel: '(16) 98215-7266',
  // Trocar quando o domínio estiver registrado (pendência do brief).
  dominio: 'https://lojinhapronta.com.br',
}

export const preco = {
  valor: 597,
  formaPagamento: 'pagamento único',
  parcelamento: 'ou 12x no cartão',
  observacao: 'Hospedagem e domínio não estão inclusos — são contratados por você e ficam no seu nome.',
  garantiaDias: 7,
}

export const hero = {
  titulo: ['Sua loja pronta', 'pra vender'],
  subtitulo:
    'Pra quem vende apostila, molde ou material de escola bíblica. O cliente paga por Pix ou cartão e recebe o arquivo na hora, sozinho.',
  ctaPrimario: 'Quero minha loja',
  ctaSecundario: 'Ver o pacote',
}

/**
 * Contadores do hero. Só entra número que a gente consegue provar.
 * Quando houver loja entregue e avaliação de cliente de verdade,
 * adicionar aqui — nada de número inventado.
 */
export const numeros = [
  { valor: 597, prefixo: 'R$ ', rotulo: 'pagamento único, sem surpresa' },
  { valor: 7, sufixo: ' dias', rotulo: 'de garantia ou devolvo o valor' },
  { valor: 0, sufixo: '', rotulo: 'mensalidade obrigatória pra mim' },
]

export const beneficios = [
  {
    icone: 'loja',
    titulo: 'Loja completa, não um site bonito',
    texto:
      'Catálogo, carrinho, checkout e área do cliente funcionando. Não é página de apresentação com botão de WhatsApp: é loja que fecha venda sozinha.',
  },
  {
    icone: 'pagamento',
    titulo: 'Pix e cartão no automático',
    texto:
      'Integração com Mercado Pago. O cliente escolhe Pix, cartão ou boleto e o dinheiro cai direto na sua conta — sem passar por mim em momento nenhum.',
  },
  {
    icone: 'entrega',
    titulo: 'Entrega do arquivo na hora',
    texto:
      'Pagou, o sistema libera o download do PDF sozinho. Funciona às 3 da manhã, no domingo, enquanto você dá aula. Chega de mandar arquivo na mão.',
  },
  {
    icone: 'celular',
    titulo: 'Feita pro celular primeiro',
    texto:
      'Quase todo mundo vai chegar pelo link do seu Instagram, no celular. A loja é desenhada nessa tela antes de qualquer outra.',
  },
  {
    icone: 'cadeado',
    titulo: 'Cadeado, SSL e dados protegidos',
    texto:
      'Certificado de segurança instalado e configurado. Sem aviso de "site não seguro" espantando quem ia comprar.',
  },
  {
    icone: 'email',
    titulo: 'E-mail com o seu domínio',
    texto:
      'contato@seunome.com.br no lugar do Gmail. Muda como o cliente te enxerga na hora de confiar o cartão.',
  },
]

export const pacote = [
  {
    grupo: 'A loja em si',
    itens: [
      'Loja virtual completa instalada e configurada no seu domínio',
      'Layout personalizado com as suas cores e o seu logo',
      'Página inicial com destaque pros seus produtos mais vendidos',
      'Página de categorias pra organizar por matéria, idade ou tema',
      'Página de produto com descrição, imagens e botão de compra',
      'Até 10 produtos cadastrados por mim pra você já começar vendendo',
      'Página "Sobre" contando a sua história',
      'Página de contato com WhatsApp e formulário',
    ],
  },
  {
    grupo: 'Pagamento e entrega',
    itens: [
      'Checkout integrado ao Mercado Pago (Pix, cartão e boleto)',
      'Entrega automática do arquivo digital depois do pagamento',
      'E-mail automático de confirmação de compra pro cliente',
      'Controle de quantas vezes cada arquivo pode ser baixado',
      'Área do cliente pra ele rebaixar o que já comprou',
    ],
  },
  {
    grupo: 'Confiança e regra do jogo',
    itens: [
      'Certificado SSL instalado (o cadeado do navegador)',
      'Política de privacidade e termos de uso adequados à LGPD',
      'Política de reembolso de produto digital escrita pra você',
      'E-mail profissional no seu domínio configurado',
    ],
  },
  {
    grupo: 'Pra você achar no Google e no Instagram',
    itens: [
      'Configuração básica de SEO em todas as páginas',
      'Link da loja preparado pra bio do Instagram',
      'Botão de WhatsApp flutuante pra dúvida antes da compra',
      'Google Analytics instalado pra você ver quantas visitas teve',
    ],
  },
  {
    grupo: 'Pra você não depender de mim',
    itens: [
      'Vídeos curtos ensinando a cadastrar produto, trocar preço e ver pedido',
      'Manual escrito da loja, em português, sem palavra difícil',
      '1 rodada de ajustes inclusa depois da entrega',
      '15 dias de suporte por WhatsApp pra dúvida de uso',
    ],
  },
]

export const preRequisitos = [
  {
    titulo: 'Domínio próprio',
    texto:
      'O endereço da sua loja, tipo seunome.com.br. Registra no Registro.br em cinco minutos, custa cerca de R$ 40 por ano e fica no seu nome, não no meu.',
    custo: '~R$ 40/ano',
    link: 'https://registro.br',
    linkTexto: 'Registrar no Registro.br',
  },
  {
    titulo: 'Hospedagem',
    texto:
      'É onde a loja fica ligada 24 horas. Contrate pelo meu link e eu já recebo o acesso configurado do jeito certo — evita a maior parte da dor de cabeça técnica.',
    custo: 'a partir de ~R$ 15/mês',
    // Preenchido em src/data/parceiros.js quando o programa de afiliado estiver definido.
    link: null,
    linkTexto: 'Ver plano recomendado',
    ancora: '#hospedagem',
  },
  {
    titulo: 'Conta no Mercado Pago',
    texto:
      'É por onde o dinheiro entra. A conta é sua, o dinheiro cai direto pra você e eu nunca tenho acesso a ele. Abre grátis com CPF.',
    custo: 'grátis',
    link: 'https://www.mercadopago.com.br',
    linkTexto: 'Abrir conta no Mercado Pago',
  },
  {
    titulo: 'Logo e cores',
    texto:
      'Se já tem logo, me manda em PNG ou PDF. Se não tem, dá pra fazer um simples no Canva de graça em meia hora — ou me diz e eu te indico o caminho.',
    custo: 'grátis',
    link: 'https://www.canva.com/pt_br/criar/logotipos/',
    linkTexto: 'Fazer um logo no Canva',
  },
]

export const portfolio = [
  {
    nome: 'Loja do Kiwi',
    descricao:
      'Loja de material pedagógico digital: planejamento alinhado à BNCC, educação especial, inclusão e autismo. O arquivo é entregue em PDF na hora do pagamento.',
    tags: ['Material pedagógico', 'Educação especial e inclusão', 'Entrega automática'],
    /*
     * A loja está no ar em https://lojadokiwi.com.br, mas hoje roda como
     * vitrine estática com pagamento pela Kiwify — não no WordPress +
     * WooCommerce que o FAQ desta página promete. Linkar agora levaria o
     * visitante a uma loja que contradiz o que ele acabou de ler.
     * Preencher a URL depois de migrar a Kiwi pro template.
     */
    url: null,
    // Screenshot em public/portfolio/. Enquanto não existir, o card usa o
    // preview tipográfico — melhor isso do que imagem falsa no ar.
    imagem: null,
  },
]

export const faq = [
  {
    pergunta: 'Em qual plataforma a loja é feita?',
    resposta:
      'WordPress com WooCommerce, que é o sistema de loja virtual mais usado do mundo. Escolhi ele de propósito: você consegue cadastrar produto e mudar preço sozinha, e se um dia quiser trocar de profissional, qualquer desenvolvedor sabe mexer. Você nunca fica refém de mim.',
  },
  {
    pergunta: 'Como eu passo o que eu quero na loja?',
    resposta:
      'Por um formulário que eu te mando depois do pagamento. Ele pergunta as suas cores, seu logo, seus produtos e seus textos. Leva uns 20 minutos e você responde na hora que der — não precisa marcar reunião nem ligação comigo.',
  },
  {
    pergunta: 'Onde eu recebo o dinheiro das vendas?',
    resposta:
      'Direto na sua conta do Mercado Pago, que é sua e está no seu CPF ou CNPJ. O dinheiro vai do cliente pra você sem passar por mim. Eu não tenho acesso à sua conta e não fico com porcentagem de venda nenhuma.',
  },
  {
    pergunta: 'A entrega do arquivo é automática mesmo?',
    resposta:
      'É. O cliente paga, o sistema confirma o pagamento e libera o link de download na tela e no e-mail dele, sozinho. Você não precisa estar online. Se ele perder o arquivo, ele mesmo baixa de novo na área do cliente.',
  },
  {
    pergunta: 'Tem mensalidade pra você?',
    resposta:
      `Não. São R$ ${preco.valor} uma vez só e a loja é sua. O que tem custo mensal é a hospedagem, que você paga direto pra empresa de hospedagem, e o domínio, que é anual. Existe um serviço opcional de envio automático do PDF por WhatsApp que tem mensalidade, mas só se você quiser — a loja funciona completa sem ele.`,
  },
  {
    pergunta: 'Preciso ter CNPJ?',
    resposta:
      'Não precisa. Dá pra começar vendendo com CPF na conta do Mercado Pago. Muita professora começa assim e abre o MEI só depois, quando a venda já está acontecendo. Não sou contador, então pra questão de imposto vale conversar com um — mas pra colocar a loja no ar, CPF resolve.',
  },
  {
    pergunta: 'E se eu quiser mudar alguma coisa depois da entrega?',
    resposta:
      'Você tem 1 rodada de ajustes inclusa: eu entrego, você olha com calma e me manda tudo que quer mudar de uma vez. Depois disso, mudar cor, texto e preço de produto você faz sozinha pelos vídeos que eu deixo. Se precisar de coisa nova que não estava no pacote, eu passo um orçamento à parte antes de fazer qualquer coisa.',
  },
]

export const sobre = {
  titulo: 'Quem faz a sua loja',
  paragrafos: [
    'Meu nome é Kaique, sou desenvolvedor e criei a Lojinha Pronta depois de perceber uma coisa: tem muita professora vendendo apostila e atividade por PDF no WhatsApp, mandando arquivo na mão, uma venda de cada vez, cobrando por Pix e conferindo comprovante de madrugada.',
    'Isso não é falta de produto bom. É falta de loja. E orçamento de agência pra fazer loja virtual costuma vir em milhares de reais, com reunião, prazo longo e conversa técnica que ninguém pediu.',
    'Então eu fechei o escopo. Uma loja, um preço, um formulário. Sem reunião, sem enrolação, sem projeto que vira novela. Você responde o briefing, eu monto, você começa a vender.',
  ],
}

export const ctaFinal = {
  titulo: 'Bora colocar a sua loja no ar?',
  texto:
    'Me chama no WhatsApp. Eu te explico como funciona, tiro dúvida e, se fizer sentido pra você, a gente começa. Sem ligação e sem compromisso.',
  botao: 'Falar no WhatsApp',
}

export const nav = [
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#pacote', label: 'O que vem' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#preco', label: 'Preço' },
  { href: '#faq', label: 'Dúvidas' },
]
