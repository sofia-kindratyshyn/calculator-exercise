import React, { useCallback } from "react";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import { withCalculatorProxy } from "./withCalculatorProxy";
import { useDisplayValue } from "./useDisplayValue";
import { displayValue } from "./types";
import "./App.css";

// Move buttons array outside component to prevent recreation on every render
const BUTTONS = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
  "C",
];

const Calculator: React.FC<{ proxiedService?: any }> = ({ proxiedService }) => {
  const displayValue = useDisplayValue();

  const handleButtonClick = useCallback((key: string) => {
    if (proxiedService) {
      proxiedService.service.handleKey(key);
    }
  }, [proxiedService]);

  return (
    <div className="calculator-container">
      <Display value={displayValue as displayValue} />
      <ButtonPanel buttons={BUTTONS} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default withCalculatorProxy(Calculator);
