// src/components/common/PuzzleGridCheck.jsx

// import React from "react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import settingsIcon from "../../assets/professor/setting.png";
import helpIcon from "../../assets/professor/help.png";
import "../../styles/pages/PuzzlePage.css";

/**
 * @param {object} props
 * @param {number} props.resolution 1単位あたりのピクセル数(刻み幅)
 */
const PuzzleGridCheck = ({ resolution = 10}) => { // 10px で１単位
    const navigate = useNavigate();
    const rows = 6;
    const cols = 5;

    // grid-container の位置・サイズ取得
    const containerRef = useRef(null);

    // マウスの動きを取得
    const handleMouseMove = (e) => {
        // グリッドの座標と大きさを取得
        const rect = containerRef.current.getBoundingClientRect();

        // ビューポート座標　→　グリッド内部の相対座標(px)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const i = y / resolution;
        const j = x / resolution;
        console.log(`i: ${i.toFixed(2)}, j: ${j.toFixed(2)}`); // 小数点以下の桁数を指定
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // セルの作成
    const cells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            cells.push(
                <div
                    key={`${r}-${c}`}
                    className="grid-cell"
                    data-row={r}
                    data-col={c}
                />
            );
        }
    }

    return (
        <div className="grid-wrapper">
            {/* 左上ボタン */}
            <div className="top-left-buttons">
                <button className="icon-button" onClick={() => navigate("/settings")}>
                    <img src={settingsIcon} alt="設定" className="icon-image" />    
                </button>
                <button className="icon-button" onClick={() => navigate("/help")}>
                    <img src={helpIcon} alt="ヘルプ" className="icon-button" />
                </button>
            </div>

            <div ref={containerRef} className="grid-container">
                {cells}
            </div>
        </div>
    );
};

export default PuzzleGridCheck;

