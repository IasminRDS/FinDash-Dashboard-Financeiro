import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '../utils/format';

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444',
  '#06b6d4', '#ec4899', '#8b5cf6', '#84cc16',
];

// Gráfico de pizza com a distribuição das despesas por categoria.
export default function CategoryChart({ data }) {
  if (data.length === 0) {
    return <p className="chart-empty">Sem despesas para exibir.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={50}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
