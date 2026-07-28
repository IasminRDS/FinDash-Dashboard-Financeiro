// Funções utilitárias de formatação (moeda BRL e datas em pt-BR)

export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);

export const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

// Recebe "2026-07" e devolve "Jul/2026"
export const formatMonthLabel = (monthKey) => {
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];
  const [year, month] = monthKey.split('-');
  return `${meses[Number(month) - 1]}/${year}`;
};

export const getMonthKey = (isoDate) => isoDate.slice(0, 7); // "2026-07-23" -> "2026-07"
