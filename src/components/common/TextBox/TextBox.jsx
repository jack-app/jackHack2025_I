import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameTag from './NameTag/NameTag.jsx';
import TextArea from './TextArea/TextArea.jsx';
import "../../../styles/components/common/TextBox/TextBox.css"; // CSSスタイルをインポート(cssが適用されるようになる)"
import { useGame } from '../../../contexts/GameContext.jsx'; // ゲームの状態を管理するコンテキストをインポート

const TextBox = ({scripts,nextRoute}) => {
    console.log(scripts)
    const game = useGame();

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        if (currentIndex < scripts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            console.log("nextRoute",nextRoute)
            if (nextRoute == "/") {
                game.setDifficulty(null);
                game.setSelectedProfessors([]);
                game.setChosenProfessorId(null);
                game.setProfessorLovepointMap(game.initializeProfessorLovepoints());
                game.setTypingRound(1);
                game.setPuzzleScore(0);
                game.setTypingScore(0);
            }
            navigate(nextRoute); // 画面遷移
        }
    };
    let isLastScript = currentIndex === scripts.length - 1

    return (
        <div onClick={handleClick}>
            <TextArea texts={scripts[currentIndex][1]} noMoreScript = {isLastScript}/>
            <NameTag name={scripts[currentIndex][0]}  className={"nametag-in-textbox"}/>
        </div>
    );
};



export default TextBox;