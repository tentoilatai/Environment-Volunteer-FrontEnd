import React, { useState } from "react";
import "./Input.scss";

type InputProps = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Nhận event thay vì string
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string; 
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  className,
  style,
  placeholder,
}) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <div
      className={`custom-input ${isFocus ? "custom-input-focus" : ""} ${
        className ? className : ""
      }`}
      style={style}
    >
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        disabled={disabled}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}  // Truyền event thay vì e.target.value
      />
    </div>
  );
};

export default Input;
