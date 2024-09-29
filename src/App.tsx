import React, { useState } from "react";
import "./App.scss";
import Button from "./Common/Button/Button.tsx";
import DropDownField, { optionType } from "./Common/Input/DropDown/DropDownField.tsx";
import { createPortal } from 'react-dom';
import ModalContent from './Common/modal/modal-conten.tsx';


function App() {
  const [selected1, setSelected1] = useState<optionType | null>(null);
  const [selected2, setSelected2] = useState<optionType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // Trạng thái cho modal

  // Dữ liệu cho dropdown
  const newArr = new Array(15).fill(null);
  const fakeOptions1 = newArr.map((_, index) => ({
    value: `option${index}`,
    label: `Lựa chọn số ${index}`,
  }));
  const fakeOptions2 = newArr.map((_, index) => ({
    value: `option${index}`,
    label: `Option ${index}`,
  }));
  


  return (
    <div className="App">
      <DropDownField
        options={fakeOptions1}
        onChange={setSelected1}
        selected={selected1?.label}
      />
      <DropDownField
        options={fakeOptions2}
        onChange={setSelected2}
        selected={selected2?.label}
      />
   
      <Button 
        content="Show modal" 
        onClick={() => setShowModal(true)} 
        disabled={showModal}
      />
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} label='Thêm mới bảng lương'/>,
        document.body
      )}
      
    </div>
  );
}

export default App;