import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Home from "./app/routes/home";
import Intro from "./app/routes/intro";
import Game from "./app/routes/game";
import Final from "./pages/Final";
import Chat from "./Chat";

function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* optional alias */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route element={<Layout />}>
        <Route path="/intro" element={<Intro />} />
        <Route path="/game" element={<Game />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/final" element={<Final />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}