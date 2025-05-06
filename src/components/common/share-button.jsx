import React, { useState } from 'react';
import { useGame } from "../../contexts/GameContext";
import { LineShareButton,LineIcon,TwitterShareButton, TwitterIcon } from 'react-share';
import professors from '../../data/professor';  
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "../../styles/components/common/shareButton.css"
const URL="https://jack-app.github.io/jackHack2025_I/";

const ShareButton = () => {
  const game = useGame();
  const lovepointMap = game.professorLovepointMap;
  const professorId = game.chosenProfessorId;
  const professor = professors.find((p) => p.id === professorId);
const ShareButtonTwitter=()=>{

}

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
    <div className='shareButtonParent'>

      <LineShareButton className='ShareButton' url={URL} title={QUOTE}>
        <LineIcon size={40} round />
      </LineShareButton>
      <TwitterShareButton className='ShareButtonTwitter' url={URL} title={QUOTE}>
        <TwitterIcon size={40} round/>
      </TwitterShareButton>

      <Tooltip className='copyToClipboard' title="コピー">
        <IconButton color="primary" size="small" onClick={copyToClipboard}>
          <ContentCopyIcon fontSize="large" />
        </IconButton>
      </Tooltip>

    </div>
  );
};

export default ShareButton;
