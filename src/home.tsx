import React, { useState } from "react";
import "./App.scss";
import Button from "./Common/Button/Button.tsx";
import DropDownField, {
  optionType,
} from "./Common/Input/DropDown/DropDownField.tsx";
import { createPortal } from "react-dom";
import ModalContent from "./Common/modal/modal-conten.tsx";
import Table from "./Common/table/table.tsx";
import Input from "./Common/Input/input-lop.tsx";

import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./redux/store.ts";
import { appActions } from "./redux/appSlice.ts";

function App() {
  // const [selected1, setSelected1] = useState<optionType | null>(null);
  // const [selected2, setSelected2] = useState<optionType | null>(null);
  // const [showModal, setShowModal] = useState<boolean>(false); // Trạng thái cho modal
  // const [inputValue, setInputValue] = useState<string>("");

  const dispatch = useAppDispatch();
  const selected1 = useAppSelector((state) => state.app.selected1);
  const inputValue = useAppSelector((state) => state.app.inputValue);

  // Dữ liệu cho dropdown
  // const newArr = new Array(15).fill(null);
  // const fakeOptions1 = newArr.map((_, index) => ({
  //   value: `option${index}`,
  //   label: `Lựa chọn số ${index}`,
  // }));
  // const fakeOptions2 = newArr.map((_, index) => ({
  //   value: `option${index}`,
  //   label: `Option ${index}`,
  // }));

  const data = [
    {
      maNV: "123456",
      tenNV: "Phạm Anh Vũ",
      mucLuong: 12000000,
      ngayCong: 22,
      thucNhan: "10.000.000",
    },
    {
      maNV: "654321",
      tenNV: "Nguyễn Văn B",
      mucLuong: 15000000,
      ngayCong: 22,
      thucNhan: "12.000.000",
    },
    {
      maNV: "987654",
      mucLuong: 12000000,
      ngayCong: 20,
      tenNV: "Trần Thị C",
      thucNhan: "12.000.000",
    },
    {
      maNV: "987654",
      tenNV: "Trần Thị C",
      mucLuong: 13000000,
      ngayCong: 20,
      thucNhan: "12.000.000",
    },
    // Có thể thêm nhiều đối tượng hơn
  ];
  const columnNames = {
    maNV: {
      label: "Mã Nhân Viên",
      render: (label: string) => <span style={{ color: "blue" }}>{label}</span>,
    },
    mucLuong: {
      label: "Mức Lương",
      render: (label: string) => (
        <span>{Number(label).toLocaleString("vi-VN")}</span>
      ),
    },
    ngayCong: { label: "Ngày Công" },
    tenNV: {
      label: "Tên Nhân Viên",
      render: (label: string) => (
        <span
          onClick={() => console.log(label)}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {label}
        </span>
      ),
    },
    thucNhan: { label: "Thực Nhận" },
  };

  // Tạo danh sách mức lương không trùng lặp cho dropdown
  const uniqueSalaries = [
    { value: "all", label: "Tất cả" },
    ...Array.from(new Set(data.map((item) => item.mucLuong))).map((salary) => ({
      value: salary.toString(),
      label: salary.toLocaleString("vi-VN"),
    })),
  ];

  // Hàm lọc dữ liệu theo tên và mức lương
  const filteredData = data.filter((item) => {
    const matchesName = item.tenNV
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const matchesSalary =
      selected1 === null ||
      selected1.value === "all" ||
      item.mucLuong.toString() === selected1.value;
    return matchesName && matchesSalary;
  });

  return (
    <>
      {/* <div className="App">
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
        {createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            label="Thêm mới bảng lương"
            isOpen={showModal} // Truyền isOpen vào đây
          />,
          document.body
        )}
      </div> */}

      <div>
        <h1>Bảng Nhân Viên</h1>
        <div className="Fillter">
          <div className="seach">
            <Input
              value={inputValue}
              // onChange={setInputValue}
              onChange={(value) => dispatch(appActions.setInputValue(value))}
              placeholder="Nhập tên nhân viên"
            />
          </div>
          <div className="option">
            <DropDownField
              options={uniqueSalaries}
              // onChange={setSelected1}
              onChange={(option) => dispatch(appActions.setSelected1(option))}
              selected={selected1?.label}
              placeholder="Lọc theo mức lương"
            />
          </div>
        </div>
        <Table data={filteredData} columnNames={columnNames} />
      </div>
    </>
  );
}

export default App;