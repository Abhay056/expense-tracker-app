import LoginForm from '../components/Auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#fff' }}>
        Don&apos;t have an account?{' '}
        <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}
