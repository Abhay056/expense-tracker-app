import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Header from '../Header';
import styles from '../../styles/Auth.module.css';

export default function SignupForm() {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const { error } = await signUp({ email, password });
    if (error) {
      if (
        error.message &&
        (error.message.toLowerCase().includes('user already registered') ||
         error.message.toLowerCase().includes('already exists') ||
         error.message.toLowerCase().includes('duplicate'))
      ) {
        setError('An account with this email already exists. Please log in or use a different email.');
      } else {
        setError(error.message || 'Sign up failed. Please try again.');
      }
    } else {
      setSuccess('Sign up successful! Please check your email to verify your account.');
      setEmail('');
      setPassword('');
    }
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
          <form className={styles.form} onSubmit={handleSubmit} aria-label="Sign up form">
            <h2>Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email"
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              aria-label="Password"
              autoComplete="new-password"
            />
            <button type="submit" disabled={loading}>Sign Up</button>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <span style={{ color: '#333' }}>Already have an account? 
            <a href="/login" style={{ color: '#0909ddff', textDecoration: 'underline', fontWeight: 600 }}> Log in</a></span>
          </form>
        </div>
      </div>
    </>
  );
}
