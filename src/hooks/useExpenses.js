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
    category: '',
  });
  const [preferredCurrency, setPreferredCurrency] = useState('INR');

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
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setExpenses(data || []);

    const convertCurrencies = async () => {
      const response = await fetch(`/api/exchange-rate?base=INR`);
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

  const addExpense = async (expense) => {
    if (!user) {
      setError('You must be logged in to add an expense.');
      return;
    }
    setLoading(true);
    setError(null);
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
    } 
    else {
      await fetchExpenses();
    }
    setLoading(false);
  };

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
      setConvertedExpenses((converted) =>
        converted.map((e) => (e.id === id ? { ...e, ...updates } : e))
      );
    }
    setLoading(false);
  };

  const deleteExpense = async (id) => {
    setExpenses((expenses) => expenses.filter((e) => e.id !== id));
    setConvertedExpenses((converted) => converted.filter((e) => e.id !== id));
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);
    if (error) setError(error.message);
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
