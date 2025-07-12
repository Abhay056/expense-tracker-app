import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../lib/supabaseClient';

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
  const budgetExceeded = budget.amount && totalExpenses > budget.amount;

  return (
    <div>
      <h4>Budget</h4>
      <form onSubmit={handleSetBudget}>
        <input type="number" name="budget" defaultValue={budget.amount || ''} min="1" step="any" />
        <select name="currency" defaultValue={budget.currency}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="INR">INR</option>
        </select>
        <button type="submit" className="button-primary" disabled={loading}>Set Budget</button>
      </form>
      {budget.amount && (
        <p>
          Current Budget: {budget.currency} {budget.amount.toFixed(2)} | Spent: {totalExpenses.toFixed(2)}
        </p>
      )}
      {budgetExceeded && (
      <div style={{
                  border: '2px solid red',
                  padding: '10px',
                  margin: '10px 0',
                  backgroundColor: '#ffebee',
                  color: '#c62828',
                  borderRadius: '5px',
                }}>
      <strong>Warning:</strong> You have exceeded your monthly budget!
      </div>
              )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}