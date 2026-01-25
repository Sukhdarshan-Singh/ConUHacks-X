import React, { useEffect, useRef, useState } from "react";

/* =========================
   Icons
========================= */
const SW = 1.5;

const IconActivity = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const IconChat = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const IconTeams = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const IconSettings = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const IconVideo = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const IconCall = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const IconScreenShare = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconFormat = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={SW} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const IconAttach = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);

const IconEmoji = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconGif = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={SW}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const IconSend = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={SW} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

/* =========================
   Helpers
========================= */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

async function postChat(message) {
  const res = await fetch("/api/chat/kevin", {
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

/* =========================
   Chat Component
========================= */
export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: "initial",
      sender: "kevin",
      text: "I'm currently dealing with Susan's BIOS lockdown. This better be quick.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const contacts = [
    { name: "Kevin", role: "IT Manager", status: "Busy" },
    { name: "Susan", role: "CEO", status: "Away" },
    { name: "Bill", role: "Sales", status: "Available" },
    { name: "Janet", role: "Accounting", status: "Do not disturb" },
  ];

  // ----- Draggable window state -----
  const [state, setState] = useState({
    pos: { x: 0, y: 0 },
    minimized: false,
    maximized: false,
  });

  const drag = useRef({
    dragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const send = async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text, timestamp: new Date() },
    ]);
    setInputValue("");
    setIsTyping(true);

    const reply = await postChat(text);

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        sender: "kevin",
        text: reply,
        timestamp: new Date(),
      },
    ]);

    inputRef.current?.focus();
  };

  // Global mouse listeners for dragging
  useEffect(() => {
    function onMove(e) {
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
  }, [state.maximized, state.minimized]);

  // This starts dragging (attached to header)
  const onDragMouseDown = (e) => {
    if (state.maximized || state.minimized) return;

    drag.current.dragging = true;
    drag.current.startMouseX = e.clientX;
    drag.current.startMouseY = e.clientY;
    drag.current.startX = state.pos.x;
    drag.current.startY = state.pos.y;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  // Sidebar “icon background” styles
  const sideBtn = "p-2 rounded-xl bg-white/15 text-white flex items-center justify-center";
  const sideBtnActive = "p-2 rounded-xl bg-white/30 text-white flex items-center justify-center";

  return (
    // Background layer
    <div className="fixed inset-0 bg-[#f3f2f1] overflow-hidden">
      {/* Draggable layer */}
      <div
        className="absolute inset-0 flex overflow-hidden"
        style={{
          transform: `translate3d(${state.pos.x}px, ${state.pos.y}px, 0)`,
          transition: drag.current.dragging ? "none" : "transform 120ms ease-out",
        }}
      >
        {/* Left app bar */}
        <div className="w-16 bg-[#464775] flex flex-col items-center py-4 space-y-6">
          <div className={sideBtn}>
            <IconActivity />
          </div>

          <div className={sideBtnActive}>
            <IconChat />
          </div>

          <div className={sideBtn}>
            <IconTeams />
          </div>

          <div className={sideBtn}>
            <IconCalendar />
          </div>

          <div className={`mt-auto ${sideBtn}`}>
            <IconSettings />
          </div>
        </div>

        {/* Chat list */}
        <div className="w-80 bg-[#edebe9] border-r border-black/10 flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div className="font-bold text-xl text-[#242424]">Chat</div>
            <button className="p-2 rounded bg-black/5 text-black/90" title="New chat" type="button">
              <IconNewChat />
            </button>
          </div>

          <div className="px-4 pb-3">
            <input className="w-full p-2 rounded border border-black/10 bg-white" placeholder="Search" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((c) => (
              <div key={c.name} className="px-4 py-3 hover:bg-[#e1dfdd] cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[#242424]">{c.name}</div>
                  <div className="text-xs text-black/50">{c.status}</div>
                </div>
                <div className="text-sm text-black/60">{c.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col">
          {/* Header (DRAG HANDLE) */}
          <div
            onMouseDown={onDragMouseDown}
            className="h-14 bg-white border-b border-black/10 flex items-center justify-between px-4 select-none"
            style={{ cursor: "grab" }}
            title="Drag to move"
          >
            <div>
              <div className="font-semibold text-[#242424]">Kevin (IT)</div>
              <div className="text-xs text-black/50">Terminal-style support</div>
            </div>

            {/* Prevent drag when clicking buttons */}
            <div
              className="flex items-center gap-3 text-black/70"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button className="p-2 rounded bg-black/5 text-black/90" title="Video" type="button">
                <IconVideo />
              </button>
              <button className="p-2 rounded bg-black/5 text-black/90" title="Call" type="button">
                <IconCall />
              </button>
              <button className="p-2 rounded bg-black/5 text-black/90" title="Share" type="button">
                <IconScreenShare />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-[#f5f5f5]">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div key={m.id} className={`mb-4 ${isUser ? "text-right" : "text-left"}`}>
                  <div className="inline-block max-w-[75%]">
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm border border-black/5 ${
                        isUser ? "bg-[#d9fdd3]" : "bg-white"
                      }`}
                    >
                      <div className="text-sm text-[#242424] whitespace-pre-wrap">{m.text}</div>
                    </div>
                    <div className="text-xs text-black/40 mt-1">{formatTime(m.timestamp)}</div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block px-4 py-3 rounded-2xl bg-white border border-black/5 shadow-sm text-sm text-black/50 italic">
                  Kevin is typing…
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="bg-white border-t border-black/10 p-3">
            <div className="flex items-center gap-2 text-black/70">
              <button type="button" className="p-2 rounded bg-black/5 text-black/90" title="Format">
                <IconFormat />
              </button>
              <button type="button" className="p-2 rounded bg-black/5 text-black/90" title="Attach">
                <IconAttach />
              </button>
              <button type="button" className="p-2 rounded bg-black/5 text-black/90" title="Emoji">
                <IconEmoji />
              </button>
              <button type="button" className="p-2 rounded bg-black/5 text-black/90" title="GIF">
                <IconGif />
              </button>

              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-3 rounded-xl border border-black/10 bg-[#faf9f8] focus:outline-none"
              />

              <button
                type="submit"
                className="p-3 rounded-xl bg-[#464775] text-white hover:opacity-90 disabled:opacity-50"
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
  );
}
