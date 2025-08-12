import React, { useEffect } from "react";
import Button from "./Button";
import useCalculator from "./useCalculator";

interface ButtonPanelProps {
  buttons: string[];
  onButtonClick: (value: string) => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ buttons }) => {
  const { calculator } = useCalculator();
  
  useEffect(() => {
    calculator.clear();
  }, [calculator]);

  return (
    <div className="calculator-buttons">
      {buttons.map((btn) => (
        <Button key={btn} value={btn} onClick={() => calculator.handleKey?.(btn)} />
      ))}
    </div>
  );
};

export default ButtonPanel;