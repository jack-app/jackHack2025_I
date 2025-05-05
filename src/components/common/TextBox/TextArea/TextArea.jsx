
import "../../../../styles/components/common/TextBox/TextArea/TextArea.css"; // CSSスタイルをインポート(cssが適用されるようになる)

const TextArea = ({texts,noMoreScript}) => {
    
    //textsは["name","script"]が連なった２重配列
    /*
        example:    
        ["アロハ先生", "……お前といると、天気も気分も、最高なんだわ。"],
        ["あなた", "先生……僕も、もっと自由になりたいです。先生と一緒に。"],
        ["アロハ先生", "よーし、じゃあ一緒に世界旅でもするか？ もちろんアロハでな☆"]
    */
    return (
        <div className="text-area-container">
            <div className="text-area">
                {texts}
                {noMoreScript && (
                <div className="start-game-text">次へ進む</div>
            )}
            </div>
        </div>
    );
};

export default TextArea;