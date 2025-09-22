import React from "react";
import { displayValue } from "../../types/types";

const Display: React.FC<{
  value: displayValue | undefined;
  operand: number;
}> = ({ value }) => (
  <div className="calculator-display">
    <div className="calculator-input">{value || "0"}</div>
  </div>
);

export default Display;
