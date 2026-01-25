import React from "react";

export default function Chat() {
  return (
    <div style={chatStyles.container}>
      {/* Left-most Icon Rail (Purple) */}
      <div style={chatStyles.navRail}>
        <div style={chatStyles.railIcon}>🔔</div>
        <div style={{ ...chatStyles.railIcon, backgroundColor: "rgba(255,255,255,0.1)" }}>💬</div>
        <div style={chatStyles.railIcon}>👥</div>
        <div style={chatStyles.railIcon}>📅</div>
        <div style={chatStyles.railIcon}>⚙️</div>
      </div>

      {/* Contacts List Panel */}
      <div style={chatStyles.contactsPanel}>
        <div style={chatStyles.panelHeader}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Chat</h2>
          <button style={chatStyles.composeBtn}>📝</button>
        </div>
        
        <div style={chatStyles.searchBox}>
          <input type="text" placeholder="Search (UI only)" style={chatStyles.searchInput} />
        </div>

        <div style={chatStyles.contactList}>
          <ContactItem name="Michelle Hale" role="Head of IT Security" status="Busy" active />
          <ContactItem name="Elena Weiss" role="Finance Manager" status="Available" />
          <ContactItem name="Thomas Reed" role="External Auditor" status="Away" />
          <ContactItem name="Alex Kim" role="Junior Analyst" status="Online" />
        </div>
      </div>

      {/* Message Area */}
      <div style={chatStyles.messageArea}>
        {/* Chat Header */}
        <div style={chatStyles.chatHeader}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Michelle Hale (Head of IT Security)</div>
            <div style={{ fontSize: 12, color: "#605e5c" }}>Terminal-style support</div>
          </div>
          <div style={chatStyles.headerIcons}>
            <button style={chatStyles.iconBtn}>📹</button>
            <button style={chatStyles.iconBtn}>📞</button>
            <button style={chatStyles.iconBtn}>🖥️</button>
          </div>
        </div>

        {/* Messages Body */}
        <div style={chatStyles.messageBody}>
          <div style={chatStyles.bubble}>
            State your request. Keep it relevant and brief.
            <div style={chatStyles.timestamp}>08:58 a.m.</div>
          </div>
        </div>

        {/* Message Input Container */}
        <div style={chatStyles.inputContainer}>
            <div style={chatStyles.inputToolbar}>
                <button style={chatStyles.toolBtn}>≡</button>
                <button style={chatStyles.toolBtn}>📎</button>
                <button style={chatStyles.toolBtn}>😊</button>
                <button style={chatStyles.toolBtn}>🖼️</button>
            </div>
            <div style={chatStyles.inputBoxRow}>
                <input type="text" placeholder="Message Michelle Hale" style={chatStyles.textInput} />
                <button style={chatStyles.sendBtn}>▲</button>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function ContactItem({ name, role, status, active }: any) {
  return (
    <div style={{
      ...chatStyles.contactItem,
      backgroundColor: active ? "#f3f2f1" : "transparent"
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: active ? 700 : 400, fontSize: 14 }}>{name}</div>
        <div style={{ fontSize: 12, color: "#605e5c" }}>{role}</div>
      </div>
      <div style={{ fontSize: 11, color: "#605e5c" }}>{status}</div>
    </div>
  );
}

// --- Styles ---

const chatStyles: Record<string, React.CSSProperties> = {
  container: { display: "flex", height: "100%", fontFamily: "Segoe UI, sans-serif", color: "#323130" },
  
  navRail: { 
    width: 60, backgroundColor: "#3b3a39", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, gap: 20 
  },
  railIcon: { fontSize: 20, cursor: "pointer", color: "white", padding: 8, borderRadius: 4 },

  contactsPanel: { width: 300, borderRight: "1px solid #e1dfdd", backgroundColor: "#fff", display: "flex", flexDirection: "column" },
  panelHeader: { padding: "16px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  composeBtn: { background: "none", border: "none", fontSize: 18, cursor: "pointer" },
  searchBox: { padding: "0 16px 12px" },
  searchInput: { width: "100%", padding: "6px 8px", border: "1px solid #e1dfdd", borderRadius: 2, backgroundColor: "#f3f2f1" },
  contactList: { flex: 1, overflowY: "auto" },
  contactItem: { padding: "12px 16px", display: "flex", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #f3f2f1" },

  messageArea: { flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#fff" },
  chatHeader: { padding: "12px 20px", borderBottom: "1px solid #e1dfdd", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerIcons: { display: "flex", gap: 8 },
  iconBtn: { padding: "6px 10px", border: "1px solid #e1dfdd", borderRadius: 4, background: "#f3f2f1", cursor: "pointer" },

  messageBody: { flex: 1, padding: 20, backgroundColor: "#f3f2f1", display: "flex", flexDirection: "column" },
  bubble: { backgroundColor: "#fff", padding: "12px 16px", borderRadius: "0 18px 18px 18px", maxWidth: "70%", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", position: "relative" },
  timestamp: { fontSize: 10, color: "#605e5c", marginTop: 8 },

  inputContainer: { padding: "10px 20px 20px", backgroundColor: "#fff", borderTop: "1px solid #e1dfdd" },
  inputToolbar: { display: "flex", gap: 12, marginBottom: 8 },
  toolBtn: { background: "#f3f2f1", border: "none", borderRadius: 4, width: 32, height: 32, cursor: "pointer" },
  inputBoxRow: { display: "flex", gap: 8 },
  textInput: { flex: 1, padding: "10px 14px", borderRadius: 20, border: "1px solid #e1dfdd", backgroundColor: "#f3f2f1" },
  sendBtn: { width: 40, height: 40, borderRadius: "50%", border: "none", backgroundColor: "#8b8cc7", color: "white", cursor: "pointer", transform: "rotate(90deg)" }
};