import React, { MouseEventHandler } from "react";

interface ButtonProps {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = React.memo(({ value, onClick }) => (
  <button
    className={`calc-btn calc-btn-${value}`}
    onClick={onClick}
  >
    {value}
  </button>
));

Button.displayName = 'Button';

export default Button;