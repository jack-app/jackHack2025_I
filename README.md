# jackhack team i

## 開発の流れ

### 開発を始める方法

端末(PowerShell とか，VSCode の下に出てくるやつとか，かっこいい感じの画面とか呼ばれるやつ)を用意する

その端末で???/jackHack2025_I ディレクトリまで cd コマンドを用いて移動する．

```bash
npm run dev
```

http://localhost:5173/
にアクセスすると見れる!

### 開発中の動き

ソースコードを書き換える．
ソースコードを Ctrl-S で保存する．
ソースコードが http://localhost:5173/ に反映される．
github に作業を適応する方法
作業が一区切りついたら実行してほしい

```
git add -A
git status
git commit -m "<英単語> (エンターキー) 詳細説明"
git push origin HEAD
```

### 開発終了するとき

こんな感じになってるターミナルで　 ctrl + C で終われます！

```bash
> 2025-jackhack@0.0.0 dev
> vite


  VITE v6.3.3  ready in 315 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## もし困ったら

1. 先輩に聞く

- 画面を見せる
- エラー文を slack とかに貼る

2. エラー文を google や chatgpt などを使って聞いてみる

- 何をどう困っているかを言語化できると gpt と上手く付き合って行けるよ！

## 仕組み

今回は React を使います！
React は、「HTML っぽいこと（JSX）」と「動き（JavaScript）」を同じ場所に書ける超便利な道具です！

JSX は HTML にそっくりだけど、実は JavaScript の世界で動いているだけです！

「画面作る ➔ 動きつける ➔ 見た目整える(CSS)」この流れだけ覚えれば OK！

.jsx という拡張子のページの中身説明

```jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // 画面遷移するために使う
import { useGame } from "../contexts/GameContext"; // ゲームの状態（難易度など）を取得するために使う
import testImage from "../assets/professor/test.png"; // 画像をインポート
import "../styles/pages/HomePage.css"; // CSSスタイルをインポート(cssが適用されるようになる)
function HomePage() {
  // ✅ ここは普通にJavaScript
  const navigate = useNavigate();
  const game = useGame();

  // もし関数を作りたかったらここに書ける
  const handleClick = () => {
    console.log("ボタンが押された！");
  };

  // ✅ useEffectでページ読み込み後にやる処理を書く
  useEffect(() => {
    console.log("HomePageが表示されたよ！");
  }, []);

  // ✅ ここから画面に出すHTML部分（JSX）
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <img src={testImage} alt="画像test" style={{ width: "20%" }} />
      {/* 「ゲームスタート」ボタンを押すと /difficulty に移動 */}
      <button onClick={handleClick}>スタートボタン</button>
    </div>
  );
}
```

## ディレクトリ構成

```pl
src/
├── assets/         # 画像やスタイル（CSS）を置く場所
│   ├── professor/  # 教授の画像ファイル（例: test.png）
│   ├── puzzle/     # パズル用の画像ファイル（例: react.svg）
├── components/     # 実際の画面を作る部品（コンポーネント）
│   ├── common/     # 汎用的なパーツ（例: 共通ボタンなど）
│   ├── puzzle/     # パズル専用の部品
│   ├── typing/     # タイピング専用の部品
├──pages/      # それぞれのページ
│   ├── HomePage.jsx
│   ├── PuzzlePage.jsx
│   ├── TypingGamePage.jsx
│   ├── ProfessorSelectPage.jsx
│   ├── ProfessorExplainPage.jsx
│   ├── MidStoryPage.jsx
│   ├── DifficultySelectPage.jsx
│   └── EndingPage.jsx
│
├── contexts/       # アプリ全体で使う「状態管理」（GameContextなど）
│   └── GameContext.jsx
├── data/           # データファイル（例: 教授データ、難易度設定）
│   ├── professor.js
│   └── difficulty.js
├── routes/         # ページの切り替え設定（ルーティング管理）
│   └── AppRouter.jsx
├──styles/     # CSSファイルをまとめる場所
│   ├── base/        # リセットCSSや全体の基本スタイル
│   ├── components/  # コンポーネント単位のスタイル
│   └── pages/       # ページ単位のスタイル
│       ├── HomePage.css
│       ├── PuzzlePage.css
│       ├── TypingGamePage.css
│       ├── ProfessorSelectPage.css
│       ├── ProfessorExplainPage.css
│       ├── MidStoryPage.css
│       ├── DifficultySelectPage.css
│       └── EndingPage.css
├── App.jsx         # アプリの全体の構成を書く場所（Providerで囲うなど）
├── main.jsx        # プログラムの起動地点（Reactアプリのエントリーポイント）

```

## GameContext(状態管理)って何？

1. GameContext は何をしているの？
   ▶️ 一言でいうと…
   「どのページでも共通して使いたいデータをまとめて管理するための仕組み」
   です！
2. なぜ必要なの？
   ▶️ アプリが大きくなると

   - 難易度（easy/normal/hard）
   - 選んだ教授リスト
   - 現在選択中の教授
   - 各教授の好感度（ラブポイント）
   - タイピングの何回目か（ラウンド）
     こういうデータをいろんなページで共有したくなります
     でも、毎回 props で渡してたら超面倒だし、バグりやすい！
     だから 👉 GameContext にまとめておくと、どこからでも簡単に使える！という仕組みになっています！

3. どうやって使ってるの？
   ▶️ 基本の使い空は 2 つ
   (1) Context からデータ・関数を取り出す
   たとえば、HomePage.jsx では 👇

   ```jsx
   import { useGame } from "../contexts/GameContext";
   // 他の色々のコード
   const game = useGame();
   ```

   ✅ これで、

   ```
   game.difficulty
   game.selectedProfessors
   game.updateLovepoint()
   ```

   みたいにデータも関数も取り出せる！

   (2) 取り出したデータや関数を使う
   例えば：

   ```
   難易度をセットする → game.setDifficulty("easy")
   教授を selectedProfessors(list)に追加する → game.addProfessor(1) (ID で追加する)
   好感度を更新する → game.updateLovepoint(1, 10) (教授の ID, 増減する数)のようにする
   攻略する教授を一人選ぶ ➔game.setChosenProfessorId(1)
   タイピングゲームの次のラウンドに進む関数
   ```

   みたいに、どのページからでも自由に操作できる！
   ➔ 新入生のみなさんには、タイピングゲームや、パズルゲームを作ってもらうけれど、ゲーム全体で必要となる要素をこれを使って操作できるようになります！

4. 保存について
   ▶️ 現在の GameContext は、React の状態 (useState) と sessionStorage を連携させており以下の仕組みになってます！：
   - ユーザーがページをリロードしても状態が保持される
   - 状態変更時に自動で保存される
   - tab を消したり、resetGame をすると sessionStorage も消去される

### how to deploy

1. 事前準備(1 回だけ実行する！デプロイし直すときはこの操作はいらないです)

```bash
npm install gh-pages --save-dev
```

2. package.json を修正(1 回だけ実行する！デプロイし直すときはこの操作はいらないです)

```json

  "name": "2025-jackhack",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist" // 追加
  },
```

3. デプロイ実行

```
npm run deploy
```

➔2~3 分後に反映されます！
https://jack-app.github.io/jackHack2025_I/
