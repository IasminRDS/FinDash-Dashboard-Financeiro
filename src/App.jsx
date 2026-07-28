import { useMemo, useState, useEffect } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';
import MonthlyChart from './components/MonthlyChart';
import {
  useTransactions,
  calcTotals,
  groupByCategory,
  groupByMonth,
} from './hooks/useTransactions';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getMonthKey } from './utils/format';
import './App.css';

export default function App() {
  const { transactions, addTransaction, removeTransaction, availableMonths } =
    useTransactions();

  const [selectedMonth, setSelectedMonth] = useState('todos');
  const [theme, setTheme] = useLocalStorage('findash:theme', 'dark');

  // Aplica o tema no elemento raiz do documento.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Transações filtradas pelo período selecionado no cabeçalho.
  const filtered = useMemo(() => {
    if (selectedMonth === 'todos') return transactions;
    return transactions.filter((t) => getMonthKey(t.date) === selectedMonth);
  }, [transactions, selectedMonth]);

  const totals = useMemo(() => calcTotals(filtered), [filtered]);
  const byCategory = useMemo(() => groupByCategory(filtered), [filtered]);
  // O gráfico mensal sempre mostra o histórico completo, não o filtro.
  const byMonth = useMemo(() => groupByMonth(transactions), [transactions]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app">
      <Header
        months={availableMonths}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="container">
        <SummaryCards totals={totals} />

        <div className="grid grid--charts">
          <section className="panel">
            <h2 className="section-title">Despesas por categoria</h2>
            <CategoryChart data={byCategory} />
          </section>
          <section className="panel">
            <h2 className="section-title">Receitas x Despesas por mês</h2>
            <MonthlyChart data={byMonth} />
          </section>
        </div>

        <div className="grid grid--main">
          <section className="panel">
            <TransactionForm onAdd={addTransaction} />
          </section>
          <section className="panel">
            <div className="panel__header">
              <h2 className="section-title">Transações</h2>
              <span className="badge">{filtered.length}</span>
            </div>
            <TransactionList
              transactions={filtered}
              onRemove={removeTransaction}
            />
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>
          Feito com React + Vite + Recharts · Dados salvos no seu navegador
          (localStorage)
        </p>
      </footer>
    </div>
  );
}
