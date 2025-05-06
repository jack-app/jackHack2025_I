import React, { createContext, useContext, useState,useEffect } from "react";
import professors from "../data/professor.js"; // 教授データをインポート

// ゲームの状態を管理するためのコンテキストを作成
const GameContext = createContext();

// ゲームの状態を保存するためのキー
// sessionStorageを使用して、ページリロード後も状態を保持する
// ただし、sessionStorageはブラウザのタブを閉じると消えるため、永続的な保存はされない
// そのため、ゲームの状態はセッション中のみ保持される
const STORAGE_KEY = "gameState";

// セッションストレージから初期値を取得
function getInitialState() {
  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
}


// ゲームの状態を提供するプロバイダーコンポーネント
export const GameProvider = ({ children }) => {
  // セッションストレージから初期値を取得
  const initialState = getInitialState();

  // ゲームの難易度 ("easy" | "normal" | "hard")
  const [difficulty, setDifficulty] = useState(initialState.difficulty ?? null);
  // パズルで選ばれた教授のIDリスト
  const [selectedProfessors, setSelectedProfessors] = useState(initialState.selectedProfessors ?? []);
  // プレイヤーが選択した教授のID
  const [chosenProfessorId, setChosenProfessorId] = useState(initialState.chosenProfessorId ?? null);
  // 各教授の好感度を管理するマップ
  const [professorLovepointMap, setProfessorLovepointMap] = useState(
    initialState.professorLovepointMap ?? initializeProfessorLovepoints()
  );

  // タイピングゲームの現在のラウンド
  const [typingRound, setTypingRound] = useState(initialState.typingRound ?? 1);
  // パズルゲームのスコア
  const [puzzleScore, setPuzzleScore] = useState(initialState.puzzleScore ?? 0);
  // タイピングゲームのスコア
  const [typingScore, setTypingScore] = useState(initialState.typingScore ?? 0);

  const [shouldPersist, setShouldPersist] = useState(true);

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
    setShouldPersist(false);
    setDifficulty(null);
    setSelectedProfessors([]);
    setChosenProfessorId(null);
    setProfessorLovepointMap(initializeProfessorLovepoints());
    setTypingRound(1);
    setPuzzleScore(0);
    setTypingScore(0);

    sessionStorage.removeItem(STORAGE_KEY);
    setShouldPersist(true);
  };


  // sessionStorageにデータを保存する
  useEffect(() => {
    if (!shouldPersist) return;
    const dataToSave = {
      difficulty,
      selectedProfessors,
      chosenProfessorId,
      professorLovepointMap,
      typingRound,
      puzzleScore,
      typingScore,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [difficulty, selectedProfessors, chosenProfessorId, professorLovepointMap, typingRound, puzzleScore, typingScore]);
  // コンテキストプロバイダーで状態と関数を子コンポーネントに提供
  return (
    <GameContext.Provider
      value={{
        difficulty,
        setDifficulty,
        selectedProfessors,
        setSelectedProfessors,
        addProfessor,
        chosenProfessorId,
        setChosenProfessorId,
        professorLovepointMap,
        setProfessorLovepointMap,
        initializeProfessorLovepoints,
        updateLovepoint,
        typingRound,
        nextTypingRound,
        setTypingRound,
        puzzleScore,
        setPuzzleScore,
        typingScore,
        setTypingScore,
        resetGame,
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