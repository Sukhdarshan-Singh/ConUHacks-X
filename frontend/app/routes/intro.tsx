import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type CallState = "IDLE" | "RINGING" | "CONNECTING" | "PLAYING" | "ENDED";

export default function Intro() {
  const [state, setState] = useState<CallState>("IDLE");

  const location = useLocation();
  const navigate = useNavigate();

  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  const connectRef = useRef<HTMLAudioElement | null>(null);
  const hangUpRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  function stop(el: HTMLAudioElement | null) {
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }

  function stopAll() {
    stop(ringtoneRef.current);
    stop(connectRef.current);
    stop(voiceRef.current);
  }

  async function triggerCall() {
    stopAll();
    setState("RINGING");

    const ring = ringtoneRef.current;
    if (ring) {
      ring.loop = true;
      ring.volume = 0.7;
      try {
        await ring.play();
      } catch {
        // Autoplay blocked until user clicks Answer/Decline (normal)
      }
    }
  }

  async function answerCall() {
    stop(ringtoneRef.current);
    setState("CONNECTING");

    const conn = connectRef.current;
    if (conn) {
      conn.currentTime = 0;
      conn.volume = 0.9;
      try {
        await conn.play();
      } catch {}
    }

    // Connecting delay
    setTimeout(async () => {
      setState("PLAYING");

      const voice = voiceRef.current;
      if (voice) {
        voice.volume = 0.85;
        try {
          await voice.play();
        } catch {
          alert("Voice failed to play. Check /public/audio/teams_call_intro.wav");
          endCall(true);
        }
      }
    }, 900);
  }

  function endCall(userInitiated = false) {
    // Stop ongoing audio
    stopAll();

    // Play hang up sound (don’t cut it off)
    const hang = hangUpRef.current;
    if (hang) {
      hang.currentTime = 0;
      hang.volume = 0.9;
      hang.play().catch(() => {});
    }

    // Show Continue button
    setState("ENDED");
  }

  function goNext() {
    // Change "/game" to whatever your next page is called
    navigate("/game");
  }

  // ✅ Auto-trigger call when arriving from Start button
  useEffect(() => {
    const startCall = (location.state as any)?.startCall === true;
    if (startCall) {
      triggerCall();
      // Clear navigation state so refresh doesn't re-trigger
      navigate(".", { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isToast = state === "RINGING" || state === "CONNECTING";
  const isCentered = state === "PLAYING";

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={{ fontWeight: 800 }}>Your Game</div>
      </div>

      {/* Call UI */}
      {(state === "RINGING" || state === "CONNECTING" || state === "PLAYING") && (
        <div style={isToast ? styles.toastWrap : styles.centerWrap}>
          <div style={styles.card}>
            <div style={styles.topRow}>
              <div style={styles.avatar}>OT</div>

              <div style={{ flex: 1 }}>
                <div style={styles.callerName}>Ops Team</div>
                <div style={styles.status}>
                  {state === "RINGING" && "Incoming call"}
                  {state === "CONNECTING" && "Connecting…"}
                  {state === "PLAYING" && "In call"}
                </div>
              </div>

              <div style={styles.teamsBadge}>Teams</div>
            </div>

            <div style={styles.actions}>
              <button
                onClick={() => endCall(true)}
                style={{ ...styles.btn, ...styles.decline }}
              >
                {state === "PLAYING" ? "Hang up" : "Decline"}
              </button>

              {state === "RINGING" && (
                <button
                  onClick={answerCall}
                  style={{ ...styles.btn, ...styles.answer }}
                >
                  Answer
                </button>
              )}
            </div>

            {state === "RINGING" && (
              <div style={styles.hint}>
                If ringtone doesn’t play, click Answer (browser autoplay rules).
              </div>
            )}
          </div>
        </div>
      )}

      {/* Continue button after call ends */}
      {state === "ENDED" && (
        <button onClick={goNext} style={styles.continueBtn}>
          Continue
        </button>
      )}

      {/* Audio */}
      <audio ref={ringtoneRef} src="/audio/ringtone.mp3" preload="auto" />
      <audio ref={connectRef} src="/audio/connect.mp3" preload="auto" />
      <audio ref={hangUpRef} src="/audio/hang-up.mp3" preload="auto" />
      <audio
        ref={voiceRef}
        src="/audio/teams_call_intro.wav"
        preload="auto"
        onEnded={() => endCall(false)}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0B1220",
    color: "white",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  // Bottom-right toast position (RINGING/CONNECTING)
  toastWrap: {
    position: "fixed",
    right: 18,
    bottom: 18,
    zIndex: 9999,
  },

  // Center position (PLAYING)
  centerWrap: {
    position: "fixed",
    inset: 0,
    display: "grid",
    placeItems: "center",
    zIndex: 9999,
    padding: 18,
  },

  // Same card style used for both toast and centered
  card: {
    width: 360,
    borderRadius: 16,
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 18px 55px rgba(0,0,0,0.55)",
    padding: 14,
  },

  topRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "#2563EB",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
  },

  callerName: { fontSize: 16, fontWeight: 800 },
  status: { fontSize: 12, opacity: 0.8, marginTop: 2 },

  teamsBadge: {
    fontSize: 12,
    opacity: 0.9,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.10)",
  },

  actions: {
    display: "flex",
    gap: 10,
    marginTop: 12,
  },

  btn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    fontWeight: 800,
    cursor: "pointer",
    color: "white",
    background: "rgba(255,255,255,0.06)",
  },

  decline: { background: "rgba(239, 68, 68, 0.22)" },
  answer: { background: "rgba(34, 197, 94, 0.20)" },

  hint: { marginTop: 10, fontSize: 11, opacity: 0.6 },

  // Continue button in bottom-right after call ends
  continueBtn: {
    position: "fixed",
    right: 18,
    bottom: 18,
    zIndex: 9999,
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.10)",
    color: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
};
