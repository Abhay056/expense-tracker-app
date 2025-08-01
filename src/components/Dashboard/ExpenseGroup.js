import { useState } from 'react';
import { format, startOfWeek, startOfMonth } from 'date-fns';
import ExpenseItem from './ExpenseItem';
import styles from '../../styles/Dashboard.module.css';

export default function ExpenseGroup({ expenses, onEdit, onDelete }) {
  const [groupBy, setGroupBy] = useState('none'); 

  const groupExpenses = () => {
    if (groupBy === 'none') {
      return { 'Recent Transactions': expenses };
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
        <span><b>Sort by  </b></span>
        <select className={styles.categorySelect} value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="none">None</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
     </div>

      {Object.keys(groupedExpenses).map(group => (
        <div className={styles.expenseGroup} key={group}>
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
