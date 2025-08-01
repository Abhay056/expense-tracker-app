export default function Contact() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "5rem",
          width: "100vh",
          border: "1px solid #ccc",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ color: "#fff" }}>About Us</h1>
        <p style={{ color: "#fff", textAlign: "center" }}>
          ExpenseTrak is a modern, intuitive application designed to help you
          effortlessly track your expenses and manage your finances. Our goal is to provide a simple, and powerful tool that
          gives you clear insights into your spending habits.
        </p>
        <hr />
        <br />
        <h2 style={{ color: "#fff" }}>Developer Details</h2>
        <p
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            color: "cyan",
          }}
        >
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
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <img
              src="https://img.icons8.com/?size=128&id=48165&format=png"
              height="30px"
              width="30px"
              alt="email icon"
            />
            <a href="mailto:abjun504@gmail.com" style={{color: 'cyan'}}>abjun504@gmail.com</a>
          </span>
        </p>
      </div>
    </>
  );
}
