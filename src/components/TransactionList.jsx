import { formatCurrency, formatDate } from '../utils/format';

// Lista as transações do período, com botão para remover cada uma.
export default function TransactionList({ transactions, onRemove }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma transação neste período.</p>
        <p className="empty-state__hint">Adicione uma no formulário ao lado.</p>
      </div>
    );
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => (
        <li key={t.id} className="transaction-item">
          <div className="transaction-item__main">
            <span className={`tag tag--${t.type}`}>{t.category}</span>
            <div>
              <p className="transaction-item__desc">{t.description}</p>
              <p className="transaction-item__date">{formatDate(t.date)}</p>
            </div>
          </div>

          <div className="transaction-item__right">
            <span className={`transaction-item__amount amount--${t.type}`}>
              {t.type === 'receita' ? '+' : '−'} {formatCurrency(t.amount)}
            </span>
            <button
              type="button"
              className="btn-icon"
              onClick={() => onRemove(t.id)}
              aria-label={`Remover ${t.description}`}
              title="Remover"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
