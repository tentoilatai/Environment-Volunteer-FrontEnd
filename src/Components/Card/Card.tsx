import React from "react";
import "../Card/Card.scss";

interface CardProps {
    imageSrc: string;
    title: string;
    details: string[];
}

const Card: React.FC<CardProps> = ({ imageSrc, title, details }) => {
    return (
        <div className="card">
            <div className="image-placeholder">
                <img src={imageSrc} alt={title} />
            </div>
            <h3>{title}</h3>
            {details.map((detail, index) => (
                <p key={index} className="truncate-text">{detail}</p>
            ))}
        </div>
    );
};

export default Card;
