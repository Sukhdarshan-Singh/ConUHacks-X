import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// If your files are still .tsx, change these imports to .tsx
import Home from "./app/routes/home.tsx";
import Intro from "./app/routes/intro.tsx";
import Game from "./app/routes/game.tsx";
import Index from "./app/routes/index.tsx";
import Chat from "./Chat"

// This replaces routes/_layout.tsx without you needing framework mode.
// If you already have routes/_layout.jsx and want to use it instead,
// import it and remove this Layout component.
function Layout() {
  return (
    <div className="min-h-screen">
      {/* put shared UI here if you want (header/sidebar/etc) */}
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* index route */}
      <Route path="/" element={<Index />} />

      {/* explicit pages */}
      <Route path="/home" element={<Home />} />

      {/* layout wrapper for intro + game */}
      <Route element={<Layout />}>
        <Route path="/intro" element={<Intro />} />
        <Route path="/game" element={<Game />} />
        <Route path="/chat" element={<Chat />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
