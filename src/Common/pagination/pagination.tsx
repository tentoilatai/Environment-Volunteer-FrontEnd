import React from 'react';
import './pagination.scss';

// Định nghĩa kiểu Props
type Props = {
  totalData: number;
  pagNumber: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ totalData, pagNumber, currentPage = 1, onPageChange }) => {
  const totalPages = Math.ceil(totalData / pagNumber);

  // Tạo mảng số trang
  const getPages = () => {
    let pages: number[] = [];

    if (totalPages <= 6) {
      // Nếu tổng số trang ít hơn hoặc bằng 7, hiển thị tất cả các trang
      pages = [...Array(totalPages).keys()].map(i => i + 1);
    } else if (currentPage <= 3) {
      // Nếu trang hiện tại gần đầu (trang 1 đến trang 4)
      pages = [...Array(currentPage + 1).keys()].map(i => i + 1); // Hiển thị từ 1 đến currentPage + 1
      pages.push(totalPages); // Hiển thị trang cuối
    } else if (currentPage >= totalPages - 2) {
      // Nếu trang hiện tại gần cuối (trang cuối - 3 đến trang cuối)
      pages = [1]; // Hiển thị trang đầu
      pages = pages.concat([...Array(totalPages - currentPage + 2).keys()].map(i => currentPage - 1 + i)); // Hiển thị từ currentPage - 1 đến cuối
    } else {
      // Hiển thị trang đầu, trang hiện tại và các trang lân cận, trang cuối
      pages = [1]; // Hiển thị trang đầu
      pages.push(currentPage - 1, currentPage, currentPage + 1); // Hiển thị các trang gần trang hiện tại
      pages.push(totalPages); // Hiển thị trang cuối
    }

    return pages;
  };

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderEllipsis = () => <span className="ellipsis">...</span>;

  const pages = getPages();

  return (
    <div className="pagination">
      <div
        className={`arrow-icon start-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handleClick(1)}
      ></div>
      <div
        className={`arrow-icon pre-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handleClick(currentPage - 1)}
      ></div>

      {/* Hiển thị các trang */}
      {pages.map((page, index) => (
        <React.Fragment key={page}>
          {index !== 0 && pages[index - 1] + 1 !== page ? renderEllipsis() : null}
          <span
            className={`page-number ${page === currentPage ? 'active' : ''}`}
            onClick={() => handleClick(page)}
          >
            {page}
          </span>
        </React.Fragment>
      ))}

      <div
        className={`arrow-icon next-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handleClick(currentPage + 1)}
      ></div>
      <div
        className={`arrow-icon end-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handleClick(totalPages)}
      ></div>
    </div>
  );
};

export default Pagination;
