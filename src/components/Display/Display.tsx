import React from "react";
import { displayValue } from "../../types/types";

const Display: React.FC<{
  value: displayValue | undefined;
  operand: number;
  expression?: string;
}> = ({ value, expression }) => (
  <div className="calculator-display">
    <div className="calculator-expression">{expression || ""}</div>
    <div className="calculator-input">{value || "0"}</div>
  </div>
);

export default Display;
