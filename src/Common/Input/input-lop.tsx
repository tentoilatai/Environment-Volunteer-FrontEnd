import React, { useState } from "react";
import "./Input.scss";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
};

const Input_lop: React.FC<InputProps> = ({
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
      <div className="lop-icon" /> {/* Thêm thẻ div cho icon kính lúp */}
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input_lop;
