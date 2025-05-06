// src/components/common/TopLeftButtons.jsx

import React , {useState,useRef,useEffect }from "react";
import { useNavigate} from "react-router-dom";
import settingsIcon from "../../assets/professor/setting.png";
import helpIcon from "../../assets/professor/help.png";
import "../../styles/components/common/TopLeftButtons.css";

const TopLeftButtons = ({ description }) => {
  const navigate = useNavigate();

  const [showDescription, setShowDescription] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setShowDescription(false);
      }
    };

    if (showDescription) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDescription]);

  return (
    <div className="top-left-buttons">
      <button className="icon-button" onClick={() => navigate("/settings")}>
        <img src={settingsIcon} alt="設定" className="icon-image" />
      </button>
      <button className="icon-button" onClick={() => setShowDescription(!showDescription)}>
        <img src={helpIcon} alt="ヘルプ"className="icon-image" />
      </button>
      {showDescription && description && (
        <div className="description-popup" ref={descriptionRef}>
          {description}
        </div>
      )}
    </div>
  );
};

export default TopLeftButtons;

