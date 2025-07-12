import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ExpenseSummary from '../components/Dashboard/ExpenseSummary';
import ExpenseGroup from '../components/Dashboard/ExpenseGroup';
import ExpenseForm from '../components/Dashboard/ExpenseForm';
import BudgetManager from '../components/Dashboard/BudgetManager';
import ExportControls from '../components/Dashboard/ExportControls';
import ImportControls from '../components/Dashboard/ImportControls';
import ExpenseChart from '../components/Dashboard/ExpenseChart';
import FilterControls from '../components/Dashboard/FilterControls';
import RecurringExpenseManager from '../components/Dashboard/RecurringExpenseManager';
import useExpenses from '../hooks/useExpenses';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

import Modal from '../components/Modal';
import styles from '../styles/Dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    convertedExpenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilters,
    setPreferredCurrency,
  } = useExpenses();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const openModal = (expense = null) => {
    setEditing(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditing(null);
    setIsModalOpen(false);
  };

  const handleAdd = async (expense) => {
    await addExpense(expense);
    closeModal();
  };

  const handleUpdate = async (expense) => {
    await updateExpense(editing.id, expense);
    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    if (editing && editing.id === id) {
      closeModal();
    }
  };

  const handleImport = async (importedExpenses) => {
    if (!user) return;
    for (const expense of importedExpenses) {
      await addExpense({ ...expense, user_id: user.id });
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className={styles.dashboard}>
      <Header />
      <main className={styles.main}>
        <div className={styles.dashboardContent}>
          {/* Main content left */}
          <div className={styles.mainContent}>
            <div className={styles.toolbar}>
              <button type="button" className="button-primary" onClick={() => openModal()}>
                Add Expense
              </button>
              <div className={styles.currencySelectWrapper}>
                <label htmlFor="currency-select" className={styles.currencyLabel}>Currency:</label>
                <select id="currency-select" className={styles.currencySelect} onChange={(e) => setPreferredCurrency(e.target.value)}>
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <ExpenseSummary expenses={convertedExpenses} />
            <div className={styles.widgets}>
              <BudgetManager expenses={convertedExpenses} />
              <RecurringExpenseManager />
            </div>

            <div className={styles.controlsRow}>
              <div className={styles.filterCol}>
                <FilterControls onFilterChange={setFilters} />
              </div>
              <div className={styles.importExportCol}>
                <ExportControls expenses={convertedExpenses} />
                <ImportControls onImport={handleImport} />
              </div>
            </div>

            <ExpenseGroup expenses={convertedExpenses} onEdit={openModal} onDelete={handleDelete} />

            {error && <p className={styles.error}>{error}</p>}
          </div>
          {/* Chart right */}
          <div className={styles.chartContainer}>
            <div className={styles.stickyChart}><ExpenseChart expenses={convertedExpenses} /></div>
          </div>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Expense' : 'Add New Expense'} showCloseButton={false}>
        <div className={styles.modalLayout}>
          <div className={styles.formContainer}>
            <ExpenseForm
              initialValues={editing || { amount: '', category_id: '', date: '', notes: '', currency: 'INR' }}
              onSubmit={editing ? handleUpdate : handleAdd}
              loading={loading}
              error={error}
              submitLabel={editing ? 'Update Expense' : 'Add Expense'}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
