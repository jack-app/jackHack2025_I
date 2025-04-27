import React from "react";
import AppRouter from "./routes/AppRouter.jsx";
import { GameProvider } from "./contexts/GameContext.jsx";

function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
}

export default App;
