import styles from '../../styles/Dashboard.module.css';

export default function ExpenseSummary({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className={styles.expenseSummaryEmpty}>
        <span>No expenses yet. Start tracking your spending!</span>
      </div>
    );
  }

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const currency = expenses[0]?.currency || 'INR';

  return (
    <div className={styles.expenseSummary}>
      <div className={styles.summaryMain}>
        <div>
          <span className={styles.summaryLabel}>Total Expenses</span>
          <span className={styles.summaryValue}>{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}</span>
        </div>
        <div>
          <span className={styles.summaryLabel}>Transactions</span>
          <span className={styles.summaryValue}>{expenses.length}</span>
        </div>
      </div>
    </div>
  );
}
