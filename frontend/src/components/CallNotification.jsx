import React, { useEffect, useRef, useState } from "react";

export function useIncomingCall() {
    const [hasCall, setHasCall] = useState(false);
    const [callData, setCallData] = useState(null);

    useEffect(() => {
        // Simuler un appel entrant après 5 secondes
        const timer = setTimeout(() => {
            setHasCall(true);
            setCallData({
                from: "Ops Team",
                message: "Incoming call from operations...",
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return {
        hasCall,
        setHasCall,
        callData,
    };
}

const CallNotification = ({ show, onAnswer, onDecline, fromName }) => {
    if (!show) return null;

    return (
        <div style={styles.notification}>
            <div style={styles.content}>
                <div style={styles.title}>📞 Incoming Call</div>
                <div style={styles.fromText}>From: {fromName}</div>
            </div>
            <div style={styles.buttons}>
                <button onClick={onDecline} style={styles.declineBtn}>
                    Decline
                </button>
                <button onClick={onAnswer} style={styles.answerBtn}>
                    Answer
                </button>
            </div>
        </div>
    );
};

const styles = {
    notification: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#111827",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "14px",
        padding: "16px",
        color: "white",
        zIndex: 5000,
        minWidth: "320px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    content: {
        marginBottom: "12px",
    },
    title: {
        fontWeight: "900",
        fontSize: "16px",
        marginBottom: "8px",
    },
    fromText: {
        fontSize: "14px",
        opacity: "0.8",
    },
    buttons: {
        display: "flex",
        gap: "10px",
    },
    declineBtn: {
        flex: 1,
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.08)",
        color: "white",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },
    answerBtn: {
        flex: 1,
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(34,197,94,0.6)",
        background: "rgba(34,197,94,0.2)",
        color: "white",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
    },
};

export default CallNotification;
