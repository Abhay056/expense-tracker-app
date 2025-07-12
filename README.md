# 💰 Expense Tracker App (Next.js + Supabase)

A full-featured expense tracking app to manage your spending and visualize trends over time. Built with **Next.js** and **Supabase**.

---

## 🚀 Features

- User authentication (login/signup)
- Dashboard with expense summary and charts
- Add, group, and view expenses
- Export expenses as CSV

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your Supabase project and add credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Install required libraries:
   ```bash
   npm install chart.js react-chart.js-2 papaparse date-fns
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure
```
components/
  Auth/
  Dashboard/
  ...
hooks/
lib/
pages/
public/
styles/
types/
utils/
```




