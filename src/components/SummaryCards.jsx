import { formatCurrency } from '../utils/format';

// Três cartões no topo: Saldo, Receitas e Despesas do período selecionado.
export default function SummaryCards({ totals }) {
  const cards = [
    { label: 'Saldo', value: totals.saldo, className: 'card--balance', icon: '💰' },
    { label: 'Receitas', value: totals.receitas, className: 'card--income', icon: '📈' },
    { label: 'Despesas', value: totals.despesas, className: 'card--expense', icon: '📉' },
  ];

  return (
    <section className="summary-cards">
      {cards.map((card) => (
        <article key={card.label} className={`card ${card.className}`}>
          <span className="card__icon" aria-hidden="true">{card.icon}</span>
          <div>
            <p className="card__label">{card.label}</p>
            <p className="card__value">{formatCurrency(card.value)}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
