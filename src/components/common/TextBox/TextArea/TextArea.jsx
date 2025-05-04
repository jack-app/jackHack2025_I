import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const TextArea = ({ texts, nextRoute }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        if (currentIndex < texts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate(nextRoute);
        }
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer', padding: '20px', fontSize: '18px' }}>
            {texts[currentIndex]}
        </div>
    );
};

TextArea.propTypes = {
    texts: PropTypes.arrayOf(PropTypes.string).isRequired,
    nextRoute: PropTypes.string.isRequired,
};

export default TextArea;