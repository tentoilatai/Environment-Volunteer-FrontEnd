

import React, { useState } from "react";

import "./Modal-content.scss";

interface ModalContentProps {
  onClose: () => void;
  label: string;
  isOpen: boolean;
}

  const ModalContent: React.FC<ModalContentProps> = ({ onClose, label,isOpen }) => {
    return (
      <div className={`screen-below ${isOpen ? 'open' : 'close'}`} onClick={onClose}>
        <div className={`modal ${isOpen ? 'iopen' : 'iclose'}`} onClick={(e) => e.stopPropagation()} >
          <div className="modal-header">
            <h2>{label}</h2>
          </div>
          <hr className="modal-line" />
          <div className="modal-body">

            
          </div>
          <div className="modal-footer">
            <hr className="modal-line" />
          </div>
          {/* <div className="Button">
            <Button className="Cancel" onClick={onClose} content="Thoát" />
            <Button onClick={onClose} content="Lưu" />
          </div> */}
        </div>
      </div>
    );
  };

export default ModalContent;
