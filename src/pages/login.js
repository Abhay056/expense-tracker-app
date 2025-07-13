import LoginForm from '../components/Auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'black' }}>
        Don&apos;t have an account?{' '}
        <Link href="/signup"><span style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer' }}>Sign up</span></Link>
      </p>
    </>
  );
}
