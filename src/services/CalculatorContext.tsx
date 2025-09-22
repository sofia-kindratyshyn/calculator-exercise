import React, { createContext, useContext, useRef, useState } from "react";
import CalculatorService from "../services/CalculatorService";

interface CalculatorContextProps {
  service: CalculatorService;
  displayValue: string;
  setDisplayValue: (value: string) => void;
  expression: string;
  setExpression: (value: string) => void;
}

const CalculatorContext = createContext<CalculatorContextProps | undefined>(
  undefined
);

export const useCalculatorContext = () => {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("CalculatorContext not found");
  return { ...ctx, displayValue: ctx.displayValue };
};

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  // @ts-ignore
  const serviceRef = useRef<CalculatorService>();
  if (!serviceRef.current) {
    serviceRef.current = new CalculatorService(setDisplayValue, setExpression);
  }
  return (
    <CalculatorContext.Provider
      value={{ 
        service: serviceRef.current, 
        displayValue, 
        setDisplayValue,
        expression,
        setExpression
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
