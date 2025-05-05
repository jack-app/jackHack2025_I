// TypingGamePage（タイピングゲーム画面）
// 教授とのタイピング対決を行う
// （実際にはここでタイピング入力エリアを作る予定）

//**　bug 前回選んだボタンは次に時間が進んでいない時でも入力できてしまう//

import React, { useEffect ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/TypingGamePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import difficulty from "../data/difficulty.js";
import { useState } from "react";


function useTimer(initialTime = 20) {
  const navigate = useNavigate();
  // タイマーのカスタムフック
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime -1);
      }, 1000);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const reset = () => {
     stop();
     setTime(initialTime);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  useEffect(() => {
    if (time <= 0) {
      stop(); // タイマーを停止
      
      navigate("/ending"); // エンディング画面に遷移
      

    }
    return  
  },[time]); // クリーンアップ関数を返す
  return { time, isRunning, start, stop, reset };
}

function TypingGamePage() {
    // javaScriptが書ける↓
  const navigate = useNavigate();
  const game = useGame();
  
  const professor = professors.find((p) => p.id === game.chosenProfessorId);
  //const professortypingtext = 

  let key =null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputHistory, setInputHistory] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);
  const [mojinyuryoku, setMojinyuryoku] = useState();
  const [i,setI] = useState(0);
  const [j, setJ] = useState(0);
  const { time, isRunning, start, stop, reset } = useTimer();
  
  




  console.log("j",professor.typingTexts[j])
  console.log("youso1",professor.typingTexts[j][0][1])
  let targetText = professor.typingTexts[j][i][1];// タイピングゲームの対象テキスト

  const handleKeyDown = (e) => {
    if (!e.repeat) {
       
     key = e.key;

     if (currentIndex >= targetText.length) {

     
      return;

     };
 
     const isCorrect = key === targetText[currentIndex];
     setInputHistory((prev) => [
       ...prev,
       { char: key, correct: isCorrect }
     ]);
 
     if (isCorrect) {
       setCurrentIndex((prev) => prev + 1);
       game.updateLovepoint(professor.id, 1); // 好感度を1上げる
       if (currentIndex + 1 === targetText.length) {
        // setI(i + 1); // iを更新
        setJ(j + 1); // jを更新
        console.log("i",i)
        console.log("j",j)  
      setCurrentIndex(0);
      setClickedButton(null);
      stop(); // タイマーを一時停止
      
      game.updateLovepoint(professor.id, professor.typingTexts[j][i][2]); // 好感度を1上げる
      console.log("好感度",game.professorLovepointMap[professor.id])

       

      //あいうあいう
      if(professor.typingTexts.length - 1 ==j)  {
        console.log("ゲームクリア！");
      // setI(0); // iを更新
       setJ(0); // jを更新
       stop(); // タイマーを一時停止
       navigate("/ending"); // エンディング画面に遷移

      }

     } 
    }
    }
  };

  const handleClick = (buttonIndex,text) => {
    
    console.log("Button clicked:", buttonIndex);
    console.log("Text:", text); 
    const i = buttonIndex - 1; // ボタンのインデックスを取得
    setI(i); // iを更新
    targetText = text; // ボタンがクリックされたときに対象テキストを設定
    setClickedButton(buttonIndex);
    

    start(); // タイマーを開始
  };

  //  console.log(professor.typingTexts[j])
   useEffect(() => {
 
    stop(); // タイマーを一時停止
   },[])

  return (
    <>
    <div className="typing-game-page" onKeyDown={handleKeyDown}>
      <h1>Typing Game Page</h1>

      {/* 現在のゲーム状態を表示 */}
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <div className = "nokoritome" >
        残り時間{time}秒
      </div>

      <div>
{/* ボタン1 */}
      {clickedButton === null || clickedButton === 1 ? (
        <button onClick={() => handleClick(1,professor.typingTexts[j][0][1])}>
          <div>{professor.typingTexts[j][0][0]}</div>
          <div>{professor.typingTexts[j][0][1]}</div>
        </button>
      ) : null}
      <br/>

      {/* ボタン2 */}
      {clickedButton === null || clickedButton === 2 ? (
        <button onClick={() => handleClick(2,professor.typingTexts[j][1][1])}>
          <div>{professor.typingTexts[j][1][0]}</div>
          <div>{professor.typingTexts[j][1][1]}</div>
        </button>
      ) : null}
       <br/>

 {/* ボタン3 */}
      {clickedButton === null || clickedButton === 3 ? (
        <button onClick={() => handleClick(3,professor.typingTexts[j][2][1])}>
         <div>{professor.typingTexts[j][2][0]}</div>
         <div>{professor.typingTexts[j][2][1]}</div>
        </button>
      ) : null}
    </div>

      <br/>
      <input type="text" placeholder="タイピングしてください" 
         />

    <div>
      {targetText.split('').map((char, i) => {
      
        return (
        
            clickedButton !== null && (
              <span key={i} className={(i < currentIndex) ? 'correct' : (i === currentIndex) ? 'current' : 'ato'}>
                {char}
              </span>
            )
        );
      })}
      </div>
      {/* 選ばれた教授情報 */}
      {professor && (
        <div className="professor-info">
          <h2>{professor.name}への謝罪</h2>
          <p>{professor.explanation}</p>
        </div>
      )}

      {/* 難易度情報 */}

      {/* 次へ進むボタン（エンディング画面へ） */}
      <button onClick={() => navigate("/ending")}>エンディングへ</button>
    </div>
    <div> 
      履歴
    </div>
    <div className="currentpoints">
      You have {game.professorLovepointMap[professor.id]} points.
      </div>
      <div>
      {!j==0 &&  (<div className="tokutenpop">Bonus {professor.typingTexts[j][i][2]} points</div> )}</div>
    
    </>
  );
}

export default TypingGamePage;
