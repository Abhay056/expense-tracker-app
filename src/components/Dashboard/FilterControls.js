import { useState } from 'react';
import useCategories from '../../hooks/useCategories';
import styles from '../../styles/Dashboard.module.css';

export default function FilterControls({ onFilterChange }) {
  const { categories } = useCategories();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
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
        name="category_id"
        value={filters.category_id}
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="button" className="button-secondary" onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}