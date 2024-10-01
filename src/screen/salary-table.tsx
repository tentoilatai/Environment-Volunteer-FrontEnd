import React, { useState, useEffect, useRef } from "react";
import "./salary-table.scss";
import DropDownField from "../Common/Input/DropDown/DropDownField.tsx";
import Table from "../Common/table/table.tsx";
import Input from "../Common/Input/input-lop.tsx";
import Pagination from "../Common/pagination/pagination.tsx";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { appActions } from "../redux/appSlice.ts";

function App() {
  const dispatch = useAppDispatch();
  const selected1 = useAppSelector((state) => state.app.selected1);
  const inputValue = useAppSelector((state) => state.app.inputValue);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const data = [
    { tenBL: "Bảng lương tháng 1/2023", Kyluong: "26/12/2022 -25/02/2023 1" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm PM", Kyluong: "26/12/2022 -25/01/2023 2" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 3" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 4" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý GĐ", Kyluong: "26/12/2022 -25/02/2023 5 " },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 6" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 7" },    
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 8" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 9" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 10" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 11" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 12" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 13" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 14" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 15" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 16" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 17" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 18" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 19" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý GĐ", Kyluong: "26/12/2022 -25/02/2023 20" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 21" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 22" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 23" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 24" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 25" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 26" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 27" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 28" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 29" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 30" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 31" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 32" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 33" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 34" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 35" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 36" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 37" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 38" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 39" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 40" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 41" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 42" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 43" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 44" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm BA", Kyluong: "26/12/2022 -25/01/2023 45" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm trợ lý TC", Kyluong: "26/12/2022 -25/01/2023 46" },
    { tenBL: "Bảng lương tháng 1/2023 nhóm DEV", Kyluong: "26/12/2022 -25/02/2023 47" },
    

  ];


  const handleTenBLClick = (stt: number) => {
    console.log(stt); // In ra STT
  };
  
  const columnNames = {
    tenBL: {
      label: "Tên bảng lương",
      render: (label: string, index: number) => (
        <span 
          style={{ color: "#009AE3", fontSize: "14px", fontWeight: "600", cursor: "pointer" }} 
          onClick={() => handleTenBLClick(index + 1)} // in ra STT khi bấm vào tenBL
        >
          {label}
        </span>
      ),
    },
    Kyluong: {
      label: "Kỳ lương",
      render: (label: string) => (
        <span style={{ color: "#001F2D", fontSize: "14px", display: "flex", justifyContent: "center" }}>
          {label}
        </span>
      ),
    },
  };

  const uniqueSalaries = [
    { value: "all", label: "Tất cả" },
    ...Array.from(new Set(data.map((item) => item.Kyluong))).map((salary) => ({
      value: salary.toString(),
      label: salary,
    })),
  ];

  const filteredData = data.filter((item) => {
    const matchesName = item.tenBL.toLowerCase().includes(inputValue.toLowerCase());
    const matchesSalary =
      selected1 === null || selected1.value === "all" || item.Kyluong.toString() === selected1.value;
    return matchesName && matchesSalary;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (tableContainerRef.current) {
      const containerHeight = tableContainerRef.current.clientHeight;
      const rowHeight = 37.6; 
      const calculatedItemsPerPage = Math.floor(containerHeight / rowHeight);
      setItemsPerPage(calculatedItemsPerPage || 5);
    }
  }, [tableContainerRef.current]);

  useEffect(() => {
    setCurrentPage(1);
  }, [inputValue, selected1]);

  return (
    <>
      <header>
        <div className="head-container">
          <div className="logo"></div>
          <div className="name"></div>
        </div>
      </header>
      <body>
        <div className="Fillter">
          <Input
            value={inputValue}
            onChange={(value) => dispatch(appActions.setInputValue(value))}
            placeholder="Nhập tên nhân viên"
          />
          <DropDownField
            options={uniqueSalaries}
            onChange={(option) => dispatch(appActions.setSelected1(option))}
            selected={selected1?.label}
            placeholder="Lọc theo mức lương"
          />
        </div>

        <div ref={tableContainerRef}>
          <Table data={currentData} columnNames={columnNames} />
        </div>

        <Pagination
          totalData={filteredData.length}
          pagNumber={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </body>
    </>
  );
}

export default App;
