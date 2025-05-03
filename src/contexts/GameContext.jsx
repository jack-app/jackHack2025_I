import React, { createContext, useContext, useState } from "react";
import professors from "../data/professor.js"; // 教授データをインポート

// ゲームの状態を管理するためのコンテキストを作成
const GameContext = createContext();

// ゲームの状態を提供するプロバイダーコンポーネント
export const GameProvider = ({ children }) => {
  // ゲームの難易度 ("easy" | "normal" | "hard")
  const [difficulty, setDifficulty] = useState(null);

  // パズルで選ばれた教授のIDリスト
  const [selectedProfessors, setSelectedProfessors] = useState([]);

  // プレイヤーが選択した教授のID
  const [chosenProfessorId, setChosenProfessorId] = useState(null);

  // 各教授の好感度を管理するマップ
  const [professorLovepointMap, setProfessorLovepointMap] = useState(
    initializeProfessorLovepoints()
  );

  // タイピングゲームの現在のラウンド
  const [typingRound, setTypingRound] = useState(1);

  // 教授を選択リストに追加する関数
  const addProfessor = (id) => {
    setSelectedProfessors((prev) => [...prev, id]);
  };

  // 教授の好感度を更新する関数
  const updateLovepoint = (professorId, diff) => {
    setProfessorLovepointMap((prev) => ({
      ...prev,
      [professorId]: (prev[professorId] || 0) + diff, // 現在の好感度に差分を加算
    }));
  };

  // タイピングゲームの次のラウンドに進む関数
  const nextTypingRound = () => {
    setTypingRound((prev) => prev + 1);
  };

  // 教授の好感度を初期化する関数
  function initializeProfessorLovepoints() {
    const initialMap = {};
    professors.forEach((professor) => {
      initialMap[professor.id] = 0; // 全ての教授の好感度を0に設定
    });
    return initialMap;
  }

  // 全てのデータを初期化する関数
  const resetGame = () => {
    setDifficulty(null);
    setSelectedProfessors([]);
    setChosenProfessorId(null);
    setProfessorLovepointMap(initializeProfessorLovepoints());
    setTypingRound(1);
  };
  // コンテキストプロバイダーで状態と関数を子コンポーネントに提供
  return (
    <GameContext.Provider
      value={{
        difficulty,
        setDifficulty,
        selectedProfessors,
        addProfessor,
        chosenProfessorId,
        setChosenProfessorId,
        professorLovepointMap,
        updateLovepoint,
        typingRound,
        nextTypingRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// GameContextを利用するためのカスタムフック
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};