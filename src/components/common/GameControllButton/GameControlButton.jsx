import React from "react";
import "../../../styles/components/common/GameControlButton.css";
import easyimage from "./easy.svg";
import normalimage from "./normal.svg";
import hardimage from "./hard.svg";

//labelには"EASY"や"NORMAL,"HARD"が入
/*
if (lavel) {
//DO Something
}else if(){

}else{
}
*/  const GameControlButton = ({ label, onClick }) => {
  let imagesrc = easyimage;
  if (label === "NORMAL") {
    imagesrc = normalimage
  }
  else if (label === "HARD") { imagesrc = hardimage }


  return (
    <div className="parent-container">
      <button className="game-control-button" onClick={onClick}>
        <img src={imagesrc}></img>
      </button>
    </div>
  );
};

export default GameControlButton;