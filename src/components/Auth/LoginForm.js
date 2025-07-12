import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../Header';
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
      <Header />
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>
            "The -
            <em>fastest</em>
            <img src="https://d2k5nsl2zxldvw.cloudfront.net/images/illustrations/car_emoji.svg" width="96"/>
            <br/>
            "to do your expenses"
          </h1>
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
          </form>
        </div>
      </div>
    </>
  );
}
