import { formatMonthLabel } from '../utils/format';

// Cabeçalho com título, seletor de mês e botão de tema (claro/escuro).
export default function Header({
  months,
  selectedMonth,
  onSelectMonth,
  theme,
  onToggleTheme,
}) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">📊</span>
        <div>
          <h1>FinDash</h1>
          <p className="header__subtitle">Dashboard financeiro pessoal</p>
        </div>
      </div>

      <div className="header__controls">
        <label className="field field--inline">
          <span className="field__label">Período</span>
          <select
            value={selectedMonth}
            onChange={(e) => onSelectMonth(e.target.value)}
          >
            <option value="todos">Todos os meses</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {formatMonthLabel(m)}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Alternar tema claro/escuro"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
