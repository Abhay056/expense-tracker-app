import { useState } from 'react';
import useRecurringExpenses from '../../hooks/useRecurringExpenses';
import useCategories from '../../hooks/useCategories';
import styles from '../../styles/Dashboard.module.css';

export default function RecurringExpenseManager() {
  const { recurringExpenses, loading, error, addRecurringExpense, updateRecurringExpense, deleteRecurringExpense } = useRecurringExpenses();
  const { categories } = useCategories();
  const [form, setForm] = useState({
    amount: '',
    category_id: '',
    notes: '',
    frequency: 'monthly',
    start_date: '',
    end_date: '',
  });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateRecurringExpense(editing.id, form);
      setEditing(null);
    } else {
      addRecurringExpense(form);
    }
    setForm({
      amount: '',
      category_id: '',
      notes: '',
      frequency: 'monthly',
      start_date: '',
      end_date: '',
    });
  };

  const handleEdit = (expense) => {
    setEditing(expense);
    setForm({
      amount: expense.amount,
      category_id: expense.category_id,
      notes: expense.notes,
      frequency: expense.frequency,
      start_date: expense.start_date,
      end_date: expense.end_date,
    });
  };

  return (
    <div className={styles.recurringExpenseManager}>
      <h4>Manage Recurring Expenses</h4>
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required />
        <select name="category_id" value={form.category_id} onChange={handleChange} required>
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input type="text" name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
        <select name="frequency" value={form.frequency} onChange={handleChange} required>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} />
        <button type="submit" className="button-primary" disabled={loading}>{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" className="button-secondary" onClick={() => setEditing(null)}>Cancel</button>}
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <ul>
        {recurringExpenses.map((exp) => (
          <li key={exp.id}>
            <span>{exp.amount} - {exp.frequency}</span>
            <button type="button" className="button-secondary" onClick={() => handleEdit(exp)} disabled={loading}>Edit</button>
            <button type="button" className="button-secondary" onClick={() => deleteRecurringExpense(exp.id)} disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}