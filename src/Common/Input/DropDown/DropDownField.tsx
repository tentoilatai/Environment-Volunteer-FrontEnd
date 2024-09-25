import React, { useState } from "react";
import "./DropDownField.scss";
import Button from '../../Button/Button.tsx';

export interface optionType {
  value: string;
  label: string;
}

interface InputDropdownProps {
  options: optionType[];
}

const DropDownField: React.FC<InputDropdownProps> = ({ options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const [rotationCount, setRotationCount] = useState(0); // Thêm state để đếm số lần nhấp

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setRotationCount(rotationCount + 1); // Tăng số lần nhấp
  };

  const handleOptionSelect = (option: optionType) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="input-dropdown">
      <Button
        className="input-show"
        onClick={toggleDropdown}
        content={
          <div className="flex-between">
            <div className="selected-text">
              {selectedOption ? selectedOption.label : "Chọn"}
            </div>
            <div className="dropdown">
              <img 
                src={'/icon-button/Vector.png'} 
                alt="dropdown icon" 
                className="dropdown-icon" 
                style={{ transform: `rotate(${rotationCount * 180}deg)` }} // Quay icon theo số lần nhấp
              />
            </div>
          </div>
        }
      />

      <ul
        className={`dropdown-list ${isDropdownOpen ? "dropdown-list-open" : "dropdown-list-close"}`}
      >
        {options.map((option, index) => (
          <li 
            key={index} 
            onClick={() => handleOptionSelect(option)}
            className={selectedOption?.value === option.value ? 'selected-option' : ''}
          >
            {option.label}
          </li>
        ))}

      </ul>
    </div>
  );
};

export default DropDownField;
