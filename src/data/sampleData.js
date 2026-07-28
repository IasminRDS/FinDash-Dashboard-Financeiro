// Dados de exemplo carregados no primeiro acesso (quando não há nada salvo).
// Servem para o dashboard já abrir "cheio" de gráficos numa demo.

export const CATEGORIES = {
  receita: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
  despesa: [
    'Moradia',
    'Alimentação',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros',
  ],
};

export const sampleTransactions = [
  { id: 'a1', description: 'Salário mensal', amount: 4200, type: 'receita', category: 'Salário', date: '2026-05-05' },
  { id: 'a2', description: 'Aluguel', amount: 1450, type: 'despesa', category: 'Moradia', date: '2026-05-10' },
  { id: 'a3', description: 'Supermercado', amount: 780, type: 'despesa', category: 'Alimentação', date: '2026-05-12' },
  { id: 'a4', description: 'Projeto freelance', amount: 1200, type: 'receita', category: 'Freelance', date: '2026-05-20' },
  { id: 'a5', description: 'Combustível', amount: 320, type: 'despesa', category: 'Transporte', date: '2026-05-22' },

  { id: 'b1', description: 'Salário mensal', amount: 4200, type: 'receita', category: 'Salário', date: '2026-06-05' },
  { id: 'b2', description: 'Aluguel', amount: 1450, type: 'despesa', category: 'Moradia', date: '2026-06-10' },
  { id: 'b3', description: 'Supermercado', amount: 690, type: 'despesa', category: 'Alimentação', date: '2026-06-11' },
  { id: 'b4', description: 'Cinema e restaurante', amount: 240, type: 'despesa', category: 'Lazer', date: '2026-06-18' },
  { id: 'b5', description: 'Dividendos', amount: 180, type: 'receita', category: 'Investimentos', date: '2026-06-28' },

  { id: 'c1', description: 'Salário mensal', amount: 4200, type: 'receita', category: 'Salário', date: '2026-07-05' },
  { id: 'c2', description: 'Aluguel', amount: 1450, type: 'despesa', category: 'Moradia', date: '2026-07-10' },
  { id: 'c3', description: 'Curso de React', amount: 350, type: 'despesa', category: 'Educação', date: '2026-07-14' },
  { id: 'c4', description: 'Farmácia', amount: 130, type: 'despesa', category: 'Saúde', date: '2026-07-16' },
  { id: 'c5', description: 'Freelance landing page', amount: 900, type: 'receita', category: 'Freelance', date: '2026-07-21' },
];
