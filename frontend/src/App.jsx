import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Computer from './pages/Computer'; 
//import Home from './pages/Home'; 
//import Intro from './pages/Intro'; 
import Navbar from './component/Navbar';
import './App.css'
import React from "react";

// If your files are still .tsx, change these imports to .tsx
import Home from "./app/routes/home.tsx";
import Intro from "./app/routes/intro.tsx";
import Game from "./app/routes/game.tsx";
import Index from "./app/routes/index.tsx";
import Chat from "./Chat.jsx"

// This replaces routes/_layout.tsx without you needing framework mode.
// If you already have routes/_layout.jsx and want to use it instead,
// import it and remove this Layout component.
function Layout() {
  return (
    <>
      <div className="min-h-screen">
         <Outlet /> {/* This is where Home, Intro, Game, and Chat will appear */}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/computer" element={<Computer />} /> {/* Added this back */}
      <Route path="/chat" element={<Chat />} /> {/* Typo fixed here */}
      <Route path="/game" element={<Game />} />
      

      <Route element={<Layout />}>
        <Route path="/intro" element={<Intro />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
