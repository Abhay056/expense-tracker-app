import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo-1.png" sizes="any" />
        <title>ExpenseTrak</title> 
      </Head>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
