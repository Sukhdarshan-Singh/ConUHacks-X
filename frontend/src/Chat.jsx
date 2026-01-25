import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================
   Styles (NO Tailwind needed)
========================= */
const S = {
  page: {
    height: "100vh",
    width: "100%",
    background: "#f3f2f1",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  topBar: {
    height: 44,
    background: "#E9EEF6",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    userSelect: "none",
  },
  topTitle: {
    fontWeight: 800,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#111",
  },
  closeBtn: {
    width: 36,
    height: 28,
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.8)",
    fontWeight: 800,
    cursor: "pointer",
  },

  content: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  contentInner: {
    position: "absolute",
    inset: 0,
    display: "flex",
    overflow: "hidden",
  },

  leftBar: {
    width: 64,
    background: "#464775",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px 0",
    gap: 18,
  },
  leftBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  leftBtnActive: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: "rgba(255,255,255,0.30)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  leftBottomWrap: { marginTop: "auto" },

  list: {
    width: 320,
    background: "#edebe9",
    borderRight: "1px solid rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  listHeader: {
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listTitle: {
    fontWeight: 800,
    fontSize: 22,
    color: "#242424",
  },
  tinyBtn: {
    padding: 10,
    borderRadius: 10,
    background: "rgba(0,0,0,0.05)",
    border: "none",
    cursor: "pointer",
    color: "rgba(0,0,0,0.9)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: { padding: "0 16px 12px" },
  search: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
    outline: "none",
  },
  listScroll: {
    flex: 1,
    overflowY: "auto",
  },
  contactRow: (selected) => ({
    padding: "12px 16px",
    cursor: "pointer",
    background: selected ? "#e1dfdd" : "transparent",
  }),
  contactRowHover: {
    background: "#e1dfdd",
  },
  contactTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  contactName: { fontWeight: 700, color: "#242424" },
  contactStatus: { fontSize: 12, color: "rgba(0,0,0,0.5)" },
  contactRole: { fontSize: 14, color: "rgba(0,0,0,0.60)", marginTop: 2 },

  chatCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: "#fff",
  },
  chatHeader: {
    height: 56,
    background: "#fff",
    borderBottom: "1px solid rgba(0,0,0,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    userSelect: "none",
  },
  chatHeaderName: { fontWeight: 700, color: "#242424" },
  chatHeaderSub: { fontSize: 12, color: "rgba(0,0,0,0.50)", marginTop: 2 },
  headerBtns: { display: "flex", gap: 10, color: "rgba(0,0,0,0.70)" },

  messages: {
    flex: 1,
    overflowY: "auto",
    padding: 24,
    background: "#f5f5f5",
  },
  msgRow: (isUser) => ({
    marginBottom: 16,
    textAlign: isUser ? "right" : "left",
  }),
  msgBubbleWrap: { display: "inline-block", maxWidth: "75%" },
  msgBubble: (isUser) => ({
    padding: "12px 16px",
    borderRadius: 18,
    background: isUser ? "#d9fdd3" : "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  }),
  msgText: { fontSize: 14, color: "#242424", whiteSpace: "pre-wrap" },
  msgTime: { fontSize: 12, color: "rgba(0,0,0,0.40)", marginTop: 6 },
  typing: {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 18,
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    fontSize: 14,
    color: "rgba(0,0,0,0.55)",
    fontStyle: "italic",
  },

  composer: {
    background: "#fff",
    borderTop: "1px solid rgba(0,0,0,0.10)",
    padding: 12,
  },
  composerRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "rgba(0,0,0,0.70)",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#faf9f8",
    outline: "none",
    fontSize: 14,
  },
  sendBtn: (disabled) => ({
    padding: 12,
    borderRadius: 14,
    border: "none",
    background: "#464775",
    color: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

/* =========================
   Icons
========================= */
const SW = 1.5;

const IconActivity = () => (
  <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const IconChat = () => (
  <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const IconTeams = () => (
  <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const IconCalendar = () => (
  <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const IconSettings = () => (
  <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={SW} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconNewChat = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const IconVideo = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const IconCall = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const IconScreenShare = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconFormat = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={SW} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const IconAttach = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const IconEmoji = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconGif = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const IconSend = () => (
  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={SW} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

/* =========================
   Helpers
========================= */
async function postChat(characterId, message) {
  const res = await fetch(`/api/chat/${characterId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) return data?.error || "CRITICAL SYSTEM ERROR: UNABLE TO PROCESS REQUEST.";
  return data.reply || "NO CARRIER.";
}

const formatTime = (d) => {
  try {
    return new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

const makeInitialMessage = (characterId, characterName) => {
  const defaults = {
    michelle: "State your request. Keep it relevant and brief.",
    elena: "If this is about the numbers, be specific.",
    thomas: "Hello. Let's keep this professional.",
    alex: "Uh… hi. I’ll try to help.",
  };

  return {
    id: `initial-${characterId}`,
    sender: characterId,
    text: defaults[characterId] || `Hello. This is ${characterName}.`,
    timestamp: new Date(),
  };
};

/* =========================
   Chat Page (route)
========================= */
export default function Chat() {
  const navigate = useNavigate();

  const contacts = [
    { id: "michelle", name: "Michelle Hale", role: "Head of IT Security", status: "Busy" },
    { id: "elena", name: "Elena Weiss", role: "Finance Manager", status: "Available" },
    { id: "thomas", name: "Thomas Reed", role: "External Auditor", status: "Away" },
    { id: "alex", name: "Alex Kim", role: "Junior Analyst", status: "Online" },
  ];

  const [activeId, setActiveId] = useState("michelle");
  const active = contacts.find((c) => c.id === activeId) || contacts[0];

  const [convos, setConvos] = useState(() => {
    const init = {};
    for (const c of contacts) {
      init[c.id] = [makeInitialMessage(c.id, c.name)];
    }
    return init;
  });

  const messages = convos[activeId] || [];
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, activeId]);

  const send = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setConvos((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { id: Date.now().toString(), sender: "user", text, timestamp: new Date() },
      ],
    }));

    setInputValue("");
    setIsTyping(true);

    const reply = await postChat(activeId, text);

    setIsTyping(false);

    setConvos((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { id: (Date.now() + 1).toString(), sender: activeId, text: reply, timestamp: new Date() },
      ],
    }));

    inputRef.current?.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const resetActiveChat = () => {
    setConvos((prev) => ({
      ...prev,
      [activeId]: [makeInitialMessage(activeId, active.name)],
    }));
  };

  return (
    <div style={S.page}>
      {/* Top window bar with X */}
      <div style={S.topBar}>
        <div style={S.topTitle}>💬 Secure Chat</div>

        <button
          onClick={() => {
            try {
              navigate("/game");
            } catch {
              navigate(-1);
            }
          }}
          title="Close"
          type="button"
          style={S.closeBtn}
        >
          ✕
        </button>
      </div>

      <div style={S.content}>
        <div style={S.contentInner}>
          {/* Left app bar */}
          <div style={S.leftBar}>
            <button type="button" style={S.leftBtn} title="Activity">
              <IconActivity />
            </button>

            <button type="button" style={S.leftBtnActive} title="Chat">
              <IconChat />
            </button>

            <button type="button" style={S.leftBtn} title="Teams">
              <IconTeams />
            </button>

            <button type="button" style={S.leftBtn} title="Calendar">
              <IconCalendar />
            </button>

            <div style={S.leftBottomWrap}>
              <button type="button" style={S.leftBtn} title="Settings">
                <IconSettings />
              </button>
            </div>
          </div>

          {/* Chat list */}
          <div style={S.list}>
            <div style={S.listHeader}>
              <div style={S.listTitle}>Chat</div>
              <button
                style={S.tinyBtn}
                title="New chat (reset current)"
                type="button"
                onClick={resetActiveChat}
              >
                <IconNewChat />
              </button>
            </div>

            <div style={S.searchWrap}>
              <input style={S.search} placeholder="Search (UI only)" />
            </div>

            <div style={S.listScroll}>
              {contacts.map((c) => {
                const selected = c.id === activeId;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveId(c.id);
                      setIsTyping(false);
                      inputRef.current?.focus();
                    }}
                    style={S.contactRow(selected)}
                    onMouseEnter={(e) => {
                      if (!selected) e.currentTarget.style.background = S.contactRowHover.background;
                    }}
                    onMouseLeave={(e) => {
                      if (!selected) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div style={S.contactTop}>
                      <div style={S.contactName}>{c.name}</div>
                      <div style={S.contactStatus}>{c.status}</div>
                    </div>
                    <div style={S.contactRole}>{c.role}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat window */}
          <div style={S.chatCol}>
            {/* Header */}
            <div style={S.chatHeader}>
              <div>
                <div style={S.chatHeaderName}>
                  {active.name} ({active.role})
                </div>
                <div style={S.chatHeaderSub}>Terminal-style support</div>
              </div>

              <div style={S.headerBtns}>
                <button style={S.tinyBtn} title="Video" type="button">
                  <IconVideo />
                </button>
                <button style={S.tinyBtn} title="Call" type="button">
                  <IconCall />
                </button>
                <button style={S.tinyBtn} title="Share" type="button">
                  <IconScreenShare />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={S.messages}>
              {messages.map((m) => {
                const isUser = m.sender === "user";
                return (
                  <div key={m.id} style={S.msgRow(isUser)}>
                    <div style={S.msgBubbleWrap}>
                      <div style={S.msgBubble(isUser)}>
                        <div style={S.msgText}>{m.text}</div>
                      </div>
                      <div style={S.msgTime}>{formatTime(m.timestamp)}</div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div style={S.msgRow(false)}>
                  <div style={S.typing}>{active.name} is typing…</div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={onSubmit} style={S.composer}>
              <div style={S.composerRow}>
                <button type="button" style={S.tinyBtn} title="Format">
                  <IconFormat />
                </button>
                <button type="button" style={S.tinyBtn} title="Attach">
                  <IconAttach />
                </button>
                <button type="button" style={S.tinyBtn} title="Emoji">
                  <IconEmoji />
                </button>
                <button type="button" style={S.tinyBtn} title="GIF">
                  <IconGif />
                </button>

                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Message ${active.name}`}
                  style={S.input}
                />

                <button
                  type="submit"
                  style={S.sendBtn(isTyping || !inputValue.trim())}
                  disabled={isTyping || !inputValue.trim()}
                  title="Send"
                >
                  <IconSend />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
