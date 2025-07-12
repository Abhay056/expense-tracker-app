export function exportToCsv(expenses, filename = 'expenses.csv') {
  const headers = ['Date', 'Category', 'Amount', 'Description'];
  const rows = expenses.map(e => [e.date, e.category, e.amount, e.description]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}