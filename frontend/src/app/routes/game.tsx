import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Taskbar, { taskbarStyles } from "../../component/Taskbar"; // ✅ adjust path if needed

type DragState = {
  dragging: boolean;
  startMouseX: number;
  startMouseY: number;
  startX: number;
  startY: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type WindowKey = "transcript" | "clue" | "email";

type WinState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  pos: { x: number; y: number };
  size: { w: number; h: number };
  z: number;
};

type WinConfig = {
  key: WindowKey;
  title: string;
  icon: string;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
};

const WIN_CONFIG: Record<WindowKey, WinConfig> = {
  transcript: {
    key: "transcript",
    title: "Meeting Transcript",
    icon: "🗒️",
    defaultPos: { x: -120, y: -40 },
    defaultSize: { w: 560, h: 340 },
  },
  clue: {
    key: "clue",
    title: "Security Training",
    icon: "🔍",
    defaultPos: { x: 60, y: 160 },
    defaultSize: { w: 420, h: 260 },
  },
  email: {
    key: "email",
    title: "New message",
    icon: "✉️",
    defaultPos: { x: 160, y: -10 },
    defaultSize: { w: 460, h: 420 },
  },
};

function createDefaultWinState(key: WindowKey, z: number): WinState {
  const cfg = WIN_CONFIG[key];
  return {
    open: false,
    minimized: false,
    maximized: false,
    pos: cfg.defaultPos,
    size: cfg.defaultSize,
    z,
  };
}

type DesktopWindowProps = {
  winKey: WindowKey;
  state: WinState;
  setState: (updater: (prev: WinState) => WinState) => void;
  bringToFront: () => void;
  onClose: () => void;
  children: React.ReactNode;
  taskbarHeight?: number;
};

function DesktopWindow({
  winKey,
  state,
  setState,
  bringToFront,
  onClose,
  children,
  taskbarHeight = 56,
}: DesktopWindowProps) {
  const drag = useRef<DragState>({
    dragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!drag.current.dragging) return;
      if (state.maximized || state.minimized) return;

      const dx = e.clientX - drag.current.startMouseX;
      const dy = e.clientY - drag.current.startMouseY;

      const nextX = drag.current.startX + dx;
      const nextY = drag.current.startY + dy;

      setState((prev) => ({
        ...prev,
        pos: {
          x: clamp(nextX, -900, 900),
          y: clamp(nextY, -650, 650),
        },
      }));
    }

    function onUp() {
      drag.current.dragging = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.maximized, state.minimized]);

  function onMouseDownTitle(e: React.MouseEvent) {
    if (state.maximized || state.minimized) return;
    bringToFront();
    drag.current.dragging = true;
    drag.current.startMouseX = e.clientX;
    drag.current.startMouseY = e.clientY;
    drag.current.startX = state.pos.x;
    drag.current.startY = state.pos.y;
  }

  if (!state.open || state.minimized) return null;

  const cfg = WIN_CONFIG[winKey];

  const winStyle: React.CSSProperties = state.maximized
    ? {
        ...styles.window,
        ...styles.windowMax,
        zIndex: state.z,
        bottom: taskbarHeight + 12,
      }
    : {
        ...styles.window,
        width: state.size.w,
        height: state.size.h,
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${state.pos.x}px, ${state.pos.y}px)`,
        zIndex: state.z,
      };

  return (
    <div style={styles.noDimOverlay}>
      <div style={winStyle} onMouseDown={() => bringToFront()} role="dialog" aria-label={cfg.title}>
        <div style={styles.titleBar} onMouseDown={onMouseDownTitle}>
          <div style={styles.titleText}>
            <span style={{ marginRight: 8 }}>{cfg.icon}</span>
            {cfg.title}
          </div>

          <div style={styles.winBtns} onMouseDown={(e) => e.stopPropagation()}>
            <button
              style={styles.iconBtn}
              title="Minimize"
              onClick={() => setState((p) => ({ ...p, minimized: true }))}
            >
              —
            </button>
            <button
              style={styles.iconBtn}
              title={state.maximized ? "Restore" : "Maximize"}
              onClick={() => setState((p) => ({ ...p, maximized: !p.maximized }))}
            >
              ☐
            </button>
            <button style={styles.iconBtn} title="Close" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div style={styles.windowBody}>{children}</div>
      </div>
    </div>
  );
}

export default function Game() {
  const navigate = useNavigate();

  const [showEmailNotif, setShowEmailNotif] = useState(false);

  const emailInteraction = useRef({
    opened: false,
    phishClicked: false,
  });

  const [zTop, setZTop] = useState(10);

  const [wins, setWins] = useState<Record<WindowKey, WinState>>(() => ({
    transcript: { ...createDefaultWinState("transcript", 10), open: true },
    clue: createDefaultWinState("clue", 9),
    email: createDefaultWinState("email", 8),
  }));

  const transcriptText = useMemo(
    () =>
      `“At 6:42 this morning, the Chief Financial Officer of Ardentis Financial Group was found dead in Server Room B.
