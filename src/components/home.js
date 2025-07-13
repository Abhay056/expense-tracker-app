import Header from './Header';  
import styles from '../styles/Auth.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
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
          <h2 style={{color: '#fff', textAlign: 'center'}}>Dashboard Overview</h2>
          <img 
            className={styles.dashImage}
            src="/dashboard-screenshot.png" 
            alt="Dashboard Example" 
          />
        </div>
      </div>
    </>
  );  
}
