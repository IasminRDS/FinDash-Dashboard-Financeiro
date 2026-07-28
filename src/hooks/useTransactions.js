import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { sampleTransactions } from '../data/sampleData';
import { getMonthKey } from '../utils/format';

// Hook que centraliza toda a lógica de negócio das transações:
// adicionar, remover, filtrar por mês e calcular os totais/agregações
// que alimentam os cartões e os gráficos.
export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage(
    'findash:transactions',
    sampleTransactions
  );

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      { ...transaction, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const removeTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Lista de meses disponíveis (ex.: ["2026-07", "2026-06", ...]) em ordem decrescente.
  const availableMonths = useMemo(() => {
    const months = new Set(transactions.map((t) => getMonthKey(t.date)));
    return [...months].sort().reverse();
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    removeTransaction,
    availableMonths,
  };
}

// Calcula totais (receitas, despesas, saldo) de uma lista de transações.
export function calcTotals(transactions) {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === 'receita') acc.receitas += t.amount;
      else acc.despesas += t.amount;
      acc.saldo = acc.receitas - acc.despesas;
      return acc;
    },
    { receitas: 0, despesas: 0, saldo: 0 }
  );
}

// Agrupa despesas por categoria -> [{ name, value }] para o gráfico de pizza.
export function groupByCategory(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === 'despesa')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// Agrupa por mês -> [{ month, receitas, despesas }] para o gráfico de barras.
export function groupByMonth(transactions) {
  const map = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { month: key, receitas: 0, despesas: 0 };
    if (t.type === 'receita') map[key].receitas += t.amount;
    else map[key].despesas += t.amount;
  });
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
}
