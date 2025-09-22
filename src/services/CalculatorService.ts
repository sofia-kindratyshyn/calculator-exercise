import { CalculatorService as CalculatorServiceType } from "../types/types";

export default class CalculatorService implements CalculatorServiceType {
  private displayValue: string = "0";
  private firstOperand: number | null = null;
  private waitingForOperand: boolean = false;
  private operator: string | null = null;
  private expression: string = "";
  private callback: any;
  private expressionCallback: any;

  constructor(callback: any, expressionCallback?: any) {
    this.callback = callback;
    this.expressionCallback = expressionCallback;
  }

  // Handle digit or dot input
  public inputDigit(digit: any): void {
    if (this.waitingForOperand) {
      this.displayValue = digit === "." ? "0." : digit;
      this.waitingForOperand = false;
    } else {
      if (digit === "." && this.displayValue.includes(".")) return;
      this.displayValue =
        this.displayValue === "0" && digit !== "."
          ? digit
          : this.displayValue + digit;
    }

    if (this.operator && this.firstOperand !== null) {
      this.expression = `${this.firstOperand}${this.operator}${this.displayValue}`;
    } else {
      this.expression = this.displayValue;
    }

    if (this.expressionCallback) this.expressionCallback(this.expression);
    this.callback(this.displayValue);
  }

  // Handle operator input
  public inputOperator(nextOperator: any): void {
    const inputValue = parseFloat(this.displayValue);
    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performOperation(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = String(result);
      this.firstOperand = result;
      this.callback(this.displayValue);
    }
    this.operator = nextOperator;
    this.waitingForOperand = true;

    // Update expression to show operator
    if (this.firstOperand !== null) {
      this.expression = `${this.firstOperand}${this.operator}`;
      if (this.expressionCallback) this.expressionCallback(this.expression);
    }
  }

  // Perform calculation
  private performOperation(
    first: number,
    second: number,
    operator: string
  ): number {
    let result: number;
    switch (operator) {
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "*":
        result = first * second;
        break;
      case "/":
        result = second !== 0 ? first / second : NaN;
        break;
      default:
        result = second;
    }

    return Math.round(result * 100000000) / 100000000;
  }

  // Handle equals
  public inputEquals(): void {
    if (this.operator && this.firstOperand !== null) {
      const inputValue = parseFloat(this.displayValue);
      const result = this.performOperation(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = String(result);
      this.firstOperand = null;
      this.operator = null;
      this.waitingForOperand = false;
      this.callback(this.displayValue);
    }
  }

  // Clear all state
  public clear(): void {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.expression = "";
    if (this.expressionCallback) this.expressionCallback(this.expression);
    this.callback(this.displayValue);
  }

  public delete(): void {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = "0";
    }

    if (this.operator && this.firstOperand !== null) {
      this.expression = `${this.firstOperand}${this.operator}${this.displayValue}`;
    } else {
      this.expression = this.displayValue;
    }

    if (this.expressionCallback) this.expressionCallback(this.expression);
    this.callback(this.displayValue);
  }

  // Get current display value
  public getDisplayValue(): string {
    return this.displayValue;
  }

  // Get current expression
  public getExpression(): string {
    return this.expression;
  }

  // Main handler for key input
  public handleKey = (key: any): void => {
    if (/^[0-9]$/.test(key) || key === ".") {
      this.inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      this.inputOperator(key);
    } else if (key === "=") {
      this.inputEquals();
    } else if (key === "C") {
      this.clear();
    } else if (key === "DEL") {
      this.delete();
    }
  };
}
