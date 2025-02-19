import React from "react";
import "../../WarningDelete/WarningDeletePopup.scss";
import Button from "../../Button/Button";

type Props = {
  onClose: () => void;
  confirm: () => void; // Chỉ nhận ID
  isOpen: boolean;
  dataType?: string;
};

const ConfirmForm: React.FC<Props> = ({
  onClose,
  confirm,
  isOpen,
  dataType,
}) => {
  return (
    <div
      className={`modal-warning-overlay ${isOpen ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className={`modal-delete ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Thông báo!</h1>
        <div className="form-input">
          <h2>Xác nhận {dataType} ?</h2>
        </div>
        <div className="form-btn">
          <Button label="Huỷ" onClick={onClose} className="btn-exit" />
          <Button
            label="Xác nhận"
            onClick={() => confirm()}
            className="btn-delete"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;
