export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div role="listitem" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
      <div style={{ flex: 1 }}>
        <strong>{expense.category}</strong> - ${expense.amount} <br />
        <span style={{ color: '#666', fontSize: '0.95em' }}>{expense.description}</span><br />
        <span style={{ color: '#999', fontSize: '0.9em' }}>{new Date(expense.date).toLocaleDateString()}</span>
      </div>
      <button type="button" className="button-secondary" onClick={() => onEdit(expense)} aria-label="Edit expense">Edit</button>
      <button type="button" className="button-secondary" onClick={() => onDelete(expense.id)} aria-label="Delete expense">Delete</button>
    </div>
  );
}
