import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../../styles/components/common/TextBox/TextArea/TextArea.css"; // CSSスタイルをインポート(cssが適用されるようになる)

const TextArea = ({ texts, nextRoute }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        if (currentIndex < texts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate(nextRoute); // 画面遷移
        }
    };

    return (
        <div className="text-area-container">
            <div
                onClick={handleClick}
                style={{ cursor: 'pointer', padding: '20px', fontSize: '18px' }}
                className="text-area"
            >
                {texts[currentIndex]}
            </div>
            {currentIndex === texts.length - 1 && (
                <div className="start-game-text">クリックでゲーム開始</div>
            )}
        </div>
    );
};

export default TextArea;