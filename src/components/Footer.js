export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem'}}>
        <p style={{color: '#fff'}}>&copy; {new Date().getFullYear()} ExpenseTrak. All rights reserved.</p>
    </footer>
  );
}