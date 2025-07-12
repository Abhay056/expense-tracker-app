export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description?: string;
  date: string; // ISO string
  created_at?: string;
  updated_at?: string;
}
