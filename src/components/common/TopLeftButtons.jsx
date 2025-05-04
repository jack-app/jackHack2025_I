// src/components/common/TopLeftButtons.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import settingsIcon from "../../assets/professor/setting.png";
import helpIcon from "../../assets/professor/help.png";
import "../../styles/components/common/TopLeftButtons.css";

const TopLeftButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="top-left-buttons">
      <button className="icon-button" onClick={() => navigate("/settings")}>
        <img src={settingsIcon} alt="設定" className="icon-image" />
      </button>
      <button className="icon-button" onClick={() => navigate("/help")}>
        <img src={helpIcon} alt="ヘルプ"className="icon-image" />
      </button>
    </div>
  );
};

export default TopLeftButtons;

