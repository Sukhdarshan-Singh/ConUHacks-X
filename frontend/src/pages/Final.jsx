import React, { useState } from "react";
import SuspectCard from "../components/SuspectCard";
import "./Final.css";

const Final = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const suspects = [
        { id: 1, name: "Head of IT", image: "/character/Personnage1.png" },
        { id: 2, name: "Head of IT", image: "/character/Personnage2.png" },
        { id: 3, name: "Head of IT", image: "/character/Personnage3.png" },
        { id: 4, name: "Head of IT", image: "/character/Personnage4.png" },
    ];

    const handleSelect = () => {
        if (selectedIndex !== null) {
            console.log(`Selected suspect: ${suspects[selectedIndex].name}`);
        }
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

                <button className="select-btn" onClick={handleSelect} disabled={selectedIndex === null}>
                    Select
                </button>
            </div>
        </div>
    );
};

export default Final;
