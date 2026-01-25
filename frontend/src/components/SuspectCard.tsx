import React from "react";
import "./SuspectCard.css";

interface SuspectCardProps {
    id: number;
    name: string;
    image: string;
    isSelected: boolean;
    onClick: () => void;
}

const SuspectCard: React.FC<SuspectCardProps> = ({ id, name, image, isSelected, onClick }) => {
    return (
        <div className={`suspect-card ${isSelected ? "selected" : ""}`} onClick={onClick}>
            <img src={image} alt={name} className="suspect-image" />
            <div className="suspect-label">{name}</div>
        </div>
    );
};

export default SuspectCard;
