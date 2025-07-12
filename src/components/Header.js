import { useAuth } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Expense Tracker</h1>
      {user && (
        <div className={styles.userInfo}>
          <span>{user.email}</span>
          <button type="button" className="button-secondary" onClick={signOut}>Logout</button>
        </div>
      )}
    </header>
  );
}