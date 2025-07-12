import { exportToCsv } from '../../utils/csvHelpers';

export default function ExportControls({ expenses, disabled }) {
  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export.');
      return;
    }
    exportToCsv(expenses, 'expenses.csv');
  };

  return (
    <button type="button" className="button-secondary" onClick={handleExport} disabled={disabled}>
      Export to CSV
    </button>
  );
}