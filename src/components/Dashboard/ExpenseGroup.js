import { useState } from 'react';
import { format, startOfWeek, startOfMonth, isSameWeek, isSameMonth } from 'date-fns';
import ExpenseItem from './ExpenseItem';
import styles from '../../styles/Dashboard.module.css';

export default function ExpenseGroup({ expenses, onEdit, onDelete }) {
  const [groupBy, setGroupBy] = useState('none'); // 'none', 'week', 'month'

  const groupExpenses = () => {
    if (groupBy === 'none') {
      return { 'All Expenses': expenses };
    }

    const groups = {};
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      let groupKey;

      if (groupBy === 'week') {
        const weekStart = startOfWeek(expenseDate);
        groupKey = `Week of ${format(weekStart, 'MMM d, yyyy')}`;
      } else if (groupBy === 'month') {
        const monthStart = startOfMonth(expenseDate);
        groupKey = format(monthStart, 'MMMM yyyy');
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(expense);
    });
    return groups;
  };

  const groupedExpenses = groupExpenses();

  return (
    <div className={styles.expenseGroup}>
      <div className={styles.groupSelector}>
        <span>Group by:</span>
        <button type="button" className={`button-secondary ${groupBy === 'none' ? styles.active : ''}`} onClick={() => setGroupBy('none')}>None</button>
        <button type="button" className={`button-secondary ${groupBy === 'week' ? styles.active : ''}`} onClick={() => setGroupBy('week')}>Week</button>
        <button type="button" className={`button-secondary ${groupBy === 'month' ? styles.active : ''}`} onClick={() => setGroupBy('month')}>Month</button>
      </div>

      {Object.keys(groupedExpenses).map(group => (
        <div key={group}>
          <h4 className={styles.groupHeader}>{group}</h4>
          {groupedExpenses[group].length > 0 ? (
            groupedExpenses[group].map(expense => (
              <ExpenseItem key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
            ))
          ) : (
            <p>No expenses in this period.</p>
          )}
        </div>
      ))}
    </div>
  );
}
