import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import DifficultySelectPage from "../pages/DifficultySelectPage.jsx";
import PuzzlePage from "../pages/PuzzlePage.jsx";
import ProfessorSelectPage from "../pages/ProfessorSelectPage.jsx";
import MidStoryPage from "../pages/MidStoryPage.jsx";
import TypingGamePage from "../pages/TypingGamePage.jsx";
import EndingPage from "../pages/EndingPage.jsx";

function AppRouter() {
  return (
    <BrowserRouter  basename={import.meta.env.DEV ? "/" : "/jackHack2025_I/"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/difficulty" element={<DifficultySelectPage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
        <Route path="/mid-story" element={<MidStoryPage />} />
        <Route path="/professor-select" element={<ProfessorSelectPage />} />
        <Route path="/typing" element={<TypingGamePage />} />
        <Route path="/ending" element={<EndingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
