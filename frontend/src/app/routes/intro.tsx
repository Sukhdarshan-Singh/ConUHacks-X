import React, { useEffect, useRef, useState } from "react";
import { useLocation} from "react-router";
import { useNavigate } from "react-router-dom";


type CallState = "IDLE" | "RINGING" | "CONNECTING" | "PLAYING";


export default function Intro() {
  const [state, setState] = useState<CallState>("IDLE");
  const [seconds, setSeconds] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  // Audio mute toggle (mutes the VOICE audio in your game)
  const [isMuted, setIsMuted] = useState(false);

  // ✅ Camera toggle
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Draggable window position (only used when NOT maximized)
  const [winPos, setWinPos] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    dragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
  });

  // Camera preview refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  const connectRef = useRef<HTMLAudioElement | null>(null);
  const hangUpRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  const callerName = "Ops Team";
  const callerInitial = "OT";

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

  function formatTime(t: number) {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  // Timer only runs while in call
  useEffect(() => {
    if (state !== "PLAYING") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  // Apply mute to the voice audio
  useEffect(() => {
    if (voiceRef.current) {
      voiceRef.current.muted = isMuted;
    }
  }, [isMuted]);

  async function triggerCall() {
    stopAll();
    setSeconds(0);
    setIsMaximized(false);
    setIsMuted(false);
    setIsCameraOn(true);
    setCameraError(null);
    setState("RINGING");

    const ring = ringtoneRef.current;
    if (ring) {
      ring.loop = true;
      ring.volume = 0.7;
      try {
        await ring.play();
      } catch {
        // autoplay blocked until user clicks
      }
    }
  }

  async function startCamera() {
    setCameraError(null);

    // If already running, do nothing
    if (mediaStreamRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch {
      setCameraError("Camera blocked");
    }
  }

  function stopCamera() {
    const stream = mediaStreamRef.current;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  async function toggleCamera() {
    setIsCameraOn((prev) => !prev);
  }

  // When camera toggle changes during PLAYING, start/stop stream
  useEffect(() => {
    if (state !== "PLAYING") return;

    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
      setCameraError(null); // show "Camera off" not "blocked"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraOn, state]);

  async function answerCall() {
    stop(ringtoneRef.current);
    setState("CONNECTING");

    connectRef.current?.play().catch(() => {});

    setTimeout(async () => {
      setSeconds(0);
      setState("PLAYING");

      // Reset window offset and camera
      setWinPos({ x: 0, y: 0 });
      setIsCameraOn(true);
      setCameraError(null);

      // Start self view camera if enabled
      startCamera();

      try {
        const voice = voiceRef.current;
        if (voice) {
          voice.muted = isMuted;
          voice.volume = 0.85;
          await voice.play();
        }
      } catch {
        endCall();
      }
    }, 600);
  }

  function endCall() {
  stopAll();
  stopCamera();
  hangUpRef.current?.play().catch(() => {});

  // Small delay so hang-up sound feels natural
  setTimeout(() => {
    navigate("/game");
  }, 500);
}


  function goNext() {
    navigate("/game"); // change to your next page route
  }

  // Auto-trigger when coming from Start button
  useEffect(() => {
    if ((location.state as any)?.startCall) {
      triggerCall();
      navigate(".", { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Dragging logic ---
  function onMouseDownTopBar(e: React.MouseEvent) {
    if (isMaximized) return;

    dragRef.current.dragging = true;
    dragRef.current.startMouseX = e.clientX;
    dragRef.current.startMouseY = e.clientY;
    dragRef.current.startX = winPos.x;
    dragRef.current.startY = winPos.y;
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current.dragging) return;
      const dx = e.clientX - dragRef.current.startMouseX;
      const dy = e.clientY - dragRef.current.startMouseY;
      setWinPos({ x: dragRef.current.startX + dx, y: dragRef.current.startY + dy });
    }

    function onUp() {
      dragRef.current.dragging = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [winPos.x, winPos.y]);

  const windowStyle =
    state === "PLAYING"
      ? {
          ...styles.callWindow,
          ...(isMaximized ? styles.maximized : styles.windowed),
          ...(isMaximized
            ? {}
            : {
                transform: `translate(-50%, -50%) translate(${winPos.x}px, ${winPos.y}px)`,
              }),
        }
      : undefined;

  // Self-view content decision
  const showSelfVideo = isCameraOn && !cameraError;

  return (
    <div style={styles.page}>
      {/* Incoming call toast */}
      {(state === "RINGING" || state === "CONNECTING") && (
        <div style={styles.toastWrap}>
          <div style={styles.toast}>
            <div style={styles.toastTop}>
              <div style={styles.avatarSmall}>{callerInitial}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800 }}>{callerName}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {state === "RINGING" ? "Incoming call" : "Connecting…"}
                </div>
              </div>
              <div style={styles.badge}>Teams</div>
            </div>

            <div style={styles.toastActions}>
              <button style={styles.declineBtn} onClick={endCall}>
                Decline
              </button>
              {state === "RINGING" && (
                <button style={styles.answerBtn} onClick={answerCall}>
                  Answer
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Windowed call UI */}
      {state === "PLAYING" && (
        <div style={windowStyle}>
          {/* Top bar (drag handle) */}
          <div style={styles.topBar} onMouseDown={onMouseDownTopBar}>
            <div style={styles.searchFake}>Microsoft Teams</div>

            {/* Stop drag from starting when clicking buttons */}
            <div style={styles.windowBtns} onMouseDown={(e) => e.stopPropagation()}>
              <button
                style={styles.winBtn}
                onClick={() => setIsMaximized(false)}
                title="Restore"
              >
                —
              </button>
              <button
                style={styles.winBtn}
                onClick={() => setIsMaximized((m) => !m)}
                title="Maximize"
              >
                ☐
              </button>
              <button style={styles.winBtn} onClick={endCall} title="Close">
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={styles.body}>
            <div style={styles.avatarBig}>{callerInitial}</div>

            {/* Self-view video in bottom-right */}
            <div style={styles.selfView}>
              {showSelfVideo ? (
                <video ref={videoRef} muted playsInline style={styles.selfVideo} />
              ) : (
                <div style={styles.selfViewFallback}>
                  {cameraError ? "Camera blocked" : "Camera off"}
                </div>
              )}
            </div>
          </div>

          {/* Controls: time + mute + camera + hang up */}
          <div style={styles.controls}>
            <div style={styles.time}>{formatTime(seconds)}</div>

            <div style={styles.ctrlBtns}>
              <button
                style={styles.ctrlBtn}
                onClick={() => setIsMuted((m) => !m)}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🎤"}
              </button>

              <button
                style={styles.ctrlBtn}
                onClick={toggleCamera}
                title={isCameraOn ? "Turn camera off" : "Turn camera on"}
              >
                {isCameraOn ? "📷" : "🚫📷"}
              </button>

              <button
                style={{ ...styles.ctrlBtn, ...styles.hangBtn }}
                onClick={endCall}
                title="Hang up"
              >
                📞
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Continue button after call ends */}
      

      {/* Audio */}
      <audio ref={ringtoneRef} src="/audio/ringtone.mp3" />
      <audio ref={connectRef} src="/audio/connect.mp3" />
      <audio ref={hangUpRef} src="/audio/hang-up.mp3" />
      <audio ref={voiceRef} src="/audio/teams_call_intro.wav" onEnded={endCall} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "transparent", position: "relative" },

  // Toast
  toastWrap: { position: "fixed", right: 18, bottom: 18, zIndex: 9999 },
  toast: {
    width: 330,
    background: "#111827",
    borderRadius: 14,
    padding: 12,
    color: "white",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 18px 55px rgba(0,0,0,0.55)",
  },
  toastTop: { display: "flex", gap: 10, alignItems: "center" },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#DDE8F9",
    color: "#111",
    display: "grid",
    placeItems: "center",
    fontWeight: 900,
  },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.10)",
  },
  toastActions: { display: "flex", gap: 10, marginTop: 12 },
  declineBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(239, 68, 68, 0.22)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },
  answerBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(34, 197, 94, 0.20)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },

  // Call window
  callWindow: {
    position: "fixed",
    background: "#2B2B2B",
    color: "white",
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 9998,
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 20px 70px rgba(0,0,0,0.6)",
    left: "50%",
    top: "50%",
  },
  windowed: {
    width: 520,
    height: 480,
  },
  maximized: {
    inset: 0,
    borderRadius: 0,
    left: 0,
    top: 0,
    transform: "none",
  },

  topBar: {
    height: 40,
    background: "#1F1F1F",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    cursor: "move",
    userSelect: "none",
  },
  searchFake: {
    width: 200,
    height: 24,
    background: "rgba(255,255,255,0.10)",
    borderRadius: 6,
    paddingLeft: 8,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    opacity: 0.8,
  },
  windowBtns: { display: "flex", gap: 6 },
  winBtn: {
    width: 34,
    height: 26,
    borderRadius: 6,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
  },

  body: {
    flex: 1,
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  avatarBig: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "#DDE8F9",
    color: "#111",
    fontSize: 48,
    fontWeight: 900,
    display: "grid",
    placeItems: "center",
  },

  // Self view (bottom-right)
  selfView: {
    position: "absolute",
    right: 14,
    bottom: 14,
    width: 160,
    height: 110,
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.35)",
  },
  selfVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scaleX(-1)", // mirror like real self-view
  },
  selfViewFallback: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    fontSize: 12,
    opacity: 0.8,
  },

  // Controls
  controls: {
    height: 56,
    background: "#1F1F1F",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  time: { fontSize: 12, opacity: 0.85, fontVariantNumeric: "tabular-nums" },
  ctrlBtns: { display: "flex", gap: 10, alignItems: "center" },
  ctrlBtn: {
    width: 44,
    height: 36,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    fontSize: 16,
  },
  hangBtn: { background: "rgba(220,38,38,0.85)" },

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
