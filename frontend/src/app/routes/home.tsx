import { useLocation, useNavigate } from "react-router";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const fail = (location.state as any)?.fail === true;
  const message =
    (location.state as any)?.message ??
    "This is a game — but in real life you should NOT click unknown links.";

  function restart() {
    // clear route state + stay on home
    navigate("/home", { replace: true, state: {} });
  }

  function start() {
    navigate("/intro", { state: { startCall: true } });
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ marginTop: 0 }}>The Audit That Killed</h1>
        <p style={{ opacity: 0.85 }}>Press Start to begin.</p>

        <button style={styles.primaryBtn} onClick={start}>
          Start
        </button>
      </div>

      {fail && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>
              ⚠️ You clicked a suspicious link
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>
              {message}
              <br />
              <br />
              <b>You have to restart the game.</b>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button style={styles.secondaryBtn} onClick={restart}>
                OK (Restart)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "#0B1220",
    color: "white",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  card: {
    width: 520,
    borderRadius: 16,
    padding: 18,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  primaryBtn: {
    marginTop: 12,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    fontWeight: 900,
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "grid",
    placeItems: "center",
  },
  modal: {
    width: 520,
    background: "#111827",
    borderRadius: 14,
    padding: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
  },
};

