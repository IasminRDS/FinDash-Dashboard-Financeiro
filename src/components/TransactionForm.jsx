import { useState } from 'react';
import { CATEGORIES } from '../data/sampleData';

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  description: '',
  amount: '',
  type: 'despesa',
  category: CATEGORIES.despesa[0],
  date: today(),
};

// Formulário controlado para adicionar uma nova transação, com validação simples.
export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Ao trocar o tipo, ajusta a categoria para uma válida daquele tipo.
      if (field === 'type') {
        next.category = CATEGORIES[value][0];
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);

    if (!form.description.trim()) {
      setError('Informe uma descrição.');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Informe um valor maior que zero.');
      return;
    }

    onAdd({
      description: form.description.trim(),
      amount,
      type: form.type,
      category: form.category,
      date: form.date,
    });

    setForm({ ...emptyForm, date: form.date });
    setError('');
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2 className="section-title">Nova transação</h2>

      <label className="field">
        <span className="field__label">Descrição</span>
        <input
          type="text"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Ex.: Supermercado"
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span className="field__label">Valor (R$)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="0,00"
          />
        </label>

        <label className="field">
          <span className="field__label">Data</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span className="field__label">Tipo</span>
          <select
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </label>

        <label className="field">
          <span className="field__label">Categoria</span>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORIES[form.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--primary">
        Adicionar
      </button>
    </form>
  );
}
