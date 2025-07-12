import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function useCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true });
    if (error) setError(error.message);
    else setCategories(data || []);
    setLoading(false);
  }, [user]);

  const addCategory = async (name) => {
    if (!user) {
      setError('You must be logged in to add a category.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, user_id: user.id }])
      .select();
    if (error) {
      setError(error.message);
    } else if (data) {
      setCategories((prev) => [...prev, data[0]]);
    }
    setLoading(false);
  };

  const updateCategory = async (id, name) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name } : c))
      );
    }
    setLoading(false);
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      setError(error.message);
    } else {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}