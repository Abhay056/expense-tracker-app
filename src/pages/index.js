import { useEffect, useState } from 'react';
import Home from '../components/home';
import styles from '../styles/Dashboard.module.css';

export default function IndexPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!show && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #036ff4 0%, #0b7e2e 100%)',
            zIndex: 9999,
          }}
        >
          <img className={styles.splashAnim} src="/logo.png" alt="Logo" />
        </div>
      )}
      {show && <Home />}
    </>
  );
}
