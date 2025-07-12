import { useState } from 'react';
import Papa from 'papaparse';

export default function ImportControls({ onImport, disabled }) {
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const requiredFields = ['date', 'amount', 'category'];
        const headers = results.meta.fields;
        const missingHeaders = requiredFields.filter((h) => !headers.includes(h));

        if (missingHeaders.length > 0) {
          setError(`CSV is missing required headers: ${missingHeaders.join(', ')}`);
          return;
        }

        const validExpenses = results.data.map((row) => ({
          ...row,
          amount: parseFloat(row.amount),
        })).filter(row => !isNaN(row.amount) && row.date && row.category);

        onImport(validExpenses);
        setError(null);
      },
      error: (err) => {
        setError(err.message);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} disabled={disabled} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}