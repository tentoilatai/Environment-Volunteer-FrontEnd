import { optionType } from "../DropDownField.tsx";

// Hook dùng để xử lý sự kiện thay đổi lựa chọn và toggle dropdown
const useOnChange = (
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>,
  selectedOption: optionType | null,
  setSelectedOption: React.Dispatch<React.SetStateAction<optionType | null>>,
  onChange: (option: optionType) => void
) => {
  // Xử lý sự kiện chọn option
  const handleOptionSelect = (option: optionType) => {
    setSelectedOption(option);
    onChange(option);
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  // Toggle trạng thái mở/đóng của dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return {
    handleOptionSelect,
    toggleDropdown,
  };
};

export default useOnChange;
