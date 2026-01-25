import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Computer from './pages/Computer'; 
import Navbar from './component/Navbar';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";

import Home from "./app/routes/home";
import Intro from "./app/routes/intro";
import Game from "./app/routes/game";
import Chat from "./Chat";

function Layout() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/computer" element = {<Computer/>}/>
        <Route path="/intro" element = {<Intro/>}/>
        <Route path = "/game" element = {<Game/>}/>
        <Route path="*" element = {<h2>404 Not Found</h2>} />
      </Routes>
      <Navbar />

      <div className="min-h-screen">
        {/* put shared UI here if you want (header/sidebar/etc) */}
         <Outlet />
      </div>
    </>
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
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
