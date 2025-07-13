import Header from "./Header";

export default function Contact() {
  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 style={{color: '#fff'}}>About Us</h1>
        <p style={{color: '#fff', textAlign: 'center'}}>
          We are dedicated to helping you manage your finances effectively.<br/>
          Our team is committed to providing the best tools for tracking expenses and budgeting.<br/>
          For more information, please contact us at <a href="mailto:abjun504@gmail.com" style={{color:"cyan"}}>Email</a><br/>
          <br/>Thank you for using our Expense Tracker!
        </p>
      </div>
    </>
  );
}