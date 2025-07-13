import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import useCategories from '../../hooks/useCategories';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
export default function ExpenseChart({ expenses }) {
  if (!expenses || expenses.length === 0) { 
    return <div style={{textAlign:'center', color:'#aaa', padding:'2rem'}}>No expense data to display.</div>;
  }
  const { categories } = useCategories();
  const defaultCategories = [
    'Food',
    'Transport',
    'Shopping',
    'Utilities',
    'Entertainment',
    'Other',
  ];

  const allCategories = Array.from(new Set([
    ...defaultCategories,
    ...categories.map(c => c.name),
  ]));

  const data = {
    labels: allCategories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: allCategories.map(cat =>
          expenses
            .filter(e => (e.category || '').toLowerCase() === cat.toLowerCase())
            .reduce((acc, e) => acc + e.amount, 0)
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const allZero = data.datasets[0].data.every(v => v === 0);
  if (allZero) {
    return <div style={{textAlign:'center', color:'#aaa', padding:'2rem'}}>No expense data to display.</div>;
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Expenses by Category (Bar)' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <Pie data={data} />
      <div style={{marginTop: '2rem'}}>
        <Bar data={data} options={barOptions} />
      </div>
    </>
  );
}
