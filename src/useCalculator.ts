import { useState } from "react";
import CalculatorService from "./CalculatorService";

export default function useCalculator() {
  const [value, setValue] = useState("");
  const [calculator] = useState(new CalculatorService(setValue));

  // As we dont have update effect, we need to update value manually
  setInterval(() => {
    setValue(calculator.getDisplayValue());
  }, 100);

  return {
    calculator,
    value,
  };
}
