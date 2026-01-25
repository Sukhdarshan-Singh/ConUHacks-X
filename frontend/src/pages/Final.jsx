import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuspectCard from "../components/SuspectCard";
import "./Final.css";

const Final = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [modal, setModal] = useState({ show: false, message: "", isWin: false });
    const navigate = useNavigate();

    const suspects = [
        { id: 1, name: "Michelle Hale", image: "/character/Personnage1.png" },
        { id: 2, name: "Elena Weiss", image: "/character/Personnage2.png" },
        { id: 3, name: "Alex Kim", image: "/character/Personnage3.png" },
        { id: 4, name: "Thomas Reed", image: "/character/Personnage4.png" },
    ];

    const handleSelect = () => {
        if (selectedIndex !== null) {
            const chosenSuspect = suspects[selectedIndex];
            if (chosenSuspect.name === "Michelle Hale") {
                setModal({
                    show: true,
                    message: "Case Closed! You found the killer. Michelle Hale has been taken into custody.",
                    isWin: true
                });
            } else {
                setModal({
                    show: true,
                    message: `GAME OVER. ${chosenSuspect.name} was innocent. The real killer escaped!`,
                    isWin: false
                });
            }
        }
    };

    const handleCloseModal = () => {
        setModal({ ...modal, show: false });
        // Redirect to home after closing the modal
        localStorage.setItem("transcriptRead", "0");
        navigate("/", { replace: true });
    };

    return (
        <div className="final" style={{ backgroundImage: "url('/background.png')" }}>
            <div className="final-container">
                <h1 className="final-title">
                    Who do you <span className="suspect-text">suspect</span> ?
                </h1>

                <div className="suspects-grid">
                    {suspects.map((suspect, index) => (
                        <SuspectCard
                            key={suspect.id}
                            id={suspect.id}
                            name={suspect.name}
                            image={suspect.image}
                            isSelected={selectedIndex === index}
                            onClick={() => setSelectedIndex(index)}
                        />
                    ))}
                </div>

                <button 
                    className="select-btn" 
                    onClick={handleSelect} 
                    disabled={selectedIndex === null}
                >
                    Select
                </button>
            </div>

            {/* Modal Popup */}
            {modal.show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 style={{ color: modal.isWin ? "#4CAF50" : "#c41e3a" }}>
                            {modal.isWin ? "Success!" : "Investigation Failed"}
                        </h2>
                        <p>{modal.message}</p>
                        <button className="modal-btn" onClick={handleCloseModal}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Final;