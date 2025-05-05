// src/pages/HomePage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/HomePage.css";
import TopLeftButtons from "../components/common/TopLeftButtons"; // ← 追加



function HomePage() {
  const navigate = useNavigate();
  const game = useGame();

  return (
    <div className="home-page">
      <TopLeftButtons /> 
     
      <h1 className="title">教授との恋愛</h1>

      {/*<pre>{JSON.stringify(game, null, 2)}</pre>*/}

      <button onClick={() => navigate("/difficulty")}>ゲームスタート</button>
    </div>
  );
}

export default HomePage;
