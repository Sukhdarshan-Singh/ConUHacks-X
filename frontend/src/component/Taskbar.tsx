import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TaskbarProps = {
    showHome?: boolean; // show home button or not
    homeTo?: string; // where home button navigates
    onStartClick?: () => void; // if you want custom start click behavior
};

export default function Taskbar({ showHome = true, homeTo = "/", onStartClick }: TaskbarProps) {
    const navigate = useNavigate();
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "numeric" });

    return (
        <div style={styles.taskbar}>
            {/* Left */}
            <div style={styles.taskLeft}>
                <button
                    style={styles.startBtn}
                    title="Start"
                    onClick={() => (onStartClick ? onStartClick() : alert("Start menu not implemented yet"))}
                >
                    ⊞
                </button>

                {showHome && (
                    <button style={styles.homeBtn} title="Home" onClick={() => navigate(homeTo)}>
                        🏠
                    </button>
                )}
            </div>

            {/* Middle (empty here — Game can still have its own window icons area) */}
            <div style={styles.taskMid} />

            {/* Right */}
            <div style={styles.taskRight}>
                <div style={styles.trayIcons}>
                    <span title="Wi-Fi">📶</span>
                    <span title="Volume">🔊</span>
                    <span title="Battery">🔋</span>
                </div>
                <div style={styles.clock}>
                    <div style={{ fontSize: 12 }}>{timeStr}</div>
                    <div style={{ fontSize: 11, opacity: 0.75 }}>{dateStr}</div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    taskbar: {
        position: "fixed",
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
        zIndex: 12000,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    },

    taskLeft: { display: "flex", gap: 8, alignItems: "center", width: 120 },
    taskMid: { display: "flex", gap: 8, alignItems: "center", flex: 1 },

    startBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.65)",
        cursor: "pointer",
        fontSize: 18,
    },

    homeBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.12)",
        background: "rgba(255,255,255,0.55)",
        cursor: "pointer",
        fontSize: 16,
    },

    taskRight: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "flex-end",
        width: 220,
        color: "rgba(0,0,0,0.85)",
    },

    trayIcons: {
        display: "flex",
        gap: 10,
        fontSize: 16,
        opacity: 0.9,
    },

    clock: {
        textAlign: "right",
        lineHeight: 1.1,
        paddingRight: 6,
    },
};

export const taskbarStyles = styles;
