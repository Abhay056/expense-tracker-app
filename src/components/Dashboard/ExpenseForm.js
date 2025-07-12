import { useState, useEffect } from 'react';

import useCategories from '../../hooks/useCategories';
import styles from '../../styles/ExpenseForm.module.css';

export default function ExpenseForm({
  initialValues = { amount: '', date: '', notes: '', currency: 'INR' },
  onSubmit,
  loading,
  error,
  submitLabel = 'Save',
}) {
  const [form, setForm] = useState(initialValues);
  const { categories, loading: categoriesLoading } = useCategories();

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure amount is a number and required fields are present
    const payload = {
      ...form,
      amount: Number(form.amount),
    };
    onSubmit(payload);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Expense form">
        <div className={styles.field}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category || ''}
            onChange={handleChange}
            required
            disabled={categoriesLoading}
          >
            <option value="" disabled>Select category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="currency">Currency</label>
          <select id="currency" name="currency" value={form.currency} onChange={handleChange} required>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Add a note... (optional)"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button-primary" disabled={loading}>
          {submitLabel}
        </button>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </form>
    </>
  );
}