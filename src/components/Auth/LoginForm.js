import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Auth.module.css';

export default function LoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.loginsignup}>
        <div className={styles.left}>
          <h1>
            Track 
            <em> Smarter</em> 🧠
            <br/>
            Spend
            <em> Smarter</em> 💰  
          </h1>
          <ul>
            <li>Track your expenses easily</li>
            <li>Set budgets and monitor spending</li>
            <li>Visualize your financial health</li>
            <li>Secure and private with Supabase</li>
          </ul>
        </div>
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              Login
            </button>
            {error && <p className={styles.error}>{error}</p>}
            <span style={{ color: '#333' }}>Don't have an account? 
            <a href="/signup" style={{ color: '#0909ddff', textDecoration: 'underline', fontWeight: 600 }}> Sign up</a></span>
          </form>
        </div>
      </div>
    </>
  );
}
