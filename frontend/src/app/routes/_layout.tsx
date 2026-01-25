import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function DesktopLayout() {
  const [startOpen, setStartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close start menu when route changes
  useEffect(() => {
    setStartOpen(false);
  }, [location.pathname]);

  return (
    <div style={styles.desktop}>
      {/* Wallpaper */}
      <div style={styles.wallpaper} />

      {/* Your game/app pages render here */}
      <div style={styles.stage}>
        <Outlet />
      </div>

      {/* Start menu */}
      {startOpen && (
        <div style={styles.startMenu}>
          <div style={styles.startHeader}>Pinned</div>
          <div style={styles.grid}>
            <AppIcon label="Teams" onClick={() => navigate("/intro")} />
            <AppIcon label="Mail" onClick={() => navigate("/game")} />
            <AppIcon label="Browser" onClick={() => alert("Not implemented")} />
            <AppIcon label="Files" onClick={() => alert("Not implemented")} />
          </div>

          <div style={styles.startHeader}>Recommended</div>
          <div style={styles.reco}>
            <div style={styles.recoItem}>Onboarding Notes.txt</div>
            <div style={styles.recoItem}>Q4 Close Checklist.docx</div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div style={styles.taskbar}>
        <button style={styles.startBtn} onClick={() => setStartOpen((v) => !v)}>
          ⊞
        </button>

        <div style={styles.taskIcons}>
          <button style={styles.tbIcon} onClick={() => navigate("/home")} title="Home">
            🏠
          </button>
          <button style={styles.tbIcon} onClick={() => navigate("/intro")} title="Teams">
            💬
          </button>
          <button style={styles.tbIcon} onClick={() => navigate("/game")} title="Mail">
            ✉️
          </button>
        </div>

        <div style={styles.clockArea}>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppIcon({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button style={styles.appIcon} onClick={onClick}>
      <div style={styles.appSquare} />
      <div style={styles.appLabel}>{label}</div>
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  desktop: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },

  wallpaper: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(95,190,255,0.45), rgba(160,220,255,0.15))",
    filter: "saturate(1.1)",
  },

  stage: {
    position: "absolute",
    inset: 0,
    paddingBottom: 56, // leaves room for taskbar
  },

  taskbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
    background: "rgba(240,245,255,0.75)",
    backdropFilter: "blur(10px)",
    borderTop: "1px solid rgba(0,0,0,0.10)",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    gap: 10,
  },

  startBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.65)",
    cursor: "pointer",
    fontSize: 18,
  },

  taskIcons: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },

  tbIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.55)",
    cursor: "pointer",
    fontSize: 16,
  },

  clockArea: {
    marginLeft: "auto",
    textAlign: "right",
    paddingRight: 6,
    color: "rgba(0,0,0,0.85)",
  },

  // Start menu
  startMenu: {
    position: "absolute",
    left: 12,
    bottom: 70,
    width: 520,
    borderRadius: 16,
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.25)",
    padding: 14,
    color: "rgba(0,0,0,0.9)",
  },

  startHeader: { fontWeight: 800, margin: "8px 0" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 10,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },

  appIcon: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 6,
    borderRadius: 10,
  },
  appSquare: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "rgba(0,0,0,0.10)",
    margin: "0 auto",
  },
  appLabel: { fontSize: 12, marginTop: 6, textAlign: "center" },

  reco: { display: "grid", gap: 8, marginTop: 8 },
  recoItem: {
    background: "rgba(0,0,0,0.06)",
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
  },
};
