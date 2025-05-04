import React from 'react';
import PropTypes from 'prop-types';

const NameTag = ({ name }) => {
    return (
        <div>
            <p>{name ? `名前: ${name}` : '名前がありません'}</p>
        </div>
    );
};

NameTag.propTypes = {
    name: PropTypes.string,
};


export default NameTag;