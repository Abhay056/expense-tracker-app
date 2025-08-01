import { useState } from 'react';
import useCategories from '../../hooks/useCategories';
import styles from '../../styles/Dashboard.module.css';

export default function FilterControls({ onFilterChange }) {
  const { categories } = useCategories();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleRemoveFilters = () => {
    setFilters({ startDate: '', endDate: '', category: '' });
    onFilterChange({ startDate: '', endDate: '', category: '' });
  };

  return (
    <div className={styles.filterControls}>
      <h4>Filter Expenses</h4>
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
      />
      <select
        name="category"
        className={styles.categorySelect}
        value={filters.category}
        onChange={handleChange}
      >
        <option value="" disabled>Select category</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="shopping">Shopping</option>
        <option value="utilities">Utilities</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button type="button" className={styles.btn} onClick={handleApplyFilters}>Apply Filters</button>
      <button type="button" className={styles.btn} onClick={handleRemoveFilters}>Remove Filters</button>
    </div>
  );
}