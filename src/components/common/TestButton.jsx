import React from "react";
import "../../styles/components/common/TestButton.css";

const TestButton = ({ onClick, children }) => {
  return (
    <button className="test-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default TestButton;