// TypingGamePage（タイピングゲーム画面）
// 教授とのタイピング対決を行う
// （実際にはここでタイピング入力エリアを作る予定）

//**　bug 前回選んだボタンは次に時間が進んでいない時でも入力できてしまう//

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../contexts/GameContext";
import "../styles/pages/TypingGamePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
import professors from "../data/professor.js";
import difficulty from "../data/difficulty.js";
import { useState } from "react";
import backgroundimage from "../assets/background/typinggame.svg";
import TopLeftButtons from "../components/common/TopLeftButtons"; // ← 追加
import difficultySettings from "../data/difficulty.js";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'



let nanido = 0; // 難易度を初期化

//hard,normal,easyのいずれか



function TypingGamePage() {

  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの状態を管理
  const [result, setResult] = useState(false); // リザルトの状態を管理

  useEffect(() => {
    // ページが読み込まれたときにモーダルを表示
    if (game.typingRound === 1) {
    setIsModalOpen(true);
  } }, []); // 初回レンダリング時に実行

  const closeModal = () => {
    setIsModalOpen(false); // モーダルを閉じる
  };

  const closeresult = () => {
    setResult(false); // リザルトを閉じる
    if(game.typingRound >=4) {
      navigate("/ending"); // エンディング画面に遷移
      }else{ navigate("/mid-story");} // パズル画面に遷移
    }

  

  function useTimer(initialTime = nanido) {
    //難易度によって時間変わる
    const navigate = useNavigate();
    // タイマーのカスタムフック
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
  
    const start = () => {
      if (!isRunning) {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => prevTime - 1);
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
        game.nextTypingRound();
        setResult(true); // リザルトを表示
  
      }
      return
    }, [time]); // クリーンアップ関数を返す
    return { time, isRunning, start, stop, reset };
  }

  const navigate = useNavigate();
  const game = useGame();





  
if (game.difficulty === difficultySettings.easy.level) {
  nanido = 40;
} else if (game.difficulty === difficultySettings.normal.level) {
  nanido = 20;
} else if (game.difficulty === difficultySettings.hard.level) {
  nanido = 15;
} else {
  nanido = 5;
  console.error("Invalid difficulty level:", difficulty);
}
console.log("nanido", nanido)
console.log("difficultySettings", difficultySettings)
console.log("difficulty", difficulty)
console.log("難易度", difficultySettings.level)


