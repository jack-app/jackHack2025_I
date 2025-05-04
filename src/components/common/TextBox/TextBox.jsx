import React from 'react';
import NameTag from './NameTag/NameTag.jsx';
import TextArea from './TextArea/TextArea.jsx';
import "../../../styles/components/common/TextBox/TextBox.css"; // CSSスタイルをインポート(cssが適用されるようになる)"

const TextBox = ({texts,nextRoute,name}) => {
    return (
        <div>
            <TextArea texts={texts} nextRoute={nextRoute}/>
            <NameTag name={name} className={"nametag-in-textbox"}/>
        </div>
    );
};



export default TextBox;