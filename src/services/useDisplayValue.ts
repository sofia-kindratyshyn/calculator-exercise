import { useCalculatorContext } from "../services/CalculatorContext";
import { useCallback, useMemo } from "react";

// returns string value for calculator's "display"
export function useDisplayValue() {
  const { displayValue } = useCalculatorContext();
  const getValue = useCallback(() => displayValue, [displayValue]);
  return useMemo(() => getValue(), [getValue]);
}
