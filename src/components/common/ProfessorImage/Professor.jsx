import React from 'react';
import "../../../styles/components/common/professor-image.css"
import ProfessorAmabi from "../../../assets/professor/Amabi.png"
// import ProfessorKagiyama from "../../../assets/professor/Kagiyama.png"
const ProfessorImages = [ProfessorAmabi]

const Professor = ({professorId}) => {
    return (
        <div className="professor-container">
            <div 
                className="professor"
                style={{
                    backgroundImage: `url(${ProfessorImages[professorId-1]})`,
                }}
            />
        </div>
    );
};

export default Professor;