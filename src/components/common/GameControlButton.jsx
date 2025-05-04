import React from "react";
import "../../styles/components/common/GameControlButton.css";

const GameControlButton = ({ label,onClick }) => {
  return (
    <div className="parent-container">
      <button className="game-control-button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default GameControlButton;