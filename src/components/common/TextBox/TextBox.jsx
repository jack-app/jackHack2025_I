import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameTag from './NameTag/NameTag.jsx';
import TextArea from './TextArea/TextArea.jsx';
import "../../../styles/components/common/TextBox/TextBox.css"; // CSSスタイルをインポート(cssが適用されるようになる)"

const TextBox = ({scripts,nextRoute}) => {
    console.log(scripts)

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        if (currentIndex < scripts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
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