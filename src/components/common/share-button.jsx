import React, { useState } from 'react';
import { useGame } from "../../contexts/GameContext";
import { LineShareButton,LineIcon } from 'react-share';
import professors from '../../data/professor';  
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
const URL="https://jack-app.github.io/jackHack2025_I/";

const ShareButton = () => {
  const game = useGame();
  const lovepointMap = game.professorLovepointMap;
  const professorId = game.chosenProfessorId;
  const professor = professors.find((p) => p.id === professorId);

  if (!professor) return null;

  const lovepoint = lovepointMap[professorId];
  const QUOTE = `${professor.name}の好感度は${lovepoint}です`;
  const SHARE = `${QUOTE} ${URL}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SHARE);
      alert("コピーしました！");
    } catch (err) {
      alert("コピーに失敗しました");
      console.error(err);
    }
  };

  return (
    <div>
        <h1></h1>
      <LineShareButton url={URL} title={QUOTE}>
        <LineIcon size={24} round />
      </LineShareButton>

      <Tooltip title="コピー">
        <IconButton color="primary" size="small" onClick={copyToClipboard}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>

    </div>
  );
};

export default ShareButton;
