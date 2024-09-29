import React from 'react';
import './Table.scss';

interface TableProps {
  data: any[];
  columnNames: { [key: string]: string }; // Đối tượng chứa tên các cột
}

const Table: React.FC<TableProps> = ({ data, columnNames }) => {
  // Kiểm tra nếu mảng data trống
  if (data.length === 0) return <p>No data available</p>;

  // Lấy các key (tên các trường) từ đối tượng đầu tiên
    const headers = Object.keys(columnNames);

  return (
    <div className='container'>
        <table>
      <thead>
        <tr>
          <th>Số TT</th>
          {headers.map((header, index) => (
            <th key={index}>{columnNames[header] || header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {headers.map((key) => (
              <td key={key}>{item[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  );
};

export default Table;