The room was locked. No signs of forced entry. No witnesses. Facilities believes the cause was a technical malfunction. However… last night’s SAP audit flagged irregular postings that should not exist. And system access logs don’t align with anyone’s timeline.

You’ve been brought in because you understand finance, systems, and people.

This is no longer just an audit issue.”
Find out what really happened.”`,
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowEmailNotif(true), 60_000);
    return () => clearTimeout(timer);
  }, []);

  function bumpZ(key: WindowKey) {
    setZTop((z) => {
      const next = z + 1;
      setWins((prev) => ({
        ...prev,
        [key]: { ...prev[key], z: next },
      }));
      return next;
    });
  }

  function openWin(key: WindowKey) {
    bumpZ(key);
    setWins((prev) => ({
      ...prev,
      [key]: { ...prev[key], open: true, minimized: false },
    }));
  }

  function closeWin(key: WindowKey) {
    setWins((prev) => ({
      ...prev,
      [key]: { ...prev[key], open: false, minimized: false, maximized: false },
    }));
  }

  function toggleRestore(key: WindowKey) {
    const w = wins[key];
    if (!w.open) {
      openWin(key);
      return;
    }
    if (w.minimized) {
      openWin(key);
    } else {
      setWins((prev) => ({
        ...prev,
        [key]: { ...prev[key], minimized: true },
      }));
    }
  }

  function openEmailFromNotif() {
    setShowEmailNotif(false);
    emailInteraction.current.opened = true;
    openWin("email");
  }

  function ignoreEmail() {
    setShowEmailNotif(false);
    openWin("clue");
  }

  function closeEmailWindow() {
    closeWin("email");

    const didOpen = emailInteraction.current.opened;
    const didClick = emailInteraction.current.phishClicked;

    if (didOpen && !didClick) {
      openWin("clue");
    }
  }

  function phishingLinkClick() {
    emailInteraction.current.phishClicked = true;

    // ✅ since /home is now redirecting to /, use "/" directly
    navigate("/", {
      replace: true,
      state: {
        fail: true,
        message:
          "This is a game — but in real life you should NEVER click unknown links. Restart the game to continue.",
      },
    });
  }

  const openIcons = (Object.keys(wins) as WindowKey[])
    .filter((k) => wins[k].open)
    .map((k) => ({
      key: k,
      icon: WIN_CONFIG[k].icon,
      title: WIN_CONFIG[k].title,
      minimized: wins[k].minimized,
    }));

  return (
    <div style={styles.page}>
      <div style={{ color: "white" }}>
        <h1 style={{ marginTop: 0 }}>Desktop</h1>
        <p style={{ opacity: 0.85 }}>
          You’re “on a computer.” Windows will appear as events happen.
        </p>
      </div>

      <DesktopWindow
        winKey="transcript"
        state={wins.transcript}
        setState={(up) => setWins((p) => ({ ...p, transcript: up(p.transcript) }))}
        bringToFront={() => bumpZ("transcript")}
        onClose={() => closeWin("transcript")}
      >
        <div style={{ padding: 14, height: "100%", boxSizing: "border-box" }}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Confidential — Internal Use</div>

          <div style={styles.transcriptScroll}>
            {transcriptText.split("\n").map((line, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </DesktopWindow>

      <DesktopWindow
        winKey="email"
        state={wins.email}
        setState={(up) => setWins((p) => ({ ...p, email: up(p.email) }))}
        bringToFront={() => bumpZ("email")}
        onClose={closeEmailWindow}
      >
        <div style={styles.emailMetaLine}>
          <span style={{ opacity: 0.7 }}>From </span>
          <b>SAP Support &lt;SAP-Support@arclentis-support.com&gt;</b>
        </div>
        <div style={styles.emailMetaLine}>
          <span style={{ opacity: 0.7 }}>To </span>
          <b>David Kline &lt;d.kline@ardentis.com&gt;</b>
        </div>
        <div style={styles.emailMetaLine}>
          <span style={{ opacity: 0.7 }}>CC </span>
          <b>IT Service Desk &lt;it-help@ardentis.com&gt;</b>
        </div>

        <div style={styles.subjectLine}>⚠️ Action Required: Irregular SAP Postings Detected</div>

        <div style={styles.emailScrollBody}>
          <p style={styles.p}>Hello David,</p>

          <p style={styles.p}>
            Our automated monitoring has detected irregular FI postings in your SAP environment
            associated with the Q4 close window.
          </p>

          <p style={styles.p}>
            As a precautionary measure, we are required to revalidate executive credentials to prevent
            posting delays or system access restrictions.
          </p>

          <div style={styles.sectionTitle}>What you need to do:</div>
          <ul style={styles.ul}>
            <li>Click the secure link below</li>
            <li>Sign in using your SAP credentials</li>
            <li>Confirm recent activity</li>
          </ul>

          <div style={{ margin: "14px 0 10px" }}>
            <button onClick={phishingLinkClick} style={styles.phishLinkBtn}>
              👉 Revalidate SAP Access
            </button>
          </div>

          <p style={styles.p}>
            This verification must be completed within <b>30 minutes</b> to avoid temporary suspension
            of posting authority.
          </p>

          <p style={styles.p}>
            If you believe you have received this message in error, please note that failure to
            complete verification may result in restricted access during close.
          </p>

          <p style={styles.p}>Thank you for your prompt attention.</p>

          <div style={styles.signature}>
            —<br />
            SAP Enterprise Support<br />
            Ardentis Financial Group
          </div>

          <div style={styles.autoNote}>This message was generated automatically. Do not reply.</div>
        </div>
      </DesktopWindow>

      <DesktopWindow
        winKey="clue"
        state={wins.clue}
        setState={(up) => setWins((p) => ({ ...p, clue: up(p.clue) }))}
        bringToFront={() => bumpZ("clue")}
        onClose={() => closeWin("clue")}
      >
        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>✅ Good job!</div>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>
            You didn’t fall for the phishing scam.
            <br />
            <br />
            <b>Clue:</b> Look at the <b>employee punch-in logs</b>.
          </div>
          <div style={{ marginTop: 14, opacity: 0.7, fontSize: 12 }}>
            Tip: Real phishing emails often create urgency and “verify now” links.
          </div>
        </div>
      </DesktopWindow>

      {showEmailNotif && (
        <div style={styles.overlayDim}>
          <div style={styles.notification}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>📧 New email</div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>
              <div>
                <b>From:</b> SAP-Support@arclentis-support.com
              </div>
              <div>
                <b>Subject:</b> ⚠️ Action Required: Irregular SAP Postings Detected
              </div>
            </div>

            <div style={styles.notifActions}>
              <button onClick={ignoreEmail} style={styles.notifBtnGhost}>
                Ignore
              </button>
              <button onClick={openEmailFromNotif} style={styles.notifBtnPrimary}>
                Open
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Shared Taskbar + your middle window icons */}
      <Taskbar
        showHome
        homeTo="/"
        middle={
          <>
            {openIcons.map((it) => (
              <button
                key={it.key}
                style={{
                  ...taskbarStyles.taskIcon,
                  ...(it.minimized ? taskbarStyles.taskIconMin : taskbarStyles.taskIconActive),
                }}
                onClick={() => toggleRestore(it.key)}
                title={it.title}
              >
                <span style={{ fontSize: 18 }}>{it.icon}</span>
              </button>
            ))}
          </>
        }
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: 24,
    background: "transparent",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    position: "relative",
    paddingBottom: 90, // ✅ space for taskbar
  },

  noDimOverlay: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 6000,
  },

  overlayDim: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "grid",
    placeItems: "center",
    zIndex: 9000,
  },

  window: {
    position: "fixed",
    background: "#ffffff",
    color: "#111",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 30px 90px rgba(0,0,0,0.75)",
    border: "1px solid rgba(0,0,0,0.12)",
    pointerEvents: "auto",
  },

  windowMax: {
    inset: 16,
    borderRadius: 12,
    transform: "none",
    left: 0,
    top: 0,
  },

  titleBar: {
    height: 34,
    background: "#E9EEF6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    borderBottom: "1px solid rgba(0,0,0,0.10)",
    cursor: "move",
    userSelect: "none",
  },

  titleText: { fontWeight: 800, fontSize: 13 },

  winBtns: { display: "flex", gap: 6, alignItems: "center" },

  iconBtn: {
    width: 28,
    height: 22,
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    fontWeight: 800,
    lineHeight: "20px",
  },

  windowBody: {
    height: "calc(100% - 34px)",
    background: "#fff",
  },

  transcriptScroll: {
    height: "calc(100% - 40px)",
    overflowY: "auto",
    padding: 12,
    borderRadius: 10,
    background: "rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.08)",
    fontSize: 13,
    lineHeight: 1.55,
    whiteSpace: "pre-wrap",
  },

  notification: {
    width: 380,
    background: "#111827",
    borderRadius: 14,
    padding: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
    color: "white",
  },
  notifActions: { display: "flex", gap: 10, marginTop: 14 },
  notifBtnGhost: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  },
  notifBtnPrimary: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(37,99,235,0.35)",
    border: "1px solid rgba(37,99,235,0.6)",
    color: "white",
    cursor: "pointer",
    fontWeight: 900,
  },

  emailMetaLine: {
    padding: "8px 12px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    fontSize: 13,
  },
  subjectLine: {
    padding: "10px 12px",
    fontWeight: 900,
    borderBottom: "3px solid #8BC34A",
    fontSize: 13,
  },
  emailScrollBody: {
    padding: "10px 12px 14px",
    fontSize: 14,
    height: "calc(100% - 34px - 8px*3 - 3px - 10px)",
    overflowY: "auto",
  },
  p: { margin: "10px 0", lineHeight: 1.45 },
  sectionTitle: { marginTop: 12, fontWeight: 900 },
  ul: { margin: "8px 0 10px 20px", padding: 0, lineHeight: 1.45 },
  phishLinkBtn: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "#F3F6FB",
    cursor: "pointer",
    fontWeight: 900,
  },
  signature: { marginTop: 14, whiteSpace: "pre-line" },
  autoNote: { marginTop: 12, fontSize: 12, opacity: 0.7 },
};
