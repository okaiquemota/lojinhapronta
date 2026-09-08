/**
 * HOSPEDAGEM PARCEIRA — receita recorrente do negócio.
 *
 * Enquanto `linkAfiliado` for null, a seção inteira some da página e o
 * pré-requisito "Hospedagem" aponta pro WhatsApp em vez de um botão morto.
 * Pra ligar: entre no programa de afiliado (é gratuito), cole o link aqui
 * e confira nome, plano e preço. Nada mais precisa ser mexido.
 */
export const hospedagem = {
  // Ex.: 'https://hostinger.com.br?REFERRALCODE=xxxx'
  linkAfiliado: null,

  empresa: 'Hospedagem parceira',
  plano: 'Plano recomendado',
  precoMes: null,
  precoDe: null,
  periodo: 'no plano anual',

  chamada: 'A hospedagem que eu recomendo pra loja de material digital',
  texto:
    'Testei a loja nessa configuração e é o melhor equilíbrio entre preço e velocidade pra quem está começando. Contratando pelo meu link eu já recebo o acesso do jeito certo e a instalação anda mais rápido — você não paga nada a mais por isso.',

  vantagens: [
    'Espaço e tráfego de sobra pra loja de material digital',
    'Certificado SSL incluso, sem custo separado',
    'E-mail profissional no seu domínio',
    'Painel em português e suporte 24h em português',
    'Backup automático da loja',
  ],

  aviso:
    'Esse é um link de afiliado: se você contratar por ele, eu recebo uma comissão da empresa de hospedagem. O preço pra você é o mesmo.',
}

/** A seção só vai pro ar quando existir link de verdade. */
export const hospedagemAtiva = Boolean(hospedagem.linkAfiliado)
