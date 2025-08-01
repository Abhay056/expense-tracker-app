export default function Contact() {
  
  return (
    <>
      <div style={{ marginTop: '5rem', width: '100vh', border: '1px solid #ccc', padding: '2rem', borderRadius: '8px' }}>
        <h1 style={{color: '#fff', textAlign: 'center'}}>Contact Us</h1>
        <p style={{color: '#fff', textAlign: 'center'}}>
          If you have any questions or need assistance, please reach out to us.<br/> <br />
          <button onClick={() => window.location.href="mailto:abjun504@gmail.com"} style={{color:"#fff", cursor: 'pointer', fontSize: "15px", backgroundColor: "green" , fontWeight: "bold", padding: "0.5rem 0.5rem", borderRadius: "4px", borderColor: "white"}}>Send us an Email</button>
        <br/> <br />
        This website is Maintained and Developed by
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <img
              src="https://img.icons8.com/?size=128&id=tZuAOUGm9AuS&format=png"
              height="30px"
              width="30px"
              alt="user icon"
            />
            Abhay Bahuguna
          </span>
        </div>
        </p>
      </div>
    </>
  );
}