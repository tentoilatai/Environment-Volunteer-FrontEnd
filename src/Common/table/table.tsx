import React, { ReactNode } from "react";
import "./Table.scss";

interface TableProps {
  data: any[];
  columnNames: {
    [key: string]: { label: string; render?: (label: string, index: number) => ReactNode };
  };
}

const Table: React.FC<TableProps> = ({ data, columnNames }) => {
  if (data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(columnNames);

  return (
    <div className="container">
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#001F2D",
                  fontSize: "14px",
                }}
              >
                No
              </th>
              {headers.map((header, index) => (
                <th key={index}>{columnNames[header].label || ""}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#001F2D",
                    fontSize: "14px",
                  }}
                >
                  {index + 1}
                </td>
                {headers.map((key) => (
                  <td key={key}>
                    {columnNames[key].render
                      ? columnNames[key].render(item[key], index)
                      : item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
