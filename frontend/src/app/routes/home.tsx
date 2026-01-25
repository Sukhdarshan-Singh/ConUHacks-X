import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();

    const fail = (location.state as any)?.fail === true;
    const message =
        (location.state as any)?.message ?? "This is a game — but in real life you should NOT click unknown links.";

    function start() {
        navigate("/intro", { state: { startCall: true } });
    }

    function visitFinal() {
        navigate("/final");
    }

    function restart() {
        navigate("/", { replace: true, state: {} });
    }

    return (
        <div style={styles.page}>
            <div style={styles.stage}>
                <img src="/images/home.png" alt="Home" style={styles.img} draggable={false} />

                <button type="button" onClick={start} style={styles.startHotspot} aria-label="Start game" />

                <button type="button" onClick={visitFinal} style={styles.visitFinalBtn} aria-label="Visit Final">
                    Visit Final
                </button>
            </div>

            {fail && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>
                            ⚠️ You clicked a suspicious link
                        </div>

                        <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.95 }}>
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
        background: "#000",
        display: "grid",
        placeItems: "center",
        position: "relative",
    },

    stage: {
        position: "relative",
        width: "min(100vw, calc(100vh * 16 / 9))", // keeps a nice fit if your image is ~16:9
        height: "min(100vh, calc(100vw * 9 / 16))",
        maxWidth: "100vw",
        maxHeight: "100vh",
    },

    img: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        userSelect: "none",
        pointerEvents: "none",
        display: "block",
    },

    startHotspot: {
        position: "absolute",
        left: "38%", // <-- adjust
        top: "74%", // <-- adjust
        width: "24%", // <-- make bigger to be less precise
        height: "10%", // <-- make bigger to be less precise

        background: "transparent",
        border: "none",
        cursor: "pointer",

        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",

        // DEBUG (optional): uncomment to see clickable zone
        // outline: "2px dashed red",
        // background: "rgba(255,0,0,0.15)",
    },

    visitFinalBtn: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        padding: "12px 24px",
        background: "#c41e3a",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 100,
    },

    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
    },

    modal: {
        width: 520,
        maxWidth: "92vw",
        background: "#111827",
        borderRadius: 14,
        padding: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        color: "white",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
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
