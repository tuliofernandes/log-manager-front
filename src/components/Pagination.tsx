import { Pagination as BootstrapPagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  pageNumbers: number[];
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageNumbers,
  onPageChange,
}) => {
  const visiblePageNumbers = pageNumbers.slice(
    Math.max(currentPage - 5, 0),
    Math.min(currentPage + 30, pageNumbers.length)
  );

  return (
    <BootstrapPagination
      style={{ overflowX: "auto", display: "flex", flexWrap: "nowrap" }}
    >
      <BootstrapPagination.Prev
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />
      {visiblePageNumbers.map((number) => (
        <BootstrapPagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        onClick={() =>
          onPageChange(Math.min(pageNumbers.length, currentPage + 1))
        }
      />
    </BootstrapPagination>
  );
};

export default Pagination;
