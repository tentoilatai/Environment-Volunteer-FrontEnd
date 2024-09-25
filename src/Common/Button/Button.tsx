import React from 'react';
import './Button.scss'

type ButtonProps = {
  content: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ content, onClick, className, style, disabled }) => {
  return (
    <button
      className={`custom-button ${className ? className : ''}`}
      style={style}
      onClick={onClick}
      disabled={disabled}>
      <div className="custom-content">
        {content}
      </div>
    </button>
  );
}

export default Button;