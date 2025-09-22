export interface CalculatorService {
  handleKey?: (key: any) => void;
  getDisplayValue?: () => string;
  getExpression?: () => string;
}
export type displayValue = string & { __brand: "displayValue" };
