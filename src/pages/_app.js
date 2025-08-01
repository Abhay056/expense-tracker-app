import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
