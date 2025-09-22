import React, { useState, useEffect } from "react";
import ButtonPanel from "../ButtonPannel/ButtonPanel";
import Display from "../Display/Display";
import { withCalculatorProxy } from "../../services/withCalculatorProxy";
import { useDisplayValue } from "../../services/useDisplayValue";
import { displayValue } from "../../types/types";
import "./App.css";

const Calculator: React.FC<{ proxiedService?: any }> = ({ proxiedService }) => {
  const [localDisplay, setLocalDisplay] = useState<string>("");
  const displayValue = useDisplayValue();

  useEffect(() => {
    setLocalDisplay(displayValue);
  }, [displayValue]);

  useEffect(() => {}, [localDisplay]);

  const buttons = [
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

  const handleButtonClick = (key: string) => {
    if (proxiedService) {
      proxiedService.service.handleKey(key);
    }
  };

  return (
    <div className="calculator-container">
      <Display value={localDisplay as displayValue} operand={0} />
      <ButtonPanel buttons={buttons} onButtonClick={handleButtonClick} />
    </div>
  );
};

export default withCalculatorProxy(Calculator);
