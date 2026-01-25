import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Intro from "./pages/Intro.jsx";
import Computer from "./pages/Computer.jsx";
import "./App.css";

export default function App() {
    return (
        <Routes>
            {/* Index route */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Home page */}
            <Route path="/home" element={<Home />} />

            {/* Other pages */}
            <Route path="/intro" element={<Intro />} />
            <Route path="/computer" element={<Computer />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    );
}
