import React, { useState,useRef} from "react";
import "./DropDownField.scss";
import Button from "../../Button/Button.tsx";
import useOnChange from "./hooks/useOnChange.tsx";
import useClickOutSide from "./hooks/useClickOutSide.tsx";

export interface optionType {
  value: string;
  label: string;
}

interface InputDropdownProps {
  options: optionType[];
  onChange: (e: optionType) => void;
  selected: string | undefined;
  placeholder?: string;
}

const DropDownField: React.FC<InputDropdownProps> = ({ 
  options,
  onChange,
  selected, 
  placeholder,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutSide(dropdownRef, setIsDropdownOpen);
  const { handleOptionSelect, toggleDropdown } = useOnChange(
    setIsDropdownOpen,
    selectedOption,
    setSelectedOption,
    onChange
  );

 

  return (
    <div className="input-dropdown" ref={dropdownRef}>
      <Button
        className={`input-show ${
          isDropdownOpen ? "input-show-open" : "input-show-close"
        }`}
        onClick={toggleDropdown}
        content={
          <div className="flex-between">
            <div
              className={`selected-text ${
                selected ? "selected-text-option" : ""
              }`}
            >
              {selected ? selected :placeholder|| "Chọn"}
              
            </div>
            <div className="dropdown">
              <div className={isDropdownOpen ? "icon-open" : "icon-close"}>
                <div className="drop-icon" style={{width:20}}/>
              </div>
            </div>
          </div>
        }
      />

      <ul
        className={`dropdown-list ${
          isDropdownOpen ? "dropdown-list-open" : "dropdown-list-close"
        }`}
      >
        <div className="list-wrapper">
          {options.map((option, index) => (
            <div className="list">
              <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={
                 selectedOption?.value === option.value
                  ? "selected-option"
                  : "option"
              }
            >
              {option.label}
            </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default DropDownField;