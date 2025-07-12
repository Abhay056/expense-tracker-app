import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../lib/supabaseClient';
import styles from '../../styles/Dashboard.module.css';

export default function BudgetManager({ expenses }) {
  const { user } = useAuth();
  const [budget, setBudget] = useState({ amount: null, currency: 'USD' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBudget = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('budgets')
      .select('amount, currency')
      .eq('user_id', user.id)
      .single();
    if (data) setBudget({ amount: data.amount, currency: data.currency });
    setLoading(false);
  };

  const handleSetBudget = async (e) => {
    e.preventDefault();
    const newAmount = parseFloat(e.target.elements.budget.value);
    const newCurrency = e.target.elements.currency.value;
    if (isNaN(newAmount) || newAmount <= 0) {
      setError('Please enter a valid budget.');
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from('budgets')
      .upsert({ user_id: user.id, amount: newAmount, currency: newCurrency }, { onConflict: 'user_id' });
    if (error) setError(error.message);
    else setBudget({ amount: newAmount, currency: newCurrency });
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchBudget();
  }, [user]);

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div style={{ padding: '20px', color: '#ffffff' }} className={styles.budgetManager}>
      <h4>Budget</h4>
      <form onSubmit={handleSetBudget} className={styles.budgetForm}>
        <input type="number" name="budget" defaultValue={budget.amount || ''} min="1" step="any" className={styles.budgetInput} />
        <select name="currency" defaultValue="INR" className={styles.budgetSelect}>
          <option value="INR">INR(₹)</option>
          <option value="USD">USD($)</option>
          <option value="EUR">EUR(€)</option>
        </select>
        <button type="submit" className={`button-primary ${styles.budgetBtn}`}>Set Budget</button>
      </form>
      {budget.amount && (
        <p className={styles.budgetSummary}>
          Current Budget: {budget.currency} {budget.amount ? Number(budget.amount).toFixed(2) : '0.00'} , Spent: {totalExpenses.toFixed(2)}
        </p>
      )}
      {Number(budget.amount) > 0 && totalExpenses > Number(budget.amount) && (
        <div style={{ color: 'red', fontWeight: 600, marginTop: '1rem' }}>
          <strong>Warning!</strong> You have exceeded your monthly budget!
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}