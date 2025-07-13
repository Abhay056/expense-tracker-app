import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import styles from '../styles/Dashboard.module.css';
export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className={styles.header} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Link href="/">
          <div className={styles.wrap}>
            <img src="/logo.png" className={styles.logo} />
            <h1 className={styles.text}>ExpenseTrak</h1>
          </div>
        </Link>
      </div>
      <nav style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        <ul style={{ display: 'flex', gap: '4rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          <li><Link href="/" className={styles.links}>Home</Link></li>
          <li><Link href="/about" className={styles.links}>About</Link></li>
          <li><Link href="/contact" className={styles.links}> Contact</Link></li>
          {user && <li><Link href="/dashboard" className={styles.links}>Dashboard</Link></li>}
        </ul>
      </nav>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {!user && <Link href="/login"><button className="button-secondary">Sign In</button></Link>}
        {user && (
          <div className={styles.userInfo}>
            <span>{user.email}</span>
            <button type="button" className="button-secondary" onClick={signOut}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}