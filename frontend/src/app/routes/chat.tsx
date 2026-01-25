import React from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../Chat";

export default function ChatRoute() {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", background: "#f3f2f1" }}>
      {/* Top "window bar" */}
      <div
        style={{
          height: 44,
          background: "#E9EEF6",
          borderBottom: "1px solid rgba(0,0,0,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          💬 Secure Chat
        </div>

        <button
        onClick={() => window.location.assign("/game")}
          title="Close"
          style={{
            width: 36,
            height: 28,
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(255,255,255,0.8)",
            cursor: "pointer",
            fontWeight: 900,
          }}
        >
          ✕
        </button>
      </div>

      {/* Chat takes the rest */}
      <div style={{ height: "calc(100vh - 44px)" }}>
        <Chat />
      </div>
    </div>
  );
}
