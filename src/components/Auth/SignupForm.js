import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/Auth.module.css';

export default function SignupForm() {
  const { signup, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
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
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  );
}
