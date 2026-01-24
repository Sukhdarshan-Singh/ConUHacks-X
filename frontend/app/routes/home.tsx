import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  function startGame() {
    // Navigate to /intro and tell it to auto-trigger the call
    navigate("/intro", { state: { startCall: true } });
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 42, marginBottom: 10 }}>The Audit that Killed</h1>
        <p style={{ opacity: 0.8, marginBottom: 18 }}>OMG</p>

        <button
          onClick={startGame}
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            border: "none",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
