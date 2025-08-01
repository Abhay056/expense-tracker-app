import { exportToCsv } from '../../utils/csvHelpers';
import styles from '../../styles/Dashboard.module.css';

export default function ExportControls({ expenses, disabled }) {
  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export.');
      return;
    }
    exportToCsv(expenses, 'expenses.csv');
  };

  return (
    <button type="button" className={styles.btn} onClick={handleExport} disabled={disabled}>
      Download CSV
    </button>
  );
}