import React, { createContext, useContext, useState } from "react";
import professors from "../data/professor.js"; // 教授データをインポート

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(null); // "easy" | "normal" | "hard"
  const [selectedProfessors, setSelectedProfessors] = useState([]); // パズルで選ばれた教授IDリスト
  const [chosenProfessorId, setChosenProfessorId] = useState(null); // 選択した教授
  const [professorLovepointMap, setProfessorLovepointMap] = useState(
    initializeProfessorLovepoints()
  );; // 各教授の好感度
  const [typingRound, setTypingRound] = useState(1); // タイピングの現在ラウンド

  const addProfessor = (id) => {
    setSelectedProfessors((prev) => [...prev, id]);
  };

  const chooseProfessor = (id) => {
    setChosenProfessorId(id);
  };

  const updateLovepoint = (professorId, diff) => {
    setProfessorLovepointMap((prev) => ({
      ...prev,
      [professorId]: (prev[professorId] || 0) + diff,
    }));
  };

  const nextTypingRound = () => {
    setTypingRound((prev) => prev + 1);
  };

  function initializeProfessorLovepoints() {
    const initialMap = {};
    professors.forEach((professor) => {
      initialMap[professor.id] = 0; // 最初は全員0
    });
    return initialMap;
  }

  return (
    <GameContext.Provider value={{
      difficulty,
      setDifficulty,
      selectedProfessors,
      addProfessor,
      chosenProfessorId,
      chooseProfessor,
      professorLovepointMap,
      updateLovepoint,
      typingRound,
      nextTypingRound
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};