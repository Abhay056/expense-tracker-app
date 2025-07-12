import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function useExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [convertedExpenses, setConvertedExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category_id: '',
  });
  const [preferredCurrency, setPreferredCurrency] = useState('USD');

  // Fetch expenses for the current user
  const fetchExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    let query = supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id);

    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setExpenses(data || []);

    const convertCurrencies = async () => {
      const response = await fetch(`/api/exchange-rate?base=USD`);
      const rates = await response.json();

      const converted = data.map(expense => {
        if (expense.currency === preferredCurrency) {
          return expense;
        }
        const rate = rates.conversion_rates[expense.currency];
        return {
          ...expense,
          amount: expense.amount / rate,
          currency: preferredCurrency,
        };
      });
      setConvertedExpenses(converted);
    };

    convertCurrencies();
    setLoading(false);
  }, [user, filters, preferredCurrency]);

  // Add a new expense
  const addExpense = async (expense) => {
    if (!user) {
      setError('You must be logged in to add an expense.');
      return;
    }
    setLoading(true);
    setError(null);
    // Ensure amount is a number and all fields are included
    const expenseToInsert = {
      ...expense,
      amount: Number(expense.amount),
      user_id: user.id,
    };
    const { data, error } = await supabase
      .from('expenses')
      .insert([expenseToInsert])
      .select();

    if (error) {
      setError(error.message);
    } else {
      // Always refetch to ensure UI and totals are correct
      await fetchExpenses();
    }
    setLoading(false);
  };

  // Update an expense
  const updateExpense = async (id, updates) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id);
    if (error) setError(error.message);
    if (!error) {
      setExpenses((expenses) =>
        expenses.map((e) => (e.id === id ? { ...e, ...updates } : e))
      );
    }
    setLoading(false);
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
    if (error) setError(error.message);
    if (!error) {
      setExpenses((expenses) => expenses.filter((e) => e.id !== id));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
      const subscription = supabase
        .channel('public:expenses')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, (payload) => {
          fetchExpenses();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user, fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilters,
    convertedExpenses,
    setPreferredCurrency,
  };
}
