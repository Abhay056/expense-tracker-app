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
        <img className={styles.splashAnim} src="/logo.png" style={{alignItems: 'center'}}/>
      )}
      {show && <Home />}
    </>
  );
}