const { time, isRunning, start, stop, reset } = useTimer();
  // タイマーを使用するためのカスタムフックを呼び出す
  // javaScriptが書ける↓


  const professor = professors.find((p) => p.id === game.chosenProfessorId);
  //const professortypingtext = 

  let key = null;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputHistory, setInputHistory] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);
  const [mojinyuryoku, setMojinyuryoku] = useState();
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [start_button, setStartButton] = useState(false);
  



  console.log("j", professor.typingTexts[j])
  console.log("youso1", professor.typingTexts[j][0][1])
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
          console.log("i", i)
          console.log("j", j)
          setCurrentIndex(0);
          setClickedButton(null);
          stop(); // タイマーを一時停止
          console.log("key", key);


          game.updateLovepoint(professor.id, professor.typingTexts[j][i][2]); // 好感度を1上げる
          console.log("好感度", game.professorLovepointMap[professor.id])
          console.log("key", key);


          //あいうあいう
          if (professor.typingTexts.length - 1 == j) {
            console.log("ゲームクリア！");
            // setI(0); // iを更新
            setJ(0); // jを更新
            stop(); // タイマーを一時停止

            game.nextTypingRound();
            setResult(true); // リザルトを表示
            

          }

        }
      }
    }
  };

  const handleClick = (buttonIndex, text) => {

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
    
  }, [])


  return (
    <div style={{
      backgroundImage: `url(${backgroundimage})`,
      height: "100vh",
      backgroundSize: "cover",
      
      
    }}>
      <br />
      <button  className="info_button"onClick={() => setIsModalOpen(true)}>Info</button>
      
       {/* モーダル */}
       {isModalOpen && //**game.typingRound ===1 &&**// 
       (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>タイピングゲーム<br />教授へ謝罪メールを送ろう</h2>
            <p>あなたは授業を休んでしまった。このまま何も連絡を入れないと相手の心証が悪く落単になってしますかもしれない。<br />
              どうにかして誠意の込めたメールを送って教授の好感度を上げよう！
            </p>
            
            <p>
              ルール：<br />
              1. まず、教授に<dev className="highlight_tekisetu">"適切な"</dev>文章を選ぼう<br />
              2. 選んだ文章を<dev className="highlight_tekisetu">"タイピング"</dev>しよう<br />
              　　　<dev className="highlight_green">＊ポイント：相手の教授が好みそうな文章を選ぶとボーナスポイント</dev><br />
              <dev className="highlight_tekisetu">しかし、相手の教授が好まない文章を選ぶとマイナスポイント</dev><br />
              3. 制限時間内にタイピングしよう
            </p>

            <button onClick={closeModal}>閉じる</button>
          </div>
        </div>
      )}
      {/* リザルト */}
      {result && 
       (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>リザルト</h2>
            <p>あなたの教授への謝罪メールは何ポイント
            </p>
            
            <p>
              あなたは飛行機級です
            </p>

            <button onClick={() => closeresult()}>次へ進む

            </button>

           

            
          </div>
        </div>
      )}




      <TopLeftButtons /> {/* ← ここで表示させます */}
    <div className="game-timer">
  <CountdownCircleTimer
    isPlaying={isRunning}
    isSmoothColorTransition
    duration={nanido}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >  
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer> </div>


      <div className="typing-game-page" onKeyDown={handleKeyDown}
      >
        <h6>授業を休んでしまった
          教授にメールを送ろう！
          <br />
          
        </h6>

        {/* 現在のゲーム状態を表示<pre>{JSON.stringify(game, null, 2)}</pre> */}


        <div className="nokoritime" >
          残り時間{time}秒
        </div>

        <div>
          {!start_button &&
          (<button onClick={() => setStartButton(true)} className="start-button-maru">
            
            スタート
            <br />
          </button>)
          }
          </div>
        


        

        <div>
          {start_button && (
            <>
              {/* ボタン1 */}
              {clickedButton === null || clickedButton === 1 ? (
                <button className="problem" onClick={() => handleClick(1, professor.typingTexts[j][0][1])}>
                  <div>{professor.typingTexts[j][0][0]}</div>
                  <div>{professor.typingTexts[j][0][1]}</div>
                </button>
              ) : null}
              <br />

              {/* ボタン2 */}
              {clickedButton === null || clickedButton === 2 ? (
                <button className="problem" onClick={() => handleClick(2, professor.typingTexts[j][1][1])}>
                  <div>{professor.typingTexts[j][1][0]}</div>
                  <div>{professor.typingTexts[j][1][1]}</div>
                </button>
              ) : null}
              <br />

              {/* ボタン3 */}
              {clickedButton === null || clickedButton === 3 ? (
                <button className="problem" onClick={() => handleClick(3, professor.typingTexts[j][2][1])}>
                  <div>{professor.typingTexts[j][2][0]}</div>
                  <div>{professor.typingTexts[j][2][1]}</div>
                </button>
              ) : null}
            </>
          )}
        </div>

        <br />


          


        <div className="kaitou">
          {targetText.split('').map((char, i) => {

            return (

              clickedButton !== null && (
                // <div className="nyuuryokuran">
                <span key={i} className={(i < currentIndex) ? 'correct' : (i === currentIndex) ? 'current' : 'ato'}>
                  {char}
                </span>
                // </div>
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
      <div className="bonus">
        {!j == 0 && (<div className="tokutenpop">Bonus {professor.typingTexts[j][i][2]} points</div>)}</div>
        <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>



  );
}

export default TypingGamePage;
