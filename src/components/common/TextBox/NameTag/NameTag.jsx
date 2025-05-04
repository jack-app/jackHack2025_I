import React from 'react';
import "../../../../styles/components/common/TextBox/NameTag/NameTag.css";
const NameTag = ({ name }) => {
    return (
        <div className="name-tag">

            <p>{name ? name : '名前がありません'}</p>
        </div>
    );
};


// style="background-color:white; border-radius: 5px; padding: 10px; margin: 10px; font-size: 16px;"
export default NameTag;