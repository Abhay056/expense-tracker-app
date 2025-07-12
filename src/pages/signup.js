import SignupForm from '../components/Auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#fff' }}>
        Already have an account?{' '}
        <Link href="/login">Login</Link>
      </p>
    </>
  );
}
