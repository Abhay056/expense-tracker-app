import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function useRecurringExpenses() {
  const { user } = useAuth();
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecurringExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('recurring_expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false });
    if (error) setError(error.message);
    else setRecurringExpenses(data || []);
    setLoading(false);
  }, [user]);

  const addRecurringExpense = async (expense) => {
    if (!user) {
      setError('You must be logged in to add a recurring expense.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('recurring_expenses')
      .insert([{ ...expense, user_id: user.id }])
      .select();
    if (error) {
      setError(error.message);
    } else if (data) {
      setRecurringExpenses((prev) => [...prev, data[0]]);
    }
    setLoading(false);
  };

  const updateRecurringExpense = async (id, updates) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('recurring_expenses')
      .update(updates)
      .eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setRecurringExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
      );
    }
    setLoading(false);
  };

  const deleteRecurringExpense = async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('recurring_expenses')
      .delete()
      .eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setRecurringExpenses((prev) => prev.filter((e) => e.id !== id));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecurringExpenses();
  }, [fetchRecurringExpenses]);

  return {
    recurringExpenses,
    loading,
    error,
    addRecurringExpense,
    updateRecurringExpense,
    deleteRecurringExpense,
  };
}