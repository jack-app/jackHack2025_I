import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGame } from "../../contexts/GameContext";
import "../../styles/components/common/lovepointbar.css";

function Lovepointbar() {
    console.log("Lovepointbar rendered");
    const game = useGame();
    const current = game.professorLovepointMap[game.chosenProfessorId];
    const max = 300;

    // 色を決定するロジック
    const getVariant = (value) => {
        if (value < 100) return "danger"; // 赤
        if (value < 200) return "warning"; // 黄色
        return "success"; // 緑
    };

    return (
        <div className="lovepoint-bar">
            <div className="progress-container">
                <div className="progress-divider" style={{ left: `${(100 / max) * 100}%` }}></div>
                <div className="progress-divider" style={{ left: `${(200 / max) * 100}%` }}></div>
                <ProgressBar
                    now={current}
                    max={max}
                    variant={getVariant(current)}
                    className="progress-bar"
                
                />
            </div>
            <div className="progress-text">
            </div>
        </div>
    );
}

export default Lovepointbar;