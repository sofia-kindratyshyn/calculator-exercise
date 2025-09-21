import React, { useCallback } from "react";
import Button from "./Button";

interface ButtonPanelProps {
  buttons: string[];
  onButtonClick: (value: string) => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  buttons,
  onButtonClick,
}) => {
  const handleButtonClick = useCallback((btn: string) => {
    onButtonClick(btn);
  }, [onButtonClick]);

  return (
    <div className="calculator-buttons">
      {buttons.map((btn) => (
        <Button
          key={btn}
          value={btn}
          onClick={() => handleButtonClick(btn)}
        />
      ))}
    </div>
  );
};

export default ButtonPanel;
