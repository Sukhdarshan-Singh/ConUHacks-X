import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate("/intro", { state: { startCall: true } });
    };

    return (
        <div className="home-container">
            <div className="home-background"></div>

            <div className="home-content">
                <img src="/logo.png" alt="The Audit That Killed" className="home-logo" />

                <button className="start-button" onClick={handleStartGame}>
                    START GAME
                </button>
            </div>
        </div>
    );
};

export default Home;
