import Header from "./Header";

export default function Contact() {
  return (
    <>
        <Header />
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1 style={{color: '#fff'}}>Contact Us</h1>
            <p style={{color: '#fff', textAlign: 'center'}}>
                If you have any questions or need assistance, please reach out to us.<br/>
                You can contact us via email at <a href="mailto:abjun504@gmail.com" style={{color:"cyan"}}>Email</a>
            </p>
        </div>
    </>
  );
}