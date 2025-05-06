import React from 'react';
import "../../../styles/components/common/professor-image.css"
import ProfessorAmabi from "../../../assets/professor/Amabi.png"
import ProfessorKagiyama from "../../../assets/professor/2.png"
import ProfessorHayasugi from "../../../assets/professor/3.png"
import ProfessorSyusseki from "../../../assets/professor/4.png"
const ProfessorImages = [ProfessorAmabi,ProfessorKagiyama,ProfessorHayasugi,ProfessorSyusseki];

const Professor = ({professorId}) => {
    return (
        <div className="professor-container">
            <div 
                className="professor"
                style={{
                    backgroundImage: `url(${ProfessorImages[professorId]})`,
                }}
            />
        </div>
    );
};

export default Professor;